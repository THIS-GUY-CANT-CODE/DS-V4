// ============================================================================
//  NOTEBOOK CREATION MODAL — Complete modal dialog for creating notebooks
//  T3 · Organism
//
//  Full-featured modal dialog combining multiple molecules and atoms for
//  creating new notebooks. Features:
//  - Tabbed interface (Basic/Advanced)
//  - Form validation
//  - CPU/GPU selection with conditional accelerator chips
//  - Keyboard navigation and accessibility
//
//  Combines: ModalHeader + TabMenuHorizontal + FormField + RadioCardGroup +
//            ChipSelector + ModalFooter
//  All style values use CSS custom properties from theme.css.
//  Typography: Inter (--font-family-primary).
// ============================================================================
import React, { useState } from "react";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import {
  Dialog,
  DialogContent,
  DialogOverlay,
  DialogPortal,
} from "./dialog";
import { ModalHeader } from "./modal-header";
import { TabMenuHorizontal } from "./tab-menu-horizontal";
import { FormField } from "./form-field";
import { RadioCardGroup } from "./radio-card-group";
import { ChipSelector } from "./chip-selector";
import { ModalFooter } from "./modal-footer";

export interface NotebookFormData {
  name: string;
  description: string;
  domain: string;
  processor: "cpu" | "gpu";
  accelerators: string[];
}

export interface NotebookCreationModalProps {
  /** Modal open state */
  open?: boolean;
  /** Open state change handler */
  onOpenChange?: (open: boolean) => void;
  /** Form submit handler */
  onSubmit?: (data: NotebookFormData) => void;
  /** Cancel handler */
  onCancel?: () => void;
  /** Initial form data */
  initialData?: Partial<NotebookFormData>;
}

export function NotebookCreationModal({
  open = false,
  onOpenChange,
  onSubmit,
  onCancel,
  initialData,
}: NotebookCreationModalProps) {
  const [activeTab, setActiveTab] = useState<string>("basic");
  const [formData, setFormData] = useState<NotebookFormData>({
    name: initialData?.name || "",
    description: initialData?.description || "",
    domain: initialData?.domain || "",
    processor: initialData?.processor || "cpu",
    accelerators: initialData?.accelerators || [],
  });
  const [errors, setErrors] = useState<Partial<Record<keyof NotebookFormData, string>>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleFieldChange = (field: keyof NotebookFormData, value: any) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[field];
        return newErrors;
      });
    }
  };

  const validateForm = (): boolean => {
    const newErrors: Partial<Record<keyof NotebookFormData, string>> = {};

    if (!formData.name.trim()) {
      newErrors.name = "Notebook name is required";
    }

    if (activeTab === "advanced") {
      if (!formData.domain.trim()) {
        newErrors.domain = "Domain is required in advanced mode";
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (!validateForm()) return;

    setIsSubmitting(true);
    
    // Simulate async operation
    setTimeout(() => {
      onSubmit?.(formData);
      setIsSubmitting(false);
      handleClose();
    }, 500);
  };

  const handleClose = () => {
    onOpenChange?.(false);
    // Reset form after close animation
    setTimeout(() => {
      setFormData({
        name: "",
        description: "",
        domain: "",
        processor: "cpu",
        accelerators: [],
      });
      setErrors({});
      setActiveTab("basic");
    }, 200);
  };

  const handleCancel = () => {
    onCancel?.();
    handleClose();
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogPortal>
        <DialogOverlay
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(10, 13, 20, 0.5)",
            backdropFilter: "blur(4px)",
            zIndex: 50,
          }}
        />
        <DialogPrimitive.Content
          style={{
            position: "fixed",
            left: "50%",
            top: "50%",
            transform: "translate(-50%, -50%)",
            width: "90vw",
            maxWidth: "600px",
            maxHeight: "90vh",
            overflowY: "auto",
            background: "var(--bg-primary)",
            borderRadius: "var(--radius-xl-ds)",
            boxShadow: "var(--shadow-2xl)",
            border: "var(--border-width-thin) solid var(--border-default)",
            zIndex: 51,
            display: "flex",
            flexDirection: "column",
          }}
        >
          {/* Header */}
          <ModalHeader
            title="New Notebook"
            onClose={handleClose}
            style={{
              borderBottom: "var(--border-width-thin) solid var(--border-default)",
            }}
          />

          {/* Tab Menu */}
          <div
            style={{
              padding: "0 var(--space-6)",
              background: "var(--bg-primary)",
            }}
          >
            <TabMenuHorizontal
              items={[
                { id: "basic", label: "Basic" },
                { id: "advanced", label: "Advanced" },
              ]}
              activeTab={activeTab}
              onTabChange={setActiveTab}
            />
          </div>

          {/* Form Content */}
          <div
            style={{
              padding: "var(--space-6)",
              display: "flex",
              flexDirection: "column",
              gap: "var(--space-5)",
              flex: 1,
              overflowY: "auto",
            }}
          >
            {/* Basic Tab Content */}
            {activeTab === "basic" && (
              <>
                <FormField
                  label="Notebook Name"
                  name="name"
                  type="text"
                  value={formData.name}
                  placeholder="My Notebook"
                  required
                  error={errors.name}
                  onChange={(e) => handleFieldChange("name", e.target.value)}
                />

                <FormField
                  label="Description"
                  name="description"
                  type="text"
                  value={formData.description}
                  placeholder="Optional description"
                  helperText="Add a brief description of this notebook"
                  onChange={(e) => handleFieldChange("description", e.target.value)}
                />

                <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-2)" }}>
                  <span
                    style={{
                      fontFamily: "var(--font-family-primary)",
                      fontSize: "var(--text-base)",
                      fontWeight: "var(--font-weight-medium)" as any,
                      color: "var(--fg-primary)",
                      lineHeight: "var(--line-height-md)",
                    }}
                  >
                    Processor Type
                  </span>
                  <RadioCardGroup
                    name="processor"
                    options={[
                      {
                        value: "cpu",
                        label: "CPU",
                        description: "Standard compute processor",
                      },
                      {
                        value: "gpu",
                        label: "GPU",
                        description: "Graphics processor for ML workloads",
                      },
                    ]}
                    value={formData.processor}
                    onChange={(value) => handleFieldChange("processor", value)}
                  />
                </div>

                {/* Accelerator Selection - Only shown when GPU is selected */}
                {formData.processor === "gpu" && (
                  <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-2)" }}>
                    <span
                      style={{
                        fontFamily: "var(--font-family-primary)",
                        fontSize: "var(--text-base)",
                        fontWeight: "var(--font-weight-medium)" as any,
                        color: "var(--fg-primary)",
                        lineHeight: "var(--line-height-md)",
                      }}
                    >
                      GPU Accelerator
                    </span>
                    <ChipSelector
                      mode="multiple"
                      options={[
                        { value: "l4", label: "L4" },
                        { value: "t4", label: "T4" },
                        { value: "a10g", label: "A10G" },
                        { value: "h100", label: "H100" },
                        { value: "v100", label: "V100" },
                      ]}
                      value={formData.accelerators}
                      onChange={(value) => handleFieldChange("accelerators", value)}
                    />
                  </div>
                )}
              </>
            )}

            {/* Advanced Tab Content */}
            {activeTab === "advanced" && (
              <>
                <FormField
                  label="Notebook Name"
                  name="name"
                  type="text"
                  value={formData.name}
                  placeholder="My Notebook"
                  required
                  error={errors.name}
                  onChange={(e) => handleFieldChange("name", e.target.value)}
                />

                <FormField
                  label="Description"
                  name="description"
                  type="text"
                  value={formData.description}
                  placeholder="Optional description"
                  onChange={(e) => handleFieldChange("description", e.target.value)}
                />

                <FormField
                  label="Domain"
                  name="domain"
                  type="text"
                  value={formData.domain}
                  placeholder="example.com"
                  required
                  error={errors.domain}
                  helperText="Specify the domain for this notebook"
                  onChange={(e) => handleFieldChange("domain", e.target.value)}
                />

                <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-2)" }}>
                  <span
                    style={{
                      fontFamily: "var(--font-family-primary)",
                      fontSize: "var(--text-base)",
                      fontWeight: "var(--font-weight-medium)" as any,
                      color: "var(--fg-primary)",
                      lineHeight: "var(--line-height-md)",
                    }}
                  >
                    Processor Type
                  </span>
                  <RadioCardGroup
                    name="processor-advanced"
                    options={[
                      {
                        value: "cpu",
                        label: "CPU",
                        description: "Standard compute processor",
                      },
                      {
                        value: "gpu",
                        label: "GPU",
                        description: "Graphics processor for ML workloads",
                      },
                    ]}
                    value={formData.processor}
                    onChange={(value) => handleFieldChange("processor", value)}
                  />
                </div>

                {/* Accelerator Selection - Only shown when GPU is selected */}
                {formData.processor === "gpu" && (
                  <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-2)" }}>
                    <span
                      style={{
                        fontFamily: "var(--font-family-primary)",
                        fontSize: "var(--text-base)",
                        fontWeight: "var(--font-weight-medium)" as any,
                        color: "var(--fg-primary)",
                        lineHeight: "var(--line-height-md)",
                      }}
                    >
                      GPU Accelerator
                    </span>
                    <ChipSelector
                      mode="multiple"
                      options={[
                        { value: "l4", label: "L4" },
                        { value: "t4", label: "T4" },
                        { value: "a10g", label: "A10G" },
                        { value: "h100", label: "H100" },
                        { value: "v100", label: "V100" },
                      ]}
                      value={formData.accelerators}
                      onChange={(value) => handleFieldChange("accelerators", value)}
                    />
                  </div>
                )}
              </>
            )}
          </div>

          {/* Footer */}
          <ModalFooter
            primaryLabel={isSubmitting ? "Creating..." : "Create Notebook"}
            secondaryLabel="Cancel"
            primaryLoading={isSubmitting}
            primaryDisabled={isSubmitting}
            onPrimary={handleSubmit}
            onSecondary={handleCancel}
          />
        </DialogPrimitive.Content>
      </DialogPortal>
    </Dialog>
  );
}

export default NotebookCreationModal;