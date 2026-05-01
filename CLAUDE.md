# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

For project structure, tech stack, architecture, code style, and dev commands, refer to the AGENTS.md files.

- [AGENTS.md](./AGENTS.md) - Project overview, package structure, ADRs, deployment
- [packages/web/AGENTS.md](./packages/web/AGENTS.md) - Web frontend (features, conventions, design system)

## Workshop Progress Tracking

워크숍 진행 상태는 `.work-status` 저널과 Airtable 로 이중 기록된다. 일부는 hook 이 자동 처리하지만, **아래 마일스톤은 tool 신호로 잡히지 않으므로 Claude 가 직접 `workshop-status` skill 을 호출해야 한다.**

- `SCAFFOLD-DONE`: 랩 3의 dev 서버 기동을 확인하고 사용자가 첫 Feature 구현을 요청했을 때
- `F{N}-DONE`: Feature N 구현 태스크를 끝내고 사용자에게 결과를 보고한 직후 (N=1,2,3,…)
- `DEMO-READY`: 사용자가 "데모 준비 끝", "다 만들었어" 류의 완료 선언을 했을 때

규칙:

- 호출 전 `.work-status` 를 확인해 이미 기록된 마일스톤이면 skip (중복 전송 금지)
- `.workshop-participant` 파일이 없으면 기록하지 않는다 (참여자가 Airtable 연동을 하지 않은 것)
- 사용자가 "상태 공유 꺼" 류로 거부하면 세션 동안 자동 트리거 중단
- 나머지 마일스톤(RESEARCH-DONE, PRD-START/FEATURES/DONE)은 `scripts/workshop-hook.mjs` 가 자동 기록하므로 Claude 가 손대지 않는다
