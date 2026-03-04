// ============================================================================
//  ICON CIRCLE — Circular icon container with brand background
//  T1 · Atom
//
//  Circular container for icons with branded background color. Used in
//  stat cards, feature highlights, and dashboard widgets.
//
//  All style values use CSS custom properties from theme.css.
// ============================================================================
import React from "react";

export interface IconCircleProps {
  /** Icon element to display */
  children: React.ReactNode;
  /** Size variant */
  size?: "sm" | "md" | "lg" | "xl";
  /** Color variant */
  variant?: "brand" | "success" | "warning" | "error" | "neutral";
  /** Additional CSS class */
  className?: string;
  /** Custom styles */
  style?: React.CSSProperties;
}

export function IconCircle({
  children,
  size = "md",
  variant = "brand",
  className,
  style,
}: IconCircleProps) {
  const sizes = {
    sm: "32px",
    md: "48px",
    lg: "64px",
    xl: "80px",
  };

  const colors = {
    brand: { bg: "var(--bg-brand-subtle)", fg: "var(--primary)" },
    success: { bg: "var(--bg-success-subtle)", fg: "var(--status-healthy)" },
    warning: { bg: "var(--bg-warning-subtle)", fg: "var(--status-warning)" },
    error: { bg: "var(--bg-error-subtle)", fg: "var(--bg-error)" },
    neutral: { bg: "var(--bg-secondary)", fg: "var(--fg-secondary)" },
  };

  const colorScheme = colors[variant];

  return (
    <div
      className={className}
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        width: sizes[size],
        height: sizes[size],
        borderRadius: "var(--radius-full-ds)",
        background: colorScheme.bg,
        color: colorScheme.fg,
        flexShrink: 0,
        ...style,
      }}
    >
      {children}
    </div>
  );
}

export default IconCircle;
