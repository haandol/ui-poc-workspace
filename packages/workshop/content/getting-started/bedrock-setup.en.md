---
title: 'Bedrock 설정'
weight: 20
---

Claude Code를 Amazon Bedrock을 통해 사용하도록 설정합니다. Bedrock을 사용하면 기업 환경에서 안전하게 Claude 모델을 활용할 수 있습니다.

## AWS 자격 증명 및 환경변수 설정

아래 방법 중 하나를 선택합니다.

::::tabs
:::tab{label="Workshop Studio 이벤트 자격 증명 (권장)"}

워크숍 이벤트에 참가 중이라면 Workshop Studio에서 제공하는 임시 자격 증명을 사용합니다.

1. Workshop Studio 이벤트 대시보드 왼쪽의 **Get AWS CLI credentials** 를 클릭합니다
2. 본인의 OS에 맞는 탭(macOS/Linux 또는 Windows)을 선택합니다
3. 표시된 환경변수 블록 전체를 복사하여 터미널에 붙여넣어 실행합니다
4. 이어서 아래 Bedrock 환경변수도 함께 설정합니다

:::code{showCopyAction=true showLineNumbers=false language=bash}

# Mac/Linux — Workshop Studio 자격 증명 붙여넣기 후 아래 추가

export CLAUDE_CODE_USE_BEDROCK=1
export AWS_REGION=us-east-1
export ANTHROPIC_DEFAULT_OPUS_MODEL='us.anthropic.claude-opus-4-7'
export ANTHROPIC_SMALL_FAST_MODEL='us.anthropic.claude-haiku-4-5-20251001-v1:0'
:::

:::code{showCopyAction=true showLineNumbers=false language=powershell}

# Windows (PowerShell) — Workshop Studio 자격 증명 붙여넣기 후 아래 추가

$env:CLAUDE_CODE_USE_BEDROCK=1
$env:AWS_REGION="us-east-1"
$env:ANTHROPIC_DEFAULT_OPUS_MODEL="us.anthropic.claude-opus-4-7"
$env:ANTHROPIC_SMALL_FAST_MODEL="us.anthropic.claude-haiku-4-5-20251001-v1:0"
:::

::alert[Workshop Studio 자격 증명은 일정 시간이 지나면 만료됩니다. 만료되면 위 과정을 다시 반복하세요.]{type="warning"}

:::
:::tab{label="Bedrock API 키"}

Bedrock 콘솔에서 장기 API 키를 생성하여 사용합니다.

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

:::
::::

## 동작 확인

프로젝트 폴더로 이동하여 Claude Code를 실행합니다.

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

Claude Code가 실행되면 간단한 질문으로 동작을 확인합니다:

```
안녕하세요, 잘 동작하나요?
```

정상적으로 응답이 오면 Bedrock 설정이 완료된 것입니다.

::alert[`on-demand throughput isn't supported` 오류가 발생하면 모델을 inference profile ID로 지정해야 합니다. `ANTHROPIC_DEFAULT_OPUS_MODEL` 환경변수에 Application Inference Profile ARN을 사용하세요.]{type="warning"}
