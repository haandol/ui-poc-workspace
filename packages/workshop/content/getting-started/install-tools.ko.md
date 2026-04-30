---
title: '도구 설치'
weight: 10
---

워크숍에 필요한 도구를 설치합니다. 셋업 스크립트를 사용하면 한 번에 모든 환경설정이 완료됩니다.

## 사전 준비

자동 설치 스크립트를 실행하기 전에 아래 항목을 확인합니다.

::::tabs
:::tab{label="Mac"}

**1.** 기본 터미널(Terminal.app)을 열고, Xcode Command Line Tools를 설치합니다:

:::code{showCopyAction=true showLineNumbers=false language=bash}
xcode-select --install
:::

팝업이 나타나면 **설치**를 클릭합니다. 이미 설치되어 있으면 무시하세요.

**2.** Homebrew(패키지 매니저)를 설치합니다:

:::code{showCopyAction=true showLineNumbers=false language=bash}
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
:::

::alert[이미 Homebrew가 설치되어 있다면 이 단계를 건너뛰고 바로 아래 **자동 설치**로 이동하세요.]{type="info"}

:::
:::tab{label="Windows"}

프로젝트를 다운로드하려면 **Git**이 필요합니다. Git이 설치되어 있지 않다면 아래 순서로 설치합니다.

**1.** PowerShell을 열고 패키지 매니저(scoop)를 설치합니다:

:::code{showCopyAction=true showLineNumbers=false language=powershell}
Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser -Force
irm get.scoop.sh | iex
:::

**2.** Git을 설치합니다:

:::code{showCopyAction=true showLineNumbers=false language=powershell}
scoop install git
:::

::alert[이미 Git이 설치되어 있다면 이 단계를 건너뛰고 바로 아래 **자동 설치**로 이동하세요.]{type="info"}

:::
::::

## 자동 설치 (권장)

터미널을 열고 아래 명령어를 실행합니다.

::::tabs
:::tab{label="Mac"}

:::code{showCopyAction=true showLineNumbers=false language=bash}
curl -fsSL https://raw.githubusercontent.com/haandol/ui-poc-workspace/main/scripts/bootstrap.sh | bash
:::

스크립트가 완료되면 작업 폴더가 `~/Desktop/ui-poc-workspace/`에 생성됩니다.

:::
:::tab{label="Windows"}

아래 명령을 순서대로 실행합니다.

:::code{showCopyAction=true showLineNumbers=false language=powershell}
$desktop = [Environment]::GetFolderPath('Desktop')
git clone https://github.com/haandol/ui-poc-workspace "$desktop\ui-poc-workspace"
cd "$desktop\ui-poc-workspace"
powershell -ExecutionPolicy Bypass -File scripts\setup.ps1
:::

:::
::::

스크립트가 자동으로 설치하는 도구 목록입니다:

| 도구                             | 용도              |
| -------------------------------- | ----------------- |
| Homebrew (Mac) / scoop (Windows) | 패키지 매니저     |
| Git                              | 소스 코드 관리    |
| Node.js 24                       | JavaScript 런타임 |
| pnpm                             | 패키지 설치 도구  |
| Claude Code                      | AI 코딩 도우미    |

## 설치 확인

설치가 완료되면 아래 명령어로 각 도구가 정상 설치되었는지 확인합니다.

:::code{showCopyAction=true showLineNumbers=false language=bash}
node --version
pnpm --version
claude --version
:::

아래와 같이 버전이 출력되면 정상입니다:

```
v24.x.x
10.x.x
1.x.x
```

::alert[Node.js 버전이 24.x 미만이면 `brew install node@24` (Mac) 또는 `scoop install nodejs` (Windows)를 실행하세요.]{type="warning"}

## 수동 설치 (단계별)

스크립트 대신 단계별로 직접 설치하려면 아래 가이드를 참고하세요:

- [Mac 설치 가이드](https://github.com/haandol/ui-poc-workspace/blob/main/docs/INSTALLATION_MAC.md)
- [Windows 설치 가이드](https://github.com/haandol/ui-poc-workspace/blob/main/docs/INSTALLATION_WIN.md)
