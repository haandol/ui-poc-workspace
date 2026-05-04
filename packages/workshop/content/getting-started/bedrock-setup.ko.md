---
title: 'Bedrock 설정'
weight: 20
---

Claude Code 를 실행하고 **Bedrock 자격증명을 등록**합니다. 등록이 끝나야 실제로 AI 응답이 옵니다.

## 1. Claude Code 실행

연습용 폴더를 만들고 Claude Code 대화창을 엽니다.

::::tabs
:::tab{label="Mac"}

:::code{showCopyAction=true showLineNumbers=false language=bash}
mkdir -p ~/Desktop/claude-play && cd ~/Desktop/claude-play && claude
:::

:::
:::tab{label="Windows (PowerShell)"}

:::code{showCopyAction=true showLineNumbers=false language=powershell}
$desktop = [Environment]::GetFolderPath('Desktop')
New-Item -ItemType Directory -Path "$desktop\claude-play" -Force | Out-Null
cd "$desktop\claude-play"
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

**Step 3.** **인증 방법 선택** 화면이 뜨면 **`2` 를 눌러** `Bedrock API key (bearer token)` 를 선택하고 Enter. **Bedrock API 키** 방법이 가장 간단하므로 권장합니다.

![Auth method - Bedrock API key](/static/images/getting-started/setup-bedrock/cc-1.png)

**Step 4.** **Bedrock API key** 입력 화면에서 워크숍 진행자에게 전달받은 API 키를 붙여넣고 Enter.

![Paste Bedrock API key](/static/images/getting-started/setup-bedrock/cc-2.png)

**Step 5.** **AWS region** 입력 화면에서 반드시 `us-west-2` 를 입력하고 Enter.

![AWS region us-west-2](/static/images/getting-started/setup-bedrock/cc-3.png)

::alert[Claude Code 는 `~/.aws/config` 가 아니라 `AWS_REGION` 환경변수를 읽기 때문에, 프로필에 리전이 있더라도 여기서 명시적으로 지정해야 합니다.]{type="info"}

**Step 6.** **모델 버전 핀 고정** 화면에서 **`2` 를 눌러** `Pin the working models with 1M context` 를 선택하고 Enter. 환경변수를 직접 설정할 필요가 없습니다.

![Pin model versions](/static/images/getting-started/setup-bedrock/cc-4.png)

## 3. 동작 확인

💬 Claude Code 대화창에 아래처럼 테스트 질문을 입력해 응답이 오는지 확인합니다.

:::code{showCopyAction=true showLineNumbers=false language=text}
hi
:::

응답이 오면 설치 + 자격증명 등록까지 모두 완료입니다.

::alert[`/login` 입력 후 응답이 없거나 `on-demand throughput isn't supported` 오류가 발생하면 자격증명이 만료됐을 수 있습니다. 진행자에게 새 자격증명을 요청한 뒤 `/login` 을 다시 실행하세요.]{type="warning"}
