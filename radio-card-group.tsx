// ============================================================================
//  RADIO CARD GROUP — Group of RadioCard components for selection
//  T2 · Molecule
//
//  Manages a group of RadioCard atoms for single-selection scenarios.
//  Used for CPU/GPU selection, plan selection, etc.
//
//  Combines: Multiple RadioCard atoms in vertical/horizontal layout
//  All style values use CSS custom properties from theme.css.
// ============================================================================
import React, { useState } from "react";
import { RadioCard, RadioCardProps } from "./radio-card";

export interface RadioCardOption extends Omit<RadioCardProps, "name" | "checked" | "onChange"> {
  value: string;
  label: string;
}

export interface RadioCardGroupProps {
  /** Group name */
  name: string;
  /** Array of radio card options */
  options: RadioCardOption[];
  /** Selected value */
  value?: string;
  /** Change handler */
  onChange?: (value: string) => void;
  /** Layout direction */
  direction?: "vertical" | "horizontal";
  /** Gap between cards */
  gap?: string;
  /** Additional CSS class */
  className?: string;
  /** Custom styles */
  style?: React.CSSProperties;
}

export function RadioCardGroup({
  name,
  options,
  value: controlledValue,
  onChange,
  direction = "vertical",
  gap = "var(--space-3)",
  className,
  style,
}: RadioCardGroupProps) {
  const [internalValue, setInternalValue] = useState(options[0]?.value || "");
  const value = controlledValue !== undefined ? controlledValue : internalValue;

  const handleChange = (newValue: string) => {
    if (controlledValue === undefined) {
      setInternalValue(newValue);
    }
    onChange?.(newValue);
  };

  return (
    <div
      className={className}
      role="radiogroup"
      style={{
        display: "flex",
        flexDirection: direction === "vertical" ? "column" : "row",
        gap,
        ...style,
      }}
    >
      {options.map((option) => (
        <RadioCard
          key={option.value}
          name={name}
          value={option.value}
          label={option.label}
          description={option.description}
          icon={option.icon}
          checked={option.value === value}
          onChange={handleChange}
          disabled={option.disabled}
          className={option.className}
          style={option.style}
        />
      ))}
    </div>
  );
}

export default RadioCardGroup;
