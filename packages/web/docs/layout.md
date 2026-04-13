# Layout & Responsive Design Guidelines

**Note**: For complete design system including colors, typography, and components, refer to `design-system.md`

## Container Structure

```html
<div class="container mx-auto py-4 px-4 sm:py-10 sm:px-10"></div>
```

- Ensure content stays within the viewport to prevent horizontal scrolling

## Responsive Breakpoints

Follow Tailwind's responsive breakpoints:

- `sm`: 640px and above
- `md`: 768px and above (Mobile/Desktop boundary)
- `lg`: 1024px and above (Tablet/Desktop boundary)
- `xl`: 1280px and above

## Grid System

```html
<div class="grid grid-cols-1 md:grid-cols-3 gap-6"></div>
```

- Use a mobile-first approach with responsive variants

## Adaptive Components

**Prefer CSS classes for simple responsive behavior:**

```html
<!-- Show/hide based on screen size -->
<div class="hidden md:block">Desktop only</div>
<div class="md:hidden">Mobile only</div>

<!-- Different layouts -->
<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3"></div>
```

## Card Components

```html
<div class="card bg-base-100 dark:bg-base-100 shadow-lg border border-base-200 dark:border-base-200"></div>
```

- Apply consistent transitions: `transition-all duration-300 hover:bg-base-200/50 dark:hover:bg-base-200/30`

## Mobile Optimization

- Touch targets: minimum 44x44px
- Full-width CTAs on mobile
- Single column layout on small screens

## Animation & Transitions

- Keep transitions lightweight and performant
- Do not use scale animation on hover for non-interactive elements
- Use consistent timings: `duration-200`, `duration-300`
- Apply dark mode support: `transition-colors duration-200 hover:bg-base-200/50 dark:hover:bg-base-200/30`

## Dark Mode Layout

- **ALWAYS use TailwindCSS `dark:` directives** for dark mode styling
- **DO NOT use** `[data-theme="dark"]`, `.dark` class selectors, or `:global(.dark)` in CSS
- Prefer deep gray backgrounds (900-950) over pure black

## Design Foundations

- Tone & mood: minimal, low-contrast, generous whitespace; content-first typography
- Color system: neutral grayscale base; use 1-2 accent colors strictly for functional signals
- Typography: sans-serif, line-height ~1.6, clear hierarchy
- Grid & spacing: 8px scale; comfortable padding; 60-80 character line length
- Radius/border/shadow: subtle radius (6-8px), thin borders (1px), very light shadows
- Iconography: simple linear icons; color icons only for soft emphasis

## Interaction & Motion

- Hover: background lightens slightly, icons appear on hover
- Focus: 1-2px outline with subtle shadow
- Transitions: 120-200ms, ease-out; avoid exaggerated scale/spring
- Don't: strong primary colors, thick borders, deep shadows, springy animations
- Do: ensure clear focus/state signals within low-contrast UI
