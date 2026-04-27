---
name: design-md
description: 프로젝트 루트의 DESIGN.md(디자인 시스템 단일 소스 오브 트루스)를 만들고 유지한다. 웹 패키지(packages/web)에서 색상, 타이포, 간격, 테마, 컴포넌트 스타일, 다크모드, 디자인 토큰, Tailwind 설정 등 **UI 외형과 관련된 어떤 변경 요청이든** 받으면 반드시 이 스킬을 먼저 트리거해서 DESIGN.md를 먼저 업데이트하고 사용자 확인을 받은 뒤에 실제 코드를 수정한다. "버튼 색 바꿔줘", "폰트 키워줘", "다크모드 톤 조정", "카드 radius 좀 둥글게", "primary 컬러를 파랑으로" 같은 요청은 겉보기엔 단순 CSS 수정이지만 전부 디자인 시스템 변경이므로 이 스킬이 관여해야 한다. DESIGN.md가 아직 없으면 이 스킬이 프로젝트를 스캔해 초안을 만든다. Google Stitch DESIGN.md(2026 오픈소스) 스펙을 따른다.
---

# DESIGN.md Skill

이 스킬은 **"디자인을 바꾸기 전에 디자인 시스템 문서를 먼저 바꾼다"** 는 단순한 규율을 강제한다.
UI 코드는 DESIGN.md의 반영물이어야 하고, 그 반대가 되면 프로젝트 전체의 디자인 일관성이 서서히 무너진다.

## 이 스킬이 언제 동작해야 하나

**트리거 조건 (아래 중 하나라도 해당하면 무조건 이 스킬을 먼저 따른다):**

- `packages/web/**` 경로의 `.vue`/`.ts`/`.css` 파일에서 **외형·스타일을 바꾸는** 요청
- 색상 팔레트, 브랜드 컬러, 시맨틱 컬러(success/error 등) 변경
- 폰트 패밀리·크기·무게·라인하이트 변경
- 간격 스케일(spacing scale), 컨테이너 max-width, 그리드 규칙 변경
- 모서리 둥글기(radius), 그림자(shadow), 경계선(border) 규칙 변경
- 다크모드/라이트모드 토큰 변경, 테마 토글 동작
- Tailwind 설정(`@theme`, `tailwind.config`), DaisyUI 테마 변경
- 버튼·카드·인풋·모달 같은 **공용 컴포넌트의 외형** 변경
- "전체적인 디자인 톤을 …로 바꾸고 싶다" 같은 거시적 요청

**트리거하지 말 것:**

- 단순 버그 수정(레이아웃 깨짐 복구 등) — 기존 규칙을 지키러 가는 중임
- 특정 페이지의 **일회성 레이아웃**만 만지는 요청(공용 컴포넌트 아님)
- 백엔드/로직/데이터 변경

애매하면 사용자에게 **"이 변경은 디자인 시스템 전체에 영향이 있나요, 아니면 이 화면 한정인가요?"** 한 줄 질문하고 결정한다.

---

## 워크플로우

### Phase 0. DESIGN.md 존재 확인

프로젝트 루트(`/Users/dongkyl/git/non-tech-ui-poc-workshop/DESIGN.md`)에 파일이 있는지 먼저 확인.

- **있으면** → Phase 2로 이동
- **없으면** → Phase 1(초안 생성) 먼저 진행

### Phase 1. DESIGN.md 초안 생성 (최초 1회)

DESIGN.md가 없는 상태에서 사용자가 디자인 변경을 요청했다는 건, 지금이 디자인 시스템을 문서화할 적기라는 뜻이다.

1. **프로젝트 스캔** — 아래 위치를 읽어 현재 디자인 상태를 파악:
   - `packages/web/nuxt.config.ts`, `packages/web/app.vue`, `packages/web/assets/css/*`
   - `packages/web/app/components/**` 중 공용처럼 보이는 파일 3~5개
   - `AGENTS.md`, `packages/web/AGENTS.md` — 이미 문서화된 규칙이 있을 수 있음
2. **Stitch 공식 스펙 재확인** — `references/spec.md`를 읽고 8개 섹션 순서·YAML frontmatter 스키마를 숙지한다.
3. **실전 예시 참고** — `references/example.md`를 읽고 Tailwind·다크모드 매핑 표처럼 프로젝트에 유용한 패턴을 흡수한다.
4. **초안 작성** — 아래 "문서 구조" 섹션의 순서를 그대로 따른다. 확신이 없는 값은 비우지 말고 코드에서 실제로 쓰이는 값을 그대로 옮겨 적는다.
5. **사용자 확인** — 초안을 간략히 요약해서 보여주고 "이대로 DESIGN.md로 저장하고 원래 요청하신 변경을 반영할까요?" 물어본다. 승인 시 Phase 2로.

### Phase 2. 변경 요청 반영 (매번)

사용자가 디자인 변경을 요청했다.

1. **영향 범위 식별** — 변경이 DESIGN.md의 어느 섹션(Colors? Typography? Components?)과 어떤 토큰을 건드리는지 명시한다.
2. **DESIGN.md 먼저 Edit** — YAML frontmatter의 토큰 값과 Markdown 본문의 설명·표를 **둘 다** 갱신한다. 둘이 어긋나면 AI 에이전트가 혼동한다.
3. **사용자 확인**:

   > "DESIGN.md를 다음과 같이 수정했습니다. 맞다고 확인해 주시면 이 규칙에 맞춰 실제 코드(`packages/web/...`)를 업데이트하겠습니다."

   사용자 승인 전에는 **웹 패키지 코드를 절대 수정하지 않는다**. 이 순서를 뒤집으면 DESIGN.md는 "사후 기록"이 되고 점점 현실과 멀어진다.

4. **코드 반영** — 승인 후 DESIGN.md에 적힌 토큰/규칙과 일치하는 방향으로만 수정한다. 변경 중 DESIGN.md에 없는 새 토큰이 필요하면 잠시 멈추고 Phase 2의 1~3단계를 다시 돈다.
5. **시각 검증(가능하면)** — 프론트엔드 변경은 타입 체크·테스트로는 부족하다. 개발 서버가 이미 떠 있다면 `chrome-devtools-mcp` 스킬로 라이트/다크 양쪽에서 화면을 확인한다. 없으면 "브라우저 확인은 불가능해서 수행하지 않았다"고 솔직히 보고한다.

### Phase 3. 정합성 체크 (선택)

주기적으로, 혹은 "DESIGN.md랑 실제 코드가 일치하는지 봐줘" 같은 요청이 오면:

- DESIGN.md 토큰과 `packages/web/**`에서 실제 등장하는 Tailwind 클래스를 비교
- 드리프트(예: DESIGN.md엔 `blue-500`인데 코드엔 `blue-400`이 섞여 있음) 발견 시 **고치지 말고 리포트만** 한다. 어느 쪽을 맞출지는 사용자가 결정한다.

---

## 문서 구조 (Google Stitch DESIGN.md 스펙 기반)

DESIGN.md는 **YAML frontmatter(머신 리더블 토큰) + Markdown 본문(사람과 AI가 모두 읽는 설명)** 의 조합이다.

### 섹션 순서 (필요 없는 섹션은 생략 가능, 단 순서는 유지)

1. **Overview** (또는 "Brand & Style") — 브랜드 성격, 타깃, UI가 줘야 할 감정
2. **Colors** — 팔레트 + 역할 + Hex/Tailwind 매핑
3. **Typography** — 타이포 레벨(headline/body/label 등)과 스타일 값
4. **Layout** (또는 "Layout & Spacing") — 그리드, 브레이크포인트, 간격 스케일
5. **Elevation & Depth** — 그림자 또는 평면 디자인의 위계 표현 방법
6. **Shapes** — 모서리 둥글기 규칙
7. **Components** — 공용 컴포넌트(버튼·칩·인풋 등)의 스타일 토큰
8. **Do's and Don'ts** — 실전 가드레일

### YAML Frontmatter 스키마 (필수 루트 필드는 `name`)

```yaml
---
version: alpha
name: <프로젝트 이름>
description: <한 줄 설명, 선택>
colors:
  <token-name>: '#RRGGBB'
typography:
  <token-name>:
    fontFamily: <string>
    fontSize: <Dimension, px|em|rem>
    fontWeight: <number>
    lineHeight: <Dimension | number>
    letterSpacing: <Dimension, 선택>
rounded:
  <scale-level>: <Dimension> # sm/md/lg/full 등
spacing:
  <scale-level>: <Dimension | number>
components:
  <component-name>:
    backgroundColor: '{colors.primary}' # 토큰 참조는 {중괄호} 안에 점 경로
    textColor: '{colors.neutral}'
    rounded: '{rounded.md}'
    padding: 12px
---
```

**토큰 참조 규칙**: `{path.to.token}` 중괄호로 감싸고, 대부분의 그룹에서는 프리미티브 값만 참조한다. `components` 내부에서는 복합 값(`{typography.body-md}`)도 허용된다.

**Dimension**: `px`, `em`, `rem` 단위만.

**컴포넌트 변형(variant)**: `button-primary`, `button-primary-hover`, `button-primary-active`처럼 하이픈으로 상태를 이어 붙여 별도 키로 정의한다.

### Markdown 본문 규칙

- 각 섹션은 `##` (h2)로 연다. 문서 상단에 `#` (h1) 제목을 둬도 되지만 섹션으로 파싱되지 않는다.
- **중복 `##` 헤딩 금지** — 파서가 거부한다(예: `## Colors` 두 번).
- 산문은 **왜** 이 색을/폰트를 쓰는지 맥락을 설명한다. 값 자체는 토큰이 정답이지만, 의도는 산문에만 담긴다.
- 프로젝트가 Tailwind/DaisyUI처럼 프레임워크 특화 매핑을 가진다면, 본문에 **표**로 "토큰 → Tailwind 클래스 → Hex" 매핑을 반복해 둔다. 중복이지만 AI가 훨씬 잘 쓴다.

상세 스펙과 전체 예시는 `references/spec.md`. Tailwind 프로젝트용 스타일 팁은 `references/example.md`.

---

## 이 프로젝트의 실제 적용

- **DESIGN.md 위치**: `/Users/dongkyl/git/non-tech-ui-poc-workshop/DESIGN.md` (프로젝트 루트, 고정)
- **주된 소비 패키지**: `packages/web/` (Nuxt 4 + TailwindCSS + DaisyUI 구성일 가능성이 높음 — Phase 1에서 실제 확인)
- **관련 문서**: `AGENTS.md`, `packages/web/AGENTS.md`가 이미 있다면 **중복을 만들지 말고** DESIGN.md에서 "구현·프로젝트 셋업은 AGENTS.md 참고"라고 한 줄 링크한다. DESIGN.md는 "토큰과 규칙"까지다.
- **트리거 대상이 아닌 패키지**: `packages/workshop/`, `packages/asset-generator/` — 이들은 별도 도메인이므로 이 스킬 범위 밖이다.

---

## 자주 빠지는 함정

- **"작은 색 하나만 바꾸는데 굳이?"** — 디자인 시스템은 작은 누수부터 무너진다. 토큰 변경이면 크기 무관하게 이 스킬을 돈다.
- **"사용자가 급해 보이니 코드부터 바꾸자"** — 그렇게 쌓이면 DESIGN.md가 유명무실해진다. "지금 이 순서로 진행할게요"라고 짧게 안내하고 절차를 지킨다.
- **YAML과 Markdown 본문 불일치** — 둘 다 바꿨는지 저장 직전 한 번 더 확인한다. 한쪽만 바뀐 상태는 가장 위험한 상태다.
- **컴포넌트 구현 코드 복붙** — DESIGN.md는 **토큰·규칙**까지다. 실제 `.vue` 코드는 `packages/web/app/components/**`에 둔다.
- **기존 값 삭제** — 값을 "변경"해 달라는 요청에 새 값을 추가만 하면 두 값이 공존한다. 이전 값을 명확히 제거한다.

---

## 참고 파일

| 파일                    | 언제 읽나                                                             |
| ----------------------- | --------------------------------------------------------------------- |
| `references/spec.md`    | Phase 1 시작 시, 또는 스키마·섹션 순서가 헷갈릴 때 — Stitch 공식 스펙 |
| `references/example.md` | Phase 1 시작 시 — Tailwind·다크모드 매핑 패턴이 필요할 때             |
