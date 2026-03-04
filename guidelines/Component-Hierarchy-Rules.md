Component Hierarchy Rules
How to classify and build components in the correct order.
Classification
Atom — Cannot be broken down further
Single-purpose UI element. One job. Accepts props for variants.
Examples: Button, Input, Checkbox, Badge, Avatar, Icon, Toggle, Separator, ProgressBar, DotIndicator, StatusDot, Tag, Label, Skeleton, Slider, Tooltip (simple)
Rules:

Lives in src/app/components/ui/
Uses ONLY var(--token) for all styling
Has props for: variant, size, state, disabled
Cannot import other ui/ components (except icons)
Showcase on Atoms page with tag "T1 · Atom"

Molecule — Group of 2+ atoms working together
Combines atoms into a reusable unit.
Examples: FormField (Label + Input + HelperText), TableCell (Avatar + Text + Badge), SearchBar (Input + Icon + Button), StatCard (Card + Text + Badge), StatusTag (Icon + Text + ColorDot), MigProfileTooltip (Card + List + StatusBar + Link)
Rules:

Lives in src/app/components/ui/
IMPORTS atoms from src/app/components/ui/ — never duplicates atom code
Uses var(--token) for spacing between atoms
Documents which atoms it contains (composition chips in showcase)
Showcase on Molecules page with tag "T2 · Molecule"

Organism — Complex section made of molecules + atoms
A complete, self-contained UI section.
Examples: DataTable (Toolbar + Header + Rows + Pagination), Dialog (Overlay + Card + Form + Buttons), Sidebar (Logo + NavItems + UserMenu), Form (multiple FormFields + ButtonGroup)
Rules:

Lives in src/app/components/ui/
IMPORTS molecules and atoms from src/app/components/ui/
Uses var(--token) for layout
Documents which molecules it contains
Showcase on Organisms page with tag "T3 · Organism"
Heavy organisms (DataTable, Chart) should load lazily — only render when selected

Template — Full page layout
Composes organisms into a complete page structure.
Examples: DashboardTemplate, TablePageTemplate, FormPageTemplate, DetailPageTemplate, EmptyStateTemplate
Rules:

Showcase on Templates page with tag "T4 · Template"
Shows realistic content using real components, not wireframe boxes

Quick Test
Ask: "Can I break this into smaller reusable pieces?"

NO → Atom
YES, into atoms → Molecule
YES, into molecules → Organism
YES, into organisms → Template

Build Order
ALWAYS build bottom-up: Atoms first → Molecules → Organisms → Templates
NEVER build an organism before its atoms and molecules exist.
Showcase Format
Every component on a showcase page shows:

Number + Name + Description
Tier tag (T1/T2/T3/T4)
Composition chips (molecules and organisms only)
All variants side by side
All sizes side by side
Interactive states (hover, focus, etc. work on interaction)
Props table