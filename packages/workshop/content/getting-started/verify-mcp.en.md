---
title: 'Verify MCP Servers'
weight: 30
---

This workshop makes use of several MCP (Model Context Protocol) servers. MCP servers are plugins that extend Claude Code, and they are already configured inside the project folder.

## Check the MCP server list

You should already have Claude Code running in the project folder (`ui-poc-workspace`) from the previous step. In the 💬 Claude Code chat, enter the following to load plugins:

:::code{showCopyAction=true showLineNumbers=false language=text}
/reload-plugins
:::

Once loaded, enter the following in the 💬 Claude Code chat to check the MCP server list:

:::code{showCopyAction=true showLineNumbers=false language=text}
/mcp
:::

You're good as long as **all 6 MCP servers below appear in the list**:

```
────────────────────────────────────────────────────────────────────────────────
  Manage MCP servers
  6 servers

    Project MCPs
  ❯ airtable · ✔ connected · 16 tools
    asset-generator · ✔ connected · 1 tool
    pdf-reader · ✔ connected · 1 tool

    Built-in MCPs (always available)
    plugin:alps-writer:alps-writer · ✔ connected · 11 tools
    plugin:chrome-devtools-mcp:chrome-devtools · ✔ connected · 29 tools
    plugin:context7:context7 · ✔ connected · 2 tools
```

The two servers below need an API key, so they may show `✘ failed` at first. They switch to `✔ connected` after you register the keys in the **Workshop environment setup** section below.

| MCP server        | Purpose                 |
| ----------------- | ----------------------- |
| `airtable`        | Track workshop progress |
| `asset-generator` | Generate image assets   |

## Verify plugin installation

In the 💬 Claude Code chat, enter the following to check plugin status:

:::code{showCopyAction=true showLineNumbers=false language=text}
/plugin
:::

When the plugin dialog opens, press the ⌨️ **right arrow key (`→`)** to switch to the **Installed** tab. Setup is correct when **all 4 plugins** under the `Project` section show `✔ enabled`, like this:

```
────────────────────────────────────────────────────────────────────────────────
  Plugins  Discover   Installed   Marketplaces   Errors

      Project
  ❯ adr-writer Plugin · alps-writer · ✔ enabled
    alps-writer Plugin · alps-writer · ✔ enabled
    └ alps-writer MCP · ✔ connected
    chrome-devtools-mcp Plugin · claude-plugins-official · ✔ enabled
    └ chrome-devtools MCP · ✔ connected
    context7 Plugin · claude-plugins-official · ✔ enabled
    └ context7 MCP · ✔ connected
```

| Plugin                | Purpose                                                                                                                    |
| --------------------- | -------------------------------------------------------------------------------------------------------------------------- |
| `alps-writer`         | MCP server for authoring the PRD (ALPS) + the slash commands that hand features off (`/alps-init`, `/feature-to-adr`)      |
| `adr-writer`          | ADR author/implement/sync slash commands (`/adr-new`, `/adr-impl`, `/adr-sync`, `/adr-rollup`) and the ADR↔code drift hook |
| `chrome-devtools-mcp` | Capture browser screenshots and debug the UI                                                                               |
| `context7`            | Fetch up-to-date library/framework docs                                                                                    |

## Workshop environment setup (optional)

Configure image generation (FAL API) and progress tracking (Airtable) in one step. In the 💬 Claude Code chat, enter:

:::code{showCopyAction=true showLineNumbers=false language=text}
/workshop-status setup
:::

Claude asks for three things at once. Enter them with numbers (newline: Mac `Shift+Enter` / Windows `Ctrl+Enter`):

```
1. patXXXXXX
2. xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx:xxxxxxxx
3. CoffeeAddictPM
```

1. **Airtable API key** — the value provided by your facilitator (starts with `pat_...`)
2. **FAL_KEY** — the fal.ai API key for image generation (provided by your facilitator)
3. **Nickname** — the name shown in the progress tracker

Once configured, restart Claude Code and verify the MCP connections.

::::tabs
:::tab{label="Mac"}

In your 💻 terminal, quit Claude Code (`Ctrl+C` or `/exit`) and relaunch:

:::code{showCopyAction=true showLineNumbers=false language=bash}
claude
:::

:::
:::tab{label="Windows (PowerShell)"}

In your 💻 terminal, quit Claude Code (`Ctrl+C` or `/exit`) and relaunch:

:::code{showCopyAction=true showLineNumbers=false language=powershell}
claude
:::

:::
::::

Once the 💬 Claude Code chat opens, enter:

:::code{showCopyAction=true showLineNumbers=false language=text}
/mcp
:::

Verify that `asset-generator` and `airtable` show `✔ connected`.

If `airtable` is connected, enter the following in the 💬 Claude Code chat to confirm progress tracking works:

:::code{showCopyAction=true showLineNumbers=false language=text}
/workshop-status
:::

If your current setup status is printed and a record is created in Airtable, the integration is working correctly.
