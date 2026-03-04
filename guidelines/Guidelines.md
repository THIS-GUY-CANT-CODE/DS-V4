/* ================================================================
   GLOBAL.CSS  —  Base resets & design-system defaults + modern enhancements
   All values reference CSS custom properties from theme.css.
   ================================================================ */

/* ── Box-sizing reset ─────────────────────────────────────────── */
*, *::before, *::after {
  box-sizing: border-box;
}

/* ── Base document ────────────────────────────────────────────── */
html {
  font-size: 16px;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-rendering: optimizeLegibility;
}

body {
  margin: 0;
  padding: 0;
  font-family: var(--font-family-primary);
  font-size: var(--text-base);
  font-weight: var(--font-weight-normal);
  line-height: var(--line-height-md);
  color: var(--fg-primary);
  background: var(--bg-primary);
  letter-spacing: var(--letter-spacing-body);
}

/* ── Headings ─────────────────────────────────────────────────── */
h1, h2, h3, h4, h5, h6 {
  margin: 0;
  font-family: var(--font-family-display);
  font-weight: var(--font-weight-bold);
  letter-spacing: var(--letter-spacing-heading);
  color: var(--fg-primary);
}

h1 { font-size: var(--text-h1); line-height: var(--line-height-2xl); }
h2 { font-size: var(--text-h2); line-height: var(--line-height-2xl); }
h3 { font-size: var(--text-h3); line-height: var(--line-height-2xl); }
h4 { font-size: var(--text-h4); line-height: var(--line-height-2xl); }
h5 { font-size: var(--text-heading); line-height: var(--line-height-xl); }
h6 { font-size: var(--text-title); line-height: var(--line-height-lg); }

/* ── Text ─────────────────────────────────────────────────────── */
p { margin: 0; font-size: var(--text-base); line-height: var(--line-height-lg); color: var(--fg-primary); }

a {
  color: var(--fg-link);
  text-decoration: none;
  transition: color var(--duration-fast) var(--ease-out);
}
a:hover { color: var(--teal-700); }

/* ── Form elements ────────────────────────────────────────────── */
input, textarea, select { font-family: inherit; }
input::placeholder, textarea::placeholder { color: var(--fg-tertiary); }

/* ── Lists ────────────────────────────────────────────────────── */
ul, ol { margin: 0; padding: 0; list-style: none; }

/* ── Media ────────────────────────────────────────────────────── */
img, video { display: block; max-width: 100%; }
svg { display: inline; vertical-align: middle; max-width: 100%; }

/* ── Code ─────────────────────────────────────────────────────── */
code, pre, kbd, samp { font-family: var(--font-family-mono); font-size: var(--text-caption); }

pre {
  overflow-x: auto;
  background: var(--bg-secondary);
  border: var(--border-width-thin) solid var(--border-default);
  border-radius: var(--radius-md-ds);
  padding: var(--space-3) var(--space-4);
  margin: 0;
}

/* ── Dividers ─────────────────────────────────────────────────── */
hr { border: none; border-top: var(--border-width-thin) solid var(--border-divider); margin: 0; }

/* ── Selection ────────────────────────────────────────────────── */
::selection { background: var(--teal-100); color: var(--fg-primary); }

/* ── Scrollbar (Webkit) ───────────────────────────────────────── */
::-webkit-scrollbar { width: 6px; height: 6px; }
::-webkit-scrollbar-track { background: transparent; }
::-webkit-scrollbar-thumb { background: var(--neutral-300); border-radius: var(--radius-full); }
::-webkit-scrollbar-thumb:hover { background: var(--neutral-400); }

/* ── Utilities ────────────────────────────────────────────────── */
.sr-only {
  position: absolute; width: 1px; height: 1px; padding: 0; margin: -1px;
  overflow: hidden; clip: rect(0, 0, 0, 0); white-space: nowrap; border-width: 0;
}
.truncate { overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }


/* ================================================================
   MODERN INTERACTION LAYER
   Adds depth, lift, glass, and material feel using token variables.
   ================================================================ */

/* ── Interactive elements — smooth transitions ────────────────── */
button, a, [role="button"], [role="tab"], [role="menuitem"] {
  transition: color var(--duration-fast) var(--ease-out),
              background-color var(--duration-fast) var(--ease-out),
              border-color var(--duration-fast) var(--ease-out),
              box-shadow var(--duration-fast) var(--ease-out),
              transform var(--duration-micro, 100ms) var(--ease-out);
}

/* ── Focus rings — double-ring on all focusable elements ──────── */
button:focus-visible,
[role="button"]:focus-visible,
input:focus-visible,
textarea:focus-visible,
select:focus-visible,
[role="combobox"]:focus-visible,
[tabindex]:focus-visible {
  outline: none;
  box-shadow: var(--shadow-ring-brand);
}

/* ── Card hover lift ──────────────────────────────────────────── */
[data-card],
[class*="card"] {
  box-shadow: var(--card-ds-shadow, var(--shadow-xs));
  transition: box-shadow var(--duration-default) var(--ease-out),
              transform var(--duration-default) var(--ease-out);
}

[data-card]:hover,
[class*="card"]:hover {
  box-shadow: var(--card-ds-shadow-hover, var(--shadow-md));
  transform: translateY(var(--card-ds-lift, -1px));
}

/* ── Button press feedback ────────────────────────────────────── */
button:active, [role="button"]:active {
  transform: scale(0.98);
  transition-duration: var(--duration-micro, 100ms);
}

/* ── Table row hover ──────────────────────────────────────────── */
tr {
  transition: background-color var(--duration-micro, 100ms) var(--ease-out);
}

/* ── Frosted glass — sticky headers & sidebars ────────────────── */
.glass-header,
[data-sticky="header"] {
  background: var(--glass-header);
  backdrop-filter: blur(var(--glass-blur, 12px));
  -webkit-backdrop-filter: blur(var(--glass-blur, 12px));
  border-bottom: 1px solid var(--glass-border, rgba(225, 228, 234, 0.6));
}

.glass-sidebar,
[data-sticky="sidebar"] {
  background: var(--glass-sidebar);
  backdrop-filter: blur(var(--glass-blur, 12px));
  -webkit-backdrop-filter: blur(var(--glass-blur, 12px));
  border-right: 1px solid var(--glass-border, rgba(225, 228, 234, 0.6));
}

/* ── Soft shadow borders — for floating elements ──────────────── */
.shadow-border {
  border: none;
  box-shadow: var(--border-subtle-shadow, 0 0 0 1px rgba(10, 13, 20, 0.06)),
              var(--shadow-sm);
}

.shadow-border:hover {
  box-shadow: var(--border-subtle-shadow-hover, 0 0 0 1px rgba(10, 13, 20, 0.10)),
              var(--shadow-md);
}

/* ── Dropdowns / popovers — elevated float ────────────────────── */
[data-popover],
[role="menu"],
[role="listbox"],
[role="dialog"]:not([class*="overlay"]) {
  box-shadow: var(--shadow-lg);
  border: 1px solid var(--border-default);
  border-radius: var(--radius-md-ds);
}

/* ── Badge subtle depth ───────────────────────────────────────── */
[data-badge] {
  box-shadow: 0 0 0 1px rgba(10, 13, 20, 0.04);
}


/* ================================================================
   FIGMA HEX → TOKEN OVERRIDES
   Catches hardcoded Tailwind arbitrary classes from Figma exports.
   ================================================================ */

/* Text colors */
.text-\[\#0e101b\], .text-\[\#0e121b\] { color: var(--fg-primary) !important; }
.text-\[\#525866\] { color: var(--fg-secondary) !important; }
.text-\[\#717784\] { color: var(--neutral-500) !important; }
.text-\[\#99a0ae\] { color: var(--fg-tertiary) !important; }
.text-\[\#178c7d\] { color: var(--teal-700) !important; }
.text-\[\#1daf9c\] { color: var(--primary) !important; }
.text-\[\#fb3748\] { color: var(--fg-error) !important; }
.text-\[\#1fc16b\] { color: var(--fg-success) !important; }
.text-\[\#ff8447\] { color: var(--fg-warning) !important; }
.text-\[\#ffffff\], .text-\[\#fff\] { color: var(--fg-inverse) !important; }
.text-\[\#335cff\], .text-\[\#335CFF\] { color: var(--blue-600) !important; }
.text-\[\#351a75\], .text-\[\#351A75\] { color: var(--purple-900) !important; }

/* Background colors */
.bg-\[\#f5f7fa\], .bg-\[\#F5F7FA\], .bg-\[\#F6F8FA\], .bg-\[\#f2f5f8\], .bg-\[\#F2F5F8\] { background-color: var(--bg-secondary) !important; }
.bg-\[\#e4fbf8\], .bg-\[\#E4FBF8\] { background-color: var(--bg-brand-subtle) !important; }
.bg-\[\#1daf9c\], .bg-\[\#1DAF9C\] { background-color: var(--bg-brand) !important; }
.bg-\[\#1fc16b\], .bg-\[\#1FC16B\] { background-color: var(--status-healthy) !important; }
.bg-\[\#e0faec\], .bg-\[\#E0FAEC\], .bg-\[\#f6fefa\] { background-color: var(--bg-success-subtle) !important; }
.bg-\[\#fb3748\], .bg-\[\#FB3748\] { background-color: var(--bg-error) !important; }
.bg-\[\#e97135\], .bg-\[\#ff8447\] { background-color: var(--status-warning) !important; }
.bg-\[\#fff1eb\], .bg-\[\#FFF1EB\], .bg-\[\#fff8f5\] { background-color: var(--bg-warning-subtle) !important; }
.bg-\[\#ebf1ff\] { background-color: var(--bg-info-subtle) !important; }
.bg-\[\#cacfd8\], .bg-\[\#CACFD8\] { background-color: var(--neutral-300) !important; }
.bg-\[\#e1e4ea\], .bg-\[\#E1E4EA\] { background-color: var(--border-default) !important; }
.bg-\[\#525866\] { background-color: var(--neutral-600) !important; }
.bg-\[\#ffd5c0\], .bg-\[\#FFD5C0\] { background-color: var(--orange-200) !important; }
.bg-\[\#124b68\], .bg-\[\#124B68\] { background-color: var(--sky-800) !important; }
.bg-\[\#ff9a68\], .bg-\[\#FF9A68\] { background-color: var(--orange-400) !important; }
.bg-\[\#ffd268\], .bg-\[\#FFD268\] { background-color: var(--yellow-300) !important; }
.bg-\[\#693ee0\], .bg-\[\#693EE0\] { background-color: var(--purple-600) !important; }
.bg-\[\#47c2ff\], .bg-\[\#47C2FF\] { background-color: var(--sky-500) !important; }

/* Border colors */
.border-\[\#e1e4ea\], .border-\[\#E1E4EA\], .border-\[\#ededed\] { border-color: var(--border-default) !important; }
.border-\[\#c2f5ee\] { border-color: var(--border-brand-subtle) !important; }

/* Font family overrides */
[class*="font-\['Inter"] { font-family: var(--font-family-primary) !important; }
[class*="font-\['DM_Sans"] { font-family: var(--font-family-display) !important; }
[class*="font-\['Cousine"] { font-family: var(--font-family-mono) !important; }

/* Shadow overrides */
.shadow-\[0px_1px_2px_0px_rgba\(10\,13\,20\,0\.03\)\],
.shadow-\[0px_0\.75px_1\.5px_0px_rgba\(14\,16\,27\,0\.03\)\] { box-shadow: var(--shadow-xs) !important; }
.shadow-\[0px_2px_2px_0px_rgba\(27\,28\,29\,0\.12\)\] { box-shadow: var(--shadow-sm) !important; }
.shadow-\[0px_0px_0px_2px_white\,0px_0px_0px_4px_\#e1e4ea\] {
  box-shadow: 0px 0px 0px 2px var(--bg-primary), 0px 0px 0px 4px var(--border-default) !important;
}