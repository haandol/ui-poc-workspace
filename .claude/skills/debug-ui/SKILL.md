---
name: debug-ui
description: Nuxt/Vue 기반 웹 화면을 chrome-devtools-mcp 플러그인으로 직접 보고 고치는 비주얼 디버깅 워크플로. 사용자가 화면이 이상하다고 말하거나, 스크린샷·콘솔에러·레이아웃·반응형·접근성·네트워크·성능 문제를 보고할 때, 또는 단순히 "화면 봐줘", "지금 어떻게 보여?", "PRD/ADR 대로 됐는지 확인해줘" 같은 요청을 받으면 반드시 이 스킬을 트리거한다. localhost dev 서버(보통 :3000)에서 동작하는 PoC 를 디버깅하기 위해 만들어졌고, 추측으로 코드를 고치지 않고 **브라우저 실제 상태를 먼저 확인한 뒤** 수정하도록 강제한다.
---

# debug-ui Skill

Nuxt/Vue PoC 의 화면 문제를 **추측이 아니라 브라우저의 실제 상태를 보고** 진단·수정한다. `chrome-devtools-mcp` 플러그인이 제공하는 MCP tool 들을 사용한다.

## 이 스킬이 언제 동작해야 하나

**트리거 조건 (아래 중 하나라도 해당하면 무조건 이 스킬을 따른다):**

- 사용자가 화면을 직접 보고 평가해달라는 요청 — "화면 봐줘", "스크린샷 찍어줘", "지금 어떻게 보여?", "PRD/ADR 대로 됐는지 확인해줘"
- 레이아웃·정렬·간격·색상·폰트가 의도와 다르게 보인다는 보고
- "콘솔에 에러가 있는지" / "네트워크 요청 실패" / "API 가 안 들어와" 류의 진단 요청
- 반응형 (모바일/태블릿) 동작 점검
- 클릭·폼 입력·네비게이션 시나리오를 실제로 돌려봐야 하는 경우
- 성능·LCP·접근성 점검

**트리거하지 말 것:**

- 코드만 보고 끝나는 리뷰·리팩터링 (브라우저 검증이 필요 없음)
- dev 서버 자체가 안 뜨는 빌드 에러 (먼저 코드/빌드 문제부터 해결)
- PRD/ADR 작성 등 문서 작업

## 사전 조건 — 항상 먼저 확인

1. **chrome-devtools-mcp 플러그인 활성화 확인** — `mcp__plugin_chrome-devtools-mcp_chrome-devtools__list_pages` 같은 tool 이 사용 가능한지 확인. 없으면 사용자에게 `/reload-plugins` 후 `/mcp` 또는 `/plugin` Installed 탭에서 `chrome-devtools-mcp` 가 connected 인지 확인하도록 안내.
2. **dev 서버 실행 여부** — `http://localhost:3000` 가 떠 있는지 확인이 필요하다. 단, **에이전트가 `pnpm dev:web` 같은 dev 서버를 직접 띄우지 않는다** (`AGENTS.md` 의 "Dev Server — User-Managed Only" 규칙). 안 떠 있으면 사용자에게 별도 터미널에서 띄워달라고 한 줄 안내한다.
3. **포트 확인** — 사용자가 다른 포트를 썼다고 하면 (예: 3001) 그 주소로 진행한다. 명시 없으면 `http://localhost:3000` 으로 가정한다.

## 워크플로우

### Phase 1. 화면 확보 (항상 먼저)

1. `new_page` 또는 `list_pages` → `select_page` 로 대상 페이지 확보. 새 세션이면 `new_page` 로 `http://localhost:3000` 부터 연다.
2. `wait_for` 로 핵심 텍스트/요소가 렌더될 때까지 대기 (Nuxt SSR/CSR 전환 시 빈 화면을 잘못 캡처하는 사고 방지).
3. **두 가지 산출물을 함께 확보**:
   - `take_screenshot` — 사용자에게 보여주거나 PRD/ADR 와 시각 비교하기 위한 이미지
   - `take_snapshot` — 텍스트 기반 접근성 트리. 클릭·입력 등 후속 상호작용에 필요한 element `uid` 가 여기에 있다.

스크린샷·스냅샷이 크면 `filePath` 인자로 디스크에 떨어뜨려 컨텍스트를 아낀다.

### Phase 2. 진단 — 추측 금지

문제 유형별로 우선 확인할 신호:

| 증상                      | 먼저 확인할 것                                                                                   |
| ------------------------- | ------------------------------------------------------------------------------------------------ |
| 화면이 깨짐 / 비어 보임   | `list_console_messages` (런타임 에러), 스크린샷, snapshot 의 ARIA 트리                           |
| API 호출 실패 / 데이터 빔 | `list_network_requests` 로 4xx/5xx/CORS 확인, 필요한 요청 `get_network_request` 로 정독          |
| 클릭/입력이 안 먹음       | `take_snapshot` 으로 진짜 그 element 가 존재하고 `disabled` 가 아닌지 확인 후 `click`/`fill`     |
| 반응형 깨짐               | `resize_page` 로 viewport 변경 후 다시 `take_screenshot`                                         |
| 느림 / LCP 의심           | `performance_start_trace` → 동작 재현 → `performance_stop_trace` → `performance_analyze_insight` |
| 접근성 의심               | `take_snapshot` 의 트리에서 role / name 확인, 버튼이 `<div onclick>` 으로 위장됐는지             |

**원칙**: console / network / snapshot 셋 중 하나라도 안 보고 코드를 고치지 않는다. "추측"으로 패치하면 같은 버그가 반복된다.

### Phase 3. 수정 (해당하면)

1. 진단 결과를 한 줄로 사용자에게 보고: "원인은 X, 수정 방향은 Y."
2. 단순 스타일·문구·미세 위치 수정이면 → 코드만 고친다.
3. **결정 자체가 바뀌는** 큰 변경(컴포넌트 구조, 흐름, API 형태)이면 → 먼저 ADR 을 갱신하라고 사용자에게 권한다 (ADR-first 룰). 워크숍의 `lab-3-development/evolve-poc` 가이드와 동일.
4. 코드 수정 후 hot reload 가 반영됐는지 다시 `take_screenshot` 또는 `take_snapshot` 으로 확인. 캐시 의심되면 사용자에게 `Cmd+Shift+R` / `Ctrl+Shift+R` 안내.

### Phase 4. 검증 보고

수정 전/후 스크린샷을 함께 보여주고, 콘솔에러·실패 네트워크 요청이 0 인지 한 줄로 정리한다.

## 비개발자 친화 팁 (워크숍 컨텍스트)

워크숍 참여자가 비개발자라는 점을 항상 의식한다.

- **DOM 트리·HTML·CSS 같은 용어 자제**. "화면 구조", "스타일", "버튼 라벨" 같은 일상어로 보고한다.
- **수정 의도를 한 줄로 확인** 후 진행: "버튼을 더 크게 + 메인 컬러로 강조 — 이대로 갈까요?"
- 사용자가 "그냥 한번에 다 봐줘" 같이 막연하게 요청하면, **체크리스트로 시각 비교** 한다:
  - PRD Section 7 / ADR Decision 의 핵심 항목과 현재 화면을 한 행씩 매칭
  - 각 항목에 ✅ 일치 / ⚠️ 부분 / ❌ 불일치 + 한 줄 사유

## Nuxt/Vue 특이사항

- **Hydration 에러**는 SSR HTML 과 CSR 결과가 다를 때 발생한다. `list_console_messages` 에 "Hydration" 키워드 grep, 발생 시 해당 컴포넌트의 `<ClientOnly>` 누락 / `Date.now()`·`Math.random()` 의 SSR 사용을 의심.
- **HMR (hot module replacement)** 이 한 번씩 누락되면 화면이 stale 일 수 있다. `take_screenshot` 후 의심되면 사용자에게 강력 새로고침 안내.
- 라우팅 이슈는 `evaluate_script` 로 `window.location.pathname` 확인, Nuxt route 는 `useRoute()` 가 클라이언트에서만 의미 있다는 점 유의.

## 자주 쓰는 프롬프트 → 스킬 매핑

| 사용자 발화               | 이 스킬에서 실행할 것                                                                 |
| ------------------------- | ------------------------------------------------------------------------------------- |
| "지금 화면 어떻게 보여?"  | `new_page`/`select_page` → `take_screenshot` → 한 줄 묘사                             |
| "버튼이 안 눌려"          | `take_snapshot` → 해당 element uid 로 `click` 시도 → 콘솔/네트워크 점검               |
| "PRD F1 대로 됐는지 봐줘" | PRD Section 7 / `docs/adr/f1` 읽기 → 스크린샷 → 항목별 ✅/⚠️/❌ 표로 보고             |
| "모바일에서 어떻게 보여?" | `resize_page` (예: 390x844) → `take_screenshot`                                       |
| "API 가 안 들어와"        | `list_network_requests` → 실패 요청 `get_network_request` 로 상태/응답 본문 확인      |
| "느려"                    | `performance_start_trace` → 사용자가 말한 동작 재현 → `performance_stop_trace` → 분석 |

## 마무리 규칙

- 한 사이클이 끝나면 사용자에게 **"다음 변경 요청 받을 준비됐다"** 는 신호를 한 줄로 보낸다.
- 화면이 의도대로면 굳이 코드를 고치지 않는다. "확인 결과 PRD/ADR 과 일치합니다" 한 줄이면 충분하다.
- 같은 디버깅을 두 번째 돌릴 때는 **이전 사이클에서 본 console / network 결과** 를 먼저 떠올려서 같은 원인을 또 캐지 않도록 한다.
