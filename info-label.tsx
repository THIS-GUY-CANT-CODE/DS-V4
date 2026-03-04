// ============================================================================
//  INFO LABEL — Text label for profile/capacity information
//  GPU visualization atom — small text label with semantic color variants.
//  All style values use CSS custom properties from theme.css (Layer 2/3).
//  Typography: Inter (--font-family-primary).
//  Used in MIGTooltip for memory profile labels.
// ============================================================================
import * as React from "react";

export type InfoLabelColor = "primary" | "secondary" | "tertiary" | "brand" | "used" | "allocated";

const infoLabelColors: Record<InfoLabelColor, string> = {
  primary: "var(--fg-primary)",
  secondary: "var(--fg-secondary)",
  tertiary: "var(--fg-tertiary)",
  brand: "var(--fg-brand)",
  used: "var(--status-used)",
  allocated: "var(--fg-secondary)",
};

export interface InfoLabelProps {
  /** Label text content */
  children: React.ReactNode;
  /** Text color variant */
  color?: InfoLabelColor;
  /** Font weight */
  weight?: "normal" | "medium" | "semibold";
  /** Font size variant */
  size?: "micro" | "caption" | "base";
  /** Custom CSS properties */
  style?: React.CSSProperties;
  /** Additional className */
  className?: string;
}

const InfoLabel = React.forwardRef<HTMLDivElement, InfoLabelProps>(
  ({ children, color = "primary", weight = "normal", size = "caption", style, className }, ref) => {
    const fontSizes = {
      micro: "var(--text-micro)",
      caption: "var(--text-caption)",
      base: "var(--text-base)",
    };

    const fontWeights = {
      normal: "var(--font-weight-normal)",
      medium: "var(--font-weight-medium)",
      semibold: "var(--font-weight-semibold)",
    };

    const lineHeights = {
      micro: "var(--line-height-xs)",
      caption: "var(--line-height-xs)",
      base: "var(--line-height-md)",
    };

    return (
      <div
        ref={ref}
        className={className}
        style={{
          fontFamily: "var(--font-family-primary)",
          fontSize: fontSizes[size],
          fontWeight: fontWeights[weight] as any,
          color: infoLabelColors[color],
          lineHeight: lineHeights[size],
          ...style,
        }}
      >
        {children}
      </div>
    );
  }
);

InfoLabel.displayName = "InfoLabel";

export { InfoLabel };
