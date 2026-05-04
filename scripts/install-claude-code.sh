#!/usr/bin/env bash
set -euo pipefail

# ──────────────────────────────────────────────
# Non-Tech UI PoC Workshop — Day 1 Installer (Mac)
# Installs Node.js (via Homebrew) and Claude Code only.
#
# Usage:
#   curl -fsSL https://raw.githubusercontent.com/haandol/ui-poc-workspace/main/scripts/install-claude-code.sh | bash
# ──────────────────────────────────────────────

NODE_MIN_MAJOR=22

cat << 'EOF'

   ____ _                 _         ____          _
  / ___| | __ _ _   _  __| | ___   / ___|___   __| | ___
 | |   | |/ _` | | | |/ _` |/ _ \ | |   / _ \ / _` |/ _ \
 | |___| | (_| | |_| | (_| |  __/ | |__| (_) | (_| |  __/
  \____|_|\__,_|\__,_|\__,_|\___|  \____\___/ \__,_|\___|
     Workshop Day 1 — Install Claude Code

EOF

say() { printf "  ▸ %s\n" "$*"; }
warn() { printf "  ⚠ %s\n" "$*" 1>&2; }
die() { printf "  ✗ %s\n" "$*" 1>&2; exit 1; }

# 1) Homebrew
if ! command -v brew >/dev/null 2>&1; then
  say "Homebrew 가 없어서 먼저 설치합니다."
  /bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
  # Ensure brew is in PATH for the rest of this session
  if [[ -x /opt/homebrew/bin/brew ]]; then
    eval "$(/opt/homebrew/bin/brew shellenv)"
  elif [[ -x /usr/local/bin/brew ]]; then
    eval "$(/usr/local/bin/brew shellenv)"
  fi
else
  say "Homebrew 확인됨."
fi

# 2) Node.js
need_node_install=1
if command -v node >/dev/null 2>&1; then
  current_version=$(node --version | sed 's/^v//')
  current_major=${current_version%%.*}
  if [[ "${current_major}" -ge "${NODE_MIN_MAJOR}" ]]; then
    say "Node.js ${current_version} 확인됨."
    need_node_install=0
  else
    warn "Node.js ${current_version} 버전이 낮습니다. Node.js ${NODE_MIN_MAJOR} 이상을 설치합니다."
  fi
fi

if [[ "${need_node_install}" -eq 1 ]]; then
  say "Node.js 24 설치 중..."
  brew install node@24
  # Link node@24 so `node` / `npm` is available
  brew link --overwrite --force node@24 || true
fi

# 3) Claude Code
if command -v claude >/dev/null 2>&1; then
  say "Claude Code 가 이미 설치되어 있습니다: $(claude --version 2>/dev/null || true)"
else
  say "Claude Code 설치 중... (npm install -g @anthropic-ai/claude-code)"
  npm install -g @anthropic-ai/claude-code
fi

# 4) Verify
if command -v claude >/dev/null 2>&1; then
  cat << EOF

  ✓ Claude Code is ready.
    $(claude --version 2>/dev/null || echo 'claude installed')

  다음 단계:
    1) 새 터미널을 열고 아래를 실행합니다.
       mkdir -p ~/Desktop/claude-play && cd ~/Desktop/claude-play && claude
    2) Claude Code 대화창에서 /setup-bedrock 을 실행해 자격증명을 등록합니다.

EOF
else
  die "Claude Code 가 PATH 에 잡히지 않습니다. 새 터미널을 열어 다시 'claude --version' 을 실행해보세요."
fi
