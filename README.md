# Non-Tech UI PoC Workshop

비개발 직군을 위한 UI PoC 워크숍 모노레포입니다. AI 도구(MCP 서버)를 활용하여 PRD 작성부터 에셋 생성, 웹 프로토타이핑까지의 워크플로우를 제공합니다.

## 📦 패키지 개요

- **`packages/web`** – Nuxt 4 기반 웹 애플리케이션. UI PoC의 프론트엔드를 담당합니다. 주요 스택: TypeScript, Vue 3.
- **`packages/prd-writer`** – MCP(Model Context Protocol) 서버로, 템플릿 기반 PRD 문서 작성 도구를 제공합니다. Claude Code, Kiro, Cursor 등 MCP 호환 클라이언트에서 사용할 수 있습니다. 주요 스택: Python 3.13+, uv.
- **`packages/asset-generator`** – MCP 서버로, 에셋 생성 도구를 제공합니다. MCP 호환 클라이언트에서 사용할 수 있습니다. 주요 스택: Python 3.13+, uv.
- **`packages/workshop`** – 워크숍 진행에 필요한 문서와 자료를 포함합니다.

## 🚀 빠른 시작

```bash
pnpm install
```

### 웹 앱 (packages/web)

```bash
# 개발 서버
npx nx dev web

# 빌드
npx nx build web

# 정적 사이트 생성
npx nx generate web

# 빌드 결과 미리보기
npx nx preview web
```

### PRD Writer MCP 서버 (packages/prd-writer)

```bash
# 의존성 설치
npx nx run prd-writer:install

# MCP 서버 실행
npx nx run prd-writer:run

# 린트 / 타입체크
npx nx lint prd-writer
npx nx typecheck prd-writer
```

### Asset Generator MCP 서버 (packages/asset-generator)

```bash
# 의존성 설치
npx nx run asset-generator:install

# MCP 서버 실행
npx nx run asset-generator:run

# 린트 / 타입체크
npx nx lint asset-generator
npx nx typecheck asset-generator
```

### 기타

```bash
# 의존 관계 그래프 확인
npx nx graph
```

개별 패키지 명령은 `npx nx run <project>:<target>` 형식으로도 실행할 수 있습니다. Nuxt 프로젝트는 `dev`, `build`, `generate`, `preview` 타겟을, Python MCP 서버는 `install`, `run`, `lint`, `typecheck` 타겟을 제공합니다.

## 📚 문서

- [워크숍 런북](./docs/WORKSHOP.md) – 워크숍 타임테이블 및 진행 가이드
- [개발 환경 설치 가이드](./docs/INSTALLATION.md) – Git, Node.js, VS Code, pnpm, Claude Code 설치
- [Claude Code Bedrock 설정](./docs/CLAUDE_CODE_SETUP.md) – Amazon Bedrock 연동 설정
- **패키지별 AGENTS**: 각 패키지의 AGENTS.md에서 세부 지침 확인 (예: [packages/prd-writer/AGENTS.md](./packages/prd-writer/AGENTS.md))

## 🧭 참고

- 패키지/기능을 수정할 때는 관련 ADR을 먼저 검토하고, 변경 사항이 설계에 영향을 주면 새로운 ADR을 작성하거나 기존 문서를 갱신합니다.
- MCP 서버 패키지는 Controller-Service-Repository 패턴과 DIContainer를 사용합니다.
