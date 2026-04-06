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

cat << 'EOF'

  _   _ ___   ____       ____
 | | | |_ _| |  _ \ ___ / ___|
 | | | || |  | |_) / _ \ |
 | |_| || |  |  __/ (_) | |___
  \___/|___| |_|   \___/ \____|
   Workshop — Bootstrap

EOF

# Clone if not already cloned
if [[ -d "${DEST}" ]]; then
  echo "  ▸ 프로젝트가 이미 존재합니다: ${DEST}"
  echo "  ▸ 최신 변경사항을 가져오는 중..."
  cd "${DEST}"
  git pull --ff-only || true
else
  echo "  ▸ 프로젝트를 복제하는 중: ${DEST}..."
  git clone "${REPO_URL}" "${DEST}"
  cd "${DEST}"
fi

# Run setup
bash scripts/setup.sh
