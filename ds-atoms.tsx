import React from "react";
import {
  SectionCard, SubLabel, ShowRow, TierHeader, SizeStrip,
} from "../../docs/ComponentShowcase";

// ════════════════════════════════════════════════════════════════════════════
//  SHARED TYPES
// ════════════════════════════════════════════════════════════════════════════
type Size = "sm" | "md" | "lg";

// ════════════════════════════════════════════════════════════════════════════
//  1. TYPOGRAPHY
// ════════════════════════════════════════════════════════════════════════════
type TypVariant = "h1"|"h2"|"h3"|"h4"|"display"|"heading"|"title"|"body"|"label"|"micro";
type TypColor   = "primary"|"secondary"|"tertiary"|"brand"|"success"|"error"|"warning"|"info"|"disabled"|"inverse";
type TypWeight  = "regular"|"medium"|"semibold"|"bold";

const typSize: Record<TypVariant, string> = {
  h1:"var(--text-h1)", h2:"var(--text-h2)", h3:"var(--text-h3)", h4:"var(--text-h4)",
  display:"var(--text-display)", heading:"var(--text-heading)", title:"var(--text-title)",
  body:"var(--text-base)", label:"var(--text-caption)", micro:"var(--text-micro)",
};
const typColor: Record<TypColor, string> = {
  primary:"var(--fg-primary)", secondary:"var(--fg-secondary)", tertiary:"var(--fg-tertiary)",
  brand:"var(--fg-brand)", success:"var(--fg-success)", error:"var(--fg-error)",
  warning:"var(--fg-warning)", info:"var(--fg-info)", disabled:"var(--fg-disabled)",
  inverse:"var(--fg-inverse)",
};
const typWeight: Record<TypWeight, string> = {
  regular:"var(--font-weight-normal)", medium:"var(--font-weight-medium)",
  semibold:"var(--font-weight-semibold)", bold:"var(--font-weight-bold)",
};
const typHeadingWeight: Partial<Record<TypVariant, TypWeight>> = {
  h1:"bold", h2:"bold", h3:"bold", h4:"bold", display:"bold", heading:"semibold", title:"semibold",
};
const typEl: Partial<Record<TypVariant, string>> = { h1:"h1", h2:"h2", h3:"h3", h4:"h4" };

interface TypographyProps {
  variant?: TypVariant; color?: TypColor; weight?: TypWeight;
  display?: boolean; mono?: boolean; truncate?: boolean;
  style?: React.CSSProperties; className?: string; children: React.ReactNode; as?: string;
}
export function Typography({
  variant="body", color="primary", weight, display:useDisplay, mono, truncate, style, className, children, as,
}: TypographyProps) {
  const Tag = (as ?? typEl[variant] ?? "span") as any;
  const fw = weight ? typWeight[weight] : typHeadingWeight[variant] ? typWeight[typHeadingWeight[variant]!] : "var(--font-weight-normal)";
  const typLineHeight: Partial<Record<TypVariant, string>> = {
    micro:   "var(--line-height-xs)",
    label:   "var(--line-height-sm)",
    body:    "var(--line-height-md)",
    title:   "var(--line-height-lg)",
    heading: "var(--line-height-xl)",
    display: "var(--line-height-2xl)",
    h4:      "var(--line-height-2xl)",
    h3:      "var(--line-height-2xl)",
    h2:      "var(--line-height-2xl)",
    h1:      "var(--line-height-2xl)",
  };
  return (
    <Tag className={className} style={{
      fontSize: typSize[variant], color: typColor[color], margin: 0,
      fontFamily: mono ? "var(--font-family-mono)" : useDisplay ? "var(--font-family-display)" : "var(--font-family-primary)",
      fontWeight: fw,
      lineHeight: typLineHeight[variant] ?? "var(--line-height-lg)",
      ...(truncate ? { overflow:"hidden", textOverflow:"ellipsis", whiteSpace:"nowrap" as const } : {}),
      ...style,
    }}>{children}</Tag>
  );
}

// ════════════════════════════════════════════════════════════════════════════
//  2. DIVIDER
// ════════════════════════════════════════════════════════════════════════════
interface DividerProps {
  vertical?: boolean; label?: string; style?: React.CSSProperties; className?: string;
}
export function Divider({ vertical, label, style, className }: DividerProps) {
  if (vertical) {
    return <div className={className} style={{ width:"var(--border-width-thin)", background:"var(--border-divider)", alignSelf:"stretch", ...style }} />;
  }
  if (label) {
    return (
      <div className={className} style={{ display:"flex", alignItems:"center", gap:"var(--space-3)", ...style }}>
        <div style={{ flex:1, height:"var(--border-width-thin)", background:"var(--border-divider)" }} />
        <Typography variant="label" color="tertiary">{label}</Typography>
        <div style={{ flex:1, height:"var(--border-width-thin)", background:"var(--border-divider)" }} />
      </div>
    );
  }
  return <div className={className} style={{ height:"var(--border-width-thin)", background:"var(--border-divider)", ...style }} />;
}

// ════════════════════════════════════════════════════════════════════════════
//  3. ICON
// ════════════════════════════════════════════════════════════════════════════
type IconName = "check"|"x"|"plus"|"minus"|"chevron-down"|"chevron-right"|"chevron-left"|"chevron-up"|"search"|"bell"|"user"|"settings"|"edit"|"trash"|"upload"|"download"|"star"|"heart"|"eye"|"eye-off"|"calendar"|"clock"|"info"|"warning"|"error"|"success"|"arrow-right"|"arrow-left"|"menu"|"grid"|"list"|"filter"|"sort"|"copy"|"external-link"|"refresh"|"more"|"lock"|"unlock"|"mail"|"phone"|"globe"|"home"|"folder"|"file"|"image"|"video"|"audio";
type IconColor = "primary"|"secondary"|"tertiary"|"brand"|"success"|"error"|"warning"|"info"|"inverse"|"disabled";

const iconPaths: Partial<Record<IconName, string>> = {
  check:          "M3 8L6.5 11.5L13 5",
  x:              "M3 3L13 13M13 3L3 13",
  plus:           "M8 3V13M3 8H13",
  minus:          "M3 8H13",
  "chevron-down": "M3 5.5L8 10.5L13 5.5",
  "chevron-right":"M5.5 3L10.5 8L5.5 13",
  "chevron-left": "M10.5 3L5.5 8L10.5 13",
  "chevron-up":   "M3 10.5L8 5.5L13 10.5",
  search:         "M7 12.5A5.5 5.5 0 1 0 7 1.5a5.5 5.5 0 0 0 0 11Zm4.5 1L14.5 14.5",
  bell:           "M8 2.5a4 4 0 0 1 4 4V10l1.5 2H2.5L4 10V6.5a4 4 0 0 1 4-4Zm-1.5 10a1.5 1.5 0 0 0 3 0",
  user:           "M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6Zm-5 5.5a5 5 0 0 1 10 0",
  settings:       "M8 10a2 2 0 1 0 0-4 2 2 0 0 0 0 4Zm0-7.5V1M8 15v-1.5M1 8H2.5M13.5 8H15M3.2 3.2l1 1M11.8 11.8l1 1M3.2 12.8l1-1M11.8 4.2l1-1",
  edit:           "M10 3L13 6L5 14H2V11L10 3Z",
  trash:          "M3 5h10M5.5 5V3.5h5V5M5.5 8v4.5M8 8v4.5M10.5 8v4.5M4 5l.5 8.5a1 1 0 0 0 1 1h5a1 1 0 0 0 1-1L12 5",
  upload:         "M8 10.5V3M5 6L8 3l3 3M3 12.5h10",
  download:       "M8 3v7.5M5 8l3 3 3-3M3 12.5h10",
  star:           "M8 2l1.8 3.6L14 6.3l-3 2.9.7 4.1L8 11.1 4.3 13.3l.7-4.1-3-2.9 4.2-.7L8 2Z",
  heart:          "M8 13.5C8 13.5 2 9.5 2 5.5a3.5 3.5 0 0 1 6-2.4A3.5 3.5 0 0 1 14 5.5c0 4-6 8-6 8Z",
  eye:            "M8 4C4 4 1.5 8 1.5 8S4 12 8 12s6.5-4 6.5-4S12 4 8 4Zm0 5.5a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3Z",
  "eye-off":      "M2 2l12 12M6.5 6.6a2 2 0 0 0 2.8 2.8M3 5C1.5 6.5 1 8 1 8s2.5 4 7 4c.8 0 1.6-.1 2.3-.4M5.7 3.7C6.4 3.3 7.2 3 8 3c4.5 0 7 4 7 4s-.5 1.4-2 2.8",
  calendar:       "M3.5 3.5h9a1 1 0 0 1 1 1v9a1 1 0 0 1-1 1h-9a1 1 0 0 1-1-1v-9a1 1 0 0 1 1-1ZM5 2v3M11 2v3M2.5 7h11",
  clock:          "M8 8V5M8 8l2.5 2.5M8 14A6 6 0 1 0 8 2a6 6 0 0 0 0 12Z",
  info:           "M8 7v5M8 5.5v.5M8 14A6 6 0 1 0 8 2a6 6 0 0 0 0 12Z",
  warning:        "M8 6v3.5M8 11.5V12M1.5 13L8 2l6.5 11H1.5Z",
  "error":        "M8 5.5v3.5M8 11.5V12M8 14A6 6 0 1 0 8 2a6 6 0 0 0 0 12Z",
  success:        "M5 8l2.5 2.5L11 5.5M8 14A6 6 0 1 0 8 2a6 6 0 0 0 0 12Z",
  "arrow-right":  "M3 8h10M9 5l4 3-4 3",
  "arrow-left":   "M13 8H3M7 11l-4-3 4-3",
  menu:           "M2.5 4.5h11M2.5 8h11M2.5 11.5h11",
  grid:           "M2 2h5v5H2zM9 2h5v5H9zM2 9h5v5H2zM9 9h5v5H9z",
  list:           "M5 4.5h9M5 8h9M5 11.5h9M2.5 4.5h.5M2.5 8h.5M2.5 11.5h.5",
  filter:         "M2 3.5h12M4.5 8h7M7 12.5h2",
  sort:           "M2 4h12M4 8h8M6 12h4",
  copy:           "M6 2h7a1 1 0 0 1 1 1v8M3 5a1 1 0 0 0-1 1v7a1 1 0 0 0 1 1h7a1 1 0 0 0 1-1V6a1 1 0 0 0-1-1H3Z",
  "external-link":"M10 2h4v4M14 2L8 8M6 3H3a1 1 0 0 0-1 1v9a1 1 0 0 0 1 1h9a1 1 0 0 0 1-1v-3",
  refresh:        "M13 8A5 5 0 1 1 8 3M13 3v5h-5",
  more:           "M8 8m-1 0a1 1 0 1 0 2 0 1 1 0 0 0-2 0M3 8m-1 0a1 1 0 1 0 2 0 1 1 0 0 0-2 0M13 8m-1 0a1 1 0 1 0 2 0 1 1 0 0 0-2 0",
  lock:           "M5.5 7V5.5a2.5 2.5 0 0 1 5 0V7M4 7h8a1 1 0 0 1 1 1v5a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V8a1 1 0 0 1 1-1Z",
  unlock:         "M5.5 7V5.5a2.5 2.5 0 0 1 5 0M4 7h8a1 1 0 0 1 1 1v5a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V8a1 1 0 0 1 1-1Z",
  mail:           "M2 4.5h12v9H2zM2 4.5l6 5 6-5",
  home:           "M2 8.5L8 3l6 5.5M4 7.5V13h3v-3h2v3h3V7.5",
  folder:         "M2 5.5a1 1 0 0 1 1-1h3l1.5 2H13a1 1 0 0 1 1 1v5a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1v-7Z",
  file:           "M4 2h6l4 4v9a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V3a1 1 0 0 1 1-1ZM9 2v4h4",
  image:          "M2 3.5h12v10H2zM2 10.5l4-4 3 3 2-2 3 3",
  phone:          "M4.5 2.5A1 1 0 0 0 3.5 3.5l-.5 2a9 9 0 0 0 7.5 7.5l2-.5a1 1 0 0 0 1-1v-2a1 1 0 0 0-.8-1L10.5 8A1 1 0 0 0 9.5 9l-.3.8A5.5 5.5 0 0 1 6.2 6.8L7 6.5a1 1 0 0 0 1-1L7.5 3.3a1 1 0 0 0-1-.8Z",
  globe:          "M8 2a6 6 0 1 0 0 12A6 6 0 0 0 8 2ZM2 8h12M8 2c-2 2-3 4-3 6s1 4 3 6M8 2c2 2 3 4 3 6s-1 4-3 6",
  video:          "M1.5 5h9a1 1 0 0 1 1 1v5a1 1 0 0 1-1 1h-9a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1Zm11 1.5 2.5-1.5v6l-2.5-1.5V6.5Z",
  audio:          "M8 3v10M5.5 5v6M3 6.5v3M10.5 5v6M13 6.5v3",
};

const iconColors: Record<IconColor, string> = {
  primary:"var(--icon-primary)", secondary:"var(--icon-secondary)", tertiary:"var(--icon-tertiary)",
  brand:"var(--icon-brand)", success:"var(--icon-success)", error:"var(--icon-error)",
  warning:"var(--icon-warning)", info:"var(--icon-info)", inverse:"var(--icon-inverse)",
  disabled:"var(--icon-disabled)",
};
const iconSizeVar: Record<Size, string> = { sm:"var(--icon-size-sm)", md:"var(--icon-size-md)", lg:"var(--icon-size-lg)" };

interface IconProps {
  name: IconName; size?: Size; color?: IconColor;
  style?: React.CSSProperties; className?: string;
}
export function Icon({ name, size="md", color="primary", style, className }: IconProps) {
  const sz = iconSizeVar[size];
  const path = iconPaths[name];
  const isRect = name === "grid";
  return (
    <svg viewBox="0 0 16 16" fill="none"
      className={className}
      style={{ width:sz, height:sz, flexShrink:0, display:"inline-block", ...style }}>
      {path && (isRect
        ? <path d={path} fill={iconColors[color]} />
        : <path d={path} stroke={iconColors[color]} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
      )}
    </svg>
  );
}

// ════════════════════════════════════════════════════════════════════════════
//  4. BUTTON
// ════════════════════════════════════════════════════════════════════════════
type BtnVariant = "primary"|"secondary"|"outline"|"ghost"|"danger"|"text"|"link";

const btnBg: Record<BtnVariant, string> = {
  primary:"var(--btn-primary-bg)", secondary:"var(--bg-primary)", outline:"transparent",
  ghost:"transparent", danger:"var(--btn-danger-bg)", text:"transparent", link:"transparent",
};
const btnFg: Record<BtnVariant, string> = {
  primary:"var(--btn-primary-fg)", secondary:"var(--fg-primary)", outline:"var(--fg-primary)",
  ghost:"var(--fg-secondary)", danger:"var(--btn-danger-fg)", text:"var(--fg-secondary)", link:"var(--fg-brand)",
};
const btnBorder: Record<BtnVariant, string> = {
  primary:"transparent", secondary:"var(--border-default)", outline:"var(--border-default)",
  ghost:"transparent", danger:"transparent", text:"transparent", link:"transparent",
};
const btnHeight: Record<Size, string> = {
  sm:"var(--btn-height-sm)", md:"var(--btn-height-md)", lg:"var(--btn-height-lg)",
};
const btnPadX: Record<Size, string> = {
  sm:"var(--btn-padding-sm)", md:"var(--btn-padding-md)", lg:"var(--btn-padding-lg)",
};
const btnFontSize: Record<Size, string> = {
  sm:"var(--text-caption)", md:"var(--text-base)", lg:"var(--text-title)",
};

interface ButtonProps {
  variant?: BtnVariant; size?: Size; disabled?: boolean; loading?: boolean;
  fullWidth?: boolean; icon?: React.ReactNode; iconPosition?: "left"|"right";
  children?: React.ReactNode; onClick?: () => void;
  style?: React.CSSProperties; className?: string;
  type?: "button"|"submit"|"reset";
}
export function Button({
  variant="primary", size="md", disabled, loading, fullWidth, icon, iconPosition="left",
  children, onClick, style, className, type="button",
}: ButtonProps) {
  const isDisabled = disabled || loading;
  return (
    <button
      type={type}
      disabled={isDisabled}
      onClick={onClick}
      className={className}
      style={{
        display:"inline-flex", alignItems:"center", justifyContent:"center",
        gap:"var(--btn-gap)", height:btnHeight[size],
        padding:`0 ${btnPadX[size]}`,
        background: isDisabled ? "var(--btn-disabled-bg)" : btnBg[variant],
        color: isDisabled ? "var(--btn-disabled-fg)" : btnFg[variant],
        border:`var(--border-width-thin) solid ${isDisabled ? "var(--btn-disabled-border)" : btnBorder[variant]}`,
        borderRadius:"var(--btn-radius)",
        fontSize:btnFontSize[size], fontFamily:"var(--font-family-primary)",
        fontWeight:"var(--font-weight-medium)" as any,
        cursor: isDisabled ? "not-allowed" : "pointer",
        width: fullWidth ? "100%" : undefined,
        textDecoration: variant==="link" ? "underline" : "none",
        opacity: isDisabled ? "var(--opacity-disabled)" as any : 1,
        outline:"none", boxSizing:"border-box" as const,
        lineHeight:"var(--line-height-none)",
        transition:`background var(--btn-transition), color var(--btn-transition), border-color var(--btn-transition), opacity var(--btn-transition)`,
        ...style,
      }}
    >
      {loading ? (
        <span style={{
          width:"var(--size-spinner-ring)", height:"var(--size-spinner-ring)", borderRadius:"var(--radius-full)",
          border:"var(--border-width-spinner) solid currentColor", borderTopColor:"transparent",
          display:"inline-block",
          animation:"spin 0.75s linear infinite",
          flexShrink: 0,
        }} />
      ) : icon && iconPosition==="left" ? icon : null}
      {children && <span>{children}</span>}
      {icon && iconPosition==="right" && !loading ? icon : null}
    </button>
  );
}

// ════════════════════════════════════════════════════════════════════════════
//  5. SPINNER
// ════════════════════════════════════════════════════════════════════════════
const spinnerSizeVar: Record<Size, string> = {
  sm:"var(--size-spinner-sm)", md:"var(--size-spinner-md)", lg:"var(--size-spinner-lg)",
};
const spinnerColor: Record<string, string> = {
  brand:"var(--primary)", neutral:"var(--fg-tertiary)", inverse:"var(--fg-inverse)",
};
interface SpinnerProps { size?: Size; color?: "brand"|"neutral"|"inverse"; style?: React.CSSProperties; }
export function Spinner({ size="md", color="brand", style }: SpinnerProps) {
  const szVar = spinnerSizeVar[size];
  return (
    <svg
      viewBox="0 0 24 24" fill="none"
      style={{ width:szVar, height:szVar, animation: "spin 0.8s linear infinite", flexShrink: 0, ...style }}
    >
      <circle cx="12" cy="12" r="9" stroke={spinnerColor[color]} strokeWidth="2.5" style={{ strokeOpacity:"var(--opacity-icon-wash)" }} />
      <path d="M12 3A9 9 0 0 1 21 12" stroke={spinnerColor[color]} strokeWidth="2.5" strokeLinecap="round" />
    </svg>
  );
}

// ════════════════════════════════════════════════════════════════════════════
//  6. SKELETON
// ════════════════════════════════════════════════════════════════════════════
function SkeletonBox({ w, h, r = "var(--radius-sm-ds)" }: { w: string|number; h: string|number; r?: string }) {
  return (
    <div style={{
      width:w, height:h, borderRadius:r,
      background:"linear-gradient(90deg, var(--skeleton-shimmer-from) 25%, var(--skeleton-shimmer-via) 50%, var(--skeleton-shimmer-from) 75%)",
      backgroundSize:"400% 100%",
      animation:"shimmer 1.6s ease-in-out infinite",
      flexShrink:0,
    }} />
  );
}
interface SkeletonProps {
  variant?: "text"|"circle"|"rect"|"card"; width?: string|number; height?: string|number; lines?: number; style?: React.CSSProperties;
}
export function Skeleton({ variant="text", width="100%", height, lines=3, style }: SkeletonProps) {
  if (variant==="circle") return <SkeletonBox w={height||40} h={height||40} r="var(--radius-full)" />;
  if (variant==="rect")   return <SkeletonBox w={width} h={height||80} r="var(--radius-sm-ds)" />;
  if (variant==="card") return (
    <div style={{ display:"flex", flexDirection:"column", gap:"var(--space-3)", padding:"var(--space-4)", background:"var(--bg-primary)", borderRadius:"var(--radius-md-ds)", border:"var(--border-width-thin) solid var(--border-default)", ...style }}>
      <div style={{ display:"flex", gap:"var(--space-3)", alignItems:"center" }}>
        <SkeletonBox w="var(--size-control-lg)" h="var(--size-control-lg)" r="var(--radius-full)" />
        <div style={{ flex:1, display:"flex", flexDirection:"column", gap:"var(--space-2)" }}>
          <SkeletonBox w="60%" h="var(--skeleton-text-h-md)" />
          <SkeletonBox w="40%" h="var(--space-3)" />
        </div>
      </div>
      <SkeletonBox w="100%" h="var(--space-3)" /><SkeletonBox w="80%" h="var(--space-3)" /><SkeletonBox w="60%" h="var(--space-3)" />
    </div>
  );
  return (
    <div style={{ display:"flex", flexDirection:"column", gap:"var(--space-2)", width, ...style }}>
      {Array.from({ length:lines }).map((_,i) => (
        <SkeletonBox key={i} w={i===lines-1 ? "60%" : "100%"} h="var(--skeleton-text-h-md)" />
      ))}
    </div>
  );
}

// ════════════════════════════════════════════════════════════════════════════
//  7. PROGRESS BAR
// ════════════════════════════════════════════════════════════════════════════
type ProgressStatus = "normal"|"success"|"error"|"warning"|"brand";
const progressTrackColor: Record<ProgressStatus, string> = {
  normal:"var(--progress-track-normal-bg)", success:"var(--progress-track-success-bg)", error:"var(--progress-track-error-bg)", warning:"var(--progress-track-warning-bg)", brand:"var(--progress-track-brand-bg)",
};
const progressFillColor: Record<ProgressStatus, string> = {
  normal:"var(--progress-fill-default)", success:"var(--status-healthy)", error:"var(--status-unhealthy)", warning:"var(--progress-fill-warning)", brand:"var(--primary)",
};
const progressHeightVar: Record<Size, string> = {
  sm:"var(--progress-h-sm)", md:"var(--progress-h-md)", lg:"var(--progress-h-lg)",
};

interface ProgressBarProps {
  percent?: number; status?: ProgressStatus; size?: Size; height?: string;
  showLabel?: boolean; fullWidth?: boolean; style?: React.CSSProperties;
}
export function ProgressBar({ percent=0, status="normal", size="md", height, showLabel, fullWidth, style }: ProgressBarProps) {
  const h = height ?? progressHeightVar[size];
  return (
    <div style={{ display:"inline-flex", alignItems:"center", gap:"var(--space-2)", width:fullWidth?"100%":undefined, ...style }}>
      <div style={{ flex: fullWidth ? 1 : undefined, width: fullWidth ? undefined : "var(--progress-default-w)", height:h, borderRadius:"var(--radius-full)", background:progressTrackColor[status], overflow:"hidden" }}>
        <div style={{ width:`${Math.min(100, Math.max(0, percent))}%`, height:"100%", borderRadius:"var(--radius-full)", background:progressFillColor[status], transition:`width var(--duration-slow) var(--ease-out)` }} />
      </div>
      {showLabel && <Typography variant="micro" color="secondary">{percent}%</Typography>}
    </div>
  );
}

// ════════════════════════════════════════════════════════════════════════════
//  8. BADGE  (BadgeLabel + BadgeDot)
// ════════════════════════════════════════════════════════════════════════════
type BadgeVariant = "primary"|"success"|"error"|"warning"|"neutral"|"info"|"disconnected";
const badgeBg: Record<BadgeVariant, string> = {
  primary:"var(--badge-primary-bg)", success:"var(--badge-success-bg)", error:"var(--badge-error-bg)",
  warning:"var(--badge-warning-bg)", neutral:"var(--badge-neutral-bg)", info:"var(--badge-info-bg)",
  disconnected:"var(--badge-disconnected-bg)",
};
const badgeFg: Record<BadgeVariant, string> = {
  primary:"var(--badge-primary-fg)", success:"var(--badge-success-fg)", error:"var(--badge-error-fg)",
  warning:"var(--badge-warning-fg)", neutral:"var(--badge-neutral-fg)", info:"var(--badge-info-fg)",
  disconnected:"var(--badge-disconnected-fg)",
};
const badgeCount: Record<BadgeVariant, string> = {
  primary:"var(--primary)", success:"var(--status-healthy)", error:"var(--status-unhealthy)",
  warning:"var(--status-warning)", neutral:"var(--fg-secondary)", info:"var(--accent)",
  disconnected:"var(--fg-disabled)",
};

interface BadgeLabelProps {
  label: string; variant?: BadgeVariant; size?: "sm"|"md"; dot?: boolean; style?: React.CSSProperties;
}
export function BadgeLabel({ label, variant="neutral", size="md", dot, style }: BadgeLabelProps) {
  const px = size==="sm" ? "var(--space-1)" : "var(--badge-padding-x)";
  const py = "var(--badge-padding-y)";
  return (
    <span style={{
      display:"inline-flex", alignItems:"center", gap:"var(--badge-gap)",
      padding:`${py} ${px}`, borderRadius:"var(--badge-radius)",
      background:badgeBg[variant], color:badgeFg[variant],
      fontSize: size==="sm" ? "var(--text-micro)" : "var(--badge-font-size)",
      fontFamily:"var(--font-family-primary)", fontWeight:"var(--font-weight-medium)" as any,
      lineHeight:"var(--badge-line-height)", whiteSpace:"nowrap" as const, ...style,
    }}>
      {dot && <span style={{ width:"var(--size-dot-sm)", height:"var(--size-dot-sm)", borderRadius:"var(--radius-full)", background:badgeCount[variant], flexShrink:0 }} />}
      {label}
    </span>
  );
}

interface BadgeDotProps { variant?: BadgeVariant; count?: number; style?: React.CSSProperties; }
export function BadgeDot({ variant="error", count, style }: BadgeDotProps) {
  if (count !== undefined) {
    return (
      <span style={{
        display:"inline-flex", alignItems:"center", justifyContent:"center",
        minWidth:"var(--space-4)", height:"var(--space-4)",
        borderRadius:"var(--radius-full)", padding:"0 var(--space-1)",
        background:badgeCount[variant], color:"var(--fg-inverse)",
        fontSize:"var(--text-micro)", fontFamily:"var(--font-family-mono)",
        fontWeight:"var(--font-weight-bold)" as any, ...style,
      }}>{count > 99 ? "99+" : count}</span>
    );
  }
  return <span style={{ width:"var(--size-dot-md)", height:"var(--size-dot-md)", borderRadius:"var(--radius-full)", background:badgeCount[variant], display:"inline-block", flexShrink:0, ...style }} />;
}

// ════════════════════════════════════════════════════════════════════════════
//  9. TAG
// ════════════════════════════════════════════════════════════════════════════
type TagVariant = "primary"|"success"|"error"|"warning"|"neutral"|"info"|"purple"|"pink"|"orange"|"sky";
const tagBg: Record<TagVariant, string> = {
  primary:"var(--tag-primary-bg)", success:"var(--tag-success-bg)", error:"var(--tag-error-bg)",
  warning:"var(--tag-warning-bg)", neutral:"var(--tag-neutral-bg)", info:"var(--tag-info-bg)",
  purple:"var(--tag-purple-bg)", pink:"var(--tag-pink-bg)", orange:"var(--tag-orange-bg)", sky:"var(--tag-sky-bg)",
};
const tagFg: Record<TagVariant, string> = {
  primary:"var(--tag-primary-fg)", success:"var(--tag-success-fg)", error:"var(--tag-error-fg)",
  warning:"var(--tag-warning-fg)", neutral:"var(--tag-neutral-fg)", info:"var(--tag-info-fg)",
  purple:"var(--tag-purple-fg)", pink:"var(--tag-pink-fg)", orange:"var(--tag-orange-fg)", sky:"var(--tag-sky-fg)",
};

interface TagProps {
  label: string; variant?: TagVariant; closable?: boolean; onClose?: () => void;
  icon?: React.ReactNode; size?: "sm"|"md"; style?: React.CSSProperties;
}
export function Tag({ label, variant="neutral", closable, onClose, icon, size="md", style }: TagProps) {
  return (
    <span style={{
      display:"inline-flex", alignItems:"center", gap:"var(--space-1)",
      padding: size==="sm" ? "var(--tag-padding-y) var(--tag-padding-x-sm)" : "var(--tag-padding-y) var(--tag-padding-x-md)",
      borderRadius:"var(--badge-radius)",
      background:tagBg[variant], color:tagFg[variant],
      fontSize: size==="sm" ? "var(--text-micro)" : "var(--text-caption)",
      fontFamily:"var(--font-family-primary)", fontWeight:"var(--font-weight-medium)" as any,
      whiteSpace:"nowrap" as const, ...style,
    }}>
      {icon && <span style={{ display:"flex", alignItems:"center" }}>{icon}</span>}
      {label}
      {closable && (
        <button onClick={onClose} style={{ background:"none", border:"none", cursor:"pointer", padding:0, display:"flex", alignItems:"center", color:"currentColor", opacity:"var(--opacity-muted)" as any }}>
          <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
            <path d="M2 2l6 6M8 2L2 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
        </button>
      )}
    </span>
  );
}

// ════════════════════════════════════════════════════════════════════════════
//  10. AVATAR
// ════════════════════════════════════════════════════════════════════════════
type AvatarSize = "sm"|"md"|"lg"|"xl";
type AvatarShape = "circle"|"square";
type AvatarStatus = "online"|"offline"|"busy"|"away";
const avatarSizeVar: Record<AvatarSize, string> = {
  sm:"var(--avatar-size-sm)", md:"var(--avatar-size-md)", lg:"var(--avatar-size-lg)", xl:"var(--avatar-size-xl)",
};
const avatarFont: Record<AvatarSize, string> = { sm:"var(--avatar-font-sm)", md:"var(--avatar-font-md)", lg:"var(--avatar-font-lg)", xl:"var(--avatar-font-xl)" };
const statusColor: Record<AvatarStatus, string> = { online:"var(--status-healthy)", offline:"var(--fg-disabled)", busy:"var(--status-unhealthy)", away:"var(--status-warning)" };
const statusDotVar: Record<AvatarSize, string> = {
  sm:"var(--size-dot-sm)", md:"var(--size-dot-md)", lg:"var(--size-dot-md)", xl:"var(--size-dot-lg)",
};

interface AvatarProps {
  size?: AvatarSize; shape?: AvatarShape; src?: string; label?: string;
  status?: AvatarStatus; style?: React.CSSProperties; className?: string;
}
export function Avatar({ size="md", shape="circle", src, label, status, style, className }: AvatarProps) {
  const szVar = avatarSizeVar[size];
  const dotVar = statusDotVar[size];
  const radius = shape==="circle" ? "var(--radius-full)" : "var(--radius-sm-ds)";
  return (
    <div className={className} style={{ position:"relative", width:szVar, height:szVar, flexShrink:0, ...style }}>
      {src ? (
        <img src={src} alt={label||"avatar"} style={{ width:"100%", height:"100%", borderRadius:radius, objectFit:"cover" }} />
      ) : (
        <div style={{
          width:"100%", height:"100%", borderRadius:radius,
          background:"var(--bg-secondary)", color:"var(--fg-secondary)",
          display:"flex", alignItems:"center", justifyContent:"center",
          fontSize:avatarFont[size], fontFamily:"var(--font-family-primary)",
          fontWeight:"var(--font-weight-semibold)" as any,
        }}>
          {label ? label.slice(0,2).toUpperCase() : "?"}
        </div>
      )}
      {status && (
        <span style={{
          position:"absolute", bottom:0, right:0,
          width:dotVar, height:dotVar, borderRadius:"var(--radius-full)",
          background:statusColor[status], border:`var(--border-width-medium) solid var(--bg-primary)`,
        }} />
      )}
    </div>
  );
}

// ════════════════════════════════════════════════════════════════════════════
//  11. TEXT INPUT  (TextInput, InputPassword, InputNumber)
// ════════════════════════════════════════════════════════════════════════════
const inputHeight: Record<Size, string> = { sm:"var(--input-ds-height-sm)", md:"var(--input-ds-height-md)", lg:"var(--input-ds-height-lg)" };
const inputPadX: Record<Size, string> = { sm:"var(--space-2)", md:"var(--space-3)", lg:"var(--space-3)" };

interface TextInputProps {
  size?: Size; placeholder?: string; value?: string; defaultValue?: string;
  disabled?: boolean; error?: boolean; prefix?: React.ReactNode; suffix?: React.ReactNode;
  onChange?: (v: string) => void; style?: React.CSSProperties; className?: string; type?: string;
}
export function TextInput({ size="md", placeholder, value, defaultValue, disabled, error, prefix, suffix, onChange, style, className, type="text" }: TextInputProps) {
  return (
    <div className={className} style={{
      display:"flex", alignItems:"center", gap:"var(--space-2)",
      height:inputHeight[size], padding:`0 ${inputPadX[size]}`,
      background: disabled ? "var(--input-ds-bg-disabled)" : error ? "var(--input-ds-bg-error)" : "var(--input-ds-bg)",
      border:`var(--border-width-thin) solid ${error ? "var(--input-ds-border-error)" : "var(--input-ds-border)"}`,
      borderRadius:"var(--input-ds-radius)",
      boxShadow:"var(--input-ds-shadow)",
      boxSizing:"border-box" as const,
      transition:`border-color var(--duration-fast) var(--ease-out)`,
      ...style,
    }}>
      {prefix && <span style={{ display:"flex", flexShrink:0, color:"var(--fg-tertiary)" }}>{prefix}</span>}
      <input
        type={type} value={value} defaultValue={defaultValue}
        placeholder={placeholder} disabled={disabled}
        onChange={e => onChange?.(e.target.value)}
        style={{
          flex:1, border:"none", outline:"none", background:"transparent",
          fontSize:"var(--input-ds-font-size)", color: disabled ? "var(--input-ds-fg-disabled)" : "var(--input-ds-fg)",
          fontFamily:"var(--font-family-primary)",
        }}
      />
      {suffix && <span style={{ display:"flex", flexShrink:0, color:"var(--fg-tertiary)" }}>{suffix}</span>}
    </div>
  );
}

interface InputPasswordProps { size?: Size; placeholder?: string; disabled?: boolean; showPassword?: boolean; style?: React.CSSProperties; }
export function InputPassword({ size="md", placeholder="Password", disabled, showPassword, style }: InputPasswordProps) {
  return (
    <TextInput size={size} type={showPassword ? "text" : "password"} placeholder={placeholder} disabled={disabled}
      suffix={
        <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
          {showPassword
            ? <g><circle cx="8" cy="8" r="2" stroke="var(--icon-tertiary)" strokeWidth="1.5"/><path d="M1.5 8s2.5-5 6.5-5 6.5 5 6.5 5-2.5 5-6.5 5S1.5 8 1.5 8Z" stroke="var(--icon-tertiary)" strokeWidth="1.5"/></g>
            : <g><path d="M2 2l12 12M6.5 6.5a2 2 0 0 0 3 3" stroke="var(--icon-tertiary)" strokeWidth="1.5" strokeLinecap="round"/><path d="M3 5C1.5 6.5 1 8 1 8s2.5 4 7 4c.8 0 1.6-.1 2.3-.4" stroke="var(--icon-tertiary)" strokeWidth="1.5" strokeLinecap="round"/><path d="M5.7 3.7C6.4 3.3 7.2 3 8 3c4.5 0 7 4 7 4s-.5 1.4-2 2.8" stroke="var(--icon-tertiary)" strokeWidth="1.5" strokeLinecap="round"/></g>
          }
        </svg>
      }
      style={style}
    />
  );
}

interface InputNumberProps { size?: Size; value?: number; min?: number; max?: number; disabled?: boolean; step?: number; onChange?: (v: number) => void; style?: React.CSSProperties; }
export function InputNumber({ size="md", value=0, min, max, disabled, step=1, onChange, style }: InputNumberProps) {
  const [internal, setInternal] = React.useState(value);
  const current = onChange !== undefined ? value : internal;
  const set = (n: number) => {
    const clamped = min !== undefined ? Math.max(min, n) : max !== undefined ? Math.min(max, n) : n;
    setInternal(clamped);
    onChange?.(clamped);
  };
  const h = inputHeight[size];
  const btnSize: Record<Size, string> = { sm:"var(--size-control-sm)", md:"var(--size-control-md)", lg:"var(--size-control-lg)" };
  const canDec = min === undefined || current > min;
  const canInc = max === undefined || current < max;
  return (
    <div style={{ display:"flex", height:h, border:`var(--border-width-thin) solid var(--input-ds-border)`, borderRadius:"var(--input-ds-radius)", overflow:"hidden", background:disabled?"var(--input-ds-bg-disabled)":"var(--input-ds-bg)", boxSizing:"border-box" as const, opacity:disabled?"var(--opacity-muted)" as any:1, transition:`border-color var(--duration-fast) var(--ease-out)`, ...style }}>
      <button
        disabled={disabled || !canDec}
        onClick={() => set(current - step)}
        style={{ width:btnSize[size], height:"100%", display:"flex", alignItems:"center", justifyContent:"center", border:"none", background:"transparent", cursor:disabled||!canDec?"not-allowed":"pointer", color:"var(--fg-secondary)", borderRight:`var(--border-width-thin) solid var(--border-default)`, flexShrink:0, transition:`background var(--duration-fast) var(--ease-out)` }}
      >
        <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M2 6H10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></svg>
      </button>
      <input
        readOnly={!onChange}
        value={current}
        disabled={disabled}
        onChange={e => { const n = Number(e.target.value); if (!isNaN(n)) set(n); }}
        style={{ flex:1, border:"none", outline:"none", background:"transparent", textAlign:"center" as const, fontSize:"var(--input-ds-font-size)", color:disabled?"var(--input-ds-fg-disabled)":"var(--input-ds-fg)", fontFamily:"var(--font-family-primary)", boxSizing:"border-box" as const, minWidth:0 }}
      />
      <button
        disabled={disabled || !canInc}
        onClick={() => set(current + step)}
        style={{ width:btnSize[size], height:"100%", display:"flex", alignItems:"center", justifyContent:"center", border:"none", background:"transparent", cursor:disabled||!canInc?"not-allowed":"pointer", color:"var(--fg-secondary)", borderLeft:`var(--border-width-thin) solid var(--border-default)`, flexShrink:0, transition:`background var(--duration-fast) var(--ease-out)` }}
      >
        <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M6 2V10M2 6H10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></svg>
      </button>
    </div>
  );
}

// ════════════════════════════════════════════════════════════════════════════
//  12. TEXT AREA
// ════════════════════════════════════════════════════════════════════════════
const textAreaRows: Record<Size, number> = { sm:2, md:3, lg:4 };
interface TextAreaProps {
  size?: Size; placeholder?: string; value?: string; disabled?: boolean; error?: boolean;
  resizable?: boolean; style?: React.CSSProperties;
  onChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
}
export function TextArea({ size="md", placeholder, value, disabled, error, resizable=true, style, onChange }: TextAreaProps) {
  return (
    <textarea
      readOnly={!onChange} value={value} onChange={onChange} placeholder={placeholder} disabled={disabled} rows={textAreaRows[size]}
      style={{
        display:"block", width:"100%", padding:"var(--space-2) var(--space-3)",
        background: disabled ? "var(--input-ds-bg-disabled)" : error ? "var(--input-ds-bg-error)" : "var(--input-ds-bg)",
        border:`var(--border-width-thin) solid ${error ? "var(--input-ds-border-error)" : "var(--input-ds-border)"}`,
        borderRadius:"var(--input-ds-radius)", fontSize:"var(--input-ds-font-size)",
        color: disabled ? "var(--input-ds-fg-disabled)" : "var(--input-ds-fg)",
        fontFamily:"var(--font-family-primary)", resize: resizable ? "vertical" : "none",
        outline:"none", boxSizing:"border-box" as const,
        transition:`border-color var(--duration-fast) var(--ease-out)`,
        minHeight: size==="sm" ? "var(--textarea-min-h-sm)" : size==="md" ? "var(--textarea-min-h-md)" : "var(--textarea-min-h-lg)",
        ...style,
      }}
    />
  );
}

// ════════════════════════════════════════════════════════════════════════════
//  13. SELECT
// ══════════════════════════════════��═════════════════════════════════════════
interface SelectOption { label: string; value: string; }
interface SelectProps {
  size?: Size; placeholder?: string; value?: string; options?: SelectOption[];
  disabled?: boolean; error?: boolean; onChange?: (v: string) => void;
  style?: React.CSSProperties; className?: string;
}
export function Select({ size="md", placeholder="Select...", value, options=[], disabled, error, onChange, style, className }: SelectProps) {
  return (
    <div className={className} style={{
      display:"flex", alignItems:"center",
      height:inputHeight[size], padding:`0 ${inputPadX[size]}`,
      background: disabled ? "var(--input-ds-bg-disabled)" : error ? "var(--input-ds-bg-error)" : "var(--input-ds-bg)",
      border:`var(--border-width-thin) solid ${error ? "var(--input-ds-border-error)" : "var(--input-ds-border)"}`,
      borderRadius:"var(--input-ds-radius)",
      boxSizing:"border-box" as const,
      transition:`border-color var(--duration-fast) var(--ease-out)`,
      ...style,
    }}>
      <select value={value||""} disabled={disabled}
        onChange={e => onChange?.(e.target.value)}
        style={{
          flex:1, border:"none", outline:"none", background:"transparent",
          fontSize:"var(--input-ds-font-size)", color: value ? "var(--input-ds-fg)" : "var(--input-ds-placeholder)",
          fontFamily:"var(--font-family-primary)", cursor: disabled ? "not-allowed" : "pointer",
          appearance:"none" as const,
        }}>
        {!value && <option value="" disabled>{placeholder}</option>}
        {options.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
      </select>
      <svg width="12" height="12" viewBox="0 0 12 12" fill="none" style={{ flexShrink:0 }}>
        <path d="M2 4.5L6 8.5L10 4.5" stroke="var(--icon-tertiary)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    </div>
  );
}

// ════════════════════════════════════════════════════════════════════════════
//  14. CHECKBOX
// ════════════════════════════════════════════════════════════════════════════
interface CheckboxProps {
  checked?: boolean; indeterminate?: boolean; disabled?: boolean;
  label?: string; onChange?: (v: boolean) => void; style?: React.CSSProperties;
}
export function Checkbox({ checked, indeterminate, disabled, label, onChange, style }: CheckboxProps) {
  const active = checked || indeterminate;
  return (
    <label style={{ display:"inline-flex", alignItems:"center", gap:"var(--space-2)", cursor:disabled?"not-allowed":"pointer", ...style }}>
      <div
        onClick={() => !disabled && onChange?.(!checked)}
        style={{
          width:"var(--checkbox-size)", height:"var(--checkbox-size)",
          borderRadius:"var(--radius-xs)", flexShrink:0,
          border:`var(--border-width-medium) solid ${active ? "var(--checkbox-border-checked)" : "var(--checkbox-border)"}`,
          background: active ? "var(--checkbox-fill-checked)" : "var(--bg-primary)",
          display:"flex", alignItems:"center", justifyContent:"center",
          opacity: disabled ? "var(--opacity-disabled-soft)" as any : 1, cursor: disabled ? "not-allowed" : "pointer",
          transition:`background var(--duration-fast) var(--ease-out), border-color var(--duration-fast) var(--ease-out)`,
        }}>
        {indeterminate
          ? <svg width="10" height="2" viewBox="0 0 10 2" fill="none"><path d="M1 1h8" stroke="var(--fg-inverse)" strokeWidth="1.8" strokeLinecap="round"/></svg>
          : checked
          ? <svg width="10" height="8" viewBox="0 0 10 8" fill="none"><path d="M1.5 4L4 6.5L8.5 1.5" stroke="var(--fg-inverse)" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/></svg>
          : null
        }
      </div>
      {label && <Typography variant="body" color={disabled ? "disabled" : "primary"}>{label}</Typography>}
    </label>
  );
}

// ════════════════════════════════════════════════════════════════════════════
//  15. RADIO + RADIO GROUP
// ════════════════════════════════════════════════════════════════════════════
interface RadioProps { checked?: boolean; disabled?: boolean; label?: string; style?: React.CSSProperties; onClick?: () => void; }
export function Radio({ checked, disabled, label, style, onClick }: RadioProps) {
  return (
    <label style={{ display:"inline-flex", alignItems:"center", gap:"var(--space-2)", cursor:disabled?"not-allowed":"pointer", ...style }}>
      <div onClick={() => !disabled && onClick?.()} style={{
        width:"var(--radio-size)", height:"var(--radio-size)", borderRadius:"var(--radius-full)",
        border:`var(--border-width-medium) solid ${checked ? "var(--radio-border-checked)" : "var(--radio-border)"}`,
        background:"var(--bg-primary)", display:"flex", alignItems:"center", justifyContent:"center",
        opacity:disabled?"var(--opacity-disabled-soft)" as any:1, cursor:disabled?"not-allowed":"pointer", flexShrink:0,
        transition:`border-color var(--duration-fast) var(--ease-out)`,
      }}>
        {checked && <div style={{ width:"var(--size-dot-md)", height:"var(--size-dot-md)", borderRadius:"var(--radius-full)", background:"var(--radio-fill-checked)" }} />}
      </div>
      {label && <Typography variant="body" color={disabled ? "disabled" : "primary"}>{label}</Typography>}
    </label>
  );
}

interface RadioOption { label: string; value: string; disabled?: boolean; }
interface RadioGroupProps {
  options: RadioOption[]; value?: string; onChange?: (v: string) => void;
  layout?: "vertical"|"horizontal"|"button-group"; style?: React.CSSProperties;
}
export function RadioGroup({ options, value, onChange, layout="vertical", style }: RadioGroupProps) {
  if (layout==="button-group") {
    return (
      <div style={{ display:"inline-flex", border:`var(--border-width-thin) solid var(--border-default)`, borderRadius:"var(--radius-sm-ds)", overflow:"hidden", ...style }}>
        {options.map((opt, i) => (
          <button key={opt.value} disabled={opt.disabled} onClick={() => onChange?.(opt.value)}
            style={{
              padding:"0 var(--space-3)", height:"var(--btn-height-md)",
              border:"none", borderLeft: i>0 ? `var(--border-width-thin) solid var(--border-default)` : "none",
              background: value===opt.value ? "var(--bg-brand)" : "var(--bg-primary)",
              color: value===opt.value ? "var(--fg-inverse)" : "var(--fg-secondary)",
              fontSize:"var(--text-base)", fontFamily:"var(--font-family-primary)",
              fontWeight:"var(--font-weight-medium)" as any, cursor:opt.disabled?"not-allowed":"pointer",
              opacity:opt.disabled?"var(--opacity-disabled-soft)" as any:1,
            }}>{opt.label}</button>
        ))}
      </div>
    );
  }
  return (
    <div style={{ display:"flex", flexDirection:layout==="horizontal"?"row":"column", gap:"var(--space-3)", ...style }}>
      {options.map(opt => (
        <Radio key={opt.value} checked={value===opt.value} disabled={opt.disabled} label={opt.label} onClick={() => onChange?.(opt.value)} />
      ))}
    </div>
  );
}

// ════════════════════════════════════════════════════════════════════════════
//  16. SWITCH
// ════════════════════════════════════════════════════════════════════════════
const switchWVar: Record<Size, string> = { sm:"var(--switch-w-sm)", md:"var(--switch-w-md)", lg:"var(--switch-w-lg)" };
const switchHVar: Record<Size, string> = { sm:"var(--switch-h-sm)", md:"var(--switch-h-md)", lg:"var(--switch-h-lg)" };
const switchThumbVar: Record<Size, string> = { sm:"var(--switch-thumb-sm)", md:"var(--switch-thumb-md)", lg:"var(--switch-thumb-lg)" };

interface SwitchProps {
  checked?: boolean; disabled?: boolean; size?: Size; label?: string;
  onChange?: (v: boolean) => void; style?: React.CSSProperties;
}
export function Switch({ checked, disabled, size="md", label, onChange, style }: SwitchProps) {
  const wVar = switchWVar[size], hVar = switchHVar[size], tVar = switchThumbVar[size];
  const gapExpr = `calc((${hVar} - ${tVar}) / 2)`;
  return (
    <label style={{ display:"inline-flex", alignItems:"center", gap:"var(--space-2)", cursor:disabled?"not-allowed":"pointer", ...style }}>
      <div onClick={() => !disabled && onChange?.(!checked)}
        style={{
          width:wVar, height:hVar, borderRadius:"var(--radius-full)",
          background: checked ? "var(--toggle-bg-checked)" : "var(--toggle-bg-unchecked)",
          display:"flex", alignItems:"center", padding:`0 ${gapExpr}`,
          opacity:disabled?"var(--opacity-disabled-soft)" as any:1, cursor:disabled?"not-allowed":"pointer", flexShrink:0,
          position:"relative",
          transition:`background var(--duration-fast) var(--ease-out)`,
        }}>
        <div style={{
          width:tVar, height:tVar, borderRadius:"var(--radius-full)", background:"var(--fg-inverse)",
          boxShadow:"var(--shadow-xs)",
          position:"absolute",
          left: checked ? `calc(${wVar} - ${tVar} - ${gapExpr})` : gapExpr,
          transition:`left var(--duration-fast) var(--ease-out)`,
        }} />
      </div>
      {label && <Typography variant="body" color={disabled ? "disabled" : "primary"}>{label}</Typography>}
    </label>
  );
}

// ════════════════════════════════════════════════════════════════════════════
//  17. SLIDER
// ════════════════════════════════════════════════════════════════════════════
type SliderColor = "brand"|"success"|"warning"|"error";
const sliderTrack: Record<SliderColor, string> = {
  brand:"var(--primary)", success:"var(--status-healthy)", warning:"var(--progress-fill-warning)", error:"var(--status-unhealthy)",
};
interface SliderProps {
  value?: number; min?: number; max?: number; color?: SliderColor;
  disabled?: boolean; showValue?: boolean; marks?: boolean; style?: React.CSSProperties;
}
export function Slider({ value=50, min=0, max=100, color="brand", disabled, showValue, marks, style }: SliderProps) {
  const pct = ((value - min) / (max - min)) * 100;
  return (
    <div style={{ display:"flex", flexDirection:"column", gap:"var(--space-1)", width:"100%", ...style }}>
      {showValue && <Typography variant="label" color="secondary">{value}</Typography>}
      <div style={{ position:"relative", height:"var(--slider-container-h)", display:"flex", alignItems:"center", width:"100%" }}>
        <div style={{ flex:1, height:"var(--slider-rail-h)", borderRadius:"var(--radius-full)", background:"var(--slider-rail-bg)", position:"relative", opacity:disabled?"var(--opacity-disabled-soft)" as any:1 }}>
          <div style={{ position:"absolute", left:0, top:0, height:"100%", width:`${pct}%`, borderRadius:"var(--radius-full)", background:sliderTrack[color] }} />
          <div style={{
            position:"absolute", top:"50%", left:`${pct}%`, transform:"translate(-50%, -50%)",
            width:"var(--slider-thumb-size)", height:"var(--slider-thumb-size)", borderRadius:"var(--radius-full)", background:"var(--bg-primary)",
            border:`var(--border-width-medium) solid ${sliderTrack[color]}`, boxShadow:"var(--shadow-pop-sm)",
          }} />
        </div>
      </div>
      {marks && (
        <div style={{ display:"flex", justifyContent:"space-between" }}>
          {[min, min+(max-min)/2, max].map(v => <Typography key={v} variant="micro" color="tertiary">{v}</Typography>)}
        </div>
      )}
    </div>
  );
}

// ════════════════════════════════════════════════════════════════════════════
//  18. RATE
// ═══════════��════════════════════════════════════════════════════════════════
const rateSizeVar: Record<Size, string> = { sm:"var(--rate-size-sm)", md:"var(--rate-size-md)", lg:"var(--rate-size-lg)" };
interface RateProps {
  value?: number; max?: number; size?: Size; disabled?: boolean;
  onChange?: (v: number) => void; style?: React.CSSProperties;
}
export function Rate({ value=0, max=5, size="md", disabled, style }: RateProps) {
  const szVar = rateSizeVar[size];
  return (
    <div style={{ display:"inline-flex", gap:"var(--space-1)", ...style }}>
      {Array.from({ length:max }).map((_,i) => (
        <svg key={i} viewBox="0 0 16 16" fill="none" style={{ width:szVar, height:szVar, cursor:disabled?"default":"pointer", flexShrink:0 }}>
          <path d="M8 2l1.8 3.6L14 6.3l-3 2.9.7 4.1L8 11.1 4.3 13.3l.7-4.1-3-2.9 4.2-.7L8 2Z"
            fill={i < value ? "var(--rating-star-active-fill)" : "var(--rating-star-inactive-fill)"}
            stroke={i < value ? "var(--rating-star-active-stroke)" : "var(--rating-star-inactive-stroke)"}
            strokeWidth="0.5" />
        </svg>
      ))}
    </div>
  );
}

// ════════════════════════════════════════════════════════════════════════════
//  19. DATE PICKER  (static visual)
// ════════════════════════════════════════════════════════════════════════════
interface DatePickerProps { size?: Size; placeholder?: string; value?: string; disabled?: boolean; error?: boolean; style?: React.CSSProperties; }
export function DatePicker({ size="md", placeholder="Select date", value, disabled, error, style }: DatePickerProps) {
  return (
    <div style={{ position:"relative", display:"inline-flex", alignItems:"center", width:"100%", ...style }}>
      <TextInput size={size} placeholder={placeholder} value={value} disabled={disabled} error={error}
        suffix={<Icon name="calendar" size="sm" color={disabled?"disabled":"tertiary"} />}
        style={{ width:"100%", cursor:"pointer" }} />
    </div>
  );
}

// ════════════════════════════════════════════════════════════════════════════
//  20. TIME PICKER  (static visual)
// ════════════════════════════════════════════════════════════════════════════
interface TimePickerProps { size?: Size; value?: string; use12h?: boolean; disabled?: boolean; style?: React.CSSProperties; }
export function TimePicker({ size="md", value, use12h, disabled, style }: TimePickerProps) {
  return (
    <div style={{ position:"relative", display:"inline-flex", alignItems:"center", width:"100%", ...style }}>
      <TextInput size={size} placeholder={use12h?"12:00 PM":"00:00"} value={value} disabled={disabled}
        suffix={<Icon name="clock" size="sm" color={disabled?"disabled":"tertiary"} />}
        style={{ width:"100%", cursor:"pointer", fontFamily:"var(--font-family-mono)" }} />
    </div>
  );
}

// ══════════════════════════════════════════════════════════���═════════════════
//  21. COLOR PICKER  (swatch display)
// ════════════════════════════════════════════════════════════════════════════
const defaultSwatches = ["var(--primary)","var(--color-picker-red)","var(--color-picker-orange)","var(--color-picker-green)","var(--accent)","var(--color-picker-purple)","var(--color-picker-pink)","var(--color-picker-dark)"];
interface ColorPickerProps { value?: string; swatches?: string[]; disabled?: boolean; style?: React.CSSProperties; }
export function ColorPicker({ value="var(--primary)", swatches=defaultSwatches, disabled, style }: ColorPickerProps) {
  return (
    <div style={{ display:"flex", flexDirection:"column", gap:"var(--space-3)", ...style }}>
      <div style={{ width:"var(--color-picker-width)", height:"var(--color-picker-height)", borderRadius:"var(--radius-md-ds)", background:`linear-gradient(to bottom, transparent, var(--color-picker-gradient-dark)), linear-gradient(to right, var(--color-picker-gradient-light), ${value})`, border:`var(--border-width-thin) solid var(--border-default)`, position:"relative", overflow:"hidden" }}>
        <div style={{ position:"absolute", bottom:"var(--color-picker-cursor-offset)", right:"var(--color-picker-cursor-offset)", width:"var(--color-picker-cursor-size)", height:"var(--color-picker-cursor-size)", borderRadius:"var(--radius-full)", background:"var(--fg-inverse)", border:`var(--border-width-medium) solid var(--bg-primary)`, boxShadow:"var(--shadow-sm)" }} />
      </div>
      <div style={{ display:"flex", gap:"var(--space-1)", flexWrap:"wrap" as const, maxWidth:"var(--color-picker-swatch-max-w)" }}>
        {swatches.map((s,i) => (
          <div key={i} style={{ width:"var(--color-swatch-size)", height:"var(--color-swatch-size)", borderRadius:"var(--radius-xs)", background:s, border:`var(--border-width-thin) solid var(--color-picker-swatch-border)`, cursor:disabled?"not-allowed":"pointer", outline: s===value ? `var(--border-width-medium) solid var(--border-focus)` : "none", outlineOffset:1 }} />
        ))}
      </div>
    </div>
  );
}

// ════════════════════════════════════════════════════════════════════════════
//  22. TOOLTIP  (static floating panel)
// ══════════���═════════════════════════════════════════════════════════════════
type TooltipPlacement = "top"|"bottom"|"left"|"right";
interface TooltipProps { content: string; placement?: TooltipPlacement; children?: React.ReactNode; style?: React.CSSProperties; }
export function Tooltip({ content, placement="top", children, style }: TooltipProps) {
  const tipPos: Record<TooltipPlacement, React.CSSProperties> = {
    top:    { bottom:"calc(100% + var(--tooltip-offset))", left:"50%", transform:"translateX(-50%)" },
    bottom: { top:"calc(100% + var(--tooltip-offset))",   left:"50%", transform:"translateX(-50%)" },
    left:   { right:"calc(100% + var(--tooltip-offset))", top:"50%",  transform:"translateY(-50%)" },
    right:  { left:"calc(100% + var(--tooltip-offset))",  top:"50%",  transform:"translateY(-50%)" },
  };
  const arrowPos: Record<TooltipPlacement, React.CSSProperties> = {
    top:    { top:"100%",  left:"50%", transform:"translateX(-50%)", borderColor:"var(--tooltip-bg) transparent transparent transparent" },
    bottom: { bottom:"100%", left:"50%", transform:"translateX(-50%)", borderColor:"transparent transparent var(--tooltip-bg) transparent" },
    left:   { left:"100%", top:"50%",  transform:"translateY(-50%)", borderColor:"transparent transparent transparent var(--tooltip-bg)" },
    right:  { right:"100%",top:"50%",  transform:"translateY(-50%)", borderColor:"transparent var(--tooltip-bg) transparent transparent" },
  };
  return (
    <div style={{ position:"relative", display:"inline-flex", ...style }}>
      {children}
      <div style={{
        position:"absolute", ...tipPos[placement],
        zIndex:"var(--z-dropdown)" as any,
        background:"var(--tooltip-bg)", color:"var(--tooltip-fg)",
        padding:"var(--tooltip-padding) var(--space-3)",
        borderRadius:"var(--tooltip-radius)",
        fontSize:"var(--tooltip-font-size)", fontFamily:"var(--font-family-primary)",
        fontWeight:"var(--font-weight-medium)" as any,
        whiteSpace:"nowrap" as const, pointerEvents:"none",
        boxShadow:"var(--shadow-pop-md)",
        lineHeight:"var(--line-height-sm)",
      }}>
        {content}
        <div style={{
          position:"absolute",
          ...arrowPos[placement],
          width:0, height:0,
          borderStyle:"solid",
          borderWidth:"var(--size-arrow-sm)",
        }} />
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════���════════════════
//  23. QR CODE
// ════════════════════════════════════════════════════════════════════════════
const qrSizeVar: Record<Size, string> = { sm:"var(--qr-size-sm)", md:"var(--qr-size-md)", lg:"var(--qr-size-lg)" };
const qrSizePx: Record<Size, number> = { sm:80, md:120, lg:160 }; /* needed for SVG viewBox calculation */
interface QRCodeProps { size?: Size; value?: string; style?: React.CSSProperties; }
export function QRCode({ size="md", style }: QRCodeProps) {
  const px = qrSizePx[size]; /* SVG viewBox requires numeric value */
  const cells = 7;
  const cell = px / cells;
  const pattern = [
    [1,1,1,1,1,1,1],[1,0,0,0,0,0,1],[1,0,1,1,1,0,1],[1,0,1,0,1,0,1],[1,0,1,1,1,0,1],[1,0,0,0,0,0,1],[1,1,1,1,1,1,1],
  ];
  return (
    <div style={{ display:"inline-block", background:"var(--bg-primary)", padding:"var(--space-2)", borderRadius:"var(--radius-sm-ds)", border:`var(--border-width-thin) solid var(--border-default)`, ...style }}>
      <svg style={{ width:qrSizeVar[size], height:qrSizeVar[size] }} viewBox={`0 0 ${px} ${px}`}>
        {pattern.map((row,r) => row.map((val,c) => val ? (
          <rect key={`${r}-${c}`} x={c*cell} y={r*cell} width={cell-0.5} height={cell-0.5} fill="var(--fg-primary)" rx={1} />
        ) : null))}
        {[[2,2],[2,3],[2,4],[3,2],[3,3],[3,4],[4,2],[4,3],[4,4]].map(([r,c],i) => (
          <rect key={`c-${i}`} x={c*cell} y={r*cell} width={cell-0.5} height={cell-0.5} fill="var(--fg-primary)" rx={0.5} opacity="var(--opacity-subtle)" />
        ))}
      </svg>
    </div>
  );
}

// ════════════════════════════════════════════════════════════════════════════
//  24. STEPPER
// ════════════════════════════════════════════════════════════════════════════
type StepStatus = "complete"|"active"|"pending"|"error";
interface Step { label: string; description?: string; status?: StepStatus; }

const stepColors: Record<StepStatus, { bg: string; fg: string; border: string }> = {
  complete: { bg:"var(--primary)", fg:"var(--fg-inverse)", border:"var(--primary)" },
  active:   { bg:"var(--step-active-bg)", fg:"var(--primary)", border:"var(--primary)" },
  pending:  { bg:"var(--bg-secondary)", fg:"var(--fg-tertiary)", border:"var(--border-default)" },
  error:    { bg:"var(--step-error-bg)", fg:"var(--status-unhealthy)", border:"var(--status-unhealthy)" },
};

interface StepperProps { steps: Step[]; direction?: "horizontal"|"vertical"; style?: React.CSSProperties; }
export function Stepper({ steps, direction="horizontal", style }: StepperProps) {
  const isH = direction === "horizontal";
  return (
    <div style={{ display:"flex", flexDirection:isH?"row":"column", alignItems:isH?"flex-start":"stretch", ...style }}>
      {steps.map((step, i) => {
        const st: StepStatus = step.status ?? (i === 0 ? "active" : "pending");
        const col = stepColors[st];
        const isLast = i === steps.length - 1;

        if (isH) {
          /* ── Horizontal step ────────────────────────────────── */
          return (
            <div key={i} style={{ display:"flex", flexDirection:"column", alignItems:"center", flex:isLast?0:1, minWidth:0, gap:"var(--space-2)" }}>
              {/* circle + connector row */}
              <div style={{ display:"flex", alignItems:"center", width:"100%" }}>
                <div style={{ width:"var(--stepper-circle-size)", height:"var(--stepper-circle-size)", borderRadius:"var(--radius-full)", background:col.bg, border:`var(--border-width-medium) solid ${col.border}`, display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0 }}>
                  {st==="complete"
                    ? <svg width="10" height="8" viewBox="0 0 10 8" fill="none"><path d="M1.5 4L4 6.5L8.5 1.5" stroke="var(--fg-inverse)" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/></svg>
                    : st==="error"
                    ? <svg width="8" height="8" viewBox="0 0 8 8" fill="none"><path d="M2 2L6 6M6 2L2 6" stroke="var(--status-unhealthy)" strokeWidth="1.4" strokeLinecap="round"/></svg>
                    : <Typography variant="micro" color={st==="active"?"brand":"tertiary"} style={{ fontWeight:"var(--font-weight-bold)" as any }}>{i+1}</Typography>
                  }
                </div>
                {!isLast && (
                  <div style={{ flex:1, height:"var(--border-width-medium)", background:st==="complete"?"var(--primary)":"var(--border-default)", margin:"0 var(--space-2)", transition:`background var(--duration-normal) var(--ease-default)` }} />
                )}
              </div>
              {/* label */}
              <div style={{ textAlign:"center", maxWidth:"var(--stepper-label-max-w)" }}>
                <Typography variant="label" weight={st==="active"?"semibold":"medium"} color={st==="active"?"brand":st==="error"?"error":"secondary"}>{step.label}</Typography>
                {step.description && <Typography variant="micro" color="tertiary" style={{ marginTop:"var(--space-half)", display:"block" }}>{step.description}</Typography>}
              </div>
            </div>
          );
        }

        /* ── Vertical step ──────────────────────────────────── */
        return (
          <div key={i} style={{ display:"flex", flexDirection:"row", gap:"var(--space-3)", alignItems:"stretch" }}>
            {/* left: circle + vertical connector */}
            <div style={{ display:"flex", flexDirection:"column", alignItems:"center", flexShrink:0 }}>
              <div style={{ width:"var(--stepper-circle-size)", height:"var(--stepper-circle-size)", borderRadius:"var(--radius-full)", background:col.bg, border:`var(--border-width-medium) solid ${col.border}`, display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0 }}>
                {st==="complete"
                  ? <svg width="10" height="8" viewBox="0 0 10 8" fill="none"><path d="M1.5 4L4 6.5L8.5 1.5" stroke="var(--fg-inverse)" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/></svg>
                  : st==="error"
                  ? <svg width="8" height="8" viewBox="0 0 8 8" fill="none"><path d="M2 2L6 6M6 2L2 6" stroke="var(--status-unhealthy)" strokeWidth="1.4" strokeLinecap="round"/></svg>
                  : <Typography variant="micro" color={st==="active"?"brand":"tertiary"} style={{ fontWeight:"var(--font-weight-bold)" as any }}>{i+1}</Typography>
                }
              </div>
              {!isLast && (
                <div style={{ width:"var(--border-width-medium)", flex:1, minHeight:"var(--space-8)", background:st==="complete"?"var(--primary)":"var(--border-default)", margin:"var(--space-1) 0", transition:`background var(--duration-normal) var(--ease-default)` }} />
              )}
            </div>
            {/* right: label + description */}
            <div style={{ paddingBottom:isLast?0:"var(--space-4)", paddingTop:"var(--space-half)", flex:1, minWidth:0 }}>
              <Typography variant="label" weight={st==="active"?"semibold":"medium"} color={st==="active"?"brand":st==="error"?"error":"secondary"}>{step.label}</Typography>
              {step.description && <Typography variant="micro" color="tertiary" style={{ marginTop:"var(--space-half)", display:"block" }}>{step.description}</Typography>}
            </div>
          </div>
        );
      })}
    </div>
  );
}

// ════════════════════════════════════════════════════════════════════════════
//  25. SEGMENTED CONTROL
// ════════════════════════════════════════════════════════════════════════════
interface SegOption { label: string; value: string; }
interface SegmentedControlProps { options: SegOption[]; value?: string; onChange?: (v: string) => void; style?: React.CSSProperties; }
export function SegmentedControl({ options, value, onChange, style }: SegmentedControlProps) {
  return (
    <div style={{
      display:"inline-flex", background:"var(--segment-bg)", borderRadius:"var(--segment-radius)",
      padding:"var(--segment-padding)", gap:"var(--space-half)", ...style,
    }}>
      {options.map(opt => (
        <button key={opt.value} onClick={() => onChange?.(opt.value)}
          style={{
            padding:"var(--segment-item-padding) var(--space-3)", borderRadius:"var(--segment-item-radius)",
            border:"none", cursor:"pointer",
            background: value===opt.value ? "var(--segment-active-bg)" : "transparent",
            color: value===opt.value ? "var(--fg-primary)" : "var(--fg-secondary)",
            fontSize:"var(--text-base)", fontFamily:"var(--font-family-primary)",
            fontWeight: value===opt.value ? "var(--font-weight-medium)" as any : "var(--font-weight-normal)" as any,
            boxShadow: value===opt.value ? "var(--segment-active-shadow)" : "none",
            whiteSpace:"nowrap" as const,
          }}>
          {opt.label}
        </button>
      ))}
    </div>
  );
}

// ════════════════════════════════════════════════════════════════════════════
//  26. TIMELINE
// ════════════════════════════════════════════════════════════════════════════
export interface TimelineItem {
  label: string; description?: string; time?: string;
  dotColor?: "brand"|"success"|"error"|"warning"|"info"|"neutral";
}
const timelineDot: Record<string, string> = {
  brand:"var(--primary)", success:"var(--status-healthy)", error:"var(--status-unhealthy)",
  warning:"var(--status-warning)", info:"var(--accent)", neutral:"var(--fg-disabled)",
};

interface TimelineProps { items: TimelineItem[]; compact?: boolean; style?: React.CSSProperties; }
export function Timeline({ items, compact, style }: TimelineProps) {
  return (
    <div style={{ display:"flex", flexDirection:"column", ...style }}>
      {items.map((item, i) => {
        const dc = item.dotColor ?? "neutral";
        const isLast = i===items.length-1;
        return (
          <div key={i} style={{ display:"flex", gap:"var(--space-3)" }}>
            <div style={{ display:"flex", flexDirection:"column", alignItems:"center" }}>
              <div style={{ width:"var(--size-dot-timeline)", height:"var(--size-dot-timeline)", borderRadius:"var(--radius-full)", background:timelineDot[dc], flexShrink:0, marginTop:compact?"var(--space-half)":"var(--space-1)" }} />
              {!isLast && <div style={{ width:"var(--border-width-thin)", flex:1, background:"var(--border-default)", margin:"var(--space-1) 0" }} />}
            </div>
            <div style={{ paddingBottom: isLast?0:"var(--space-4)", flex:1 }}>
              <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", gap:"var(--space-2)" }}>
                <Typography variant={compact?"label":"body"} weight="medium" color="primary">{item.label}</Typography>
                {item.time && <Typography variant="micro" color="tertiary">{item.time}</Typography>}
              </div>
              {item.description && !compact && <Typography variant="label" color="secondary" style={{ marginTop:"var(--space-1)" }}>{item.description}</Typography>}
            </div>
          </div>
        );
      })}
    </div>
  );
}

// ═���══════════════════════════════════════════════════════════════════════════
//  27. COLLAPSE / ACCORDION
// ════════════════════════════════════════════════════════════════════════════
export interface CollapsePanel { key: string; header: string; content: React.ReactNode; }
type CollapseVariant = "default"|"accordion"|"ghost";

interface CollapseProps { panels: CollapsePanel[]; variant?: CollapseVariant; openKeys?: string[]; style?: React.CSSProperties; }
export function Collapse({ panels, variant="default", openKeys, style }: CollapseProps) {
  const [open, setOpen] = React.useState<string[]>(openKeys ?? [panels[0]?.key ?? ""]);
  const controlled = openKeys !== undefined;
  const isOpen = (k: string) => controlled ? openKeys!.includes(k) : open.includes(k);
  const toggle = (k: string) => {
    if (controlled) return;
    if (variant==="accordion") setOpen(isOpen(k) ? [] : [k]);
    else setOpen(p => isOpen(k) ? p.filter(x=>x!==k) : [...p,k]);
  };
  return (
    <div style={{ display:"flex", flexDirection:"column", gap:variant==="ghost"?"var(--space-1)":0, border:variant!=="ghost"?`var(--border-width-thin) solid var(--border-default)`:undefined, borderRadius:variant!=="ghost"?"var(--radius-md-ds)":undefined, overflow:variant!=="ghost"?"hidden":undefined, ...style }}>
      {panels.map((p, i) => {
        const expanded = isOpen(p.key);
        return (
          <div key={p.key} style={{ borderTop: i>0&&variant!=="ghost" ? `var(--border-width-thin) solid var(--border-default)` : undefined }}>
            <button onClick={() => toggle(p.key)} style={{
              width:"100%", display:"flex", alignItems:"center", justifyContent:"space-between",
              gap:"var(--space-3)",
              padding:variant==="ghost"?"var(--space-2) 0":"var(--space-3) var(--space-4)",
              background:expanded&&variant==="default"?"var(--bg-secondary)":"transparent",
              border:"none", cursor:"pointer", textAlign:"left" as const,
              transition:`background var(--duration-fast) var(--ease-out)`,
            }}>
              <Typography variant="body" weight="medium" color="primary">{p.header}</Typography>
              <svg
                width="14" height="14" viewBox="0 0 14 14" fill="none"
                style={{ flexShrink:0, transform:expanded?"rotate(180deg)":"rotate(0deg)", transition:`transform var(--duration-normal) var(--ease-default)` }}
              >
                <path d="M2.5 5L7 9.5L11.5 5" stroke="var(--icon-secondary)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
            <div style={{
              overflow:"hidden",
              maxHeight: expanded ? "var(--collapse-content-max-h)" : 0,
              opacity: expanded ? 1 : 0,
              transition:`max-height var(--duration-normal) var(--ease-default), opacity var(--duration-fast) var(--ease-default)`,
            }}>
              <div style={{ padding:variant==="ghost"?"var(--space-2) 0 var(--space-3)":"0 var(--space-4) var(--space-3)" }}>
                {typeof p.content === "string"
                  ? <Typography variant="body" color="secondary">{p.content}</Typography>
                  : p.content
                }
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

// ═════════════════════════════════════════════════════════���══════════════════
//  28. LINK
// ════════════════════���═══════════════════════════════════════════════════════
interface LinkProps { href?: string; children: React.ReactNode; underline?: boolean; disabled?: boolean; style?: React.CSSProperties; }
export function Link({ href="#", children, underline, disabled, style }: LinkProps) {
  return (
    <a href={disabled ? undefined : href} style={{
      color: disabled ? "var(--fg-disabled)" : "var(--fg-link)",
      textDecoration: underline ? "underline" : "none",
      cursor: disabled ? "not-allowed" : "pointer",
      fontFamily:"var(--font-family-primary)", fontSize:"var(--text-base)",
      pointerEvents: disabled ? "none" : undefined,
      ...style,
    }}>{children}</a>
  );
}

// ════════════════════════════════════════════════════════════════════════════
//  29. RESULT
// ════════════════════════════════════════════════════════════════════════════
type ResultStatus = "success"|"error"|"warning"|"info"|"404"|"403";
const resultIcon: Record<ResultStatus, React.ReactNode> = {
  success: <svg width="40" height="40" viewBox="0 0 40 40" fill="none"><circle cx="20" cy="20" r="18" fill="var(--result-success-bg)" /><path d="M13 20l5 5 9-10" stroke="var(--status-healthy)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/></svg>,
  error:   <svg width="40" height="40" viewBox="0 0 40 40" fill="none"><circle cx="20" cy="20" r="18" fill="var(--result-error-bg)" /><path d="M14 14l12 12M26 14L14 26" stroke="var(--status-unhealthy)" strokeWidth="2.5" strokeLinecap="round"/></svg>,
  warning: <svg width="40" height="40" viewBox="0 0 40 40" fill="none"><circle cx="20" cy="20" r="18" fill="var(--result-warning-bg)" /><path d="M20 14v8M20 26v1" stroke="var(--status-warning)" strokeWidth="2.5" strokeLinecap="round"/></svg>,
  info:    <svg width="40" height="40" viewBox="0 0 40 40" fill="none"><circle cx="20" cy="20" r="18" fill="var(--result-info-bg)" /><path d="M20 14v1M20 19v7" stroke="var(--accent)" strokeWidth="2.5" strokeLinecap="round"/></svg>,
  "404":   <svg width="40" height="40" viewBox="0 0 40 40" fill="none"><circle cx="20" cy="20" r="18" fill="var(--bg-secondary)" /><text x="20" y="25" textAnchor="middle" fill="var(--fg-tertiary)" fontSize="12" fontFamily="var(--font-family-mono)">404</text></svg>,
  "403":   <svg width="40" height="40" viewBox="0 0 40 40" fill="none"><circle cx="20" cy="20" r="18" fill="var(--bg-secondary)" /><text x="20" y="25" textAnchor="middle" fill="var(--fg-tertiary)" fontSize="12" fontFamily="var(--font-family-mono)">403</text></svg>,
};

interface ResultProps { status: ResultStatus; title: string; description?: string; action?: React.ReactNode; size?: "sm"|"md"; style?: React.CSSProperties; }
export function Result({ status, title, description, action, size="md", style }: ResultProps) {
  return (
    <div style={{ display:"flex", flexDirection:"column", alignItems:"center", gap:"var(--space-3)", padding: size==="sm" ? "var(--space-4)" : "var(--space-8)", textAlign:"center" as const, ...style }}>
      <div style={{ flexShrink:0 }}>{resultIcon[status]}</div>
      <Typography variant={size==="sm"?"title":"heading"} weight="semibold" color="primary">{title}</Typography>
      {description && <Typography variant="body" color="secondary">{description}</Typography>}
      {action && <div style={{ marginTop:"var(--space-2)" }}>{action}</div>}
    </div>
  );
}

// ════════════════════════════════════════════════════════════════════════════
//  30. DESCRIPTIONS
// ════════════════════════════════════════════════════════════════════════════
interface DescItem { label: string; value: React.ReactNode; }
interface DescriptionsProps { items: DescItem[]; layout?: "horizontal"|"vertical"; bordered?: boolean; columns?: number; style?: React.CSSProperties; }
export function Descriptions({ items, layout="horizontal", bordered=true, columns=2, style }: DescriptionsProps) {
  if (layout==="vertical") {
    return (
      <div style={{ display:"grid", gridTemplateColumns:`repeat(${columns}, 1fr)`, gap:"var(--space-3) var(--space-6)", ...style }}>
        {items.map((item,i) => (
          <div key={i}>
            <Typography variant="label" color="tertiary">{item.label}</Typography>
            <div style={{ marginTop:"var(--space-1)" }}>{typeof item.value==="string" ? <Typography variant="body" color="primary">{item.value}</Typography> : item.value}</div>
          </div>
        ))}
      </div>
    );
  }
  return (
    <div style={{ border:bordered?`var(--border-width-thin) solid var(--border-default)`:undefined, borderRadius:"var(--radius-md-ds)", overflow:"hidden", ...style }}>
      {items.map((item,i) => (
        <div key={i} style={{ display:"flex", borderBottom: i<items.length-1 ? `var(--border-width-thin) solid var(--border-default)` : undefined }}>
          <div style={{ padding:"var(--space-2) var(--space-4)", background:bordered?"var(--bg-secondary)":undefined, width:"var(--desc-label-width)", flexShrink:0, borderRight:bordered?`var(--border-width-thin) solid var(--border-default)`:undefined }}>
            <Typography variant="label" color="secondary">{item.label}</Typography>
          </div>
          <div style={{ padding:"var(--space-2) var(--space-4)", flex:1 }}>
            {typeof item.value==="string" ? <Typography variant="body" color="primary">{item.value}</Typography> : item.value}
          </div>
        </div>
      ))}
    </div>
  );
}

// ════════════════════════════════════════════════════════════════════════════
//  31. UPLOAD
// ════════════════════════════════════════════════════════════════════════════
export interface UploadFile { name: string; size: string; status: "done"|"uploading"|"error"; progress?: number; }
interface UploadProps { files?: UploadFile[]; disabled?: boolean; compact?: boolean; style?: React.CSSProperties; }
export function Upload({ files=[], disabled, compact, style }: UploadProps) {
  return (
    <div style={{ display:"flex", flexDirection:"column", gap:"var(--space-3)", ...style }}>
      <div style={{
        border:`var(--border-width-medium) dashed ${disabled?"var(--border-disabled)":"var(--border-focus)"}`,
        borderRadius:"var(--radius-md-ds)", padding: compact ? "var(--space-3) var(--space-4)" : "var(--space-8) var(--space-6)",
        textAlign:"center" as const, display:"flex", flexDirection:"column", alignItems:"center", gap:"var(--space-2)",
        background: disabled ? "var(--bg-disabled)" : "var(--bg-primary)", cursor:disabled?"not-allowed":"pointer",
      }}>
        {!compact && <Icon name="upload" size="lg" color={disabled?"disabled":"brand"} />}
        <Typography variant="body" color={disabled?"disabled":"secondary"}>{compact?"Click to upload":"Click or drag to upload"}</Typography>
        {!compact && <Typography variant="label" color="tertiary">Supports PNG, JPG, PDF up to 50MB</Typography>}
      </div>
      {files.length > 0 && (
        <div style={{ border:`var(--border-width-thin) solid var(--border-default)`, borderRadius:"var(--radius-sm-ds)", overflow:"hidden" }}>
          {files.map((f,i) => (
            <div key={i} style={{ display:"flex", alignItems:"center", gap:"var(--space-3)", padding:"var(--space-2) var(--space-3)", borderBottom:i<files.length-1?`var(--border-width-thin) solid var(--border-default)`:undefined }}>
              <Icon name="file" size="sm" color={f.status==="error"?"error":"secondary"} />
              <div style={{ flex:1, minWidth:0 }}>
                <Typography variant="label" weight="medium" color={f.status==="error"?"error":"primary"} truncate>{f.name}</Typography>
                <Typography variant="micro" color="tertiary">{f.size}</Typography>
                {f.status==="uploading" && <ProgressBar percent={f.progress??50} size="sm" fullWidth style={{ marginTop:"var(--space-1)" }} />}
              </div>
              <BadgeLabel label={f.status} variant={f.status==="done"?"success":f.status==="error"?"error":"info"} size="sm" />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// ════════════════════════════════════════════════════════════════════════════
//  32. POPOVER  (static positioned panel)
// ════════════════════════════════════════════════════════════════════════════
interface PopoverProps { title?: string; content: React.ReactNode; placement?: TooltipPlacement; trigger?: React.ReactNode; style?: React.CSSProperties; }
export function Popover({ title, content, placement="bottom", trigger, style }: PopoverProps) {
  const positions: Record<TooltipPlacement, React.CSSProperties> = {
    top:    { bottom:"calc(100% + var(--tooltip-offset))", left:"50%", transform:"translateX(-50%)" },
    bottom: { top:"calc(100% + var(--tooltip-offset))",   left:"50%", transform:"translateX(-50%)" },
    left:   { right:"calc(100% + var(--tooltip-offset))", top:"50%",  transform:"translateY(-50%)" },
    right:  { left:"calc(100% + var(--tooltip-offset))",  top:"50%",  transform:"translateY(-50%)" },
  };
  return (
    <div style={{ position:"relative", display:"inline-flex", ...style }}>
      {trigger}
      <div style={{
        position:"absolute", ...positions[placement], zIndex:"var(--z-dropdown)" as any, minWidth:"var(--dropdown-min-w-sm)",
        background:"var(--bg-primary)", border:`var(--border-width-thin) solid var(--border-default)`,
        borderRadius:"var(--radius-md-ds)", boxShadow:"var(--shadow-lg)", padding:"var(--space-3)",
      }}>
        {title && <Typography variant="body" weight="semibold" color="primary" style={{ marginBottom:"var(--space-2)" }}>{title}</Typography>}
        {typeof content==="string" ? <Typography variant="body" color="secondary">{content}</Typography> : content}
      </div>
    </div>
  );
}

// ════════════════════════════════════════════════════════════════════════════
//  33. POPCONFIRM
// ════════════════════════════════════════════════════════════════════════════
interface PopconfirmProps { title: string; description?: string; placement?: "top"|"bottom"; trigger?: React.ReactNode; onConfirm?: () => void; onCancel?: () => void; style?: React.CSSProperties; }
export function Popconfirm({ title, description, placement="top", trigger, onConfirm, onCancel, style }: PopconfirmProps) {
  const [open, setOpen] = React.useState(true);
  const isTop = placement === "top";
  const popStyle: React.CSSProperties = isTop
    ? { bottom:"calc(100% + var(--tooltip-offset))", left:"50%", transform:"translateX(-50%)" }
    : { top:"calc(100% + var(--tooltip-offset))", left:"50%", transform:"translateX(-50%)" };
  const arrowStyle: React.CSSProperties = isTop
    ? { top:"100%", left:"50%", transform:"translateX(-50%)", borderColor:"var(--border-default) transparent transparent transparent" }
    : { bottom:"100%", left:"50%", transform:"translateX(-50%)", borderColor:"transparent transparent var(--border-default) transparent" };
  return (
    <div style={{ position:"relative", display:"inline-flex", ...style }}>
      <span onClick={() => setOpen(o => !o)} style={{ cursor:"pointer" }}>{trigger}</span>
      {open && (
        <div style={{ position:"absolute", ...popStyle, zIndex:"var(--z-dropdown)" as any, minWidth:"var(--popconfirm-min-w)", background:"var(--bg-primary)", border:`var(--border-width-thin) solid var(--border-default)`, borderRadius:"var(--radius-md-ds)", boxShadow:"var(--shadow-pop-lg)", padding:"var(--space-3)" }}>
          {/* arrow caret */}
          <div style={{ position:"absolute", ...arrowStyle, width:0, height:0, borderStyle:"solid", borderWidth:"var(--size-arrow-md)" as any }} />
          <div style={{ display:"flex", gap:"var(--space-2)", marginBottom:"var(--space-3)", alignItems:"flex-start" }}>
            <div style={{ flexShrink:0, marginTop:"var(--space-px)" }}><Icon name="warning" size="sm" color="warning" /></div>
            <div style={{ flex:1 }}>
              <Typography variant="body" weight="semibold" color="primary">{title}</Typography>
              {description && <Typography variant="label" color="secondary" style={{ display:"block", marginTop:"var(--space-half)" }}>{description}</Typography>}
            </div>
          </div>
          <div style={{ display:"flex", justifyContent:"flex-end", gap:"var(--space-2)" }}>
            <Button variant="secondary" size="sm" onClick={() => { setOpen(false); onCancel?.(); }}>Cancel</Button>
            <Button variant="danger" size="sm" onClick={() => { setOpen(false); onConfirm?.(); }}>Confirm</Button>
          </div>
        </div>
      )}
    </div>
  );
}

// ════════════════════════════════════════════════════════════════════════════
//  34. LABEL
// ════════════════════════════════════════════════════════════════════════════
type LabelSize = 10|12|14|16|20;
const labelFontSize: Record<number, string> = { 10:"var(--text-micro)", 12:"var(--text-caption)", 14:"var(--text-base)", 16:"var(--text-title)", 20:"var(--text-heading)" };
interface LabelProps { children: React.ReactNode; size?: LabelSize; required?: boolean; disabled?: boolean; htmlFor?: string; style?: React.CSSProperties; }
export function Label({ children, size=12, required, disabled, htmlFor, style }: LabelProps) {
  return (
    <label htmlFor={htmlFor} style={{
      display:"inline-flex", alignItems:"center", gap:"var(--space-1)",
      fontSize:labelFontSize[size], fontFamily:"var(--font-family-primary)",
      fontWeight:"var(--font-weight-medium)" as any,
      color: disabled ? "var(--fg-disabled)" : "var(--fg-primary)",
      cursor: disabled ? "not-allowed" : "default", ...style,
    }}>
      {children}
      {required && <span style={{ color:"var(--form-required-color)" }}>*</span>}
    </label>
  );
}

// ════════════════════════════════════════════════════════════════════��═══════
//  35. IMAGE ATOM
// ════════════════════════════════════════════════════════════════════════════
type ImgShape = "default"|"rounded"|"circle";
interface ImageAtomProps { src?: string; alt?: string; width?: number|string; height?: number|string; shape?: ImgShape; style?: React.CSSProperties; }
export function ImageAtom({ src, alt="image", width=120, height=90, shape="default", style }: ImageAtomProps) {
  const radius: Record<ImgShape, string> = { default:"var(--radius-none)", rounded:"var(--radius-md-ds)", circle:"var(--radius-full)" };
  const hw = shape==="circle" ? Math.min(Number(width), Number(height)) : undefined;
  return src
    ? <img src={src} alt={alt} style={{ width:hw??width, height:hw??height, objectFit:"cover", borderRadius:radius[shape], display:"block", ...style }} />
    : (
      <div style={{ width:hw??width, height:hw??height, borderRadius:radius[shape], background:"var(--bg-secondary)", display:"flex", alignItems:"center", justifyContent:"center", border:`var(--border-width-thin) solid var(--border-default)`, ...style }}>
        <Icon name="image" size="md" color="tertiary" />
      </div>
    );
}

// ═══════════════════════════════════════════════════════��════════════════════
//  36. WATERMARK
// ════════════════════════════════════════════════════════════════════════════
interface WatermarkProps { text?: string; opacity?: number; children?: React.ReactNode; style?: React.CSSProperties; }
export function Watermark({ text="CONFIDENTIAL", opacity=0.08, children, style }: WatermarkProps) {
  return (
    <div style={{ position:"relative", overflow:"hidden", ...style }}>
      {children}
      <div style={{
        position:"absolute", inset:0, pointerEvents:"none",
        display:"flex", alignItems:"center", justifyContent:"center",
        transform:"rotate(-35deg)",
        fontSize:"var(--text-2xl)", fontFamily:"var(--font-family-primary)",
        fontWeight:"var(--font-weight-bold)" as any,
        color:`rgba(var(--watermark-color),${opacity})`, userSelect:"none" as const,
        letterSpacing:"var(--letter-spacing-tracking-xl)", whiteSpace:"nowrap" as const,
      }}>{text}</div>
    </div>
  );
}

// ════════════════════════════════════════════════════════════════════════════
//  39. BREADCRUMB
// ════════════════════════════════════════════════════════════════════════════
interface BreadcrumbItem { label: string; href?: string; }
interface BreadcrumbProps { items: BreadcrumbItem[]; separator?: "/" | "›"; collapsed?: boolean; style?: React.CSSProperties; className?: string; }
export function Breadcrumb({ items, separator="/", collapsed, style, className }: BreadcrumbProps) {
  const display: (BreadcrumbItem | null)[] = collapsed && items.length > 3
    ? [items[0], null, items[items.length - 1]]
    : items;
  return (
    <nav aria-label="breadcrumb" className={className} style={{ display:"flex", alignItems:"center", gap:"var(--space-1)", flexWrap:"wrap" as const, ...style }}>
      {display.map((item, i) => (
        <span key={i} style={{ display: "contents" }}>
          {i > 0 && <span style={{ color:"var(--fg-tertiary)", fontSize:"var(--text-caption)", userSelect:"none" as const, padding:"0 var(--space-half)", fontFamily:"var(--font-family-primary)" }}>{separator}</span>}
          {item === null
            ? <span style={{ fontSize:"var(--text-caption)", fontFamily:"var(--font-family-primary)", color:"var(--fg-tertiary)", cursor:"pointer" }}>…</span>
            : <span style={{ fontSize:"var(--text-caption)", fontFamily:"var(--font-family-primary)", color:i===display.length-1?"var(--fg-primary)":"var(--fg-brand)", fontWeight:i===display.length-1?"var(--font-weight-medium)" as any:"var(--font-weight-normal)" as any, cursor:i<display.length-1?"pointer":"default", transition:`color var(--duration-fast) var(--ease-out)` }}>{item.label}</span>
          }
        </span>
      ))}
    </nav>
  );
}

// ════════════════════════════════════════════════════════════════════════════
//  40. TOGGLE
// ═══════════════════════════════════════════════════════════════════════���════
type ToggleVariant = "default" | "outline" | "ghost";
interface ToggleProps { pressed?: boolean; variant?: ToggleVariant; size?: Size; disabled?: boolean; icon?: React.ReactNode; children?: React.ReactNode; onClick?: () => void; style?: React.CSSProperties; }
export function Toggle({ pressed, variant="default", size="md", disabled, icon, children, onClick, style }: ToggleProps) {
  const h = { sm:"var(--btn-height-sm)", md:"var(--btn-height-md)", lg:"var(--btn-height-lg)" }[size];
  const px = { sm:"var(--space-2)", md:"var(--space-3)", lg:"var(--space-4)" }[size];
  const fs = { sm:"var(--text-caption)", md:"var(--text-base)", lg:"var(--text-title)" }[size];
  const bg = pressed ? (variant==="ghost" ? "var(--item-active-bg)" : "var(--bg-brand)") : "transparent";
  const fg = pressed ? (variant==="ghost" ? "var(--fg-brand)" : "var(--fg-inverse)") : "var(--fg-secondary)";
  const border = variant==="outline"
    ? `var(--border-width-thin) solid ${pressed?"var(--border-focus)":"var(--border-default)"}`
    : "var(--border-width-thin) solid transparent";
  return (
    <button onClick={onClick} disabled={disabled} style={{ display:"inline-flex", alignItems:"center", justifyContent:"center", gap:"var(--space-1)", height:h, padding:`0 ${px}`, background:bg, color:fg, border, borderRadius:"var(--radius-sm-ds)", fontSize:fs, fontFamily:"var(--font-family-primary)", fontWeight:"var(--font-weight-medium)" as any, cursor:disabled?"not-allowed":"pointer", opacity:disabled?"var(--opacity-disabled)" as any:1, outline:"none", ...style }}>
      {icon}{children && <span>{children}</span>}
    </button>
  );
}

// ════════════════════════════════════════════════════════════════════════════
//  41. TOGGLE GROUP
// ════════════════════════════════════════════════════════════════════════════
interface ToggleOption { value: string; label?: string; icon?: React.ReactNode; disabled?: boolean; }
interface ToggleGroupProps { options: ToggleOption[]; value?: string | string[]; size?: Size; style?: React.CSSProperties; }
export function ToggleGroup({ options, value, size="md", style }: ToggleGroupProps) {
  const vals = Array.isArray(value) ? value : value ? [value] : [];
  const isActive = (v: string) => vals.includes(v);
  const h = { sm:"var(--btn-height-sm)", md:"var(--btn-height-md)", lg:"var(--btn-height-lg)" }[size];
  const px = { sm:"var(--space-2)", md:"var(--space-3)", lg:"var(--space-4)" }[size];
  const fs = { sm:"var(--text-caption)", md:"var(--text-base)", lg:"var(--text-title)" }[size];
  return (
    <div style={{ display:"inline-flex", border:`var(--border-width-thin) solid var(--border-default)`, borderRadius:"var(--radius-sm-ds)", overflow:"hidden", ...style }}>
      {options.map((opt, i) => (
        <button key={opt.value} disabled={opt.disabled} style={{ display:"inline-flex", alignItems:"center", justifyContent:"center", gap:"var(--space-1)", height:h, padding:`0 ${px}`, borderLeft:i>0?`var(--border-width-thin) solid var(--border-default)`:undefined, border:i===0?"none":undefined, background:isActive(opt.value)?"var(--item-active-bg)":"var(--bg-primary)", color:isActive(opt.value)?"var(--fg-brand)":"var(--fg-secondary)", fontSize:fs, fontFamily:"var(--font-family-primary)", fontWeight:isActive(opt.value)?"var(--font-weight-semibold)" as any:"var(--font-weight-normal)" as any, cursor:opt.disabled?"not-allowed":"pointer", opacity:opt.disabled?"var(--opacity-disabled)" as any:1, outline:"none" }}>
          {opt.icon}{opt.label}
        </button>
      ))}
    </div>
  );
}

// ════════════════════════════════════════════════════════════════════════════
//  42–47 · 54 · 56–60  →  MOVED to ds-molecules / ds-organisms
// ════════════════════════════════════════════════════════════════════════════

// ════════════════════════════════════════════════════════════════════════════
//  48. SCROLL AREA
// ════════════════════════════════════════════════════════════════════════════
interface ScrollAreaProps { height?: string|number; width?: string|number; horizontal?: boolean; children?: React.ReactNode; style?: React.CSSProperties; }
export function ScrollArea({ height="var(--scroll-area-default-h)", width, horizontal, children, style }: ScrollAreaProps) {
  return (
    <div style={{ height, width, overflowY:!horizontal?"auto":undefined, overflowX:horizontal?"auto":undefined, border:`var(--border-width-thin) solid var(--border-default)`, borderRadius:"var(--radius-sm-ds)", background:"var(--bg-primary)", ...style }}>
      {children}
    </div>
  );
}

// ═════════════════════���══════════════════════════════════════════════════════
//  49. RESIZABLE
// ════════════════════════════════════════════════════════════════════════════
interface ResizableProps { direction?: "horizontal"|"vertical"; firstContent?: React.ReactNode; secondContent?: React.ReactNode; firstLabel?: string; secondLabel?: string; style?: React.CSSProperties; }
export function Resizable({ direction="horizontal", firstContent, secondContent, firstLabel="Panel A", secondLabel="Panel B", style }: ResizableProps) {
  const isH = direction==="horizontal";
  return (
    <div style={{ display:"flex", flexDirection:isH?"row":"column", border:`var(--border-width-thin) solid var(--border-default)`, borderRadius:"var(--radius-md-ds)", overflow:"hidden", ...style }}>
      <div style={{ [isH?"width":"height"]:isH?"var(--resizable-default-w)":"var(--resizable-default-h)", padding:"var(--space-4)", background:"var(--bg-primary)", [isH?"borderRight":"borderBottom"]:`var(--border-width-thin) solid var(--border-default)`, flexShrink:0 } as React.CSSProperties}>
        {firstContent || <Typography variant="label" color="secondary">{firstLabel}</Typography>}
      </div>
      <div style={{ [isH?"width":"height"]:"var(--resizable-handle-size)", background:"var(--bg-secondary)", cursor:isH?"col-resize":"row-resize", display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0 } as React.CSSProperties}>
        <div style={{ width:isH?"var(--resizable-grip-short)":"var(--space-6)", height:isH?"var(--space-6)":"var(--resizable-grip-short)", borderRadius:"var(--radius-full)", background:"var(--fg-tertiary)" }} />
      </div>
      <div style={{ flex:1, padding:"var(--space-4)", background:"var(--bg-primary)" }}>
        {secondContent || <Typography variant="label" color="secondary">{secondLabel}</Typography>}
      </div>
    </div>
  );
}

// ════════════════════════════════════════════════════════════════════════════
//  50. HOVER CARD (static open)
// ════════════════════════════════════════════════════════════════════════════
type HoverPlacement = "top"|"bottom"|"left"|"right";
interface HoverCardProps { trigger?: React.ReactNode; children?: React.ReactNode; placement?: HoverPlacement; style?: React.CSSProperties; }
export function HoverCard({ trigger, children, placement="bottom", style }: HoverCardProps) {
  const posMap: Record<HoverPlacement, React.CSSProperties> = {
    top:    { bottom:"calc(100% + var(--tooltip-offset))", left:"50%", transform:"translateX(-50%)" },
    bottom: { top:"calc(100% + var(--tooltip-offset))",   left:"50%", transform:"translateX(-50%)" },
    left:   { right:"calc(100% + var(--tooltip-offset))", top:"50%",  transform:"translateY(-50%)" },
    right:  { left:"calc(100% + var(--tooltip-offset))",  top:"50%",  transform:"translateY(-50%)" },
  };
  return (
    <div style={{ position:"relative", display:"inline-flex", ...style }}>
      {trigger}
      <div style={{ position:"absolute", ...posMap[placement], zIndex:"var(--z-dropdown)" as any, minWidth:"var(--dropdown-min-w-lg)", background:"var(--bg-primary)", border:`var(--border-width-thin) solid var(--border-default)`, borderRadius:"var(--radius-md-ds)", boxShadow:"var(--shadow-lg)", padding:"var(--space-4)" }}>
        {children}
      </div>
    </div>
  );
}

// ════════════════════════════════════════════════════════════════════════════
//  51. ASPECT RATIO
// ════════════════════════════════════════════════════════════════════════════
type AspectRatioValue = "16/9"|"4/3"|"1/1"|"21/9";
interface AspectRatioProps { ratio?: AspectRatioValue; children?: React.ReactNode; width?: string|number; style?: React.CSSProperties; }
export function AspectRatio({ ratio="16/9", children, width="100%", style }: AspectRatioProps) {
  const padMap: Record<AspectRatioValue,string> = { "16/9":"56.25%", "4/3":"75%", "1/1":"100%", "21/9":"42.86%" };
  return (
    <div style={{ width, ...style }}>
      <div style={{ paddingBottom:padMap[ratio], position:"relative" }}>
        <div style={{ position:"absolute", inset:0, display:"flex", alignItems:"center", justifyContent:"center", background:"var(--bg-secondary)", borderRadius:"var(--radius-sm-ds)", overflow:"hidden" }}>
          {children || <Typography variant="label" color="tertiary">{ratio}</Typography>}
        </div>
      </div>
    </div>
  );
}

// ════════════════════════════════════════════════════════════════════════════
//  52. INPUT OTP
// ════════════════════════════════════════════════════════════════════════════
interface InputOTPProps { value?: string; length?: number; separator?: boolean; error?: boolean; disabled?: boolean; size?: Size; style?: React.CSSProperties; }
export function InputOTP({ value="", length=6, separator, error, disabled, size="md", style }: InputOTPProps) {
  const slotH: Record<Size,string> = { sm:"var(--btn-height-sm)", md:"var(--btn-height-md)", lg:"var(--btn-height-lg)" };
  const slotW: Record<Size,string> = { sm:"var(--otp-box-sm)", md:"var(--otp-box-md)", lg:"var(--otp-box-lg)" };
  const chars = [...value.split(""), ...Array(length).fill("")].slice(0, length);
  const midpoint = Math.floor(length/2);
  return (
    <div style={{ display:"inline-flex", gap:"var(--space-2)", alignItems:"center", ...style }}>
      {chars.map((char, i) => (
        <span key={i} style={{ display: "contents" }}>
          {separator && i===midpoint && <span style={{ color:"var(--fg-tertiary)", fontSize:"var(--text-title)", fontFamily:"var(--font-family-mono)" }}>—</span>}
          <div style={{ width:slotW[size], height:slotH[size], display:"flex", alignItems:"center", justifyContent:"center", border:`var(--border-width-medium) solid ${error?"var(--input-ds-border-error)":char?"var(--border-focus)":"var(--input-ds-border)"}`, borderRadius:"var(--input-ds-radius)", background:disabled?"var(--input-ds-bg-disabled)":"var(--input-ds-bg)", fontSize:"var(--text-title)", fontFamily:"var(--font-family-mono)", fontWeight:"var(--font-weight-bold)" as any, color:error?"var(--fg-error)":disabled?"var(--fg-disabled)":"var(--fg-primary)", opacity:disabled?"var(--opacity-muted)" as any:1, flexShrink:0, boxSizing:"border-box" as const, transition:`border-color var(--duration-fast) var(--ease-out)` }}>
            {char || (i===value.length ? <div style={{ width:"var(--otp-cursor-w)", height:"55%", background:"var(--border-focus)", borderRadius:"var(--radius-full)" }} /> : null)}
          </div>
        </span>
      ))}
    </div>
  );
}

// ════════════════════════════════════════════════════════════════════════════
//  53. SONNER / TOAST (primitive)
// ════════════════════════════════════════════════════════════════════════════
type SonnerVariant = "success"|"error"|"warning"|"info"|"loading";
const sonnerIcon: Record<SonnerVariant, React.ReactNode> = {
  success: <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><circle cx="8" cy="8" r="6.5" fill="var(--toast-icon-success-bg)" stroke="var(--status-healthy)" strokeWidth="1.5"/><path d="M5 8l2 2 4-4" stroke="var(--status-healthy)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>,
  error:   <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><circle cx="8" cy="8" r="6.5" fill="var(--toast-icon-error-bg)" stroke="var(--status-unhealthy)" strokeWidth="1.5"/><path d="M5.5 5.5l5 5M10.5 5.5l-5 5" stroke="var(--status-unhealthy)" strokeWidth="1.5" strokeLinecap="round"/></svg>,
  warning: <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><circle cx="8" cy="8" r="6.5" fill="var(--toast-icon-warning-bg)" stroke="var(--toast-icon-warning-stroke)" strokeWidth="1.5"/><path d="M8 5.5v3M8 10.5v.5" stroke="var(--toast-icon-warning-stroke)" strokeWidth="1.5" strokeLinecap="round"/></svg>,
  info:    <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><circle cx="8" cy="8" r="6.5" fill="var(--toast-icon-info-bg)" stroke="var(--accent)" strokeWidth="1.5"/><path d="M8 7v4M8 5.5v.5" stroke="var(--accent)" strokeWidth="1.5" strokeLinecap="round"/></svg>,
  loading: <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><circle cx="8" cy="8" r="5.5" stroke="var(--carousel-dot-inactive-bg)" strokeWidth="2"/><path d="M8 2.5A5.5 5.5 0 0 1 13.5 8" stroke="var(--primary)" strokeWidth="2" strokeLinecap="round"/></svg>,
};
interface SonnerToastProps { title: string; description?: string; variant?: SonnerVariant; action?: string; progress?: number; style?: React.CSSProperties; }
export function SonnerToast({ title, description, variant="info", action, progress, style }: SonnerToastProps) {
  return (
    <div style={{ display:"flex", alignItems:"flex-start", gap:"var(--space-3)", padding:"var(--space-3) var(--space-4)", background:"var(--bg-primary)", border:`var(--border-width-thin) solid var(--border-default)`, borderRadius:"var(--radius-md-ds)", boxShadow:"var(--shadow-lg)", width:"var(--toast-stack-width)", ...style }}>
      <span style={{ flexShrink:0, marginTop:"var(--space-half)" }}>{sonnerIcon[variant]}</span>
      <div style={{ flex:1, minWidth:0 }}>
        <Typography variant="body" weight="semibold" color="primary">{title}</Typography>
        {description && <Typography variant="label" color="secondary" style={{ marginTop:"var(--space-half)" }}>{description}</Typography>}
        {action && <Button variant="outline" size="sm" style={{ marginTop:"var(--space-2)" }}>{action}</Button>}
        {variant==="loading" && <div style={{ marginTop:"var(--space-2)", height:"var(--toast-loading-track-h)", borderRadius:"var(--radius-full)", background:"var(--toast-loading-track-bg)", overflow:"hidden" }}><div style={{ width:`${progress??45}%`, height:"100%", background:"var(--primary)", borderRadius:"var(--radius-full)" }}/></div>}
      </div>
      <svg width="12" height="12" viewBox="0 0 12 12" fill="none" style={{ cursor:"pointer", flexShrink:0 }}><path d="M2 2L10 10M10 2L2 10" stroke="var(--icon-tertiary)" strokeWidth="1.5" strokeLinecap="round"/></svg>
    </div>
  );
}

// ════════════════════════════════════════════════════════════════════════════
//  54. CAROUSEL → moved to ds-molecules.tsx
// ════════════════════════════════════════════════════════════════════════════

// ════════════════════════════════════════════════════════════════════════════
//  55. CALENDAR (standalone month grid)
// ════════════════════════════════════════════════════════════════════════════
const CAL_DAY_NAMES = ["Su","Mo","Tu","We","Th","Fr","Sa"];
interface CalendarProps { selectedDate?: number; selectedEnd?: number; disabledDates?: number[]; year?: number; month?: number; style?: React.CSSProperties; }
export function Calendar({ selectedDate=15, selectedEnd, disabledDates=[], year=2026, month=1, style }: CalendarProps) {
  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month+1, 0).getDate();
  const monthName = new Date(year, month).toLocaleString("default", { month:"long" });
  const inRange = (d: number) => !!(selectedEnd && selectedDate && d > selectedDate && d < selectedEnd);
  const cells: (number|null)[] = [...Array(firstDay).fill(null), ...Array.from({length:daysInMonth},(_,i)=>i+1)];
  while (cells.length % 7 !== 0) cells.push(null);
  return (
    <div style={{ display:"inline-flex", flexDirection:"column", gap:"var(--space-3)", padding:"var(--space-4)", background:"var(--bg-primary)", border:`var(--border-width-thin) solid var(--border-default)`, borderRadius:"var(--radius-md-ds)", ...style }}>
      <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between" }}>
        <button style={{ width:"var(--size-icon-container-sm)", height:"var(--size-icon-container-sm)", border:"none", background:"transparent", cursor:"pointer", borderRadius:"var(--radius-xs)", display:"flex", alignItems:"center", justifyContent:"center" }}><svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M7.5 3L4.5 6L7.5 9" stroke="var(--icon-primary)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg></button>
        <Typography variant="body" weight="semibold" color="primary">{monthName} {year}</Typography>
        <button style={{ width:"var(--calendar-row-h)", height:"var(--calendar-row-h)", border:"none", background:"transparent", cursor:"pointer", borderRadius:"var(--radius-xs)", display:"flex", alignItems:"center", justifyContent:"center" }}><svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M4.5 3L7.5 6L4.5 9" stroke="var(--icon-primary)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg></button>
      </div>
      <div style={{ display:"grid", gridTemplateColumns:`repeat(7, var(--calendar-cell-size))`, gap:"var(--space-half)" }}>
        {CAL_DAY_NAMES.map(d => <div key={d} style={{ height:"var(--calendar-row-h)", display:"flex", alignItems:"center", justifyContent:"center", fontSize:"var(--text-micro)", fontFamily:"var(--font-family-primary)", fontWeight:"var(--font-weight-semibold)" as any, color:"var(--fg-tertiary)" }}>{d}</div>)}
        {cells.map((day, i) => {
          if (!day) return <div key={i} />;
          const isSel = day===selectedDate||day===selectedEnd;
          const inR = inRange(day);
          const isDis = disabledDates.includes(day);
          return (
            <div key={i} style={{ height:"var(--calendar-cell-size)", display:"flex", alignItems:"center", justifyContent:"center", borderRadius:isSel?"var(--radius-full)":"var(--radius-xs)", background:isSel?"var(--primary)":inR?"var(--date-picker-in-range-bg)":"transparent", cursor:isDis?"not-allowed":"pointer", opacity:isDis?"var(--opacity-subtle)" as any :1 }}>
              <Typography variant="label" color={isSel?"inverse":isDis?"disabled":"primary"} weight={isSel?"semibold":undefined}>{day}</Typography>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ════════════════════════════════════════════════════════════════════════════
//  56. TABLE CELL  (standalone presentational atom)
// ════════════════════════════════════════════════════════════════════════════
type TableCellType = "text"|"secondary"|"badge"|"avatar-text"|"link"|"number"|"actions"|"progress"|"tag-list";
interface TableCellProps {
  type?: TableCellType;
  primary?: string;
  secondary?: string;
  value?: string | number;
  variant?: BadgeVariant;
  avatarLabel?: string;
  progress?: number;
  tags?: string[];
  size?: Size;
  align?: "left"|"center"|"right";
  style?: React.CSSProperties;
}
export function TableCell({
  type="text", primary="Cell value", secondary, value, variant="neutral",
  avatarLabel="AB", progress=60, tags=["tag"], size="md", align="left", style,
}: TableCellProps) {
  const padBlock: Record<Size,string> = { sm:"var(--table-cell-padding-block-sm)", md:"var(--table-cell-padding-block-md)", lg:"var(--table-cell-padding-block-lg)" };
  const padInline: Record<Size,string> = { sm:"var(--table-cell-padding-inline-sm)", md:"var(--table-cell-padding-inline-md)", lg:"var(--table-cell-padding-inline-lg)" };
  const base: React.CSSProperties = {
    display:"flex", alignItems:"center", gap:"var(--space-2)",
    padding:`${padBlock[size]} ${padInline[size]}`,
    justifyContent: align==="right" ? "flex-end" : align==="center" ? "center" : "flex-start",
    background:"var(--table-body-bg)", borderBottom:`var(--border-width-thin) solid var(--table-row-border)`,
    ...style,
  };
  switch (type) {
    case "badge":
      return <div style={base}><BadgeLabel label={String(primary)} variant={variant} /></div>;
    case "avatar-text":
      return (
        <div style={base}>
          <Avatar size="sm" shape="circle" label={avatarLabel} />
          <div>
            <Typography variant="label" weight="medium" color="primary" truncate>{primary}</Typography>
            {secondary && <Typography variant="micro" color="tertiary" truncate>{secondary}</Typography>}
          </div>
        </div>
      );
    case "link":
      return <div style={base}><a style={{ color:"var(--table-cell-link-fg)", fontFamily:"var(--font-family-primary)", fontSize:"var(--table-body-font)", textDecoration:"none", cursor:"pointer" }}>{primary}</a></div>;
    case "number":
      return <div style={{ ...base, justifyContent:"flex-end" }}><Typography variant="body" color="primary" style={{ fontFamily:"var(--font-family-mono)" }}>{value ?? 0}</Typography></div>;
    case "progress":
      return (
        <div style={base}>
          <div style={{ flex:1 }}><ProgressBar percent={progress} size="sm" fullWidth /></div>
          <Typography variant="micro" color="tertiary" style={{ flexShrink:0, fontFamily:"var(--font-family-mono)" }}>{progress}%</Typography>
        </div>
      );
    case "tag-list":
      return <div style={{ ...base, flexWrap:"wrap" as const }}>{tags.map((t,i) => <Tag key={i} label={t} size="sm" variant="neutral" />)}</div>;
    case "actions":
      return (
        <div style={base}>
          <button style={{ border:"none", background:"transparent", cursor:"pointer", color:"var(--table-cell-icon)", padding:"var(--space-1)", borderRadius:"var(--radius-xs)", display:"flex", alignItems:"center" }}><Icon name="edit" size="sm" color="secondary" /></button>
          <button style={{ border:"none", background:"transparent", cursor:"pointer", color:"var(--table-cell-icon)", padding:"var(--space-1)", borderRadius:"var(--radius-xs)", display:"flex", alignItems:"center" }}><Icon name="trash" size="sm" color="error" /></button>
          <button style={{ border:"none", background:"transparent", cursor:"pointer", color:"var(--table-cell-icon)", padding:"var(--space-1)", borderRadius:"var(--radius-xs)", display:"flex", alignItems:"center" }}><Icon name="more" size="sm" color="secondary" /></button>
        </div>
      );
    case "secondary":
      return (
        <div style={base}>
          <div>
            <Typography variant="label" weight="medium" color="primary" truncate>{primary}</Typography>
            {secondary && <Typography variant="micro" color="tertiary" truncate>{secondary}</Typography>}
          </div>
        </div>
      );
    default:
      return <div style={base}><Typography variant="body" color="primary" truncate>{primary}</Typography></div>;
  }
}

// ════════════════════════════════════════════════════════════════════════════
//  57. DOT GRID  (data-density visualisation atom)
// ════════════════════════════════════════════════════════════════════════════
type DotVariant = "neutral"|"brand"|"success"|"warning"|"error"|"info";
interface DotGridCell { value?: number; variant?: DotVariant; }
interface DotGridProps {
  rows?: number;
  cols?: number;
  dotSize?: number;
  gap?: number;
  cells?: DotGridCell[][];
  variant?: DotVariant;
  filled?: number;          /* 0-100 percentage of filled dots (for simple mode) */
  style?: React.CSSProperties;
}
const dotColors: Record<DotVariant, string> = {
  neutral:"var(--dot-neutral-bg)", brand:"var(--primary)", success:"var(--status-healthy)",
  warning:"var(--dot-warning-bg)", error:"var(--status-unhealthy)", info:"var(--accent)",
};
export function DotGrid({ rows=6, cols=12, dotSize=8, gap=4, cells, variant="brand", filled=60, style }: DotGridProps) {
  const total = rows * cols;
  const filledCount = cells ? -1 : Math.round((filled / 100) * total);
  return (
    <div style={{ display:"grid", gridTemplateColumns:`repeat(${cols}, ${dotSize}px)`, gap:`${gap}px`, ...style }}>
      {Array.from({ length: rows }, (_, r) =>
        Array.from({ length: cols }, (_, c) => {
          const idx = r * cols + c;
          const cell = cells?.[r]?.[c];
          const isActive = cell ? (cell.value ?? 1) > 0 : idx < filledCount;
          const dotVariant: DotVariant = cell?.variant ?? (isActive ? variant : "neutral");
          return (
            <div
              key={`${r}-${c}`}
              title={cell?.value !== undefined ? String(cell.value) : undefined}
              style={{
                width:dotSize, height:dotSize,
                borderRadius:"var(--radius-full)",
                background: isActive ? dotColors[dotVariant] : "var(--carousel-dot-inactive-bg)",
                transition:`background var(--duration-fast) var(--ease-out)`,
                flexShrink:0,
              }}
            />
          );
        })
      )}
    </div>
  );
}

// ══════════════════════════════════════════════════════════════════════��═════
//  58. COMBO INPUT  (Select prefix + Text input — unified control)
// ════════════════════════════════════════════════════════════════════════════
interface ComboInputOption { label: string; value: string; }
interface ComboInputProps {
  selectOptions?: ComboInputOption[];
  selectValue?: string;
  inputValue?: string;
  placeholder?: string;
  size?: Size;
  disabled?: boolean;
  error?: boolean;
  onSelectChange?: (v: string) => void;
  onInputChange?: (v: string) => void;
  style?: React.CSSProperties;
}
export function ComboInput({
  selectOptions=[{label:"https://",value:"https"},{label:"http://",value:"http"},{label:"ftp://",value:"ftp"}],
  selectValue="https", inputValue, placeholder="example.com",
  size="md", disabled, error, onSelectChange, onInputChange, style,
}: ComboInputProps) {
  const [selVal, setSelVal] = React.useState(selectValue);
  const h = inputHeight[size];
  const px = { sm:"var(--space-2)", md:"var(--space-3)", lg:"var(--space-3)" }[size];
  const bg = disabled ? "var(--input-ds-bg-disabled)" : error ? "var(--input-ds-bg-error)" : "var(--input-ds-bg)";
  const borderColor = error ? "var(--input-ds-border-error)" : "var(--input-ds-border)";
  const handleSelChange = (v: string) => { setSelVal(v); onSelectChange?.(v); };
  return (
    <div style={{ display:"inline-flex", height:h, border:`var(--border-width-thin) solid ${borderColor}`, borderRadius:"var(--input-ds-radius)", overflow:"hidden", background:bg, boxSizing:"border-box" as const, opacity:disabled?"var(--opacity-muted)" as any:1, transition:`border-color var(--duration-fast) var(--ease-out)`, ...style }}>
      {/* Select prefix */}
      <div style={{ display:"flex", alignItems:"center", borderRight:`var(--border-width-thin) solid var(--border-default)`, background:"var(--bg-secondary)", flexShrink:0 }}>
        <select
          disabled={disabled}
          value={selVal}
          onChange={e => handleSelChange(e.target.value)}
          style={{ height:"100%", border:"none", outline:"none", background:"transparent", fontSize:"var(--input-ds-font-size)", fontFamily:"var(--font-family-primary)", color:"var(--fg-secondary)", padding:`0 ${px}`, cursor:disabled?"not-allowed":"pointer", appearance:"none" as const }}
        >
          {selectOptions.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
        </select>
        <div style={{ paddingRight:"var(--space-2)", pointerEvents:"none" }}>
          <svg width="10" height="6" viewBox="0 0 10 6" fill="none"><path d="M1 1L5 5L9 1" stroke="var(--fg-tertiary)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
        </div>
      </div>
      {/* Text input */}
      <input
        type="text"
        disabled={disabled}
        value={inputValue}
        placeholder={placeholder}
        onChange={e => onInputChange?.(e.target.value)}
        style={{ flex:1, border:"none", outline:"none", background:"transparent", fontSize:"var(--input-ds-font-size)", fontFamily:"var(--font-family-primary)", color:disabled?"var(--input-ds-fg-disabled)":"var(--input-ds-fg)", padding:`0 ${px}`, minWidth:0, boxSizing:"border-box" as const }}
      />
    </div>
  );
}

// ════════════════════════════════════════════════════════════════════════════
//  DEMO LAYOUT HELPERS
// ════════════════════════════════════════════════════════════════════════════
function DemoSection({
  title, description, children, index = 0, builtFrom, style,
}: {
  title: string; description: string; children: React.ReactNode;
  index?: number; builtFrom?: string[]; style?: React.CSSProperties;
}) {
  return (
    <SectionCard index={index} title={title} description={description}
      builtFrom={builtFrom} tier="T1 · Atom" style={style}>
      {children}
    </SectionCard>
  );
}
function Row({ children, wrap = true, align = "center", gap = "var(--space-3)" }: {
  children: React.ReactNode; wrap?: boolean; align?: string; gap?: string;
}) {
  return <ShowRow wrap={wrap} align={align} gap={gap}>{children}</ShowRow>;
}
function ColGrid({ children, cols = 3 }: { children: React.ReactNode; cols?: number }) {
  return (
    <div style={{ display: "grid", gridTemplateColumns: `repeat(${cols}, 1fr)`, gap: "var(--space-4)" }}>
      {children}
    </div>
  );
}

// ════════════════════════════════════════════════════════════════════════════
//  28. GPU VENDOR ICON
//  Renders the NVIDIA or AMD vendor SVG mark at a chosen size.
// ════════════════════════════════════════════════════════════════════════════
export type GpuVendor = "nvidia" | "amd";

interface GpuVendorIconProps {
  vendor?: GpuVendor;
  size?: number;
  style?: React.CSSProperties;
}

/** NVIDIA logo path (from Figma import svg-kmufnzacib / svg-xhbnah5flz) */
const NVIDIA_PATH = "M2.00725 5.59646C2.00725 5.59646 3.78354 2.97567 7.33021 2.70454V1.75372C3.40183 2.06921 0 5.39637 0 5.39637C0 5.39637 1.92674 10.9662 7.33021 11.4762V10.4656C3.36489 9.96671 2.00725 5.59646 2.00725 5.59646ZM7.33021 8.45563V9.38127C4.33331 8.84689 3.50144 5.73167 3.50144 5.73167C3.50144 5.73167 4.94038 4.13763 7.33021 3.87913V4.89475C7.32839 4.89475 7.32713 4.8942 7.32563 4.8942C6.07132 4.74368 5.09145 5.91543 5.09145 5.91543C5.09145 5.91543 5.64066 7.88795 7.33021 8.45563ZM7.33021 0V1.75372C7.44553 1.74488 7.56085 1.73738 7.6768 1.73343C12.143 1.58291 15.053 5.39637 15.053 5.39637C15.053 5.39637 11.7107 9.46044 8.2287 9.46044C7.90957 9.46044 7.61081 9.43084 7.33021 9.38111V10.4656C7.57839 10.4975 7.82835 10.5136 8.07857 10.5139C11.3188 10.5139 13.6621 8.85905 15.9311 6.9005C16.3073 7.20179 17.8474 7.93475 18.164 8.25553C16.0066 10.0618 10.9787 11.5178 8.12822 11.5178C7.85345 11.5178 7.58958 11.5012 7.33021 11.4762V13H19.6462V0H7.33021ZM7.33021 3.87913V2.70454C7.44435 2.69657 7.55935 2.69049 7.6768 2.68678C10.8884 2.5859 12.9954 5.44665 12.9954 5.44665C12.9954 5.44665 10.7196 8.60726 8.27953 8.60726C7.92836 8.60726 7.6135 8.55082 7.33013 8.45555V4.89467C8.58042 5.04575 8.83206 5.59804 9.58373 6.85109L11.2556 5.44144C11.2556 5.44144 10.0352 3.84093 7.97801 3.84093C7.75431 3.84085 7.54033 3.85663 7.33021 3.87913Z";
/** AMD logo path (from Figma import svg-xhbnah5flz) */
const AMD_PATH = "M3.75 3.75H20.25V20.25L15.75 15.75V8.25H8.25L3.75 3.75ZM8.25 9.75L3.75 14.25V20.25H10.125L14.625 15.75H8.25V9.75Z";

export function GpuVendorIcon({ vendor = "nvidia", size = 20, style }: GpuVendorIconProps) {
  if (vendor === "nvidia") {
    return (
      <svg width={size} height={Math.round(size * 13 / 19.6)} viewBox="0 0 19.6462 13" fill="none" style={style}>
        <path d={NVIDIA_PATH} fill="var(--icon-success)" />
      </svg>
    );
  }
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" style={style}>
      <path d={AMD_PATH} fill="var(--fg-primary)" />
    </svg>
  );
}

// ════════════════════════════════════════════════════════════════════════════
//  29. ACCELERATOR BLOCK
//  Single 16 × 16 GPU utilisation block. Fill levels: used · allocated · half · empty.
// ════════════════════════════════════════════════════════════════════════════
export type AcceleratorFill = "used" | "allocated" | "half" | "empty";

interface AcceleratorBlockProps {
  fill?: AcceleratorFill;
  size?: number;
  style?: React.CSSProperties;
}

const accelFillBg: Record<AcceleratorFill, string> = {
  used:      "var(--status-used)",
  allocated: "var(--status-allocated)",
  half:      "var(--neutral-300)",
  empty:     "var(--neutral-300)",
};

export function AcceleratorBlock({ fill = "empty", size = 16, style }: AcceleratorBlockProps) {
  return (
    <div style={{
      width:  size,
      height: size,
      borderRadius: "var(--radius-sm-ds)",
      background:   accelFillBg[fill],
      flexShrink: 0,
      overflow: "hidden",
      position: "relative",
      ...style,
    }}>
      {fill === "half" && (
        <div style={{
          position:  "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          height: "50%",
          background: "var(--status-allocated)",
        }} />
      )}
    </div>
  );
}

// ════════════════════════════════════════════════════════════════════════════
//  30. COMPACT VALUE STEPPER
//  Inline − / value / + control. Used inside GPU allocation rows.
//  Named CompactValueStepper to distinguish from the step-indicator Stepper.
// ════════════════════════════════════════════════════════════════════════════
interface CompactValueStepperProps {
  value:    number;
  max:      number;
  min?:     number;
  onChange?: (v: number) => void;
  warn?:    boolean; /** true → value text renders in warning colour */
  style?:   React.CSSProperties;
}

export function CompactValueStepper({
  value, max, min = 0, onChange, warn, style,
}: CompactValueStepperProps) {
  const decrement = () => onChange?.(Math.max(min, value - 1));
  const increment = () => onChange?.(Math.min(max, value + 1));
  const btnStyle: React.CSSProperties = {
    display: "flex", alignItems: "center", justifyContent: "center",
    width:  "var(--size-control-sm)", height: "var(--size-control-sm)",
    background: "transparent", border: "none", cursor: "pointer",
    borderRadius: "var(--radius-sm-ds)", color: "var(--fg-tertiary)",
    flexShrink: 0,
  };
  return (
    <div style={{
      display: "flex", alignItems: "center", gap: "var(--space-3)",
      ...style,
    }}>
      {/* minus */}
      <button onClick={decrement} style={btnStyle} aria-label="Decrease">
        <svg width="12" height="2" viewBox="0 0 11.2 1.6" fill="none">
          <rect width="11.2" height="1.6" rx="0.8" fill="currentColor" />
        </svg>
      </button>
      {/* value display */}
      <span style={{
        fontFamily: "var(--font-family-primary)",
        fontSize:   "var(--text-base)",
        lineHeight: "var(--line-height-md)",
        color:      warn ? "var(--fg-warning)" : "var(--fg-primary)",
        whiteSpace: "nowrap" as const,
        minWidth:   "2.5ch",
        textAlign:  "center",
      }}>
        {value}
        <span style={{ color: "var(--fg-tertiary)", fontSize: "var(--text-caption)" }}>
          {" / "}{max}
        </span>
      </span>
      {/* plus */}
      <button onClick={increment} style={btnStyle} aria-label="Increase">
        <svg width="12" height="12" viewBox="0 0 10.4 10.4" fill="none">
          <path d="M5.2 0.4a0.8 0.8 0 0 1 0.8 0.8V4.4h3.2a0.8 0.8 0 0 1 0 1.6H6V9.2a0.8 0.8 0 0 1-1.6 0V6H1.2a0.8 0.8 0 0 1 0-1.6H4.4V1.2A0.8 0.8 0 0 1 5.2 0.4Z" fill="currentColor" />
        </svg>
      </button>
    </div>
  );
}

// ════════════════════════════════════════════════════════════════════════════
//  31. NUMBER SPINNER
//  Text input with small up/down caret buttons (used in Storage Quotas).
// ════════════════════════════════════════════════════════════════════════════
interface NumberSpinnerProps {
  value:    number;
  min?:     number;
  max?:     number;
  onChange?: (v: number) => void;
  width?:   number | string;
  style?:   React.CSSProperties;
}

export function NumberSpinner({ value, min = 0, max = 999, onChange, width = 72, style }: NumberSpinnerProps) {
  const caretStyle: React.CSSProperties = {
    display: "flex", alignItems: "center", justifyContent: "center",
    width: "var(--number-caret-w)", height: "var(--number-caret-h)", background: "transparent", border: "none",
    cursor: "pointer", color: "var(--fg-tertiary)",
    flexShrink: 0, padding: 0,
  };
  return (
    <div style={{
      display: "flex", alignItems: "center",
      background: "var(--bg-primary)",
      border: `var(--border-width-thin) solid var(--border-default)`,
      borderRadius: "var(--radius-md-ds)",
      boxShadow: "var(--shadow-xs)",
      height: "var(--size-control-lg)",
      width, overflow: "hidden", ...style,
    }}>
      <span style={{
        flex: 1, paddingLeft: "var(--space-3)",
        fontFamily: "var(--font-family-primary)",
        fontSize: "var(--text-base)", color: "var(--fg-primary)",
      }}>
        {value}
      </span>
      <div style={{ display: "flex", flexDirection: "column", paddingRight: "var(--space-1)" }}>
        <button onClick={() => onChange?.(Math.min(max, value + 1))} style={caretStyle} aria-label="Up">
          {/* up caret */}
          <svg width="8" height="5" viewBox="0 0 8 5" fill="none">
            <path d="M1 4L4 1L7 4" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
        <button onClick={() => onChange?.(Math.max(min, value - 1))} style={caretStyle} aria-label="Down">
          {/* down caret */}
          <svg width="8" height="5" viewBox="0 0 8 5" fill="none">
            <path d="M1 1L4 4L7 1" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
      </div>
    </div>
  );
}

// ════════════════════════════════════════════════════════════════════════════
//  32. DUAL RANGE SLIDER
//  Slider with a teal primary fill and optional orange secondary fill region.
//  Used in Storage Quotas to show "quota" vs "used+allocated" values.
// ════════════════════════════════════════════════════════════════════════════
interface DualRangeSliderMark { value: number; label?: string; info?: boolean; }
interface DualRangeSliderProps {
  value:       number;          /** primary handle position (0-max) */
  secondary?:  number;          /** optional secondary fill start */
  max:         number;
  marks?:      DualRangeSliderMark[];
  onChange?:   (v: number) => void;
  style?:      React.CSSProperties;
}

export function DualRangeSlider({ value, secondary, max, marks, onChange, style }: DualRangeSliderProps) {
  const primaryPct   = Math.min(100, (value / max) * 100);
  const secondaryPct = secondary !== undefined ? Math.min(100, (secondary / max) * 100) : null;

  return (
    <div style={{ width: "100%", position: "relative", ...style }}>
      {/* Track background */}
      <div style={{
        position: "relative",
        height: "var(--progress-height)",
        background: "var(--bg-secondary)",
        borderRadius: "var(--radius-full-ds)",
        margin: "var(--space-2) 0",
      }}>
        {/* Primary teal fill */}
        <div style={{
          position: "absolute", left: 0, top: 0, bottom: 0,
          width: `${primaryPct}%`,
          background: "var(--primary)",
          borderRadius: "var(--radius-full-ds)",
        }} />
        {/* Optional secondary warning fill */}
        {secondaryPct !== null && secondaryPct > 0 && (
          <div style={{
            position: "absolute", top: 0, bottom: 0,
            left: `${primaryPct}%`,
            width: `${secondaryPct - primaryPct}%`,
            background: "var(--fg-warning)",
            borderRadius: "var(--radius-full-ds)",
          }} />
        )}
        {/* Handle */}
        <div style={{
          position: "absolute",
          left: `calc(${primaryPct}% - calc(var(--slider-thumb-size) / 2))`,
          top: "50%",
          transform: "translateY(-50%)",
          width: "var(--slider-thumb-size)", height: "var(--slider-thumb-size)",
          borderRadius: "var(--radius-full-ds)",
          background: "var(--bg-primary)",
          border: `var(--border-width-medium) solid var(--primary)`,
          boxShadow: "var(--shadow-sm)",
          cursor: "pointer",
          zIndex: "var(--z-above)" as any,
        }} />
        {/* Mark dots for secondary points */}
        {marks?.map((m, i) => {
          const pct = Math.min(100, (m.value / max) * 100);
          return (
            <div key={i} style={{
              position: "absolute",
              left: `calc(${pct}% - calc(var(--slider-mark-size) / 2))`,
              top: "50%", transform: "translateY(-50%)",
              width: "var(--slider-mark-size)", height: "var(--slider-mark-size)",
              borderRadius: "var(--radius-full-ds)",
              background: "var(--bg-primary)",
              border: `var(--border-width-thin) solid var(--border-default)`,
              zIndex: "var(--z-raised)" as any,
            }} />
          );
        })}
      </div>
      {/* Labels row */}
      {marks && marks.length > 0 && (
        <div style={{ position: "relative", display: "flex", marginTop: "var(--space-1)" }}>
          {marks.map((m, i) => {
            const pct = Math.min(100, (m.value / max) * 100);
            return (
              <span key={i} style={{
                position: "absolute",
                left: `${pct}%`,
                transform: "translateX(-50%)",
                fontFamily: "var(--font-family-primary)",
                fontSize:   "var(--text-micro)",
                color:      "var(--fg-tertiary)",
                whiteSpace: "nowrap" as const,
              }}>
                {m.label ?? m.value}
                {m.info && (
                  <span style={{ marginLeft: "var(--space-half)", color: "var(--fg-disabled)" }}>●</span>
                )}
              </span>
            );
          })}
          <span style={{
            fontFamily: "var(--font-family-primary)",
            fontSize:   "var(--text-micro)",
            color:      "var(--fg-tertiary)",
          }}>0</span>
        </div>
      )}
    </div>
  );
}

// ════════════════════════════════════════════════════════════════════════════
//  33. USAGE BAR  (segmented capacity bar with used / allocated / total)
//  Table cell atom showing a dual-segment progress bar for storage / resource usage.
//  All colours & sizes reference Layer-3 table-viz tokens.
// ════════════════════════════════════════════════════════════════════════════
interface UsageBarProps {
  used: number;
  allocated: number;
  total: number;
  unit?: string;
  style?: React.CSSProperties;
}
export function UsageBar({ used, allocated, total, unit = "TB", style }: UsageBarProps) {
  const pctUsed = total > 0 ? Math.min(100, (used / total) * 100) : 0;
  const pctAlloc = total > 0 ? Math.min(100, (allocated / total) * 100) : 0;
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-1)", width: "100%", ...style }}>
      <div style={{ display: "flex", alignItems: "baseline", gap: "var(--space-1)" }}>
        <Typography variant="body" weight="medium" color="primary">
          {used} / {allocated} {unit}
        </Typography>
        <Typography variant="body" color="tertiary">
          {total}{unit}
        </Typography>
      </div>
      <div style={{
        position: "relative", width: "100%",
        height: "var(--table-viz-bar-height)",
        borderRadius: "var(--table-viz-bar-radius)",
        background: "var(--progress-track-brand-bg)",
        overflow: "hidden",
      }}>
        <div style={{
          position: "absolute", top: 0, left: 0,
          width: `${pctAlloc}%`, height: "100%",
          borderRadius: "var(--table-viz-bar-radius)",
          background: "var(--table-viz-bar-allocated)",
          transition: `width var(--duration-slow) var(--ease-out)`,
        }} />
        <div style={{
          position: "absolute", top: 0, left: 0,
          width: `${pctUsed}%`, height: "100%",
          borderRadius: "var(--table-viz-bar-radius)",
          background: "var(--table-viz-bar-used)",
          transition: `width var(--duration-slow) var(--ease-out)`,
        }} />
      </div>
    </div>
  );
}

// ═══════════════════════���════════════════════════════════════════════════════
//  ATOMS TAB — MAIN EXPORT
// ════════════════════════════════════════════════════════════════════════════
export function AtomsTab() {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-6)" }}>

      {/* ── Tier Header ─────────────────────────────────────────────── */}
      <TierHeader
        tier="T1"
        label="Atoms"
        description="Primitive, indivisible controls. Every other tier is composed from these. All values reference CSS custom properties — zero hardcoded colours or sizes."
        count={65}
        tokenCount={120}
      />

      {/* ── 00. Design Tokens ───────────────────────────────────────── */}
      <SectionCard index={0} title="Design Tokens" tier="T1 · Foundation"
        description="Three-tier CSS cascade: Primitives → Semantic → Component. Edit any root token to propagate through the entire system.">

        <SubLabel>Foreground semantic tokens</SubLabel>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(var(--showcase-grid-col-sm), 1fr))", gap: "var(--space-2)" }}>
          {[
            { label: "fg/primary",   css: "var(--fg-primary)"   },
            { label: "fg/secondary", css: "var(--fg-secondary)"  },
            { label: "fg/tertiary",  css: "var(--fg-tertiary)"   },
            { label: "fg/brand",     css: "var(--fg-brand)"      },
            { label: "fg/success",   css: "var(--fg-success)"    },
            { label: "fg/error",     css: "var(--fg-error)"      },
            { label: "fg/warning",   css: "var(--fg-warning)"    },
            { label: "fg/info",      css: "var(--fg-info)"       },
          ].map(t => (
            <div key={t.label} style={{ display: "flex", alignItems: "center", gap: "var(--space-2)" }}>
              <div style={{ width: "var(--color-picker-mini-swatch)", height: "var(--color-picker-mini-swatch)", borderRadius: "var(--radius-xs)", background: t.css, border: "var(--border-width-thin) solid var(--border-default)", flexShrink: 0 }} />
              <span style={{ fontFamily: "var(--font-family-mono)", fontSize: "var(--text-micro)", color: "var(--fg-secondary)" }}>{t.label}</span>
            </div>
          ))}
        </div>

        <SubLabel>Background semantic tokens</SubLabel>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(var(--showcase-grid-col-md), 1fr))", gap: "var(--space-2)" }}>
          {[
            { label: "bg/primary",        css: "var(--bg-primary)"        },
            { label: "bg/secondary",      css: "var(--bg-secondary)"      },
            { label: "bg/brand",          css: "var(--bg-brand)"          },
            { label: "bg/brand-subtle",   css: "var(--bg-brand-subtle)"   },
            { label: "bg/error",          css: "var(--bg-error)"          },
            { label: "bg/error-subtle",   css: "var(--bg-error-subtle)"   },
            { label: "bg/success",        css: "var(--bg-success)"        },
            { label: "bg/success-subtle", css: "var(--bg-success-subtle)" },
            { label: "bg/warning",        css: "var(--bg-warning)"        },
            { label: "bg/info",           css: "var(--bg-info)"           },
            { label: "bg/disabled",       css: "var(--bg-disabled)"       },
            { label: "bg/inverse",        css: "var(--bg-inverse)"        },
          ].map(t => (
            <div key={t.label} style={{ display: "flex", alignItems: "center", gap: "var(--space-2)" }}>
              <div style={{ width: "var(--color-picker-mini-swatch)", height: "var(--color-picker-mini-swatch)", borderRadius: "var(--radius-xs)", background: t.css, border: "var(--border-width-thin) solid var(--border-default)", flexShrink: 0 }} />
              <span style={{ fontFamily: "var(--font-family-mono)", fontSize: "var(--text-micro)", color: "var(--fg-secondary)" }}>{t.label}</span>
            </div>
          ))}
        </div>

        <SubLabel>Primitive colour ramp</SubLabel>
        <div style={{ display: "flex", gap: "var(--space-1)", flexWrap: "wrap" as const }}>
          {[
            "var(--teal-50)","var(--teal-100)","var(--teal-200)","var(--teal-300)","var(--teal-600)","var(--teal-700)",
            "var(--green-50)","var(--green-100)","var(--green-300)","var(--green-500)","var(--green-700)",
            "var(--red-50)","var(--red-100)","var(--red-300)","var(--red-500)","var(--red-700)","var(--red-800)",
            "var(--orange-50)","var(--orange-100)","var(--orange-300)","var(--orange-500)","var(--orange-700)",
            "var(--sky-50)","var(--sky-100)","var(--sky-300)","var(--sky-500)","var(--sky-700)",
            "var(--purple-200)","var(--purple-500)","var(--purple-600)",
            "var(--pink-200)","var(--pink-500)",
            "var(--neutral-25)","var(--neutral-50)","var(--neutral-100)","var(--neutral-200)","var(--neutral-300)",
            "var(--neutral-400)","var(--neutral-500)","var(--neutral-600)","var(--neutral-700)","var(--neutral-800)",
            "var(--neutral-900)","var(--neutral-950)",
          ].map((css, i) => (
            <div key={i} title={css} style={{ width: "var(--color-picker-preset-swatch)", height: "var(--color-picker-preset-swatch)", borderRadius: "var(--radius-xs)", background: css, border: "var(--border-width-thin) solid var(--color-picker-swatch-border)", flexShrink: 0 }} />
          ))}
        </div>

        <SubLabel>Spacing scale — 4 px grid</SubLabel>
        <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-2)" }}>
          {[
            { label: "--space-1  /  4px", w: "var(--space-1)"  },
            { label: "--space-2  /  8px", w: "var(--space-2)"  },
            { label: "--space-3  / 12px", w: "var(--space-3)"  },
            { label: "--space-4  / 16px", w: "var(--space-4)"  },
            { label: "--space-6  / 24px", w: "var(--space-6)"  },
            { label: "--space-8  / 32px", w: "var(--space-8)"  },
            { label: "--space-12 / 48px", w: "var(--space-12)" },
            { label: "--space-16 / 64px", w: "var(--space-16)" },
          ].map(s => (
            <div key={s.label} style={{ display: "flex", alignItems: "center", gap: "var(--space-3)" }}>
              <div style={{ width: s.w, height: "var(--space-2)", borderRadius: "var(--radius-full)", background: "var(--primary)", opacity: "var(--opacity-indicator)" as any, flexShrink: 0 }} />
              <span style={{ fontFamily: "var(--font-family-mono)", fontSize: "var(--text-micro)", color: "var(--fg-tertiary)" }}>{s.label}</span>
            </div>
          ))}
        </div>

        <SubLabel>Radius scale</SubLabel>
        <Row>
          {[
            { label: "none / 0",   r: "var(--radius-none-ds)" },
            { label: "xs / 3px",   r: "var(--radius-xs)"     },
            { label: "sm / 4px",   r: "var(--radius-sm-ds)"  },
            { label: "md / 8px",   r: "var(--radius-md-ds)"  },
            { label: "lg / 12px",  r: "var(--radius-lg-ds)"  },
            { label: "full",       r: "var(--radius-full)"   },
          ].map(s => (
            <div key={s.label} style={{ display: "flex", flexDirection: "column", gap: "var(--space-1)", alignItems: "flex-start" }}>
              <div style={{ width: "var(--color-picker-radius-demo-w)", height: "var(--color-picker-radius-demo-h)", borderRadius: s.r, background: "var(--bg-brand-subtle)", border: "var(--border-width-thin) solid var(--border-brand)" }} />
              <span style={{ fontFamily: "var(--font-family-mono)", fontSize: "var(--text-micro)", color: "var(--fg-tertiary)", whiteSpace: "nowrap" as const }}>{s.label}</span>
            </div>
          ))}
        </Row>

        <SubLabel>Font families</SubLabel>
        <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-2)" }}>
          {[
            { family: "var(--font-family-primary)", name: "Inter",   token: "--font-family-primary", use: "Body, labels, form text, all UI copy" },
            { family: "var(--font-family-display)", name: "DM Sans", token: "--font-family-display", use: "Headings, brand wordmarks, display titles" },
            { family: "var(--font-family-mono)",    name: "Cousine", token: "--font-family-mono",    use: "Code, token names, counts, monospace data" },
          ].map(f => (
            <div key={f.token} style={{ display: "flex", alignItems: "center", gap: "var(--space-4)", padding: "var(--space-3) var(--space-4)", background: "var(--bg-secondary)", borderRadius: "var(--radius-sm-ds)", border: "var(--border-width-thin) solid var(--border-default)" }}>
              <div style={{ fontFamily: f.family, fontSize: "var(--text-xl)", fontWeight: "var(--font-weight-bold)" as any, color: "var(--fg-primary)", lineHeight: "var(--line-height-none)", width: "var(--font-showcase-label-w)", flexShrink: 0 }}>{f.name}</div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <span style={{ fontFamily: "var(--font-family-mono)", fontSize: "var(--text-micro)", color: "var(--fg-brand)" }}>{f.token}</span>
                <span style={{ fontFamily: "var(--font-family-primary)", fontSize: "var(--text-micro)", color: "var(--fg-tertiary)", marginLeft: "var(--space-3)" }}>{f.use}</span>
              </div>
            </div>
          ))}
        </div>
      </SectionCard>

      {/* ── 01. Button ──────────────────────────────────────────────── */}
      <DemoSection index={1} title="Button" description="7 variants × 3 sizes × 5 states + loading + icon + full-width." builtFrom={["Typography","Spinner"]}>
        <SubLabel>Variants</SubLabel>
        <Row>
          {(["primary","secondary","outline","ghost","danger","text","link"] as BtnVariant[]).map(v => (
            <Button key={v} variant={v}>{v.charAt(0).toUpperCase() + v.slice(1)}</Button>
          ))}
        </Row>
        <SubLabel>Sizes — sm · 24px / md · 32px / lg · 40px</SubLabel>
        <Row align="center">
          <Button variant="primary" size="sm">Small · 24px</Button>
          <Button variant="primary" size="md">Medium · 32px</Button>
          <Button variant="primary" size="lg">Large · 40px</Button>
        </Row>
        <SubLabel>States</SubLabel>
        <Row>
          <Button variant="primary">Default</Button>
          <Button variant="primary" loading>Loading</Button>
          <Button variant="primary" disabled>Disabled</Button>
          <Button variant="secondary" disabled>Sec · Disabled</Button>
          <Button variant="danger">Danger</Button>
          <Button variant="danger" disabled>Danger · Disabled</Button>
        </Row>
        <SubLabel>With icons</SubLabel>
        <Row>
          <Button variant="primary"   icon={<Icon name="plus"     size="sm" color="inverse"   />}>Add Item</Button>
          <Button variant="secondary" icon={<Icon name="download" size="sm" color="secondary" />} iconPosition="right">Export</Button>
          <Button variant="outline"   icon={<Icon name="refresh"  size="sm" color="primary"   />}>Refresh</Button>
          <Button variant="ghost"     icon={<Icon name="filter"   size="sm" color="secondary" />}>Filter</Button>
        </Row>
        <SubLabel>Full width</SubLabel>
        <Button variant="primary" fullWidth>Full Width Button</Button>
      </DemoSection>

      {/* ── 02. Text Input ──────────────────────────────────────────── */}
      <DemoSection index={2} title="Text Input" description="3 sizes × 5 states + prefix / suffix addons." builtFrom={["Typography"]}>
        <SubLabel>Sizes</SubLabel>
        <SizeStrip
          align="flex-start"
          sm={<TextInput size="sm" placeholder="Small · 24px"  style={{ width: "100%" }} />}
          md={<TextInput size="md" placeholder="Medium · 32px" style={{ width: "100%" }} />}
          lg={<TextInput size="lg" placeholder="Large · 40px"  style={{ width: "100%" }} />}
        />
        <SubLabel>States</SubLabel>
        <ColGrid cols={4}>
          <TextInput placeholder="Default" />
          <TextInput defaultValue="Has value" />
          <TextInput error placeholder="Error state" />
          <TextInput disabled placeholder="Disabled" />
        </ColGrid>
        <SubLabel>Prefix / Suffix</SubLabel>
        <Row>
          <TextInput placeholder="Search…"   prefix={<Icon name="search" size="sm" color="tertiary" />} style={{ width: "var(--showcase-input-w-lg)" }} />
          <TextInput placeholder="Amount"    suffix={<Typography variant="label" color="tertiary">USD</Typography>} style={{ width: "var(--showcase-input-w-xs)" }} />
          <TextInput placeholder="URL"       prefix={<Typography variant="label" color="tertiary">https://</Typography>} style={{ width: "var(--showcase-input-w-lg)" }} />
          <TextInput placeholder="With both" prefix={<Icon name="mail" size="sm" color="tertiary" />} suffix={<Icon name="x" size="sm" color="tertiary" />} style={{ width: "var(--showcase-input-w-md)" }} />
        </Row>
      </DemoSection>

      {/* ── 03. InputPassword ───────────────────────────────────────── */}
      <DemoSection index={3} title="InputPassword" description="3 sizes + show/hide toggle + disabled." builtFrom={["TextInput","Icon"]}>
        <SubLabel>Sizes</SubLabel>
        <SizeStrip
          align="flex-start"
          sm={<InputPassword size="sm" style={{ width: "100%" }} />}
          md={<InputPassword size="md" style={{ width: "100%" }} />}
          lg={<InputPassword size="lg" style={{ width: "100%" }} />}
        />
        <SubLabel>States</SubLabel>
        <Row>
          <InputPassword size="md" placeholder="Hidden"   style={{ width: "var(--showcase-input-w-sm)" }} />
          <InputPassword size="md" showPassword           style={{ width: "var(--showcase-input-w-sm)" }} />
          <InputPassword size="md" disabled               style={{ width: "var(--showcase-input-w-sm)" }} />
        </Row>
      </DemoSection>

      {/* ── 04. InputNumber ─────────────────────────────────────────── */}
      <DemoSection index={4} title="InputNumber" description="3 sizes + increment / decrement stepper + disabled." builtFrom={["TextInput"]}>
        <SubLabel>Sizes</SubLabel>
        <SizeStrip
          align="flex-start"
          sm={<InputNumber size="sm" value={10}  style={{ width: "100%" }} />}
          md={<InputNumber size="md" value={42}  style={{ width: "100%" }} />}
          lg={<InputNumber size="lg" value={100} style={{ width: "100%" }} />}
        />
        <SubLabel>Disabled</SubLabel>
        <Row>
          <InputNumber size="sm" value={5} disabled style={{ width: "var(--showcase-input-w-3xs)" }} />
          <InputNumber size="md" value={5} disabled style={{ width: "var(--showcase-input-w-3xs)" }} />
          <InputNumber size="lg" value={5} disabled style={{ width: "var(--showcase-input-w-3xs)" }} />
        </Row>
      </DemoSection>

      {/* ── 05. TextArea ────────────────────────────────────────────── */}
      <DemoSection index={5} title="TextArea" description="3 sizes × 4 states + resizable toggle." builtFrom={["Typography"]}>
        <SubLabel>Sizes</SubLabel>
        <ColGrid cols={3}>
          {(["sm","md","lg"] as Size[]).map(s => (
            <div key={s}>
              <span style={{ fontFamily: "var(--font-family-mono)", fontSize: "var(--text-micro)", color: "var(--fg-tertiary)" }}>{s} · {s==="sm"?2:s==="md"?3:4} rows</span>
              <TextArea size={s} placeholder={`${s} textarea`} style={{ marginTop: "var(--space-2)", width: "100%" }} />
            </div>
          ))}
        </ColGrid>
        <SubLabel>States</SubLabel>
        <ColGrid cols={4}>
          <TextArea placeholder="Default" />
          <TextArea error placeholder="Error state" />
          <TextArea disabled placeholder="Disabled" />
          <TextArea resizable={false} placeholder="Non-resizable" />
        </ColGrid>
      </DemoSection>

      {/* ── 06. Select ──────────────────────────────────────────────── */}
      <DemoSection index={6} title="Select" description="3 sizes × 4 states." builtFrom={["Typography","Icon"]}>
        <SubLabel>Sizes</SubLabel>
        <SizeStrip
          align="flex-start"
          sm={<Select size="sm" options={[{label:"Option A",value:"a"},{label:"Option B",value:"b"}]} style={{ width: "100%" }} />}
          md={<Select size="md" options={[{label:"Option A",value:"a"},{label:"Option B",value:"b"}]} style={{ width: "100%" }} />}
          lg={<Select size="lg" options={[{label:"Option A",value:"a"},{label:"Option B",value:"b"}]} style={{ width: "100%" }} />}
        />
        <SubLabel>States</SubLabel>
        <ColGrid cols={4}>
          <Select placeholder="Placeholder" />
          <Select value="a" options={[{label:"Option A",value:"a"}]} />
          <Select error placeholder="Error" />
          <Select disabled placeholder="Disabled" />
        </ColGrid>
      </DemoSection>

      {/* ── 07. Checkbox ────────────────────────────────────────────── */}
      <DemoSection index={7} title="Checkbox" description="Unchecked / checked / indeterminate × enabled / disabled." builtFrom={["Typography"]}>
        <Row>
          <Checkbox label="Unchecked" />
          <Checkbox checked label="Checked" />
          <Checkbox indeterminate label="Indeterminate" />
          <Checkbox disabled label="Disabled" />
          <Checkbox checked disabled label="Checked + Disabled" />
        </Row>
      </DemoSection>

      {/* ── 08. Radio + RadioGroup ──────────────────────────────────── */}
      <DemoSection index={8} title="Radio + RadioGroup" description="3 layouts: vertical / horizontal / button-group." builtFrom={["Typography"]}>
        <Row align="flex-start" gap="var(--space-8)">
          <div>
            <SubLabel>Vertical</SubLabel>
            <RadioGroup options={[{label:"Option A",value:"a"},{label:"Option B",value:"b"},{label:"Disabled",value:"c",disabled:true}]} value="a" layout="vertical" style={{ marginTop: "var(--space-2)" }} />
          </div>
          <div>
            <SubLabel>Horizontal</SubLabel>
            <RadioGroup options={[{label:"Option A",value:"a"},{label:"Option B",value:"b"},{label:"Option C",value:"c"}]} value="b" layout="horizontal" style={{ marginTop: "var(--space-2)" }} />
          </div>
          <div>
            <SubLabel>Button group</SubLabel>
            <div style={{ marginTop: "var(--space-2)" }}>
              <RadioGroup options={[{label:"Week",value:"week"},{label:"Month",value:"month"},{label:"Year",value:"year"}]} value="month" layout="button-group" />
            </div>
          </div>
        </Row>
      </DemoSection>

      {/* ── 09. Switch ──────────────────────────────────────────────── */}
      <DemoSection index={9} title="Switch" description="3 sizes × on/off × disabled." builtFrom={["Typography"]}>
        <SubLabel>Sizes × on / off</SubLabel>
        <SizeStrip
          align="flex-start"
          sm={<div style={{ display:"flex", flexDirection:"column", gap:"var(--space-2)" }}><Switch size="sm" checked label="sm · on" /><Switch size="sm" label="sm · off" /></div>}
          md={<div style={{ display:"flex", flexDirection:"column", gap:"var(--space-2)" }}><Switch size="md" checked label="md · on" /><Switch size="md" label="md · off" /></div>}
          lg={<div style={{ display:"flex", flexDirection:"column", gap:"var(--space-2)" }}><Switch size="lg" checked label="lg · on" /><Switch size="lg" label="lg · off" /></div>}
        />
        <SubLabel>Disabled</SubLabel>
        <Row>
          <Switch checked disabled label="Checked + Disabled" />
          <Switch disabled label="Unchecked + Disabled" />
        </Row>
      </DemoSection>

      {/* ── 10. Slider ──────────────────────────────────────────────── */}
      <DemoSection index={10} title="Slider" description="4 semantic colours × marks + value label + disabled." builtFrom={["Typography"]}>
        <SubLabel>Colours × marks</SubLabel>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "var(--space-4) var(--space-8)", maxWidth: "var(--showcase-max-w-lg)" }}>
          <Slider value={60} color="brand"   showValue marks />
          <Slider value={40} color="success" showValue marks />
          <Slider value={75} color="warning" showValue marks />
          <Slider value={85} color="error"   showValue marks />
        </div>
        <SubLabel>Disabled</SubLabel>
        <div style={{ maxWidth: "var(--showcase-max-w-sm)" }}>
          <Slider value={50} disabled />
        </div>
      </DemoSection>

      {/* ── 11. Rate ────────────────────────────────────────────────── */}
      <DemoSection index={11} title="Rate" description="3 sizes × max-5 / max-10 + empty + disabled.">
        <SubLabel>Sizes</SubLabel>
        <SizeStrip
          sm={<Rate value={3} size="sm" />}
          md={<Rate value={4} size="md" />}
          lg={<Rate value={5} size="lg" />}
        />
        <SubLabel>Max 10 + empty + disabled</SubLabel>
        <Row>
          <Rate value={7} max={10} size="md" />
          <Rate value={0} size="md" />
          <Rate value={3} disabled size="md" />
        </Row>
      </DemoSection>

      {/* ── 12. DatePicker ──────────────────────────────────────────── */}
      <DemoSection index={12} title="DatePicker" description="3 sizes × 4 states." builtFrom={["TextInput","Icon"]}>
        <SubLabel>Sizes</SubLabel>
        <SizeStrip
          align="flex-start"
          sm={<DatePicker size="sm" style={{ width: "100%" }} />}
          md={<DatePicker size="md" value="2026-02-28" style={{ width: "100%" }} />}
          lg={<DatePicker size="lg" style={{ width: "100%" }} />}
        />
        <SubLabel>States</SubLabel>
        <ColGrid cols={3}>
          <DatePicker size="md" placeholder="Default" />
          <DatePicker size="md" error />
          <DatePicker size="md" disabled />
        </ColGrid>
      </DemoSection>

      {/* ── 13. TimePicker ──────────────────────────────────────────── */}
      <DemoSection index={13} title="TimePicker" description="3 sizes × 24h / 12h format + disabled." builtFrom={["TextInput","Icon"]}>
        <SubLabel>Sizes</SubLabel>
        <SizeStrip
          align="flex-start"
          sm={<TimePicker size="sm" style={{ width: "100%" }} />}
          md={<TimePicker size="md" value="14:30" style={{ width: "100%" }} />}
          lg={<TimePicker size="lg" style={{ width: "100%" }} />}
        />
        <SubLabel>12-hour format + disabled</SubLabel>
        <Row>
          <TimePicker size="md" use12h  style={{ width: "var(--showcase-input-w-2xs)" }} />
          <TimePicker size="md" disabled style={{ width: "var(--showcase-input-w-2xs)" }} />
        </Row>
      </DemoSection>

      {/* ── 14. ColorPicker ─────────────────────────────────────────── */}
      <DemoSection index={14} title="Color Picker" description="3 colour values + disabled + swatches.">
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, auto)", gap: "var(--space-6)", justifyContent: "flex-start" }}>
          <ColorPicker value="var(--primary)"    />
          <ColorPicker value="var(--color-picker-purple)" />
          <ColorPicker value="var(--color-picker-red)"    />
          <ColorPicker disabled />
        </div>
      </DemoSection>

      {/* ── 15. Avatar ──────────────────────────────────────────────── */}
      <DemoSection index={15} title="Avatar" description="4 sizes × circle / square × initials / image + status indicators." builtFrom={["Typography"]}>
        <SubLabel>Sizes × shapes</SubLabel>
        <Row align="flex-end">
          {(["sm","md","lg","xl"] as AvatarSize[]).map(s => (
            <span key={s} style={{ display: "contents" }}>
              <Avatar size={s} shape="circle" label="JD" />
              <Avatar size={s} shape="square" label="AB" />
            </span>
          ))}
        </Row>
        <SubLabel>Status indicators</SubLabel>
        <Row>
          <Avatar size="md" label="ON" status="online"  />
          <Avatar size="md" label="OF" status="offline" />
          <Avatar size="md" label="BU" status="busy"    />
          <Avatar size="md" label="AW" status="away"    />
        </Row>
      </DemoSection>

      {/* ── 16. Badge ───────────────────────────────────────────────── */}
      <DemoSection index={16} title="Badge" description="Dot / count / label × 7 colours × 2 sizes." builtFrom={["Typography"]}>
        <SubLabel>Label badges — all variants</SubLabel>
        <Row>
          {(["primary","success","error","warning","neutral","info","disconnected"] as BadgeVariant[]).map(v => (
            <BadgeLabel key={v} label={v} variant={v} />
          ))}
        </Row>
        <SubLabel>With dot prefix</SubLabel>
        <Row>
          {(["primary","success","error","warning","info"] as BadgeVariant[]).map(v => (
            <BadgeLabel key={v} label={v} variant={v} dot />
          ))}
        </Row>
        <SubLabel>Small size</SubLabel>
        <Row>
          {(["primary","success","error","warning","neutral","info"] as BadgeVariant[]).map(v => (
            <BadgeLabel key={v} label={v} variant={v} size="sm" />
          ))}
        </Row>
        <SubLabel>Count dots</SubLabel>
        <Row>
          <BadgeDot variant="error"   count={3}   />
          <BadgeDot variant="error"   count={99}  />
          <BadgeDot variant="error"   count={100} />
          <BadgeDot variant="primary" count={12}  />
          <BadgeDot variant="success" count={1}   />
          <BadgeDot variant="error"   />
          <BadgeDot variant="success" />
          <BadgeDot variant="primary" />
          <BadgeDot variant="warning" />
        </Row>
      </DemoSection>

      {/* ── 17. Tag ─────────────────────────────────────────────────── */}
      <DemoSection index={17} title="Tag" description="10 colour variants + closable + icon + 2 sizes." builtFrom={["Typography","Icon"]}>
        <SubLabel>All variants</SubLabel>
        <Row>
          {(["primary","success","error","warning","neutral","info","purple","pink","orange","sky"] as TagVariant[]).map(v => (
            <Tag key={v} label={v} variant={v} />
          ))}
        </Row>
        <SubLabel>Special cases</SubLabel>
        <Row>
          <Tag label="Closable" closable />
          <Tag label="With icon" icon={<Icon name="star" size="sm" color="brand" />} variant="primary" />
          <Tag label="Small" size="sm" variant="info" />
          <Tag label="Small closable" size="sm" closable variant="success" />
        </Row>
      </DemoSection>

      {/* ── 18. Icon ────────────────────────────────────────────────── */}
      <DemoSection index={18} title="Icon" description="46+ icons × 3 sizes (16 / 20 / 24 px) �� 9 semantic colours.">
        <SubLabel>Small · 16 px</SubLabel>
        <Row>
          {(["search","bell","user","settings","edit","trash","upload","star","check","x","plus","calendar","clock","arrow-right","filter","copy","lock","home"] as IconName[]).map(n => (
            <Icon key={n} name={n} size="sm" color="secondary" />
          ))}
        </Row>
        <SubLabel>Medium · 20 px</SubLabel>
        <Row>
          {(["search","bell","user","settings","edit","trash","upload","star","check","x","plus","calendar","clock","arrow-right","filter","copy","lock","home"] as IconName[]).map(n => (
            <Icon key={n} name={n} size="md" color="primary" />
          ))}
        </Row>
        <SubLabel>Large · 24 px</SubLabel>
        <Row>
          {(["search","bell","user","settings","edit","trash","home","folder","file","image","lock","globe","refresh","more"] as IconName[]).map(n => (
            <Icon key={n} name={n} size="lg" color="brand" />
          ))}
        </Row>
        <SubLabel>Semantic colours</SubLabel>
        <Row>
          {(["primary","secondary","tertiary","brand","success","error","warning","info","disabled"] as IconColor[]).map(c => (
            <div key={c} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "var(--space-1)" }}>
              <Icon name="star" size="md" color={c} />
              <Typography variant="micro" color="tertiary">{c}</Typography>
            </div>
          ))}
        </Row>
      </DemoSection>

      {/* ── 19. Progress Bar ────────────────────────────────────────── */}
      <DemoSection index={19} title="Progress Bar" description="Linear × 5 statuses × 3 sizes + percentage label." builtFrom={["Typography"]}>
        <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-3)" }}>
          {(["normal","success","error","warning","brand"] as ProgressStatus[]).map(s => (
            <div key={s} style={{ display: "flex", alignItems: "center", gap: "var(--space-3)" }}>
              <Typography variant="label" color="secondary" style={{ width: "var(--showcase-label-w)", flexShrink: 0 }}>{s}</Typography>
              <ProgressBar percent={65} status={s} size="sm" fullWidth style={{ flex: 1 }} />
              <ProgressBar percent={65} status={s} size="md" fullWidth style={{ flex: 1 }} />
              <ProgressBar percent={65} status={s} size="lg" fullWidth style={{ flex: 1 }} />
              <ProgressBar percent={65} status={s} showLabel />
            </div>
          ))}
        </div>
      </DemoSection>

      {/* ── 20. Skeleton ────────────────────────────────────────────── */}
      <DemoSection index={20} title="Skeleton" description="Text / circle / rect / card variants — shimmer animation.">
        <div style={{ display: "grid", gridTemplateColumns: "1fr auto auto 1fr", gap: "var(--space-6)", alignItems: "flex-start" }}>
          <div><SubLabel>Text</SubLabel><div style={{ marginTop: "var(--space-2)" }}><Skeleton variant="text" lines={3} /></div></div>
          <div><SubLabel>Circle</SubLabel><div style={{ marginTop: "var(--space-2)" }}><Skeleton variant="circle" height={48} /></div></div>
          <div><SubLabel>Rect</SubLabel><div style={{ marginTop: "var(--space-2)" }}><Skeleton variant="rect" width={120} height={80} /></div></div>
          <div><SubLabel>Card</SubLabel><div style={{ marginTop: "var(--space-2)" }}><Skeleton variant="card" /></div></div>
        </div>
      </DemoSection>

      {/* ── 21. Spinner ─────────────────────────────────────────────── */}
      <DemoSection index={21} title="Spinner" description="3 sizes × 3 colours — indeterminate progress indicator.">
        <SizeStrip
          sm={<div style={{ display:"flex", gap:"var(--space-4)" }}><Spinner size="sm" color="brand" /><Spinner size="sm" color="neutral" /></div>}
          md={<div style={{ display:"flex", gap:"var(--space-4)" }}><Spinner size="md" color="brand" /><Spinner size="md" color="neutral" /></div>}
          lg={<div style={{ display:"flex", gap:"var(--space-4)" }}><Spinner size="lg" color="brand" /><Spinner size="lg" color="neutral" /></div>}
        />
      </DemoSection>

      {/* ── 22. Tooltip ─────────────────────────────────────────────── */}
      <DemoSection index={22} title="Tooltip" description="4 placements × arrow caret — shown statically open." builtFrom={["Typography"]} style={{ overflow:"visible" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "var(--space-6)", padding:"var(--space-2)" }}>
          {(["top","bottom","left","right"] as TooltipPlacement[]).map(p => (
            <div key={p} style={{
              display:"flex", alignItems:"center", justifyContent:"center",
              paddingTop:    p === "top"    ? 48 : undefined,
              paddingBottom: p === "bottom" ? 48 : undefined,
              paddingLeft:   p === "left"   ? 120 : undefined,
              paddingRight:  p === "right"  ? 120 : undefined,
            }}>
              <Tooltip content={`${p.charAt(0).toUpperCase()+p.slice(1)} tooltip`} placement={p}>
                <Button variant="secondary" size="sm">{p}</Button>
              </Tooltip>
            </div>
          ))}
        </div>
      </DemoSection>

      {/* ── 23. QR Code ────────────────────────��────────────────────── */}
      <DemoSection index={23} title="QR Code" description="3 sizes — sm / md / lg — inline SVG pattern.">
        <Row align="flex-end">
          <QRCode size="sm" />
          <QRCode size="md" />
          <QRCode size="lg" />
        </Row>
      </DemoSection>

      {/* ── 24. Divider ─────────────────────────────────────────────── */}
      <DemoSection index={24} title="Divider" description="Horizontal / with label / vertical.">
        <SubLabel>Horizontal</SubLabel>
        <Divider />
        <SubLabel>With label</SubLabel>
        <Divider label="Section Label" />
        <SubLabel>Vertical</SubLabel>
        <div style={{ display: "flex", height: "var(--size-control-lg)", alignItems: "center", gap: "var(--space-4)" }}>
          <Typography variant="body" color="secondary">Left content</Typography>
          <Divider vertical />
          <Typography variant="body" color="secondary">Right content</Typography>
        </div>
      </DemoSection>

      {/* ── 25. Stepper ─────────────────────────────────────────────── */}
      <DemoSection index={25} title="Stepper" description="Horizontal / vertical × 4 step states (complete / active / pending / error).">
        <SubLabel>Horizontal</SubLabel>
        <Stepper steps={[
          { label: "Account", status: "complete" },
          { label: "Profile", status: "active",  description: "Fill in your details" },
          { label: "Review",  status: "pending" },
          { label: "Submit",  status: "pending" },
        ]} direction="horizontal" />
        <SubLabel>Vertical</SubLabel>
        <Stepper steps={[
          { label: "Step 1", status: "complete", description: "Completed successfully" },
          { label: "Step 2", status: "error",    description: "Failed — please retry"  },
          { label: "Step 3", status: "active"  },
          { label: "Step 4", status: "pending" },
        ]} direction="vertical" />
      </DemoSection>

      {/* ── 26. Segmented Control ───────────────────────────────────── */}
      <DemoSection index={26} title="Segmented Control" description="Pill toggle group — single active item.">
        <Row>
          <SegmentedControl value="week"
            options={[{label:"Day",value:"day"},{label:"Week",value:"week"},{label:"Month",value:"month"}]} />
          <SegmentedControl value="list"
            options={[{label:"Grid",value:"grid"},{label:"List",value:"list"},{label:"Compact",value:"compact"}]} />
        </Row>
      </DemoSection>

      {/* ── 27. Timeline ────────────────��───────────────────────────── */}
      <DemoSection index={27} title="Timeline" description="7 entries × 6 dot colours + compact variant.">
        <Row align="flex-start" gap="var(--space-8)">
          <Timeline items={[
            { label: "Deployment started",  time: "09:00", dotColor: "brand",   description: "Triggered by CI/CD pipeline" },
            { label: "Build completed",     time: "09:04", dotColor: "success", description: "All 142 tests passed" },
            { label: "Health check passed", time: "09:06", dotColor: "success" },
            { label: "DNS propagation",     time: "09:08", dotColor: "warning", description: "Waiting on CDN edge nodes" },
            { label: "Error detected",      time: "09:12", dotColor: "error",   description: "Pod crash loop — restarting" },
            { label: "Alert sent",          time: "09:13", dotColor: "info" },
            { label: "Rollback initiated",  time: "09:15", dotColor: "neutral" },
          ]} />
          <div>
            <SubLabel>Compact</SubLabel>
            <Timeline compact style={{ marginTop: "var(--space-2)" }} items={[
              { label: "Filed",    time: "Mon", dotColor: "brand"   },
              { label: "Review",   time: "Tue", dotColor: "success" },
              { label: "Approved", time: "Wed", dotColor: "success" },
              { label: "Pending",  time: "Thu", dotColor: "warning" },
            ]} />
          </div>
        </Row>
      </DemoSection>

      {/* ── 28. Collapse ────────────────────────────────────────────── */}
      <DemoSection index={28} title="Collapse / Accordion" description="Default (multi-open) / Accordion (single) / Ghost (borderless).">
        <SubLabel>Default (multi-open)</SubLabel>
        <Collapse openKeys={["p1","p3"]} panels={[
          { key: "p1", header: "Getting Started", content: "Learn the basics and set up your environment in minutes." },
          { key: "p2", header: "Configuration",   content: "Explore configuration options and advanced settings." },
          { key: "p3", header: "API Reference",   content: "Full API documentation with type definitions." },
        ]} variant="default" />
        <SubLabel>Accordion (single-open)</SubLabel>
        <Collapse openKeys={["a2"]} panels={[
          { key: "a1", header: "Question 1",        content: "The answer to question 1 is displayed here." },
          { key: "a2", header: "Question 2 (open)", content: "This panel is currently open in accordion mode." },
          { key: "a3", header: "Question 3",        content: "The answer to question 3." },
        ]} variant="accordion" />
        <SubLabel>Ghost (borderless)</SubLabel>
        <Collapse openKeys={["g1"]} panels={[
          { key: "g1", header: "Borderless section (open)", content: "Ghost variant removes the card border for a lighter look." },
          { key: "g2", header: "Borderless section",        content: "Additional content here." },
        ]} variant="ghost" />
      </DemoSection>

      {/* ── 29. Typography ──────────────────────────────────────────── */}
      <DemoSection index={29} title="Typography" description="h1–h4 + display / heading / title / body / label / micro + 9 semantic colours.">
        <SubLabel>Type scale</SubLabel>
        <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-2)" }}>
          {(["h1","h2","h3","h4","display","heading","title","body","label","micro"] as TypVariant[]).map(v => (
            <div key={v} style={{ display: "flex", alignItems: "baseline", gap: "var(--space-3)" }}>
              <Typography variant="micro" color="tertiary" mono style={{ width: "var(--showcase-label-w-sm)", flexShrink: 0 }}>{v}</Typography>
              <Typography variant={v}>The quick brown fox — {v.toUpperCase()}</Typography>
            </div>
          ))}
        </div>
        <SubLabel>Semantic colours</SubLabel>
        <Row>
          {(["primary","secondary","tertiary","brand","success","error","warning","info","disabled"] as TypColor[]).map(c => (
            <Typography key={c} variant="body" color={c}>{c}</Typography>
          ))}
        </Row>
        <SubLabel>Font families</SubLabel>
        <Row>
          <Typography variant="body" color="primary">Primary — Inter (UI body)</Typography>
          <Typography variant="body" color="primary" display>Display — DM Sans (headings)</Typography>
          <Typography variant="body" color="primary" mono>Mono — Cousine (code)</Typography>
        </Row>
      </DemoSection>

      {/* ── 30. Link ────────────────────────────────────────────────── */}
      <DemoSection index={30} title="Link" description="Default / underlined / disabled.">
        <Row>
          <Link href="#">Default link</Link>
          <Link href="#" underline>Underlined link</Link>
          <Link disabled>Disabled link</Link>
        </Row>
      </DemoSection>

      {/* ── 31. Result ──────────────────────────────────────────────── */}
      <DemoSection index={31} title="Result" description="6 status variants × sm size + action button.">
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "var(--space-4)" }}>
          {(["success","error","warning","info","404","403"] as ResultStatus[]).map(s => (
            <Result key={s} status={s}
              title={
                s==="success" ? "Submitted"     : s==="error"   ? "Failed"       :
                s==="warning" ? "Review needed" : s==="info"    ? "Under review" :
                s==="404"     ? "Not Found"     : "Unauthorized"
              }
              description="Brief description of what happened."
              action={<Button variant="primary" size="sm">Take Action</Button>}
              size="sm"
            />
          ))}
        </div>
      </DemoSection>

      {/* ── 32. Descriptions ────────────────────────────────────────── */}
      <DemoSection index={32} title="Descriptions" description="Horizontal-bordered + vertical-borderless layout.">
        <SubLabel>Horizontal bordered</SubLabel>
        <Descriptions bordered items={[
          { label: "Name",   value: "John Doe" },
          { label: "Role",   value: "Admin" },
          { label: "Status", value: <BadgeLabel label="Active" variant="success" /> },
          { label: "Region", value: "us-east-1" },
        ]} />
        <SubLabel>Vertical borderless</SubLabel>
        <Descriptions layout="vertical" bordered={false} items={[
          { label: "Created",    value: "2026-01-15" },
          { label: "Last login", value: "2026-02-28" },
          { label: "Team",       value: "Platform"   },
          { label: "Plan",       value: "Enterprise" },
        ]} />
      </DemoSection>

      {/* ── 33. Upload ──────────────────────────────────────────────── */}
      <DemoSection index={33} title="Upload" description="Drag-drop zone + file list (done / uploading / error) + compact + disabled.">
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "var(--space-6)" }}>
          <div>
            <SubLabel>Default with file list</SubLabel>
            <div style={{ marginTop: "var(--space-2)" }}>
              <Upload files={[
                { name: "report.pdf",  size: "2.4 MB", status: "done"                  },
                { name: "data.csv",    size: "1.1 MB", status: "uploading", progress: 65 },
                { name: "broken.xlsx", size: "800 KB", status: "error"                  },
              ]} />
            </div>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-4)" }}>
            <div>
              <SubLabel>Compact</SubLabel>
              <div style={{ marginTop: "var(--space-2)" }}><Upload compact /></div>
            </div>
            <div>
              <SubLabel>Disabled</SubLabel>
              <div style={{ marginTop: "var(--space-2)" }}><Upload disabled /></div>
            </div>
          </div>
        </div>
      </DemoSection>

      {/* ── 34. Popover ─────────────────────────────────────────────── */}
      <DemoSection index={34} title="Popover" description="4 placements — shown statically open.">
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "var(--space-4)" }}>
          {(["bottom","right","top","left"] as TooltipPlacement[]).map(p => (
            <div key={p} style={{
              paddingTop:    p === "top"    ?  52 : undefined,
              paddingBottom: p === "bottom" ? 160 : undefined,
              paddingLeft:   p === "left"   ? 240 : undefined,
              paddingRight:  p === "right"  ? 240 : undefined,
            }}>
              <Popover placement={p} title={`${p} popover`}
                content={`Content aligned to the ${p} of the trigger.`}
                trigger={<Button variant="secondary" size="sm">{p}</Button>} />
            </div>
          ))}
        </div>
      </DemoSection>

      {/* ── 35. Popconfirm ──────────────────────────────────────────── */}
      <DemoSection index={35} title="Popconfirm" description="Top / bottom placement + confirm / cancel actions." style={{ overflow:"visible" }}>
        <Row gap="var(--space-12)">
          <div style={{ paddingTop: "var(--showcase-popover-pad)" }}>
            <Popconfirm placement="top" title="Delete this item?" description="This action cannot be undone."
              trigger={<Button variant="danger" size="sm">Delete (top)</Button>} />
          </div>
          <div style={{ paddingBottom: "var(--showcase-popover-pad)" }}>
            <Popconfirm placement="bottom" title="Archive item?" description="You can restore it later."
              trigger={<Button variant="secondary" size="sm">Archive (bottom)</Button>} />
          </div>
        </Row>
      </DemoSection>

      {/* ── 36. Label ───────────────────────────────────────────────── */}
      <DemoSection index={36} title="Label" description="5 sizes + required indicator + disabled state.">
        <Row align="baseline">
          {([10,12,14,16,20] as LabelSize[]).map(s => (
            <Label key={s} size={s}>Label {s}px</Label>
          ))}
          <Label size={14} required>Required</Label>
          <Label size={14} disabled>Disabled</Label>
        </Row>
      </DemoSection>

      {/* ── 37. Image ───────────────────────────────────────────────── */}
      <DemoSection index={37} title="Image" description="Default / rounded / circle shape + fallback placeholder.">
        <Row align="flex-end">
          <ImageAtom shape="default" width={120} height={90} />
          <ImageAtom shape="rounded" width={120} height={90} />
          <ImageAtom shape="circle"  width={80}  height={80} />
          <ImageAtom src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=200&h=150&fit=crop"
            shape="rounded" width={120} height={90} alt="Mountain" />
        </Row>
      </DemoSection>

      {/* ── 38. Watermark ────────────────────��──────────────────────── */}
      <DemoSection index={38} title="Watermark" description="3 opacity levels on a diagonal text overlay.">
        <Row>
          {[0.05, 0.10, 0.18].map(o => (
            <Watermark key={o} text="DRAFT" opacity={o} style={{
              width: "var(--resizable-default-w)", height: "var(--resizable-default-h)",
              background: "var(--bg-secondary)",
              borderRadius: "var(--radius-sm-ds)",
              border: "var(--border-width-thin) solid var(--border-default)",
              display: "flex", alignItems: "center", justifyContent: "center",
            }}>
              <Typography variant="label" color="tertiary">Opacity {o}</Typography>
            </Watermark>
          ))}
        </Row>
      </DemoSection>

      {/* ── 39. Breadcrumb ──────────────────────────────────────────── */}
      <DemoSection index={39} title="Breadcrumb" description="/ and › separators + collapsed ellipsis for deep paths.">
        <SubLabel>Separators</SubLabel>
        <Row gap="var(--space-6)">
          <Breadcrumb items={[{label:"Home"},{label:"Settings"},{label:"Profile"}]} separator="/" />
          <Breadcrumb items={[{label:"Home"},{label:"Settings"},{label:"Profile"}]} separator="›" />
        </Row>
        <SubLabel>Collapsed (5-level path)</SubLabel>
        <Breadcrumb items={[{label:"Home"},{label:"Platform"},{label:"Projects"},{label:"ICM+"},{label:"Notifications"}]} collapsed separator="/" />
      </DemoSection>

      {/* ── 40. Toggle ──────────────────────────────────────────────── */}
      <DemoSection index={40} title="Toggle" description="3 variants × pressed / unpressed + 3 sizes + disabled + icon.">
        <SubLabel>Variants × pressed state</SubLabel>
        <Row>
          {(["default","outline","ghost"] as ToggleVariant[]).map(v => (
            <span key={v} style={{ display: "contents" }}>
              <Toggle variant={v} pressed>{v} · on</Toggle>
              <Toggle variant={v}>{v} · off</Toggle>
            </span>
          ))}
        </Row>
        <SubLabel>Sizes + disabled + icon</SubLabel>
        <Row>
          <Toggle size="sm" pressed variant="outline">sm</Toggle>
          <Toggle size="md" pressed variant="outline">md</Toggle>
          <Toggle size="lg" pressed variant="outline">lg</Toggle>
          <Toggle size="md" disabled>Disabled</Toggle>
          <Toggle size="md" pressed variant="default" icon={<Icon name="star" size="sm" color="inverse" />}>Starred</Toggle>
        </Row>
      </DemoSection>

      {/* ── 41. Toggle Group ────────────────────────────────────────── */}
      <DemoSection index={41} title="Toggle Group" description="Single-select + multi-select × 3 sizes.">
        <SubLabel>Text options</SubLabel>
        <Row>
          <ToggleGroup value="b"         options={[{value:"b",label:"Bold"},{value:"i",label:"Italic"},{value:"u",label:"Underline"}]} />
          <ToggleGroup value={["b","u"]} options={[{value:"b",label:"B"},{value:"i",label:"I"},{value:"u",label:"U"},{value:"s",label:"S"}]} />
        </Row>
        <SubLabel>Sizes</SubLabel>
        <Row>
          <ToggleGroup size="sm" value="day"  options={[{value:"day",label:"Day"},{value:"week",label:"Week"},{value:"month",label:"Month"}]} />
          <ToggleGroup size="md" value="grid" options={[{value:"grid",label:"Grid"},{value:"list",label:"List"}]} />
          <ToggleGroup size="lg" value="dark" options={[{value:"light",label:"Light"},{value:"dark",label:"Dark"}]} />
        </Row>
      </DemoSection>

      {/* ── 48. Scroll Area ─────────────��───────────────────────────── */}
      <DemoSection index={48} title="Scroll Area" description="Vertical + horizontal scroll — custom styled thumb.">
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "var(--space-6)" }}>
          <div>
            <SubLabel>Vertical</SubLabel>
            <ScrollArea height={160} style={{ marginTop: "var(--space-2)" }}>
              {Array.from({ length: 12 }, (_, i) => (
                <div key={i} style={{ padding: "var(--space-2) var(--space-3)", borderBottom: "var(--border-width-thin) solid var(--border-divider)" }}>
                  <Typography variant="body" color="primary">Item {i + 1}</Typography>
                  <Typography variant="micro" color="tertiary">Row description</Typography>
                </div>
              ))}
            </ScrollArea>
          </div>
          <div>
            <SubLabel>Horizontal</SubLabel>
            <ScrollArea height={72} horizontal style={{ marginTop: "var(--space-2)" }}>
              <div style={{ display: "flex", gap: "var(--space-3)", padding: "var(--space-3)", minWidth: "var(--showcase-container-min-w)" }}>
                {["Alpha","Beta","Gamma","Delta","Epsilon","Zeta"].map(n => (
                  <div key={n} style={{ flexShrink: 0, padding: "var(--space-2) var(--space-3)", background: "var(--bg-secondary)", borderRadius: "var(--radius-sm-ds)", border: "var(--border-width-thin) solid var(--border-default)" }}>
                    <Typography variant="label" color="primary">{n}</Typography>
                  </div>
                ))}
              </div>
            </ScrollArea>
          </div>
        </div>
      </DemoSection>

      {/* ── 49. Resizable ───────────────────────────────────────────── */}
      <DemoSection index={49} title="Resizable" description="Horizontal split + vertical split — drag handle shown.">
        <SubLabel>Horizontal</SubLabel>
        <Resizable direction="horizontal" style={{ height: "var(--resizable-demo-h-sm)" }}
          firstContent={
            <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-1)" }}>
              <Typography variant="label" weight="semibold" color="secondary">Sidebar</Typography>
              {["Nav A","Nav B","Nav C"].map(n => <Typography key={n} variant="label" color="tertiary">{n}</Typography>)}
            </div>
          }
          secondContent={<Typography variant="body" color="secondary">Drag the handle ← → to resize</Typography>}
        />
        <SubLabel>Vertical</SubLabel>
        <Resizable direction="vertical" style={{ height: "var(--resizable-demo-h-md)", maxWidth: "var(--showcase-max-w-md)" }}
          firstContent={<Typography variant="label" color="secondary">Top pane — drag ↕ to resize</Typography>}
          secondContent={<Typography variant="label" color="secondary">Bottom pane</Typography>}
        />
      </DemoSection>

      {/* ── 50. Hover Card ──────────────────────────────────────────── */}
      <DemoSection index={50} title="Hover Card" description="User profile popup — shown statically open.">
        <div style={{ paddingTop: "var(--space-2)" }}>
          <HoverCard placement="bottom" trigger={<Button variant="ghost" size="sm">@sarah_chen</Button>}>
            <div style={{ display: "flex", gap: "var(--space-3)", alignItems: "flex-start" }}>
              <Avatar size="lg" shape="circle" label="SC" />
              <div style={{ flex: 1 }}>
                <Typography variant="body" weight="semibold" color="primary">Sarah Chen</Typography>
                <Typography variant="label" color="secondary">Staff Engineer · Platform</Typography>
                <Typography variant="label" color="tertiary" style={{ marginTop: "var(--space-2)" }}>Building ML infrastructure. Based in SF.</Typography>
                <div style={{ display: "flex", gap: "var(--space-4)", marginTop: "var(--space-3)" }}>
                  {[["142","Following"],["1.2K","Followers"]].map(([v, l]) => (
                    <div key={l}>
                      <Typography variant="body" weight="bold" color="primary">{v}</Typography>
                      <Typography variant="micro" color="tertiary">{l}</Typography>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </HoverCard>
        </div>
      </DemoSection>

      {/* ── 51. Aspect Ratio ────────────────────────────────────────── */}
      <DemoSection index={51} title="Aspect Ratio" description="16:9, 4:3, 1:1, 21:9 — each with image placeholder.">
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "var(--space-4)" }}>
          {(["16/9","4/3","1/1","21/9"] as AspectRatioValue[]).map(r => (
            <div key={r}>
              <Typography variant="micro" color="tertiary" style={{ marginBottom: "var(--space-1)" }}>{r}</Typography>
              <AspectRatio ratio={r}><Icon name="image" size="lg" color="tertiary" /></AspectRatio>
            </div>
          ))}
        </div>
      </DemoSection>

      {/* ── 52. Input OTP ───────────────────────────────────────────── */}
      <DemoSection index={52} title="Input OTP" description="3 sizes × 5 states + separator variant.">
        <SubLabel>Sizes</SubLabel>
        <Row gap="var(--space-6)">
          <InputOTP length={6} size="sm" />
          <InputOTP length={6} size="md" />
          <InputOTP length={6} size="lg" />
        </Row>
        <SubLabel>States</SubLabel>
        <div style={{ display: "flex", flexWrap: "wrap" as const, gap: "var(--space-4)" }}>
          {([
            { label: "Empty",    value: undefined, error: false, disabled: false },
            { label: "Partial",  value: "384",     error: false, disabled: false },
            { label: "Complete", value: "384921",  error: false, disabled: false },
            { label: "Error",    value: "384921",  error: true,  disabled: false },
            { label: "Disabled", value: "384921",  error: false, disabled: true  },
          ]).map(({ label, value, error, disabled }) => (
            <div key={label} style={{ display: "flex", flexDirection: "column", gap: "var(--space-1)" }}>
              <Typography variant="micro" color="tertiary">{label}</Typography>
              <InputOTP length={6} value={value} error={error} disabled={disabled} />
            </div>
          ))}
        </div>
        <SubLabel>With separator</SubLabel>
        <InputOTP length={6} value="384" separator />
      </DemoSection>

      {/* ── 53. Sonner / Toast ───────���──────────────────────────────── */}
      <DemoSection index={53} title="Sonner / Toast" description="5 variants — success, error, warning, info, loading.">
        <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-3)" }}>
          <SonnerToast variant="success" title="Deployment succeeded."    description="All 12 services are healthy and passing health checks." />
          <SonnerToast variant="error"   title="Deployment failed."       description="Pod crash loop detected in us-east-1." action="View logs" />
          <SonnerToast variant="warning" title="Disk usage at 87%."       description="Consider archiving old model snapshots." />
          <SonnerToast variant="info"    title="Maintenance scheduled."   description="Downtime: Sun 02:00–04:00 UTC." />
          <SonnerToast variant="loading" title="Uploading model weights…" progress={62} />
        </div>
      </DemoSection>

      {/* ── 55. Calendar ────────────────────────────────────────────── */}
      <DemoSection index={55} title="Calendar" description="Single date selection + range selection + disabled dates.">
        <Row align="flex-start" gap="var(--space-8)">
          <div>
            <SubLabel>Single (15th selected)</SubLabel>
            <div style={{ marginTop: "var(--space-2)" }}>
              <Calendar selectedDate={15} year={2026} month={1} />
            </div>
          </div>
          <div>
            <SubLabel>Range (10–20) + disabled dates</SubLabel>
            <div style={{ marginTop: "var(--space-2)" }}>
              <Calendar selectedDate={10} selectedEnd={20} disabledDates={[1,2,3,28]} year={2026} month={1} />
            </div>
          </div>
        </Row>
      </DemoSection>

      {/* ── 56. Table Cell ──────────────────────────────────────────── */}
      <DemoSection index={56} title="Table Cell" description="8 cell variants — text / badge / avatar-text / link / number / progress / tag-list / actions × 3 sizes." builtFrom={["Typography","Badge","Avatar","Tag","ProgressBar","Icon"]}>
        <SubLabel>Cell type gallery — md size</SubLabel>
        <div style={{ border:`var(--border-width-thin) solid var(--table-border)`, borderRadius:"var(--radius-md-ds)", overflow:"hidden" }}>
          {/* Header row */}
          <div style={{ display:"grid", gridTemplateColumns:"var(--table-col-w-sm) 1fr 1fr 1fr var(--table-col-w-2xs) var(--table-col-w-md) var(--table-col-w-ms) var(--table-col-w-sm)", background:"var(--table-header-bg)", borderBottom:`var(--border-width-thin) solid var(--table-header-border)`, height:"var(--table-header-height)", alignItems:"center" }}>
            {["Type","Text","Avatar + Text","Badge","Number","Progress","Tags","Actions"].map(h => (
              <div key={h} style={{ padding:"0 var(--table-cell-padding-inline-md)" }}>
                <Typography variant="label" weight="semibold" color="secondary">{h}</Typography>
              </div>
            ))}
          </div>
          {/* Data row */}
          <div style={{ display:"grid", gridTemplateColumns:"var(--table-col-w-sm) 1fr 1fr 1fr var(--table-col-w-2xs) var(--table-col-w-md) var(--table-col-w-ms) var(--table-col-w-sm)" }}>
            <div style={{ padding:"var(--table-cell-padding-block-md) var(--table-cell-padding-inline-md)", display:"flex", alignItems:"center" }}>
              <Typography variant="micro" color="tertiary" style={{ fontFamily:"var(--font-family-mono)" }}>md · default</Typography>
            </div>
            <TableCell type="text"        primary="Platform service"                          />
            <TableCell type="avatar-text" primary="Sarah Chen" secondary="Staff Eng"  avatarLabel="SC" />
            <TableCell type="badge"       primary="Healthy"    variant="success"               />
            <TableCell type="number"      value={12_847}                                       />
            <TableCell type="progress"    progress={73}                                        />
            <TableCell type="tag-list"    tags={["api","prod","v3"]}                           />
            <TableCell type="actions"                                                           />
          </div>
          <div style={{ display:"grid", gridTemplateColumns:"var(--table-col-w-sm) 1fr 1fr 1fr var(--table-col-w-2xs) var(--table-col-w-md) var(--table-col-w-ms) var(--table-col-w-sm)", borderTop:`var(--border-width-thin) solid var(--table-row-border)` }}>
            <div style={{ padding:"var(--table-cell-padding-block-md) var(--table-cell-padding-inline-md)", display:"flex", alignItems:"center" }}>
              <Typography variant="micro" color="tertiary" style={{ fontFamily:"var(--font-family-mono)" }}>md · hover</Typography>
            </div>
            <TableCell type="link"        primary="View details"                              style={{ background:"var(--table-row-bg-hover)" }} />
            <TableCell type="avatar-text" primary="Kai Nakamura" secondary="Principal" avatarLabel="KN" style={{ background:"var(--table-row-bg-hover)" }} />
            <TableCell type="badge"       primary="Warning" variant="warning"                 style={{ background:"var(--table-row-bg-hover)" }} />
            <TableCell type="number"      value={4_291}                                       style={{ background:"var(--table-row-bg-hover)" }} />
            <TableCell type="progress"    progress={38}                                       style={{ background:"var(--table-row-bg-hover)" }} />
            <TableCell type="tag-list"    tags={["ml","gpu"]}                                 style={{ background:"var(--table-row-bg-hover)" }} />
            <TableCell type="actions"                                                          style={{ background:"var(--table-row-bg-hover)" }} />
          </div>
        </div>
        <SubLabel>Sizes</SubLabel>
        <Row align="flex-start">
          {(["sm","md","lg"] as Size[]).map(s => (
            <div key={s} style={{ flex:1, border:`var(--border-width-thin) solid var(--table-border)`, borderRadius:"var(--radius-sm-ds)", overflow:"hidden" }}>
              <div style={{ padding:"var(--space-2) var(--space-3)", background:"var(--table-header-bg)", borderBottom:`var(--border-width-thin) solid var(--table-header-border)` }}>
                <Typography variant="micro" weight="semibold" color="secondary">{s.toUpperCase()}</Typography>
              </div>
              <TableCell type="text"  primary={`${s} · Primary text`} size={s} />
              <TableCell type="badge" primary="Active" variant="success" size={s} />
              <TableCell type="actions" size={s} />
            </div>
          ))}
        </Row>
      </DemoSection>

      {/* ── 57. Dot Grid ────────────────────────────────────────────── */}
      <DemoSection index={57} title="Dot Grid" description="Data-density visualisation — fill % + variants + custom cell map." builtFrom={["Typography"]}>
        <SubLabel>Fill percentage × 4 colour variants</SubLabel>
        <div style={{ display:"grid", gridTemplateColumns:"repeat(2,1fr)", gap:"var(--space-6)" }}>
          {([
            { label:"Brand · 60%",   variant:"brand"   as DotVariant, filled:60 },
            { label:"Success · 85%", variant:"success" as DotVariant, filled:85 },
            { label:"Warning · 40%", variant:"warning" as DotVariant, filled:40 },
            { label:"Error · 25%",   variant:"error"   as DotVariant, filled:25 },
          ]).map(({ label, variant, filled }) => (
            <div key={variant}>
              <SubLabel>{label}</SubLabel>
              <DotGrid rows={4} cols={16} dotSize={8} gap={4} variant={variant} filled={filled} />
            </div>
          ))}
        </div>
        <SubLabel>Custom cell map — mixed variants (usage heatmap)</SubLabel>
        <DotGrid
          rows={5} cols={20} dotSize={10} gap={5}
          cells={Array.from({length:5},(_,r)=>Array.from({length:20},(_,c)=>{
            const v=Math.sin(r*0.8+c*0.4)*50+50;
            return { value:v, variant: (v>75?"error":v>55?"warning":v>35?"brand":"success") as DotVariant };
          }))}
        />
        <SubLabel>Compact dot ruler (1-row progress indicator)</SubLabel>
        <DotGrid rows={1} cols={24} dotSize={6} gap={3} variant="brand" filled={58} />
      </DemoSection>

      {/* ── 58. Combo Input ─────────────────────────────────────────── */}
      <DemoSection index={58} title="Combo Input" description="Select prefix + text input — unified border + 3 sizes × 4 states." builtFrom={["TextInput","Select","Icon"]}>
        <SubLabel>Sizes</SubLabel>
        <SizeStrip
          align="flex-start"
          sm={<ComboInput size="sm" style={{ width:"100%" }} selectOptions={[{label:"https://",value:"https"},{label:"http://",value:"http"}]} />}
          md={<ComboInput size="md" style={{ width:"100%" }} selectOptions={[{label:"https://",value:"https"},{label:"http://",value:"http"}]} inputValue="example.com" />}
          lg={<ComboInput size="lg" style={{ width:"100%" }} selectOptions={[{label:"https://",value:"https"},{label:"http://",value:"http"}]} />}
        />
        <SubLabel>States</SubLabel>
        <ColGrid cols={4}>
          <ComboInput placeholder="/api/v1/..." selectOptions={[{label:"GET",value:"get"},{label:"POST",value:"post"},{label:"PUT",value:"put"},{label:"DEL",value:"del"}]} inputValue="" />
          <ComboInput placeholder="Has value" selectOptions={[{label:"+1",value:"us"},{label:"+44",value:"uk"},{label:"+49",value:"de"}]} inputValue="555-0123" />
          <ComboInput error               selectOptions={[{label:"USD",value:"usd"},{label:"EUR",value:"eur"},{label:"GBP",value:"gbp"}]} inputValue="invalid" />
          <ComboInput disabled            selectOptions={[{label:"https://",value:"https"}]} inputValue="disabled.com" />
        </ColGrid>
        <SubLabel>Use cases</SubLabel>
        <Row wrap={false} gap="var(--space-4)">
          <ComboInput style={{ flex:1 }} selectOptions={[{label:"Search in:",value:"all"},{label:"Title",value:"title"},{label:"Content",value:"content"}]} placeholder="Search term…" />
          <ComboInput style={{ flex:1 }} selectOptions={[{label:"from:",value:"from"},{label:"to:",value:"to"},{label:"cc:",value:"cc"}]} placeholder="email@example.com" />
        </Row>
      </DemoSection>

      {/* ── 59. GpuVendorIcon ─────────────────────────────────────── */}
      <DemoSection index={59} title="GPU Vendor Icon" tier="T1 · Atom"
        description="Renders the NVIDIA or AMD vendor SVG mark at a configurable size. Used inside GpuModelTag.">
        <Row>
          {(["nvidia","amd"] as GpuVendor[]).map(v => (
            <div key={v} style={{ display:"flex", flexDirection:"column", alignItems:"center", gap:"var(--space-2)" }}>
              {[16,20,24,32].map(s => <GpuVendorIcon key={s} vendor={v} size={s} />)}
              <Typography variant="micro" color="tertiary" mono>{v.toUpperCase()}</Typography>
            </div>
          ))}
        </Row>
      </DemoSection>

      {/* ── 60. AcceleratorBlock ─────────────────────────────────── */}
      <DemoSection index={60} title="Accelerator Block" tier="T1 · Atom"
        description="Single 16 × 16 GPU utilisation tile. Four fill states: used / allocated / half / empty.">
        <Row>
          {(["used","allocated","half","empty"] as AcceleratorFill[]).map(f => (
            <div key={f} style={{ display:"flex", flexDirection:"column", alignItems:"center", gap:"var(--space-2)" }}>
              <AcceleratorBlock fill={f} size={16} />
              <Typography variant="micro" color="tertiary">{f}</Typography>
            </div>
          ))}
        </Row>
        <SubLabel>16-block grid sample (mixed states)</SubLabel>
        <Row wrap>
          {(["used","used","used","used","used","allocated","allocated","allocated","half","half","empty","empty","empty","empty","empty","empty"] as AcceleratorFill[]).map((f,i) => (
            <AcceleratorBlock key={i} fill={f} size={16} />
          ))}
        </Row>
      </DemoSection>

      {/* ── 61. CompactValueStepper ──────────────────────────────── */}
      <DemoSection index={61} title="Compact Value Stepper" tier="T1 · Atom"
        description="Inline − / value / + control with optional warn colour when value exceeds max.">
        <Row>
          <CompactValueStepper value={12} max={20} />
          <CompactValueStepper value={22} max={20} warn />
          <CompactValueStepper value={0}  max={7} />
        </Row>
      </DemoSection>

      {/* ── 62. NumberSpinner ─────────────��──────────────────────── */}
      <DemoSection index={62} title="Number Spinner" tier="T1 · Atom"
        description="Text input with up / down caret buttons. Used in Storage Quotas panel.">
        <Row>
          <NumberSpinner value={100} max={500} />
          <NumberSpinner value={50}  max={200} width={80} />
          <NumberSpinner value={0}   max={999} width={64} />
        </Row>
      </DemoSection>

      {/* ── 63. Dual Range Slider ────────────────────────────────── */}
      <DemoSection index={63} title="Dual Range Slider" tier="T1 · Atom"
        description="Slider with teal primary fill and optional warning secondary fill. Supports tick marks.">
        <div style={{ display:"flex", flexDirection:"column", gap:"var(--space-6)", paddingTop:"var(--space-2)" }}>
          <div>
            <SubLabel>Primary only (50 / 200)</SubLabel>
            <DualRangeSlider value={50} max={200} />
          </div>
          <div>
            <SubLabel>With secondary fill and marks (quota vs used)</SubLabel>
            <DualRangeSlider value={100} secondary={40} max={200}
              marks={[{ value:60, label:"60", info:true },{ value:70, label:"70", info:true }]} />
          </div>
        </div>
      </DemoSection>

      {/* ── 64. Usage Bar ────────────────────────────────────── */}
      <DemoSection index={64} title="Usage Bar"
        description="Segmented capacity bar with used / allocated layers and labels. Uses table-viz tokens.">
        <div style={{ display:"flex", flexDirection:"column", gap:"var(--space-4)", maxWidth:"280px" }}>
          <div>
            <SubLabel>10 / 50 TB of 100 TB</SubLabel>
            <UsageBar used={10} allocated={50} total={100} />
          </div>
          <div>
            <SubLabel>75 / 80 GiB of 100 GiB (near full)</SubLabel>
            <UsageBar used={75} allocated={80} total={100} unit="GiB" />
          </div>
          <div>
            <SubLabel>0 / 0 TB of 500 TB (empty)</SubLabel>
            <UsageBar used={0} allocated={0} total={500} />
          </div>
        </div>
      </DemoSection>

    </div>
  );
}
