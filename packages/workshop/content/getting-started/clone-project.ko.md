---
title: '프로젝트 클론'
weight: 20
---

워크숍에서 사용할 프로젝트를 다운로드하고 필요한 패키지를 설치합니다.

## Step 1. PowerShell 재시작 (Windows)

1. 현재 열려 있는 PowerShell 창을 **완전히 닫습니다** (새 탭이 아닌 **창 자체를 닫기**).
2. 시작 메뉴에서 **PowerShell** 을 검색해 **새 창을 엽니다**.

::alert[원라이너로 설치한 환경 변수(PATH)가 이미 열려 있는 창에는 반영되지 않을 수 있습니다. 새 PowerShell 을 열어야 `git`, `node`, `npm` 등의 명령이 정상 동작합니다.]{type="info"}

::alert[Mac 사용자는 이 단계를 건너뛰어도 됩니다.]{type="info"}

## Step 2. 프로젝트 다운로드

💻 (새) 터미널에서 아래 명령을 실행합니다. 바탕화면에 `ui-poc-workspace` 폴더가 생성됩니다.

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

💻 터미널에서 프로젝트 폴더로 이동하여 필요한 패키지를 설치합니다. 약 1~2분 소요됩니다.

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

설치가 완료되면 다음 단계에서 Claude Code 를 설정합니다.
