# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

프로젝트 구조, 아키텍처, 코딩 규칙, 환경변수 등 모든 상세 가이드는 AGENTS.md 파일들을 참조하세요.

- [AGENTS.md](./AGENTS.md) - 프로젝트 전체 개요, 패키지 구조, ADR, Nx 설정
- [packages/web/AGENTS.md](./packages/web/AGENTS.md) - 웹 프론트엔드 (Nuxt 4)
- [packages/prd-writer/AGENTS.md](./packages/prd-writer/AGENTS.md) - PRD Writer MCP 서버
- [packages/asset-generator/AGENTS.md](./packages/asset-generator/AGENTS.md) - Asset Generator MCP 서버

## ADR (Architecture Decision Records)

새 기능 추가 또는 기존 기능 변경 시 반드시 `docs/adr/` 에 ADR을 작성하거나 기존 ADR을 업데이트해야 합니다. 상세 규칙은 [AGENTS.md](./AGENTS.md)의 ADR 섹션을 참조하세요.

## ALPS PRD Feature 구현 규칙 (MANDATORY)

ALPS PRD 문서(Section 6의 Feature 목록, Section 7의 Feature 상세 스펙)에 정의된 Feature(F1, F2, …)를 구현할 때는 반드시 아래 순서를 따라야 합니다. **이 규칙은 건너뛸 수 없습니다.**

1. **PRD Feature 확인** — ALPS PRD에서 해당 Feature의 ID, 우선순위, User Story, User Flow, Technical Description, Acceptance Criteria를 읽는다.
2. **ADR 작성 (구현 전 필수)** — 해당 Feature에 대한 ADR을 `docs/adr/` 에 작성한다. ADR에는 PRD Feature ID(예: F1)를 명시하고, 구현 방향에 대한 아키텍처 결정을 기록한다. ADR 상태는 `Proposed`로 시작한다.
3. **ADR 확인 완료 후 구현 시작** — ADR 파일이 커밋되거나 사용자가 ADR 내용을 확인한 후에만 코드 구현을 시작할 수 있다.
4. **구현 완료 후 ADR 동기화** — 구현이 ADR과 다르게 진행된 경우 ADR을 업데이트하고, `docs/adr/README.md` 인덱스도 갱신한다.

**위반 시**: Feature 코드 구현(파일 생성, 컴포넌트 추가, API 엔드포인트 작성 등)을 ADR 작성 없이 시작하면 안 됩니다. ADR이 존재하지 않는 Feature의 구현 요청을 받으면, 먼저 ADR 작성을 제안해야 합니다.
