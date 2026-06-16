#!/usr/bin/env bash
#
# 워크숍 가이드 사이트(packages/guide/site/)를 S3에 싱크하고 CloudFront 캐시를 무효화한다.
#
# 버킷 이름과 배포 ID는 CloudFormation 스택 출력에서 매번 조회하므로,
# 스택을 재배포해 리소스 이름이 바뀌어도 그대로 동작한다.
#
# Usage:
#   sync-guide.sh [--dry-run] [--stack NAME] [--region REGION] [--no-invalidate]
#
# 환경변수로도 덮어쓸 수 있다: STACK_NAME, AWS_REGION
#
set -euo pipefail

STACK_NAME="${STACK_NAME:-WorkshopGuideStack}"
REGION="${AWS_REGION:-us-east-1}"
DRY_RUN=0
DO_INVALIDATE=1

while [[ $# -gt 0 ]]; do
  case "$1" in
    --dry-run)        DRY_RUN=1; shift ;;
    --no-invalidate)  DO_INVALIDATE=0; shift ;;
    --stack)          STACK_NAME="$2"; shift 2 ;;
    --region)         REGION="$2"; shift 2 ;;
    *) echo "알 수 없는 옵션: $1" >&2; exit 2 ;;
  esac
done

# 이 스크립트 기준으로 레포 안 site 디렉터리를 찾는다.
# .claude/skills/deploy-guide/scripts/ 에서 4단계 위가 레포 루트.
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
REPO_ROOT="$(cd "$SCRIPT_DIR/../../../.." && pwd)"
SITE_DIR="$REPO_ROOT/packages/guide/site"

if [[ ! -f "$SITE_DIR/index.html" ]]; then
  echo "❌ 배포할 사이트를 찾을 수 없습니다: $SITE_DIR/index.html" >&2
  echo "   (이 스킬은 packages/guide/site/ 를 배포본의 단일 소스로 사용합니다)" >&2
  exit 1
fi

echo "▶ 스택 출력에서 리소스 조회 중 ($STACK_NAME / $REGION)..."
OUTPUTS_JSON="$(aws cloudformation describe-stacks \
  --stack-name "$STACK_NAME" --region "$REGION" \
  --query "Stacks[0].Outputs" --output json)"

get_output() {
  echo "$OUTPUTS_JSON" | python3 -c \
    "import sys,json;[print(o['OutputValue']) for o in json.load(sys.stdin) if o['OutputKey']=='$1']"
}

BUCKET="$(get_output BucketName)"
DIST_ID="$(get_output DistributionId)"
GUIDE_URL="$(get_output GuideUrl)"

if [[ -z "$BUCKET" || -z "$DIST_ID" ]]; then
  echo "❌ 스택 출력에서 BucketName/DistributionId 를 찾지 못했습니다." >&2
  echo "   스택이 배포되어 있는지 확인하세요: $STACK_NAME ($REGION)" >&2
  exit 1
fi

echo "  • 버킷:    $BUCKET"
echo "  • 배포 ID: $DIST_ID"
echo "  • URL:     ${GUIDE_URL:-(출력 없음)}"
echo "  • 소스:    $SITE_DIR"
echo

# 참여자가 실습용으로 내려받아야 하는 자산. 클릭 즉시 다운로드되도록
# Content-Disposition: attachment 를 명시적으로 건다(브라우저별 download 속성
# 처리 차이를 없애기 위함). 본문 삽화(fig-*.jpg)는 페이지에 보여야 하므로 제외한다.
DOWNLOAD_ASSETS=("guide-images/water-tracker.jpg")

SYNC_ARGS=(--delete)
[[ $DRY_RUN -eq 1 ]] && SYNC_ARGS+=(--dryrun)

DRY_LABEL=""
[[ $DRY_RUN -eq 1 ]] && DRY_LABEL=" (dry-run)"

echo "▶ S3 싱크${DRY_LABEL}..."
# --delete: site/ 에서 지운 파일은 S3에서도 지워 정확히 미러링.
# HTML은 항상 최신을 보도록 짧은 캐시, 이미지 등 정적 자산은 길게 캐시.
# 다운로드 자산은 별도로(아래) 올리므로 여기서는 제외한다.
ASSET_EXCLUDES=()
for a in "${DOWNLOAD_ASSETS[@]}"; do ASSET_EXCLUDES+=(--exclude "$a"); done

aws s3 sync "$SITE_DIR" "s3://$BUCKET" "${SYNC_ARGS[@]}" \
  --exclude "*.html" "${ASSET_EXCLUDES[@]}" \
  --cache-control "public,max-age=86400" \
  --region "$REGION"
aws s3 sync "$SITE_DIR" "s3://$BUCKET" "${SYNC_ARGS[@]}" \
  --exclude "*" --include "*.html" \
  --cache-control "public,max-age=60" \
  --content-type "text/html; charset=utf-8" \
  --region "$REGION"

# 다운로드 자산: Content-Disposition: attachment 로 올려 클릭 즉시 저장되게 한다.
for a in "${DOWNLOAD_ASSETS[@]}"; do
  src="$SITE_DIR/$a"
  [[ -f "$src" ]] || { echo "  ⚠ 다운로드 자산 없음, 건너뜀: $a"; continue; }
  fname="$(basename "$a")"
  if [[ $DRY_RUN -eq 1 ]]; then
    echo "(dryrun) cp $a → s3://$BUCKET/$a  (Content-Disposition: attachment)"
  else
    aws s3 cp "$src" "s3://$BUCKET/$a" \
      --cache-control "public,max-age=86400" \
      --content-disposition "attachment; filename=\"$fname\"" \
      --region "$REGION"
  fi
done

if [[ $DRY_RUN -eq 1 ]]; then
  echo
  echo "✅ dry-run 완료 — 실제로는 아무것도 바꾸지 않았습니다."
  exit 0
fi

if [[ $DO_INVALIDATE -eq 1 ]]; then
  echo
  echo "▶ CloudFront 캐시 무효화 요청..."
  INV_ID="$(aws cloudfront create-invalidation \
    --distribution-id "$DIST_ID" --paths "/*" \
    --query "Invalidation.Id" --output text)"
  echo "  • 무효화 ID: $INV_ID (전파까지 보통 1~3분)"
fi

echo
echo "✅ 완료! 가이드: ${GUIDE_URL:-https://<배포 도메인>}"
