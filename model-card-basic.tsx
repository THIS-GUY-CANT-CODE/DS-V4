// ============================================================================
//  MODEL CARD BASIC — Simple model card with header only
//  T3 · Organism
//
//  Basic card variant showing model logo, name, family, and verified status.
//  Minimal presentation for model listings or compact grids.
//
//  Built from: Card, ModelHeader
//
//  All style values use CSS custom properties from theme.css.
//  Typography: Inter (--font-family-primary).
// ============================================================================
import React from "react";
import { Card, CardContent } from "./card";
import { ModelHeader } from "./model-header";

export interface ModelCardBasicProps {
  /** Model logo source */
  logo?: string;
  /** Logo fallback text */
  logoFallback?: string;
  /** Model name */
  name: string;
  /** Family/type subtitle */
  family?: string;
  /** Verified badge */
  verified?: boolean;
  /** Click handler */
  onClick?: () => void;
  /** Additional CSS class */
  className?: string;
  /** Custom styles */
  style?: React.CSSProperties;
}

export function ModelCardBasic({
  logo,
  logoFallback,
  name,
  family,
  verified = false,
  onClick,
  className,
  style,
}: ModelCardBasicProps) {
  return (
    <Card
      className={className}
      style={{
        cursor: onClick ? "pointer" : "default",
        transition: "all var(--duration-fast) var(--ease-default)",
        ...style,
      }}
      onClick={onClick}
      data-card
    >
      <CardContent
        style={{
          padding: "var(--space-4)",
        }}
      >
        <ModelHeader
          logo={logo}
          logoFallback={logoFallback}
          name={name}
          subtitle={family}
          verified={verified}
        />
      </CardContent>
    </Card>
  );
}

export default ModelCardBasic;