import React from 'react';

export interface DotGridProps {
  /**
   * Total number of dots to display
   * @default 16
   */
  total?: 8 | 16;
  
  /**
   * Number of fully used dots
   * @default 0
   */
  used?: number;
  
  /**
   * Number of mixed (partially used) dots
   * @default 0
   */
  mixed?: number;
  
  /**
   * Size of each dot
   * @default "md"
   */
  size?: 'sm' | 'md';
}

/**
 * DotGrid - Visual status indicator with colored dots showing allocated/used/mixed states
 * 
 * Uses design system tokens:
 * - Used: var(--status-used) - sky-900
 * - Mixed: var(--status-used) + var(--bg-tertiary)
 * - Allocated: var(--bg-tertiary)
 */
export function DotGrid({
  total = 16,
  used = 0,
  mixed = 0,
  size = 'md',
}: DotGridProps) {
  const allocated = total - used - mixed;
  
  // Calculate width based on total dots
  // 16px dot + 4px gap = 20px per dot
  // For 8 dots: 4 dots per row = 4 * 20 - 4 = 76px
  // For 16 dots: 8 dots per row = 8 * 20 - 4 = 156px
  const width = total === 8 ? '76px' : '156px';
  
  const dotSize = size === 'sm' ? '14px' : '16px';
  
  return (
    <div 
      className="flex flex-wrap items-center gap-1" 
      style={{ width }}
      role="img"
      aria-label={`${used} used, ${mixed} mixed, ${allocated} allocated out of ${total} total`}
    >
      {/* Used dots */}
      {Array.from({ length: used }).map((_, i) => (
        <div
          key={`used-${i}`}
          className="overflow-hidden relative shrink-0"
          style={{
            width: dotSize,
            height: dotSize,
            borderRadius: 'var(--radius-sm-ds)',
            backgroundColor: 'var(--bg-tertiary)',
          }}
        >
          <div
            className="absolute left-0 top-0"
            style={{
              width: dotSize,
              height: dotSize,
              backgroundColor: 'var(--status-used)',
            }}
          />
        </div>
      ))}
      
      {/* Mixed dots (half used, half allocated) */}
      {Array.from({ length: mixed }).map((_, i) => (
        <div
          key={`mixed-${i}`}
          className="overflow-hidden relative shrink-0"
          style={{
            width: dotSize,
            height: dotSize,
            borderRadius: 'var(--radius-sm-ds)',
            backgroundColor: 'var(--bg-tertiary)',
          }}
        >
          <div
            className="absolute left-0"
            style={{
              width: dotSize,
              height: `calc(${dotSize} / 2)`,
              bottom: 0,
              backgroundColor: 'var(--status-used)',
            }}
          />
        </div>
      ))}
      
      {/* Allocated dots */}
      {Array.from({ length: allocated }).map((_, i) => (
        <div
          key={`allocated-${i}`}
          className="shrink-0"
          style={{
            width: dotSize,
            height: dotSize,
            borderRadius: 'var(--radius-sm-ds)',
            backgroundColor: 'var(--bg-tertiary)',
          }}
        />
      ))}
    </div>
  );
}
