---
version: alpha
name: UI PoC Workshop Web
description: AI agents should read this file first for all UI work in packages/web.
colors:
  gray-50: '#f9fafb'
  gray-100: '#f3f4f6'
  gray-200: '#e5e7eb'
  gray-300: '#d1d5db'
  gray-400: '#9ca3af'
  gray-500: '#6b7280'
  gray-600: '#4b5563'
  gray-700: '#374151'
  gray-800: '#1f2937'
  gray-900: '#111827'
  gray-950: '#030712'
  indigo-500: '#6366f1'
  violet-500: '#8b5cf6'
  violet-400: '#a78bfa'
  purple-500: '#a855f7'
  blue-500: '#3b82f6'
  blue-600: '#2563eb'
  info: '#2563eb'
  success: '#16a34a'
  warning: '#ea580c'
  error: '#dc2626'
typography:
  h1:
    fontFamily: Inter
    fontSize: 36px
    fontWeight: 700
    lineHeight: 1.1
  h1-desktop:
    fontFamily: Inter
    fontSize: 60px
    fontWeight: 700
    lineHeight: 1.1
  h2:
    fontFamily: Inter
    fontSize: 24px
    fontWeight: 700
    lineHeight: 1.2
  h3:
    fontFamily: Inter
    fontSize: 20px
    fontWeight: 600
    lineHeight: 1.3
  body-lg:
    fontFamily: Inter
    fontSize: 18px
    fontWeight: 400
    lineHeight: 1.625
  body-md:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: 400
    lineHeight: 1.625
  body-sm:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: 400
    lineHeight: 1.5
  caption:
    fontFamily: Inter
    fontSize: 12px
    fontWeight: 400
    lineHeight: 1.4
rounded:
  sm: 4px
  md: 8px
  lg: 12px
  xl: 16px
  full: 9999px
spacing:
  xs: 4px
  sm: 8px
  md: 16px
  lg: 24px
  xl: 32px
  '2xl': 48px
  '3xl': 64px
  '4xl': 80px
components:
  button-primary:
    backgroundColor: '{colors.gray-900}'
    textColor: '#ffffff'
    rounded: '{rounded.md}'
    padding: 10px 16px
  button-primary-dark:
    backgroundColor: '#ffffff'
    textColor: '{colors.gray-900}'
  button-gradient:
    backgroundColor: 'linear-gradient(135deg, {colors.indigo-500} 0%, {colors.violet-500} 50%, {colors.violet-400} 100%)'
    textColor: '#ffffff'
    rounded: '{rounded.lg}'
    padding: 12px 24px
  button-secondary:
    backgroundColor: '#ffffff'
    textColor: '{colors.gray-800}'
    rounded: '{rounded.md}'
    padding: 10px 16px
  button-ghost:
    backgroundColor: transparent
    textColor: '{colors.gray-600}'
    rounded: '{rounded.md}'
  button-danger:
    backgroundColor: '{colors.error}'
    textColor: '#ffffff'
    rounded: '{rounded.md}'
  card:
    backgroundColor: '#ffffff'
    rounded: '{rounded.lg}'
    padding: 16px
  input:
    backgroundColor: '#ffffff'
    textColor: '{colors.gray-900}'
    rounded: '{rounded.md}'
    height: 44px
    padding: 0 16px
---

# DESIGN.md

Machine-readable design tokens for the UI PoC Workshop web app. AI agents should read this file first for all UI work in `packages/web`.

이 문서는 **토큰·규칙·Do/Don't**까지 담는다. 섹션이 커지는 부분은 별도 문서로 분리했다:

- [Layout & Spacing](./docs/design/layout.md) — 컨테이너, 그리드, 브레이크포인트, 스페이싱, 반응형 패턴
- [Component Patterns](./docs/design/components.md) — 버튼·카드·인풋·모달·배지·차트·플레이스홀더·그라데이션 텍스트, DaisyUI 금지 규칙
- [Interaction & Accessibility](./docs/design/interaction.md) — 호버·포커스·모션·다크 모드·a11y·CSS 변수

구현 상세(컴포저블, 스토어, 라우팅)는 [packages/web/AGENTS.md](./packages/web/AGENTS.md)와 `packages/web/docs/`.

## Metadata

- **App**: UI PoC Workshop — 비개발 직군의 AI 도구 활용 UI 프로토타입 호스팅 웹앱
- **Stack**: Nuxt 4 (TypeScript, Vue 3 Composition API) + TailwindCSS 4 + DaisyUI 5 (`light --default, dark --prefersdark`)
- **Icons**: Heroicons (`@iconify-json/heroicons`) + inline SVG | **Font**: Inter + Noto Sans KR (Google Fonts)
- **State**: Pinia | **Charts**: chart.js + vue-chartjs | **Build**: Nx + pnpm workspace

## Overview

이 앱은 워크숍 참가자가 만든 여러 UI 프로토타입을 **담백하게 담아 보여주는 캔버스**다. 프로토타입 자체가 시선을 받아야 하므로, 앱의 크롬(네비게이션·카드 프레임·여백)은 의식되지 않을 만큼 절제되어야 한다.

- **톤**: 전문적·정돈됨. 장난기나 과장된 장식 금지.
- **밀도**: 느슨하게(generous whitespace). 콘텐츠가 숨 쉴 공간을 우선.
- **라이트/다크 동등 지원**: 둘 다 1급 시민. 다크는 "반전"이 아니라 별도 팔레트로 설계.
- **모바일 우선**: 참가자가 노트북·태블릿·폰 어디서나 프로토타입을 훑을 수 있어야 한다.

## Colors

### Neutral Palette (기본 팔레트)

| Role           | Light (Tailwind) | Dark (Tailwind) | Hex (Light / Dark)    |
| -------------- | ---------------- | --------------- | --------------------- |
| Background     | `gray-50`        | `gray-900`      | `#f9fafb` / `#111827` |
| Surface        | `white`          | `gray-800`      | `#ffffff` / `#1f2937` |
| Text Primary   | `gray-900`       | `white`         | `#111827` / `#ffffff` |
| Text Secondary | `gray-600`       | `gray-300`      | `#4b5563` / `#d1d5db` |
| Text Muted     | `gray-500`       | `gray-400`      | `#6b7280` / `#9ca3af` |
| Border         | `gray-200`       | `gray-700`      | `#e5e7eb` / `#374151` |
| Border Strong  | `gray-300`       | `gray-600`      | `#d1d5db` / `#4b5563` |

- **다크모드 배경은 pure black(`#000`) 금지** — `gray-900`/`gray-950`까지.
- **다크모드 텍스트는 pure white(`#fff`) 지양** — `gray-100`/`gray-200`이 기본. (H1/H2 헤딩에는 `white` 허용)

### Brand Gradient

이 앱의 포인트 컬러는 **인디고-바이올렛 그라데이션** 하나뿐이다. 화면당 1개 원칙.
실사용 위치에 따라 두 가지 변형이 있다.

#### 1. Decorative (2-stop) — 로고·텍스트 하이라이트·블러 배경

Tailwind 인라인 클래스. 방향은 쓰임에 따라 `-r` 또는 `-br`.

| 용도              | Classes                                                                       |
| ----------------- | ----------------------------------------------------------------------------- |
| 로고 사각형       | `bg-gradient-to-br from-indigo-500 to-purple-500`                             |
| 텍스트 하이라이트 | `bg-gradient-to-r from-indigo-500 to-purple-500`                              |
| Hero 블러 배경    | `from-indigo-100 to-purple-100 dark:from-indigo-900/20 dark:to-purple-900/20` |

Hex: `#6366f1 → #a855f7` (indigo-500 → purple-500).

#### 2. Filled CTA (3-stop, 135°) — `.btn-gradient` 유틸리티

주요 행동 유도 버튼은 `main.css`에 정의된 `.btn-gradient` 컴포넌트 클래스를 사용한다. 인라인 Tailwind 그라데이션으로 대체하지 않는다.

| State    | Background                                                       | Extra                                               |
| -------- | ---------------------------------------------------------------- | --------------------------------------------------- |
| Default  | `linear-gradient(135deg, #6366f1 0%, #8b5cf6 50%, #a78bfa 100%)` | `shadow-sm`                                         |
| Hover    | `linear-gradient(135deg, #4f46e5 0%, #7c3aed 50%, #8b5cf6 100%)` | `shadow-lg` (`rgba(99,102,241,0.3)`), `scale(1.02)` |
| Active   | —                                                                | `scale(0.98)`                                       |
| Disabled | `linear-gradient(to right, #9ca3af, #6b7280)`                    | `opacity-50`, 트랜스폼·그림자 해제                  |

기본 형상: `padding: 0.75rem 1.5rem`, `rounded-xl` (12px), `font-weight: 600`, `color: white`, `gap: 0.5rem`.

> 💡 **왜 Tailwind 인라인이 아닌 `.btn-gradient`인가**: 3-stop 그라데이션·호버 시 `scale` + `shadow` 전이·disabled 상태까지 한 번에 정의되어 있어, 인라인으로 흩어 놓으면 버튼마다 값이 미묘하게 달라진다. 유틸리티 하나로 모은다.

사용 예는 `app.vue`의 Get Started / Start Building 버튼 참조.

### Semantic Colors

| Token   | Light        | Dark         | 용도                           |
| ------- | ------------ | ------------ | ------------------------------ |
| Info    | `blue-600`   | `blue-300`   | 중립 안내, 링크                |
| Success | `green-600`  | `green-300`  | 저장 완료, 성공 배지           |
| Warning | `orange-600` | `orange-300` | 주의, 되돌릴 수 있는 경고      |
| Error   | `red-600`    | `red-300`    | 삭제, 유효성 오류, 파괴적 액션 |

### Color Rules

- **색상 최소화** — 중성 그레이스케일 우선. 한 화면 안에서 여러 accent를 섞지 않는다.
- **기능적 색상만** — 장식용 색 금지. 의미 전달 또는 행동 유도 목적에만 사용.
- **모든 색은 다크 모드 짝(`dark:…`)을 가져야 한다** — 누락은 다크모드 dead zone을 만든다.
- **SVG `fill="#..."` 하드코딩 금지** — `fill="currentColor"` 또는 `class="fill-gray-900 dark:fill-white"`.

## Typography

**Font Stack** (`main.css` `@theme --font-sans`):

```
'Inter', 'Noto Sans KR', 'Malgun Gothic', '맑은 고딕', ui-sans-serif, system-ui, sans-serif
```

Google Fonts에서 `Inter` (400/500/600/700)와 `Noto Sans KR` (400/500/600/700)을 `nuxt.config.ts`에서 로드한다. 한국어 본문 가독성을 위해 Noto Sans KR이 Inter 바로 뒤에 자리한다.

### Typography Scale

| Token      | Size    | Tailwind               | Weight          | Color (light / dark)    |
| ---------- | ------- | ---------------------- | --------------- | ----------------------- |
| Display H1 | 36–60px | `text-4xl lg:text-6xl` | `font-bold`     | `gray-900` / `white`    |
| H2         | 24–30px | `text-2xl lg:text-3xl` | `font-bold`     | `gray-900` / `white`    |
| H3         | 20–24px | `text-xl lg:text-2xl`  | `font-semibold` | `gray-800` / `gray-100` |
| Body Lg    | 18px    | `text-lg`              | `font-normal`   | `gray-600` / `gray-300` |
| Body       | 16px    | `text-base`            | `font-normal`   | `gray-600` / `gray-300` |
| Body Sm    | 14px    | `text-sm`              | `font-normal`   | `gray-500` / `gray-400` |
| Caption    | 12px    | `text-xs`              | `font-normal`   | `gray-500` / `gray-400` |

- **본문 line-height**: `leading-relaxed` (1.625).
- **유동 헤딩**: `font-size: clamp(1.5rem, 2vw + 1rem, 2.25rem)` 권장.
- **그라데이션 텍스트**: `bg-gradient-to-r from-indigo-500 to-purple-500 bg-clip-text text-transparent`. 구형 Safari/Chrome에서 렌더링 문제를 겪으면 `<style scoped>` 안에서 `-webkit-background-clip: text; -webkit-text-fill-color: transparent;`를 함께 쓴다. 상세는 [components.md — Gradient Text](./docs/design/components.md#gradient-text).

## Shapes

| Token  | Tailwind       | px  | 용도                     |
| ------ | -------------- | --- | ------------------------ |
| `sm`   | `rounded`      | 4   | 배지, 작은 태그          |
| `md`   | `rounded-lg`   | 8   | 카드, 버튼, input        |
| `lg`   | `rounded-xl`   | 12  | `.btn-gradient`, 큰 패널 |
| `xl`   | `rounded-2xl`  | 16  | 모달, 히어로 블러 영역   |
| `full` | `rounded-full` | ∞   | 아바타, pill 버튼        |

- **테두리 1px 기본**. 2px 이상은 예외적으로만.
- **같은 화면에 rounded와 sharp를 섞지 않는다**.

## Elevation & Depth

최소 그림자 접근. 다크모드에서는 더 줄인다.

| Level | Tailwind    | 용도                        |
| ----- | ----------- | --------------------------- |
| 1     | `shadow-sm` | 카드 기본 (은은한 부양)     |
| 2     | `shadow-md` | 카드 호버 상태              |
| 3     | `shadow-lg` | 모달, 드롭다운, 플로팅 패널 |
| 4     | `shadow-xl` | `.btn-gradient` 호버 전용   |

- **경계선과 그림자를 동시에 두껍게 쓰지 않는다** — 둘 중 하나만으로 위계를 만든다.
- **다크 모드 heavy shadow 금지** — `dark:shadow-none` 또는 `dark:shadow-sm`까지.

## TailwindCSS v4 Migration

프로젝트는 **Tailwind v4**다. v3 문법을 쓰지 않도록 주의.

| Deprecated (v3)             | Use (v4)                   |
| --------------------------- | -------------------------- |
| `bg-opacity-{n}`            | `bg-{color}/{n}`           |
| `text-opacity-{n}`          | `text-{color}/{n}`         |
| `border-opacity-{n}`        | `border-{color}/{n}`       |
| `placeholder-{color}`       | `placeholder:text-{color}` |
| `flex-grow` / `flex-shrink` | `grow` / `shrink`          |
| `overflow-ellipsis`         | `text-ellipsis`            |

> `bg-gradient-to-{dir}`는 v4에서도 여전히 동작하며 실제 코드(`app.vue`)에서 사용 중이다. 유지해도 무방.

## Do / Don't

**Do**: 인디고-보라 그라데이션은 주요 CTA와 포인트 강조에만 · 넉넉한 여백 · 기능적 색상만 · 라이트/다크 양쪽 확인 · 시맨틱 HTML · 모바일 우선 · 미묘한 애니메이션(120–200ms) · 표준 Tailwind 클래스(`min-h-9` 선호, `min-h-[2.25rem]` 지양) · 터치 타겟 44px 이상 · 주요 액션은 `.btn-gradient` 재사용

**Don't**: 한 화면에 여러 accent · 두꺼운 테두리(>2px)나 heavy shadow · 바운스/스프링 애니메이션 · `[data-theme="dark"]` · DaisyUI form 컴포넌트(`btn`, `select`, `modal`, `toggle`, `checkbox`) · `input-bordered` · SVG `fill="#..."` 하드코딩 · 이모지 아이콘 · 2px 이하 장식 요소(`h-0.5`) · 비 상호작용 요소에 호버 · 다크 모드 pure black 배경 · 색상만으로 정보 전달 · `.btn-gradient` 인라인 복제(유틸리티 재사용)
