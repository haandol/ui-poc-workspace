# UI PoC Workshop Project Guide

A monorepo for non-technical UI PoC workshops. Provides a workflow from asset generation to web prototyping using AI tools (MCP servers).

## Repository Structure

| Package                                                            | Description                              | Tech                      |
| ------------------------------------------------------------------ | ---------------------------------------- | ------------------------- |
| [`packages/web`](./packages/web/AGENTS.md)                         | Nuxt 4 web application (UI PoC frontend) | TypeScript, Vue 3, Nuxt 4 |
| [`packages/asset-generator`](./packages/asset-generator/AGENTS.md) | MCP server — asset generation tool       | TypeScript, MCP SDK       |
| [`packages/workshop`](./packages/workshop/)                        | Workshop materials and documentation     | Markdown                  |

## Design System

- [`DESIGN.md`](./DESIGN.md) — machine-readable design tokens (colors, typography, shapes, components). Read first for all UI work in `packages/web`.
- [`docs/design/`](./docs/design/) — implementation patterns: [layout](./docs/design/layout.md), [components](./docs/design/components.md), [interaction](./docs/design/interaction.md).

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
- Prefer early return: handle errors and edge cases first, then proceed with the main logic at minimal indentation depth

### Sub-Agent Delegation

This monorepo has different toolchains per package. **The main agent acts as an orchestrator and delegates package-specific work to sub-agents.** Each sub-agent reads its own AGENTS.md, runs commands from its own directory, and never cross-applies patterns from other packages.

#### Sub-Agent Definitions

| Sub-Agent           | Directory                   | AGENTS.md                                    | Language              | Build/Lint                     |
| ------------------- | --------------------------- | -------------------------------------------- | --------------------- | ------------------------------ |
| **Web**             | `packages/web/`             | [link](./packages/web/AGENTS.md)             | TypeScript (Vue/Nuxt) | `npx nx build web`             |
| **Asset Generator** | `packages/asset-generator/` | [link](./packages/asset-generator/AGENTS.md) | TypeScript (MCP)      | `npx nx build asset-generator` |

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

1. **Sync ADR** — If the **architectural decision itself** changed, update the ADR (change status to `Accepted`). Do NOT add implementation details (file paths, code snippets, field schemas) to ADRs — ADRs describe decisions and rationale only
2. **Update README index** — Keep the `docs/adr/README.md` ADR list up to date
3. **Cascade updates** — If changes affect other ADRs, update those as well
4. **Add Mermaid diagrams** — When the ADR involves non-trivial flows (state machines, multi-component interactions, event sequences), include a Mermaid diagram to make the flow easy to understand at a glance

#### ALPS PRD Feature → ADR Mandatory Workflow (MANDATORY)

When implementing Features (F1, F2, …) defined in the ALPS PRD document, you **must** follow the protocol below.

```
Review PRD Feature → Write ADR (Proposed) → User Confirmation → Start Implementation → Sync ADR (Accepted)
```

1. **Review PRD Feature** — Check the Feature ID and priority in ALPS PRD Section 6 (Requirements Summary), and read the User Story, User Flow, Technical Description, and Acceptance Criteria in Section 7 (Feature-Level Specification).
2. **Write ADR (Required before implementation)**
   - Create an ADR file in the appropriate category directory under `docs/adr/`.
   - Include the PRD Feature ID in the ADR title (e.g., `0001-f1-email-signup.md`).
   - Specify PRD Feature references (Feature ID, priority) in the ADR Context.
   - Record the implementation direction and technical decisions in the ADR Decision.
   - Start with status `Proposed`.
3. **User Confirmation** — Present the ADR content to the user and only begin code implementation after receiving confirmation.
4. **Implementation** — Implement code following the direction decided in the ADR.
5. **Sync ADR** — Once implementation is complete, change the ADR status to `Accepted` and update the ADR if the **architectural decision itself** changed. Do NOT add implementation details (file paths, code snippets, field schemas). Also update the `docs/adr/README.md` index.

**Violation Prevention**: Feature code implementation (creating components, adding API endpoints, writing pages, etc.) cannot start without an ADR. If asked to implement a Feature that has no ADR, you must propose writing the ADR first.

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

## Workshop Progress Tracking (Mandatory)

This is a workshop repository. The agent **must** automatically report progress to Airtable at every stage transition. Skip silently if Airtable is not configured (no `.workshop-participant` file or no Airtable MCP server).

### Stage Transition Triggers

After each triggering action completes successfully, the agent must run `/workshop-status <MILESTONE_ID>` **automatically without asking the user**.

| Trigger Condition                                   | Milestone ID    |
| --------------------------------------------------- | --------------- |
| `pnpm install` succeeds + dev server verified       | `SETUP-DONE`    |
| PDF file saved to `docs/`                           | `RESEARCH-DONE` |
| ALPS Section 1 saved (`save_alps_section`)          | `PRD-START`     |
| ALPS Section 6 saved (`save_alps_section`)          | `PRD-FEATURES`  |
| ALPS Section 9 saved (`save_alps_section`)          | `PRD-DONE`      |
| `layouts/` directory created in `packages/web/app/` | `SCAFFOLD-DONE` |
| Feature N implementation committed (`git commit`)   | `FN-DONE`       |
| All core features implemented + user confirms       | `DEMO-READY`    |

### Rules

- Report each milestone **once**. Do not re-report a milestone already recorded.
- Execute the status update **after** the triggering action, not before.
- On failure (Airtable API error, network issue), log the error but do not retry or block.

---

## Nx Workspace

This project uses [Nx](https://nx.dev) for monorepo management with pnpm workspace.

### Common Commands

```bash
npx nx dev web                    # Web dev server
npx nx build web                  # Build web
npx nx build asset-generator      # Build Asset Generator
npx nx run-many -t build          # Build all projects
npx nx run-many -t lint           # Lint all projects
npx nx run-many -t format         # Format all projects
npx nx run-many -t format:check   # Check formatting
npx nx graph                      # Dependency graph
npx nx affected -t build          # Build affected projects only
```

### Project Configuration

Each package has a `project.json` defining its Nx targets. The root `nx.json` sets shared defaults:

- **build**: Depends on `^build` (upstream first), cached
- **dev**: Not cached (long-running)
- **start**: Depends on `build`
- **lint / typecheck**: Cached

### Linting & Formatting

- **ESLint**: Root `eslint.config.mjs` defines shared TypeScript rules. Each package extends it (packages/web adds Vue rules).
- **Prettier**: Root `.prettierrc` for shared config. `packages/web/.prettierrc` overrides `singleAttributePerLine: true` for Vue templates.
- **Pre-commit hook**: husky + lint-staged runs `eslint --fix` and `prettier --write` on staged files automatically.

### Windows PowerShell Script Encoding

Keep `.ps1` files ASCII-only. PowerShell 5.1 (the Windows default) reads `.ps1` files using the system default encoding (CP949 on Korean Windows), which mangles non-ASCII characters unless the file is saved with a UTF-8 BOM. Avoiding non-ASCII entirely sidesteps the problem — don't add Korean text, box-drawing characters, or status glyphs (▸/✓/⚠) to these scripts.
