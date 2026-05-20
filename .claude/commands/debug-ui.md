---
description: Visually debug the running Nuxt PoC at localhost via chrome-devtools-mcp — capture, inspect console/network, and fix without guessing.
argument-hint: '[what to check, in plain language]'
---

`debug-ui` 스킬을 적용해 현재 dev 서버 화면을 직접 확인·수정합니다. 사용자가 인자로 적은 자연어 지시(`$ARGUMENTS`)를 그 스킬의 입력으로 사용한다.

## 절차

전체 워크플로는 `${CLAUDE_PROJECT_DIR}/.claude/skills/debug-ui/SKILL.md` 를 따른다. 핵심 요약:

1. **chrome-devtools-mcp 플러그인 활성화 확인** — tool 이 안 보이면 `/reload-plugins` 또는 `/plugin` Installed 탭에서 `chrome-devtools-mcp` 활성 여부를 안내한다.
2. **dev 서버 가정** — 기본 `http://localhost:3000`. 인자에 다른 포트가 명시되어 있으면 그 주소로 진행한다. 서버가 안 떠있으면 사용자에게 별도 터미널에서 띄워달라고 한 줄 안내한다 (에이전트가 직접 `pnpm dev:web` 띄우지 않는다).
3. **화면 확보 → 진단 → (필요하면) 수정 → 재확인** 의 순서로 진행하며, console/network/snapshot 셋 중 하나라도 안 보고 코드를 고치지 않는다.
4. **결정이 바뀌는 변경** 이면 먼저 ADR 갱신을 권한다 (워크숍 `lab-3-development/evolve-poc` 가이드와 동일).

인자가 비어 있으면 사용자에게 "무엇을 확인할지 한 줄만 말해주세요" 라고 한 번 묻고 진행한다.
