---
title: '프로젝트 클론'
weight: 25
---

워크숍에서 사용할 프로젝트를 다운로드하고 필요한 패키지를 설치합니다.

## Step 1. Claude Code 종료

이전 단계에서 `claude-play` 폴더에서 실행한 Claude Code 를 종료합니다.

💬 Claude Code 대화창에서:

:::code{showCopyAction=true showLineNumbers=false language=text}
/exit
:::

## Step 2. 프로젝트 다운로드

💻 터미널에서 아래 명령을 실행합니다. 바탕화면에 `ui-poc-workspace` 폴더가 생성됩니다.

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

## Step 3. 패키지 설치

다운로드된 프로젝트 폴더로 이동하여 필요한 패키지를 설치합니다. 약 1~2분 소요됩니다.

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

설치가 끝나면 아래와 비슷한 메시지가 표시됩니다:

```
Done in Xs
```

::alert[`pnpm: command not found` 오류가 나면 터미널을 닫고 새로 열어서 다시 시도하세요.]{type="info"}

## Step 4. Claude Code 실행

프로젝트 폴더에서 Claude Code 를 실행합니다.

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

💬 Claude Code 대화창이 열리면 다음 단계로 넘어갑니다.

::alert[이전 단계(Bedrock 설정)에서 등록한 자격증명은 그대로 유지됩니다. 다시 `/login` 할 필요는 없습니다.]{type="info"}
