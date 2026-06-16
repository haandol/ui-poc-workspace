# guide

워크숍 사전 준비 가이드(정적 HTML)를 **S3 + CloudFront** 로 호스팅하는 CDK 앱입니다.

## 구조

```
packages/guide
├── bin/guide.ts          # CDK 엔트리포인트
├── lib/guide-stack.ts    # S3(비공개) + CloudFront(OAC) + BucketDeployment
└── site/                 # 배포되는 정적 자산
    ├── index.html        # = workshop-setup-guide.html
    └── guide-images/     # 가이드 이미지(상대경로로 참조)
```

S3 버킷은 비공개로 두고 CloudFront Origin Access Control(OAC)로만 접근을 허용합니다.
콘텐츠를 바꾸려면 `site/` 안의 파일을 수정한 뒤 다시 배포하면 됩니다 — 배포 시 CloudFront 캐시가 자동으로 무효화됩니다.

## 사전 준비

- AWS 자격증명(`aws sts get-caller-identity` 로 확인)
- 해당 계정/리전에 CDK bootstrap 이 한 번 필요합니다:
  ```bash
  pnpm --filter @non-tech-ui-poc-workshop/guide exec cdk bootstrap
  ```

## 사용법

워크스페이스 루트 또는 이 패키지에서:

```bash
# 변경 사항 미리보기
pnpm --filter @non-tech-ui-poc-workshop/guide synth
pnpm --filter @non-tech-ui-poc-workshop/guide diff

# 배포 (완료되면 GuideUrl 이 출력됩니다)
pnpm --filter @non-tech-ui-poc-workshop/guide deploy

# 제거
pnpm --filter @non-tech-ui-poc-workshop/guide destroy
```

Nx 로도 동일하게 실행할 수 있습니다:

```bash
pnpm nx run guide:deploy
```

배포가 끝나면 `GuideUrl` (예: `https://xxxx.cloudfront.net`) 로 가이드에 접속할 수 있습니다.
