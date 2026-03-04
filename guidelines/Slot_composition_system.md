Slot-Based Composition System

Purpose: Defines how layout components use swappable slots to separate structure from content. Based on Ant Design 5's composition model. Every layout is a shell of empty positions; every position accepts any child component.


Core Concept
A Slot is an empty container that defines WHERE content goes, not WHAT the content is. Layout components arrange Slots. Content components fill Slots. They are independent.
Layout (structure) + Content (atoms/molecules) = Complete UI
Never bake layout and content together. Build the shell, then fill it.

The Slot Atom
The smallest layout primitive. In Figma design mode it renders as a placeholder. In production it renders as an empty container that accepts children.
Design-time appearance:

Dashed border: 1px dashed var(--border-default)
Background: var(--bg-secondary) at 50% opacity
Diamond icon (◇) centered, var(--fg-tertiary)
Label "Swap" below icon, var(--text-caption), var(--fg-tertiary)
Min size: 40px × 40px

Production behavior:

Renders as a <div> with no visual styling
Accepts any single child component
Inherits dimensions from parent layout

Classification: Atom

Row Layout Variants
Horizontal arrangements of Slots. Each variant is a separate component.
Fixed Column Rows
VariantSplitSlot WidthsRow-11001frRow-250/501fr 1frRow-333/33/331fr 1fr 1frRow-425/25/25/251fr 1fr 1fr 1fr
Asymmetric Rows
VariantSplitSlot WidthsRow-2-Wide-Left66/332fr 1frRow-2-Wide-Right33/661fr 2frRow-3-Wide-Center25/50/251fr 2fr 1frRow-3-Wide-Left50/25/252fr 1fr 1fr
Row Rules

Use CSS Grid: display: grid; grid-template-columns: [widths];
Gap: var(--space-4) default, configurable per instance
Align items: stretch (slots fill row height)
All rows are full-width of their parent container
NO margins between slots — gap only

Classification: Molecule (each variant)

Grid Layout
Responsive multi-row, multi-column grid.
Props:

columns: 1–12 (responsive breakpoints below)
gap: var(--space-1) through var(--space-8)
density: comfortable | compact | dense

Responsive Breakpoints:
ScreenColumnsGap≥1200px (wide)As specified (max 12)var(--space-4)768–1199px (medium)max(specified ÷ 2, 1)var(--space-3)<768px (narrow)1var(--space-2)
Density Presets:
DensityGapCell PaddingComfortablevar(--space-4)var(--space-4)Compactvar(--space-2)var(--space-2)Densevar(--space-1)var(--space-1)
Implementation:
css.grid-layout {
  display: grid;
  grid-template-columns: repeat(var(--grid-cols), 1fr);
  gap: var(--grid-gap);
}
Classification: Molecule

Stack Layout
Vertical or horizontal stack of Slots with consistent spacing.
Props:

direction: vertical | horizontal
gap: var(--space-1) through var(--space-8)
align: start | center | end | stretch

Implementation:
css.stack-layout {
  display: flex;
  flex-direction: var(--stack-direction); /* column or row */
  gap: var(--stack-gap);
  align-items: var(--stack-align);
}
Classification: Molecule

Progressive Table Composition
Tables are built from cells up, never as a monolith. Each level is a separate component.
Level 1: TableCell (Atom)
Single cell container.
Variants:

text: Left-aligned text content
number: Right-aligned numeric content
status: Centered status dot + text
action: Right-aligned action buttons
custom: Slot — accepts any content

Props:

colSpan: 1+ (horizontal merge)
rowSpan: 1+ (vertical merge)
width: auto | fixed px value
align: left | center | right

Styling:

Padding: var(--space-2) var(--space-3)
Border-bottom: 1px solid var(--border-default)
Font: var(--text-body), var(--fg-primary)
Background: transparent (inherits from row)

Level 2: TableRow (Molecule)
Horizontal array of TableCells.
Variants:

default: Standard data row
striped: Alternating var(--bg-secondary) background
hoverable: Background changes to var(--bg-secondary) on hover
selected: Background var(--bg-brand) at 10% opacity
expandable: Click to reveal detail row below

Styling:

Display: table-row or grid depending on implementation
Border-bottom: 1px solid var(--border-default)
Hover transition: var(--duration-fast)

Level 3: TableHeader (Molecule)
Special TableRow for column headers.
Styling:

Background: var(--bg-secondary)
Font: var(--text-label), var(--fg-secondary), font-weight 600
Sticky top: 0 (within scroll container)
Border-bottom: 2px solid var(--border-strong)

Features:

Sortable columns: click header to toggle sort, show arrow icon
Resizable columns: drag handle on right edge (optional)

Merged Headers (like Seminar example):
| Day | Schedule (colSpan=2) | Topic |
|     | Begin    | End      |       |

Parent header cell uses colSpan to span child columns
Sub-header row sits directly below
Both rows use var(--bg-secondary)

Level 4: TableBody (Molecule)
Vertical stack of TableRows.

Overflow-y: auto (scrollable when content exceeds max-height)
Supports virtualization for 100+ rows

Level 5: DataTable (Organism)
Complete table: TableHeader + TableBody + optional TableFooter.
Features:

Column configuration (show/hide/reorder)
Row selection (checkbox column)
Pagination molecule at bottom
Empty state when no data
Loading state with Skeleton rows
Responsive: horizontal scroll on narrow screens

Row Span Support:
| Monday    | 8:00 | 5:00 | Intro to XML      |
| (rowSpan) |      |      | Validity: DTD     |
| Tuesday   | 8:00 | 11:00| XPath             |
|           | 2:00 | 5:00 | XSL Transforms    |

Cell with rowSpan renders once, spans N rows visually
Adjacent rows skip that column position


Composition Examples
MetricGrid (using Grid + MetricCard)
GridLayout(columns=4, gap=space-4, density=comfortable)
  → Slot → MetricCard(label="GPU Util", value="87%", trend="up")
  → Slot → MetricCard(label="Memory", value="64GB", trend="neutral")
  → Slot → MetricCard(label="Power", value="320W", trend="down")
  → Slot → MetricCard(label="Temp", value="72°C", trend="up")
Dashboard Row (using Row-2-Wide-Left + components)
Row-2-Wide-Left(gap=space-4)
  → Slot → DataTable(gpu instances)
  → Slot → StackLayout(vertical, gap=space-4)
    → Slot → ResourceGauge(gpu-0)
    → Slot → ResourceGauge(gpu-1)
Form Layout (using Stack + FormField)
StackLayout(vertical, gap=space-4)
  → Slot → FormField(label="Instance Name", input=Input)
  → Slot → Row-2(gap=space-4)
    → Slot → FormField(label="GPU Type", input=Select)
    → Slot → FormField(label="Count", input=Input[number])
  → Slot → FormField(label="Notes", input=Textarea)

Build Order

Slot atom (placeholder)
Row-1 through Row-4 (fixed columns)
Row asymmetric variants
StackLayout
GridLayout with responsive breakpoints
TableCell (all variants)
TableRow (all variants)
TableHeader (with merge support)
TableBody
DataTable (full organism)


Rules

Layouts define STRUCTURE only — never hardcode content inside a layout component
All gaps use var(--space-*) tokens — no hardcoded pixel values
All borders use var(--border-default) or var(--border-strong)
Slot placeholders are design-time only — they do not render in production
Cell merging (colSpan/rowSpan) is a prop, not a separate component
Tables use <table> semantics for accessibility, styled with tokens
Every layout component must work in both light and dark mode
Test at 3 breakpoints: wide (1200+), medium (768-1199), narrow (<768)
