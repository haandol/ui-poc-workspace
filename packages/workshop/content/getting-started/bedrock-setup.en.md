---
title: 'Bedrock 설정'
weight: 20
---

Claude Code를 Amazon Bedrock을 통해 사용하도록 설정합니다. Bedrock을 사용하면 기업 환경에서 안전하게 Claude 모델을 활용할 수 있습니다.

## 1. AWS 자격 증명 설정

아래 방법 중 하나를 선택합니다.

::::tabs
:::tab{label="AWS SSO (권장)"}

:::code{showCopyAction=true showLineNumbers=false language=bash}
aws sso login --profile=<your-profile-name>
export AWS_PROFILE=<your-profile-name>
:::

:::
:::tab{label="환경변수 (Access Key)"}

:::code{showCopyAction=true showLineNumbers=false language=bash}
export AWS_ACCESS_KEY_ID=<your-access-key-id>
export AWS_SECRET_ACCESS_KEY=<your-secret-access-key>
export AWS_SESSION_TOKEN=<your-session-token>
:::

:::
:::tab{label="Bedrock API 키"}

:::code{showCopyAction=true showLineNumbers=false language=bash}
export AWS_BEARER_TOKEN_BEDROCK=<your-bedrock-api-key>
:::

:::
::::

## 2. Bedrock 환경변수 설정

:::code{showCopyAction=true showLineNumbers=false language=bash}
export CLAUDE_CODE_USE_BEDROCK=1
export AWS_REGION=us-east-1
:::

## 3. 모델 버전 고정 (권장)

특정 모델 버전을 고정하면 모델 업데이트로 인한 예기치 않은 동작 변경을 방지할 수 있습니다.

:::code{showCopyAction=true showLineNumbers=false language=bash}
export ANTHROPIC_DEFAULT_OPUS_MODEL='us.anthropic.claude-opus-4-7'
export ANTHROPIC_SMALL_FAST_MODEL='us.anthropic.claude-haiku-4-5-20251001-v1:0'
:::

::alert[매번 환경변수를 설정하기 번거롭다면 `~/.zshrc` (Mac) 또는 PowerShell 프로필 파일에 위 내용을 추가하세요.]{type="info"}

## 4. 동작 확인

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
