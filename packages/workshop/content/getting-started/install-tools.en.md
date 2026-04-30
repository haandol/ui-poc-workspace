---
title: 'Install Tools'
weight: 10
---

Install the tools required for the workshop. Using the setup script takes care of the entire environment in one shot.

## Prerequisites

Check the following before running the automated installer.

::::tabs
:::tab{label="Mac"}

**1.** Open the built-in Terminal (Terminal.app) and install the Xcode Command Line Tools:

:::code{showCopyAction=true showLineNumbers=false language=bash}
xcode-select --install
:::

If a popup appears, click **Install**. If it's already installed, ignore this step.

**2.** Install Homebrew (package manager):

:::code{showCopyAction=true showLineNumbers=false language=bash}
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
:::

::alert[If Homebrew is already installed, skip this step and jump straight to **Automated install** below.]{type="info"}

:::
:::tab{label="Windows"}

You will need **Git** to download the project. If it is not installed yet, install it in the order below.

**1.** Open PowerShell and install the scoop package manager:

:::code{showCopyAction=true showLineNumbers=false language=powershell}
Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser -Force
irm get.scoop.sh | iex
:::

**2.** Install Git:

:::code{showCopyAction=true showLineNumbers=false language=powershell}
scoop install git
:::

::alert[If Git is already installed, skip this step and jump straight to **Automated install** below.]{type="info"}

:::
::::

## Automated install (recommended)

Open a terminal and run the command below.

::::tabs
:::tab{label="Mac"}

:::code{showCopyAction=true showLineNumbers=false language=bash}
curl -fsSL https://raw.githubusercontent.com/haandol/ui-poc-workspace/main/scripts/bootstrap.sh | bash
:::

When the script finishes, the working folder is created at `~/Desktop/ui-poc-workspace/`.

:::
:::tab{label="Windows"}

Run the following commands in order.

:::code{showCopyAction=true showLineNumbers=false language=powershell}
$desktop = [Environment]::GetFolderPath('Desktop')
git clone https://github.com/haandol/ui-poc-workspace "$desktop\ui-poc-workspace"
cd "$desktop\ui-poc-workspace"
powershell -ExecutionPolicy Bypass -File scripts\setup.ps1
:::

:::
::::

The script automatically installs:

| Tool                             | Purpose             |
| -------------------------------- | ------------------- |
| Homebrew (Mac) / scoop (Windows) | Package manager     |
| Git                              | Source control      |
| Node.js 24                       | JavaScript runtime  |
| pnpm                             | Package installer   |
| Claude Code                      | AI coding assistant |

## Verify the install

Once the script finishes, verify each tool with the commands below.

:::code{showCopyAction=true showLineNumbers=false language=bash}
node --version
pnpm --version
claude --version
:::

You should see versions similar to:

```
v24.x.x
10.x.x
1.x.x
```

::alert[If the Node.js version is below 24.x, run `brew install node@24` (Mac) or `scoop install nodejs` (Windows).]{type="warning"}

## Manual install (step by step)

If you want to install the tools step by step instead of using the script, follow these guides:

- [Mac install guide](https://github.com/haandol/ui-poc-workspace/blob/main/docs/INSTALLATION_MAC.md)
- [Windows install guide](https://github.com/haandol/ui-poc-workspace/blob/main/docs/INSTALLATION_WIN.md)
