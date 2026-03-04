/**
 * Rich Tooltip Component (MIG Profile Tooltip)
 * 
 * CLASSIFICATION: T2 · MOLECULE
 * 
 * A specialized card-based tooltip for displaying GPU MIG profile information
 * with status indicators. This is a compound component built from multiple atoms.
 * 
 * ATOMIC COMPOSITION:
 * - Card: Container with border var(--border-default), radius var(--radius-md-ds), 
 *         shadow var(--shadow-md), padding var(--space-3)
 * - Typography: Title text (font-weight-medium, text-base) + subtitle (text-caption)
 * - StatusIndicator: 4px wide color bars with border-radius var(--radius-sm-ds)
 *   - Used profiles: var(--status-used) sky blue (#18658B)
 *   - Available profiles: var(--border-default) gray
 * - List: Profile name items with consistent spacing var(--space-2)
 * - Link text: Footer "X In use" in var(--status-used) color
 * - CSS Triangle Arrow: 8px arrow using var(--size-arrow-md)
 * 
 * Features:
 * - White card with shadow and border
 * - Structured content with color-coded indicators
 * - Configurable tail/arrow pointer position (top or bottom)
 * - All styling uses CSS custom properties from theme.css
 * 
 * Based on Figma design system import.
 */

import * as React from "react";

export interface MigProfile {
  name: string;
  used?: boolean;
}

export interface RichTooltipProps {
  /** GPU model name */
  title: string;
  /** MIG configuration (e.g., "8 MIG") */
  subtitle?: string;
  /** List of MIG profiles with usage status */
  usedProfiles: MigProfile[];
  /** List of available MIG profiles */
  availableProfiles: MigProfile[];
  /** Number of profiles currently in use */
  inUseCount?: number;
  /** Additional CSS classes */
  className?: string;
  /** Position of the tail/arrow */
  tailPosition?: "top" | "bottom";
}

export function RichTooltip({
  title,
  subtitle,
  usedProfiles = [],
  availableProfiles = [],
  inUseCount,
  tailPosition = "bottom",
  className = "",
}: RichTooltipProps) {
  return (
    <div 
      className={`flex flex-col items-center relative ${className}`}
      data-name="RichTooltip"
      style={{
        width: "fit-content",
      }}
    >
      {/* Tail on top - CSS triangle pointing up */}
      {tailPosition === "top" && (
        <div 
          style={{
            width: 0,
            height: 0,
            borderLeft: "var(--size-arrow-md) solid transparent",
            borderRight: "var(--size-arrow-md) solid transparent",
            borderBottom: "var(--size-arrow-md) solid var(--bg-primary)",
            filter: "drop-shadow(0 -1px 0 var(--border-default))",
            marginBottom: "-1px",
          }}
        />
      )}

      {/* Main tooltip card */}
      <div 
        className="flex flex-col items-start relative"
        data-name="Tooltip"
        style={{
          backgroundColor: "var(--bg-primary)",
          borderRadius: "var(--radius-md-ds)",
          gap: "var(--space-3)",
          padding: "var(--space-3)",
        }}
      >
        <div 
          aria-hidden="true" 
          className="absolute pointer-events-none"
          style={{
            border: "1px solid var(--border-default)",
            borderRadius: "13px",
            boxShadow: "var(--shadow-md)",
            inset: "-1px",
          }}
        />
        
        <div 
          className="flex flex-col items-start relative shrink-0"
          style={{
            gap: "var(--space-2)",
            width: "195px",
          }}
        >
          {/* Header: Title + Subtitle */}
          <div 
            className="flex items-center relative shrink-0 w-full"
            style={{
              gap: "var(--space-2)",
            }}
          >
            <div className="flex flex-col items-start min-h-px min-w-px relative flex-1">
              <div className="flex items-center justify-center relative shrink-0 w-full">
                <div className="flex flex-row items-center self-stretch flex-1">
                  <div 
                    className="flex items-center min-h-px min-w-px relative flex-1"
                    data-name="Container"
                  >
                    <div 
                      className="flex flex-col justify-center relative min-h-px min-w-px flex-1"
                      style={{
                        fontFamily: "var(--font-family-primary)",
                        fontWeight: "var(--font-weight-medium)",
                        fontSize: "var(--text-base)",
                        color: "var(--fg-primary)",
                        lineHeight: "var(--line-height-md)",
                      }}
                    >
                      {title}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {subtitle && (
              <div 
                className="flex items-center justify-center relative shrink-0"
                data-name="Info"
              >
                <div 
                  className="flex flex-col justify-center relative shrink-0 whitespace-nowrap"
                  style={{
                    fontFamily: "var(--font-family-primary)",
                    fontWeight: "var(--font-weight-medium)",
                    fontSize: "var(--text-caption)",
                    color: "var(--fg-primary)",
                    lineHeight: "var(--line-height-xs)",
                  }}
                >
                  {subtitle}
                </div>
              </div>
            )}
          </div>

          {/* Used profiles section */}
          {usedProfiles.length > 0 && (
            <div 
              className="flex items-center relative shrink-0"
              style={{
                gap: "var(--space-2)",
              }}
            >
              <div className="flex flex-row items-center self-stretch">
                <div 
                  className="relative shrink-0"
                  style={{
                    backgroundColor: "var(--status-used)",
                    height: "100%",
                    borderRadius: "var(--radius-sm-ds)",
                    width: "4px",
                  }}
                />
              </div>
              <div 
                className="flex flex-col items-start justify-center relative shrink-0"
                style={{
                  gap: "var(--space-2)",
                  width: "154px",
                }}
              >
                {usedProfiles.map((profile, idx) => (
                  <div 
                    key={idx}
                    className="flex flex-col items-start relative shrink-0"
                  >
                    <div className="flex items-center relative shrink-0">
                      <div 
                        className="flex flex-col justify-center relative shrink-0 whitespace-nowrap"
                        style={{
                          fontFamily: "var(--font-family-primary)",
                          fontWeight: "var(--font-weight-normal)",
                          fontSize: "var(--text-caption)",
                          color: "var(--fg-primary)",
                          lineHeight: "var(--line-height-xs)",
                        }}
                      >
                        {profile.name}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Available profiles section */}
          {availableProfiles.length > 0 && (
            <div 
              className="flex items-center relative shrink-0"
              style={{
                gap: "var(--space-2)",
              }}
            >
              <div className="flex flex-row items-center self-stretch">
                <div 
                  className="relative shrink-0"
                  style={{
                    backgroundColor: "var(--border-default)",
                    height: "100%",
                    borderRadius: "var(--radius-sm-ds)",
                    width: "4px",
                  }}
                />
              </div>
              <div 
                className="flex flex-col items-start justify-center relative shrink-0"
                style={{
                  gap: "var(--space-2)",
                  width: "154px",
                }}
              >
                {availableProfiles.map((profile, idx) => (
                  <div 
                    key={idx}
                    className="flex flex-col items-start relative shrink-0"
                  >
                    <div className="flex items-center relative shrink-0">
                      <div 
                        className="flex flex-col justify-center relative shrink-0 whitespace-nowrap"
                        style={{
                          fontFamily: "var(--font-family-primary)",
                          fontWeight: "var(--font-weight-normal)",
                          fontSize: "var(--text-caption)",
                          color: "var(--fg-primary)",
                          lineHeight: "var(--line-height-xs)",
                        }}
                      >
                        {profile.name}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Footer: In use count */}
          {inUseCount !== undefined && (
            <div className="flex items-start relative shrink-0 w-full">
              <div className="flex items-center min-h-px min-w-px relative flex-1">
                <div 
                  className="flex items-center justify-center relative shrink-0 whitespace-nowrap"
                  data-name="Info"
                  style={{
                    gap: "var(--space-1)",
                    color: "var(--status-used)",
                    fontSize: "var(--text-caption)",
                  }}
                >
                  <div 
                    className="flex flex-col justify-center relative shrink-0"
                    style={{
                      fontFamily: "var(--font-family-primary)",
                      fontWeight: "var(--font-weight-medium)",
                      lineHeight: "var(--line-height-xs)",
                    }}
                  >
                    {inUseCount}
                  </div>
                  <span 
                    className="relative shrink-0"
                    style={{
                      fontFamily: "var(--font-family-primary)",
                      fontWeight: "var(--font-weight-normal)",
                      lineHeight: "var(--line-height-xs)",
                    }}
                  >
                    In use
                  </span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Tail on bottom - CSS triangle pointing down */}
      {tailPosition === "bottom" && (
        <div 
          style={{
            width: 0,
            height: 0,
            borderLeft: "var(--size-arrow-md) solid transparent",
            borderRight: "var(--size-arrow-md) solid transparent",
            borderTop: "var(--size-arrow-md) solid var(--bg-primary)",
            filter: "drop-shadow(0 1px 0 var(--border-default))",
            marginTop: "-1px",
          }}
        />
      )}
    </div>
  );
}