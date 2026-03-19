# 개발 환경 설치 가이드

워크숍에 필요한 프로그램 설치 및 프로젝트 설정을 안내합니다.
**Windows**와 **Mac** 환경에 따라 안내가 다르니 본인 환경에 맞게 따라하세요.

---

## 1. Git 설치

Git은 프로젝트를 다운로드(클론)하는 데 필요합니다.

**Windows:**

1. https://git-scm.com 에서 다운로드 및 설치
2. 설치 과정에서 모든 옵션은 **기본값 그대로** 진행 (Next만 계속 클릭)
3. 설치가 완료되면 **Git Bash** 프로그램이 함께 설치됩니다

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

## 4. pnpm 및 Claude Code 설치

VS Code를 실행하고, 내장 터미널을 엽니다.

- **Windows**: 상단 메뉴 `Terminal > New Terminal` (또는 `` Ctrl + ` ``)
- **Mac**: 상단 메뉴 `Terminal > New Terminal` (또는 `` Ctrl + ` ``)

터미널에 아래 명령어를 **한 줄씩** 복사 & 붙여넣기합니다:

```bash
npm install -g pnpm
```

```bash
npm install -g @anthropic-ai/claude-code
```

**설치 확인:**

```bash
pnpm --version
claude --version
```

> **참고**: Claude Code 사용을 위해 API 인증이 필요합니다. [Claude Code Bedrock 설정 가이드](./CLAUDE_CODE_SETUP.md)를 따라주세요.

---

## 5. 프로젝트 클론 및 설정

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

- `File > Open Folder`에서 바탕화면의 `non-tech-ui-poc-workshop` 폴더를 선택합니다.
- 새 VS Code 창이 열리면, 다시 터미널을 엽니다 (`` Ctrl + ` ``)

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

## 6. MCP 서버 설정하기

AI 도구가 PDF 읽기, PRD 작성, 브라우저 디버깅을 할 수 있도록 MCP 서버를 등록합니다.

VS Code 터미널에서 아래 명령어를 **한 줄씩** 실행합니다:

**PDF Reader MCP** — 리서치 PDF를 읽어주는 도구 ([github](https://github.com/SylphxAI/pdf-reader-mcp)):

```bash
kiro-cli mcp add --name pdf-reader --command npx --args "-y" --args "@sylphx/pdf-reader-mcp" --scope global
```

**ALPS Writer MCP** — PRD(ALPS) 문서를 작성해주는 도구 ([github](https://github.com/haandol/alps-writer-mcp)):

```bash
kiro-cli mcp add --name alps-writer --command npx --args "-y" --args "alps-writer" --scope global --env ALPS_OUTPUT_DIR="$PWD/prd"
```

**Chrome DevTools MCP** — 브라우저 화면을 AI가 직접 확인하고 디버깅할 수 있게 해주는 도구:

```bash
kiro-cli mcp add --name chrome-devtools --command npx --args "-y" --args "chrome-devtools-mcp@latest" --scope global
```

> **참고**: MCP 등록은 한 번만 하면 됩니다. 다음에 Kiro를 다시 실행해도 자동으로 연결됩니다.

---

## 트러블슈팅

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
