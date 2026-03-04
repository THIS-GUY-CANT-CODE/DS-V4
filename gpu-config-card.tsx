// ============================================================================
//  GPU CONFIG CARD — GPU configuration card with MIG partition controls
//  T3 · Organism
//
//  Complex card for GPU/MIG configuration showing:
//  - GPU model header with counter control
//  - MIG Partitioning toggle with badge
//  - Multiple MIG partition rows with allocation visualization
//
//  Built from: Card, ModelHeader, ToggleWithLabel, MIGPartitionRow, MIGPartitionControl
//
//  All style values use CSS custom properties from theme.css.
//  Typography: Inter (--font-family-primary).
// ============================================================================
import React from "react";
import { Card, CardContent } from "./card";
import { ToggleWithLabel } from "./toggle-with-label";
import { MIGPartitionRow } from "./mig-partition-row";
import { MIGPartitionControl } from "./mig-partition-control";
import { StatusDotState } from "./status-dot";

export interface MIGPartitionConfig {
  /** Profile label (e.g., "1g.10gb") */
  profile: string;
  /** Dot states for visualization */
  dotStates: StatusDotState[];
  /** Current value */
  value: number;
  /** Maximum value */
  max: number;
}

export interface GPUConfigCardProps {
  /** GPU model name */
  gpuModel: string;
  /** GPU logo/icon */
  gpuLogo?: React.ReactNode;
  /** MIG partitioning enabled */
  migEnabled: boolean;
  /** Callback when MIG toggle changes */
  onMigToggle: (enabled: boolean) => void;
  /** MIG partition configurations */
  partitions?: MIGPartitionConfig[];
  /** Callback when partition value changes */
  onPartitionChange?: (profile: string, value: number) => void;
  /** Overall MIG instance control */
  totalInstances?: number;
  /** Max total instances */
  maxInstances?: number;
  /** Dot states for total instance grid */
  instanceDotStates?: StatusDotState[];
  /** Callback when total instances change */
  onTotalInstancesChange?: (value: number) => void;
  /** Grid columns for instance visualization */
  instanceGridColumns?: number;
  /** Additional CSS class */
  className?: string;
  /** Custom styles */
  style?: React.CSSProperties;
}

export function GPUConfigCard({
  gpuModel,
  gpuLogo,
  migEnabled,
  onMigToggle,
  partitions = [],
  onPartitionChange,
  totalInstances,
  maxInstances,
  instanceDotStates = [],
  onTotalInstancesChange,
  instanceGridColumns = 4,
  className,
  style,
}: GPUConfigCardProps) {
  return (
    <Card
      className={className}
      style={{
        ...style,
      }}
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
        {/* GPU Header with Logo and Overall Control */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "var(--space-2)",
            width: "100%",
          }}
        >
          {/* GPU Logo */}
          {gpuLogo && (
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                padding: "var(--space-2) var(--space-5-5)",
                background: "var(--bg-secondary)",
                borderRadius: "var(--radius-md-ds)",
                flexShrink: 0,
              }}
            >
              {gpuLogo}
            </div>
          )}

          {/* Overall MIG Instance Control (if provided) */}
          {totalInstances !== undefined &&
            maxInstances !== undefined &&
            onTotalInstancesChange && (
              <div style={{ flex: 1, minWidth: 0 }}>
                <div
                  style={{
                    width: "100%",
                    padding: "var(--space-3) 0",
                    border: "var(--border-width-thin) solid var(--border-default)",
                    borderRadius: "var(--radius-md-ds)",
                    background: "var(--bg-primary)",
                    position: "relative",
                  }}
                >
                  <div
                    style={{
                      position: "absolute",
                      top: "50%",
                      left: "50%",
                      transform: "translate(-50%, -50%)",
                      display: "flex",
                      alignItems: "center",
                      gap: "var(--space-6)",
                    }}
                  >
                    {/* Decrement button */}
                    <button
                      onClick={() =>
                        totalInstances > 0 &&
                        onTotalInstancesChange(totalInstances - 1)
                      }
                      disabled={totalInstances === 0}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        width: "var(--space-4)",
                        height: "var(--space-4)",
                        padding: "var(--space-px-5)",
                        borderRadius: "var(--radius-sm-ds)",
                        border: "none",
                        background: "transparent",
                        cursor: totalInstances === 0 ? "not-allowed" : "pointer",
                        boxShadow: "var(--shadow-xs)",
                      }}
                    >
                      <svg
                        width="11"
                        height="2"
                        viewBox="0 0 11.2 1.6"
                        fill="none"
                      >
                        <rect
                          width="11.2"
                          height="1.6"
                          fill="var(--fg-tertiary)"
                          rx="0.8"
                        />
                      </svg>
                    </button>

                    {/* Counter display */}
                    <span
                      style={{
                        fontFamily: "var(--font-family-primary)",
                        fontSize: "var(--text-base)",
                        fontWeight: "var(--font-weight-normal)" as any,
                        color: "var(--fg-primary)",
                        lineHeight: "var(--line-height-lg)",
                        whiteSpace: "nowrap",
                      }}
                    >
                      <span>{totalInstances} </span>
                      <span
                        style={{
                          color: "var(--fg-secondary)",
                          fontSize: "var(--text-caption)",
                        }}
                      >
                        / {maxInstances}
                      </span>
                    </span>

                    {/* Increment button */}
                    <button
                      onClick={() =>
                        totalInstances < maxInstances &&
                        onTotalInstancesChange(totalInstances + 1)
                      }
                      disabled={totalInstances === maxInstances}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        width: "var(--space-4)",
                        height: "var(--space-4)",
                        padding: "var(--space-px-5)",
                        borderRadius: "var(--radius-sm-ds)",
                        border: "none",
                        background: "transparent",
                        cursor:
                          totalInstances === maxInstances
                            ? "not-allowed"
                            : "pointer",
                        boxShadow: "var(--shadow-xs)",
                      }}
                    >
                      <svg
                        width="10"
                        height="10"
                        viewBox="0 0 10.4 10.4"
                        fill="none"
                      >
                        <path
                          d="M5.2 0.8V9.6M0.8 5.2H9.6"
                          stroke="var(--fg-tertiary)"
                          strokeWidth="1.6"
                          strokeLinecap="round"
                        />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            )}
        </div>

        {/* MIG Partitioning Toggle */}
        <ToggleWithLabel
          label="MIG Partitioning"
          badgeText="MIG"
          badgeVariant="default"
          checked={migEnabled}
          onCheckedChange={onMigToggle}
        />

        {/* MIG Partition Rows */}
        {migEnabled && partitions.length > 0 && (
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "var(--space-3)",
            }}
          >
            {partitions.map((partition, index) => (
              <MIGPartitionRow
                key={partition.profile + index}
                profileLabel={partition.profile}
                dotStates={partition.dotStates}
                value={partition.value}
                max={partition.max}
                onChange={(value) =>
                  onPartitionChange?.(partition.profile, value)
                }
              />
            ))}
          </div>
        )}

        {/* Total Instance Control with Grid (if provided) */}
        {migEnabled &&
          totalInstances !== undefined &&
          maxInstances !== undefined &&
          instanceDotStates.length > 0 &&
          onTotalInstancesChange && (
            <MIGPartitionControl
              value={totalInstances}
              max={maxInstances}
              onChange={onTotalInstancesChange}
              dotStates={instanceDotStates}
              gridColumns={instanceGridColumns}
            />
          )}
      </CardContent>
    </Card>
  );
}

export default GPUConfigCard;
