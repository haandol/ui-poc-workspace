# Layout & Spacing

[← DESIGN.md](../../DESIGN.md)로 돌아가기

컨테이너, 그리드, 브레이크포인트, 스페이싱 스케일, 반응형 패턴. 모든 토큰은 `DESIGN.md`의 YAML frontmatter가 정답.

## Page Layout Selection

페이지 타입에 따라 적절한 레이아웃을 선택해야 한다. **누락 시 `default.vue`의 네비게이션/레이아웃이 모든 페이지에 렌더링된다.**

```ts
// 전체화면 페이지 (온보딩, 랜딩, 로그인, 마케팅)
definePageMeta({ layout: false })

// 일반 대시보드 페이지 — 설정 불필요 (default.vue 자동 상속)
```

| 페이지 타입       | layout 설정     |
| ----------------- | --------------- |
| 온보딩 위자드     | `layout: false` |
| 랜딩 / 마케팅     | `layout: false` |
| 로그인 / 회원가입 | `layout: false` |
| 일반 대시보드     | 불필요          |
| CRUD / 목록       | 불필요          |

## 컨테이너

```html
<div class="container mx-auto py-4 px-4 sm:py-10 sm:px-10">...</div>
```

- 가로 스크롤 방지를 위해 콘텐츠가 뷰포트 안에 유지되도록 한다.
- 모바일 `px-4`(16px) → 데스크톱 `sm:px-10`(40px)가 기본 패턴. 더 좁히려면 `lg:px-8`까지.

## Spacing Scale (8px 기본)

| Token | Tailwind | px  | 용도                       |
| ----- | -------- | --- | -------------------------- |
| xs    | `p-1`    | 4   | 미세 조정                  |
| sm    | `p-2`    | 8   | 인라인 요소 간             |
| md    | `p-4`    | 16  | 컴포넌트 내부 패딩         |
| lg    | `p-6`    | 24  | 카드 내부 패딩             |
| xl    | `p-8`    | 32  | 섹션 내부 패딩             |
| 2xl   | `py-12`  | 48  | 섹션 상하 여백 (기본)      |
| 3xl   | `py-20`  | 80  | 히어로/중요 섹션 상하 여백 |

**공통 패턴:**

- 컴포넌트 패딩: `p-4` ~ `p-6`
- 섹션 패딩: `py-12` ~ `py-20`
- 요소 간 간격: `gap-4` ~ `gap-6`
- 컨테이너 좌우 패딩: `px-4 sm:px-6 lg:px-8`

## Spacing Minimums (다닥다닥 방지)

Form과 리스트 UI에서 반복 발생하는 좁은 간격 문제를 막기 위한 **절대 하한**.

| 요소                 | 최솟값      | 쓰지 말 것       |
| -------------------- | ----------- | ---------------- |
| form 필드 사이       | `space-y-5` | `space-y-4` 이하 |
| label ↔ input        | `space-y-2` | —                |
| input 내부 좌우 패딩 | `px-4`      | `px-3`           |
| input 높이           | `h-11`      | `h-9`, `h-10`    |
| 리스트/옵션 항목 gap | `gap-4`     | `gap-2`          |
| 옵션 카드 내부 패딩  | `px-4 py-3` | —                |
| 카드 헤더 상단 패딩  | `pt-8`      | —                |

> `pt-*` 클래스가 HMR 캐시로 인해 즉시 반영 안 될 경우 `style="padding-top: 2.5rem"` 인라인으로 고정하고 빌드 후 확인.

## Breakpoints (Tailwind 기본)

| BP   | Min width | 의미               |
| ---- | --------- | ------------------ |
| `sm` | 640px     | 큰 모바일          |
| `md` | 768px     | 모바일/태블릿 경계 |
| `lg` | 1024px    | 데스크톱           |
| `xl` | 1280px    | 와이드             |

- **모바일 우선** — 기본 클래스는 모바일, `md:`/`lg:` 프리픽스로 확장.
- **터치 타겟 최소** — 44×44px (`h-11`, `w-11` 이상).
- **모바일 CTA** — 기본 `w-full`.

## Grid System

```html
<!-- 1 → 2 → 3열 -->
<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">...</div>

<!-- 2열 콘텐츠 (hero, detail) -->
<div class="grid lg:grid-cols-2 gap-12 items-center">...</div>
```

## 적응형 표시/숨김

```html
<div class="hidden md:block">데스크톱 전용</div>
<div class="md:hidden">모바일 전용</div>
```

단순 표시/숨김은 CSS 클래스로. `v-if`로 화면 크기를 분기하지 않는다(SSR·하이드레이션 이슈).

## Absolute Positioning Checklist

`absolute` 포지셔닝 요소를 사용할 때 **부모에 반드시 `relative`를 추가**해야 한다. 누락 시 배지·아이콘·툴팁이 viewport 기준으로 떠다닌다.

```html
<div class="relative">
  <!-- 카드 콘텐츠 -->
  <span class="absolute top-3 left-3 ...">Badge</span>
  <button class="absolute bottom-3 right-3 ...">♡</button>
</div>
```

**배지/아이콘 위치 충돌 방지** — 같은 카드 위에 배지와 아이콘이 겹치면 대각선 분리:

- 배지(New, Sale, 품절): 좌상단 `top-3 left-3`
- 하트/찜 버튼: 우상단 `top-3 right-3` 또는 우하단 `bottom-3 right-3`

## Flex Input Overflow

`<input>`은 기본적으로 `min-width: auto`를 가진다. flex 컨테이너 안에 두면 부모 폭을 초과한다.

```html
<div class="flex gap-2">
  <input class="flex-1 min-w-0 h-11 px-4 ..." />
  <button class="shrink-0 px-4 ...">Search</button>
</div>
```

## Step Wizard / Multi-step Form

스텝 전환 시 레이아웃 점프 방지를 위해 `<Transition mode="out-in">` 필수.

```html
<Transition name="slide" mode="out-in">
  <div :key="currentStep">
    <!-- 현재 스텝 콘텐츠 -->
  </div>
</Transition>
```

- 스텝 간 공유 상태는 composable로 분리 → `app/composables/`.
- 폼 영역 높이 고정: `min-h-72` 등으로 스텝마다 카드 높이 변동 방지.
- 세로 연결선은 `absolute` positioned div 사용 (flex로 구현 시 스텝 높이 변경에 취약).
