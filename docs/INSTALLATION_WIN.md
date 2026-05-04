# 수동 설치 가이드 (Windows)

[원라이너 설치](./INSTALLATION.md#1-원라이너-설치-mac--windows-공통) 가 자동으로 해주는 일(winget → Node.js → Claude Code)을 **직접 한 단계씩** 실행하고 싶을 때 사용하세요. 원라이너가 실패했거나, 각 단계에서 어떤 일이 일어나는지 눈으로 확인하고 싶을 때 유용합니다.

설치 과정은 총 3단계입니다. 모두 💻 **PowerShell** (**관리자 권한** 권장) 에서 진행합니다.

---

## 1. winget 확인 (패키지 매니저)

Node.js 를 간편하게 설치하기 위해 Windows 기본 패키지 매니저인 **winget** 을 사용합니다. Windows 10 최신 / Windows 11 이면 기본 탑재되어 있습니다.

```powershell
winget --version
```

버전이 출력되지 않으면 Microsoft Store 에서 **App Installer** 를 업데이트하거나, 아래 "Node.js 수동 설치" 를 따르세요.

> **winget 이 작동하지 않으면**: [https://nodejs.org/ko/download](https://nodejs.org/ko/download) 에서 LTS `.msi` 를 다운로드해 직접 설치한 뒤 **3단계** 로 건너뜁니다.

---

## 2. Node.js 설치

Claude Code 는 Node.js **22 이상**에서 동작합니다. 워크숍에서는 Node.js LTS 를 사용합니다.

```powershell
winget install --id OpenJS.NodeJS.LTS -e --source winget --accept-source-agreements --accept-package-agreements
```

설치 후 **PowerShell 창을 닫고 새로 열어야** `node`, `npm` 커맨드가 PATH 에 잡힙니다.

**설치 확인** (새 PowerShell 에서):

```powershell
node --version
# v22.x.x 이상이면 OK

npm --version
# 10.x.x 이상이면 OK
```

---

## 3. Claude Code 설치

npm 전역 설치로 `claude` 커맨드를 시스템에 등록합니다.

```powershell
npm install -g "@anthropic-ai/claude-code"
```

> 권한 오류가 나면 PowerShell 을 **관리자 권한**으로 다시 열고 재시도하세요.

설치 후 **PowerShell 창을 닫고 새로 여세요** (PATH 갱신 필요).

**설치 확인** (새 PowerShell 에서):

```powershell
claude --version
```

버전 번호가 출력되면 설치 성공입니다.

---

## 다음 단계

여기까지 오면 원라이너가 하는 일을 모두 끝낸 것입니다. 이제 [INSTALLATION.md — 2. Claude Code 실행](./INSTALLATION.md#2-claude-code-실행) 으로 돌아가 **대화창 실행 → `/setup-bedrock` 자격증명 등록**을 진행하세요.

---

## 트러블슈팅

| 증상                                    | 해결 방법                                                                                                                    |
| --------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------- |
| `winget` 이 없음 / 작동하지 않음        | Microsoft Store 에서 **App Installer** 업데이트, 또는 [nodejs.org](https://nodejs.org/ko/download) 에서 LTS `.msi` 수동 설치 |
| `node` / `claude` 를 찾을 수 없음       | PowerShell 창을 닫고 다시 연 뒤 재시도 (환경 변수 갱신 필요)                                                                 |
| `npm install -g` 권한 오류              | PowerShell 을 **관리자 권한** 으로 다시 실행                                                                                 |
| 사내 네트워크에서 `npm install` 이 느림 | `npm config set registry https://<사내-미러>` 또는 `npm config set proxy http://<프록시>:<포트>` 설정                        |
