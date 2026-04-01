# 개발 환경 설치 가이드 (Mac)

워크숍에 필요한 프로그램 설치 및 프로젝트 설정을 안내합니다.

> **작업 폴더 안내**: 이 가이드의 모든 명령어는 별도 표시가 없으면 **프로젝트 루트 폴더** (`ui-poc-workspace/`)에서 실행합니다.

---

## Quick Setup (권장)

아래 명령어 하나로 클론 + 모든 환경설정을 완료할 수 있습니다:

```bash
curl -fsSL https://raw.githubusercontent.com/haandol/ui-poc-workspace/main/scripts/bootstrap.sh | bash
```

이미 프로젝트를 클론한 경우:

```bash
bash scripts/setup.sh
```

> 스크립트가 Homebrew, Git, Node.js, pnpm, Claude Code를 자동 설치합니다.
> 설치 완료 후 아래 **6. MCP 서버 및 플러그인 확인하기** 로 이동하세요.

---

## 수동 설치 (단계별)

스크립트 대신 직접 설치하려면 아래 단계를 따라하세요.

---

## 1. Ghostty 설치 (터미널)

이후 모든 설치 및 실행은 터미널에서 진행합니다. Claude Code를 실행할 터미널로 Ghostty를 사용합니다.

1. https://ghostty.org 에서 다운로드 및 설치
2. 설치 후 Ghostty를 실행하여 터미널이 정상적으로 열리는지 확인합니다

> **참고**: Ghostty 설치가 어려운 경우, 기본 터미널(Terminal.app) 또는 iTerm2를 사용해도 됩니다.

---

## 2. Homebrew 설치 (패키지 매니저)

이후 Git, Node.js 등을 터미널에서 간편하게 설치하기 위해 Homebrew를 먼저 설치합니다.

Ghostty 터미널에서 아래 명령어를 실행합니다:

```bash
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
```

> 이미 설치되어 있다면 무시해도 됩니다.

---

## 3. Git, Node.js 설치

Ghostty 터미널에서 아래 명령어를 실행합니다:

```bash
brew install git node@24 glow
```

**설치 확인:**

```bash
git --version
# git version 2.x.x 이 출력되면 OK

node --version
# v24.x.x 이상이면 OK
```

---

## 4. pnpm, Claude Code 설치

Ghostty 터미널에서 아래 명령어를 **한 줄씩** 복사 & 붙여넣기합니다:

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

> **참고**: Bedrock을 통해 Claude Code를 사용하려면 [Claude Code Bedrock 설정 가이드](./CLAUDE_CODE_SETUP.md)를 따라주세요.

---

## 5. 프로젝트 클론 및 설정 (중요)

> **이 단계가 핵심입니다.** 프로젝트를 다운로드하고 필요한 패키지를 설치해야 워크숍을 진행할 수 있습니다.

**Step 1.** Ghostty 터미널에서 바탕화면으로 이동합니다.

```bash
cd ~/Desktop
```

**Step 2.** 프로젝트를 클론합니다.

```bash
git clone https://github.com/haandol/ui-poc-workspace
cd ui-poc-workspace
```

**Step 3.** 프로젝트에 필요한 패키지를 설치합니다.

```bash
pnpm install
```

> 이 과정은 1~2분 정도 걸릴 수 있습니다.

**Step 4.** 웹 개발 서버가 정상 동작하는지 확인합니다.

```bash
pnpm dev:web
```

- 브라우저에서 `http://localhost:3000` 에 접속하여 기본 페이지가 보이면 성공
- 확인 후 `Ctrl + C`로 서버를 종료합니다

---

## 6. MCP 서버 및 플러그인 확인하기

프로젝트에 MCP 서버와 Claude Code 플러그인이 이미 설정되어 있습니다.
별도 등록 없이 Claude Code를 프로젝트 폴더에서 실행하면 자동으로 연결됩니다.

**확인 방법**: 프로젝트 루트에서 Claude Code를 실행한 뒤 `/mcp` 명령으로 목록을 확인합니다.

```bash
claude
```

Claude Code 실행 후:

```
/mcp
```

아래 도구들이 목록에 표시되면 정상입니다:

| 도구                    | 역할                                               |
| ----------------------- | -------------------------------------------------- |
| **pdf-reader**          | 리서치 PDF를 읽어주는 도구                         |
| **alps-writer**         | PRD(ALPS) 문서를 작성해주는 도구                   |
| **chrome-devtools-mcp** | 브라우저 화면을 AI가 직접 보고 문제를 찾아주는 도구 |
| **context7**            | 최신 기술 문서를 자동으로 찾아주는 도구             |
| **frontend-design**     | 화면 디자인 품질을 높여주는 도구                    |
| **typescript-lsp**      | 코드 오류를 자동으로 찾아주는 도구                  |

---

## (선택) glow — 터미널 마크다운 뷰어

터미널에서 마크다운 문서를 보기 좋게 렌더링해주는 도구입니다.

사용 예시:

```bash
glow docs/WORKSHOP.md
```

> 2단계에서 Homebrew를 설치했다면 바로 사용할 수 있습니다.

---

## 작업별 폴더 위치 요약

| 작업                       | 폴더 위치                        | 비고                       |
| -------------------------- | -------------------------------- | -------------------------- |
| 프로젝트 설정, 패키지 설치 | `ui-poc-workspace/` (루트)       | `pnpm install` 등          |
| 리서치 PDF 저장            | `ui-poc-workspace/docs/`         | 딥리서치 PDF를 여기에 복사 |
| PRD(ALPS) 문서             | `ui-poc-workspace/prd/`          | AI가 자동으로 저장         |
| Claude Code 실행           | `ui-poc-workspace/` (루트)       | 항상 루트에서 실행         |
| 웹 개발 서버 실행          | `ui-poc-workspace/` (루트)       | `pnpm dev:web`             |
| 웹 소스 코드               | `ui-poc-workspace/packages/web/` | AI가 알아서 수정 (직접 열 필요 없음) |

---

## 트러블슈팅

### pnpm install 실패

```bash
# Node.js 버전 확인 (24.x 이상 필요)
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
# 설정 확인
claude config

# Bedrock 설정 확인 (CLAUDE_CODE_SETUP.md 참고)
echo $CLAUDE_CODE_USE_BEDROCK

# 재설치
npm install -g @anthropic-ai/claude-code
```

### 브라우저에 변경사항이 반영되지 않을 때

- 브라우저 캐시 강제 새로고침: `Cmd + Shift + R`
- 개발 서버 재시작: `Ctrl + C` 후 `pnpm dev:web`

### 사내 네트워크에서 npm install이 느리거나 실패할 때

```bash
# npm 레지스트리를 사내 미러로 변경 (IT 부서에 URL 확인)
npm config set registry https://your-internal-registry.example.com

# 또는 프록시 설정
npm config set proxy http://your-proxy:port
npm config set https-proxy http://your-proxy:port
```
