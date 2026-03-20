# 개발 환경 설치 가이드

워크숍에 필요한 프로그램 설치 및 프로젝트 설정을 안내합니다.
**Windows**와 **Mac** 환경에 따라 안내가 다르니 본인 환경에 맞게 따라하세요.

> **작업 폴더 안내**: 이 가이드의 모든 명령어는 별도 표시가 없으면 **프로젝트 루트 폴더** (`ui-poc-workspace/`)에서 실행합니다.

---

## 1. Git 설치

Git은 프로젝트를 다운로드(클론)하는 데 필요합니다.

**Windows:**

1. https://git-scm.com 에서 다운로드 및 설치
2. 설치 과정에서 모든 옵션은 **기본값 그대로** 진행 (Next만 계속 클릭)
3. 설치가 완료되면 **Git Bash** 프로그램이 함께 설치됩니다

> **사내 환경 참고**: 소프트웨어 설치가 제한된 환경에서는 IT 부서에 Git 설치를 요청하거나, 사내 소프트웨어 센터를 통해 설치하세요.

**Mac:**

1. 터미널을 열고 아래 명령어를 실행합니다:

```bash
xcode-select --install
```

2. 팝업이 뜨면 "설치"를 클릭합니다 (이미 설치되어 있다면 무시)

**설치 확인** (Windows: Git Bash 또는 명령 프롬프트, Mac: 터미널):

```bash
git --version
# git version 2.x.x 이 출력되면 OK
```

---

## 2. Node.js 설치

**Windows / Mac 공통:**

1. https://nodejs.org 에서 **LTS 버전** (왼쪽 초록 버튼) 다운로드
2. 다운로드된 설치 파일을 실행하고, 모든 옵션은 **기본값 그대로** 진행

> **사내 환경 참고**: Node.js 설치가 제한된 경우, 사내 소프트웨어 센터를 통해 설치하거나 IT 부서에 요청하세요. 포터블 버전(https://nodejs.org/en/download)을 사용하는 방법도 있습니다.

**설치 확인:**

```bash
node --version
# v22.x.x 이상이면 OK
```

---

## 3. VS Code 설치

**Windows / Mac 공통:**

1. https://code.visualstudio.com 에서 다운로드 및 설치

---

## 4. pnpm, Kiro CLI 설치

VS Code를 실행하고, 내장 터미널을 엽니다.

- **Windows**: 상단 메뉴 `Terminal > New Terminal` (또는 `` Ctrl + ` ``)
- **Mac**: 상단 메뉴 `Terminal > New Terminal` (또는 `` Ctrl + ` ``)

터미널에 아래 명령어를 **한 줄씩** 복사 & 붙여넣기합니다:

```bash
npm install -g pnpm
```

```bash
npm install -g @anthropic-ai/kiro-cli
```

**설치 확인:**

```bash
pnpm --version
kiro-cli --version
```

> **참고**: Claude Code도 함께 사용하려면 [Claude Code Bedrock 설정 가이드](./CLAUDE_CODE_SETUP.md)를 따라주세요.

> **Windows 참고**: PowerShell에서 `npm install -g` 실행 시 권한 오류가 발생하면, **관리자 권한으로 PowerShell을 실행**하거나 `Set-ExecutionPolicy RemoteSigned -Scope CurrentUser` 명령어를 먼저 실행하세요.

---

## 5. 프로젝트 클론 및 설정 (중요)

> **이 단계가 핵심입니다.** 프로젝트를 클론하고 의존성을 설치해야 워크숍을 진행할 수 있습니다.

**Step 1.** VS Code 터미널에서 작업할 폴더로 이동합니다.

```bash
# Windows (명령 프롬프트 또는 PowerShell)
cd %USERPROFILE%\Desktop

# Mac
cd ~/Desktop
```

**Step 2.** 프로젝트를 클론합니다.

```bash
git clone https://github.com/haandol/ui-poc-workspace
cd ui-poc-workspace
```

**Step 3.** VS Code에서 프로젝트 폴더를 엽니다.

- `File > Open Folder`에서 바탕화면의 `ui-poc-workspace` 폴더를 선택합니다.
- 새 VS Code 창이 열리면, 다시 터미널을 엽니다 (`` Ctrl + ` ``)

> **중요**: 이후의 모든 명령어는 **프로젝트 루트 폴더** (`ui-poc-workspace/`) 에서 실행해야 합니다.
> VS Code에서 프로젝트 폴더를 열었다면 터미널이 자동으로 프로젝트 루트에 위치합니다.

**Step 4.** 의존성을 설치합니다.

```bash
pnpm install
```

> 이 과정은 1~2분 정도 걸릴 수 있습니다.

**Step 5.** 웹 개발 서버가 정상 동작하는지 확인합니다.

```bash
pnpm dev:web
```

- 브라우저에서 `http://localhost:3000` 에 접속하여 기본 페이지가 보이면 성공
- 확인 후 `Ctrl + C`로 서버를 종료합니다

---

## 6. MCP 서버 확인하기

프로젝트 루트의 `.mcp.json` 파일에 MCP 서버 설정이 이미 포함되어 있습니다.
별도 등록 없이 Kiro CLI나 Claude Code를 프로젝트 폴더에서 실행하면 자동으로 MCP 서버가 연결됩니다.

포함된 MCP 서버:

| MCP 서버 | 역할 |
|----------|------|
| **pdf-reader** | 리서치 PDF를 읽어주는 도구 |
| **alps-writer** | PRD(ALPS) 문서를 작성해주는 도구 |
| **chrome-devtools** | 브라우저 화면을 AI가 직접 확인하고 디버깅하는 도구 |

> **확인 방법**: 프로젝트 루트에서 `cat .mcp.json`을 실행하면 설정 내용을 볼 수 있습니다.

---

## 작업별 폴더 위치 요약

| 작업 | 폴더 위치 | 비고 |
|------|----------|------|
| 프로젝트 설정, 의존성 설치 | `ui-poc-workspace/` (루트) | `pnpm install` 등 |
| 리서치 PDF 저장 | `ui-poc-workspace/docs/` | 딥리서치 PDF를 여기에 복사 |
| PRD(ALPS) 문서 | `ui-poc-workspace/prd/` | AI가 자동으로 저장 |
| Kiro / Claude Code 실행 | `ui-poc-workspace/` (루트) | 항상 루트에서 실행 |
| 웹 개발 서버 실행 | `ui-poc-workspace/` (루트) | `pnpm dev:web` |
| 웹 소스 코드 | `ui-poc-workspace/packages/web/` | AI가 자동으로 수정 |

---

## 트러블슈팅

### Windows에서 PowerShell 권한 오류

```bash
# PowerShell 실행 정책 변경
Set-ExecutionPolicy RemoteSigned -Scope CurrentUser

# 이후 npm install -g 재시도
npm install -g pnpm
```

### pnpm install 실패

```bash
# Node.js 버전 확인 (22.x 이상 필요)
node --version

# pnpm 캐시 삭제 후 재설치
pnpm store prune
pnpm install
```

### 개발 서버가 안 뜰 때

```bash
# 포트 3000이 이미 사용 중인 경우
pnpm dev:web -- --port 3001
```

### Claude Code가 동작하지 않을 때

```bash
# API 키 확인
claude config

# 재설치
npm install -g @anthropic-ai/claude-code
```

### 브라우저에 변경사항이 반영되지 않을 때

- 브라우저 캐시 강제 새로고침: `Ctrl + Shift + R` (Mac: `Cmd + Shift + R`)
- 개발 서버 재시작: `Ctrl + C` 후 `pnpm dev:web`

### 사내 네트워크에서 npm install이 느리거나 실패할 때

```bash
# npm 레지스트리를 사내 미러로 변경 (IT 부서에 URL 확인)
npm config set registry https://your-internal-registry.example.com

# 또는 프록시 설정
npm config set proxy http://your-proxy:port
npm config set https-proxy http://your-proxy:port
```
