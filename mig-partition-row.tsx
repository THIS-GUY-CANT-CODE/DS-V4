// ============================================================================
//  MIG PARTITION ROW — Label + StatusDot Grid + CounterControl
//  T2 · Molecule
//
//  MIG partition configuration row showing profile label (e.g., "1g.10gb"),
//  visual status dots indicating allocation state, and counter stepper.
//
//  Built from: Badge (or custom label), StatusDot (grid), CounterControl
//
//  All style values use CSS custom properties from theme.css.
//  Typography: Inter (--font-family-primary).
// ============================================================================
import React from "react";
import { StatusDot, StatusDotState } from "./status-dot";
import { CounterControl } from "./counter-control";

export interface MIGPartitionRowProps {
  /** Profile label (e.g., "1g.10gb") */
  profileLabel: string;
  /** Array of status dot states */
  dotStates: StatusDotState[];
  /** Current counter value */
  value: number;
  /** Maximum counter value */
  max: number;
  /** Callback when counter changes */
  onChange: (value: number) => void;
  /** Whether the row is disabled */
  disabled?: boolean;
  /** Additional CSS class */
  className?: string;
  /** Custom styles */
  style?: React.CSSProperties;
}

export function MIGPartitionRow({
  profileLabel,
  dotStates,
  value,
  max,
  onChange,
  disabled = false,
  className,
  style,
}: MIGPartitionRowProps) {
  return (
    <div
      className={className}
      style={{
        display: "flex",
        alignItems: "center",
        gap: "var(--space-2-5)",
        width: "100%",
        fontFamily: "var(--font-family-primary)",
        ...style,
      }}
    >
      {/* Profile Label */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          height: "var(--space-6)",
          padding: "0 var(--space-2)",
          background: "var(--bg-primary)",
          border: "var(--border-width-thin) solid var(--border-default)",
          borderRadius: "var(--radius-md-ds)",
          boxShadow: "var(--shadow-xs)",
          flexShrink: 0,
        }}
      >
        <span
          style={{
            fontSize: "var(--text-caption)",
            fontWeight: "var(--font-weight-medium)" as any,
            color: "var(--fg-primary)",
            lineHeight: "var(--line-height-sm)",
            whiteSpace: "nowrap",
          }}
        >
          {profileLabel}
        </span>
      </div>

      {/* Status Dot Grid */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "var(--space-1)",
          flex: 1,
          minWidth: 0,
        }}
      >
        {dotStates.map((state, index) => (
          <StatusDot
            key={index}
            state={state}
            size="md"
            style={{ flexShrink: 0 }}
          />
        ))}
      </div>

      {/* Counter Control */}
      <CounterControl
        value={value}
        max={max}
        min={0}
        onChange={onChange}
        disabled={disabled}
      />
    </div>
  );
}

export default MIGPartitionRow;
