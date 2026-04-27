# Component Patterns

[← DESIGN.md](../../DESIGN.md)로 돌아가기

버튼·카드·인풋·모달·배지·차트·플레이스홀더 구현 패턴. **DaisyUI 5는 레이아웃/구조용 클래스만 사용**한다. form 컴포넌트는 전면 금지다.

## DaisyUI Usage Rules

### 사용 금지 (순수 Tailwind로 대체)

| 금지 클래스                        | 증상                            | 대체                                               |
| ---------------------------------- | ------------------------------- | -------------------------------------------------- |
| `btn`, `btn-primary`, `btn-ghost`  | 검정 박스, 텍스트 색상 override | 순수 Tailwind `<button>` (아래 Buttons)            |
| `select`, `select-bordered`        | 이중 박스                       | 순수 Tailwind `<select>`                           |
| `input-bordered`                   | 이중 border                     | `border border-gray-200 dark:border-gray-600`      |
| `modal`, `modal-box`, `modal-open` | v5에서 스타일 미렌더링          | `<Teleport to="body">` + 순수 Tailwind             |
| `toggle`, `checkbox`               | 네모 박스로 렌더링              | `<input type="checkbox"> + sr-only peer` 커스텀 UI |

**왜 금지인가**: DaisyUI 5는 `button { color: oklch(...) }` element-level 스타일을 전역 주입한다. cascade 순서상 DaisyUI가 Tailwind 뒤에 로드되므로 `text-white` 등이 덮힌다. 어두운 배경 버튼에서 텍스트가 안 보이는 현상으로 나타난다.

**어쩔 수 없이 `<button>`에 DaisyUI가 간섭하면**: scoped CSS + `!important`.

```vue
<style scoped>
.my-btn-active {
  background-color: #171717 !important;
  color: #ffffff !important;
}
</style>
```

### 사용 가능 (레이아웃/구조)

`card`, `card-body`, `card-title`, `badge`, `avatar`, `drawer`, `navbar`, `hero`, `divider`.

---

## Buttons

### Primary (Filled, 기본)

```html
<button
  class="px-4 py-2.5 bg-gray-900 dark:bg-white text-white dark:text-gray-900 rounded-lg font-medium hover:bg-gray-700 dark:hover:bg-gray-100 transition-colors duration-200"
>
  Primary Action
</button>
```

### Primary (Gradient CTA) — `.btn-gradient` 유틸리티

주요 액션은 `main.css`에 정의된 `.btn-gradient`를 사용한다. 인라인 Tailwind 그라데이션으로 복제하지 않는다.

```html
<button class="btn-gradient">Get Started</button> <button class="btn-gradient text-lg px-8 py-4">Start Building</button>
```

- 기본 padding, rounded, shadow, hover 시 `scale(1.02)` + shadow 전이, active `scale(0.98)`, disabled 그레이 그라데이션이 모두 포함되어 있다.
- 크기 조정이 필요하면 `text-lg px-8 py-4` 같은 유틸리티로 덧쓴다.

Hex 값과 상태별 그라데이션은 [DESIGN.md — Brand Gradient](../../DESIGN.md#brand-gradient).

### Secondary (Outline)

```html
<button
  class="px-4 py-2.5 bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 rounded-lg font-medium border border-gray-200 dark:border-gray-600 hover:border-gray-300 dark:hover:border-gray-500 transition-colors duration-200"
>
  Secondary Action
</button>
```

### Ghost (Cancel)

```html
<button
  class="px-4 py-2.5 text-gray-600 dark:text-gray-400 rounded-lg font-medium hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200"
>
  Cancel
</button>
```

### Danger

```html
<button
  class="px-4 py-2.5 bg-red-600 text-white rounded-lg font-medium hover:bg-red-700 transition-colors duration-200"
>
  Delete
</button>
```

### 공통 규칙

- **상태**: Default → Hover → Active (`active:scale-95`) → Disabled (`opacity-50 cursor-not-allowed pointer-events-none`)
- **크기**:
  - Small `px-3 py-1.5 text-sm`
  - Medium `px-4 py-2.5 text-sm` (기본)
  - Large `px-6 py-3 text-base`
  - Full `w-full`
- 공통 트랜지션: `transition-colors duration-200`

---

## Cards

```html
<div class="card bg-base-100 dark:bg-base-100 shadow-sm border border-base-200 dark:border-base-200 rounded-lg">
  <div class="card-body p-4 md:p-6">
    <h3 class="card-title text-lg font-semibold">제목</h3>
    <p class="text-gray-600 dark:text-gray-300">내용</p>
  </div>
</div>
```

인터랙티브 호버: `hover:bg-base-200/50 dark:hover:bg-base-200/30 transition-colors duration-200`.

---

## Form Inputs

### Text Input

```html
<input
  type="text"
  class="w-full h-11 px-4 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:border-blue-500 dark:focus:border-blue-400 transition-colors duration-200"
  placeholder="Enter text"
/>
```

### Select

```html
<select
  class="h-11 px-4 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white focus:outline-none focus:border-blue-500 dark:focus:border-blue-400 transition-colors duration-200"
>
  <option>Option 1</option>
</select>
```

### Flex 컨테이너 안 Input

`min-w-0` 필수 (기본 `min-width: auto`로 flex 컨테이너 넘침):

```html
<div class="flex gap-2">
  <input class="flex-1 min-w-0 h-11 px-4 ..." />
  <button class="shrink-0 ...">검색</button>
</div>
```

### Checkbox / Radio — 커스텀 UI

DaisyUI `toggle`, `checkbox` 금지. `<input type="checkbox"> + sr-only + peer`.

```html
<label class="flex items-center gap-3 cursor-pointer">
  <input type="checkbox" class="sr-only peer" />
  <div
    class="w-5 h-5 rounded border-2 border-gray-300 dark:border-gray-600 peer-checked:bg-gray-900 dark:peer-checked:bg-white peer-checked:border-gray-900 dark:peer-checked:border-white transition-colors"
  >
    <!-- check SVG -->
  </div>
  <span class="text-sm text-gray-700 dark:text-gray-300">Label</span>
</label>
```

### 공통 규칙

- **`input-bordered` 금지** — 이중 border.
- **입력 높이 `h-11` 이상** — 44px 터치 타겟.
- **좌우 패딩 `px-4` 이상**.
- **포커스 색**: 파랑/보라 계열만. 초록 포커스 금지(시맨틱 혼동).

---

## Modals

DaisyUI `modal`, `modal-box`, `modal-open` 금지. **Teleport + Transition** 패턴.

```html
<Teleport to="body">
  <Transition name="modal">
    <div v-if="isOpen" class="fixed inset-0 z-50 flex items-center justify-center p-4">
      <!-- Backdrop -->
      <div class="absolute inset-0 bg-black/50 backdrop-blur-sm" @click="close" />
      <!-- Box -->
      <div class="relative w-full max-w-lg bg-white dark:bg-gray-800 rounded-xl shadow-xl z-10">
        <!-- Header -->
        <div class="flex items-center justify-between px-6 py-4 border-b border-gray-200 dark:border-gray-700">
          <h3 class="text-lg font-semibold text-gray-900 dark:text-white">Title</h3>
          <button
            @click="close"
            class="p-1 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 rounded transition-colors"
          >
            ✕
          </button>
        </div>
        <!-- Body -->
        <div class="px-6 py-5">Content</div>
        <!-- Footer -->
        <div class="flex justify-end gap-3 px-6 py-4 bg-gray-50 dark:bg-gray-900/50 rounded-b-xl">
          <button @click="close" class="px-4 py-2 text-gray-600 dark:text-gray-400 ...">Cancel</button>
          <button class="px-4 py-2 bg-gray-900 dark:bg-white text-white dark:text-gray-900 ...">Confirm</button>
        </div>
      </div>
    </div>
  </Transition>
</Teleport>
```

```vue
<style scoped>
.modal-enter-active,
.modal-leave-active {
  transition: all 0.2s ease;
}
.modal-enter-from,
.modal-leave-to {
  opacity: 0;
  transform: translateY(8px);
}
</style>
```

---

## Badges

```html
<span class="badge bg-accent/10 dark:bg-accent/20 text-accent dark:text-accent">배지</span>
```

DaisyUI `badge`는 레이아웃 요소로 사용 가능. 색은 커스텀 토큰으로 덮어쓴다.

---

## Gradient Text

실제 코드(`app.vue`)는 Tailwind 단독 패턴을 사용한다:

```html
<span class="bg-gradient-to-r from-indigo-500 to-purple-500 bg-clip-text text-transparent"> idea </span>
```

구형 Safari/Chrome에서 렌더링이 실패하는 경우에만 scoped CSS로 폴백한다:

```html
<span class="gradient-text">그라데이션 텍스트</span>
```

```vue
<style scoped>
.gradient-text {
  background: linear-gradient(135deg, #6366f1 0%, #a855f7 100%);
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}
</style>
```

- 색상 Hex는 `indigo-500 → purple-500` (`#6366f1 → #a855f7`)을 기본값으로 맞춰 Brand Gradient와 정렬한다.
- `background-clip: text`를 `-webkit-` 프리픽스보다 먼저 두지 않는다(파서 이슈).

---

## Image Placeholders

이미지 자산이 없을 때 처리 전략. **이모지 사용 금지** — 폰트 미로드 시 네모박스(豆腐) 현상.

### 상품/콘텐츠 카드 이미지

```html
<!-- 톤-온-톤 그라데이션 + 카테고리 SVG -->
<div
  class="aspect-square bg-gradient-to-br from-blue-100 to-blue-200 dark:from-blue-900/30 dark:to-blue-800/30 flex items-center justify-center rounded-lg"
>
  <svg class="w-12 h-12 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <!-- 카테고리에 맞는 아이콘 -->
  </svg>
</div>
```

### 아바타 / 프로필

```html
<div
  class="w-10 h-10 rounded-full bg-gradient-to-br from-violet-400 to-pink-400 flex items-center justify-center text-white text-sm font-semibold"
>
  AB
</div>
```

### Hero 블러 배경 (브랜드 인디고-퍼플)

```html
<div
  class="absolute inset-0 bg-gradient-to-br from-indigo-100 to-purple-100 dark:from-indigo-900/20 dark:to-purple-900/20 rounded-2xl blur-3xl opacity-60"
/>
```

### 인라인 아이콘

```html
<svg class="w-5 h-5 text-gray-500 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="..." />
</svg>
```

> SVG `fill="#..."` 하드코딩 금지 — 다크 모드 dead zone 발생. `fill="currentColor"` 또는 `class="fill-gray-900 dark:fill-white"` 사용.

---

## Icons

- 기본 라이브러리: Heroicons (`@iconify-json/heroicons`).
- 색상: `currentColor` 기반 + Tailwind `text-*`로 제어.
- 크기: `w-4 h-4` (16px, 본문 인라인) / `w-5 h-5` (20px, 버튼) / `w-6 h-6` (24px, 섹션 헤더).

---

## Charts

차트는 **CSS만으로 구현하지 않는다**. 라인/도넛/복합 차트는 반드시 라이브러리.

- **`chart.js` + `vue-chartjs`** — 이미 `package.json`에 포함.

### 기본 사용 패턴

```vue
<script setup lang="ts">
import { Bar, Line, Doughnut } from 'vue-chartjs'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js'

ChartJS.register(CategoryScale, LinearScale, BarElement, LineElement, PointElement, ArcElement, Title, Tooltip, Legend)

const barData = {
  labels: ['1월', '2월', '3월', '4월', '5월', '6월'],
  datasets: [
    {
      label: '매출',
      data: [120, 190, 150, 210, 180, 240],
      backgroundColor: 'rgba(59, 130, 246, 0.5)',
      borderColor: 'rgb(59, 130, 246)',
      borderWidth: 1,
    },
  ],
}

const chartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: { legend: { display: false } },
}
</script>

<template>
  <!-- 반드시 부모에 높이 지정 -->
  <div class="h-64">
    <Bar :data="barData" :options="chartOptions" />
  </div>
</template>
```

**주의사항**:

- 차트 컨테이너에 `h-*` 또는 `style="height: Xpx"` 필수 — 없으면 0px로 렌더링.
- `maintainAspectRatio: false` 권장 — 컨테이너 높이 기준.
- 다크 모드에서 축/범례 색상: `color: '#9ca3af'` (gray-400).
- CSS 바 차트는 단순 비율 시각화(히트맵, 진행률)에만 허용.
