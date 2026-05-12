---
title: 'Debug the UI'
weight: 30
---

When the screen doesn't look right, the AI can look at the browser itself and fix the issue using `chrome-devtools-mcp`.

## Ask the AI to look at the screen

Try prompts like the ones below. Mentioning that the dev server is at `http://localhost:3000` helps the AI navigate to the right address.

| Situation             | Example prompt                                                                                   |
| --------------------- | ------------------------------------------------------------------------------------------------ |
| Check the screen      | "Dev server is already running at localhost:3000. Open it in the browser and take a screenshot." |
| Broken-looking layout | "Check the page and fix what's broken."                                                          |
| Console errors        | "Check if there are any browser errors and fix them."                                            |
| Design check          | "Screenshot the page and compare it to the PRD."                                                 |

::alert[Simple prompts like "take a look at the screen", "screenshot it", or "something looks weird — what's wrong?" are usually enough for the AI to diagnose the issue.]{type="info"}

::alert[If the AI says it can't open a browser, run `/reload-plugins` then check `/mcp` to confirm the `chrome-devtools` plugin is connected. See the [Verify MCP Servers](/getting-started/verify-mcp) page for details.]{type="warning"}

## Common troubleshooting

### Browser not picking up changes

Force a cache refresh:

- **Mac**: `Cmd + Shift + R`
- **Windows**: `Ctrl + Shift + R`

If that doesn't work, in the 💻 dev server tab (tab 1) press `Ctrl + C` to stop, then rerun:

:::code{showCopyAction=true showLineNumbers=false language=bash}
pnpm dev:web
:::

### Port conflict

If port 3000 is already in use, in your 💻 terminal set the `PORT` environment variable to run on a different port.

::::tabs
:::tab{label="Mac"}

:::code{showCopyAction=true showLineNumbers=false language=bash}
PORT=3001 pnpm dev:web
:::

:::
:::tab{label="Windows (PowerShell)"}

:::code{showCopyAction=true showLineNumbers=false language=powershell}
$env:PORT=3001; pnpm dev:web
:::

:::
::::

Then open `http://localhost:3001` in your browser.
