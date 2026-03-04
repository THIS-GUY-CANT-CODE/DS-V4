import React from 'react';
import { Button } from './button';

export interface CopyButtonProps {
  /**
   * Click handler for copy action
   */
  onCopy?: () => void;
  
  /**
   * Text to display in tooltip/aria-label
   * @default "Copy"
   */
  label?: string;
  
  /**
   * Whether the button is disabled
   * @default false
   */
  disabled?: boolean;
}

/**
 * CopyButton - Small icon button with copy icon
 * 
 * Uses design system tokens for compact button styling
 */
export function CopyButton({
  onCopy,
  label = 'Copy',
  disabled = false,
}: CopyButtonProps) {
  return (
    <button
      type="button"
      onClick={onCopy}
      disabled={disabled}
      aria-label={label}
      className="flex items-center justify-center overflow-hidden shrink-0"
      style={{
        width: 'var(--size-control-md)',
        height: 'var(--size-control-md)',
        padding: 'var(--space-half)',
        borderRadius: 'var(--radius-sm-ds)',
        border: 'none',
        backgroundColor: 'transparent',
        cursor: disabled ? 'not-allowed' : 'pointer',
        transition: 'all var(--duration-fast) var(--ease-out)',
        boxShadow: 'var(--shadow-xs)',
      }}
    >
      <div 
        className="overflow-hidden relative shrink-0"
        style={{ width: 'var(--size-icon-sm)', height: 'var(--size-icon-sm)' }}
      >
        <div className="absolute" style={{ inset: '10% 15%' }}>
          <svg 
            className="absolute block w-full h-full" 
            fill="none" 
            preserveAspectRatio="none" 
            viewBox="0 0 11.2 12.8"
          >
            <path 
              d="M5.2 0H8.3025C8.62 0 8.925 0.1275 9.15 0.3525L10.8475 2.05C11.0725 2.275 11.2 2.58 11.2 2.8975V8.4C11.2 9.0625 10.6625 9.6 10 9.6H5.2C4.5375 9.6 4 9.0625 4 8.4V1.2C4 0.5375 4.5375 0 5.2 0ZM1.2 3.2H3.2V4.8H1.6V11.2H6.4V10.4H8V11.6C8 12.2625 7.4625 12.8 6.8 12.8H1.2C0.5375 12.8 0 12.2625 0 11.6V4.4C0 3.7375 0.5375 3.2 1.2 3.2Z" 
              fill="var(--icon-tertiary)" 
            />
          </svg>
        </div>
      </div>
    </button>
  );
}
