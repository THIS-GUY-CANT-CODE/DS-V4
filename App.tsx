// ============================================================================
//  APP — Root component with React Router Data Mode
//  All UI uses CSS custom properties from theme.css (Layer 2/3 tokens).
//  Typography: Inter (--font-family-primary), DM Sans (--font-family-display),
//              Cousine (--font-family-mono).
// ============================================================================
import React from "react";
import { RouterProvider } from "react-router";
import { router } from "./routes";
import "../styles/index.css";

function LoadingFallback() {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "100vh",
        background: "var(--bg-secondary, #f5f7fa)",
        fontFamily: "var(--font-family-primary, Inter, sans-serif)",
        color: "var(--fg-tertiary, #717784)",
        fontSize: "14px",
        gap: "12px",
      }}
    >
      <span>Loading Design System…</span>
    </div>
  );
}

// Top-level error boundary to catch any uncaught render errors
class ErrorBoundary extends React.Component<
  { children: React.ReactNode },
  { hasError: boolean; error: Error | null }
> {
  constructor(props: { children: React.ReactNode }) {
    super(props);
    this.state = { hasError: false, error: null };
  }
  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error };
  }
  render() {
    if (this.state.hasError) {
      return (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            minHeight: "100vh",
            gap: "16px",
            fontFamily: "Inter, system-ui, sans-serif",
            padding: "32px",
            background: "#f5f7fa",
          }}
        >
          <span style={{ fontSize: "24px", fontWeight: 600, color: "#0e121b" }}>
            Render Error
          </span>
          <pre
            style={{
              background: "#fff",
              border: "1px solid #e1e4ea",
              borderRadius: "8px",
              padding: "16px",
              maxWidth: "600px",
              overflow: "auto",
              fontSize: "13px",
              color: "#d92d20",
              whiteSpace: "pre-wrap",
              wordBreak: "break-word",
            }}
          >
            {this.state.error?.message}
          </pre>
          <button
            onClick={() => window.location.reload()}
            style={{
              padding: "8px 20px",
              borderRadius: "8px",
              background: "#0e9384",
              color: "#fff",
              border: "none",
              cursor: "pointer",
              fontSize: "14px",
            }}
          >
            Reload
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}

export default function App() {
  return (
    <ErrorBoundary>
      <RouterProvider router={router} fallbackElement={<LoadingFallback />} />
    </ErrorBoundary>
  );
}