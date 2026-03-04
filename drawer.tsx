// ============================================================================
//  DRAWER — Slide-in panel component with 3 sizes
//  T3 · Organism
//
//  A drawer that slides in from the right edge with smooth animations,
//  backdrop blur, focus trapping, and keyboard support.
//
//  Micro-interactions:
//    • Backdrop fades in (opacity 0 → 1, 200ms)
//    • Drawer slides in from right (translateX 100% → 0, 300ms with ease-out)
//    • Sequential animation (backdrop first, drawer 50ms after)
//    • ESC key closes drawer
//    • Click outside closes drawer
//    • Focus trap when open
//    • Body scroll lock when open
//    • Smooth close animations (reverse of open)
//    • Button hover/press states (handled by global.css)
//
//  All style values use CSS custom properties from theme.css.
//  Typography: Inter (--font-family-primary), DM Sans (--font-family-display).
// ============================================================================
import React, { useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import svgPaths from "../../../imports/svg-dj80tahus9";
import { IconButton } from "./icon-button";

/* ── Types ─────────────────────────────────────────────────���─── */

export type DrawerSize = "sm" | "md" | "lg";

export interface DrawerProps {
  /** Whether the drawer is open */
  open: boolean;
  
  /** Callback fired when the drawer should close */
  onClose: () => void;
  
  /** Drawer width size variant */
  size?: DrawerSize;
  
  /** Title displayed in the header */
  title?: string;
  
  /** Optional description below the title */
  description?: string;
  
  /** Whether to show the back button */
  showBackButton?: boolean;
  
  /** Callback fired when back button is clicked */
  onBack?: () => void;
  
  /** Whether to show the close button (X) */
  showCloseButton?: boolean;
  
  /** Main content area */
  children: React.ReactNode;
  
  /** Optional footer content (typically action buttons) */
  footer?: React.ReactNode;
  
  /** Whether clicking the backdrop should close the drawer */
  closeOnBackdropClick?: boolean;
  
  /** Whether pressing ESC should close the drawer */
  closeOnEscape?: boolean;
  
  /** Custom className for the drawer panel */
  className?: string;
}

/* ── Size mappings ───────────────────────────────────────────── */

const DRAWER_WIDTHS: Record<DrawerSize, string> = {
  sm: "var(--drawer-width-sm)", // 320px
  md: "var(--drawer-width-md)", // 480px
  lg: "var(--drawer-width-lg)", // 640px
};

/* ── Component ───────────────────────────────────────────────── */

export function Drawer({
  open,
  onClose,
  size = "md",
  title,
  description,
  showBackButton = false,
  onBack,
  showCloseButton = true,
  children,
  footer,
  closeOnBackdropClick = true,
  closeOnEscape = true,
  className,
}: DrawerProps) {
  const drawerRef = useRef<HTMLDivElement>(null);

  // ── Lock body scroll when drawer is open ────────────────────
  useEffect(() => {
    if (open) {
      const originalOverflow = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = originalOverflow;
      };
    }
  }, [open]);

  // ── Close on ESC key ────────────────────────────────────────
  useEffect(() => {
    if (!open || !closeOnEscape) return;
    
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };
    
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [open, closeOnEscape, onClose]);

  // ── Focus trap ──────────────────────────────────────────────
  useEffect(() => {
    if (!open || !drawerRef.current) return;

    const drawer = drawerRef.current;
    const focusableElements = drawer.querySelectorAll<HTMLElement>(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    const firstElement = focusableElements[0];
    const lastElement = focusableElements[focusableElements.length - 1];

    // Focus first element when drawer opens
    firstElement?.focus();

    const handleTabKey = (e: KeyboardEvent) => {
      if (e.key !== "Tab") return;

      if (e.shiftKey) {
        if (document.activeElement === firstElement) {
          e.preventDefault();
          lastElement?.focus();
        }
      } else {
        if (document.activeElement === lastElement) {
          e.preventDefault();
          firstElement?.focus();
        }
      }
    };

    document.addEventListener("keydown", handleTabKey);
    return () => document.removeEventListener("keydown", handleTabKey);
  }, [open]);

  // ── Backdrop click handler ──────────────────────────────────
  const handleBackdropClick = (e: React.MouseEvent) => {
    if (closeOnBackdropClick && e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <AnimatePresence>
      {open && (
        <>
          {/* ── BACKDROP ──────────────────────────────────────── */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{
              duration: 0.2,
              ease: [0.33, 1, 0.68, 1], // var(--ease-out)
            }}
            onClick={handleBackdropClick}
            style={{
              position: "fixed",
              inset: 0,
              background: "var(--drawer-overlay-bg)",
              backdropFilter: "blur(var(--overlay-blur, 4px))",
              WebkitBackdropFilter: "blur(var(--overlay-blur, 4px))",
              zIndex: "var(--z-drawer-overlay)" as any,
            }}
            aria-hidden="true"
          />

          {/* ── DRAWER PANEL ──────────────────────────────────── */}
          <motion.div
            ref={drawerRef}
            role="dialog"
            aria-modal="true"
            aria-label={title}
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{
              duration: 0.3,
              ease: [0.33, 1, 0.68, 1], // var(--ease-out)
              delay: 0.05, // Slight delay after backdrop starts
            }}
            className={className}
            style={{
              position: "fixed",
              top: 0,
              right: 0,
              bottom: 0,
              width: DRAWER_WIDTHS[size],
              background: "var(--bg-primary)",
              boxShadow: "var(--shadow-xl)",
              zIndex: "var(--z-drawer)" as any,
              display: "flex",
              flexDirection: "column",
              fontFamily: "var(--font-family-primary)",
            }}
          >
            {/* ── HEADER ────────────────────────────────────────── */}
            <div
              style={{
                flexShrink: 0,
                borderBottom: "var(--border-width-thin) solid var(--border-default)",
                padding: "var(--space-4) var(--space-5)",
                background: "var(--bg-primary)",
              }}
            >
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "var(--space-1)",
                }}
              >
                {/* Top row: back button, title, close button */}
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "var(--space-1)",
                    height: "var(--size-control-sm)",
                  }}
                >
                  {/* Back button */}
                  {showBackButton && onBack && (
                    <IconButton
                      onClick={onBack}
                      aria-label="Go back"
                      variant="outline"
                      icon={
                        <svg
                          width="20"
                          height="20"
                          viewBox="0 0 20 20"
                          fill="none"
                          style={{ display: "block" }}
                        >
                          <path
                            d={svgPaths.pc950f00}
                            fill="currentColor"
                            transform="translate(4, 5)"
                          />
                        </svg>
                      }
                    />
                  )}

                  {/* Title */}
                  {title && (
                    <h2
                      style={{
                        flex: 1,
                        margin: 0,
                        fontFamily: "var(--font-family-primary)",
                        fontSize: "var(--text-lg)",
                        fontWeight: "var(--font-weight-medium)" as any,
                        color: "var(--fg-primary)",
                        lineHeight: "var(--line-height-lg)",
                        letterSpacing: "var(--letter-spacing-heading)",
                      }}
                    >
                      {title}
                    </h2>
                  )}

                  {/* Close button */}
                  {showCloseButton && (
                    <IconButton
                      onClick={onClose}
                      aria-label="Close drawer"
                      variant="outline"
                      icon={
                        <svg
                          width="20"
                          height="20"
                          viewBox="0 0 20 20"
                          fill="none"
                          style={{ display: "block" }}
                        >
                          <path
                            d={svgPaths.p31847f10}
                            fill="currentColor"
                            transform="translate(5, 5)"
                          />
                        </svg>
                      }
                      style={{ marginLeft: "auto" }}
                    />
                  )}
                </div>

                {/* Description */}
                {description && (
                  <p
                    style={{
                      margin: 0,
                      fontFamily: "var(--font-family-primary)",
                      fontSize: "var(--text-caption)",
                      color: "var(--fg-secondary)",
                      lineHeight: "var(--line-height-sm)",
                    }}
                  >
                    {description}
                  </p>
                )}
              </div>
            </div>

            {/* ── BODY (scrollable content) ──────────────────────── */}
            <div
              style={{
                flex: 1,
                overflowY: "auto",
                overflowX: "hidden",
                padding: "var(--space-5)",
              }}
            >
              {children}
            </div>

            {/* ── FOOTER ────────────────────────────────────────── */}
            {footer && (
              <div
                style={{
                  flexShrink: 0,
                  borderTop: "var(--border-width-thin) solid var(--border-default)",
                  padding: "var(--space-4) var(--space-5)",
                  background: "var(--bg-primary)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "flex-end",
                  gap: "var(--space-3)",
                }}
              >
                {footer}
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

/* ── DrawerFooter convenience component ──────────────────────── */

export interface DrawerFooterProps {
  /** Cancel button label */
  cancelLabel?: string;
  
  /** Primary action button label */
  primaryLabel?: string;
  
  /** Cancel button click handler */
  onCancel?: () => void;
  
  /** Primary action button click handler */
  onPrimary?: () => void;
  
  /** Whether the primary button is disabled */
  primaryDisabled?: boolean;
  
  /** Whether the primary button is in loading state */
  primaryLoading?: boolean;
  
  /** Additional content before the buttons */
  children?: React.ReactNode;
}

export function DrawerFooter({
  cancelLabel = "Cancel",
  primaryLabel = "Save",
  onCancel,
  onPrimary,
  primaryDisabled = false,
  primaryLoading = false,
  children,
}: DrawerFooterProps) {
  return (
    <>
      {children}
      <div
        style={{
          display: "flex",
          gap: "var(--space-3)",
          marginLeft: "auto",
        }}
      >
        {/* Cancel button */}
        {onCancel && (
          <button
            type="button"
            onClick={onCancel}
            style={{
              padding: "var(--space-2) var(--space-4)",
              borderRadius: "var(--radius-md-ds)",
              border: "var(--border-width-thin) solid var(--border-default)",
              background: "var(--bg-primary)",
              color: "var(--fg-secondary)",
              fontFamily: "var(--font-family-primary)",
              fontSize: "var(--text-base)",
              fontWeight: "var(--font-weight-medium)" as any,
              cursor: "pointer",
              boxShadow: "var(--shadow-xs)",
            }}
          >
            {cancelLabel}
          </button>
        )}

        {/* Primary action button */}
        {onPrimary && (
          <button
            type="button"
            onClick={onPrimary}
            disabled={primaryDisabled || primaryLoading}
            style={{
              padding: "var(--space-2) var(--space-4)",
              borderRadius: "var(--radius-md-ds)",
              border: "none",
              background: primaryDisabled
                ? "var(--bg-disabled)"
                : "var(--bg-brand)",
              color: "var(--fg-inverse)",
              fontFamily: "var(--font-family-primary)",
              fontSize: "var(--text-base)",
              fontWeight: "var(--font-weight-medium)" as any,
              cursor: primaryDisabled ? "not-allowed" : "pointer",
              opacity: primaryDisabled ? 0.5 : 1,
            }}
          >
            {primaryLoading ? "Saving..." : primaryLabel}
          </button>
        )}
      </div>
    </>
  );
}

export default Drawer;