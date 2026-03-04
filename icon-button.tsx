// ============================================================================
//  ICON BUTTON — Compact icon-only button
//  T1 · Atom
//
//  A small 24×24px button that contains only an icon, used for actions like
//  back, close, or other compact controls. Supports three sizes and variants.
//
//  Micro-interactions:
//    • Hover: background changes to var(--bg-secondary)
//    • Active: scale(0.98) press feedback (handled by global.css)
//    • Focus: double-ring focus state (handled by global.css)
//    • Disabled: reduced opacity, no-drop cursor
//
//  All style values use CSS custom properties from theme.css.
//  Typography: Inter (--font-family-primary).
// ============================================================================
import React from "react";

/* ── Types ───────────────────────────────────────────────────── */

export type IconButtonSize = "sm" | "md" | "lg";
export type IconButtonVariant = "ghost" | "outline" | "subtle";

export interface IconButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /** Button size variant */
  size?: IconButtonSize;
  
  /** Visual style variant */
  variant?: IconButtonVariant;
  
  /** Icon element to display */
  icon: React.ReactNode;
  
  /** Accessible label for screen readers */
  "aria-label": string;
  
  /** Whether the button is disabled */
  disabled?: boolean;
  
  /** Additional CSS class */
  className?: string;
}

/* ── Size mappings ───────────────────────────────────────────── */

const SIZE_STYLES: Record<IconButtonSize, { size: string; iconSize: string }> = {
  sm: { size: "var(--size-control-sm)", iconSize: "16px" },      // 24px
  md: { size: "var(--size-control-md)", iconSize: "20px" },      // 32px
  lg: { size: "var(--size-control-lg)", iconSize: "24px" },      // 40px
};

/* ── Variant mappings ────────────────────────────────────────── */

const VARIANT_STYLES: Record<IconButtonVariant, {
  background: string;
  backgroundHover: string;
  color: string;
  border: string;
  shadow: string;
}> = {
  ghost: {
    background: "transparent",
    backgroundHover: "var(--bg-secondary)",
    color: "var(--fg-secondary)",
    border: "none",
    shadow: "none",
  },
  outline: {
    background: "var(--bg-primary)",
    backgroundHover: "var(--bg-secondary)",
    color: "var(--fg-secondary)",
    border: "var(--border-width-thin) solid var(--border-default)",
    shadow: "var(--shadow-xs)",
  },
  subtle: {
    background: "var(--bg-secondary)",
    backgroundHover: "var(--bg-tertiary)",
    color: "var(--fg-secondary)",
    border: "none",
    shadow: "none",
  },
};

/* ── Component ───────────────────────────────────────────────── */

export function IconButton({
  size = "sm",
  variant = "ghost",
  icon,
  disabled = false,
  className,
  ...props
}: IconButtonProps) {
  const sizeStyle = SIZE_STYLES[size];
  const variantStyle = VARIANT_STYLES[variant];

  return (
    <button
      type="button"
      disabled={disabled}
      className={className}
      style={{
        width: sizeStyle.size,
        height: sizeStyle.size,
        padding: 0,
        border: variantStyle.border,
        borderRadius: "var(--radius-button-ds)",
        background: variantStyle.background,
        color: variantStyle.color,
        cursor: disabled ? "not-allowed" : "pointer",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexShrink: 0,
        boxShadow: variantStyle.shadow,
        opacity: disabled ? 0.5 : 1,
        fontFamily: "var(--font-family-primary)",
        fontSize: sizeStyle.iconSize,
        transition: `background-color var(--duration-fast) var(--ease-out), 
                    color var(--duration-fast) var(--ease-out),
                    opacity var(--duration-fast) var(--ease-out)`,
      }}
      onMouseEnter={(e) => {
        if (!disabled) {
          e.currentTarget.style.background = variantStyle.backgroundHover;
        }
      }}
      onMouseLeave={(e) => {
        if (!disabled) {
          e.currentTarget.style.background = variantStyle.background;
        }
      }}
      {...props}
    >
      <span
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          width: sizeStyle.iconSize,
          height: sizeStyle.iconSize,
        }}
      >
        {icon}
      </span>
    </button>
  );
}

export default IconButton;
