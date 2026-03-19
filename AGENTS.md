# UI PoC Workshop Project Guide

비개발 직군을 위한 UI PoC 워크숍 모노레포. AI 도구(MCP 서버)를 활용하여 PRD 작성부터 에셋 생성, 웹 프로토타이핑까지의 워크플로우를 제공합니다.

## Repository Structure

| Package | Description | Tech |
|---------|-------------|------|
| [`packages/web`](./packages/web/AGENTS.md) | Nuxt 4 기반 웹 애플리케이션 (UI PoC 프론트엔드) | TypeScript, Vue 3, Nuxt 4 |
| [`packages/prd-writer`](./packages/prd-writer/AGENTS.md) | MCP 서버 — 템플릿 기반 PRD 문서 작성 도구 | TypeScript, MCP SDK |
| [`packages/asset-generator`](./packages/asset-generator/AGENTS.md) | MCP 서버 — 에셋 생성 도구 | TypeScript, MCP SDK |
| [`packages/workshop`](./packages/workshop/) | 워크숍 진행 문서 및 자료 | Markdown |

## Quick Start

```bash
pnpm install          # Install all dependencies
```

Per-package dev/build/deploy commands: see each package's AGENTS.md.

## Agent Work Protocol

### Development Cycle

```
1. ADR 확인/작성 → 2. 기능 구현 → 3. 빌드 검증 → 4. 버그 수정 → 5. ADR 동기화 → 6. 커밋
```

- **New feature**: 반드시 관련 ADR을 먼저 읽거나 새로 작성한 뒤 구현을 시작한다. (상세: "ADR 워크플로우" 섹션 참조)
- **Bug fix**: 원인 파악, 수정, 빌드 검증. 아키텍처 변경이 없으면 ADR 수정 불필요.
- **Before commit**: 구현 결과가 ADR과 다르면 ADR을 반드시 수정하고, `docs/adr/README.md` 인덱스도 업데이트한다.
- **Rollback**: If build fails, `git stash` or `git checkout -- <file>` and retry in smaller increments. Never `git reset --hard` or force push without user confirmation.

### Principles

- Focus on one feature/bug at a time
- Break large changes into atomic commits (see [CONTRIBUTING.md](./CONTRIBUTING.md))
- Code must be buildable at session end
- Write descriptive commit messages so the next session can understand progress from `git log` alone
- Update ADRs when architectural decisions change; skip for simple bug fixes or style changes

### Sub-Agent Delegation

This monorepo has different toolchains per package. **The main agent acts as an orchestrator and delegates package-specific work to sub-agents.** Each sub-agent reads its own AGENTS.md, runs commands from its own directory, and never cross-applies patterns from other packages.

#### Sub-Agent Definitions

| Sub-Agent | Directory | AGENTS.md | Language | Build/Lint |
|-----------|-----------|-----------|----------|------------|
| **Web** | `packages/web/` | [link](./packages/web/AGENTS.md) | TypeScript (Vue/Nuxt) | `npx nx build web` |
| **PRD Writer** | `packages/prd-writer/` | [link](./packages/prd-writer/AGENTS.md) | TypeScript (MCP) | `npx nx build prd-writer` |
| **Asset Generator** | `packages/asset-generator/` | [link](./packages/asset-generator/AGENTS.md) | TypeScript (MCP) | `npx nx build asset-generator` |

#### Orchestrator Responsibilities

1. **Plan** — Read ADRs, define scope, identify affected packages
2. **Delegate** — Pass each sub-agent a clear task with constraints
3. **Integrate** — Review combined changes for consistency, then commit

## Architecture Decision Records

`docs/adr/` — 새 기능 추가 및 주요 변경 시 ADR 작성/수정이 필수입니다.

### ADR 워크플로우

#### 구현 전 (필수)

1. **기존 ADR 확인** — `docs/adr/README.md` 인덱스를 읽고, 관련 ADR이 있는지 확인
2. **ADR 작성 또는 확인**
   - 관련 ADR이 없으면 → `docs/adr/TEMPLATE.md`를 기반으로 새 ADR 작성 (상태: `proposed`)
   - 관련 ADR이 있으면 → 해당 ADR을 읽고 현재 구현 방향과 일치하는지 확인
3. **구현 범위를 ADR에 맞춰 결정** — ADR에 기술된 Decision을 따라 구현

#### 구현 후 (필수)

1. **ADR 동기화** — 구현 결과가 ADR과 다르면 ADR을 수정 (상태를 `accepted`로 변경)
2. **README 인덱스 업데이트** — `docs/adr/README.md`의 ADR 목록 테이블을 최신 상태로 유지
3. **관련 ADR 연쇄 수정** — 변경이 다른 ADR에 영향을 주면 해당 ADR도 함께 수정

#### ADR이 불필요한 경우

다음은 ADR 작성/수정을 건너뛸 수 있습니다:
- 단순 버그 수정 (아키텍처 변경 없음)
- 스타일/포맷팅 변경
- 문서 오타 수정
- 의존성 패치 버전 업데이트

### ADR 디렉토리 구조

```
docs/adr/
├── web/              # 웹 프론트엔드 관련 결정
├── prd-writer/       # PRD Writer MCP 서버 관련 결정
├── asset-generator/  # Asset Generator MCP 서버 관련 결정
├── workshop/         # 워크숍 운영/콘텐츠 관련 결정
├── infra/            # 인프라/빌드/배포 관련 결정
├── TEMPLATE.md       # ADR 템플릿
└── README.md         # ADR 인덱스 (카테고리별 목록)
```

### ADR 파일 규칙

- 파일명: `XXXX-kebab-case-title.md` (예: `0001-use-nuxt4-for-web.md`)
- 번호는 카테고리 내에서 순차적으로 증가
- 템플릿: `docs/adr/TEMPLATE.md`
- 인덱스: `docs/adr/README.md` — 카테고리별 ADR 목록을 관리

### ADR 작성 규칙

- ADR에는 **구현 파일 경로를 포함하지 않는다.** ADR은 아키텍처 결정(Context, Decision, Consequences)을 기록하는 문서이며, 실제 수정할 파일 목록은 구현 시점에 코드베이스를 직접 확인하여 결정한다.
- 기존 ADR 중 구현 파일 경로가 포함된 것은 해당 ADR이 업데이트될 때 점진적으로 제거한다.

## Documentation Maintenance

- Keep ADR index (`docs/adr/README.md`) in sync — ADR 추가/수정 시 반드시 인덱스 테이블 업데이트
- Update relevant AGENTS.md when adding major features or changing project structure

## Nx Workspace

This project uses [Nx](https://nx.dev) for monorepo management with pnpm workspace.

### Common Commands

```bash
npx nx dev web                    # Web dev server
npx nx build web                  # Build web
npx nx build prd-writer           # Build PRD Writer
npx nx build asset-generator      # Build Asset Generator
npx nx run-many -t build          # Build all projects
npx nx graph                      # Dependency graph
npx nx affected -t build          # Build affected projects only
```

### Project Configuration

Each package has a `project.json` defining its Nx targets. The root `nx.json` sets shared defaults:

- **build**: Depends on `^build` (upstream first), cached
- **dev**: Not cached (long-running)
- **start**: Depends on `build`
- **lint / typecheck**: Cached
