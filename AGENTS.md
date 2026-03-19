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
1. Review/Create ADR → 2. Implement feature → 3. Build verification → 4. Debug if bugs arise → 5. Sync ADR → 6. Commit
```

- **New feature**: Read the relevant ADR first. If none exists, create one.
- **Bug fix**: Identify root cause, fix, and verify build.
- **Before commit**: If changes diverge from an ADR, update it.
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

`docs/adr/` — Creating or updating ADRs is mandatory for new features and major changes.

## Documentation Maintenance

- Keep ADR index (`docs/adr/README.md`) in sync
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
