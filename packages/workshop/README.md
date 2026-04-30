# Workshop

Claude Code on Bedrock을 활용한 비개발자 UI PoC 워크샵 콘텐츠입니다.

## Workshop Studio 배포

`git subtree split` + `git push`를 사용하여 `packages/workshop/` 내용을 Workshop Studio repo 루트로 push합니다.

### 1. Workshop Studio remote 추가 (최초 1회)

```bash
# git-remote-workshopstudio 플러그인 설치
pip config set global.trusted-host plugin.us-east-1.prod.workshops.aws
pip config set global.extra-index-url https://plugin.us-east-1.prod.workshops.aws
pipx install git-remote-workshopstudio

# remote 등록
git remote add workshopstudio workshopstudio://ws-content-<workshop-id>/<workshop-name>
```

### 2. 배포

Workshop Studio 콘솔에서 **Repository Credentials**를 발급받아 환경변수를 설정한 후 push합니다 (1시간 유효).

```bash
# Nx target 사용
npx nx deploy workshop

# 또는 직접 실행
git branch -D workshop-deploy 2>/dev/null
git subtree split --prefix=packages/workshop -b workshop-deploy
git push workshopstudio workshop-deploy:main
```

> Workshop Studio에서 자동 빌드가 시작되며 5~10분 후 반영됩니다.

## 로컬 프리뷰

### 1. preview_build 다운로드 (최초 1회)

```bash
# macOS (M1/M2/M3)
curl -o packages/workshop/preview_build https://artifacts.us-east-1.prod.workshops.aws/v2/cli/osx_arm/preview_build

# macOS (Intel)
curl -o packages/workshop/preview_build https://artifacts.us-east-1.prod.workshops.aws/v2/cli/osx/preview_build

# Linux
curl -o packages/workshop/preview_build https://artifacts.us-east-1.prod.workshops.aws/v2/cli/linux/preview_build

chmod +x packages/workshop/preview_build
```

### 2. 서버 실행

```bash
# Nx target 사용
npx nx preview workshop

# 또는 직접 실행
cd packages/workshop && ./preview_build
```

### 3. 브라우저에서 확인

`http://localhost:8080` 접속

## 구조

```
packages/workshop/
├── contentspec.yaml
├── content/          # 워크샵 마크다운 콘텐츠
└── static/images/    # 이미지 (플레이스홀더 → 실제 스크린샷으로 교체 필요)
```
