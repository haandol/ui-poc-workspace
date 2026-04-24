---
title: '도구 설치'
weight: 10
---

워크샵에 필요한 도구를 설치합니다. 셋업 스크립트를 사용하면 한 번에 모든 환경설정이 완료됩니다.

## 자동 설치 (권장)

터미널을 열고 아래 명령어를 실행합니다.

::::tabs
:::tab{label="Mac"}

:::code{showCopyAction=true showLineNumbers=false language=bash}
curl -fsSL https://raw.githubusercontent.com/haandol/ui-poc-workspace/main/scripts/bootstrap.sh | bash
:::

스크립트가 완료되면 작업 폴더가 `~/Desktop/ui-poc-workspace/`에 생성됩니다.

:::
:::tab{label="Windows (PowerShell)"}

아래 두 명령을 순서대로 실행합니다.

:::code{showCopyAction=true showLineNumbers=false language=powershell}
git clone https://github.com/haandol/ui-poc-workspace "$HOME\Desktop\ui-poc-workspace"
:::

:::code{showCopyAction=true showLineNumbers=false language=powershell}
cd "$HOME\Desktop\ui-poc-workspace"
powershell -ExecutionPolicy Bypass -File scripts\setup.ps1
:::

:::
::::

스크립트가 자동으로 설치하는 도구 목록입니다:

| 도구           | 용도              |
| -------------- | ----------------- |
| Homebrew (Mac) | 패키지 매니저     |
| Git            | 소스 코드 관리    |
| Node.js 24     | JavaScript 런타임 |
| pnpm           | 패키지 설치 도구  |
| Claude Code    | AI 코딩 도우미    |

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

::alert[Node.js 버전이 24.x 미만이면 `brew install node@24` (Mac) 또는 [nodejs.org](https://nodejs.org)에서 최신 버전을 설치하세요.]{type="warning"}
