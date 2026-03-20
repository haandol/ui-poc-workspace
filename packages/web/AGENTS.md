# AGENTS.md

## Sub-Agent Bootstrap

> **Read this section first when delegated a task from the main orchestrator agent.**

You are the **Web sub-agent** for the UI PoC Workshop monorepo. Your scope is limited to `packages/web/`.

### Context Setup

1. You are in `packages/web/` — all file paths and shell commands are relative to this directory.
2. This is a **Nuxt 4** application with **TypeScript** and **Vue 3**.
3. Read the design system rules in `docs/` before modifying UI components.
4. Read the root [CONTRIBUTING.md](../../CONTRIBUTING.md) for commit and code style rules.

### Verification (run before reporting back)

```bash
cd packages/web
npx eslint --fix <changed-files>     # lint + auto-fix
npx prettier --write <changed-files> # format
pnpm build                           # verify build
```

### Constraints

- Use Vue 3 Composition API with `<script setup lang="ts">`.
- Follow the design system strictly — see `docs/design-system.md`.
- Use `dark:` directive for dark mode. Never use `[data-theme="dark"]` or `:global(.dark)`.
- Do not apply MCP server conventions to this package.
- Always run lint and format on changed files before committing.

---

## Project Overview

UI PoC 워크숍용 웹 프론트엔드. 비개발 직군이 AI 도구를 활용하여 만든 UI 프로토타입을 호스팅합니다.

### Tech Stack

- **Framework**: Nuxt 4 | **Language**: TypeScript
- **UI**: Vue 3, TailwindCSS + DaisyUI 5
- **State**: Pinia
- **Package Manager**: pnpm (workspace)

## Documentation

- **Design system & conventions**: `docs/` (design-system, design-principle, layout, styling, project, composables, store)
- **ADRs**: `docs/adr/`

## Quick Start

```bash
npx nx dev web          # Development server (localhost:3000)
npx nx build web        # Production build
npx nx generate web     # Static site generation
npx nx preview web      # Preview production build
```

## Project Structure

```
packages/web/
├── app/
│   └── app.vue              # Root component
├── docs/           # Design system & coding rules
│   ├── design-system.md    # Complete design system
│   ├── design-principle.md # Design philosophy
│   ├── layout.md           # Layout & responsive guidelines
│   ├── styling.md          # Styling guidelines
│   ├── project.md          # Project guidelines
│   ├── composables.md      # Composables guide
│   └── store.md            # Pinia store guide
├── public/                  # Static files
├── nuxt.config.ts           # Nuxt configuration
├── package.json
├── project.json             # Nx target definitions
└── tsconfig.json
```

## Common Mistakes to Avoid

- Using `input-bordered` (causes double borders)
- Adding hover effects to non-interactive elements
- Multiple accent colors on same screen / heavy shadows / springy animations
- Pure black backgrounds (use deep gray in dark mode)

## Approach with Caution

`nuxt.config.ts`, environment variable references.

## Documentation Maintenance

- ADR required for new/major features → create/update in `docs/adr/`
- Update `docs/*.md` when adding major features
- Update this AGENTS.md when adding major features or changing project structure
