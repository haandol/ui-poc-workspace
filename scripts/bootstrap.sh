#!/usr/bin/env bash
set -euo pipefail

# ──────────────────────────────────────────────
# Non-Tech UI PoC Workshop — Bootstrap (Mac)
# Clone + Setup in one command.
#
# Usage:
#   curl -fsSL https://raw.githubusercontent.com/haandol/ui-poc-workspace/main/scripts/bootstrap.sh | bash
# ──────────────────────────────────────────────

REPO_URL="https://github.com/haandol/ui-poc-workspace"
DEST="${HOME}/Desktop/ui-poc-workspace"

echo ""
echo "╔════════════════════════════════════════════╗"
echo "║  Non-Tech UI PoC Workshop — Bootstrap      ║"
echo "╚════════════════════════════════════════════╝"
echo ""

# Clone if not already cloned
if [[ -d "${DEST}" ]]; then
  echo "  ▸ Project already exists at ${DEST}"
  echo "  ▸ Pulling latest changes..."
  cd "${DEST}"
  git pull --ff-only || true
else
  echo "  ▸ Cloning project to ${DEST}..."
  git clone "${REPO_URL}" "${DEST}"
  cd "${DEST}"
fi

# Run setup
bash scripts/setup.sh
