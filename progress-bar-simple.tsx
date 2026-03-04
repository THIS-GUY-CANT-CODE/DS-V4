// ============================================================================
//  PROGRESS BAR SIMPLE — Simple single-color progress bar
//  T1 · Atom
//
//  Basic progress bar with single fill color. Minimal design for inline
//  progress display.
//
//  All style values use CSS custom properties from theme.css.
// ============================================================================
import React from "react";

export interface ProgressBarSimpleProps {
  /** Progress percentage (0-100) */
  value: number;
  /** Color variant */
  variant?: "brand" | "success" | "warning" | "error";
  /** Size variant */
  size?: "sm" | "md" | "lg";
  /** Additional CSS class */
  className?: string;
  /** Custom styles */
  style?: React.CSSProperties;
}

export function ProgressBarSimple({
  value,
  variant = "brand",
  size = "md",
  className,
  style,
}: ProgressBarSimpleProps) {
  const heights = {
    sm: "4px",
    md: "8px",
    lg: "12px",
  };

  const colors = {
    brand: { bg: "var(--bg-brand-subtle)", fill: "var(--bg-brand)" },
    success: { bg: "var(--bg-success-subtle)", fill: "var(--status-healthy)" },
    warning: { bg: "var(--bg-warning-subtle)", fill: "var(--status-warning)" },
    error: { bg: "var(--bg-error-subtle)", fill: "var(--bg-error)" },
  };

  const progressColors = colors[variant];

  return (
    <div
      className={className}
      role="progressbar"
      aria-valuenow={value}
      aria-valuemin={0}
      aria-valuemax={100}
      style={{
        width: "100%",
        height: heights[size],
        background: progressColors.bg,
        borderRadius: "var(--radius-sm-ds)",
        overflow: "hidden",
        ...style,
      }}
    >
      <div
        style={{
          width: `${Math.min(100, Math.max(0, value))}%`,
          height: "100%",
          background: progressColors.fill,
          transition: "width var(--duration-slow) var(--ease-default)",
        }}
      />
    </div>
  );
}

export default ProgressBarSimple;