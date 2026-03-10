# Asset Generator MCP Server Package Guide

## Overview

An MCP (Model Context Protocol) server that provides asset generation tools.
Compatible with MCP-enabled clients such as Claude Code, Kiro, and Cursor.

## Directory Structure

```
packages/asset-generator/
├── src/
│   ├── index.ts                  # Entry point
│   ├── server.ts                 # MCP server setup + tool registration
│   ├── di/
│   │   └── container.ts          # Dependency injection container
│   ├── tools/
│   │   └── templates/            # Template tools
│   │       ├── controller.ts     # MCP interface
│   │       ├── service.ts        # Business logic
│   │       └── repository.ts     # External environment integration
│   └── interfaces/
│       └── constants.ts          # Constants definition
├── package.json
├── tsconfig.json
└── project.json
```

## Technology Stack

- **Protocol**: Model Context Protocol (MCP)
- **Language**: TypeScript
- **Runtime**: Node.js
- **MCP SDK**: @modelcontextprotocol/sdk
- **Package Manager**: pnpm

## Development Commands

```bash
# Install dependencies
pnpm install

# Run in development mode
pnpm dev

# Build
pnpm build

# Run built server
pnpm start
```

## Architecture

Uses the Controller-Service-Repository pattern:

- **Controller**: MCP tool interface (registers tools on McpServer)
- **Service**: Business logic
- **Repository**: External environment integration
- **DIContainer**: Loose coupling through dependency injection
