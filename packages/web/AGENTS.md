# AGENTS.md

## 서브 에이전트 부트스트랩

> **오케스트레이터 에이전트로부터 작업을 위임받으면 이 섹션을 가장 먼저 읽는다.**

당신은 UI PoC 워크숍 모노레포의 **Web 서브 에이전트**다. 작업 범위는 `packages/web/`으로 제한된다.

### 컨텍스트 설정

1. 현재 위치는 `packages/web/` — 모든 파일 경로와 셸 명령은 이 디렉토리 기준이다.
2. **Nuxt 4** + **TypeScript** + **Vue 3** 애플리케이션이다.
3. UI 컴포넌트 수정 전 루트 [DESIGN.md](../../DESIGN.md)와 [docs/design/](../../docs/design/)의 분할 문서를 반드시 읽는다.
4. 커밋 및 코드 스타일 규칙은 루트 [CONTRIBUTING.md](../../CONTRIBUTING.md)를 참조한다.

### 검증 (보고 전 실행)

```bash
npx nx build web     # 빌드 검증
```

### 제약 조건

- Vue 3 Composition API `<script setup lang="ts">` 사용.
- 디자인 시스템을 엄격히 준수 — 루트 [DESIGN.md](../../DESIGN.md) + [docs/design/](../../docs/design/) (layout, components, interaction).
- 다크 모드는 `dark:` 디렉티브만 사용. `[data-theme="dark"]` 또는 `:global(.dark)` 금지.
- 이 패키지에 MCP 서버 규칙을 적용하지 않는다.

---

## Project Overview

UI PoC 워크숍용 웹 프론트엔드. 비개발 직군이 AI 도구를 활용하여 만든 UI 프로토타입을 호스팅합니다.

### 기술 스택

- **프레임워크**: Nuxt 4 | **언어**: TypeScript
- **UI**: Vue 3, TailwindCSS + DaisyUI 5
- **상태 관리**: Pinia
- **패키지 매니저**: pnpm (workspace)

## 문서

- **디자인 시스템 & 토큰**: 루트 [DESIGN.md](../../DESIGN.md) — 색상/타이포/간격/Do·Don't.
- **디자인 구현 패턴**: [../../docs/design/layout.md](../../docs/design/layout.md), [components.md](../../docs/design/components.md), [interaction.md](../../docs/design/interaction.md).
- **프로젝트·코드 규칙**: `docs/` (project, composables, store).
- **ADR**: `docs/adr/`

## 빠른 시작

```bash
npx nx dev web          # 개발 서버 (localhost:3000)
npx nx build web        # 프로덕션 빌드
npx nx generate web     # 정적 사이트 생성
npx nx preview web      # 프로덕션 빌드 미리보기
```

## 프로젝트 구조

```
packages/web/
├── app/
│   └── app.vue              # 루트 컴포넌트
├── docs/                    # 프로젝트·코드 규칙 (디자인은 루트 DESIGN.md + docs/design/)
│   ├── project.md           # 프로젝트 가이드라인
│   ├── composables.md       # Composables 가이드
│   └── store.md             # Pinia 스토어 가이드
├── public/                  # 정적 파일
├── nuxt.config.ts           # Nuxt 설정
├── package.json
├── project.json             # Nx 타겟 정의
└── tsconfig.json
```

## DaisyUI Usage Rules

DaisyUI 5는 **레이아웃/구조용 클래스만 사용**한다. Form 컴포넌트는 사용하지 않는다.

### 사용 금지 (순수 Tailwind로 대체)

| 금지 클래스                        | 증상                                   | 대체 방법                                           |
| ---------------------------------- | -------------------------------------- | --------------------------------------------------- |
| `btn`, `btn-primary`, `btn-ghost`  | 검정 박스 렌더링, 텍스트 색상 override | 순수 Tailwind `<button>` — 아래 패턴 참조           |
| `select`, `select-bordered`        | 이중 박스 생성                         | 순수 Tailwind `<select>`                            |
| `modal`, `modal-box`, `modal-open` | v5에서 스타일 미렌더링                 | `<Teleport to="body">` + 순수 Tailwind              |
| `toggle`, `checkbox`               | 네모 박스로 렌더링                     | `<input type="checkbox"> + accent-*` 또는 커스텀 UI |
| `input-bordered`                   | 이중 border                            | `border border-base-300`                            |

**왜 금지인가**: DaisyUI 5는 `button { color: oklch(...) }` element-level 스타일을 전역 주입한다. CSS specificity 규칙상 element selector(0,0,1)는 Tailwind class selector(0,1,0)보다 낮지만, DaisyUI가 Tailwind보다 나중에 로드되므로 cascading 순서에서 `text-white` 등 Tailwind 색상 클래스를 덮어쓴다. 어두운 배경 버튼에서 텍스트가 보이지 않는 현상으로 나타난다.

**어쩔 수 없이 `<button>` 태그에 DaisyUI가 간섭할 경우**: scoped CSS + `!important` 사용

```css
<style scoped>
.my-btn-active {
  background-color: #171717 !important;
  color: #ffffff !important;
}
</style>
```

### 사용 가능 (레이아웃/구조)

`card`, `card-body`, `card-title`, `badge`, `avatar`, `drawer`, `navbar`, `hero`, `divider`

---

## Page Layout Rules

페이지 타입에 따라 레이아웃을 반드시 명시해야 한다.

| 페이지 타입       | 설정                                | 이유                                          |
| ----------------- | ----------------------------------- | --------------------------------------------- |
| 온보딩 위자드     | `definePageMeta({ layout: false })` | 전체화면 필요, default.vue 레이아웃 상속 차단 |
| 랜딩 페이지       | `definePageMeta({ layout: false })` | 전체화면 필요                                 |
| 로그인 / 회원가입 | `definePageMeta({ layout: false })` | 전체화면 필요                                 |
| 일반 대시보드     | 설정 불필요                         | default.vue 상속                              |

```typescript
// 전체화면 페이지 — 반드시 추가
definePageMeta({ layout: false })
```

---

## Common Mistakes to Avoid

- **DaisyUI form 컴포넌트 사용** (`btn`, `select`, `modal`, `toggle`) → 스타일 미렌더링 또는 색상 override 발생
- **`bg-clip-text text-transparent` 단독 사용** → 브라우저 호환 실패. `<style scoped>` 내 `-webkit-background-clip: text; -webkit-text-fill-color: transparent` 직접 작성
- **`layout: false` 누락** → 전체화면 페이지에 default.vue 네비게이션이 붙음
- **absolute 포지셔닝 요소의 부모에 `relative` 누락** → 배지, 아이콘, 툴팁이 의도치 않은 위치에 렌더링
- **flex 컨테이너 안 `<input>`에 `min-w-0` 누락** → input이 부모 폭 초과 (`flex-1 min-w-0` 세트로 적용)
- **SVG `fill="#..."` 하드코딩** → 다크 모드 대응 불가. `class="fill-gray-900 dark:fill-white"` 사용
- **하드코딩 색상 (`bg-blue-500`)에 `dark:` variant 누락** → 다크 모드 dead zone 발생
- **이모지 아이콘 사용** → 폰트 미로드 시 네모박스(豆腐) 현상. 그라데이션 div + SVG 아이콘으로 대체
- **2px 이하 장식 요소** (`h-0.5`, `w-0.5`) → 브라우저에서 보이지 않음. `h-1` / `w-1` 이상 사용
- **`input-bordered`** → 이중 border 발생
- **비 상호작용 요소에 hover 효과**
- **같은 화면에 여러 accent 색상 / heavy shadow / springy animation**
- **다크 모드에서 pure black 배경** (deep gray 사용)

---

## 주의가 필요한 파일

`nuxt.config.ts`, 환경 변수 참조.

**HMR 캐시 깨짐 시**: 파일 수정이 브라우저에 반영되지 않으면 `.nuxt` 디렉토리 삭제 후 dev 서버 재시작

```bash
rm -rf .nuxt && npx nx dev web
```

## 문서 유지보수

- 신규/주요 기능 추가 시 ADR 작성 필수 → `docs/adr/`에 생성 또는 업데이트
- 주요 기능 추가 시 `docs/*.md` 업데이트
- 주요 기능 추가 또는 프로젝트 구조 변경 시 이 AGENTS.md 업데이트
