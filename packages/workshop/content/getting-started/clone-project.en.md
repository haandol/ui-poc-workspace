---
title: 'Clone Project'
weight: 25
---

Download the workshop project and install its dependencies.

## Step 1. Exit Claude Code

Exit the Claude Code session you launched in the `claude-play` folder during the previous step.

In the 💬 Claude Code chat:

:::code{showCopyAction=true showLineNumbers=false language=text}
/exit
:::

## Step 2. Download the project

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

## Step 3. Install dependencies

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

## Step 4. Launch Claude Code

Launch Claude Code from the project folder.

::::tabs
:::tab{label="Mac"}

:::code{showCopyAction=true showLineNumbers=false language=bash}
claude
:::

:::
:::tab{label="Windows (PowerShell)"}

:::code{showCopyAction=true showLineNumbers=false language=powershell}
claude
:::

:::
::::

Once the 💬 Claude Code chat opens, move on to the next step.

::alert[The Bedrock credentials you registered earlier are preserved. No need to `/login` again.]{type="info"}
