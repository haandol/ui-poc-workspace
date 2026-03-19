# UI PoC Workshop Project Guide

A monorepo for non-technical UI PoC workshops. Provides a workflow from PRD writing to asset generation and web prototyping using AI tools (MCP servers).

## Repository Structure

| Package | Description | Tech |
|---------|-------------|------|
| [`packages/web`](./packages/web/AGENTS.md) | Nuxt 4 web application (UI PoC frontend) | TypeScript, Vue 3, Nuxt 4 |
| [`packages/prd-writer`](./packages/prd-writer/AGENTS.md) | MCP server — template-based PRD document writing tool | TypeScript, MCP SDK |
| [`packages/asset-generator`](./packages/asset-generator/AGENTS.md) | MCP server — asset generation tool | TypeScript, MCP SDK |
| [`packages/workshop`](./packages/workshop/) | Workshop materials and documentation | Markdown |

## Quick Start

```bash
pnpm install          # Install all dependencies
```

Per-package dev/build/deploy commands: see each package's AGENTS.md.

## Agent Work Protocol

### Development Cycle

```
1. Review/Create ADR → 2. Implement feature → 3. Build verification → 4. Debug if needed → 5. Sync ADR → 6. Commit
```

- **New feature**: You MUST read the relevant ADR first or create a new one before starting implementation. (See "ADR Workflow" section for details.)
- **Bug fix**: Identify root cause, fix, and verify build. No ADR update needed if there is no architectural change.
- **Before commit**: If implementation diverges from an ADR, you MUST update the ADR and the `docs/adr/README.md` index.
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

### ADR Workflow

#### Before Implementation (Required)

1. **Check existing ADRs** — Read the `docs/adr/README.md` index and check if a related ADR exists
2. **Create or review ADR**
   - If no related ADR exists → Create a new ADR based on `docs/adr/TEMPLATE.md` (status: `Proposed`)
   - If a related ADR exists → Read it and verify the current implementation direction aligns
3. **Scope implementation to ADR** — Follow the Decision described in the ADR

#### After Implementation (Required)

1. **Sync ADR** — If implementation differs from the ADR, update it (change status to `Accepted`)
2. **Update README index** — Keep the `docs/adr/README.md` ADR list up to date
3. **Cascade updates** — If changes affect other ADRs, update those as well

#### When ADR is Not Required

The following changes can skip ADR creation/update:
- Simple bug fixes (no architectural change)
- Style/formatting changes
- Documentation typo fixes
- Dependency patch version updates

For directory structure, file naming, templates, and writing rules, refer to [`docs/adr/README.md`](./docs/adr/README.md).

## Documentation Maintenance

- Keep ADR index (`docs/adr/README.md`) in sync — always update the index table when adding/modifying ADRs
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
