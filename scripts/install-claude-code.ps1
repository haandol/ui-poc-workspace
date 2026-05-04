#Requires -Version 5.1
<#
  Non-Tech UI PoC Workshop - Day 1 Installer (Windows)
  Installs Node.js (via winget) and Claude Code only.

  Usage (PowerShell, run as Administrator):
    iwr -useb https://raw.githubusercontent.com/haandol/ui-poc-workspace/main/scripts/install-claude-code.ps1 | iex
#>

$ErrorActionPreference = 'Stop'
$NodeMinMajor = 22

function Say  ($msg) { Write-Host "  > $msg" }
function Warn ($msg) { Write-Host "  ! $msg" -ForegroundColor Yellow }
function Fail ($msg) { Write-Host "  x $msg" -ForegroundColor Red; exit 1 }

@'

   ____ _                 _         ____          _
  / ___| | __ _ _   _  __| | ___   / ___|___   __| | ___
 | |   | |/ _` | | | |/ _` |/ _ \ | |   / _ \ / _` |/ _ \
 | |___| | (_| | |_| | (_| |  __/ | |__| (_) | (_| |  __/
  \____|_|\__,_|\__,_|\__,_|\___|  \____\___/ \__,_|\___|
     Workshop Day 1 - Install Claude Code

'@ | Write-Host

# Refresh PATH in current session after installs (so new executables show up)
function Refresh-EnvPath {
  $machine = [Environment]::GetEnvironmentVariable('Path', 'Machine')
  $user    = [Environment]::GetEnvironmentVariable('Path', 'User')
  $env:Path = ($machine, $user | Where-Object { $_ }) -join ';'
}

# 1) winget check
if (-not (Get-Command winget -ErrorAction SilentlyContinue)) {
  Fail @"
winget is not available on this machine. Update 'App Installer' from the Microsoft Store,
or install Node.js LTS manually from https://nodejs.org/en/download and rerun this script.
"@
}
Say 'winget OK.'

# 2) Node.js
$needNodeInstall = $true
if (Get-Command node -ErrorAction SilentlyContinue) {
  $raw = (& node --version) 2>$null
  if ($raw -match 'v(\d+)\.') {
    $currentMajor = [int]$Matches[1]
    if ($currentMajor -ge $NodeMinMajor) {
      Say "Node.js $raw OK."
      $needNodeInstall = $false
    }
    else {
      Warn "Node.js $raw is too old. Installing Node.js LTS."
    }
  }
}

if ($needNodeInstall) {
  Say 'Installing Node.js LTS...'
  winget install --id OpenJS.NodeJS.LTS -e --source winget --accept-source-agreements --accept-package-agreements
  Refresh-EnvPath
}

# 3) npm present?
if (-not (Get-Command npm -ErrorAction SilentlyContinue)) {
  Refresh-EnvPath
}
if (-not (Get-Command npm -ErrorAction SilentlyContinue)) {
  Fail @"
npm not found. Close this PowerShell window, open a new one, and rerun this script.
"@
}

# 4) Claude Code
if (Get-Command claude -ErrorAction SilentlyContinue) {
  $ver = (& claude --version) 2>$null
  Say "Claude Code already installed: $ver"
}
else {
  Say 'Installing Claude Code... (npm install -g @anthropic-ai/claude-code)'
  npm install -g '@anthropic-ai/claude-code'
  Refresh-EnvPath
}

# 5) Verify
if (Get-Command claude -ErrorAction SilentlyContinue) {
  $ver = (& claude --version) 2>$null
  @"

  [OK] Claude Code is ready.
       $ver

  Next steps:
    1) Open a new PowerShell and run:
       `$desktop = [Environment]::GetFolderPath('Desktop')
       New-Item -ItemType Directory -Path "`$desktop\claude-play" -Force | Out-Null
       cd "`$desktop\claude-play"
       claude
    2) On first launch, pick "3rd-party platform" -> "Amazon Bedrock"
       and enter your Bedrock API key.

"@ | Write-Host
}
else {
  Fail @"
Claude Code not found on PATH. Close this PowerShell window, open a new one,
and run 'claude --version' again.
"@
}
