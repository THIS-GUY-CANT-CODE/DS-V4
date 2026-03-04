// ============================================================================
//  FORM FIELD — Complete form field with label, input, helper, error
//  T2 · Molecule
//
//  Complete form field combining label, input, optional helper text, and
//  error message. Follows Ant Design form patterns.
//
//  Combines: Label + Input + helper text + error message
//  All style values use CSS custom properties from theme.css.
//  Typography: Inter (--font-family-primary).
// ============================================================================
import React from "react";
import { Label } from "./label";
import { Input } from "./input";

export interface FormFieldProps {
  /** Field label */
  label?: string;
  /** Field name/ID */
  name: string;
  /** Input type */
  type?: "text" | "email" | "password" | "number" | "url" | "tel";
  /** Input value */
  value?: string;
  /** Placeholder text */
  placeholder?: string;
  /** Helper text below input */
  helperText?: string;
  /** Error message */
  error?: string;
  /** Required field indicator */
  required?: boolean;
  /** Disabled state */
  disabled?: boolean;
  /** Change handler */
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  /** Blur handler */
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
  /** Additional CSS class */
  className?: string;
  /** Custom styles */
  style?: React.CSSProperties;
}

export function FormField({
  label,
  name,
  type = "text",
  value,
  placeholder,
  helperText,
  error,
  required = false,
  disabled = false,
  onChange,
  onBlur,
  className,
  style,
}: FormFieldProps) {
  const hasError = Boolean(error);

  return (
    <div
      className={className}
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "var(--space-2)",
        ...style,
      }}
    >
      {/* Label */}
      {label && (
        <Label
          htmlFor={name}
          style={{
            fontFamily: "var(--font-family-primary)",
            fontSize: "var(--text-base)",
            fontWeight: "var(--font-weight-medium)" as any,
            color: "var(--fg-primary)",
            lineHeight: "var(--line-height-md)",
          }}
        >
          {label}
          {required && (
            <span
              style={{
                color: "var(--fg-error)",
                marginLeft: "var(--space-1)",
              }}
            >
              *
            </span>
          )}
        </Label>
      )}

      {/* Input */}
      <Input
        id={name}
        name={name}
        type={type}
        value={value}
        placeholder={placeholder}
        disabled={disabled}
        onChange={onChange}
        onBlur={onBlur}
        style={{
          borderColor: hasError ? "var(--border-error)" : undefined,
          ...(hasError && {
            boxShadow: "0 0 0 1px var(--border-error)",
          }),
        }}
      />

      {/* Helper Text or Error */}
      {(helperText || error) && (
        <span
          style={{
            fontFamily: "var(--font-family-primary)",
            fontSize: "var(--text-caption)",
            fontWeight: "var(--font-weight-normal)" as any,
            color: hasError ? "var(--fg-error)" : "var(--fg-tertiary)",
            lineHeight: "var(--line-height-sm)",
          }}
        >
          {error || helperText}
        </span>
      )}
    </div>
  );
}

export default FormField;
