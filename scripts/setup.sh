#!/usr/bin/env bash
set -euo pipefail

# ──────────────────────────────────────────────
# Non-Tech UI PoC Workshop — Mac/Linux Setup
# ──────────────────────────────────────────────

GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m'

ok()   { echo -e "  ${GREEN}✓${NC} $1"; }
info() { echo -e "  ${YELLOW}▸${NC} $1"; }
fail() { echo -e "  ${RED}✗${NC} $1"; exit 1; }

echo ""
echo "╔════════════════════════════════════════════╗"
echo "║  Non-Tech UI PoC Workshop — Setup (Mac)   ║"
echo "╚════════════════════════════════════════════╝"
echo ""

# ── 1. Homebrew ──────────────────────────────
echo "1/5  Homebrew"
if command -v brew &>/dev/null; then
  ok "Homebrew already installed"
else
  info "Installing Homebrew..."
  /bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
  # Add brew to PATH for Apple Silicon
  if [[ -f /opt/homebrew/bin/brew ]]; then
    eval "$(/opt/homebrew/bin/brew shellenv)"
  fi
  ok "Homebrew installed"
fi

# ── 2. Git, Node.js, glow ───────────────────
echo "2/5  Git, Node.js, glow"

if command -v git &>/dev/null; then
  ok "Git $(git --version | awk '{print $3}')"
else
  info "Installing Git..."
  brew install git
  ok "Git installed"
fi

install_node() {
  info "Installing Node.js 24..."
  brew install node@24
  # Ensure node@24 is linked / in PATH
  brew link --overwrite node@24 2>/dev/null || true
  ok "Node.js installed"
}

if command -v node &>/dev/null; then
  NODE_MAJOR=$(node --version | sed 's/v\([0-9]*\).*/\1/')
  if (( NODE_MAJOR >= 24 )); then
    ok "Node.js $(node --version)"
  else
    info "Node.js $(node --version) found, but v24+ required"
    install_node
  fi
else
  install_node
fi

if command -v glow &>/dev/null; then
  ok "glow already installed"
else
  info "Installing glow..."
  brew install glow
  ok "glow installed"
fi

# ── 3. pnpm & Claude Code ───────────────────
echo "3/5  pnpm & Claude Code"

if command -v pnpm &>/dev/null; then
  ok "pnpm $(pnpm --version)"
else
  info "Installing pnpm..."
  npm install -g pnpm
  ok "pnpm installed"
fi

if command -v claude &>/dev/null; then
  ok "Claude Code $(claude --version 2>/dev/null || echo 'installed')"
else
  info "Installing Claude Code..."
  npm install -g @anthropic-ai/claude-code
  ok "Claude Code installed"
fi

# ── 4. pnpm install ─────────────────────────
echo "4/5  Dependencies"

# Find project root (where this script lives is scripts/, go up one level)
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_ROOT="$(cd "${SCRIPT_DIR}/.." && pwd)"

if [[ -d "${PROJECT_ROOT}/node_modules" ]]; then
  ok "node_modules already exists"
  info "Running pnpm install to sync..."
fi
cd "${PROJECT_ROOT}"
pnpm install
ok "Dependencies installed"

# ── 5. Verify dev server ────────────────────
echo "5/5  Dev server verification"

info "Starting dev server (quick check)..."
pnpm dev:web &
DEV_PID=$!

# Wait up to 15 seconds for server to start
for i in $(seq 1 15); do
  if curl -s -o /dev/null -w "" http://localhost:3000 2>/dev/null; then
    ok "Dev server running at http://localhost:3000"
    kill $DEV_PID 2>/dev/null || true
    wait $DEV_PID 2>/dev/null || true
    break
  fi
  if (( i == 15 )); then
    kill $DEV_PID 2>/dev/null || true
    wait $DEV_PID 2>/dev/null || true
    info "Dev server did not respond in 15s (this is OK — it may need more time on first run)"
  fi
  sleep 1
done

# ── Done ─────────────────────────────────────
echo ""
echo "╔════════════════════════════════════════════╗"
echo "║           Setup complete!                  ║"
echo "╚════════════════════════════════════════════╝"
echo ""
echo "  Next steps:"
echo "    1. Run the dev server:    pnpm dev:web"
echo "    2. Open browser:          http://localhost:3000"
echo "    3. Start Claude Code:     claude"
echo ""
