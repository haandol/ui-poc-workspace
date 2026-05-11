---
title: 'MCP 서버 확인'
weight: 30
---

이 워크숍에서는 여러 MCP(Model Context Protocol) 서버를 활용합니다. MCP 서버는 Claude Code의 기능을 확장하는 플러그인으로, 프로젝트 폴더에 이미 설정되어 있습니다.

## MCP 서버 목록 확인

이전 단계에서 프로젝트 폴더(`ui-poc-workspace`)에서 Claude Code 를 이미 실행한 상태입니다. 💬 Claude Code 대화창에 아래를 입력합니다:

:::code{showCopyAction=true showLineNumbers=false language=text}
/mcp
:::

::alert[Claude Code 가 실행 중이 아니라면, 💻 터미널에서 프로젝트 폴더로 이동한 뒤 `claude` 를 실행하세요. Mac: `cd ~/Desktop/ui-poc-workspace && claude` / Windows: `cd "$([Environment]::GetFolderPath('Desktop'))\ui-poc-workspace"; claude`]{type="info"}

아래와 같이 MCP 서버 목록이 표시되면 정상입니다:

```
──────────────────────────────────────────────────────
  Manage MCP servers
  9 servers

    Project MCPs (.mcp.json)
    airtable · ✔ connected
    alps-writer · ✔ connected
    asset-generator · ✘ failed
    pdf-reader · ✔ connected

    User MCPs (~/.claude.json)
    ppt-generator · ✔ connected
    tavily · ✔ connected

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

**유저 MCP** (`~/.claude.json`):

| MCP 서버      | 용도                       |
| ------------- | -------------------------- |
| ppt-generator | 프레젠테이션 슬라이드 생성 |
| tavily        | 웹 검색 및 리서치          |

**플러그인** (`.claude/settings.json`):

| 플러그인            | 용도                                                                                  |
| ------------------- | ------------------------------------------------------------------------------------- |
| context7            | 라이브러리/프레임워크 최신 문서 조회                                                  |
| chrome-devtools-mcp | 브라우저 스크린샷 캡처 및 디버깅                                                      |
| nx                  | 프로젝트 내부 빌드/실행 구조를 Claude 가 이해하기 위한 보조 도구 (직접 사용하지 않음) |

::alert[`airtable`과 `asset-generator` 서버는 각각 API Key 설정 전까지 `failed` 상태입니다. 아래 섹션에서 키를 설정하면 `connected`로 변경됩니다.]{type="info"}

## 이미지 에셋 생성 설정 (선택)

AI 이미지 생성 기능을 사용하려면 FAL API Key 가 필요합니다. 💬 Claude Code 대화창에 진행자에게 전달받은 키와 함께 아래처럼 요청하면, Claude 가 OS 에 맞게 환경변수를 등록해줍니다.

<!-- prettier-ignore-start -->
:::code{showCopyAction=true showLineNumbers=false language=text}
FAL_KEY 를 "진행자에게_전달받은_키" 로 설정해줘.
Mac이면 ~/.zshrc, Windows면 사용자 환경변수에 영구 등록해줘.
:::
<!-- prettier-ignore-end -->

Claude 가 실행할 명령에 대한 승인 요청이 뜨면 **Yes** 를 선택합니다. 등록이 끝나면 💬 대화창을 `/exit` 으로 종료하고 💻 터미널에서 다시 `claude` 로 실행한 뒤, `/mcp` 에서 `asset-generator` 가 `✔ connected` 상태로 바뀌었는지 확인합니다.

::alert[환경변수는 프로세스 시작 시점에만 읽히기 때문에 Claude Code 를 반드시 **재시작**해야 반영됩니다. `/mcp` 의 reconnect 만으로는 부족합니다.]{type="info"}

::alert[FAL API Key 가 없어도 워크숍 진행에는 문제가 없습니다. 이미지 에셋 생성 기능만 비활성화됩니다.]{type="info"}

## 진행 상태 추적 설정 (선택)

워크숍 진행 상황을 진행자와 공유하려면 Airtable 연동을 설정합니다. 💬 Claude Code 대화창에 입력합니다:

:::code{showCopyAction=true showLineNumbers=false language=text}
/workshop-status setup
:::

Claude가 두 가지를 물어봅니다:

1. **Airtable API Key** — 진행자에게 전달받은 값 (`pat_...`로 시작)
2. **닉네임** — 진행 상태에 표시될 이름 (예: "커피중독PM")

설정이 완료되면 이후 단계에서 진행 상태가 자동으로 공유됩니다.

::alert[Airtable 키가 없어도 워크숍 진행에는 문제가 없습니다. 진행 상태 추적 기능만 비활성화됩니다.]{type="info"}
