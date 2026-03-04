// ============================================================================
//  COUNT BADGE — Numeric count with label
//  GPU visualization atom — displays count + label for in-use/allocated resources.
//  All style values use CSS custom properties from theme.css (Layer 2/3).
//  Typography: Inter (--font-family-primary).
//  Used in MIGTooltip footer to show "X In use" count.
// ============================================================================
import * as React from "react";

export type CountBadgeColor = "primary" | "brand" | "used" | "allocated" | "success" | "warning" | "error";

const countBadgeColors: Record<CountBadgeColor, { number: string; label: string }> = {
  primary: { number: "var(--fg-primary)", label: "var(--fg-secondary)" },
  brand: { number: "var(--fg-brand)", label: "var(--fg-brand)" },
  used: { number: "var(--status-used)", label: "var(--status-used)" },
  allocated: { number: "var(--fg-secondary)", label: "var(--fg-secondary)" },
  success: { number: "var(--fg-success)", label: "var(--fg-success)" },
  warning: { number: "var(--fg-warning)", label: "var(--fg-warning)" },
  error: { number: "var(--fg-error)", label: "var(--fg-error)" },
};

export interface CountBadgeProps {
  /** Numeric count */
  count: number;
  /** Label text */
  label: string;
  /** Color variant */
  color?: CountBadgeColor;
  /** Custom CSS properties */
  style?: React.CSSProperties;
  /** Additional className */
  className?: string;
}

const CountBadge = React.forwardRef<HTMLDivElement, CountBadgeProps>(
  ({ count, label, color = "primary", style, className }, ref) => {
    const colors = countBadgeColors[color];

    return (
      <div
        ref={ref}
        className={className}
        style={{
          display: "flex",
          alignItems: "center",
          gap: "var(--space-1)",
          ...style,
        }}
      >
        <span
          style={{
            fontFamily: "var(--font-family-primary)",
            fontSize: "var(--text-caption)",
            fontWeight: "var(--font-weight-medium)" as any,
            color: colors.number,
            lineHeight: "var(--line-height-xs)",
          }}
        >
          {count}
        </span>
        <span
          style={{
            fontFamily: "var(--font-family-primary)",
            fontSize: "var(--text-caption)",
            fontWeight: "var(--font-weight-normal)" as any,
            color: colors.label,
            lineHeight: "var(--line-height-xs)",
          }}
        >
          {label}
        </span>
      </div>
    );
  }
);

CountBadge.displayName = "CountBadge";

export { CountBadge };
