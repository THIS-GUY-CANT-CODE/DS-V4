// ============================================================================
//  MODAL HEADER — Modal dialog header with title and close button
//  T1 · Atom
//
//  Standard header for modal dialogs featuring a title and close button.
//  Includes bottom border separator.
//
//  All style values use CSS custom properties from theme.css.
//  Typography: Inter (--font-family-primary), DM Sans (--font-family-display).
// ============================================================================
import React from "react";

export interface ModalHeaderProps {
  /** Header title */
  title: string;
  /** Close handler */
  onClose?: () => void;
  /** Additional CSS class */
  className?: string;
  /** Custom styles */
  style?: React.CSSProperties;
}

export function ModalHeader({
  title,
  onClose,
  className,
  style,
}: ModalHeaderProps) {
  return (
    <div
      className={className}
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "var(--space-6) var(--space-6) var(--space-4) var(--space-6)",
        borderBottom: "var(--border-width-thin) solid var(--border-default)",
        background: "var(--bg-primary)",
        ...style,
      }}
    >
      <h2
        style={{
          fontFamily: "var(--font-family-display)",
          fontSize: "var(--text-title)",
          fontWeight: "var(--font-weight-semibold)" as any,
          color: "var(--fg-primary)",
          lineHeight: "var(--line-height-lg)",
          margin: 0,
        }}
      >
        {title}
      </h2>

      {onClose && (
        <button
          type="button"
          onClick={onClose}
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: "var(--space-6)",
            height: "var(--space-6)",
            padding: 0,
            border: "none",
            background: "transparent",
            color: "var(--fg-tertiary)",
            cursor: "pointer",
            borderRadius: "var(--radius-sm-ds)",
            transition: "color var(--duration-fast) var(--ease-out), background-color var(--duration-fast) var(--ease-out)",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.color = "var(--fg-primary)";
            e.currentTarget.style.background = "var(--bg-secondary)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.color = "var(--fg-tertiary)";
            e.currentTarget.style.background = "transparent";
          }}
        >
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>
      )}
    </div>
  );
}

export default ModalHeader;
