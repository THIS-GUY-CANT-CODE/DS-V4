// ============================================================================
//  APP SIDEBAR — Complete workspace navigation sidebar
//  T3 · Organism
//
//  Full workspace sidebar with section header and navigation groups.
//  Combines SidebarSectionHeader + SidebarNavGroup into complete sidebar.
//
//  All style values use CSS custom properties from theme.css.
//  Typography: Inter (--font-family-primary).
// ============================================================================
import React from "react";
import { SidebarSectionHeader } from "./sidebar-section-header";
import { SidebarNavGroup, SidebarNavGroupProps } from "./sidebar-nav-group";
import { IconButtonProps } from "./icon-button";

export interface AppSidebarProps {
  /** Section label (e.g., "WORKSPACE") */
  sectionLabel?: string;
  /** Optional action button for section header */
  sectionActionButton?: {
    icon: React.ReactNode;
    onClick?: () => void;
    ariaLabel: string;
  } & Partial<IconButtonProps>;
  /** Navigation groups */
  navGroups: SidebarNavGroupProps[];
  /** Currently active navigation item ID */
  activeItemId?: string;
  /** Show divider below section header */
  showHeaderDivider?: boolean;
  /** Fixed width (default: 240px) */
  width?: string;
  /** Additional CSS class */
  className?: string;
  /** Custom styles */
  style?: React.CSSProperties;
}

export function AppSidebar({
  sectionLabel,
  sectionActionButton,
  navGroups,
  activeItemId,
  showHeaderDivider = false,
  width = "240px",
  className,
  style,
}: AppSidebarProps) {
  const sidebarStyle: React.CSSProperties = {
    display: "flex",
    flexDirection: "column",
    gap: "var(--space-5)",
    width: width,
    height: "100%",
    padding: "var(--space-5)",
    background: "var(--bg-primary)",
    borderRight: "var(--border-width-thin) solid var(--border-default)",
    overflowY: "auto" as const,
    overflowX: "hidden" as const,
    flexShrink: 0,
    ...style,
  };

  const contentStyle: React.CSSProperties = {
    display: "flex",
    flexDirection: "column",
    gap: "var(--space-2)",
  };

  return (
    <aside className={className} style={sidebarStyle}>
      {/* Section Header */}
      {sectionLabel && (
        <SidebarSectionHeader
          label={sectionLabel}
          actionButton={sectionActionButton}
          showDivider={showHeaderDivider}
        />
      )}

      {/* Navigation Groups */}
      <div style={contentStyle}>
        {navGroups.map((group, index) => (
          <SidebarNavGroup
            key={group.label || `group-${index}`}
            {...group}
            activeItemId={activeItemId || group.activeItemId}
          />
        ))}
      </div>
    </aside>
  );
}

export default AppSidebar;
