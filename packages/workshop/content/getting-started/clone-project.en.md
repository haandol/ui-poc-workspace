---
title: 'Clone Project'
weight: 20
---

Download the workshop project and install its dependencies.

## Step 1. Restart PowerShell (Windows)

1. **Close** the current PowerShell window entirely (not just a new tab — close the window itself).
2. Open a **new PowerShell** from the Start menu.

::alert[Environment variables (PATH) set by the one-liner installer may not be reflected in an already-open window. You need a fresh PowerShell for `git`, `node`, and `npm` to work correctly.]{type="info"}

::alert[Mac users can skip this step.]{type="info"}

## Step 2. Download the project

Run the following in your 💻 (new) terminal. A `ui-poc-workspace` folder will be created on your Desktop.

::::tabs
:::tab{label="Mac"}

:::code{showCopyAction=true showLineNumbers=false language=bash}
git clone https://github.com/haandol/ui-poc-workspace ~/Desktop/ui-poc-workspace
:::

:::
:::tab{label="Windows (PowerShell)"}

:::code{showCopyAction=true showLineNumbers=false language=powershell}
$desktop = [Environment]::GetFolderPath('Desktop')
git clone https://github.com/haandol/ui-poc-workspace "$desktop\ui-poc-workspace"
:::

:::
::::

## Step 3. Install dependencies

In your 💻 terminal, navigate to the project folder and install the required packages. This takes about 1–2 minutes.

::::tabs
:::tab{label="Mac"}

:::code{showCopyAction=true showLineNumbers=false language=bash}
cd ~/Desktop/ui-poc-workspace && npm install -g pnpm && pnpm install
:::

:::
:::tab{label="Windows (PowerShell)"}

:::code{showCopyAction=true showLineNumbers=false language=powershell}
$desktop = [Environment]::GetFolderPath('Desktop')
cd "$desktop\ui-poc-workspace"
npm install -g pnpm
pnpm install
:::

:::
::::

When finished, you should see something like:

```
Done in Xs
```

::alert[If you get a `pnpm: command not found` error, close and reopen your terminal, then try again.]{type="info"}

Once the install finishes, proceed to the next step to set up Claude Code.
