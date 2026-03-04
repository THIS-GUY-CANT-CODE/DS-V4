// ============================================================================
//  MODEL HEADER — Logo + Name + Family + Checkmark
//  T2 · Molecule
//
//  Combines Avatar + WorkspaceTitle + CheckmarkIcon for model/workspace headers.
//  Displays model logo, name, family/subtitle, and optional verification checkmark.
//
//  Built from: Avatar, WorkspaceTitle, CheckmarkIcon
//
//  All style values use CSS custom properties from theme.css.
//  Typography: Inter (--font-family-primary).
// ============================================================================
import React from "react";
import { Avatar, AvatarImage, AvatarFallback } from "./avatar";
import { WorkspaceTitle } from "./workspace-title";
import { CheckmarkIcon } from "./checkmark-icon";

export interface ModelHeaderProps {
  /** Logo image source */
  logo?: string;
  /** Fallback text if logo doesn't load */
  logoFallback?: string;
  /** Model/workspace name */
  name: string;
  /** Subtitle (e.g., "Family", "Type") */
  subtitle?: string;
  /** Whether to show verification checkmark */
  verified?: boolean;
  /** Additional CSS class */
  className?: string;
  /** Custom styles */
  style?: React.CSSProperties;
}

export function ModelHeader({
  logo,
  logoFallback,
  name,
  subtitle,
  verified = false,
  className,
  style,
}: ModelHeaderProps) {
  return (
    <div
      className={className}
      style={{
        display: "flex",
        alignItems: "center",
        gap: "var(--space-2)",
        width: "100%",
        fontFamily: "var(--font-family-primary)",
        ...style,
      }}
    >
      {/* Avatar/Logo */}
      {(logo || logoFallback) && (
        <div
          style={{
            width: "var(--size-control-lg)",
            height: "var(--size-control-lg)",
            borderRadius: "var(--radius-md-ds)",
            background: "var(--bg-secondary)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            overflow: "hidden",
            flexShrink: 0,
          }}
        >
          {logo ? (
            <img
              src={logo}
              alt={name}
              style={{
                width: "var(--space-6)",
                height: "var(--space-6)",
                objectFit: "contain",
              }}
            />
          ) : (
            <span
              style={{
                fontSize: "var(--text-base)",
                fontWeight: "var(--font-weight-medium)" as any,
                color: "var(--fg-secondary)",
              }}
            >
              {logoFallback}
            </span>
          )}
        </div>
      )}

      {/* Name + Subtitle */}
      <div style={{ flex: 1, minWidth: 0 }}>
        <WorkspaceTitle title={name} subtitle={subtitle} />
      </div>

      {/* Verification Checkmark */}
      {verified && (
        <div style={{ flexShrink: 0 }}>
          <CheckmarkIcon size={18} color="var(--primary)" />
        </div>
      )}
    </div>
  );
}

export default ModelHeader;
