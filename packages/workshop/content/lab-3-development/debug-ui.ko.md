---
title: '화면 디버깅'
weight: 30
---

개발 중 화면이 의도대로 나오지 않으면, AI가 직접 브라우저 화면을 보고 문제를 찾아 수정할 수 있습니다. `chrome-devtools-mcp`를 활용합니다.

## 화면 확인 요청

💬 Claude Code 대화창에서 아래와 같이 요청합니다. 현재 개발 서버가 `http://localhost:3000`에서 실행 중이라는 점을 함께 알려주면 AI가 정확한 주소로 접근합니다.

| 상황                | 프롬프트 예시                                                             |
| ------------------- | ------------------------------------------------------------------------- |
| 화면 확인           | "localhost:3000 에 브라우저로 접속해서 스크린샷으로 캡처해줘"             |
| 화면이 깨져 보일 때 | "localhost:3000 브라우저에서 현재 페이지를 확인하고 깨진 부분을 수정해줘" |
| 에러가 발생할 때    | "localhost:3000 브라우저에 에러가 있는지 확인하고 수정해줘"               |
| 디자인 점검         | "localhost:3000 현재 페이지 스크린샷을 찍고, PRD와 일치하는지 비교해줘"   |

::alert["화면 봐줘", "스크린샷 찍어줘", "지금 화면이 이상하게 보이는데 뭐가 문제야?" 같은 간단한 요청만으로도 AI가 문제를 파악할 수 있습니다.]{type="info"}

## 일반적인 문제 해결

### 브라우저에 변경사항이 반영되지 않을 때

브라우저 캐시를 강제로 새로고침합니다:

- **Mac**: `Cmd + Shift + R`
- **Windows**: `Ctrl + Shift + R`

그래도 반영되지 않으면 💻 개발 서버 탭(탭 1)에서 `Ctrl+C` 로 서버를 종료한 뒤 재시작합니다:

:::code{showCopyAction=true showLineNumbers=false language=bash}
pnpm dev:web
:::

### 포트 충돌 오류

포트 3000이 이미 사용 중인 경우, `PORT` 환경변수를 지정해서 다른 포트로 실행할 수 있습니다.

::::tabs
:::tab{label="Mac"}

:::code{showCopyAction=true showLineNumbers=false language=bash}
PORT=3001 pnpm dev:web
:::

:::
:::tab{label="Windows (PowerShell)"}

:::code{showCopyAction=true showLineNumbers=false language=powershell}
$env:PORT=3001; pnpm dev:web
:::

:::
::::

그 후 브라우저에서 `http://localhost:3001` 로 접속합니다.
