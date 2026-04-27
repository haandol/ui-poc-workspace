# Interaction & Accessibility

[← DESIGN.md](../../DESIGN.md)로 돌아가기

호버·포커스·모션·다크 모드·a11y·CSS 변수. 이 앱의 움직임은 "있는 듯 없는 듯"을 지향한다.

## 호버 효과

- **인터랙티브 요소에만 적용** — 버튼, 링크, 클릭 가능한 카드.
- **미묘한 변화** — 극적인 변형 지양.
- **일관된 타이밍** — `duration-200` 또는 `duration-300`.
- **비액션 요소의 장식 최소화** — 정보 표시용 카드는 호버 효과 제거 또는 축소.

```html
<div class="group">
  <div class="transition-colors duration-200 group-hover:bg-base-200/80 dark:group-hover:bg-base-200/60"></div>
</div>
```

## 포커스 상태

- **항상 보이고 충분한 대비** — 키보드 내비게이션 사용자에게 필수.
- **포커스 링**: 1-2px 외곽선 + 미묘한 그림자.
- **초록 포커스 금지** — 시맨틱 혼동 유발.
- **포커스 색**: 파랑/보라 계열 (`focus:border-blue-500 dark:focus:border-blue-400`).

## 트랜지션 & 애니메이션

- **짧은 duration** — 120–200ms.
- **표준 이징** — `ease-out` 기본. 복잡한 이징 금지.
- **바운스/스프링 금지** — 절제된 움직임 유지.
- **레이아웃 변경보다 opacity/transform 선호** — 리플로우 방지.

```html
<!-- 올바른 패턴 -->
<div class="transition-colors duration-200 hover:bg-base-200/50 dark:hover:bg-base-200/30"></div>
```

## CSS Variables (`main.css`)

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

## 다크 모드

### 구현 규칙

- **오직 Tailwind `dark:` 디렉티브만 사용**.
- **절대 사용 금지**: `[data-theme="dark"]`, `.dark` 클래스 셀렉터, `:global(.dark)`.
- DaisyUI 테마는 `main.css`의 `@plugin "daisyui" { themes: light --default, dark --prefersdark; }`로 OS 선호에 따라 자동 토글.
- 모든 커스텀 색상과 배경에 다크 모드 variant.

### 다크 팔레트 가이드

- 배경: `gray-900` ~ `gray-950` (pure black 금지)
- 텍스트: `gray-100` ~ `gray-200` (pure white는 H1/H2 한정)
- 테두리: 대비 줄이기 (`gray-700` ~ `gray-600`)
- 그림자: 줄이거나 제거 (`dark:shadow-none`)

### 패턴

```html
<!-- 올바른 방법 -->
<div class="bg-white dark:bg-gray-900 text-gray-900 dark:text-white">
  <p class="text-gray-600 dark:text-gray-300">내용</p>
</div>

<!-- DaisyUI 구조 컴포넌트 + 다크 -->
<div class="card bg-base-100 dark:bg-base-100">
  <div class="card-body text-base-content dark:text-base-content">
    <h2 class="card-title text-primary dark:text-primary">제목</h2>
  </div>
</div>
```

### 색상 고려사항

- DaisyUI 시맨틱 토큰(`bg-base-100`, `text-base-content`, `text-primary`)은 테마가 바뀌면 자동 대응.
- 커스텀 색상은 항상 `light` / `dark:` 쌍으로 제공.
- 다크 모드에서 가시성을 위해 높은 opacity/채도를 쓸 수 있음(`/20` → `/30`).

## 접근성 (a11y)

### 색상 대비

- **WCAG AA 준수**: 텍스트 최소 4.5:1, 대형 텍스트 3:1.
- **색맹 고려**: 색상에만 의존하지 않는 정보 전달 — 아이콘 또는 텍스트 병행.
- **다크 모드 가독성**: 반전이 아니라 별도 팔레트로 설계.

### 키보드 네비게이션

- 모든 인터랙티브 요소에 키보드로 접근 가능.
- 포커스 순서가 시각 순서와 일치.
- `Enter`/`Space`로 버튼 활성화 가능 (네이티브 `<button>` 사용으로 자동 확보).

### 시맨틱 HTML

- 헤딩 계층 지키기(`h1 → h2 → h3` 스킵 금지).
- 액션은 `<button>`, 페이지 이동은 `<a>`.
- 아이콘만 있는 버튼에는 `aria-label`.
- 장식용 SVG는 `aria-hidden="true"`.

### 사용성

- **명확한 액션 문구** — 버튼 텍스트가 의도를 드러내야 한다.
- **일관성** — 같은 기능은 같은 스타일.
- **즉각적 피드백** — 사용자 액션에 시각적 반응.

## 모바일 최적화

- **터치 타겟**: 최소 44×44px (`h-11 w-11` 이상).
- **모바일 CTA**: `w-full` 전체폭.
- **단일 컬럼**: 모바일에서 콘텐츠 세로 스택.
- **이중 탭 금지** — `touch-manipulation` 또는 줌 방지 메타.

## 미디어 쿼리 (레거시 CSS가 필요한 경우)

Tailwind 브레이크포인트와 동일하게 맞춘다:

```css
/* 모바일 (< 768px) */
@media only screen and (max-width: 767px) {
}

/* 태블릿 (768px ~ 1023px) */
@media only screen and (min-width: 768px) and (max-width: 1023px) {
}

/* 데스크톱 (>= 1024px) */
@media only screen and (min-width: 1024px) {
}
```

가능하면 Tailwind `sm:`/`md:`/`lg:` 프리픽스로 처리하고, 스코프드 CSS로 쓰는 경우에만 미디어 쿼리를 직접 작성한다.
