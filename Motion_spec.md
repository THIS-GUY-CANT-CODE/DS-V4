Motion Tokens (Add to theme.css)
css/* === EASING CURVES === */
--ease-default: cubic-bezier(0.4, 0, 0.2, 1);   /* General purpose — smooth decel */
--ease-in: cubic-bezier(0.4, 0, 1, 1);           /* Elements exiting — accelerate out */
--ease-out: cubic-bezier(0, 0, 0.2, 1);          /* Elements entering — decelerate in */
--ease-bounce: cubic-bezier(0.34, 1.56, 0.64, 1); /* Playful overshoot — use sparingly */
--ease-spring: cubic-bezier(0.175, 0.885, 0.32, 1.275); /* Subtle spring — toggles, switches */

/* === DURATION SCALE === */
--duration-micro: 100ms;    /* Button press, checkbox tick, instant feedback */
--duration-fast: 150ms;     /* Hover states, tooltip show, focus ring */
--duration-normal: 250ms;   /* Expand/collapse, tab switch, slide */
--duration-slow: 350ms;     /* Modal open, page transitions, large reveals */
--duration-enter: 250ms;    /* Elements appearing — slightly slower for notice */
--duration-exit: 200ms;     /* Elements disappearing — faster feels snappier */

/* === STAGGER === */
--stagger-delay: 50ms;      /* Delay between sequential items (list, grid) */

/* === TRANSFORMS === */
--scale-press: 0.97;        /* Button/card press feedback */
--scale-hover: 1.02;        /* Subtle hover grow */
--lift-hover: -1px;         /* Card hover lift (already exists as --card-ds-lift) */

When to Use Which Duration
DurationUse ForExamples--duration-micro (100ms)Instant feedback, state flipsButton press scale, checkbox check, toggle flip, color change on click--duration-fast (150ms)Hover effects, small revealsHover bg change, tooltip appear, focus ring, icon color--duration-normal (250ms)Medium transitions, content swapAccordion expand, tab content switch, dropdown open, slide in--duration-slow (350ms)Large reveals, full overlaysModal open, sidebar slide, page transition, onboarding steps--duration-enter (250ms)Any element appearingToast enter, notification slide in, skeleton→content--duration-exit (200ms)Any element disappearingToast exit, dropdown close, modal close
Rule: Exit is ALWAYS faster than enter. This feels more responsive.

When to Use Which Easing
EasingUse ForFeel--ease-defaultMost transitionsSmooth, professional, neutral--ease-outElements entering the screenDecelerates — arrives gracefully--ease-inElements leaving the screenAccelerates — departs quickly--ease-bouncePlayful confirmationsOvershoot — use ONLY for success states, toggle on--ease-springSwitches, togglesSubtle overshoot — physical, tactile
Rule: When in doubt, use --ease-default. Bounce/spring should appear max 1-2 times per page.

Component Motion Patterns
Buttons
css.button {
  transition: 
    background-color var(--duration-fast) var(--ease-default),
    transform var(--duration-micro) var(--ease-default),
    box-shadow var(--duration-fast) var(--ease-default);
}
.button:active {
  transform: scale(var(--scale-press));
}
Cards (hover lift)
css.card {
  transition: 
    box-shadow var(--duration-fast) var(--ease-default),
    transform var(--duration-fast) var(--ease-default);
}
.card:hover {
  box-shadow: var(--card-ds-shadow-hover);
  transform: translateY(var(--lift-hover));
}
Accordion / Expand-Collapse
css.accordion-content {
  transition: height var(--duration-normal) var(--ease-default);
  overflow: hidden;
}
/* Use max-height if height animation is complex */
Dropdown / Select
css/* Opening */
.dropdown-enter {
  animation: dropdown-in var(--duration-enter) var(--ease-out);
}
@keyframes dropdown-in {
  from { opacity: 0; transform: translateY(-8px) scale(0.95); }
  to { opacity: 1; transform: translateY(0) scale(1); }
}

/* Closing */
.dropdown-exit {
  animation: dropdown-out var(--duration-exit) var(--ease-in);
}
@keyframes dropdown-out {
  from { opacity: 1; transform: translateY(0) scale(1); }
  to { opacity: 0; transform: translateY(-4px) scale(0.98); }
}
Modal
css/* Opening — backdrop + panel */
.modal-backdrop-enter {
  animation: fade-in var(--duration-slow) var(--ease-default);
}
.modal-panel-enter {
  animation: modal-in var(--duration-slow) var(--ease-out);
}
@keyframes modal-in {
  from { opacity: 0; transform: scale(0.95) translateY(16px); }
  to { opacity: 1; transform: scale(1) translateY(0); }
}

/* Closing — faster */
.modal-panel-exit {
  animation: modal-out var(--duration-exit) var(--ease-in);
}
Toast / Notification
css/* Enter from right */
.toast-enter {
  animation: toast-in var(--duration-enter) var(--ease-out);
}
@keyframes toast-in {
  from { opacity: 0; transform: translateX(100%); }
  to { opacity: 1; transform: translateX(0); }
}

/* Exit to right — faster */
.toast-exit {
  animation: toast-out var(--duration-exit) var(--ease-in);
}
Toggle / Switch
css.toggle-thumb {
  transition: transform var(--duration-fast) var(--ease-spring);
}
Tabs (content swap)
css.tab-content-enter {
  animation: fade-in var(--duration-normal) var(--ease-default);
}
@keyframes fade-in {
  from { opacity: 0; }
  to { opacity: 1; }
}
Tooltip
css.tooltip-enter {
  animation: tooltip-in var(--duration-fast) var(--ease-out);
}
@keyframes tooltip-in {
  from { opacity: 0; transform: translateY(4px); }
  to { opacity: 1; transform: translateY(0); }
}
Skeleton → Content
css/* Skeleton pulse */
.skeleton {
  animation: pulse 1.5s var(--ease-default) infinite;
}
@keyframes pulse {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.4; }
}

/* Content reveal (replaces skeleton) */
.content-reveal {
  animation: fade-in var(--duration-normal) var(--ease-out);
}
Stagger (lists and grids)
css/* Apply to each child with increasing delay */
.stagger-item {
  animation: fade-up var(--duration-enter) var(--ease-out) both;
}
.stagger-item:nth-child(1) { animation-delay: 0ms; }
.stagger-item:nth-child(2) { animation-delay: var(--stagger-delay); }
.stagger-item:nth-child(3) { animation-delay: calc(var(--stagger-delay) * 2); }
.stagger-item:nth-child(4) { animation-delay: calc(var(--stagger-delay) * 3); }
/* ... up to ~8 items, then batch the rest */

@keyframes fade-up {
  from { opacity: 0; transform: translateY(8px); }
  to { opacity: 1; transform: translateY(0); }
}

Reduced Motion
MANDATORY on every animated component:
css@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
}
Place this in global-modern.css ONCE. It covers all components globally.
Additional per-component rule: If a component uses JavaScript-driven animation (e.g., requestAnimationFrame), it must also check:
javascriptconst prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

Rules

Every transition/animation MUST use tokens — no hardcoded ms, s, or cubic-bezier values
Exit is always faster than enter — --duration-exit < --duration-enter
Bounce/spring used sparingly — max 1-2 per page, only for positive feedback
No animation on first paint — stagger and reveal only after interaction or scroll
Spinners are the only infinite animation — everything else plays once
Test at 2× duration — if it feels sluggish at 2×, simplify the animation
Motion must never block interaction — user can click during animation
Reduced motion is not optional — every component must respect the media query