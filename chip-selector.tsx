// ============================================================================
//  CHIP SELECTOR — Group of ChipButton atoms for multi-select
//  T2 · Molecule
//
//  Manages a group of ChipButton atoms for single or multi-selection.
//  Used for GPU accelerator selection (L4, T4, H100, etc.).
//
//  Combines: Multiple ChipButton atoms in wrapped layout
//  All style values use CSS custom properties from theme.css.
// ============================================================================
import React, { useState } from "react";
import { ChipButton } from "./chip-button";

export interface ChipOption {
  /** Chip value */
  value: string;
  /** Chip label */
  label: string;
  /** Optional icon */
  icon?: React.ReactNode;
  /** Disabled state */
  disabled?: boolean;
}

export interface ChipSelectorProps {
  /** Array of chip options */
  options: ChipOption[];
  /** Selected value(s) */
  value?: string | string[];
  /** Selection mode */
  mode?: "single" | "multiple";
  /** Change handler */
  onChange?: (value: string | string[]) => void;
  /** Size variant */
  size?: "sm" | "md" | "lg";
  /** Additional CSS class */
  className?: string;
  /** Custom styles */
  style?: React.CSSProperties;
}

export function ChipSelector({
  options,
  value: controlledValue,
  mode = "single",
  onChange,
  size = "md",
  className,
  style,
}: ChipSelectorProps) {
  const [internalValue, setInternalValue] = useState<string | string[]>(
    mode === "multiple" ? [] : (options[0]?.value || "")
  );
  
  const value = controlledValue !== undefined ? controlledValue : internalValue;

  const handleChipClick = (chipValue: string) => {
    let newValue: string | string[];

    if (mode === "multiple") {
      const currentValues = Array.isArray(value) ? value : [];
      newValue = currentValues.includes(chipValue)
        ? currentValues.filter((v) => v !== chipValue)
        : [...currentValues, chipValue];
    } else {
      newValue = chipValue;
    }

    if (controlledValue === undefined) {
      setInternalValue(newValue);
    }
    onChange?.(newValue);
  };

  const isSelected = (chipValue: string): boolean => {
    if (mode === "multiple") {
      return Array.isArray(value) && value.includes(chipValue);
    }
    return value === chipValue;
  };

  return (
    <div
      className={className}
      style={{
        display: "flex",
        alignItems: "center",
        gap: "var(--space-2)",
        flexWrap: "wrap",
        ...style,
      }}
    >
      {options.map((option) => (
        <ChipButton
          key={option.value}
          selected={isSelected(option.value)}
          onClick={() => handleChipClick(option.value)}
          disabled={option.disabled}
          size={size}
          icon={option.icon}
        >
          {option.label}
        </ChipButton>
      ))}
    </div>
  );
}

export default ChipSelector;
