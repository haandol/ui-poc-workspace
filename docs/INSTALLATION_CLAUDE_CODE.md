# Claude Code 설치 & 자격증명 등록 가이드

워크숍 1일차에서 사용할 **Claude Code 를 설치하고 Bedrock 자격증명을 등록** 하는 전체 과정을 담고 있습니다. 순서대로 따라가면 Claude Code 가 동작하는 상태까지 만들 수 있습니다.

---

## 1. 원라이너 설치 (Mac / Windows 공통)

필요한 도구(Node.js, Claude Code) 를 한 번에 설치합니다. 터미널 또는 PowerShell 에 **아래 한 줄을 그대로 복사해서 붙여넣고 Enter** 를 누르세요.

**Mac** — 💻 터미널:

```bash
curl -fsSL https://raw.githubusercontent.com/haandol/ui-poc-workspace/main/scripts/install-claude-code.sh | bash
```

**Windows** — 💻 PowerShell 을 **관리자 권한** 으로 열고:

```powershell
iwr -useb https://raw.githubusercontent.com/haandol/ui-poc-workspace/main/scripts/install-claude-code.ps1 | iex
```

설치는 약 3~5분 소요됩니다. **"Claude Code is ready"** 와 유사한 메시지가 나오면 완료.

원라이너가 내부적으로 실행하는 것은 (1) Homebrew/winget 확인, (2) Node.js LTS 설치, (3) `npm install -g @anthropic-ai/claude-code` 세 단계입니다.

**설치 확인** — 터미널 또는 PowerShell 에서:

```bash
claude --version
```

버전 번호가 출력되면 설치 성공입니다.

---

## 2. Claude Code 실행 및 자격증명 입력

Claude Code 를 한 번 실행해 **진행자가 제공한 Bedrock 자격증명** 을 등록합니다.

**Mac**:

```bash
mkdir -p ~/Desktop/claude-play && cd ~/Desktop/claude-play && claude
```

**Windows**:

```powershell
$desktop = [Environment]::GetFolderPath('Desktop')
New-Item -ItemType Directory -Path "$desktop\claude-play" -Force | Out-Null
cd "$desktop\claude-play"
claude
```

Claude Code 대화창이 열리면(💬 프롬프트 커서가 깜박임), 아래 슬래시 명령을 입력합니다.

```
/setup-bedrock
```

그러면 Claude 가 자격증명 입력을 안내합니다. **진행자가 공유한 링크에서 API Key 를 복사** 해 요청하는 값을 차례대로 붙여넣으세요.

일반적으로 아래 값들을 묻습니다 (진행자 안내에 따라 실제 항목은 조금 다를 수 있습니다):

1. **AWS_ACCESS_KEY_ID** — 진행자 링크에서 복사
2. **AWS_SECRET_ACCESS_KEY** — 진행자 링크에서 복사
3. **AWS_SESSION_TOKEN** (Workshop Studio 를 사용하는 경우) — 진행자 링크에서 복사
4. **AWS_REGION** — 보통 `us-east-1`

입력이 끝나면 Claude 가 확인 메시지를 보여줍니다. 이후 간단한 테스트 질문을 해서 응답이 오는지 확인해보세요:

```
안녕, 잘 들리면 한 줄로 답해줘.
```

응답이 오면 자격증명 등록 완료입니다.

> **Workshop Studio 자격 증명은 일정 시간 후 만료됩니다.** Claude Code 가 갑자기 동작하지 않으면 `/setup-bedrock` 을 다시 실행해 재입력하세요. 진행자가 별도 방식(Bedrock API Key 등) 을 안내하면 그 방식을 따릅니다 — 상세는 [CLAUDE_CODE_SETUP.md](./CLAUDE_CODE_SETUP.md) 참조.

---

## 3. 트러블슈팅

| 증상                                       | 해결 방법                                                                                      |
| ------------------------------------------ | ---------------------------------------------------------------------------------------------- |
| `npm install -g` 에서 권한 오류 (Mac)      | `sudo npm install -g @anthropic-ai/claude-code`                                                |
| `npm install -g` 에서 권한 오류 (Windows)  | PowerShell 을 **관리자 권한** 으로 다시 실행 후 시도                                           |
| `node` / `claude` 명령을 못 찾음 (Windows) | PowerShell 창을 닫고 다시 연 뒤 재시도 (환경 변수 갱신 필요)                                   |
| winget 이 없거나 작동하지 않음 (Windows)   | [https://nodejs.org/ko/download](https://nodejs.org/ko/download) 에서 LTS `.msi` 직접 다운로드 |
| `/setup-bedrock` 입력 후 응답이 없음       | 자격증명이 만료됐을 수 있음. 진행자에게 새 자격증명 요청 후 재입력                             |
