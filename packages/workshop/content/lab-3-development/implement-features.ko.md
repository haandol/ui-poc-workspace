---
title: 'Feature 구현'
weight: 20
---

PRD의 Feature를 하나씩 구현합니다. 한 번에 모든 기능을 만들지 말고 **Feature 단위로 하나씩** 진행합니다.

## 파일명 확인 방법

아래 중 편한 방법을 사용하세요:

- **Finder(Mac) / 파일탐색기(Windows)**: `바탕화면 > ui-poc-workspace > docs > prd` 폴더를 열면 `.alps.md` 파일이 있습니다.
- **Claude Code에서 직접 확인**: `docs/prd/ 에 있는 파일 목록을 보여줘`라고 물어보세요.
- **Tab 자동완성**: `@docs/prd/`까지 입력 후 Tab 키를 누르면 파일명이 자동완성됩니다.

## Feature 구현 흐름 — 두 단계

이 워크숍은 [`alps-writer` Claude Code plugin](https://github.com/haandol/alps-writer-mcp)을 사용해서 **Feature → ADR → 코드** 순서로 구현합니다. ADR(Architecture Decision Record)은 "이 Feature를 어떻게 만들지"를 미리 정리하는 짧은 설계 메모이고, plugin이 PRD에서 자동으로 초안을 만들어 줍니다.

```
PRD Feature (F1)
      │
      ▼  /feature-to-adr f1     ← 1단계: ADR 초안 생성
ADR docs/adr/0001-f1-*.md
      │
      ▼  /adr-impl f1            ← 2단계: ADR을 따라 코드 작성
구현 완료
```

### Step 1. ADR 초안 만들기 (`/feature-to-adr`)

💬 Claude Code 대화창에서 아래 두 방식 중 편한 쪽을 사용하세요. `@docs/prd/`까지 입력 후 **Tab 키**로 파일을 선택합니다.

**방식 A — 슬래시 명령 (권장)**

:::code{showCopyAction=true showLineNumbers=false language=text}
@docs/prd/XYZ.alps.md 를 읽고 /feature-to-adr f1 실행해줘.
:::

**방식 B — 자연어 요청**

:::code{showCopyAction=true showLineNumbers=false language=text}
@docs/prd/XYZ.alps.md 의 F1 부터 ADR 만들고 진행하자.
:::

::alert[자연어로도 충분합니다. plugin이 자동으로 `/feature-to-adr` 흐름을 따릅니다. 슬래시 명령은 더 짧고 결정적이라 익숙해지면 권장합니다.]{type="info"}

어떤 방식이든 Claude가 자동으로:

1. PRD Section 7에서 F1을 찾아 분석합니다
2. `docs/adr/0001-f1-*.md` 에 ADR 초안을 만듭니다
3. ADR 내용(Status / Context / Decision / Consequences)을 보여주고 **확인을 요청**합니다

내용이 맞으면 "OK" 또는 "그대로 진행해줘", 고치고 싶으면 "F1 데이터 모델은 X로 바꿔줘" 처럼 자연어로 수정 요청합니다.

::alert[ADR 내용을 처음 봤을 때 모든 항목을 이해하지 않아도 됩니다. **Decision** 섹션이 본인 의도와 맞는지만 빠르게 확인하면 충분합니다.]{type="info"}

### Step 2. 코드 구현 (`/adr-impl`)

ADR이 확정되면 같은 대화창에서 아래 두 방식 중 편한 쪽을 사용합니다.

**방식 A — 슬래시 명령**

:::code{showCopyAction=true showLineNumbers=false language=text}
/adr-impl f1
:::

**방식 B — 자연어 요청**

:::code{showCopyAction=true showLineNumbers=false language=text}
방금 만든 ADR 대로 F1 구현해줘.
:::

Claude가 ADR의 Decision을 따라 코드를 작성하고 dev 서버에 반영합니다. 브라우저(`http://localhost:3000`)에서 결과를 확인하세요.

## 반복 사이클

Feature를 하나씩 완성해 나가는 반복 사이클입니다:

```
1. ADR 초안 생성
   └─ "@docs/prd/XYZ.alps.md 를 읽고 /feature-to-adr f1 실행해줘."

2. ADR 내용 확인 및 승인
   └─ Decision 섹션 확인 → "OK" 또는 수정 요청

3. 코드 구현
   └─ "/adr-impl f1"

4. 브라우저에서 결과 확인
   └─ http://localhost:3000

5. 피드백 및 수정 요청
   └─ "버튼 색상을 파란색으로 바꿔줘"

6. 만족하면 다음 Feature로 이동
   └─ "/feature-to-adr f2"  →  "/adr-impl f2"
```

::alert[같은 대화에서 계속 작업 중이면 PRD 파일 경로 없이 `/feature-to-adr f2` 만 입력해도 됩니다. 이전에 읽었던 PRD를 그대로 사용합니다.]{type="info"}

::alert[**구현 도중 ADR을 벗어나는 변경이 필요할 때**: "이 부분은 ADR 결정과 다르게 가야겠어"라고 말하면 Claude가 ADR을 먼저 갱신한 뒤 코드를 수정합니다. 또는 구현 후 `/adr-sync f1` 으로 코드와 ADR의 차이를 점검·정리할 수 있습니다.]{type="info"}

## 수정 요청 팁

수정을 요청할 때는 구체적으로 말할수록 좋습니다.

| 나쁜 예           | 좋은 예                                                                       |
| ----------------- | ----------------------------------------------------------------------------- |
| "이거 좀 이상해"  | "사이드바 메뉴의 폰트 크기를 14px로 줄이고, 메뉴 항목 간 간격을 8px로 줄여줘" |
| "디자인 바꿔줘"   | "전체 테마를 다크 모드로 바꿔줘"                                              |
| "데이터 추가해줘" | "사용자 목록 샘플 데이터를 10건 만들어줘. 이름, 이메일, 가입일 포함"          |

## 자주 쓰는 프롬프트

| 상황             | 프롬프트 예시                                                        |
| ---------------- | -------------------------------------------------------------------- |
| 새 페이지 추가   | "대시보드 페이지를 만들어줘"                                         |
| 상단 메뉴 수정   | "상단 메뉴에 로고와 네비게이션을 추가해줘"                           |
| 샘플 데이터 추가 | "사용자 목록 샘플 데이터를 10건 만들어줘. 이름, 이메일, 가입일 포함" |
| 스타일 변경      | "전체 테마를 다크 모드로 바꿔줘"                                     |
| 차트 추가        | "월별 매출 데이터를 막대 차트로 보여줘"                              |
| 레이아웃 변경    | "왼쪽에 사이드바, 오른쪽에 메인 콘텐츠 배치로 변경해줘"              |
| 에러 수정        | "이 에러를 수정해줘: [에러 메시지 붙여넣기]"                         |
| 기능 검토        | "이 기능의 사용자 시나리오를 정리해줘"                               |
| 비교 분석        | "경쟁사 서비스와 지금 만든 화면을 비교해줘"                          |

::alert[개발 중에도 AI에게 자유롭게 질문할 수 있습니다. "이 화면에서 사용자가 어떤 흐름으로 이동해?", "대시보드에 보여줄 핵심 지표를 추천해줘", "모바일에서는 이 레이아웃이 어떻게 보여?", "이 기능을 경쟁사처럼 카드 형태로 바꿀 수 있어?" 등 무엇이든 물어보세요.]{type="info"}

## (선택) 이미지 생성

프로젝트에 연결된 **Asset Generator MCP**를 사용하면 AI가 직접 이미지를 만들어 줍니다. 생성된 이미지는 `packages/web/public/`에 자동 저장되므로 바로 페이지에서 사용할 수 있습니다.

💬 프롬프트 예시:

| 상황               | 프롬프트 예시                                            |
| ------------------ | -------------------------------------------------------- |
| 히어로 배너 이미지 | "랜딩 페이지에 쓸 히어로 배너 이미지를 만들어줘"         |
| 로고/아이콘        | "앱 로고를 미니멀한 스타일로 만들어줘"                   |
| 배경 이미지        | "대시보드 배경으로 쓸 그라데이션 추상 이미지를 만들어줘" |
| 샘플 프로필 사진   | "사용자 프로필에 쓸 아바타 이미지 4장 만들어줘"          |
| 제품 목업          | "커피숍 메뉴 화면에 넣을 라떼 사진을 만들어줘"           |

::alert[이미지 생성은 외부 API(fal.ai)를 사용하므로 네트워크 연결이 필요합니다. 이미지 크기에 따라 2~3분 정도 소요될 수 있습니다.]{type="warning"}
