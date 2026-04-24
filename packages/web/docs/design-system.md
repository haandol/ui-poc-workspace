# 디자인 시스템

## 기초

### 색상 시스템

**중성 팔레트**: 그레이스케일 기반

- 라이트 모드: `gray-50` ~ `gray-900`
- 다크 모드: `gray-800` ~ `gray-50`
- 용도: 배경, 텍스트, 테두리, 서피스

**시맨틱 색상**:

- 정보: 파랑 (`blue-600` / 다크 `blue-300`)
- 성공: 초록 (`green-600` / 다크 `green-300`)
- 경고: 주황 (`orange-600` / 다크 `orange-300`)
- 오류: 빨강 (`red-600` / 다크 `red-300`)

**색상 사용 규칙**:

- 색상 최소화: 중성 그레이스케일 우선
- 그라데이션은 주요 액션에만 예약
- 기능적 색상만 사용: 의미 전달 또는 사용자 행동 유도 목적으로만
- 다크 모드 대응: 모든 색상에 반드시 다크 모드 variant 제공

### 타이포그래피

**스케일**:

- `text-xs`: 0.75rem (12px) — 캡션, 레이블
- `text-sm`: 0.875rem (14px) — 보조 텍스트
- `text-base`: 1rem (16px) — 본문
- `text-lg`: 1.125rem (18px) — 카드 제목, 강조
- `text-xl`: 1.25rem (20px) — 섹션 헤딩
- `text-2xl`: 1.5rem (24px) — 페이지 서브헤딩
- `text-3xl`: 1.875rem (30px) — 대형 헤딩
- `text-4xl`: 2.25rem (36px) — 히어로 헤딩 (모바일)
- `text-6xl`: 3.75rem (60px) — 히어로 헤딩 (데스크톱)

**유동 타이포그래피** (헤딩 권장):

```css
font-size: clamp(1.5rem, 2vw + 1rem, 2.25rem);
```

**텍스트 계층**:

- **H1**: `text-4xl lg:text-6xl`, `font-bold`, `text-gray-900 dark:text-white`
- **H2**: `text-3xl lg:text-4xl`, `font-bold`, `text-gray-900 dark:text-white`
- **H3**: `text-xl lg:text-2xl`, `font-semibold`, `text-gray-800 dark:text-gray-100`
- **본문**: `text-base lg:text-lg`, `font-normal`, `leading-relaxed`, `text-gray-600 dark:text-gray-300`
- **캡션**: `text-sm`, `font-normal`, `text-gray-500 dark:text-gray-400`

### 간격 & 레이아웃

**8px 기본 단위** (Tailwind 기본값):

- `space-1`: 4px / `space-2`: 8px / `space-3`: 12px / `space-4`: 16px
- `space-6`: 24px / `space-8`: 32px / `space-12`: 48px / `space-16`: 64px

**공통 패턴**:

- 컴포넌트 패딩: `p-4` ~ `p-6`
- 섹션 패딩: `py-12` ~ `py-20`
- 요소 간 간격: `gap-4` ~ `gap-6`
- 컨테이너 패딩: `px-4 sm:px-6 lg:px-8`

**컨테이너**:

```html
<div class="container mx-auto px-4 sm:px-6 lg:px-8"></div>
```

**그리드**:

```html
<!-- 1열 → 2열 → 3열 -->
<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
  <!-- 2열 레이아웃 (공통 패턴) -->
  <div class="grid lg:grid-cols-2 gap-12 items-center"></div>
</div>
```

### 테두리 & 모서리 반경

- 기본: `border` (1px), 두꺼운 테두리(>2px) 금지
- 색상: `border-gray-200 dark:border-gray-700`
- 소: `rounded` (4px) — 배지 / 중: `rounded-lg` (8px) — 카드, 버튼
- 대: `rounded-xl` (12px) — 모달 / 전체: `rounded-full` — 필, 아바타

### 그림자 & 고도

최소한의 그림자 접근:

- 레벨 1: `shadow-sm` — 카드 미묘한 고도감
- 레벨 2: `shadow-md` — 호버 상태
- 레벨 3: `shadow-lg` — 모달, 드롭다운
- 기본 카드: `shadow-sm`, 호버: `hover:shadow-md`
- 다크 모드에서 heavy shadow 지양

## 컴포넌트

### Buttons

> **DaisyUI `btn` 클래스는 사용하지 않는다.** DaisyUI 5가 `button { color }` element-level 스타일을 전역 주입하여 Tailwind 텍스트 색상을 덮어쓴다.

**Primary (Filled)**:

```html
<button
  class="px-4 py-2.5 bg-gray-900 dark:bg-white text-white dark:text-gray-900 rounded-lg font-medium hover:bg-gray-700 dark:hover:bg-gray-100 transition-colors duration-200"
>
  Primary Action
</button>
```

**Primary (Gradient)**:

```html
<button
  class="px-4 py-2.5 bg-gradient-to-r from-blue-600 to-violet-600 text-white rounded-lg font-medium hover:opacity-90 transition-opacity duration-200"
>
  Action Text
</button>
```

**Secondary (Outline)**:

```html
<button
  class="px-4 py-2.5 bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 rounded-lg font-medium border border-gray-200 dark:border-gray-600 hover:border-gray-300 dark:hover:border-gray-500 transition-colors duration-200"
>
  Secondary Action
</button>
```

**Ghost (Cancel)**:

```html
<button
  class="px-4 py-2.5 text-gray-600 dark:text-gray-400 rounded-lg font-medium hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200"
>
  Cancel
</button>
```

**Danger**:

```html
<button
  class="px-4 py-2.5 bg-red-600 text-white rounded-lg font-medium hover:bg-red-700 transition-colors duration-200"
>
  Delete
</button>
```

**States**: Default → Hover → Active (`active:scale-95`) → Disabled (`opacity-50 cursor-not-allowed pointer-events-none`)

**Sizing**: Small `px-3 py-1.5 text-sm` / Medium `px-4 py-2.5 text-sm` / Large `px-6 py-3 text-base` / Full `w-full`

### 카드

```html
<div class="card bg-base-100 dark:bg-base-100 shadow-sm border border-base-200 dark:border-base-200 rounded-lg">
  <div class="card-body p-4 md:p-6">
    <h3 class="card-title text-lg font-semibold">제목</h3>
    <p class="text-gray-600 dark:text-gray-300">내용</p>
  </div>
</div>
```

인터랙티브 호버: `hover:bg-base-200/50 dark:hover:bg-base-200/30 transition-colors duration-200`

### Form Inputs

> **DaisyUI `select`, `input` 클래스는 사용하지 않는다.** 이중 박스 생성 등 렌더링 오류 발생.

**Text Input**:

```html
<input
  type="text"
  class="w-full h-11 px-4 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:border-blue-500 dark:focus:border-blue-400 transition-colors duration-200"
  placeholder="Enter text"
/>
```

**Select**:

```html
<select
  class="h-11 px-4 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white focus:outline-none focus:border-blue-500 dark:focus:border-blue-400 transition-colors duration-200"
>
  <option>Option 1</option>
</select>
```

**Flex 컨테이너 안 Input** — `min-w-0` 필수 (`<input>` 기본 `min-width: auto`로 flex 컨테이너 넘침):

```html
<div class="flex gap-2">
  <input class="flex-1 min-w-0 h-11 px-4 ..." />
  <button class="shrink-0 ...">검색</button>
</div>
```

**Checkbox / Radio** — DaisyUI `toggle`/`checkbox` 클래스 금지, 커스텀 UI 사용:

```html
<!-- Checkbox: sr-only + 커스텀 UI -->
<label class="flex items-center gap-3 cursor-pointer">
  <input
    type="checkbox"
    class="sr-only peer"
  />
  <div
    class="w-5 h-5 rounded border-2 border-gray-300 dark:border-gray-600 peer-checked:bg-gray-900 dark:peer-checked:bg-white peer-checked:border-gray-900 dark:peer-checked:border-white transition-colors"
  >
    <!-- check SVG -->
  </div>
  <span class="text-sm text-gray-700 dark:text-gray-300">Label</span>
</label>
```

- **DO NOT use `input-bordered`**: 이중 border 발생
- **입력 높이**: `h-11` 이상 (44px 터치 타겟)
- **내부 패딩**: `px-4` 이상

### Modals

> **DaisyUI `modal`, `modal-box`, `modal-open` 클래스는 사용하지 않는다.** DaisyUI v5에서 스타일 미렌더링.

**Teleport + Transition 패턴 사용**:

```html
<Teleport to="body">
  <Transition name="modal">
    <div
      v-if="isOpen"
      class="fixed inset-0 z-50 flex items-center justify-center p-4"
    >
      <!-- Backdrop -->
      <div
        class="absolute inset-0 bg-black/50 backdrop-blur-sm"
        @click="close"
      />
      <!-- Modal box -->
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
          <button
            @click="close"
            class="px-4 py-2 text-gray-600 dark:text-gray-400 ..."
          >
            Cancel
          </button>
          <button class="px-4 py-2 bg-gray-900 dark:bg-white text-white dark:text-gray-900 ...">Confirm</button>
        </div>
      </div>
    </div>
  </Transition>
</Teleport>
```

```css
<style scoped>
.modal-enter-active, .modal-leave-active { transition: all 0.2s ease; }
.modal-enter-from, .modal-leave-to { opacity: 0; transform: translateY(8px); }
</style>
```

### Gradient Text

> **`bg-clip-text text-transparent` 단독 사용 금지** — 브라우저(특히 Safari, 일부 Chrome 버전)에서 렌더링 실패. 3개 세션 연속 동일 실패 확인.

**올바른 방법**: `<style scoped>` 내 `-webkit-` prefix 직접 작성

```html
<span class="gradient-text">그라데이션 텍스트</span>

<style scoped>
  .gradient-text {
    background: linear-gradient(135deg, #3b82f6, #8b5cf6);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }
</style>
```

### Image Placeholders

이미지 자산이 없을 때 처리 전략. **이모지 사용 금지** — 폰트 미로드 시 네모박스(豆腐) 현상 발생.

**상품/콘텐츠 카드 이미지**:

```html
<!-- 그라데이션 배경 + 카테고리 SVG 아이콘 -->
<div
  class="aspect-square bg-gradient-to-br from-blue-100 to-blue-200 dark:from-blue-900/30 dark:to-blue-800/30 flex items-center justify-center rounded-lg"
>
  <svg
    class="w-12 h-12 text-blue-400"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <!-- 카테고리에 맞는 아이콘 -->
  </svg>
</div>
```

**아바타 / 프로필**:

```html
<div
  class="w-10 h-10 rounded-full bg-gradient-to-br from-violet-400 to-pink-400 flex items-center justify-center text-white text-sm font-semibold"
>
  AB
  <!-- 이니셜 -->
</div>
```

**아이콘 (아이콘 라이브러리 없을 때)**:

```html
<!-- inline SVG 사용 — 이모지 대신 -->
<svg
  class="w-5 h-5 text-gray-500 dark:text-gray-400"
  fill="none"
  stroke="currentColor"
  viewBox="0 0 24 24"
>
  <path
    stroke-linecap="round"
    stroke-linejoin="round"
    stroke-width="2"
    d="..."
  />
</svg>
```

> SVG `fill="#..."` 하드코딩 금지 — 다크 모드 dead zone 발생. `fill="currentColor"` 또는 `class="fill-gray-900 dark:fill-white"` 사용.

### Spacing Minimums

form과 리스트 UI에서 반복적으로 발생하는 "다닥다닥" 패턴을 방지하기 위한 최소값.

| 요소                 | 최솟값      | 금지             |
| -------------------- | ----------- | ---------------- |
| form 필드 간         | `space-y-5` | `space-y-4` 이하 |
| label ↔ input        | `space-y-2` |                  |
| input 내부 좌우 패딩 | `px-4`      | `px-3`           |
| input 높이           | `h-11`      | `h-9`, `h-10`    |
| 리스트/옵션 항목 gap | `gap-4`     | `gap-2`          |
| 옵션 카드 내부 패딩  | `px-4 py-3` |                  |
| 카드 헤더 상단 패딩  | `pt-8`      |                  |

> `pt-*` 클래스가 HMR 캐시로 인해 즉시 반영 안 될 경우 `style="padding-top: 2.5rem"` 인라인으로 고정하고 빌드 후 확인.

## 인터랙션

### 호버 효과

- 인터랙티브 요소에만 적용: 버튼, 링크, 클릭 가능한 카드
- 미묘한 변화: 극적인 변형 지양
- 일관된 타이밍: `duration-200` 또는 `duration-300`
- 비액션 요소의 장식 최소화

### 트랜지션 & 애니메이션

- 빠르고 미묘하게: 120-200ms
- 표준 이징: `ease-out`
- 바운스/스프링 금지: 절제된 움직임 유지
- 레이아웃 변경보다 opacity/transform 선호

## 다크 모드

**항상 TailwindCSS `dark:` 디렉티브 사용**:

```html
<div class="bg-white dark:bg-gray-900 text-gray-900 dark:text-white"></div>
```

**절대 사용 금지**: `[data-theme="dark"]`, `.dark` 클래스 선택자, `:global(.dark)`

- 배경: `gray-900` ~ `gray-950` (pure black 금지)
- 텍스트: `gray-100` ~ `gray-200` (pure white 금지)
- 테두리: 대비 줄이기 (`gray-700` ~ `gray-600`)
- 그림자: 줄이거나 제거

## 반응형 디자인

**Tailwind 브레이크포인트**:

- `sm`: 640px / `md`: 768px (모바일/데스크톱 경계) / `lg`: 1024px / `xl`: 1280px

```html
<!-- 모바일 세로 스택 → 데스크톱 나란히 -->
<div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
  <!-- 모바일 숨김 / 모바일만 표시 -->
  <div class="hidden md:block">
    <div class="md:hidden"></div>
  </div>
</div>
```

- 터치 타겟: 최소 44x44px
- 모바일 CTA: `w-full` 전체폭
- 단일 컬럼: 모바일에서 콘텐츠 세로 스택

## 접근성

- 색상 대비: 텍스트 최소 4.5:1, 대형 텍스트 3:1
- 포커스 인디케이터: 항상 표시, 높은 대비
- 키보드 네비게이션: 모든 인터랙티브 요소 접근 가능
- 시맨틱 HTML: 올바른 헤딩 계층, 액션에 `<button>`, 이동에 `<a>`

## 디자인 토큰

```css
:root {
  --sp-1: 8px;
  --sp-2: 16px;
  --sp-3: 24px;
  --sp-4: 32px;
  --radius: 8px;
  --radius-lg: 12px;
  --shadow-1: 0 1px 2px rgba(0, 0, 0, 0.04);
  --shadow-2: 0 6px 24px rgba(0, 0, 0, 0.06);
  --dur-fast: 120ms;
  --dur-med: 200ms;
  --ease: cubic-bezier(0.2, 0.7, 0.2, 1);
}
```

## 모범 사례

**해야 할 것**:

- 그라데이션은 주요 CTA에만 사용
- 넉넉한 여백 유지
- 색상 사용을 최소화하고 기능적으로만 사용
- 라이트/다크 모드 모두 테스트
- 시맨틱 HTML, 모바일 퍼스트 접근
- 애니메이션은 미묘하게 (120-200ms)

**하지 말아야 할 것**:

- 같은 화면에 여러 accent 색상
- 두꺼운 테두리 또는 heavy shadow
- 바운스/스프링 애니메이션
- 다크 모드에 `[data-theme="dark"]` 사용
- `input-bordered` (이중 border 발생)
- DaisyUI form 컴포넌트 (`btn`, `select`, `modal`, `toggle`, `checkbox`)
- `bg-clip-text text-transparent` Tailwind 단독 사용 (scoped CSS 사용)
- SVG `fill="#..."` 하드코딩 (다크 모드 dead zone)
- 이모지 아이콘 (폰트 미로드 시 네모박스)
- 2px 이하 장식 요소 (`h-0.5` — 렌더링에서 사라짐)
- 비 상호작용 요소에 hover 효과
- 다크 모드에서 pure black 배경
