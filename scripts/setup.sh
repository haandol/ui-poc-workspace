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

cat << 'EOF'

  _   _ ___   ____       ____
 | | | |_ _| |  _ \ ___ / ___|
 | | | || |  | |_) / _ \ |
 | |_| || |  |  __/ (_) | |___
  \___/|___| |_|   \___/ \____|
   Workshop — Setup (Mac)

EOF

# ── 1. Homebrew ──────────────────────────────
echo "1/5  Homebrew"
if command -v brew &>/dev/null; then
  ok "Homebrew 이미 설치됨"
else
  info "Homebrew 설치 중..."
  /bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
  # Add brew to PATH for Apple Silicon
  if [[ -f /opt/homebrew/bin/brew ]]; then
    eval "$(/opt/homebrew/bin/brew shellenv)"
  fi
  ok "Homebrew 설치 완료"
fi

# ── 2. Git, Node.js, glow ───────────────────
echo "2/5  Git, Node.js, glow"

if command -v git &>/dev/null; then
  ok "Git $(git --version | awk '{print $3}')"
else
  info "Git 설치 중..."
  brew install git
  ok "Git 설치 완료"
fi

install_node() {
  info "Node.js 24 설치 중..."
  brew install node@24
  # Ensure node@24 is linked / in PATH
  brew link --overwrite node@24 2>/dev/null || true
  ok "Node.js 설치 완료"
}

if command -v node &>/dev/null; then
  NODE_MAJOR=$(node --version | sed 's/v\([0-9]*\).*/\1/')
  if (( NODE_MAJOR >= 24 )); then
    ok "Node.js $(node --version)"
  else
    info "Node.js $(node --version) 발견, v24+ 필요"
    install_node
  fi
else
  install_node
fi

if command -v glow &>/dev/null; then
  ok "glow 이미 설치됨"
else
  info "glow 설치 중..."
  brew install glow
  ok "glow 설치 완료"
fi

# ── 3. pnpm & Claude Code ───────────────────
echo "3/5  pnpm & Claude Code"

if command -v pnpm &>/dev/null; then
  ok "pnpm $(pnpm --version)"
else
  info "pnpm 설치 중..."
  npm install -g pnpm
  ok "pnpm 설치 완료"
fi

if command -v claude &>/dev/null; then
  ok "Claude Code $(claude --version 2>/dev/null || echo '설치됨')"
else
  info "Claude Code 설치 중..."
  npm install -g @anthropic-ai/claude-code
  ok "Claude Code 설치 완료"
fi

# ── 4. pnpm install ─────────────────────────
echo "4/5  의존성 설치"

# Find project root (where this script lives is scripts/, go up one level)
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_ROOT="$(cd "${SCRIPT_DIR}/.." && pwd)"

if [[ -d "${PROJECT_ROOT}/node_modules" ]]; then
  ok "node_modules 이미 존재"
  info "pnpm install 동기화 중..."
fi
cd "${PROJECT_ROOT}"
pnpm install
ok "의존성 설치 완료"

# ── 5. Verify dev server ────────────────────
echo "5/5  개발 서버 확인"

info "개발 서버 시작 중 (빠른 확인)..."
pnpm dev:web &
DEV_PID=$!

# Wait up to 15 seconds for server to start
for i in $(seq 1 15); do
  if curl -s -o /dev/null -w "" http://localhost:3000 2>/dev/null; then
    ok "개발 서버 실행 중: http://localhost:3000"
    kill $DEV_PID 2>/dev/null || true
    wait $DEV_PID 2>/dev/null || true
    break
  fi
  if (( i == 15 )); then
    kill $DEV_PID 2>/dev/null || true
    wait $DEV_PID 2>/dev/null || true
    info "개발 서버가 15초 내 응답하지 않음 (괜찮습니다 — 첫 실행 시 더 오래 걸릴 수 있음)"
  fi
  sleep 1
done

# ── Done ─────────────────────────────────────
cat << 'EOF'

  ____       _                   ____                      _      _       _
 / ___|  ___| |_ _   _ _ __    / ___|___  _ __ ___  _ __ | | ___| |_ ___| |
 \___ \ / _ \ __| | | | '_ \  | |   / _ \| '_ ` _ \| '_ \| |/ _ \ __/ _ \ |
  ___) |  __/ |_| |_| | |_) | | |__| (_) | | | | | | |_) | |  __/ ||  __/_|
 |____/ \___|\__|\__,_| .__/   \____\___/|_| |_| |_| .__/|_|\___|\__\___(_)
                       |_|                           |_|

  다음 단계:
    1. 개발 서버 실행:       pnpm dev:web
    2. 브라우저 열기:        http://localhost:3000
    3. Claude Code 시작:     claude

EOF
