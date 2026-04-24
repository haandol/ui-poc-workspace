---
title: 'MCP 서버 확인'
weight: 30
---

이 워크샵에서는 여러 MCP(Model Context Protocol) 서버를 활용합니다. MCP 서버는 Claude Code의 기능을 확장하는 플러그인으로, 프로젝트 폴더에 이미 설정되어 있습니다.

## MCP 서버 목록 확인

프로젝트 폴더에서 Claude Code를 실행한 뒤 `/mcp` 명령을 입력합니다.

::::tabs
:::tab{label="Mac"}

:::code{showCopyAction=true showLineNumbers=false language=bash}
cd ~/Desktop/ui-poc-workspace
claude
:::

:::
:::tab{label="Windows (PowerShell)"}

:::code{showCopyAction=true showLineNumbers=false language=powershell}
cd "$HOME\Desktop\ui-poc-workspace"
claude
:::

:::
::::

Claude Code 실행 후 프롬프트에 입력합니다:

:::code{showCopyAction=true showLineNumbers=false language=text}
/mcp
:::

아래와 같이 MCP 서버 목록이 표시되면 정상입니다:

```
──────────────────────────────────────────────────────
  Manage MCP servers
  8 servers

    Project MCPs (.mcp.json)
    airtable · ✔ connected
    alps-writer · ✔ connected
    pdf-reader · ✔ connected

    Built-in MCPs (always available)
    plugin:chrome-devtools-mcp · ✔ connected
    plugin:context7 · ✔ connected
    plugin:nx · ✔ connected
──────────────────────────────────────────────────────
```

각 MCP 서버의 역할은 다음과 같습니다:

| MCP 서버                | 역할                                         |
| ----------------------- | -------------------------------------------- |
| **pdf-reader**          | 딥리서치 PDF를 읽어주는 도구                 |
| **alps-writer**         | PRD(ALPS) 문서를 작성해주는 도구             |
| **airtable**            | 워크샵 진행 상태 추적                        |
| **chrome-devtools-mcp** | 브라우저 화면을 AI가 직접 보고 수정하는 도구 |
| **context7**            | 최신 기술 문서를 자동으로 찾아주는 도구      |
| **nx**                  | Nx 모노레포 워크스페이스 관리                |

::alert[`airtable` 서버가 `failed` 상태여도 워크샵 진행에는 문제가 없습니다. 진행 상태 추적 기능만 비활성화됩니다.]{type="info"}

## 진행 상태 추적 설정 (선택)

워크샵 진행 상황을 진행자와 공유하려면 Airtable 연동을 설정합니다. Claude Code 프롬프트에 입력합니다:

:::code{showCopyAction=true showLineNumbers=false language=text}
/workshop-status setup
:::

Claude가 두 가지를 물어봅니다:

1. **Airtable API Key** — 진행자에게 전달받은 값 (`pat_...`로 시작)
2. **닉네임** — 진행 상태에 표시될 이름 (예: "커피중독PM")

설정이 완료되면 이후 단계에서 진행 상태가 자동으로 공유됩니다.
