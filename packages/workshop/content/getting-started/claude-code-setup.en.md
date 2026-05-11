---
title: 'Claude Code Setup'
weight: 25
---

Launch Claude Code from the project folder and **register Bedrock credentials**. Until you finish this step, Claude Code cannot reply.

## 1. Launch Claude Code

Run Claude Code from the project folder you cloned in the previous step.

::::tabs
:::tab{label="Mac"}

:::code{showCopyAction=true showLineNumbers=false language=bash}
cd ~/Desktop/ui-poc-workspace && claude
:::

:::
:::tab{label="Windows (PowerShell)"}

:::code{showCopyAction=true showLineNumbers=false language=powershell}
$desktop = [Environment]::GetFolderPath('Desktop')
cd "$desktop\ui-poc-workspace"
claude
:::

:::
::::

Once the 💬 Claude Code chat opens and the cursor is blinking, move on.

## 2. Register Bedrock credentials

On the **first launch**, Claude Code automatically shows the provider selection screen. Skip straight to Step 1.

::alert[If the provider selection screen doesn't appear or you're already logged in with a different account, type `/login` in the 💬 chat to bring it back.]{type="info"}

**Step 1.** On the **Select login method** screen, press **`3`** to choose `3rd-party platform` and press Enter.

![Select login method - 3rd-party platform](/static/images/getting-started/setup-bedrock/login-1.png)

**Step 2.** On the **Using 3rd-party platforms** screen, press **`1`** to choose `Amazon Bedrock · interactive setup` and press Enter.

![Using 3rd-party platforms - Amazon Bedrock](/static/images/getting-started/setup-bedrock/login-2.png)

**Step 3.** On the **authentication method** screen, press **`2`** to select `Bedrock API key (bearer token)` and press Enter. The Bedrock API key flow is the simplest and is recommended.

![Auth method - Bedrock API key](/static/images/getting-started/setup-bedrock/cc-1.png)

**Step 4.** On the **Bedrock API key** screen, paste the API key your facilitator gave you and press Enter.

![Paste Bedrock API key](/static/images/getting-started/setup-bedrock/cc-2.png)

**Step 5.** On the **AWS region** screen, enter `us-east-1` (required) and press Enter.

![AWS region us-east-1](/static/images/getting-started/setup-bedrock/cc-3.png)

::alert[Claude Code reads the `AWS_REGION` environment variable, not `~/.aws/config`, so you must specify the region here even if your profile already has one.]{type="info"}

**Step 6.** On the **pin model versions** screen, press **`2`** to select `Pin the working models with 1M context` and press Enter. You're done — no need to set environment variables manually.

![Pin model versions](/static/images/getting-started/setup-bedrock/cc-4.png)

## 3. Smoke test

Type a quick message in the 💬 Claude Code chat to confirm you get a reply.

:::code{showCopyAction=true showLineNumbers=false language=text}
hi
:::

A reply means installation and credential registration are both complete.

::alert[If `/login` goes silent or you see `on-demand throughput isn't supported`, credentials may have expired — ask your facilitator for a new one and rerun `/login`.]{type="warning"}

## If your credentials have already expired

When you resume the workshop in a later session and Workshop Studio credentials have already expired, you don't need to reinstall anything. In the 💬 Claude Code chat, run `/setup-bedrock` to bring up the same flow and paste the new API key your facilitator shares.

::alert[After re-registering, run `/model` in the 💬 chat and confirm `Opus 4.6 (us.anthropic.claude-opus-4-6-v1)` is selected.]{type="info"}

## Next step

Now that Bedrock is working, the next page verifies the MCP server connections.
