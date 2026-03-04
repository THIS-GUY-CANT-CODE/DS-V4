// ============================================================================
//  APP HEADER — Complete application header bar
//  T3 · Organism
//
//  Full application header with logo, navigation menu, and user section.
//  Combines Logo + TopbarMenuGroup + TopbarUserMenu into complete header.
//
//  All style values use CSS custom properties from theme.css.
//  Typography: Inter (--font-family-primary).
// ============================================================================
import React from "react";
import { TopbarMenuGroup, TopbarMenuGroupItem } from "./topbar-menu-group";
import { TopbarUserMenu } from "./topbar-user-menu";
import { WorkspaceDropdownTrigger, WorkspaceDropdownTriggerProps } from "./workspace-dropdown-trigger";
import { TopbarNavItemProps } from "./topbar-nav-item";
import { AvatarProps } from "./avatar";

export interface AppHeaderProps {
  /** Logo element (image, SVG, or component) */
  logo?: React.ReactNode;
  /** Navigation menu items */
  menuItems: TopbarMenuGroupItem[];
  /** Workspace dropdown configuration */
  workspaceDropdown?: WorkspaceDropdownTriggerProps;
  /** Currently active menu item ID */
  activeMenuId?: string;
  /** User navigation item (e.g., "Docs", "Help") */
  userNavItem?: TopbarNavItemProps & { id?: string };
  /** User avatar configuration */
  avatar: AvatarProps;
  /** Menu item click handler */
  onMenuItemClick?: (itemId: string) => void;
  /** Avatar click handler */
  onAvatarClick?: () => void;
  /** Additional CSS class */
  className?: string;
  /** Custom styles */
  style?: React.CSSProperties;
}

export function AppHeader({
  logo,
  menuItems,
  workspaceDropdown,
  activeMenuId,
  userNavItem,
  avatar,
  onMenuItemClick,
  onAvatarClick,
  className,
  style,
}: AppHeaderProps) {
  const headerStyle: React.CSSProperties = {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    gap: "var(--space-4)",
    height: "var(--header-height, 48px)",
    padding: "0 var(--space-11)",
    background: "var(--bg-primary)",
    borderBottom: "var(--border-width-thin) solid var(--border-divider)",
    boxShadow: "var(--shadow-xs)",
    position: "relative" as const,
    ...style,
  };

  const leftSectionStyle: React.CSSProperties = {
    display: "flex",
    alignItems: "center",
    height: "var(--space-8)",
    flexShrink: 0,
  };

  const mainMenuStyle: React.CSSProperties = {
    display: "flex",
    alignItems: "center",
    flex: "1 0 0",
    minWidth: 0,
    justifyContent: "center",
  };

  const rightSectionStyle: React.CSSProperties = {
    display: "flex",
    alignItems: "center",
    gap: "var(--space-2)",
    flexShrink: 0,
  };

  const separatorStyle: React.CSSProperties = {
    fontFamily: "var(--font-family-primary)",
    fontSize: "var(--text-base)",
    fontWeight: "var(--font-weight-medium)" as any,
    lineHeight: "var(--line-height-lg)",
    letterSpacing: "-0.084px",
    color: "var(--fg-tertiary)",
    margin: "0 var(--space-4)",
    userSelect: "none" as const,
    fontFeatureSettings: "'cv09', 'ss11', 'calt' 0, 'liga' 0",
  };

  return (
    <header className={className} style={headerStyle}>
      {/* Left: Logo */}
      {logo && <div style={leftSectionStyle}>{logo}</div>}

      {/* Center: Main Navigation Menu */}
      <div style={mainMenuStyle}>
        <TopbarMenuGroup
          items={menuItems}
          activeItemId={activeMenuId}
          onItemClick={onMenuItemClick}
        />
        {workspaceDropdown && (
          <>
            <span style={separatorStyle}>/</span>
            <WorkspaceDropdownTrigger {...workspaceDropdown} />
          </>
        )}
      </div>

      {/* Right: User Menu */}
      <div style={rightSectionStyle}>
        <TopbarUserMenu
          navItem={userNavItem}
          avatar={avatar}
          onAvatarClick={onAvatarClick}
        />
      </div>
    </header>
  );
}

export default AppHeader;
