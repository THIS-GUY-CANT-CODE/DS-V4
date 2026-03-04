// ============================================================================
//  CHIP BUTTON — Selectable chip/pill button (radio style)
//  T1 · Atom
//
//  Small pill-shaped button for filtering or selecting from a set of options.
//  Works like a radio button but styled as a chip.
//
//  All style values use CSS custom properties from theme.css.
//  Typography: Inter (--font-family-primary).
// ============================================================================
import React from "react";

export interface ChipButtonProps {
  /** Chip label */
  children: React.ReactNode;
  /** Selected state */
  selected?: boolean;
  /** Click handler */
  onClick?: () => void;
  /** Disabled state */
  disabled?: boolean;
  /** Size variant */
  size?: "sm" | "md" | "lg";
  /** Icon element (optional) */
  icon?: React.ReactNode;
  /** Additional CSS class */
  className?: string;
  /** Custom styles */
  style?: React.CSSProperties;
}

export function ChipButton({
  children,
  selected = false,
  onClick,
  disabled = false,
  size = "md",
  icon,
  className,
  style,
}: ChipButtonProps) {
  const sizes = {
    sm: { height: "24px", padding: "0 var(--space-2)", fontSize: "var(--text-caption)" },
    md: { height: "32px", padding: "0 var(--space-3)", fontSize: "var(--text-base)" },
    lg: { height: "40px", padding: "0 var(--space-4)", fontSize: "var(--text-base)" },
  };

  const sizeStyles = sizes[size];

  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className={className}
      style={{
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        gap: "var(--space-2)",
        height: sizeStyles.height,
        padding: sizeStyles.padding,
        fontFamily: "var(--font-family-primary)",
        fontSize: sizeStyles.fontSize,
        fontWeight: "var(--font-weight-medium)" as any,
        lineHeight: "var(--line-height-md)",
        color: selected ? "var(--fg-brand)" : "var(--fg-primary)",
        background: selected ? "var(--bg-brand-subtle)" : "var(--bg-primary)",
        border: `var(--border-width-md) solid ${selected ? "var(--border-brand)" : "var(--border-default)"}`,
        borderRadius: "var(--radius-lg-ds)",
        cursor: disabled ? "not-allowed" : "pointer",
        opacity: disabled ? 0.5 : 1,
        transition: "all var(--duration-fast) var(--ease-out)",
        whiteSpace: "nowrap" as const,
        ...style,
      }}
      onMouseEnter={(e) => {
        if (!disabled && !selected) {
          e.currentTarget.style.borderColor = "var(--border-hover)";
          e.currentTarget.style.background = "var(--bg-secondary)";
        }
      }}
      onMouseLeave={(e) => {
        if (!disabled && !selected) {
          e.currentTarget.style.borderColor = "var(--border-default)";
          e.currentTarget.style.background = "var(--bg-primary)";
        }
      }}
      onFocus={(e) => {
        if (!disabled) {
          e.currentTarget.style.boxShadow = "var(--shadow-ring-brand)";
        }
      }}
      onBlur={(e) => {
        e.currentTarget.style.boxShadow = "none";
      }}
    >
      {icon && <span style={{ display: "flex", alignItems: "center" }}>{icon}</span>}
      {children}
    </button>
  );
}

export default ChipButton;
