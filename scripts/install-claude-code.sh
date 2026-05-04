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
     Workshop Day 1 - Install Claude Code

EOF

say() { printf "  > %s\n" "$*"; }
warn() { printf "  ! %s\n" "$*" 1>&2; }
die() { printf "  x %s\n" "$*" 1>&2; exit 1; }

# 1) Homebrew
if ! command -v brew >/dev/null 2>&1; then
  say "Homebrew not found. Installing..."
  /bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
  # Ensure brew is in PATH for the rest of this session
  if [[ -x /opt/homebrew/bin/brew ]]; then
    eval "$(/opt/homebrew/bin/brew shellenv)"
  elif [[ -x /usr/local/bin/brew ]]; then
    eval "$(/usr/local/bin/brew shellenv)"
  fi
else
  say "Homebrew OK."
fi

# 2) Node.js
need_node_install=1
if command -v node >/dev/null 2>&1; then
  current_version=$(node --version | sed 's/^v//')
  current_major=${current_version%%.*}
  if [[ "${current_major}" -ge "${NODE_MIN_MAJOR}" ]]; then
    say "Node.js ${current_version} OK."
    need_node_install=0
  else
    warn "Node.js ${current_version} is too old. Installing Node.js ${NODE_MIN_MAJOR} or newer."
  fi
fi

if [[ "${need_node_install}" -eq 1 ]]; then
  say "Installing Node.js 24..."
  brew install node@24
  # Link node@24 so `node` / `npm` is available
  brew link --overwrite --force node@24 || true
fi

# 3) Claude Code
if command -v claude >/dev/null 2>&1; then
  say "Claude Code already installed: $(claude --version 2>/dev/null || true)"
else
  say "Installing Claude Code... (npm install -g @anthropic-ai/claude-code)"
  npm install -g @anthropic-ai/claude-code
fi

# 4) Verify
if command -v claude >/dev/null 2>&1; then
  cat << EOF

  [OK] Claude Code is ready.
       $(claude --version 2>/dev/null || echo 'claude installed')

  Next steps:
    1) Open a new terminal and run:
       mkdir -p ~/Desktop/claude-play && cd ~/Desktop/claude-play && claude
    2) On first launch, pick "3rd-party platform" -> "Amazon Bedrock"
       and enter your Bedrock API key.

EOF
else
  die "Claude Code not found on PATH. Open a new terminal and run 'claude --version' again."
fi
