---
title: 'Verify MCP Servers'
weight: 30
---

This workshop makes use of several MCP (Model Context Protocol) servers. MCP servers are plugins that extend Claude Code, and they are already configured inside the project folder.

## Check the MCP server list

Run Claude Code from the project folder, then type `/mcp`.

::::tabs
:::tab{label="Mac"}

:::code{showCopyAction=true showLineNumbers=false language=bash}
cd ~/Desktop/ui-poc-workspace
claude
:::

:::
:::tab{label="Windows (PowerShell)"}

:::code{showCopyAction=true showLineNumbers=false language=powershell}
cd "$([Environment]::GetFolderPath('Desktop'))\ui-poc-workspace"
claude
:::

:::
::::

Once Claude Code is running, enter:

:::code{showCopyAction=true showLineNumbers=false language=text}
/mcp
:::

You should see something like this:

```
──────────────────────────────────────────────────────
  Manage MCP servers
  9 servers

    Project MCPs (.mcp.json)
    airtable · ✔ connected
    alps-writer · ✔ connected
    asset-generator · ✘ failed
    pdf-reader · ✔ connected

    User MCPs (~/.claude.json)
    ppt-generator · ✔ connected
    tavily · ✔ connected

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

**User MCPs** (`~/.claude.json`):

| MCP server    | Purpose                      |
| ------------- | ---------------------------- |
| ppt-generator | Generate presentation slides |
| tavily        | Web search and research      |

**Plugins** (`.claude/settings.json`):

| Plugin              | Purpose                                      |
| ------------------- | -------------------------------------------- |
| context7            | Fetch up-to-date library/framework docs      |
| chrome-devtools-mcp | Capture browser screenshots and debug the UI |
| nx                  | Manage the Nx monorepo workspace             |

::alert[The `airtable` and `asset-generator` servers remain in `failed` state until their API keys are configured. They switch to `connected` after you set the keys below.]{type="info"}

## Configure image asset generation (optional)

To use the AI image generation feature, set the FAL API key. Use the key provided by your facilitator and set it as an environment variable:

<!-- prettier-ignore-start -->
::::tabs
:::tab{label="Mac"}

:::code{showCopyAction=true showLineNumbers=false language=bash}
echo 'export FAL_KEY="KEY_FROM_FACILITATOR"' >> ~/.zshrc
source ~/.zshrc
:::

:::
:::tab{label="Windows (PowerShell)"}

:::code{showCopyAction=true showLineNumbers=false language=powershell}
[Environment]::SetEnvironmentVariable('FAL_KEY', 'KEY_FROM_FACILITATOR', 'User')
:::

After setting it, **restart** PowerShell.

:::
::::
<!-- prettier-ignore-end -->

After the key is set and you restart Claude Code, `/mcp` will show `asset-generator` as `✔ connected`.

::alert[You can complete the workshop without a FAL API key. Only the image asset generation feature is disabled without it.]{type="info"}

## Configure progress tracking (optional)

To share your workshop progress with the facilitator, set up the Airtable integration. In the Claude Code prompt, enter:

:::code{showCopyAction=true showLineNumbers=false language=text}
/workshop-status setup
:::

Claude asks two things:

1. **Airtable API key** — the value provided by your facilitator (starts with `pat_...`)
2. **Nickname** — the name shown in the progress tracker (e.g., "CoffeeAddictPM")

Once configured, later steps automatically share your progress.

::alert[You can complete the workshop without an Airtable key. Only the progress tracking feature is disabled without it.]{type="info"}
