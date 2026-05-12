---
title: 'Claude Code 설정'
weight: 25
---

프로젝트 폴더에서 Claude Code 를 실행하고 **Bedrock 자격증명을 등록**합니다. 등록이 끝나야 실제로 AI 응답이 옵니다.

## 1. Claude Code 실행

💻 터미널에서 이전 단계에서 클론한 프로젝트 폴더로 이동하여 Claude Code 를 실행합니다.

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

💬 Claude Code 대화창이 열리고 프롬프트 커서가 깜박이면 다음 단계로 넘어갑니다.

## 2. Bedrock 자격증명 등록

Claude Code 를 **처음 실행**하면 provider 선택 화면이 자동으로 뜹니다. 바로 아래 Step 1 로 넘어가세요.

::alert[provider 선택 화면이 안 뜨거나 이미 다른 계정으로 로그인된 상태라면, 💬 대화창에 `/login` 을 타이핑해 같은 화면을 다시 불러올 수 있습니다.]{type="info"}

**Step 1.** **Select login method** 화면에서 **`3` 을 눌러** `3rd-party platform` 을 선택하고 Enter.

![Select login method - 3rd-party platform](/static/images/getting-started/setup-bedrock/login-1.png)

**Step 2.** **Using 3rd-party platforms** 화면에서 **`1` 을 눌러** `Amazon Bedrock · interactive setup` 을 선택하고 Enter.

![Using 3rd-party platforms - Amazon Bedrock](/static/images/getting-started/setup-bedrock/login-2.png)

**Step 3.** **인증 방법 선택** 화면이 뜨면 **`3` 을 눌러** `Access Key, Secret` 를 선택하고 Enter.

![Auth method - Bedrock API key](/static/images/getting-started/setup-bedrock/cc-1.png)

**Step 4.** 이전 [환경 설정](/getting-started/environment-setup) 단계에서 확인한 AWS 크레덴셜을 순서대로 입력합니다. 각 항목을 붙여넣고 Enter 를 누릅니다.

- **AWS Access Key ID** — Access Key 값을 붙여넣고 Enter
- **AWS Secret Access Key** — Secret Access Key 값을 붙여넣고 Enter
- **AWS Session Token** — Session Token 값을 붙여넣고 Enter

![Paste AWS credentials](/static/images/getting-started/setup-bedrock/cc-2.png)

**Step 5.** **AWS region** 입력 화면에서 반드시 `us-east-1` 를 입력하고 Enter.

![AWS region us-east-1](/static/images/getting-started/setup-bedrock/cc-3.png)

::alert[Claude Code 는 `~/.aws/config` 가 아니라 `AWS_REGION` 환경변수를 읽기 때문에, 프로필에 리전이 있더라도 여기서 명시적으로 지정해야 합니다.]{type="info"}

**Step 6.** **모델 버전 핀 고정** 화면에서 **`2` 를 눌러** `Pin the working models with 1M context` 를 선택하고 Enter. 환경변수를 직접 설정할 필요가 없습니다.

![Pin model versions](/static/images/getting-started/setup-bedrock/cc-4.png)

**Step 7.** 💬 Claude Code 대화창에서 `/model` 을 입력하여 **Opus 4.6 (`us.anthropic.claude-opus-4-6-v1`)** 이 선택되어 있는지 확인합니다.

:::code{showCopyAction=true showLineNumbers=false language=text}
/model
:::

::alert[다른 모델이 선택되어 있다면 `Opus 4.6` 을 선택하세요. 워크숍에서는 Opus 4.6 을 사용합니다.]{type="info"}

## 3. 동작 확인

자격증명 등록이 끝나면 Claude Code 가 자동으로 종료됩니다. 💻 터미널에서 다시 실행합니다:

:::code{showCopyAction=true showLineNumbers=false language=bash}
claude
:::

💬 Claude Code 대화창이 열리면 아래처럼 테스트 질문을 입력해 응답이 오는지 확인합니다.

:::code{showCopyAction=true showLineNumbers=false language=text}
hi
:::

응답이 오면 설치 + 자격증명 등록까지 모두 완료입니다.

::alert[`/login` 입력 후 응답이 없거나 `on-demand throughput isn't supported` 오류가 발생하면 자격증명이 만료됐을 수 있습니다. 진행자에게 새 자격증명을 요청한 뒤 `/login` 을 다시 실행하세요.]{type="warning"}

## 자격증명이 만료되었다면

세션을 이어서 진행할 때 Workshop Studio 자격증명이 이미 만료된 경우에는, 위 절차 대신 💬 Claude Code 대화창에서 `/setup-bedrock` 을 실행해 같은 화면을 다시 띄우고 진행자에게 새로 받은 API 키를 등록하면 됩니다. 설치 자체는 유지되므로 키 교체만으로 충분합니다. 키 재등록 후 위 **Step 7** 과 동일하게 `/model` 로 모델을 확인하세요.

## 다음 단계

Bedrock 연동이 확인되었으면, 다음 페이지에서 MCP 서버 연결을 확인합니다.
