# 수동 설치 가이드 (Mac)

[원라이너 설치](./INSTALLATION.md#1-원라이너-설치-mac--windows-공통) 가 자동으로 해주는 일(Homebrew → Node.js → Claude Code)을 **직접 한 단계씩** 실행하고 싶을 때 사용하세요. 원라이너가 실패했거나, 각 단계에서 어떤 일이 일어나는지 눈으로 확인하고 싶을 때 유용합니다.

설치 과정은 총 3단계입니다. 모두 💻 **터미널** (기본 Terminal.app, iTerm2, Ghostty 등) 에서 진행합니다.

---

## 1. Homebrew 설치 (패키지 매니저)

Node.js 를 간편하게 설치하기 위해 Homebrew 를 먼저 설치합니다. 이미 설치되어 있다면 이 단계는 건너뛰세요 (`brew --version` 으로 확인).

```bash
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
```

설치 후 터미널 메시지에 안내되는 **Next steps** (`eval "$(/opt/homebrew/bin/brew shellenv)"` 류) 를 그대로 따라 실행해 `brew` 를 PATH 에 잡아주세요.

**설치 확인:**

```bash
brew --version
# Homebrew 4.x.x 가 출력되면 OK
```

---

## 2. Node.js 설치

Claude Code 는 Node.js **22 이상**에서 동작합니다. 워크숍에서는 Node.js 24 를 사용합니다.

```bash
brew install node@24
brew link --overwrite --force node@24
```

**설치 확인:**

```bash
node --version
# v24.x.x 이상이면 OK

npm --version
# 10.x.x 이상이면 OK
```

> 이미 Node.js 가 있는데 버전이 22 미만이라면 위 명령으로 덮어쓸 수 있습니다.

---

## 3. Claude Code 설치

npm 전역 설치로 `claude` 커맨드를 시스템에 등록합니다.

```bash
npm install -g @anthropic-ai/claude-code
```

> 권한 오류 (`EACCES`) 가 나면 `sudo npm install -g @anthropic-ai/claude-code` 로 재시도하세요.

**설치 확인:**

```bash
claude --version
```

버전 번호가 출력되면 설치 성공입니다.

---

## 다음 단계

여기까지 오면 원라이너가 하는 일을 모두 끝낸 것입니다. 이제 [INSTALLATION.md — 2. Claude Code 실행](./INSTALLATION.md#2-claude-code-실행) 으로 돌아가 **대화창 실행 → `/setup-bedrock` 자격증명 등록**을 진행하세요.

---

## 트러블슈팅

| 증상                                    | 해결 방법                                                                                             |
| --------------------------------------- | ----------------------------------------------------------------------------------------------------- |
| `brew: command not found`               | 설치 후 출력된 `eval "$(/opt/homebrew/bin/brew shellenv)"` 라인을 실행하고 새 터미널 열기             |
| `npm install -g` 권한 오류 (`EACCES`)   | `sudo npm install -g @anthropic-ai/claude-code`                                                       |
| 이전 Node.js 가 먼저 잡힘               | `brew unlink node && brew link --overwrite --force node@24`                                           |
| 사내 네트워크에서 `npm install` 이 느림 | `npm config set registry https://<사내-미러>` 또는 `npm config set proxy http://<프록시>:<포트>` 설정 |
