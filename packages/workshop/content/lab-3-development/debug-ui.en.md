---
title: 'Debug the UI'
weight: 30
---

When the screen doesn't look right, the AI can look at the browser itself and fix the issue using `chrome-devtools-mcp`.

## Prerequisites

Keep `http://localhost:3000` open in Chrome.

::alert[This feature only works in Chrome. It doesn't work in Safari or Firefox.]{type="warning"}

## Ask the AI to look at the screen

Try prompts like:

| Situation             | Example prompt                                                 |
| --------------------- | -------------------------------------------------------------- |
| Check the screen      | "Take a screenshot of the current browser and check it."       |
| Broken-looking layout | "Check the current page in the browser and fix what's broken." |
| Console errors        | "Check if there are any errors in the browser and fix them."   |
| Design check          | "Screenshot the current page and compare it to the PRD."       |

::alert[Simple prompts like "take a look at the screen", "screenshot it", or "something looks weird — what's wrong?" are usually enough for the AI to diagnose the issue.]{type="info"}

## Common troubleshooting

### Browser not picking up changes

Force a cache refresh:

- **Mac**: `Cmd + Shift + R`
- **Windows**: `Ctrl + Shift + R`

If that doesn't work, restart the dev server:

:::code{showCopyAction=true showLineNumbers=false language=bash}

# In tab 1, Ctrl+C to stop, then restart

pnpm dev:web
:::

### Port conflict

If port 3000 is already in use:

:::code{showCopyAction=true showLineNumbers=false language=bash}
pnpm dev:web -- --port 3001
:::

Then open `http://localhost:3001` in your browser.
