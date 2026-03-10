# PRD Writer MCP Server

MCP server that provides template-based PRD (Product Requirements Document) authoring tools.

## Installation

```bash
cd packages/prd-writer
pnpm install
pnpm build
```

## Usage

### Run as stdio server

```bash
pnpm start
```

### Development mode

```bash
pnpm dev
```

### Configure in Claude Code

User scope (`~/.claude/.mcp.json`):

```json
{
  "mcpServers": {
    "prd-writer": {
      "command": "node",
      "args": ["/path/to/packages/prd-writer/dist/index.js"],
      "type": "stdio"
    }
  }
}
```

Project scope (`.mcp.json` in project root):

```json
{
  "mcpServers": {
    "prd-writer": {
      "command": "node",
      "args": ["./packages/prd-writer/dist/index.js"],
      "type": "stdio"
    }
  }
}
```

## Available Tools

### Template Tools

| Tool | Description |
| --- | --- |
| `get_prd_overview` | Get the PRD template overview with all section descriptions |
| `list_prd_sections` | List all available PRD template sections |
| `get_prd_section` | Get a specific PRD template section by number (1-9) |
| `get_prd_full_template` | Get the complete PRD template with all sections combined |
| `get_prd_section_guide` | Get conversation guide for writing a specific section |

### Document Management Tools

| Tool | Description |
| --- | --- |
| `init_prd_document` | Create new PRD document (`.prd.xml` file) |
| `load_prd_document` | Load existing document to resume editing |
| `save_prd_section` | Save content to a subsection in the document |
| `read_prd_section` | Read current content of a section or subsection |
| `get_prd_document_status` | Get status of all sections |
| `export_prd_markdown` | Export as clean markdown (without XML tags) |

## Sections

| # | Title |
| --- | --- |
| 1 | Overview |
| 2 | MVP Goals and Key Metrics |
| 3 | Demo Scenario |
| 4 | High-Level Architecture |
| 5 | Design Specification |
| 6 | Requirements Summary |
| 7 | Feature-Level Specification |
| 8 | MVP Metrics |
| 9 | Out of Scope |

## Document Format

The PRD document uses XML format for storage and reliable section parsing:

```xml
<prd-document>
# Project Name PRD

<section id="1">
## Section 1. Overview

Content here...
</section>

<section id="2">
## Section 2. MVP Goals and Key Metrics

Content here...
</section>

...
</prd-document>
```

- Storage format: `.prd.xml` (XML with section tags)
- Output format: Clean markdown via `export_prd_markdown()`

## Project Structure

```
src/
├── index.ts                  # Entry point
├── server.ts                 # MCP server setup + tool registration
├── di/
│   └── container.ts          # Dependency injection container
├── tools/
│   ├── templates/            # Template tools
│   │   ├── controller.ts     # MCP interface
│   │   ├── service.ts        # Business logic
│   │   └── repository.ts     # File system access
│   └── documents/            # Document management tools
│       ├── controller.ts
│       ├── service.ts
│       └── repository.ts
├── interfaces/
│   └── constants.ts          # SECTION_TITLES, SECTION_REFERENCES, paths
├── guides/                   # Section guides (01.md ~ 09.md)
└── templates/
    ├── overview.md
    └── chapters/
        └── 01-overview.md ~ 09-out-of-scope.md
```
