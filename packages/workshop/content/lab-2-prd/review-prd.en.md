---
title: 'PRD 검토 및 수정'
weight: 20
---

생성된 PRD를 검토하고 필요한 부분을 수정합니다. AI와 대화하듯이 피드백을 주면 됩니다.

## PRD 파일 열어보기

생성된 ALPS 문서를 직접 읽어보려면 아래 방법 중 하나를 사용합니다.

::::tabs
:::tab{label="VSCode (추천)"}

:::code{showCopyAction=true showLineNumbers=false language=bash}
code docs/prd/
:::

VSCode에서 마크다운 미리보기를 보려면 파일을 연 뒤 `Cmd + Shift + V` (Mac) 또는 `Ctrl + Shift + V` (Windows)를 누릅니다.

:::
:::tab{label="glow (터미널)"}

:::code{showCopyAction=true showLineNumbers=false language=bash}
glow docs/prd/\*.alps.md
:::

터미널에서 마크다운이 보기 좋게 렌더링됩니다.

:::
:::tab{label="Claude Code"}

Claude Code 프롬프트에서 직접 검토를 요청할 수도 있습니다.

:::code{showCopyAction=true showLineNumbers=false language=text}
@docs/prd/XYZ.alps.md 를 검토하려고해, 섹션별로 보여줘.
:::

:::
::::

## PRD 검토 포인트

생성된 ALPS 문서에서 아래 항목을 확인합니다:

1. **제품 개요** (Section 1) — 비전과 타겟 사용자가 내 아이디어와 일치하는지
2. **MVP 목표** (Section 2) — 검증할 가설과 측정 지표가 현실적인지
3. **데모 시나리오** (Section 3) — 핵심 사용자 여정이 자연스러운지
4. **아키텍처** (Section 4) — 시스템 구성이 적절한지
5. **디자인 명세** (Section 5) — 주요 화면 구성과 이동 흐름이 직관적인지
6. **Feature 목록** (Section 6) — 구현할 기능과 우선순위가 적절한지
7. **기능 상세** (Section 7) — User Story와 인수 조건이 명확한지
8. **측정 지표** (Section 8) — 성공/실패 판단 기준이 구체적인지
9. **범위 밖** (Section 9) — MVP에서 제외할 항목이 합리적인지

## 수정 요청 예시

PRD 내용이 마음에 들지 않으면 자유롭게 수정을 요청합니다.

| 상황          | 프롬프트 예시                                    |
| ------------- | ------------------------------------------------ |
| 기능 추가     | "로그인 기능 대신 대시보드 기능을 F1으로 바꿔줘" |
| 기능 제거     | "F5는 MVP에 불필요하니 제거해줘"                 |
| 우선순위 변경 | "F3의 우선순위를 High로 올려줘"                  |
| 내용 보완     | "F2의 User Story를 더 구체적으로 작성해줘"       |
| 기능 이해     | "F3의 사용자 플로우를 처음부터 끝까지 설명해줘"  |

## 질문 활용하기

PRD 작성 중 궁금한 점이 있으면 언제든 질문합니다.

- "이 기능의 타겟 사용자가 누구야?"
- "경쟁사 A와 비교했을 때 이 기능의 장점이 뭐야?"
- "MVP에 꼭 들어가야 할 핵심 기능만 추려줘"
- "사용자 플로우를 처음부터 끝까지 설명해줘"

::alert[PRD는 개발 전에 충분히 검토하는 것이 중요합니다. 나중에 수정할 수 있지만, 처음부터 방향을 잘 잡으면 개발 시간을 절약할 수 있습니다.]{type="info"}

## 완료 확인

PRD 검토가 끝나면 다음을 확인합니다:

- [ ] Feature 목록이 3~5개로 적절하게 정의되었다
- [ ] 각 Feature에 User Story와 인수 조건이 있다
- [ ] 구현 순서(F1 → F2 → ...)가 논리적이다

준비가 되면 다음 랩으로 이동합니다.
