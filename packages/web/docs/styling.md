# Styling Guidelines

**Note**: For complete design system documentation, refer to `design-system.md`

## Color System

### Theme Colors
- Primary: DaisyUI theme primary
- Secondary: Secondary elements and actions
- Accent: Functional highlights only (links, active states, tags)
- Base/Neutral: Prefer low-contrast grayscale for surfaces and text

### Usage Patterns
```html
<!-- Primary theme -->
<div class="text-primary dark:text-primary bg-primary/20 dark:bg-primary/30"></div>

<!-- Accent used sparingly (functional signal) -->
<div class="text-accent/90 dark:text-accent/90 bg-accent/10 dark:bg-accent/20"></div>

<!-- Custom colors with dark mode -->
<div class="text-blue-600 dark:text-blue-300 bg-blue-500/20 dark:bg-blue-500/30"></div>
```

### Hover States
```html
<div class="group">
  <div class="transition-colors duration-200 group-hover:bg-base-200/80 dark:group-hover:bg-base-200/60"></div>
</div>
```

## Dark Mode

### Implementation
- **ALWAYS use TailwindCSS `dark:` directives** for dark mode styling
- **DO NOT use** `[data-theme="dark"]`, `.dark` class selectors, or `:global(.dark)` in CSS
- Apply dark mode variants to ALL custom colors and backgrounds

### Patterns
```html
<!-- Correct: Use TailwindCSS dark: directive -->
<div class="bg-white dark:bg-gray-900 text-gray-900 dark:text-white">
  <p class="text-gray-600 dark:text-gray-300">Content</p>
</div>

<!-- Correct: DaisyUI components with dark mode -->
<div class="card bg-base-100 dark:bg-base-100">
  <div class="card-body text-base-content dark:text-base-content">
    <h2 class="card-title text-primary dark:text-primary">Title</h2>
  </div>
</div>
```

### Color Considerations
- Use DaisyUI semantic color tokens: `bg-base-100`, `text-base-content`, `text-primary`
- Always provide both light and dark variants for custom colors
- Use higher opacity/saturation in dark mode for better visibility
- Prefer deep gray backgrounds (900-950) over pure black

## Typography

### Headings
- `h1`: Fluid scale `clamp(1.5rem, 2vw + 1rem, 2.25rem)`
- `h2`: `text-xl` to `text-2xl`
- `h3`: `text-lg` to `text-xl`
- Always include dark mode text colors

### Body Text
```html
<p class="text-base-content dark:text-base-content">Main text</p>
<span class="text-base-content/60 dark:text-base-content/60">Secondary text</span>
```

## Component Styling

### Cards
- Surface: `border border-base-200 dark:border-base-200 shadow-sm`
- Background: `bg-base-100 dark:bg-base-100`
- Hover: `hover:bg-base-200/50 dark:hover:bg-base-200/30 transition-colors duration-200`
- Border radius: `rounded-lg`
- Padding: `p-4 md:p-6`

### Buttons
- Default: `btn btn-ghost` for secondary actions
- Primary: reserve solid fill for main actions only
- Outline: `btn btn-outline` for neutral emphasis
- Motion: `transition-colors duration-200`

### Form Inputs
```html
<!-- Correct: Single border focus -->
<input class="input input-lg border border-base-300 dark:border-base-300 focus:border-blue-500 dark:focus:border-blue-400 focus:outline-none transition-all duration-200">

<!-- Incorrect: Avoid double borders -->
<!-- <input class="input input-bordered focus:border-blue-500 focus:ring-2"> -->
```
- Use custom border instead of `input-bordered` to prevent conflicts
- Use blue/purple tones for focus states

### Badges
```html
<span class="badge bg-accent/10 dark:bg-accent/20 text-accent dark:text-accent">Badge</span>
```

## Readability
- Maintain WCAG AA contrast (4.5:1 for text, 3:1 for large text)
- Prefer 60-80 character line length
- Provide clear keyboard focus states

## Motion
- Keep duration short (120-200ms) and curves standard (`ease-out`)
- Prefer color/background transitions over scale
- Avoid bounce/spring

## Media Queries
```css
/* Mobile (< 768px) */
@media only screen and (max-width: 767px) { }

/* Tablet (768px - 1023px) */
@media only screen and (min-width: 768px) and (max-width: 1023px) { }

/* Desktop (>= 1024px) */
@media only screen and (min-width: 1024px) { }
```
