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

아래와 같이 MCP 서버 목록이 표시되면 정상입니다:

```
──────────────────────────────────────────────────────
  Manage MCP servers
  7 servers

    Project MCPs (.mcp.json)
    airtable · ✔ connected
    alps-writer · ✔ connected
    asset-generator · ✘ failed
    pdf-reader · ✔ connected

    Built-in MCPs (always available)
    plugin:chrome-devtools-mcp:chrome-devtools · ✔ connected
    plugin:context7:context7 · ✔ connected
    plugin:nx:nx-mcp · ✔ connected
──────────────────────────────────────────────────────
```

**MCP 서버** (`.mcp.json`):

| MCP 서버        | 패키지                   | 용도                  |
| --------------- | ------------------------ | --------------------- |
| pdf-reader      | `@sylphx/pdf-reader-mcp` | 딥리서치 PDF 읽기     |
| alps-writer     | `alps-writer`            | PRD(ALPS) 문서 작성   |
| asset-generator | (프로젝트 내장)          | 이미지 에셋 생성      |
| airtable        | `airtable-mcp-server`    | 워크숍 진행 상태 추적 |

**플러그인** (`.claude/settings.json`):

| 플러그인            | 용도                                                                                                     |
| ------------------- | -------------------------------------------------------------------------------------------------------- |
| alps-writer         | PRD Feature를 ADR로 변환 후 코드로 구현하는 슬래시 명령 (`/feature-to-adr`, `/adr-impl`, `/adr-sync` 등) |
| context7            | 라이브러리/프레임워크 최신 문서 조회                                                                     |
| chrome-devtools-mcp | 브라우저 스크린샷 캡처 및 디버깅                                                                         |
| nx                  | 프로젝트 내부 빌드/실행 구조를 Claude 가 이해하기 위한 보조 도구 (직접 사용하지 않음)                    |

::alert[`airtable`과 `asset-generator` 서버는 각각 API Key 설정 전까지 `failed` 상태입니다. 아래 섹션에서 키를 설정하면 `connected`로 변경됩니다.]{type="info"}

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

::alert[Windows 에서는 환경 변수가 반영되려면 Claude Code 를 반드시 재시작해야 합니다.]{type="info"}

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

::alert[키가 없어도 워크숍 진행에는 문제가 없습니다. 이미지 생성 및 진행 상태 추적 기능만 비활성화됩니다.]{type="info"}
