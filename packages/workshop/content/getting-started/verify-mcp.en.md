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
    alps-writer · ✔ connected
    asset-generator · ✘ failed
    pdf-reader · ✔ connected

    Built-in MCPs (always available)
    plugin:chrome-devtools-mcp:chrome-devtools · ✔ connected
    plugin:context7:context7 · ✔ connected
    plugin:nx:nx-mcp · ✔ connected
──────────────────────────────────────────────────────
```

**Project MCPs** (`.mcp.json`):

| MCP server      | Package                  | Purpose                    |
| --------------- | ------------------------ | -------------------------- |
| pdf-reader      | `@sylphx/pdf-reader-mcp` | Read the deep-research PDF |
| alps-writer     | `alps-writer`            | Author the PRD (ALPS)      |
| asset-generator | (bundled in project)     | Generate image assets      |
| airtable        | `airtable-mcp-server`    | Track workshop progress    |

**Plugins** (`.claude/settings.json`):

| Plugin              | Purpose                                                                                              |
| ------------------- | ---------------------------------------------------------------------------------------------------- |
| alps-writer         | Slash commands that turn PRD features into ADRs and then code (`/feature-to-adr`, `/adr-impl`, etc.) |
| context7            | Fetch up-to-date library/framework docs                                                              |
| chrome-devtools-mcp | Capture browser screenshots and debug the UI                                                         |
| nx                  | Helper that lets Claude understand the project's build/run layout (you don't use it directly)        |

::alert[The `airtable` and `asset-generator` servers remain in `failed` state until their API keys are configured. They switch to `connected` after you set the keys below.]{type="info"}

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
