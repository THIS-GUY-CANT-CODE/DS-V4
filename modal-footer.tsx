// ============================================================================
//  MODAL FOOTER — Modal action buttons (Save + Cancel)
//  T2 · Molecule
//
//  Modal dialog footer with primary and secondary action buttons. Follows
//  Ant Design modal patterns with proper spacing and alignment.
//
//  Combines: Primary Button + Secondary Button with proper spacing
//  All style values use CSS custom properties from theme.css.
// ============================================================================
import React from "react";
import { Button } from "./button";

export interface ModalFooterProps {
  /** Primary button label */
  primaryLabel?: string;
  /** Primary button handler */
  onPrimary?: () => void;
  /** Primary button loading state */
  primaryLoading?: boolean;
  /** Primary button disabled state */
  primaryDisabled?: boolean;
  /** Secondary button label */
  secondaryLabel?: string;
  /** Secondary button handler */
  onSecondary?: () => void;
  /** Secondary button disabled state */
  secondaryDisabled?: boolean;
  /** Button alignment */
  align?: "left" | "center" | "right";
  /** Additional CSS class */
  className?: string;
  /** Custom styles */
  style?: React.CSSProperties;
}

export function ModalFooter({
  primaryLabel = "Save",
  onPrimary,
  primaryLoading = false,
  primaryDisabled = false,
  secondaryLabel = "Cancel",
  onSecondary,
  secondaryDisabled = false,
  align = "right",
  className,
  style,
}: ModalFooterProps) {
  const alignmentStyles = {
    left: "flex-start",
    center: "center",
    right: "flex-end",
  };

  return (
    <div
      className={className}
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: alignmentStyles[align],
        gap: "var(--space-3)",
        padding: "var(--space-4) var(--space-6) var(--space-6) var(--space-6)",
        borderTop: "var(--border-width-thin) solid var(--border-default)",
        background: "var(--bg-primary)",
        ...style,
      }}
    >
      {/* Secondary Button */}
      {secondaryLabel && (
        <Button
          variant="outline"
          onClick={onSecondary}
          disabled={secondaryDisabled}
        >
          {secondaryLabel}
        </Button>
      )}

      {/* Primary Button */}
      {primaryLabel && (
        <Button
          variant="default"
          onClick={onPrimary}
          disabled={primaryDisabled || primaryLoading}
        >
          {primaryLoading ? "Loading..." : primaryLabel}
        </Button>
      )}
    </div>
  );
}

export default ModalFooter;
