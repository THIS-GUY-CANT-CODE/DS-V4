// ============================================================================
//  MODEL CARD DETAILED — Model card with description and tags
//  T3 · Organism
//
//  Enhanced model card showing logo, name, family, description, and feature tags.
//  Used in model marketplaces, catalogs, or detailed listings.
//
//  Built from: Card, ModelHeader, TagGroup
//
//  All style values use CSS custom properties from theme.css.
//  Typography: Inter (--font-family-primary).
// ============================================================================
import React from "react";
import { Card, CardContent } from "./card";
import { ModelHeader } from "./model-header";
import { TagGroup, TagItem } from "./tag-group";

export interface ModelCardDetailedProps {
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
  /** Model description */
  description?: string;
  /** Feature/capability tags */
  tags?: TagItem[];
  /** Click handler */
  onClick?: () => void;
  /** Additional CSS class */
  className?: string;
  /** Custom styles */
  style?: React.CSSProperties;
}

export function ModelCardDetailed({
  logo,
  logoFallback,
  name,
  family,
  verified = false,
  description,
  tags = [],
  onClick,
  className,
  style,
}: ModelCardDetailedProps) {
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
          display: "flex",
          flexDirection: "column",
          gap: "var(--space-4)",
        }}
      >
        {/* Header */}
        <ModelHeader
          logo={logo}
          logoFallback={logoFallback}
          name={name}
          subtitle={family}
          verified={verified}
        />

        {/* Description */}
        {description && (
          <p
            style={{
              margin: 0,
              fontFamily: "var(--font-family-primary)",
              fontSize: "var(--text-caption)",
              fontWeight: "var(--font-weight-normal)" as any,
              lineHeight: "var(--line-height-sm)",
              color: "var(--fg-secondary)",
              letterSpacing: "var(--letter-spacing-body)",
            }}
          >
            {description}
          </p>
        )}

        {/* Tags */}
        {tags.length > 0 && <TagGroup tags={tags} />}
      </CardContent>
    </Card>
  );
}

export default ModelCardDetailed;