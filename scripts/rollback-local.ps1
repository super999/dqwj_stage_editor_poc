Param(
  [string]$ServiceName = "SoonFxDemoService",
  [int]$Port = 3000
)

$ErrorActionPreference = "Stop"
Set-StrictMode -Version Latest

function Write-Step($msg) {
  Write-Host "[rollback] $msg" -ForegroundColor Yellow
}

$repoRoot = Split-Path -Parent $PSScriptRoot
Set-Location $repoRoot

$releaseRoot = Join-Path $repoRoot ".releases"
$previousBackup = Join-Path $releaseRoot "previous-dist"

if (-not (Test-Path $previousBackup)) {
  throw "No previous backup found at $previousBackup"
}

if (Test-Path "dist") {
  Remove-Item -Recurse -Force "dist"
}
Copy-Item -Recurse -Force $previousBackup "dist"

$existingService = Get-Service -Name $ServiceName -ErrorAction SilentlyContinue
if ($existingService) {
  Write-Step "Restarting service"
  sc.exe stop $ServiceName | Out-Null
  Start-Sleep -Seconds 2
  sc.exe start $ServiceName | Out-Null
} else {
  Write-Step "Service does not exist; starting node process manually is required"
}

Start-Sleep -Seconds 2
$health = Invoke-RestMethod -Uri "http://127.0.0.1:$Port/health" -Method Get
if ($health.status -ne "ok") {
  throw "Rollback health check failed. status=$($health.status)"
}

Write-Step "Rollback succeeded for $ServiceName"
