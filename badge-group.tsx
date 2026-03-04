// ============================================================================
//  BADGE GROUP — Group of badges with overflow indicator
//  T1 · Atom
//
//  Displays a horizontal group of badges with an optional overflow indicator
//  showing "+N more" when badges exceed the max count.
//
//  All style values use CSS custom properties from theme.css.
//  Typography: Inter (--font-family-primary).
// ============================================================================
import React from "react";
import { Badge } from "./badge";

export interface BadgeGroupProps {
  /** Array of badge labels */
  items: string[];
  /** Maximum badges to show before overflow */
  maxVisible?: number;
  /** Badge variant */
  variant?: "default" | "secondary" | "outline" | "destructive";
  /** Additional CSS class */
  className?: string;
  /** Custom styles */
  style?: React.CSSProperties;
}

export function BadgeGroup({
  items,
  maxVisible = 3,
  variant = "secondary",
  className,
  style,
}: BadgeGroupProps) {
  const visibleItems = items.slice(0, maxVisible);
  const overflowCount = items.length - maxVisible;

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
      {visibleItems.map((item, index) => (
        <Badge key={index} variant={variant}>
          {item}
        </Badge>
      ))}
      {overflowCount > 0 && (
        <Badge
          variant="outline"
          style={{
            fontFamily: "var(--font-family-primary)",
            fontSize: "var(--text-caption)",
            color: "var(--fg-tertiary)",
          }}
        >
          +{overflowCount} more
        </Badge>
      )}
    </div>
  );
}

export default BadgeGroup;
