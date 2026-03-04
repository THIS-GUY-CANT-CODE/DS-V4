import React from "react";
import {
  Typography, Avatar, BadgeLabel, BadgeDot, Tag, Button,
  TextInput, Select, Divider, Checkbox, Switch,
  ProgressBar, Skeleton, Icon, Spinner,
  GpuVendorIcon, AcceleratorBlock, CompactValueStepper, NumberSpinner, DualRangeSlider,
} from "../../atoms";
import type { GpuVendor, AcceleratorFill } from "../../atoms";
import { ToggleSwitch } from "../../atoms/ToggleSwitch";
import { SectionCard, TierHeader, SubLabel, SectionDivider, SizeStrip, PreviewBox, Grid, ShowRow } from "../../docs/ComponentShowcase";

// ════════════════════════════════════════════════════════════════════════════
//  SHARED TYPES
// ════════════════════════════════════════════════════════════════════════════
type MolSize = "sm" | "md" | "lg";

const controlH: Record<MolSize, string> = {
  sm: "var(--size-control-sm)", md: "var(--size-control-md)", lg: "var(--size-control-lg)",
};
const agOverlapVar: Record<MolSize, string> = { sm: "var(--avatar-group-overlap-sm)", md: "var(--avatar-group-overlap-md)", lg: "var(--avatar-group-overlap-lg)" };

// ════════════════════════════════════════════════════════════════════════════
//  1. ALERT
// ════════════════════════════════════════════════════════════════════════════
type AlertType = "success" | "info" | "warning" | "error" | "alert" | "caution" | "complete";
const alertColors: Record<AlertType, { accent: string; bg: string; icon: string; border: string; titleColor: string }> = {
  success:  { accent: "var(--status-healthy)",   bg: "var(--bg-success-subtle)",  icon: "var(--icon-success)",  border: "var(--border-success-subtle)",  titleColor: "var(--fg-success)"  },
  info:     { accent: "var(--icon-info)",         bg: "var(--bg-info-subtle)",     icon: "var(--icon-info)",     border: "var(--border-info-subtle)",     titleColor: "var(--fg-info)"     },
  warning:  { accent: "var(--icon-warning)",      bg: "var(--bg-warning-subtle)",  icon: "var(--icon-warning)",  border: "var(--border-warning-subtle)",  titleColor: "var(--fg-warning)"  },
  error:    { accent: "var(--status-unhealthy)",  bg: "var(--bg-error-subtle)",    icon: "var(--icon-error)",    border: "var(--border-error-subtle)",    titleColor: "var(--fg-error)"    },
  alert:    { accent: "var(--icon-alert)",        bg: "var(--bg-alert-subtle)",    icon: "var(--icon-alert)",    border: "var(--border-alert)",       titleColor: "var(--fg-alert)"    },
  caution:  { accent: "var(--icon-caution)",      bg: "var(--bg-caution-subtle)",  icon: "var(--icon-caution)",  border: "var(--border-caution)",     titleColor: "var(--fg-caution)"  },
  complete: { accent: "var(--icon-complete)",     bg: "var(--bg-complete-subtle)", icon: "var(--icon-complete)", border: "var(--border-complete)",    titleColor: "var(--fg-complete)" },
};
const alertSVG: Record<AlertType, React.ReactNode> = {
  success:  <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><circle cx="8" cy="8" r="6.5" fill="var(--icon-success)" style={{ fillOpacity:"var(--opacity-icon-wash)" }}/><circle cx="8" cy="8" r="6.5" stroke="var(--icon-success)" strokeWidth="1.5"/><path d="M5 8l2 2 4-4" stroke="var(--icon-success)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>,
  info:     <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><circle cx="8" cy="8" r="6.5" fill="var(--icon-info)" style={{ fillOpacity:"var(--opacity-icon-wash)" }}/><circle cx="8" cy="8" r="6.5" stroke="var(--icon-info)" strokeWidth="1.5"/><path d="M8 7v4" stroke="var(--icon-info)" strokeWidth="1.5" strokeLinecap="round"/><circle cx="8" cy="5" r="0.75" fill="var(--icon-info)"/></svg>,
  warning:  <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><circle cx="8" cy="8" r="6.5" fill="var(--icon-warning)" style={{ fillOpacity:"var(--opacity-icon-wash)" }}/><circle cx="8" cy="8" r="6.5" stroke="var(--icon-warning)" strokeWidth="1.5"/><path d="M8 5.5v3" stroke="var(--icon-warning)" strokeWidth="1.5" strokeLinecap="round"/><circle cx="8" cy="10.5" r="0.75" fill="var(--icon-warning)"/></svg>,
  error:    <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><circle cx="8" cy="8" r="6.5" fill="var(--icon-error)" style={{ fillOpacity:"var(--opacity-icon-wash)" }}/><circle cx="8" cy="8" r="6.5" stroke="var(--icon-error)" strokeWidth="1.5"/><path d="M5.5 5.5l5 5M10.5 5.5l-5 5" stroke="var(--icon-error)" strokeWidth="1.5" strokeLinecap="round"/></svg>,
  alert:    <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><circle cx="8" cy="8" r="6.5" fill="var(--icon-alert)" style={{ fillOpacity:"var(--opacity-icon-wash)" }}/><circle cx="8" cy="8" r="6.5" stroke="var(--icon-alert)" strokeWidth="1.5"/><path d="M8 5.5v3" stroke="var(--icon-alert)" strokeWidth="1.5" strokeLinecap="round"/><circle cx="8" cy="10.5" r="0.75" fill="var(--icon-alert)"/></svg>,
  caution:  <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><circle cx="8" cy="8" r="6.5" fill="var(--icon-caution)" style={{ fillOpacity:"var(--opacity-icon-wash)" }}/><circle cx="8" cy="8" r="6.5" stroke="var(--icon-caution)" strokeWidth="1.5"/><path d="M8 5.5v3" stroke="var(--icon-caution)" strokeWidth="1.5" strokeLinecap="round"/><circle cx="8" cy="10.5" r="0.75" fill="var(--icon-caution)"/></svg>,
  complete: <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><circle cx="8" cy="8" r="6.5" fill="var(--icon-complete)" style={{ fillOpacity:"var(--opacity-icon-wash)" }}/><circle cx="8" cy="8" r="6.5" stroke="var(--icon-complete)" strokeWidth="1.5"/><path d="M5 8l2 2 4-4" stroke="var(--icon-complete)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>,
};

interface AlertProps {
  type?: AlertType; message: string; description?: string;
  closable?: boolean; size?: MolSize; action?: React.ReactNode;
  className?: string; style?: React.CSSProperties;
}
/* export removed — canonical Alert now at /src/molecules/Alert/Alert.tsx */
function Alert({ type="info", message, description, closable, size="md", action, className, style }: AlertProps) {
  const c = alertColors[type];
  const pad = size==="sm" ? "var(--space-2) var(--space-3)" : size==="lg" ? "var(--space-4) var(--space-6)" : "var(--space-3) var(--space-4)";
  return (
    <div className={className} role="alert" style={{
      display: "flex", alignItems: "flex-start", gap: "var(--space-3)",
      padding: pad, borderRadius: "var(--radius-md-ds)",
      background: c.bg,
      border: `var(--border-width-thin) solid ${c.border}`,
      borderLeft: `var(--alert-accent-width) solid ${c.accent}`,
      ...style,
    }}>
      <span style={{ flexShrink: 0, paddingTop: "var(--space-px)" }}>{alertSVG[type]}</span>
      <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: "var(--space-1)" }}>
        <Typography variant={size==="sm"?"label":"body"} weight="semibold" style={{ color: c.titleColor }}>{message}</Typography>
        {description && <Typography variant="label" color="secondary">{description}</Typography>}
        {action && <div>{action}</div>}
      </div>
      {closable && (
        <button style={{ background: "none", border: "none", cursor: "pointer", padding: 0, display: "flex", color: "var(--fg-tertiary)", flexShrink: 0 }}>
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
            <path d="M2 2L10 10M10 2L2 10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
          </svg>
        </button>
      )}
    </div>
  );
}

// ════════════════════════════════════════════════════════════════════════════
//  2. SEARCH BAR
// ══════════════��═════════════════════════════════════════════════════════════
interface SearchBarProps { placeholder?: string; width?: number|string; size?: MolSize; className?: string; style?: React.CSSProperties; }
/* export removed — canonical SearchBar now at /src/molecules/SearchBar/SearchBar.tsx */
function SearchBar({ placeholder="Search...", width, size="md", className, style }: SearchBarProps) {
  return (
    <TextInput placeholder={placeholder} size={size}
      prefix={<svg width="14" height="14" viewBox="0 0 16 16" fill="none"><circle cx="7" cy="7" r="5.5" stroke="var(--icon-tertiary)" strokeWidth="1.5"/><path d="M11 11L14 14" stroke="var(--icon-tertiary)" strokeWidth="1.5" strokeLinecap="round"/></svg>}
      suffix={<span style={{ fontSize:"var(--text-micro)", fontFamily:"var(--font-family-mono)", color:"var(--fg-disabled)", background:"var(--bg-secondary)", border:`var(--border-width-thin) solid var(--border-default)`, padding:"var(--space-px) var(--space-1)", borderRadius:"var(--radius-sm-ds)" }}>⌘K</span>}
      className={className} style={{ width: width ?? "var(--search-bar-width)", ...style }}
    />
  );
}

// ════════════════════════════════════════════════════════════════════════════
//  3. PAGINATION
// ════════════════════════════════════════════════════���═══════════════════════
interface PaginationProps { current?: number; total?: number; size?: MolSize; className?: string; style?: React.CSSProperties; }
/* export removed — canonical Pagination now at /src/molecules/Pagination/Pagination.tsx */
function Pagination({ current=1, total=10, size="md", className, style }: PaginationProps) {
  const h = controlH[size];
  const visiblePages = Array.from({ length: Math.min(total, 5) }, (_, i) => {
    if (total <= 5) return i + 1;
    if (current <= 3) return i + 1;
    if (current >= total - 2) return total - 4 + i;
    return current - 2 + i;
  });
  const btnStyle = (active: boolean, disabled?: boolean): React.CSSProperties => ({
    height: h, minWidth: h, padding: "0 var(--space-2)",
    display: "flex", alignItems: "center", justifyContent: "center",
    border: `var(--border-width-thin) solid ${active ? "var(--border-focus)" : "var(--border-default)"}`,
    borderRadius: "var(--radius-sm-ds)", cursor: disabled ? "not-allowed" : "pointer",
    background: active ? "var(--bg-brand)" : "var(--bg-primary)",
    color: active ? "var(--fg-inverse)" : disabled ? "var(--fg-disabled)" : "var(--fg-secondary)",
    fontSize: "var(--text-caption)", fontFamily: "var(--font-family-primary)",
    fontWeight: active ? "var(--font-weight-semibold)" as any : "var(--font-weight-normal)" as any,
    opacity: disabled ? "var(--opacity-disabled)" as any : 1,
  });
  return (
    <div className={className} style={{ display: "flex", alignItems: "center", gap: "var(--space-1)", ...style }}>
      <button style={btnStyle(false, current===1)} disabled={current===1}>
        <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M7.5 3L4.5 6L7.5 9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
      </button>
      {visiblePages[0] > 1 && <span style={{ display:"contents" }}><button style={btnStyle(false)}>1</button><span style={{ color:"var(--fg-tertiary)", fontSize:"var(--text-caption)" }}>…</span></span>}
      {visiblePages.map(p => <button key={p} style={btnStyle(p===current)}>{p}</button>)}
      {visiblePages[visiblePages.length-1] < total && <span style={{ display:"contents" }}><span style={{ color:"var(--fg-tertiary)", fontSize:"var(--text-caption)" }}>…</span><button style={btnStyle(false)}>{total}</button></span>}
      <button style={btnStyle(false, current===total)} disabled={current===total}>
        <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M4.5 3L7.5 6L4.5 9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
      </button>
    </div>
  );
}

// ═══════════════════════════════════════════��════════════════════════════════
//  4. TABS
// ════════════════════════════════════════════════════════════════════════════
type TabsStyle = "line" | "pill";
interface TabItem { key: string; label: string; badge?: number; content?: React.ReactNode; }
interface TabsProps { items: TabItem[]; activeKey?: string; onChange?: (k: string) => void; tabStyle?: TabsStyle; size?: MolSize; style?: React.CSSProperties; className?: string; }
/* export removed — canonical Tabs now at /src/molecules/Tabs/Tabs.tsx */
function Tabs({ items, activeKey, onChange, tabStyle="line", size="md", style, className }: TabsProps) {
  const active = activeKey ?? items[0]?.key;
  const activeItem = items.find(t => t.key===active);
  return (
    <div className={className} style={{ display:"flex", flexDirection:"column", ...style }}>
      <div style={{
        display: "flex", gap: tabStyle==="line" ? "var(--tab-gap)" : "var(--space-1)",
        borderBottom: tabStyle==="line" ? `var(--border-width-thin) solid var(--border-divider)` : undefined,
        background: tabStyle==="pill" ? "var(--bg-secondary)" : undefined,
        borderRadius: tabStyle==="pill" ? "var(--radius-sm-ds)" : undefined,
        padding: tabStyle==="pill" ? "var(--space-1)" : undefined,
      }}>
        {items.map(tab => {
          const isActive = tab.key===active;
          return (
            <button key={tab.key} onClick={() => onChange?.(tab.key)} style={{
              display: "flex", alignItems: "center", gap: "var(--space-1)",
              padding: tabStyle==="line" ? `var(--tab-padding-y) 0` : `var(--space-1) var(--space-3)`,
              border: "none", cursor: "pointer", background: tabStyle==="pill" && isActive ? "var(--bg-primary)" : "transparent",
              color: isActive ? "var(--tab-fg-active)" : "var(--tab-fg)",
              fontSize: "var(--tab-font-size)", fontFamily: "var(--font-family-primary)",
              fontWeight: isActive ? "var(--font-weight-semibold)" as any : "var(--font-weight-normal)" as any,
              borderBottom: tabStyle==="line" && isActive ? `var(--tab-border-width) solid var(--tab-border-active)` : tabStyle==="line" ? `var(--tab-border-width) solid transparent` : undefined,
              borderRadius: tabStyle==="pill" ? "var(--radius-xs)" : undefined,
              boxShadow: tabStyle==="pill" && isActive ? "var(--shadow-xs)" : undefined,
              marginBottom: tabStyle==="line" ? "calc(-1 * var(--border-width-thin))" : undefined,
            }}>
              {tab.label}
              {tab.badge !== undefined && <BadgeDot count={tab.badge} variant={isActive?"primary":"neutral"} />}
            </button>
          );
        })}
      </div>
      {activeItem?.content && (
        <div style={{ padding:"var(--space-4) 0" }}>{activeItem.content}</div>
      )}
    </div>
  );
}

// ════════════════════════════════════════════════════════════════════════════
//  5. CARD
// ════════════════════════════════════════════════════════════════════════════
interface CardProps {
  title?: string; description?: string; extra?: React.ReactNode;
  children?: React.ReactNode; hoverable?: boolean; size?: MolSize;
  style?: React.CSSProperties; className?: string; footer?: React.ReactNode;
}
/* export removed — canonical Card now at /src/molecules/Card/Card.tsx */
function Card({ title, description, extra, children, size="md", style, className, footer }: CardProps) {
  const pad = size==="sm" ? "var(--card-ds-padding-sm)" : size==="lg" ? "var(--card-ds-padding-lg)" : "var(--card-ds-padding-md)";
  return (
    <div className={className} style={{
      background: "var(--card-ds-bg)", border: `var(--border-width-thin) solid var(--card-ds-border)`,
      borderRadius: "var(--radius-md-ds)", overflow: "hidden", ...style,
    }}>
      {(title || extra) && (
        <div style={{ padding: pad, borderBottom: `var(--border-width-thin) solid var(--border-divider)`, display: "flex", alignItems: "center", justifyContent: "space-between", gap: "var(--space-3)" }}>
          <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-1)", flex: 1, minWidth: 0 }}>
            {title && <Typography variant="title" weight="semibold" color="primary">{title}</Typography>}
            {description && <Typography variant="label" color="secondary">{description}</Typography>}
          </div>
          {extra && <div style={{ flexShrink: 0 }}>{extra}</div>}
        </div>
      )}
      {children && <div style={{ padding: pad }}>{children}</div>}
      {footer && (
        <div style={{ padding: pad, borderTop: `var(--border-width-thin) solid var(--border-divider)`, background: "var(--bg-flush)" }}>{footer}</div>
      )}
    </div>
  );
}

// ════════════════════════════════════════════════════════════════════════════
//  6. STAT CARD
// ════════════════════════════════════════════════════════════════════════════
interface StatCardProps {
  label: string; value: string; change?: string; changeType?: "up"|"down";
  icon?: React.ReactNode; size?: MolSize; className?: string; style?: React.CSSProperties;
}
/* export removed — canonical StatCard now at /src/molecules/StatCard/StatCard.tsx */
function StatCard({ label, value, change, changeType, icon, size="md", className, style }: StatCardProps) {
  const pad = size==="sm" ? "var(--card-ds-padding-sm)" : size==="lg" ? "var(--card-ds-padding-lg)" : "var(--card-ds-padding-md)";
  return (
    <div className={className} style={{
      background: "var(--card-ds-bg)", border: `var(--border-width-thin) solid var(--card-ds-border)`,
      borderRadius: "var(--radius-md-ds)", padding: pad, boxShadow: "var(--shadow-sm)",
      display: "flex", flexDirection: "column", gap: "var(--space-2)", ...style,
    }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <Typography variant="label" color="secondary">{label}</Typography>
        {icon && (
          <div style={{ width:"var(--size-control-md)", height:"var(--size-control-md)", borderRadius:"var(--radius-sm-ds)", background:"var(--bg-brand-subtle)", display:"flex", alignItems:"center", justifyContent:"center" }}>
            {icon}
          </div>
        )}
      </div>
      <Typography variant="display" weight="bold" color="primary" display>{value}</Typography>
      {change && (
        <div style={{ display:"flex", alignItems:"center", gap:"var(--space-1)" }}>
          <Typography variant="label" color={changeType==="up"?"success":"error"} weight="medium">{changeType==="up"?"+":""}{change}</Typography>
          <Typography variant="label" color="tertiary">vs last month</Typography>
        </div>
      )}
    </div>
  );
}

// ════════════════════════════════════════════════��═══════════════════════════
//  7. LIST ITEM
// ═══════════════��════════════════════════════════���════��══════════════════════
interface ListItemProps {
  title: string; description?: string; avatar?: React.ReactNode;
  badge?: React.ReactNode; trailing?: React.ReactNode; active?: boolean;
  onClick?: () => void; style?: React.CSSProperties;
}
export function ListItem({ title, description, avatar, badge, trailing, active, onClick, style }: ListItemProps) {
  return (
    <div onClick={onClick} style={{
      display:"flex", alignItems:"center", gap:"var(--space-3)",
      padding:"var(--space-3) var(--space-4)", cursor:onClick?"pointer":undefined,
      background:active?"var(--bg-brand-subtle)":"var(--bg-primary)",
      borderBottom:`var(--border-width-thin) solid var(--border-divider)`, ...style,
    }}>
      {avatar}
      <div style={{ flex:1, minWidth:0, display:"flex", flexDirection:"column", gap:"var(--space-1)" }}>
        <div style={{ display:"flex", alignItems:"center", gap:"var(--space-2)" }}>
          <Typography variant="body" weight="medium" color="primary" truncate>{title}</Typography>
          {badge}
        </div>
        {description && <Typography variant="label" color="secondary" truncate>{description}</Typography>}
      </div>
      {trailing}
    </div>
  );
}

// ═══════��═══════════════════════════���════════════════════════════════════════
//  8. CHECKBOX BLOCK
// ════════════════════════════════════════════════════════════════════════════
interface CheckboxBlockProps { label: string; description?: string; disabled?: boolean; checked?: boolean; onChange?: (v: boolean) => void; style?: React.CSSProperties; }
export function CheckboxBlock({ label, description, disabled, checked, onChange, style }: CheckboxBlockProps) {
  return (
    <div style={{ display:"flex", alignItems:"center", gap:"var(--space-3)", padding:"var(--space-3) var(--space-4)", border:`var(--border-width-thin) solid var(--border-default)`, borderRadius:"var(--radius-md-ds)", background:"var(--bg-primary)", ...style }}>
      <Checkbox checked={checked} disabled={disabled} onChange={onChange} />
      <div style={{ display:"flex", flexDirection:"column", gap:"var(--space-1)", flex:1, minWidth:0 }}>
        <Typography variant="body" weight="medium" color="primary">{label}</Typography>
        {description && <Typography variant="label" color="secondary">{description}</Typography>}
      </div>
    </div>
  );
}

// ════════════════════════════════════════════════════════════════════════════
//  9. EMPTY STATE
// ════════════════════════════════════════════════════════════════════════════
interface EmptyStateProps { title: string; description: string; action?: string; onAction?: () => void; icon?: React.ReactNode; style?: React.CSSProperties; }
export function EmptyState({ title, description, action, onAction, icon, style }: EmptyStateProps) {
  return (
    <div style={{ display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", padding:"var(--space-12) var(--space-6)", gap:"var(--space-4)", ...style }}>
      <div style={{ width:"var(--space-16)", height:"var(--space-16)", borderRadius:"var(--radius-md-ds)", background:"var(--bg-secondary)", display:"flex", alignItems:"center", justifyContent:"center" }}>
        {icon || (
          <svg width="36" height="36" viewBox="0 0 36 36" fill="none">
            <rect x="6" y="8" width="24" height="20" rx="3" stroke="var(--fg-tertiary)" strokeWidth="2" strokeDasharray="4 3"/>
            <path d="M14 22L18 18L22 21L26 16" stroke="var(--fg-tertiary)" strokeWidth="1.5" strokeLinecap="round"/>
          </svg>
        )}
      </div>
      <div style={{ textAlign:"center" as const, display:"flex", flexDirection:"column", gap:"var(--space-2)" }}>
        <Typography variant="title" weight="semibold" color="primary">{title}</Typography>
        <Typography variant="body" color="secondary">{description}</Typography>
      </div>
      {action && <Button variant="primary" onClick={onAction}>{action}</Button>}
    </div>
  );
}

// ════════════════════════════════════════════════════════════════════════════
//  10. FORM FIELD
// ════════════════════════════════════════════════════════════════════════════
interface FormFieldProps {
  label: string; required?: boolean; children: React.ReactNode;
  helperText?: string; error?: string; size?: MolSize; info?: string;
  className?: string; style?: React.CSSProperties;
}
/* export removed — canonical FormField now at /src/molecules/FormField/FormField.tsx */
function FormField({ label, required, children, helperText, error, size="md", info, className, style }: FormFieldProps) {
  const gap = size==="sm" ? "var(--space-1)" : "var(--space-2)";
  return (
    <div className={className} style={{ display:"flex", flexDirection:"column", gap, ...style }}>
      <div style={{ display:"flex", alignItems:"center", gap:"var(--space-1)" }}>
        <Typography variant={size==="sm"?"label":"body"} weight="medium" color="primary">{label}</Typography>
        {required && <Typography variant="label" color="error">*</Typography>}
        {info && (
          <span title={info} style={{ width:"var(--size-icon-xs)", height:"var(--size-icon-xs)", borderRadius:"var(--radius-full)", display:"inline-flex", alignItems:"center", justifyContent:"center", cursor:"help", background:"var(--bg-secondary)", color:"var(--fg-tertiary)", fontSize:"var(--text-micro)", flexShrink:0 }}>?</span>
        )}
      </div>
      {children}
      {error && <Typography variant="label" color="error">{error}</Typography>}
      {!error && helperText && <Typography variant="label" color="tertiary">{helperText}</Typography>}
    </div>
  );
}

// ════════════════════════════════════════════════════════════════════════════
//  11. AVATAR GROUP
// ══════════════════════════���═════════════════════��═══════════════════════════
interface AvatarGroupProps { avatars: { label: string; src?: string }[]; max?: number; size?: MolSize; style?: React.CSSProperties; }
export function AvatarGroup({ avatars, max=4, size="md", style }: AvatarGroupProps) {
  const shown = avatars.slice(0, max);
  const overflow = avatars.length - max;
  const overlap = agOverlapVar[size];
  const sizeVar = controlH[size];
  return (
    <div style={{ display:"flex", alignItems:"center", ...style }}>
      {shown.map((a, i) => (
        <div key={i} style={{ marginLeft:i>0?overlap:0, position:"relative", zIndex:shown.length-i, border:`var(--border-width-medium) solid var(--bg-primary)`, borderRadius:"var(--radius-full)" }}>
          <Avatar size={size as any} shape="circle" label={a.label} src={a.src} />
        </div>
      ))}
      {overflow > 0 && (
        <div style={{ marginLeft:overlap, position:"relative", zIndex:"var(--z-base)" as any, width:sizeVar, height:sizeVar, borderRadius:"var(--radius-full)", background:"var(--avatar-overflow-bg)", display:"flex", alignItems:"center", justifyContent:"center", border:`var(--border-width-medium) solid var(--bg-primary)`, fontSize:"var(--text-micro)", fontWeight:"var(--font-weight-semibold)" as any, color:"var(--fg-secondary)" }}>
          +{overflow}
        </div>
      )}
    </div>
  );
}

// ════════════════════════════════════════════════════════════════════════════
//  12. TRANSFER
// ════════════════════════════════════════════════════════════════════════════
export interface TransferItem { key: string; label: string; }
interface TransferProps { source?: TransferItem[]; target?: TransferItem[]; style?: React.CSSProperties; }
export function Transfer({ source=[], target=[], style }: TransferProps) {
  const Panel = ({ title, items }: { title: string; items: TransferItem[] }) => (
    <div style={{ flex:1, border:`var(--border-width-thin) solid var(--border-default)`, borderRadius:"var(--radius-sm-ds)", overflow:"hidden" }}>
      <div style={{ padding:"var(--space-2) var(--space-3)", borderBottom:`var(--border-width-thin) solid var(--border-default)`, background:"var(--bg-secondary)" }}>
        <Typography variant="label" weight="semibold" color="secondary">{title} ({items.length})</Typography>
      </div>
      <div style={{ padding:"var(--space-2)", maxHeight:"var(--dropdown-list-max-height-sm)", overflowY:"auto" as const }}>
        {items.length === 0
          ? <Typography variant="label" color="tertiary" style={{ padding:"var(--space-4)", textAlign:"center" as const }}>No items</Typography>
          : items.map(item => (
            <div key={item.key} style={{ display:"flex", alignItems:"center", gap:"var(--space-2)", padding:"var(--space-1) var(--space-2)", borderRadius:"var(--radius-xs)" }}>
              <Checkbox />
              <Typography variant="body" color="primary">{item.label}</Typography>
            </div>
          ))
        }
      </div>
    </div>
  );
  return (
    <div style={{ display:"flex", alignItems:"center", gap:"var(--space-3)", ...style }}>
      <Panel title="Source" items={source} />
      <div style={{ display:"flex", flexDirection:"column", gap:"var(--space-2)" }}>
        <Button variant="secondary" size="sm" icon={<svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M2 6h8M7 3l3 3-3 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>}>{""}</Button>
        <Button variant="secondary" size="sm" icon={<svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M10 6H2M5 3L2 6l3 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>}>{""}</Button>
      </div>
      <Panel title="Target" items={target} />
    </div>
  );
}

// ════════════════════════════════════════════════════════════════════════════
//  13. BREADCRUMB NAV
// ════════════════════════════════════════════════════════════════════════════
interface BreadcrumbNavItem { label: string; href?: string; }
interface BreadcrumbNavProps { items: BreadcrumbNavItem[]; maxVisible?: number; style?: React.CSSProperties; }
export function BreadcrumbNav({ items, maxVisible=4, style }: BreadcrumbNavProps) {
  const collapsed = items.length > maxVisible;
  const display = collapsed ? [items[0], { label:"…" }, ...items.slice(-2)] : items;
  return (
    <nav style={{ display:"flex", alignItems:"center", gap:"var(--space-1)", ...style }}>
      {display.map((item, i) => (
        <span key={i} style={{ display:"contents" }}>
          {i > 0 && <Icon name="chevron-right" size="sm" color="tertiary" />}
          {item.label === "…"
            ? <button style={{ padding:"var(--badge-padding-y) var(--space-1)", border:`var(--border-width-thin) solid var(--border-default)`, borderRadius:"var(--radius-xs)", background:"var(--bg-secondary)", cursor:"pointer", fontSize:"var(--text-caption)", fontFamily:"var(--font-family-primary)", color:"var(--fg-tertiary)" }}>…</button>
            : <Typography variant="label" color={i===display.length-1?"primary":"brand"} weight={i===display.length-1?"medium":undefined} style={{ cursor:i<display.length-1?"pointer":"default" }}>{item.label}</Typography>
          }
        </span>
      ))}
    </nav>
  );
}

// ══���═════════════════════════════════════════════════════════════════════════
//  14. TOAST STACK
// ════════════════════════════════════════════════════════════════════════════
type ToastVariant = AlertType;
interface ToastStackItem { id: string; title: string; description?: string; variant?: ToastVariant; progress?: number; }
interface ToastStackProps { toasts?: ToastStackItem[]; style?: React.CSSProperties; }
export function ToastStack({ toasts, style }: ToastStackProps) {
  const def: ToastStackItem[] = [
    {id:"1",title:"Deployment succeeded.",description:"All services healthy.",variant:"success"},
    {id:"2",title:"Pod crash loop detected.",description:"us-east-1 · 3 retries",variant:"error"},
    {id:"3",title:"Uploading model weights…",variant:"info",progress:62},
    {id:"4",title:"Security alert triggered.",description:"Unusual login from new device.",variant:"alert"},
  ];
  const items = toasts ?? def;
  return (
    <div style={{ display:"flex", flexDirection:"column", gap:"var(--space-2)", ...style }}>
      {items.map((t, i) => (
        <div key={t.id} style={{ display:"flex", alignItems:"flex-start", gap:"var(--space-3)", padding:"var(--space-3) var(--space-4)", background:"var(--bg-primary)", border:`var(--border-width-thin) solid var(--border-default)`, borderLeft:`var(--alert-accent-width) solid ${alertColors[t.variant??"info"].accent}`, borderRadius:"var(--radius-md-ds)", boxShadow:"var(--shadow-lg)", width:"var(--toast-stack-width)", opacity:1-i*0.08, transform:`scale(${1-i*0.02})`, transformOrigin:"top center" }}>
          <span style={{ flexShrink:0, paddingTop:"var(--space-px)" }}>{alertSVG[t.variant??"info"]}</span>
          <div style={{ flex:1, minWidth:0, display:"flex", flexDirection:"column", gap:"var(--space-1)" }}>
            <Typography variant="body" weight="semibold" color="primary">{t.title}</Typography>
            {t.description && <Typography variant="label" color="secondary">{t.description}</Typography>}
            {t.progress !== undefined && (
              <div style={{ display:"flex", flexDirection:"column", gap:"var(--space-1)", marginTop:"var(--space-1)" }}>
                <div style={{ height:"var(--space-1)", borderRadius:"var(--radius-full-ds)", background:"var(--bg-secondary)", overflow:"hidden" }}>
                  <div style={{ width:`${t.progress}%`, height:"100%", background:"var(--bg-brand)", borderRadius:"var(--radius-full-ds)" }}/>
                </div>
                <Typography variant="micro" color="tertiary">{t.progress}% · auto-dismiss in {Math.round((100-t.progress)/10)}s</Typography>
              </div>
            )}
          </div>
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none" style={{ cursor:"pointer", flexShrink:0 }}><path d="M2 2L10 10M10 2L2 10" stroke="var(--icon-tertiary)" strokeWidth="1.5" strokeLinecap="round"/></svg>
        </div>
      ))}
    </div>
  );
}

// ════════════════════════════════════════════════════════════════════════════
//  15. COMMAND PALETTE (molecule — full search with categories)
// ════════════════════════════════════════════════════════════════════════════
interface CMDItem { key: string; label: string; group: string; shortcut?: string[]; icon?: React.ReactNode; badge?: string; }
interface CommandPaletteFullProps { items?: CMDItem[]; recentSearches?: string[]; style?: React.CSSProperties; }
export function CommandPaletteFull({ items, recentSearches, style }: CommandPaletteFullProps) {
  const def: CMDItem[] = [
    {key:"r1",label:"Go to Dashboard",group:"Recent",icon:<Icon name="home" size="sm" color="secondary" />},
    {key:"r2",label:"Model: gpt-base-v2",group:"Recent",icon:<Icon name="grid" size="sm" color="secondary" />},
    {key:"a1",label:"Deploy to production",group:"Actions",icon:<Icon name="upload" size="sm" color="brand" />,shortcut:["⌘","⇧","D"]},
    {key:"a2",label:"Create new workspace",group:"Actions",icon:<Icon name="plus" size="sm" color="brand" />},
    {key:"a3",label:"Invite team member",group:"Actions",icon:<Icon name="user" size="sm" color="brand" />},
    {key:"s1",label:"Account settings",group:"Settings",icon:<Icon name="settings" size="sm" color="secondary" />,shortcut:["⌘",","]},
    {key:"s2",label:"Billing & plan",group:"Settings",icon:<Icon name="star" size="sm" color="secondary" />},
  ];
  const data = items ?? def;
  const groups = data.reduce((acc, item) => {
    if (!acc[item.group]) acc[item.group] = [];
    acc[item.group].push(item);
    return acc;
  }, {} as Record<string, CMDItem[]>);
  return (
    <div style={{ width:"var(--notification-center-width)", background:"var(--bg-primary)", border:`var(--border-width-medium) solid var(--border-default)`, borderRadius:"var(--radius-md-ds)", boxShadow:"var(--shadow-xl)", overflow:"hidden", ...style }}>
      <div style={{ display:"flex", alignItems:"center", gap:"var(--space-2)", padding:"var(--space-3) var(--space-4)", borderBottom:`var(--border-width-thin) solid var(--border-divider)` }}>
        <Icon name="search" size="md" color="tertiary" />
        <input placeholder="Search pages, actions, settings…" style={{ flex:1, border:"none", outline:"none", background:"transparent", fontSize:"var(--text-base)", fontFamily:"var(--font-family-primary)", color:"var(--fg-primary)" }} />
        <kbd style={{ fontSize:"var(--text-micro)", color:"var(--fg-tertiary)", fontFamily:"var(--font-family-mono)", background:"var(--bg-secondary)", border:`var(--border-width-thin) solid var(--border-default)`, borderRadius:"var(--radius-xs)", padding:"var(--space-px) var(--space-1)" }}>esc</kbd>
      </div>
      <div style={{ maxHeight:"var(--dropdown-list-max-height-md)", overflowY:"auto" as const }}>
        {Object.entries(groups).map(([group, gItems]) => (
          <div key={group}>
            <div style={{ padding:"var(--space-2) var(--space-4) var(--space-1)", fontSize:"var(--text-micro)", fontFamily:"var(--font-family-primary)", lineHeight:"var(--line-height-xs)", color:"var(--fg-tertiary)", fontWeight:"var(--font-weight-semibold)" as any, textTransform:"uppercase" as const, letterSpacing:"var(--letter-spacing-heading)", background:"var(--bg-secondary)" }}>{group}</div>
            {gItems.map((item, i) => (
              <div key={item.key} style={{ display:"flex", alignItems:"center", gap:"var(--space-2)", padding:"var(--space-2) var(--space-4)", cursor:"pointer", background:i===0&&group==="Actions"?"var(--bg-brand-subtle)":"transparent" }}>
                {item.icon && <span style={{ width:"var(--size-control-sm)", height:"var(--size-control-sm)", display:"flex", alignItems:"center", justifyContent:"center", background:i===0&&group==="Actions"?"var(--bg-brand-subtle)":"var(--bg-secondary)", borderRadius:"var(--radius-xs)", flexShrink:0 }}>{item.icon}</span>}
                <Typography variant="body" color="primary" style={{ flex:1 }}>{item.label}</Typography>
                {item.badge && <BadgeLabel label={item.badge} variant="primary" size="sm" />}
                {item.shortcut && <div style={{ display:"flex", gap:"var(--badge-gap)" }}>{item.shortcut.map((k,ki)=><kbd key={ki} style={{ fontSize:"var(--text-micro)", fontFamily:"var(--font-family-mono)", color:"var(--fg-tertiary)", background:"var(--bg-secondary)", border:`var(--border-width-thin) solid var(--border-default)`, borderRadius:"var(--radius-xs)", padding:"var(--space-px) var(--space-1)" }}>{k}</kbd>)}</div>}
              </div>
            ))}
          </div>
        ))}
      </div>
      <div style={{ padding:"var(--space-2) var(--space-4)", borderTop:`var(--border-width-thin) solid var(--border-divider)`, display:"flex", gap:"var(--space-4)", background:"var(--bg-secondary)" }}>
        {[["↑↓","Navigate"],["↵","Open"],["esc","Dismiss"]].map(([k,l])=>(
          <div key={l} style={{ display:"flex", gap:"var(--space-1)", alignItems:"center" }}>
            <kbd style={{ fontSize:"var(--text-micro)", fontFamily:"var(--font-family-mono)", color:"var(--fg-tertiary)", background:"var(--bg-secondary)", border:`var(--border-width-thin) solid var(--border-default)`, borderRadius:"var(--radius-xs)", padding:"var(--space-px) var(--space-1)" }}>{k}</kbd>
            <Typography variant="micro" color="tertiary">{l}</Typography>
          </div>
        ))}
      </div>
    </div>
  );
}

// ══════════════════════════════════════════════════��═════════════════════════
//  16. DATE RANGE PICKER
// ════════════════════════════════════════════════════════════════════════════
type DatePreset = { label: string; days: number };
const DATE_PRESETS: DatePreset[] = [
  {label:"Today",days:0},{label:"Last 7 days",days:7},
  {label:"Last 30 days",days:30},{label:"Last 90 days",days:90},
];
interface DateRangePickerProps { startDate?: string; endDate?: string; activePreset?: string; style?: React.CSSProperties; }
export function DateRangePicker({ startDate="Feb 1, 2026", endDate="Feb 28, 2026", activePreset="Last 30 days", style }: DateRangePickerProps) {
  return (
    <div style={{ display:"inline-flex", flexDirection:"column", gap:"var(--space-2)", ...style }}>
      <div style={{ display:"inline-flex", alignItems:"center", gap:"var(--space-2)", padding:"0 var(--space-3)", height:"var(--btn-height-md)", background:"var(--bg-primary)", border:`var(--border-width-thin) solid var(--border-default)`, borderRadius:"var(--radius-sm-ds)", cursor:"pointer" }}>
        <Icon name="calendar" size="sm" color="tertiary" />
        <Typography variant="body" color="primary">{startDate}</Typography>
        <span style={{ color:"var(--fg-tertiary)", fontSize:"var(--text-caption)", fontFamily:"var(--font-family-primary)" }}>—</span>
        <Typography variant="body" color="primary">{endDate}</Typography>
        <Icon name="chevron-down" size="sm" color="tertiary" />
      </div>
      <div style={{ display:"inline-flex", flexDirection:"column", background:"var(--bg-primary)", border:`var(--border-width-thin) solid var(--border-default)`, borderRadius:"var(--radius-md-ds)", boxShadow:"var(--shadow-lg)", overflow:"hidden", width:"var(--date-picker-width)" }}>
        {DATE_PRESETS.map(p => (
          <button key={p.label} style={{ padding:"var(--space-2) var(--space-4)", border:"none", background:p.label===activePreset?"var(--bg-brand-subtle)":"transparent", color:p.label===activePreset?"var(--fg-brand)":"var(--fg-primary)", cursor:"pointer", textAlign:"left" as const, fontSize:"var(--text-base)", fontFamily:"var(--font-family-primary)", lineHeight:"var(--line-height-md)", fontWeight:p.label===activePreset?"var(--font-weight-semibold)" as any:"var(--font-weight-normal)" as any, display:"flex", alignItems:"center", justifyContent:"space-between" }}>
            {p.label}
            {p.label===activePreset && <Icon name="check" size="sm" color="brand" />}
          </button>
        ))}
        <div style={{ height:"var(--border-width-thin)", background:"var(--border-divider)" }} />
        <button style={{ padding:"var(--space-2) var(--space-4)", border:"none", background:"transparent", color:"var(--fg-secondary)", cursor:"pointer", textAlign:"left" as const, fontSize:"var(--text-base)", fontFamily:"var(--font-family-primary)" }}>Custom range…</button>
      </div>
    </div>
  );
}

// ════════════════════════════════════════════════════════════════════════════
//  17. FILE CARD
// ═══════════════════════════════════��════════════════════════════════════════
type FileCardStatus = "done"|"uploading"|"error";
interface FileCardProps { name: string; size: string; status?: FileCardStatus; progress?: number; style?: React.CSSProperties; }
export function FileCard({ name, size, status="done", progress=0, style }: FileCardProps) {
  const ext = name.split(".").pop()?.toUpperCase() ?? "FILE";
  const statusVariant: Record<FileCardStatus, "success"|"info"|"error"> = { done:"success", uploading:"info", error:"error" };
  return (
    <div style={{ display:"flex", alignItems:"center", gap:"var(--space-3)", padding:"var(--space-3) var(--space-4)", background:"var(--bg-primary)", border:`var(--border-width-thin) solid var(--border-default)`, borderRadius:"var(--radius-md-ds)", ...style }}>
      <div style={{ width:"var(--size-control-lg)", height:"var(--size-control-lg)", borderRadius:"var(--radius-sm-ds)", background:status==="error"?"var(--bg-error-subtle)":"var(--bg-brand-subtle)", display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0 }}>
        <Typography variant="micro" color={status==="error"?"error":"brand"} style={{ fontWeight:"var(--font-weight-bold)" as any }}>{ext}</Typography>
      </div>
      <div style={{ flex:1, minWidth:0, display:"flex", flexDirection:"column", gap:"var(--space-1)" }}>
        <Typography variant="body" weight="medium" color={status==="error"?"error":"primary"} truncate>{name}</Typography>
        <div style={{ display:"flex", alignItems:"center", gap:"var(--space-2)" }}>
          <Typography variant="micro" color="tertiary">{size}</Typography>
          {status==="uploading" && <span style={{ display:"contents" }}><Typography variant="micro" color="tertiary">·</Typography><Typography variant="micro" color="brand">{progress}%</Typography></span>}
        </div>
        {status==="uploading" && <ProgressBar percent={progress} size="sm" fullWidth />}
      </div>
      <BadgeLabel label={status} variant={statusVariant[status]} size="sm" />
      {status==="error" && (
        <button style={{ background:"none", border:"none", cursor:"pointer", padding:0, display:"flex", color:"var(--fg-brand)" }}>
          <Icon name="refresh" size="sm" color="brand" />
        </button>
      )}
      <button style={{ background:"none", border:"none", cursor:"pointer", padding:0, display:"flex", color:"var(--fg-tertiary)" }}>
        <Icon name="x" size="sm" color="tertiary" />
      </button>
    </div>
  );
}

// ════════════════════════════════════════════════════════════════════════════
//  18. METRIC CARD
// ════════════════════════════════════════════════════════════════════════════
interface SparkPoint { v: number; }
function MiniSparkline({ points, color, width=80, height=32 }: { points: SparkPoint[]; color: string; width?: number; height?: number }) {
  const max = Math.max(...points.map(p=>p.v));
  const min = Math.min(...points.map(p=>p.v));
  const range = max - min || 1;
  const xs = points.map((_,i) => (i/(points.length-1))*width);
  const ys = points.map(p => height - ((p.v-min)/range)*(height-4) - 2);
  const pts = xs.map((x,i)=>`${x},${ys[i]}`).join(" ");
  const area = `M${xs[0]},${height} ${xs.map((x,i)=>`L${x},${ys[i]}`).join(" ")} L${xs[xs.length-1]},${height} Z`;
  return (
    <svg width={width} height={height} style={{ overflow:"visible" }}>
      <path d={area} fill={color} style={{ fillOpacity:"var(--opacity-area-fill)" }} />
      <polyline points={pts} fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}
interface MetricCardProps { label: string; value: string; change?: string; trend?: "up"|"down"; sparkData?: SparkPoint[]; color?: string; style?: React.CSSProperties; }
export function MetricCard({ label, value, change, trend="up", sparkData, color="var(--primary)", style }: MetricCardProps) {
  const def: SparkPoint[] = [{v:40},{v:55},{v:48},{v:72},{v:65},{v:80},{v:74},{v:90}];
  const data = sparkData ?? def;
  return (
    <div style={{ background:"var(--card-ds-bg)", border:`var(--border-width-thin) solid var(--card-ds-border)`, borderRadius:"var(--radius-md-ds)", padding:"var(--space-4)", display:"flex", flexDirection:"column", gap:"var(--space-3)", boxShadow:"var(--shadow-sm)", ...style }}>
      <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between" }}>
        <Typography variant="label" color="secondary">{label}</Typography>
        <MiniSparkline points={data} color={color} />
      </div>
      <Typography variant="h4" weight="bold" color="primary" display>{value}</Typography>
      {change && (
        <div style={{ display:"flex", alignItems:"center", gap:"var(--space-1)" }}>
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d={trend==="up"?"M6 2L10 6H7.5V10h-3V6H2L6 2":"M6 10L10 6H7.5V2h-3V6H2L6 10"} fill={trend==="up"?"var(--status-healthy)":"var(--status-unhealthy)"}/></svg>
          <Typography variant="label" color={trend==="up"?"success":"error"} weight="medium">{change}</Typography>
          <Typography variant="label" color="tertiary">vs last period</Typography>
        </div>
      )}
    </div>
  );
}

// ════════════════════════════════════════════════════════════════════════════
//  19. NOTIFICATION ITEM
// ════════════════════════��═══════════════════════════════════════════════════
type NotifVariant = "unread"|"read";
interface NotificationItemProps { title: string; description: string; time: string; variant?: NotifVariant; avatar?: string; avatarLabel?: string; actionLabel?: string; style?: React.CSSProperties; }
export function NotificationItem({ title, description, time, variant="unread", avatarLabel="?", actionLabel, style }: NotificationItemProps) {
  return (
    <div style={{ display:"flex", alignItems:"flex-start", gap:"var(--space-3)", padding:"var(--space-3) var(--space-4)", background:variant==="unread"?"var(--bg-brand-subtle)":"var(--bg-primary)", borderBottom:`var(--border-width-thin) solid var(--border-divider)`, ...style }}>
      <div style={{ position:"relative", flexShrink:0 }}>
        <Avatar size="md" shape="circle" label={avatarLabel} />
        {variant==="unread" && <div style={{ position:"absolute", top:0, right:0, width:"var(--space-2)", height:"var(--space-2)", borderRadius:"var(--radius-full-ds)", background:"var(--bg-brand)", border:`var(--border-width-medium) solid var(--bg-primary)` }} />}
      </div>
      <div style={{ flex:1, minWidth:0, display:"flex", flexDirection:"column", gap:"var(--space-1)" }}>
        <div style={{ display:"flex", alignItems:"baseline", justifyContent:"space-between", gap:"var(--space-2)" }}>
          <Typography variant="body" weight={variant==="unread"?"semibold":"medium"} color="primary" truncate>{title}</Typography>
          <Typography variant="micro" color="tertiary" style={{ flexShrink:0 }}>{time}</Typography>
        </div>
        <Typography variant="label" color="secondary">{description}</Typography>
        {actionLabel && <div><Button variant="outline" size="sm">{actionLabel}</Button></div>}
      </div>
    </div>
  );
}

// ════════════════════════════════════════════════════════════════════════════
//  20. ACTION BAR (contextual selection toolbar)
// ════════════════════════════════════════════════════════════════════════════
interface ActionBarProps { selectedCount?: number; actions?: { label: string; icon?: React.ReactNode; destructive?: boolean }[]; onClear?: () => void; style?: React.CSSProperties; }
export function ActionBar({ selectedCount=3, actions, onClear, style }: ActionBarProps) {
  const def = [
    {label:"Delete",icon:<Icon name="trash" size="sm" color="error" />,destructive:true},
    {label:"Archive",icon:<Icon name="folder" size="sm" color="secondary" />},
    {label:"Move",icon:<Icon name="arrow-right" size="sm" color="secondary" />},
    {label:"Export",icon:<Icon name="download" size="sm" color="secondary" />},
  ];
  const acts = actions ?? def;
  return (
    <div style={{ display:"inline-flex", alignItems:"center", gap:"var(--space-3)", padding:"var(--space-2) var(--space-4)", background:"var(--bg-primary)", border:`var(--border-width-thin) solid var(--border-focus)`, borderRadius:"var(--radius-md-ds)", boxShadow:"var(--shadow-md)", ...style }}>
      <BadgeLabel label={`${selectedCount} selected`} variant="primary" />
      <Divider vertical style={{ height:"var(--size-icon-md)" }} />
      <div style={{ display:"flex", alignItems:"center", gap:"var(--space-2)" }}>
        {acts.map(act => (
          <Button key={act.label} variant={act.destructive?"danger":"ghost"} size="sm" icon={act.icon}>{act.label}</Button>
        ))}
      </div>
      <Divider vertical style={{ height:"var(--size-icon-md)" }} />
      <button onClick={onClear} style={{ background:"none", border:"none", cursor:"pointer", padding:0, display:"flex", alignItems:"center", color:"var(--fg-tertiary)" }}>
        <Icon name="x" size="sm" color="tertiary" />
      </button>
    </div>
  );
}

// ════════════════════════════════════════════════════════════════════════════
//  LEGACY / EXTRA COMPONENTS  (used by organisms — kept for backward compat)
// ════════════════════════════════════════════════════════════════════════════

export function FormSection({ title, description, children, defaultOpen=true, extra, className }: {
  title: string; description?: string; children: React.ReactNode;
  defaultOpen?: boolean; extra?: React.ReactNode; className?: string;
}) {
  const [open, setOpen] = React.useState(defaultOpen);
  return (
    <div className={className} style={{ background:"var(--card-ds-bg)", border:`var(--border-width-thin) solid var(--card-ds-border)`, borderRadius:"var(--radius-md-ds)", overflow:"hidden" }}>
      <button onClick={() => setOpen(v=>!v)} style={{ width:"100%", display:"flex", alignItems:"center", gap:"var(--space-2)", padding:"var(--space-4) var(--space-6)", cursor:"pointer", border:"none", background:"transparent", textAlign:"left" as const }}>
        <div style={{ flex:1, display:"flex", flexDirection:"column", gap:"var(--space-1)" }}>
          <Typography variant="title" weight="semibold" color="primary">{title}</Typography>
          {description && <Typography variant="body" color="secondary">{description}</Typography>}
        </div>
        {extra && <div>{extra}</div>}
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" style={{ transform:open?"rotate(180deg)":undefined, flexShrink:0 }}>
          <path d="M4 6L8 10L12 6" stroke="var(--icon-secondary)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </button>
      {open && (
        <div style={{ padding:"0 var(--space-6) var(--space-6)", display:"flex", flexDirection:"column", gap:"var(--space-4)" }}>
          <Divider />
          {children}
        </div>
      )}
    </div>
  );
}

export function FileUploadItem({ filename, fileSize, progress, status="idle", onRemove }: {
  filename: string; fileSize: string; progress?: number;
  status?: "idle"|"uploading"|"complete"|"error"; onRemove?: () => void;
}) {
  return (
    <div style={{ display:"flex", alignItems:"center", gap:"var(--space-3)", padding:"var(--space-3) var(--space-4)", borderBottom:`var(--border-width-thin) solid var(--border-divider)` }}>
      <div style={{ flex:1, minWidth:0, display:"flex", flexDirection:"column", gap:"var(--space-1)" }}>
        <Typography variant="body" weight="medium" color="primary" truncate>{filename}</Typography>
        <div style={{ display:"flex", alignItems:"center", gap:"var(--space-2)" }}>
          <Typography variant="label" color="tertiary">{fileSize}</Typography>
          {status==="uploading" && <span style={{ display:"contents" }}><Typography variant="label" color="tertiary">·</Typography><Typography variant="label" color="brand">Uploading {progress}%</Typography></span>}
        </div>
        {status==="uploading" && progress!==undefined && <ProgressBar percent={progress} height="var(--showcase-progress-h)" fullWidth />}
      </div>
      {onRemove && (
        <button onClick={onRemove} style={{ width:"var(--size-control-sm)", height:"var(--size-control-sm)", display:"flex", alignItems:"center", justifyContent:"center", border:"none", background:"transparent", cursor:"pointer", color:"var(--fg-error)", flexShrink:0 }}>
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M3 3L11 11M11 3L3 11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></svg>
        </button>
      )}
    </div>
  );
}

export function ResourceStatRow({ icon, label, value, className }: { icon?: React.ReactNode; label: string; value: string; className?: string; }) {
  return (
    <div className={className} style={{ display:"inline-flex", alignItems:"center", gap:"var(--space-2)" }}>
      {icon && <span style={{ display:"flex", alignItems:"center", color:"var(--icon-tertiary)" }}>{icon}</span>}
      <Typography variant="label" color="secondary">{label}:</Typography>
      <Typography variant="label" weight="semibold" color="primary">{value}</Typography>
    </div>
  );
}

export function PageHeader({ title, description, search, searchPlaceholder, primaryAction, onPrimaryAction, extra, className }: {
  title: string; description?: string; search?: boolean; searchPlaceholder?: string;
  primaryAction?: string; onPrimaryAction?: () => void; extra?: React.ReactNode; className?: string;
}) {
  return (
    <div className={className} style={{ display:"flex", alignItems:"flex-start", justifyContent:"space-between", gap:"var(--space-4)", flexWrap:"wrap" as const }}>
      <div style={{ flex:"1 1 auto", minWidth:0, display:"flex", flexDirection:"column", gap:"var(--space-1)" }}>
        <Typography variant="heading" weight="bold" color="primary">{title}</Typography>
        {description && <Typography variant="body" color="secondary">{description}</Typography>}
      </div>
      <div style={{ display:"flex", alignItems:"center", gap:"var(--space-2)", flexShrink:0 }}>
        {search && <SearchBar placeholder={searchPlaceholder} width="var(--search-bar-width-compact)" />}
        {primaryAction && <Button variant="primary" icon={<svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M6 2V10M2 6H10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></svg>} onClick={onPrimaryAction}>{primaryAction}</Button>}
        {extra}
      </div>
    </div>
  );
}

export function Toast({ title, description, variant="info", withAction }: { title: string; description?: string; variant?: AlertType; withAction?: boolean; }) {
  const tc = alertColors[variant];
  return (
    <div style={{ display:"flex", alignItems:"flex-start", gap:"var(--space-3)", padding:"var(--space-3) var(--space-4)", background:"var(--bg-primary)", border:`var(--border-width-thin) solid var(--border-default)`, borderLeft:`var(--alert-accent-width) solid ${tc.accent}`, borderRadius:"var(--radius-md-ds)", boxShadow:"var(--shadow-lg)", width:"var(--toast-width)" }}>
      <span style={{ flexShrink:0, paddingTop:"var(--space-px)" }}>{alertSVG[variant]}</span>
      <div style={{ flex:1, display:"flex", flexDirection:"column", gap:"var(--space-1)" }}>
        <Typography variant="body" weight="semibold" color="primary">{title}</Typography>
        {description && <Typography variant="label" color="secondary">{description}</Typography>}
        {withAction && <div style={{ display:"flex", gap:"var(--space-2)" }}><Button variant="outline" size="sm">Undo</Button><Button variant="ghost" size="sm">Dismiss</Button></div>}
      </div>
      <svg width="12" height="12" viewBox="0 0 12 12" fill="none" style={{ cursor:"pointer", flexShrink:0 }}><path d="M2 2L10 10M10 2L2 10" stroke="var(--icon-tertiary)" strokeWidth="1.5" strokeLinecap="round"/></svg>
    </div>
  );
}

export interface CommandItem { key: string; icon?: React.ReactNode; label: string; description?: string; shortcut?: string[]; group?: string; onClick?: () => void; }
export function CommandPalette({ open, onClose, items=[], placeholder="Search commands…" }: { open: boolean; onClose: () => void; items?: CommandItem[]; placeholder?: string; }) {
  if (!open) return null;
  return (
    <div style={{ position:"fixed", inset:0, zIndex:"var(--z-modal)" as any, display:"flex", alignItems:"flex-start", justifyContent:"center", paddingTop:"var(--modal-top-offset)", background:"var(--overlay-medium)" }} onClick={e => { if (e.target===e.currentTarget) onClose(); }}>
      <div style={{ width:"var(--notification-center-width)", background:"var(--bg-primary)", border:`var(--border-width-medium) solid var(--border-default)`, borderRadius:"var(--radius-md-ds)", boxShadow:"var(--shadow-xl)", overflow:"hidden" }}>
        <div style={{ display:"flex", alignItems:"center", gap:"var(--space-2)", padding:"var(--space-3) var(--space-4)", borderBottom:`var(--border-width-thin) solid var(--border-divider)` }}>
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><circle cx="7" cy="7" r="5.5" stroke="var(--fg-tertiary)" strokeWidth="1.5"/><path d="M11 11L14 14" stroke="var(--fg-tertiary)" strokeWidth="1.5" strokeLinecap="round"/></svg>
          <input placeholder={placeholder} style={{ flex:1, border:"none", outline:"none", background:"transparent", fontSize:"var(--text-base)", color:"var(--fg-primary)", fontFamily:"var(--font-family-primary)" }} />
          <kbd style={{ fontSize:"var(--text-micro)", color:"var(--fg-tertiary)", fontFamily:"var(--font-family-mono)", background:"var(--bg-secondary)", border:`var(--border-width-thin) solid var(--border-default)`, borderRadius:"var(--radius-sm-ds)", padding:"var(--space-px) var(--space-1)" }}>esc</kbd>
        </div>
        <div style={{ maxHeight:"var(--dropdown-list-max-height-lg)", overflowY:"auto" as const, padding:"var(--space-1) 0" }}>
          {items.map(item => (
            <div key={item.key} onClick={() => { item.onClick?.(); onClose(); }} style={{ display:"flex", alignItems:"center", gap:"var(--space-2)", padding:"var(--space-2) var(--space-4)", cursor:"pointer" }}>
              {item.icon && <span style={{ width:"var(--size-control-sm)", height:"var(--size-control-sm)", display:"flex", alignItems:"center", justifyContent:"center", background:"var(--bg-secondary)", borderRadius:"var(--radius-xs)", flexShrink:0 }}>{item.icon}</span>}
              <Typography variant="body" color="primary">{item.label}</Typography>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export interface FilterOption { key: string; label: string; count?: number; }
export function FilterBar({ filters=[], activeFilters=[], onFilterChange, className, style }: { filters?: FilterOption[]; activeFilters?: string[]; onFilterChange?: (a: string[]) => void; className?: string; style?: React.CSSProperties; }) {
  return (
    <div className={className} style={{ display:"flex", alignItems:"center", gap:"var(--space-2)", flexWrap:"wrap" as const, padding:"var(--space-2) var(--space-3)", background:"var(--bg-secondary)", border:`var(--border-width-thin) solid var(--border-divider)`, borderRadius:"var(--radius-sm-ds)", ...style }}>
      {filters.map(f => {
        const active = activeFilters.includes(f.key);
        return (
          <button key={f.key} onClick={() => { const next = active ? activeFilters.filter(k=>k!==f.key) : [...activeFilters,f.key]; onFilterChange?.(next); }}
            style={{ padding:"var(--badge-padding-y) var(--space-2)", borderRadius:"var(--radius-full-ds)", fontSize:"var(--text-caption)", fontFamily:"var(--font-family-primary)", lineHeight:"var(--line-height-md)", cursor:"pointer", border:`var(--border-width-thin) solid ${active?"var(--border-brand)":"transparent"}`, background:active?"var(--bg-brand-subtle)":"transparent", color:active?"var(--fg-brand)":"var(--fg-secondary)", fontWeight:active?"var(--font-weight-semibold)" as any:"var(--font-weight-normal)" as any }}>
            {f.label}{f.count!==undefined && ` (${f.count})`}
          </button>
        );
      })}
    </div>
  );
}

// ════════════════════════════════════════════════════════════════════════════
//  21. DROPDOWN MENU  (composed: Button · Icon · Typography · Divider)
// ════════════════════════════════════════════════════════════════════════════
export interface DropdownItem { key: string; label: string; icon?: React.ReactNode; shortcut?: string; destructive?: boolean; disabled?: boolean; separator?: boolean; subMenu?: boolean; }
interface DropdownMenuProps { trigger?: React.ReactNode; items: DropdownItem[]; open?: boolean; style?: React.CSSProperties; }
export function DropdownMenu({ trigger, items, open=true, style }: DropdownMenuProps) {
  return (
    <div style={{ position:"relative", display:"inline-block", ...style }}>
      {trigger}
      {open && (
        <div style={{ position:"absolute", top:"calc(100% + var(--space-1))", left:0, zIndex:"var(--z-dropdown)" as any, minWidth:"var(--dropdown-min-width)", background:"var(--bg-primary)", border:`var(--border-width-thin) solid var(--border-default)`, borderRadius:"var(--radius-md-ds)", boxShadow:"var(--shadow-lg)", padding:"var(--space-1) 0" }}>
          {items.map(item => item.separator ? (
            <div key={item.key} style={{ height:"var(--border-width-thin)", background:"var(--border-divider)", margin:"var(--space-1) 0" }} />
          ) : (
            <div key={item.key} style={{ display:"flex", alignItems:"center", gap:"var(--space-2)", padding:"var(--space-2) var(--space-3)", cursor:item.disabled?"not-allowed":"pointer", opacity:item.disabled?"var(--opacity-disabled-soft)" as any:1 }}>
              {item.icon && <span style={{ display:"flex", width:"var(--size-icon-sm)", flexShrink:0 }}>{item.icon}</span>}
              <span style={{ flex:1, fontSize:"var(--text-base)", fontFamily:"var(--font-family-primary)", lineHeight:"var(--line-height-md)", color:item.destructive?"var(--fg-error)":item.disabled?"var(--fg-disabled)":"var(--fg-primary)" }}>{item.label}</span>
              {item.shortcut && <span style={{ fontSize:"var(--text-micro)", fontFamily:"var(--font-family-mono)", lineHeight:"var(--line-height-none)", color:"var(--fg-tertiary)", background:"var(--bg-secondary)", border:`var(--border-width-thin) solid var(--border-default)`, borderRadius:"var(--radius-xs)", padding:"var(--badge-padding-y) var(--space-1)" }}>{item.shortcut}</span>}
              {item.subMenu && <svg width="10" height="10" viewBox="0 0 10 10" fill="none"><path d="M3.5 2L6.5 5L3.5 8" stroke="var(--icon-tertiary)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// ════════════════════════════════════════════════════════════════════════════
//  22. CONTEXT MENU  (composed: Icon · Typography · Divider)
// ════════════════════════════════════════════════════════════════════════════
interface ContextMenuProps { items: DropdownItem[]; style?: React.CSSProperties; }
export function ContextMenu({ items, style }: ContextMenuProps) {
  return (
    <div style={{ minWidth:"var(--dropdown-min-width)", background:"var(--bg-primary)", border:`var(--border-width-thin) solid var(--border-default)`, borderRadius:"var(--radius-md-ds)", boxShadow:"var(--shadow-lg)", padding:"var(--space-1) 0", overflow:"hidden", ...style }}>
      {items.map(item => item.separator ? (
        <div key={item.key} style={{ height:"var(--border-width-thin)", background:"var(--border-divider)", margin:"var(--space-1) 0" }} />
      ) : (
        <div key={item.key} style={{ display:"flex", alignItems:"center", gap:"var(--space-2)", padding:"var(--space-2) var(--space-3)", cursor:item.disabled?"not-allowed":"pointer", opacity:item.disabled?"var(--opacity-disabled-soft)" as any:1 }}>
          {item.icon && <span style={{ display:"flex", width:"var(--size-icon-sm)", flexShrink:0 }}>{item.icon}</span>}
          <span style={{ flex:1, fontSize:"var(--text-base)", fontFamily:"var(--font-family-primary)", lineHeight:"var(--line-height-md)", color:item.destructive?"var(--fg-error)":item.disabled?"var(--fg-disabled)":"var(--fg-primary)" }}>{item.label}</span>
          {item.shortcut && <span style={{ fontSize:"var(--text-micro)", fontFamily:"var(--font-family-mono)", lineHeight:"var(--line-height-none)", color:"var(--fg-tertiary)", background:"var(--bg-secondary)", border:`var(--border-width-thin) solid var(--border-default)`, borderRadius:"var(--radius-xs)", padding:"var(--badge-padding-y) var(--space-1)" }}>{item.shortcut}</span>}
          {item.subMenu && <svg width="10" height="10" viewBox="0 0 10 10" fill="none"><path d="M3.5 2L6.5 5L3.5 8" stroke="var(--icon-tertiary)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>}
        </div>
      ))}
    </div>
  );
}

// ════════════════════════════════════════════════════════════════════════════
//  23. ALERT DIALOG  (composed: Card · Button · Typography · Icon)
// ════════════════════════════════════════════════════════════════════════════
interface AlertDialogProps { title: string; description: string; confirmLabel?: string; cancelLabel?: string; destructive?: boolean; style?: React.CSSProperties; }
export function AlertDialog({ title, description, confirmLabel="Confirm", cancelLabel="Cancel", destructive, style }: AlertDialogProps) {
  return (
    <div style={{ width:"var(--filter-panel-width)", background:"var(--bg-primary)", border:`var(--border-width-thin) solid var(--border-default)`, borderRadius:"var(--radius-md-ds)", boxShadow:"var(--shadow-xl)", padding:"var(--space-6)", display:"flex", flexDirection:"column", gap:"var(--space-4)", ...style }}>
      <div style={{ display:"flex", flexDirection:"column", gap:"var(--space-2)" }}>
        <Typography variant="title" weight="semibold" color="primary">{title}</Typography>
        <Typography variant="body" color="secondary">{description}</Typography>
      </div>
      <div style={{ display:"flex", justifyContent:"flex-end", gap:"var(--space-2)" }}>
        <Button variant="secondary">{cancelLabel}</Button>
        <Button variant={destructive?"danger":"primary"}>{confirmLabel}</Button>
      </div>
    </div>
  );
}

// ════════════════════════════════════════════════════════════════════════════
//  24. CAROUSEL  (composed: Button · Icon)
// ════════════════════════════════════════════════════════════════════════════
interface CarouselSlide { id: string; label: string; bg?: string; }
interface CarouselProps { slides?: CarouselSlide[]; activeIndex?: number; style?: React.CSSProperties; }
export function Carousel({ slides, activeIndex=1, style }: CarouselProps) {
  const def: CarouselSlide[] = [
    {id:"1",label:"Slide 1",bg:"var(--carousel-slide-1-bg)"},{id:"2",label:"Slide 2",bg:"var(--carousel-slide-2-bg)"},
    {id:"3",label:"Slide 3",bg:"var(--carousel-slide-3-bg)"},{id:"4",label:"Slide 4",bg:"var(--carousel-slide-4-bg)"},
  ];
  const s = slides ?? def;
  const ai = activeIndex % s.length;
  return (
    <div style={{ display:"flex", flexDirection:"column", gap:"var(--space-3)", ...style }}>
      <div style={{ display:"flex", alignItems:"center", gap:"var(--space-2)" }}>
        <button style={{ width:"var(--btn-height-md)", height:"var(--btn-height-md)", borderRadius:"var(--radius-full)", border:`var(--border-width-thin) solid var(--border-default)`, background:"var(--bg-primary)", cursor:"pointer", display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0, boxShadow:"var(--shadow-sm)" }}>
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M7.5 3L4.5 6L7.5 9" stroke="var(--icon-primary)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
        </button>
        <div style={{ flex:1, display:"flex", gap:"var(--space-3)", overflow:"hidden" }}>
          {s.slice(0,3).map((slide, i) => (
            <div key={slide.id} style={{ flex:`0 0 calc(33.33% - var(--space-2))`, height:"var(--carousel-slide-height)", borderRadius:"var(--radius-md-ds)", background:slide.bg??"var(--bg-secondary)", display:"flex", alignItems:"center", justifyContent:"center", border:`var(--border-width-medium) solid ${i===ai?"var(--border-focus)":"var(--border-default)"}`, opacity:i===ai?1:"var(--opacity-muted)" as any }}>
              <Typography variant="title" color={i===ai?"brand":"secondary"} weight="medium">{slide.label}</Typography>
            </div>
          ))}
        </div>
        <button style={{ width:"var(--btn-height-md)", height:"var(--btn-height-md)", borderRadius:"var(--radius-full)", border:`var(--border-width-thin) solid var(--border-default)`, background:"var(--bg-primary)", cursor:"pointer", display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0, boxShadow:"var(--shadow-sm)" }}>
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M4.5 3L7.5 6L4.5 9" stroke="var(--icon-primary)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
        </button>
      </div>
      <div style={{ display:"flex", justifyContent:"center", gap:"var(--space-1)" }}>
        {s.map((slide, i) => (<div key={slide.id} style={{ width:i===ai?"var(--space-5)":"var(--space-2)", height:"var(--space-2)", borderRadius:"var(--radius-full-ds)", background:i===ai?"var(--bg-brand)":"var(--border-default)", transition:`width var(--duration-normal) var(--ease-default)` }} />))}
      </div>
    </div>
  );
}

// ════════════════════════════════════════════════════════════════════════════
//  25. CHART  (composed: Typography · Badge)
// ════════════════════════════════════════════════════════════════════════════
type ChartType = "line"|"bar"|"area"|"donut";
interface ChartDataPoint { label: string; value: number; }
interface ChartProps { type?: ChartType; data?: ChartDataPoint[]; title?: string; color?: string; width?: number | string; height?: number | string; style?: React.CSSProperties; }
const DEFAULT_CHART_DATA: ChartDataPoint[] = [
  {label:"Jan",value:40},{label:"Feb",value:65},{label:"Mar",value:50},
  {label:"Apr",value:80},{label:"May",value:72},{label:"Jun",value:90},
];
const DONUT_COLORS = ["var(--chart-1)","var(--chart-3)","var(--chart-4)","var(--chart-6)","var(--status-warning)","var(--status-healthy)"];
export function Chart({ type="line", data=DEFAULT_CHART_DATA, title, color="var(--primary)", width: widthProp=280, height: heightProp=140, style }: ChartProps) {
  const width = typeof widthProp === "number" ? widthProp : 280;
  const height = typeof heightProp === "number" ? heightProp : 140;
  const maxVal = Math.max(...data.map(d=>d.value), 1);
  const pL=36,pB=24,pT=12,pR=12;
  const W=width-pL-pR, H=height-pT-pB;
  const gx=(i:number)=>pL+(i/(data.length-1||1))*W;
  const gy=(v:number)=>pT+H-(v/maxVal)*H;
  const bW=W/data.length-4;
  if (type==="donut") {
    const total=data.reduce((s,d)=>s+d.value,0);
    let ang=-Math.PI/2;
    const ox=width/2, oy=height/2, r=Math.min(width,height)/2-pT, ri=r*0.55;
    return (
      <div style={{ display:"inline-flex", flexDirection:"column", gap:"var(--space-2)", ...style }}>
        {title && <Typography variant="label" weight="semibold" color="secondary">{title}</Typography>}
        <svg width={width} height={height}>
          {data.map((d,i)=>{
            const a=(d.value/total)*2*Math.PI;
            const x1=ox+r*Math.cos(ang),y1=oy+r*Math.sin(ang);
            const x2=ox+r*Math.cos(ang+a),y2=oy+r*Math.sin(ang+a);
            const xi1=ox+ri*Math.cos(ang),yi1=oy+ri*Math.sin(ang);
            const xi2=ox+ri*Math.cos(ang+a),yi2=oy+ri*Math.sin(ang+a);
            const lg=a>Math.PI?1:0;
            const path=`M${x1},${y1} A${r},${r} 0 ${lg} 1 ${x2},${y2} L${xi2},${yi2} A${ri},${ri} 0 ${lg} 0 ${xi1},${yi1} Z`;
            ang+=a;
            return <path key={i} d={path} fill={DONUT_COLORS[i%DONUT_COLORS.length]} stroke="var(--bg-primary)" strokeWidth="2"/>;
          })}
        </svg>
        <div style={{ display:"flex", flexWrap:"wrap" as const, gap:"var(--space-2)" }}>
          {data.map((d,i)=><div key={i} style={{ display:"flex", alignItems:"center", gap:"var(--space-1)" }}><div style={{ width:"var(--space-2)", height:"var(--space-2)", borderRadius:"var(--radius-full)", background:DONUT_COLORS[i%DONUT_COLORS.length], flexShrink:0 }}/><Typography variant="micro" color="secondary">{d.label}</Typography></div>)}
        </div>
      </div>
    );
  }
  const pts=data.map((d,i)=>`${gx(i)},${gy(d.value)}`).join(" ");
  const areaPath=`M${gx(0)},${gy(data[0].value)} ${data.slice(1).map((d,i)=>`L${gx(i+1)},${gy(d.value)}`).join(" ")} L${gx(data.length-1)},${pT+H} L${gx(0)},${pT+H} Z`;
  return (
    <div style={{ display:"inline-flex", flexDirection:"column", gap:"var(--space-2)", ...style }}>
      {title && <Typography variant="label" weight="semibold" color="secondary">{title}</Typography>}
      <svg width={width} height={height} style={{ overflow:"visible" }}>
        {[0,0.25,0.5,0.75,1].map((f,i)=>(
          <g key={i}>
            <line x1={pL} y1={pT+H*f} x2={pL+W} y2={pT+H*f} stroke="var(--border-divider)" strokeWidth="1"/>
            <text x={pL-4} y={pT+H*f+4} textAnchor="end" fill="var(--fg-tertiary)" fontSize="var(--chart-axis-font-size)" fontFamily="var(--font-family-mono)">{Math.round(maxVal*(1-f))}</text>
          </g>
        ))}
        {type==="bar" && data.map((d,i)=>(
          <g key={i}>
            <rect x={pL+(i/data.length)*W+2} y={gy(d.value)} width={bW} height={pT+H-gy(d.value)} fill={color} rx="2" opacity="var(--opacity-soft)"/>
            <text x={pL+(i/data.length)*W+bW/2+2} y={pT+H+16} textAnchor="middle" fill="var(--fg-tertiary)" fontSize="var(--chart-axis-font-size)" fontFamily="var(--font-family-primary)">{d.label}</text>
          </g>
        ))}
        {type==="area" && <g><path d={areaPath} fill={color} style={{ fillOpacity:"var(--opacity-area-fill)" }}/><polyline points={pts} fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></g>}
        {type==="line" && <g><polyline points={pts} fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>{data.map((d,i)=><circle key={i} cx={gx(i)} cy={gy(d.value)} r="3" fill={color} stroke="var(--bg-primary)" strokeWidth="2"/>)}</g>}
        {(type==="line"||type==="area") && data.map((d,i)=><text key={i} x={gx(i)} y={pT+H+16} textAnchor="middle" fill="var(--fg-tertiary)" fontSize="var(--chart-axis-font-size)" fontFamily="var(--font-family-primary)">{d.label}</text>)}
      </svg>
    </div>
  );
}

// ════════════════════════════════════════════════════════════════════════════
//  26. TABLE  (composed: Typography · Checkbox · Icon · Badge)
// ════════════════════════════════════════════════════════════════════════════
interface TableColDef { key: string; title: string; width?: number; sortable?: boolean; }
interface TablePrimitiveProps { columns: TableColDef[]; rows: Record<string,any>[]; striped?: boolean; compact?: boolean; style?: React.CSSProperties; }
export function TablePrimitive({ columns, rows, striped, compact, style }: TablePrimitiveProps) {
  const cp = compact?"var(--space-2) var(--space-3)":"var(--space-3) var(--space-4)";
  return (
    <div style={{ overflow:"auto", border:`var(--border-width-thin) solid var(--border-default)`, borderRadius:"var(--radius-md-ds)", ...style }}>
      <table style={{ width:"100%", borderCollapse:"collapse" as const, fontFamily:"var(--font-family-primary)" }}>
        <thead>
          <tr style={{ background:"var(--bg-secondary)", borderBottom:`var(--border-width-thin) solid var(--border-default)` }}>
            {columns.map(col=>(
              <th key={col.key} style={{ textAlign:"left" as const, padding:cp, fontSize:"var(--text-caption)", fontWeight:"var(--font-weight-semibold)" as any, color:"var(--fg-tertiary)", width:col.width, whiteSpace:"nowrap" as const }}>
                <div style={{ display:"flex", alignItems:"center", gap:"var(--space-1)" }}>
                  {col.title}
                  {col.sortable && <svg width="10" height="10" viewBox="0 0 10 10" fill="none"><path d="M5 2V8M2.5 5.5L5 8L7.5 5.5" stroke="var(--icon-tertiary)" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/></svg>}
                </div>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row,ri)=>(
            <tr key={ri} style={{ borderBottom:`var(--border-width-thin) solid var(--border-divider)`, background:striped&&ri%2===0?"var(--bg-secondary)":"var(--bg-primary)" }}>
              {columns.map(col=>(<td key={col.key} style={{ padding:cp, fontSize:"var(--text-base)", fontFamily:"var(--font-family-primary)", lineHeight:"var(--line-height-md)", color:"var(--fg-primary)" }}>{row[col.key]}</td>))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

// ════════════════════════════════════════════════════════════════════════════
//  27. USER CARD
// ════════════════════════════════════════════════════���═══════════════════════
type UserCardVariant = "default" | "compact" | "horizontal" | "minimal";
interface UserCardProps {
  name: string; role?: string; email?: string; avatarLabel?: string;
  status?: "online" | "offline" | "busy" | "away";
  variant?: UserCardVariant;
  actions?: React.ReactNode;
  badge?: React.ReactNode;
  style?: React.CSSProperties;
}
export function UserCard({ name, role, email, avatarLabel, status, variant="default", actions, badge, style }: UserCardProps) {
  const statusColor: Record<string,string> = { online:"var(--status-healthy)", offline:"var(--fg-disabled)", busy:"var(--status-unhealthy)", away:"var(--icon-warning)" };
  const statusLabel: Record<string,string> = { online:"Online", offline:"Offline", busy:"Busy", away:"Away" };
  if (variant === "compact") return (
    <div style={{ display:"flex", alignItems:"center", gap:"var(--space-2)", padding:"var(--space-2) var(--space-3)", background:"var(--bg-primary)", border:`var(--border-width-thin) solid var(--border-default)`, borderRadius:"var(--radius-md-ds)", ...style }}>
      <Avatar size="sm" shape="circle" label={avatarLabel ?? name[0]} status={status} />
      <div style={{ flex:1, minWidth:0, display:"flex", flexDirection:"column", gap:"var(--space-px)" }}>
        <Typography variant="label" weight="medium" color="primary" truncate>{name}</Typography>
        {role && <Typography variant="micro" color="tertiary" truncate>{role}</Typography>}
      </div>
      {badge}
    </div>
  );
  if (variant === "horizontal") return (
    <div style={{ display:"flex", alignItems:"center", gap:"var(--space-4)", padding:"var(--space-4)", background:"var(--bg-primary)", border:`var(--border-width-thin) solid var(--border-default)`, borderRadius:"var(--radius-md-ds)", ...style }}>
      <Avatar size="lg" shape="circle" label={avatarLabel ?? name[0]} status={status} />
      <div style={{ flex:1, minWidth:0, display:"flex", flexDirection:"column", gap:"var(--space-1)" }}>
        <div style={{ display:"flex", alignItems:"center", gap:"var(--space-2)" }}>
          <Typography variant="title" weight="semibold" color="primary">{name}</Typography>
          {status && <span style={{ display:"flex", alignItems:"center", gap:"var(--space-1)", fontSize:"var(--text-caption)", fontFamily:"var(--font-family-primary)", lineHeight:"var(--line-height-xs)", color:statusColor[status] }}><span style={{ width:"var(--space-1)", height:"var(--space-1)", borderRadius:"var(--radius-full-ds)", background:statusColor[status], display:"inline-block" }}/>{statusLabel[status]}</span>}
        </div>
        {role && <Typography variant="body" color="secondary">{role}</Typography>}
        {email && <Typography variant="label" color="tertiary">{email}</Typography>}
      </div>
      {actions && <div style={{ display:"flex", gap:"var(--space-2)", flexShrink:0 }}>{actions}</div>}
    </div>
  );
  if (variant === "minimal") return (
    <div style={{ display:"flex", alignItems:"center", gap:"var(--space-2)", ...style }}>
      <Avatar size="sm" shape="circle" label={avatarLabel ?? name[0]} />
      <Typography variant="label" weight="medium" color="primary">{name}</Typography>
      {badge}
    </div>
  );
  return (
    <div style={{ display:"flex", flexDirection:"column", alignItems:"center", gap:"var(--space-3)", padding:"var(--space-6) var(--space-4)", background:"var(--bg-primary)", border:`var(--border-width-thin) solid var(--border-default)`, borderRadius:"var(--radius-md-ds)", textAlign:"center" as const, ...style }}>
      <Avatar size="xl" shape="circle" label={avatarLabel ?? name[0]} status={status} />
      <div style={{ display:"flex", flexDirection:"column", gap:"var(--space-1)", alignItems:"center" }}>
        <Typography variant="title" weight="semibold" color="primary">{name}</Typography>
        {role && <Typography variant="body" color="secondary">{role}</Typography>}
        {email && <Typography variant="label" color="tertiary">{email}</Typography>}
      </div>
      {badge && <div style={{ display:"flex", gap:"var(--space-1)", flexWrap:"wrap" as const, justifyContent:"center" }}>{badge}</div>}
      {actions && <div style={{ display:"flex", gap:"var(--space-2)" }}>{actions}</div>}
    </div>
  );
}

// ════════════════════════════════════════════════════════════════════════════
//  28. PRICING CARD
// ════════════════════════════════════════════════════════════════════════════
interface PricingFeature { label: string; included: boolean; }
interface PricingCardProps {
  plan: string; price: string; period?: string; description?: string;
  features: PricingFeature[]; cta?: string; highlighted?: boolean;
  badge?: string; style?: React.CSSProperties;
}
export function PricingCard({ plan, price, period="/mo", description, features, cta="Get started", highlighted, badge, style }: PricingCardProps) {
  return (
    <div style={{ display:"flex", flexDirection:"column", gap:"var(--space-4)", padding:"var(--space-6)", borderRadius:"var(--radius-md-ds)", background:highlighted?"var(--bg-brand)":"var(--bg-primary)", border:`var(--border-width-thin) solid ${highlighted?"var(--border-brand)":"var(--border-default)"}`, boxShadow:highlighted?"var(--shadow-pop-md)":"var(--shadow-xs)", position:"relative" as const, ...style }}>
      {badge && <div style={{ position:"absolute", top:"calc(-1 * var(--space-3))", left:"50%", transform:"translateX(-50%)" }}><BadgeLabel label={badge} variant="primary" /></div>}
      <div style={{ display:"flex", flexDirection:"column", gap:"var(--space-2)" }}>
        <Typography variant="label" weight="semibold" color={highlighted?"inverse":"secondary"} style={{ textTransform:"uppercase" as const, letterSpacing:"var(--letter-spacing-heading)" }}>{plan}</Typography>
        <div style={{ display:"flex", alignItems:"baseline", gap:"var(--space-1)" }}>
          <Typography variant="h4" weight="bold" color={highlighted?"inverse":"primary"} display>{price}</Typography>
          <Typography variant="label" color={highlighted?"inverse":"tertiary"}>{period}</Typography>
        </div>
        {description && <Typography variant="body" color={highlighted?"inverse":"secondary"} style={{ opacity:highlighted?"var(--opacity-soft)" as any:1 }}>{description}</Typography>}
      </div>
      <Divider style={{ opacity:highlighted?"var(--opacity-subtle)" as any:1 }} />
      <div style={{ display:"flex", flexDirection:"column", gap:"var(--space-2)", flex:1 }}>
        {features.map((f, i) => (
          <div key={i} style={{ display:"flex", alignItems:"center", gap:"var(--space-2)" }}>
            {f.included
              ? <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><circle cx="7" cy="7" r="6" fill={highlighted?"var(--overlay-white-weak)":"var(--bg-brand-subtle)"}/><path d="M4.5 7L6 8.5L9.5 5" stroke={highlighted?"var(--fg-inverse)":"var(--fg-brand)"} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
              : <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><circle cx="7" cy="7" r="6" fill={highlighted?"var(--overlay-white-weak)":"var(--bg-secondary)"}/><path d="M5 5l4 4M9 5L5 9" stroke={highlighted?"var(--overlay-white-mid)":"var(--border-strong)"} strokeWidth="1.5" strokeLinecap="round"/></svg>
            }
            <Typography variant="body" color={highlighted?"inverse":"primary"} style={{ opacity:f.included?1:"var(--opacity-disabled-soft)" as any }}>{f.label}</Typography>
          </div>
        ))}
      </div>
      <Button variant={highlighted?"secondary":"primary"} fullWidth style={highlighted?{background:"var(--bg-primary)",color:"var(--fg-brand)",border:"none"}:undefined}>{cta}</Button>
    </div>
  );
}

// ════════════════════════════════════════════════════════════════════════════
//  29. FILTER CHIP GROUP
// ════════════════════════════════════════════════════════════════════════════
interface FilterChip { key: string; label: string; count?: number; icon?: React.ReactNode; }
interface FilterChipGroupProps { chips: FilterChip[]; value?: string|string[]; multi?: boolean; onChange?: (v: string|string[]) => void; style?: React.CSSProperties; }
export function FilterChipGroup({ chips, value, multi, onChange, style }: FilterChipGroupProps) {
  const [sel, setSel] = React.useState<string[]>(value===undefined?[]:Array.isArray(value)?value:[value]);
  const isActive = (k: string) => sel.includes(k);
  const toggle = (k: string) => {
    let next: string[];
    if (multi) { next = isActive(k) ? sel.filter(x=>x!==k) : [...sel,k]; }
    else { next = isActive(k) ? [] : [k]; }
    setSel(next);
    if (multi) (onChange as any)?.(next); else (onChange as any)?.(next[0]??"");
  };
  return (
    <div style={{ display:"flex", flexWrap:"wrap" as const, gap:"var(--space-2)", ...style }}>
      {chips.map(c => {
        const active = isActive(c.key);
        return (
          <button key={c.key} onClick={() => toggle(c.key)} style={{ display:"inline-flex", alignItems:"center", gap:"var(--space-1)", height:"var(--size-control-sm)", padding:"0 var(--space-3)", borderRadius:"var(--radius-full-ds)", border:`var(--border-width-thin) solid ${active?"var(--border-brand)":"var(--border-default)"}`, background:active?"var(--bg-brand-subtle)":"var(--bg-primary)", color:active?"var(--fg-brand)":"var(--fg-secondary)", fontSize:"var(--text-caption)", fontFamily:"var(--font-family-primary)", lineHeight:"var(--line-height-md)", fontWeight:active?"var(--font-weight-semibold)" as any:"var(--font-weight-normal)" as any, cursor:"pointer", transition:`all var(--duration-fast) var(--ease-out)` }}>
            {c.icon && <span style={{ display:"flex", opacity:active?1:"var(--opacity-muted)" as any }}>{c.icon}</span>}
            {c.label}
            {c.count!==undefined && <span style={{ display:"inline-flex", alignItems:"center", justifyContent:"center", minWidth:"var(--size-icon-sm)", height:"var(--size-icon-sm)", borderRadius:"var(--radius-full-ds)", background:active?"var(--bg-brand)":"var(--border-default)", color:active?"var(--fg-inverse)":"var(--fg-secondary)", fontSize:"var(--text-micro)", fontFamily:"var(--font-family-primary)", fontWeight:"var(--font-weight-semibold)" as any, lineHeight:"var(--line-height-none)", padding:"0 var(--space-1)" }}>{c.count}</span>}
          </button>
        );
      })}
    </div>
  );
}

// ════════════════════════════════════════════════════════════════════════════
//  30. DATA CARD  (labeled key-value grid)
// ════════════════════════════════════════════════════════════════════════════
interface DataField { label: string; value: React.ReactNode; span?: number; mono?: boolean; }
interface DataCardProps { title?: string; fields: DataField[]; columns?: number; variant?: "default"|"bordered"|"striped"; actions?: React.ReactNode; style?: React.CSSProperties; }
export function DataCard({ title, fields, columns=2, variant="default", actions, style }: DataCardProps) {
  return (
    <div style={{ background:"var(--bg-primary)", border:`var(--border-width-thin) solid var(--border-default)`, borderRadius:"var(--radius-md-ds)", overflow:"hidden", ...style }}>
      {(title||actions) && <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", padding:"var(--space-3) var(--space-4)", borderBottom:`var(--border-width-thin) solid var(--border-default)`, background:"var(--bg-secondary)" }}>{title&&<Typography variant="body" weight="semibold" color="primary">{title}</Typography>}{actions}</div>}
      <div style={{ display:"grid", gridTemplateColumns:`repeat(${columns}, 1fr)` }}>
        {fields.map((f, i) => (
          <div key={i} style={{ padding:"var(--space-3) var(--space-4)", gridColumn:f.span?`span ${f.span}`:undefined, borderBottom:i<fields.length-columns?`var(--border-width-thin) solid var(--border-default)`:undefined, borderRight:i%columns<columns-1?`var(--border-width-thin) solid var(--border-default)`:undefined, background:variant==="striped"&&i%2===0?"var(--bg-secondary)":"transparent" }}>
            <Typography variant="micro" color="tertiary" style={{ textTransform:"uppercase" as const, letterSpacing:"var(--letter-spacing-heading)", display:"block", paddingBottom:"var(--space-1)" }}>{f.label}</Typography>
            {typeof f.value==="string"?<Typography variant="body" weight="medium" color="primary" style={f.mono?{fontFamily:"var(--font-family-mono)"}:{}}>{f.value}</Typography>:f.value}
          </div>
        ))}
      </div>
    </div>
  );
}

// ════════════════════════════════════════════════════════════════════════════
//  31. STATUS ROW  (horizontal list of status indicators)
// ════════════════════════════════════════════════════════════════════════════
type StatusIndicatorStatus = "healthy"|"warning"|"critical"|"offline"|"maintenance"|"unknown";
interface StatusIndicator { label: string; status: StatusIndicatorStatus; value?: string; }
interface StatusRowProps { items: StatusIndicator[]; layout?: "row"|"grid"; style?: React.CSSProperties; }
const statusCfg: Record<StatusIndicatorStatus, { color:string; bg:string; border:string; label:string }> = {
  healthy:     { color:"var(--status-healthy)",     bg:"var(--bg-success-subtle)", border:"var(--border-success-subtle)", label:"Healthy"     },
  warning:     { color:"var(--status-warning)",      bg:"var(--bg-warning-subtle)", border:"var(--border-warning-subtle)", label:"Warning"     },
  critical:    { color:"var(--status-unhealthy)",    bg:"var(--bg-error-subtle)",   border:"var(--border-error-subtle)",   label:"Critical"    },
  offline:     { color:"var(--fg-tertiary)",         bg:"var(--bg-secondary)",      border:"var(--border-default)",        label:"Offline"     },
  maintenance: { color:"var(--status-maintenance)",  bg:"var(--bg-info-subtle)",    border:"var(--border-info-subtle)",    label:"Maintenance" },
  unknown:     { color:"var(--fg-disabled)",         bg:"var(--bg-secondary)",      border:"var(--border-default)",        label:"Unknown"     },
};
export function StatusRow({ items, layout="row", style }: StatusRowProps) {
  return (
    <div style={{ display:"flex", flexWrap:"wrap" as const, gap:"var(--space-3)", ...style }}>
      {items.map((item, i) => {
        const cfg = statusCfg[item.status];
        return (
          <div key={i} style={{ display:"flex", alignItems:"center", gap:"var(--space-2)", padding:"var(--space-2) var(--space-3)", background:cfg.bg, border:`var(--border-width-thin) solid ${cfg.border}`, borderRadius:"var(--radius-md-ds)", flex:layout==="grid"?`1 1 var(--status-row-min-w)`:undefined }}>
            <div style={{ width:"var(--space-2)", height:"var(--space-2)", borderRadius:"var(--radius-full-ds)", background:cfg.color, flexShrink:0, boxShadow:`var(--shadow-xs)` }} />
            <div style={{ flex:1, minWidth:0, display:"flex", flexDirection:"column", gap:"var(--space-px)" }}>
              <Typography variant="label" weight="medium" color="primary" truncate>{item.label}</Typography>
              <span style={{ fontSize:"var(--text-micro)", fontFamily:"var(--font-family-primary)", lineHeight:"var(--line-height-xs)", color:cfg.color }}>{cfg.label}{item.value?` · ${item.value}`:""}</span>
            </div>
          </div>
        );
      })}
    </div>
  );
}

// ════════════════════════════════════════════════════════════════════════════
//  32. INLINE EDIT
// ════════════════════════════════════════════════════════════════════════════
interface InlineEditProps { value?: string; placeholder?: string; label?: string; size?: MolSize; style?: React.CSSProperties; }
export function InlineEdit({ value="Click to edit", placeholder="Enter value…", label, size="md", style }: InlineEditProps) {
  const [editing, setEditing] = React.useState(false);
  const [val, setVal] = React.useState(value);
  const h = { sm:"var(--size-control-sm)", md:"var(--size-control-md)", lg:"var(--size-control-lg)" }[size];
  return (
    <div style={{ display:"flex", flexDirection:"column", gap:"var(--space-1)", ...style }}>
      {label && <Typography variant="label" weight="medium" color="secondary">{label}</Typography>}
      {editing ? (
        <div style={{ display:"flex", alignItems:"center", gap:"var(--space-2)" }}>
          <TextInput size={size} value={val} onChange={setVal} style={{ flex:1 }} />
          <Button variant="primary" size="sm" onClick={() => setEditing(false)}>Save</Button>
          <Button variant="ghost" size="sm" onClick={() => { setEditing(false); setVal(value); }}>Cancel</Button>
        </div>
      ) : (
        <div onClick={() => setEditing(true)} style={{ display:"flex", alignItems:"center", gap:"var(--space-2)", height:h, cursor:"text", borderRadius:"var(--radius-md-ds)", padding:"0 var(--space-3)", border:`var(--border-width-thin) dashed var(--border-default)`, background:"var(--bg-primary)" }}>
          <Typography variant={size==="lg"?"title":size==="sm"?"label":"body"} color={val?"primary":"tertiary"} style={{ flex:1, fontFamily:"var(--font-family-primary)" }}>{val||placeholder}</Typography>
          <Icon name="edit" size="sm" color="tertiary" />
        </div>
      )}
    </div>
  );
}

// ════════════════════════════════════════════════════════════════════════════
//  33. MULTI-STEP HEADER
// ════════════════════════════════════════════════════════════════════════════
type StepState = "complete"|"active"|"pending"|"error";
interface MSHStep { label: string; status?: StepState; }
interface MultiStepHeaderProps { steps: MSHStep[]; title?: string; style?: React.CSSProperties; }
export function MultiStepHeader({ steps, title, style }: MultiStepHeaderProps) {
  const done = steps.filter(s => s.status==="complete").length;
  const total = steps.length;
  const pct = Math.round((done/total)*100);
  const statColor: Record<StepState,string> = { complete:"var(--bg-brand)", active:"var(--bg-brand)", pending:"var(--stepper-pending-color)", error:"var(--status-unhealthy)" };
  const statBg: Record<StepState,string>    = { complete:"var(--bg-brand)", active:"var(--bg-brand-subtle)", pending:"var(--bg-secondary)", error:"var(--bg-error-subtle)" };
  return (
    <div style={{ display:"flex", flexDirection:"column", gap:"var(--space-3)", padding:"var(--space-4) var(--space-6)", background:"var(--bg-primary)", border:`var(--border-width-thin) solid var(--border-default)`, borderRadius:"var(--radius-md-ds)", ...style }}>
      {title && <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between" }}><Typography variant="title" weight="semibold" color="primary">{title}</Typography><Typography variant="label" color="tertiary">{done} of {total} complete</Typography></div>}
      <div style={{ height:"var(--space-1)", borderRadius:"var(--radius-full-ds)", background:"var(--bg-secondary)", overflow:"hidden" }}>
        <div style={{ width:`${pct}%`, height:"100%", background:"var(--bg-brand)", borderRadius:"var(--radius-full-ds)", transition:`width var(--duration-slow) var(--ease-out)` }} />
      </div>
      <div style={{ display:"flex" }}>
        {steps.map((step, i) => {
          const st: StepState = step.status ?? "pending";
          const isActive = st==="active";
          return (
            <div key={i} style={{ flex:1, display:"flex", flexDirection:"column", alignItems:"center", gap:"var(--space-1)", position:"relative" as const }}>
              {i>0 && <div style={{ position:"absolute", top:"calc(var(--stepper-circle-size) / 2)", right:"50%", left:"-50%", height:"var(--border-width-medium)", background:steps[i-1]?.status==="complete"?"var(--bg-brand)":"var(--border-default)", zIndex:"var(--z-base)" as any }} />}
              <div style={{ width:"var(--stepper-circle-size)", height:"var(--stepper-circle-size)", borderRadius:"var(--radius-full-ds)", background:statBg[st], border:`var(--border-width-medium) solid ${statColor[st]}`, display:"flex", alignItems:"center", justifyContent:"center", position:"relative" as const, zIndex:"var(--z-raised)" as any }}>
                {st==="complete"?<svg width="10" height="8" viewBox="0 0 10 8" fill="none"><path d="M1.5 4L4 6.5L8.5 1.5" stroke="var(--fg-inverse)" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/></svg>:st==="error"?<svg width="8" height="8" viewBox="0 0 8 8" fill="none"><path d="M2 2L6 6M6 2L2 6" stroke="var(--fg-inverse)" strokeWidth="1.4" strokeLinecap="round"/></svg>:<Typography variant="micro" color={isActive?"brand":"tertiary"} style={{ fontWeight:"var(--font-weight-bold)" as any }}>{i+1}</Typography>}
              </div>
              <Typography variant="micro" weight={isActive?"semibold":"regular"} color={isActive?"brand":st==="complete"?"secondary":"tertiary"} style={{ textAlign:"center" as const }}>{step.label}</Typography>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ════════════════════════════════════════════════════════════════════════════
//  SHOWCASE HELPERS  (local, molecules-only presentation utilities)
// ════════════════════════════════════════════════════════════════════════════

/** Wraps SectionCard with T2 Molecule tier defaults */
function DemoSection({ index=0, title, description, builtFrom=[], children, style }: {
  index?: number; title: string; description: string;
  builtFrom?: string[]; children: React.ReactNode; style?: React.CSSProperties;
}) {
  return (
    <SectionCard index={index} title={title} description={description}
      builtFrom={builtFrom} tier="T2 · Molecule" style={style}>
      {children}
    </SectionCard>
  );
}

/** Semantic colour variant for VChip */
type ChipV = "neutral"|"success"|"error"|"warning"|"info"|"brand"|"disabled"|"muted";
const CV: Record<ChipV,{bg:string;fg:string;bd:string}> = {
  neutral:  {bg:"var(--bg-secondary)",      fg:"var(--fg-secondary)",  bd:"var(--border-strong)"},
  success:  {bg:"var(--bg-success-subtle)", fg:"var(--fg-success)",    bd:"var(--border-success-subtle)"},
  error:    {bg:"var(--bg-error-subtle)",   fg:"var(--fg-error)",      bd:"var(--border-error-subtle)"},
  warning:  {bg:"var(--bg-warning-subtle)", fg:"var(--fg-warning)",    bd:"var(--border-warning-subtle)"},
  info:     {bg:"var(--bg-info-subtle)",    fg:"var(--fg-info)",       bd:"var(--border-info-subtle)"},
  brand:    {bg:"var(--bg-brand-subtle)",   fg:"var(--badge-primary-fg)", bd:"var(--border-brand)"},
  disabled: {bg:"var(--bg-disabled)",       fg:"var(--fg-disabled)",   bd:"var(--border-default)"},
  muted:    {bg:"var(--bg-secondary)",      fg:"var(--fg-tertiary)",   bd:"var(--border-default)"},
};

/** Colour-coded label chip. `v` controls the semantic colour. */
function VChip({ label, v="neutral", mono=false }: { label:string; v?:ChipV; mono?:boolean }) {
  const s = CV[v];
  return (
    <span style={{
      display:"inline-flex", alignItems:"center", height:"var(--line-height-md)", padding:"0 var(--space-2)",
      borderRadius:"var(--radius-xs)", background:s.bg,
      border:`var(--border-width-thin) solid ${s.bd}`,
      fontSize:"var(--text-micro)",
      fontFamily: mono ? "var(--font-family-mono)" : "var(--font-family-primary)",
      fontWeight:"var(--font-weight-semibold)" as any,
      color:s.fg, lineHeight:"var(--line-height-none)", whiteSpace:"nowrap" as const, flexShrink:0,
    }}>{label}</span>
  );
}

/** Monospace teal chip that cites a CSS custom property */
function TokenChip({ token }: { token:string }) {
  return (
    <span style={{
      display:"inline-flex", alignItems:"center", height:"var(--line-height-xs)", padding:"0 var(--space-1)",
      borderRadius:"var(--radius-xs)", background:"var(--bg-brand-subtle)",
      border:`var(--border-width-thin) solid var(--border-brand)`,
      fontSize:"var(--text-micro)", fontFamily:"var(--font-family-mono)",
      fontWeight:"var(--font-weight-semibold)" as any, color:"var(--fg-brand)",
      lineHeight:"var(--line-height-none)", whiteSpace:"nowrap" as const, flexShrink:0,
    }}>{token}</span>
  );
}

/** Vertical stack: VChip label (+ optional TokenChip) above children */
function Labeled({ label, v, tokenVar, children, gap="var(--space-2)" }: {
  label:string; v?:ChipV; tokenVar?:string; children:React.ReactNode; gap?:string;
}) {
  return (
    <div style={{ display:"flex", flexDirection:"column", gap }}>
      <div style={{ display:"flex", alignItems:"center", gap:"var(--space-1)", flexWrap:"wrap" as const }}>
        <VChip label={label} v={v ?? "neutral"} />
        {tokenVar && <TokenChip token={tokenVar} />}
      </div>
      {children}
    </div>
  );
}

/** Colour swatch circle + label + optional token name */
function SwatchRow({ color, label, token }: { color:string; label:string; token?:string }) {
  return (
    <div style={{ display:"flex", alignItems:"center", gap:"var(--space-2)" }}>
      <div style={{
        width:"var(--space-3)", height:"var(--space-3)", borderRadius:"var(--radius-full-ds)",
        background:color, flexShrink:0,
        border:`var(--border-width-thin) solid var(--border-default)`,
      }} />
      <span style={{ fontFamily:"var(--font-family-primary)", fontSize:"var(--text-caption)",
        color:"var(--fg-secondary)", fontWeight:"var(--font-weight-medium)" as any }}>{label}</span>
      {token && <span style={{ fontFamily:"var(--font-family-mono)", fontSize:"var(--text-micro)", color:"var(--fg-tertiary)" }}>{token}</span>}
    </div>
  );
}

/** CSS-grid state row: [chip 96px] | [content flex-1]. Colour-coded per state. */
const S2V: Record<string,ChipV> = {
  default:"neutral", hover:"info", active:"brand", focus:"brand",
  checked:"brand", disabled:"disabled", error:"error", success:"success",
  warning:"warning", info:"info", unchecked:"neutral", indeterminate:"warning",
  loading:"brand", unread:"brand", read:"muted", done:"success",
  uploading:"brand", online:"success", offline:"disabled",
  busy:"warning", away:"warning", healthy:"success", critical:"error",
  maintenance:"info", unknown:"muted", pending:"muted", complete:"success",
  blank:"muted", "no-results":"info", locked:"error",
  sm:"muted", md:"neutral", lg:"neutral",
  first:"muted", middle:"neutral", last:"muted",
  "1":"muted", "3":"neutral", "12":"brand",
  vertical:"neutral", horizontal:"neutral", compact:"neutral", minimal:"muted",
  "with action":"brand", closable:"neutral", "with description":"neutral",
  single:"neutral", multi:"brand",
  "2 cols":"neutral", "3 cols":"neutral",
  row:"neutral", grid:"neutral",
};
function StateRow({ state, children, last=false }: { state:string; children:React.ReactNode; last?:boolean }) {
  const v: ChipV = S2V[state] ?? "neutral";
  return (
    <div style={{
      display:"grid", gridTemplateColumns:"var(--showcase-state-chip-col) 1fr",
      alignItems:"center", gap:"var(--space-4)",
      padding:"var(--space-2) 0",
      borderBottom: last ? "none" : `var(--border-width-thin) solid var(--border-divider)`,
    }}>
      <VChip label={state} v={v} />
      <div style={{ display:"flex", alignItems:"center", gap:"var(--space-3)", flexWrap:"wrap" as const }}>
        {children}
      </div>
    </div>
  );
}

/** Footer strip that lists all CSS variables powering a component */
function TokenRow({ tokens }: { tokens:string[] }) {
  return (
    <div style={{
      display:"flex", alignItems:"center", gap:"var(--space-2)",
      flexWrap:"wrap" as const,
      paddingTop:"var(--space-3)",
      borderTop:`var(--border-width-thin) solid var(--border-divider)`,
    }}>
      <span style={{
        fontFamily:"var(--font-family-primary)", fontSize:"var(--text-micro)",
        color:"var(--fg-tertiary)", fontWeight:"var(--font-weight-semibold)" as any,
        whiteSpace:"nowrap" as const, flexShrink:0,
      }}>CSS tokens:</span>
      {tokens.map(t => <TokenChip key={t} token={t} />)}
    </div>
  );
}

// ════════════════════════════════════════════════════════════════════════════
//  34. TOGGLE SWITCH FIELD
//  Figma anatomy: 32×20 outer · 28×16 track · 12×12 thumb · 4×4 inner-dot
//  + label · sublabel · status-badge · description · link-button
//  Sizes:  sm 20×12 · md 32×20 (spec) · lg 40×24
//  States: off · on · disabled · with-description · with-badge · with-link
// ════════════════════════════════════════════════════════════════════════════
type ToggleBadgeV = "success"|"warning"|"info"|"neutral"|"primary";
const togBadgeCfg: Record<ToggleBadgeV,{bg:string;fg:string}> = {
  success: { bg:"var(--badge-success-bg)", fg:"var(--badge-success-fg)" },
  warning: { bg:"var(--badge-warning-bg)", fg:"var(--badge-warning-fg)" },
  info:    { bg:"var(--badge-info-bg)",    fg:"var(--badge-info-fg)"    },
  neutral: { bg:"var(--badge-neutral-bg)", fg:"var(--badge-neutral-fg)" },
  primary: { bg:"var(--bg-brand-subtle)",  fg:"var(--badge-primary-fg)"  },
};
// Toggle dimension CSS vars per size
const togVars: Record<MolSize,{w:string;h:string;thumb:string;offset:string;trackW:string;trackH:string;thumbOn:string;dot:string;dotOff:string}> = {
  sm: { w:"var(--toggle-sm-w)", h:"var(--toggle-sm-h)", thumb:"var(--toggle-sm-thumb)", offset:"var(--toggle-sm-offset)", trackW:"var(--toggle-sm-track-w)", trackH:"var(--toggle-sm-track-h)", thumbOn:"var(--toggle-sm-thumb-on)", dot:"var(--toggle-sm-dot)", dotOff:"var(--toggle-sm-dot-off)" },
  md: { w:"var(--toggle-md-w)", h:"var(--toggle-md-h)", thumb:"var(--toggle-md-thumb)", offset:"var(--toggle-md-offset)", trackW:"var(--toggle-md-track-w)", trackH:"var(--toggle-md-track-h)", thumbOn:"var(--toggle-md-thumb-on)", dot:"var(--toggle-md-dot)", dotOff:"var(--toggle-md-dot-off)" },
  lg: { w:"var(--toggle-lg-w)", h:"var(--toggle-lg-h)", thumb:"var(--toggle-lg-thumb)", offset:"var(--toggle-lg-offset)", trackW:"var(--toggle-lg-track-w)", trackH:"var(--toggle-lg-track-h)", thumbOn:"var(--toggle-lg-thumb-on)", dot:"var(--toggle-lg-dot)", dotOff:"var(--toggle-lg-dot-off)" },
};

interface ToggleSwitchFieldProps {
  id?: string;
  label: string;
  sublabel?: string;
  description?: string;
  badge?: { text:string; variant?:ToggleBadgeV };
  linkText?: string;
  onLinkClick?: () => void;
  checked?: boolean;
  onChange?: (v:boolean) => void;
  disabled?: boolean;
  size?: MolSize;
  style?: React.CSSProperties;
}
export function ToggleSwitchField({
  id, label, sublabel, description, badge, linkText, onLinkClick,
  checked=false, onChange, disabled=false, size="md", style,
}: ToggleSwitchFieldProps) {
  const tv = togVars[size];
  const thumbLeft = checked ? tv.thumbOn : tv.offset;
  const trackBg = disabled
    ? "var(--bg-disabled)"
    : checked ? "var(--bg-brand)" : "var(--border-strong)";
  const bc = badge ? togBadgeCfg[badge.variant ?? "primary"] : null;

  return (
    <div style={{ display:"flex", flexDirection:"row", alignItems:"flex-start", gap:"var(--space-2)", opacity:disabled?"var(--opacity-disabled)" as any:1, ...style }}>

      {/* ── Track + Thumb ── */}
      <button
        id={id} role="switch" aria-checked={checked} disabled={disabled}
        onClick={() => !disabled && onChange?.(!checked)}
        style={{
          position:"relative", flexShrink:0, width:tv.w, height:tv.h,
          background:"transparent", border:"none", padding:0, marginTop:"var(--space-px)",
          cursor:disabled?"not-allowed":"pointer",
        }}
      >
        {/* Track: 2px inset each side from outer (Figma: 28×16 inside 32×20) */}
        <span style={{
          position:"absolute", left:"var(--toggle-track-inset)", top:"var(--toggle-track-inset)", width:tv.trackW, height:tv.trackH,
          borderRadius:"var(--radius-full-ds)", background:trackBg, display:"block",
          transition:`background var(--duration-normal) var(--ease-default)`,
        }}/>
        {/* Thumb: transitions left */}
        <span style={{
          position:"absolute", width:tv.thumb, height:tv.thumb, top:tv.offset, left:thumbLeft,
          borderRadius:"var(--radius-full-ds)", background:"var(--bg-primary)", display:"block",
          /* Figma thumb elevation */
          boxShadow:"var(--shadow-pop-sm)",
          transition:`left var(--duration-normal) var(--ease-spring)`,
        }}/>
        {/* Inner decorative dot — only visible when off (Figma spec) */}
        {!checked && (
          <span style={{
            position:"absolute", width:tv.dot, height:tv.dot, top:tv.dotOff, left:tv.dotOff,
            borderRadius:"var(--radius-full-ds)", background:"var(--border-default)", display:"block",
          }}/>
        )}
      </button>

      {/* ── Content ── */}
      <div style={{ display:"flex", flexDirection:"column", gap:"var(--space-1)", flex:1, minWidth:0 }}>
        {/* Title row: label + badge */}
        <div style={{ display:"flex", flexDirection:"row", alignItems:"center", gap:"var(--space-1)", flexWrap:"wrap" as const }}>
          <span style={{
            fontFamily:"var(--font-family-primary)", fontSize:"var(--text-base)",
            fontWeight:"var(--font-weight-medium)", lineHeight:"var(--line-height-md)",
            letterSpacing:"var(--letter-spacing-body)", color:"var(--fg-primary)",
          }}>{label}</span>
          {badge && bc && (
            <span style={{
              display:"inline-flex", alignItems:"center",
              padding:"var(--badge-padding-y) var(--space-2)", borderRadius:"var(--radius-full-ds)",
              background:bc.bg, color:bc.fg,
              fontFamily:"var(--font-family-primary)", fontSize:"var(--text-caption)",
              fontWeight:"var(--font-weight-medium)", lineHeight:"var(--line-height-xs)",
            }}>{badge.text}</span>
          )}
        </div>
        {/* Sublabel (Figma: Paragraph/X-Small, #525866 ≈ fg-secondary) */}
        {sublabel && (
          <span style={{
            fontFamily:"var(--font-family-primary)", fontSize:"var(--text-caption)",
            lineHeight:"var(--line-height-xs)", color:"var(--fg-secondary)",
          }}>{sublabel}</span>
        )}
        {/* Description (Figma: Paragraph/X-Small, fg-tertiary) */}
        {description && (
          <span style={{
            fontFamily:"var(--font-family-primary)", fontSize:"var(--text-caption)",
            lineHeight:"var(--line-height-xs)", color:"var(--fg-tertiary)",
          }}>{description}</span>
        )}
        {/* Link button (Figma: Label/X-Small, underline, teal) */}
        {linkText && (
          <button onClick={onLinkClick} style={{
            alignSelf:"flex-start", display:"inline-flex", alignItems:"center",
            background:"none", border:"none", padding:0, cursor:"pointer",
            fontFamily:"var(--font-family-primary)", fontSize:"var(--text-caption)",
            fontWeight:"var(--font-weight-medium)", lineHeight:"var(--line-height-xs)",
            textDecoration:"underline", color:"var(--fg-brand)",
          }}>{linkText}</button>
        )}
      </div>
    </div>
  );
}


// ════════════════════════════════════════════════════════════════════════════
//  35. FORM INPUT FIELD  (full Figma anatomy)
//  Anatomy: _InputLabel (label · required * · optional · info-icon · link)
//           + input-body (leading-icon · flag · text · trailing-icon)
//           + _Hints (hint-text | error-text)
//  States:  default · active/focused · error · disabled · readOnly
//  Sizes:   sm (24px) · md (32px) · lg (40px)
// ════════════════════════════════════════════════════════════════════════════
type FormInputState = "default"|"active"|"error"|"disabled"|"readOnly";
const fisBorder: Record<FormInputState,string> = {
  default:  "var(--input-ds-border)",
  active:   "var(--input-ds-border-focus)",
  error:    "var(--input-ds-border-error)",
  disabled: "var(--input-ds-border)",
  readOnly: "var(--border-default)",
};
const fisShadow: Record<FormInputState,string> = {
  default:  "var(--input-ds-shadow)",
  active:   "var(--shadow-ring-brand)",
  error:    "var(--shadow-ring-error)",
  disabled: "none",
  readOnly: "none",
};
const fisBg: Record<FormInputState,string> = {
  default:  "var(--input-ds-bg)",
  active:   "var(--input-ds-bg)",
  error:    "var(--input-ds-bg-error)",
  disabled: "var(--input-ds-bg-disabled)",
  readOnly: "var(--bg-secondary)",
};

interface FormInputFieldProps {
  id?: string;
  label?: string;
  required?: boolean;
  optional?: boolean;
  showInfo?: boolean;
  linkText?: string;
  onLinkClick?: () => void;
  placeholder?: string;
  value?: string;
  onChange?: (v:string) => void;
  hint?: string;
  errorText?: string;
  state?: FormInputState;
  leadingIcon?: React.ReactNode;
  trailingIcon?: React.ReactNode;
  flag?: string;
  type?: string;
  size?: MolSize;
  style?: React.CSSProperties;
}
export function FormInputField({
  id, label, required, optional, showInfo, linkText, onLinkClick,
  placeholder, value, onChange, hint, errorText, state="default",
  leadingIcon, trailingIcon, flag, type="text", size="md", style,
}: FormInputFieldProps) {
  const [focused, setFocused] = React.useState(false);
  const effective: FormInputState =
    state !== "default" ? state : focused ? "active" : "default";
  const isDisabled = state === "disabled";
  const isReadOnly = state === "readOnly";

  return (
    <div style={{ display:"flex", flexDirection:"column", gap:"var(--form-field-gap)", ...style }}>

      {/* ── Label row ── */}
      {(label || linkText) && (
        <div style={{
          display:"flex", flexDirection:"row", alignItems:"center",
          justifyContent:"space-between", gap:"var(--space-1)",
        }}>
          {/* Left: label + required + optional + info */}
          <div style={{ display:"flex", flexDirection:"row", alignItems:"center", gap:"var(--space-px)", flex:1 }}>
            {label && (
              <label htmlFor={id} style={{
                fontFamily:"var(--font-family-primary)", fontSize:"var(--form-label-size)",
                fontWeight:"var(--font-weight-medium)", lineHeight:"var(--line-height-md)",
                letterSpacing:"var(--letter-spacing-body)", color:"var(--form-label-color)", cursor:"default",
              }}>{label}</label>
            )}
            {/* Required asterisk — Figma: Label/Small #FB3748 */}
            {required && (
              <span style={{
                fontFamily:"var(--font-family-primary)", fontSize:"var(--form-label-size)",
                fontWeight:"var(--font-weight-medium)", lineHeight:"var(--line-height-md)",
                color:"var(--form-required-color)", marginLeft:"var(--space-px)",
              }}>*</span>
            )}
            {/* Optional tag — Figma: Paragraph/Small #99A0AE */}
            {optional && !required && (
              <span style={{
                fontFamily:"var(--font-family-primary)", fontSize:"var(--text-base)",
                fontWeight:"var(--font-weight-normal)", lineHeight:"var(--line-height-md)",
                letterSpacing:"var(--letter-spacing-body)", color:"var(--fg-tertiary)",
                marginLeft:"var(--space-1)",
              }}>(Optional)</span>
            )}
            {/* Info icon — Figma: 12×12 circle-i, #99A0AE */}
            {showInfo && (
              <span title="More information" style={{ display:"inline-flex", alignItems:"center", marginLeft:"var(--space-px)", cursor:"help" }}>
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                  <circle cx="6" cy="6" r="5" stroke="var(--icon-tertiary)" strokeWidth="1"/>
                  <path d="M6 5.5v3" stroke="var(--icon-tertiary)" strokeWidth="1" strokeLinecap="round"/>
                  <circle cx="6" cy="3.75" r="0.6" fill="var(--icon-tertiary)"/>
                </svg>
              </span>
            )}
          </div>
          {/* Right: link button — Figma: Label/X-Small underline teal */}
          {linkText && (
            <button onClick={onLinkClick} style={{
              background:"none", border:"none", padding:0, cursor:"pointer",
              fontFamily:"var(--font-family-primary)", fontSize:"var(--text-caption)",
              fontWeight:"var(--font-weight-medium)", lineHeight:"var(--line-height-xs)",
              textDecoration:"underline", color:"var(--fg-brand)",
              whiteSpace:"nowrap" as const, flexShrink:0,
            }}>{linkText}</button>
          )}
        </div>
      )}

      {/* ── Input body — Figma: padding 8 8 8 12, gap 8, radius 8, height 36 ── */}
      <div style={{
        boxSizing:"border-box" as const,
        display:"flex", flexDirection:"row", alignItems:"center",
        padding:"var(--space-2) var(--space-2) var(--space-2) var(--space-3)",
        gap:"var(--space-2)", minHeight:controlH[size],
        background:fisBg[effective],
        border:`var(--border-width-thin) solid ${fisBorder[effective]}`,
        boxShadow:fisShadow[effective],
        borderRadius:"var(--input-ds-radius)",
        opacity: isDisabled ? "var(--opacity-disabled)" as any : 1,
        transition:`border-color var(--input-ds-transition), box-shadow var(--input-ds-transition)`,
      }}>
        {/* Leading icon (Figma: 20×20 placeholder-icon, #99A0AE) */}
        {leadingIcon && (
          <span style={{
            flexShrink:0, display:"flex", alignItems:"center", justifyContent:"center",
            width:"var(--size-icon-md)", height:"var(--size-icon-md)", color:"var(--icon-tertiary)",
          }}>{leadingIcon}</span>
        )}
        {/* Flag emoji (Figma: Flag 20×20) */}
        {flag && (
          <span style={{
            flexShrink:0, display:"flex", alignItems:"center", justifyContent:"center",
            width:"var(--size-icon-md)", height:"var(--size-icon-md)", fontSize:"var(--size-icon-md)",
          }}>{flag}</span>
        )}
        {/* Text input — Figma: Paragraph/Small #0E101B active, #99A0AE placeholder */}
        <input
          id={id} type={type} value={value} placeholder={placeholder}
          disabled={isDisabled} readOnly={isReadOnly}
          onChange={e => onChange?.(e.target.value)}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          style={{
            flex:1, minWidth:0, background:"transparent", border:"none", outline:"none", padding:0, margin:0,
            fontFamily:"var(--font-family-primary)", fontSize:"var(--input-ds-font-size)",
            fontWeight:"var(--font-weight-normal)", lineHeight:"var(--line-height-md)",
            letterSpacing:"var(--letter-spacing-body)",
            color: isDisabled ? "var(--input-ds-fg-disabled)" : "var(--input-ds-fg)",
            cursor: isReadOnly ? "default" : "text",
          }}
        />
        {/* Trailing icon/chevron (Figma: chevron-down-icon 20×20) */}
        {trailingIcon && (
          <span style={{
            flexShrink:0, display:"flex", alignItems:"center", justifyContent:"center",
            width:"var(--size-icon-md)", height:"var(--size-icon-md)", color:"var(--icon-tertiary)",
          }}>{trailingIcon}</span>
        )}
      </div>

      {/* ── Hint / Error (Figma: _Hints · Paragraph/X-Small) ── */}
      {(hint || errorText) && (
        <div style={{ display:"flex", flexDirection:"row", alignItems:"center", gap:"var(--space-1)" }}>
          {effective === "error" && errorText ? (
            <span style={{
              fontFamily:"var(--font-family-primary)", fontSize:"var(--form-helper-size)",
              lineHeight:"var(--line-height-xs)", color:"var(--fg-error)",
            }}>{errorText}</span>
          ) : hint ? (
            <span style={{
              fontFamily:"var(--font-family-primary)", fontSize:"var(--form-helper-size)",
              lineHeight:"var(--line-height-xs)", color:"var(--form-helper-color)",
            }}>{hint}</span>
          ) : null}
        </div>
      )}
    </div>
  );
}


// ════════════════════════════════════════════════════════════════════════════
//  36. SELECT DROPDOWN
//  Anatomy: label-row + trigger (value/placeholder + chevron)
//           + floating panel (checkbox · flag/icon · label · check-icon)
//  Modes:  single-select · multi-select (multi-count header)
//  States: closed · open · option-selected · multi-count · disabled
// ════════════════════════════════════════════════════════════════════════════
interface SelectOption {
  value: string;
  label: string;
  icon?: React.ReactNode;
  flag?: string;
}
interface SelectDropdownProps {
  label?: string;
  required?: boolean;
  optional?: boolean;
  linkText?: string;
  onLinkClick?: () => void;
  placeholder?: string;
  options: SelectOption[];
  value?: string | string[];
  onChange?: (v:string|string[]) => void;
  multi?: boolean;
  hint?: string;
  disabled?: boolean;
  size?: MolSize;
  style?: React.CSSProperties;
}
export function SelectDropdown({
  label, required, optional, linkText, onLinkClick,
  placeholder="Select an option", options, value, onChange,
  multi=false, hint, disabled=false, size="md", style,
}: SelectDropdownProps) {
  const [open, setOpen] = React.useState(false);
  const containerRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    if (!open) return;
    const h = (e:MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", h);
    return () => document.removeEventListener("mousedown", h);
  }, [open]);

  const isSel = (v:string) => Array.isArray(value) ? value.includes(v) : value === v;

  const handleSelect = (v:string) => {
    if (multi) {
      const arr = Array.isArray(value) ? [...value] : [];
      onChange?.(arr.includes(v) ? arr.filter(x=>x!==v) : [...arr, v]);
    } else { onChange?.(v); setOpen(false); }
  };

  const singleSel  = !multi ? options.find(o=>o.value===value) : null;
  const multiCount = multi  ? (Array.isArray(value) ? value.length : 0) : 0;
  const trigLabel  = multi
    ? (multiCount > 0 ? `${multiCount} selected` : placeholder)
    : (singleSel?.label ?? placeholder);
  const isPlaceholder = multi ? multiCount === 0 : !singleSel;

  const ChevronIcon = ({ up=false }) => (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
      <path d={up?"M5 12.5l5-5 5 5":"M5 7.5l5 5 5-5"} stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );

  return (
    <div ref={containerRef} style={{ position:"relative", display:"flex", flexDirection:"column", gap:"var(--form-field-gap)", ...style }}>

      {/* Label row */}
      {(label || linkText) && (
        <div style={{ display:"flex", flexDirection:"row", alignItems:"center", justifyContent:"space-between", gap:"var(--space-1)" }}>
          <div style={{ display:"flex", flexDirection:"row", alignItems:"center", gap:"var(--space-px)", flex:1 }}>
            {label && (
              <span style={{
                fontFamily:"var(--font-family-primary)", fontSize:"var(--form-label-size)",
                fontWeight:"var(--font-weight-medium)", lineHeight:"var(--line-height-md)",
                letterSpacing:"var(--letter-spacing-body)", color:"var(--form-label-color)",
              }}>{label}</span>
            )}
            {required && <span style={{ fontFamily:"var(--font-family-primary)", fontSize:"var(--form-label-size)", fontWeight:"var(--font-weight-medium)", color:"var(--form-required-color)" }}>*</span>}
            {optional && !required && <span style={{ fontFamily:"var(--font-family-primary)", fontSize:"var(--text-base)", color:"var(--fg-tertiary)", marginLeft:"var(--space-1)" }}>(Optional)</span>}
          </div>
          {linkText && (
            <button onClick={onLinkClick} style={{
              background:"none", border:"none", padding:0, cursor:"pointer",
              fontFamily:"var(--font-family-primary)", fontSize:"var(--text-caption)",
              fontWeight:"var(--font-weight-medium)", textDecoration:"underline",
              color:"var(--fg-brand)", whiteSpace:"nowrap" as const, flexShrink:0,
            }}>{linkText}</button>
          )}
        </div>
      )}

      {/* Trigger — Figma: same dimensions as input (padding 8 8 8 12, h≈36) */}
      <button
        type="button" disabled={disabled}
        onClick={() => !disabled && setOpen(o=>!o)}
        style={{
          boxSizing:"border-box" as const,
          display:"flex", flexDirection:"row", alignItems:"center",
          padding:"var(--space-2) var(--space-2) var(--space-2) var(--space-3)",
          gap:"var(--space-2)", minHeight:controlH[size],
          background:"var(--input-ds-bg)",
          border:`var(--border-width-thin) solid ${open?"var(--input-ds-border-focus)":"var(--input-ds-border)"}`,
          boxShadow: open ? "var(--shadow-ring-brand)" : "var(--input-ds-shadow)",
          borderRadius:"var(--input-ds-radius)",
          cursor: disabled ? "not-allowed" : "pointer",
          opacity: disabled ? "var(--opacity-disabled)" as any : 1,
          transition:`border-color var(--input-ds-transition), box-shadow var(--input-ds-transition)`,
          width:"100%", textAlign:"left" as const,
        }}
      >
        <span style={{
          flex:1, minWidth:0, overflow:"hidden", textOverflow:"ellipsis", whiteSpace:"nowrap" as const,
          fontFamily:"var(--font-family-primary)", fontSize:"var(--input-ds-font-size)",
          fontWeight:"var(--font-weight-normal)", lineHeight:"var(--line-height-md)",
          letterSpacing:"var(--letter-spacing-body)",
          color: isPlaceholder ? "var(--input-ds-placeholder)" : "var(--input-ds-fg)",
        }}>{trigLabel}</span>
        <span style={{ flexShrink:0, display:"flex", alignItems:"center", color:"var(--icon-tertiary)" }}>
          <ChevronIcon up={open}/>
        </span>
      </button>

      {/* Dropdown panel — Figma: bg white, shadow 0px 3px 8px rgba(14,16,27,0.11), radius 6px, padding 8px */}
      {open && (
        <div style={{
          position:"absolute", top:"100%", left:0, right:0,
          zIndex:"var(--z-dropdown)" as any, marginTop:"var(--space-1)",
          background:"var(--bg-primary)",
          boxShadow:`var(--shadow-lg), 0px 0px 0px var(--border-width-thin) var(--border-default)`,
          borderRadius:"var(--radius-md-ds)",
          padding:"var(--space-2)", gap:"var(--space-1)",
          display:"flex", flexDirection:"column",
          maxHeight:"var(--dropdown-max-height)", overflowY:"auto" as const,
        }}>
          {options.map(opt => {
            const sel = isSel(opt.value);
            return (
              <button
                key={opt.value} type="button"
                onClick={() => handleSelect(opt.value)}
                onMouseEnter={e => { if(!sel)(e.currentTarget as HTMLElement).style.background="var(--bg-secondary)"; }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = sel ? "var(--bg-brand-subtle)" : "var(--bg-primary)"; }}
                style={{
                  boxSizing:"border-box" as const,
                  display:"flex", flexDirection:"row", alignItems:"center",
                  /* Figma list item: padding 8 8 8 12, gap 8, height 36, radius 8 */
                  padding:"var(--space-2) var(--space-2) var(--space-2) var(--space-3)",
                  gap:"var(--space-2)", minHeight:controlH[size],
                  /* Figma selected bg: bg-brand-subtle */
                  background: sel ? "var(--bg-brand-subtle)" : "var(--bg-primary)",
                  border:"none", borderRadius:"var(--radius-md-ds)",
                  cursor:"pointer", width:"100%", textAlign:"left" as const,
                  transition:`background var(--duration-fast) var(--ease-out)`,
                }}
              >
                {/* Checkbox (multi mode) */}
                {multi && (
                  <span style={{ flexShrink:0, display:"flex", alignItems:"center", justifyContent:"center", width:"var(--size-icon-md)", height:"var(--size-icon-md)" }}>
                    <span style={{
                      width:"var(--size-icon-sm)", height:"var(--size-icon-sm)", borderRadius:"var(--radius-xs)",
                      border:`var(--border-width-thin) solid ${sel?"var(--checkbox-border-checked)":"var(--checkbox-border)"}`,
                      background: sel ? "var(--checkbox-fill-checked)" : "var(--bg-primary)",
                      display:"flex", alignItems:"center", justifyContent:"center",
                      transition:`background var(--duration-fast), border-color var(--duration-fast)`,
                    }}>
                      {sel && (
                        <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                          <path d="M2 5l2.5 2.5L8 3" stroke="var(--checkbox-check-fg)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      )}
                    </span>
                  </span>
                )}
                {/* Flag emoji */}
                {opt.flag && (
                  <span style={{ flexShrink:0, fontSize:"var(--size-icon-md)", lineHeight:"var(--line-height-none)", display:"flex", alignItems:"center" }}>{opt.flag}</span>
                )}
                {/* Icon */}
                {opt.icon && !opt.flag && (
                  <span style={{ flexShrink:0, display:"flex", alignItems:"center", justifyContent:"center", width:"var(--size-icon-md)", height:"var(--size-icon-md)", color:"var(--icon-tertiary)" }}>{opt.icon}</span>
                )}
                {/* Label — Figma selected: #178C7D = teal-700 */}
                <span style={{
                  flex:1, minWidth:0,
                  fontFamily:"var(--font-family-primary)", fontSize:"var(--input-ds-font-size)",
                  fontWeight:"var(--font-weight-normal)", lineHeight:"var(--line-height-md)",
                  letterSpacing:"var(--letter-spacing-body)",
                  color: sel ? "var(--fg-brand)" : "var(--fg-primary)",
                  overflow:"hidden", textOverflow:"ellipsis", whiteSpace:"nowrap" as const,
                }}>{opt.label}</span>
                {/* Single-select trailing check icon — Figma: #1DAF9C */}
                {!multi && sel && (
                  <span style={{ flexShrink:0, display:"flex", alignItems:"center", color:"var(--fg-brand)" }}>
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                      <path d="M4 10.5l3.5 3.5 8.5-8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </span>
                )}
              </button>
            );
          })}
        </div>
      )}

      {hint && (
        <span style={{
          fontFamily:"var(--font-family-primary)", fontSize:"var(--form-helper-size)",
          lineHeight:"var(--line-height-xs)", color:"var(--form-helper-color)",
        }}>{hint}</span>
      )}
    </div>
  );
}


// ════════════════════════════════════════════════════════════════════════════
//  37. RICH METADATA DROPDOWN
//  Anatomy: trigger (primary-label 42% · metadata-cluster 58% · chevron)
//           + panel (search-input + scrollable rows + decorative scrollbar)
//  Each row: primary-label (left, 38%) · meta-text + 2 status-tags (right)
//  Figma: 672px wide, rows 36px tall, panel 256px, search 36px
//  States: closed · open · selected · searching · disabled
// ════════════════════════════════════════════════════════════════════════════
interface RichMetaTag { text:string; variant:"neutral"|"success"|"info"|"warning" }
interface RichMetaOption {
  value: string;
  label: string;
  metaLabel?: string;
  tags?: RichMetaTag[];
}
interface RichMetadataDropdownProps {
  label?: string;
  placeholder?: string;
  options: RichMetaOption[];
  value?: string;
  onChange?: (v:string) => void;
  searchable?: boolean;
  hint?: string;
  disabled?: boolean;
  style?: React.CSSProperties;
}
const rmdTagCfg: Record<"neutral"|"success"|"info"|"warning",{bg:string;fg:string}> = {
  neutral: { bg:"var(--bg-secondary)",      fg:"var(--fg-secondary)" },
  success: { bg:"var(--bg-success-subtle)", fg:"var(--fg-success)"   },
  info:    { bg:"var(--bg-info-subtle)",    fg:"var(--fg-info)"      },
  warning: { bg:"var(--bg-warning-subtle)", fg:"var(--fg-warning)"   },
};

export function RichMetadataDropdown({
  label, placeholder="Select a resource…", options, value, onChange,
  searchable=true, hint, disabled=false, style,
}: RichMetadataDropdownProps) {
  const [open, setOpen]     = React.useState(false);
  const [search, setSearch] = React.useState("");
  const containerRef = React.useRef<HTMLDivElement>(null);
  const searchRef    = React.useRef<HTMLInputElement>(null);

  React.useEffect(() => {
    if (!open) return;
    const h = (e:MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false); setSearch("");
      }
    };
    document.addEventListener("mousedown", h);
    return () => document.removeEventListener("mousedown", h);
  }, [open]);

  React.useEffect(() => {
    if (open && searchRef.current) setTimeout(() => searchRef.current?.focus(), 60);
  }, [open]);

  const selected = options.find(o => o.value === value);
  const filtered = options.filter(o =>
    !search ||
    o.label.toLowerCase().includes(search.toLowerCase()) ||
    (o.metaLabel ?? "").toLowerCase().includes(search.toLowerCase()) ||
    (o.tags ?? []).some(t => t.text.toLowerCase().includes(search.toLowerCase()))
  );

  const MetaTagPill = ({ tag }: { tag: RichMetaTag }) => {
    const tc = rmdTagCfg[tag.variant];
    return (
      <span style={{
        display:"inline-flex", alignItems:"center",
        /* Figma: padding badge-padding-y / space-2, radius full */
        padding:"var(--badge-padding-y) var(--space-2)", borderRadius:"var(--radius-full-ds)",
        background:tc.bg, color:tc.fg,
        fontFamily:"var(--font-family-primary)", fontSize:"var(--text-caption)",
        fontWeight:"var(--font-weight-medium)", lineHeight:"var(--line-height-xs)",
        whiteSpace:"nowrap" as const, flexShrink:0,
      }}>{tag.text}</span>
    );
  };

  const ChevronIcon = ({ up=false }) => (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
      <path d={up?"M5 12.5l5-5 5 5":"M5 7.5l5 5 5-5"} stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );

  return (
    <div ref={containerRef} style={{ position:"relative", display:"flex", flexDirection:"column", gap:"var(--form-field-gap)", ...style }}>
      {label && (
        <span style={{
          fontFamily:"var(--font-family-primary)", fontSize:"var(--form-label-size)",
          fontWeight:"var(--font-weight-medium)", lineHeight:"var(--line-height-md)",
          letterSpacing:"var(--letter-spacing-body)", color:"var(--form-label-color)",
        }}>{label}</span>
      )}

      {/* ── Trigger — Figma: 672px, padding 8 8 8 12, gap 8, h 36, border default ── */}
      <button
        type="button" disabled={disabled}
        onClick={() => !disabled && setOpen(o=>!o)}
        style={{
          boxSizing:"border-box" as const,
          display:"flex", flexDirection:"row", alignItems:"center",
          padding:"var(--space-2) var(--space-2) var(--space-2) var(--space-3)",
          gap:"var(--space-2)", minHeight:"var(--size-control-md)",
          background:"var(--input-ds-bg)",
          border:`var(--border-width-thin) solid ${open?"var(--input-ds-border-focus)":"var(--input-ds-border)"}`,
          boxShadow: open ? "var(--shadow-ring-brand)" : "var(--input-ds-shadow)",
          borderRadius:"var(--input-ds-radius)",
          cursor: disabled ? "not-allowed" : "pointer",
          opacity: disabled ? "var(--opacity-disabled)" as any : 1,
          transition:`border-color var(--input-ds-transition), box-shadow var(--input-ds-transition)`,
          width:"100%", textAlign:"left" as const,
        }}
      >
        {/* Primary label — Figma: 312/672 ≈ 42% */}
        <span style={{
          flexShrink:0, maxWidth:"42%",
          overflow:"hidden", textOverflow:"ellipsis", whiteSpace:"nowrap" as const,
          fontFamily:"var(--font-family-primary)", fontSize:"var(--input-ds-font-size)",
          fontWeight:"var(--font-weight-normal)", lineHeight:"var(--line-height-md)",
          letterSpacing:"var(--letter-spacing-body)",
          color: selected ? "var(--fg-primary)" : "var(--input-ds-placeholder)",
        }}>{selected?.label ?? placeholder}</span>

        {/* Metadata cluster — Figma: meta-text + 2 status tags, 302/672 ≈ 45% */}
        {selected && (selected.metaLabel || selected.tags) && (
          <span style={{
            flex:1, display:"flex", flexDirection:"row", alignItems:"center",
            gap:"var(--space-2)", minWidth:0, overflow:"hidden",
          }}>
            {selected.metaLabel && (
              <span style={{
                fontFamily:"var(--font-family-primary)", fontSize:"var(--text-caption)",
                lineHeight:"var(--line-height-xs)", color:"var(--fg-primary)",
                whiteSpace:"nowrap" as const, flexShrink:0,
              }}>{selected.metaLabel}</span>
            )}
            {selected.tags?.map((t,i) => <MetaTagPill key={i} tag={t}/>)}
          </span>
        )}

        <span style={{ marginLeft:"auto", flexShrink:0, display:"flex", alignItems:"center", color:"var(--icon-tertiary)" }}>
          <ChevronIcon up={open}/>
        </span>
      </button>

      {/* ── Panel — Figma: bg white, shadow elevation300, radius 6, padding 8, gap 8 ── */}
      {open && (
        <div style={{
          position:"absolute", top:"100%", left:0, right:0,
          zIndex:"var(--z-dropdown)" as any, marginTop:"var(--space-1)",
          background:"var(--bg-primary)",
          boxShadow:`var(--shadow-lg), 0px 0px 0px var(--border-width-thin) var(--border-default)`,
          borderRadius:"var(--radius-md-ds)",
          padding:"var(--space-2)", gap:"var(--space-2)",
          display:"flex", flexDirection:"column",
        }}>

          {/* Search — Figma: Input/Search, full-width, h 36, border default */}
          {searchable && (
            <div style={{
              boxSizing:"border-box" as const,
              display:"flex", flexDirection:"row", alignItems:"center",
              padding:"var(--space-2) var(--space-3)", gap:"var(--space-2)", height:"var(--size-control-md)",
              background:"var(--input-ds-bg)",
              border:`var(--border-width-thin) solid var(--input-ds-border)`,
              boxShadow:"var(--input-ds-shadow)", borderRadius:"var(--input-ds-radius)",
            }}>
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" style={{ flexShrink:0, color:"var(--icon-tertiary)" }}>
                <circle cx="9" cy="9" r="5.25" stroke="currentColor" strokeWidth="1.5"/>
                <path d="M13.5 13.5l2.5 2.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
              </svg>
              <input
                ref={searchRef} type="text" value={search}
                onChange={e=>setSearch(e.target.value)} placeholder="Search…"
                style={{
                  flex:1, minWidth:0, background:"transparent", border:"none", outline:"none", padding:0,
                  fontFamily:"var(--font-family-primary)", fontSize:"var(--input-ds-font-size)",
                  fontWeight:"var(--font-weight-normal)", lineHeight:"var(--line-height-md)",
                  letterSpacing:"var(--letter-spacing-body)", color:"var(--fg-primary)",
                }}
              />
            </div>
          )}

          {/* Content row: list + decorative scrollbar */}
          <div style={{ display:"flex", flexDirection:"row", gap:"var(--space-2)", maxHeight:"var(--rich-select-list-max-height)" }}>
            {/* List — Figma: Countries List, flex-col, gap 4, flex-grow */}
            <div style={{ flex:1, display:"flex", flexDirection:"column", gap:"var(--space-1)", overflowY:"auto" as const }}>
              {filtered.length === 0 ? (
                <div style={{ padding:"var(--space-3)", textAlign:"center" as const }}>
                  <span style={{ fontFamily:"var(--font-family-primary)", fontSize:"var(--text-caption)", color:"var(--fg-tertiary)" }}>No results for "{search}"</span>
                </div>
              ) : filtered.map(opt => {
                const sel = opt.value === value;
                return (
                  <button
                    key={opt.value} type="button"
                    onClick={() => { onChange?.(opt.value); setOpen(false); setSearch(""); }}
                    onMouseEnter={e => { if(!sel)(e.currentTarget as HTMLElement).style.background="var(--bg-secondary)"; }}
                    onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = sel ? "var(--bg-secondary)" : "var(--bg-primary)"; }}
                    style={{
                      boxSizing:"border-box" as const,
                      display:"flex", flexDirection:"row", alignItems:"center", justifyContent:"space-between",
                      /* Figma: Rich Metadata Dropdown List Item — padding 8, h 36, radius 8 */
                      padding:"var(--space-2)", minHeight:"var(--size-control-md)",
                      background: sel ? "var(--bg-secondary)" : "var(--bg-primary)",
                      border:"none", borderRadius:"var(--radius-md-ds)",
                      cursor:"pointer", width:"100%", textAlign:"left" as const,
                      transition:`background var(--duration-fast) var(--ease-out)`,
                    }}
                  >
                    {/* Primary label — Figma: MIG 1g.18gb, Paragraph/Small #0E101B, margin:0 auto, 238px ≈ 38% */}
                    <span style={{
                      flex:"0 0 38%", maxWidth:"38%",
                      overflow:"hidden", textOverflow:"ellipsis", whiteSpace:"nowrap" as const,
                      fontFamily:"var(--font-family-primary)", fontSize:"var(--input-ds-font-size)",
                      fontWeight:"var(--font-weight-normal)", lineHeight:"var(--line-height-md)",
                      letterSpacing:"var(--letter-spacing-body)", color:"var(--fg-primary)",
                    }}>{opt.label}</span>

                    {/* Metadata group — Figma: meta-text + 2 tags, space-between, 302px */}
                    {(opt.metaLabel || opt.tags) && (
                      <div style={{
                        display:"flex", flexDirection:"row", alignItems:"center",
                        gap:"var(--space-2)", flexShrink:0,
                      }}>
                        {opt.metaLabel && (
                          <span style={{
                            fontFamily:"var(--font-family-primary)", fontSize:"var(--text-caption)",
                            lineHeight:"var(--line-height-xs)", color:"var(--fg-primary)",
                            whiteSpace:"nowrap" as const,
                          }}>{opt.metaLabel}</span>
                        )}
                        {opt.tags?.map((t,i) => <MetaTagPill key={i} tag={t}/>)}
                      </div>
                    )}
                  </button>
                );
              })}
            </div>
            {/* Decorative scrollbar — Figma: 6px wide */}
            <div style={{
              width:"var(--space-1)", flexShrink:0,
              background:"var(--bg-secondary)", borderRadius:"var(--radius-full-ds)",
              position:"relative", alignSelf:"stretch",
            }}>
              <div style={{
                position:"absolute", top:0, left:0, right:0, height:"var(--showcase-scrollbar-thumb)",
                background:"var(--border-default)", borderRadius:"var(--radius-full-ds)",
              }}/>
            </div>
          </div>
        </div>
      )}

      {hint && (
        <span style={{
          fontFamily:"var(--font-family-primary)", fontSize:"var(--form-helper-size)",
          lineHeight:"var(--line-height-xs)", color:"var(--form-helper-color)",
        }}>{hint}</span>
      )}
    </div>
  );
}


// ════════════════════════════════════════════════════════════════════════════
//  M28. GPU MODEL TAG
//  GPU vendor icon + model name in a subtle background pill.
//  Atom: GpuVendorIcon + Typography
// ════════════════════════════════════════════════════════════════════════════
export interface GpuModelTagProps {
  vendor?: GpuVendor;
  model?: string;
  style?: React.CSSProperties;
}
export function GpuModelTag({ vendor = "nvidia", model = "H100", style }: GpuModelTagProps) {
  return (
    <div style={{
      display: "flex", alignItems: "center", gap: "var(--space-2)",
      background: "var(--bg-secondary)",
      borderRadius: "var(--radius-md-ds)",
      padding: "var(--space-2) var(--space-3)",
      flexShrink: 0,
      ...style,
    }}>
      <GpuVendorIcon vendor={vendor} size={20} />
      <Typography variant="body" weight="medium" color="primary" style={{ whiteSpace: "nowrap" as const }}>
        {model}
      </Typography>
    </div>
  );
}

// ════════════════════════════════════════════════════════════════════════════
//  M29. GPU ALLOCATION STEPPER
//  GpuModelTag on left + bordered input box with CompactValueStepper centred.
//  Atom: GpuModelTag + CompactValueStepper
// ════════════════════════════════════════════════════════════════════════════
export interface GpuAllocationStepperProps {
  vendor?: GpuVendor;
  model?: string;
  value: number;
  max: number;
  onChange?: (v: number) => void;
  style?: React.CSSProperties;
}
export function GpuAllocationStepper({
  vendor = "nvidia", model = "H100", value, max, onChange, style,
}: GpuAllocationStepperProps) {
  const warn = value > max;
  return (
    <div style={{ display: "flex", alignItems: "center", gap: "var(--space-2)", width: "100%", ...style }}>
      <GpuModelTag vendor={vendor} model={model} style={{ alignSelf: "stretch" }} />
      <div style={{
        flex: 1,
        border: `var(--border-width-thin) solid var(--border-default)`,
        borderRadius: "var(--radius-md-ds)",
        height: "var(--size-control-lg)",
        display: "flex", alignItems: "center", justifyContent: "center",
        boxShadow: "var(--shadow-xs)",
      }}>
        <CompactValueStepper value={value} max={max} onChange={onChange} warn={warn} />
      </div>
    </div>
  );
}

// ════════════════════════════════════════════════════════════════════════════
//  M30. MIG TOGGLE ROW
//  "MIG Partitioning" label + "MIG" badge + Switch toggle in one row.
//  Atom: Typography + BadgeLabel + Switch
// ════════════════════════════════════════════════════════════════════════════
export interface MigToggleRowProps {
  enabled: boolean;
  onToggle?: (v: boolean) => void;
  style?: React.CSSProperties;
}
export function MigToggleRow({ enabled, onToggle, style }: MigToggleRowProps) {
  return (
    <div style={{
      display: "flex", alignItems: "center", gap: "var(--space-2)",
      width: "100%", ...style,
    }}>
      <div style={{ flex: 1, display: "flex", alignItems: "center", gap: "var(--space-1)", minWidth: 0 }}>
        <Typography variant="body" weight="medium" color="primary" style={{ whiteSpace: "nowrap" as const }}>
          MIG Partitioning
        </Typography>
        {/* MIG status badge (green pill when enabled) */}
        {enabled && (
          <span style={{
            display: "inline-flex", alignItems: "center",
            background: "var(--bg-success-subtle)",
            padding: "var(--space-px) var(--space-2)",
            borderRadius: "var(--radius-full-ds)",
            fontFamily: "var(--font-family-primary)",
            fontSize: "var(--text-micro)",
            fontWeight: "var(--font-weight-medium)" as any,
            color: "var(--fg-success)",
            whiteSpace: "nowrap" as const,
          }}>
            MIG
          </span>
        )}
      </div>
      <ToggleSwitch checked={enabled} onChange={onToggle} size="sm" />
    </div>
  );
}

// ════════════════════════════════════════════════════════════════════════════
//  M31. MIG PARTITION BAR
//  A row of filled/empty AcceleratorBlock tiles showing slot utilisation.
//  Atom: AcceleratorBlock × N
// ════════════════════════════════════════════════════════════════════════════
export interface MigPartitionBarProps {
  total: number;    /** total slots available */
  used:  number;    /** slots in use */
  allocated?: number; /** slots allocated (but not used) */
  style?: React.CSSProperties;
}
export function MigPartitionBar({ total, used, allocated = 0, style }: MigPartitionBarProps) {
  return (
    <div style={{
      display: "flex", flexWrap: "wrap" as const, gap: "var(--space-1)",
      flex: 1, ...style,
    }}>
      {Array.from({ length: total }).map((_, i) => {
        const fill: AcceleratorFill =
          i < used      ? "used"      :
          i < used + allocated ? "allocated" :
          "empty";
        return <AcceleratorBlock key={i} fill={fill} size={16} />;
      })}
    </div>
  );
}

// ════════════════════════════════════════════════════════════════════════════
//  M32. MIG PARTITION ROW
//  Size-label tag + MigPartitionBar + CompactValueStepper in one row.
//  Molecule: Tag + MigPartitionBar + CompactValueStepper
// ════════════════════════════════════════════════════════════════════════════
export interface MigPartitionRowProps {
  label:     string;  /** e.g. "1g.10gb" */
  value:     number;
  total:     number;
  allocated?: number;
  onChange?: (v: number) => void;
  style?: React.CSSProperties;
}
export function MigPartitionRow({ label, value, total, allocated = 0, onChange, style }: MigPartitionRowProps) {
  return (
    <div style={{
      display: "flex", alignItems: "center", gap: "var(--space-2)",
      width: "100%", ...style,
    }}>
      {/* Label tag */}
      <div style={{
        display: "inline-flex", alignItems: "center", justifyContent: "center",
        background: "var(--bg-primary)",
        border: `var(--border-width-thin) solid var(--border-default)`,
        borderRadius: "var(--radius-md-ds)",
        padding: "var(--space-px) var(--space-2)",
        height: "var(--size-control-sm)",
        flexShrink: 0,
      }}>
        <Typography variant="label" weight="medium" color="primary" style={{ whiteSpace: "nowrap" as const, fontFamily: "var(--font-family-mono)" }}>
          {label}
        </Typography>
      </div>
      {/* Bar */}
      <MigPartitionBar total={total} used={value} allocated={allocated} />
      {/* Stepper */}
      <CompactValueStepper value={value} max={total} min={0} onChange={onChange} style={{ gap: "var(--space-2)" }} />
    </div>
  );
}

// ════════════════════════════════════════════════════════════════════════════
//  M33. GPU ALLOCATION CARD
//  Complete GPU card: header stepper + MIG toggle + optional partition rows.
//  Molecule: GpuAllocationStepper + MigToggleRow + MigPartitionRow × N
// ════════════════════════════════════════════════════════════════════════════
export interface MigPartition { label: string; value: number; total: number; }
export interface GpuAllocationCardProps {
  vendor?: GpuVendor;
  model?: string;
  value: number;
  max: number;
  migEnabled?: boolean;
  partitions?: MigPartition[];
  onValueChange?: (v: number) => void;
  onMigToggle?: (v: boolean) => void;
  onPartitionChange?: (i: number, v: number) => void;
  style?: React.CSSProperties;
}
export function GpuAllocationCard({
  vendor = "nvidia", model = "H100", value, max,
  migEnabled = false, partitions = [],
  onValueChange, onMigToggle, onPartitionChange,
  style,
}: GpuAllocationCardProps) {
  return (
    <div style={{
      background: "var(--bg-primary)",
      border: `var(--border-width-thin) solid var(--border-default)`,
      borderRadius: "var(--radius-md-ds)",
      padding: "var(--space-4)",
      display: "flex", flexDirection: "column", gap: "var(--space-2)",
      width: "100%",
      ...style,
    }}>
      <GpuAllocationStepper
        vendor={vendor} model={model} value={value} max={max}
        onChange={onValueChange}
      />
      <MigToggleRow enabled={migEnabled} onToggle={onMigToggle} />
      {migEnabled && partitions.map((p, i) => (
        <MigPartitionRow
          key={p.label} label={p.label} value={p.value} total={p.total}
          onChange={v => onPartitionChange?.(i, v)}
        />
      ))}
    </div>
  );
}

// ════════════════════════════════════════════════════════════════════════════
//  M34. ACCELERATOR GRID CELL
//  A count number + grid of AcceleratorBlocks. Used in cluster table.
//  Atom: Typography + AcceleratorBlock × N
// ════════════════════════════════════════════════════════════════════════════
export interface AcceleratorGridCellProps {
  count: number;
  blocks: AcceleratorFill[];
  style?: React.CSSProperties;
}
export function AcceleratorGridCell({ count, blocks, style }: AcceleratorGridCellProps) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: "var(--space-3)", ...style }}>
      <Typography variant="body" weight="medium" color="primary" style={{ whiteSpace: "nowrap" as const }}>
        {count}
      </Typography>
      <div style={{
        display: "flex", flexWrap: "wrap" as const, gap: "var(--space-1)",
        maxWidth: "var(--accel-grid-max-w)",
      }}>
        {blocks.map((f, i) => <AcceleratorBlock key={i} fill={f} size={16} />)}
      </div>
    </div>
  );
}

// ════════════════════════════════════════════════════════════════════════════
//  M35. RESOURCE BAR CELL
//  Compact cell: "used/max" text + dual-color mini bar.
//  Used in table CPU / Memory / Storage columns.
//  Atom: Typography + mini progress bars
// ════════════════════════════════════════════════════════════════════════════
export interface ResourceBarCellProps {
  used:      string;   /** e.g. "0/0.1" */
  total:     string;   /** e.g. "4" or "15.3 GiB" */
  usedPct?:  number;   /** 0-100 primary fill % */
  allocPct?: number;   /** 0-100 secondary fill % */
  style?: React.CSSProperties;
}
export function ResourceBarCell({ used, total, usedPct = 15, allocPct = 30, style }: ResourceBarCellProps) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-1)", width: "100%", ...style }}>
      {/* Label row */}
      <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between" }}>
        <Typography variant="body" weight="medium" color="primary" style={{ whiteSpace: "nowrap" as const }}>
          {used}
        </Typography>
        <Typography variant="label" color="secondary" style={{ whiteSpace: "nowrap" as const }}>
          {total}
        </Typography>
      </div>
      {/* Dual mini bar */}
      <div style={{
        position: "relative",
        height: "var(--progress-height)",
        background: "var(--border-default)",
        borderRadius: "var(--radius-sm-ds)",
        overflow: "hidden",
      }}>
        {/* allocated fill (sky-400) */}
        <div style={{
          position: "absolute", left: 0, top: 0, bottom: 0,
          width: `${allocPct}%`,
          background: "var(--status-allocated)",
          borderRadius: "var(--radius-sm-ds)",
        }} />
        {/* used fill (sky-900) */}
        <div style={{
          position: "absolute", left: 0, top: 0, bottom: 0,
          width: `${usedPct}%`,
          background: "var(--status-used)",
          borderRadius: "var(--radius-sm-ds)",
        }} />
      </div>
    </div>
  );
}

// ════════════════════════════════════════════════════════════════════════════
//  M36. NODE NAME CELL
//  Two-line cell: hostname (bold) + IP address (secondary). Used in node table.
//  Atom: Typography × 2
// ════════════════════════════════════════════════════════════════════════════
export interface NodeNameCellProps {
  hostname: string;
  ip: string;
  style?: React.CSSProperties;
}
export function NodeNameCell({ hostname, ip, style }: NodeNameCellProps) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-px)", minWidth: 0, ...style }}>
      <Typography variant="body" weight="medium" color="primary" truncate>
        {hostname}
      </Typography>
      <Typography variant="label" color="secondary" truncate>
        {ip}
      </Typography>
    </div>
  );
}

// ════════════════════════════════════════════════════════════════════════════
//  M37. STORAGE QUOTA SLIDER ROW
//  Label + DualRangeSlider + NumberSpinner in one form row.
//  Atom: Typography + DualRangeSlider + NumberSpinner
// ════════════════════════════════════════════════════════════════════════════
export interface StorageQuotaRowProps {
  label:       string;
  value:       number;
  secondary?:  number;
  max:         number;
  marks?:      { value: number; label?: string; info?: boolean }[];
  onChange?:   (v: number) => void;
  style?:      React.CSSProperties;
}
export function StorageQuotaRow({
  label, value, secondary, max, marks, onChange, style,
}: StorageQuotaRowProps) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: "var(--space-4)", width: "100%", ...style }}>
      <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: "var(--space-1)" }}>
        <Typography variant="body" weight="medium" color="primary">{label}</Typography>
        <DualRangeSlider value={value} secondary={secondary} max={max} marks={marks} onChange={onChange} />
      </div>
      <NumberSpinner value={value} max={max} onChange={onChange} width="var(--number-spinner-width)" style={{ flexShrink: 0 }} />
    </div>
  );
}

// ════════════════════════════════════════════════════════════════════════════
//  38. STACKED BAR CHART  (composed: Typography)
//  Multi-series stacked vertical bar chart with axis labels and legend.
//  Uses --status-* / --chart-* tokens for series colours.
// ════════════════════════════════════════════════════════════════════════════
interface StackedBarSeries { key: string; label: string; color: string; }
interface StackedBarDatum { label: string; values: Record<string, number>; }
interface StackedBarChartProps {
  data?: StackedBarDatum[];
  series?: StackedBarSeries[];
  yLabel?: string;
  width?: number;
  height?: number;
  title?: string;
  style?: React.CSSProperties;
}

const DEFAULT_SBC_SERIES: StackedBarSeries[] = [
  { key: "healthy",      label: "Healthy",      color: "var(--status-healthy)" },
  { key: "unhealthy",    label: "Unhealthy",    color: "var(--status-warning)" },
  { key: "disconnected", label: "Disconnected", color: "var(--status-disconnected)" },
];
const DEFAULT_SBC_DATA: StackedBarDatum[] = [
  { label: "Jan", values: { healthy: 1280, unhealthy: 80,  disconnected: 40  } },
  { label: "Feb", values: { healthy: 1340, unhealthy: 60,  disconnected: 20  } },
  { label: "Mar", values: { healthy: 1100, unhealthy: 120, disconnected: 60  } },
  { label: "Apr", values: { healthy: 1420, unhealthy: 40,  disconnected: 20  } },
  { label: "May", values: { healthy: 1380, unhealthy: 100, disconnected: 40  } },
  { label: "Jun", values: { healthy: 1500, unhealthy: 60,  disconnected: 40  } },
  { label: "Jul", values: { healthy: 1460, unhealthy: 80,  disconnected: 60  } },
  { label: "Aug", values: { healthy: 1520, unhealthy: 40,  disconnected: 20  } },
  { label: "Sep", values: { healthy: 1300, unhealthy: 120, disconnected: 80  } },
  { label: "Oct", values: { healthy: 1440, unhealthy: 80,  disconnected: 40  } },
  { label: "Nov", values: { healthy: 1360, unhealthy: 100, disconnected: 60  } },
  { label: "Dec", values: { healthy: 1580, unhealthy: 60,  disconnected: 20  } },
];

export function StackedBarChart({
  data = DEFAULT_SBC_DATA,
  series = DEFAULT_SBC_SERIES,
  yLabel = "NODES/HR",
  width = 520,
  height = 240,
  title,
  style,
}: StackedBarChartProps) {
  const totals = data.map(d => series.reduce((s, sr) => s + (d.values[sr.key] ?? 0), 0));
  const maxVal = Math.max(...totals, 1);
  const tickCount = 5;
  const ticks = Array.from({ length: tickCount + 1 }, (_, i) => Math.round((maxVal / tickCount) * i));
  const pL = 56, pR = 12, pT = 16, pB = 28;
  const W = width - pL - pR;
  const H = height - pT - pB;
  const barGap = 4;
  const barW = Math.max(8, (W / data.length) - barGap);
  const gy = (v: number) => pT + H - (v / maxVal) * H;

  return (
    <div style={{ display: "inline-flex", flexDirection: "column", gap: "var(--space-3)", ...style }}>
      {title && <Typography variant="label" weight="semibold" color="secondary">{title}</Typography>}
      <svg width={width} height={height} style={{ overflow: "visible", display: "block" }}>
        {/* y-axis label (rotated) */}
        <text x={8} y={pT + H / 2} textAnchor="middle"
          transform={`rotate(-90, 8, ${pT + H / 2})`}
          fill="var(--fg-tertiary)" fontSize="var(--chart-axis-font-size)"
          fontFamily="var(--font-family-mono)">{yLabel}</text>

        {/* grid + y ticks */}
        {ticks.map((t, i) => (
          <g key={i}>
            <line x1={pL} y1={gy(t)} x2={pL + W} y2={gy(t)} stroke="var(--border-divider)" strokeWidth="1" />
            <text x={pL - 6} y={gy(t) + 3} textAnchor="end"
              fill="var(--fg-tertiary)" fontSize="var(--chart-axis-font-size)"
              fontFamily="var(--font-family-mono)">{t}</text>
          </g>
        ))}

        {/* stacked bars */}
        {data.map((d, di) => {
          const x = pL + di * (barW + barGap) + barGap / 2;
          let curY = pT + H;
          return (
            <g key={di}>
              {series.map(sr => {
                const v = d.values[sr.key] ?? 0;
                const segH = (v / maxVal) * H;
                curY -= segH;
                return <rect key={sr.key} x={x} y={curY} width={barW} height={segH} fill={sr.color} rx="2" />;
              })}
              <text x={x + barW / 2} y={pT + H + 16} textAnchor="middle"
                fill="var(--fg-tertiary)" fontSize="var(--chart-axis-font-size)"
                fontFamily="var(--font-family-primary)">{d.label}</text>
            </g>
          );
        })}
      </svg>

      {/* legend */}
      <div style={{ display: "flex", gap: "var(--space-4)", flexWrap: "wrap" as const }}>
        {series.map(sr => (
          <div key={sr.key} style={{ display: "flex", alignItems: "center", gap: "var(--space-1)" }}>
            <div style={{ width: "var(--space-2)", height: "var(--space-2)", borderRadius: "var(--radius-full)", background: sr.color, flexShrink: 0 }} />
            <Typography variant="micro" color="secondary">{sr.label}</Typography>
          </div>
        ))}
      </div>
    </div>
  );
}

// ════════════════════════════════════════════════════════════════════════════
//  MOLECULES TAB  — 38 components, fully token-driven
// ════════════════════════════════════════════════════════════════════════════
export function MoleculesTab() {
  /* ── interactive demo state ─────────────────────────────────────────────── */
  const [tabLine, setTabLine]   = React.useState("metrics");
  const [tabPill, setTabPill]   = React.useState("month");
  const [pg, setPg]             = React.useState(3);
  const [chipSingle, setChipSingle] = React.useState("all");
  const [chipMulti, setChipMulti]   = React.useState<string[]>(["prod","gpu"]);
  /* ── §34 Toggle Switch Field ── */
  const [tog34a, setTog34a] = React.useState(false);
  const [tog34b, setTog34b] = React.useState(true);
  const [tog34c, setTog34c] = React.useState(false);
  const [tog34d, setTog34d] = React.useState(true);
  const [tog34e, setTog34e] = React.useState(false);
  /* ── §35 Form Input Field ── */
  const [fi35a, setFi35a] = React.useState("");
  const [fi35b, setFi35b] = React.useState("+1 202 555 0147");
  /* ── §36 Select Dropdown ── */
  const [sel36s, setSel36s] = React.useState<string>("");
  const [sel36m, setSel36m] = React.useState<string[]>([]);
  /* ── §37 Rich Metadata Dropdown ── */
  const [rmd37, setRmd37] = React.useState<string>("");

  return (
    <div style={{ display:"flex", flexDirection:"column", gap:"var(--space-6)" }}>

      <TierHeader
        tier="T2"
        label="Molecules"
        description="Composed from two or more atoms. Every size, variant, state and colour is driven by a CSS custom property — update a token to cascade changes to every instance."
        count={38}
        tokenCount={74}
        dependsOn="T1 · Atoms"
      />

      {/* ══════════════════════════════════════════════════════════════
          1 · ALERT
          Types: success / info / warning / error
          Anatomy: accent-border (token) · icon · title · description · close · action
          States: closable · with-description · with-action
          Sizes: sm · md · lg
         ══════════════════════════════════════════════════════════════ */}
      <DemoSection index={1} title="Alert" description="7 semantic types × 3 sizes × closable + action CTA. Left accent border, icon and title colour are all token-driven per type." builtFrom={["Icon","Typography","Button"]}>
        {/* ── Type × accent colour grid ───────────────────────── */}
        <SubLabel>All 7 types  ·  left accent border + icon + title colour = token per type</SubLabel>
        <Grid cols={2} gap="var(--space-3)">
          {([
            {t:"success" as AlertType, v:"success" as ChipV, msg:"Changes saved successfully."},
            {t:"error"   as AlertType, v:"error"   as ChipV, msg:"Deployment failed — pod crash loop."},
            {t:"info"    as AlertType, v:"info"    as ChipV, msg:"New version available (v3.2.1)."},
            {t:"warning" as AlertType, v:"warning" as ChipV, msg:"Trial expires in 3 days."},
            {t:"alert"   as AlertType, v:"error"  as ChipV, msg:"Unusual login from new device."},
            {t:"caution" as AlertType, v:"warning" as ChipV, msg:"Disk usage exceeding 80%."},
            {t:"complete"as AlertType, v:"brand"  as ChipV, msg:"Onboarding flow completed."},
          ]).map(({t, v, msg}) => (
            <Labeled key={t} label={t} v={v} tokenVar={`--icon-${t}`}>
              <Alert type={t} message={msg} />
            </Labeled>
          ))}
        </Grid>
        <SectionDivider label="Data Quality Notice — 7 types with description + action" />
        <Grid cols={2} gap="var(--space-3)">
          {([
            {t:"success"  as AlertType, msg:"Data Quality Notice", desc:"Some indicators have incomplete data for 2024. Results may be less accurate for recent periods."},
            {t:"error"    as AlertType, msg:"Data Quality Notice", desc:"Some indicators have incomplete data for 2024. Results may be less accurate for recent periods."},
            {t:"info"     as AlertType, msg:"Data Quality Notice", desc:"Some indicators have incomplete data for 2024. Results may be less accurate for recent periods."},
            {t:"warning"  as AlertType, msg:"Data Quality Notice", desc:"Some indicators have incomplete data for 2024. Results may be less accurate for recent periods."},
            {t:"alert"    as AlertType, msg:"Data Quality Notice", desc:"Some indicators have incomplete data for 2024. Results may be less accurate for recent periods."},
            {t:"caution"  as AlertType, msg:"Data Quality Notice", desc:"Some indicators have incomplete data for 2024. Results may be less accurate for recent periods."},
            {t:"complete" as AlertType, msg:"Data Quality Notice", desc:"Some indicators have incomplete data for 2024. Results may be less accurate for recent periods."},
          ]).map(({t, msg, desc}, i, arr) => (
            <Alert key={t} type={t} message={msg} description={desc}
              action={<Button variant="secondary" size="sm">View Details</Button>}
              closable
            />
          ))}
        </Grid>
        <SectionDivider label="sizes  ·  sm=12px pad · md=16px · lg=24px" />
        <SizeStrip
          sm={<Alert type="success" message="sm · compact padding." size="sm" />}
          md={<Alert type="info"    message="md · default (32px control height)." size="md" />}
          lg={<Alert type="warning" message="lg · spacious layout." size="lg" />}
          align="flex-start"
        />
        <TokenRow tokens={["--bg-success-subtle","--bg-error-subtle","--bg-warning-subtle","--bg-info-subtle","--bg-alert-subtle","--bg-caution-subtle","--bg-complete-subtle","--icon-alert","--icon-caution","--icon-complete","--fg-alert","--fg-caution","--fg-complete"]} />
      </DemoSection>

      {/* ──────────────────────────────────────────────────────────────
          2 · SEARCH BAR
         ────────────────────────────────────────────────────────────── */}
      <DemoSection index={2} title="Search Bar" description="Prefix search icon + suffix ⌘K badge × 3 sizes × common toolbar placements." builtFrom={["TextInput","Icon","Badge"]}>
        <SizeStrip
          sm={<SearchBar size="sm" width="var(--showcase-search-sm-w)" />}
          md={<SearchBar size="md" width="var(--showcase-search-md-w)" />}
          lg={<SearchBar size="lg" width="var(--showcase-search-lg-w)" />}
        />
        <SectionDivider label="common toolbar placements" />
        <Labeled label="full-width" v="neutral">
          <SearchBar size="md" style={{ width:"100%" }} placeholder="Search models, datasets, runs…" />
        </Labeled>
        <Labeled label="search + filter + type select" v="neutral">
          <div style={{ display:"flex", gap:"var(--space-2)", alignItems:"center" }}>
            <SearchBar size="sm" placeholder="Filter by name…" style={{ flex:1 }} />
            <Button variant="secondary" size="sm" icon={<Icon name="filter" size="sm" color="secondary" />}>Filters</Button>
            <Select size="sm" options={[{label:"All types",value:"all"},{label:"Models",value:"model"},{label:"Datasets",value:"dataset"}]} style={{ width:"var(--segment-item-width)" }} />
          </div>
        </Labeled>
        <TokenRow tokens={["--input-ds-border","--icon-tertiary","--badge-neutral-bg","--input-ds-height-sm","--input-ds-height-md","--input-ds-height-lg"]} />
      </DemoSection>

      {/* ──────────────────────────────────────────────────────────────
          3 · PAGINATION  (interactive — click to change page)
         ────────────────────────────────────────────────────────────── */}
      <DemoSection index={3} title="Pagination" description="5-page window + ellipsis + prev/next · click pages to navigate · 3 sizes." builtFrom={["Button","Typography"]}>
        <SubLabel>Interactive — page {pg} of 10 <TokenChip token="--bg-brand" /></SubLabel>
        <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", gap:"var(--space-4)", padding:"var(--space-3) var(--space-4)", background:"var(--bg-secondary)", borderRadius:"var(--radius-md-ds)", border:`var(--border-width-thin) solid var(--border-default)` }}>
          <Typography variant="label" color="tertiary" style={{ fontFamily:"var(--font-family-mono)" }}>Showing {(pg-1)*10+1}–{Math.min(pg*10,100)} of 100 results</Typography>
          <Pagination current={pg} total={10} onChange={setPg} />
        </div>
        <SectionDivider label="page positions — first · middle · last" />
        <div style={{ display:"flex", flexDirection:"column" }}>
          {([{c:1,s:"first"},{c:5,s:"middle"},{c:10,s:"last"}] as {c:number;s:string}[]).map(({c,s},i,arr) => (
            <StateRow key={c} state={s} last={i===arr.length-1}>
              <Pagination current={c} total={10} />
              <Typography variant="micro" color="tertiary" style={{ fontFamily:"var(--font-family-mono)" }}>Showing {(c-1)*10+1}–{Math.min(c*10,100)} of 100</Typography>
            </StateRow>
          ))}
        </div>
        <SectionDivider label="sizes" />
        <SizeStrip
          sm={<Pagination current={4} total={10} size="sm" />}
          md={<Pagination current={4} total={10} size="md" />}
          lg={<Pagination current={4} total={10} size="lg" />}
        />
        <TokenRow tokens={["--bg-brand","--fg-inverse","--border-focus","--border-default","--btn-height-sm","--btn-height-md","--btn-height-lg"]} />
      </DemoSection>

      {/* ──────────────────────────────────────────────────────────────
          4 · TABS  (interactive)
         ────────────────────────────────────────────────────────────── */}
      <DemoSection index={4} title="Tabs" description="Line (underline) + pill (segment) styles · badge counts · interactive · 3 sizes." builtFrom={["Button","Typography","Badge"]}>
        <Labeled label="line" v="brand" tokenVar="--tab-border-active">
          <Tabs activeKey={tabLine} onChange={setTabLine} items={[
            {key:"overview", label:"Overview"},
            {key:"metrics",  label:"Metrics", badge:3},
            {key:"logs",     label:"Logs",    badge:147},
            {key:"alerts",   label:"Alerts",  badge:2},
            {key:"settings", label:"Settings"},
          ]} tabStyle="line" />
          <PreviewBox bg="secondary" pad="var(--space-4)" style={{ marginTop:"var(--space-2)" }}>
            <Typography variant="label" color="secondary">
              Active tab: <strong style={{ color:"var(--fg-brand)", fontFamily:"var(--font-family-mono)" }}>{tabLine}</strong>
            </Typography>
          </PreviewBox>
        </Labeled>
        <SectionDivider label="pill / segment style" />
        <div style={{ display:"flex", flexDirection:"column", gap:"var(--space-3)" }}>
          <Labeled label="date range" v="neutral">
            <Tabs activeKey={tabPill} onChange={setTabPill} items={[{key:"day",label:"Day"},{key:"week",label:"Week"},{key:"month",label:"Month"},{key:"year",label:"Year"}]} tabStyle="pill" />
          </Labeled>
          <Labeled label="view mode" v="neutral">
            <Tabs activeKey="list" items={[{key:"grid",label:"Grid"},{key:"list",label:"List"},{key:"compact",label:"Compact"}]} tabStyle="pill" />
          </Labeled>
        </div>
        <SectionDivider label="sizes  ·  same for both styles" />
        <SizeStrip
          sm={<Tabs size="sm" activeKey="a" items={[{key:"a",label:"Active"},{key:"b",label:"Inactive"},{key:"c",label:"All"}]} tabStyle="line" />}
          md={<Tabs size="md" activeKey="a" items={[{key:"a",label:"Active"},{key:"b",label:"Inactive"},{key:"c",label:"All"}]} tabStyle="line" />}
          lg={<Tabs size="lg" activeKey="a" items={[{key:"a",label:"Active"},{key:"b",label:"Inactive"},{key:"c",label:"All"}]} tabStyle="line" />}
          align="flex-start"
        />
        <TokenRow tokens={["--tab-border-active","--tab-fg-active","--tab-fg","--tab-border-width","--tab-gap","--tab-padding-y","--tab-font-size"]} />
      </DemoSection>

      {/* ──────────────────────────────────────────────────────────────
          5 · CARD
         ────────────────────────────────────────────────────────────── */}
      <DemoSection index={5} title="Card" description="3 structure variants × 3 padding sizes · title, description, extra, footer all optional." builtFrom={["Typography","Divider","Button"]}>
        <SubLabel>Structure variants</SubLabel>
        <Grid cols={3} gap="var(--space-4)">
          <Labeled label="content only" v="neutral">
            <Card>
              <Typography variant="body" color="secondary">Basic card — body content with no header or footer chrome.</Typography>
            </Card>
          </Labeled>
          <Labeled label="with header" v="neutral">
            <Card title="Model Details" description="gpt-base-v2 · Production" extra={<Button variant="ghost" size="sm">Edit</Button>}>
              <Typography variant="body" color="secondary">Card body content area.</Typography>
            </Card>
          </Labeled>
          <Labeled label="with footer" v="neutral">
            <Card title="Confirm Delete" description="This action is irreversible."
              footer={<div style={{ display:"flex", justifyContent:"flex-end", gap:"var(--space-2)" }}>
                <Button variant="secondary" size="sm">Cancel</Button>
                <Button variant="danger" size="sm">Delete</Button>
              </div>}>
              <Typography variant="body" color="secondary">All associated data will be removed permanently.</Typography>
            </Card>
          </Labeled>
        </Grid>
        <SectionDivider label="padding sizes" />
        <SizeStrip
          sm={<Card size="sm" title="sm padding"><Typography variant="label" color="tertiary">12px padding</Typography></Card>}
          md={<Card size="md" title="md padding"><Typography variant="label" color="tertiary">16px padding</Typography></Card>}
          lg={<Card size="lg" title="lg padding"><Typography variant="label" color="tertiary">24px padding</Typography></Card>}
          align="flex-start"
        />
        <TokenRow tokens={["--card-ds-bg","--card-ds-border","--card-ds-padding-sm","--card-ds-padding-md","--card-ds-padding-lg","--radius-md-ds"]} />
      </DemoSection>

      {/* ──────────────────────────────────────────────────────────────
          6 · STAT CARD
         ────────────────────────────────────────────────────────────── */}
      <DemoSection index={6} title="Stat Card" description="KPI + delta badge + trend arrow + optional icon × all 4 combinations × 3 sizes." builtFrom={["Typography","Badge","Icon"]}>
        <SubLabel>Trend variants  ·  colour driven by tokens</SubLabel>
        <ShowRow gap="var(--space-4)" align="flex-start">
          <Labeled label="↑ positive" v="success" tokenVar="--fg-success">
            <StatCard label="Total Users" value="12,840" change="+8.2%" changeType="up" icon={<Icon name="user" size="sm" color="brand" />} />
          </Labeled>
          <Labeled label="↓ negative" v="error" tokenVar="--fg-error">
            <StatCard label="Revenue" value="$94,200" change="-3.1%" changeType="down" icon={<Icon name="star" size="sm" color="brand" />} />
          </Labeled>
          <Labeled label="no delta" v="neutral">
            <StatCard label="Active Jobs" value="247" />
          </Labeled>
          <Labeled label="↑ latency-down" v="success">
            <StatCard label="Avg Latency" value="142 ms" change="-18ms" changeType="up" icon={<Icon name="clock" size="sm" color="brand" />} />
          </Labeled>
        </ShowRow>
        <SectionDivider label="sizes" />
        <SizeStrip
          sm={<StatCard size="sm" label="GPU Util." value="87.4%" change="+12.3%" changeType="up" style={{ minWidth:"var(--segment-item-width)" }} />}
          md={<StatCard size="md" label="GPU Util." value="87.4%" change="+12.3%" changeType="up" style={{ minWidth:"var(--date-picker-width)" }} />}
          lg={<StatCard size="lg" label="GPU Util." value="87.4%" change="+12.3%" changeType="up" style={{ minWidth:"var(--drawer-width-sm)" }} />}
          align="flex-start"
        />
        <TokenRow tokens={["--fg-success","--fg-error","--status-healthy","--status-unhealthy","--card-ds-padding-sm","--card-ds-padding-md","--card-ds-padding-lg"]} />
      </DemoSection>

      {/* ══ SECTIONS 7–33 ════════════════════════════��══════════════════ */}
      {/* ── 7. List Item ─────────────────────────────────────────────── */}
      <DemoSection index={7} title="List Item" description="All interactive states · avatar / badge / trailing variations · active bg = --bg-brand-subtle." builtFrom={["Avatar","Typography","Badge","Icon"]}>
        <SubLabel>States  ·  active uses --bg-brand-subtle highlight</SubLabel>
        <div style={{ border:`var(--border-width-thin) solid var(--border-default)`, borderRadius:"var(--radius-md-ds)", overflow:"hidden" }}>
          <StateRow state="active">
            <ListItem active title="Sarah Chen" description="sarah@acme.com · Staff Engineer"
              avatar={<Avatar size="md" shape="circle" label="SC" status="online" />}
              badge={<BadgeLabel label="Admin" variant="primary" size="sm" />}
              trailing={<Icon name="chevron-right" size="sm" color="brand" />}
              style={{ borderBottom:"none", flex:1 }}
            />
          </StateRow>
          <StateRow state="default">
            <ListItem title="Marcus Williams" description="marcus@acme.com · Senior Eng"
              avatar={<Avatar size="md" shape="circle" label="MW" status="busy" />}
              badge={<BadgeLabel label="Member" variant="info" size="sm" />}
              trailing={<Icon name="chevron-right" size="sm" color="tertiary" />}
              style={{ borderBottom:"none", flex:1 }}
            />
          </StateRow>
          <StateRow state="disabled" last>
            <ListItem title="Aisha Patel" description="aisha@acme.com · Viewer (deactivated)"
              avatar={<Avatar size="md" shape="circle" label="AP" />}
              badge={<BadgeLabel label="Viewer" variant="neutral" size="sm" />}
              trailing={<Icon name="chevron-right" size="sm" color="tertiary" />}
              style={{ borderBottom:"none", flex:1, opacity:"var(--opacity-disabled)" as any }}
            />
          </StateRow>
        </div>
        <SectionDivider label="trailing slot — all 4 types" />
        <div style={{ border:`var(--border-width-thin) solid var(--border-default)`, borderRadius:"var(--radius-md-ds)", overflow:"hidden" }}>
          {[
            { trailing:<BadgeDot count={3} variant="error" />,  tLabel:"badge count",  desc:"Unread notification count" },
            { trailing:<Switch size="sm" checked />,             tLabel:"toggle switch",desc:"Inline boolean setting" },
            { trailing:<Typography variant="micro" color="tertiary" style={{ fontFamily:"var(--font-family-mono)" }}>3h ago</Typography>, tLabel:"timestamp", desc:"Relative time" },
            { trailing:<div style={{ display:"flex", gap:"var(--space-1)" }}><Icon name="edit" size="sm" color="tertiary" /><Icon name="trash" size="sm" color="error" /></div>, tLabel:"action icons", desc:"Quick-action buttons" },
          ].map((row, i, arr) => (
            <ListItem key={i} title={row.tLabel} description={row.desc}
              avatar={<Avatar size="md" shape="square" label={String(i+1)} />}
              trailing={row.trailing}
              style={{ borderBottom: i < arr.length-1 ? undefined : "none" }}
            />
          ))}
        </div>
        <TokenRow tokens={["--bg-brand-subtle","--border-focus","--border-divider","--avatar-bg","--status-healthy"]} />
      </DemoSection>

      {/* ── 8. Checkbox Block ─────────────────────────────────────────── */}
      <DemoSection index={8} title="Checkbox Block" description="All states — unchecked · checked · disabled · permission matrix composition." builtFrom={["Checkbox","Typography"]}>
        <SubLabel>States  ·  checked accent = --bg-brand token</SubLabel>
        <div style={{ display:"flex", flexDirection:"column" }}>
          <StateRow state="unchecked"><CheckboxBlock style={{ flex:1 }} label="Enable notifications" description="Receive alerts for critical events and deployments." /></StateRow>
          <StateRow state="checked"><CheckboxBlock style={{ flex:1 }} label="Auto-deploy on merge" description="Deploy automatically when PR is merged to main." checked /></StateRow>
          <StateRow state="disabled" last><CheckboxBlock style={{ flex:1 }} label="Two-factor auth (enforced)" description="Required by organization security policy." disabled /></StateRow>
        </div>
        <SectionDivider label="permission matrix — real-world composition" />
        <Grid cols={2} gap="var(--space-2)">
          <CheckboxBlock label="Read access"   description="View all resources in this workspace."  checked />
          <CheckboxBlock label="Write access"  description="Create and edit models and datasets."   checked />
          <CheckboxBlock label="Delete access" description="Permanently remove resources." />
          <CheckboxBlock label="Admin access"  description="Manage users and billing settings." disabled />
        </Grid>
        <TokenRow tokens={["--border-focus","--bg-brand","--fg-inverse","--border-default","--fg-disabled","--bg-disabled"]} />
      </DemoSection>

      {/* ── 9. Empty State ───────────────���────────────────────────────── */}
      <DemoSection index={9} title="Empty State" description="3 scenario archetypes — blank slate · no-results · access-denied — icon + CTA variations." builtFrom={["Icon","Typography","Button"]}>
        <SubLabel>Scenario archetypes  ·  icon = --icon-tertiary</SubLabel>
        <Grid cols={3} gap="var(--space-4)">
          <Labeled label="blank slate" v="neutral">
            <div style={{ border:`var(--border-width-thin) solid var(--border-default)`, borderRadius:"var(--radius-md-ds)", overflow:"hidden" }}>
              <EmptyState title="No models yet" description="Create your first model to start training and inference." action="Create Model" />
            </div>
          </Labeled>
          <Labeled label="no results" v="info">
            <div style={{ border:`var(--border-width-thin) solid var(--border-default)`, borderRadius:"var(--radius-md-ds)", overflow:"hidden" }}>
              <EmptyState title="No results found" description="Try adjusting your search or clearing active filters." icon={<Icon name="search" size="lg" color="tertiary" />} />
            </div>
          </Labeled>
          <Labeled label="access denied" v="error">
            <div style={{ border:`var(--border-width-thin) solid var(--border-default)`, borderRadius:"var(--radius-md-ds)", overflow:"hidden" }}>
              <EmptyState title="Access restricted" description="You don't have permission. Contact your admin." icon={<Icon name="lock" size="lg" color="tertiary" />} action="Request access" />
            </div>
          </Labeled>
        </Grid>
        <TokenRow tokens={["--fg-tertiary","--bg-secondary","--bg-brand","--fg-inverse","--icon-tertiary"]} />
      </DemoSection>

      {/* ── 10. Form Field ────────────────────────────────────────────── */}
      <DemoSection index={10} title="Form Field" description="Label + helper + required marker + info tooltip + error text × all types × 3 states." builtFrom={["Label","TextInput","Select","Typography","Icon"]}>
        <SubLabel>Field states  ·  error border = --border-error token</SubLabel>
        <Grid cols={3} gap="var(--space-4)">
          <Labeled label="default" v="neutral">
            <FormField label="Full name" required helperText="As it appears on your government ID.">
              <TextInput placeholder="John Doe" style={{ width:"100%" }} />
            </FormField>
          </Labeled>
          <Labeled label="error" v="error" tokenVar="--border-error">
            <FormField label="Email address" error="Invalid email format.">
              <TextInput placeholder="you@example.com" error value="not-an-email" style={{ width:"100%" }} />
            </FormField>
          </Labeled>
          <Labeled label="disabled" v="disabled">
            <FormField label="Username (locked)" helperText="Contact admin to change.">
              <TextInput placeholder="sarah_chen" disabled style={{ width:"100%" }} />
            </FormField>
          </Labeled>
        </Grid>
        <SectionDivider label="field type variety" />
        <Grid cols={2} gap="var(--space-4)">
          <FormField label="Role" info="Determines your access level across all projects.">
            <Select options={[{label:"Admin",value:"admin"},{label:"Member",value:"member"},{label:"Viewer",value:"viewer"}]} value="admin" style={{ width:"100%" }} />
          </FormField>
          <FormField label="Department" required>
            <Select options={[{label:"Engineering",value:"eng"},{label:"Product",value:"prod"},{label:"Data Science",value:"data"}]} style={{ width:"100%" }} />
          </FormField>
          <FormField label="Notes" helperText="Optional. Max 500 characters.">
            <TextInput placeholder="Additional context…" style={{ width:"100%" }} />
          </FormField>
          <FormField label="API key" info="Read-only — regenerate in Settings → Security.">
            <TextInput value="sk-••••••••••••••••••" disabled style={{ width:"100%", fontFamily:"var(--font-family-mono)" }} />
          </FormField>
        </Grid>
        <TokenRow tokens={["--input-ds-border","--input-ds-border-error","--input-ds-border-focus","--input-ds-bg-error","--fg-error","--fg-tertiary"]} />
      </DemoSection>

      {/* ── 11. Avatar Group ──────────���───────────────────────────────── */}
      <DemoSection index={11} title="Avatar Group" description="Stacked overlapping avatars + overflow count + max-shown variants × 3 sizes." builtFrom={["Avatar","Typography"]}>
        <SubLabel>Sizes  ·  overlap spacing driven by --avatar-size-* tokens</SubLabel>
        <div style={{ display:"flex", flexDirection:"column" }}>
          {(["sm","md","lg"] as MolSize[]).map((s,i,arr) => (
            <StateRow key={s} state={s} last={i===arr.length-1}>
              <AvatarGroup size={s} max={4} avatars={[{label:"SC"},{label:"MW"},{label:"AP"},{label:"JK"},{label:"EL"},{label:"FO"}]} />
              <Typography variant="micro" color="tertiary" style={{ fontFamily:"var(--font-family-mono)" }}>6 members · max=4 → +2</Typography>
            </StateRow>
          ))}
        </div>
        <SectionDivider label="max-shown variants at md size" />
        <ShowRow gap="var(--space-6)" align="center">
          {[2,3,4,6].map(max => (
            <Labeled key={max} label={`max=${max}`} v="neutral">
              <AvatarGroup size="md" max={max} avatars={[{label:"AL"},{label:"BK"},{label:"CM"},{label:"DN"},{label:"EO"},{label:"FP"}]} />
            </Labeled>
          ))}
        </ShowRow>
        <TokenRow tokens={["--avatar-bg","--avatar-fg","--avatar-size-sm","--avatar-size-md","--avatar-size-lg","--avatar-radius"]} />
      </DemoSection>

      {/* ── 12. Transfer ──────────────────────────────────────────────── */}
      <DemoSection index={12} title="Transfer" description="Dual-panel list with select-all + arrow transfer buttons + individual item selection." builtFrom={["Checkbox","Button","Typography","Badge"]}>
        <SubLabel>Source → target transfer panel</SubLabel>
        <Transfer
          source={[{key:"a",label:"Node.js"},{key:"b",label:"Python"},{key:"c",label:"Go"},{key:"d",label:"Rust"},{key:"e",label:"C++"}]}
          target={[{key:"f",label:"TypeScript"},{key:"g",label:"Java"}]}
        />
        <TokenRow tokens={["--bg-primary","--border-default","--bg-brand","--fg-inverse","--border-focus"]} />
      </DemoSection>

      {/* ── 13. Breadcrumb Nav ────────────────────────────────────────── */}
      <DemoSection index={13} title="Breadcrumb Nav" description="3 depth variants: short (3) · medium (5) · collapsed (6→3) + brand-color ancestors." builtFrom={["Typography","Icon"]}>
        <SubLabel>Depth variants  ·  ancestors = --fg-link token</SubLabel>
        <div style={{ display:"flex", flexDirection:"column" }}>
          <StateRow state="first">
            <div style={{ flex:1 }}><BreadcrumbNav items={[{label:"Home"},{label:"Platform"},{label:"Models"}]} /></div>
            <Typography variant="micro" color="tertiary" style={{ fontFamily:"var(--font-family-mono)" }}>3 levels</Typography>
          </StateRow>
          <StateRow state="middle">
            <div style={{ flex:1 }}><BreadcrumbNav items={[{label:"Home"},{label:"Platform"},{label:"Models"},{label:"gpt-base-v2"},{label:"Settings"}]} /></div>
            <Typography variant="micro" color="tertiary" style={{ fontFamily:"var(--font-family-mono)" }}>5 levels</Typography>
          </StateRow>
          <StateRow state="last" last>
            <div style={{ flex:1 }}><BreadcrumbNav items={[{label:"Home"},{label:"Platform"},{label:"Projects"},{label:"Vision AI"},{label:"Experiments"},{label:"Run #42"}]} maxVisible={3} /></div>
            <Typography variant="micro" color="tertiary" style={{ fontFamily:"var(--font-family-mono)" }}>6 → collapsed</Typography>
          </StateRow>
        </div>
        <TokenRow tokens={["--fg-link","--fg-primary","--fg-tertiary","--border-default","--icon-secondary"]} />
      </DemoSection>

      {/* ── 14. Toast Stack ───���───────────────────────────────────────── */}
      <DemoSection index={14} title="Toast Stack" description="All 7 semantic variants — left accent border driven by per-type token. Stacked with dismiss queue opacity." builtFrom={["Icon","Typography","Button"]}>
        <SubLabel>Live stack — newest on top  <TokenChip token="--shadow-lg" /></SubLabel>
        <ToastStack />
        <SectionDivider label="all 7 variants — left accent = token per type" />
        <div style={{ display:"flex", flexDirection:"column", gap:"var(--space-2)", maxWidth:"var(--toast-stack-width)" }}>
          {([
            {v:"success"  as AlertType, title:"This is a sample success toast design component."},
            {v:"error"    as AlertType, title:"This is a sample Error toast design component."},
            {v:"info"     as AlertType, title:"This is a sample Info toast design component."},
            {v:"warning"  as AlertType, title:"This is a sample Warning toast design component."},
            {v:"alert"    as AlertType, title:"This is a sample Alert toast design component."},
            {v:"caution"  as AlertType, title:"This is a sample Caution toast design component."},
            {v:"complete" as AlertType, title:"This is a sample Complete toast design component."},
          ]).map(({v, title}) => (
            <Toast key={v} title={title} variant={v} />
          ))}
        </div>
        <SectionDivider label="with inline undo action" />
        <div style={{ maxWidth:"var(--toast-stack-width)" }}>
          <Toast title="Changes saved." withAction variant="success" description="You can undo this action within 5 minutes." />
        </div>
        <TokenRow tokens={["--bg-primary","--shadow-lg","--alert-accent-width","--icon-success","--icon-error","--icon-warning","--icon-info","--icon-alert","--icon-caution","--icon-complete"]} />
      </DemoSection>

      {/* ── 15. Command Palette ───────────────────────────────────────── */}
      <DemoSection index={15} title="Command Palette" description="Full search UI ��� Recent · Actions · Settings groups + keyboard shortcut badges + icon prefixes." builtFrom={["TextInput","Icon","Badge","Typography"]}>
        <CommandPaletteFull />
        <TokenRow tokens={["--bg-primary","--shadow-xl","--border-default","--border-focus","--bg-brand-subtle","--fg-brand"]} />
      </DemoSection>

      {/* ── 16. Date Range Picker ─────────────────────────────────────── */}
      <DemoSection index={16} title="Date Range Picker" description="Compact trigger + preset dropdown. Active preset = brand-subtle background highlight." builtFrom={["DatePicker","Calendar","Button","Typography"]}>
        <SubLabel>Preset variants  ·  active = --bg-brand-subtle + --border-brand</SubLabel>
        <ShowRow gap="var(--space-6)" align="flex-start">
          <Labeled label="Last 30 days" v="brand">
            <DateRangePicker activePreset="Last 30 days" />
          </Labeled>
          <Labeled label="Last 7 days" v="neutral">
            <DateRangePicker startDate="Feb 22, 2026" endDate="Mar 1, 2026" activePreset="Last 7 days" />
          </Labeled>
        </ShowRow>
        <TokenRow tokens={["--bg-brand-subtle","--border-brand","--fg-brand","--border-default","--bg-primary"]} />
      </DemoSection>

      {/* ── 17. File Card ─────────────────────────────────────────────── */}
      <DemoSection index={17} title="File Card" description="3 upload states — done · uploading (progress bar) · error with retry CTA." builtFrom={["Icon","Typography","Badge","Button"]}>
        <SubLabel>Upload states  ·  badge bg = semantic badge tokens</SubLabel>
        <div style={{ display:"flex", flexDirection:"column" }}>
          <StateRow state="done">
            <FileCard name="model-weights-v3.pt" size="840 MB" status="done" style={{ flex:1 }} />
          </StateRow>
          <StateRow state="uploading">
            <FileCard name="training-config.yaml" size="4 KB" status="uploading" progress={62} style={{ flex:1 }} />
          </StateRow>
          <StateRow state="error" last>
            <FileCard name="dataset-corrupted.csv" size="120 MB" status="error" style={{ flex:1 }} />
          </StateRow>
        </div>
        <SectionDivider label="different file types" />
        <div style={{ display:"flex", flexDirection:"column", gap:"var(--space-2)" }}>
          <FileCard name="experiment-report.pdf" size="2.4 MB"  status="done" />
          <FileCard name="embeddings.parquet"     size="1.1 GB"  status="uploading" progress={28} />
          <FileCard name="broken-checkpoint.pt"   size="4.2 GB"  status="error" />
        </div>
        <TokenRow tokens={["--badge-success-bg","--badge-info-bg","--badge-error-bg","--status-healthy","--status-unhealthy","--border-default"]} />
      </DemoSection>

      {/* ── 18. Metric Card ───────────────────────────────────────────── */}
      <DemoSection index={18} title="Metric Card" description="KPI value + sparkline + trend arrow × 4 colour roles × custom chart colors." builtFrom={["Typography","Chart"]}>
        <SubLabel>Trend × colour combinations  ·  all colours from CSS tokens</SubLabel>
        <ShowRow gap="var(--space-4)" align="flex-start">
          <Labeled label="↑ brand" v="brand" tokenVar="--primary">
            <MetricCard label="GPU Utilization" value="87.4%" change="+12.3%" trend="up" color="var(--primary)" />
          </Labeled>
          <Labeled label="↓ success" v="success" tokenVar="--status-healthy">
            <MetricCard label="Avg Latency" value="142 ms" change="-8.1%" trend="down" color="var(--status-healthy)" sparkData={[{v:180},{v:160},{v:155},{v:148},{v:142},{v:138},{v:142},{v:142}]} />
          </Labeled>
          <Labeled label="↑ error" v="error" tokenVar="--status-unhealthy">
            <MetricCard label="Error Rate" value="0.04%" change="+0.02%" trend="up" color="var(--status-unhealthy)" sparkData={[{v:0.01},{v:0.02},{v:0.01},{v:0.03},{v:0.02},{v:0.04},{v:0.03},{v:0.04}]} />
          </Labeled>
          <Labeled label="↑ purple" v="info" tokenVar="--chart-6">
            <MetricCard label="Active Models" value="24" change="+3" trend="up" color="var(--chart-6)" sparkData={[{v:18},{v:19},{v:20},{v:21},{v:22},{v:21},{v:23},{v:24}]} />
          </Labeled>
        </ShowRow>
        <TokenRow tokens={["--status-healthy","--status-unhealthy","--primary","--purple-500","--card-ds-bg","--card-ds-border"]} />
      </DemoSection>

      {/* ── 19. Notification Item ─────────────────────────────────────── */}
      <DemoSection index={19} title="Notification Item" description="Unread (teal dot + bold) vs read + optional action CTA — realistic notification feed." builtFrom={["Avatar","Typography","Badge","Button"]}>
        <SubLabel>Read vs unread  ·  indicator dot = --primary token</SubLabel>
        <div style={{ border:`var(--border-width-thin) solid var(--border-default)`, borderRadius:"var(--radius-md-ds)", overflow:"hidden", maxWidth:"var(--notification-center-width)" }}>
          <StateRow state="unread">
            <NotificationItem variant="unread" avatarLabel="SC" title="Sarah Chen mentioned you" description="@you can you review the deployment config before we push to prod?" time="2m ago" actionLabel="View thread" style={{ flex:1, borderBottom:"none" }} />
          </StateRow>
          <StateRow state="unread">
            <NotificationItem variant="unread" avatarLabel="CI" title="Deployment succeeded" description="gpt-base-v2 is now live in us-east-1 and eu-west-1." time="14m ago" style={{ flex:1, borderBottom:"none" }} />
          </StateRow>
          <StateRow state="read">
            <NotificationItem variant="read" avatarLabel="AK" title="Aisha Kumar left a comment" description="The latency numbers look great! Ready to merge." time="1h ago" style={{ flex:1, borderBottom:"none" }} />
          </StateRow>
          <StateRow state="read" last>
            <NotificationItem variant="read" avatarLabel="SY" title="Model training complete" description="bert-finetuned-v3 reached 94.2% accuracy after 48 epochs." time="3h ago" style={{ flex:1, borderBottom:"none" }} />
          </StateRow>
        </div>
        <TokenRow tokens={["--primary","--fg-primary","--fg-secondary","--bg-primary","--border-divider","--avatar-bg"]} />
      </DemoSection>

      {/* ── 20. Action Bar ────────────────────────────────────────────── */}
      <DemoSection index={20} title="Action Bar" description="Contextual bulk-action toolbar — selection count badge + action set + dismiss × 3 counts." builtFrom={["Button","Badge","Icon","Divider"]}>
        <SubLabel>Selection count variants</SubLabel>
        <div style={{ display:"flex", flexDirection:"column", gap:"var(--space-3)" }}>
          <Labeled label="1 selected" v="neutral">
            <ActionBar selectedCount={1} actions={[{label:"Delete",icon:<Icon name="trash" size="sm" color="error" />,destructive:true},{label:"Duplicate",icon:<Icon name="copy" size="sm" color="secondary" />},{label:"Move to…",icon:<Icon name="folder" size="sm" color="secondary" />}]} />
          </Labeled>
          <Labeled label="3 selected" v="neutral">
            <ActionBar selectedCount={3} />
          </Labeled>
          <Labeled label="12 selected (bulk)" v="brand">
            <ActionBar selectedCount={12} />
          </Labeled>
        </div>
        <TokenRow tokens={["--border-focus","--shadow-md","--bg-primary","--border-brand","--fg-brand","--bg-brand-subtle"]} />
      </DemoSection>

      {/* ── 21. Dropdown Menu ─────────────────────────────────────────── */}
      <DemoSection index={21} title="Dropdown Menu" description="Full item-type set — icon · shortcut · submenu · separator · disabled · destructive." builtFrom={["Button","Icon","Typography","Divider"]} style={{ overflow:"visible" }}>
        <SubLabel>All item types — shown statically open</SubLabel>
        <div style={{ display:"flex", gap:"var(--space-6)", alignItems:"flex-start" }}>
          <div style={{ paddingBottom:"var(--dropdown-list-max-height-md)" }}>
            <Labeled label="with trigger" v="neutral">
              <DropdownMenu
                trigger={<Button variant="secondary" size="sm" icon={<Icon name="more" size="sm" color="secondary" />}>Options</Button>}
                items={[
                  {key:"edit",  label:"Edit",                 icon:<Icon name="edit"          size="sm" color="secondary" />, shortcut:"⌘E"},
                  {key:"dup",   label:"Duplicate",            icon:<Icon name="copy"          size="sm" color="secondary" />, shortcut:"⌘D"},
                  {key:"move",  label:"Move to…",             icon:<Icon name="folder"        size="sm" color="secondary" />, subMenu:true},
                  {key:"s1",    label:"", separator:true},
                  {key:"share", label:"Share",                icon:<Icon name="external-link" size="sm" color="secondary" />},
                  {key:"exp",   label:"Export (unavailable)", icon:<Icon name="download"      size="sm" color="secondary" />, disabled:true},
                  {key:"s2",    label:"", separator:true},
                  {key:"del",   label:"Delete",               icon:<Icon name="trash"         size="sm" color="error"     />, destructive:true, shortcut:"⌘⌫"},
                ]}
              />
            </Labeled>
          </div>
          <div style={{ flex:1 }}>
            <SubLabel>Item type legend</SubLabel>
            <div style={{ display:"flex", flexDirection:"column", gap:"var(--space-2)" }}>
              {[
                {v:"neutral"  as ChipV, chip:"icon + label + shortcut", desc:"Primary action with keyboard hint"},
                {v:"info"     as ChipV, chip:"submenu →",               desc:"Nested nav with arrow indicator"},
                {v:"muted"    as ChipV, chip:"separator",               desc:"Divider between action groups"},
                {v:"disabled" as ChipV, chip:"disabled",                desc:"Unavailable — opacity reduced"},
                {v:"error"    as ChipV, chip:"destructive",             desc:"Danger color via --fg-error"},
              ].map(row => (
                <div key={row.chip} style={{ display:"flex", alignItems:"center", gap:"var(--space-2)" }}>
                  <VChip label={row.chip} v={row.v} />
                  <Typography variant="micro" color="tertiary">{row.desc}</Typography>
                </div>
              ))}
            </div>
          </div>
        </div>
        <TokenRow tokens={["--bg-primary","--shadow-lg","--border-default","--fg-error","--fg-disabled","--border-divider"]} />
      </DemoSection>

      {/* ── 22. Context Menu ──────────────────────────────────────────── */}
      <DemoSection index={22} title="Context Menu" description="Right-click pattern — shortcuts · submenu · disabled · destructive delete over canvas." builtFrom={["Icon","Typography","Divider"]}>
        <SubLabel>Shown statically open over a canvas area</SubLabel>
        <div style={{ position:"relative" as const, display:"inline-block" }}>
          <PreviewBox bg="secondary" pad="var(--space-12)" style={{ minWidth:"var(--drawer-width-sm)" }}>
            <div style={{ textAlign:"center" as const }}>
              <Icon name="image" size="lg" color="tertiary" />
              <Typography variant="label" color="tertiary" style={{ display:"block" }}>Right-click anywhere</Typography>
            </div>
          </PreviewBox>
          <ContextMenu style={{ position:"absolute" as const, top:"var(--space-6)", left:"var(--space-12)", zIndex:"var(--z-dropdown)" as any }} items={[
            {key:"cut",   label:"Cut",           icon:<Icon name="x"        size="sm" color="secondary" />, shortcut:"⌘X"},
            {key:"copy",  label:"Copy",          icon:<Icon name="copy"     size="sm" color="secondary" />, shortcut:"⌘C"},
            {key:"paste", label:"Paste",         icon:<Icon name="download" size="sm" color="secondary" />, shortcut:"⌘V"},
            {key:"s1",    label:"",              separator:true},
            {key:"share", label:"Share with…",  subMenu:true},
            {key:"sel",   label:"Select all",   icon:<Icon name="grid"     size="sm" color="secondary" />, shortcut:"⌘A"},
            {key:"s2",    label:"",              separator:true},
            {key:"ins",   label:"Inspect (locked)", disabled:true},
            {key:"s3",    label:"",              separator:true},
            {key:"del",   label:"Delete",        icon:<Icon name="trash"    size="sm" color="error"     />, destructive:true},
          ]} />
        </div>
        <TokenRow tokens={["--bg-primary","--shadow-pop-md","--border-default","--fg-error","--fg-disabled"]} />
      </DemoSection>

      {/* ── 23. Alert Dialog ─────��────────────────────────────────────── */}
      <DemoSection index={23} title="Alert Dialog" description="Destructive (red CTA) + informational (brand CTA) — inline static display." builtFrom={["Button","Typography"]}>
        <SubLabel>Variants  ·  destructive CTA = --btn-danger-bg token</SubLabel>
        <Grid cols={2} gap="var(--space-4)">
          <Labeled label="destructive" v="error" tokenVar="--btn-danger-bg">
            <AlertDialog destructive title="Delete account?" description="This action is permanent and cannot be undone. All your data, workspaces, and billing history will be removed." confirmLabel="Delete account" />
          </Labeled>
          <Labeled label="informational" v="brand" tokenVar="--btn-primary-bg">
            <AlertDialog title="Enable two-factor auth?" description="2FA significantly increases account security. You'll need an authenticator app (e.g. 1Password, Authy)." confirmLabel="Enable 2FA" cancelLabel="Maybe later" />
          </Labeled>
        </Grid>
        <TokenRow tokens={["--btn-danger-bg","--btn-primary-bg","--modal-bg","--modal-border","--modal-radius"]} />
      </DemoSection>

      {/* ── 24. Carousel ──────────────────────────────────────────────── */}
      <DemoSection index={24} title="Carousel" description="3 visible slides + prev/next nav + dot pagination + active border highlight." builtFrom={["Button","Icon","Typography"]}>
        <SubLabel>Slide 2 active — flanking slides de-emphasized</SubLabel>
        <Carousel activeIndex={1} />
        <SectionDivider label="slide 1 active" />
        <Carousel activeIndex={0} />
        <TokenRow tokens={["--primary","--neutral-200","--bg-primary","--shadow-sm","--border-default"]} />
      </DemoSection>

      {/* ── 25. Chart ─────────────────────────────────────────────────── */}
      <DemoSection index={25} title="Chart" description="4 types — Line · Bar · Area · Donut × brand colour tokens + axis labels + legend." builtFrom={["Typography","Badge"]}>
        <SubLabel>All chart types  ·  colours from design system tokens</SubLabel>
        <Grid cols={2} gap="var(--space-6)">
          <Labeled label="line" v="brand" tokenVar="--primary">
            <Chart type="line" title="GPU Utilization — Last 6 months" />
          </Labeled>
          <Labeled label="bar" v="neutral" tokenVar="--chart-1">
            <Chart type="bar" title="Monthly Deployments" color="var(--chart-1)" />
          </Labeled>
          <Labeled label="area" v="info" tokenVar="--chart-6">
            <Chart type="area" title="Request Volume" color="var(--chart-6)" />
          </Labeled>
          <Labeled label="donut" v="neutral" tokenVar="--chart-1…5">
            <Chart type="donut" title="Resource Distribution" data={[{label:"Training",value:45},{label:"Inference",value:30},{label:"Storage",value:15},{label:"Network",value:10}]} width="var(--showcase-chart-donut-w)" height="var(--showcase-chart-donut-h)" />
          </Labeled>
        </Grid>
        <SectionDivider label="colour variations — all from token palette" />
        <ShowRow gap="var(--space-4)" align="flex-start">
          {["var(--primary)","var(--status-warning)","var(--chart-6)","var(--status-unhealthy)"].map((c,i) => (
            <Labeled key={i} label={c.replace("var(--","").replace(")","")}>
              <Chart type="bar" color={c} width="var(--showcase-chart-mini-w)" height="var(--showcase-chart-mini-h)" />
            </Labeled>
          ))}
        </ShowRow>
        <TokenRow tokens={["--primary","--chart-1","--chart-2","--chart-3","--chart-4","--chart-5","--status-warning","--purple-500"]} />
      </DemoSection>

      {/* ── 26. Table ─────────────────────────────────────────────────── */}
      <DemoSection index={26} title="Table" description="Default (sortable + status badges) · striped · compact key-value — all token-driven." builtFrom={["Typography","Checkbox","Icon","Badge"]}>
        <SubLabel>Default — badge colours from semantic badge tokens</SubLabel>
        <TablePrimitive
          columns={[{key:"name",title:"Model",sortable:true,width:"var(--table-col-w-lg)"},{key:"status",title:"Status",width:"var(--table-col-w-xs)"},{key:"env",title:"Environment",sortable:true,width:"var(--table-col-w-sm)"},{key:"perf",title:"P95 Latency",width:"var(--table-col-w-sm)"},{key:"updated",title:"Last Updated",sortable:true}]}
          rows={[
            {name:"gpt-base-v2",     status:<BadgeLabel label="Healthy" variant="success" />, env:<BadgeLabel label="Production" variant="neutral" />, perf:<span style={{ fontFamily:"var(--font-family-mono)", fontSize:"var(--text-caption)" }}>142 ms</span>, updated:"2h ago"},
            {name:"bert-finetuned",  status:<BadgeLabel label="Warning" variant="warning" />, env:<BadgeLabel label="Staging"    variant="info"    />, perf:<span style={{ fontFamily:"var(--font-family-mono)", fontSize:"var(--text-caption)" }}>890 ms</span>, updated:"1d ago"},
            {name:"vision-v1",       status:<BadgeLabel label="Healthy" variant="success" />, env:<BadgeLabel label="Production" variant="neutral" />, perf:<span style={{ fontFamily:"var(--font-family-mono)", fontSize:"var(--text-caption)" }}>67 ms</span>,  updated:"3d ago"},
            {name:"llama-7b",        status:<BadgeLabel label="Error"   variant="error"   />, env:<BadgeLabel label="Dev"        variant="neutral" />, perf:<span style={{ fontFamily:"var(--font-family-mono)", fontSize:"var(--text-caption)" }}>—</span>,        updated:"5m ago"},
          ]}
        />
        <SectionDivider label="striped + compact — config parameters" />
        <TablePrimitive striped compact
          columns={[{key:"key",title:"Parameter",width:"var(--table-col-w-md)"},{key:"value",title:"Value"},{key:"type",title:"Type",width:"var(--table-col-w-2xs)"}]}
          rows={[
            {key:"max_tokens",  value:<span style={{ fontFamily:"var(--font-family-mono)", fontSize:"var(--text-caption)" }}>4096</span>,  type:<BadgeLabel label="integer" variant="info" size="sm" />},
            {key:"temperature", value:<span style={{ fontFamily:"var(--font-family-mono)", fontSize:"var(--text-caption)" }}>0.7</span>,   type:<BadgeLabel label="float"   variant="info" size="sm" />},
            {key:"model",       value:<span style={{ fontFamily:"var(--font-family-mono)", fontSize:"var(--text-caption)" }}>gpt-4</span>, type:<BadgeLabel label="string"  variant="neutral" size="sm" />},
            {key:"stream",      value:<span style={{ fontFamily:"var(--font-family-mono)", fontSize:"var(--text-caption)" }}>true</span>,  type:<BadgeLabel label="boolean" variant="warning" size="sm" />},
          ]}
        />
        <TokenRow tokens={["--bg-secondary","--border-default","--border-divider","--badge-success-bg","--badge-warning-bg","--badge-error-bg"]} />
      </DemoSection>

      {/* ── 27. User Card ─────────────────────────────────────────────── */}
      <DemoSection index={27} title="User Card" description="4 layouts — default (vertical) · horizontal · compact · minimal — with live status dots." builtFrom={["Avatar","Typography","Badge","Button"]}>
        <SubLabel>Layout variants  ·  status dot = --status-* tokens</SubLabel>
        <div style={{ display:"grid", gridTemplateColumns:"minmax(0,1fr) minmax(0,2fr) minmax(0,1.5fr) minmax(0,1.5fr)", gap:"var(--space-4)", alignItems:"flex-start" }}>
          <Labeled label="default" v="neutral">
            <UserCard name="Sarah Chen" role="Staff Engineer" email="sarah@acme.com" avatarLabel="SC" status="online"
              badge={<div style={{ display:"flex", gap:"var(--space-1)" }}><BadgeLabel label="Admin" variant="primary" size="sm" /><BadgeLabel label="Core Team" variant="neutral" size="sm" /></div>}
              actions={<><Button variant="secondary" size="sm">Message</Button><Button variant="primary" size="sm">View</Button></>}
            />
          </Labeled>
          <Labeled label="horizontal" v="neutral">
            <UserCard variant="horizontal" name="Marcus Williams" role="Principal Engineer" email="marcus@acme.com" avatarLabel="MW" status="busy"
              actions={<><Button variant="ghost" size="sm" icon={<Icon name="mail" size="sm" color="secondary" />} /><Button variant="ghost" size="sm" icon={<Icon name="more" size="sm" color="secondary" />} /></>}
            />
          </Labeled>
          <Labeled label="compact" v="neutral">
            <div style={{ display:"flex", flexDirection:"column", gap:"var(--space-2)" }}>
              <UserCard variant="compact" name="Aisha Patel"   role="Data Scientist"   avatarLabel="AP" status="online"  badge={<BadgeLabel label="Member" variant="neutral" size="sm" />} />
              <UserCard variant="compact" name="James Kim"     role="ML Engineer"      avatarLabel="JK" status="away"   badge={<BadgeLabel label="Viewer" variant="neutral" size="sm" />} />
              <UserCard variant="compact" name="Elena Flores"  role="DevOps"           avatarLabel="EF" status="offline" />
            </div>
          </Labeled>
          <Labeled label="minimal" v="muted">
            <div style={{ display:"flex", flexDirection:"column", gap:"var(--space-2)" }}>
              <UserCard variant="minimal" name="Kai Nakamura" avatarLabel="KN" badge={<BadgeLabel label="online" variant="success" size="sm" />} />
              <UserCard variant="minimal" name="Priya Sharma" avatarLabel="PS" badge={<BadgeLabel label="busy"   variant="error"   size="sm" />} />
              <UserCard variant="minimal" name="Omar Hassan"  avatarLabel="OH" badge={<BadgeLabel label="away"   variant="warning" size="sm" />} />
            </div>
          </Labeled>
        </div>
        <SectionDivider label="status dot colour reference" />
        <ShowRow gap="var(--space-5)" align="center">
          {[
            {dot:"var(--status-healthy)",     label:"online",  token:"--status-healthy"},
            {dot:"var(--status-warning)",      label:"busy",    token:"--status-warning"},
            {dot:"var(--status-disconnected)", label:"away",    token:"--status-disconnected"},
            {dot:"var(--fg-disabled)",         label:"offline", token:"--fg-disabled"},
          ].map(s => <SwatchRow key={s.label} color={s.dot} label={s.label} token={s.token} />)}
        </ShowRow>
        <TokenRow tokens={["--status-healthy","--status-warning","--status-disconnected","--fg-disabled","--avatar-bg","--avatar-radius"]} />
      </DemoSection>

      {/* ── 28. Pricing Card ──────────────────────────────────────────── */}
      <DemoSection index={28} title="Pricing Card" description="3 tiers — Starter · Pro (highlighted) · Enterprise — feature rows with included/excluded marks." builtFrom={["Typography","Button","Badge","Divider"]}>
        <SubLabel>Tier matrix  ·  highlighted card uses brand border + shadow tokens</SubLabel>
        <Grid cols={3} gap="var(--space-4)">
          <PricingCard
            plan="Starter" price="$0" period="/mo"
            description="For individuals and small experiments."
            cta="Start free"
            features={[
              {label:"5 models",included:true},{label:"100K API calls/mo",included:true},
              {label:"1 GB storage",included:true},{label:"Community support",included:true},
              {label:"Custom domains",included:false},{label:"SSO / SAML",included:false},
              {label:"SLA guarantee",included:false},
            ]}
          />
          <PricingCard
            plan="Pro" price="$79" period="/mo"
            description="For growing teams shipping to production."
            cta="Start trial" badge="Most popular"
            highlighted
            features={[
              {label:"Unlimited models",included:true},{label:"10M API calls/mo",included:true},
              {label:"100 GB storage",included:true},{label:"Priority support",included:true},
              {label:"Custom domains",included:true},{label:"SSO / SAML",included:false},
              {label:"SLA guarantee",included:false},
            ]}
          />
          <PricingCard
            plan="Enterprise" price="Custom" period=""
            description="For large orgs with compliance needs."
            cta="Contact sales"
            features={[
              {label:"Unlimited models",included:true},{label:"Unlimited API calls",included:true},
              {label:"Unlimited storage",included:true},{label:"Dedicated support",included:true},
              {label:"Custom domains",included:true},{label:"SSO / SAML",included:true},
              {label:"99.99% SLA",included:true},
            ]}
          />
        </Grid>
        <TokenRow tokens={["--bg-brand","--fg-inverse","--border-brand","--shadow-pop-md","--bg-brand-subtle","--fg-success","--fg-tertiary"]} />
      </DemoSection>

      {/* ── 29. Filter Chip Group  (interactive) ─────────────────────── */}
      <DemoSection index={29} title="Filter Chip Group" description="Single-select · multi-select × with counts × with icons · interactive — click chips to toggle." builtFrom={["Button","Badge","Icon"]}>
        <SubLabel>Single-select  ·  active = --border-brand + --teal-50</SubLabel>
        <FilterChipGroup
          chips={[{key:"all",label:"All",count:147},{key:"train",label:"Training",count:32},{key:"inf",label:"Inference",count:89},{key:"idle",label:"Idle",count:26}]}
          value={chipSingle}
          onChange={(v: string) => setChipSingle(v)}
        />
        <SectionDivider label="multi-select with icon prefix" />
        <FilterChipGroup multi
          chips={[
            {key:"prod",label:"Production",icon:<div style={{ width:"var(--status-indicator-dot-size)",height:"var(--status-indicator-dot-size)",borderRadius:"var(--radius-full)",background:"var(--status-healthy)" }} />},
            {key:"stg", label:"Staging",   icon:<div style={{ width:"var(--status-indicator-dot-size)",height:"var(--status-indicator-dot-size)",borderRadius:"var(--radius-full)",background:"var(--status-warning)" }} />},
            {key:"dev", label:"Dev",       icon:<div style={{ width:"var(--status-indicator-dot-size)",height:"var(--status-indicator-dot-size)",borderRadius:"var(--radius-full)",background:"var(--fg-disabled)" }} />},
            {key:"gpu", label:"GPU",       icon:<Icon name="settings" size="sm" color="secondary" />},
            {key:"cpu", label:"CPU",       icon:<Icon name="settings" size="sm" color="secondary" />},
          ]}
          value={chipMulti}
          onChange={(v: string[]) => setChipMulti(v)}
        />
        <SectionDivider label="status filter group" />
        <FilterChipGroup chips={[
          {key:"all",label:"All statuses"},{key:"healthy",label:"Healthy",count:12},{key:"warn",label:"Warning",count:3},{key:"err",label:"Error",count:1},{key:"off",label:"Offline",count:4},
        ]} value="healthy" />
        <div style={{ display:"flex", alignItems:"center", gap:"var(--space-2)" }}>
          <Typography variant="micro" color="tertiary">Active multi-select:</Typography>
          {chipMulti.map(k => <VChip key={k} label={k} v="brand" />)}
        </div>
        <TokenRow tokens={["--border-brand","--teal-50","--fg-brand","--border-default","--bg-secondary","--badge-neutral-bg"]} />
      </DemoSection>

      {/* ── 30. Data Card ─────────────────────────────────────────────── */}
      <DemoSection index={30} title="Data Card" description="Key-value grid with 2/3 columns × bordered / striped variants + action slot." builtFrom={["Typography","Button"]}>
        <Labeled label="2 columns · bordered" v="neutral">
          <DataCard title="Model Details" actions={<Button variant="ghost" size="sm" icon={<Icon name="edit" size="sm" color="secondary" />}>Edit</Button>}
            fields={[
              {label:"Name",        value:"gpt-base-v2"},
              {label:"Status",      value:<BadgeLabel label="Healthy" variant="success" />},
              {label:"Environment", value:<BadgeLabel label="Production" variant="neutral" />},
              {label:"Version",     value:"2.4.1",                    mono:true},
              {label:"Created",     value:"Jan 12, 2026",             mono:true},
              {label:"Updated",     value:"Feb 28, 2026 · 14:32 UTC", mono:true, span:2},
            ]}
          />
        </Labeled>
        <SectionDivider label="3 columns · striped variant" />
        <Labeled label="3 columns · striped" v="neutral">
          <DataCard title="Runtime Config" variant="striped" columns={3}
            fields={[
              {label:"Max tokens",     value:"4096",  mono:true},
              {label:"Temperature",    value:"0.7",   mono:true},
              {label:"Top-p",          value:"0.95",  mono:true},
              {label:"Context length", value:"128k",  mono:true},
              {label:"Batch size",     value:"32",    mono:true},
              {label:"Precision",      value:"fp16",  mono:true},
            ]}
          />
        </Labeled>
        <TokenRow tokens={["--bg-secondary","--border-default","--border-divider","--fg-secondary","--font-family-mono"]} />
      </DemoSection>

      {/* ── 31. Status Row ────────────────────────────────────────────── */}
      <DemoSection index={31} title="Status Row" description="6 service states — healthy · warning · critical · offline · maintenance · unknown — each token-driven." builtFrom={["Typography","Badge"]}>
        <SubLabel>Status colour map  ·  each driven by a named CSS token</SubLabel>
        <div style={{ display:"flex", flexDirection:"column" }}>
          {([
            {s:"healthy",     color:"var(--status-healthy)",      token:"--status-healthy"},
            {s:"warning",     color:"var(--status-warning)",        token:"--status-warning"},
            {s:"critical",    color:"var(--status-unhealthy)",     token:"--status-unhealthy"},
            {s:"offline",     color:"var(--fg-disabled)",          token:"--fg-disabled"},
            {s:"maintenance", color:"var(--status-allocated)",     token:"--status-allocated"},
            {s:"unknown",     color:"var(--border-strong)",        token:"--border-strong"},
          ] as {s:string;color:string;token:string}[]).map(({s,color,token},i,arr) => (
            <StateRow key={s} state={s} last={i===arr.length-1}>
              <SwatchRow color={color} label={s} token={token} />
            </StateRow>
          ))}
        </div>
        <SectionDivider label="system health panel — row layout" />
        <StatusRow items={[
          {label:"API Gateway",     status:"healthy",     value:"99.9% uptime"},
          {label:"Model Inference", status:"warning",     value:"P99 > 2s"},
          {label:"Training Cluster",status:"critical",    value:"3 pods failing"},
          {label:"Storage",         status:"healthy",     value:"62% used"},
          {label:"Scheduler",       status:"maintenance", value:"Deploy in 2h"},
          {label:"Auth Service",    status:"healthy",     value:"99.99% uptime"},
        ]} />
        <SectionDivider label="region grid layout" />
        <StatusRow layout="grid" items={[
          {label:"us-east-1",  status:"healthy"},
          {label:"eu-west-1",  status:"warning"},
          {label:"ap-south-1", status:"offline"},
          {label:"us-west-2",  status:"healthy"},
        ]} />
        <TokenRow tokens={["--status-healthy","--status-warning","--status-unhealthy","--status-maintenance","--status-allocated","--status-disconnected"]} />
      </DemoSection>

      {/* ── 32. Inline Edit ───────────────────────────────────────────── */}
      <DemoSection index={32} title="Inline Edit" description="Click-to-edit dashed-border field → expands to input + Save/Cancel × 3 sizes." builtFrom={["TextInput","Button","Icon","Typography"]}>
        <SubLabel>Sizes  ·  click any field to activate editing</SubLabel>
        <SizeStrip
          sm={<InlineEdit size="sm" label="Project" value="Vision AI — Q1 Sprint" style={{ width:"100%" }} />}
          md={<InlineEdit size="md" label="Description" value="Detect objects in video streams using YOLO-v8." style={{ width:"100%" }} />}
          lg={<InlineEdit size="lg" label="Endpoint" value="https://api.acme.co/v3/infer" style={{ width:"100%" }} />}
          align="flex-start"
        />
        <SectionDivider label="display vs editing states" />
        <div style={{ display:"flex", flexDirection:"column" }}>
          <StateRow state="default">
            <InlineEdit size="md" label="Model name" value="gpt-base-v2" style={{ flex:1 }} />
          </StateRow>
          <StateRow state="focus" last>
            <Typography variant="micro" color="tertiary" style={{ fontFamily:"var(--font-family-mono)" }}>click the field above → editing mode</Typography>
          </StateRow>
        </div>
        <TokenRow tokens={["--border-default","--border-focus","--bg-brand","--fg-inverse","--input-ds-radius","--input-ds-height-md"]} />
      </DemoSection>

      {/* ── 33. Multi-Step Header ─────────────────────────────────────── */}
      <DemoSection index={33} title="Multi-Step Header" description="Progress bar + numbered step circles + labels × 4 step states (complete/active/pending/error)." builtFrom={["Typography","ProgressBar","Stepper"]}>
        <SubLabel>3-of-5 complete  ·  progress track = --bg-brand token</SubLabel>
        <MultiStepHeader title="Deploy to Production"
          steps={[
            {label:"Validate",  status:"complete"},
            {label:"Build",     status:"complete"},
            {label:"Test",      status:"complete"},
            {label:"Stage",     status:"active"},
            {label:"Deploy",    status:"pending"},
          ]}
        />
        <SectionDivider label="with error step + recovery required" />
        <MultiStepHeader title="Model Training Pipeline"
          steps={[
            {label:"Prepare",  status:"complete"},
            {label:"Tokenize", status:"complete"},
            {label:"Train",    status:"error"},
            {label:"Evaluate", status:"pending"},
            {label:"Register", status:"pending"},
          ]}
        />
        <SectionDivider label="onboarding — step 1 of 4 active" />
        <MultiStepHeader title="Workspace Setup"
          steps={[
            {label:"Account",   status:"active"},
            {label:"Workspace", status:"pending"},
            {label:"Billing",   status:"pending"},
            {label:"Done",      status:"pending"},
          ]}
        />
        <SectionDivider label="step state legend" />
        <ShowRow gap="var(--space-4)" align="center">
          {([
            {v:"success" as ChipV, label:"complete", desc:"Step finished"},
            {v:"brand"   as ChipV, label:"active",   desc:"Current step"},
            {v:"muted"   as ChipV, label:"pending",  desc:"Not yet reached"},
            {v:"error"   as ChipV, label:"error",    desc:"Step failed"},
          ]).map(r => (
            <div key={r.label} style={{ display:"flex", alignItems:"center", gap:"var(--space-2)" }}>
              <VChip label={r.label} v={r.v} />
              <Typography variant="micro" color="tertiary">{r.desc}</Typography>
            </div>
          ))}
        </ShowRow>
        <TokenRow tokens={["--bg-brand","--fg-inverse","--status-unhealthy","--neutral-200","--border-default","--fg-disabled"]} />
      </DemoSection>

      {/* ── 34. Toggle Switch Field ─────────────────────────────────────────── */}
      <DemoSection index={34} title="Toggle Switch Field" description="Full Figma anatomy: 32×20 track · 12×12 thumb · inner dot · label · sublabel · status badge · description · link. Interactive — click to toggle." builtFrom={["Typography","BadgeLabel"]}>
        <SubLabel>Sizes  sm · md · lg  ·  off → on states  ·  click to toggle</SubLabel>
        <div style={{ display:"flex", flexDirection:"column", gap:"var(--space-3)" }}>
          {(["sm","md","lg"] as MolSize[]).map(s => (
            <StateRow key={s} state={s}>
              <ToggleSwitchField
                size={s} label={`Enable ${s.toUpperCase()} feature`}
                sublabel={`${s === "sm" ? "24" : s === "md" ? "32" : "40"}px control height`}
                checked={s==="md"} style={{ flex:1 }}
              />
            </StateRow>
          ))}
        </div>
        <SectionDivider label="anatomy — all slots active" />
        <div style={{ display:"flex", flexDirection:"column" }}>
          <StateRow state="off">
            <ToggleSwitchField
              label="Auto-scaling" sublabel="Automatically scale GPU replicas"
              description="Scales between 1 and 16 replicas based on request queue depth."
              badge={{ text:"Beta", variant:"primary" }} linkText="Learn more"
              checked={tog34a} onChange={setTog34a} style={{ flex:1 }}
            />
          </StateRow>
          <StateRow state="on">
            <ToggleSwitchField
              label="Real-time telemetry" sublabel="Stream inference metrics to dashboard"
              badge={{ text:"New", variant:"success" }} linkText="Configure"
              checked={tog34b} onChange={setTog34b} style={{ flex:1 }}
            />
          </StateRow>
          <StateRow state="no description">
            <ToggleSwitchField
              label="Dark mode" sublabel="Use dark color theme"
              checked={tog34c} onChange={setTog34c} style={{ flex:1 }}
            />
          </StateRow>
          <StateRow state="disabled-off" last>
            <ToggleSwitchField
              label="Experimental features" sublabel="Requires enterprise plan"
              disabled checked={false} style={{ flex:1 }}
            />
          </StateRow>
        </div>
        <SectionDivider label="settings panel — live interactive demo" />
        <PreviewBox bg="secondary" pad="var(--space-6)">
          <div style={{ maxWidth:"var(--filter-panel-width)", display:"flex", flexDirection:"column", gap:"var(--space-4)" }}>
            <Typography variant="title" weight="semibold">Model Settings</Typography>
            <div style={{ display:"flex", flexDirection:"column", gap:"var(--space-3)" }}>
              <ToggleSwitchField label="Enable inference caching" sublabel="Cache repeated prompts for faster responses" badge={{ text:"Recommended", variant:"success" }} checked={tog34a} onChange={setTog34a}/>
              <Divider/>
              <ToggleSwitchField label="Streaming mode" sublabel="Return tokens as they are generated" checked={tog34b} onChange={setTog34b}/>
              <Divider/>
              <ToggleSwitchField label="Function calling" sublabel="Allow model to invoke registered tools" badge={{ text:"Beta", variant:"primary" }} linkText="View docs" checked={tog34d} onChange={setTog34d}/>
              <Divider/>
              <ToggleSwitchField label="Content filtering" sublabel="Apply safety guardrails to all outputs" description="Recommended for production deployments. May affect latency by ~12ms." checked={tog34e} onChange={setTog34e}/>
            </div>
          </div>
        </PreviewBox>
        <TokenRow tokens={["--bg-brand","--border-strong","--bg-disabled","--bg-primary","--fg-primary","--fg-secondary","--fg-tertiary","--fg-brand","--text-base","--text-caption","--bg-brand-subtle","--teal-700"]}/>
      </DemoSection>

      {/* ── 35. Form Input Field ──────────────���─────────────────────────────── */}
      <DemoSection index={35} title="Form Input Field" description="Full Figma anatomy: _InputLabel (required · optional · info · link) + input body (leading-icon · flag · text · trailing-icon) + _Hints. 5 states × 3 sizes." builtFrom={["Typography","Icon","Button"]}>
        <SubLabel>Label variants  ·  required · optional · info tooltip · link action</SubLabel>
        <Grid cols={2} gap="var(--space-4)">
          <FormInputField label="Update Label" required placeholder="e.g. gpt-base-v2" hint="This is a hint text to help user."/>
          <FormInputField label="Update Label" optional showInfo linkText="Edit" placeholder="Enter text" hint="This is a hint text to help user."/>
        </Grid>
        <SectionDivider label="5 states — all driven by token overrides" />
        <div style={{ display:"flex", flexDirection:"column" }}>
          <StateRow state="default">
            <FormInputField label="API Key" placeholder="sk-…" hint="Stored encrypted at rest." style={{ flex:1 }}/>
          </StateRow>
          <StateRow state="active/focused">
            <FormInputField label="Model name" state="active" value={fi35a} onChange={setFi35a} placeholder="e.g. gpt-base-v2" hint="Used as display name in dashboard." style={{ flex:1 }}/>
          </StateRow>
          <StateRow state="error">
            <FormInputField label="Webhook URL" required state="error" value="not-a-url" errorText="Must be a valid HTTPS URL." style={{ flex:1 }}/>
          </StateRow>
          <StateRow state="disabled">
            <FormInputField label="Organization ID" state="disabled" value="org-a83f2c91" hint="Contact support to update." style={{ flex:1 }}/>
          </StateRow>
          <StateRow state="readOnly" last>
            <FormInputField label="Model version" state="readOnly" value="2.4.1-stable" hint="Assigned automatically on deploy." style={{ flex:1 }}/>
          </StateRow>
        </div>
        <SectionDivider label="icon · flag · trailing-chevron slots" />
        <Grid cols={2} gap="var(--space-4)">
          <FormInputField
            label="Search models" placeholder="Filter by name or tag…"
            leadingIcon={<svg width="20" height="20" viewBox="0 0 20 20" fill="none"><circle cx="9" cy="9" r="5.25" stroke="currentColor" strokeWidth="1.5"/><path d="M13.5 13.5l2.5 2.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></svg>}
          />
          <FormInputField
            label="Phone number" flag="🇦🇪" value={fi35b} onChange={setFi35b}
            trailingIcon={<svg width="20" height="20" viewBox="0 0 20 20" fill="none"><path d="M5 7.5l5 5 5-5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>}
          />
        </Grid>
        <SectionDivider label="3 sizes" />
        <SizeStrip
          sm={<FormInputField size="sm" label="sm · 24px" placeholder="Small input"/>}
          md={<FormInputField size="md" label="md · 32px" placeholder="Medium input"/>}
          lg={<FormInputField size="lg" label="lg · 40px" placeholder="Large input"/>}
          align="flex-start"
        />
        <TokenRow tokens={["--input-ds-border","--input-ds-border-focus","--input-ds-border-error","--input-ds-bg","--input-ds-bg-error","--input-ds-bg-disabled","--shadow-ring-brand","--shadow-ring-error","--input-ds-shadow","--form-required-color","--form-helper-color","--fg-tertiary","--fg-brand"]}/>
      </DemoSection>

      {/* ── 36. Select Dropdown ────────────────────────────��────────────────── */}
      <DemoSection index={36} title="Select Dropdown" description="Trigger + floating panel with checkbox list items (flag · icon · label · trailing-check). Figma anatomy: open border = brand, selected row bg = teal-50, text = teal-700." builtFrom={["FormInputField","Checkbox","Typography","Icon"]}>
        <SubLabel>Single-select  ·  click trigger to open  ·  selected row teal-50 + teal-700</SubLabel>
        <Grid cols={2} gap="var(--space-4)">
          <SelectDropdown
            label="Cloud region" required
            placeholder="Choose region…"
            value={sel36s} onChange={v => setSel36s(v as string)}
            hint="Model will be deployed to this region."
            options={[
              { value:"us-east",  label:"us-east-1  —  N. Virginia",  flag:"🇺🇸" },
              { value:"us-west",  label:"us-west-2  —  Oregon",       flag:"🇺🇸" },
              { value:"eu-west",  label:"eu-west-1  —  Ireland",      flag:"🇪🇺" },
              { value:"ap-south", label:"ap-south-1  —  Mumbai",      flag:"🇮🇳" },
              { value:"ap-east",  label:"ap-east-1  —  Tokyo",        flag:"🇯🇵" },
            ]}
          />
          <SelectDropdown
            label="Model type" optional
            placeholder="All types"
            value={sel36s}
            options={[
              { value:"llm",        label:"Large Language Model" },
              { value:"diffusion",  label:"Image Diffusion" },
              { value:"embedding",  label:"Text Embedding" },
              { value:"asr",        label:"Speech Recognition" },
            ]}
            hint="Filter dashboard by model category."
          />
        </Grid>
        <SectionDivider label="multi-select with checkbox — selected count in trigger" />
        <Grid cols={2} gap="var(--space-4)">
          <SelectDropdown
            label="GPU instance tags" multi
            placeholder="Select tags…"
            value={sel36m} onChange={v => setSel36m(v as string[])}
            hint="Hold open to select multiple."
            options={[
              { value:"prod",   label:"Production" },
              { value:"stg",    label:"Staging" },
              { value:"dev",    label:"Development" },
              { value:"gpu-a",  label:"A100 GPU" },
              { value:"gpu-h",  label:"H100 GPU" },
              { value:"spot",   label:"Spot instance" },
            ]}
          />
          <SelectDropdown
            label="Framework" optional linkText="Clear"
            placeholder="Any framework"
            value="" options={[
              { value:"pt", label:"PyTorch" },
              { value:"tf", label:"TensorFlow" },
              { value:"jx", label:"JAX" },
              { value:"on", label:"ONNX" },
            ]}
            disabled
          />
        </Grid>
        <SectionDivider label="state legend" />
        <ShowRow gap="var(--space-4)" align="center">
          {([
            { v:"neutral" as ChipV, label:"closed",   desc:"Default border, shadow-xs" },
            { v:"brand"   as ChipV, label:"open",     desc:"Brand border + ring shadow" },
            { v:"success" as ChipV, label:"selected", desc:"teal-50 bg · teal-700 text" },
            { v:"muted"   as ChipV, label:"disabled", desc:"opacity 0.48, not-allowed" },
          ]).map(r => (
            <div key={r.label} style={{ display:"flex", alignItems:"center", gap:"var(--space-2)" }}>
              <VChip label={r.label} v={r.v}/>
              <Typography variant="micro" color="tertiary">{r.desc}</Typography>
            </div>
          ))}
        </ShowRow>
        <TokenRow tokens={["--input-ds-border","--input-ds-border-focus","--shadow-ring-brand","--input-ds-shadow","--bg-brand-subtle","--teal-700","--checkbox-fill-checked","--checkbox-check-fg","--input-ds-placeholder","--fg-brand","--radius-md-ds"]}/>
      </DemoSection>

      {/* ── 37. Rich Metadata Dropdown ──────────────────────────────────────── */}
      <DemoSection index={37} title="Rich Metadata Dropdown" description="Figma anatomy: trigger (name 42% · meta-text + 2 status pills 45% · chevron) + panel (search bar + rows · each row has primary-label left + meta-description + 2 badge-pills right + decorative scrollbar)." builtFrom={["FormInputField","SelectDropdown","BadgeLabel","Typography","Icon"]}>
        <SubLabel>Single-select with metadata  ·  rows: name + description + 2 status tags</SubLabel>
        <RichMetadataDropdown
          label="GPU instance profile"
          placeholder="Select an instance profile…"
          value={rmd37} onChange={setRmd37}
          hint="Each profile shows VRAM tier · environment · availability status."
          options={[
            { value:"mig-1g",  label:"MIG 1g.18gb",   metaLabel:"18 GB VRAM · A100",   tags:[{ text:"Shared",  variant:"neutral" },{ text:"Available",variant:"success" }] },
            { value:"mig-2g",  label:"MIG 2g.20gb",   metaLabel:"20 GB VRAM · A100",   tags:[{ text:"Shared",  variant:"neutral" },{ text:"Available",variant:"success" }] },
            { value:"mig-4g",  label:"MIG 4g.40gb",   metaLabel:"40 GB VRAM · A100",   tags:[{ text:"Shared",  variant:"neutral" },{ text:"Available",variant:"success" }] },
            { value:"a100-80", label:"A100 80GB PCIe", metaLabel:"80 GB VRAM · Baremetal",tags:[{ text:"Dedicated",variant:"info"  },{ text:"Low stock", variant:"warning"}] },
            { value:"h100-80", label:"H100 80GB SXM",  metaLabel:"80 GB VRAM · SXM5",   tags:[{ text:"Dedicated",variant:"info"  },{ text:"Available",variant:"success" }] },
          ]}
        />
        <SectionDivider label="trigger anatomy — before and after selection" />
        <Grid cols={2} gap="var(--space-4)">
          <div style={{ display:"flex", flexDirection:"column", gap:"var(--space-1)" }}>
            <VChip label="no selection" v="neutral"/>
            <RichMetadataDropdown
              placeholder="Select an instance profile…"
              options={[{ value:"a", label:"A100 80GB PCIe", metaLabel:"80 GB VRAM", tags:[{text:"Dedicated",variant:"info"},{text:"Available",variant:"success"}] }]}
            />
          </div>
          <div style={{ display:"flex", flexDirection:"column", gap:"var(--space-1)" }}>
            <VChip label="selected — trigger shows metadata" v="success"/>
            <RichMetadataDropdown
              value="a"
              placeholder="Select…"
              options={[{ value:"a", label:"A100 80GB PCIe", metaLabel:"80 GB VRAM · Baremetal", tags:[{text:"Dedicated",variant:"info"},{text:"Available",variant:"success"}] }]}
            />
          </div>
        </Grid>
        <SectionDivider label="anatomy legend" />
        <ShowRow gap="var(--space-4)" align="center" wrap>
          {([
            { v:"neutral" as ChipV, label:"meta-text",    desc:"Paragraph/X-Small · fg-primary" },
            { v:"muted"   as ChipV, label:"neutral-tag",  desc:"bg-secondary · fg-secondary"    },
            { v:"info"    as ChipV, label:"info-tag",     desc:"bg-info-subtle · fg-info"        },
            { v:"success" as ChipV, label:"success-tag",  desc:"bg-success-subtle · green-500"   },
            { v:"warning" as ChipV, label:"warning-tag",  desc:"bg-warning-subtle · fg-warning"  },
          ]).map(r => (
            <div key={r.label} style={{ display:"flex", alignItems:"center", gap:"var(--space-2)" }}>
              <VChip label={r.label} v={r.v}/>
              <Typography variant="micro" color="tertiary">{r.desc}</Typography>
            </div>
          ))}
        </ShowRow>
        <TokenRow tokens={["--input-ds-border","--input-ds-border-focus","--shadow-ring-brand","--input-ds-shadow","--bg-secondary","--fg-secondary","--bg-success-subtle","--green-500","--bg-info-subtle","--fg-info","--bg-warning-subtle","--fg-warning","--radius-full-ds","--text-caption"]}/>
      </DemoSection>

      {/* ── M28. GpuModelTag ──────────────────────────────────────────────────── */}
      <DemoSection index={28} title="GPU Model Tag"
        description="GPU vendor icon + model name in a subtle background pill. Atoms: GpuVendorIcon + Typography."
        builtFrom={["GpuVendorIcon","Typography"]}>
        <ShowRow>
          <GpuModelTag vendor="nvidia" model="H100" />
          <GpuModelTag vendor="nvidia" model="A100" />
          <GpuModelTag vendor="amd"    model="MI350" />
          <GpuModelTag vendor="amd"    model="RX 7900" />
        </ShowRow>
      </DemoSection>

      {/* ── M29. GpuAllocationStepper ─────────────────────────────────────────── */}
      <DemoSection index={29} title="GPU Allocation Stepper"
        description="GpuModelTag on left + bordered box with CompactValueStepper centred. Normal vs over-allocated states."
        builtFrom={["GpuModelTag","CompactValueStepper"]}>
        <ShowRow>
          <GpuAllocationStepper vendor="nvidia" model="H100" value={12} max={20} />
          <GpuAllocationStepper vendor="nvidia" model="H100" value={22} max={20} />
        </ShowRow>
      </DemoSection>

      {/* ── M30. MIG Toggle Row ─────────────────────────────────────────────────── */}
      <DemoSection index={30} title="MIG Toggle Row"
        description="'MIG Partitioning' label + 'MIG' badge + Switch toggle. On / Off states."
        builtFrom={["Typography","Switch","BadgeLabel"]}>
        <ShowRow align="flex-start">
          <div style={{ flex:1, minWidth:"var(--showcase-component-min-w)" }}><MigToggleRow enabled={true}  /></div>
          <div style={{ flex:1, minWidth:"var(--showcase-component-min-w)" }}><MigToggleRow enabled={false} /></div>
        </ShowRow>
      </DemoSection>

      {/* ── M31. MIG Partition Bar ────────────────────────────────────────────── */}
      <DemoSection index={31} title="MIG Partition Bar"
        description="Row of filled / empty AcceleratorBlock tiles visualising slot utilisation across 4 states."
        builtFrom={["AcceleratorBlock"]}>
        <ShowRow wrap={false} gap="var(--space-4)">
          <div style={{ flex:1 }}><MigPartitionBar total={7} used={3} /></div>
          <div style={{ flex:1 }}><MigPartitionBar total={7} used={2} allocated={1} /></div>
          <div style={{ flex:1 }}><MigPartitionBar total={7} used={1} /></div>
          <div style={{ flex:1 }}><MigPartitionBar total={7} used={0} /></div>
        </ShowRow>
      </DemoSection>

      {/* ── M32. MIG Partition Row ────────────────────────────────────────────── */}
      <DemoSection index={32} title="MIG Partition Row"
        description="Size-label tag + MigPartitionBar + CompactValueStepper in one form row."
        builtFrom={["MigPartitionBar","CompactValueStepper","Typography"]}>
        <div style={{ display:"flex", flexDirection:"column", gap:"var(--space-2)", maxWidth:"var(--mig-partition-max-w)" }}>
          <MigPartitionRow label="1g.10gb" value={3} total={7} />
          <MigPartitionRow label="2g.20gb" value={2} total={7} allocated={1} />
          <MigPartitionRow label="3g.40gb" value={1} total={7} />
        </div>
      </DemoSection>

      {/* ── M33. GPU Allocation Card ──────────────────────────────────────────── */}
      <DemoSection index={33} title="GPU Allocation Card"
        description="Full GPU card: stepper header + MIG toggle + partition rows. MIG on vs MIG off."
        builtFrom={["GpuAllocationStepper","MigToggleRow","MigPartitionRow"]}>
        <ShowRow align="flex-start" gap="var(--space-4)">
          <GpuAllocationCard
            vendor="nvidia" model="H100" value={12} max={20}
            migEnabled={true}
            partitions={[
              { label:"1g.10gb", value:3, total:7 },
              { label:"2g.20gb", value:2, total:7 },
              { label:"3g.40gb", value:1, total:7 },
            ]}
            style={{ maxWidth:"var(--gpu-card-max-w)", flex:1 }}
          />
          <GpuAllocationCard
            vendor="nvidia" model="H100" value={22} max={20}
            migEnabled={false} partitions={[]}
            style={{ maxWidth:"var(--gpu-card-max-w)", flex:1 }}
          />
        </ShowRow>
      </DemoSection>

      {/* ── M34. Accelerator Grid Cell ────────────────────────────────────────── */}
      <DemoSection index={34} title="Accelerator Grid Cell"
        description="Count number + 4×4 grid of AcceleratorBlocks. Accelerators column in the cluster table."
        builtFrom={["AcceleratorBlock","Typography"]}>
        <ShowRow align="flex-start" gap="var(--space-6)">
          <AcceleratorGridCell count={16}
            blocks={["used","used","used","used","used","used","used","used","allocated","allocated","allocated","allocated","empty","empty","empty","empty"]} />
          <AcceleratorGridCell count={8}
            blocks={["used","used","allocated","half","half","empty","empty","empty","empty","empty","empty","empty","empty","empty","empty","empty"]} />
        </ShowRow>
      </DemoSection>

      {/* ── M35. Resource Bar Cell ──────────────────────��─────────────────────── */}
      <DemoSection index={35} title="Resource Bar Cell"
        description="Compact table cell: used / total text + dual-colour progress bar (used = dark, allocated = light)."
        builtFrom={["Typography"]}>
        <ShowRow gap="var(--space-6)">
          <ResourceBarCell used="0/0.1"     total="4"        usedPct={5}  allocPct={20} />
          <ResourceBarCell used="0/0.5 GiB" total="15.3 GiB" usedPct={5}  allocPct={18} />
          <ResourceBarCell used="3/0.1"     total="4"        usedPct={80} allocPct={90} />
        </ShowRow>
      </DemoSection>

      {/* ── M36. Node Name Cell ───────────────────────────────────────────────── */}
      <DemoSection index={36} title="Node Name Cell"
        description="Two-line cell: hostname (primary) + IP address (tertiary mono). Node Name column."
        builtFrom={["Typography"]}>
        <ShowRow>
          <NodeNameCell hostname="ip-10-23-24-232.ec2.internal" ip="147.93.111.109" />
          <NodeNameCell hostname="node-gpu-01.prod.cluster"     ip="10.0.1.42" />
        </ShowRow>
      </DemoSection>

      {/* ── M37. Storage Quota Row ────────────────────────────────────────────── */}
      <DemoSection index={37} title="Storage Quota Row"
        description="Label + DualRangeSlider + NumberSpinner in a single form row. Storage Quotas section."
        builtFrom={["DualRangeSlider","NumberSpinner","Typography"]}>
        <div style={{ display:"flex", flexDirection:"column", gap:"var(--space-4)", maxWidth:"var(--storage-quota-max-w)" }}>
          <StorageQuotaRow label="File Storage (GiB)"   value={100} secondary={20} max={200} />
          <StorageQuotaRow label="Object Storage (GiB)" value={50}  max={200}
            marks={[{ value:60, label:"60", info:true },{ value:70, label:"70", info:true }]} />
        </div>
      </DemoSection>

      {/* ── M38. Stacked Bar Chart ──────────────────────────────────────────────── */}
      <DemoSection index={38} title="Stacked Bar Chart"
        description="Multi-series stacked vertical bar chart with y-axis, month labels, and legend. Uses status tokens."
        builtFrom={["Typography"]}>
        <StackedBarChart title="Node Health — Monthly Trend" />
      </DemoSection>

    </div>
  );
}

// ============================================================================
//  LEGACY ALIASES
//  These re-export the now-module-private legacy implementations under
//  prefixed names so ds-organisms.tsx can keep using them while the new
//  canonical Radix-style molecules sit at /src/molecules/<Name>/.
//  Once ds-organisms is refactored to use the new APIs, remove these.
// ============================================================================
export {
  Alert       as LegacyAlert,
  SearchBar   as LegacySearchBar,
  Pagination  as LegacyPagination,
  Tabs        as LegacyTabs,
  Card        as LegacyCard,
  StatCard    as LegacyStatCard,
  FormField   as LegacyFormField,
};
