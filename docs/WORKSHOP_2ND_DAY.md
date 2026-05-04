# Non-Tech UI PoC Workshop Runbook — Day 2

비개발자(PM)를 위한 AI 기반 UI PoC 워크숍 런북입니다.
자신이 만들고 싶은 서비스 아이디어만 가져오면, 리서치부터 PRD 작성, 실제 웹 UI PoC까지 완성할 수 있습니다.

> **핵심 안내**: 이 워크숍에서는 AI 도구와 **대화하듯이** 작업합니다.
> 진행 중 궁금한 점이 있으면 언제든 AI에게 질문하세요.
> 예: "경쟁사 대비 우리 서비스의 차별점을 정리해줘", "이 기능의 사용자 시나리오를 설명해줘", "지금까지 만든 것 요약해줘"

---

## 타임테이블

| 시간          | 내용                          | 작업 폴더           |
| ------------- | ----------------------------- | ------------------- |
| 12:00 ~ 12:40 | 오프닝                        | —                   |
| 12:40 ~ 13:10 | 딥리서치 + 개발 환경 설정하기 | `ui-poc-workspace/` |
| 13:20 ~ 14:10 | PRD 만들기                    | `ui-poc-workspace/` |
| 14:20 ~ 16:00 | UI PoC 개발하기               | `ui-poc-workspace/` |
| 16:00 ~ 16:30 | 워크숍 소회                   | —                   |

---

## 사전 준비물

- Amazon QuickSuite 설정
- Claude Code 설정
- 자신이 PoC로 만들어보고 싶은 서비스 아이디어 (간단한 메모 수준이면 충분, 자세할수록 좋음)
- 개인 노트북
- 터미널 앱 (Mac: Ghostty 또는 기본 터미널, Windows: PowerShell)

---

## 1. 오프닝 (12:00 ~ 12:40)

워크숍의 목표와 진행 방식을 소개합니다.

**워크숍 목표**: 비개발자가 AI 도구만으로 자신의 서비스 아이디어를 실제 동작하는 웹 UI PoC로 만들어보는 것

**진행 흐름**:

1. 딥리서치로 아이디어 조사 (+ 동시에 개발 환경 설정)
2. PRD 문서 작성
3. Claude Code로 UI PoC 개발
4. 결과물 데모 및 피드백

> **Tip**: 작업 중 막히거나 궁금한 점이 있으면 언제든 AI에게 질문하세요.
> 기능 우선순위, 사용자 시나리오, 화면 구성, 경쟁사 비교 등 무엇이든 물어볼 수 있습니다.

---

## 2. 딥리서치 + 개발 환경 설정하기 (12:40 ~ 13:10)

딥리서치가 진행되는 동안 개발 환경을 병렬로 설정합니다.

### 2-1. 딥리서치로 아이디어 조사하기

**Step 1.** Amazon QuickSuite 를 열고 Quick Flow를 생성합니다.

아래 내용으로 Quick Flow를 만듭니다:

```
나는 PM이고, 새로운 서비스의 UI PoC를 준비하고 있어.
백엔드 없이 모든 데이터와 API를 모킹해서 웹 UI만 프로토타입할 거야.

아래 내용을 포함해서 딥리서치해줘:
1. 해당 서비스 도메인의 주요 경쟁사 분석 (핵심 기능, UX 특징, 강점/약점)
2. 우리 서비스만의 차별화 포인트
3. 타겟 사용자와 핵심 사용 시나리오
4. UI PoC에 반드시 포함해야 할 핵심 기능 추천

리포트는 한글로 작성해줘.
```

**Step 2.** Flow 가 생성되면 미리 준비해 온 구현할 내용을 입력해서 조사해 달라고 요청합니다.

**Step 3.** 조사가 완료되면 Quick Research에서 **PDF로 다운로드**합니다.

> **Tip**: 딥리서치는 약 30분 정도 소요됩니다. 조사가 진행되는 동안 아래 개발 환경 설정을 함께 진행하세요.

### 2-2. 개발 환경 설정하기

셋업 스크립트를 실행하면 모든 환경설정이 자동으로 완료됩니다.
설치 완료 후 작업 폴더는 `바탕화면/ui-poc-workspace/` 에 생성됩니다.

**Mac — 원라이너 (클론 + 설치 한번에):**

```bash
curl -fsSL https://raw.githubusercontent.com/haandol/ui-poc-workspace/main/scripts/bootstrap.sh | bash
```

**Windows — PowerShell에서 아래 두 명령을 순서대로 실행:**

```powershell
# 1) 프로젝트 클론 (바탕화면에 생성)
$desktop = [Environment]::GetFolderPath('Desktop')
git clone https://github.com/haandol/ui-poc-workspace "$desktop\ui-poc-workspace"
cd "$desktop\ui-poc-workspace"

# 2) 셋업 스크립트 실행
powershell -ExecutionPolicy Bypass -File scripts\setup.ps1
```

> **참고**: 스크립트 실행이 어려운 경우 [수동 설치 가이드](./INSTALLATION.md)를 참고하세요.

설치가 완료되면 작업 폴더에서 Claude Code를 실행하여 MCP 도구가 정상 연결되었는지 확인합니다:

```bash
# Mac
cd ~/Desktop/ui-poc-workspace && claude

# Windows (PowerShell)
cd "$([Environment]::GetFolderPath('Desktop'))\ui-poc-workspace"; claude
```

Claude Code가 실행되면 프롬프트에 `/mcp` 를 입력합니다. `pdf-reader`, `alps-writer`, `asset-generator` 등 MCP 서버 목록이 표시되면 정상입니다.

<details>
<summary><b>자동 설치되는 도구 목록</b> (클릭하여 펼치기)</summary>

셋업 스크립트와 프로젝트 설정을 통해 아래 도구들이 자동으로 구성됩니다.

**MCP 서버** (`.mcp.json`):

| MCP 서버        | 패키지                   | 용도                  |
| --------------- | ------------------------ | --------------------- |
| pdf-reader      | `@sylphx/pdf-reader-mcp` | 딥리서치 PDF 읽기     |
| alps-writer     | `alps-writer`            | PRD(ALPS) 문서 작성   |
| asset-generator | (프로젝트 내장)          | 이미지 에셋 생성      |
| airtable        | `airtable-mcp-server`    | 워크숍 진행 상태 추적 |

**유저 MCP** (`~/.claude.json`):

| MCP 서버      | 용도                       |
| ------------- | -------------------------- |
| ppt-generator | 프레젠테이션 슬라이드 생성 |
| tavily        | 웹 검색 및 리서치          |

**플러그인** (`.claude/settings.json`):

| 플러그인            | 용도                                 |
| ------------------- | ------------------------------------ |
| context7            | 라이브러리/프레임워크 최신 문서 조회 |
| chrome-devtools-mcp | 브라우저 스크린샷 캡처 및 디버깅     |
| nx                  | Nx 모노레포 워크스페이스 관리        |

**커스텀 스킬** (`.claude/skills/`):

| 스킬            | 사용법             | 용도                           |
| --------------- | ------------------ | ------------------------------ |
| workshop-status | `/workshop-status` | 워크숍 진행 상태 Airtable 공유 |

```bash
❯ /mcp

──────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────
  Manage MCP servers
  9 servers

    Project MCPs (/Users/dongkyl/Desktop/ui-poc-workspace/.mcp.json)
  ❯ airtable · ✔ connected
    alps-writer · ✔ connected
    asset-generator · ✘ failed
    pdf-reader · ✔ connected

    User MCPs (/Users/dongkyl/.claude.json)
    ppt-generator · ✔ connected
    tavily · ✔ connected

    Built-in MCPs (always available)
    plugin:chrome-devtools-mcp:chrome-devtools · ✔ connected
    plugin:context7:context7 · ✔ connected
    plugin:nx:nx-mcp · ✔ connected

  ※ Run claude --debug to see error logs
  https://code.claude.com/docs/en/mcp for help
 ↑↓ to navigate · Enter to confirm · Esc to cancel
```

</details>

> **참고**: `airtable`, `asset-generator` 서버는 각각 API Key 설정 전까지 `failed` 상태입니다. 아래 섹션에서 키를 설정하면 `connected`로 변경됩니다.

### 2-3. 이미지 에셋 생성 설정하기 (선택)

AI 이미지 생성 기능을 사용하려면 FAL API Key를 설정합니다. 진행자에게 전달받은 키를 아래와 같이 환경변수로 등록합니다.

```bash
# Mac
echo 'export FAL_KEY="진행자에게_전달받은_키"' >> ~/.zshrc
source ~/.zshrc
```

```powershell
# Windows (PowerShell) — 설정 후 PowerShell 재시작 필요
[Environment]::SetEnvironmentVariable('FAL_KEY', '진행자에게_전달받은_키', 'User')
```

설정 후 Claude Code를 재시작하면 `/mcp`에서 `asset-generator`가 `✔ connected` 상태로 변경됩니다.

> **참고**: FAL API Key가 없어도 워크숍 진행에는 문제가 없습니다. 이미지 에셋 생성 기능만 비활성화됩니다.

### 2-4. 진행 상태 추적 설정하기

워크숍 진행 상황을 진행자와 공유하기 위해 Airtable 연동을 설정합니다.
진행자가 전달한 **Airtable API Key**를 준비한 뒤, Claude Code 프롬프트에 아래 명령을 입력합니다 (터미널이 아니라 Claude Code 대화창에서 입력):

```
/workshop-status setup
```

Claude가 두 가지를 물어봅니다:

1. **Airtable API Key** — 진행자에게 전달받은 값 (`pat_...`로 시작)
2. **닉네임** — 진행 상태에 표시될 이름 (예: "커피중독PM", "픽셀요정")

설정이 완료되면 이후 단계(리서치, PRD, 개발 등)에서 **진행 상태가 자동으로 공유**됩니다.

> **참고**: Airtable 키가 없어도 워크숍 진행에는 문제가 없습니다. 진행 상태 추적 기능만 비활성화됩니다.

### 2-5. 리서치 PDF 복사하기

딥리서치가 완료되면, 다운받은 리서치 PDF를 작업 폴더의 `docs/` 폴더에 복사합니다.
파일명은 **영문으로 변경하는 것을 권장**합니다 (예: `research.pdf`). 한글 파일명이나 공백이 포함된 파일명은 문제가 될 수 있습니다.

```
바탕화면/ui-poc-workspace/
└── docs/          <- 여기에 리서치 PDF 복사
```

> **복사 방법**: 다운로드 폴더에서 PDF 파일을 `바탕화면 > ui-poc-workspace > docs` 폴더로 드래그앤드롭하면 됩니다.

---

## 3. PRD 만들기 (13:20 ~ 14:10)

리서치 PDF를 기반으로 PRD를 작성합니다.

```
바탕화면/ui-poc-workspace/    (프로젝트 루트에서 Claude Code 실행)
├── docs/research.pdf         <- 리서치 PDF (입력, 파일명은 다를 수 있음)
└── docs/prd/                 <- ALPS 문서가 여기에 저장됨 (출력)
```

> **`@` 문법이란?** Claude Code에서 `@파일경로`를 입력하면 해당 파일을 AI가 직접 읽을 수 있습니다.
> `@docs/`까지 입력한 뒤 **Tab 키**를 누르면 파일명이 자동완성되므로, 파일명을 정확히 외울 필요가 없습니다.

**Step 1.** 터미널에서 프로젝트 폴더로 이동 후 Claude Code를 실행합니다.
이미 Claude Code가 실행 중이라면 그대로 사용하세요.

```bash
# Mac
cd ~/Desktop/ui-poc-workspace && claude

# Windows (PowerShell)
cd "$([Environment]::GetFolderPath('Desktop'))\ui-poc-workspace"; claude
```

**Step 2.** Claude Code 프롬프트에서 PRD 작성을 요청합니다. `@docs/`까지 입력 후 Tab 키를 눌러 PDF 파일을 선택하세요.

프롬프트 예시:

```
@docs/research.pdf 를 읽고 UI PoC 를 위한 alps 문서를 작성해줘.
```

> **Tip**: 아이디어를 구체적으로 작성할수록 좋은 PRD가 만들어집니다.
> 예: "재고 관리 대시보드를 만들고 싶다" 보다는 "중소 이커머스 셀러를 위한 실시간 재고 현황 대시보드. 상품별 재고 수량, 입출고 이력, 재고 부족 알림 기능 포함"

> **중간에 질문하세요!** PRD가 생성된 후 내용이 이해가 안 되거나 수정하고 싶은 부분이 있으면 바로 질문하세요.
>
> - "이 기능의 타겟 사용자가 누구야?"
> - "경쟁사 A와 비교했을 때 이 기능의 장점이 뭐야?"
> - "MVP에 꼭 들어가야 할 핵심 기능만 추려줘"
> - "F3을 로그인 대신 대시보드로 바꿔줘"
> - "사용자 플로우를 처음부터 끝까지 설명해줘"

---

## 4. UI PoC 개발하기 (14:20 ~ 16:00)

```
바탕화면/ui-poc-workspace/          (프로젝트 루트에서 모든 작업)
└── docs/prd/XYZ.alps.md            <- PRD 문서 (AI가 참조, 실제 파일명은 다를 수 있음)
```

> **참고**: 소스 코드는 AI가 알아서 찾아서 수정합니다. 파일 위치를 몰라도 괜찮습니다.

### 4-1. 개발 서버 먼저 실행하기

개발하는 동안 터미널 탭을 **2개** 사용합니다. 하나는 개발 서버용, 하나는 Claude Code용입니다.

**Step 1.** 현재 터미널 창에서 새 탭을 엽니다: Mac `Cmd + T` / Windows `Ctrl + Shift + T`

**Step 2.** 새 탭(탭 1)에서 개발 서버를 실행합니다. 이 탭은 닫지 말고 계속 켜둡니다.

```bash
# 📺 탭 1: 개발 서버 (항상 켜두기)
# Mac
cd ~/Desktop/ui-poc-workspace && pnpm dev:web

# Windows (PowerShell)
cd "$([Environment]::GetFolderPath('Desktop'))\ui-poc-workspace"; pnpm dev:web
```

**Step 3.** 브라우저에서 `http://localhost:3000`을 열어두세요. 코드가 변경되면 자동으로 반영됩니다 (Hot Reload).

**Step 4.** 다시 새 탭을 열어서(Mac `Cmd + T` / Windows `Ctrl + Shift + T`) Claude Code를 실행합니다.
이미 Claude Code가 실행 중인 탭이 있다면 그 탭을 사용하세요.

```bash
# 🤖 탭 2: Claude Code (AI 작업용)
# Mac
cd ~/Desktop/ui-poc-workspace && claude

# Windows (PowerShell)
cd "$([Environment]::GetFolderPath('Desktop'))\ui-poc-workspace"; claude
```

### 4-2. PRD를 통해 UI 개발 시작

> **참고**: 앞 단계에서 작성한 ALPS 문서는 `docs/prd/` 디렉토리에 이미 저장되어 있습니다.

PRD의 피쳐를 하나씩 구현해달라고 요청합니다.

**파일명 확인 방법** (아래 중 편한 방법을 사용하세요):

- **Finder(Mac) / 파일탐색기(Windows)**: `바탕화면 > ui-poc-workspace > docs > prd` 폴더를 열면 `.alps.md` 파일이 있습니다.
- **Claude Code에서 직접 확인**: `docs/prd/ 에 있는 파일 목록을 보여줘`라고 물어보세요.
- **Tab 자동완성**: `@docs/prd/`까지 입력 후 Tab 키를 누르면 파일명이 자동완성됩니다.

프롬프트 예시 (`@docs/prd/` 입력 후 Tab 키로 파일 선택):

```
@docs/prd/XYZ.alps.md 를 읽고 F1 구현해줘.
```

### 4-3. 피쳐를 하나씩 만들기

한 번에 모든 기능을 만들지 말고, **피쳐 단위로 하나씩** 진행합니다.

**반복 사이클**:

```
1. 피쳐 구현 요청
   └─ "@docs/prd/XYZ.alps.md 를 읽고 F2 구현해줘."  (Tab 자동완성으로 파일 선택)
   └─ 같은 대화에서 계속 작업 중이면 "F3 구현해줘"만 입력해도 됩니다.

2. 개발 서버에서 결과 확인
   └─ 브라우저에서 http://localhost:3000 확인

3. 피드백 및 수정 요청
   └─ "버튼 색상을 파란색으로 바꿔줘"
   └─ "테이블에 정렬 기능을 추가해줘"
   └─ "레이아웃을 좌우 2단으로 변경해줘"

4. 만족하면 다음 피쳐로 이동
```

> **Tip**: 수정을 요청할 때는 구체적으로 말할수록 좋습니다.
>
> - (X) "이거 좀 이상해"
> - (O) "사이드바 메뉴의 폰트 크기를 14px로 줄이고, 메뉴 항목 간 간격을 8px로 줄여줘"

> **언제든 질문하세요!** 개발 중에도 AI에게 자유롭게 질문할 수 있습니다.
>
> - "이 화면에서 사용자가 어떤 흐름으로 이동해?"
> - "대시보드에 보여줄 핵심 지표를 추천해줘"
> - "모바일에서는 이 레이아웃이 어떻게 보여?"
> - "이 기능을 경쟁사처럼 카드 형태로 바꿀 수 있어?"
> - "지금 화면이 이상하게 보이는데 뭐가 문제야?"

### 4-4. 화면이 이상할 때 AI에게 확인 요청하기

개발 중 화면이 의도대로 나오지 않으면, AI가 직접 브라우저 화면을 보고 문제를 찾아 수정할 수 있습니다.

**사전 준비**: Chrome 브라우저에서 `http://localhost:3000`을 열어둡니다.

프롬프트 예시:

| 상황                | 프롬프트 예시                                              |
| ------------------- | ---------------------------------------------------------- |
| 화면 확인           | "지금 브라우저 화면을 스크린샷으로 캡처해서 확인해줘"      |
| 화면이 깨져 보일 때 | "브라우저에서 현재 페이지를 확인하고 깨진 부분을 수정해줘" |
| 에러가 발생할 때    | "브라우저에 에러가 있는지 확인하고 수정해줘"               |
| 디자인 점검         | "현재 페이지 스크린샷을 찍고, PRD와 일치하는지 비교해줘"   |

> **Tip**: "화면 봐줘", "스크린샷 찍어줘" 같은 간단한 요청만으로도 AI가 문제를 파악할 수 있습니다.

### 4-5. 자주 쓰는 프롬프트 예시

| 상황             | 프롬프트 예시                                                        |
| ---------------- | -------------------------------------------------------------------- |
| 새 페이지 추가   | "대시보드 페이지를 만들어줘"                                         |
| 상단 메뉴 수정   | "상단 메뉴에 로고와 네비게이션을 추가해줘"                           |
| 샘플 데이터 추가 | "사용자 목록 샘플 데이터를 10건 만들어줘. 이름, 이메일, 가입일 포함" |
| 스타일 변경      | "전체 테마를 다크 모드로 바꿔줘"                                     |
| 차트 추가        | "월별 매출 데이터를 막대 차트로 보여줘"                              |
| 화면 배치 변경   | "왼쪽에 사이드바, 오른쪽에 메인 콘텐츠 배치로 변경해줘"              |
| 에러 발생 시     | "이 에러를 수정해줘: [에러 메시지 붙여넣기]"                         |
| 기능 검토        | "이 기능의 사용자 시나리오를 정리해줘"                               |
| 비교 분석        | "경쟁사 서비스와 지금 만든 화면을 비교해줘"                          |

---

## 5. 워크숍 소회 (16:00 ~ 16:30)

### 5-1. 데모 시간

각자 만든 UI PoC를 화면 공유로 시연합니다.

- 어떤 아이디어로 시작했는지
- 최종 결과물은 어떤 모습인지
- 만드는 과정에서 인상적이었던 점

### 5-2. 워크숍 피드백

워크숍 개선을 위한 피드백을 공유합니다.

- 어려웠던 부분
- 도움이 되었던 부분
- 추가로 다뤄졌으면 하는 내용

---

## 트러블슈팅

문제가 발생하면 각 OS별 설치 가이드의 트러블슈팅 섹션을 참고하세요: [Windows](./INSTALLATION_WIN.md#트러블슈팅) | [Mac](./INSTALLATION_MAC.md#트러블슈팅)
