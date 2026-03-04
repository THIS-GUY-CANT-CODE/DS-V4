# Design System Token Reference — Table Components

This document shows all CSS custom property tokens used by the new table components, mapped to their Layer 1 primitive values.

---

## DotGrid Component

### Color Tokens (Layer 2 → Layer 1)

| Token | Purpose | Resolves To | Hex Value |
|-------|---------|-------------|-----------|
| `--status-used` | Used dots fill | `--sky-900` | `#18658B` |
| `--bg-tertiary` | Allocated dots / track | `--border` | `#E1E4EA` |

### Spacing Tokens (Layer 1)

| Token | Value | Purpose |
|-------|-------|---------|
| `--space-1` | `4px` | Gap between dots |

### Radius Tokens (Layer 2 → Layer 1)

| Token | Resolves To | Value | Purpose |
|-------|-------------|-------|---------|
| `--radius-sm-ds` | `--radius-button` | `4px` | Dot border radius |

---

## DualProgressBar Component

### Color Tokens (Layer 2 → Layer 1)

| Token | Purpose | Resolves To | Hex Value |
|-------|---------|-------------|-----------|
| `--status-allocated` | Top bar (allocated) | `--sky-500` | `#47C2FF` |
| `--status-used` | Bottom bar (used) | `--sky-900` | `#18658B` |
| `--bg-tertiary` | Track background | `--border` | `#E1E4EA` |
| `--fg-primary` | Label text | `--foreground` | `#181B25` |
| `--fg-secondary` | Subtext | `--secondary-foreground` | `#525866` |

### Typography Tokens

| Token | Resolves To | Value | Purpose |
|-------|-------------|-------|---------|
| `--font-family-primary` | — | `'Inter', sans-serif` | All text |
| `--text-base` | `--font-size-md` | `14px` | Label text |
| `--text-caption` | `--font-size-sm` | `12px` | Subtext |
| `--font-weight-medium` | — | `500` | Label weight |
| `--font-weight-normal` | — | `400` | Subtext weight |
| `--line-height-md` | — | `20px` | Label line height |
| `--line-height-xs` | — | `16px` | Subtext line height |
| `--letter-spacing-body` | — | `-0.084px` | Text tracking |

### Spacing Tokens (Layer 1)

| Token | Value | Purpose |
|-------|-------|---------|
| `--space-1` | `4px` | Vertical gap (label → bars) |
| `--space-half` | `2px` | Gap between two bars |

### Radius Tokens (Layer 2 → Layer 1)

| Token | Resolves To | Value | Purpose |
|-------|-------------|-------|---------|
| `--radius-sm-ds` | `--radius-button` | `4px` | Bar border radius |

---

## CopyButton Component

### Size Tokens (Layer 1)

| Token | Value | Purpose |
|-------|-------|---------|
| `--size-control-md` | `32px` | Button width/height |
| `--size-icon-sm` | `16px` | Icon size |

### Color Tokens (Layer 2)

| Token | Resolves To | Purpose |
|-------|-------------|---------|
| `--icon-tertiary` | `--muted-foreground` | Icon fill color |

### Spacing Tokens (Layer 1)

| Token | Value | Purpose |
|-------|-------|---------|
| `--space-half` | `2px` | Button padding |

### Shadow Tokens (Layer 1)

| Token | Value | Purpose |
|-------|-------|---------|
| `--shadow-xs` | `0px 1px 2px 0px rgba(10, 13, 20, 0.03)` | Subtle button shadow |

### Motion Tokens (Layer 1)

| Token | Value | Purpose |
|-------|-------|---------|
| `--duration-fast` | `150ms` | Transition duration |
| `--ease-out` | `cubic-bezier(0.33, 1, 0.68, 1)` | Transition easing |

### Radius Tokens (Layer 2 → Layer 1)

| Token | Resolves To | Value | Purpose |
|-------|-------------|-------|---------|
| `--radius-sm-ds` | `--radius-button` | `4px` | Button border radius |

---

## Table Component Updates

### Color Tokens (Layer 2 → Layer 1)

| Token | Purpose | Resolves To | Hex Value |
|-------|---------|-------------|-----------|
| `--bg-primary` | Cell background | `--background` | `#FFFFFF` |
| `--bg-secondary` | Header background | `--secondary` | `#F5F7FA` |
| `--fg-primary` | Text color | `--foreground` | `#181B25` |
| `--border-default` | Row borders | `--border` | `#E1E4EA` |

### Spacing Tokens (Layer 1)

| Token | Value | Purpose |
|-------|-------|---------|
| `--space-3` | `12px` | Default cell padding |

### Typography Tokens

| Token | Resolves To | Value | Purpose |
|-------|-------------|-------|---------|
| `--font-family-primary` | — | `'Inter', sans-serif` | All table text |
| `--text-base` | `--font-size-md` | `14px` | Cell text size |
| `--font-weight-medium` | — | `500` | Header text weight |

### Motion Tokens (Layer 1)

| Token | Value | Purpose |
|-------|-------|---------|
| `--duration-fast` | `150ms` | Row hover transition |
| `--ease-out` | `cubic-bezier(0.33, 1, 0.68, 1)` | Transition easing |

---

## Density Variants — Row Heights

| Density | Height | Use Case |
|---------|--------|----------|
| `sm` | 36px | Compact tables, high data density |
| `md` | 44px | Default, balanced readability |
| `lg` | 54px | Spacious, complex cell content |

---

## Token Hierarchy Example

```
User Code:
  <DotGrid total={16} used={6} mixed={3} />

CSS Applied:
  background-color: var(--status-used)

Layer 2 Resolves:
  --status-used: var(--sky-900)

Layer 1 Primitive:
  --sky-900: #18658B

Final Rendered:
  background-color: #18658B
```

---

## Compliance Checklist

✅ **No hardcoded hex values** in component code
✅ **No hardcoded px values** for colors/spacing (only in Layer 1 primitives)
✅ **All color tokens** use Layer 2 semantic names
✅ **All spacing tokens** use Layer 1 4px-grid scale
✅ **Typography tokens** enforce Inter/DM Sans/Cousine only
✅ **Motion tokens** ensure consistent 150ms/200ms/300ms durations
✅ **Radius tokens** use 4px/8px/12px/9999px scale

---

## Token Usage Statistics

**Total unique tokens used across 3 new components:**

- **Color tokens**: 7 (--status-used, --status-allocated, --bg-tertiary, --fg-primary, --fg-secondary, --icon-tertiary, --bg-primary)
- **Typography tokens**: 8 (fonts, sizes, weights, line-heights, spacing)
- **Spacing tokens**: 3 (--space-1, --space-half, --space-3)
- **Size tokens**: 2 (--size-control-md, --size-icon-sm)
- **Radius tokens**: 1 (--radius-sm-ds → 4px)
- **Shadow tokens**: 1 (--shadow-xs)
- **Motion tokens**: 2 (--duration-fast, --ease-out)

**Total: 24 design tokens** — ensuring full design system consistency! ✨
