// ============================================================================
//  SHOWCASE PAGE — Design System documentation site
//  Component library showcase with sections for Tokens, Atoms, Molecules,
//  Organisms, and Templates. Route-driven active section.
//  All style values use CSS custom properties from theme.css.
//  Typography: Inter (--font-family-primary), DM Sans (--font-family-display),
//              Cousine (--font-family-mono).
// ============================================================================
import React from "react";
import { useLocation, Link } from "react-router";
import { TokenReferenceTable } from "../../docs/TokenTable";
import { AtomsShowcase } from "../../docs/AtomsShowcase";
import { MoleculesShowcase } from "../../docs/MoleculesShowcase";
import { OrganismsShowcase } from "../../docs/OrganismsShowcase";
import { SafeRender } from "../../docs/SafeRender";

// ─── Tab definition ───────────────────────────────────────────────────────────
type TabId = "tokens" | "atoms" | "molecules" | "organisms" | "templates";

interface TabDef {
  id:    TabId;
  tier:  string;
  label: string;
  count: number;
  desc:  string;
}

const TABS: TabDef[] = [
  { id: "tokens",    tier: "T0", label: "Tokens",    count: 100, desc: "Design tokens"         },
  { id: "atoms",     tier: "T1", label: "Atoms",     count: 57,  desc: "Primitive controls"    },
  { id: "molecules", tier: "T2", label: "Molecules",  count: 24,  desc: "Composed patterns"    },
  { id: "organisms", tier: "T3", label: "Organisms",  count: 20,  desc: "Section-level UI"     },
  { id: "templates", tier: "T4", label: "Templates",  count: 6,   desc: "Page layout skeletons"},
];

// ─── Tier arrow chain ─────────────────────────────────────────────────────────
function TierChain({ active }: { active: TabId }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: "var(--space-1)" }}>
      {TABS.map((tab, i) => {
        const isActive = tab.id === active;
        return (
          <div key={tab.id} style={{ display: "contents" }}>
            {i > 0 && (
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none" style={{ flexShrink: 0 }}>
                <path d="M4 2.5L8 6L4 9.5" stroke="var(--border-strong)" strokeWidth="1.5"
                  strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            )}
            <span style={{
              display: "inline-flex", alignItems: "center", gap: "var(--space-1)",
              padding: "var(--space-px) var(--space-2)",
              borderRadius: "var(--radius-sm-ds)",
              fontFamily: "var(--font-family-mono)",
              fontSize: "var(--text-micro)",
              fontWeight: isActive ? "var(--font-weight-semibold)" as any : "var(--font-weight-normal)" as any,
              background: isActive ? "var(--bg-brand-subtle)" : "transparent",
              color: isActive ? "var(--fg-brand)" : "var(--fg-disabled)",
              border: isActive
                ? `var(--border-width-thin) solid var(--teal-200)`
                : `var(--border-width-thin) solid transparent`,
              transition: `all var(--duration-fast) var(--ease-out)`,
            }}>
              {tab.tier}
              <span style={{
                fontFamily: "var(--font-family-primary)",
                color: isActive ? "var(--fg-brand)" : "var(--fg-disabled)",
              }}>
                {tab.label}
              </span>
            </span>
          </div>
        );
      })}
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
//  TEMPLATES TAB — Wireframe Diagrams
// ═══════════════════════════════════════════════════════════════════════════════

function WireframeBox({ label, style }: { label: string; style?: React.CSSProperties }) {
  return (
    <div style={{
      border: "2px dashed var(--border-default)",
      borderRadius: "var(--radius-sm-ds)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      padding: "var(--space-2)",
      background: "var(--bg-secondary)",
      fontFamily: "var(--font-family-mono)",
      fontSize: "var(--text-micro)",
      color: "var(--fg-tertiary)",
      ...style,
    }}>
      {label}
    </div>
  );
}

function TemplateCard({ title, description, children }: { title: string; description: string; children: React.ReactNode }) {
  return (
    <div style={{
      background: "var(--bg-primary)",
      border: "var(--border-width-thin) solid var(--border-default)",
      borderRadius: "var(--radius-md-ds)",
      overflow: "hidden",
      boxShadow: "var(--shadow-xs)",
    }}>
      <div style={{
        padding: "var(--space-4) var(--space-5)",
        borderBottom: "var(--border-width-thin) solid var(--border-default)",
        background: "var(--bg-secondary)",
      }}>
        <div style={{ fontFamily: "var(--font-family-display)", fontSize: "var(--text-base)", fontWeight: "var(--font-weight-semibold)" as any, color: "var(--fg-primary)" }}>
          {title}
        </div>
        <div style={{ fontFamily: "var(--font-family-primary)", fontSize: "var(--text-caption)", color: "var(--fg-secondary)", marginTop: "var(--space-half)" }}>
          {description}
        </div>
      </div>
      <div style={{ padding: "var(--space-5)" }}>
        {children}
      </div>
    </div>
  );
}

function TemplatesTab() {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-6)" }}>
      {/* TierHeader inline */}
      <div style={{
        borderRadius: "var(--radius-md-ds)",
        border: "var(--border-width-thin) solid var(--border-default)",
        overflow: "hidden", boxShadow: "var(--shadow-xs)",
      }}>
        <div style={{ height: 4, background: "linear-gradient(90deg, var(--primary) 0%, var(--teal-300) 60%, transparent 100%)" }} />
        <div style={{ padding: "var(--space-6)", background: "var(--bg-primary)", display: "flex", alignItems: "center", justifyContent: "space-between", gap: "var(--space-6)", flexWrap: "wrap" as const }}>
          <div style={{ display: "flex", alignItems: "center", gap: "var(--space-4)" }}>
            <div style={{ width: "var(--space-12)", height: "var(--space-12)", borderRadius: "var(--radius-sm-ds)", background: "var(--bg-brand-subtle)", border: "var(--border-width-thin) solid var(--border-brand-subtle)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
              <span style={{ fontFamily: "var(--font-family-mono)", fontSize: "var(--text-lg)", fontWeight: "var(--font-weight-bold)" as any, color: "var(--fg-brand)" }}>T4</span>
            </div>
            <div>
              <div style={{ fontFamily: "var(--font-family-display)", fontSize: "var(--font-size-xl)", fontWeight: "var(--font-weight-bold)" as any, color: "var(--fg-primary)" }}>Templates</div>
              <div style={{ fontFamily: "var(--font-family-primary)", fontSize: "var(--text-base)", color: "var(--fg-secondary)", marginTop: "var(--space-half)" }}>Page-level layout skeletons. Compose organisms into full views.</div>
            </div>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-half)" }}>
            <span style={{ fontFamily: "var(--font-family-mono)", fontSize: "var(--font-size-2xl)", fontWeight: "var(--font-weight-bold)" as any, color: "var(--fg-primary)" }}>6</span>
            <span style={{ fontFamily: "var(--font-family-primary)", fontSize: "var(--text-micro)", color: "var(--fg-tertiary)" }}>Templates</span>
          </div>
        </div>
      </div>

      {/* BaseTemplate */}
      <TemplateCard title="BaseTemplate" description="The root shell: collapsible sidebar + top header + scrollable main content area.">
        <div style={{ display: "flex", gap: "var(--space-2)", height: 200 }}>
          <WireframeBox label="Sidebar" style={{ width: 80, height: "100%" }} />
          <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: "var(--space-2)" }}>
            <WireframeBox label="Header" style={{ height: 36 }} />
            <WireframeBox label="Main Content" style={{ flex: 1 }} />
          </div>
        </div>
      </TemplateCard>

      {/* DashboardTemplate */}
      <TemplateCard title="DashboardTemplate" description="Dashboard layout: sidebar + top stats row + content grid + optional right panel.">
        <div style={{ display: "flex", gap: "var(--space-2)", height: 220 }}>
          <WireframeBox label="Sidebar" style={{ width: 80, height: "100%" }} />
          <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: "var(--space-2)" }}>
            <WireframeBox label="Header" style={{ height: 32 }} />
            <div style={{ display: "flex", gap: "var(--space-2)" }}>
              <WireframeBox label="Stat 1" style={{ flex: 1, height: 40 }} />
              <WireframeBox label="Stat 2" style={{ flex: 1, height: 40 }} />
              <WireframeBox label="Stat 3" style={{ flex: 1, height: 40 }} />
            </div>
            <div style={{ display: "flex", gap: "var(--space-2)", flex: 1 }}>
              <WireframeBox label="Content Grid" style={{ flex: 2 }} />
              <WireframeBox label="Right Panel" style={{ flex: 1 }} />
            </div>
          </div>
        </div>
      </TemplateCard>

      {/* TablePageTemplate */}
      <TemplateCard title="TablePageTemplate" description="Table page: header + toolbar (search/filter/sort) + scrollable table + pagination footer.">
        <div style={{ display: "flex", gap: "var(--space-2)", height: 220 }}>
          <WireframeBox label="Sidebar" style={{ width: 80, height: "100%" }} />
          <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: "var(--space-2)" }}>
            <WireframeBox label="Page Header" style={{ height: 32 }} />
            <WireframeBox label="Toolbar: Search | Filter | Sort" style={{ height: 36 }} />
            <WireframeBox label="Data Table" style={{ flex: 1 }} />
            <WireframeBox label="Pagination" style={{ height: 32 }} />
          </div>
        </div>
      </TemplateCard>

      {/* FormPageTemplate */}
      <TemplateCard title="FormPageTemplate" description="Form page: header + breadcrumb + centered form area + sticky action bar.">
        <div style={{ display: "flex", gap: "var(--space-2)", height: 220 }}>
          <WireframeBox label="Sidebar" style={{ width: 80, height: "100%" }} />
          <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: "var(--space-2)" }}>
            <WireframeBox label="Header" style={{ height: 32 }} />
            <WireframeBox label="Breadcrumb" style={{ height: 24 }} />
            <div style={{ flex: 1, display: "flex", justifyContent: "center", alignItems: "center" }}>
              <WireframeBox label="Centered Form" style={{ width: "60%", height: "80%" }} />
            </div>
            <WireframeBox label="Sticky Action Bar" style={{ height: 36 }} />
          </div>
        </div>
      </TemplateCard>

      {/* DetailPageTemplate */}
      <TemplateCard title="DetailPageTemplate" description="Detail page: breadcrumb + hero section + tabbed content area.">
        <div style={{ display: "flex", gap: "var(--space-2)", height: 220 }}>
          <WireframeBox label="Sidebar" style={{ width: 80, height: "100%" }} />
          <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: "var(--space-2)" }}>
            <WireframeBox label="Breadcrumb" style={{ height: 24 }} />
            <WireframeBox label="Hero Section" style={{ height: 64 }} />
            <WireframeBox label="Tab Bar" style={{ height: 32 }} />
            <WireframeBox label="Tabbed Content" style={{ flex: 1 }} />
          </div>
        </div>
      </TemplateCard>

      {/* EmptyStateTemplate */}
      <TemplateCard title="EmptyStateTemplate" description="Empty state: centred icon + heading + description + CTA button.">
        <div style={{ display: "flex", gap: "var(--space-2)", height: 200 }}>
          <WireframeBox label="Sidebar" style={{ width: 80, height: "100%" }} />
          <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: "var(--space-2)" }}>
            <WireframeBox label="Header" style={{ height: 32 }} />
            <div style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center" }}>
              <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "var(--space-2)" }}>
                <div style={{ width: 40, height: 40, borderRadius: "var(--radius-full)", border: "2px dashed var(--border-default)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <span style={{ fontFamily: "var(--font-family-mono)", fontSize: "var(--text-micro)", color: "var(--fg-tertiary)" }}>Icon</span>
                </div>
                <WireframeBox label="Heading" style={{ width: 120, height: 16 }} />
                <WireframeBox label="Description" style={{ width: 180, height: 12 }} />
                <WireframeBox label="CTA Button" style={{ width: 100, height: 28, background: "var(--bg-brand-subtle)" }} />
              </div>
            </div>
          </div>
        </div>
      </TemplateCard>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
//  SHOWCASE PAGE — Main export
// ═══════════════════════════════════════════════════════════════════════════════
export default function ShowcasePage() {
  const location = useLocation();

  // Derive active tab directly from URL — no useState needed.
  // This is always in sync with the router, no effect required.
  const pathSegment = location.pathname.replace(/^\//, "");
  const validTabs: TabId[] = ["tokens", "atoms", "molecules", "organisms", "templates"];
  const active: TabId = validTabs.includes(pathSegment as TabId) ? (pathSegment as TabId) : "tokens";

  const activeTab = TABS.find(t => t.id === active)!;

  return (
    <div style={{ background: "var(--bg-secondary)", minHeight: "100%" }}>
      {/* ═══ SHOWCASE HEADER ═══════════════════════════════════════════════ */}
      <div style={{
        background: "var(--bg-primary)",
        borderBottom: `var(--border-width-thin) solid var(--border-default)`,
      }}>
        <div style={{ maxWidth: "var(--layout-content-max)", margin: "0 auto", padding: "0 var(--space-6)" }}>

          {/* Row 1: tier chain + summary pills */}
          <div style={{
            display: "flex", alignItems: "center", justifyContent: "space-between",
            padding: "var(--space-3) 0", gap: "var(--space-4)",
          }}>
            <TierChain active={active} />
            <div style={{ display: "flex", alignItems: "center", gap: "var(--space-2)" }}>
              {TABS.map(tab => (
                <Link
                  key={tab.id}
                  to={`/${tab.id}`}
                  style={{
                    display: "inline-flex", alignItems: "baseline", gap: "var(--space-1)",
                    padding: "var(--space-half) var(--space-2)",
                    borderRadius: "var(--radius-sm-ds)",
                    background: tab.id === active ? "var(--bg-brand-subtle)" : "var(--bg-secondary)",
                    border: `var(--border-width-thin) solid ${tab.id === active ? "var(--teal-200)" : "var(--border-default)"}`,
                    textDecoration: "none",
                    transition: `all var(--duration-fast) var(--ease-out)`,
                  }}
                >
                  <span style={{
                    fontFamily: "var(--font-family-mono)",
                    fontSize: "var(--text-base)",
                    fontWeight: "var(--font-weight-bold)" as any,
                    color: tab.id === active ? "var(--fg-brand)" : "var(--fg-primary)",
                    lineHeight: "var(--line-height-none)",
                  }}>
                    {tab.count}
                  </span>
                  <span style={{
                    fontFamily: "var(--font-family-mono)",
                    fontSize: "var(--text-micro)",
                    color: tab.id === active ? "var(--fg-brand)" : "var(--fg-tertiary)",
                    lineHeight: "var(--line-height-none)",
                  }}>
                    {tab.label.toLowerCase()}
                  </span>
                </Link>
              ))}
            </div>
          </div>

          {/* Row 2: tabs */}
          <div style={{ display: "flex", alignItems: "flex-end", gap: 0, marginTop: "var(--space-1)" }}>
            {TABS.map(tab => {
              const isActive = tab.id === active;
              return (
                <Link
                  key={tab.id}
                  to={`/${tab.id}`}
                  style={{
                    display: "inline-flex", alignItems: "center", gap: "var(--space-2)",
                    padding: `var(--space-2) var(--space-4)`,
                    border: "none",
                    borderBottom: `var(--tab-border-width) solid ${isActive ? "var(--primary)" : "transparent"}`,
                    background: "transparent",
                    textDecoration: "none",
                    cursor: "pointer",
                    color: isActive ? "var(--fg-brand)" : "var(--fg-secondary)",
                    fontFamily: "var(--font-family-primary)",
                    fontSize: "var(--text-base)",
                    fontWeight: isActive ? "var(--font-weight-semibold)" as any : "var(--font-weight-normal)" as any,
                    marginBottom: "calc(-1 * var(--border-width-thin))",
                    outline: "none",
                    transition: `color var(--duration-fast) var(--ease-out), border-color var(--duration-fast) var(--ease-out)`,
                    whiteSpace: "nowrap" as const,
                  }}
                >
                  <span style={{
                    display: "inline-flex", alignItems: "center", justifyContent: "center",
                    width: "var(--size-chip-sm)", height: "var(--size-chip-sm)",
                    borderRadius: "var(--radius-xs)",
                    background: isActive ? "var(--primary)" : "var(--bg-secondary)",
                    border: `var(--border-width-thin) solid ${isActive ? "var(--primary)" : "var(--border-default)"}`,
                    fontFamily: "var(--font-family-mono)",
                    fontSize: "var(--text-micro)",
                    fontWeight: "var(--font-weight-bold)" as any,
                    color: isActive ? "var(--fg-inverse)" : "var(--fg-tertiary)",
                    lineHeight: "var(--line-height-none)",
                    flexShrink: 0,
                    transition: `all var(--duration-fast) var(--ease-out)`,
                  }}>
                    {tab.tier.replace("T", "")}
                  </span>
                  {tab.label}
                  <span style={{
                    display: "inline-flex", alignItems: "center", justifyContent: "center",
                    minWidth: "var(--size-chip-count-min)", height: "var(--size-chip-sm)",
                    padding: "0 var(--space-1)",
                    borderRadius: "var(--radius-full)",
                    background: isActive ? "var(--bg-brand-subtle)" : "var(--bg-secondary)",
                    color: isActive ? "var(--fg-brand)" : "var(--fg-tertiary)",
                    fontFamily: "var(--font-family-mono)",
                    fontSize: "var(--text-micro)",
                    fontWeight: "var(--font-weight-semibold)" as any,
                    lineHeight: "var(--line-height-none)",
                    transition: `all var(--duration-fast) var(--ease-out)`,
                  }}>
                    {tab.count}
                  </span>
                </Link>
              );
            })}
            <div style={{ flex: 1 }} />
            <div style={{ display: "flex", alignItems: "center", gap: "var(--space-3)", paddingBottom: "var(--space-2)" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "var(--space-1)" }}>
                <div style={{
                  width: "var(--size-dot-sm)", height: "var(--size-dot-sm)",
                  borderRadius: "var(--radius-full)",
                  background: "var(--status-healthy)",
                }} />
                <span style={{
                  fontFamily: "var(--font-family-mono)",
                  fontSize: "var(--text-micro)",
                  color: "var(--fg-tertiary)",
                }}>
                  {activeTab.count} {activeTab.label.toLowerCase()} &middot; {activeTab.desc}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ═══ PAGE BANNER ═════════════════════════════════════════════════ */}
      <div style={{
        background: "var(--bg-primary)",
        borderBottom: `var(--border-width-thin) solid var(--border-default)`,
        padding: "var(--space-4) 0",
      }}>
        <div style={{
          maxWidth: "var(--layout-content-max)", margin: "0 auto", padding: "0 var(--space-6)",
          display: "flex", alignItems: "center", justifyContent: "space-between",
          gap: "var(--space-4)",
        }}>
          <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-1)" }}>
            <span style={{
              fontFamily: "var(--font-family-display)",
              fontSize: "var(--text-lg)",
              fontWeight: "var(--font-weight-semibold)" as any,
              color: "var(--fg-primary)",
              letterSpacing: "var(--letter-spacing-title)",
            }}>
              {activeTab.label}
              <span style={{
                fontFamily: "var(--font-family-primary)",
                fontSize: "var(--text-caption)",
                fontWeight: "var(--font-weight-normal)" as any,
                color: "var(--fg-tertiary)",
                marginLeft: "var(--space-3)",
              }}>
                {activeTab.desc}
              </span>
            </span>
          </div>
          <div style={{
            display: "flex", alignItems: "center", gap: "var(--space-2)",
            padding: "var(--space-2) var(--space-3)",
            background: "var(--bg-secondary)",
            border: `var(--border-width-thin) solid var(--border-default)`,
            borderRadius: "var(--radius-md-ds)",
          }}>
            <div style={{
              width: "var(--size-dot-sm)", height: "var(--size-dot-sm)",
              borderRadius: "var(--radius-full)",
              background: "var(--fg-brand)",
            }} />
            <span style={{
              fontFamily: "var(--font-family-mono)",
              fontSize: "var(--text-micro)",
              color: "var(--fg-tertiary)",
            }}>
              Layer-2 / Layer-3 semantic tokens only
            </span>
          </div>
        </div>
      </div>

      {/* ═══ CONTENT ═════════════════════════════════════════════════════ */}
      <div style={{ maxWidth: "var(--layout-content-max)", margin: "0 auto", padding: "var(--space-8) var(--space-6)" }}>
        {active === "tokens"    && <SafeRender name="TokenReferenceTable"><TokenReferenceTable /></SafeRender>}
        {active === "atoms"     && <SafeRender name="AtomsShowcase"><AtomsShowcase /></SafeRender>}
        {active === "molecules" && <SafeRender name="MoleculesShowcase"><MoleculesShowcase /></SafeRender>}
        {active === "organisms" && <SafeRender name="OrganismsShowcase"><OrganismsShowcase /></SafeRender>}
        {active === "templates" && <SafeRender name="TemplatesTab"><TemplatesTab /></SafeRender>}
      </div>
    </div>
  );
}