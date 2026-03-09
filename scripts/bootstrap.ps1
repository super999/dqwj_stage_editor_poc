Param()

$ErrorActionPreference = "Stop"
Set-StrictMode -Version Latest

function Write-Step($msg) {
  Write-Host "[bootstrap] $msg" -ForegroundColor Cyan
}

Write-Step "Checking Node.js"
if (-not (Get-Command node -ErrorAction SilentlyContinue)) {
  throw "Node.js is not installed. Install Node.js LTS first."
}
node --version

Write-Step "Checking npm"
if (-not (Get-Command npm -ErrorAction SilentlyContinue)) {
  throw "npm is not available."
}
npm --version

if (-not (Test-Path ".env")) {
  Write-Step "Creating .env from .env.example"
  Copy-Item ".env.example" ".env"
}

Write-Step "Installing dependencies"
npm install

Write-Step "Bootstrap completed"
