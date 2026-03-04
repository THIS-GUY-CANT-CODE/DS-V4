// ============================================================================
//  INPUT WITH BUTTON — Input field with attached button
//  T2 · Molecule
//
//  Input field with an attached button for actions like search, clear, or
//  submit. Button can be positioned on left or right side.
//
//  Combines: Input + IconButton aligned together
//  All style values use CSS custom properties from theme.css.
// ============================================================================
import React from "react";
import { Input } from "./input";
import { IconButton } from "./icon-button";

export interface InputWithButtonProps {
  /** Input value */
  value?: string;
  /** Placeholder text */
  placeholder?: string;
  /** Input type */
  type?: "text" | "email" | "search" | "url";
  /** Button position */
  buttonPosition?: "left" | "right";
  /** Button icon */
  buttonIcon: React.ReactNode;
  /** Button click handler */
  onButtonClick?: () => void;
  /** Input change handler */
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  /** Input blur handler */
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
  /** Disabled state */
  disabled?: boolean;
  /** Additional CSS class */
  className?: string;
  /** Custom styles */
  style?: React.CSSProperties;
}

export function InputWithButton({
  value,
  placeholder,
  type = "text",
  buttonPosition = "right",
  buttonIcon,
  onButtonClick,
  onChange,
  onBlur,
  disabled = false,
  className,
  style,
}: InputWithButtonProps) {
  return (
    <div
      className={className}
      style={{
        position: "relative",
        display: "flex",
        alignItems: "center",
        width: "100%",
        ...style,
      }}
    >
      {/* Input Field */}
      <Input
        type={type}
        value={value}
        placeholder={placeholder}
        onChange={onChange}
        onBlur={onBlur}
        disabled={disabled}
        style={{
          paddingRight: buttonPosition === "right" ? "var(--space-10)" : undefined,
          paddingLeft: buttonPosition === "left" ? "var(--space-10)" : undefined,
        }}
      />

      {/* Button */}
      <IconButton
        variant="ghost"
        size="sm"
        onClick={onButtonClick}
        disabled={disabled}
        style={{
          position: "absolute",
          [buttonPosition]: "var(--space-2)",
          top: "50%",
          transform: "translateY(-50%)",
        }}
      >
        {buttonIcon}
      </IconButton>
    </div>
  );
}

export default InputWithButton;
