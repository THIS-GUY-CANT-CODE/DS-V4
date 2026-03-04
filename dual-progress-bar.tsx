import React from 'react';

export interface DualProgressBarProps {
  /**
   * Value for allocated progress (0-100)
   * @default 0
   */
  allocated?: number;
  
  /**
   * Value for used progress (0-100)
   * @default 0
   */
  used?: number;
  
  /**
   * Label text displayed above bars
   */
  label?: string;
  
  /**
   * Subtext displayed on the right
   */
  subtext?: string;
}

/**
 * DualProgressBar - Two-bar progress indicator showing allocated vs used
 * 
 * Uses design system tokens:
 * - Track: var(--bg-tertiary)
 * - Allocated bar: var(--status-allocated) - sky-500
 * - Used bar: var(--status-used) - sky-900
 */
export function DualProgressBar({
  allocated = 0,
  used = 0,
  label = 'Text',
  subtext = 'Sub-text',
}: DualProgressBarProps) {
  return (
    <div className="flex flex-col w-full" style={{ gap: 'var(--space-1)' }}>
      {/* Header with label and subtext */}
      <div className="flex items-center justify-between w-full">
        <div
          style={{
            fontFamily: 'var(--font-family-primary)',
            fontSize: 'var(--text-base)',
            fontWeight: 'var(--font-weight-medium)',
            lineHeight: 'var(--line-height-md)',
            color: 'var(--fg-primary)',
            letterSpacing: 'var(--letter-spacing-body)',
          }}
        >
          {label}
        </div>
        <div
          className="overflow-hidden text-ellipsis"
          style={{
            fontFamily: 'var(--font-family-primary)',
            fontSize: 'var(--text-caption)',
            fontWeight: 'var(--font-weight-normal)',
            lineHeight: 'var(--line-height-xs)',
            color: 'var(--fg-secondary)',
            width: '54px',
          }}
        >
          {subtext}
        </div>
      </div>
      
      {/* Progress bars container */}
      <div className="flex flex-col relative w-full" style={{ gap: 'var(--space-half)' }}>
        {/* Allocated bar (top) */}
        <div
          className="h-4 overflow-hidden relative w-full"
          style={{
            borderRadius: 'var(--radius-sm-ds)',
            backgroundColor: 'var(--bg-tertiary)',
          }}
          role="progressbar"
          aria-valuenow={allocated}
          aria-valuemin={0}
          aria-valuemax={100}
          aria-label={`Allocated: ${allocated}%`}
        >
          <div
            className="absolute h-4 left-0 top-0"
            style={{
              width: `${allocated}%`,
              borderRadius: 'var(--radius-sm-ds)',
              backgroundColor: 'var(--status-allocated)',
            }}
          />
        </div>
        
        {/* Used bar (bottom) */}
        <div
          className="absolute left-0 top-0"
          style={{
            width: `${used}%`,
            height: '16px',
            borderRadius: 'var(--radius-sm-ds)',
            backgroundColor: 'var(--status-used)',
          }}
          role="progressbar"
          aria-valuenow={used}
          aria-valuemin={0}
          aria-valuemax={100}
          aria-label={`Used: ${used}%`}
        />
      </div>
    </div>
  );
}
