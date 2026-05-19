---
title: 'PRD를 ADR로 변환'
weight: 15
---

PRD가 "무엇을 만들지"의 큰 그림이라면, **ADR(Architecture Decision Record)** 은 각 기능을 만들기 전 **"이렇게 만들겠다"는 짧은 설계 메모** 입니다.
Feature 하나당 ADR 하나를 먼저 만들고, 그걸 기준으로 코드를 작성합니다.

::alert[ADR 이라는 단어가 낯설 수 있지만, 실제로는 _"이 기능을 왜·어떻게 만들지를 정리한 한 페이지짜리 메모"_ 입니다. AI 가 자동으로 채워주므로 문서 작성 부담이 없습니다.]{type="info"}

## Step 1. 첫 Feature 를 ADR 로 변환

💬 Claude Code 대화창에 입력합니다 (`f1` 은 PRD 에 정의된 첫 Feature ID 입니다):

:::code{showCopyAction=true showLineNumbers=false language=text}
/feature-to-adr f1
:::

Claude 가 자동으로:

1. PRD Section 7 에서 F1 명세를 읽습니다
2. `docs/adr/f1/0001-…md` 파일을 생성합니다
3. **Decision (이렇게 만들겠다), 대안 비교, Consequences (영향)** 를 채워 보여줍니다

## Step 2. ADR 검토 후 승인

생성된 ADR 내용 중 **Decision** 섹션만 읽으면 충분합니다. 나머지는 AI 가 자동으로 정리한 근거입니다.

- 의도와 맞으면 → "OK, Accepted 로 승격해줘"
- 다르면 → "결제는 카드형이 아니라 드롭다운으로 해줘" 처럼 자연어로 수정 요청

승인하면 ADR 의 Status 가 `Proposed` → `Accepted` 로 바뀌고, 다음 단계 (구현) 로 넘어갈 준비가 됩니다.

::alert[ADR 파일은 `docs/adr/<feature-id>/` 에 저장됩니다. Finder/파일탐색기로 직접 열어볼 수도 있고, Claude 에게 _"f1 ADR 보여줘"_ 라고 해도 됩니다.]{type="info"}

## Step 3. 나머지 Feature 도 같은 방식으로

PRD 에 정의된 F2, F3, … 도 같은 흐름입니다. **한 번에 모두 변환하지 말고, 한 Feature 구현이 끝난 다음에 다음 ADR 로 넘어가세요.** 다음 단계 (Feature 구현) 와 번갈아가며 진행합니다.
