# 프로젝트 가이드라인

## 기술 스택

- **프레임워크**: Nuxt 4
- **패키지 매니저**: pnpm
- **UI/스타일링**: TailwindCSS + DaisyUI 5
- **언어**: TypeScript
- **상태 관리**: Pinia

## 핵심 원칙

- **명확한 의도를 가진 깔끔하고 유지보수 가능한 TypeScript 코드** 작성
- **명령형보다 함수형 및 선언형 패턴** 사용
- **모듈화를 통해 DRY 원칙** 준수
- **재사용 가능한 로직은 composable로 추출**
- **성급한 최적화보다 코드 명확성 우선**
- **완전한 구현 보장** (TODO 또는 placeholder 금지)
- **코드베이스 전반에 걸쳐 일관된 네이밍 규칙** 적용

## Nuxt 4 구현

- **Composition API 사용**: 모든 컴포넌트에 `<script lang="ts" setup>`
- **Vue/Nuxt composable 및 컴포넌트의 자동 import 활용**
- **런타임 설정 올바르게 사용**:
  - 클라이언트 사이드: `useRuntimeConfig().public`
  - 서버 사이드: `useRuntimeConfig()`
- **SEO 구현**: `useHead` 및 `useSeoMeta` 사용
- **상태 관리**: Pinia 사용 (반응성 유지에 `storeToRefs` 사용)

## 컴포넌트

- **컴포넌트 파일**은 PascalCase 사용 (예: `BaseButton.vue`)
- **디렉토리 이름**이 컴포넌트 이름의 일부가 됨
- **컴포넌트는 명시적 import 없이 자동 import**
- **템플릿에서 PascalCase 또는 kebab-case** 모두 사용 가능
- **단일 책임 원칙** 준수

## 데이터 관리

- **SSR 호환 데이터 페칭에 `useFetch`** 사용
- **클라이언트 사이드 요청에 `$fetch`** 사용
- **복잡한 API 호출에 `useAsyncData`** 사용
- **적절한 오류 상태로 에러 처리**
- **더 나은 UX를 위해 로딩 상태 구현**
- **API 응답에 적절한 TypeScript 타입** 사용

## 상태 관리

- **전역 상태 관리에 Pinia** 사용
- **반응성 유지에 `storeToRefs`** 사용
- **모듈형 스토어 패턴 준수** (도메인당 파일 하나)
- **로딩 상태를 포함하여 비동기 작업 적절히 처리**

## 디자인 일관성

- **디자인 시스템은 루트 [`DESIGN.md`](../../../DESIGN.md)가 단일 소스 오브 트루스** — 토큰·색상·타이포·간격·Do/Don't.
- 구현 패턴은 분할 문서에서: [layout](../../../docs/design/layout.md), [components](../../../docs/design/components.md), [interaction](../../../docs/design/interaction.md).
- **다크 모드에 TailwindCSS `dark:` 디렉티브 사용** (`[data-theme="dark"]` 금지).
- **1-2개 accent 색상과 함께 중성 그레이스케일 서피스 선호**.
- **모션은 미묘하게 유지** (120-200ms, ease-out).
- **Tailwind 간격 스케일을 사용하여 일관된 간격 유지**.

## Mock Data

PoC 및 프로토타입 개발 시 Mock 데이터 처리 기준.

| 상황                                | 위치                                    | 방법              |
| ----------------------------------- | --------------------------------------- | ----------------- |
| 단일 페이지 전용 데이터 (20개 이하) | 페이지 파일 내 `const mockData = [...]` | inline 선언       |
| 여러 페이지 공유 데이터             | `app/data/` 디렉토리                    | `.ts` 파일로 분리 |
| 50개 이상 또는 복잡한 구조          | `app/data/` 디렉토리                    | 타입 정의 포함    |

```typescript
// app/data/products.ts
export interface Product { id: number; name: string; price: number; ... }
export const mockProducts: Product[] = [ ... ]
```

- Mock 데이터는 반드시 **TypeScript 타입 정의** 포함
- 이미지 URL 대신 placeholder 전략 사용 ([docs/design/components.md — Image Placeholders](../../../docs/design/components.md#image-placeholders) 참조)

## Troubleshooting

### HMR 캐시 깨짐

파일 수정 후 브라우저에 변경 사항이 반영되지 않을 때:

```bash
# .nuxt 캐시 삭제 + dev 서버 재시작
rm -rf packages/web/.nuxt && npx nx dev web
```

Tailwind JIT 클래스(`pt-10`, `gap-5` 등)가 동적으로 추가된 경우 purge 대상이 될 수 있다. 위 방법으로도 해결 안 되면 프로덕션 빌드로 확인:

```bash
npx nx build web && npx nx preview web
```

### Chart 라이브러리

CSS만으로 라인 차트, 도넛 차트, 복합 차트(바+라인 오버레이) 구현은 불가능하다. [docs/design/components.md — Charts](../../../docs/design/components.md#charts)의 차트 라이브러리 가이드를 참조한다. CSS 바 차트는 단순 비율 시각화에만 사용 가능하다.

## 접근성

- **적절한 색상 대비 확보** (WCAG AA)
- **모든 인터랙티브 요소에 키보드 네비게이션 구현**
- **시맨틱 HTML 요소 적절하게 사용**
- **이미지에 alt 텍스트 제공**

## 보안

- **민감한 데이터는 서버 사이드에서만 처리**
- **클라이언트와 서버 양쪽에서 사용자 입력 유효성 검사**
- **민감한 설정에 환경 변수 사용**
