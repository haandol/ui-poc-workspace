# Composables 가이드

## 개요

Composable은 Vue 3 Composition API를 활용한 재사용 가능한 로직 모듈이다. 비즈니스 로직, 유틸리티 함수, 사이드 이펙트를 컴포넌트와 스토어 전반에서 재사용할 수 있도록 캡슐화한다. Nuxt 4에서 모든 composable은 자동 import된다.

## 사용법

- **TypeScript 사용**: `<script lang="ts" setup>`과 Composition API
- **Nuxt 4에서 자동 import** — 수동 import 불필요
- **composable 파일명에 `use` 접두사** 붙이기 (예: `useAuth.ts`)
- **composable은 집중적으로 유지**: composable당 단일 책임

**예시:**

```typescript
export const useExample = () => {
  const isLoading = ref(false)
  const error = ref<string | null>(null)

  const doAction = async () => {
    isLoading.value = true
    error.value = null
    try {
      // 로직
    } catch (err) {
      error.value = err.message
    } finally {
      isLoading.value = false
    }
  }

  return {
    isLoading: readonly(isLoading),
    error: readonly(error),
    doAction,
  }
}
```

## 패턴

- composable에서 **반응형 상태와 함수 반환**
- 외부 변이 방지를 위해 적절한 경우 **readonly 상태 제공**
- **적절한 오류 상태로 에러 처리**
- 비동기 작업에 **로딩 상태 구현**

## Multi-step Form Wizard 패턴

여러 변형(variant) 페이지가 동일한 스텝 상태를 공유해야 할 때 composable로 분리한다.

```typescript
// app/composables/useWizard.ts
export const useWizard = () => {
  const currentStep = ref(1)
  const totalSteps = 4
  const formData = reactive({
    name: '',
    email: '',
    plan: '',
  })

  const isValid = computed(() => {
    if (currentStep.value === 1) return !!formData.name && !!formData.email
    return true
  })

  const next = () => {
    if (isValid.value && currentStep.value < totalSteps) currentStep.value++
  }
  const prev = () => {
    if (currentStep.value > 1) currentStep.value--
  }
  const goTo = (step: number) => {
    currentStep.value = step
  }

  return { currentStep, totalSteps, formData, isValid, next, prev, goTo }
}
```

**페이지에서 사용**:

```html
<script
  setup
  lang="ts"
>
  definePageMeta({ layout: false })
  const { currentStep, formData, isValid, next, prev } = useWizard()
</script>

<template>
  <!-- 스텝 전환 시 mode="out-in" 필수 — 동시 렌더링 방지 -->
  <Transition
    name="slide"
    mode="out-in"
  >
    <div :key="currentStep">
      <Step1Form
        v-if="currentStep === 1"
        v-model="formData"
      />
      <Step2Form
        v-else-if="currentStep === 2"
        v-model="formData"
      />
    </div>
  </Transition>
</template>
```

**핵심 원칙**:

- `formData`를 부모 스코프(composable)에 유지 → 스텝 컴포넌트 unmount 시 데이터 유지
- composable은 `reactive()`로 formData를 통합 관리하여 F5 새로고침 전까지 유지
- variant 페이지들은 동일 composable을 import → 동작 일관성 보장

## 모범 사례

- 가능하면 composable을 순수하게 유지 (직접 DOM 조작 지양)
- 적절한 인터페이스와 함께 타입 안전성을 위해 TypeScript 사용
- composable과 스토어 간 로직 중복 금지
- 필요한 경우 `onUnmounted`로 정리(cleanup) 적절히 처리
- 단일 책임 원칙 준수
- **composable에 Tailwind 클래스나 CSS 관련 코드 포함 금지**
- 로직과 상태 관리에만 집중
