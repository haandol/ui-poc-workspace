---
title: 'Lab 3: UI PoC 개발'
weight: 40
---

이 랩에서는 작성한 PRD를 기반으로 실제 동작하는 웹 UI를 개발합니다. Claude Code가 Nuxt/Vue 기반 웹 애플리케이션을 자동으로 구현합니다.

**이 랩에서 할 일:**

- 개발 서버 실행
- PRD의 Feature를 하나씩 ADR로 변환하고 코드로 구현 (`/feature-to-adr` → `/adr-impl`)
- 브라우저에서 결과 확인 및 피드백

**예상 소요 시간**: 100분

::alert[이 랩은 [`alps-writer` Claude Code plugin](https://github.com/haandol/alps-writer-mcp)이 제공하는 슬래시 명령으로 진행합니다. PRD Feature를 짧은 ADR(Architecture Decision Record) 메모로 먼저 변환한 뒤 그 결정에 따라 코드를 작성하는 흐름이며, 명령은 워크숍 환경에 이미 설치되어 있습니다.]{type="info"}
