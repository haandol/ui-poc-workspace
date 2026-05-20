---
title: 'PRD를 ADR로 변환'
weight: 15
---

**PRD 와 ADR 의 차이**

- **PRD** — 기획자 관점에서 정리한 **"무엇을 왜 만들 것인가"** 에 대한 요구사항 문서
- **ADR (Architecture Decision Record)** — 개발자 관점에서 그 기능을 만들 때 **"어떤 구조로 갈지, 왜 그 선택을 했는지"** 를 남기는 **아키텍처 의사결정 기록**. 구현 디테일 (파일 경로, 코드 스니펫, 상수) 은 코드가 갖고 있고, ADR 에는 **결정의 근거 (WHY), 대안 비교, 그 결정의 영향 (Consequences)** 만 남깁니다.

간단한 화면이라면 ADR 없이도 충분히 만들 수 있습니다. 하지만 **기능이 많아지고 프로젝트가 복잡해질수록 PRD 와 ADR 을 구분해서 관리** 하는 것이 필요합니다. 데모 후 변경 요구가 들어올 때 _"무엇을 만들기로 했는지 (PRD)"_ 와 _"왜 그렇게 결정했는지 (ADR)"_ 가 분리되어 있어야, 새 요구사항이 기존 결정을 어디까지 흔드는지 판단하고 같은 사이클로 계속 진화시킬 수 있기 때문입니다.

::alert[ADR 은 결국 **기술 의사결정 기록** 입니다. 비개발자는 직접 작성할 필요 없이, **개발에 능숙한 AI 에이전트에게 작성을 맡기고 그 결정에 따라 개발을 시키면** 됩니다. 이 페이지의 명령어 한 줄이면 ADR 작성·검토·승인까지 모두 처리됩니다.]{type="info"}

![PRD · ADR · 코드 의 관계](/static/images/lab-3/prd-adr-code.svg)

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
