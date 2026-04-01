---
name: scaffold-ui
description: PRD(ALPS) 문서를 읽고 네비게이션 가능한 UI 뼈대(레이아웃, 사이드바, 헤더, 빈 페이지 쉘)를 자동 생성합니다. PRD 작성 완료 후 사용합니다.
user_invocable: true
---

# Scaffold UI Skill

PRD(ALPS) 문서를 기반으로 Nuxt 4 앱의 UI 뼈대를 즉시 생성한다.
생성 후 브라우저에서 사이드바 네비게이션이 작동하는 상태를 목표로 한다.

## Step 1: PRD 읽기

1. `prd/` 디렉토리에서 `.alps.md` 또는 `.prd.md` 파일을 찾아 읽는다.
2. **Section 1** (Overview)에서 프로젝트 이름을 추출한다.
3. **Section 6** (Requirements Summary)에서 Feature 테이블을 파싱하여 Feature ID(F1, F2, ...)와 Feature 이름을 추출한다.

## Step 2: 파일 생성

아래 파일들을 생성한다. 반드시 `packages/web/` 하위의 디자인 시스템 문서(`docs/design-system.md`, `docs/layout.md`, `docs/styling.md`)를 읽고 준수해야 한다.

### 필수 규칙

- TailwindCSS 4 + DaisyUI 5 사용
- 다크 모드: 반드시 `dark:` directive 사용 (절대 `[data-theme="dark"]` 또는 `.dark` 클래스 사용 금지)
- 컬러: neutral grayscale 기반, primary action에만 indigo-purple gradient
- 폰트: Inter + Noto Sans KR (이미 nuxt.config.ts에 설정됨)
- Vue 3 Composition API + `<script setup lang="ts">`
- 모든 컴포넌트에 반응형 디자인 (mobile-first)

### 2-1. `packages/web/app/app.vue` 교체

기존 랜딩 페이지를 제거하고 NuxtLayout + NuxtPage로 교체:

```vue
<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>
```

### 2-2. `packages/web/app/layouts/default.vue` 생성

반응형 레이아웃:
- **사이드바**: `w-64` 고정, 왼쪽. 모바일에서는 숨겨지고 햄버거 메뉴로 토글
- **헤더**: sticky top, 프로젝트 이름 표시, 모바일 햄버거 버튼
- **메인 콘텐츠**: flex-1, `<slot />` 영역, 패딩 `p-4 sm:p-6 lg:p-8`
- 배경: `bg-gray-50 dark:bg-gray-950`
- 사이드바 배경: `bg-white dark:bg-gray-900`, 오른쪽 border `border-gray-200 dark:border-gray-800`

레이아웃 안에서 AppSidebar, AppHeader 컴포넌트를 사용한다.

### 2-3. `packages/web/app/components/AppSidebar.vue` 생성

- 상단에 프로젝트 이름 (PRD에서 추출) + 로고 아이콘
- Feature 목록을 `<NuxtLink>`로 생성. 각 항목: Feature 이름
- 라우트: `/f1`, `/f2`, ... (Feature ID를 소문자로)
- Active 상태: `bg-gray-100 dark:bg-gray-800` + `text-indigo-600 dark:text-indigo-400`
- Hover: `hover:bg-gray-50 dark:hover:bg-gray-800/50`
- 홈 링크 (`/`) 포함
- props로 `open` (모바일 토글)을 받음

### 2-4. `packages/web/app/components/AppHeader.vue` 생성

- Sticky header: `sticky top-0 z-30 backdrop-blur-sm bg-white/80 dark:bg-gray-900/80`
- 높이: `h-16`
- 왼쪽: 모바일 전용 햄버거 버튼 (`lg:hidden`)
- 중앙 또는 왼쪽: 프로젝트 이름 (선택)
- 하단 border: `border-b border-gray-200 dark:border-gray-800`

### 2-5. `packages/web/app/pages/index.vue` 생성

홈/대시보드 페이지:
- 제목: "Welcome" 또는 프로젝트 이름
- Feature 목록을 카드 그리드로 표시 (각 카드에서 해당 Feature 페이지로 링크)
- `grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4`

### 2-6. 각 Feature별 페이지 생성

`packages/web/app/pages/f1.vue`, `f2.vue`, ... 파일 생성:
- 각 페이지의 `<template>`에:
  - Feature 이름을 `<h1>`으로 표시
  - Feature 설명 placeholder
  - "이 기능은 구현 예정입니다" 안내 텍스트
- `<script setup lang="ts">`에 `useHead({ title: 'F1: Feature Name' })` 포함

## Step 3: 검증

1. `packages/web/` 에서 eslint, prettier 실행
2. 브라우저에서 `http://localhost:3000` 확인 안내
3. 사이드바 네비게이션으로 모든 페이지 이동 가능한지 확인 안내

## Step 4: 결과 안내

생성된 파일 목록과 함께 아래를 안내:
- "브라우저에서 http://localhost:3000 을 열어 UI 뼈대를 확인하세요"
- "이제 각 피쳐를 하나씩 구현하면 됩니다: `@prd/XYZ.alps.md 를 읽고 F1 구현해줘`"
