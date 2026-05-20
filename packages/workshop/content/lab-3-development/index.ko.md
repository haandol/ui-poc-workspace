---
title: 'Lab 3: UI PoC 개발'
weight: 40
---

이 랩에서는 작성한 PRD 를 기반으로 실제 동작하는 웹 UI 를 개발합니다. **PRD → ADR → 코드** 순으로 한 Feature 씩 진행하며, 내부 리뷰나 개발자 핸드오프 후 들어오는 변경 요구도 같은 사이클로 계속 흡수할 수 있습니다.

**이 랩에서 할 일:**

1. 개발 웹 서버 실행
2. PRD 의 Feature 를 ADR (설계 메모) 로 변환 — `/feature-to-adr fN`
3. ADR 을 따라 코드 작성 — `/adr-impl fN`
4. 내부 리뷰·핸드오프 후 변경 요구 대응 — 큰 변경은 ADR 갱신 / 작은 변경은 코드만 / 누적되면 `/adr-sync`

**예상 소요 시간**: 100 분

::alert[**ADR (Architecture Decision Record)** — 각 Feature 를 만들기 전에 작성하는 한 페이지짜리 설계 메모입니다. Claude 가 자동으로 채워주므로 문서 작성 부담은 없고, 내부 리뷰 → 피드백 → 변경 사이클을 관리하는 기준점이 됩니다. 이 흐름은 [`alps-writer` Claude Code plugin](https://github.com/haandol/alps-writer-mcp) 이 자동으로 처리합니다.]{type="info"}
