---
title: '도구 설치'
weight: 10
---

워크숍 1일차에 사용할 **Node.js 와 Claude Code** 를 설치합니다. 원라이너 한 줄로 필요한 도구(Homebrew/Scoop → Node.js → Claude Code)를 한 번에 설치할 수 있습니다.

## 문서에서 쓰는 표기

이 가이드는 **두 개의 서로 다른 입력창**을 오갑니다. 헷갈리지 않도록 아이콘으로 구분합니다.

| 표기                      | 의미                                                                                 |
| ------------------------- | ------------------------------------------------------------------------------------ |
| 💻 **터미널**             | Mac 의 터미널(또는 Ghostty) 또는 Windows 의 PowerShell. 시스템 명령을 입력하는 창.   |
| 💬 **Claude Code 대화창** | 터미널에서 `claude` 를 실행한 뒤 나타나는 AI 와의 대화창. 자연어 문장을 입력하는 곳. |

## 사전 준비: 터미널 여는 법

::::tabs
:::tab{label="Windows (PowerShell)"}

1. 작업 표시줄의 **시작(⊞)** 버튼을 클릭하거나, 키보드의 **Windows 키** 를 누릅니다.
2. `powershell` 이라고 입력합니다.
3. 검색 결과에서 **"Windows PowerShell"** 또는 **"PowerShell"** 을 클릭합니다.
4. 파란색(또는 검은색) 창이 열립니다. 이 창이 💻 **터미널** 입니다.

::alert[Scoop 은 관리자 권한 없이 동작합니다. 일반 PowerShell 로 충분합니다.]{type="info"}

:::
:::tab{label="Mac"}

1. 키보드에서 **⌘(Command) + Space** 를 눌러 Spotlight 를 엽니다.
2. `terminal` 이라고 입력하고 Enter.
3. 검은색 창이 열립니다. 이 창이 💻 **터미널** 입니다.

:::
::::

## 원라이너 설치

💻 터미널에 **아래 한 줄을 그대로 복사해서 붙여넣고 Enter** 를 누르세요. 설치는 약 3~5분 소요됩니다.

::::tabs
:::tab{label="Mac"}

:::code{showCopyAction=true showLineNumbers=false language=bash}
curl -fsSL https://raw.githubusercontent.com/haandol/ui-poc-workspace/main/scripts/install-claude-code.sh | bash
:::

:::
:::tab{label="Windows"}

위 "사전 준비" 에서 연 💻 PowerShell 에 아래를 붙여넣습니다.

:::code{showCopyAction=true showLineNumbers=false language=powershell}
iwr -useb https://raw.githubusercontent.com/haandol/ui-poc-workspace/main/scripts/install-claude-code.ps1 | iex
:::

:::
::::

**"Claude Code is ready"** 와 유사한 메시지가 나오면 설치 완료입니다.

원라이너가 내부적으로 실행하는 것은 (1) 패키지 매니저 확인 (Homebrew/Scoop), (2) Node.js LTS 설치, (3) `npm install -g @anthropic-ai/claude-code` 세 단계입니다.

## 설치 확인

💻 터미널에서:

:::code{showCopyAction=true showLineNumbers=false language=bash}
claude --version
:::

버전 번호가 출력되면 설치 성공입니다.

::alert[`claude` 명령을 찾을 수 없다는 오류가 나면 **터미널 창을 닫고 새로 열어서** 다시 실행해 보세요. PATH 갱신이 필요합니다.]{type="info"}

## 트러블슈팅

| 증상                                       | 해결 방법                                                                                      |
| ------------------------------------------ | ---------------------------------------------------------------------------------------------- |
| `npm install -g` 에서 권한 오류 (Mac)      | `sudo npm install -g @anthropic-ai/claude-code`                                                |
| `npm install -g` 에서 권한 오류 (Windows)  | Scoop 으로 Node.js 를 설치했다면 권한 오류가 나지 않습니다. 수동 설치한 경우 관리자 PowerShell 에서 재시도 |
| `node` / `claude` 명령을 못 찾음 (Windows) | PowerShell 창을 닫고 다시 연 뒤 재시도 (환경 변수 갱신 필요)                                   |
| Scoop 이 없거나 작동하지 않음 (Windows)    | [https://nodejs.org/ko/download](https://nodejs.org/ko/download) 에서 LTS `.msi` 직접 다운로드 |

## 수동 설치 (단계별)

원라이너가 실패했거나 각 단계를 직접 확인하고 싶다면 아래 가이드를 참고하세요:

- [Mac 수동 설치 가이드](https://github.com/haandol/ui-poc-workspace/blob/main/docs/INSTALLATION_MAC.md)
- [Windows 수동 설치 가이드](https://github.com/haandol/ui-poc-workspace/blob/main/docs/INSTALLATION_WIN.md)

## 다음 단계

Claude Code 를 실행하고 **Bedrock 자격증명을 등록**해야 실제로 AI 응답이 옵니다. 다음 페이지에서 진행합니다.
