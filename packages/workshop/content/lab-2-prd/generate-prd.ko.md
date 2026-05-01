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

## Step 1. Claude Code 실행

프로젝트 폴더에서 Claude Code를 실행합니다.

::::tabs
:::tab{label="Mac"}

:::code{showCopyAction=true showLineNumbers=false language=bash}
cd ~/Desktop/ui-poc-workspace
claude
:::

:::
:::tab{label="Windows (PowerShell)"}

:::code{showCopyAction=true showLineNumbers=false language=powershell}
cd "$([Environment]::GetFolderPath('Desktop'))\ui-poc-workspace"
claude
:::

:::
::::

## Step 2. PRD 작성 요청

Claude Code 프롬프트에서 아래와 같이 입력합니다. `@docs/`까지 입력한 뒤 **Tab 키**를 눌러 PDF 파일을 자동완성합니다.

:::code{showCopyAction=true showLineNumbers=false language=text}
@docs/research.pdf 를 읽고 UI PoC 를 위한 alps 문서를 작성해줘.
:::

::alert[`@` 문법을 사용하면 Claude Code가 해당 파일을 직접 읽을 수 있습니다. `@docs/`까지 입력 후 Tab 키를 누르면 파일명이 자동완성됩니다.]{type="info"}

ALPS 문서는 자동으로 한 번에 생성되지 않습니다. Claude Code가 Section 1부터 Section 9까지 **섹션별로 초안을 제시하고 사용자에게 확인을 요청**하며, 사용자가 내용을 읽고 **확인(또는 수정 요청)** 을 해야 다음 섹션으로 넘어갑니다.

::alert[각 섹션마다 제시되는 내용을 꼼꼼히 읽고, 제품의 의도와 다르면 구체적으로 수정 요청을 하세요. 이 단계에서 명확히 해둘수록 Lab 3 개발 품질이 좋아집니다.]{type="warning"}

모든 섹션이 확정되면 ALPS 문서가 `docs/prd/` 폴더에 `.alps.md` 파일로 저장됩니다. 인터랙티브하게 진행되기 때문에 완료까지 약 **20~30분** 정도 소요됩니다.

## Step 3. 생성된 PRD 확인

PRD가 생성되면 내용을 검토합니다.

:::code{showCopyAction=true showLineNumbers=false language=text}
docs/prd/ 에 있는 파일 목록을 보여줘
:::

생성된 `.alps.md` 파일을 열어 내용을 확인합니다.

::alert[Airtable 연동을 설정한 경우, ALPS 섹션이 저장될 때마다 진행 상태가 자동으로 기록됩니다 — Section 1 저장 → `PRD-START`, Section 6(피쳐 목록) → `PRD-FEATURES`, 문서 완료 export → `PRD-DONE`.]{type="info"}

:::code{showCopyAction=true showLineNumbers=false language=text}
@docs/prd/XYZ.alps.md 의 Feature 목록을 요약해줘
:::

::alert[파일명은 서비스 이름에 따라 다를 수 있습니다. `@docs/prd/`까지 입력 후 Tab 키로 자동완성하세요.]{type="info"}
