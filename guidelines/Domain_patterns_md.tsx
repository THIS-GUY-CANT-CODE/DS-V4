# Domain Patterns — GPU/Infrastructure Platform

> **Purpose**: UI patterns specific to GPU management, infrastructure monitoring, and resource allocation. Use alongside Design-Patterns.md (which covers generic patterns). Every pattern here references components from the design system.

---

## Pattern 1: GPU Instance Overview

**When to use**: Dashboard landing page showing fleet status at a glance.

**Layout**:
```
Row-2-Wide-Left(gap=space-4)
  Left (66%):
    StackLayout(vertical, gap=space-4)
      → Row-4: MetricCard × 4 (Total GPUs, Active, Idle, Error)
      → DataTable (instance list, compact, 5-10 rows visible)
  Right (33%):
    StackLayout(vertical, gap=space-4)
      → ResourceGauge (cluster-wide GPU utilization, ring)
      → ResourceGauge (cluster-wide memory utilization, ring)
      → IncidentBanner (if active incident, else hidden)
```

**Key behaviors**:
- MetricCards show real-time values with trend arrows
- DataTable rows are clickable → navigate to instance detail
- ResourceGauges update on polling interval (15s default)
- IncidentBanner appears/disappears with slide animation

**States**:
- Loading: Skeleton versions of all components
- Empty (no instances): EmptyStateTemplate with "Add your first GPU" CTA
- Error (API down): AlertBanner at top, stale data shown with "Last updated X ago" label

---

## Pattern 2: Instance Detail Page

**When to use**: Single GPU instance deep-dive.

**Layout**:
```
StackLayout(vertical, gap=space-6)
  → Breadcrumbs: Dashboard > Instances > [Instance Name]
  → Row-2(gap=space-4)
      Left: StackLayout(vertical)
        → Instance name (heading) + StatusDot + SeverityBadge
        → Tag row: GPU type, driver version, CUDA version
      Right: Action buttons (Restart, Migrate, Configure)
  → Tabs:
      Tab 1 "Overview":
        → Row-3: ResourceGauge(GPU) + ResourceGauge(Memory) + ResourceGauge(Power)
        → MetricGrid(columns=2): Temperature, Fan Speed, Clock, PCIe Bandwidth
      Tab 2 "MIG Profiles":
        → MIGProfileSelector
        → DataTable of current MIG instances
      Tab 3 "Logs":
        → LogViewer
      Tab 4 "Terminal":
        → TerminalOutput
```

**Key behaviors**:
- Tabs persist selection on page revisit (URL hash or local state)
- Resource gauges color-shift at thresholds (green→yellow→red)
- MIG tab shows visual slice representation of GPU memory
- Logs auto-scroll with toggle to pause
- Terminal shows recent command output, copy-to-clipboard on each block

**States**:
- Instance offline: Gauges show 0%, grayed out, banner says "Instance is offline"
- Instance rebooting: Spinner overlay on gauges, "Restarting..." status

---

## Pattern 3: GPU Allocation Flow

**When to use**: User requests new GPU resources.

**Component**: AllocationWizard (uses Stepper organism)

**Steps**:

```
Stepper(steps=4)
  Step 1 "Select GPU Type":
    → RadioGroup: GPU models (A100 80GB, H100, L40S, etc.)
    → Each radio shows: name, VRAM, availability count, price/hr
    → Unavailable options: disabled with "0 available" label
    
  Step 2 "Configure Resources":
    → FormField: Instance count (Input[number], min=1, max=available)
    → FormField: MIG Profile (Select, only shown for MIG-capable GPUs)
    → FormField: Priority (RadioGroup: Standard, High, Preemptible)
    → Live cost estimate updates in sidebar as user changes values
    
  Step 3 "Network & Storage":
    → FormField: VPC selection (Select)
    → FormField: Storage size (Slider, 50GB–2TB)
    → FormField: SSH Key (Select or paste)
    → Checkbox: Enable monitoring agent
    
  Step 4 "Review & Confirm":
    → Summary card with all selections
    → Cost breakdown table
    → Terms checkbox
    → "Allocate" primary button + "Back" secondary button
```

**Key behaviors**:
- Stepper shows completed/current/upcoming states
- Back button always available (except step 1)
- Validation runs on "Next" — blocks advance on error
- Cost estimate persists in sidebar across all steps
- On success: Toast confirmation + redirect to instance detail
- On failure: Error AlertBanner with retry button, stay on review step

---

## Pattern 4: Monitoring Dashboard

**When to use**: Real-time fleet health monitoring.

**Layout**:
```
StackLayout(vertical, gap=space-4)
  → Row-2(gap=space-4)
      Left: IncidentBanner (if active) or UptimeBar (90-day)
      Right: Polling indicator ("Live • Updated 3s ago") + Pause toggle
  → MetricGrid(columns=4):
      → MetricCard(Total Util %, sparkline)
      → MetricCard(Active Jobs, trend)
      → MetricCard(Queue Depth, trend)
      → MetricCard(Error Rate %, trend)
  → Row-2-Wide-Left(gap=space-4)
      Left (66%):
        → DataTable (instances, sortable by utilization/status/name)
            Columns: StatusDot | Name | GPU Type | Util% (ThresholdBar) | Memory (ThresholdBar) | Actions
      Right (33%):
        → StackLayout(vertical, gap=space-3)
          → StatusTimeline (last 10 events)
  → HealthDashboard (service grid: API, Scheduler, Storage, Network)
```

**Key behaviors**:
- Auto-refresh on 15s interval with visual pulse on data update
- Pause button stops polling (shows "Paused" badge)
- Click any MetricCard → expands to full chart view (modal or detail page)
- DataTable sorts by utilization descending by default
- StatusTimeline shows most recent first, color-coded by severity
- ThresholdBars in table cells give instant visual health read

**States**:
- All healthy: Green gauges, empty timeline message "No recent incidents"
- Degraded: Yellow MetricCards pulse gently, IncidentBanner appears
- Critical: Red MetricCards, IncidentBanner is P1/P2, timeline shows rapid events
- Polling error: AlertBanner "Connection lost, retrying..." with countdown

---

## Pattern 5: Bulk Operations

**When to use**: User needs to act on multiple instances at once (restart, migrate, delete).

**Layout**:
```
StackLayout(vertical, gap=space-4)
  → AlertBanner(info): "Select instances to perform bulk actions"
  → DataTable with checkbox column:
      → Header row has "Select All" checkbox
      → Each row has selection checkbox
      → Selected rows get var(--bg-brand) at 8% opacity highlight
  → StickyFooter (appears when ≥1 row selected):
      → Row: "[N] instances selected" text + action buttons
      → Buttons: Restart (warning), Migrate (default), Delete (error/destructive)
```

**Key behaviors**:
- Select All only selects visible/filtered rows
- Sticky footer slides up with enter animation when first selection made
- Destructive actions (Delete) require Confirmation Dialog:
  - Shows list of affected instance names
  - Requires typing "DELETE" to confirm
  - 5s cooldown on confirm button
- Non-destructive actions show simple confirmation modal
- Progress: Toast with progress bar during bulk operation
- On completion: Toast summary "3 of 3 instances restarted successfully"
- On partial failure: AlertBanner listing which instances failed and why

---

## Pattern 6: Alert & Incident Management

**When to use**: Viewing, acknowledging, and resolving infrastructure alerts.

**Layout**:
```
StackLayout(vertical, gap=space-4)
  → Tabs:
      Tab 1 "Active" (count badge):
        → DataTable:
            Columns: SeverityBadge | Title | Instance | Duration | Assigned | Actions
            Rows sorted by severity (P1 first), then duration (oldest first)
            Actions: Acknowledge, Assign, Resolve
      Tab 2 "Acknowledged":
        → Same table, filtered to acknowledged alerts
      Tab 3 "Resolved":
        → Same table, filtered to resolved, sorted by resolved time desc
      Tab 4 "Timeline":
        → StatusTimeline (all events, full history, filterable)
```

**Key behaviors**:
- Active tab shows count badge that updates in real-time
- P1 alerts have pulsing SeverityBadge (subtle, respects reduced-motion)
- Acknowledge: single-click, changes status, shows Toast confirmation
- Resolve: opens modal with resolution notes (Textarea) + root cause Select
- Clicking alert title → expands inline detail with: description, affected resources, runbook link
- Filters: by severity, instance, time range

---

## Pattern 7: Resource Scheduling

**When to use**: Planning GPU allocation across time (job queues, reservations).

**Layout**:
```
StackLayout(vertical, gap=space-4)
  → Row-2(gap=space-4)
      Left: DatePicker (range selection)
      Right: Toggle (View: List | Timeline)
  → If List view:
      DataTable:
        Columns: Job Name | GPU Type | Count | Start | End | Status | Priority
        Sortable, filterable
  → If Timeline view:
      Gantt-style horizontal bars:
        Y-axis: GPU instances
        X-axis: Time (hours or days depending on zoom)
        Bars colored by job/user
        Overlapping = conflict (red border)
```

**Key behaviors**:
- Toggle between list and timeline preserves filters
- Timeline supports zoom (scroll wheel or buttons: Hour, Day, Week)
- Hover on timeline bar shows Tooltip with job details
- Click bar → opens detail modal
- Conflicts highlighted with red dashed border + alert icon
- Empty time slots shown as subtle striped background

---

## Shared Sub-Patterns

### Polling Indicator
Used across monitoring views to show data freshness.

```
Components: StatusDot(success) + "Live" label + "Updated Xs ago" caption
Behavior: Dot pulses on each data refresh. Timer counts up between refreshes.
Pause: Toggle switch stops polling, dot turns gray, label changes to "Paused"
```

### Cost Estimator Sidebar
Used in allocation and scheduling flows.

```
Components: Card with StackLayout
  → "Estimated Cost" heading
  → Line items: resource × quantity × rate
  → Divider
  → Total (var(--text-title), var(--fg-primary), bold)
  → "per hour" or "per month" toggle
Behavior: Updates live as user changes form values. Uses var(--duration-fast) transition on number changes.
```

### Instance Status Row
Reusable row pattern across all tables that list instances.

```
Components: StatusDot | Text(name) | Badge(GPU type) | ThresholdBar(util) | ThresholdBar(mem) | Button(actions)
Hover: Row background → var(--bg-secondary)
Click: Navigate to instance detail
```

---

## Rules

1. **Every pattern uses design system components only** — no one-off styled divs
2. **Loading states are mandatory** — every pattern must define skeleton/loading appearance
3. **Error states are mandatory** — every pattern must handle API failure gracefully
4. **Empty states are mandatory** — every pattern must show helpful empty state, not blank space
5. **Real-time data shows freshness** — always indicate when data was last updated
6. **Destructive actions require confirmation** — always, no exceptions
7. **Bulk operations show progress** — never fire-and-forget
8. **All tables are sortable by default** — at minimum by name and status
9. **Mobile**: Tables switch to card layout on narrow screens; gauges stack vertically