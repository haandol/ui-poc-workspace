---
title: '개발 웹 서버 실행'
weight: 10
---

개발하는 동안 터미널 탭을 **2개** 사용합니다. 하나는 개발 웹 서버용, 하나는 Claude Code 용입니다.

## Step 1. 개발 웹 서버 탭 열기

Lab 2 에서 사용하던 Claude Code 세션이 열려있는 터미널 창은 그대로 둡니다. **새 탭을 하나 엽니다.**

- **Mac**: `Cmd + T`
- **Windows**: `Ctrl + Shift + T`

## Step 2. 개발 웹 서버 실행

💻 새로 연 터미널 탭에서 개발 웹 서버를 실행합니다. **이 탭은 닫지 말고 계속 켜둡니다.**

::::tabs
:::tab{label="Mac"}

:::code{showCopyAction=true showLineNumbers=false language=bash}
cd ~/Desktop/ui-poc-workspace && pnpm dev:web
:::

:::
:::tab{label="Windows (PowerShell)"}

:::code{showCopyAction=true showLineNumbers=false language=powershell}
cd "$([Environment]::GetFolderPath('Desktop'))\ui-poc-workspace"
pnpm dev:web
:::

:::
::::

아래와 같은 출력이 나오면 서버가 정상 실행된 것입니다:

```
  ➜  Local:   http://localhost:3000/
  ➜  Network: use --host to expose
```

## Step 3. 브라우저에서 확인

브라우저에서 아래 주소를 엽니다:

:button[http://localhost:3000 열기]{target="\_blank" href="http://localhost:3000" variant="primary" iconName="external" iconAlign="right"}

![개발 웹 서버 기본 페이지](/static/images/lab-3/dev-server.png)

위 화면이 보이면 웹 서버가 정상적으로 실행된 것입니다.

::alert[코드가 변경되면 브라우저가 자동으로 새로고침됩니다 (Hot Reload). 개발 웹 서버 탭은 항상 켜두세요.]{type="info"}

## Step 4. Claude Code 탭으로 전환

Lab 2 에서 사용하던 Claude Code 탭으로 돌아갑니다. 대화창이 그대로 열려있으면 바로 사용하면 됩니다.

::alert[만약 Claude Code 를 이미 종료했거나 탭을 닫았다면, 새 탭을 열고 아래를 실행하세요. Mac: `cd ~/Desktop/ui-poc-workspace && claude` / Windows: `cd "$([Environment]::GetFolderPath('Desktop'))\ui-poc-workspace"; claude`]{type="info"}

이제 두 탭이 준비되었습니다:

- **탭 1** 📺 개발 웹 서버 (항상 켜두기)
- **탭 2** 💬 Claude Code (AI 작업용)
