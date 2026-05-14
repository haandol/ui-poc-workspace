---
name: feature-dev
description: Feature 구현 게이트키퍼. PRD Feature(F1, F2, …) 신규 구현 또는 수정 요청 시 반드시 이 스킬을 통해 진행합니다. ALPS PRD를 읽어 의존성을 파악하고, ADR을 작성·확인한 뒤 구현을 시작합니다. "F1 구현해줘", "F2 만들어줘", "Feature 개발", "다음 피쳐", "PRD 보고 구현", "@docs/prd/ 읽고 구현" 등의 요청에 자동 트리거.
---

# Feature Dev Skill

ALPS PRD Feature 구현의 **전체 라이프사이클**을 관리하는 게이트키퍼 스킬.

## 트리거 조건

아래 상황에서 **자동으로** 이 스킬이 동작해야 한다:

- 사용자가 Feature 구현을 요청할 때: "F1 구현해줘", "F2 만들어줘", "Feature 3 개발해줘"
- 사용자가 특정 Feature 수정을 요청할 때: "F1 수정해줘", "로그인 페이지 바꿔줘" (해당 페이지가 Feature에 매핑되는 경우)
- PRD 파일을 `@`로 첨부하고 구현을 요청할 때
- "다음 피쳐", "나머지 구현해줘" 등 Feature 구현 의도가 있을 때

**트리거하지 않는 경우**: 단순 버그 수정, 스타일 미세 조정(색상·간격), 오타 수정, 이미 ADR이 Accepted 상태인 Feature의 작은 후속 수정

## 워크플로우

```
1. PRD 읽기 → 2. 의존성 분석 → 3. ADR 작성/확인 → 4. 사용자 확인 → 5. 구현 → 6. ADR 동기화 + 완료 보고
```

---

### Step 1: ALPS PRD 읽기

1. `docs/prd/` 디렉토리에서 `.alps.md` 파일을 찾는다
2. 파일이 없으면 사용자에게 "PRD가 아직 없습니다. 먼저 PRD를 작성해주세요." 안내 후 중단
3. PRD에서 요청된 Feature ID에 해당하는 정보를 추출:
   - **Section 6 (Requirements Summary)**: Feature ID, 우선순위, 의존성
   - **Section 7 (Feature-Level Specification)**: User Story, User Flow, Technical Description, Acceptance Criteria

---

### Step 2: 의존성 분석

PRD Section 6의 의존성 정보와 Section 7의 기술 설명을 기반으로:

1. **선행 Feature 확인**: 이 Feature가 의존하는 다른 Feature가 구현되어 있는지 확인
   - `docs/adr/` 에서 선행 Feature의 ADR 존재 + `Accepted` 상태 확인
   - 또는 해당 Feature의 코드가 `packages/web/` 에 존재하는지 확인
   - 선행 Feature가 미구현이면 사용자에게 알리고 진행 여부 확인
2. **기술 의존성 확인**: 외부 라이브러리, API, 공유 컴포넌트 등 필요 사항 파악
3. **DESIGN.md 확인**: UI 관련 Feature면 루트 `DESIGN.md`와 `docs/design/` 읽기

---

### Step 3: ADR 작성 또는 확인

1. `docs/adr/` 에서 해당 Feature의 ADR이 이미 있는지 확인 (파일명에 Feature ID 포함: `XXXX-fN-*.md`)
2. **ADR이 없는 경우** → 새 ADR 작성 (**MANDATORY — 이 단계를 건너뛸 수 없다**)
3. **ADR이 있는 경우** → 내용을 읽고 현재 구현 방향과 일치하는지 확인. 불일치 시 ADR 업데이트 제안

#### ADR 작성 절차

1. `docs/adr/README.md`의 작성 규칙을 먼저 읽는다 (source of truth)
2. `docs/adr/` 의 기존 ADR 번호를 확인하여 다음 번호 결정
3. 파일명: `XXXX-fN-kebab-case-title.md` (e.g., `0001-f1-email-signup.md`)
4. 아래 ADR 작성 규칙에 따라 작성
5. `docs/adr/README.md` 인덱스에 새 항목 추가

#### ADR 작성 규칙 (docs/adr/README.md 규칙 + 보완)

##### 구조

```markdown
# ADR XXXX: F{N} — {제목}

Date: YYYY-MM-DD

## Status

Proposed

## Context

- PRD Feature: F{N} ({Feature 이름})
- 우선순위: {PRD Section 6에서}
- 의존성: {선행 Feature 또는 없음}

{결정이 필요한 배경과 문제 설명}

## Decision

{구현 방향, 기술 선택, 컴포넌트 구조 설명}

### 대안 검토

{검토한 다른 접근 방식과 채택하지 않은 이유}

## Consequences

### Positive

### Negative

### Risks

## Related

{관련 ADR 링크}
```

##### Status 값 제한

유효한 값: `Proposed`, `Accepted`, `Deprecated`, `Superseded by [ADR XXXX](link)`

`Implemented`, `Done`, `Completed` 등은 유효하지 않다. `Accepted`는 "결정 확정"을 의미하며 구현 완료 여부와 무관하다.

##### 구현 세부사항 배제 — 리트머스 테스트

> "이 값/세부사항이 코드에서 바뀌면, 아키텍처 결정 자체가 바뀌는가?"
> **NO** → ADR에 넣지 않는다. **YES** → ADR에 유지한다.

**금지 항목:**

- 구현 파일 경로 (e.g., `packages/web/app/components/LoginForm.vue`)
- 코드 스니펫 (TS 인터페이스, 함수 시그니처 등)
- 구현 상수/튜닝값 (e.g., `MAX_ITEMS = 10`)
- CSS 클래스명, Tailwind 유틸리티 클래스

**유지 항목:**

- 문제 배경과 동기 (WHY)
- 결정 요약과 대안 비교
- 컴포넌트 간 관계 (개념 수준)
- 상태 관리 전략 (Pinia store 구조 등)
- 페이지 라우팅 구조
- Mermaid 다이어그램 (flow, state 등)
- Consequences (긍정/부정/리스크)

##### 다이어그램

비 trivial한 흐름이 있을 때 Mermaid 다이어그램을 포함한다. 다이어그램 안에서도 함수명 대신 동작을 서술한다.

##### 한국어 작성

ADR 본문은 한국어로 작성. 기술 용어, 코드 식별자, 영문 고유명사는 원어 그대로.

---

### Step 4: 사용자 확인

ADR 내용을 사용자에게 보여주고 **구현 시작 승인을 받는다**.

출력 형식:

```
## ADR: F{N} — {제목}

**구현 방향**: {Decision 요약, 2-3문장}
**선행 조건**: {의존 Feature / 라이브러리}
**영향 범위**: {생성될 주요 페이지/컴포넌트 영역}

이 방향으로 구현을 시작할까요?
```

사용자가 수정을 요청하면 ADR을 업데이트한 뒤 다시 확인.
사용자가 "ADR 건너뛰고 바로 구현해줘"라면 → 리스크를 안내하되 존중한다. 최소한 간략 ADR이라도 생성 권장.

---

### Step 5: 구현

ADR에서 결정된 방향에 따라 코드를 작성한다.

구현 중 지켜야 할 규칙:

- `packages/web/AGENTS.md`의 제약 조건 준수
- `DESIGN.md` + `docs/design/` 디자인 시스템 준수
- DaisyUI 금지 클래스 회피 (btn, select, modal, toggle 등)
- Vue 3 Composition API `<script setup lang="ts">` 사용
- 빌드 검증: `npx nx build web`

---

### Step 6: ADR 동기화 및 완료

구현 완료 후:

1. **ADR 상태 업데이트**: `Proposed` → `Accepted`
2. **동기화 검증**: 구현 결과가 ADR의 Decision과 일치하는지 확인
   - 아키텍처 결정이 변경되었으면 ADR Decision 섹션 업데이트
   - 구현 파일 경로는 추가하지 않음 (리트머스 테스트 적용)
3. `docs/adr/README.md` 인덱스 동기화
4. 빌드 확인: `npx nx build web`
5. 사용자에게 완료 보고

완료 보고 후 `workshop-status` 스킬의 자동 트리거 규약에 따라 `F{N}-DONE` 보고.

---

## Feature 수정 시

이미 구현된 Feature를 수정하는 경우:

1. 해당 Feature의 기존 ADR 확인 (`docs/adr/` 에서 `fN` 포함 파일)
2. 수정이 **아키텍처 결정 변경**을 수반하는지 리트머스 테스트 적용:
   - **YES** (페이지 구조 변경, 상태 관리 방식 변경, 컴포넌트 분리 전략 변경) → ADR 업데이트 후 구현
   - **NO** (데이터 추가, 스타일 변경, 텍스트 수정) → ADR 수정 없이 바로 구현

---

## ADR 롤업 (Roll-up)

같은 Feature에 대해 ADR이 2개 이상 누적된 경우 (진화 체인):

1. **앞쪽(낮은 번호) ADR이 뒤쪽을 흡수**한다
2. 뒤쪽 ADR 파일은 삭제 (Deprecated로 남기지 않음)
3. 결과물은 "원래부터 하나의 ADR이었던 것처럼" 읽혀야 한다
4. Evolution History 섹션 금지 — Git 히스토리가 source of truth
5. README.md 인덱스 갱신

---

## 판단 기준: 이 스킬을 쓸지 말지

| 요청 유형                                | 이 스킬 사용 | 이유                         |
| ---------------------------------------- | :----------: | ---------------------------- |
| "F1 구현해줘"                            |      O       | 새 Feature 구현              |
| "@docs/prd/xyz.alps.md 읽고 F1 구현해줘" |      O       | PRD Feature 구현             |
| "로그인 기능 추가해줘" (PRD에 정의됨)    |      O       | PRD Feature 매핑             |
| "F2 페이지에 차트 추가해줘"              |      O       | Feature 아키텍처 변경 가능   |
| "다음 피쳐 해줘"                         |      O       | 순차적 Feature 구현          |
| "버튼 색상 파란색으로"                   |      X       | 단순 스타일 (design-md 스킬) |
| "오타 수정해줘"                          |      X       | 아키텍처 무관                |
| "에러 수정해줘"                          |      X       | 버그 수정                    |
| "F1 텍스트 좀 바꿔줘"                    |      X       | 내용 수정 (아키텍처 불변)    |

---

## 주의사항

- **ADR 없이 Feature 코드 작성을 시작하지 않는다** — 이것이 이 스킬의 핵심 존재 이유
- ADR에 구현 파일 경로를 포함하지 않는다 (리트머스 테스트)
- 한 번에 여러 Feature를 구현하지 않는다 — Feature 단위로 하나씩
- `docs/adr/` 디렉토리가 없으면 생성한다
- ADR 번호는 `docs/adr/` 내에서 순차적으로 증가
- Status 값은 `Proposed`/`Accepted`/`Deprecated`/`Superseded` 만 사용
