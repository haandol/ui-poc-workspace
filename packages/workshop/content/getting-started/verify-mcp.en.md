---
title: 'Verify MCP Servers'
weight: 30
---

This workshop makes use of several MCP (Model Context Protocol) servers. MCP servers are plugins that extend Claude Code, and they are already configured inside the project folder.

## Check the MCP server list

You should already have Claude Code running in the project folder (`ui-poc-workspace`) from the previous step. In the 💬 Claude Code chat, enter:

:::code{showCopyAction=true showLineNumbers=false language=text}
/mcp
:::

::alert[If Claude Code isn't running, open a 💻 terminal and launch it from the project folder. Mac: `cd ~/Desktop/ui-poc-workspace && claude` / Windows: `cd "$([Environment]::GetFolderPath('Desktop'))\ui-poc-workspace"; claude`]{type="info"}

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

| Plugin              | Purpose                                                                                       |
| ------------------- | --------------------------------------------------------------------------------------------- |
| context7            | Fetch up-to-date library/framework docs                                                       |
| chrome-devtools-mcp | Capture browser screenshots and debug the UI                                                  |
| nx                  | Helper that lets Claude understand the project's build/run layout (you don't use it directly) |

::alert[The `airtable` and `asset-generator` servers remain in `failed` state until their API keys are configured. They switch to `connected` after you set the keys below.]{type="info"}

## Configure image asset generation (optional)

To use the AI image generation feature, you need a FAL API key. In the 💬 Claude Code chat, paste your key into a request like the one below — Claude will register the environment variable for your OS.

:::code{showCopyAction=true showLineNumbers=false language=text}
Set FAL_KEY to "KEY_FROM_FACILITATOR".
On Mac persist it in ~/.zshrc, on Windows persist it as a user environment variable.
:::

Approve the command Claude wants to run. Once done, `/exit` the 💬 chat and relaunch `claude` from the 💻 terminal, then run `/mcp` to verify `asset-generator` is now `✔ connected`.

::alert[Environment variables are read at process start, so Claude Code must be **restarted** for the key to take effect. Reconnecting from `/mcp` alone is not enough.]{type="info"}

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
