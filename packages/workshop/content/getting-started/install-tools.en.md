---
title: 'Install Tools'
weight: 10
---

Install **Node.js and Claude Code** for the workshop. A single one-liner installs everything you need (Homebrew/Scoop → Node.js → Claude Code).

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

You're done when you see a message similar to **"Installation complete"**.

Under the hood, the one-liner does three things: (1) check the package manager (Homebrew/Scoop), (2) install the Node.js LTS, (3) install Claude Code (Windows: `scoop install claude-code` / Mac: official installer).

## Verify the install

Once the script finishes, run the following in the same 💻 terminal:

:::code{showCopyAction=true showLineNumbers=false language=bash}
claude --version
:::

If a version number is printed, the install succeeded.

::alert[On Windows, if `claude` is not found, close the PowerShell window **entirely** (not just a new tab) and open a **fresh one**, then re-run the script.]{type="info"}

## Troubleshooting

| Symptom                                          | Fix                                                                                                                                                                                                                  |
| ------------------------------------------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `npm install -g` permission error (Mac)          | `sudo npm install -g @anthropic-ai/claude-code`                                                                                                                                                                      |
| `scoop install claude-code` fails (Windows)      | Run `scoop update` first, or use `npm install -g @anthropic-ai/claude-code` as fallback                                                                                                                              |
| One-liner finishes but `npm` not found (Windows) | ① **Close PowerShell entirely** (not just a new tab) and open a **fresh window**, then re-run the script. ② If it still fails, run PowerShell **as Administrator** (right-click → "Run as administrator") and retry. |
| `node` / `claude` not found (Windows)            | **Close PowerShell entirely** (not just a new tab) and open a fresh window (PATH only refreshes in new processes)                                                                                                    |
| `scoop` is missing or broken (Windows)           | Download the **Node.js LTS** `.msi` directly from [nodejs.org](https://nodejs.org/en/download)                                                                                                                       |

## Manual install (step by step)

If the one-liner fails or you want to verify each step yourself, follow these guides:

- [Mac manual install guide](https://github.com/haandol/ui-poc-workspace/blob/main/docs/INSTALLATION_MAC.md)
- [Windows manual install guide](https://github.com/haandol/ui-poc-workspace/blob/main/docs/INSTALLATION_WIN.md)

## Next step

You still need to launch Claude Code and **register Bedrock credentials** before it can respond. We'll do that on the next page.
