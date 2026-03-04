// ============================================================================
//  APP LAYOUT — Design System documentation shell
//  Uses BaseTemplate for the app shell structure.
//  Sidebar nav (DS sections only) + top nav + <Outlet>
//  All style values use CSS custom properties from theme.css (Layer 2/3).
//  Typography: Inter (--font-family-primary), DM Sans (--font-family-display),
//              Cousine (--font-family-mono).
// ============================================================================
import React, { useState, Suspense } from "react";
import { Outlet, NavLink, useLocation } from "react-router";
import { BaseTemplate } from "../../templates";

// ─── Nav items — Design System sections only ──────────────────────────────────
interface NavItem {
  path: string;
  label: string;
  icon: React.ReactNode;
  tier?: string;
}

const NAV_ITEMS: NavItem[] = [
  {
    path: "/tokens",
    label: "Design Tokens",
    tier: "T0",
    icon: (
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
        <circle cx="8" cy="8" r="3" stroke="currentColor" strokeWidth="1.5" />
        <circle cx="8" cy="8" r="6.5" stroke="currentColor" strokeWidth="1.5" strokeDasharray="2 2" />
      </svg>
    ),
  },
  {
    path: "/atoms",
    label: "Atoms",
    tier: "T1",
    icon: (
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
        <rect x="3" y="3" width="10" height="10" rx="2" stroke="currentColor" strokeWidth="1.5" />
        <circle cx="8" cy="8" r="2" fill="currentColor" />
      </svg>
    ),
  },
  {
    path: "/molecules",
    label: "Molecules",
    tier: "T2",
    icon: (
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
        <circle cx="5" cy="8" r="2.5" stroke="currentColor" strokeWidth="1.5" />
        <circle cx="11" cy="8" r="2.5" stroke="currentColor" strokeWidth="1.5" />
        <path d="M7.5 8H8.5" stroke="currentColor" strokeWidth="1.5" />
      </svg>
    ),
  },
  {
    path: "/organisms",
    label: "Organisms",
    tier: "T3",
    icon: (
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
        <rect x="1" y="1" width="6" height="6" rx="1" stroke="currentColor" strokeWidth="1.5" />
        <rect x="9" y="1" width="6" height="6" rx="1" stroke="currentColor" strokeWidth="1.5" />
        <rect x="1" y="9" width="6" height="6" rx="1" stroke="currentColor" strokeWidth="1.5" />
        <rect x="9" y="9" width="6" height="6" rx="1" stroke="currentColor" strokeWidth="1.5" />
      </svg>
    ),
  },
  {
    path: "/templates",
    label: "Templates",
    tier: "T4",
    icon: (
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
        <rect x="1" y="1" width="14" height="3" rx="1" stroke="currentColor" strokeWidth="1.5" />
        <rect x="1" y="6" width="5" height="9" rx="1" stroke="currentColor" strokeWidth="1.5" />
        <rect x="8" y="6" width="7" height="9" rx="1" stroke="currentColor" strokeWidth="1.5" />
      </svg>
    ),
  },
  {
    path: "/drawer",
    label: "Drawer Demo",
    icon: (
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
        <rect x="6" y="2" width="9" height="12" rx="1" stroke="currentColor" strokeWidth="1.5" />
        <path d="M1 4L1 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    path: "/slotcomposition",
    label: "Slot Composition",
    icon: (
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
        <path d="M8 1L14 8L8 15L2 8L8 1Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
        <path d="M2 8H14M8 1V15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
];

// ─── Logo mark ────────────────────────────────────────────────────────────────
function LogoMark({ size = 28 }: { size?: number }) {
  return (
    <div
      style={{
        width: size,
        height: size,
        borderRadius: "var(--radius-sm-ds)",
        background: "var(--bg-brand)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexShrink: 0,
        boxShadow: "var(--shadow-brand-glow)",
      }}
    >
      <svg width={size * 0.6} height={size * 0.6} viewBox="0 0 18 18" fill="none">
        <rect x="1" y="1" width="7" height="7" rx="1.5" fill="var(--primary-foreground)" />
        <rect x="10" y="1" width="7" height="7" rx="1.5" fill="var(--primary-foreground)" style={{ fillOpacity: "var(--opacity-logo-secondary)" }} />
        <rect x="1" y="10" width="7" height="7" rx="1.5" fill="var(--primary-foreground)" style={{ fillOpacity: "var(--opacity-logo-secondary)" }} />
        <rect x="10" y="10" width="7" height="7" rx="1.5" fill="var(--primary-foreground)" style={{ fillOpacity: "var(--opacity-subtle)" }} />
      </svg>
    </div>
  );
}

// ─── Sidebar nav item ─────────────────────────────────────────────────────────
function SidebarNavItem({ item, collapsed }: { item: NavItem; collapsed: boolean }) {
  return (
    <NavLink
      to={item.path}
      style={({ isActive }) => ({
        display: "flex",
        alignItems: "center",
        gap: collapsed ? "0" : "var(--sidebar-item-icon-gap)",
        justifyContent: collapsed ? "center" : "flex-start",
        height: "var(--sidebar-item-height)",
        padding: collapsed ? "0" : "0 var(--sidebar-item-padding-x)",
        borderRadius: "var(--sidebar-item-radius)",
        background: isActive ? "var(--sidebar-item-bg-active)" : "transparent",
        color: isActive ? "var(--sidebar-item-fg-active)" : "var(--sidebar-item-fg)",
        fontFamily: "var(--font-family-primary)",
        fontSize: "var(--text-base)",
        fontWeight: isActive ? ("var(--font-weight-medium)" as any) : ("var(--font-weight-normal)" as any),
        textDecoration: "none",
        transition: "background var(--duration-fast) var(--ease-out), color var(--duration-fast) var(--ease-out)",
        cursor: "pointer",
        flexShrink: 0,
        userSelect: "none" as const,
      })}
    >
      <span
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          width: "var(--size-icon-md)",
          height: "var(--size-icon-md)",
          flexShrink: 0,
        }}
      >
        {item.icon}
      </span>
      {!collapsed && (
        <span style={{ flex: 1, minWidth: 0, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
          {item.label}
        </span>
      )}
      {!collapsed && item.tier && (
        <span
          style={{
            display: "inline-flex",
            alignItems: "center",
            padding: "var(--badge-padding-y) var(--badge-padding-x)",
            borderRadius: "var(--radius-full-ds)",
            background: "var(--bg-secondary)",
            color: "var(--fg-tertiary)",
            fontFamily: "var(--font-family-mono)",
            fontSize: "var(--text-micro)",
            fontWeight: "var(--font-weight-medium)" as any,
            lineHeight: "var(--line-height-sm)",
            flexShrink: 0,
            border: "var(--border-width-thin) solid var(--border-default)",
          }}
        >
          {item.tier}
        </span>
      )}
    </NavLink>
  );
}

// ─── Sidebar content (rendered into BaseTemplate sidebar slot) ────────────────
function SidebarContent({ collapsed, onToggle }: { collapsed: boolean; onToggle: () => void }) {
  return (
    <>
      {/* Brand */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "var(--space-3)",
          padding: "var(--space-2) var(--space-1)",
          marginBottom: "var(--space-2)",
        }}
      >
        <LogoMark size={collapsed ? 24 : 28} />
        {!collapsed && (
          <div style={{ display: "flex", flexDirection: "column", minWidth: 0 }}>
            <span
              style={{
                fontFamily: "var(--font-family-display)",
                fontSize: "var(--text-base)",
                fontWeight: "var(--font-weight-bold)" as any,
                color: "var(--fg-primary)",
                letterSpacing: "var(--letter-spacing-display)",
                lineHeight: "var(--line-height-md)",
                whiteSpace: "nowrap",
              }}
            >
              HOOKIFIED
            </span>
            <span
              style={{
                fontFamily: "var(--font-family-mono)",
                fontSize: "var(--font-size-chart)",
                color: "var(--fg-tertiary)",
                letterSpacing: "var(--letter-spacing-tracking-xs)",
              }}
            >
              Design System v6.0
            </span>
          </div>
        )}
      </div>

      {/* Section label */}
      {!collapsed && (
        <div
          style={{
            padding: "0 var(--sidebar-item-padding-x)",
            marginBottom: "calc(-1 * var(--space-2))",
          }}
        >
          <span
            style={{
              fontFamily: "var(--font-family-mono)",
              fontSize: "var(--text-micro)",
              fontWeight: "var(--font-weight-semibold)" as any,
              color: "var(--fg-tertiary)",
              textTransform: "uppercase" as const,
              letterSpacing: "var(--letter-spacing-tracking-lg)",
            }}
          >
            Components
          </span>
        </div>
      )}

      {/* Nav items */}
      <nav
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "var(--sidebar-item-gap)",
          flex: 1,
        }}
      >
        {NAV_ITEMS.map((item) => (
          <SidebarNavItem key={item.path} item={item} collapsed={collapsed} />
        ))}
      </nav>

      {/* Collapse toggle */}
      <button
        onClick={onToggle}
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: collapsed ? "center" : "flex-start",
          gap: "var(--space-2)",
          height: "var(--sidebar-item-height)",
          padding: collapsed ? "0" : "0 var(--sidebar-item-padding-x)",
          borderRadius: "var(--sidebar-item-radius)",
          background: "transparent",
          color: "var(--fg-tertiary)",
          fontFamily: "var(--font-family-primary)",
          fontSize: "var(--text-caption)",
          cursor: "pointer",
          border: "none",
          transition: "all var(--duration-fast) var(--ease-out)",
        }}
      >
        <svg
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="none"
          style={{
            transform: collapsed ? "rotate(180deg)" : "none",
            transition: "transform var(--duration-fast) var(--ease-out)",
            flexShrink: 0,
          }}
        >
          <path
            d="M10 3L5 8L10 13"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        {!collapsed && <span>Collapse</span>}
      </button>
    </>
  );
}

// ─── Header content (rendered into BaseTemplate header slot) ──────────────────
function HeaderContent({ pageLabel }: { pageLabel: string }) {
  return (
    <>
      {/* Breadcrumb */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "var(--breadcrumb-gap)",
          fontFamily: "var(--font-family-primary)",
          fontSize: "var(--text-base)",
          color: "var(--breadcrumb-fg)",
        }}
      >
        <span style={{ color: "var(--fg-tertiary)" }}>Design System</span>
        <svg width="12" height="12" viewBox="0 0 12 12" fill="none" style={{ flexShrink: 0 }}>
          <path
            d="M4 2.5L8 6L4 9.5"
            stroke="var(--breadcrumb-separator)"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        <span style={{ color: "var(--fg-primary)", fontWeight: "var(--font-weight-medium)" as any }}>
          {pageLabel}
        </span>
      </div>

      {/* Right side — status */}
      <div style={{ display: "flex", alignItems: "center", gap: "var(--space-2)" }}>
        <div
          style={{
            width: "var(--size-dot-sm)",
            height: "var(--size-dot-sm)",
            borderRadius: "var(--radius-full)",
            background: "var(--status-healthy)",
          }}
        />
        <span
          style={{
            fontFamily: "var(--font-family-mono)",
            fontSize: "var(--text-micro)",
            color: "var(--fg-tertiary)",
          }}
        >
          Design System Active
        </span>
      </div>
    </>
  );
}

// ─── AppLayout ────────────────────────────────────────────────────────────────
export function AppLayout() {
  const [collapsed, setCollapsed] = useState(false);
  const location = useLocation();

  // Find current page label
  const currentPage = NAV_ITEMS.find((item) =>
    item.path === "/" ? location.pathname === "/" : location.pathname.startsWith(item.path)
  );
  const pageLabel = currentPage?.label ?? "Overview";

  return (
    <BaseTemplate
      sidebar={<SidebarContent collapsed={collapsed} onToggle={() => setCollapsed((c) => !c)} />}
      sidebarCollapsed={collapsed}
      header={<HeaderContent pageLabel={pageLabel} />}
      noPadding
    >
      <Suspense
        fallback={
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              minHeight: "200px",
              color: "var(--fg-tertiary)",
              fontFamily: "var(--font-family-primary)",
              fontSize: "var(--text-base)",
            }}
          >
            Loading...
          </div>
        }
      >
        <Outlet />
      </Suspense>
    </BaseTemplate>
  );
}

export default AppLayout;