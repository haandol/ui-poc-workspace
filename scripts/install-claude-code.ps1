#Requires -Version 5.1
<#
  Non-Tech UI PoC Workshop — Day 1 Installer (Windows)
  Installs Node.js (via winget) and Claude Code only.

  Usage (PowerShell, 관리자 권한 권장):
    iwr -useb https://raw.githubusercontent.com/haandol/ui-poc-workspace/main/scripts/install-claude-code.ps1 | iex
#>

$ErrorActionPreference = 'Stop'
$NodeMinMajor = 22

# 한글 출력 깨짐 방지 (Windows PowerShell 5.1 기본 콘솔 인코딩은 CP949)
try {
  [Console]::OutputEncoding = [System.Text.UTF8Encoding]::new()
  $OutputEncoding = [System.Text.UTF8Encoding]::new()
  chcp 65001 > $null 2>&1
} catch {}

function Say    ($msg) { Write-Host "  ▸ $msg" }
function Warn   ($msg) { Write-Host "  ⚠ $msg" -ForegroundColor Yellow }
function Fail   ($msg) { Write-Host "  ✗ $msg" -ForegroundColor Red; exit 1 }

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
winget 이 이 컴퓨터에 없습니다. Windows 10/11 의 'App Installer' 를 업데이트하거나,
https://nodejs.org/ko/download 에서 Node.js LTS 설치 파일을 수동 설치한 뒤 이 스크립트를 다시 실행해주세요.
"@
}
Say 'winget 확인됨.'

# 2) Node.js
$needNodeInstall = $true
if (Get-Command node -ErrorAction SilentlyContinue) {
  $raw = (& node --version) 2>$null
  if ($raw -match 'v(\d+)\.') {
    $currentMajor = [int]$Matches[1]
    if ($currentMajor -ge $NodeMinMajor) {
      Say "Node.js $raw 확인됨."
      $needNodeInstall = $false
    }
    else {
      Warn "Node.js $raw 버전이 낮습니다. Node.js LTS 를 설치합니다."
    }
  }
}

if ($needNodeInstall) {
  Say 'Node.js LTS 설치 중...'
  winget install --id OpenJS.NodeJS.LTS -e --source winget --accept-source-agreements --accept-package-agreements
  Refresh-EnvPath
}

# 3) npm present?
if (-not (Get-Command npm -ErrorAction SilentlyContinue)) {
  Refresh-EnvPath
}
if (-not (Get-Command npm -ErrorAction SilentlyContinue)) {
  Fail @"
npm 을 찾을 수 없습니다. PowerShell 창을 닫고 새로 연 다음 이 스크립트를 다시 실행해주세요.
"@
}

# 4) Claude Code
if (Get-Command claude -ErrorAction SilentlyContinue) {
  $ver = (& claude --version) 2>$null
  Say "Claude Code 가 이미 설치되어 있습니다: $ver"
}
else {
  Say 'Claude Code 설치 중... (npm install -g @anthropic-ai/claude-code)'
  npm install -g '@anthropic-ai/claude-code'
  Refresh-EnvPath
}

# 5) Verify
if (Get-Command claude -ErrorAction SilentlyContinue) {
  $ver = (& claude --version) 2>$null
  @"

  ✓ Claude Code is ready.
    $ver

  다음 단계:
    1) 새 PowerShell 을 열고 아래를 실행합니다.
       `$desktop = [Environment]::GetFolderPath('Desktop')
       New-Item -ItemType Directory -Path "`$desktop\claude-play" -Force | Out-Null
       cd "`$desktop\claude-play"
       claude
    2) Claude Code 대화창에서 /setup-bedrock 을 실행해 자격증명을 등록합니다.

"@ | Write-Host
}
else {
  Fail @"
Claude Code 가 PATH 에 잡히지 않습니다. PowerShell 창을 닫고 새로 연 다음 'claude --version' 을 실행해보세요.
"@
}
