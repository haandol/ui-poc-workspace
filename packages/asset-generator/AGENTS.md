# Asset Generator MCP Server Package Guide

## Overview

An MCP (Model Context Protocol) server that provides asset generation tools.
Compatible with MCP-enabled clients such as Claude Code, Kiro, and Cursor.

## Directory Structure

```
packages/asset-generator/
├── src/asset_generator/
│   ├── server.py              # MCP server entry point + tool registration
│   ├── di/
│   │   └── container.py       # Dependency injection container
│   ├── tools/
│   │   └── templates/         # Template tools
│   │       ├── controller.py  # MCP interface
│   │       ├── service.py     # Business logic
│   │       └── repository.py  # External environment integration
│   └── interfaces/
│       └── constants.py       # Constants definition
└── tests/
```

## Technology Stack

- **Protocol**: Model Context Protocol (MCP)
- **Language**: Python 3.13+
- **Package Manager**: uv

## Development Commands

```bash
# Install dependencies
uv sync

# Run tests
uv run pytest
```

## Architecture

Uses the Controller-Service-Repository pattern:

- **Controller**: MCP tool interface (includes docstrings)
- **Service**: Business logic
- **Repository**: External environment integration
- **DIContainer**: Loose coupling through dependency injection
