---
title: '화면 디버깅'
weight: 30
---

화면이 의도대로 나오지 않을 때 **`debug-ui` 스킬** 을 호출하면 AI 가 브라우저를 직접 열어 진단·수정해줍니다.

## 호출 방식

💬 Claude Code 대화창에 입력 시 **프롬프트 앞에 `debug-ui 스킬로`** 를 붙여 명시적으로 스킬을 호출합니다. 그래야 AI 가 다른 흐름으로 빠지지 않고 항상 브라우저를 열어 확인합니다.

| 상황                | 프롬프트 예시                                                      |
| ------------------- | ------------------------------------------------------------------ |
| 화면 확인           | "debug-ui 스킬로 지금 화면 어떻게 보이는지 봐줘"                   |
| 화면이 깨져 보일 때 | "debug-ui 스킬로 현재 페이지를 확인하고 깨진 부분을 수정해줘"      |
| 콘솔/네트워크 에러  | "debug-ui 스킬로 브라우저에 에러가 있는지 확인하고 수정해줘"       |
| PRD/ADR 일치 검증   | "debug-ui 스킬로 PRD F1 대로 됐는지 시각적으로 비교해줘"           |
| 모바일 반응형 점검  | "debug-ui 스킬로 모바일 사이즈에서는 어떻게 보이는지 확인해줘"     |
| 클릭/입력 검증      | "debug-ui 스킬로 결제 버튼을 누르면 어떻게 되는지 실제로 눌러봐줘" |

::alert[같은 대화창에서 처음 한 번 명시한 뒤 _"이 화면도 봐줘", "다음 페이지도 같은 방식으로 봐줘"_ 같은 후속 요청은 굳이 다시 명시하지 않아도 같은 스킬이 이어집니다.]{type="info"}

## 회의·핸드오프 직전 체크 — PRD/ADR 일치 검증

_"debug-ui 스킬로 PRD F1 대로 됐는지 시각적으로 비교해줘"_ 라고 요청하면 다음과 같이 표로 정리해 보여줍니다:

```
| 항목            | 기대 (PRD/ADR)    | 현재 화면  | 결과 |
| --------------- | ----------------- | ---------- | ---- |
| 결제 버튼 라벨  | "주문하기"        | "주문하기" | ✅   |
| 옵션 선택 UI    | 드롭다운          | 카드형     | ❌   |
| 메인 색상       | #2563eb (primary) | #1d4ed8    | ⚠️   |
```

내부 회의나 개발팀 핸드오프 전에 한 번 돌리면 **PRD 와 화면이 어긋난 채로 회의에 들어가서 핸드오프 시 다시 의견을 모으느라 시간이 새는 일** 을 막을 수 있습니다.

## 일반적인 문제 해결

### 브라우저에 변경사항이 반영되지 않을 때

브라우저 캐시를 강제로 새로고침합니다:

- **Mac**: `Cmd + Shift + R`
- **Windows**: `Ctrl + Shift + R`

그래도 반영되지 않으면 💻 개발 서버 탭(탭 1)에서 `Ctrl+C` 로 서버를 종료한 뒤 💻 터미널에서 재시작합니다:

:::code{showCopyAction=true showLineNumbers=false language=bash}
pnpm dev:web
:::

### 포트 충돌 오류

포트 3000이 이미 사용 중인 경우, 💻 터미널에서 `PORT` 환경변수를 지정해서 다른 포트로 실행할 수 있습니다.

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

그 후 브라우저에서 `http://localhost:3001` 로 접속하고, AI 에게 _"debug-ui 스킬은 3001 포트로 진행해줘"_ 라고 한 번 알려주면 됩니다.

### 브라우저를 못 연다고 할 때

`/plugin` Installed 탭에서 `chrome-devtools-mcp` 가 `✔ enabled` 인지 확인하고, 그래도 안 되면 `/reload-plugins` 를 한 번 실행합니다.
