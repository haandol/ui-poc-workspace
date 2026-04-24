# 레이아웃 & 반응형 디자인 가이드라인

**참고**: 색상, 타이포그래피, 컴포넌트를 포함한 전체 디자인 시스템은 `design-system.md` 참조

## Page Layout Selection

페이지 타입에 따라 적절한 레이아웃을 선택해야 한다. **누락 시 default.vue의 네비게이션/레이아웃이 모든 페이지에 렌더링된다.**

```typescript
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

## 컨테이너 구조

```html
<div class="container mx-auto py-4 px-4 sm:py-10 sm:px-10"></div>
```

- 가로 스크롤 방지를 위해 콘텐츠가 뷰포트 안에 유지되도록 한다

## 반응형 브레이크포인트

Tailwind 반응형 브레이크포인트:

- `sm`: 640px 이상
- `md`: 768px 이상 (모바일/데스크톱 경계)
- `lg`: 1024px 이상 (태블릿/데스크톱 경계)
- `xl`: 1280px 이상

## 그리드 시스템

```html
<div class="grid grid-cols-1 md:grid-cols-3 gap-6"></div>
```

- 반응형 variant를 사용한 모바일 퍼스트 접근

## 적응형 컴포넌트

**단순한 반응형 동작은 CSS 클래스 선호:**

```html
<!-- 화면 크기에 따라 표시/숨김 -->
<div class="hidden md:block">데스크톱 전용</div>
<div class="md:hidden">모바일 전용</div>

<!-- 다른 레이아웃 -->
<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3"></div>
```

## 카드 컴포넌트

```html
<div class="card bg-base-100 dark:bg-base-100 shadow-lg border border-base-200 dark:border-base-200"></div>
```

- 일관된 트랜지션 적용: `transition-all duration-300 hover:bg-base-200/50 dark:hover:bg-base-200/30`

## 모바일 최적화

- 터치 타겟: 최소 44x44px
- 모바일에서 CTA는 전체폭
- 소형 화면에서 단일 컬럼 레이아웃

## 애니메이션 & 트랜지션

- 트랜지션은 가볍고 성능 친화적으로 유지
- 비 상호작용 요소에 hover scale 애니메이션 금지
- 일관된 타이밍 사용: `duration-200`, `duration-300`
- 다크 모드 지원 적용: `transition-colors duration-200 hover:bg-base-200/50 dark:hover:bg-base-200/30`

## Absolute Positioning Checklist

`absolute` 포지셔닝 요소를 사용할 때 **부모에 반드시 `relative`를 추가**해야 한다. 누락 시 배지, 아이콘, 툴팁이 viewport 기준으로 떠다닌다.

```html
<!-- 올바른 패턴 -->
<div class="relative">
  <!-- 카드 콘텐츠 -->
  <span class="absolute top-3 left-3 ...">Badge</span>
  <!-- 좌상단 배지 -->
  <button class="absolute bottom-3 right-3 ...">♡</button>
  <!-- 우하단 액션 -->
</div>
```

**배지/아이콘 위치 충돌 방지**: 같은 카드 위에 배지와 아이콘이 겹치면 대각선 분리 원칙 적용

- 배지(New, Sale, 품절): 좌상단 `top-3 left-3`
- 하트/찜 버튼: 우상단 `top-3 right-3` 또는 우하단 `bottom-3 right-3`

## Flex Input Overflow

`<input>` 태그는 기본적으로 `min-width: auto`를 가진다. flex 컨테이너 안에 두면 부모 폭을 초과할 수 있다.

```html
<!-- 올바른 패턴: flex-1 min-w-0 세트로 적용 -->
<div class="flex gap-2">
  <input class="flex-1 min-w-0 h-11 px-4 ..." />
  <button class="shrink-0 px-4 ...">Search</button>
</div>
```

## Step Wizard / Multi-step Form

스텝 전환 시 레이아웃 점프 방지를 위해 `<Transition mode="out-in">` 필수.

```html
<Transition
  name="slide"
  mode="out-in"
>
  <div :key="currentStep">
    <!-- 현재 스텝 콘텐츠 -->
  </div>
</Transition>
```

- 스텝 간 공유 상태는 composable로 분리 → `app/composables/` 참조
- 폼 영역 높이 고정: `min-h-72` 등으로 스텝마다 카드 높이 변동 방지
- 세로 연결선은 `absolute` positioned div 사용 (flex로 구현 시 스텝 높이 변경에 취약)

## 다크 모드 레이아웃

- **항상 TailwindCSS `dark:` 디렉티브 사용**
- **사용 금지**: CSS의 `[data-theme="dark"]`, `.dark` 클래스 선택자, `:global(.dark)`
- pure black 대신 deep gray 배경(900-950) 선호

## 디자인 기반 원칙

- 톤 & 무드: 미니멀, 저대비, 넉넉한 여백, 콘텐츠 우선 타이포그래피
- 색상 시스템: 중성 그레이스케일 기반, 기능적 신호에만 1-2개 accent 색상 사용
- 타이포그래피: sans-serif, 줄간격 ~1.6, 명확한 계층
- 그리드 & 간격: 8px 스케일, 여유로운 패딩, 60-80자 줄 길이
- 반경/테두리/그림자: 미묘한 반경(6-8px), 얇은 테두리(1px), 매우 가벼운 그림자
- 아이코노그래피: 단순한 선형 아이콘, 부드러운 강조에만 컬러 아이콘

## 인터랙션 & 모션

- 호버: 배경이 약간 밝아짐, 아이콘이 호버 시 나타남
- 포커스: 미묘한 그림자를 가진 1-2px 외곽선
- 트랜지션: 120-200ms, ease-out, 과장된 scale/spring 금지
- 금지: 강한 primary 색상, 두꺼운 테두리, 깊은 그림자, 스프링 애니메이션
- 권장: 저대비 UI 안에서도 명확한 포커스/상태 신호 확보
