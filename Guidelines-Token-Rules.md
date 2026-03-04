# 🚨 CRITICAL TOKEN RULES — PREVENT BLUE vs TEAL CONFUSION

## ⚠️ MANDATORY: Read This FIRST Before Creating Components

### **THE PROBLEM:**
The design system has TWO colors that look similar but have DIFFERENT purposes:
- **--primary = TEAL #1DAF9C** — BRAND COLOR (use for active/selected states)
- **--accent = BLUE #1890FF** — INFO STATE ONLY (use ONLY for info alerts/messages)

### **THE MISTAKE:**
Using `--accent` (BLUE) for brand elements instead of `--primary` (TEAL)

---

## ❌ NEVER USE FOR BRAND ELEMENTS:

```css
/* WRONG — These make components BLUE instead of TEAL */
background: var(--accent);
color: var(--accent);
bg-accent
text-accent-foreground
hover:bg-accent
focus:bg-accent
data-[state=on]:bg-accent
data-[selected=true]:bg-accent
```

---

## ✅ ALWAYS USE FOR BRAND ELEMENTS:

### **Primary Actions / Selected / Active States:**
```css
/* Brand color (TEAL) */
background: var(--bg-brand);        /* or var(--primary) */
color: var(--fg-brand);             /* or var(--primary) */
border-color: var(--border-brand);  /* or var(--primary) */

/* Tailwind classes */
bg-primary
text-primary-foreground
data-[state=on]:bg-primary
data-[selected=true]:bg-primary
```

### **Hover States (Neutral Elements):**
```css
/* Subtle gray hover for menus, dropdowns, buttons */
background: var(--bg-secondary);
color: var(--fg-secondary);

/* Tailwind classes */
hover:bg-secondary
focus:bg-secondary
data-[state=open]:bg-secondary
```

### **Text Colors:**
```css
/* Use foreground, NOT accent-foreground */
color: var(--fg-primary);
text-foreground
```

---

## ✅ ONLY USE --accent (BLUE) FOR:

```css
/* Info alerts/messages ONLY */
variant="info"              ← Semantic info meaning
info: "var(--accent)"       ← In variant maps
background: var(--bg-info); ← Info alert backgrounds
```

**Examples where BLUE is correct:**
- Info alerts/toasts with `variant="info"`
- Info badges specifically labeled "information"
- Info status dots in timelines
- Info result icons

---

## 🔍 VERIFICATION CHECKLIST

Before committing ANY component, verify:

- [ ] No `bg-accent` for hover/focus states
- [ ] No `data-[state=on]:bg-accent` for toggles/switches
- [ ] No `text-accent-foreground` for brand text
- [ ] Brand elements use `bg-primary` or `bg-brand`
- [ ] Neutral hovers use `bg-secondary`
- [ ] Info states (and ONLY info states) can use `--accent`

### **Run this command:**
```bash
# Find all potential issues in your component
grep "bg-accent\|text-accent-foreground\|--accent" your-component.tsx

# Make sure all matches are ONLY for info variant
```

---

## 🎨 QUICK REFERENCE TABLE

| Use Case | ❌ WRONG (BLUE) | ✅ CORRECT (TEAL/GRAY) |
|----------|----------------|----------------------|
| Toggle ON | `bg-accent` | `bg-primary` |
| Button hover | `hover:bg-accent` | `hover:bg-secondary` |
| Menu focus | `focus:bg-accent` | `focus:bg-secondary` |
| Selected item | `data-[selected]:bg-accent` | `data-[selected]:bg-primary` |
| Active state | `data-[state=on]:bg-accent` | `data-[state=on]:bg-primary` |
| Dropdown hover | `focus:bg-accent` | `focus:bg-secondary` |
| **Info alert** | `var(--accent)` | ✅ **KEEP** (correct) |

---

## 📝 EXAMPLE FIXES

### **WRONG:**
```tsx
// Toggle component using BLUE
<Toggle className="data-[state=on]:bg-accent data-[state=on]:text-accent-foreground" />

// Dropdown with BLUE hover
<DropdownMenuItem className="focus:bg-accent focus:text-accent-foreground" />
```

### **CORRECT:**
```tsx
// Toggle component using TEAL
<Toggle className="data-[state=on]:bg-primary data-[state=on]:text-primary-foreground" />

// Dropdown with GRAY hover
<DropdownMenuItem className="focus:bg-secondary focus:text-foreground" />
```

---

## 🚫 ENFORCEMENT

**This is a CRITICAL rule.** Components using blue for brand elements will be rejected.

**Before creating/modifying any component:**
1. Read this section
2. Check your component for `accent` usage
3. Verify brand elements use `primary`
4. Verify info states use `accent` (if applicable)
5. Run verification command

---

# Original Guidelines Content Below

[Rest of your Guidelines.md content goes here...]
