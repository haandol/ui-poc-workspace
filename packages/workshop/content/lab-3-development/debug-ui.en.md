---
title: '화면 디버깅'
weight: 30
---

개발 중 화면이 의도대로 나오지 않으면, AI가 직접 브라우저 화면을 보고 문제를 찾아 수정할 수 있습니다. `chrome-devtools-mcp`를 활용합니다.

## 사전 준비

Chrome 브라우저에서 `http://localhost:3000`을 열어둡니다.

::alert[이 기능은 Chrome 브라우저에서만 동작합니다. Safari나 Firefox에서는 사용할 수 없습니다.]{type="warning"}

## 화면 확인 요청

Claude Code 프롬프트에서 아래와 같이 요청합니다:

| 상황                | 프롬프트 예시                                              |
| ------------------- | ---------------------------------------------------------- |
| 화면 확인           | "지금 브라우저 화면을 스크린샷으로 캡처해서 확인해줘"      |
| 화면이 깨져 보일 때 | "브라우저에서 현재 페이지를 확인하고 깨진 부분을 수정해줘" |
| 에러가 발생할 때    | "브라우저에 에러가 있는지 확인하고 수정해줘"               |
| 디자인 점검         | "현재 페이지 스크린샷을 찍고, PRD와 일치하는지 비교해줘"   |

"화면 봐줘", "스크린샷 찍어줘" 같은 간단한 요청만으로도 AI가 문제를 파악할 수 있습니다.

## 일반적인 문제 해결

### 브라우저에 변경사항이 반영되지 않을 때

브라우저 캐시를 강제로 새로고침합니다:

- **Mac**: `Cmd + Shift + R`
- **Windows**: `Ctrl + Shift + R`

그래도 반영되지 않으면 개발 서버를 재시작합니다:

:::code{showCopyAction=true showLineNumbers=false language=bash}

# 탭 1에서 Ctrl+C로 서버 종료 후 재시작

pnpm dev:web
:::

### 포트 충돌 오류

포트 3000이 이미 사용 중인 경우:

:::code{showCopyAction=true showLineNumbers=false language=bash}
pnpm dev:web -- --port 3001
:::

그 후 브라우저에서 `http://localhost:3001`로 접속합니다.
