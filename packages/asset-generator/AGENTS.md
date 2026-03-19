# AGENTS.md

Asset Generator — fal.ai 기반 이미지 생성 MCP 서버. 텍스트 프롬프트로 qwen-image-2.0 모델을 통해 이미지를 생성한다. `non-tech-ui-poc-workshop` 모노레포의 일부.

**Tech Stack**: TypeScript 5.9+, Node.js >= 20, pnpm, MCP SDK (`@modelcontextprotocol/sdk`), Zod, fal.ai Client (`@fal-ai/client`)

## Commands

```bash
pnpm install          # Install dependencies
pnpm build            # Compile TypeScript (tsc)
pnpm dev              # Run with tsx (development)
pnpm start            # Run built version (node dist/index.js)
```

No test framework configured.

## Environment Variables

| Variable | Required | Description |
|----------|----------|-------------|
| `FAL_KEY` | Yes | fal.ai API key for image generation |

## Repository Structure

```
src/
├── index.ts              # Entry point (creates server + starts StdioServerTransport)
├── server.ts             # MCP server setup + tool registration
├── di/
│   └── container.ts      # Dependency injection container (lazy singletons)
├── tools/
│   └── templates/        # Image generation tools (controller + service + repository)
│       ├── controller.ts # MCP tool interface
│       ├── service.ts    # Business logic (prompt handling, fal.ai API call)
│       └── repository.ts # External environment integration (fal.ai client, filesystem)
└── interfaces/
    └── constants.ts      # Server name, version, model constants
```

## Architecture

**MCP Server** (`src/server.ts`) — Creates `McpServer` instance, registers all tools via controllers, connects via `StdioServerTransport`. Entry point (`src/index.ts`) is a thin wrapper that calls `createServer().start()`.

**Controller/Service/Repository pattern** — Three-layer separation:

- **Controller** — MCP tool interface (registers tools with Zod schemas on McpServer)
- **Service** — Business logic (prompt construction, image generation orchestration)
- **Repository** — External environment integration (fal.ai API client, filesystem operations)
- **DIContainer** (`src/di/container.ts`) — Lazy singleton injection for all layers

**Image Generation Flow**:

1. Controller receives text prompt via MCP tool call
2. Service constructs request parameters for qwen-image-2.0
3. Repository calls fal.ai API (`fal-ai/qwen-image-2.0`) and returns generated image
4. Controller returns image result to MCP client

**Key Dependencies**:

- `@fal-ai/client` — fal.ai API client for image generation
- `@modelcontextprotocol/sdk` — MCP server framework
- `zod` — Input validation for MCP tool schemas

## Conventions

- TypeScript strict mode, ES modules (`"type": "module"`)
- Node.js >= 20
- pnpm as package manager
- Conventional Commits (details: root [CONTRIBUTING.md](../../CONTRIBUTING.md))
- Scopes: `asset-generator`, `image`, `deps`
- Branch naming: `<type>/<short-description>` (e.g., `feat/generate-image-tool`)

## Definition of Done

Verify before completing any task:

1. `pnpm build` succeeds (or `npx nx build asset-generator` from root)
2. Related docs (README.md, AGENTS.md) are up to date

## Do-Not Rules

- Do not hardcode fal.ai API keys — always read from environment variable (`FAL_KEY`)
- Do not modify `dist/` directly — always generate via `pnpm build`
- Do not bypass git hooks with `--no-verify`
- Do not delete or modify tests to make them pass — fix the code instead

## References

- [README.md](./README.md) — Usage guide, tool reference
- [Root AGENTS.md](../../AGENTS.md) — Monorepo overview, agent work protocol
- [CONTRIBUTING.md](../../CONTRIBUTING.md) — Commit messages, branching, code style, PR rules
- [fal.ai docs](https://fal.ai/models/fal-ai/qwen-image-2.0) — qwen-image-2.0 model reference
