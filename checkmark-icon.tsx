// ============================================================================
//  CHECKMARK ICON — Green checkmark indicator
//  T1 · Atom
//
//  A simple checkmark SVG icon for selection/approval states.
//  Used to indicate items that are selected, approved, or completed.
//
//  All style values use CSS custom properties from theme.css.
// ============================================================================
import React from "react";

export interface CheckmarkIconProps {
  /** Size in pixels (default: 18) */
  size?: number;
  /** Color (default: var(--primary)) */
  color?: string;
  /** Additional CSS class */
  className?: string;
  /** Custom styles */
  style?: React.CSSProperties;
}

export function CheckmarkIcon({
  size = 18,
  color = "var(--primary)",
  className,
  style,
}: CheckmarkIconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 20 13"
      fill="none"
      className={className}
      style={{
        display: "block",
        flexShrink: 0,
        ...style,
      }}
    >
      <path
        d="M1.5 6.5L7 12L18.5 0.5"
        stroke={color}
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default CheckmarkIcon;
