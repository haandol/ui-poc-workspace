---
title: 'Start the Dev Server'
weight: 10
---

While you develop, keep **two** terminal tabs open — one for the dev server, one for Claude Code.

## Step 1. Open a tab for the dev server

Open a new tab in your current terminal.

- **Mac**: `Cmd + T`
- **Windows**: `Ctrl + Shift + T`

## Step 2. Start the dev server

Run the dev server in the new tab (tab 1). **Leave this tab open.**

::::tabs
:::tab{label="Mac"}

:::code{showCopyAction=true showLineNumbers=false language=bash}
cd ~/Desktop/ui-poc-workspace
pnpm dev:web
:::

:::
:::tab{label="Windows (PowerShell)"}

:::code{showCopyAction=true showLineNumbers=false language=powershell}
cd "$([Environment]::GetFolderPath('Desktop'))\ui-poc-workspace"
pnpm dev:web
:::

:::
::::

You should see output similar to:

```
  ➜  Local:   http://localhost:3000/
  ➜  Network: use --host to expose
```

## Step 3. Check it in the browser

Open the URL in your browser:

:button[Open http://localhost:3000]{target="\_blank" href="http://localhost:3000" variant="primary" iconName="external" iconAlign="right"}

If the default page renders, the dev server is working.

::alert[The browser hot-reloads automatically when code changes. Keep the dev server tab open at all times.]{type="info"}

## Step 4. Open the Claude Code tab

Open another tab and run Claude Code.

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

You now have two tabs ready:

- **Tab 1** 📺 Dev server (always on)
- **Tab 2** 🤖 Claude Code (for AI work)
