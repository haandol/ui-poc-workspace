# Non-Tech UI PoC Workshop Runbook — Day 1

비개발자(PM)를 위한 AI 기반 UI PoC 워크숍 **1일차** 런북입니다.
1일차의 목표는 **(1) Claude Code 설치 완료, (2) 3D 명함 데모로 AI와 친숙해지기, (3) Amazon Quick Suite 의 Quick Research 로 리서치 PDF 확보** 입니다.
2일차(PRD 작성 → UI PoC 개발)는 여기서 받아둔 리서치 PDF 를 재료로 시작합니다.

> **핵심 안내**: 이 워크숍에서는 AI 도구와 **대화하듯이** 작업합니다.
> 진행 중 궁금한 점이 있으면 언제든 AI에게 질문하세요.
> 예: "이 폴더가 뭐 하는 거야?", "지금 뭐가 설치된 거야?", "이 에러 메시지 풀어서 설명해줘"

---

## 타임테이블

| 시간          | 내용                              | 작업 폴더           |
| ------------- | --------------------------------- | ------------------- |
| 13:00 ~ 13:20 | 오프닝 + 진행자 완성 예시 시연    | —                   |
| 13:20 ~ 14:30 | Claude Code 설치하기              | `ui-poc-workspace/` |
| 14:30 ~ 14:50 | 휴식 (+ 낙오자 구제 타임)         | —                   |
| 14:50 ~ 15:10 | Claude Code 첫 실행               | `ui-poc-workspace/` |
| 15:10 ~ 16:10 | 3D 명함 만들기 데모               | `card-lab/`         |
| 16:10 ~ 16:50 | Quick Research 로 리서치 PDF 받기 | —                   |
| 16:50 ~ 17:00 | 마무리 & 2일차 예고               | —                   |

---

## 사전 준비물

- 개인 노트북 (Windows 또는 Mac)
- 터미널 앱 (Mac: Ghostty 또는 기본 터미널, Windows: PowerShell)
- 2일차에 PoC로 만들어보고 싶은 **서비스 아이디어 한 줄** (간단한 메모 수준이면 충분, Quick Research 의 입력이 됩니다)
- 본인 **명함 사진 1장** (명함이 없으면 프로필 사진이나 로고도 가능. 진행자가 샘플 이미지도 준비합니다)
- 진행자 전달 사항: Amazon Quick Suite 계정, Airtable API Key, (선택) FAL API Key

---

## 1. 오프닝 (13:00 ~ 13:20)

워크숍의 목표와 1일차가 왜 필요한지를 설명합니다.

**1일차 목표 3가지**:

1. Claude Code 설치 완료 (전원 성공)
2. 3D 명함 데모로 AI 와 대화하는 감각 익히기 — "AI 에 어디까지 맡길 수 있나"
3. Quick Research 로 2일차 PRD 에 쓸 **리서치 PDF** 받아두기

**진행자 완성 예시 시연** (5~10분): 진행자가 미리 만들어둔 UI PoC 샘플을 보여줍니다. "오늘은 도구 깎는 날이지만 내일 이런 걸 만들게 됩니다" 로 기대치를 맞춥니다.

> **Tip**: 1일차에는 설치/설정이 메인이라 답답할 수 있습니다. 막히면 즉시 도우미에게 요청하세요. 혼자 20분 이상 끌지 마세요.

---

## 2. Claude Code 설치하기 (13:20 ~ 14:30)

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

### 2-1. MCP 연결 상태 확인

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

</details>

> **참고**: `airtable`, `asset-generator` 서버는 각각 API Key 설정 전까지 `failed` 상태입니다. 아래 섹션에서 키를 설정하면 `connected`로 변경됩니다.

### 2-2. 이미지 에셋 생성 설정하기 (선택)

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

### 2-3. 진행 상태 추적 설정하기

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

---

## 3. 휴식 (14:30 ~ 14:50)

20분간 휴식합니다. **설치에 문제가 있는 분**은 이 시간에 도우미와 함께 해결하세요.
이미 설치가 끝난 분들은 다음 섹션의 "3D 명함 실습" 맛보기를 먼저 훑어봐도 좋습니다.

---

## 4. Claude Code 첫 실행 (14:50 ~ 15:10)

본격 실습 전에 Claude Code의 기본 조작을 몸에 익힙니다.

### 4-1. 기본 대화 해보기

작업 폴더에서 Claude Code를 실행한 상태로, 아래 문장을 **하나씩** 입력해봅니다.

```
지금 이 폴더가 어떤 프로젝트인지 한 줄로 요약해줘.
```

```
docs 폴더에 어떤 파일들이 있는지 알려줘.
```

```
package.json 을 읽고 어떤 프로젝트인지 설명해줘.
```

> **관찰 포인트**: 첫 질문과 세 번째 질문의 답 상세도가 다릅니다. **AI에게 "어디를 보라고" 알려주면 답이 구체적**이라는 감각이 1일차의 핵심입니다.

### 4-2. 승인/거부·`/help`·`Esc` UX 익히기

- Claude가 파일을 수정하거나 명령을 실행하려 할 때 **승인/거부** 프롬프트가 뜹니다. 무섭게 생겼지만 거절해도 괜찮습니다.
- `/help` 로 단축키 확인.
- 응답 중간에 방향을 바꾸고 싶으면 `Esc` 로 중단 → 새로운 지시 입력.

> **Tip**: 1일차에 이 조작을 손에 익혀두면 2일차에 개발하면서 **"하지마", "되돌려줘"** 같은 반응을 본능적으로 할 수 있게 됩니다.

---

## 5. 3D 명함 만들기 데모 (15:10 ~ 16:10)

"AI에게 어디까지 맡길 수 있는가"를 직접 실험하는 시간입니다.
본인 명함 사진을 텍스처로 써서, **단일 `index.html` 파일**로 3D 회전 명함을 만듭니다. 빌드 도구도 서버도 필요 없고, 완성된 파일은 **더블클릭으로 브라우저에서 바로 열립니다**.

### 5-1. 작업 폴더 만들기

```bash
# Mac
mkdir -p ~/Desktop/card-lab && cd ~/Desktop/card-lab

# Windows (PowerShell)
$desktop = [Environment]::GetFolderPath('Desktop')
New-Item -ItemType Directory -Path "$desktop\card-lab" -Force
cd "$desktop\card-lab"
```

### 5-2. 명함 이미지 준비

본인 명함 앞면 사진을 **이 폴더**에 `card-front.png` 라는 이름으로 저장합니다.
명함이 없는 경우 진행자가 배포한 **샘플 이미지**를 사용하세요.

```
바탕화면/card-lab/
└── card-front.png        <- 여기에 명함 사진
```

### 5-3. 첫 요청 — 원샷 만들기

`card-lab` 폴더에서 Claude Code를 실행합니다.

```bash
# Mac
cd ~/Desktop/card-lab && claude

# Windows (PowerShell)
cd "$([Environment]::GetFolderPath('Desktop'))\card-lab"; claude
```

아래 프롬프트를 입력합니다:

```
이 폴더의 card-front.png 를 텍스처로 써서,
마우스로 회전시킬 수 있는 3D 명함을 단일 index.html 로 만들어줘.
Three.js 는 CDN 으로 불러오고, 더블클릭으로 열면 동작해야 해.
```

완성되면 **탐색기에서 `index.html` 을 더블클릭**해서 브라우저에서 확인합니다.

### 5-4. 실험 루브릭 — 점점 모호해지기

같은 대화에서 아래 네 가지 요청을 **순서대로** 해봅니다.
각 단계의 결과를 브라우저에서 확인하며 **"AI가 내 의도를 어떻게 해석했는지"** 관찰하세요.

| 단계      | 요청 예시                                               |
| --------- | ------------------------------------------------------- |
| 구체      | "카드 표면에 은은한 금속 느낌 질감을 줘"                |
| 중간      | "명함처럼 두께감을 살리고 모서리를 살짝 둥글게 해줘"    |
| 모호      | "좀 더 있어 보이게 만들어줘"                            |
| 매우 모호 | "이 명함이 내 소개 포트폴리오 페이지처럼 느껴지게 해줘" |

> **학습 포인트**: 모호할수록 AI의 해석 편차가 커집니다. 이 체감이 **내일(2일차) PRD 작성 시 "왜 명세가 필요한가"** 에 대한 자기 근거가 됩니다.

### 5-5. 공유하기

완성된 `index.html` 을 옆자리 참가자와 돌려봅니다.
잘 나온 화면은 **스크린샷 찍어서 Airtable/단톡에 공유**하세요. 쇼&텔용 재료입니다.

> **자주 생기는 증상**: 배경이 까맣기만 하거나, 텍스처가 반대로 붙거나, 카드가 안 보일 때 — Claude에게 "지금 카드가 안 보여. 조명이나 카메라 위치부터 점검해서 고쳐줘"처럼 **증상 + 추정 원인**을 함께 전달하면 잘 잡힙니다.

---

## 6. Quick Research 로 리서치 PDF 받기 (16:10 ~ 16:50)

2일차 PRD 의 입력 재료가 되는 **리서치 PDF** 를 받아둡니다.
Amazon Quick Suite 의 **Research Agent** 를 사용하며, 아래 AWS 공식 워크샵을 그대로 따라갑니다.

> **따라할 워크샵**: [Amazon Quick Suite Workshop — Research Agent 사용하기](https://catalog.workshops.aws/amazon-quick-suite-workshop/ko-KR/0400-research-agent/0410-use-research-agent)

### 6-1. Research Agent 실행

**Step 1.** Amazon Quick Suite 콘솔에 접속합니다 (진행자가 안내한 계정 사용).

**Step 2.** 좌측 메뉴에서 **Research** 를 선택합니다.

**Step 3.** 위 워크샵 가이드의 단계를 따라 **새 리서치 세션**을 시작합니다.

### 6-2. 리서치 주제 입력

준비해 온 **서비스 아이디어 한 줄**을 기반으로 아래 템플릿을 채워 입력합니다.

```
나는 PM 이고, 새로운 서비스의 UI PoC 를 준비하고 있어.
백엔드 없이 모든 데이터와 API 를 모킹해서 웹 UI 만 프로토타입할 거야.

[여기에 본인 서비스 아이디어 한 줄]

아래 내용을 포함해서 리서치해줘:
1. 해당 서비스 도메인의 주요 경쟁사 분석 (핵심 기능, UX 특징, 강점/약점)
2. 우리 서비스만의 차별화 포인트
3. 타겟 사용자와 핵심 사용 시나리오
4. UI PoC 에 반드시 포함해야 할 핵심 기능 추천

리포트는 한글로 작성해줘.
```

> **아이디어가 막힐 때**: 진행자가 **샘플 주제 5개** (예: "중소기업 대표용 주간 회의 준비 도우미", "재택근무자용 집중 루틴 타이머" 등) 를 준비해두었으니 하나를 골라 시작하세요. 2일차에 진짜 아이디어로 바꿔도 됩니다.

### 6-3. PDF 다운로드

리서치가 완료되면 결과 페이지에서 **PDF 로 내보내기 / 다운로드** 를 눌러 PDF 를 받습니다.
파일명은 **영문으로 변경** 합니다 (예: `research.pdf`). 한글 파일명이나 공백이 포함된 파일명은 2일차에 문제가 될 수 있습니다.

다운받은 PDF 는 **내일 2일차 시작 시** `ui-poc-workspace/docs/` 폴더에 복사해 사용합니다. 오늘은 **다운로드만** 해두면 됩니다.

> **Tip**: 리서치가 16:50 까지 끝나지 않으면, **완료될 때까지 창을 띄워두고** 완료되는 대로 PDF 만 받아서 보관하세요. 2일차 아침에 작업 폴더로 복사해도 됩니다.

---

## 7. 마무리 & 2일차 예고 (16:50 ~ 17:00)

### 7-1. 오늘 확보한 것 체크리스트

- [ ] `claude` 명령어로 AI 응답 받기 성공
- [ ] `/mcp` 에서 MCP 서버들이 `✔ connected` 로 표시됨
- [ ] `card-lab/index.html` 이 생겼고 브라우저에서 3D 명함이 회전함
- [ ] Quick Research 로 **리서치 PDF 다운로드** 완료 (파일명: `research.pdf`)

### 7-2. 2일차 예고

- **Lab 1: PRD (ALPS) 작성** — 오늘 받아둔 `research.pdf` 를 `ui-poc-workspace/docs/` 폴더에 복사한 뒤, Claude Code 로 PRD 를 작성합니다.
- **Lab 2: UI PoC 개발** — 작성한 PRD 의 피쳐를 하나씩 구현하고, 브라우저에서 결과를 확인합니다.

### 7-3. 쇼&텔 예고

2일차 마지막 30분은 자진 발표 시간입니다. **오늘 만든 3D 명함**도 원하면 2일차 쇼&텔에 함께 공유할 수 있습니다.

---

## 트러블슈팅

문제가 발생하면 각 OS별 설치 가이드의 트러블슈팅 섹션을 참고하세요: [Windows](./INSTALLATION_WIN.md#트러블슈팅) | [Mac](./INSTALLATION_MAC.md#트러블슈팅)

### 3D 명함 실습에서 자주 나오는 이슈

| 증상                         | Claude 에게 이렇게 말해보세요                                      |
| ---------------------------- | ------------------------------------------------------------------ |
| 브라우저 화면이 까맣기만 함  | "조명(light)이 없는 것 같아. 기본 조명 추가해줘"                   |
| 카드가 너무 작거나 안 보임   | "카메라 위치를 조정해서 카드가 화면 중앙에 꽉 차게 해줘"           |
| 텍스처가 안 뜨고 회색만 나옴 | "card-front.png 경로가 제대로 적용됐는지 확인하고 다시 로드해줘"   |
| 마우스로 회전이 안 됨        | "OrbitControls 를 추가해서 마우스 드래그로 회전 가능하게 해줘"     |
| CDN 로드가 안 됨             | "three.js CDN URL 이 최신인지 확인하고, importmap 방식으로 바꿔줘" |
