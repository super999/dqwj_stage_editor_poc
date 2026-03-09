Param(
  [string]$ServiceName = "SoonFxDemoService",
  [int]$Port = 3000
)

$ErrorActionPreference = "Stop"
Set-StrictMode -Version Latest

function Write-Step($msg) {
  Write-Host "[deploy] $msg" -ForegroundColor Cyan
}

function Ensure-Directory($path) {
  if (-not (Test-Path $path)) {
    New-Item -ItemType Directory -Path $path | Out-Null
  }
}

$repoRoot = Split-Path -Parent $PSScriptRoot
Set-Location $repoRoot

$releaseRoot = Join-Path $repoRoot ".releases"
$currentBackup = Join-Path $releaseRoot "current-dist"
$previousBackup = Join-Path $releaseRoot "previous-dist"

Ensure-Directory $releaseRoot

Write-Step "Installing dependencies"
npm install

if (Test-Path "dist") {
  Write-Step "Saving previous dist to backup"
  if (Test-Path $previousBackup) {
    Remove-Item -Recurse -Force $previousBackup
  }
  if (Test-Path $currentBackup) {
    Move-Item -Force $currentBackup $previousBackup
  }
  Copy-Item -Recurse -Force "dist" $currentBackup
}

Write-Step "Building project"
npm run build

if (Test-Path $currentBackup) {
  Remove-Item -Recurse -Force $currentBackup
}
Copy-Item -Recurse -Force "dist" $currentBackup
Set-Content -Path (Join-Path $releaseRoot "last-success.txt") -Value (Get-Date).ToString("s")

$nodeCmd = Get-Command node -ErrorAction Stop
$nodeExe = $nodeCmd.Path
$serverEntry = Join-Path $repoRoot "dist\server.js"

if (-not (Test-Path $serverEntry)) {
  throw "Build output not found: $serverEntry"
}

$existingService = Get-Service -Name $ServiceName -ErrorAction SilentlyContinue
if ($existingService) {
  Write-Step "Stopping existing service"
  sc.exe stop $ServiceName | Out-Null
  Start-Sleep -Seconds 2
  Write-Step "Deleting existing service"
  sc.exe delete $ServiceName | Out-Null
  Start-Sleep -Seconds 2
}

$binPath = "`"$nodeExe`" `"$serverEntry`""
Write-Step "Creating Windows service"
sc.exe create $ServiceName binPath= $binPath start= auto DisplayName= $ServiceName | Out-Null

Write-Step "Configuring service environment with PORT=$Port"
setx PORT $Port | Out-Null

Write-Step "Starting service"
sc.exe start $ServiceName | Out-Null
Start-Sleep -Seconds 3

Write-Step "Health check"
$health = Invoke-RestMethod -Uri "http://127.0.0.1:$Port/health" -Method Get
if ($health.status -ne "ok") {
  throw "Health check failed. Response status: $($health.status)"
}

Write-Step "Deployment completed. Service=$ServiceName Port=$Port"
