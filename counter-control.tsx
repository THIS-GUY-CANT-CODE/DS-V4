// ============================================================================
//  COUNTER CONTROL — Numeric input with increment/decrement buttons
//  T1 · Atom
//
//  A compact stepper control for numeric values with optional min/max limits.
//  Shows current value / max value format (e.g., "12 / 20").
//
//  Micro-interactions:
//    • Buttons show hover state (handled by global.css)
//    • Buttons disable when at min/max limits
//    • Smooth transitions on value changes
//
//  All style values use CSS custom properties from theme.css.
//  Typography: Inter (--font-family-primary).
// ============================================================================
import React from "react";

export interface CounterControlProps {
  /** Current value */
  value: number;
  /** Maximum value (optional, for display) */
  max?: number;
  /** Minimum value (default: 0) */
  min?: number;
  /** Callback when value changes */
  onChange: (value: number) => void;
  /** Whether the control is disabled */
  disabled?: boolean;
  /** Additional CSS class */
  className?: string;
  /** Custom styles */
  style?: React.CSSProperties;
}

export function CounterControl({
  value,
  max,
  min = 0,
  onChange,
  disabled = false,
  className,
  style,
}: CounterControlProps) {
  const canDecrement = !disabled && value > min;
  const canIncrement = !disabled && (max === undefined || value < max);

  const handleDecrement = () => {
    if (canDecrement) {
      onChange(value - 1);
    }
  };

  const handleIncrement = () => {
    if (canIncrement) {
      onChange(value + 1);
    }
  };

  return (
    <div
      className={className}
      style={{
        display: "flex",
        alignItems: "center",
        gap: "var(--space-6)",
        height: "var(--size-control-md)",
        padding: "0 var(--space-3)",
        border: "var(--border-width-thin) solid var(--border-default)",
        borderRadius: "var(--radius-md-ds)",
        background: "var(--bg-primary)",
        boxShadow: "var(--shadow-xs)",
        fontFamily: "var(--font-family-primary)",
        ...style,
      }}
    >
      {/* Decrement button */}
      <button
        type="button"
        onClick={handleDecrement}
        disabled={!canDecrement}
        aria-label="Decrease"
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          width: "var(--space-4)",
          height: "var(--space-4)",
          padding: "var(--space-0-5)",
          border: "none",
          borderRadius: "var(--radius-sm-ds)",
          background: "transparent",
          color: canDecrement ? "var(--fg-secondary)" : "var(--fg-disabled)",
          cursor: canDecrement ? "pointer" : "not-allowed",
          flexShrink: 0,
          transition: `background-color var(--duration-fast) var(--ease-out)`,
        }}
        onMouseEnter={(e) => {
          if (canDecrement) {
            e.currentTarget.style.backgroundColor = "var(--bg-secondary)";
          }
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.backgroundColor = "transparent";
        }}
      >
        <svg
          width="12"
          height="2"
          viewBox="0 0 12 2"
          fill="none"
          style={{ display: "block" }}
        >
          <rect width="12" height="2" fill="currentColor" rx="1" />
        </svg>
      </button>

      {/* Value display */}
      <div
        style={{
          display: "flex",
          alignItems: "baseline",
          gap: "var(--space-1)",
          fontSize: "var(--text-base)",
          fontWeight: "var(--font-weight-normal)" as any,
          lineHeight: "var(--line-height-lg)",
          letterSpacing: "var(--letter-spacing-body)",
        }}
      >
        <span style={{ color: "var(--fg-primary)" }}>{value}</span>
        {max !== undefined && (
          <>
            <span
              style={{
                fontSize: "var(--text-caption)",
                color: "var(--fg-tertiary)",
              }}
            >
              /
            </span>
            <span
              style={{
                fontSize: "var(--text-caption)",
                color: "var(--fg-tertiary)",
              }}
            >
              {max}
            </span>
          </>
        )}
      </div>

      {/* Increment button */}
      <button
        type="button"
        onClick={handleIncrement}
        disabled={!canIncrement}
        aria-label="Increase"
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          width: "var(--space-4)",
          height: "var(--space-4)",
          padding: "var(--space-0-5)",
          border: "none",
          borderRadius: "var(--radius-sm-ds)",
          background: "transparent",
          color: canIncrement ? "var(--fg-secondary)" : "var(--fg-disabled)",
          cursor: canIncrement ? "pointer" : "not-allowed",
          flexShrink: 0,
          transition: `background-color var(--duration-fast) var(--ease-out)`,
        }}
        onMouseEnter={(e) => {
          if (canIncrement) {
            e.currentTarget.style.backgroundColor = "var(--bg-secondary)";
          }
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.backgroundColor = "transparent";
        }}
      >
        <svg
          width="12"
          height="12"
          viewBox="0 0 12 12"
          fill="none"
          style={{ display: "block" }}
        >
          <rect x="5" width="2" height="12" fill="currentColor" rx="1" />
          <rect y="5" width="12" height="2" fill="currentColor" rx="1" />
        </svg>
      </button>
    </div>
  );
}

export default CounterControl;
