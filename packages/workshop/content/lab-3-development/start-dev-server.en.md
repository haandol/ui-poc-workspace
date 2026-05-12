---
title: 'Start the Dev Server'
weight: 10
---

While you develop, keep **two** terminal tabs open — one for the dev server, one for Claude Code.

## Step 1. Open a tab for the dev server

Keep the terminal with the Claude Code session from Lab 2 open. **Open a new tab:**

- **Mac**: `Cmd + T`
- **Windows**: `Ctrl + Shift + T`

## Step 2. Start the dev server

💻 Run the dev server in the new terminal tab. **Leave this tab open at all times.**

::::tabs
:::tab{label="Mac"}

:::code{showCopyAction=true showLineNumbers=false language=bash}
cd ~/Desktop/ui-poc-workspace && pnpm dev:web
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

![Dev server default page](/static/images/lab-3/dev-server.png)

If you see this page, the web server is running correctly.

::alert[The browser hot-reloads automatically when code changes. Keep the dev server tab open at all times.]{type="info"}

## Step 4. Switch to the Claude Code tab

Switch back to the tab where Claude Code is still running from Lab 2. If the chat is still open, you're good to go.

::alert[If you already closed Claude Code or that tab, open a new tab and run: Mac: `cd ~/Desktop/ui-poc-workspace && claude` / Windows: `cd "$([Environment]::GetFolderPath('Desktop'))\ui-poc-workspace"; claude`]{type="info"}

You now have two tabs ready:

- **Tab 1** 📺 Dev server (always on)
- **Tab 2** 💬 Claude Code (for AI work)
