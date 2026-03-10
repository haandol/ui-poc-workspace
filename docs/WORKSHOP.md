# Non-Tech UI PoC Workshop Runbook

비개발자(PM)를 위한 AI 기반 UI PoC 워크숍 런북입니다.
자신이 만들고 싶은 서비스 아이디어만 가져오면, 리서치부터 PRD 작성, 실제 웹 UI PoC까지 완성할 수 있습니다.

---

## 타임테이블

| 시간          | 내용                  |
| ------------- | --------------------- |
| 12:00 ~ 12:10 | 오프닝                |
| 12:10 ~ 12:50 | 개발 환경 설정하기    |
| 12:50 ~ 13:40 | PRD Writer 설정 + PRD 만들기 |
| 13:40 ~ 16:00 | UI PoC 개발하기       |
| 16:00 ~ 16:30 | 워크샵 소회           |

---

## 사전 준비물

- 자신이 PoC로 만들어보고 싶은 서비스 아이디어 (간단한 메모 수준이면 충분, 자세할 수록 좋음)
- 개인 노트북

---

## 1. 오프닝 (12:00 ~ 12:10)

워크숍의 목표와 진행 방식을 소개합니다.

**워크숍 목표**: 비개발자가 AI 도구만으로 자신의 서비스 아이디어를 실제 동작하는 웹 UI PoC로 만들어보는 것

**진행 흐름**:

1. 개발 환경 설정 (복사 & 붙여넣기 수준)
2. PRD Writer MCP 설정 및 PRD 문서 작성
3. Claude Code로 UI PoC 개발
4. 결과물 데모 및 피드백

---

## 2. 개발 환경 설정하기 (12:10 ~ 12:50)

[INSTALLATION.md](./INSTALLATION.md)를 따라 순서대로 설치합니다.
Claude Code의 Bedrock 연동은 [CLAUDE_CODE_SETUP.md](./CLAUDE_CODE_SETUP.md)를 참고하세요.

설치 항목 요약:

1. Git 설치
2. Node.js 설치
3. VS Code 설치
4. pnpm 및 Claude Code 설치
5. Claude Code Bedrock 설정 → [별도 가이드](./CLAUDE_CODE_SETUP.md)
6. 프로젝트 클론 및 의존성 설치
7. Claude Code에 PRD Writer MCP 연결

> **Tip**: `pnpm install`이 진행되는 동안 다음 섹션의 PRD Writer 설정 가이드를 미리 읽어두면 시간을 절약할 수 있습니다.

---

## 3. PRD Writer 설정 + PRD 만들기 (12:50 ~ 13:40)

### 3-1. PRD Writer MCP 서버 설정하기

PRD 작성을 도와주는 **[PRD Writer MCP 서버](https://github.com/haandol/prd-writer)**를 Claude Code에 연결합니다.
PRD Writer는 9개 섹션으로 구성된 PRD 템플릿을 제공하고, 대화형으로 PRD를 완성해주는 도구입니다.

> **사전 조건**: PRD Writer는 내부적으로 pnpm을 사용합니다. [INSTALLATION.md](./INSTALLATION.md)의 4단계에서 pnpm이 설치되어 있어야 합니다.

**Step 1.** VS Code 터미널에서 Claude Code를 실행합니다.

```bash
claude
```

**Step 2.** Claude Code 안에서 PRD Writer MCP 서버를 등록합니다.

```
/mcp add prd-writer npx -y github:haandol/prd-writer
```

**Step 3.** 등록이 되었는지 확인합니다.

```
/mcp
```

- `prd-writer` 항목이 목록에 보이면 성공
- 이후 Claude Code에서 PRD 작성 관련 도구를 바로 사용할 수 있습니다

> **참고**: MCP 등록은 한 번만 하면 됩니다. 다음에 Claude Code를 다시 실행해도 자동으로 연결됩니다.

### 3-2. PRD Writer로 PRD 문서 만들기

연결된 **PRD Writer MCP**를 활용하여 대화형으로 PRD를 작성합니다.

**Step 1.** Claude Code에서 PRD 작성을 시작합니다.

프롬프트 예시 (아이디어 메모만 있는 경우):

```
내 서비스 아이디어: [여기에 아이디어를 입력]

이 아이디어를 바탕으로 PRD를 작성해줘.
PRD Writer MCP를 사용해서 대화형으로 진행해줘.
```

프롬프트 예시 (리서치 파일이 있는 경우):

```
@~/Downloads/research.docx 이 리서치 결과를 바탕으로 PRD를 작성해줘.
PRD Writer MCP를 사용해서 대화형으로 진행해줘.
```

> **Tip**: 아이디어를 구체적으로 작성할수록 좋은 PRD가 만들어집니다.
> 예: "재고 관리 대시보드를 만들고 싶다" 보다는 "중소 이커머스 셀러를 위한 실시간 재고 현황 대시보드. 상품별 재고 수량, 입출고 이력, 재고 부족 알림 기능 포함"

**Step 2.** Claude Code가 섹션별로 질문을 합니다. 각 질문에 답변하면 됩니다.

PRD Writer는 총 9개 섹션을 순서대로 작성합니다:

| # | 섹션 | 설명 |
| --- | --- | --- |
| 1 | Overview | 서비스 개요 |
| 2 | MVP Goals and Key Metrics | MVP 목표와 핵심 지표 |
| 3 | Demo Scenario | 데모 시나리오 |
| 4 | High-Level Architecture | 고수준 아키텍처 |
| 5 | Design Specification | 디자인 명세 |
| 6 | Requirements Summary | 요구사항 요약 |
| 7 | Feature-Level Specification | 기능별 상세 명세 |
| 8 | MVP Metrics | MVP 지표 |
| 9 | Out of Scope | 범위 밖 항목 |

- 잘 모르겠는 부분은 "알아서 작성해줘"라고 답해도 됩니다
- 각 섹션은 확인 후 저장되므로, 수정이 필요하면 그 자리에서 바로 요청하세요

**Step 3.** 모든 섹션이 완성되면 PRD를 Markdown으로 내보냅니다.

```
PRD를 마크다운으로 export 해줘.
```

PRD가 `docs/` 디렉토리에 Markdown 파일로 저장됩니다.

> **Tip**: PRD Writer는 대화형으로 진행되므로, 한 번에 완벽하게 답하지 않아도 괜찮습니다. 간단히 답하면 Claude가 보완해서 작성해줍니다.

---

## 4. UI PoC 개발하기 (13:40 ~ 16:00)

### 4-1. Claude Code로 UI 개발 시작

> **참고**: 앞 단계에서 PRD Writer로 작성한 PRD 파일이 `docs/` 디렉토리에 이미 저장되어 있습니다.

**Step 1.** VS Code 터미널에서 `packages/web` 디렉토리로 이동 후 Claude Code를 실행합니다.

```bash
cd packages/web
claude
```

**Step 2.** Claude Code에 PRD를 읽고 첫 번째 기능부터 만들어달라고 요청합니다.

프롬프트 예시:

```
@docs/prd.md 파일을 읽고, 이 PRD에 정의된 UI PoC를 만들어줘.

이 프로젝트는 Nuxt 4 + Vue 3 기반이야.
모든 데이터는 mock 데이터로 만들어줘 (실제 API 호출 없이).
한국어 UI로 만들어줘.

먼저 PRD의 Feature 1부터 시작하자.
```

### 4-2. 피쳐를 하나씩 만들기

한 번에 모든 기능을 만들지 말고, **피쳐 단위로 하나씩** 진행합니다.

**반복 사이클**:

```
1. Claude Code에 피쳐 구현 요청
   └─ "Feature 2를 만들어줘. [추가 설명]"

2. 개발 서버에서 결과 확인
   └─ 브라우저에서 http://localhost:3000 확인

3. 피드백 및 수정 요청
   └─ "버튼 색상을 파란색으로 바꿔줘"
   └─ "테이블에 정렬 기능을 추가해줘"
   └─ "레이아웃을 좌우 2단으로 변경해줘"

4. 만족하면 다음 피쳐로 이동
```

> **Tip**: Claude Code에 수정을 요청할 때는 구체적으로 말할수록 좋습니다.
>
> - (X) "이거 좀 이상해"
> - (O) "사이드바 메뉴의 폰트 크기를 14px로 줄이고, 메뉴 항목 간 간격을 8px로 줄여줘"

### 4-3. 개발 서버 실행 (개발 중 항상 켜두기)

개발하는 동안 별도의 터미널 탭에서 개발 서버를 실행해둡니다.

```bash
# 프로젝트 루트에서
pnpm dev:web
```

코드가 변경되면 브라우저에 자동으로 반영됩니다 (Hot Reload).

### 4-4. 자주 쓰는 Claude Code 프롬프트 예시

| 상황             | 프롬프트 예시                                                        |
| ---------------- | -------------------------------------------------------------------- |
| 새 페이지 추가   | "'/dashboard' 경로에 대시보드 페이지를 만들어줘"                     |
| 컴포넌트 수정    | "헤더 컴포넌트에 로고와 네비게이션 메뉴를 추가해줘"                  |
| Mock 데이터 추가 | "사용자 목록 mock 데이터를 10건 만들어줘. 이름, 이메일, 가입일 포함" |
| 스타일 변경      | "전체 테마를 다크 모드로 바꿔줘"                                     |
| 차트 추가        | "월별 매출 데이터를 막대 차트로 보여주는 컴포넌트를 만들어줘"        |
| 레이아웃 변경    | "사이드바 + 메인 콘텐츠 레이아웃으로 변경해줘"                       |
| 에러 발생 시     | "이 에러를 수정해줘: [에러 메시지 붙여넣기]"                         |

---

## 5. 워크샵 소회 (16:00 ~ 16:30)

### 5-1. 데모 시간

각자 만든 UI PoC를 화면 공유로 시연합니다.

- 어떤 아이디어로 시작했는지
- 최종 결과물은 어떤 모습인지
- 만드는 과정에서 인상적이었던 점

### 5-2. 질의응답

실제 업무(R&R)에서 활용할 때의 궁금한 점을 공유합니다.

- "이 워크플로우를 실제 PM 업무에 어떻게 적용할 수 있을까?"
- "PRD Writer로 만든 PRD를 실제 프로젝트에서 어떻게 활용하나?"
- "만든 PoC를 실제 개발팀에 전달할 때 어떻게 하면 좋을까?"

### 5-3. 워크숍 피드백

워크숍 개선을 위한 피드백을 공유합니다.

- 어려웠던 부분
- 도움이 되었던 부분
- 추가로 다뤄졌으면 하는 내용

---

## 트러블슈팅

문제가 발생하면 [INSTALLATION.md](./INSTALLATION.md#트러블슈팅)의 트러블슈팅 섹션을 참고하세요.
