# Composables Guide

## Overview

Composables are reusable logic modules leveraging Vue 3's Composition API. They encapsulate business logic, utility functions, and side effects for use across components and stores. All composables are auto-imported in Nuxt 4.

## Usage

- **Use TypeScript** with `<script lang="ts" setup>` and the Composition API
- **Auto-imported in Nuxt 4**, no need for manual imports
- **Prefix composable files** with `use` (e.g., `useAuth.ts`)
- **Keep composables focused**: one responsibility per composable

**Example:**
```typescript
export const useExample = () => {
  const isLoading = ref(false)
  const error = ref<string | null>(null)

  const doAction = async () => {
    isLoading.value = true
    error.value = null
    try {
      // logic
    } catch (err) {
      error.value = err.message
    } finally {
      isLoading.value = false
    }
  }

  return {
    isLoading: readonly(isLoading),
    error: readonly(error),
    doAction
  }
}
```

## Patterns

- **Return reactive state and functions** from composables
- **Provide readonly state** when appropriate to prevent external mutations
- **Handle errors gracefully** with proper error states
- **Implement loading states** for async operations

## Best Practices

- Keep composables pure where possible (avoid direct DOM manipulation)
- Use TypeScript for type safety with proper interfaces
- Avoid duplicating logic between composables and stores
- Handle cleanup properly with `onUnmounted` when needed
- Follow single responsibility principle
- **DO NOT include Tailwind classes** or CSS concerns in composables
- Focus on logic and state management only
