# Layout & Responsive Design Guidelines

**Note**: For complete design system including colors, typography, and components, refer to `design-system.md`

## Container Structure

```html
<div class="container mx-auto py-4 px-4 sm:py-10 sm:px-10"></div>
```

- Ensure content stays within the viewport to prevent horizontal scrolling

## Responsive Breakpoints

Follow Tailwind's responsive breakpoints:

- `sm`: 640px and above
- `md`: 768px and above (Mobile/Desktop boundary)
- `lg`: 1024px and above (Tablet/Desktop boundary)
- `xl`: 1280px and above

## Grid System

```html
<div class="grid grid-cols-1 md:grid-cols-3 gap-6"></div>
```

- Use a mobile-first approach with responsive variants

## Adaptive Components

**CSS 클래스로 간단한 반응형 처리:**

```html
<!-- Show/hide based on screen size -->
<div class="hidden md:block">Desktop only</div>
<div class="md:hidden">Mobile only</div>

<!-- Different layouts -->
<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3"></div>
```

**JavaScript 반응형 로직이 필요할 때 (`useDevice` composable):**

화면 크기에 따라 다른 데이터를 로드하거나, 컴포넌트를 조건부 렌더링해야 할 때는 `useDevice()` composable을 사용합니다.

```ts
// composables/useDevice.ts
export function useDevice() {
  const isMobile = useMediaQuery('(max-width: 767px)')
  const isTablet = useMediaQuery('(min-width: 768px) and (max-width: 1023px)')
  const isDesktop = useMediaQuery('(min-width: 1024px)')

  return { isMobile, isTablet, isDesktop }
}
```

```vue
<script setup lang="ts">
const { isMobile, isDesktop } = useDevice()
</script>

<template>
  <!-- 모바일: 간소한 카드 / 데스크탑: 상세 테이블 -->
  <MobileCardList
    v-if="isMobile"
    :items="items"
  />
  <DesktopTable
    v-else
    :items="items"
  />
</template>
```

**규칙:**

- 단순 show/hide → CSS `hidden md:block` 사용 (JS 불필요)
- 다른 컴포넌트 렌더링 / 다른 데이터 로딩 → `useDevice()` 사용
- `window.innerWidth` 직접 확인 금지 — 반드시 composable 사용

## Card Components

```html
<div class="card bg-base-100 dark:bg-base-100 shadow-lg border border-base-200 dark:border-base-200"></div>
```

- Apply consistent transitions: `transition-all duration-300 hover:bg-base-200/50 dark:hover:bg-base-200/30`

## Mobile Optimization

- Touch targets: minimum 44x44px
- Full-width CTAs on mobile
- Single column layout on small screens

## Animation & Transitions

- Keep transitions lightweight and performant
- Do not use scale animation on hover for non-interactive elements
- Use consistent timings: `duration-200`, `duration-300`
- Apply dark mode support: `transition-colors duration-200 hover:bg-base-200/50 dark:hover:bg-base-200/30`

## Dark Mode Layout

- **ALWAYS use TailwindCSS `dark:` directives** for dark mode styling
- **DO NOT use** `[data-theme="dark"]`, `.dark` class selectors, or `:global(.dark)` in CSS
- Prefer deep gray backgrounds (900-950) over pure black

## Design Foundations

- Tone & mood: minimal, low-contrast, generous whitespace; content-first typography
- Color system: neutral grayscale base; use 1-2 accent colors strictly for functional signals
- Typography: sans-serif, line-height ~1.6, clear hierarchy
- Grid & spacing: 8px scale; comfortable padding; 60-80 character line length
- Radius/border/shadow: subtle radius (6-8px), thin borders (1px), very light shadows
- Iconography: simple linear icons; color icons only for soft emphasis

## Interaction & Motion

### Timing

| 용도             | 시간       | 적용                           |
| ---------------- | ---------- | ------------------------------ |
| Hover/Focus 반응 | 120-200ms  | `duration-150`, `duration-200` |
| 패널 열기/닫기   | 200-300ms  | `duration-200`, `duration-300` |
| 페이지 전환      | 300ms 이하 | Nuxt page transition           |

### 규칙

- **Hover**: background lightens slightly, icons appear on hover
- **Focus**: 1-2px outline with subtle shadow — 키보드 접근성 필수
- **Easing**: `ease-out` 기본, `ease-in-out` for 열기/닫기
- **Transform**: `opacity`와 `transform`만 애니메이션 (layout 변경 금지)

### Do / Don't

- **Do**: 명확한 focus/state 시각 신호, 일관된 timing
- **Don't**: strong primary colors, thick borders, deep shadows, springy/bouncy animations, `scale` on non-interactive elements
