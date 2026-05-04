---
title: 'Install Tools'
weight: 10
---

Install **Node.js and Claude Code** for Day 1 of the workshop. A single one-liner installs everything you need (Homebrew/Scoop → Node.js → Claude Code).

## Icons used in this guide

This guide hops between **two different input windows**. Icons make it clear which one to use.

| Icon                    | Meaning                                                                                     |
| ----------------------- | ------------------------------------------------------------------------------------------- |
| 💻 **Terminal**         | Terminal.app (or Ghostty) on Mac, PowerShell on Windows. Where you type system commands.    |
| 💬 **Claude Code chat** | The AI chat that appears after you run `claude` in the terminal. Where you type in English. |

## Prerequisite: open a terminal

::::tabs
:::tab{label="Windows (PowerShell)"}

1. Click the **Start (⊞)** button on the taskbar or press the **Windows key**.
2. Type `powershell`.
3. In the search results, click **"Windows PowerShell"** or **"PowerShell"**.
4. A blue (or black) window opens. This is your 💻 **Terminal**.

::alert[Scoop works without administrator privileges. A regular PowerShell window is fine.]{type="info"}

:::
:::tab{label="Mac"}

1. Press **⌘ (Command) + Space** to open Spotlight.
2. Type `terminal` and press Enter.
3. A black window opens. This is your 💻 **Terminal**.

:::
::::

## One-liner install

Copy the single line below into your 💻 terminal and press Enter. The install takes about 3–5 minutes.

::::tabs
:::tab{label="Mac"}

:::code{showCopyAction=true showLineNumbers=false language=bash}
curl -fsSL https://raw.githubusercontent.com/haandol/ui-poc-workspace/main/scripts/install-claude-code.sh | bash
:::

:::
:::tab{label="Windows"}

Paste the line below into the 💻 PowerShell window you opened in the "Prerequisite" step.

:::code{showCopyAction=true showLineNumbers=false language=powershell}
iwr -useb https://raw.githubusercontent.com/haandol/ui-poc-workspace/main/scripts/install-claude-code.ps1 | iex
:::

:::
::::

You're done when you see a message similar to **"Claude Code is ready"**.

Under the hood, the one-liner does three things: (1) check the package manager (Homebrew/Scoop), (2) install Node.js LTS, (3) `npm install -g @anthropic-ai/claude-code`.

## Verify the install

In your 💻 terminal:

:::code{showCopyAction=true showLineNumbers=false language=bash}
claude --version
:::

If a version number is printed, the install succeeded.

::alert[If `claude` is not found, **close the terminal and open a new one**, then try again. The PATH needs to refresh.]{type="info"}

## Troubleshooting

| Symptom                                     | Fix                                                                                    |
| ------------------------------------------- | -------------------------------------------------------------------------------------- |
| `npm install -g` permission error (Mac)     | `sudo npm install -g @anthropic-ai/claude-code`                                        |
| `npm install -g` permission error (Windows) | Scoop-installed Node.js should not need admin. If manually installed, reopen PowerShell as Administrator |
| `node` / `claude` not found (Windows)       | Close and reopen PowerShell (PATH needs to refresh)                                    |
| `scoop` is missing or broken (Windows)      | Download Node.js LTS `.msi` directly from [nodejs.org](https://nodejs.org/en/download) |

## Manual install (step by step)

If the one-liner fails or you want to verify each step yourself, follow these guides:

- [Mac manual install guide](https://github.com/haandol/ui-poc-workspace/blob/main/docs/INSTALLATION_MAC.md)
- [Windows manual install guide](https://github.com/haandol/ui-poc-workspace/blob/main/docs/INSTALLATION_WIN.md)

## Next step

You still need to launch Claude Code and **register Bedrock credentials** before it can respond. We'll do that on the next page.
