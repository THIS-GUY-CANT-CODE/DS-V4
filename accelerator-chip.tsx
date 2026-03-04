// ============================================================================
//  ACCELERATOR CHIP — Chip with brand logo (NVIDIA, AMD, etc.)
//  T2 · Molecule
//
//  Selectable chip button with brand logo icon. Used for GPU accelerator
//  selection (NVIDIA L4, AMD, Intel, etc.).
//
//  Combines: ChipButton + LogoImage positioned inside
//  All style values use CSS custom properties from theme.css.
//  Typography: Inter (--font-family-primary).
// ============================================================================
import React from "react";
import { ChipButton } from "./chip-button";
import { LogoImage } from "./logo-image";

export interface AcceleratorChipProps {
  /** Accelerator label (e.g., "L4", "H100") */
  label: string;
  /** Brand logo URL (optional) */
  logoSrc?: string;
  /** Brand logo alt text */
  logoAlt?: string;
  /** Selected state */
  selected?: boolean;
  /** Click handler */
  onClick?: () => void;
  /** Disabled state */
  disabled?: boolean;
  /** Size variant */
  size?: "sm" | "md" | "lg";
  /** Additional CSS class */
  className?: string;
  /** Custom styles */
  style?: React.CSSProperties;
}

export function AcceleratorChip({
  label,
  logoSrc,
  logoAlt = "Brand logo",
  selected = false,
  onClick,
  disabled = false,
  size = "md",
  className,
  style,
}: AcceleratorChipProps) {
  const logoSizes = {
    sm: "sm" as const,
    md: "sm" as const,
    lg: "md" as const,
  };

  return (
    <ChipButton
      selected={selected}
      onClick={onClick}
      disabled={disabled}
      size={size}
      className={className}
      style={style}
      icon={
        logoSrc ? (
          <LogoImage
            src={logoSrc}
            alt={logoAlt}
            size={logoSizes[size]}
          />
        ) : undefined
      }
    >
      {label}
    </ChipButton>
  );
}

export default AcceleratorChip;
