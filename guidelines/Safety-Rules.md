# Safety Rules
# CRITICAL — Read before every action. These prevent destructive mistakes.

## NEVER Do These Things

1. NEVER delete files in src/app/components/ui/
2. NEVER move or rename files in src/app/components/ui/
3. NEVER use hardcoded hex colors (like #1DAF9C) — use var(--token-name)
4. NEVER use hardcoded pixel values for spacing — use var(--space-*)
5. NEVER use position: absolute for page layout — use flexbox
6. NEVER render Dialog/Sheet/Drawer with open backdrop on page load
7. NEVER render DropdownMenu/ContextMenu/CommandPalette in open state by default
8. NEVER render all organisms on one page simultaneously — use tabs or lazy loading
9. NEVER create product pages (Deployments, Users, Monitoring, Node Health, Data Volumes)
10. NEVER use Tailwind arbitrary values like bg-[#1DAF9C] or text-[#525866]
11. NEVER skip the audit phase — always list what exists vs what's missing BEFORE building
12. NEVER build a molecule before its atoms exist
13. NEVER build an organism before its molecules exist
14. NEVER duplicate atom code inside a molecule — import it

## ALWAYS Do These Things

1. ALWAYS import components from src/app/components/ui/
2. ALWAYS use var(--token-name) for colors, spacing, radius, shadows, sizes
3. ALWAYS show audit results and WAIT for approval before building
4. ALWAYS build bottom-up: atoms → molecules → organisms → templates
5. ALWAYS make components interactive (hover, click, focus respond to real interaction)
6. ALWAYS document which atoms a molecule contains
7. ALWAYS include a props table for every component
8. ALWAYS use flexbox with gap for layout spacing
9. ALWAYS keep overlay components (Dialog, Sheet, Drawer) closed by default — open on trigger click
10. ALWAYS use lazy/tab loading for heavy pages (Organisms) — render one component at a time

## Navigation — Allowed Pages Only

Sidebar contains ONLY:
1. Design Tokens
2. Atoms
3. Molecules
4. Organisms
5. Templates

Nothing else. No Deployments, Users, Monitoring, etc.

## Import Path

```tsx
// CORRECT
import { Button } from '../app/components/ui/button';

// WRONG — never import from these
import { Button } from '../atoms/button';
import { Button } from '../molecules/button';
```
