#Requires -Version 5.1
<#
  Non-Tech UI PoC Workshop - Day 1 Installer (Windows)
  Installs Git, Node.js (via Scoop), and Claude Code.
  No administrator privileges required.

  Usage (PowerShell):
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

# 1) Scoop
if (-not (Get-Command scoop -ErrorAction SilentlyContinue)) {
  Say 'Scoop not found. Installing...'
  Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser -Force
  Invoke-RestMethod -Uri https://get.scoop.sh | Invoke-Expression
}
else {
  Say 'Scoop OK.'
}

# 2) Git
if (Get-Command git -ErrorAction SilentlyContinue) {
  $gitVer = (& git --version) 2>$null
  Say "Git already installed: $gitVer"
}
else {
  Say 'Installing Git...'
  scoop install git
}

# 3) Node.js
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
      Warn "Node.js $raw is too old (need 22+). Installing Node.js..."
    }
  }
}

if ($needNodeInstall) {
  Say 'Installing Node.js 22+...'
  scoop install nodejs-lts
}

# 4) Claude Code
# Refresh PATH so scoop-installed binaries are visible in this session
$env:Path = [System.Environment]::GetEnvironmentVariable('Path', 'User') + ';' + [System.Environment]::GetEnvironmentVariable('Path', 'Machine')

if (Get-Command claude -ErrorAction SilentlyContinue) {
  $ver = (& claude --version) 2>$null
  Say "Claude Code already installed: $ver"
}
else {
  Say 'Installing Claude Code via Scoop...'
  scoop install claude-code
  # Refresh PATH after installing claude-code
  $env:Path = [System.Environment]::GetEnvironmentVariable('Path', 'User') + ';' + [System.Environment]::GetEnvironmentVariable('Path', 'Machine')
}

# 5) Verify
if (-not (Get-Command claude -ErrorAction SilentlyContinue)) {
  Fail 'Claude Code not found. Please close this window, open a new PowerShell, and run: claude --version'
}

$ver = (& claude --version) 2>$null
@"

  =========================================================
  [OK] Claude Code is ready!  ($ver)
  =========================================================

  Next step:
    Close this PowerShell window and open a fresh one,
    then proceed to "Clone Project" in the workshop guide.

"@ | Write-Host
