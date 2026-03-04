import React, { useState, useRef, useCallback, useMemo } from "react";
import {
  Typography, Avatar, BadgeLabel, BadgeDot, Tag, Button,
  TextInput, Select, Divider, Checkbox, Switch, Slider,
  ProgressBar, Skeleton, Icon, Stepper,
  GpuVendorIcon,
} from "../../atoms";
import type { GpuVendor, AcceleratorFill } from "../../atoms";
import {
  LegacyAlert as Alert,
  LegacySearchBar as SearchBar,
  LegacyFormField as FormField,
  LegacyStatCard as StatCard,
  LegacyCard as Card,
  LegacyTabs as Tabs,
  LegacyPagination as Pagination,
  FormSection,
  ListItem, AvatarGroup, FileUploadItem, ResourceStatRow,
  PageHeader, CheckboxBlock,
  EmptyState, Toast, DropdownMenu,
  GpuModelTag, GpuAllocationStepper, MigToggleRow, MigPartitionRow,
  GpuAllocationCard, AcceleratorGridCell, ResourceBarCell,
  NodeNameCell, StorageQuotaRow,
} from "../../molecules";
import type { DropdownItem, GpuAllocationCardProps, MigPartition, AcceleratorGridCellProps } from "../../molecules";
// New molecule imports for organisms 17-24
import { BreadcrumbNav, ToastStack, CommandPaletteFull, DateRangePicker, FileCard, MetricCard, NotificationItem as NotifItem, ActionBar } from "../../molecules";
import { SectionCard, TierHeader } from "../../docs/ComponentShowcase";
import { BaseTemplate } from "../../templates";

// ════════════════════════════════════════════════════════════════════════════
//  SHARED TYPES
// ════════════════════════════════════════════════════════════════════════════
type OrgSize = "sm" | "md" | "lg";

const dtCellPad: Record<OrgSize, string> = {
  sm: "var(--space-2) var(--space-3)",
  md: "var(--space-2) var(--space-4)",
  lg: "var(--space-3) var(--space-4)",
};
const drawerWidthVar: Record<OrgSize, string> = {
  sm: "var(--drawer-width-sm)", md: "var(--drawer-width-md)", lg: "var(--drawer-width-lg)",
};
const modalWidthVar: Record<OrgSize, string> = {
  sm: "var(--modal-width-sm)", md: "var(--modal-width-md)", lg: "var(--modal-width-lg)",
};

// ════════════════════════════════════════════════════════════════════════════
//  1. NAVBAR
// ════════════════════════════════════════════════════════════════════════════
interface NavBarProps { brand?: string; items?: string[]; activeIndex?: number; className?: string; }
/* export removed — canonical NavBar now at /src/organisms/NavBar/NavBar.tsx */
function NavBar({ brand="ICM+", items=["Admin Tools","Workspaces"], activeIndex=1, className }: NavBarProps) {
  return (
    <div className={className} style={{ display:"flex", alignItems:"center", justifyContent:"space-between", padding:"0 var(--space-4)", height:"var(--topnav-height-md)", background:"var(--bg-primary)", borderBottom:`var(--border-width-thin) solid var(--border-divider)`, boxShadow:"var(--shadow-sm)" }}>
      <div style={{ display:"flex", alignItems:"center", gap:"var(--space-6)" }}>
        <div style={{ display:"flex", alignItems:"center", gap:"var(--space-2)" }}>
          <div style={{ width:"var(--size-control-md)", height:"var(--size-control-md)", borderRadius:"var(--radius-sm-ds)", background:"var(--bg-brand)", display:"flex", alignItems:"center", justifyContent:"center" }}>
            <svg width="16" height="16" viewBox="0 0 18 18" fill="none">
              <rect x="1" y="1" width="7" height="7" rx="1.5" fill="var(--primary-foreground)"/>
              <rect x="10" y="1" width="7" height="7" rx="1.5" fill="var(--primary-foreground)" style={{ fillOpacity:"var(--opacity-logo-secondary)" }}/>
              <rect x="1" y="10" width="7" height="7" rx="1.5" fill="var(--primary-foreground)" style={{ fillOpacity:"var(--opacity-logo-secondary)" }}/>
              <rect x="10" y="10" width="7" height="7" rx="1.5" fill="var(--primary-foreground)" style={{ fillOpacity:"var(--opacity-subtle)" }}/>
            </svg>
          </div>
          <Typography variant="title" weight="bold" color="primary">{brand}</Typography>
        </div>
        {items.map((item, i) => (
          <Typography key={item} variant="body" weight={i===activeIndex?"semibold":"medium"} color={i===activeIndex?"brand":"secondary"} style={{ cursor:"pointer" }}>{item}</Typography>
        ))}
      </div>
      <div style={{ display:"flex", alignItems:"center", gap:"var(--space-3)" }}>
        <SearchBar width="var(--navbar-search-w)" size="sm" />
        <Typography variant="body" color="secondary" style={{ cursor:"pointer" }}>Docs</Typography>
        <Avatar size="sm" shape="circle" label="ME" />
      </div>
    </div>
  );
}

// ════════════════════════════════════════════════════════════════════════════
//  2. SIDE NAVIGATION
// ════════════════════════════════════════════════════════════════════════════
interface SideNavItem { label: string; active?: boolean; badge?: string; icon?: React.ReactNode; }
interface SideNavigationProps { title?: string; items: SideNavItem[]; footer?: React.ReactNode; width?: number|string; className?: string; }
/* export removed — canonical SideNavigation now at /src/organisms/SideNavigation/ */
function SideNavigation({ title, items, footer, width="var(--sidebar-ds-width-compact)", className }: SideNavigationProps) {
  return (
    <div className={className} style={{ width, display:"flex", flexDirection:"column", background:"var(--bg-primary)", borderRight:`var(--border-width-thin) solid var(--border-divider)`, boxShadow:"var(--shadow-sm)" }}>
      {title && <div style={{ padding:"var(--space-3) var(--space-4)", borderBottom:`var(--border-width-thin) solid var(--border-divider)` }}>
        <Typography variant="label" weight="bold" color="disabled" mono style={{ letterSpacing:"var(--letter-spacing-tracking-lg)", textTransform:"uppercase" as const }}>{title}</Typography>
      </div>}
      <div style={{ flex:1, padding:"var(--space-2)", display:"flex", flexDirection:"column", gap:"var(--sidebar-item-gap)" }}>
        {items.map(item => (
          <div key={item.label} style={{ display:"flex", alignItems:"center", gap:"var(--sidebar-item-icon-gap)", padding:`0 var(--sidebar-item-padding-x)`, height:"var(--sidebar-item-height)", borderRadius:"var(--sidebar-item-radius)", cursor:"pointer", background:item.active?"var(--sidebar-item-bg-active)":"transparent", color:item.active?"var(--sidebar-item-fg-active)":"var(--sidebar-item-fg)" }}>
            {item.icon && <span style={{ display:"flex", flexShrink:0 }}>{item.icon}</span>}
            <Typography variant="body" weight={item.active?"semibold":"regular"} color={item.active?"brand":"secondary"} style={{ flex:1 }}>{item.label}</Typography>
            {item.badge && <BadgeLabel label={item.badge} variant={item.active?"primary":"neutral"} size="sm" />}
          </div>
        ))}
      </div>
      {footer && <div style={{ padding:"var(--space-3)", borderTop:`var(--border-width-thin) solid var(--border-divider)` }}>{footer}</div>}
    </div>
  );
}

// ════════════════════════════════════════════════════════════════════════════
//  3. DATA TABLE
// ════════════════════════════════════════════════════════════════════════════
interface Column { key: string; title: string; render?: (val: any, row: any) => React.ReactNode; width?: number; }
interface DataTableProps { title?: string; columns: Column[]; data: Record<string,any>[]; rowKey?: string; actions?: React.ReactNode; pagination?: { current: number; total: number }; size?: OrgSize; className?: string; }
/* export removed — canonical DataTable now at /src/organisms/DataTable/ */
function DataTable({ title, columns, data, rowKey="id", actions, pagination, size="md", className }: DataTableProps) {
  return (
    <div className={className} style={{ background:"var(--card-ds-bg)", border:`var(--border-width-thin) solid var(--card-ds-border)`, borderRadius:"var(--radius-md-ds)", boxShadow:"var(--shadow-sm)", overflow:"hidden" }}>
      {(title||actions) && (
        <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", padding:"var(--space-3) var(--space-4)", borderBottom:`var(--border-width-thin) solid var(--border-divider)` }}>
          {title && <Typography variant="title" weight="semibold" color="primary">{title}</Typography>}
          {actions && <div style={{ display:"flex", gap:"var(--space-2)" }}>{actions}</div>}
        </div>
      )}
      <div style={{ overflowX:"auto" as const }}>
        <table style={{ width:"100%", borderCollapse:"collapse" as const, fontFamily:"var(--font-family-primary)" }}>
          <thead>
            <tr style={{ borderBottom:`var(--border-width-thin) solid var(--border-divider)`, background:"var(--table-header-bg)" }}>
              {columns.map(col => (
                <th key={col.key} style={{ textAlign:"left" as const, padding:dtCellPad[size], fontSize:"var(--text-caption)", fontWeight:"var(--font-weight-medium)" as any, color:"var(--fg-tertiary)", width:col.width }}>
                  {col.title}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.map((row, ri) => (
              <tr key={row[rowKey]??ri} style={{ borderBottom:`var(--border-width-thin) solid var(--border-divider)` }}>
                {columns.map(col => (
                  <td key={col.key} style={{ padding:dtCellPad[size], fontSize:"var(--text-base)", color:"var(--fg-primary)" }}>
                    {col.render ? col.render(row[col.key], row) : row[col.key]}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {pagination && (
        <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", padding:"var(--space-3) var(--space-4)", borderTop:`var(--border-width-thin) solid var(--border-divider)`, background:"var(--bg-flush)" }}>
          <Typography variant="label" color="tertiary">Showing 1–{data.length} of {pagination.total}</Typography>
          <Pagination current={pagination.current} total={Math.ceil(pagination.total/data.length)} size="sm" />
        </div>
      )}
    </div>
  );
}

// ════════════════════════════════════════════════════════════════════════════
//  4. DRAWER
// ════════════════════════════════════════════════════════════════════════════
interface DrawerProps { title: string; size?: OrgSize; open?: boolean; onClose?: () => void; children: React.ReactNode; footer?: React.ReactNode; backLabel?: string; className?: string; }
/* export removed — canonical Drawer now at /src/organisms/Drawer/ */
function Drawer({ title, size="md", open=true, onClose, children, footer, backLabel, className }: DrawerProps) {
  if (!open) return null;
  return (
    <div className={className} style={{ width:drawerWidthVar[size], display:"flex", flexDirection:"column", background:"var(--drawer-bg)", border:`var(--border-width-thin) solid var(--drawer-border)`, borderRadius:"var(--radius-md-ds)", boxShadow:"var(--shadow-xl)", overflow:"hidden", maxHeight:"var(--drawer-panel-max-h)" }}>
      <div style={{ display:"flex", alignItems:"center", gap:"var(--space-2)", padding:"var(--space-4) var(--space-6)", borderBottom:`var(--border-width-thin) solid var(--border-divider)`, flexShrink:0 }}>
        {backLabel && <svg width="16" height="16" viewBox="0 0 16 16" fill="none" style={{ cursor:"pointer", flexShrink:0 }}><path d="M10 4L6 8L10 12" stroke="var(--icon-secondary)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>}
        <Typography variant="title" weight="semibold" color="primary" style={{ flex:1 }}>{title}</Typography>
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none" style={{ cursor:"pointer", flexShrink:0 }} onClick={onClose}><path d="M3 3L11 11M11 3L3 11" stroke="var(--icon-tertiary)" strokeWidth="1.5" strokeLinecap="round"/></svg>
      </div>
      <div style={{ flex:1, overflow:"auto", padding:"var(--space-6)" }}>{children}</div>
      {footer && (
        <div style={{ display:"flex", justifyContent:"flex-end", gap:"var(--space-2)", padding:"var(--space-3) var(--space-6)", borderTop:`var(--border-width-thin) solid var(--border-divider)`, flexShrink:0 }}>{footer}</div>
      )}
    </div>
  );
}

// ════════════════════════════════════════════════════════════════════════════
//  5. MODAL
// ════════════════════════════════════════════════════════════════════════════
interface ModalProps { title: string; size?: OrgSize; open?: boolean; onClose?: () => void; children: React.ReactNode; footer?: React.ReactNode; className?: string; }
/* export removed — canonical Modal now at /src/organisms/Modal/ */
function Modal({ title, size="md", open=true, onClose, children, footer, className }: ModalProps) {
  if (!open) return null;
  return (
    <div className={className} style={{ width:modalWidthVar[size], background:"var(--modal-bg)", border:`var(--border-width-thin) solid var(--modal-border)`, borderRadius:"var(--modal-radius)", boxShadow:"var(--shadow-xl)", overflow:"hidden" }}>
      <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", padding:"var(--space-4) var(--space-6)", borderBottom:`var(--border-width-thin) solid var(--border-divider)` }}>
        <Typography variant="title" weight="semibold" color="primary">{title}</Typography>
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none" style={{ cursor:"pointer" }} onClick={onClose}><path d="M3 3L11 11M11 3L3 11" stroke="var(--icon-tertiary)" strokeWidth="1.5" strokeLinecap="round"/></svg>
      </div>
      <div style={{ padding:"var(--space-6)", maxHeight:"var(--panel-content-max-h)", overflow:"auto" }}>{children}</div>
      {footer && <div style={{ display:"flex", justifyContent:"flex-end", gap:"var(--space-2)", padding:"var(--space-3) var(--space-6)", borderTop:`var(--border-width-thin) solid var(--border-divider)`, background:"var(--bg-flush)" }}>{footer}</div>}
    </div>
  );
}

// ════════════════════════════════════════════════════════════════════════════
//  6. PROFILE CARD
// ════════════════════════════════════════════════════════════════════════════
interface ProfileCardProps { name: string; role: string; email?: string; stats?: { label: string; value: string }[]; className?: string; }
/* export removed — canonical ProfileCard now at /src/organisms/ProfileCard/ */
function ProfileCard({ name, role, email, stats=[], className }: ProfileCardProps) {
  return (
    <div className={className} style={{ background:"var(--card-ds-bg)", border:`var(--border-width-thin) solid var(--card-ds-border)`, borderRadius:"var(--radius-md-ds)", overflow:"hidden", boxShadow:"var(--shadow-sm)", width:"var(--card-profile-width)" }}>
      <div style={{ height:"var(--card-img-header-h)", background:`linear-gradient(135deg, var(--card-header-grad-from), var(--card-header-grad-to))` }} />
      <div style={{ padding:"0 var(--space-4) var(--space-4)" }}>
        <div style={{ display:"flex", alignItems:"flex-end", justifyContent:"space-between", marginTop:"calc(-1 * var(--space-6))", marginBottom:"var(--space-3)" }}>
          <Avatar size="lg" shape="circle" label={name.split(" ").map(s=>s[0]).join("")} style={{ border:`var(--border-width-medium) solid var(--bg-primary)` }} />
          <Button variant="secondary" size="sm">Message</Button>
        </div>
        <Typography variant="title" weight="semibold" color="primary">{name}</Typography>
        <Typography variant="label" color="secondary" style={{ marginTop:"var(--space-half)" }}>{role}</Typography>
        {email && <Typography variant="label" color="brand" style={{ marginTop:"var(--space-half)" }}>{email}</Typography>}
        {stats.length > 0 && (
          <div style={{ display:"contents" }}>
            <Divider style={{ margin:"var(--space-3) 0" }} />
            <div style={{ display:"flex", gap:"var(--space-4)" }}>
              {stats.map(s => (
                <div key={s.label}>
                  <Typography variant="title" weight="bold" color="primary">{s.value}</Typography>
                  <Typography variant="micro" color="tertiary">{s.label}</Typography>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// ════════════════════════════════════════════════════════════════════════════
//  7. SETTINGS FORM
// ════════════════════════════════════════════════════════════════════════════
interface SettingsFormProps { className?: string; }
export function SettingsForm({ className }: SettingsFormProps) {
  return (
    <div className={className} style={{ display:"flex", flexDirection:"column", gap:"var(--space-6)" }}>
      <FormSection title="Account" description="Manage your account information.">
        <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:"var(--space-4)" }}>
          <FormField label="Full name" required><TextInput value="Sarah Chen" /></FormField>
          <FormField label="Email" required><TextInput value="sarah@example.com" /></FormField>
        </div>
        <FormField label="Bio"><TextInput placeholder="Tell us about yourself…" /></FormField>
      </FormSection>
      <FormSection title="Notifications" description="Choose what you'd like to be notified about.">
        <div style={{ display:"flex", flexDirection:"column", gap:"var(--space-3)" }}>
          <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between" }}>
            <div><Typography variant="body" weight="medium" color="primary">Email alerts</Typography><Typography variant="label" color="secondary">Receive critical alerts via email.</Typography></div>
            <Switch checked size="md" />
          </div>
          <Divider />
          <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between" }}>
            <div><Typography variant="body" weight="medium" color="primary">Marketing emails</Typography><Typography variant="label" color="secondary">Product updates and announcements.</Typography></div>
            <Switch size="md" />
          </div>
        </div>
      </FormSection>
      <div style={{ display:"flex", justifyContent:"flex-end", gap:"var(--space-2)" }}>
        <Button variant="secondary">Cancel</Button>
        <Button variant="primary">Save changes</Button>
      </div>
    </div>
  );
}

// ════════════════════════════════════════════════════════════════════════════
//  8. PRICING CARDS
// ════════════════════════════════════════════════════════════════════════════
interface PricePlan { name: string; price: string; period?: string; features: string[]; cta: string; highlight?: boolean; badge?: string; }
interface PricingCardsProps { plans?: PricePlan[]; className?: string; }
export function PricingCards({ plans, className }: PricingCardsProps) {
  const defaultPlans: PricePlan[] = [
    { name:"Free", price:"$0", period:"/mo", features:["Up to 3 models","1 workspace","Community support"], cta:"Get started" },
    { name:"Pro", price:"$49", period:"/mo", features:["Unlimited models","5 workspaces","Priority support","Advanced analytics"], cta:"Start trial", highlight:true, badge:"Most popular" },
    { name:"Enterprise", price:"Custom", features:["Unlimited everything","SLA guarantee","Dedicated CSM","On-prem available"], cta:"Contact us" },
  ];
  const p = plans ?? defaultPlans;
  return (
    <div className={className} style={{ display:"grid", gridTemplateColumns:`repeat(${p.length}, 1fr)`, gap:"var(--space-4)" }}>
      {p.map(plan => (
        <div key={plan.name} style={{ background:"var(--card-ds-bg)", border:`var(--border-width-thin) solid ${plan.highlight?"var(--border-focus)":"var(--card-ds-border)"}`, borderRadius:"var(--radius-md-ds)", padding:"var(--space-6)", display:"flex", flexDirection:"column", gap:"var(--space-3)", boxShadow:plan.highlight?"var(--shadow-md)":"var(--shadow-sm)" }}>
          <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between" }}>
            <Typography variant="title" weight="semibold" color={plan.highlight?"brand":"primary"}>{plan.name}</Typography>
            {plan.badge && <BadgeLabel label={plan.badge} variant="primary" size="sm" />}
          </div>
          <div style={{ display:"flex", alignItems:"baseline", gap:"var(--space-1)" }}>
            <Typography variant="h4" weight="bold" color="primary" display>{plan.price}</Typography>
            {plan.period && <Typography variant="label" color="tertiary">{plan.period}</Typography>}
          </div>
          <Divider />
          <div style={{ display:"flex", flexDirection:"column", gap:"var(--space-2)", flex:1 }}>
            {plan.features.map(f => (
              <div key={f} style={{ display:"flex", alignItems:"center", gap:"var(--space-2)" }}>
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M2.5 7L5.5 10L11.5 4" stroke="var(--status-healthy)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                <Typography variant="body" color="secondary">{f}</Typography>
              </div>
            ))}
          </div>
          <Button variant={plan.highlight?"primary":"secondary"} fullWidth>{plan.cta}</Button>
        </div>
      ))}
    </div>
  );
}

// ════════════════════════════════════════════════════════════════════════════
//  9. COMMENT THREAD
// ════════════════════════════════════════════════════════════════════════════
interface Comment { author: string; text: string; time: string; replies?: Comment[]; }
interface CommentThreadProps { comments?: Comment[]; className?: string; }
/* export removed — canonical CommentThread now at /src/organisms/CommentThread/ */
function CommentThread({ comments, className }: CommentThreadProps) {
  const defaultComments: Comment[] = [
    { author:"Sarah Chen", text:"The deployment looks stable. All health checks passed.", time:"2h ago", replies:[{ author:"Marcus W.", text:"Agreed — latency is back to normal.", time:"1h ago" }] },
    { author:"Aisha Patel", text:"Should we roll back the cache layer change?", time:"3h ago" },
  ];
  const c = comments ?? defaultComments;
  const CommentItem = ({ comment, nested }: { comment: Comment; nested?: boolean }) => (
    <div style={{ display:"flex", gap:"var(--space-3)", paddingLeft:nested?"var(--space-8)":undefined }}>
      <Avatar size="sm" shape="circle" label={comment.author.split(" ").map(s=>s[0]).join("")} style={{ flexShrink:0, marginTop:"var(--space-half)" }} />
      <div style={{ flex:1 }}>
        <div style={{ display:"flex", alignItems:"center", gap:"var(--space-2)" }}>
          <Typography variant="label" weight="semibold" color="primary">{comment.author}</Typography>
          <Typography variant="micro" color="tertiary">{comment.time}</Typography>
        </div>
        <Typography variant="body" color="secondary" style={{ marginTop:"var(--space-1)" }}>{comment.text}</Typography>
        {comment.replies?.map((r,i) => <div key={i} style={{ marginTop:"var(--space-3)" }}><CommentItem comment={r} nested /></div>)}
      </div>
    </div>
  );
  return (
    <div className={className} style={{ background:"var(--card-ds-bg)", border:`var(--border-width-thin) solid var(--card-ds-border)`, borderRadius:"var(--radius-md-ds)", overflow:"hidden" }}>
      <div style={{ padding:"var(--space-4) var(--space-6)", borderBottom:`var(--border-width-thin) solid var(--border-divider)` }}>
        <Typography variant="title" weight="semibold" color="primary">Discussion</Typography>
      </div>
      <div style={{ padding:"var(--space-4) var(--space-6)", display:"flex", flexDirection:"column", gap:"var(--space-4)" }}>
        {c.map((comment, i) => (
          <div key={i} style={{ display:"contents" }}>
            {i > 0 && <Divider />}
            <CommentItem comment={comment} />
          </div>
        ))}
        <Divider />
        <div style={{ display:"flex", gap:"var(--space-3)" }}>
          <Avatar size="sm" shape="circle" label="ME" style={{ flexShrink:0 }} />
          <div style={{ flex:1, display:"flex", gap:"var(--space-2)" }}>
            <TextInput placeholder="Add a comment…" style={{ flex:1 }} />
            <Button variant="primary" size="sm">Post</Button>
          </div>
        </div>
      </div>
    </div>
  );
}

// ════════════════════════════════════════════════════════════��═══════════════
//  10. STATS ROW
// ════════════════════════════════════════════════════════════════════════════
interface StatsRowProps { stats?: { label: string; value: string; change?: string; changeType?: "up"|"down"; icon?: React.ReactNode }[]; className?: string; }
/* export removed — canonical StatsRow now at /src/organisms/StatsRow/ */
function StatsRow({ stats, className }: StatsRowProps) {
  const defaultStats = [
    { label:"Active Models", value:"142", change:"12%", changeType:"up" as const, icon:<Icon name="grid" size="sm" color="brand" /> },
    { label:"Workspaces", value:"38", change:"5%", changeType:"up" as const, icon:<Icon name="folder" size="sm" color="brand" /> },
    { label:"GPU Utilization", value:"76%", change:"3%", changeType:"down" as const, icon:<Icon name="settings" size="sm" color="brand" /> },
    { label:"Avg. Job Duration", value:"4m 12s", icon:<Icon name="clock" size="sm" color="brand" /> },
  ];
  const s = stats ?? defaultStats;
  return (
    <div className={className} style={{ display:"grid", gridTemplateColumns:`repeat(${s.length}, 1fr)`, gap:"var(--space-4)" }}>
      {s.map(stat => <StatCard key={stat.label} label={stat.label} value={stat.value} change={stat.change} changeType={stat.changeType} icon={stat.icon} />)}
    </div>
  );
}

// ════════════════════════════════════════════════════════════════════════════
//  11. ACTIVITY FEED
// ════════════════════════════════════════════════════════════════════════════
interface ActivityItem { actor: string; action: string; target?: string; time: string; type?: "created"|"updated"|"deleted"|"deployed"|"failed"|"info"; }
interface ActivityFeedProps { items?: ActivityItem[]; className?: string; }
/* export removed — canonical ActivityFeed now at /src/organisms/ActivityFeed/ */
function ActivityFeed({ items, className }: ActivityFeedProps) {
  const typeColor: Record<string, string> = { created:"var(--status-healthy)", updated:"var(--primary)", deleted:"var(--status-unhealthy)", deployed:"var(--primary)", failed:"var(--status-unhealthy)", info:"var(--fg-disabled)" };
  const defaultItems: ActivityItem[] = [
    { actor:"Sarah C.", action:"deployed", target:"gpt-base-v2", time:"2m ago", type:"deployed" },
    { actor:"System", action:"failed health check on", target:"worker-pool-3", time:"15m ago", type:"failed" },
    { actor:"Marcus W.", action:"created workspace", target:"Vision Experiments", time:"1h ago", type:"created" },
    { actor:"Aisha P.", action:"updated config for", target:"inference-cluster", time:"2h ago", type:"updated" },
  ];
  const data = items ?? defaultItems;
  return (
    <div className={className} style={{ background:"var(--card-ds-bg)", border:`var(--border-width-thin) solid var(--card-ds-border)`, borderRadius:"var(--radius-md-ds)", overflow:"hidden" }}>
      <div style={{ padding:"var(--space-3) var(--space-4)", borderBottom:`var(--border-width-thin) solid var(--border-divider)` }}>
        <Typography variant="title" weight="semibold" color="primary">Activity</Typography>
      </div>
      <div>
        {data.map((item, i) => (
          <div key={i} style={{ display:"flex", alignItems:"center", gap:"var(--space-3)", padding:"var(--space-3) var(--space-4)", borderBottom:i<data.length-1?`var(--border-width-thin) solid var(--border-divider)`:undefined }}>
            <div style={{ width:"var(--size-dot-md)", height:"var(--size-dot-md)", borderRadius:"var(--radius-full)", background:typeColor[item.type??"info"], flexShrink:0 }} />
            <Avatar size="sm" shape="circle" label={item.actor.split(" ").map(s=>s[0]).join("")} />
            <div style={{ flex:1, minWidth:0 }}>
              <Typography variant="body" color="primary" truncate>
                <span style={{ fontWeight:"var(--font-weight-semibold)" as any }}>{item.actor}</span>
                {" "}{item.action}{" "}
                {item.target && <span style={{ color:"var(--fg-brand)", fontWeight:"var(--font-weight-medium)" as any }}>{item.target}</span>}
              </Typography>
            </div>
            <Typography variant="micro" color="tertiary" style={{ flexShrink:0, whiteSpace:"nowrap" as const }}>{item.time}</Typography>
          </div>
        ))}
      </div>
    </div>
  );
}

// ════════════════════════════════════════════════════════════════════════════
//  12. PRODUCT CARD
// ══════════════════════════════════════════════════���═══��═════════════════════
interface ProductCardProps { variant?: "model"|"workspace"; title: string; description?: string; tags?: string[]; meta?: string; date?: string; resources?: { label: string; value: string; icon?: React.ReactNode }[]; avatar?: React.ReactNode; action?: string; onAction?: () => void; className?: string; }
export function ProductCard({ variant="model", title, description, tags=[], meta, date, resources=[], avatar, action, onAction, className }: ProductCardProps) {
  return (
    <div className={className} style={{ background:"var(--card-ds-bg)", border:`var(--border-width-thin) solid var(--card-ds-border)`, borderRadius:"var(--radius-md-ds)", boxShadow:"var(--shadow-sm)", display:"flex", flexDirection:"column", overflow:"hidden" }}>
      <div style={{ padding:"var(--space-4) var(--space-4) 0" }}>
        <div style={{ display:"flex", alignItems:"flex-start", gap:"var(--space-3)" }}>
          {avatar || (
            <div style={{ width:"var(--size-icon-container)", height:"var(--size-icon-container)", borderRadius:"var(--radius-sm-ds)", background:"var(--bg-brand-subtle)", display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0 }}>
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                <rect x="1" y="1" width="7" height="7" rx="1.5" fill="var(--fg-brand)"/>
                <rect x="10" y="1" width="7" height="7" rx="1.5" fill="var(--fg-brand)" style={{ fillOpacity:"var(--opacity-muted)" }}/>
                <rect x="1" y="10" width="7" height="7" rx="1.5" fill="var(--fg-brand)" style={{ fillOpacity:"var(--opacity-muted)" }}/>
                <rect x="10" y="10" width="7" height="7" rx="1.5" fill="var(--fg-brand)" style={{ fillOpacity:"var(--opacity-subtle)" }}/>
              </svg>
            </div>
          )}
          <div style={{ flex:1, minWidth:0 }}>
            <Typography variant="body" weight="semibold" color="primary" truncate>{title}</Typography>
            {date && <Typography variant="label" color="tertiary">{date}</Typography>}
          </div>
        </div>
        {tags.length > 0 && (
          <div style={{ display:"flex", gap:"var(--space-1)", flexWrap:"wrap" as const, marginTop:"var(--space-2)" }}>
            {tags.slice(0, 3).map((t,i) => <Tag key={i} label={t} variant="primary" size="sm" />)}
            {tags.length > 3 && <BadgeLabel label={`+${tags.length-3}`} variant="neutral" size="sm" />}
          </div>
        )}
      </div>
      {variant==="workspace" && resources.length>0 && (
        <div style={{ padding:"var(--space-2) var(--space-4)", display:"flex", flexWrap:"wrap" as const, gap:"var(--space-1) var(--space-3)", borderTop:`var(--border-width-thin) solid var(--border-divider)`, marginTop:"var(--space-2)" }}>
          {resources.map(r => <ResourceStatRow key={r.label} icon={r.icon} label={r.label} value={r.value} />)}
        </div>
      )}
      {description && (
        <div style={{ padding:"var(--space-2) var(--space-4)", flex:1 }}>
          <Typography variant="body" color="secondary" style={{ display:"-webkit-box", WebkitLineClamp:2, WebkitBoxOrient:"vertical" as any, overflow:"hidden" }}>{description}</Typography>
        </div>
      )}
      {action && (
        <div style={{ padding:"0 var(--space-4) var(--space-4)", marginTop:"auto" }}>
          <Button variant="secondary" fullWidth onClick={onAction} style={{ marginTop:"var(--space-3)" }}>{action}</Button>
        </div>
      )}
    </div>
  );
}

// ════════════════════════════════════════════════════════════════════════════
//  13. CARD GRID
// ════════════════════════════════════════════════════════════════════════════
interface CardGridProps { columns?: 1|2|3; gap?: string; children: React.ReactNode; className?: string; }
/* export removed — canonical CardGrid now at /src/organisms/CardGrid/ */
function CardGrid({ columns=2, gap="var(--space-4)", children, className }: CardGridProps) {
  return <div className={className} style={{ display:"grid", gridTemplateColumns:`repeat(${columns}, 1fr)`, gap }}>{children}</div>;
}

// ════════════════════════════════════════════════════════════════════════════
//  14. IMPORT DRAWER
// ════════════════════════════════════════════════════════════════════════════
interface ImportFile { name: string; size: string; progress?: number; status?: "idle"|"uploading"|"complete"|"error"; }
interface ImportDrawerProps { files?: ImportFile[]; uploading?: boolean; size?: OrgSize; className?: string; }
export function ImportDrawer({ files=[], uploading=false, size="md", className }: ImportDrawerProps) {
  return (
    <BaseTemplate
      width={size}
      className={className}
      header={
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", width: "100%" }}>
          <Typography variant="title" weight="semibold" color="primary">Import</Typography>
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none" style={{ cursor: "pointer", flexShrink: 0 }}><path d="M3 3L11 11M11 3L3 11" stroke="var(--icon-tertiary)" strokeWidth="1.5" strokeLinecap="round"/></svg>
        </div>
      }
      footer={
        <>
          <Button variant="secondary">Cancel</Button>
          <Button variant="primary" disabled={uploading}>Upload</Button>
        </>
      }
    >
      <div style={{ display:"flex", flexDirection:"column", gap:"var(--space-6)" }}>
        <div style={{ display:"flex", gap:"var(--space-4)" }}>
          <FormField label="Source" required size="md" style={{ flex:1 }}><Select placeholder="File Upload" value="File Upload" options={[{label:"File Upload",value:"File Upload"}]} size="md" /></FormField>
          <FormField label="Destination" size="md" style={{ flex:1 }}><TextInput placeholder="/" value="/" size="md" /></FormField>
        </div>
        <div style={{ border:`var(--border-width-medium) dashed var(--border-default)`, borderRadius:"var(--radius-md-ds)", padding:"var(--space-12) var(--space-6)", textAlign:"center" as const, display:"flex", flexDirection:"column", alignItems:"center", gap:"var(--space-2)", background:"var(--bg-secondary)" }}>
          <Icon name="upload" size="lg" color="brand" />
          <Typography variant="body" color="secondary">Click or drag to this area to upload</Typography>
          <Typography variant="label" color="tertiary">Maximum file size: 500 MB</Typography>
        </div>
        {files.length > 0 && (
          <div style={{ border:`var(--border-width-thin) solid var(--border-divider)`, borderRadius:"var(--radius-sm-ds)", overflow:"hidden" }}>
            {files.map((f,i) => <FileUploadItem key={i} filename={f.name} fileSize={f.size} progress={f.progress} status={f.status} onRemove={() => {}} />)}
          </div>
        )}
        <Alert type="info" message={uploading?"Uploading in progress, do not close the window.":"Uploading will overwrite existing files in the destination folder."} closable size="sm" />
      </div>
    </BaseTemplate>
  );
}

// ══════════════════════════════════════════��═════════════════════════════════
//  15. EXPORT DRAWER
// ═══════════════════════════════════════════════════════════════════���════════
export function ExportDrawer({ className }: { className?: string }) {
  return (
    <BaseTemplate
      width="lg"
      className={className}
      header={
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", width: "100%" }}>
          <Typography variant="title" weight="semibold" color="primary">Export</Typography>
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none" style={{ cursor: "pointer", flexShrink: 0 }}><path d="M3 3L11 11M11 3L3 11" stroke="var(--icon-tertiary)" strokeWidth="1.5" strokeLinecap="round"/></svg>
        </div>
      }
      footer={
        <>
          <Button variant="secondary">Cancel</Button>
          <Button variant="primary">Export</Button>
        </>
      }
    >
      <div style={{ display:"flex", flexDirection:"column", gap:"var(--space-6)" }}>
        <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:"var(--space-4)" }}>
          <FormField label="Format" required><Select value="csv" options={[{label:"CSV",value:"csv"},{label:"JSON",value:"json"},{label:"Parquet",value:"parquet"}]} /></FormField>
          <FormField label="Compression"><Select placeholder="None" options={[{label:"None",value:"none"},{label:"gzip",value:"gzip"},{label:"zstd",value:"zstd"}]} /></FormField>
          <FormField label="Date range"><TextInput placeholder="Last 30 days" /></FormField>
          <FormField label="Output path"><TextInput placeholder="/exports/" /></FormField>
        </div>
        <Alert type="warning" message="Large exports may take several minutes to complete." size="sm" />
      </div>
    </BaseTemplate>
  );
}

// ════════════════════════════════════════════════════════════════════════════
//  16. FORM WIZARD
// ═══════════════════════��════════════════════════════════════════════════════
export function FormWizard({ className }: { className?: string }) {
  const steps = [
    { label:"Basics", status:"complete" as const },
    { label:"Configuration", status:"active" as const },
    { label:"Resources", status:"pending" as const },
    { label:"Review", status:"pending" as const },
  ];
  return (
    <div className={className} style={{ background:"var(--card-ds-bg)", border:`var(--border-width-thin) solid var(--card-ds-border)`, borderRadius:"var(--radius-md-ds)", overflow:"hidden", boxShadow:"var(--shadow-sm)" }}>
      <div style={{ padding:"var(--space-4) var(--space-6)", borderBottom:`var(--border-width-thin) solid var(--border-divider)` }}>
        <Typography variant="title" weight="semibold" color="primary">Create Model</Typography>
      </div>
      <div style={{ padding:"var(--space-6) var(--space-6) var(--space-4)" }}>
        <Stepper steps={steps} direction="horizontal" />
      </div>
      <Divider />
      <div style={{ padding:"var(--space-6)", display:"flex", flexDirection:"column", gap:"var(--space-4)" }}>
        <Typography variant="heading" weight="semibold" color="primary">Configuration</Typography>
        <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:"var(--space-4)" }}>
          <FormField label="Framework" required><Select value="pytorch" options={[{label:"PyTorch",value:"pytorch"},{label:"TensorFlow",value:"tensorflow"}]} /></FormField>
          <FormField label="Python version"><Select value="3.11" options={[{label:"3.11",value:"3.11"},{label:"3.10",value:"3.10"}]} /></FormField>
          <FormField label="Batch size" helperText="Recommended: 32–128"><TextInput value="64" /></FormField>
          <FormField label="Learning rate"><TextInput value="0.001" /></FormField>
        </div>
        <FormField label="Use mixed precision">
          <div style={{ display:"flex", alignItems:"center", gap:"var(--space-3)" }}>
            <Switch checked size="md" />
            <Typography variant="body" color="secondary">Enable FP16 training for faster throughput.</Typography>
          </div>
        </FormField>
      </div>
      <div style={{ display:"flex", justifyContent:"space-between", padding:"var(--space-4) var(--space-6)", borderTop:`var(--border-width-thin) solid var(--border-divider)`, background:"var(--bg-flush)" }}>
        <Button variant="secondary" icon={<svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M8 2L4 6L8 10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>}>Back</Button>
        <div style={{ display:"flex", gap:"var(--space-2)" }}>
          <Button variant="ghost">Save draft</Button>
          <Button variant="primary" icon={<svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M4 2L8 6L4 10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>} iconPosition="right">Continue</Button>
        </div>
      </div>
    </div>
  );
}

// ════════════════════════════════════════════════════════════════════════════
//  SHARED TYPE  — NotificationItem (used by NotificationPanelOrg + consumers)
// ════════════════════════════════════════════════════════════════════════════
export interface NotificationItem { id: string; title: string; description?: string; time: string; read?: boolean; type?: "info"|"success"|"warning"|"error"; }

// ════════════════════════════════════════════════════════════════════════════
//  17. NOTIFICATION PANEL (enhanced with tabs)
// ════════════════════════════════════════════════════════════���═══════════════
export function NotificationPanelOrg() {
  const notifData = [
    {id:"n1",title:"Sarah Chen mentioned you",description:"@you can you review the latest deployment config?",time:"2m ago",read:false,avatarLabel:"SC"},
    {id:"n2",title:"Deployment succeeded",description:"gpt-base-v2 is live in production",time:"14m ago",read:false,avatarLabel:"CI"},
    {id:"n3",title:"Aisha left a comment",description:"The latency numbers look great! Ready to merge.",time:"1h ago",read:true,avatarLabel:"AK"},
    {id:"n4",title:"Training complete",description:"bert-finetuned-v3 reached 94.2% accuracy",time:"3h ago",read:true,avatarLabel:"SY"},
    {id:"n5",title:"Disk usage at 87%",description:"Consider archiving old snapshots.",time:"5h ago",read:true,avatarLabel:"SY"},
  ];
  const unread = notifData.filter(n=>!n.read);
  return (
    <div style={{ width:"var(--panel-notif-width)", background:"var(--bg-primary)", border:`var(--border-width-thin) solid var(--border-default)`, borderRadius:"var(--radius-md-ds)", boxShadow:"var(--shadow-xl)", overflow:"hidden" }}>
      <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", padding:"var(--space-3) var(--space-4) 0", borderBottom:`var(--border-width-thin) solid var(--border-divider)` }}>
        <div style={{ display:"flex", alignItems:"center", gap:"var(--space-2)" }}>
          <Typography variant="title" weight="semibold" color="primary">Notifications</Typography>
          <BadgeLabel label={`${unread.length} new`} variant="error" size="sm" />
        </div>
        <Button variant="ghost" size="sm">Mark all read</Button>
      </div>
      <Tabs activeKey="all" tabStyle="line" style={{ padding:"0 var(--space-4)" }} items={[
        {key:"all",label:"All",badge:notifData.length},
        {key:"unread",label:"Unread",badge:unread.length},
        {key:"mentions",label:"Mentions",badge:1},
      ]} />
      <div style={{ maxHeight:"var(--panel-notif-max-h)", overflowY:"auto" as const }}>
        {notifData.map(item=>(
          <div key={item.id} style={{ display:"flex", alignItems:"flex-start", gap:"var(--space-3)", padding:"var(--space-3) var(--space-4)", borderBottom:`var(--border-width-thin) solid var(--border-divider)`, background:!item.read?"var(--teal-25, var(--bg-secondary))":"var(--bg-primary)" }}>
            <div style={{ position:"relative", flexShrink:0 }}>
              <Avatar size="sm" shape="circle" label={item.avatarLabel} />
              {!item.read && <div style={{ position:"absolute", top:0, right:0, width:"var(--size-dot-notify)", height:"var(--size-dot-notify)", borderRadius:"var(--radius-full)", background:"var(--primary)", border:`var(--border-width-medium) solid var(--bg-primary)` }} />}
            </div>
            <div style={{ flex:1, minWidth:0 }}>
              <div style={{ display:"flex", alignItems:"baseline", justifyContent:"space-between", gap:"var(--space-2)" }}>
                <Typography variant="body" weight={!item.read?"semibold":"medium"} color="primary" truncate>{item.title}</Typography>
                <Typography variant="micro" color="tertiary" style={{ flexShrink:0 }}>{item.time}</Typography>
              </div>
              <Typography variant="label" color="secondary" style={{ marginTop:"var(--space-half)" }}>{item.description}</Typography>
            </div>
          </div>
        ))}
      </div>
      <div style={{ padding:"var(--space-2) var(--space-4)", borderTop:`var(--border-width-thin) solid var(--border-divider)`, textAlign:"center" as const }}>
        <Button variant="ghost" size="sm" fullWidth>View all notifications</Button>
      </div>
    </div>
  );
}

// ════════════════════════════════��═══════════════════════════════════════════
//  18. COMMAND BAR (global ⌘K overlay)
// ════════════════════════════════════════════���═══════════════════════════════
export function CommandBar() {
  const groups: { group: string; items: { label: string; icon: React.ReactNode; shortcut?: string[]; badge?: string }[] }[] = [
    { group:"Recent", items:[
      {label:"Dashboard overview",icon:<Icon name="home" size="sm" color="secondary" />},
      {label:"gpt-base-v2 · Models",icon:<Icon name="grid" size="sm" color="secondary" />},
    ]},
    { group:"Actions", items:[
      {label:"Deploy to production",icon:<Icon name="upload" size="sm" color="brand" />,shortcut:["⌘","⇧","D"]},
      {label:"Create workspace",icon:<Icon name="plus" size="sm" color="brand" />},
      {label:"Invite team member",icon:<Icon name="user" size="sm" color="brand" />},
    ]},
    { group:"Team Members", items:[
      {label:"Sarah Chen · Staff Engineer",icon:<Icon name="user" size="sm" color="secondary" />,badge:"Online"},
      {label:"Marcus Williams · Senior SWE",icon:<Icon name="user" size="sm" color="secondary" />},
    ]},
  ];
  return (
    <div style={{ width:"var(--command-palette-width)", background:"var(--bg-primary)", border:`var(--border-width-medium) solid var(--border-default)`, borderRadius:"var(--radius-md-ds)", boxShadow:"var(--shadow-xl)", overflow:"hidden" }}>
      <div style={{ display:"flex", alignItems:"center", gap:"var(--space-2)", padding:"var(--space-3) var(--space-4)", borderBottom:`var(--border-width-thin) solid var(--border-divider)` }}>
        <Icon name="search" size="md" color="tertiary" />
        <input placeholder="Search pages, actions, team members…" style={{ flex:1, border:"none", outline:"none", background:"transparent", fontSize:"var(--text-base)", fontFamily:"var(--font-family-primary)", color:"var(--fg-primary)" }} />
        <div style={{ display:"flex", gap:"var(--space-1)" }}>
          <kbd style={{ fontSize:"var(--text-micro)", fontFamily:"var(--font-family-mono)", color:"var(--fg-tertiary)", background:"var(--bg-secondary)", border:`var(--border-width-thin) solid var(--border-default)`, borderRadius:"var(--radius-xs)", padding:"var(--space-half) var(--space-1)" }}>⌘K</kbd>
        </div>
      </div>
      <div style={{ maxHeight:"var(--panel-content-max-h)", overflowY:"auto" as const }}>
        {groups.map(({group,items})=>(
          <div key={group}>
            <div style={{ padding:"var(--space-2) var(--space-4) var(--space-1)", fontSize:"var(--text-micro)", fontFamily:"var(--font-family-primary)", color:"var(--fg-tertiary)", fontWeight:"var(--font-weight-semibold)" as any, textTransform:"uppercase" as const, letterSpacing:"var(--letter-spacing-tracking-lg)", background:"var(--bg-secondary)" }}>{group}</div>
            {items.map((item,i)=>(
              <div key={i} style={{ display:"flex", alignItems:"center", gap:"var(--space-3)", padding:"var(--space-2) var(--space-4)", cursor:"pointer", background:i===0&&group==="Actions"?"var(--item-active-bg)":"transparent" }}>
                <span style={{ width:"var(--size-icon-container-sm)", height:"var(--size-icon-container-sm)", display:"flex", alignItems:"center", justifyContent:"center", background:i===0&&group==="Actions"?"var(--item-active-icon-bg)":"var(--bg-secondary)", borderRadius:"var(--radius-sm-ds)", flexShrink:0 }}>{item.icon}</span>
                <Typography variant="body" color="primary" style={{ flex:1 }}>{item.label}</Typography>
                {item.badge && <BadgeLabel label={item.badge} variant="success" size="sm" />}
                {item.shortcut && <div style={{ display:"flex", gap:"var(--space-half)" }}>{item.shortcut.map((k,ki)=><kbd key={ki} style={{ fontSize:"var(--text-micro)", fontFamily:"var(--font-family-mono)", color:"var(--fg-tertiary)", background:"var(--bg-secondary)", border:`var(--border-width-thin) solid var(--border-default)`, borderRadius:"var(--radius-xs)", padding:"var(--space-px) var(--space-1)" }}>{k}</kbd>)}</div>}
              </div>
            ))}
          </div>
        ))}
      </div>
      <div style={{ padding:"var(--space-2) var(--space-4)", borderTop:`var(--border-width-thin) solid var(--border-divider)`, display:"flex", gap:"var(--space-4)", background:"var(--bg-flush)" }}>
        {[["↑↓","Navigate"],["↵","Open"],["esc","Close"]].map(([k,l])=>(
          <div key={l} style={{ display:"flex", gap:"var(--space-1)", alignItems:"center" }}>
            <kbd style={{ fontSize:"var(--text-micro)", fontFamily:"var(--font-family-mono)", color:"var(--fg-tertiary)", background:"var(--bg-secondary)", border:`var(--border-width-thin) solid var(--border-default)`, borderRadius:"var(--radius-xs)", padding:"var(--space-px) var(--space-1)" }}>{k}</kbd>
            <Typography variant="micro" color="tertiary">{l}</Typography>
          </div>
        ))}
      </div>
    </div>
  );
}

// ════════════════════════════════════════════════════════════════════════════
//  19. FILE MANAGER
// ═════════════════════════════════════════════════════════���══════════════════
export function FileManager() {
  const files = [
    {name:"model-weights-v3.pt",size:"840 MB",status:"done" as const,selected:true},
    {name:"training-config.yaml",size:"4.2 KB",status:"uploading" as const,progress:62,selected:true},
    {name:"validation-dataset.csv",size:"120 MB",status:"done" as const,selected:false},
    {name:"requirements-corrupted.txt",size:"2.1 KB",status:"error" as const,selected:false},
  ];
  const selected = files.filter(f=>f.selected);
  return (
    <div style={{ background:"var(--card-ds-bg)", border:`var(--border-width-thin) solid var(--card-ds-border)`, borderRadius:"var(--radius-md-ds)", overflow:"hidden", boxShadow:"var(--shadow-sm)" }}>
      <div style={{ display:"flex", alignItems:"center", gap:"var(--space-3)", padding:"var(--space-4) var(--space-6)", borderBottom:`var(--border-width-thin) solid var(--border-divider)` }}>
        <Typography variant="title" weight="semibold" color="primary" style={{ flex:1 }}>File Manager</Typography>
        <Button variant="primary" size="sm" icon={<Icon name="upload" size="sm" color="inverse" />}>Upload files</Button>
      </div>
      <div style={{ margin:"var(--space-4) var(--space-6)", border:`var(--border-width-medium) dashed var(--border-focus)`, borderRadius:"var(--radius-md-ds)", padding:"var(--space-6)", textAlign:"center" as const, display:"flex", flexDirection:"column", alignItems:"center", gap:"var(--space-2)", background:"var(--bg-secondary)" }}>
        <Icon name="upload" size="lg" color="brand" />
        <Typography variant="body" color="secondary">Drop files here or click to upload</Typography>
        <Typography variant="label" color="tertiary">Supports any file type up to 1 GB</Typography>
      </div>
      {selected.length > 0 && (
        <div style={{ margin:"0 var(--space-6) var(--space-3)", display:"flex", alignItems:"center", gap:"var(--space-3)", padding:"var(--space-2) var(--space-4)", background:"var(--bg-primary)", border:`var(--border-width-thin) solid var(--border-focus)`, borderRadius:"var(--radius-md-ds)", boxShadow:"var(--shadow-sm)" }}>
          <BadgeLabel label={`${selected.length} selected`} variant="primary" />
          <Divider vertical style={{ height:"var(--divider-inline-h)" }} />
          <Button variant="ghost" size="sm" icon={<Icon name="trash" size="sm" color="error" />}>Delete</Button>
          <Button variant="ghost" size="sm" icon={<Icon name="download" size="sm" color="secondary" />}>Download</Button>
          <div style={{ flex:1 }} />
          <button style={{ background:"none", border:"none", cursor:"pointer", display:"flex" }}><Icon name="x" size="sm" color="tertiary" /></button>
        </div>
      )}
      <div style={{ margin:"0 var(--space-6) var(--space-4)", border:`var(--border-width-thin) solid var(--border-default)`, borderRadius:"var(--radius-sm-ds)", overflow:"hidden" }}>
        {files.length === 0
          ? <div style={{ padding:"var(--space-12)", textAlign:"center" as const }}><Typography variant="body" color="tertiary">No files yet. Upload something to get started.</Typography></div>
          : files.map((f,i)=>(
            <div key={i} style={{ display:"flex", alignItems:"center", gap:"var(--space-3)", padding:"var(--space-3) var(--space-4)", borderBottom:i<files.length-1?`var(--border-width-thin) solid var(--border-divider)`:undefined, background:f.selected?"var(--table-row-bg-selected)":"var(--bg-primary)" }}>
              <Checkbox checked={f.selected} />
              <div style={{ width:"var(--card-icon-container)", height:"var(--card-icon-container)", borderRadius:"var(--radius-sm-ds)", background:f.status==="error"?"var(--bg-error-subtle)":"var(--bg-brand-subtle)", display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0 }}>
                <Icon name="file" size="sm" color={f.status==="error"?"error":"brand"} />
              </div>
              <div style={{ flex:1, minWidth:0 }}>
                <Typography variant="body" weight="medium" color={f.status==="error"?"error":"primary"} truncate>{f.name}</Typography>
                <Typography variant="micro" color="tertiary">{f.size}</Typography>
                {f.status==="uploading" && f.progress !== undefined && <ProgressBar percent={f.progress} size="sm" fullWidth style={{ marginTop:"var(--space-1)" }} />}
              </div>
              <BadgeLabel label={f.status} variant={f.status==="done"?"success":f.status==="uploading"?"info":"error"} size="sm" />
            </div>
          ))
        }
      </div>
    </div>
  );
}

// ════════════════════════════════════════════════════════════════════════════
//  20. DASHBOARD HEADER
// ════════════════════════════════════════════════════════════════════════════
export function DashboardHeader() {
  return (
    <div style={{ background:"var(--bg-primary)", border:`var(--border-width-thin) solid var(--border-default)`, borderRadius:"var(--radius-md-ds)", padding:"var(--space-4) var(--space-6)", display:"flex", flexDirection:"column", gap:"var(--space-3)", boxShadow:"var(--shadow-sm)" }}>
      <div style={{ display:"flex", alignItems:"flex-start", justifyContent:"space-between", gap:"var(--space-4)" }}>
        <div style={{ flex:1 }}>
          <nav style={{ display:"flex", alignItems:"center", gap:"var(--space-1)", marginBottom:"var(--space-2)" }}>
            {["Home","Platform","Workspaces","Vision Experiments"].map((crumb,i,arr)=>(
              <span key={crumb} style={{ display:"contents" }}>
                {i > 0 && <Icon name="chevron-right" size="sm" color="tertiary" />}
                <Typography variant="label" color={i===arr.length-1?"primary":"brand"} weight={i===arr.length-1?"medium":undefined} style={{ cursor:i<arr.length-1?"pointer":"default" }}>{crumb}</Typography>
              </span>
            ))}
          </nav>
          <div style={{ display:"flex", alignItems:"center", gap:"var(--space-3)" }}>
            <Typography variant="h3" weight="bold" color="primary">Vision Experiments</Typography>
            <BadgeLabel label="Active" variant="success" />
          </div>
          <Typography variant="body" color="secondary" style={{ marginTop:"var(--space-1)" }}>Object detection and image segmentation experiments workspace.</Typography>
        </div>
        <div style={{ display:"flex", alignItems:"center", gap:"var(--space-2)", flexShrink:0 }}>
          <div style={{ display:"inline-flex", alignItems:"center", gap:"var(--space-2)", padding:"0 var(--space-3)", height:"var(--btn-height-md)", background:"var(--bg-primary)", border:`var(--border-width-thin) solid var(--border-default)`, borderRadius:"var(--radius-sm-ds)", cursor:"pointer" }}>
            <Icon name="calendar" size="sm" color="tertiary" />
            <Typography variant="body" color="primary">Feb 1 — Feb 28, 2026</Typography>
            <Icon name="chevron-down" size="sm" color="tertiary" />
          </div>
          <Button variant="secondary" size="md" icon={<Icon name="download" size="sm" color="secondary" />}>Export</Button>
          <Button variant="primary" size="md" icon={<Icon name="settings" size="sm" color="inverse" />}>Settings</Button>
          <Avatar size="md" shape="circle" label="SC" />
        </div>
      </div>
      <Divider />
      <div style={{ display:"flex", gap:"var(--space-6)" }}>
        {[{label:"Models",value:"12"},{label:"Runs",value:"284"},{label:"GPU Hours",value:"1,420"},{label:"Avg Accuracy",value:"91.4%"}].map(s=>(
          <div key={s.label}>
            <Typography variant="label" color="tertiary">{s.label}</Typography>
            <Typography variant="title" weight="bold" color="primary">{s.value}</Typography>
          </div>
        ))}
      </div>
    </div>
  );
}

// ════════════════════════════════════════════════════════════════════════════
//  21. ONBOARDING WIZARD
// ════════════════════════════════════════════════════════════════════════════
export function OnboardingWizard() {
  const steps = [
    {label:"Account",status:"complete" as const},
    {label:"Workspace",status:"active" as const},
    {label:"Team",status:"pending" as const},
    {label:"Launch",status:"pending" as const},
  ];
  return (
    <div style={{ background:"var(--card-ds-bg)", border:`var(--border-width-thin) solid var(--card-ds-border)`, borderRadius:"var(--radius-md-ds)", overflow:"hidden", boxShadow:"var(--shadow-md)", maxWidth:"var(--settings-panel-max-w)" }}>
      <div style={{ padding:"var(--space-6)", background:`linear-gradient(135deg, var(--panel-header-grad-from), var(--panel-header-grad-to))`, borderBottom:`var(--border-width-thin) solid var(--border-divider)` }}>
        <Typography variant="heading" weight="bold" color="primary">Set up your workspace</Typography>
        <Typography variant="body" color="secondary" style={{ marginTop:"var(--space-1)" }}>Let's get you started in under 5 minutes.</Typography>
        <div style={{ marginTop:"var(--space-4)" }}>
          <Stepper steps={steps} direction="horizontal" />
        </div>
      </div>
      <div style={{ padding:"var(--space-6)", display:"flex", flexDirection:"column", gap:"var(--space-4)" }}>
        <Typography variant="title" weight="semibold" color="primary">Configure your workspace</Typography>
        <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:"var(--space-4)" }}>
          <FormField label="Workspace name" required helperText="Choose a unique, descriptive name.">
            <TextInput placeholder="e.g. Vision Experiments" />
          </FormField>
          <FormField label="Team size">
            <Select options={[{label:"Just me",value:"solo"},{label:"2–10",value:"small"},{label:"11–50",value:"medium"},{label:"50+",value:"large"}]} value="small" />
          </FormField>
          <FormField label="Primary use case">
            <Select options={[{label:"ML Training",value:"train"},{label:"Inference",value:"infer"},{label:"Research",value:"research"}]} value="train" />
          </FormField>
          <FormField label="Compute region">
            <Select options={[{label:"us-east-1",value:"use1"},{label:"eu-west-1",value:"euw1"},{label:"ap-southeast-1",value:"apse1"}]} value="use1" />
          </FormField>
        </div>
        <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", padding:"var(--space-3) var(--space-4)", border:`var(--border-width-thin) solid var(--border-default)`, borderRadius:"var(--radius-md-ds)", background:"var(--bg-primary)" }}>
          <div>
            <Typography variant="body" weight="medium" color="primary">Enable usage analytics</Typography>
            <Typography variant="label" color="secondary">Help us improve by sharing anonymised usage data.</Typography>
          </div>
          <Switch checked size="md" />
        </div>
        <div style={{ display:"flex", alignItems:"center", gap:"var(--space-3)" }}>
          <ProgressBar percent={50} status="brand" fullWidth showLabel />
          <Typography variant="label" color="tertiary" style={{ flexShrink:0 }}>Step 2 of 4</Typography>
        </div>
      </div>
      <div style={{ display:"flex", justifyContent:"space-between", padding:"var(--space-4) var(--space-6)", borderTop:`var(--border-width-thin) solid var(--border-divider)`, background:"var(--bg-flush)" }}>
        <Button variant="ghost">Skip for now</Button>
        <div style={{ display:"flex", gap:"var(--space-2)" }}>
          <Button variant="secondary">Back</Button>
          <Button variant="primary" icon={<Icon name="arrow-right" size="sm" color="inverse" />} iconPosition="right">Continue</Button>
        </div>
      </div>
    </div>
  );
}

// ════════════════════════════════════════════════════════════════════════════
//  22. TABLE WITH FILTERS
// ════════════════════════════════════════════════════════════════════════════
export function TableWithFilters() {
  const rows = [
    {id:"m1",name:"gpt-base-v2",env:"Production",status:"Healthy",updated:"2h ago",selected:true},
    {id:"m2",name:"bert-finetuned-v3",env:"Staging",status:"Warning",updated:"1d ago",selected:true},
    {id:"m3",name:"vision-yolo-v8",env:"Production",status:"Healthy",updated:"3d ago",selected:false},
    {id:"m4",name:"llama-7b-instruct",env:"Dev",status:"Error",updated:"5m ago",selected:false},
    {id:"m5",name:"stable-diffusion-xl",env:"Production",status:"Healthy",updated:"1h ago",selected:false},
  ];
  const selected = rows.filter(r=>r.selected);
  const statusVariant: Record<string, "success"|"warning"|"error"> = {Healthy:"success",Warning:"warning",Error:"error"};
  return (
    <div style={{ background:"var(--card-ds-bg)", border:`var(--border-width-thin) solid var(--card-ds-border)`, borderRadius:"var(--radius-md-ds)", overflow:"hidden", boxShadow:"var(--shadow-sm)" }}>
      <div style={{ padding:"var(--space-4) var(--space-4) 0", borderBottom:`var(--border-width-thin) solid var(--border-divider)` }}>
        <div style={{ display:"flex", alignItems:"center", gap:"var(--space-3)", marginBottom:"var(--space-3)" }}>
          <Typography variant="title" weight="semibold" color="primary" style={{ flex:1 }}>Models</Typography>
          <SearchBar width={240} size="sm" />
          <Button variant="secondary" size="sm" icon={<Icon name="filter" size="sm" color="secondary" />}>Filter</Button>
          <Button variant="primary" size="sm" icon={<Icon name="plus" size="sm" color="inverse" />}>New model</Button>
        </div>
        <div style={{ display:"flex", gap:"var(--space-2)", marginBottom:"var(--space-3)" }}>
          {[{label:"All environments"},{label:"Production",active:true},{label:"Staging"},{label:"Dev"}].map(f=>(
            <button key={f.label} style={{ padding:"var(--badge-padding-y) var(--space-2)", border:`var(--border-width-thin) solid ${f.active?"var(--border-focus)":"transparent"}`, borderRadius:"var(--radius-full)", background:f.active?"var(--item-active-bg)":"transparent", color:f.active?"var(--fg-brand)":"var(--fg-secondary)", cursor:"pointer", fontSize:"var(--text-caption)", fontFamily:"var(--font-family-primary)", fontWeight:f.active?"var(--font-weight-semibold)" as any:"var(--font-weight-normal)" as any }}>{f.label}</button>
          ))}
          <Tag label="status: Healthy" variant="success" closable size="sm" />
        </div>
      </div>
      {selected.length > 0 && (
        <div style={{ display:"flex", alignItems:"center", gap:"var(--space-3)", padding:"var(--space-2) var(--space-4)", background:"var(--item-active-bg)", borderBottom:`var(--border-width-thin) solid var(--border-divider)` }}>
          <BadgeLabel label={`${selected.length} selected`} variant="primary" />
          <Button variant="ghost" size="sm">Delete</Button>
          <Button variant="ghost" size="sm">Archive</Button>
          <Button variant="ghost" size="sm">Export</Button>
          <div style={{ flex:1 }}/>
          <button style={{ background:"none", border:"none", cursor:"pointer", display:"flex" }}><Icon name="x" size="sm" color="tertiary" /></button>
        </div>
      )}
      <div style={{ overflowX:"auto" as const }}>
        <table style={{ width:"100%", borderCollapse:"collapse" as const, fontFamily:"var(--font-family-primary)" }}>
          <thead>
            <tr style={{ background:"var(--bg-secondary)", borderBottom:`var(--border-width-thin) solid var(--border-default)` }}>
              <th style={{ width:"var(--table-checkbox-col-w)", padding:"var(--space-3) var(--space-4)" }}><Checkbox indeterminate /></th>
              {[{k:"name",t:"Model name",sort:true},{k:"env",t:"Environment"},{k:"status",t:"Status",sort:true},{k:"updated",t:"Last updated",sort:true}].map(col=>(
                <th key={col.k} style={{ textAlign:"left" as const, padding:"var(--space-3) var(--space-4)", fontSize:"var(--text-caption)", fontWeight:"var(--font-weight-semibold)" as any, color:"var(--fg-tertiary)", whiteSpace:"nowrap" as const }}>
                  <div style={{ display:"flex", alignItems:"center", gap:"var(--space-1)" }}>
                    {col.t}
                    {col.sort && <svg width="10" height="10" viewBox="0 0 10 10" fill="none"><path d="M5 2V8M2.5 5.5L5 8L7.5 5.5" stroke="var(--icon-tertiary)" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/></svg>}
                  </div>
                </th>
              ))}
              <th style={{ textAlign:"right" as const, padding:"var(--space-3) var(--space-4)", fontSize:"var(--text-caption)", fontWeight:"var(--font-weight-semibold)" as any, color:"var(--fg-tertiary)" }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {rows.map(row=>(
              <tr key={row.id} style={{ borderBottom:`var(--border-width-thin) solid var(--border-divider)`, background:row.selected?"var(--table-row-bg-selected)":"var(--bg-primary)" }}>
                <td style={{ padding:"var(--space-3) var(--space-4)" }}><Checkbox checked={row.selected} /></td>
                <td style={{ padding:"var(--space-3) var(--space-4)" }}><Typography variant="body" weight="medium" color="primary">{row.name}</Typography></td>
                <td style={{ padding:"var(--space-3) var(--space-4)" }}><BadgeLabel label={row.env} variant={row.env==="Production"?"primary":row.env==="Staging"?"info":"neutral"} size="sm" /></td>
                <td style={{ padding:"var(--space-3) var(--space-4)" }}><BadgeLabel label={row.status} variant={statusVariant[row.status]} dot /></td>
                <td style={{ padding:"var(--space-3) var(--space-4)" }}><Typography variant="label" color="tertiary">{row.updated}</Typography></td>
                <td style={{ padding:"var(--space-3) var(--space-4)", textAlign:"right" as const }}>
                  <Button variant="ghost" size="sm" icon={<Icon name="more" size="sm" color="secondary" />}>{""}</Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", padding:"var(--space-3) var(--space-4)", borderTop:`var(--border-width-thin) solid var(--border-divider)`, background:"var(--bg-flush)" }}>
        <Typography variant="label" color="tertiary">Showing 1–5 of 142 models</Typography>
        <Pagination current={1} total={29} size="sm" />

      </div>
    </div>
  );
}

// ════════════════════════════════════════════════════════════════════════════
//  23. SETTINGS SIDEBAR
// ════════════════════════════════════════════════════════════════════════════
export function SettingsSidebarOrg() {
  const navItems = [
    {label:"General",active:true,icon:<Icon name="settings" size="sm" color="brand" />},
    {label:"Team & Access",icon:<Icon name="user" size="sm" color="secondary" />},
    {label:"Notifications",icon:<Icon name="bell" size="sm" color="secondary" />,badge:"3"},
    {label:"Billing & Plan",icon:<Icon name="star" size="sm" color="secondary" />},
    {label:"Integrations",icon:<Icon name="external-link" size="sm" color="secondary" />},
    {label:"Security",icon:<Icon name="lock" size="sm" color="secondary" />},
    {label:"Audit Log",icon:<Icon name="list" size="sm" color="secondary" />},
    {label:"Danger Zone",icon:<Icon name="warning" size="sm" color="error" />},
  ];
  return (
    <div style={{ display:"flex", border:`var(--border-width-thin) solid var(--border-default)`, borderRadius:"var(--radius-md-ds)", overflow:"hidden", boxShadow:"var(--shadow-sm)", background:"var(--bg-primary)", minHeight:"var(--settings-panel-min-h)" }}>
      <div style={{ width:"var(--settings-sidebar-w)", background:"var(--bg-primary)", borderRight:`var(--border-width-thin) solid var(--border-divider)`, display:"flex", flexDirection:"column", flexShrink:0 }}>
        <div style={{ padding:"var(--space-4) var(--space-4) var(--space-2)", borderBottom:`var(--border-width-thin) solid var(--border-divider)` }}>
          <Typography variant="label" weight="bold" color="tertiary" style={{ textTransform:"uppercase" as const, letterSpacing:"var(--letter-spacing-tracking-lg)" }}>Settings</Typography>
        </div>
        <div style={{ padding:"var(--space-2)", flex:1 }}>
          {navItems.map(item=>(
            <div key={item.label} style={{ display:"flex", alignItems:"center", gap:"var(--space-2)", padding:"var(--space-2) var(--space-2)", borderRadius:"var(--radius-sm-ds)", cursor:"pointer", background:item.active?"var(--item-active-bg)":"transparent", marginBottom:"var(--space-half)" }}>
              {item.icon}
              <Typography variant="body" weight={item.active?"semibold":"regular"} color={item.active?"brand":"secondary"} style={{ flex:1 }}>{item.label}</Typography>
              {item.badge && <BadgeLabel label={item.badge} variant={item.active?"primary":"error"} size="sm" />}
            </div>
          ))}
        </div>
      </div>
      <div style={{ flex:1, padding:"var(--space-6)", display:"flex", flexDirection:"column", gap:"var(--space-6)" }}>
        <div>
          <Typography variant="heading" weight="semibold" color="primary">General settings</Typography>
          <Typography variant="body" color="secondary" style={{ marginTop:"var(--space-1)" }}>Manage your workspace name, visibility, and preferences.</Typography>
        </div>
        <Divider />
        <div style={{ display:"flex", flexDirection:"column", gap:"var(--space-4)" }}>
          <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:"var(--space-4)" }}>
            <FormField label="Workspace name" required>
              <TextInput value="Vision Experiments" />
            </FormField>
            <FormField label="Workspace URL">
              <TextInput value="vision-experiments" prefix={<Typography variant="label" color="tertiary">app.acme.io/</Typography>} />
            </FormField>
          </div>
          <FormField label="Description" helperText="A brief description of this workspace.">
            <TextInput placeholder="Describe this workspace…" />
          </FormField>
          <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", padding:"var(--space-3) var(--space-4)", border:`var(--border-width-thin) solid var(--border-default)`, borderRadius:"var(--radius-md-ds)" }}>
            <div>
              <Typography variant="body" weight="medium" color="primary">Public workspace</Typography>
              <Typography variant="label" color="secondary">Anyone with the link can view this workspace.</Typography>
            </div>
            <Switch size="md" />
          </div>
          <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", padding:"var(--space-3) var(--space-4)", border:`var(--border-width-thin) solid var(--border-default)`, borderRadius:"var(--radius-md-ds)" }}>
            <div>
              <Typography variant="body" weight="medium" color="primary">Auto-archive after 90 days</Typography>
              <Typography variant="label" color="secondary">Inactive workspaces are automatically archived.</Typography>
            </div>
            <Switch checked size="md" />
          </div>
        </div>
        <div style={{ display:"flex", justifyContent:"flex-end", gap:"var(--space-2)", paddingTop:"var(--space-4)", borderTop:`var(--border-width-thin) solid var(--border-divider)` }}>
          <Button variant="secondary">Discard changes</Button>
          <Button variant="primary">Save settings</Button>
        </div>
      </div>
    </div>
  );
}

// ═════════════════════════════════���══════════════════════════════════════════
//  24. LOGIN FORM
// ═════════════════════════════��══════════════════════════════════════════════
export function LoginForm() {
  return (
    <div style={{ width:"var(--showcase-login-w)", display:"flex", flexDirection:"column", alignItems:"center", gap:"var(--space-6)" }}>
      <div style={{ display:"flex", flexDirection:"column", alignItems:"center", gap:"var(--space-2)" }}>
        <div style={{ width:"var(--space-12)", height:"var(--space-12)", borderRadius:"var(--radius-md-ds)", background:"var(--bg-brand)", display:"flex", alignItems:"center", justifyContent:"center" }}>
          <svg width="24" height="24" viewBox="0 0 18 18" fill="none"><rect x="1" y="1" width="7" height="7" rx="1.5" fill="var(--primary-foreground)"/><rect x="10" y="1" width="7" height="7" rx="1.5" fill="var(--primary-foreground)" style={{ fillOpacity:"var(--opacity-logo-secondary)" }}/><rect x="1" y="10" width="7" height="7" rx="1.5" fill="var(--primary-foreground)" style={{ fillOpacity:"var(--opacity-logo-secondary)" }}/><rect x="10" y="10" width="7" height="7" rx="1.5" fill="var(--primary-foreground)" style={{ fillOpacity:"var(--opacity-subtle)" }}/></svg>
        </div>
        <Typography variant="h3" weight="bold" color="primary">Welcome back</Typography>
        <Typography variant="body" color="secondary">Sign in to your ICM+ account</Typography>
      </div>
      <div style={{ width:"100%", background:"var(--card-ds-bg)", border:`var(--border-width-thin) solid var(--card-ds-border)`, borderRadius:"var(--radius-md-ds)", padding:"var(--space-6)", display:"flex", flexDirection:"column", gap:"var(--space-4)", boxShadow:"var(--shadow-md)" }}>
        <div style={{ display:"flex", gap:"var(--space-3)" }}>
          {[
            {label:"Google",svg:<svg width="16" height="16" viewBox="0 0 16 16" fill="none"><circle cx="8" cy="8" r="7" stroke="var(--border-default)" strokeWidth="1"/><text x="8" y="12" textAnchor="middle" fontSize="10" fontFamily="var(--font-family-primary)" fill="var(--fg-primary)">G</text></svg>},
            {label:"GitHub",svg:<svg width="16" height="16" viewBox="0 0 16 16" fill="none"><circle cx="8" cy="8" r="7" stroke="var(--border-default)" strokeWidth="1"/><text x="8" y="12" textAnchor="middle" fontSize="8" fontFamily="var(--font-family-mono)" fill="var(--fg-primary)">GH</text></svg>},
          ].map(p=>(
            <Button key={p.label} variant="secondary" fullWidth icon={p.svg}>{p.label}</Button>
          ))}
        </div>
        <Divider label="OR" />
        <FormField label="Email" required>
          <TextInput type="email" placeholder="you@company.com" prefix={<Icon name="mail" size="sm" color="tertiary" />} />
        </FormField>
        <div style={{ display:"flex", flexDirection:"column", gap:"var(--space-1)" }}>
          <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between" }}>
            <label style={{ fontSize:"var(--text-base)", fontFamily:"var(--font-family-primary)", fontWeight:"var(--font-weight-medium)" as any, color:"var(--fg-primary)" }}>Password</label>
            <a href="#" style={{ fontSize:"var(--text-caption)", fontFamily:"var(--font-family-primary)", color:"var(--fg-brand)", textDecoration:"none" }}>Forgot password?</a>
          </div>
          <TextInput type="password" placeholder="••••••••" prefix={<Icon name="lock" size="sm" color="tertiary" />} />
        </div>
        <Checkbox checked label="Remember me for 30 days" />
        <Button variant="primary" fullWidth>Sign in</Button>
      </div>
      <Typography variant="body" color="secondary">
        Don't have an account?{" "}
        <a href="#" style={{ color:"var(--fg-brand)", textDecoration:"none", fontFamily:"var(--font-family-primary)", fontWeight:"var(--font-weight-medium)" as any }}>Start free trial</a>
      </Typography>
    </div>
  );
}

// ════════════════════════════════════════════════════════════════════════════
//  33. IMPORT REPO MODAL  (Modal · FormField · Checkbox · Select · TextInput · Button · Typography · Icon · BadgeLabel · Alert)
//  Repository import dialog with source configuration, file browser table
//  with filtering, sorting, and resizable columns.
// ════════════════════════════════════════════════════════════════════════════
export interface ImportRepoFile {
  name: string;
  kind?: string;
  size: string;
  sizeBytes?: number;   // numeric for sorting
  checked?: boolean;
}

interface ImportRepoModalProps {
  source?: string;
  secretBlueprint?: string;
  repoId?: string;
  revision?: string;
  sourceDir?: string;
  destDir?: string;
  files?: ImportRepoFile[];
  selectedCount?: number;
  size?: OrgSize;
  className?: string;
}

/* ── helpers ── */
function parseSizeToBytes(s: string): number {
  const m = s.match(/^([\d.]+)\s*(B|kB|KB|MB|GB|TB)/i);
  if (!m) return 0;
  const v = parseFloat(m[1]);
  const u = m[2].toUpperCase();
  const mult: Record<string, number> = { B: 1, KB: 1e3, MB: 1e6, GB: 1e9, TB: 1e12 };
  return v * (mult[u] ?? 1);
}

const DEFAULT_IMPORT_FILES: ImportRepoFile[] = [
  { name: ".gitattributes",                            kind: ".md",          size: "1.57 kB",  checked: true  },
  { name: "LICENSE",                                   kind: undefined,      size: "2.18 kB",  checked: true  },
  { name: "README.md",                                 kind: ".md",          size: "61.6 kB",  checked: true  },
  { name: "USE_POLICY.md",                             kind: ".md",          size: "5.34 kB",  checked: true  },
  { name: "config.json",                               kind: ".json",        size: "614 B",    checked: true  },
  { name: "generation_config.json",                    kind: ".json",        size: "189 B",    checked: true  },
  { name: "model-00001-of-00002.safetensors",          kind: ".safetensors", size: "4.97 GB",  checked: true  },
  { name: "model-00002-of-00002.safetensors",          kind: ".safetensors", size: "2.47 GB",  checked: true  },
  { name: "model.safetensors.index.json",              kind: ".json",        size: "17.4 kB",  checked: true  },
  { name: "special_tokens_map.json",                   kind: ".json",        size: "296 B",    checked: true  },
  { name: "tokenizer.json",                            kind: ".json",        size: "17.2 MB",  checked: true  },
  { name: "tokenizer_config.json",                     kind: ".json",        size: "55.5 kB",  checked: true  },
];

/* ── Size-aware token maps ── */
const fileBrowserMaxH: Record<OrgSize, string> = {
  sm: "var(--table-file-browser-max-h-sm)",
  md: "var(--table-file-browser-max-h-md)",
  lg: "var(--table-file-browser-max-h-lg)",
};
const cellPadBlock: Record<OrgSize, string> = {
  sm: "var(--table-cell-padding-block-sm)",
  md: "var(--table-cell-padding-block-md)",
  lg: "var(--table-cell-padding-block-lg)",
};
const cellPadInline: Record<OrgSize, string> = {
  sm: "var(--table-cell-padding-inline-sm)",
  md: "var(--table-cell-padding-inline-md)",
  lg: "var(--table-cell-padding-inline-lg)",
};
const rowHeight: Record<OrgSize, string> = {
  sm: "var(--table-row-height-sm)",
  md: "var(--table-row-height-md)",
  lg: "var(--table-row-height-lg)",
};

/* ── Sort indicator SVG ── */
type SortDir = "asc" | "desc" | null;
function SortArrow({ dir }: { dir: SortDir }) {
  if (!dir) return (
    <svg width="12" height="12" viewBox="0 0 12 12" fill="none"
      style={{ width: "var(--table-sort-icon-size)", height: "var(--table-sort-icon-size)", flexShrink: 0, opacity: "var(--opacity-subtle)" as any }}>
      <path d="M6 2L9 5H3L6 2Z" fill="var(--table-header-fg)" />
      <path d="M6 10L3 7H9L6 10Z" fill="var(--table-header-fg)" />
    </svg>
  );
  return (
    <svg width="12" height="12" viewBox="0 0 12 12" fill="none"
      style={{ width: "var(--table-sort-icon-size)", height: "var(--table-sort-icon-size)", flexShrink: 0 }}>
      {dir === "asc"
        ? <path d="M6 2L9 6H3L6 2Z" fill="var(--fg-brand)" />
        : <path d="M6 10L3 6H9L6 10Z" fill="var(--fg-brand)" />}
    </svg>
  );
}

/* ── Column resize handle ── */
function ColResizeHandle({ onMouseDown }: { onMouseDown: (e: React.MouseEvent) => void }) {
  const [hover, setHover] = React.useState(false);
  return (
    <div
      onMouseDown={onMouseDown}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        position: "absolute",
        top: 0, right: 0, bottom: 0,
        width: "var(--table-resize-handle-w)",
        cursor: "col-resize",
        background: hover ? "var(--table-resize-handle-hover)" : "var(--table-resize-handle-idle)",
        transition: `background var(--duration-fast) var(--ease-out)`,
        zIndex: "var(--z-raised)" as any,
      }}
    />
  );
}

/* ═══════════════════════════════════════════════════════════════════════
   MAIN COMPONENT
   ═══════════════════════════════════════════════════════════════════════ */
export function ImportRepoModal({
  source = "Hugging Face",
  secretBlueprint = "Basic",
  repoId = "Meta-llama/Llama 3.2 -1B",
  revision = "Main",
  sourceDir = "/",
  destDir = "/",
  files = DEFAULT_IMPORT_FILES,
  selectedCount,
  size = "lg",
  className,
}: ImportRepoModalProps) {

  /* ── local state ── */
  const [checkedMap, setCheckedMap] = useState<Record<number, boolean>>(() =>
    Object.fromEntries(files.map((f, i) => [i, f.checked !== false])),
  );
  const [filterText, setFilterText]   = useState("");
  const [kindFilter, setKindFilter]   = useState<string>("all");
  const [sortCol, setSortCol]         = useState<"name" | "kind" | "size" | null>(null);
  const [sortDir, setSortDir]         = useState<SortDir>(null);

  /* ── column widths (fr-like flex weights, stored in px during resize) ── */
  const containerRef = useRef<HTMLDivElement>(null);
  const [colWidths, setColWidths] = useState<[number, number, number] | null>(null);

  /* initialise flex-weight defaults on first render */
  const resolvedWidths = useMemo<[number, number, number]>(() => {
    if (colWidths) return colWidths;
    /* sensible default ratios — auto-layout: 50% / 25% / 25% */
    return [50, 25, 25];
  }, [colWidths]);

  /* start resize drag */
  const startResize = useCallback((colIdx: 0 | 1, e: React.MouseEvent) => {
    e.preventDefault();
    const container = containerRef.current;
    if (!container) return;
    const totalW = container.getBoundingClientRect().width;
    /* convert percentages → pixels */
    const pw: [number, number, number] = [
      (resolvedWidths[0] / 100) * totalW,
      (resolvedWidths[1] / 100) * totalW,
      (resolvedWidths[2] / 100) * totalW,
    ];
    const startX = e.clientX;

    const onMove = (ev: MouseEvent) => {
      const delta = ev.clientX - startX;
      const next: [number, number, number] = [...pw];
      /* runtime minimum — prevents col collapse during drag (not a visible style) */
      const minPx = 60;
      next[colIdx]     = Math.max(minPx, pw[colIdx] + delta);
      next[colIdx + 1] = Math.max(minPx, pw[colIdx + 1] - delta);
      /* convert back to percentages */
      const sum = next[0] + next[1] + next[2];
      setColWidths([
        (next[0] / sum) * 100,
        (next[1] / sum) * 100,
        (next[2] / sum) * 100,
      ]);
    };
    const onUp = () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseup", onUp);
    };
    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseup", onUp);
  }, [resolvedWidths]);

  /* ── unique kind values for filter dropdown ── */
  const kindOptions = useMemo(() => {
    const s = new Set(files.map(f => f.kind ?? "—"));
    return [
      { label: "All kinds", value: "all" },
      ...Array.from(s).sort().map(k => ({ label: k, value: k })),
    ];
  }, [files]);

  /* ── derived data: filter → sort ── */
  const processedRows = useMemo(() => {
    let rows = files.map((f, i) => ({ ...f, _idx: i }));
    /* filter by text */
    if (filterText) {
      const q = filterText.toLowerCase();
      rows = rows.filter(r => r.name.toLowerCase().includes(q));
    }
    /* filter by kind */
    if (kindFilter !== "all") {
      rows = rows.filter(r => (r.kind ?? "—") === kindFilter);
    }
    /* sort */
    if (sortCol && sortDir) {
      const dir = sortDir === "asc" ? 1 : -1;
      rows.sort((a, b) => {
        if (sortCol === "name") return a.name.localeCompare(b.name) * dir;
        if (sortCol === "kind") return (a.kind ?? "").localeCompare(b.kind ?? "") * dir;
        if (sortCol === "size") return (parseSizeToBytes(a.size) - parseSizeToBytes(b.size)) * dir;
        return 0;
      });
    }
    return rows;
  }, [files, filterText, kindFilter, sortCol, sortDir]);

  /* ── select helpers ── */
  const checkedCount = Object.values(checkedMap).filter(Boolean).length;
  const allChecked   = checkedCount === files.length && files.length > 0;
  const someChecked  = checkedCount > 0 && !allChecked;
  const count        = selectedCount ?? checkedCount;

  const toggleAll = () => {
    const next = !allChecked;
    setCheckedMap(Object.fromEntries(files.map((_, i) => [i, next])));
  };
  const toggleOne = (idx: number) => {
    setCheckedMap(prev => ({ ...prev, [idx]: !prev[idx] }));
  };

  /* ── sort handler ── */
  const handleSort = (col: "name" | "kind" | "size") => {
    if (sortCol === col) {
      setSortDir(prev => prev === "asc" ? "desc" : prev === "desc" ? null : "asc");
      if (sortDir === "desc") setSortCol(null);
    } else {
      setSortCol(col);
      setSortDir("asc");
    }
  };

  /* ── padding token shorthand ── */
  const cellPad = `${cellPadBlock[size]} ${cellPadInline[size]}`;

  /* ── column template ── */
  const colTemplate = `${resolvedWidths[0]}% ${resolvedWidths[1]}% ${resolvedWidths[2]}%`;

  /* ═══ RENDER ═══ */
  return (
    <Modal
      title="Import"
      size={size}
      className={className}
      footer={
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", width: "100%" }}>
          <Typography variant="body" color="primary">{count} item{count !== 1 ? "s" : ""} selected</Typography>
          <div style={{ display: "flex", gap: "var(--space-3)" }}>
            <Button variant="secondary">Cancel</Button>
            <Button variant="primary">Import</Button>
          </div>
        </div>
      }
    >
      <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-4)" }}>

        {/* subtitle */}
        <Typography variant="label" color="tertiary">
          Select source, configure access, and choose files to import
        </Typography>

        {/* ── Row 1: Source + Secret Blueprint ── */}
        <div style={{ display: "flex", gap: "var(--space-4)", flexWrap: "wrap" as const }}>
          <FormField label="Source" required size={size === "sm" ? "sm" : "md"} style={{ flex: 1, minWidth: 0 }}>
            <Select value={source} options={[
              { label: "Hugging Face", value: "Hugging Face" },
              { label: "S3", value: "S3" },
              { label: "GCS", value: "GCS" },
            ]} size={size === "sm" ? "sm" : "md"} />
          </FormField>
          <div style={{ flex: 1, minWidth: 0, display: "flex", flexDirection: "column", gap: "var(--space-1)" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "var(--space-2)", flexWrap: "wrap" as const }}>
              <Typography variant="body" weight="medium" color="primary">Secret Blueprint</Typography>
              <a href="#" style={{
                color: "var(--fg-brand)", textDecoration: "underline",
                fontFamily: "var(--font-family-primary)", fontSize: "var(--text-caption)",
                fontWeight: "var(--font-weight-medium)" as any,
              }}>Create a Secret Blueprint</a>
            </div>
            <Select value={secretBlueprint} options={[
              { label: "Basic", value: "Basic" },
              { label: "Advanced", value: "Advanced" },
            ]} size={size === "sm" ? "sm" : "md"} />
          </div>
        </div>

        {/* ── Row 2: Repository ID + Revision ── */}
        <div style={{ display: "flex", gap: "var(--space-4)", flexWrap: "wrap" as const }}>
          <FormField label="Repository ID" required size={size === "sm" ? "sm" : "md"} style={{ flex: 1, minWidth: 0 }}>
            <TextInput value={repoId} size={size === "sm" ? "sm" : "md"} />
          </FormField>
          <FormField label="Revision" size={size === "sm" ? "sm" : "md"} style={{ flex: 1, minWidth: 0 }}>
            <Select value={revision} options={[
              { label: "Main", value: "Main" },
              { label: "Dev", value: "Dev" },
            ]} size={size === "sm" ? "sm" : "md"} />
          </FormField>
        </div>

        {/* ═══ FILE BROWSER TABLE ═══ */}
        <div ref={containerRef} style={{
          border: `var(--border-width-thin) solid var(--table-border)`,
          borderRadius: "var(--table-radius)",
          overflow: "hidden",
          display: "flex", flexDirection: "column",
        }}>

          {/* ── Source directory + filter bar ── */}
          <div style={{
            padding: cellPadInline[size],
            display: "flex", flexDirection: "column",
            gap: "var(--table-filter-bar-gap)",
          }}>
            <FormField label="Source Directory" size={size === "sm" ? "sm" : "md"}>
              <TextInput placeholder="/" value={sourceDir} size={size === "sm" ? "sm" : "md"} />
            </FormField>

            {/* Filter row */}
            <div style={{
              display: "flex", gap: "var(--space-2)", flexWrap: "wrap" as const,
              alignItems: "flex-end",
            }}>
              <div style={{ flex: 1, minWidth: 0 }}>
                <TextInput
                  placeholder="Filter by file name…"
                  value={filterText}
                  size={size === "sm" ? "sm" : "md"}
                  prefix={
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none"
                      style={{ width: "var(--size-icon-sm)", height: "var(--size-icon-sm)" }}>
                      <circle cx="6" cy="6" r="4.5" stroke="var(--icon-tertiary)" strokeWidth="1.3" />
                      <path d="M9.5 9.5L12.5 12.5" stroke="var(--icon-tertiary)" strokeWidth="1.3" strokeLinecap="round" />
                    </svg>
                  }
                  onChange={v => setFilterText(v)}
                />
              </div>
              <div style={{ minWidth: 0 }}>
                <Select
                  value={kindFilter}
                  options={kindOptions}
                  size={size === "sm" ? "sm" : "md"}
                  onChange={v => setKindFilter(v)}
                />
              </div>
              {(filterText || kindFilter !== "all") && (
                <button
                  onClick={() => { setFilterText(""); setKindFilter("all"); }}
                  style={{
                    padding: `${cellPadBlock[size]} ${cellPadInline[size]}`,
                    border: `var(--border-width-thin) solid var(--border-default)`,
                    borderRadius: "var(--radius-sm-ds)",
                    background: "var(--bg-secondary)",
                    color: "var(--fg-secondary)",
                    fontFamily: "var(--font-family-primary)",
                    fontSize: "var(--table-body-font)",
                    cursor: "pointer",
                  }}
                >
                  Clear
                </button>
              )}
            </div>
          </div>

          {/* ── Table header ── */}
          <div style={{
            display: "grid",
            gridTemplateColumns: colTemplate,
            background: "var(--table-header-bg)",
            borderTop: `var(--border-width-thin) solid var(--border-divider)`,
            borderBottom: `var(--border-width-thin) solid var(--border-divider)`,
            minHeight: rowHeight[size],
            userSelect: "none",
          }}>
            {/* File Name header */}
            <div style={{ position: "relative", display: "flex", alignItems: "center", gap: "var(--space-2)", padding: cellPad }}>
              <Checkbox checked={allChecked} indeterminate={someChecked} onChange={toggleAll} />
              <button onClick={() => handleSort("name")} style={{
                display: "inline-flex", alignItems: "center", gap: "var(--space-1)",
                border: "none", background: "transparent", cursor: "pointer", padding: 0,
                fontFamily: "var(--font-family-primary)", fontSize: "var(--table-header-font)",
                fontWeight: "var(--font-weight-semibold)" as any, color: "var(--table-header-fg)",
              }}>
                File Name
                <SortArrow dir={sortCol === "name" ? sortDir : null} />
              </button>
              <ColResizeHandle onMouseDown={e => startResize(0, e)} />
            </div>

            {/* Kind header */}
            <div style={{ position: "relative", display: "flex", alignItems: "center", gap: "var(--space-1)", padding: cellPad }}>
              <button onClick={() => handleSort("kind")} style={{
                display: "inline-flex", alignItems: "center", gap: "var(--space-1)",
                border: "none", background: "transparent", cursor: "pointer", padding: 0,
                fontFamily: "var(--font-family-primary)", fontSize: "var(--table-header-font)",
                fontWeight: "var(--font-weight-semibold)" as any, color: "var(--table-header-fg)",
              }}>
                Kind
                <SortArrow dir={sortCol === "kind" ? sortDir : null} />
              </button>
              <ColResizeHandle onMouseDown={e => startResize(1, e)} />
            </div>

            {/* Size header */}
            <div style={{ display: "flex", alignItems: "center", gap: "var(--space-1)", padding: cellPad }}>
              <button onClick={() => handleSort("size")} style={{
                display: "inline-flex", alignItems: "center", gap: "var(--space-1)",
                border: "none", background: "transparent", cursor: "pointer", padding: 0,
                fontFamily: "var(--font-family-primary)", fontSize: "var(--table-header-font)",
                fontWeight: "var(--font-weight-semibold)" as any, color: "var(--table-header-fg)",
              }}>
                Size
                <SortArrow dir={sortCol === "size" ? sortDir : null} />
              </button>
            </div>
          </div>

          {/* ── Table body (scrollable) ── */}
          <div style={{ maxHeight: fileBrowserMaxH[size], overflow: "auto" }}>
            {processedRows.length === 0 ? (
              <div style={{
                padding: "var(--space-6)",
                display: "flex", alignItems: "center", justifyContent: "center",
                color: "var(--table-empty-fg)",
                fontFamily: "var(--font-family-primary)",
                fontSize: "var(--table-body-font)",
              }}>
                No files match the current filter
              </div>
            ) : processedRows.map((f, i) => {
              const checked = checkedMap[f._idx] ?? false;
              return (
                <div
                  key={f._idx}
                  onClick={() => toggleOne(f._idx)}
                  style={{
                    display: "grid",
                    gridTemplateColumns: colTemplate,
                    minHeight: rowHeight[size],
                    alignItems: "center",
                    borderBottom: i < processedRows.length - 1
                      ? `var(--border-width-thin) solid var(--table-row-border)` : "none",
                    background: checked ? "var(--table-row-bg-selected)" : "var(--table-body-bg)",
                    cursor: "pointer",
                    transition: `background var(--duration-fast) var(--ease-out)`,
                  }}
                >
                  {/* File Name cell */}
                  <div style={{ display: "flex", alignItems: "center", gap: "var(--space-2)", padding: cellPad, overflow: "hidden" }}>
                    <Checkbox checked={checked} onChange={() => toggleOne(f._idx)} />
                    <Icon name="file" size="sm" color="tertiary" />
                    <Typography variant="body" weight="medium" color="primary" truncate>{f.name}</Typography>
                  </div>

                  {/* Kind cell */}
                  <div style={{ padding: cellPad, overflow: "hidden" }}>
                    {f.kind
                      ? <BadgeLabel label={f.kind} variant="neutral" size={size === "lg" ? "md" : "md"} />
                      : <Typography variant="body" color="tertiary">—</Typography>}
                  </div>

                  {/* Size cell */}
                  <div style={{ padding: cellPad, overflow: "hidden" }}>
                    <Typography variant="body" color="secondary" truncate>
                      <span style={{ fontFamily: "var(--font-family-mono)" }}>{f.size}</span>
                    </Typography>
                  </div>
                </div>
              );
            })}
          </div>

          {/* ── Footer: result count + destination directory ── */}
          <div style={{
            padding: cellPadInline[size],
            borderTop: `var(--border-width-thin) solid var(--border-divider)`,
            display: "flex", flexDirection: "column",
            gap: "var(--table-filter-bar-gap)",
          }}>
            {/* row count */}
            <div style={{
              display: "flex", alignItems: "center", justifyContent: "space-between",
              gap: "var(--space-2)",
            }}>
              <Typography variant="micro" color="tertiary">
                Showing {processedRows.length} of {files.length} files
              </Typography>
              {sortCol && (
                <button onClick={() => { setSortCol(null); setSortDir(null); }} style={{
                  border: "none", background: "transparent", cursor: "pointer", padding: 0,
                  fontFamily: "var(--font-family-primary)", fontSize: "var(--text-micro)",
                  color: "var(--fg-brand)", textDecoration: "underline",
                }}>
                  Clear sort
                </button>
              )}
            </div>
            <FormField label="Destination Directory" size={size === "sm" ? "sm" : "md"}>
              <TextInput placeholder="/" value={destDir} size={size === "sm" ? "sm" : "md"} />
            </FormField>
          </div>
        </div>

        {/* Info alert */}
        <Alert
          type="info"
          message="Importing will overwrite existing files in the destination directory."
          size={size === "lg" ? "md" : "sm"}
        />
      </div>
    </Modal>
  );
}

// ════════════════════════════════════════════════════════════════════════════
//  DEMO HELPERS
// ════════════════════════════════════════════════════════════════════════════
function DemoSection({
  index = 0, title, description, molecules = [], atoms = [], children,
}: {
  index?: number; title: string; description: string;
  molecules?: string[]; atoms?: string[];
  children: React.ReactNode;
}) {
  return (
    <SectionCard
      index={index} title={title} description={description}
      builtFrom={[...molecules, ...atoms]} tier="T3 · Organism"
    >
      {children}
    </SectionCard>
  );
}

// ════════════════════════════════════════════════════════════════════════════
//  25. MENUBAR  (molecules: Dropdown Menu · atoms: Button · Typography · Icon · Divider)
// ════════════════════════════════════════════════════════════════════════════
interface MenubarMenu { key: string; label: string; items: DropdownItem[]; }
interface MenubarProps { menus: MenubarMenu[]; activeMenu?: string; style?: React.CSSProperties; }
export function Menubar({ menus, activeMenu, style }: MenubarProps) {
  return (
    <div style={{ position:"relative", display:"inline-flex", background:"var(--bg-primary)", border:`var(--border-width-thin) solid var(--border-default)`, borderRadius:"var(--radius-sm-ds)", padding:"var(--space-1)", gap:"var(--space-1)", ...style }}>
      {menus.map(menu => (
        <div key={menu.key} style={{ position:"relative" }}>
          <button style={{ padding:"var(--space-1) var(--space-2)", borderRadius:"var(--radius-xs)", border:"none", cursor:"pointer", background:menu.key===activeMenu?"var(--item-active-bg)":"transparent", color:menu.key===activeMenu?"var(--fg-brand)":"var(--fg-primary)", fontSize:"var(--text-base)", fontFamily:"var(--font-family-primary)", fontWeight:"var(--font-weight-medium)" as any }}>{menu.label}</button>
          {menu.key===activeMenu && (
            <div style={{ position:"absolute", top:"calc(100% + var(--space-1))", left:0, zIndex:"var(--z-dropdown)" as any, minWidth:"var(--dropdown-min-w-md)", background:"var(--bg-primary)", border:`var(--border-width-thin) solid var(--border-default)`, borderRadius:"var(--radius-md-ds)", boxShadow:"var(--shadow-lg)", padding:"var(--space-1) 0" }}>
              {menu.items.map(item => item.separator ? (
                <div key={item.key} style={{ height:"var(--border-width-thin)", background:"var(--border-divider)", margin:"var(--space-1) 0" }} />
              ) : (
                <div key={item.key} style={{ display:"flex", alignItems:"center", gap:"var(--space-2)", padding:"var(--space-2) var(--space-3)", cursor:"pointer", opacity:item.disabled?"var(--opacity-subtle)" as any:1 }}>
                  <span style={{ flex:1, fontSize:"var(--text-base)", fontFamily:"var(--font-family-primary)", color:item.disabled?"var(--fg-disabled)":"var(--fg-primary)" }}>{item.label}</span>
                  {item.shortcut && <span style={{ fontSize:"var(--text-micro)", fontFamily:"var(--font-family-mono)", color:"var(--fg-tertiary)" }}>{item.shortcut}</span>}
                </div>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

// ════════════════════════════════════════════════════════════════════════════
//  26. SHEET  (molecules: Form Field · Card · atoms: Button · Typography · Icon · Divider)
// ════════════════════════════════════════════════════════════════════════════
type SheetSide = "top"|"bottom"|"left"|"right";
interface SheetProps { title: string; side?: SheetSide; children?: React.ReactNode; footer?: React.ReactNode; style?: React.CSSProperties; }
export function Sheet({ title, side="right", children, footer, style }: SheetProps) {
  return (
    <div style={{ width:side==="left"||side==="right"?360:undefined, background:"var(--bg-primary)", border:`var(--border-width-thin) solid var(--border-default)`, borderRadius:"var(--radius-md-ds)", boxShadow:"var(--shadow-xl)", display:"flex", flexDirection:"column", overflow:"hidden", ...style }}>
      <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", padding:"var(--space-4) var(--space-6)", borderBottom:`var(--border-width-thin) solid var(--border-divider)`, flexShrink:0 }}>
        <Typography variant="title" weight="semibold" color="primary">{title}</Typography>
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none" style={{ cursor:"pointer" }}><path d="M3 3L11 11M11 3L3 11" stroke="var(--icon-tertiary)" strokeWidth="1.5" strokeLinecap="round"/></svg>
      </div>
      <div style={{ flex:1, overflow:"auto", padding:"var(--space-6)" }}>{children}</div>
      {footer && <div style={{ padding:"var(--space-3) var(--space-6)", borderTop:`var(--border-width-thin) solid var(--border-divider)`, display:"flex", justifyContent:"flex-end", gap:"var(--space-2)" }}>{footer}</div>}
    </div>
  );
}

// ═══════════���════════════════════════════════════════════════════════════════
//  27. COMMAND  (molecules: Search Bar · atoms: Input · Icon · Typography · Badge · Divider)
// ════════════════════════════════════════════════════════════════════════════
interface CommandItemData { key: string; label: string; icon?: React.ReactNode; group?: string; shortcut?: string[]; }
interface CommandProps { items?: CommandItemData[]; placeholder?: string; style?: React.CSSProperties; }
export function Command({ items=[], placeholder="Type a command or search…", style }: CommandProps) {
  const groups = items.reduce((acc, item) => {
    const g = item.group ?? "Results";
    if (!acc[g]) acc[g] = [];
    acc[g].push(item);
    return acc;
  }, {} as Record<string, CommandItemData[]>);
  return (
    <div style={{ width:"var(--showcase-drawer-w)", background:"var(--bg-primary)", border:`var(--border-width-thin) solid var(--border-default)`, borderRadius:"var(--radius-md-ds)", boxShadow:"var(--shadow-xl)", overflow:"hidden", ...style }}>
      <div style={{ display:"flex", alignItems:"center", gap:"var(--space-2)", padding:"var(--space-3) var(--space-4)", borderBottom:`var(--border-width-thin) solid var(--border-divider)` }}>
        <Icon name="search" size="sm" color="tertiary" />
        <span style={{ flex:1, fontSize:"var(--text-base)", fontFamily:"var(--font-family-primary)", color:"var(--fg-disabled)" }}>{placeholder}</span>
        <kbd style={{ fontSize:"var(--text-micro)", color:"var(--fg-tertiary)", fontFamily:"var(--font-family-mono)", background:"var(--bg-secondary)", border:`var(--border-width-thin) solid var(--border-default)`, borderRadius:"var(--radius-xs)", padding:"var(--space-px) var(--space-1)" }}>esc</kbd>
      </div>
      <div style={{ maxHeight:"var(--panel-list-max-h-sm)", overflowY:"auto" as const, padding:"var(--space-1) 0" }}>
        {Object.entries(groups).map(([group, gItems]) => (
          <div key={group}>
            <div style={{ padding:"var(--space-2) var(--space-4) var(--space-1)", fontSize:"var(--text-micro)", fontFamily:"var(--font-family-primary)", color:"var(--fg-tertiary)", fontWeight:"var(--font-weight-semibold)" as any, textTransform:"uppercase" as const, letterSpacing:"var(--letter-spacing-tracking-lg)" }}>{group}</div>
            {gItems.map((item, i) => (
              <div key={item.key} style={{ display:"flex", alignItems:"center", gap:"var(--space-2)", padding:"var(--space-2) var(--space-4)", cursor:"pointer", background:i===0?"var(--item-active-bg)":"transparent" }}>
                {item.icon && <span style={{ width:"var(--size-icon-md)", height:"var(--size-icon-md)", display:"flex", alignItems:"center", justifyContent:"center", background:"var(--bg-secondary)", borderRadius:"var(--radius-xs)", flexShrink:0 }}>{item.icon}</span>}
                <span style={{ flex:1, fontSize:"var(--text-base)", fontFamily:"var(--font-family-primary)", color:"var(--fg-primary)" }}>{item.label}</span>
                {item.shortcut && <div style={{ display:"flex", gap:"var(--space-half)" }}>{item.shortcut.map((k,ki)=><kbd key={ki} style={{ fontSize:"var(--text-micro)", fontFamily:"var(--font-family-mono)", color:"var(--fg-tertiary)", background:"var(--bg-secondary)", border:`var(--border-width-thin) solid var(--border-default)`, borderRadius:"var(--radius-xs)", padding:"var(--space-px) var(--space-1)" }}>{k}</kbd>)}</div>}
              </div>
            ))}
          </div>
        ))}
      </div>
      <div style={{ borderTop:`var(--border-width-thin) solid var(--border-divider)`, padding:"var(--space-2) var(--space-4)", display:"flex", gap:"var(--space-4)" }}>
        {[["↑↓","Navigate"],["↵","Select"],["esc","Close"]].map(([key, label]) => (
          <div key={label} style={{ display:"flex", gap:"var(--space-1)", alignItems:"center" }}>
            <kbd style={{ fontSize:"var(--text-micro)", fontFamily:"var(--font-family-mono)", color:"var(--fg-tertiary)", background:"var(--bg-secondary)", border:`var(--border-width-thin) solid var(--border-default)`, borderRadius:"var(--radius-xs)", padding:"var(--space-px) var(--space-1)" }}>{key}</kbd>
            <Typography variant="micro" color="tertiary">{label}</Typography>
          </div>
        ))}
      </div>
    </div>
  );
}

// ════════════════════════════════════════════════════════════════════════════
//  28. NAVIGATION MENU  (molecules: Dropdown Menu · atoms: Button · Typography · Icon · Badge)
// ════════════════════════════════════════════════════════════════════════════
interface NavMenuSubItem { label: string; description?: string; icon?: React.ReactNode; }
interface NavMenuItemDef { key: string; label: string; items?: NavMenuSubItem[]; }
interface NavigationMenuProps { items: NavMenuItemDef[]; activeKey?: string; style?: React.CSSProperties; }
export function NavigationMenu({ items, activeKey, style }: NavigationMenuProps) {
  return (
    <div style={{ position:"relative", display:"inline-flex", gap:"var(--space-1)", background:"var(--bg-primary)", border:`var(--border-width-thin) solid var(--border-default)`, borderRadius:"var(--radius-sm-ds)", padding:"var(--space-1)", ...style }}>
      {items.map(item=>(
        <div key={item.key} style={{ position:"relative" }}>
          <button style={{ display:"inline-flex", alignItems:"center", gap:"var(--space-1)", padding:"var(--space-1) var(--space-2)", border:"none", background:item.key===activeKey?"var(--item-active-bg)":"transparent", borderRadius:"var(--radius-xs)", cursor:"pointer", color:item.key===activeKey?"var(--fg-brand)":"var(--fg-primary)", fontSize:"var(--text-base)", fontFamily:"var(--font-family-primary)", fontWeight:"var(--font-weight-medium)" as any }}>
            {item.label}
            {item.items && <svg width="10" height="10" viewBox="0 0 10 10" fill="none"><path d="M2 3.5L5 6.5L8 3.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>}
          </button>
          {item.items && item.key===activeKey && (
            <div style={{ position:"absolute", top:"calc(100% + var(--space-1))", left:0, zIndex:"var(--z-dropdown)" as any, minWidth:"var(--dropdown-min-w-lg)", background:"var(--bg-primary)", border:`var(--border-width-thin) solid var(--border-default)`, borderRadius:"var(--radius-md-ds)", boxShadow:"var(--shadow-lg)", padding:"var(--space-2)" }}>
              {item.items.map((sub,i)=>(
                <div key={i} style={{ display:"flex", alignItems:"flex-start", gap:"var(--space-2)", padding:"var(--space-2) var(--space-3)", borderRadius:"var(--radius-sm-ds)", cursor:"pointer" }}>
                  {sub.icon && <span style={{ flexShrink:0, marginTop:"var(--space-half)" }}>{sub.icon}</span>}
                  <div>
                    <Typography variant="body" weight="medium" color="primary">{sub.label}</Typography>
                    {sub.description && <Typography variant="label" color="secondary">{sub.description}</Typography>}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

// ════════════════════════════════════════════════════════════════════════════
//  29. SIDEBAR NAV  (molecules: List Item · atoms: Icon · Typography · Badge · Divider)
// ════════════════════════════════════════════════════════════════════════════
interface SidebarNavItem { key: string; label: string; icon?: React.ReactNode; badge?: string; active?: boolean; section?: string; }
interface SidebarNavProps { items: SidebarNavItem[]; collapsed?: boolean; brand?: string; style?: React.CSSProperties; }
export function SidebarNav({ items, collapsed, brand="App", style }: SidebarNavProps) {
  const sections = items.reduce((acc, item) => {
    const s = item.section ?? "";
    if (!acc[s]) acc[s] = [];
    acc[s].push(item);
    return acc;
  }, {} as Record<string, SidebarNavItem[]>);
  return (
    <div style={{ width:collapsed?"var(--sidebar-nav-w-collapsed)":"var(--sidebar-nav-w-expanded)", display:"flex", flexDirection:"column", background:"var(--bg-primary)", border:`var(--border-width-thin) solid var(--border-default)`, borderRadius:"var(--radius-md-ds)", overflow:"hidden", ...style }}>
      <div style={{ padding:"var(--space-3)", borderBottom:`var(--border-width-thin) solid var(--border-divider)`, display:"flex", alignItems:"center", gap:"var(--space-2)" }}>
        <div style={{ width:"var(--showcase-icon-badge-size)", height:"var(--showcase-icon-badge-size)", borderRadius:"var(--radius-xs)", background:"var(--bg-brand)", display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0 }}>
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><rect x="1" y="1" width="5.5" height="5.5" rx="1" fill="var(--primary-foreground)"/><rect x="7.5" y="1" width="5.5" height="5.5" rx="1" fill="var(--primary-foreground)" style={{ fillOpacity:"var(--opacity-muted)" }}/><rect x="1" y="7.5" width="5.5" height="5.5" rx="1" fill="var(--primary-foreground)" style={{ fillOpacity:"var(--opacity-muted)" }}/><rect x="7.5" y="7.5" width="5.5" height="5.5" rx="1" fill="var(--primary-foreground)" style={{ fillOpacity:"var(--opacity-subtle)" }}/></svg>
        </div>
        {!collapsed && <Typography variant="body" weight="bold" color="primary">{brand}</Typography>}
      </div>
      <div style={{ flex:1, padding:"var(--space-2)", display:"flex", flexDirection:"column", gap:"var(--space-1)", overflowY:"auto" as const }}>
        {Object.entries(sections).map(([section, sItems]) => (
          <div key={section} style={{ display:"contents" }}>
            {section && !collapsed && <Typography variant="micro" color="tertiary" style={{ padding:"var(--space-2) var(--space-2) var(--space-1)", textTransform:"uppercase" as const, letterSpacing:"var(--letter-spacing-tracking-lg)", fontWeight:"var(--font-weight-semibold)" as any }}>{section}</Typography>}
            {sItems.map(item=>(
              <div key={item.key} style={{ display:"flex", alignItems:"center", gap:"var(--space-2)", padding:`0 var(--space-2)`, height:"var(--btn-height-md)", borderRadius:"var(--radius-sm-ds)", cursor:"pointer", background:item.active?"var(--item-active-bg)":"transparent" }}>
                {item.icon && <span style={{ display:"flex", flexShrink:0, color:item.active?"var(--fg-brand)":"var(--fg-secondary)" }}>{item.icon}</span>}
                {!collapsed && <Typography variant="body" weight={item.active?"semibold":"regular"} color={item.active?"brand":"secondary"} style={{ flex:1 }}>{item.label}</Typography>}
                {!collapsed && item.badge && <BadgeLabel label={item.badge} variant={item.active?"primary":"neutral"} size="sm" />}
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

// ════════════════════════════════════════════════════════════════════════════
//  30. FORM  (molecules: Form Field · Checkbox Block · atoms: Input · Select · Button · Typography · Label · Checkbox)
// ════════════════════════════════════════════════════════════════════════════
interface FormFieldDef { key: string; label: string; type: "text"|"select"|"checkbox"; required?: boolean; error?: string; options?: string[]; placeholder?: string; }
interface FormWrapperProps { fields: FormFieldDef[]; submitLabel?: string; title?: string; errorSummary?: string; style?: React.CSSProperties; }
export function FormWrapper({ fields, submitLabel="Submit", title, errorSummary, style }: FormWrapperProps) {
  return (
    <form onSubmit={e=>e.preventDefault()} style={{ display:"flex", flexDirection:"column", gap:"var(--space-4)", ...style }}>
      {title && <Typography variant="title" weight="semibold" color="primary">{title}</Typography>}
      {errorSummary && (
        <div style={{ padding:"var(--space-3) var(--space-4)", background:"var(--bg-error-subtle)", border:`var(--border-width-thin) solid var(--input-ds-border-error)`, borderRadius:"var(--radius-sm-ds)" }}>
          <Typography variant="label" color="error">{errorSummary}</Typography>
        </div>
      )}
      {fields.map(field=>(
        <div key={field.key} style={{ display:"flex", flexDirection:"column", gap:"var(--space-1)" }}>
          <label style={{ display:"inline-flex", alignItems:"center", gap:"var(--space-1)", fontSize:"var(--text-base)", fontFamily:"var(--font-family-primary)", fontWeight:"var(--font-weight-medium)" as any, color:"var(--fg-primary)" }}>
            {field.label}{field.required && <span style={{ color:"var(--form-required-color)" }}>*</span>}
          </label>
          {field.type==="text" && <TextInput placeholder={field.placeholder??`Enter ${field.label.toLowerCase()}…`} error={!!field.error} />}
          {field.type==="select" && <Select options={(field.options??[]).map(o=>({label:o,value:o.toLowerCase().replace(/\s/g,"-")}))} error={!!field.error} />}
          {field.type==="checkbox" && <Checkbox label={`I agree to the ${field.label}`} />}
          {field.error && <Typography variant="label" color="error">{field.error}</Typography>}
        </div>
      ))}
      <div style={{ display:"flex", justifyContent:"flex-end", gap:"var(--space-2)", paddingTop:"var(--space-2)", borderTop:`var(--border-width-thin) solid var(--border-divider)` }}>
        <Button variant="secondary" type="button">Cancel</Button>
        <Button variant="primary" type="submit">{submitLabel}</Button>
      </div>
    </form>
  );
}

// ════════════════════════════════════════════════════════════════════════════
//  O31. RESOURCE ALLOCATION DRAWER
//  Full GPU resource allocation drawer — Title, GPU cards, CPU/Memory inputs,
//  Storage Quotas sliders, Cancel/Save footer.
//  Built from: GpuAllocationCard × N, StorageQuotaRow × 2, TextInput, Button
// ════════════════════════════════════════════════════════════════════════════
export interface ResourceGpu {
  vendor: GpuVendor;
  model: string;
  value: number;
  max: number;
  migEnabled: boolean;
  partitions: MigPartition[];
}

export interface ResourceAllocationState {
  gpus:    ResourceGpu[];
  cpu:     string;
  memory:  string;
  fileStorage:   number;
  objectStorage: number;
}

export interface ResourceAllocationDrawerProps {
  state?: ResourceAllocationState;
  onClose?: () => void;
  onSave?:  () => void;
  style?: React.CSSProperties;
}

export function ResourceAllocationDrawer({
  state = {
    gpus: [
      {
        vendor: "nvidia", model: "H100", value: 12, max: 20, migEnabled: true,
        partitions: [
          { label: "1g.10gb", value: 3, total: 7 },
          { label: "2g.20gb", value: 2, total: 7 },
          { label: "3g.40gb", value: 1, total: 7 },
        ],
      },
    ],
    cpu: "", memory: "", fileStorage: 100, objectStorage: 50,
  },
  onClose,
  onSave,
  style,
}: ResourceAllocationDrawerProps) {
  const [localState, setLocalState] = React.useState(state);

  const updateGpu = (idx: number, patch: Partial<ResourceGpu>) =>
    setLocalState(s => {
      const gpus = [...s.gpus];
      gpus[idx] = { ...gpus[idx], ...patch };
      return { ...s, gpus };
    });

  const updatePartition = (gpuIdx: number, pIdx: number, v: number) =>
    setLocalState(s => {
      const gpus = [...s.gpus];
      const parts = [...gpus[gpuIdx].partitions];
      parts[pIdx] = { ...parts[pIdx], value: v };
      gpus[gpuIdx] = { ...gpus[gpuIdx], partitions: parts };
      return { ...s, gpus };
    });

  return (
    <BaseTemplate
      width="md"
      maxHeight={style?.maxHeight ? String(style.maxHeight) : undefined}
      style={style}
      header={
        <>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", width: "100%" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "var(--space-2)" }}>
              <button onClick={onClose} style={{
                display: "flex", alignItems: "center", justifyContent: "center",
                width: "var(--size-control-sm)", height: "var(--size-control-sm)",
                background: "transparent", border: "none", cursor: "pointer",
                borderRadius: "var(--radius-sm-ds)", color: "var(--fg-secondary)",
              }}>
                <svg width="12" height="10" viewBox="0 0 11.66 10" fill="none">
                  <path d="M0.244 4.41C-0.081 4.737-0.081 5.265 0.244 5.591L4.409 9.756C4.734 10.081 5.263 10.081 5.588 9.756C5.914 9.431 5.914 8.902 5.588 8.577L2.842 5.833H10.828C11.289 5.833 11.662 5.461 11.662 5C11.662 4.539 11.289 4.167 10.828 4.167H2.845L5.586 1.423C5.911 1.098 5.911 0.569 5.586 0.244C5.26-0.081 4.732-0.081 4.406 0.244L0.241 4.409L0.244 4.41Z" fill="currentColor"/>
                </svg>
              </button>
              <Typography variant="title" weight="semibold" color="primary">Resource Allocation</Typography>
            </div>
            <button onClick={onClose} style={{
              display: "flex", alignItems: "center", justifyContent: "center",
              width: "var(--size-control-sm)", height: "var(--size-control-sm)",
              background: "transparent", border: "none", cursor: "pointer",
              borderRadius: "var(--radius-sm-ds)", color: "var(--fg-secondary)",
            }}>
              <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                <path d="M9.709 1.709C10.099 1.318 10.099 0.684 9.709 0.293C9.318-0.098 8.684-0.098 8.293 0.293L5.002 3.587L1.709 0.296C1.318-0.095 0.684-0.095 0.293 0.296C-0.098 0.687-0.098 1.321 0.293 1.712L3.587 5.002L0.296 8.296C-0.095 8.687-0.095 9.321 0.296 9.712C0.687 10.102 1.321 10.102 1.712 9.712L5.002 6.418L8.296 9.709C8.687 10.099 9.321 10.099 9.712 9.709C10.102 9.318 10.102 8.684 9.712 8.293L6.418 5.002L9.709 1.709Z" fill="currentColor"/>
              </svg>
            </button>
          </div>
          <Typography variant="label" color="secondary">
            Verify your GPU resource selections before confirming
          </Typography>
        </>
      }
      footer={
        <>
          <Button variant="secondary" onClick={onClose}>Cancel</Button>
          <Button variant="primary" onClick={onSave}>Save</Button>
        </>
      }
    >
      <div style={{
        display: "flex", flexDirection: "column", gap: "var(--space-5)",
      }}>

        {/* Accelerators section */}
        <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-3)" }}>
          <Typography variant="body" weight="semibold" color="secondary">Accelerators</Typography>
          {localState.gpus.map((gpu, gi) => (
            <GpuAllocationCard
              key={gi}
              vendor={gpu.vendor}
              model={gpu.model}
              value={gpu.value}
              max={gpu.max}
              migEnabled={gpu.migEnabled}
              partitions={gpu.partitions}
              onValueChange={v => updateGpu(gi, { value: v })}
              onMigToggle={v => updateGpu(gi, { migEnabled: v })}
              onPartitionChange={(pi, v) => updatePartition(gi, pi, v)}
            />
          ))}
        </div>

        {/* CPU + Memory row */}
        <div style={{ display: "flex", gap: "var(--space-4)" }}>
          <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: "var(--space-2)" }}>
            <Typography variant="body" weight="medium" color="primary">CPU</Typography>
            <TextInput
              placeholder="{Value}"
              value={localState.cpu}
              onChange={v => setLocalState(s => ({ ...s, cpu: v }))}
            />
          </div>
          <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: "var(--space-2)" }}>
            <Typography variant="body" weight="medium" color="primary">Memory</Typography>
            <TextInput
              placeholder="{Value}"
              value={localState.memory}
              onChange={v => setLocalState(s => ({ ...s, memory: v }))}
            />
          </div>
        </div>

        {/* Storage Quotas */}
        <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-4)" }}>
          <Typography variant="title" weight="medium" color="secondary">Storage Quotas</Typography>
          <Divider />
          <StorageQuotaRow
            label="File Storage (GiB)"
            value={localState.fileStorage}
            secondary={Math.round(localState.fileStorage * 0.2)}
            max={200}
            onChange={v => setLocalState(s => ({ ...s, fileStorage: v }))}
          />
          <StorageQuotaRow
            label="Object Storage (GiB)"
            value={localState.objectStorage}
            max={200}
            marks={[{ value: 60, label: "60", info: true }, { value: 70, label: "70", info: true }]}
            onChange={v => setLocalState(s => ({ ...s, objectStorage: v }))}
          />
        </div>
      </div>
    </BaseTemplate>
  );
}

// ════════════════════════════════════════════════════════════════════════════
//  O32. CLUSTER NODES TABLE
//  Full "Shared Cluster Nodes" page: header, search, column table with
//  Node Name, Tenant, Status, GPU Type, Accelerators, CPU, Memory, Storage, Pods.
//  Built from: NodeNameCell, BadgeLabel, GpuModelTag, AcceleratorGridCell,
//              ResourceBarCell, Typography, TextInput
// ════════════════════════════════════════════════════════════════════════════
export interface ClusterNode {
  hostname:   string;
  ip:         string;
  tenant:     string;
  status:     "healthy" | "warning" | "unhealthy" | "maintenance";
  gpuVendor:  GpuVendor;
  gpuModel:   string;
  accelCount: number;
  accelBlocks: AcceleratorFill[];
  cpu:        { used: string; total: string; usedPct: number; allocPct: number };
  memory:     { used: string; total: string; usedPct: number; allocPct: number };
  storage:    { used: string; total: string; usedPct: number; allocPct: number };
  pods:       number;
}

const nodeStatusBadge: Record<string, { variant: "success"|"warning"|"error"|"neutral"; label: string }> = {
  healthy:     { variant: "success",  label: "Healthy"     },
  warning:     { variant: "warning",  label: "Warning"     },
  unhealthy:   { variant: "error",    label: "Unhealthy"   },
  maintenance: { variant: "neutral",  label: "Maintenance" },
};

interface TableHeaderCellProps { label: string; sortable?: boolean; width?: number | string; }
function TableHeaderCell({ label, sortable, width }: TableHeaderCellProps) {
  return (
    <th style={{
      padding: "var(--space-2) var(--space-3)",
      textAlign: "left", fontWeight: "var(--font-weight-normal)" as any,
      background: "var(--table-header-bg)",
      width,
    }}>
      <div style={{ display: "flex", alignItems: "center", gap: "var(--space-1)" }}>
        <Typography variant="body" color="secondary" style={{ whiteSpace: "nowrap" as const }}>
          {label}
        </Typography>
        {sortable && (
          <svg width="10" height="12" viewBox="0 0 7 9.8" fill="none" style={{ flexShrink: 0, opacity: "var(--opacity-disabled)" as any }}>
            <path d="M3.007 0.205C3.28-0.068 3.724-0.068 3.998 0.205L6.798 3.005C6.999 3.206 7.058 3.506 6.949 3.769C6.839 4.031 6.586 4.202 6.301 4.202H0.701C0.419 4.202 0.163 4.031 0.054 3.769C-0.056 3.506 0.006 3.206 0.205 3.005L3.005 0.205H3.007ZM3.007 9.596L0.207 6.796C0.006 6.595-0.053 6.295 0.056 6.033C0.165 5.77 0.419 5.6 0.703 5.6H6.301C6.583 5.6 6.839 5.77 6.949 6.033C7.058 6.295 6.997 6.595 6.798 6.796L3.998 9.596C3.724 9.869 3.28 9.869 3.007 9.596Z" fill="var(--fg-tertiary)"/>
          </svg>
        )}
      </div>
    </th>
  );
}

interface ClusterNodeRowProps { node: ClusterNode; idx?: number; }
function ClusterNodeRow({ node, idx = 0 }: ClusterNodeRowProps) {
  const badgeCfg = nodeStatusBadge[node.status];
  const rowBg = idx % 2 === 0 ? "var(--bg-primary)" : "var(--table-row-bg-striped)";
  const cellStyle: React.CSSProperties = {
    padding: "var(--space-2) var(--space-3)",
    verticalAlign: "middle",
    background: rowBg,
    borderBottom: `var(--border-width-thin) solid var(--border-divider)`,
  };

  return (
    <tr>
      {/* Node name + IP */}
      <td style={{ ...cellStyle, minWidth: "var(--table-col-min-hostname)" }}>
        <NodeNameCell hostname={node.hostname} ip={node.ip} />
      </td>
      {/* Tenant */}
      <td style={cellStyle}>
        <Typography variant="body" weight="medium" color="brand" style={{ whiteSpace: "nowrap" as const }}>
          {node.tenant}
        </Typography>
      </td>
      {/* Status */}
      <td style={cellStyle}>
        <BadgeLabel label={badgeCfg.label} variant={badgeCfg.variant} size="sm" />
      </td>
      {/* GPU Type */}
      <td style={cellStyle}>
        <div style={{ display: "flex", alignItems: "center", gap: "var(--space-2)" }}>
          <GpuVendorIcon vendor={node.gpuVendor} size={18} />
          <Typography variant="body" weight="medium" color="primary">{node.gpuModel}</Typography>
        </div>
      </td>
      {/* Accelerators */}
      <td style={{ ...cellStyle, minWidth: "var(--table-col-min-accel)" }}>
        <AcceleratorGridCell count={node.accelCount} blocks={node.accelBlocks} />
      </td>
      {/* CPU */}
      <td style={{ ...cellStyle, minWidth: "var(--table-col-min-resource)" }}>
        <ResourceBarCell
          used={node.cpu.used} total={node.cpu.total}
          usedPct={node.cpu.usedPct} allocPct={node.cpu.allocPct}
        />
      </td>
      {/* Memory */}
      <td style={{ ...cellStyle, minWidth: "var(--table-col-min-resource-lg)" }}>
        <ResourceBarCell
          used={node.memory.used} total={node.memory.total}
          usedPct={node.memory.usedPct} allocPct={node.memory.allocPct}
        />
      </td>
      {/* Storage */}
      <td style={{ ...cellStyle, minWidth: "var(--table-col-min-resource-lg)" }}>
        <ResourceBarCell
          used={node.storage.used} total={node.storage.total}
          usedPct={node.storage.usedPct} allocPct={node.storage.allocPct}
        />
      </td>
      {/* Pods */}
      <td style={{ ...cellStyle, textAlign: "center" }}>
        <Typography variant="body" weight="medium" color="primary">{node.pods}</Typography>
      </td>
    </tr>
  );
}

export interface ClusterNodesTableProps {
  title?:       string;
  badge?:       string;
  description?: string;
  nodes?:       ClusterNode[];
  searchPlaceholder?: string;
  style?: React.CSSProperties;
}

const DEMO_NODES: ClusterNode[] = [
  {
    hostname: "ip-10-23-24-232.ec2.internal", ip: "147.93.111.109",
    tenant: "Inference", status: "healthy",
    gpuVendor: "nvidia", gpuModel: "A100", accelCount: 16,
    accelBlocks: ["used","used","used","used","used","used","used","used","allocated","allocated","allocated","allocated","empty","empty","empty","empty"],
    cpu:     { used: "0/0.1", total: "4",        usedPct: 5,  allocPct: 20 },
    memory:  { used: "0/0.5 GiB", total: "15.3 GiB", usedPct: 5,  allocPct: 18 },
    storage: { used: "0/0.5 GiB", total: "15.3 GiB", usedPct: 5,  allocPct: 18 },
    pods: 36,
  },
  {
    hostname: "ip-10-23-24-232.ec2.internal", ip: "147.93.111.109",
    tenant: "Inference", status: "healthy",
    gpuVendor: "amd", gpuModel: "MI350", accelCount: 8,
    accelBlocks: ["used","used","allocated","empty","empty","empty","empty","empty","empty","empty","empty","empty","empty","empty","empty","empty"],
    cpu:     { used: "0/0.1", total: "4",        usedPct: 5,  allocPct: 12 },
    memory:  { used: "0/0.5 GiB", total: "15.3 GiB", usedPct: 5,  allocPct: 12 },
    storage: { used: "0/0.5 GiB", total: "15.3 GiB", usedPct: 5,  allocPct: 12 },
    pods: 36,
  },
  {
    hostname: "ip-10-23-24-232.ec2.internal", ip: "147.93.111.109",
    tenant: "Inference", status: "healthy",
    gpuVendor: "nvidia", gpuModel: "A100", accelCount: 1,
    accelBlocks: ["used","empty","empty","empty","empty","empty","empty","empty","empty","empty","empty","empty","empty","empty","empty","empty"],
    cpu:     { used: "0/0.1", total: "4",        usedPct: 5,  allocPct: 10 },
    memory:  { used: "0/0.5 GiB", total: "15.3 GiB", usedPct: 5,  allocPct: 10 },
    storage: { used: "0/0.5 GiB", total: "15.3 GiB", usedPct: 5,  allocPct: 10 },
    pods: 36,
  },
  {
    hostname: "ip-10-23-24-232.ec2.internal", ip: "147.93.111.109",
    tenant: "Inference", status: "healthy",
    gpuVendor: "nvidia", gpuModel: "A100", accelCount: 8,
    accelBlocks: ["used","used","used","used","allocated","allocated","allocated","allocated","half","half","empty","empty","empty","empty","empty","empty"],
    cpu:     { used: "0/0.1", total: "4",        usedPct: 10, allocPct: 28 },
    memory:  { used: "0/0.5 GiB", total: "15.3 GiB", usedPct: 10, allocPct: 28 },
    storage: { used: "0/0.5 GiB", total: "15.3 GiB", usedPct: 10, allocPct: 28 },
    pods: 36,
  },
  {
    hostname: "ip-10-23-24-232.ec2.internal", ip: "147.93.111.109",
    tenant: "Inference", status: "healthy",
    gpuVendor: "nvidia", gpuModel: "A100", accelCount: 8,
    accelBlocks: ["used","used","allocated","allocated","half","empty","empty","empty","empty","empty","empty","empty","empty","empty","empty","empty"],
    cpu:     { used: "0/0.1", total: "4",        usedPct: 5,  allocPct: 18 },
    memory:  { used: "0/0.5 GiB", total: "15.3 GiB", usedPct: 5,  allocPct: 18 },
    storage: { used: "0/0.5 GiB", total: "15.3 GiB", usedPct: 5,  allocPct: 18 },
    pods: 36,
  },
  {
    hostname: "ip-10-23-24-232.ec2.internal", ip: "147.93.111.109",
    tenant: "Inference", status: "healthy",
    gpuVendor: "amd", gpuModel: "MI350", accelCount: 8,
    accelBlocks: ["used","used","used","allocated","allocated","empty","empty","empty","empty","empty","empty","empty","empty","empty","empty","empty"],
    cpu:     { used: "0/0.1", total: "4",        usedPct: 8,  allocPct: 22 },
    memory:  { used: "0/0.5 GiB", total: "15.3 GiB", usedPct: 8,  allocPct: 22 },
    storage: { used: "0/0.5 GiB", total: "15.3 GiB", usedPct: 8,  allocPct: 22 },
    pods: 36,
  },
];

export function ClusterNodesTable({
  title = "Shared Cluster Nodes",
  badge = "Shared",
  description = "View and manage compute nodes within this cluster. Monitor resource allocation and usage metrics in real-time.",
  nodes = DEMO_NODES,
  searchPlaceholder = "Search for nodes",
  style,
}: ClusterNodesTableProps) {
  const [search, setSearch] = React.useState("");

  const filtered = search
    ? nodes.filter(n =>
        n.hostname.toLowerCase().includes(search.toLowerCase()) ||
        n.gpuModel.toLowerCase().includes(search.toLowerCase()) ||
        n.status.toLowerCase().includes(search.toLowerCase())
      )
    : nodes;

  return (
    <div style={{
      display: "flex", flexDirection: "column", gap: "var(--space-4)",
      fontFamily: "var(--font-family-primary)",
      ...style,
    }}>
      {/* ── Page header ────────────────────────────────────────────── */}
      <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: "var(--space-4)" }}>
        <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-1)" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "var(--space-2)" }}>
            <Typography variant="heading" weight="bold" color="primary">{title}</Typography>
            <BadgeLabel label={badge} variant="info" size="sm" />
          </div>
          <Typography variant="body" color="secondary">{description}</Typography>
        </div>
        {/* Search input */}
        <div style={{ position: "relative", width: "var(--showcase-search-w)", flexShrink: 0 }}>
          <div style={{
            position: "absolute", left: "var(--space-3)", top: "50%", transform: "translateY(-50%)",
            color: "var(--fg-tertiary)",
          }}>
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <circle cx="6.5" cy="6.5" r="5.5" stroke="currentColor" strokeWidth="1.5"/>
              <path d="M11 11L14 14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
            </svg>
          </div>
          <input
            type="text"
            placeholder={searchPlaceholder}
            value={search}
            onChange={e => setSearch(e.target.value)}
            style={{
              width: "100%", height: "var(--size-control-lg)",
              paddingLeft: "var(--space-8)", paddingRight: "var(--space-3)",
              border: `var(--border-width-thin) solid var(--border-default)`,
              borderRadius: "var(--radius-md-ds)",
              background: "var(--bg-primary)",
              fontFamily: "var(--font-family-primary)",
              fontSize: "var(--text-base)",
              color: "var(--fg-primary)",
              boxShadow: "var(--shadow-xs)",
              outline: "none",
              boxSizing: "border-box" as const,
            }}
          />
        </div>
      </div>

      {/* ── Table ──────────────────────────────────────────────────── */}
      <div style={{
        border: `var(--border-width-thin) solid var(--border-default)`,
        borderRadius: "var(--radius-md-ds)",
        overflow: "hidden",
        boxShadow: "var(--shadow-xs)",
      }}>
        <div style={{ overflowX: "auto" as const }}>
          <table style={{
            width: "100%", borderCollapse: "collapse",
            fontFamily: "var(--font-family-primary)",
          }}>
            <thead>
              <tr style={{ background: "var(--table-header-bg)" }}>
                <TableHeaderCell label="Node Name"       sortable width={200} />
                <TableHeaderCell label="Tenant Assigned" />
                <TableHeaderCell label="Status"          />
                <TableHeaderCell label="GPU Type"        />
                <TableHeaderCell label="Accelerators"    width={200} />
                <TableHeaderCell label="CPU"             />
                <TableHeaderCell label="Memory"          />
                <TableHeaderCell label="Local Storage"   />
                <TableHeaderCell label="Pods"            width={72} />
              </tr>
            </thead>
            <tbody>
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan={9} style={{
                    textAlign: "center", padding: "var(--space-8)",
                    color: "var(--fg-tertiary)",
                    fontFamily: "var(--font-family-primary)",
                    fontSize: "var(--text-base)",
                  }}>
                    No nodes match your search.
                  </td>
                </tr>
              ) : (
                filtered.map((node, i) => <ClusterNodeRow key={i} node={node} idx={i} />)
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

// ════════════════════════════════════════════════════════════════════════════
//  ORGANISMS TAB
// ════════════════════════════════════════════════════════════════════════════
export function OrganismsTab() {
  return (
    <div style={{ display:"flex", flexDirection:"column", gap:"var(--space-6)" }}>

      <TierHeader
        tier="T3"
        label="Organisms"
        description="Complex, self-contained UI sections assembled from molecules and atoms. Organisms are the building blocks of page templates."
        count={33}
        dependsOn="T2 · Molecules"
      />

      {/* 1. NavBar */}
      <DemoSection index={1} title="NavBar" description="Top navigation bar with brand, links, search, and user avatar."
        molecules={["Search Bar"]} atoms={["Button","Avatar","Badge","Icon","Typography"]}>
        <NavBar />
      </DemoSection>

      {/* 2. Side Navigation */}
      <DemoSection index={2} title="Side Navigation" description="Vertical sidebar with icon nav items and optional badge counts."
        molecules={["List Item"]} atoms={["Icon","Badge","Divider","Typography"]}>
        <div style={{ display:"flex", gap:"var(--space-6)" }}>
          <SideNavigation title="Platform" items={[
            { label:"Dashboard", active:true, icon:<Icon name="home" size="sm" color="brand" /> },
            { label:"Models", badge:"12", icon:<Icon name="grid" size="sm" color="secondary" /> },
            { label:"Workspaces", icon:<Icon name="folder" size="sm" color="secondary" /> },
            { label:"Activity", badge:"3", icon:<Icon name="bell" size="sm" color="secondary" /> },
            { label:"Settings", icon:<Icon name="settings" size="sm" color="secondary" /> },
          ]} />
          <SideNavigation title="Account" items={[
            { label:"Profile", icon:<Icon name="user" size="sm" color="secondary" /> },
            { label:"Security", active:true, icon:<Icon name="lock" size="sm" color="brand" /> },
            { label:"Billing", icon:<Icon name="star" size="sm" color="secondary" /> },
          ]} />
        </div>
      </DemoSection>

      {/* 3. Data Table */}
      <DemoSection index={3} title="Data Table" description="Sortable, paginated table with status cells and row actions."
        molecules={["Pagination","Tabs"]} atoms={["Button","Badge","Tag","Checkbox","Typography","Icon"]}>
        <DataTable
          title="Models" pagination={{ current:1, total:38 }}
          actions={<div style={{ display:"flex", gap:"var(--space-2)" }}><Button variant="secondary" size="sm">Filter</Button><Button variant="primary" size="sm">Add Model</Button></div>}
          columns={[
            { key:"name", title:"Name", render:(v) => <Typography variant="body" weight="medium" color="primary">{v}</Typography> },
            { key:"status", title:"Status", render:(v) => <BadgeLabel label={v} variant={v==="active"?"success":v==="training"?"info":"neutral"} /> },
            { key:"framework", title:"Framework" },
            { key:"updated", title:"Last Updated", render:(v) => <Typography variant="label" color="tertiary">{v}</Typography> },
          ]}
          data={[
            { id:1, name:"gpt-base-v2", status:"active", framework:"PyTorch", updated:"2h ago" },
            { id:2, name:"vision-v1", status:"training", framework:"TensorFlow", updated:"5h ago" },
            { id:3, name:"bert-finetuned", status:"archived", framework:"PyTorch", updated:"3d ago" },
          ]}
        />
      </DemoSection>

      {/* 4. Drawer */}
      <DemoSection index={4} title="Drawer" description="Slide-in panel for forms and secondary tasks."
        molecules={["Form Field"]} atoms={["Button","Input","Label","Typography","Divider","Icon"]}>
        <div style={{ display:"flex", gap:"var(--space-6)", alignItems:"flex-start" }}>
          <ImportDrawer files={[{name:"data.csv",size:"2.4 MB",status:"complete"},{name:"weights.pt",size:"840 MB",status:"uploading",progress:68}]} />
          <ExportDrawer />
        </div>
      </DemoSection>

      {/* 5. Modal */}
      <DemoSection index={5} title="Modal" description="Focused dialog for confirmations and quick actions."
        molecules={["Card"]} atoms={["Button","Typography","Icon"]}>
        <div style={{ display:"flex", gap:"var(--space-6)", alignItems:"flex-start", flexWrap:"wrap" as const }}>
          <Modal title="Confirm Delete" size="sm" footer={<div style={{ display:"flex", gap:"var(--space-2)" }}><Button variant="secondary">Cancel</Button><Button variant="danger">Delete</Button></div>}>
            <Typography variant="body" color="secondary">Are you sure you want to delete this model? This action cannot be undone.</Typography>
          </Modal>
          <Modal title="Edit Configuration" size="md" footer={<div style={{ display:"flex", gap:"var(--space-2)" }}><Button variant="secondary">Cancel</Button><Button variant="primary">Save</Button></div>}>
            <div style={{ display:"flex", flexDirection:"column", gap:"var(--space-4)" }}>
              <FormField label="Model name"><TextInput value="gpt-base-v2" /></FormField>
              <FormField label="Description"><TextInput placeholder="Optional description…" /></FormField>
            </div>
          </Modal>
        </div>
      </DemoSection>

      {/* 6. Profile Card */}
      <DemoSection index={6} title="Profile Card" description="User or resource overview card with stats."
        molecules={["Stat Card","Card"]} atoms={["Avatar","Typography","Badge","Button"]}>
        <div style={{ display:"flex", gap:"var(--space-4)", flexWrap:"wrap" as const }}>
          <ProfileCard name="Sarah Chen" role="ML Engineer" email="sarah@example.com" stats={[{label:"Models",value:"24"},{label:"Workspaces",value:"8"}]} />
          <ProfileCard name="Marcus Williams" role="Platform Admin" email="marcus@example.com" stats={[{label:"Models",value:"142"},{label:"Workspaces",value:"38"}]} />
        </div>
      </DemoSection>

      {/* 7. Settings Form */}
      <DemoSection index={7} title="Settings Form" description="Multi-section settings with collapsible groups and toggles."
        molecules={["Form Field","Tabs","Card"]} atoms={["Switch","Input","Select","Label","Button","Typography","Divider"]}>
        <SettingsForm />
      </DemoSection>

      {/* 8. Pricing Cards */}
      <DemoSection index={8} title="Pricing Cards" description="Comparison grid with feature lists and CTA buttons."
        molecules={["Card"]} atoms={["Typography","Button","Badge","Divider","Icon"]}>
        <PricingCards />
      </DemoSection>

      {/* 9. Comment Thread */}
      <DemoSection index={9} title="Comment Thread" description="Nested discussion thread with reply input."
        molecules={["Card"]} atoms={["Avatar","Typography","Button","Input","Divider","Icon"]}>
        <CommentThread />
      </DemoSection>

      {/* 10. Stats Row */}
      <DemoSection index={10} title="Stats Row" description="Horizontal grid of KPI stat cards."
        molecules={["Stat Card"]} atoms={["Typography","Badge","Icon"]}>
        <StatsRow />
      </DemoSection>

      {/* 11. Activity Feed */}
      <DemoSection index={11} title="Activity Feed" description="Chronological event feed with actor, action, and target."
        molecules={["List Item","Card"]} atoms={["Avatar","Typography","Tag","Badge","Icon"]}>
        <ActivityFeed />
      </DemoSection>

      {/* 12. Product Card */}
      <DemoSection index={12} title="Product Card" description="Model or workspace card with tags and metadata."
        molecules={["Card"]} atoms={["Tag","Badge","Typography","Button","Progress","Icon"]}>
        <div style={{ display:"grid", gridTemplateColumns:"repeat(3, 1fr)", gap:"var(--space-4)" }}>
          <ProductCard variant="model" title="gpt-base-v2" tags={["NLP","GPT","Production"]} date="Updated 2h ago" action="View details" />
          <ProductCard variant="workspace" title="Vision Experiments" description="Object detection and segmentation experiments." tags={["CV","YOLO"]} resources={[{label:"Models",value:"12"},{label:"GPUs",value:"4x A100"}]} action="Open" />
          <ProductCard variant="model" title="bert-finetuned" tags={["NLP","BERT","Fine-tuned","Archived"]} date="Updated 3d ago" action="Restore" />
        </div>
      </DemoSection>

      {/* 13. Card Grid */}
      <DemoSection index={13} title="Card Grid" description="Responsive grid layout for card collections."
        molecules={["Card"]} atoms={["Tag","Typography","Button"]}>
        <CardGrid columns={3}>
          {["Infrastructure","Security","Billing"].map(t => (
            <Card key={t} title={t} extra={<Button variant="ghost" size="sm">Edit</Button>}>
              <Typography variant="body" color="secondary">Configure your {t.toLowerCase()} settings here.</Typography>
            </Card>
          ))}
        </CardGrid>
      </DemoSection>

      {/* 14. Import Drawer */}
      <DemoSection index={14} title="Import Drawer" description="File upload drawer with source/destination fields and progress."
        molecules={["Form Field","Card"]} atoms={["Select","Upload","Button","Input","Typography","Divider","Icon"]}>
        <ImportDrawer files={[{name:"weights.pt",size:"840 MB",status:"uploading",progress:42},{name:"config.yaml",size:"4 KB",status:"complete"}]} />
      </DemoSection>

      {/* 15. Export Drawer */}
      <DemoSection index={15} title="Export Drawer" description="Export configuration drawer with format and compression options."
        molecules={["Form Field","Card"]} atoms={["Select","Input","Button","Typography","Divider","Icon"]}>
        <ExportDrawer />
      </DemoSection>

      {/* 16. Form Wizard */}
      <DemoSection index={16} title="Form Wizard" description="Multi-step form with stepper, navigation and contextual inputs."
        molecules={["Form Field","Card","Tabs"]} atoms={["Stepper","Select","Slider","Switch","Input","Button","Typography","Divider"]}>
        <FormWizard />
      </DemoSection>

      {/* 17. Notification Panel */}
      <DemoSection index={17} title="Notification Panel" description="Slide-out dropdown panel with All / Unread / Mentions tabs, unread dot indicators, and Mark-all-read action."
        molecules={["Notification Item","Tabs","Card"]} atoms={["Avatar","Typography","Badge","Button","Icon","Divider"]}>
        <NotificationPanelOrg />
      </DemoSection>

      {/* 18. Command Bar */}
      <DemoSection index={18} title="Command Bar" description="Global ⌘K command palette with Recent, Actions, and Team Members result groups + keyboard navigation hints."
        molecules={["Command Palette","Search Bar"]} atoms={["Input","Icon","Badge","Typography","Avatar"]}>
        <CommandBar />
      </DemoSection>

      {/* 19. File Manager */}
      <DemoSection index={19} title="File Manager" description="Upload zone + file list (done / uploading / error states) + bulk selection toolbar with contextual actions."
        molecules={["File Card","Action Bar","Empty State"]} atoms={["Upload","Button","Typography","Progress","Icon","Checkbox","Badge"]}>
        <FileManager />
      </DemoSection>

      {/* 20. Dashboard Header */}
      <DemoSection index={20} title="Dashboard Header" description="Page-level header with breadcrumb trail, workspace title, date range picker, action buttons, and inline KPI summary row."
        molecules={["Breadcrumb Nav","Date Range Picker","Search Bar"]} atoms={["Typography","Button","Icon","Badge","Avatar"]}>
        <DashboardHeader />
      </DemoSection>

      {/* 21. Onboarding Wizard */}
      <DemoSection index={21} title="Onboarding Wizard" description="Multi-step onboarding flow with gradient header, horizontal stepper, contextual form, progress indicator, and Skip / Continue footer."
        molecules={["Form Field","Card","Tabs","Empty State"]} atoms={["Stepper","Button","Typography","Input","Select","Switch","Avatar","Progress","Divider"]}>
        <OnboardingWizard />
      </DemoSection>

      {/* 22. Table with Filters */}
      <DemoSection index={22} title="Table with Filters" description="Enhanced data table with search, environment filter chips, active tag, column sort arrows, row selection, bulk action bar, and pagination."
        molecules={["Pagination","Tabs","Search Bar","Action Bar"]} atoms={["Button","Badge","Tag","Checkbox","Select","Input","Typography","Icon","Dropdown Menu"]}>
        <TableWithFilters />
      </DemoSection>

      {/* 23. Settings Sidebar */}
      <DemoSection index={23} title="Settings Sidebar" description="Full settings page: left nav with active state + right content area with grouped form fields, toggles, and save/discard footer."
        molecules={["List Item","Form Field","Tabs","Card"]} atoms={["Icon","Typography","Badge","Divider","Switch","Input","Select","Button"]}>
        <SettingsSidebarOrg />
      </DemoSection>

      {/* 24. Login Form */}
      <DemoSection index={24} title="Login Form" description="Authentication card with social SSO buttons, OR divider, email/password fields, Remember me checkbox, Sign in CTA, and sign-up link."
        molecules={["Form Field","Card","Checkbox Block"]} atoms={["Input","Button","Typography","Divider","Label","Link","Icon"]}>
        <div style={{ display:"flex", justifyContent:"center", padding:"var(--space-6) 0" }}>
          <LoginForm />
        </div>
      </DemoSection>

      {/* 25. Menubar */}
      <DemoSection index={25} title="Menubar" description="File / Edit / View — Edit panel shown statically open with shortcuts + disabled item."
        molecules={["Dropdown Menu"]} atoms={["Button","Typography","Icon","Divider"]}>
        <div style={{ paddingBottom:"var(--showcase-dropdown-pad-lg)" }}>
          <Menubar activeMenu="edit" menus={[
            {key:"file",label:"File",items:[{key:"n",label:"New File",shortcut:"⌘N"},{key:"o",label:"Open…",shortcut:"⌘O"},{key:"s0",label:"",separator:true},{key:"s",label:"Save",shortcut:"⌘S"}]},
            {key:"edit",label:"Edit",items:[{key:"u",label:"Undo",shortcut:"⌘Z"},{key:"r",label:"Redo",shortcut:"⌘⇧Z"},{key:"s1",label:"",separator:true},{key:"cut",label:"Cut",shortcut:"⌘X"},{key:"copy",label:"Copy",shortcut:"⌘C"},{key:"paste",label:"Paste",shortcut:"⌘V"},{key:"s2",label:"",separator:true},{key:"find",label:"Find…",disabled:true}]},
            {key:"view",label:"View",items:[{key:"zi",label:"Zoom In",shortcut:"⌘+"},{key:"zo",label:"Zoom Out",shortcut:"⌘-"},{key:"fs",label:"Full Screen",shortcut:"⌘⇧F"}]},
          ]} />
        </div>
      </DemoSection>

      {/* 26. Sheet */}
      <DemoSection index={26} title="Sheet" description="Right / left slide-in panels — form content + footer actions."
        molecules={["Form Field","Card"]} atoms={["Button","Typography","Icon","Divider"]}>
        <div style={{ display:"flex", gap:"var(--space-4)", flexWrap:"wrap" as const, alignItems:"flex-start" }}>
          <Sheet title="Edit Profile" side="right" style={{ maxWidth:"var(--sheet-profile-max-w)" }}
            footer={<span style={{ display:"contents" }}><Button variant="secondary" size="sm">Cancel</Button><Button variant="primary" size="sm">Save changes</Button></span>}>
            <div style={{ display:"flex", flexDirection:"column", gap:"var(--space-4)" }}>
              <TextInput placeholder="Full name" />
              <TextInput placeholder="Email address" />
              <Select options={[{label:"Admin",value:"admin"},{label:"Member",value:"member"}]} />
            </div>
          </Sheet>
          <Sheet title="Filters" side="left" style={{ maxWidth:"var(--sheet-filter-max-w)" }}>
            <div style={{ display:"flex", flexDirection:"column", gap:"var(--space-3)" }}>
              <Checkbox label="Active only" />
              <Checkbox label="Has issues" />
              <Checkbox checked label="Production" />
              <Checkbox checked label="Staging" />
            </div>
          </Sheet>
        </div>
      </DemoSection>

      {/* 27. Command */}
      <DemoSection index={27} title="Command" description="⌘K palette — grouped results, first item highlighted, keyboard hints."
        molecules={["Search Bar"]} atoms={["Input","Icon","Typography","Badge","Divider"]}>
        <Command items={[
          {key:"r1",label:"Go to Dashboard",group:"Suggestions",icon:<Icon name="home" size="sm" color="brand" />,shortcut:["⌘","D"]},
          {key:"r2",label:"Create new workspace",group:"Suggestions",icon:<Icon name="plus" size="sm" color="brand" />},
          {key:"s1",label:"Account settings",group:"Settings",icon:<Icon name="settings" size="sm" color="secondary" />,shortcut:["⌘",","]},
          {key:"s2",label:"Appearance",group:"Settings",icon:<Icon name="eye" size="sm" color="secondary" />},
          {key:"a1",label:"Deploy to production",group:"Actions",icon:<Icon name="upload" size="sm" color="secondary" />},
          {key:"a2",label:"Export report",group:"Actions",icon:<Icon name="download" size="sm" color="secondary" />},
        ]} />
      </DemoSection>

      {/* 28. Navigation Menu */}
      <DemoSection index={28} title="Navigation Menu" description="Horizontal nav — Platform dropdown shown open with icons + descriptions."
        molecules={["Dropdown Menu"]} atoms={["Button","Typography","Icon","Badge"]}>
        <div style={{ paddingBottom:"var(--showcase-dropdown-pad-md)" }}>
          <NavigationMenu activeKey="platform" items={[
            {key:"home",label:"Home"},
            {key:"platform",label:"Platform",items:[
              {label:"Models",description:"Browse and deploy ML models",icon:<Icon name="grid" size="sm" color="brand" />},
              {label:"Workspaces",description:"Collaborative experiment environments",icon:<Icon name="folder" size="sm" color="brand" />},
              {label:"Monitoring",description:"Real-time metrics and alerts",icon:<Icon name="bell" size="sm" color="brand" />},
            ]},
            {key:"docs",label:"Documentation"},
            {key:"pricing",label:"Pricing"},
          ]} />
        </div>
      </DemoSection>

      {/* 29. Sidebar */}
      <DemoSection index={29} title="Sidebar" description="Expanded (labels + sections + badges) + collapsed (icons only)."
        molecules={["List Item"]} atoms={["Icon","Typography","Badge","Divider"]}>
        <div style={{ display:"flex", gap:"var(--space-4)", alignItems:"flex-start" }}>
          <SidebarNav brand="ICM+" style={{ height:"var(--showcase-sidebar-preview-h)" }}
            items={[
              {key:"dash",label:"Dashboard",active:true,icon:<Icon name="home" size="sm" color="brand" />,section:"Main"},
              {key:"models",label:"Models",icon:<Icon name="grid" size="sm" color="secondary" />,badge:"12",section:"Main"},
              {key:"ws",label:"Workspaces",icon:<Icon name="folder" size="sm" color="secondary" />,section:"Main"},
              {key:"mon",label:"Monitoring",icon:<Icon name="bell" size="sm" color="secondary" />,badge:"3",section:"Observe"},
              {key:"logs",label:"Logs",icon:<Icon name="list" size="sm" color="secondary" />,section:"Observe"},
              {key:"settings",label:"Settings",icon:<Icon name="settings" size="sm" color="secondary" />,section:"System"},
            ]}
          />
          <SidebarNav collapsed style={{ height:"var(--showcase-sidebar-preview-h)" }}
            items={[
              {key:"dash",label:"Dashboard",active:true,icon:<Icon name="home" size="sm" color="brand" />},
              {key:"models",label:"Models",icon:<Icon name="grid" size="sm" color="secondary" />},
              {key:"ws",label:"Workspaces",icon:<Icon name="folder" size="sm" color="secondary" />},
              {key:"mon",label:"Monitoring",icon:<Icon name="bell" size="sm" color="secondary" />},
              {key:"settings",label:"Settings",icon:<Icon name="settings" size="sm" color="secondary" />},
            ]}
          />
        </div>
      </DemoSection>

      {/* 30. Form */}
      <DemoSection title="30. Form" description="Form with validation — text + select + checkbox + error state + form-level error."
        molecules={["Form Field","Checkbox Block"]} atoms={["Input","Select","Button","Typography","Label","Checkbox"]}>
        <div style={{ display:"flex", flexWrap:"wrap" as const, gap:"var(--space-6)", alignItems:"flex-start" }}>
          <FormWrapper title="Create workspace" submitLabel="Create workspace" style={{ maxWidth:"var(--form-max-w)" }}
            fields={[
              {key:"name",label:"Workspace name",type:"text",required:true,placeholder:"e.g. Vision Experiments"},
              {key:"team",label:"Team",type:"select",required:true,options:["Platform","Research","Infra","Security"]},
              {key:"terms",label:"Terms of Service",type:"checkbox"},
            ]}
          />
          <FormWrapper title="With validation errors" submitLabel="Submit" style={{ maxWidth:"var(--form-max-w)" }}
            errorSummary="Please fix the errors below before continuing."
            fields={[
              {key:"email",label:"Email",type:"text",required:true,error:"Invalid email address.",placeholder:"you@example.com"},
              {key:"role",label:"Role",type:"select",required:true,options:["Admin","Member","Viewer"],error:"Please select a role."},
              {key:"agree",label:"Terms of Service",type:"checkbox"},
            ]}
          />
        </div>
      </DemoSection>

      {/* 31. Resource Allocation Drawer */}
      <DemoSection index={31} title="Resource Allocation Drawer"
        description="Full GPU resource allocation drawer — title, GPU cards, CPU/Memory inputs, storage quota sliders, Cancel/Save footer."
        molecules={["GpuAllocationCard","StorageQuotaRow","MigToggleRow","MigPartitionRow"]}
        atoms={["GpuVendorIcon","CompactValueStepper","NumberSpinner","DualRangeSlider","TextInput","Button","Switch"]}>
        <div style={{ display:"flex", gap:"var(--space-6)", alignItems:"flex-start", flexWrap:"wrap" as const }}>
          {/* State 1: MIG active */}
          <div style={{ display:"flex", flexDirection:"column", gap:"var(--space-2)" }}>
            <span style={{ fontFamily:"var(--font-family-mono)", fontSize:"var(--text-micro)", color:"var(--fg-brand)", background:"var(--bg-brand-subtle)", border:`var(--border-width-thin) solid var(--teal-200)`, borderRadius:"var(--radius-sm-ds)", padding:"var(--space-px) var(--space-2)", alignSelf:"flex-start" }}>State 1 · MIG Active</span>
            <ResourceAllocationDrawer
              state={{
                gpus:[{ vendor:"nvidia", model:"H100", value:12, max:20, migEnabled:true, partitions:[{ label:"1g.10gb", value:3, total:7 },{ label:"2g.20gb", value:2, total:7 },{ label:"3g.40gb", value:1, total:7 }] }],
                cpu:"8", memory:"32Gi", fileStorage:100, objectStorage:50,
              }}
              style={{ width:"var(--drawer-width-md)", maxHeight:"var(--showcase-drawer-max-h)", overflow:"hidden" }}
            />
          </div>
          {/* State 2: Over-allocated */}
          <div style={{ display:"flex", flexDirection:"column", gap:"var(--space-2)" }}>
            <span style={{ fontFamily:"var(--font-family-mono)", fontSize:"var(--text-micro)", color:"var(--fg-warning)", background:"var(--bg-warning-subtle)", border:`var(--border-width-thin) solid var(--border-warning-subtle)`, borderRadius:"var(--radius-sm-ds)", padding:"var(--space-px) var(--space-2)", alignSelf:"flex-start" }}>State 2 · Over-allocated</span>
            <ResourceAllocationDrawer
              state={{
                gpus:[
                  { vendor:"nvidia", model:"H100", value:22, max:20, migEnabled:false, partitions:[] },
                  { vendor:"amd",    model:"MI350", value:8,  max:8,  migEnabled:false, partitions:[] },
                ],
                cpu:"", memory:"", fileStorage:180, objectStorage:140,
              }}
              style={{ width:"var(--drawer-width-md)", maxHeight:"var(--showcase-drawer-max-h)", overflow:"hidden" }}
            />
          </div>
        </div>
      </DemoSection>

      {/* 32. Cluster Nodes Table */}
      <DemoSection index={32} title="Cluster Nodes Table"
        description="Shared cluster nodes page: searchable table with Node Name, Tenant, Status, GPU Type, Accelerators, CPU, Memory, Storage, Pods columns."
        molecules={["NodeNameCell","AcceleratorGridCell","ResourceBarCell","GpuModelTag"]}
        atoms={["BadgeLabel","Typography","TextInput","GpuVendorIcon","AcceleratorBlock"]}>
        <ClusterNodesTable
          nodes={[
            { hostname:"ip-10-23-24-232.ec2.internal", ip:"147.93.111.109", tenant:"Inference", status:"healthy",     gpuVendor:"nvidia", gpuModel:"A100",  accelCount:16, accelBlocks:["used","used","used","used","used","used","used","used","allocated","allocated","allocated","allocated","empty","empty","empty","empty"], cpu:{ used:"0/0.1", total:"4",        usedPct:5,  allocPct:20 }, memory:{ used:"0/0.5 GiB", total:"15.3 GiB", usedPct:5,  allocPct:18 }, storage:{ used:"0/0.5 GiB", total:"15.3 GiB", usedPct:5,  allocPct:18 }, pods:36 },
            { hostname:"ip-10-23-24-009.ec2.internal", ip:"147.93.111.21",  tenant:"Training",  status:"warning",    gpuVendor:"amd",    gpuModel:"MI350", accelCount:8,  accelBlocks:["used","used","used","allocated","allocated","empty","empty","empty","empty","empty","empty","empty","empty","empty","empty","empty"], cpu:{ used:"3/0.1",   total:"4",        usedPct:80, allocPct:90 }, memory:{ used:"12/2 GiB",  total:"15.3 GiB", usedPct:80, allocPct:90 }, storage:{ used:"10/2 GiB",  total:"15.3 GiB", usedPct:65, allocPct:80 }, pods:24 },
            { hostname:"ip-10-23-24-141.ec2.internal", ip:"147.93.111.88",  tenant:"Inference", status:"unhealthy",  gpuVendor:"nvidia", gpuModel:"A100",  accelCount:1,  accelBlocks:["used","empty","empty","empty","empty","empty","empty","empty","empty","empty","empty","empty","empty","empty","empty","empty"], cpu:{ used:"0/0.1",   total:"4",        usedPct:2,  allocPct:8  }, memory:{ used:"0/0.5 GiB", total:"15.3 GiB", usedPct:2,  allocPct:8  }, storage:{ used:"0/0.5 GiB", total:"15.3 GiB", usedPct:2,  allocPct:8  }, pods:4  },
            { hostname:"ip-10-23-24-200.ec2.internal", ip:"147.93.111.200", tenant:"Inference", status:"maintenance",gpuVendor:"nvidia", gpuModel:"H100",  accelCount:8,  accelBlocks:["empty","empty","empty","empty","empty","empty","empty","empty","empty","empty","empty","empty","empty","empty","empty","empty"], cpu:{ used:"0/0.1",   total:"4",        usedPct:0,  allocPct:0  }, memory:{ used:"0/0.5 GiB", total:"15.3 GiB", usedPct:0,  allocPct:0  }, storage:{ used:"0/0.5 GiB", total:"15.3 GiB", usedPct:0,  allocPct:0  }, pods:0  },
          ]}
        />
      </DemoSection>

      {/* 33. Import Repo Modal */}
      <DemoSection index={33} title="Import Repo Modal"
        description="Repository import dialog with filtering, sorting, resizable columns, and 3 responsive sizes (sm · md · lg). Click column headers to sort, drag edges to resize, and use the filter bar to search."
        molecules={["FormField","Alert"]}
        atoms={["Modal","Select","TextInput","Checkbox","Button","Typography","Icon","BadgeLabel"]}>

        {/* ── Size: LG ── */}
        <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-2)" }}>
          <Typography variant="micro" weight="semibold" color="tertiary" style={{ textTransform: "uppercase" as const, letterSpacing: "var(--letter-spacing-tracking-lg)" }}>
            lg · 720 px
          </Typography>
          <ImportRepoModal size="lg" />
        </div>

        {/* ── Size: MD ── */}
        <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-2)" }}>
          <Typography variant="micro" weight="semibold" color="tertiary" style={{ textTransform: "uppercase" as const, letterSpacing: "var(--letter-spacing-tracking-lg)" }}>
            md · 560 px
          </Typography>
          <ImportRepoModal size="md" />
        </div>

        {/* ── Size: SM ── */}
        <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-2)" }}>
          <Typography variant="micro" weight="semibold" color="tertiary" style={{ textTransform: "uppercase" as const, letterSpacing: "var(--letter-spacing-tracking-lg)" }}>
            sm · 400 px
          </Typography>
          <ImportRepoModal size="sm" />
        </div>
      </DemoSection>

    </div>
  );
}
