# 🚨 CRITICAL: TOKEN USAGE RULES — PREVENT BLUE vs TEAL CONFUSION

## ⚠️ READ THIS FIRST BEFORE CREATING ANY COMPONENT

### **THE PROBLEM:**
The design system has TWO similar-looking colors with DIFFERENT purposes:
- **`--primary` = TEAL #1DAF9C** → BRAND COLOR (active/selected states)
- **`--accent` = BLUE #1890FF** → INFO STATE ONLY (alerts/messages)

**Common Mistake:** Using `--accent` (BLUE) for brand elements instead of `--primary` (TEAL)

---

## ❌ NEVER USE FOR BRAND ELEMENTS:

```css
/* WRONG — Makes components BLUE instead of TEAL */
background: var(--accent);
bg-accent
text-accent-foreground
hover:bg-accent
focus:bg-accent  
data-[state=on]:bg-accent
data-[selected=true]:bg-accent
```

---

## ✅ ALWAYS USE FOR BRAND ELEMENTS:

### **Active/Selected/Toggle States:**
```css
/* TEAL brand color */
bg-primary
data-[state=on]:bg-primary
data-[selected=true]:bg-primary
background: var(--bg-brand)
color: var(--fg-brand)
```

### **Hover States (Neutral):**
```css
/* Subtle gray hover for menus, dropdowns */
hover:bg-secondary
focus:bg-secondary
data-[state=open]:bg-secondary
background: var(--bg-secondary)
```

### **Text Colors:**
```css
/* Use foreground, NOT accent-foreground */
text-foreground
color: var(--fg-primary)
```

---

## ✅ ONLY USE `--accent` (BLUE) FOR:

```tsx
/* Info semantic meaning ONLY */
<Alert variant="info" />        ← Correct
<Badge variant="info" />        ← Correct  
<Toast variant="info" />        ← Correct

/* In variant color maps */
const colors = {
  info: "var(--accent)",        ← Correct (semantic info)
  success: "var(--status-healthy)",
  error: "var(--status-unhealthy)",
};
```

---

## 🔍 PRE-COMMIT VERIFICATION

**Run this command before committing:**
```bash
# Find potential issues
grep -r "bg-accent\|text-accent-foreground\|--accent" src/app/components/ui/ src/atoms/

# Verify all matches are ONLY for info variant
grep -r "bg-accent\|text-accent" src/ | grep -v 'variant="info"\|info:'
```

**If any results appear (except info states), FIX THEM before committing.**

---

## 🎨 QUICK REFERENCE

| Component | ❌ WRONG (BLUE) | ✅ CORRECT (TEAL/GRAY) |
|-----------|----------------|----------------------|
| Toggle ON | `bg-accent` | `bg-primary` |
| Button hover | `hover:bg-accent` | `hover:bg-secondary` |
| Menu item hover | `focus:bg-accent` | `focus:bg-secondary` |
| Selected state | `data-[selected]:bg-accent` | `data-[selected]:bg-primary` |
| Dropdown focus | `focus:bg-accent` | `focus:bg-secondary` |
| Calendar today | `bg-accent` | `bg-brand-subtle` |
| Skeleton loading | `bg-accent` | `bg-secondary` |
| **Info alert** | `var(--accent)` | ✅ KEEP (correct) |

---

## 📝 CODE REVIEW CHECKLIST

Before committing ANY component:

- [ ] No `bg-accent` for hover/focus/selected states
- [ ] No `data-[state=on]:bg-accent` for toggles
- [ ] No `text-accent-foreground` for brand text
- [ ] Brand elements use `bg-primary` or `bg-brand`
- [ ] Neutral hovers use `bg-secondary`
- [ ] Info states (and ONLY info states) use `--accent`
- [ ] Ran verification command and got zero results

---

## 💡 EXAMPLES

### **WRONG:**
```tsx
// Toggle using BLUE ❌
<Toggle className="data-[state=on]:bg-accent data-[state=on]:text-accent-foreground" />

// Dropdown with BLUE hover ❌
<DropdownMenuItem className="focus:bg-accent focus:text-accent-foreground" />
```

### **CORRECT:**
```tsx
// Toggle using TEAL ✅
<Toggle className="data-[state=on]:bg-primary data-[state=on]:text-primary-foreground" />

// Dropdown with GRAY hover ✅
<DropdownMenuItem className="focus:bg-secondary focus:text-foreground" />

// Info alert using BLUE ✅ (correct semantic usage)
<Alert variant="info" className="bg-info-subtle" />
```

---

## 🚫 ENFORCEMENT

**This is a CRITICAL design system rule.**

Components using blue (`--accent`) for brand elements will be REJECTED.

**Workflow:**
1. Read this section before creating/modifying components
2. Search your component for `accent` usage
3. Verify brand elements use `primary` or `secondary`
4. Verify info states (if any) use `accent`
5. Run verification command
6. Only commit if zero incorrect usages found

---

# Design System Guidelines (Original Content)

I've updated the tailwind css and /styles/global.css file to include colors, spacing, borders, radius and typography from my team's design system.

- **Make sure all UI being generated uses these variables from the css**, so that the generation adheres to my design system and the user has ability to update the styling by updating the css.
- **For typography ONLY use the font faces defined in the css** for all generated text (Inter, DM Sans, Cousine).

## Typography
- Primary font: `var(--font-family-primary)` (Inter)
- Display font: `var(--font-family-display)` (DM Sans)
- Monospace font: `var(--font-family-mono)` (Cousine)

## Colors
- Brand (TEAL): `var(--primary)` #1DAF9C
- Backgrounds: `var(--bg-primary)`, `var(--bg-secondary)`, `var(--bg-brand)`
- Text: `var(--fg-primary)`, `var(--fg-secondary)`, `var(--fg-tertiary)`
- Borders: `var(--border-default)`, `var(--border-strong)`

## Spacing
Use `var(--space-*)` tokens: `--space-1` (4px) through `--space-16` (64px)

## Radius
- Small: `var(--radius-sm-ds)` (4px)
- Medium: `var(--radius-md-ds)` (8px)
- Large: `var(--radius-lg-ds)` (12px)
- Full: `var(--radius-full-ds)` (9999px)

## Shadows
- `var(--shadow-xs)`, `var(--shadow-sm)`, `var(--shadow-md)`, `var(--shadow-lg)`
- Focus ring: `var(--shadow-ring-brand)` (TEAL, not blue)

## Component Styling
Some base components may have default styling (gap/typography) baked in. **Explicitly set any styling from these guidelines in generated React to override defaults.**

---

**REMEMBER: BRAND = TEAL (#1DAF9C), INFO = BLUE (#1890FF). Never confuse them!**
