// ============================================================================
//  RADIO CARD — Radio button styled as a selectable card
//  T1 · Atom
//
//  Radio button presented as a card with label, description, and optional
//  icon. Used for visually prominent option selection.
//
//  All style values use CSS custom properties from theme.css.
//  Typography: Inter (--font-family-primary).
// ============================================================================
import React from "react";

export interface RadioCardProps {
  /** Radio input name */
  name: string;
  /** Radio value */
  value: string;
  /** Card label */
  label: string;
  /** Card description (optional) */
  description?: string;
  /** Icon element (optional) */
  icon?: React.ReactNode;
  /** Checked state */
  checked?: boolean;
  /** Change handler */
  onChange?: (value: string) => void;
  /** Disabled state */
  disabled?: boolean;
  /** Additional CSS class */
  className?: string;
  /** Custom styles */
  style?: React.CSSProperties;
}

export function RadioCard({
  name,
  value,
  label,
  description,
  icon,
  checked = false,
  onChange,
  disabled = false,
  className,
  style,
}: RadioCardProps) {
  const handleChange = () => {
    if (!disabled) {
      onChange?.(value);
    }
  };

  return (
    <label
      className={className}
      style={{
        display: "flex",
        alignItems: "flex-start",
        gap: "var(--space-3)",
        padding: "var(--space-4)",
        background: "var(--bg-primary)",
        border: `var(--border-width-md) solid ${checked ? "var(--border-brand)" : "var(--border-default)"}`,
        borderRadius: "var(--radius-lg-ds)",
        cursor: disabled ? "not-allowed" : "pointer",
        transition: "border-color var(--duration-fast) var(--ease-out), box-shadow var(--duration-fast) var(--ease-out)",
        opacity: disabled ? 0.5 : 1,
        ...style,
      }}
      onMouseEnter={(e) => {
        if (!disabled && !checked) {
          e.currentTarget.style.borderColor = "var(--border-hover)";
        }
      }}
      onMouseLeave={(e) => {
        if (!disabled && !checked) {
          e.currentTarget.style.borderColor = "var(--border-default)";
        }
      }}
    >
      {/* Radio Input */}
      <input
        type="radio"
        name={name}
        value={value}
        checked={checked}
        onChange={handleChange}
        disabled={disabled}
        style={{
          appearance: "none",
          width: "20px",
          height: "20px",
          border: "var(--border-width-md) solid var(--border-default)",
          borderRadius: "var(--radius-full-ds)",
          background: "var(--bg-primary)",
          borderColor: checked ? "var(--primary)" : "var(--border-default)",
          cursor: disabled ? "not-allowed" : "pointer",
          flexShrink: 0,
          marginTop: "2px",
          position: "relative",
          transition: "border-color var(--duration-fast) var(--ease-out)",
        }}
      />

      {/* Checked Indicator */}
      {checked && (
        <div
          style={{
            position: "absolute",
            width: "10px",
            height: "10px",
            borderRadius: "var(--radius-full-ds)",
            background: "var(--primary)",
            marginLeft: "5px",
            marginTop: "7px",
            pointerEvents: "none",
          }}
        />
      )}

      {/* Icon (optional) */}
      {icon && (
        <div style={{ flexShrink: 0, color: "var(--fg-secondary)" }}>
          {icon}
        </div>
      )}

      {/* Content */}
      <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: "var(--space-1)" }}>
        <span
          style={{
            fontFamily: "var(--font-family-primary)",
            fontSize: "var(--text-base)",
            fontWeight: "var(--font-weight-medium)" as any,
            color: "var(--fg-primary)",
            lineHeight: "var(--line-height-md)",
          }}
        >
          {label}
        </span>
        {description && (
          <span
            style={{
              fontFamily: "var(--font-family-primary)",
              fontSize: "var(--text-caption)",
              fontWeight: "var(--font-weight-normal)" as any,
              color: "var(--fg-secondary)",
              lineHeight: "var(--line-height-sm)",
            }}
          >
            {description}
          </span>
        )}
      </div>
    </label>
  );
}

export default RadioCard;
