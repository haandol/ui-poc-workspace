# ──────────────────────────────────────────────
# Non-Tech UI PoC Workshop — Windows Setup
# ──────────────────────────────────────────────

$null = chcp 65001 2>&1
[Console]::OutputEncoding = [System.Text.Encoding]::UTF8
[Console]::InputEncoding  = [System.Text.Encoding]::UTF8
$OutputEncoding            = [System.Text.Encoding]::UTF8
$ErrorActionPreference = "Stop"

function Write-Ok   { param($msg) Write-Host "  ✓ $msg" -ForegroundColor Green }
function Write-Info { param($msg) Write-Host "  ▸ $msg" -ForegroundColor Yellow }
function Write-Fail { param($msg) Write-Host "  ✗ $msg" -ForegroundColor Red; exit 1 }

Write-Host ""
Write-Host "╔══════════════════════════════════════════════╗"
Write-Host "║  Non-Tech UI PoC Workshop — Setup (Windows)  ║"
Write-Host "╚══════════════════════════════════════════════╝"
Write-Host ""

# ── 1. scoop ─────────────────────────────────
Write-Host "1/5  scoop"
if (Get-Command scoop -ErrorAction SilentlyContinue) {
    Write-Ok "scoop already installed"
} else {
    Write-Info "Installing scoop..."
    Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser -Force
    Invoke-RestMethod -Uri https://get.scoop.sh | Invoke-Expression
    Write-Ok "scoop installed"
}

# ── 2. Git, Node.js, glow ───────────────────
Write-Host "2/5  Git, Node.js, glow"

if (Get-Command git -ErrorAction SilentlyContinue) {
    Write-Ok "Git $(git --version)"
} else {
    Write-Info "Installing Git..."
    scoop install git
    Write-Ok "Git installed"
}

function Install-NodeJs24 {
    Write-Info "Installing Node.js 24 via scoop..."
    scoop bucket add versions 2>$null
    scoop install versions/nodejs24
    Write-Ok "Node.js 24 installed"
}

if (Get-Command node -ErrorAction SilentlyContinue) {
    $nodeVersion = (node --version) -replace 'v', ''
    $nodeMajor = [int]($nodeVersion.Split('.')[0])
    if ($nodeMajor -eq 24) {
        Write-Ok "Node.js v$nodeVersion"
    } else {
        Write-Info "Node.js v$nodeVersion found, but v24 required"
        Install-NodeJs24
    }
} else {
    Install-NodeJs24
}

if (Get-Command glow -ErrorAction SilentlyContinue) {
    Write-Ok "glow already installed"
} else {
    Write-Info "Installing glow..."
    scoop install glow
    Write-Ok "glow installed"
}

# ── 3. pnpm and Claude Code ─────────────────
Write-Host '3/5  pnpm & Claude Code'

if (Get-Command pnpm -ErrorAction SilentlyContinue) {
    Write-Ok "pnpm $(pnpm --version)"
} else {
    Write-Info "Installing pnpm..."
    npm install -g pnpm
    Write-Ok "pnpm installed"
}

if (Get-Command claude -ErrorAction SilentlyContinue) {
    Write-Ok "Claude Code installed"
} else {
    Write-Info "Installing Claude Code..."
    npm install -g @anthropic-ai/claude-code
    Write-Ok "Claude Code installed"
}

# ── 4. pnpm install ─────────────────────────
Write-Host "4/5  Dependencies"

$ScriptDir = Split-Path -Parent $MyInvocation.MyCommand.Definition
$ProjectRoot = Split-Path -Parent $ScriptDir

Push-Location $ProjectRoot
try {
    if (Test-Path "node_modules") {
        Write-Info "Cleaning existing node_modules..."
        Remove-Item -Recurse -Force "node_modules"
    }
    pnpm install
    Write-Ok "Dependencies installed"
} finally {
    Pop-Location
}

# ── 5. Verify dev server ────────────────────
Write-Host "5/5  Dev server verification"

Write-Info 'Starting dev server (quick check)...'
Push-Location $ProjectRoot
$devProcess = Start-Process -FilePath "cmd.exe" -ArgumentList "/c pnpm dev:web" -PassThru -WindowStyle Hidden

$success = $false
for ($i = 1; $i -le 15; $i++) {
    try {
        $response = Invoke-WebRequest -Uri "http://localhost:3000" -UseBasicParsing -TimeoutSec 2 -ErrorAction Stop
        if ($response.StatusCode -eq 200) {
            Write-Ok "Dev server running at http://localhost:3000"
            $success = $true
            break
        }
    } catch { }
    Start-Sleep -Seconds 1
}

if (-not $success) {
    Write-Info 'Dev server did not respond in 15s (this is OK - it may need more time on first run)'
}

Stop-Process -Id $devProcess.Id -Force -ErrorAction SilentlyContinue
Pop-Location

# ── Done ─────────────────────────────────────
Write-Host ""
Write-Host "╔══════════════════════════════════════════════╗"
Write-Host "║           Setup complete!                    ║"
Write-Host "╚══════════════════════════════════════════════╝"
Write-Host ""
Write-Host "  Next steps:"
Write-Host "    1. Copy research PDF to:  docs/"
Write-Host "    2. Run the dev server:    pnpm dev:web"
Write-Host "    3. Open browser:          http://localhost:3000"
Write-Host "    4. Start Claude Code:     claude"
Write-Host ""
