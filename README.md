# Non-Tech UI PoC Workshop

비개발 직군을 위한 UI PoC 워크숍 모노레포입니다. AI 도구(MCP 서버)를 활용하여 PRD 작성부터 에셋 생성, 웹 프로토타이핑까지의 워크플로우를 제공합니다.

## 패키지 구조

| Package | Description | Tech |
|---------|-------------|------|
| [`packages/web`](./packages/web/) | Nuxt 4 기반 웹 애플리케이션 (UI PoC 프론트엔드) | TypeScript, Vue 3 |
| [`packages/prd-writer`](./packages/prd-writer/) | MCP 서버 — 템플릿 기반 PRD 문서 작성 도구 | TypeScript, MCP SDK |
| [`packages/asset-generator`](./packages/asset-generator/) | MCP 서버 — 에셋 생성 도구 | TypeScript, MCP SDK |
| [`packages/workshop`](./packages/workshop/) | 워크숍 진행 문서 및 자료 | Markdown |

## 빠른 시작

```bash
pnpm install
```

## 주요 명령어

### 웹 앱

```bash
npx nx dev web          # 개발 서버
npx nx build web        # 빌드
npx nx generate web     # 정적 사이트 생성
npx nx preview web      # 빌드 결과 미리보기
```

### MCP 서버

```bash
# PRD Writer
npx nx dev prd-writer       # 개발 모드 실행
npx nx build prd-writer     # 빌드
npx nx start prd-writer     # 빌드된 서버 실행

# Asset Generator
npx nx dev asset-generator       # 개발 모드 실행
npx nx build asset-generator     # 빌드
npx nx start asset-generator     # 빌드된 서버 실행
```

### 공통

```bash
npx nx run-many -t build    # 전체 빌드
npx nx affected -t build    # 변경된 프로젝트만 빌드
npx nx graph                # 의존 관계 그래프
```

## 문서

- [워크숍 런북](./docs/WORKSHOP.md) — 워크숍 타임테이블 및 진행 가이드
- [개발 환경 설치 가이드](./docs/INSTALLATION.md) — Git, Node.js, VS Code, pnpm, Claude Code 설치
- [Claude Code Bedrock 설정](./docs/CLAUDE_CODE_SETUP.md) — Amazon Bedrock 연동 설정
- **패키지별 AGENTS**: 각 패키지의 AGENTS.md에서 세부 지침 확인

## 참고

- 패키지/기능을 수정할 때는 관련 ADR을 먼저 검토하고, 변경 사항이 설계에 영향을 주면 새로운 ADR을 작성하거나 기존 문서를 갱신합니다.
- MCP 서버 패키지는 Controller-Service-Repository 패턴과 DIContainer를 사용합니다.
- 커밋 규칙 및 코드 스타일은 [CONTRIBUTING.md](./CONTRIBUTING.md)를 참조합니다.
