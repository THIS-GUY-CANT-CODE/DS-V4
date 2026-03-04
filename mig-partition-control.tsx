// ============================================================================
//  MIG PARTITION CONTROL — Counter + Bordered StatusDot Grid
//  T2 · Molecule
//
//  GPU configuration control with counter stepper and bordered visual partition
//  display. Shows "12 / 20" counter with dot grid wrapped in border container.
//
//  Built from: CounterControl, StatusDot (multiple in bordered container)
//
//  All style values use CSS custom properties from theme.css.
//  Typography: Inter (--font-family-primary).
// ============================================================================
import React from "react";
import { StatusDot, StatusDotState } from "./status-dot";
import { CounterControl } from "./counter-control";

export interface MIGPartitionControlProps {
  /** Current counter value */
  value: number;
  /** Maximum counter value */
  max: number;
  /** Callback when counter changes */
  onChange: (value: number) => void;
  /** Array of status dot states for the grid */
  dotStates: StatusDotState[];
  /** Number of columns in the dot grid */
  gridColumns?: number;
  /** Whether the control is disabled */
  disabled?: boolean;
  /** Additional CSS class */
  className?: string;
  /** Custom styles */
  style?: React.CSSProperties;
}

export function MIGPartitionControl({
  value,
  max,
  onChange,
  dotStates,
  gridColumns = 4,
  disabled = false,
  className,
  style,
}: MIGPartitionControlProps) {
  return (
    <div
      className={className}
      style={{
        display: "flex",
        alignItems: "center",
        gap: "var(--space-6)",
        padding: "var(--space-3) var(--space-4)",
        border: "var(--border-width-thin) solid var(--border-default)",
        borderRadius: "var(--radius-md-ds)",
        background: "var(--bg-primary)",
        boxShadow: "var(--shadow-xs)",
        fontFamily: "var(--font-family-primary)",
        ...style,
      }}
    >
      {/* Counter Control */}
      <CounterControl
        value={value}
        max={max}
        min={0}
        onChange={onChange}
        disabled={disabled}
      />

      {/* Bordered Dot Grid */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: `repeat(${gridColumns}, 1fr)`,
          gap: "var(--space-1)",
          padding: "var(--space-2)",
          border: "var(--border-width-thin) solid var(--border-default)",
          borderRadius: "var(--radius-sm-ds)",
          background: "var(--bg-primary)",
          flex: 1,
          minWidth: 0,
        }}
      >
        {dotStates.map((state, index) => (
          <StatusDot
            key={index}
            state={state}
            size="md"
            style={{
              justifySelf: "center",
              alignSelf: "center",
            }}
          />
        ))}
      </div>
    </div>
  );
}

export default MIGPartitionControl;
