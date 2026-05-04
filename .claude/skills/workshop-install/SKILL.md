---
name: workshop-install
description: 워크숍 개발 환경 설치 상태를 점검하고, 남은 설치 단계를 안내합니다. 설치, 셋업, 환경설정, node/pnpm/git 안 됨, 개발서버 안 뜸 등 환경 관련 질문이면 이 skill을 사용하세요.
---

# Workshop Install Skill

워크숍 참가자의 현재 설치 상태를 진단하고, 설치 완료까지 남은 단계를 안내한다.
설치 절차의 상세 내용은 `docs/` 아래 문서에 있으므로, 이 skill은 문서를 읽고 해석해서 사용자에게 맞춤 안내를 제공하는 역할이다.

## 참조 문서

설치 가이드 원본은 아래 파일들이다. 상세 절차가 필요할 때 반드시 이 파일들을 Read tool로 읽는다:

| 파일                       | 내용                                                            |
| -------------------------- | --------------------------------------------------------------- |
| `docs/INSTALLATION.md`     | 전체 설치 흐름 (터미널 열기 → 원라이너 설치 → Bedrock 자격증명) |
| `docs/INSTALLATION_MAC.md` | Mac 수동 설치 (원라이너 대신 단계별 실행)                       |
| `docs/INSTALLATION_WIN.md` | Windows 수동 설치 (원라이너 대신 단계별 실행)                   |

## 동작 흐름

### 1단계: 환경 진단

skill이 시작되면 아래 명령들을 실행하여 현재 상태를 파악한다:

```bash
uname -s                    # OS 판별 (Darwin=Mac, MINGW/MSYS=Windows Git Bash)
git --version               # Git 설치 여부
node --version              # Node.js 설치 여부 및 버전 (v24+ 필요)
pnpm --version              # pnpm 설치 여부
claude --version            # Claude Code 설치 여부
ls node_modules/ > /dev/null 2>&1  # 의존성 설치 여부
ls package.json > /dev/null 2>&1   # 프로젝트 루트 여부
```

결과를 체크리스트로 보여준다:

```
환경 점검 결과:
  [✓] OS: Mac (Darwin)
  [✓] Git: v2.43.0
  [✗] Node.js: 미설치
  [✗] pnpm: 미설치
  [✓] Claude Code: v1.x.x
  [✗] 프로젝트 의존성 (node_modules)
  [✓] 프로젝트 루트에 위치
```

### 2단계: OS에 맞는 설치 문서 읽기

- Mac이면 `docs/INSTALLATION_MAC.md`를 읽는다
- Windows면 `docs/INSTALLATION_WIN.md`를 읽는다

### 3단계: 남은 작업 안내

1단계 진단 결과에서 실패한 항목만 골라, 2단계에서 읽은 문서의 해당 섹션을 참조하여 **다음에 해야 할 것만** 안내한다.

안내 원칙:

- 이미 완료된 단계는 언급하지 않는다
- 남은 단계가 여러 개면, **가장 먼저 해야 할 한 단계만** 안내하고 완료 후 다시 `/workshop-install`을 실행하라고 알려준다
- 사용자가 직접 터미널에서 실행해야 하는 명령어(Homebrew 설치 등)는 복사할 수 있도록 코드 블록으로 제공한다
- 비개발자 대상이므로 전문 용어는 최소화하고 친절하게 설명한다

### 4단계: 모두 완료인 경우

모든 항목이 통과하면:

```
설치가 모두 완료되었습니다!

다음 단계:
  1. 개발 서버 실행: pnpm dev:web
  2. 브라우저에서 확인: http://localhost:3000
  3. 워크숍을 시작하세요!
```

## 트러블슈팅

사용자가 특정 오류를 언급하며 도움을 요청하면, 해당 OS의 INSTALLATION 문서의 트러블슈팅 섹션을 읽고 안내한다. 문서에 없는 오류라면 일반적인 진단 절차로 도와준다.

## 주의사항

- 설치 절차를 skill 안에 하드코딩하지 않는다 — 항상 `docs/` 문서를 읽어서 최신 내용을 전달한다
- 사용자의 기존 환경을 망가뜨리지 않도록 주의한다
- 이미 설치된 도구는 재설치하지 않는다
