# Design System

## Foundation

### Color System

**Neutral Palette**: Grayscale foundation

- Light mode: `gray-50` to `gray-900`
- Dark mode: `gray-800` to `gray-50`
- Use for: Backgrounds, text, borders, surfaces

**Semantic Colors**:

- Info: Blue (`blue-600` / `blue-300` dark)
- Success: Green (`green-600` / `green-300` dark)
- Warning: Orange (`orange-600` / `orange-300` dark)
- Error: Red (`red-600` / `red-300` dark)

**Color Usage Rules**:

- Minimize color usage: Prefer neutral grayscale
- Reserve gradient for primary actions only
- Functional color only: Use color to convey meaning or guide action
- Dark mode parity: Every color must have dark mode variant

### Typography

**Scale**:

- `text-xs`: 0.75rem (12px) - Captions, labels
- `text-sm`: 0.875rem (14px) - Secondary text
- `text-base`: 1rem (16px) - Body text
- `text-lg`: 1.125rem (18px) - Card titles, emphasis
- `text-xl`: 1.25rem (20px) - Section headings
- `text-2xl`: 1.5rem (24px) - Page subheadings
- `text-3xl`: 1.875rem (30px) - Large headings
- `text-4xl`: 2.25rem (36px) - Hero headings (mobile)
- `text-6xl`: 3.75rem (60px) - Hero headings (desktop)

**Fluid Typography** (preferred for headings):

```css
font-size: clamp(1.5rem, 2vw + 1rem, 2.25rem);
```

**Text Hierarchy**:

- **H1**: `text-4xl lg:text-6xl`, `font-bold`, `text-gray-900 dark:text-white`
- **H2**: `text-3xl lg:text-4xl`, `font-bold`, `text-gray-900 dark:text-white`
- **H3**: `text-xl lg:text-2xl`, `font-semibold`, `text-gray-800 dark:text-gray-100`
- **Body**: `text-base lg:text-lg`, `font-normal`, `leading-relaxed`, `text-gray-600 dark:text-gray-300`
- **Caption**: `text-sm`, `font-normal`, `text-gray-500 dark:text-gray-400`

### Spacing & Layout

**8px Base Unit** (Tailwind default):

- `space-1`: 4px / `space-2`: 8px / `space-3`: 12px / `space-4`: 16px
- `space-6`: 24px / `space-8`: 32px / `space-12`: 48px / `space-16`: 64px

**Common Patterns**:

- Component padding: `p-4` to `p-6`
- Section padding: `py-12` to `py-20`
- Gap between elements: `gap-4` to `gap-6`
- Container padding: `px-4 sm:px-6 lg:px-8`

**Container**:

```html
<div class="container mx-auto px-4 sm:px-6 lg:px-8"></div>
```

**Grid**:

```html
<!-- Single column → 2 columns → 3 columns -->
<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
  <!-- 2-column layout (common pattern) -->
  <div class="grid lg:grid-cols-2 gap-12 items-center"></div>
</div>
```

### Border & Radius

- Default: `border` (1px), never use thick borders (>2px)
- Colors: `border-gray-200 dark:border-gray-700`
- Small: `rounded` (4px) - Badges / Medium: `rounded-lg` (8px) - Cards, buttons
- Large: `rounded-xl` (12px) - Modals / Full: `rounded-full` - Pills, avatars

### Shadows & Elevation

Minimal shadow approach:

- Level 1: `shadow-sm` - Subtle card elevation
- Level 2: `shadow-md` - Hover states
- Level 3: `shadow-lg` - Modals, dropdowns
- Default cards: `shadow-sm`, hover: `hover:shadow-md`
- Avoid heavy shadows in dark mode

## Components

### Buttons

**Primary (Gradient)**:

```html
<button class="btn-gradient">Action Text</button>
```

**Secondary (Outline)**:

```html
<button
  class="bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 px-8 py-4 rounded-xl font-semibold border-2 border-gray-200 dark:border-gray-600 hover:border-gray-300 dark:hover:border-gray-500"
>
  Secondary Action
</button>
```

**Ghost (DaisyUI)**:

```html
<button class="btn btn-ghost">Cancel</button>
```

**States**: Default → Hover (`hover:scale-105`) → Active (`active:scale-95`) → Disabled (`opacity-50 cursor-not-allowed`)

**Sizing**: Small `px-3 py-1.5 text-sm` / Medium `px-4 py-2 text-base` / Large `px-8 py-4 text-lg` / Full `w-full`

### Cards

```html
<div class="card bg-base-100 dark:bg-base-100 shadow-sm border border-base-200 dark:border-base-200 rounded-lg">
  <div class="card-body p-4 md:p-6">
    <h3 class="card-title text-lg font-semibold">Title</h3>
    <p class="text-gray-600 dark:text-gray-300">Content</p>
  </div>
</div>
```

Interactive hover: `hover:bg-base-200/50 dark:hover:bg-base-200/30 transition-colors duration-200`

### Form Inputs

```html
<input
  class="input input-lg border border-base-300 dark:border-base-300 focus:border-blue-500 dark:focus:border-blue-400 focus:outline-none transition-all duration-200"
  type="text"
  placeholder="Enter text"
/>
```

- **DO NOT use `input-bordered`**: Causes double border on focus
- **Use single border**: `border border-base-300`
- **Focus state**: Change border color only (`focus:border-blue-500`)

### Modals

```html
<div class="modal modal-open">
  <div class="modal-box max-w-2xl">
    <h3 class="font-bold text-lg mb-4">Modal Title</h3>
    <p class="py-4">Content</p>
    <div class="modal-action">
      <button class="btn btn-ghost">Cancel</button>
      <button class="btn-gradient">Confirm</button>
    </div>
  </div>
</div>
```

## Interactions

### Hover Effects

- Only on interactive elements: Buttons, links, clickable cards
- Subtle changes: Avoid dramatic transformations
- Consistent timing: `duration-200` or `duration-300`
- Minimize decoration on non-actionable items

### Transitions & Animation

- Subtle and fast: 120-200ms duration
- Standard easing: `ease-out`
- Avoid bounce/spring: Keep motion understated
- Prefer opacity/transform over layout changes

## Dark Mode

**ALWAYS use TailwindCSS `dark:` directive**:

```html
<div class="bg-white dark:bg-gray-900 text-gray-900 dark:text-white"></div>
```

**NEVER use**: `[data-theme="dark"]`, `.dark` class selectors, `:global(.dark)`

- Backgrounds: `gray-900` to `gray-950` (not pure black)
- Text: `gray-100` to `gray-200` (not pure white)
- Borders: Reduce contrast (`gray-700` to `gray-600`)
- Shadows: Reduce or remove

## Responsive Design

**Tailwind breakpoints**:

- `sm`: 640px / `md`: 768px (mobile/desktop boundary) / `lg`: 1024px / `xl`: 1280px

```html
<!-- Stack on mobile, side-by-side on desktop -->
<div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
  <!-- Hide on mobile / Show only on mobile -->
  <div class="hidden md:block">
    <div class="md:hidden"></div>
  </div>
</div>
```

- Touch targets: Minimum 44x44px
- Full-width CTAs on mobile: `w-full`
- Single column: Stack content vertically on mobile

## Accessibility

- Color contrast: Minimum 4.5:1 for text, 3:1 for large text
- Focus indicators: Always visible and high contrast
- Keyboard navigation: All interactive elements accessible
- Semantic HTML: Proper heading hierarchy, `<button>` for actions, `<a>` for navigation

## Design Tokens

```css
:root {
  --sp-1: 8px;
  --sp-2: 16px;
  --sp-3: 24px;
  --sp-4: 32px;
  --radius: 8px;
  --radius-lg: 12px;
  --shadow-1: 0 1px 2px rgba(0, 0, 0, 0.04);
  --shadow-2: 0 6px 24px rgba(0, 0, 0, 0.06);
  --dur-fast: 120ms;
  --dur-med: 200ms;
  --ease: cubic-bezier(0.2, 0.7, 0.2, 1);
}
```

## Best Practices

**Do**:

- Use gradient for primary CTAs only
- Maintain generous whitespace
- Keep color usage minimal and functional
- Test in both light and dark modes
- Use semantic HTML, mobile-first approach
- Keep animations subtle (120-200ms)

**Don't**:

- Multiple accent colors on same screen
- Thick borders or heavy shadows
- Springy/bouncy animations
- `[data-theme="dark"]` for dark mode
- `input-bordered` (causes double border)
- Hover effects on non-interactive elements
- Pure black backgrounds in dark mode
