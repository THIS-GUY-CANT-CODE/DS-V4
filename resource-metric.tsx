// ============================================================================
//  RESOURCE METRIC — Label-value pair with optional icon
//  T1 · Atom
//
//  Displays a resource specification like "Memory: 5/10 GB" or "GPUs: 4"
//  with an optional icon. Used in cards to show specs, quotas, or metrics.
//
//  All style values use CSS custom properties from theme.css.
//  Typography: Inter (--font-family-primary).
// ============================================================================
import React from "react";

export interface ResourceMetricProps {
  /** Optional icon element */
  icon?: React.ReactNode;
  /** Label text (e.g., "Memory", "GPUs") */
  label: string;
  /** Value text (e.g., "5/10 GB", "4") */
  value: string;
  /** Additional CSS class */
  className?: string;
  /** Custom styles */
  style?: React.CSSProperties;
}

export function ResourceMetric({
  icon,
  label,
  value,
  className,
  style,
}: ResourceMetricProps) {
  return (
    <div
      className={className}
      style={{
        display: "flex",
        alignItems: "center",
        gap: "var(--space-1)",
        fontFamily: "var(--font-family-primary)",
        ...style,
      }}
    >
      {icon && (
        <span
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: "var(--space-3)",
            height: "var(--space-3)",
            color: "var(--fg-secondary)",
            flexShrink: 0,
          }}
        >
          {icon}
        </span>
      )}
      <span
        style={{
          fontSize: "var(--text-caption)",
          fontWeight: "var(--font-weight-normal)" as any,
          color: "var(--fg-secondary)",
          lineHeight: "var(--line-height-sm)",
        }}
      >
        {label}
      </span>
      <span
        style={{
          fontSize: "var(--text-caption)",
          fontWeight: "var(--font-weight-normal)" as any,
          color: "var(--fg-primary)",
          lineHeight: "var(--line-height-sm)",
        }}
      >
        {value}
      </span>
    </div>
  );
}

export default ResourceMetric;
