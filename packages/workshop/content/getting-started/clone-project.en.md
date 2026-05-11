---
title: 'Clone Project'
weight: 20
---

Download the workshop project and install its dependencies.

## Step 1. Download the project

Run the following in your 💻 terminal. A `ui-poc-workspace` folder will be created on your Desktop.

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

## Step 2. Install dependencies

Navigate to the project folder and install the required packages. This takes about 1–2 minutes.

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
