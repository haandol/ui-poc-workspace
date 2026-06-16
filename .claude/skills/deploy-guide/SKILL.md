---
name: deploy-guide
description: 워크숍 사전 준비 가이드(packages/guide/site/ 의 index.html + guide-images/)를 S3에 싱크하고 CloudFront 캐시를 무효화해 배포한다. "가이드 배포", "가이드 올려줘", "S3에 싱크", "CloudFront invalidate", "가이드 사이트 업데이트", "캐시 무효화", "가이드 반영" 같은 요청이나, packages/guide/site/ 의 HTML·이미지를 수정한 뒤 라이브에 반영하려는 모든 상황에서 반드시 이 스킬을 사용한다. CDK 전체 스택(deploy/destroy)을 건드리지 않고 콘텐츠만 빠르게 밀어넣는 경량 경로다. 버킷명·배포 ID는 CloudFormation 스택 출력에서 자동 조회하므로 사용자가 ID를 외울 필요가 없다.
---

# Deploy Guide Skill

워크숍 가이드 사이트를 **콘텐츠만 빠르게 라이브에 반영**하는 스킬이다.
인프라(S3 버킷 + CloudFront 배포)는 `packages/guide` 의 CDK 스택이 이미 만들어 두었고,
이 스킬은 그 위에 **파일 싱크 + 캐시 무효화**만 수행한다.

## 핵심 전제

- **배포본의 단일 소스(source of truth)는 `packages/guide/site/` 이다.**
  - `site/index.html` — 가이드 본문
  - `site/guide-images/` — 가이드에 들어가는 이미지
  - `~/Documents/workshop-setup-guide.html` 같은 원본 사본은 더 이상 사용하지 않는다.
    내용을 바꾸려면 `packages/guide/site/` 안에서 직접 편집한다.
- 버킷 이름과 CloudFront 배포 ID는 **하드코딩하지 않는다.** `WorkshopGuideStack` 의
  CloudFormation 출력(`BucketName`, `DistributionId`, `GuideUrl`)에서 매번 조회한다.
  스택을 재배포해 리소스 이름이 바뀌어도 스킬이 깨지지 않게 하기 위함이다.

## 언제 이 스킬을 쓰나

- `packages/guide/site/` 안의 HTML이나 이미지를 수정하고 **라이브에 반영**하고 싶을 때
- "가이드 배포 / 올려줘 / 반영 / 업데이트", "S3 싱크", "CloudFront 무효화" 류의 요청
- 이미지를 추가·교체한 뒤 사이트에 보이게 하고 싶을 때

CDK 리소스 자체(버킷 정책, 배포 설정, 오류 응답 등)를 바꿔야 하는 경우는 이 스킬이 아니라
`pnpm --filter @non-tech-ui-poc-workshop/guide deploy` 로 스택을 다시 배포해야 한다.
이 스킬은 어디까지나 **콘텐츠 갱신용**이다.

## 사용법

대부분의 경우 번들된 스크립트 하나면 끝난다. 레포 어디서든 실행할 수 있다(스크립트가
자기 위치 기준으로 `packages/guide/site/` 를 찾는다):

```bash
.claude/skills/deploy-guide/scripts/sync-guide.sh
```

스크립트가 하는 일(순서대로):

1. `WorkshopGuideStack` 출력에서 버킷명·배포 ID·URL을 조회
2. `packages/guide/site/` → S3 버킷으로 `aws s3 sync --delete` (정확히 미러링)
   - 이미지 등 정적 자산은 길게 캐시(`max-age=86400`), HTML은 짧게 캐시(`max-age=60`)해
     본문 변경이 빨리 보이게 한다
3. 다운로드 자산(`DOWNLOAD_ASSETS`, 현재 `guide-images/water-tracker.jpg`)은
   `Content-Disposition: attachment` 로 올려, 참여자가 클릭하면 새 탭에서 열리는 대신
   바로 파일로 저장되게 한다. 실습용 손그림처럼 "받아서 써야 하는" 이미지가 여기 해당한다.
   본문에 보여야 하는 삽화(`fig-*.jpg`)는 여기 넣지 않는다.
4. CloudFront에 `/*` 무효화를 걸어 엣지 캐시를 비움
5. 최종 가이드 URL을 출력

### 옵션

- `--dry-run` — 실제로 올리지 않고 무엇이 바뀔지만 보여준다. **무엇이 삭제/업로드될지 먼저
  확인하고 싶을 때 권장.** (`--delete` 가 걸려 있어, 의도치 않게 S3 파일이 지워지지 않는지
  점검하는 용도로 특히 유용하다.)
- `--no-invalidate` — S3 싱크만 하고 CloudFront 무효화는 건너뛴다.
- `--stack NAME` / `--region REGION` — 스택 이름이나 리전을 바꿔 실행(기본값:
  `WorkshopGuideStack` / `us-east-1`).

## 작업 흐름 가이드

1. 사용자가 가이드 내용/이미지를 바꿨다면, 먼저 변경이 `packages/guide/site/` 에 반영되어 있는지
   확인한다. (다른 곳에서 편집했다면 site/ 로 가져온다.)
2. 파괴적 변경(파일 삭제)이 섞여 있거나 사용자가 불안해하면 먼저 `--dry-run` 으로 보여주고
   확인을 받은 뒤 실제 싱크를 실행한다.
3. 싱크 후 출력된 URL을 사용자에게 전달하고, 캐시 무효화는 보통 1~3분 걸린다는 점을 알린다.
4. 필요하면 `curl -sI <URL>` 로 200 응답을 확인해 배포가 실제로 반영됐는지 검증한다.

## 사전 조건

- AWS 자격증명이 설정되어 있어야 한다(`aws sts get-caller-identity` 로 확인).
- `WorkshopGuideStack` 이 해당 계정/리전에 이미 배포되어 있어야 한다. 아직 없다면
  먼저 `pnpm --filter @non-tech-ui-poc-workshop/guide deploy` 로 스택을 만든다.
