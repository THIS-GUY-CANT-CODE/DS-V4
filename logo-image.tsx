// ============================================================================
//  LOGO IMAGE — Logo/brand image container
//  T1 · Atom
//
//  Container for logo or brand images with consistent sizing and spacing.
//  Supports different sizes and aspect ratios.
//
//  All style values use CSS custom properties from theme.css.
// ============================================================================
import React from "react";

export interface LogoImageProps {
  /** Image source */
  src: string;
  /** Alt text */
  alt: string;
  /** Size variant */
  size?: "sm" | "md" | "lg" | "xl";
  /** Additional CSS class */
  className?: string;
  /** Custom styles */
  style?: React.CSSProperties;
}

export function LogoImage({
  src,
  alt,
  size = "md",
  className,
  style,
}: LogoImageProps) {
  const sizes = {
    sm: "16px",
    md: "24px",
    lg: "32px",
    xl: "48px",
  };

  return (
    <img
      src={src}
      alt={alt}
      className={className}
      style={{
        height: sizes[size],
        width: "auto",
        objectFit: "contain",
        display: "block",
        ...style,
      }}
    />
  );
}

export default LogoImage;
