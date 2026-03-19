# Web

UI PoC 워크숍용 웹 애플리케이션. Nuxt 4 기반으로 비개발 직군이 AI 도구를 활용하여 만든 UI 프로토타입을 호스팅합니다.

## 기술 스택

- **Framework**: Nuxt 4
- **Language**: TypeScript
- **UI**: Vue 3

## 프로젝트 구조

```
packages/web/
├── app/
│   └── app.vue          # Root component
├── public/              # 정적 파일
├── nuxt.config.ts       # Nuxt 설정
├── package.json
├── project.json         # Nx 타겟 정의
└── tsconfig.json
```

## 개발 환경 설정

pnpm 워크스페이스 루트에서 실행합니다:

```bash
# 의존성 설치 (루트)
pnpm install

# 개발 서버 실행 (localhost:3000)
npx nx dev web

# 프로덕션 빌드
npx nx build web

# 빌드 결과 미리보기
npx nx preview web

# 정적 사이트 생성
npx nx generate web
```

## 관련 문서

- [AGENTS.md](./AGENTS.md) — 에이전트 개발 가이드
- [CONTRIBUTING.md](../../CONTRIBUTING.md) — 커밋 규칙 및 코드 스타일
