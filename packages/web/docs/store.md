# 스토어 (Pinia) 가이드

## 개요

전역 상태 관리에 Pinia를 사용한다. 각 도메인은 모듈화를 위해 자체 스토어 모듈을 가진다. 스토어는 TypeScript로 작성되며 Composition API를 활용한다.

## 사용법

```typescript
export const useExampleStore = defineStore('example', () => {
  // 상태
  const items = ref<Item[]>([])
  const loading = ref(false)

  // Getters
  const itemCount = computed(() => items.value.length)

  // Actions
  const fetchItems = async () => {
    loading.value = true
    try {
      const response = await $fetch('/api/items')
      items.value = response.data
    } finally {
      loading.value = false
    }

  return { items, loading, itemCount, fetchItems }
}, {
  persist: true // 필요한 경우 영속성 활성화
})
```

**컴포넌트에서 사용:**

```typescript
const exampleStore = useExampleStore()
const { items, loading } = storeToRefs(exampleStore)
await exampleStore.fetchItems()
```

## 패턴

- **도메인별 스토어 모듈화** (도메인당 파일 하나)
- **각 스토어에서 상태, getter, action 내보내기**
- **로컬 컴포넌트 상태가 아닌 전역/공유 상태에 스토어 사용**
- **네이밍 규칙**: `use<Domain>Store`
- **파생 상태에 computed 속성 사용**

## 모범 사례

- 스토어 로직은 상태 관리와 비즈니스 로직에 집중
- 재사용 가능한 로직은 composable로 추출
- 스토어에서 직접 DOM 조작 금지
- 모든 스토어에 TypeScript 사용
- try-catch 블록으로 에러 처리
- **`fetch*` 함수는 반드시 store 상태를 갱신해야 한다** — API 데이터를 반환만 하고 store state에 저장하지 않으면 후속 `find*` 호출이 실패하는 버그가 발생한다. 저장 없이 반환만 하려면 `get`/`load` 등 다른 네이밍을 사용한다.

## 경계

- **스토어에 스타일링 또는 레이아웃 로직 포함 금지**
- **스토어에서 뷰포트/기기 체크 금지**
- **스토어는 데이터/상태, 비즈니스 규칙, 영속성에만 집중**
