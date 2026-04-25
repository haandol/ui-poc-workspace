---
title: 'Bedrock 설정'
weight: 20
---

Claude Code가 AWS Bedrock을 통해 동작하도록 환경변수를 설정합니다.

아래 두 가지 방법 중 하나를 선택하세요.

::::tabs
:::tab{label="Workshop Studio 자격 증명 (권장)"}

**Step 1.** Workshop Studio 이벤트 대시보드에서 **Get AWS CLI credentials** 를 클릭합니다.

**Step 2.** 본인의 OS 탭(macOS/Linux 또는 Windows)을 선택하고, 표시된 내용 전체를 복사하여 터미널에 붙여넣습니다.

**Step 3.** 이어서 아래 내용도 터미널에 붙여넣습니다.

:::code{showCopyAction=true showLineNumbers=false language=bash}

# Mac/Linux

export CLAUDE_CODE_USE_BEDROCK=1
export AWS_REGION=us-east-1
export ANTHROPIC_DEFAULT_OPUS_MODEL='us.anthropic.claude-opus-4-7'
export ANTHROPIC_SMALL_FAST_MODEL='us.anthropic.claude-haiku-4-5-20251001-v1:0'
:::

:::code{showCopyAction=true showLineNumbers=false language=powershell}

# Windows (PowerShell)

$env:CLAUDE_CODE_USE_BEDROCK=1
$env:AWS_REGION="us-east-1"
$env:ANTHROPIC_DEFAULT_OPUS_MODEL="us.anthropic.claude-opus-4-7"
$env:ANTHROPIC_SMALL_FAST_MODEL="us.anthropic.claude-haiku-4-5-20251001-v1:0"
:::

**Step 4.** 프로젝트 폴더로 이동하여 Claude Code를 실행합니다.

:::code{showCopyAction=true showLineNumbers=false language=bash}

# Mac/Linux

cd ~/Desktop/ui-poc-workspace
claude
:::

:::code{showCopyAction=true showLineNumbers=false language=powershell}

# Windows (PowerShell)

cd "$([Environment]::GetFolderPath('Desktop'))\ui-poc-workspace"
claude
:::

::alert[Workshop Studio 자격 증명은 일정 시간 후 만료됩니다. Claude Code가 갑자기 동작하지 않으면 Step 1~3을 다시 해주세요.]{type="warning"}

:::
:::tab{label="Bedrock API 키"}

아래에서 `<your-bedrock-api-key>` 부분만 실제 키로 교체한 뒤, 터미널에 붙여넣습니다.

:::code{showCopyAction=true showLineNumbers=false language=bash}

# Mac/Linux

export AWS_BEARER_TOKEN_BEDROCK=<your-bedrock-api-key>
export CLAUDE_CODE_USE_BEDROCK=1
export AWS_REGION=us-east-1
export ANTHROPIC_DEFAULT_OPUS_MODEL='us.anthropic.claude-opus-4-7'
export ANTHROPIC_SMALL_FAST_MODEL='us.anthropic.claude-haiku-4-5-20251001-v1:0'
:::

:::code{showCopyAction=true showLineNumbers=false language=powershell}

# Windows (PowerShell)

$env:AWS_BEARER_TOKEN_BEDROCK="<your-bedrock-api-key>"
$env:CLAUDE_CODE_USE_BEDROCK=1
$env:AWS_REGION="us-east-1"
$env:ANTHROPIC_DEFAULT_OPUS_MODEL="us.anthropic.claude-opus-4-7"
$env:ANTHROPIC_SMALL_FAST_MODEL="us.anthropic.claude-haiku-4-5-20251001-v1:0"
:::

프로젝트 폴더로 이동하여 Claude Code를 실행합니다.

:::code{showCopyAction=true showLineNumbers=false language=bash}

# Mac/Linux

cd ~/Desktop/ui-poc-workspace
claude
:::

:::code{showCopyAction=true showLineNumbers=false language=powershell}

# Windows (PowerShell)

cd "$([Environment]::GetFolderPath('Desktop'))\ui-poc-workspace"
claude
:::

:::
::::

Claude Code가 실행되면 간단한 질문으로 동작을 확인합니다:

```
안녕하세요, 잘 동작하나요?
```

정상적으로 응답이 오면 설정 완료입니다.

::alert[`on-demand throughput isn't supported` 오류가 발생하면 진행자에게 문의하세요.]{type="warning"}
