# Project Guidelines

## Tech Stack

- **Framework**: Nuxt 4
- **Package Manager**: pnpm
- **UI/Styling**: TailwindCSS + DaisyUI 5
- **Language**: TypeScript
- **State Management**: Pinia

## Core Principles

- **Write clean, maintainable TypeScript code** with clear intent
- **Use functional and declarative patterns** over imperative ones
- **Follow DRY principles** through modularization
- **Extract reusable logic** into composables
- **Prioritize code clarity** over premature optimization
- **Ensure complete implementation** (no TODOs or placeholders)
- **Follow consistent naming conventions** across the codebase

## Nuxt 4 Implementation

- **Use Composition API**: `<script lang="ts" setup>` for all components
- **Leverage auto-imports** for Vue/Nuxt composables and components
- **Use runtime config properly**:
  - Client-side: `useRuntimeConfig().public`
  - Server-side: `useRuntimeConfig()`
- **Implement SEO** with `useHead` and `useSeoMeta`
- **Manage state** with Pinia (use `storeToRefs` for reactivity)

## Components

- **Component files** must use PascalCase (e.g., `BaseButton.vue`)
- **Directory names** become part of the component name
- **Components are auto-imported** without explicit import statements
- **Use either PascalCase or kebab-case** in templates
- **Follow single responsibility principle**

## Data Management

- **Use `useFetch`** for SSR-compatible data fetching
- **Use `$fetch`** for client-side requests
- **Use `useAsyncData`** for complex API calls
- **Handle errors gracefully** with proper error states
- **Implement loading states** for better UX
- **Use proper TypeScript types** for API responses

## State Management

- **Use Pinia** for global state management
- **Maintain reactivity** with `storeToRefs`
- **Follow modular store pattern** (one file per domain)
- **Handle async operations** properly with loading states

## Design Consistency

- **Follow design system** from `design-system.md`
- **Follow styling guidelines** from `styling.md`
- **Use TailwindCSS `dark:` directives** for dark mode
- **Prefer neutral grayscale surfaces** with 1-2 accent colors
- **Keep motion subtle** (120-200ms, ease-out)
- **Maintain consistent spacing** using Tailwind's spacing scale

## Accessibility

- **Ensure proper color contrast** (WCAG AA)
- **Implement keyboard navigation** for all interactive elements
- **Use semantic HTML elements** appropriately
- **Provide alt text** for images

## Security

- **Handle sensitive data server-side** only
- **Validate user inputs** on both client and server
- **Use environment variables** for sensitive configuration
