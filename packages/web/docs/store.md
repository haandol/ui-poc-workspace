# Store (Pinia) Guide

## Overview

Uses Pinia for global state management. Each domain has its own store module for modularity. Stores are written in TypeScript and leverage the Composition API.

## Usage

```typescript
export const useExampleStore = defineStore('example', () => {
  // State
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
  }

  return { items, loading, itemCount, fetchItems }
}, {
  persist: true // Enable persistence if needed
})
```

**Component usage:**
```typescript
const exampleStore = useExampleStore()
const { items, loading } = storeToRefs(exampleStore)
await exampleStore.fetchItems()
```

## Patterns

- **Modularize stores by domain** (one file per domain)
- **Export state, getters, and actions** from each store
- **Use stores for global/shared state**, not for local component state
- **Naming convention**: `use<Domain>Store`
- **Use computed properties** for derived state

## Best Practices

- Keep store logic focused on state management and business logic
- Extract reusable logic into composables
- Avoid direct DOM manipulation in stores
- Use TypeScript for all stores
- Handle errors gracefully with try-catch blocks
- **fetch 함수는 반드시 store 상태를 갱신해야 한다** — `fetch*` action이 API 데이터를 반환만 하고 store state에 저장하지 않으면 후속 `find*` 호출이 실패하는 버그가 발생한다. 저장 없이 반환만 하려면 `get`/`load` 등 다른 네이밍을 사용한다.

## Boundaries

- **DO NOT include styling or layout logic** in stores
- **DO NOT perform viewport/device checks** in stores
- **Keep stores focused** on data/state, business rules, and persistence only
