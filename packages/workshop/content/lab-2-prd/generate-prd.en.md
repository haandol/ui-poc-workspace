---
title: 'PRD 생성'
weight: 10
---

Claude Code와 `alps-writer` MCP 서버를 활용하여 리서치 PDF를 기반으로 PRD를 작성합니다.

## ALPS 문서란?

ALPS(Agentic Lean Product Spec)는 이 워크숍에서 사용하는 PRD 형식입니다. 다음 섹션으로 구성됩니다:

- **Section 1**: 제품 개요 및 목표
- **Section 6**: 기능 요구사항 요약 (Feature 목록)
- **Section 7**: 기능별 상세 명세 (User Story, User Flow, 인수 조건)
- **Section 9**: 기술 스택 및 구현 가이드

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

Claude Code가 PDF를 분석하고 ALPS 문서를 `docs/prd/` 폴더에 저장합니다. 완료까지 2~3분 정도 소요됩니다.

## Step 3. 생성된 PRD 확인

PRD가 생성되면 내용을 검토합니다.

:::code{showCopyAction=true showLineNumbers=false language=text}
docs/prd/ 에 있는 파일 목록을 보여줘
:::

생성된 `.alps.md` 파일을 열어 내용을 확인합니다.

:::code{showCopyAction=true showLineNumbers=false language=text}
@docs/prd/XYZ.alps.md 의 Feature 목록을 요약해줘
:::

::alert[파일명은 서비스 이름에 따라 다를 수 있습니다. `@docs/prd/`까지 입력 후 Tab 키로 자동완성하세요.]{type="info"}
