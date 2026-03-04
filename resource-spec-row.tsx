// ============================================================================
//  RESOURCE SPEC ROW — Multiple ResourceMetric atoms in a row
//  T2 · Molecule
//
//  Horizontal collection of resource specifications (e.g., Memory, vCPUs, Storage).
//  Each metric shows an icon, label, and value.
//
//  Built from: ResourceMetric (multiple instances)
//
//  All style values use CSS custom properties from theme.css.
//  Typography: Inter (--font-family-primary).
// ============================================================================
import React from "react";
import { ResourceMetric } from "./resource-metric";

export interface ResourceSpec {
  /** Unique key for React rendering */
  id: string;
  /** Optional icon element */
  icon?: React.ReactNode;
  /** Label text (e.g., "Memory:", "vCPUs:") */
  label: string;
  /** Value text (e.g., "8GB", "16") */
  value: string;
}

export interface ResourceSpecRowProps {
  /** Array of resource specs */
  specs: ResourceSpec[];
  /** Gap between metrics (default: var(--space-4)) */
  gap?: string;
  /** Additional CSS class */
  className?: string;
  /** Custom styles */
  style?: React.CSSProperties;
}

export function ResourceSpecRow({
  specs,
  gap = "var(--space-4)",
  className,
  style,
}: ResourceSpecRowProps) {
  if (specs.length === 0) return null;

  return (
    <div
      className={className}
      style={{
        display: "flex",
        flexWrap: "wrap",
        alignItems: "center",
        gap: gap,
        fontFamily: "var(--font-family-primary)",
        ...style,
      }}
    >
      {specs.map((spec) => (
        <ResourceMetric
          key={spec.id}
          icon={spec.icon}
          label={spec.label}
          value={spec.value}
        />
      ))}
    </div>
  );
}

export default ResourceSpecRow;
