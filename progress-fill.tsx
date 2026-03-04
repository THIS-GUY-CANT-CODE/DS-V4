// ============================================================================
//  PROGRESS FILL — Animated fill bar for progress visualization
//  GPU visualization atom — animated fill bar with smooth transitions.
//  All style values use CSS custom properties from theme.css (Layer 2/3).
//  Uses --status-allocated (light blue) and --status-used (dark blue) colors.
// ============================================================================
import * as React from "react";

export type ProgressFillVariant = "used" | "allocated" | "brand" | "success" | "warning" | "error";

const progressFillColors: Record<ProgressFillVariant, string> = {
  used: "var(--status-used)",
  allocated: "var(--status-allocated)",
  brand: "var(--bg-brand)",
  success: "var(--status-healthy)",
  warning: "var(--status-warning)",
  error: "var(--status-unhealthy)",
};

export interface ProgressFillProps {
  /** Fill percentage (0-100) */
  value: number;
  /** Total capacity (default 100) */
  total?: number;
  /** Fill color variant */
  variant?: ProgressFillVariant;
  /** Height of the progress bar */
  height?: number | string;
  /** Whether to show the fill on a transparent or solid background track */
  showTrack?: boolean;
  /** Custom CSS properties */
  style?: React.CSSProperties;
  /** Additional className */
  className?: string;
}

const ProgressFill = React.forwardRef<HTMLDivElement, ProgressFillProps>(
  (
    {
      value,
      total = 100,
      variant = "brand",
      height = 16,
      showTrack = true,
      style,
      className,
    },
    ref
  ) => {
    const percent = Math.max(0, Math.min(100, (value / total) * 100));

    return (
      <div
        ref={ref}
        className={className}
        style={{
          height: typeof height === "number" ? `${height}px` : height,
          background: showTrack ? "var(--bg-tertiary)" : "transparent",
          borderRadius: "var(--radius-sm-ds)",
          position: "relative",
          overflow: "hidden",
          width: "100%",
          ...style,
        }}
      >
        <div
          style={{
            position: "absolute",
            left: 0,
            top: 0,
            height: "100%",
            width: `${percent}%`,
            background: progressFillColors[variant],
            borderRadius: "var(--radius-sm-ds)",
            transition: "width var(--duration-slow) var(--ease-default)",
          }}
        />
      </div>
    );
  }
);

ProgressFill.displayName = "ProgressFill";

export { ProgressFill };