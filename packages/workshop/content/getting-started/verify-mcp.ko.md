---
title: 'MCP 서버 확인'
weight: 30
---

이 워크숍에서는 여러 MCP(Model Context Protocol) 서버를 활용합니다. MCP 서버는 Claude Code의 기능을 확장하는 플러그인으로, 프로젝트 폴더에 이미 설정되어 있습니다.

## MCP 서버 목록 확인

이전 단계에서 프로젝트 폴더(`ui-poc-workspace`)에서 Claude Code 를 이미 실행한 상태입니다. 💬 Claude Code 대화창에 아래를 입력하여 플러그인을 로드합니다:

:::code{showCopyAction=true showLineNumbers=false language=text}
/reload-plugins
:::

로드가 완료되면 💬 Claude Code 대화창에 아래를 입력하여 MCP 서버 목록을 확인합니다:

:::code{showCopyAction=true showLineNumbers=false language=text}
/mcp
:::

아래와 같이 **6개 MCP 서버 이름이 모두 보이면 정상**입니다:

```
────────────────────────────────────────────────────────────────────────────────
  Manage MCP servers
  6 servers

    Project MCPs
  ❯ airtable · ✔ connected · 16 tools
    asset-generator · ✔ connected · 1 tool
    pdf-reader · ✔ connected · 1 tool

    Built-in MCPs (always available)
    plugin:alps-writer:alps-writer · ✔ connected · 11 tools
    plugin:chrome-devtools-mcp:chrome-devtools · ✔ connected · 29 tools
    plugin:context7:context7 · ✔ connected · 2 tools
```

이 중 아래 두 서버는 API Key 설정이 필요해서 처음에는 `✘ failed` 상태일 수 있습니다. 다음 **워크숍 환경 설정** 섹션에서 키를 등록하면 `✔ connected` 로 바뀝니다.

| MCP 서버          | 용도                  |
| ----------------- | --------------------- |
| `airtable`        | 워크숍 진행 상태 추적 |
| `asset-generator` | 이미지 에셋 생성      |

## 플러그인 설치 확인

💬 Claude Code 대화창에 아래를 입력하여 플러그인 상태를 확인합니다:

:::code{showCopyAction=true showLineNumbers=false language=text}
/plugin
:::

플러그인 다이얼로그가 열리면 ⌨️ **오른쪽 방향키(`→`)** 를 눌러 **Installed** 탭으로 이동합니다. 아래와 같이 `Project` 섹션 아래 **4개 플러그인이 모두 `✔ enabled`** 로 표시되면 정상입니다:

```
────────────────────────────────────────────────────────────────────────────────
  Plugins  Discover   Installed   Marketplaces   Errors

      Project
  ❯ adr-writer Plugin · alps-writer · ✔ enabled
    alps-writer Plugin · alps-writer · ✔ enabled
    └ alps-writer MCP · ✔ connected
    chrome-devtools-mcp Plugin · claude-plugins-official · ✔ enabled
    └ chrome-devtools MCP · ✔ connected
    context7 Plugin · claude-plugins-official · ✔ enabled
    └ context7 MCP · ✔ connected
```

| 플러그인              | 용도                                                                                                          |
| --------------------- | ------------------------------------------------------------------------------------------------------------- |
| `alps-writer`         | PRD(ALPS) 문서 작성용 MCP 서버 + Feature를 ADR로 넘기는 슬래시 명령 (`/alps-init`, `/feature-to-adr`)         |
| `adr-writer`          | ADR 작성·구현·동기화 슬래시 명령 (`/adr-new`, `/adr-impl`, `/adr-sync`, `/adr-rollup`) 과 ADR↔코드 drift hook |
| `chrome-devtools-mcp` | 브라우저 스크린샷 캡처 및 디버깅                                                                              |
| `context7`            | 라이브러리/프레임워크 최신 문서 조회                                                                          |

## 워크숍 환경 설정 (선택)

이미지 생성(FAL API)과 진행 상태 추적(Airtable)을 한 번에 설정합니다. 💬 Claude Code 대화창에 입력합니다:

:::code{showCopyAction=true showLineNumbers=false language=text}
/workshop-status setup
:::

Claude가 세 가지를 한 번에 물어봅니다. 아래처럼 번호와 함께 입력하세요 (줄바꿈: Mac `Shift+Enter` / Windows `Ctrl+Enter`):

```
1. patXXXXXX
2. xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx:xxxxxxxx
3. 커피중독PM
```

1. **Airtable API Key** — 진행자에게 전달받은 값 (`pat_...`로 시작)
2. **FAL_KEY** — 이미지 생성용 fal.ai API 키 (진행자에게 전달받은 값)
3. **닉네임** — 진행 상태에 표시될 이름

설정이 완료되면 Claude Code 를 재시작한 뒤 MCP 연결을 확인합니다.

::::tabs
:::tab{label="Mac"}

💻 터미널에서 Claude Code 를 종료(`Ctrl+C` 또는 `/exit`)하고 다시 실행합니다:

:::code{showCopyAction=true showLineNumbers=false language=bash}
claude
:::

:::
:::tab{label="Windows (PowerShell)"}

💻 터미널에서 Claude Code 를 종료(`Ctrl+C` 또는 `/exit`)하고 다시 실행합니다:

:::code{showCopyAction=true showLineNumbers=false language=powershell}
claude
:::

:::
::::

💬 Claude Code 대화창이 열리면 아래를 입력합니다:

:::code{showCopyAction=true showLineNumbers=false language=text}
/mcp
:::

`asset-generator` 와 `airtable` 이 `✔ connected` 상태로 표시되는지 확인합니다.

`airtable` 이 connected 상태라면, 💬 Claude Code 대화창에서 아래 명령을 입력하여 진행 상태가 정상적으로 업데이트되는지 확인합니다:

:::code{showCopyAction=true showLineNumbers=false language=text}
/workshop-status
:::

현재 환경 설정 상태가 출력되고 Airtable 에 레코드가 생성되면 연동이 완료된 것입니다.
