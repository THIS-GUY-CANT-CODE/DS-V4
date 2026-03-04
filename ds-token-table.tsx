import React, { useState } from "react";

// ─── Token Reference Table ────────────────────────────────────────────────────
// ALL 289 variables from the consolidated Figma Atomic DS token JSON files:
//   tokens/dark.json   → 98  Primitives + 141 Component  (merged)
//   tokens/light.json  → 50  Semantic
// ──────────────────────────────────────────────────────────────────────────────

/* ── Data types ── */
type T = { t: string; v: string; c: string; n?: string };    // token, value, css-var, note
type C = { t: string; h: string; c: string };                // token, hex, css-var

/* ═══ LAYER 1: PRIMITIVES  (tokens/dark.json — 98 tokens) ═══ */

const P_TEAL: C[] = [
  { t:"Teal 50",  h:"#E4FBF8", c:"--teal-50" },  { t:"Teal 100", h:"#D0FBF5", c:"--teal-100" },
  { t:"Teal 200", h:"#C2F5EE", c:"--teal-200" },  { t:"Teal 300", h:"#84EBDD", c:"--teal-300" },
  { t:"Teal 600", h:"#1DAF9C", c:"--teal-600" },  { t:"Teal 700", h:"#178C7D", c:"--teal-700" },
  { t:"Teal 900", h:"#166264", c:"--teal-900" },
]; // 7

const P_NEUTRAL: C[] = [
  { t:"neutral 0",   h:"#FFFFFF", c:"--neutral-0" },   { t:"neutral 25",  h:"#F8FAFC", c:"--neutral-25" },
  { t:"neutral 50",  h:"#F5F7FA", c:"--neutral-50" },  { t:"neutral 100", h:"#F2F5F8", c:"--neutral-100" },
  { t:"neutral 200", h:"#E1E4EA", c:"--neutral-200" }, { t:"neutral 300", h:"#CACFD8", c:"--neutral-300" },
  { t:"neutral 400", h:"#99A0AE", c:"--neutral-400" }, { t:"neutral 500", h:"#717784", c:"--neutral-500" },
  { t:"neutral 600", h:"#525866", c:"--neutral-600" }, { t:"neutral 700", h:"#2B303B", c:"--neutral-700" },
  { t:"neutral 800", h:"#222530", c:"--neutral-800" }, { t:"neutral 900", h:"#181B25", c:"--neutral-900" },
  { t:"neutral 950", h:"#0E101B", c:"--neutral-950" },
]; // 13

const P_GREEN: C[] = [
  { t:"Green 50",  h:"#E0FAEC", c:"--green-50" },  { t:"Green 100", h:"#D0FBE9", c:"--green-100" },
  { t:"Green 300", h:"#84EBB4", c:"--green-300" },  { t:"Green 500", h:"#1FC16B", c:"--green-500" },
  { t:"Green 700", h:"#178C4E", c:"--green-700" },  { t:"Green 900", h:"#16643B", c:"--green-900" },
]; // 6

const P_RED: C[] = [
  { t:"Red 50",  h:"#FFEBEC", c:"--red-50" },   { t:"Red 100", h:"#FFD5D8", c:"--red-100" },
  { t:"Red 300", h:"#FF97A0", c:"--red-300" },   { t:"Red 500", h:"#FB3748", c:"--red-500" },
  { t:"Red 700", h:"#D02533", c:"--red-700" },   { t:"Red 900", h:"#8B1822", c:"--red-900" },
]; // 6

const P_ORANGE: C[] = [
  { t:"Orange 50",  h:"#FFF1EB", c:"--orange-50" },  { t:"Orange 100", h:"#FFE3D5", c:"--orange-100" },
  { t:"Orange 300", h:"#FFBA97", c:"--orange-300" },  { t:"Orange 500", h:"#FF8447", c:"--orange-500" },
  { t:"Orange 700", h:"#D05E25", c:"--orange-700" },  { t:"Orange 900", h:"#8B3E18", c:"--orange-900" },
]; // 6

const P_SKY: C[] = [
  { t:"Sky 50",  h:"#EBF8FF", c:"--sky-50" },  { t:"Sky 100", h:"#D5F1FF", c:"--sky-100" },
  { t:"Sky 300", h:"#97DCFF", c:"--sky-300" },  { t:"Sky 500", h:"#47C2FF", c:"--sky-500" },
  { t:"Sky 700", h:"#2597D0", c:"--sky-700" },  { t:"Sky 900", h:"#18658B", c:"--sky-900" },
]; // 6

const P_PURPLE: C[] = [
  { t:"Purple 200", h:"#CAC0FF", c:"--purple-200" },
  { t:"Purple 500", h:"#7D52F4", c:"--purple-500" },
  { t:"Purple 600", h:"#693EE0", c:"--purple-600" },
]; // 3

const P_PINK: C[] = [
  { t:"Pink 200", h:"#FFC0DF", c:"--pink-200" },
  { t:"Pink 500", h:"#FB4BA3", c:"--pink-500" },
  { t:"Pink 600", h:"#E9358F", c:"--pink-600" },
]; // 3

const P_FOREST: C[] = [
  { t:"Forest 200", h:"#93B8A9", c:"--forest-200" },
  { t:"Forest 500", h:"#0B613E", c:"--forest-500" },
  { t:"Forest 600", h:"#104D32", c:"--forest-600" },
]; // 3

const P_OVERLAY: T[] = [
  { t:"overlay/light",  v:"#FFFFFF 50%", c:"--overlay-light",  n:"50% white" },
  { t:"overlay/medium", v:"#0E101B 50%", c:"--overlay-medium", n:"50% dark" },
  { t:"overlay/heavy",  v:"#0E101B 70%", c:"--overlay-heavy",  n:"70% dark" },
  { t:"overlay/black",  v:"#000000 80%", c:"--overlay-black",  n:"80% black" },
]; // 4

const P_SHADOW: T[] = [
  { t:"shadow/sm", v:"0 1px 2px rgba(14,16,27,.05)",  c:"--shadow-xs" },
  { t:"shadow/md", v:"0 2px 8px rgba(14,16,27,.08)",  c:"--shadow-md" },
  { t:"shadow/lg", v:"0 8px 16px rgba(14,16,27,.12)", c:"--shadow-lg" },
]; // 3

const P_SPACE: T[] = [
  { t:"space/0",  v:"0",  c:"--space-0" },  { t:"space/1",  v:"4px",  c:"--space-1" },
  { t:"space/2",  v:"8px",  c:"--space-2" },  { t:"space/3",  v:"12px", c:"--space-3" },
  { t:"space/4",  v:"16px", c:"--space-4" },  { t:"space/6",  v:"24px", c:"--space-6" },
  { t:"space/8",  v:"32px", c:"--space-8" },  { t:"space/12", v:"48px", c:"--space-12" },
  { t:"space/14", v:"56px", c:"--space-14" }, { t:"space/16", v:"64px", c:"--space-16" },
]; // 10

const P_RADIUS: T[] = [
  { t:"radius/none", v:"0",     c:"--radius-none" },
  { t:"radius/sm",   v:"4px",   c:"--radius-button" },
  { t:"radius/md",   v:"8px",   c:"--radius" },
  { t:"radius/lg",   v:"12px",  c:"--radius-lg (calc)" },
  { t:"radius/full", v:"9999px",c:"--radius-full" },
]; // 5

const P_SIZE: T[] = [
  { t:"Size/icon/sm",     v:"16px", c:"--size-icon-sm" },
  { t:"Size/icon/md",     v:"20px", c:"--size-icon-md" },
  { t:"Size/icon/lg",     v:"24px", c:"--size-icon-lg" },
  { t:"Size/border/thin", v:"1px",  c:"--border-width-thin" },
  { t:"Size/border/medium",v:"2px", c:"--border-width-medium" },
  { t:"Size/control/sm",  v:"24px", c:"--size-control-sm" },
  { t:"Size/control/md",  v:"32px", c:"--size-control-md" },
  { t:"Size/control/lg",  v:"40px", c:"--size-control-lg" },
]; // 8

const P_TYPO: T[] = [
  { t:"FontFamily",       v:"Inter",         c:"--font-family-primary", n:"Only font in Figma tokens" },
  { t:"FontSize/sm",      v:"12px",          c:"--font-size-sm" },
  { t:"FontSize/md",      v:"14px",          c:"--font-size-md" },
  { t:"FontSize/lg",      v:"16px",          c:"--font-size-lg" },
  { t:"FontSize/xl",      v:"20px",          c:"--font-size-xl" },
  { t:"FontSize/2xl",     v:"24px",          c:"--font-size-2xl" },
  { t:"FontWeight/regular",  v:"Regular (400)",   c:"--font-weight-normal" },
  { t:"FontWeight/medium",   v:"Medium (500)",    c:"--font-weight-medium" },
  { t:"FontWeight/semibold", v:"Semi Bold (600)", c:"--font-weight-semibold" },
  { t:"FontWeight/bold",     v:"Bold (700)",      c:"--font-weight-bold" },
  { t:"LineHeight/sm",    v:"18px",          c:"--line-height-sm" },
  { t:"LineHeight/md",    v:"20px",          c:"--line-height-md" },
  { t:"LineHeight/lg",    v:"24px",          c:"--line-height-lg" },
  { t:"LineHeight/xl",    v:"28px",          c:"--line-height-xl" },
  { t:"LineHeight/2xl",   v:"32px",          c:"--line-height-2xl" },
]; // 15

const PRIM_COLORS = P_TEAL.length+P_NEUTRAL.length+P_GREEN.length+P_RED.length+P_ORANGE.length+P_SKY.length+P_PURPLE.length+P_PINK.length+P_FOREST.length;
const TOTAL_PRIM = PRIM_COLORS + P_OVERLAY.length + P_SHADOW.length + P_SPACE.length + P_RADIUS.length + P_SIZE.length + P_TYPO.length; // 98

/* ═══ LAYER 2: SEMANTIC  (tokens/light.json — 50 tokens) ═══ */

const S_FG: C[] = [
  { t:"fg/primary",   h:"#181B25", c:"--fg-primary" },   { t:"fg/secondary", h:"#525866", c:"--fg-secondary" },
  { t:"fg/tertiary",  h:"#717784", c:"--fg-tertiary" },   { t:"fg/disabled",  h:"#99A0AE", c:"--fg-disabled" },
  { t:"fg/inverse",   h:"#FFFFFF", c:"--fg-inverse" },    { t:"fg/brand",     h:"#1DAF9C", c:"--fg-brand" },
  { t:"fg/link",      h:"#1DAF9C", c:"--fg-link" },       { t:"fg/success",   h:"#178C4E", c:"--fg-success" },
  { t:"fg/error",     h:"#D02533", c:"--fg-error" },      { t:"fg/warning",   h:"#D05E25", c:"--fg-warning" },
  { t:"fg/info",      h:"#2597D0", c:"--fg-info" },
]; // 11

const S_BG: C[] = [
  { t:"bg/primary",        h:"#FFFFFF", c:"--bg-primary" },
  { t:"bg/secondary",      h:"#F2F5F8", c:"--bg-secondary" },
  { t:"bg/tertiary",       h:"#E1E4EA", c:"--bg-tertiary" },
  { t:"bg/disabled",       h:"#CACFD8", c:"--bg-disabled" },
  { t:"bg/inverse",        h:"#181B25", c:"--bg-inverse" },
  { t:"bg/brand",          h:"#1DAF9C", c:"--bg-brand" },
  { t:"bg/link",           h:"#178C7D", c:"--bg-link" },
  { t:"bg/success",        h:"#178C4E", c:"--bg-success" },
  { t:"bg/success-subtle", h:"#E0FAEC", c:"--bg-success-subtle" },
  { t:"bg/error",          h:"#FB3748", c:"--bg-error" },
  { t:"bg/error-subtle",   h:"#FFEBEC", c:"--bg-error-subtle" },
  { t:"bg/warning-subtle", h:"#FFF1EB", c:"--bg-warning-subtle" },
  { t:"bg/info-subtle",    h:"#EBF8FF", c:"--bg-info-subtle" },
]; // 13

const S_BORDER: C[] = [
  { t:"border/primary",  h:"#E1E4EA", c:"--border-default" },
  { t:"border/secondary",h:"#CACFD8", c:"--border-strong" },
  { t:"border/disabled", h:"#E1E4EA", c:"--border-disabled" },
  { t:"border/focus",    h:"#1DAF9C", c:"--border-focus" },
  { t:"border/brand",    h:"#1DAF9C", c:"--border-brand" },
  { t:"border/success",  h:"#1FC16B", c:"--border-success" },
  { t:"border/error",    h:"#FB3748", c:"--border-error" },
  { t:"border/divider",  h:"#E1E4EA", c:"--border-divider" },
]; // 8

const S_ICON: C[] = [
  { t:"Icon/primary",  h:"#2B303B", c:"--icon-primary" },
  { t:"Icon/secondary",h:"#717784", c:"--icon-secondary" },
  { t:"Icon/disabled", h:"#CACFD8", c:"--icon-disabled" },
  { t:"Icon/inverse",  h:"#FFFFFF", c:"--icon-inverse" },
  { t:"Icon/brand",    h:"#1DAF9C", c:"--icon-brand" },
  { t:"Icon/success",  h:"#1FC16B", c:"--icon-success" },
  { t:"Icon/error",    h:"#FB3748", c:"--icon-error" },
  { t:"Icon/Warning",  h:"#FF8447", c:"--icon-warning" },
]; // 8

const S_STATUS: C[] = [
  { t:"status/healthy",      h:"#1FC16B", c:"--status-healthy" },
  { t:"status/unhealthy",    h:"#FB3748", c:"--status-unhealthy" },
  { t:"status/disconnected", h:"#525866", c:"--status-disconnected" },
  { t:"status/allocated",    h:"#47C2FF", c:"--status-allocated" },
  { t:"status/used",         h:"#18658B", c:"--status-used" },
]; // 5

const S_TEXT: T[] = [
  { t:"text/label",   v:"12px", c:"--text-label",   n:"FontSize/sm" },
  { t:"text/body",    v:"14px", c:"--text-body",    n:"FontSize/md" },
  { t:"text/title",   v:"16px", c:"--text-title",   n:"FontSize/lg" },
  { t:"text/heading", v:"20px", c:"--text-heading", n:"FontSize/xl" },
  { t:"text/display", v:"24px", c:"--text-display", n:"FontSize/2xl" },
]; // 5

const TOTAL_SEM = S_FG.length+S_BG.length+S_BORDER.length+S_ICON.length+S_STATUS.length+S_TEXT.length; // 50

/* ═══ LAYER 3: COMPONENT  (tokens/dark.json — 141 tokens) ═══ */

const C_SEV: T[] = [
  { t:"severity/critical/bg", v:"#FFEBEC", c:"--severity-critical-bg", n:"Red 50" },
  { t:"severity/critical/fg", v:"#FB3748", c:"--severity-critical-fg", n:"Red 500" },
  { t:"severity/high/bg",     v:"#FFC0DF", c:"--severity-high-bg",     n:"Pink 200" },
  { t:"severity/high/fg",     v:"#E9358F", c:"--severity-high-fg",     n:"Pink 600" },
  { t:"severity/medium/bg",   v:"#FFF1EB", c:"--severity-medium-bg",   n:"Orange 50" },
  { t:"severity/medium/fg",   v:"#FF8447", c:"--severity-medium-fg",   n:"Orange 500" },
]; // 6

const C_BTN: T[] = [
  { t:"button/primary/bg",      v:"#1DAF9C", c:"--btn-primary-bg",      n:"bg/brand" },
  { t:"button/primary/fg",      v:"#181B25", c:"--btn-primary-fg",      n:"bg/inverse" },
  { t:"button/secondary/bg",    v:"#FFFFFF", c:"--btn-secondary-bg",    n:"bg/primary" },
  { t:"button/secondary/fg",    v:"#181B25", c:"--btn-secondary-fg",    n:"fg/primary" },
  { t:"button/secondary/border",v:"#E1E4EA", c:"--btn-secondary-border",n:"border/primary" },
  { t:"button/danger/bg",       v:"#FB3748", c:"--btn-danger-bg",       n:"bg/error" },
  { t:"button/danger/fg",       v:"#FFFFFF", c:"--btn-danger-fg",       n:"fg/inverse" },
  { t:"button/height/sm",       v:"24px",    c:"--btn-height-sm",       n:"control/sm" },
  { t:"button/height/md",       v:"32px",    c:"--btn-height-md",       n:"control/md" },
  { t:"button/height/lg",       v:"40px",    c:"--btn-height-lg",       n:"control/lg" },
  { t:"button/radius/md",       v:"8px",     c:"--btn-radius",          n:"radius/md" },
  { t:"button/padding/sm",      v:"8px",     c:"--btn-padding-sm",      n:"space/2" },
  { t:"button/padding/md",      v:"12px",    c:"--btn-padding-md",      n:"space/3" },
  { t:"button/padding/lg",      v:"16px",    c:"--btn-padding-lg",      n:"space/4" },
  { t:"button/fontSize",        v:"14px",    c:"--btn-font-size",       n:"text/body" },
]; // 15

const C_INPUT: T[] = [
  { t:"input/bg",           v:"#FFFFFF", c:"--input-ds-bg",           n:"bg/primary" },
  { t:"input/fg",           v:"#181B25", c:"--input-ds-fg",           n:"fg/primary" },
  { t:"input/placeholder",  v:"#717784", c:"--input-ds-placeholder",  n:"fg/tertiary" },
  { t:"input/border",       v:"#E1E4EA", c:"--input-ds-border",       n:"border/primary" },
  { t:"input/border-focus", v:"#1DAF9C", c:"--input-ds-border-focus", n:"border/focus" },
  { t:"input/border-error", v:"#FB3748", c:"--input-ds-border-error", n:"border/error" },
  { t:"input/radius",       v:"8px",     c:"--input-ds-radius",       n:"radius/md" },
  { t:"input/height/sm",    v:"24px",    c:"--input-ds-height-sm",    n:"control/sm" },
  { t:"input/height/md",    v:"32px",    c:"--input-ds-height-md",    n:"control/md" },
  { t:"input/height/lg",    v:"40px",    c:"--input-ds-height-lg",    n:"control/lg" },
  { t:"input/fontSize/Title",  v:"14px", c:"--input-ds-font-size",    n:"text/body" },
  { t:"input/fontSize/value",  v:"14px", c:"--input-ds-font-size",    n:"text/body" },
  { t:"input/fontSize/helper", v:"12px", c:"--input-ds-font-helper",  n:"text/label" },
]; // 13

const C_BADGE: T[] = [
  { t:"badge/radius",       v:"4px",     c:"--badge-radius",      n:"radius/sm" },
  { t:"badge/primary/bg",   v:"#E4FBF8", c:"--badge-primary-bg",  n:"Teal 50" },
  { t:"badge/primary/fg",   v:"#178C7D", c:"--badge-primary-fg",  n:"Teal 700" },
  { t:"badge/success/bg",   v:"#E0FAEC", c:"--badge-success-bg",  n:"bg/success-subtle" },
  { t:"badge/success/fg",   v:"#178C4E", c:"--badge-success-fg",  n:"fg/success" },
  { t:"badge/error/bg",     v:"#FFEBEC", c:"--badge-error-bg",    n:"bg/error-subtle" },
  { t:"badge/error/fg",     v:"#D02533", c:"--badge-error-fg",    n:"fg/error" },
  { t:"badge/warning/bg",   v:"#FFF1EB", c:"--badge-warning-bg",  n:"bg/warning-subtle" },
  { t:"badge/warning/fg",   v:"#D05E25", c:"--badge-warning-fg",  n:"fg/warning" },
  { t:"badge/neutral/bg",   v:"#F2F5F8", c:"--badge-neutral-bg",  n:"bg/secondary" },
  { t:"badge/neutral/fg",   v:"#525866", c:"--badge-neutral-fg",  n:"fg/secondary" },
]; // 11

const C_CARD: T[] = [
  { t:"card/bg",             v:"#FFFFFF", c:"--card-ds-bg",         n:"bg/primary" },
  { t:"card/border",         v:"#E1E4EA", c:"--card-ds-border",     n:"border/primary" },
  { t:"card/radius/sm",      v:"8px",     c:"--card-ds-radius-sm",  n:"radius/md" },
  { t:"card/radius/md",      v:"12px",    c:"--card-ds-radius-md",  n:"radius/lg" },
  { t:"card/radius/lg",      v:"12px",    c:"--card-ds-radius-lg",  n:"radius/lg" },
  { t:"card/padding/sm",     v:"12px",    c:"--card-ds-padding-sm", n:"space/3" },
  { t:"card/padding/md",     v:"16px",    c:"--card-ds-padding-md", n:"space/4" },
  { t:"card/padding/lg",     v:"24px",    c:"--card-ds-padding-lg", n:"space/6" },
  { t:"card/fontSize/title", v:"16px",    c:"--card-ds-font-title", n:"text/title" },
  { t:"card/fontSize/meta",  v:"12px",    c:"--card-ds-font-meta",  n:"text/label" },
  { t:"card/fontSize/body",  v:"14px",    c:"--card-ds-font-body",  n:"text/body" },
]; // 11

const C_MODAL: T[] = [
  { t:"modal/bg",              v:"#FFFFFF", c:"--modal-bg",         n:"bg/primary" },
  { t:"modal/border",          v:"#E1E4EA", c:"--modal-border",     n:"border/primary" },
  { t:"modal/radius/default",  v:"12px",    c:"--modal-radius",     n:"radius/lg" },
  { t:"modal/padding/default", v:"24px",    c:"--modal-padding",    n:"space/6" },
  { t:"modal/width/sm",        v:"400px",   c:"--modal-width-sm" },
  { t:"modal/width/md",        v:"560px",   c:"--modal-width-md" },
  { t:"modal/width/lg",        v:"720px",   c:"--modal-width-lg" },
  { t:"modal/fontSize/title",  v:"16px",    c:"--modal-font-title", n:"text/title" },
  { t:"modal/fontSize/body",   v:"14px",    c:"--modal-font-body",  n:"text/body" },
]; // 9

const C_DRAWER: T[] = [
  { t:"drawer/bg",               v:"#FFFFFF", c:"--drawer-bg",          n:"bg/primary" },
  { t:"drawer/border",           v:"#E1E4EA", c:"--drawer-border",      n:"border/primary" },
  { t:"drawer/padding/default",  v:"24px",    c:"--drawer-padding",     n:"space/6" },
  { t:"drawer/width/sm",         v:"320px",   c:"--drawer-width-sm" },
  { t:"drawer/width/md",         v:"480px",   c:"--drawer-width-md" },
  { t:"drawer/width/lg",         v:"640px",   c:"--drawer-width-lg" },
  { t:"drawer/header/md",        v:"480px",   c:"(header md)" },
  { t:"drawer/header/lg",        v:"640px",   c:"(header lg)" },
  { t:"drawer/header/height",    v:"56px",    c:"--drawer-header-height",n:"space/14" },
  { t:"drawer/fontSize/title",   v:"16px",    c:"--drawer-font-title",  n:"text/title" },
  { t:"drawer/fontSize/body",    v:"14px",    c:"--drawer-font-body",   n:"text/body" },
]; // 11

const C_AVATAR: T[] = [
  { t:"avatar/bg",      v:"#E1E4EA", c:"--avatar-bg",      n:"bg/tertiary" },
  { t:"avatar/fg",      v:"#525866", c:"--avatar-fg",      n:"fg/secondary" },
  { t:"avatar/Size/sm", v:"24px",    c:"--avatar-size-sm", n:"control/sm" },
  { t:"avatar/Size/md", v:"32px",    c:"--avatar-size-md", n:"control/md" },
  { t:"avatar/Size/lg", v:"40px",    c:"--avatar-size-lg", n:"control/lg" },
]; // 5

const C_SIDEBAR: T[] = [
  { t:"sidebar/bg",               v:"#FFFFFF", c:"--sidebar-ds-bg",          n:"bg/primary" },
  { t:"sidebar/border",           v:"#E1E4EA", c:"--sidebar-ds-border",      n:"border/primary" },
  { t:"sidebar/width/collapsed",  v:"64px",    c:"--sidebar-ds-width-collapsed",n:"space/16" },
  { t:"sidebar/width/compact",    v:"200px",   c:"--sidebar-ds-width-compact" },
  { t:"sidebar/width/default",    v:"256px",   c:"--sidebar-ds-width" },
  { t:"sidebar/item/height",      v:"40px",    c:"--sidebar-item-height",    n:"control/lg" },
]; // 6

const C_HEADER: T[] = [
  { t:"header/bg",        v:"#FFFFFF", c:"--topnav-bg",       n:"bg/primary" },
  { t:"header/border",    v:"#E1E4EA", c:"--topnav-border",   n:"border/primary" },
  { t:"header/height/sm", v:"48px",    c:"--topnav-height-sm" },
  { t:"header/height/md", v:"56px",    c:"--topnav-height-md" },
  { t:"header/height/lg", v:"64px",    c:"--topnav-height" },
]; // 5

const C_PAGE: T[] = [
  { t:"page/bg",              v:"#FFFFFF", c:"--page-bg",           n:"bg/primary" },
  { t:"page/fontSize/title",  v:"24px",    c:"--page-title-size",   n:"text/display" },
  { t:"page/fontSize/section",v:"20px",    c:"--page-section-size", n:"text/heading" },
]; // 3

const C_TOOLTIP: T[] = [
  { t:"tooltip/bg",             v:"#181B25", c:"--tooltip-bg",        n:"popover" },
  { t:"tooltip/fg",             v:"#FFFFFF", c:"--tooltip-fg",        n:"popover-fg" },
  { t:"tooltip/radius",         v:"4px",     c:"--tooltip-radius",    n:"radius/sm" },
  { t:"tooltip/padding",        v:"8px",     c:"--tooltip-padding",   n:"space/2" },
  { t:"tooltip/fontSize/default",v:"12px",   c:"--tooltip-font-size", n:"FontSize/sm" },
]; // 5

const C_TABLE: T[] = [
  { t:"Table/bg",                       v:"#FFFFFF", c:"--table-bg",                   n:"bg/primary" },
  { t:"Table/border",                   v:"#E1E4EA", c:"--table-border",               n:"border/primary" },
  { t:"Table/radius",                   v:"8px",     c:"--table-radius",               n:"radius/md" },
  { t:"Table/radius 2",                 v:"8px",     c:"--table-header-radius",        n:"radius/md" },
  { t:"Table/header/bg",                v:"#F2F5F8", c:"--table-header-bg",            n:"bg/secondary" },
  { t:"Table/header/fg",                v:"#525866", c:"--table-header-fg",            n:"fg/secondary" },
  { t:"Table/header/border",            v:"#CACFD8", c:"--table-header-border",        n:"border/secondary" },
  { t:"Table/header/fontSize",          v:"14px",    c:"--table-header-font",          n:"text/body" },
  { t:"Table/header/radius",            v:"8px",     c:"--table-header-radius",        n:"radius/md" },
  { t:"Table/header/height",            v:"40px",    c:"--table-header-height",        n:"control/lg" },
  { t:"Table/body/bg",                  v:"#FFFFFF", c:"--table-body-bg",              n:"bg/primary" },
  { t:"Table/body/fg",                  v:"#181B25", c:"--table-body-fg",              n:"fg/primary" },
  { t:"Table/body/fg-secondary",        v:"#525866", c:"--table-body-fg-secondary",    n:"fg/secondary" },
  { t:"Table/body/fontSize",            v:"14px",    c:"--table-body-font",            n:"text/body" },
  { t:"Table/row/border",               v:"#E1E4EA", c:"--table-row-border",           n:"border/primary" },
  { t:"Table/row/bg-hover",             v:"#F2F5F8", c:"--table-row-bg-hover",         n:"bg/secondary" },
  { t:"Table/row/bg-selected",          v:"#E4FBF8", c:"--table-row-bg-selected",      n:"Teal 50" },
  { t:"Table/row/bg-striped",           v:"#F8FAFC", c:"--table-row-bg-striped",       n:"neutral 25" },
  { t:"Table/row/height/sm",            v:"36px",    c:"--table-row-height-sm" },
  { t:"Table/row/height/md",            v:"44px",    c:"--table-row-height-md" },
  { t:"Table/row/height/lg",            v:"54px",    c:"--table-row-height-lg" },
  { t:"Table/cell/link-fg",             v:"#1DAF9C", c:"--table-cell-link-fg",         n:"fg/brand" },
  { t:"Table/cell/icon",                v:"#99A0AE", c:"--table-cell-icon",            n:"fg/tertiary" },
  { t:"Table/cell/padding-block/sm",    v:"4px",     c:"--table-cell-padding-block-sm",n:"space/1" },
  { t:"Table/cell/padding-block/md",    v:"8px",     c:"--table-cell-padding-block-md",n:"space/2" },
  { t:"Table/cell/padding-block/lg",    v:"12px",    c:"--table-cell-padding-block-lg",n:"space/3" },
  { t:"Table/cell/padding-inline/sm",   v:"8px",     c:"--table-cell-padding-inline-sm",n:"space/2" },
  { t:"Table/cell/padding-inline/md",   v:"12px",    c:"--table-cell-padding-inline-md",n:"space/3" },
  { t:"Table/cell/padding-inline/lg",   v:"16px",    c:"--table-cell-padding-inline-lg",n:"space/4" },
  { t:"Table/empty/fg",                 v:"#99A0AE", c:"--table-empty-fg",             n:"fg/disabled" },
  { t:"Table/empty/icon",               v:"#99A0AE", c:"--table-empty-icon",           n:"fg/tertiary" },
  { t:"Table/viz/bar-bg",               v:"#F2F5F8", c:"--table-viz-bar-bg",           n:"bg/secondary" },
  { t:"Table/viz/bar-used",             v:"#18658B", c:"--table-viz-bar-used",         n:"status/used" },
  { t:"Table/viz/bar-allocated",        v:"#47C2FF", c:"--table-viz-bar-allocated",    n:"status/allocated" },
  { t:"Table/viz/bar-height",           v:"16px",    c:"--table-viz-bar-height",       n:"icon/sm" },
  { t:"Table/viz/bar-radius",           v:"4px",     c:"--table-viz-bar-radius",       n:"radius/sm" },
  { t:"Table/viz/dot-radius",           v:"4px",     c:"(dot-radius)",                 n:"radius/sm" },
  { t:"Table/viz/dot-size",             v:"8px",     c:"--table-viz-dot-size",         n:"space/2" },
  { t:"Table/viz/dot-gap",              v:"4px",     c:"--table-viz-dot-gap",          n:"space/1" },
  { t:"Table/viz/Dot-size",             v:"16px",    c:"(Dot-size lg)" },
]; // 40

const C_BADGE_FS: T[] = [
  { t:"badge/fontSize", v:"12px", c:"--badge-font-size", n:"FontSize/sm" },
]; // 1

const TOTAL_COMP = C_SEV.length+C_BTN.length+C_INPUT.length+C_BADGE.length+C_BADGE_FS.length+
  C_CARD.length+C_MODAL.length+C_DRAWER.length+C_AVATAR.length+C_SIDEBAR.length+
  C_HEADER.length+C_PAGE.length+C_TOOLTIP.length+C_TABLE.length; // 141

/* ── Render helpers ── */

function Swatch({ hex }: { hex: string }) {
  return <span style={{
    display:"inline-block", width:"var(--size-icon-sm)", height:"var(--size-icon-sm)", borderRadius:"var(--radius-xs)",
    background:hex, border:`var(--border-width-thin) solid var(--border-default)`,
    flexShrink:0, verticalAlign:"middle",
  }} />;
}

const th: React.CSSProperties = {
  textAlign:"left", padding:"var(--space-1) var(--space-2)",
  fontFamily:"var(--font-family-primary)", fontSize:"var(--text-micro)",
  fontWeight:"var(--font-weight-semibold)" as any, color:"var(--fg-secondary)", whiteSpace:"nowrap",
};
const td: React.CSSProperties = { padding:"var(--space-1) var(--space-2)", verticalAlign:"middle" };
const mono: React.CSSProperties = { fontFamily:"var(--font-family-mono)", fontSize:"var(--text-micro)" };
const code_: React.CSSProperties = { ...mono, color:"var(--fg-brand)", background:"var(--bg-brand-subtle)", padding:"var(--space-px) var(--space-1)", borderRadius:"var(--radius-xs)" };

function TT({ d }: { d: T[] }) {
  return (
    <table style={{ width:"100%", borderCollapse:"collapse", fontFamily:"var(--font-family-primary)", fontSize:"var(--text-caption)", marginBottom:"var(--space-2)" }}>
      <thead><tr style={{ borderBottom:`var(--border-width-thin) solid var(--border-default)` }}>
        <th style={{...th,width:"36%"}}>Token</th><th style={{...th,width:"18%"}}>Value</th>
        <th style={{...th,width:"28%"}}>CSS Var</th><th style={{...th,width:"18%"}}>Alias</th>
      </tr></thead>
      <tbody>{d.map((e,i)=>(
        <tr key={i} style={{ borderBottom:`var(--border-width-thin) solid var(--border-default)` }}>
          <td style={td}><span style={{...mono,color:"var(--fg-primary)"}}>{e.t}</span></td>
          <td style={td}>{e.v.startsWith("#") ? <span style={{display:"inline-flex",alignItems:"center",gap:"var(--space-1)"}}><Swatch hex={e.v.split(" ")[0]}/><span style={{...mono,color:"var(--fg-secondary)"}}>{e.v}</span></span> : <span style={{...mono,color:"var(--fg-secondary)"}}>{e.v}</span>}</td>
          <td style={td}><code style={code_}>{e.c}</code></td>
          <td style={td}>{e.n && <span style={{...mono,color:"var(--fg-tertiary)"}}>{e.n}</span>}</td>
        </tr>
      ))}</tbody>
    </table>
  );
}

function CT({ d }: { d: C[] }) {
  return (
    <table style={{ width:"100%", borderCollapse:"collapse", fontFamily:"var(--font-family-primary)", fontSize:"var(--text-caption)", marginBottom:"var(--space-2)" }}>
      <thead><tr style={{ borderBottom:`var(--border-width-thin) solid var(--border-default)` }}>
        <th style={{...th,width:"30%"}}>Token</th><th style={{...th,width:"10%"}}></th>
        <th style={{...th,width:"18%"}}>Hex</th><th style={{...th,width:"42%"}}>CSS Var</th>
      </tr></thead>
      <tbody>{d.map((e,i)=>(
        <tr key={i} style={{ borderBottom:`var(--border-width-thin) solid var(--border-default)` }}>
          <td style={td}><span style={{...mono,color:"var(--fg-primary)"}}>{e.t}</span></td>
          <td style={td}><Swatch hex={e.h}/></td>
          <td style={td}><span style={{...mono,color:"var(--fg-secondary)"}}>{e.h}</span></td>
          <td style={td}><code style={code_}>{e.c}</code></td>
        </tr>
      ))}</tbody>
    </table>
  );
}

function Sec({ title, children, open: def = false }: { title: string; children: React.ReactNode; open?: boolean }) {
  const [o, setO] = useState(def);
  return (
    <div>
      <button onClick={()=>setO(x=>!x)} style={{
        display:"flex",alignItems:"center",gap:"var(--space-2)",width:"100%",
        padding:"var(--space-1) 0",fontFamily:"var(--font-family-primary)",fontSize:"var(--text-caption)",
        fontWeight:"var(--font-weight-medium)" as any,color:"var(--fg-secondary)",cursor:"pointer",
        background:"transparent",border:"none",textAlign:"left",
      }}>
        <svg width="12" height="12" viewBox="0 0 12 12" fill="none" style={{transform:o?"rotate(90deg)":"rotate(0)",transition:`transform var(--duration-fast) var(--ease-out)`,flexShrink:0}}>
          <path d="M4 2.5L8 6L4 9.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
        {title}
      </button>
      {o && <div style={{paddingLeft:"var(--space-4)"}}>{children}</div>}
    </div>
  );
}

function LayerHead({ label, file, count }: { label: string; file: string; count: number }) {
  return (
    <div style={{
      display:"flex",alignItems:"center",justifyContent:"space-between",
      padding:"var(--space-2) var(--space-3)",background:"var(--bg-secondary)",
      borderRadius:"var(--radius-sm-ds)",marginBottom:"var(--space-2)",
      border:`var(--border-width-thin) solid var(--border-default)`,
    }}>
      <div style={{display:"flex",alignItems:"center",gap:"var(--space-2)"}}>
        <span style={{fontFamily:"var(--font-family-primary)",fontSize:"var(--text-caption)",fontWeight:"var(--font-weight-semibold)" as any,color:"var(--fg-primary)"}}>{label}</span>
        <span style={{...mono,color:"var(--fg-tertiary)",padding:"var(--space-px) var(--space-2)",background:"var(--bg-primary)",borderRadius:"var(--radius-xs)",border:`var(--border-width-thin) solid var(--border-default)`}}>{file}</span>
      </div>
      <span style={{...mono,color:"var(--fg-brand)",background:"var(--bg-brand-subtle)",padding:"var(--space-px) var(--space-2)",borderRadius:"var(--radius-full-ds)"}}>{count}</span>
    </div>
  );
}

/* ── Main export ── */

export function TokenReferenceTable() {
  const [expanded, setExpanded] = useState(true);
  const total = TOTAL_PRIM + TOTAL_SEM + TOTAL_COMP;

  return (
    <div style={{
      background:"var(--bg-primary)",border:`var(--border-width-thin) solid var(--border-default)`,
      borderRadius:"var(--radius-md-ds)",boxShadow:"var(--shadow-xs)",overflow:"hidden",marginBottom:"var(--space-6)",
    }}>
      {/* Header */}
      <button onClick={()=>setExpanded(e=>!e)} style={{
        width:"100%",display:"flex",alignItems:"center",justifyContent:"space-between",
        padding:"var(--space-3) var(--space-4)",background:"var(--bg-secondary)",border:"none",
        borderBottom:expanded?`var(--border-width-thin) solid var(--border-default)`:"none",cursor:"pointer",
      }}>
        <div style={{display:"flex",alignItems:"center",gap:"var(--space-3)"}}>
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none" style={{transform:expanded?"rotate(90deg)":"rotate(0)",transition:`transform var(--duration-fast) var(--ease-out)`}}>
            <path d="M5 3L9 7L5 11" stroke="var(--fg-secondary)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          <span style={{fontFamily:"var(--font-family-primary)",fontSize:"var(--text-base)",fontWeight:"var(--font-weight-semibold)" as any,color:"var(--fg-primary)"}}>
            Figma Atomic DS — Token Reference
          </span>
          <span style={{...mono,color:"var(--fg-tertiary)"}}>
            All variables from 3 Figma collections
          </span>
        </div>
        <div style={{display:"flex",alignItems:"center",gap:"var(--space-2)"}}>
          {[{l:"Prim",n:TOTAL_PRIM},{l:"Sem",n:TOTAL_SEM},{l:"Comp",n:TOTAL_COMP}].map(x=>(
            <span key={x.l} style={{...mono,fontSize:"var(--text-micro)",color:"var(--fg-tertiary)",background:"var(--bg-primary)",padding:"var(--space-px) var(--space-2)",borderRadius:"var(--radius-xs)",border:`var(--border-width-thin) solid var(--border-default)`}}>{x.n} {x.l}</span>
          ))}
          <span style={{...mono,color:"var(--fg-brand)",background:"var(--bg-brand-subtle)",padding:"var(--space-px) var(--space-2)",borderRadius:"var(--radius-full-ds)",border:`var(--border-width-thin) solid var(--teal-200)`}}>
            {total} total
          </span>
        </div>
      </button>

      {expanded && (
        <div style={{padding:"var(--space-4)",display:"flex",flexDirection:"column",gap:"var(--space-4)"}}>

          {/* Font warning */}
          <div style={{display:"flex",alignItems:"flex-start",gap:"var(--space-3)",padding:"var(--space-3) var(--space-4)",background:"var(--bg-warning-subtle)",border:`var(--border-width-thin) solid var(--border-warning-subtle)`,borderRadius:"var(--radius-sm-ds)"}}>
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" style={{flexShrink:0,marginTop:"var(--space-px)"}}>
              <path d="M8 5.5V8.5M8 10.5H8.005M14 8A6 6 0 112 8a6 6 0 0112 0z" stroke="var(--fg-warning)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            <span style={{fontFamily:"var(--font-family-primary)",fontSize:"var(--text-caption)",color:"var(--fg-secondary)",lineHeight:"var(--line-height-md)"}}>
              <strong style={{color:"var(--fg-warning)"}}>Font Family Note:</strong> Figma Atomic DS defines only <strong>Inter</strong>.
              <strong> DM Sans</strong> (display) and <strong>Cousine</strong> (mono) were added as supplementary typefaces during the build — they are <em>not</em> from the Figma token files.
            </span>
          </div>

          {/* Layer 1 */}
          <div>
            <LayerHead label="Layer 1 · Primitives" file="tokens/dark.json" count={TOTAL_PRIM}/>
            <Sec title={`Typography (${P_TYPO.length})`} open><TT d={P_TYPO}/></Sec>
            <Sec title={`Spacing — 4px grid (${P_SPACE.length})`} open><TT d={P_SPACE}/></Sec>
            <Sec title={`Radius (${P_RADIUS.length})`} open><TT d={P_RADIUS}/></Sec>
            <Sec title={`Sizes — icon / border / control (${P_SIZE.length})`} open><TT d={P_SIZE}/></Sec>
            <Sec title={`Overlays (${P_OVERLAY.length})`}><TT d={P_OVERLAY}/></Sec>
            <Sec title={`Shadows (${P_SHADOW.length})`}><TT d={P_SHADOW}/></Sec>
            <Sec title={`Colors — Teal (${P_TEAL.length})`}><CT d={P_TEAL}/></Sec>
            <Sec title={`Colors — Neutral (${P_NEUTRAL.length})`}><CT d={P_NEUTRAL}/></Sec>
            <Sec title={`Colors — Green (${P_GREEN.length})`}><CT d={P_GREEN}/></Sec>
            <Sec title={`Colors — Red (${P_RED.length})`}><CT d={P_RED}/></Sec>
            <Sec title={`Colors — Orange (${P_ORANGE.length})`}><CT d={P_ORANGE}/></Sec>
            <Sec title={`Colors — Sky (${P_SKY.length})`}><CT d={P_SKY}/></Sec>
            <Sec title={`Colors — Purple (${P_PURPLE.length})`}><CT d={P_PURPLE}/></Sec>
            <Sec title={`Colors — Pink (${P_PINK.length})`}><CT d={P_PINK}/></Sec>
            <Sec title={`Colors — Forest (${P_FOREST.length})`}><CT d={P_FOREST}/></Sec>
          </div>

          {/* Layer 2 */}
          <div>
            <LayerHead label="Layer 2 · Semantic" file="tokens/light.json" count={TOTAL_SEM}/>
            <Sec title={`Foreground / Text (${S_FG.length})`} open><CT d={S_FG}/></Sec>
            <Sec title={`Background (${S_BG.length})`} open><CT d={S_BG}/></Sec>
            <Sec title={`Border (${S_BORDER.length})`}><CT d={S_BORDER}/></Sec>
            <Sec title={`Icon (${S_ICON.length})`}><CT d={S_ICON}/></Sec>
            <Sec title={`Status (${S_STATUS.length})`}><CT d={S_STATUS}/></Sec>
            <Sec title={`Text Scale (${S_TEXT.length})`} open><TT d={S_TEXT}/></Sec>
          </div>

          {/* Layer 3 */}
          <div>
            <LayerHead label="Layer 3 · Component" file="tokens/dark.json" count={TOTAL_COMP}/>
            <Sec title={`Severity (${C_SEV.length})`}><TT d={C_SEV}/></Sec>
            <Sec title={`Button (${C_BTN.length})`} open><TT d={C_BTN}/></Sec>
            <Sec title={`Input (${C_INPUT.length})`}><TT d={C_INPUT}/></Sec>
            <Sec title={`Badge (${C_BADGE.length + C_BADGE_FS.length})`}><TT d={[...C_BADGE,...C_BADGE_FS]}/></Sec>
            <Sec title={`Card (${C_CARD.length})`}><TT d={C_CARD}/></Sec>
            <Sec title={`Modal (${C_MODAL.length})`}><TT d={C_MODAL}/></Sec>
            <Sec title={`Drawer (${C_DRAWER.length})`}><TT d={C_DRAWER}/></Sec>
            <Sec title={`Avatar (${C_AVATAR.length})`}><TT d={C_AVATAR}/></Sec>
            <Sec title={`Sidebar (${C_SIDEBAR.length})`}><TT d={C_SIDEBAR}/></Sec>
            <Sec title={`Header (${C_HEADER.length})`}><TT d={C_HEADER}/></Sec>
            <Sec title={`Page (${C_PAGE.length})`}><TT d={C_PAGE}/></Sec>
            <Sec title={`Tooltip (${C_TOOLTIP.length})`}><TT d={C_TOOLTIP}/></Sec>
            <Sec title={`Table (${C_TABLE.length})`}><TT d={C_TABLE}/></Sec>
          </div>

        </div>
      )}
    </div>
  );
}