# 스타일링 가이드라인

**참고**: 디자인 시스템 전체 문서는 `design-system.md` 참조

## 색상 시스템

### 테마 색상

- Primary: DaisyUI 테마 primary
- Secondary: 보조 요소 및 액션
- Accent: 기능적 하이라이트에만 사용 (링크, 활성 상태, 태그)
- Base/Neutral: 서피스와 텍스트는 저대비 그레이스케일 선호

### 사용 패턴

```html
<!-- Primary 테마 -->
<div class="text-primary dark:text-primary bg-primary/20 dark:bg-primary/30"></div>

<!-- Accent — 기능적 신호로만 절제해서 사용 -->
<div class="text-accent/90 dark:text-accent/90 bg-accent/10 dark:bg-accent/20"></div>

<!-- 커스텀 색상 + 다크 모드 -->
<div class="text-blue-600 dark:text-blue-300 bg-blue-500/20 dark:bg-blue-500/30"></div>
```

### 호버 상태

```html
<div class="group">
  <div class="transition-colors duration-200 group-hover:bg-base-200/80 dark:group-hover:bg-base-200/60"></div>
</div>
```

## 다크 모드

### 구현

- **항상 TailwindCSS `dark:` 디렉티브 사용**
- **사용 금지**: CSS의 `[data-theme="dark"]`, `.dark` 클래스 선택자, `:global(.dark)`
- 모든 커스텀 색상과 배경에 다크 모드 variant 적용

### 패턴

```html
<!-- 올바른 방법: TailwindCSS dark: 디렉티브 사용 -->
<div class="bg-white dark:bg-gray-900 text-gray-900 dark:text-white">
  <p class="text-gray-600 dark:text-gray-300">내용</p>
</div>

<!-- DaisyUI 구조 컴포넌트 + 다크 모드 -->
<div class="card bg-base-100 dark:bg-base-100">
  <div class="card-body text-base-content dark:text-base-content">
    <h2 class="card-title text-primary dark:text-primary">제목</h2>
  </div>
</div>
```

### 색상 고려사항

- DaisyUI 시맨틱 색상 토큰 사용: `bg-base-100`, `text-base-content`, `text-primary`
- 커스텀 색상은 항상 라이트/다크 variant 쌍으로 제공
- 다크 모드에서 가시성을 위해 높은 opacity/채도 사용
- pure black 대신 deep gray 배경(900-950) 선호

## 타이포그래피

### 헤딩

- `h1`: 유동 스케일 `clamp(1.5rem, 2vw + 1rem, 2.25rem)`
- `h2`: `text-xl` ~ `text-2xl`
- `h3`: `text-lg` ~ `text-xl`
- 항상 다크 모드 텍스트 색상 포함

### 본문 텍스트

```html
<p class="text-base-content dark:text-base-content">본문</p>
<span class="text-base-content/60 dark:text-base-content/60">보조 텍스트</span>
```

## 컴포넌트 스타일링

### 카드

- 서피스: `border border-base-200 dark:border-base-200 shadow-sm`
- 배경: `bg-base-100 dark:bg-base-100`
- 호버: `hover:bg-base-200/50 dark:hover:bg-base-200/30 transition-colors duration-200`
- 모서리 반경: `rounded-lg`
- 패딩: `p-4 md:p-6`

### Buttons

> **DaisyUI `btn` 클래스는 사용하지 않는다.** 전역 `button { color }` 주입으로 Tailwind 텍스트 색상이 무시됨.

- Primary: 순수 Tailwind `bg-gray-900 dark:bg-white text-white dark:text-gray-900`
- Secondary: `border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-800`
- Ghost: `text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700`
- Motion: `transition-colors duration-200`
- 완전한 패턴은 `design-system.md` Buttons 섹션 참조

### 폼 입력

```html
<!-- 올바른 방법: 단일 border focus -->
<input
  class="input input-lg border border-base-300 dark:border-base-300 focus:border-blue-500 dark:focus:border-blue-400 focus:outline-none transition-all duration-200"
/>

<!-- 잘못된 방법: 이중 border 발생 -->
<!-- <input class="input input-bordered focus:border-blue-500 focus:ring-2"> -->
```

- 충돌 방지를 위해 `input-bordered` 대신 커스텀 border 사용
- 포커스 상태에 파랑/보라 계열 사용

### 배지

```html
<span class="badge bg-accent/10 dark:bg-accent/20 text-accent dark:text-accent">배지</span>
```

## 그라데이션 텍스트

> **`bg-clip-text text-transparent` Tailwind 단독 사용 금지** — 브라우저 호환성 실패 (S3/S5/S6 세 세션 연속 확인).

**올바른 패턴**:

```html
<span class="gradient-heading">제목</span>

<style scoped>
  .gradient-heading {
    background: linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }
</style>
```

## 가독성

- WCAG AA 대비 유지 (텍스트 4.5:1, 대형 텍스트 3:1)
- 60-80자 줄 길이 선호
- 명확한 키보드 포커스 상태 제공

## 모션

- 짧은 duration (120-200ms), 표준 커브 (`ease-out`)
- scale보다 color/background 트랜지션 선호
- 바운스/스프링 금지

## 미디어 쿼리

```css
/* 모바일 (< 768px) */
@media only screen and (max-width: 767px) {
}

/* 태블릿 (768px - 1023px) */
@media only screen and (min-width: 768px) and (max-width: 1023px) {
}

/* 데스크톱 (>= 1024px) */
@media only screen and (min-width: 1024px) {
}
```
