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

You should see something like this:

```
──────────────────────────────────────────────────────
  Manage MCP servers
  7 servers

    Project MCPs (.mcp.json)
    airtable · ✔ connected
    asset-generator · ✘ failed
    pdf-reader · ✔ connected

    Built-in MCPs (always available)
    plugin:alps-writer:alps-writer · ✔ connected
    plugin:chrome-devtools-mcp:chrome-devtools · ✔ connected
    plugin:context7:context7 · ✔ connected
──────────────────────────────────────────────────────
```

**Project MCPs** (`.mcp.json`):

| MCP server      | Package                  | Purpose                    |
| --------------- | ------------------------ | -------------------------- |
| pdf-reader      | `@sylphx/pdf-reader-mcp` | Read the deep-research PDF |
| asset-generator | (bundled in project)     | Generate image assets      |
| airtable        | `airtable-mcp-server`    | Track workshop progress    |

::alert[The `airtable` and `asset-generator` servers remain in `failed` state until their API keys are configured. They switch to `connected` after you set the keys below.]{type="info"}

## Verify plugin installation

In the 💬 Claude Code chat, enter the following to check plugin status:

:::code{showCopyAction=true showLineNumbers=false language=text}
/plugin
:::

You should see every plugin marked `✔ enabled`, like this:

```
──────────────────────────────────────────────────────
  Plugins  Discover   Installed   Marketplaces   Errors

      Project
    alps-writer Plugin · alps-writer · ✔ enabled
    └ alps-writer MCP · ✔ connected
    chrome-devtools-mcp Plugin · claude-plugins-official · ✔ enabled
    └ chrome-devtools MCP · ✔ connected
    context7 Plugin · claude-plugins-official · ✔ enabled
    └ context7 MCP · ✔ connected
    frontend-design Plugin · claude-plugins-official · ✔ enabled
   ↓ more below
──────────────────────────────────────────────────────
```

**Plugins** (`.claude/settings.json`):

| Plugin              | Purpose                                                                                                                  |
| ------------------- | ------------------------------------------------------------------------------------------------------------------------ |
| alps-writer         | Author the PRD (ALPS) and turn its features into ADRs and code via slash commands (`/feature-to-adr`, `/adr-impl`, etc.) |
| context7            | Fetch up-to-date library/framework docs                                                                                  |
| chrome-devtools-mcp | Capture browser screenshots and debug the UI                                                                             |
| frontend-design     | UI component/screen design guidance                                                                                      |

::alert[If `alps-writer` shows up in the `Errors` tab or fails to download, run `/plugin marketplace update alps-writer` and then `/reload-plugins`.]{type="info"}

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

::alert[On Windows, you must restart Claude Code for the new environment variables to take effect.]{type="info"}

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

::alert[You can complete the workshop without these keys. Only the image generation and progress tracking features are disabled without them.]{type="info"}
