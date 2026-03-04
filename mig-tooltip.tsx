// ============================================================================
//  MIG TOOLTIP — GPU Multi-Instance GPU information tooltip
//  All style values use CSS custom properties from theme.css (Layer 2/3).
//  Typography: Inter (--font-family-primary), DM Sans (--font-family-display).
// ============================================================================
import * as React from "react";

export interface MIGProfile {
  id: string;
  memory: string;
}

export interface MIGTooltipProps {
  /** GPU model name (e.g., "NVIDIA A100") */
  gpuName: string;
  /** Total MIG instances */
  migCount: number;
  /** Number of instances in use */
  inUseCount: number;
  /** Array of in-use MIG profiles */
  inUseProfiles: MIGProfile[];
  /** Array of allocated (available) MIG profiles */
  allocatedProfiles: MIGProfile[];
}

function MIGTooltip({
  gpuName,
  migCount,
  inUseCount,
  inUseProfiles,
  allocatedProfiles,
}: MIGTooltipProps) {
  return (
    <div
      style={{
        background: "var(--bg-primary)",
        border: "var(--border-width-thin) solid var(--border-default)",
        borderRadius: "var(--radius-lg-ds)",
        padding: "var(--space-3)",
        display: "flex",
        flexDirection: "column",
        gap: "var(--space-2)",
        boxShadow: "var(--shadow-md)",
        minWidth: 195,
      }}
    >
      {/* Header: GPU name + MIG count */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: "var(--space-2)",
        }}
      >
        <div
          style={{
            fontFamily: "var(--font-family-primary)",
            fontSize: "var(--text-base)",
            fontWeight: "var(--font-weight-medium)" as any,
            color: "var(--fg-primary)",
            letterSpacing: "var(--letter-spacing-body)",
            lineHeight: "var(--line-height-md)",
          }}
        >
          {gpuName}
        </div>
        <div
          style={{
            fontFamily: "var(--font-family-primary)",
            fontSize: "var(--text-caption)",
            fontWeight: "var(--font-weight-medium)" as any,
            color: "var(--fg-primary)",
            lineHeight: "var(--line-height-xs)",
          }}
        >
          {migCount} MIG
        </div>
      </div>

      {/* In-use profiles */}
      {inUseProfiles.length > 0 && (
        <div style={{ display: "flex", gap: "var(--space-2)", alignItems: "flex-start" }}>
          <div
            style={{
              width: 4,
              alignSelf: "stretch",
              background: "var(--status-used)",
              borderRadius: "var(--radius-sm-ds)",
              flexShrink: 0,
            }}
          />
          <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-2)", flex: 1 }}>
            {inUseProfiles.map((profile, idx) => (
              <div
                key={`used-${idx}`}
                style={{
                  fontFamily: "var(--font-family-primary)",
                  fontSize: "var(--text-caption)",
                  fontWeight: "var(--font-weight-normal)" as any,
                  color: "var(--fg-primary)",
                  lineHeight: "var(--line-height-xs)",
                }}
              >
                {profile.memory}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Allocated (available) profiles */}
      {allocatedProfiles.length > 0 && (
        <div style={{ display: "flex", gap: "var(--space-2)", alignItems: "flex-start" }}>
          <div
            style={{
              width: 4,
              alignSelf: "stretch",
              background: "var(--bg-tertiary)",
              borderRadius: "var(--radius-sm-ds)",
              flexShrink: 0,
            }}
          />
          <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-2)", flex: 1 }}>
            {allocatedProfiles.map((profile, idx) => (
              <div
                key={`alloc-${idx}`}
                style={{
                  fontFamily: "var(--font-family-primary)",
                  fontSize: "var(--text-caption)",
                  fontWeight: "var(--font-weight-normal)" as any,
                  color: "var(--fg-primary)",
                  lineHeight: "var(--line-height-xs)",
                }}
              >
                {profile.memory}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Footer: in-use count */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "var(--space-1)",
          paddingTop: "var(--space-1)",
        }}
      >
        <span
          style={{
            fontFamily: "var(--font-family-primary)",
            fontSize: "var(--text-caption)",
            fontWeight: "var(--font-weight-medium)" as any,
            color: "var(--status-used)",
            lineHeight: "var(--line-height-xs)",
          }}
        >
          {inUseCount}
        </span>
        <span
          style={{
            fontFamily: "var(--font-family-primary)",
            fontSize: "var(--text-caption)",
            fontWeight: "var(--font-weight-normal)" as any,
            color: "var(--status-used)",
            lineHeight: "var(--line-height-xs)",
          }}
        >
          In use
        </span>
      </div>
    </div>
  );
}

MIGTooltip.displayName = "MIGTooltip";

export { MIGTooltip };
