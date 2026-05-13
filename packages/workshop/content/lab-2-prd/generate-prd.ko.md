---
title: 'PRD 생성'
weight: 10
---

Claude Code와 `alps-writer` MCP 서버를 활용하여 리서치 PDF를 기반으로 PRD를 작성합니다.

## ALPS 문서란?

ALPS(Agentic Lean Product Spec)는 이 워크숍에서 사용하는 PRD 형식입니다. 총 9개 섹션으로 구성됩니다:

| 섹션          | 제목             | 내용                                          |
| ------------- | ---------------- | --------------------------------------------- |
| **Section 1** | 제품 개요        | 비전, 타겟 사용자, 핵심 문제, 솔루션 전략     |
| **Section 2** | MVP 목표         | 검증할 가설과 2~5개의 측정 가능한 목표        |
| **Section 3** | 데모 시나리오    | MVP 목표를 검증하는 핵심 사용자 여정          |
| **Section 4** | 고수준 아키텍처  | 시스템 구성도, 기술 스택                      |
| **Section 5** | 디자인 명세      | 주요 화면 구성, 화면 간 이동 흐름             |
| **Section 6** | 요구사항 요약    | 기능 목록(F1, F2...) 및 우선순위, 의존 관계   |
| **Section 7** | 기능별 상세 명세 | 각 Feature의 User Story, User Flow, 인수 조건 |
| **Section 8** | MVP 측정 지표    | 데이터 수집 방법 및 성공/실패 판단 기준       |
| **Section 9** | 범위 밖          | MVP에서 제외된 기능, 향후 로드맵, 기술 부채   |

::alert[UI PoC 전용 작성에서는 Section 4(아키텍처)·Section 8(측정 지표) 이 자동으로 간소화되거나 스킵될 수 있습니다. 문서에 해당 섹션이 비어 있어도 정상입니다.]{type="info"}

## PRD 작성 시 참고사항

- UI PoC 에서는 PRD 를 완벽하게 다듬는 것보다 **빠르게 작성하고 → 구현하고 → 피드백 받는 사이클을 빨리 도는 것**이 중요합니다. 큰 방향만 맞으면 "확인"으로 넘어가고, 세부 사항은 개발 중에 조정하세요.
- 이 워크숍의 UI PoC 기술 스택은 **Nuxt.js (Vue 3)** 입니다. PRD 에 기술 스택을 별도로 지정하지 않아도 프로젝트 구조에서 자동으로 인식됩니다.
- **Section 3 (데모 시나리오)** — AI 에이전트는 이 데모 시나리오를 통해 필요한 기능 목록을 예상합니다. 사용자가 어떤 화면에서 무엇을 하는지 **구체적으로** 작성할수록 이후 생성되는 기능 목록의 품질이 좋아집니다.
- **Section 6 (요구사항 요약)** — 전체 구현 범위를 확인하는 섹션입니다. UI PoC 에서 권장하는 기능 수는 **5~7개**입니다. 기능이 너무 많다면 `"F8 은 이번 PoC 에서 구현 안할거야"` 등으로 삭제를 요청하세요.
- **Section 7~9** — Section 6 까지 확정했다면 나머지는 자동 생성할 수 있습니다 (아래 Step 3 참고).

## Step 1. 리서치 PDF 준비 확인

이전 세션에서 받아둔 `research.pdf` 가 프로젝트의 `docs/` 폴더에 있는지 먼저 확인합니다. 백업 위치(예: `문서/ui-poc/research.pdf`) 에만 보관되어 있다면 **`바탕화면 > ui-poc-workspace > docs`** 로 복사합니다.

```
바탕화면/ui-poc-workspace/
└── docs/research.pdf    ← 여기에 있어야 함
```

::alert[파일명에 한글이나 공백이 포함되어 있다면 `research.pdf` 로 변경하세요. Claude Code 가 인식하지 못할 수 있습니다.]{type="warning"}

## Step 2. Claude Code 실행

프로젝트 폴더에서 Claude Code 를 실행합니다. 💻 터미널에서:

::::tabs
:::tab{label="Mac"}

:::code{showCopyAction=true showLineNumbers=false language=bash}
cd ~/Desktop/ui-poc-workspace && claude
:::

:::
:::tab{label="Windows (PowerShell)"}

:::code{showCopyAction=true showLineNumbers=false language=powershell}
cd "$([Environment]::GetFolderPath('Desktop'))\ui-poc-workspace"
claude
:::

:::
::::

::alert[이미 프로젝트 폴더에서 Claude Code 가 실행 중이라면 이 단계를 건너뛰세요. 실행 중인지 확인하려면 커서가 깜박이는 💬 대화창이 열려있는지 보면 됩니다.]{type="info"}

## Step 3. PRD 작성 요청

💬 Claude Code 대화창에서 아래와 같이 입력합니다. `@docs/`까지 입력한 뒤 **Tab 키**를 눌러 PDF 파일을 자동완성합니다.

:::code{showCopyAction=true showLineNumbers=false language=text}
@docs/research.pdf 를 읽고 UI PoC 를 위한 alps 문서를 작성해줘.
:::

::alert[`@` 문법을 사용하면 Claude Code가 해당 파일을 직접 읽을 수 있습니다. `@docs/`까지 입력 후 Tab 키를 누르면 파일명이 자동완성됩니다.]{type="info"}

ALPS 문서는 자동으로 한 번에 생성되지 않습니다. Claude Code가 Section 1부터 Section 9까지 **섹션별로 초안을 제시하고 사용자에게 확인을 요청**하며, 사용자가 내용을 읽고 **확인(또는 수정 요청)** 을 해야 다음 섹션으로 넘어갑니다.

**Section 6 까지 작성했다면**, 나머지 섹션은 자동으로 채울 수 있습니다. 💬 Claude Code 대화창에서 아래를 입력하세요:

:::code{showCopyAction=true showLineNumbers=false language=text}
현재 프로젝트 구조와 현재까지 작성된 prd 내용을 바탕으로 섹션 7~9 까지 알아서 작성해줘
:::

모든 섹션이 확정되면 ALPS 문서가 `docs/prd/` 폴더에 `.alps.md` 파일로 저장됩니다. 빠르게 진행하면 약 **10~15분**, 꼼꼼히 검토하면 **20~30분** 정도 소요됩니다.

## Step 4. 생성된 PRD 확인

PRD가 생성되면 💬 Claude Code 대화창에서 내용을 검토합니다.

:::code{showCopyAction=true showLineNumbers=false language=text}
docs/prd/ 에 있는 파일 목록을 보여줘
:::

생성된 `.alps.md` 파일을 열어 내용을 확인합니다.

::alert[Airtable 연동을 설정한 경우, ALPS 섹션이 저장될 때마다 진행 상태가 자동으로 기록됩니다 — Section 1 저장 → `PRD-START`, Section 6(피쳐 목록) → `PRD-FEATURES`, 문서 완료 export → `PRD-DONE`.]{type="info"}

:::code{showCopyAction=true showLineNumbers=false language=text}
@docs/prd/XYZ.alps.md 의 Feature 목록을 요약해줘
:::

::alert[파일명은 서비스 이름에 따라 다를 수 있습니다. `@docs/prd/`까지 입력 후 Tab 키로 자동완성하세요.]{type="info"}
