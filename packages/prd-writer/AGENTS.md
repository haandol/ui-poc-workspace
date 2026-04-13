# AGENTS.md

PRD Writer — Interactive PRD (Product Requirements Document) writing tool based on MCP server. Part of the `non-tech-ui-poc-workshop` monorepo.

**Tech Stack**: TypeScript 5.9+, Node.js >= 20, pnpm, MCP SDK (`@modelcontextprotocol/sdk`), Zod

## Commands

```bash
pnpm install          # Install dependencies
pnpm build            # Compile TypeScript + copy templates & guides to dist/
pnpm dev              # Run with tsx (development)
pnpm start            # Run built version (node dist/index.js)
npx nx lint prd-writer      # Lint
npx nx format prd-writer    # Format
```

Build runs `tsc && cp -r src/templates src/guides dist/` to copy static assets (XML templates, MD guides) into `dist/`. Required because the server reads them at runtime via `fs.readFileSync`.

No test framework configured.

## Repository Structure

```
src/
├── index.ts              # Entry point (creates server + starts StdioServerTransport)
├── server.ts             # MCP server setup + tool registration
├── di/
│   └── container.ts      # Dependency injection container (lazy singletons)
├── tools/
│   ├── templates/        # Template tools (controller + service + repository)
│   └── documents/        # Document tools (controller + service + repository)
├── interfaces/
│   └── constants.ts      # Section titles, dependencies, file paths
├── guides/               # Section conversation guides (01-09.md)
└── templates/
    ├── overview.md       # PRD overview
    └── chapters/         # Per-section XML templates (01-09.xml)
```

## Architecture

**MCP Server** (`src/server.ts`) — Creates `McpServer` instance, registers all tools via controllers, connects via `StdioServerTransport`. Entry point (`src/index.ts`) is a thin wrapper that calls `createServer().start()`.

**Controller/Service/Repository pattern** — Three-layer separation per domain:

- **Controller** — MCP tool interface (registers tools with Zod schemas on McpServer)
- **Service** — Business logic (parsing, building, exporting documents)
- **Repository** — External environment integration (filesystem read/write)
- **DIContainer** (`src/di/container.ts`) — Lazy singleton injection for all layers

Two domains:

- `src/tools/templates/` — Read-only access to PRD templates and conversation guides
- `src/tools/documents/` — Document CRUD (init, load, save, read, export) with state management

**Constants** (`src/interfaces/constants.ts`) — Centralized section metadata: titles (1-9), dependency graph (`SECTION_REFERENCES`), `__dirname`-based filesystem paths.

**Static assets** (read from filesystem at runtime):

- `src/templates/chapters/01-09.xml` — XML section templates
- `src/templates/overview.md` — PRD overview
- `src/guides/01-09.md` — Per-section conversation guides

**Document format** — Stored as `.prd.xml` files with `<prd-document>`, `<section>`, `<subsection>` tags. Parsed via regex (no XML parser library). Output directory controlled by environment or user-specified path.

**DocumentService state** — `workingDoc` holds the current document path in memory. Read/write operations require `initDocument()` or `loadDocument()` to be called first.

## Conventions

- TypeScript strict mode, ES modules (`"type": "module"`)
- Node.js >= 20
- pnpm as package manager
- Conventional Commits (details: root [CONTRIBUTING.md](../../CONTRIBUTING.md))
- Scopes: `prd-writer`, `templates`, `documents`, `guides`, `deps`
- Branch naming: `<type>/<short-description>` (e.g., `feat/section-validation`)

## Definition of Done

Verify before completing any task:

1. `npx nx lint prd-writer` passes
2. `pnpm build` succeeds (or `npx nx build prd-writer` from root)
3. Related docs (README.md, AGENTS.md) are up to date

## Do-Not Rules

- Do not introduce XML parser libraries — maintain current regex-based parsing
- Do not auto-generate content in `src/templates/` or `src/guides/` — manually curated
- Do not modify `dist/` directly — always generate via `pnpm build`
- Do not bypass git hooks with `--no-verify`
- Do not delete or modify tests to make them pass — fix the code instead

## References

- [README.md](./README.md) — Usage guide, tool reference, document format
- [Root AGENTS.md](../../AGENTS.md) — Monorepo overview, agent work protocol
- [CONTRIBUTING.md](../../CONTRIBUTING.md) — Commit messages, branching, code style, PR rules
