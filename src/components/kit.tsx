import React from "react"

/* ------------------------------------------------------------------ */
/* Icons — minimal stroke set, 24px grid                              */
/* ------------------------------------------------------------------ */
type IconProps = { size?: number; className?: string; strokeWidth?: number }
const I = (path: React.ReactNode) =>
  function Icon({ size = 22, className = "", strokeWidth = 1.8 }: IconProps) {
    return (
      <svg
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
        className={className}
      >
        {path}
      </svg>
    )
  }

export const Icons = {
  scan: I(
    <>
      <path d="M4 8V6a2 2 0 0 1 2-2h2M16 4h2a2 2 0 0 1 2 2v2M20 16v2a2 2 0 0 1-2 2h-2M8 20H6a2 2 0 0 1-2-2v-2" />
      <path d="M4 12h16" />
    </>,
  ),
  box: I(
    <>
      <path d="M21 8 12 3 3 8v8l9 5 9-5V8Z" />
      <path d="M3 8l9 5 9-5M12 13v8" />
    </>,
  ),
  truck: I(
    <>
      <path d="M3 6h11v9H3zM14 9h4l3 3v3h-7z" />
      <circle cx="7" cy="18" r="1.6" />
      <circle cx="17.5" cy="18" r="1.6" />
    </>,
  ),
  pin: I(
    <>
      <path d="M12 21s7-5.7 7-11a7 7 0 1 0-14 0c0 5.3 7 11 7 11Z" />
      <circle cx="12" cy="10" r="2.4" />
    </>,
  ),
  camera: I(
    <>
      <path d="M4 8h3l1.5-2h7L17 8h3v11H4z" />
      <circle cx="12" cy="13" r="3.2" />
    </>,
  ),
  bluetooth: I(<path d="m7 7 10 10-5 4V3l5 4L7 17" />),
  wifi: I(
    <>
      <path d="M2 9c6-5 14-5 20 0M5 12.5c4-3.2 10-3.2 14 0M8.5 16c2-1.6 5-1.6 7 0" />
      <circle cx="12" cy="19" r="1" />
    </>,
  ),
  wifiOff: I(
    <>
      <path d="M2 9c2-1.6 4.3-2.7 6.6-3.3M15 6.2c2 .6 4 1.7 5.5 2.8M8.5 16c2-1.6 5-1.6 7 0" />
      <path d="m3 3 18 18" />
    </>,
  ),
  upload: I(
    <>
      <path d="M12 15V4M8 8l4-4 4 4" />
      <path d="M4 15v3a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-3" />
    </>,
  ),
  print: I(
    <>
      <path d="M7 8V3h10v5M7 18H5a2 2 0 0 1-2-2v-4a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v4a2 2 0 0 1-2 2h-2" />
      <path d="M7 14h10v6H7z" />
    </>,
  ),
  user: I(
    <>
      <circle cx="12" cy="8" r="3.4" />
      <path d="M5 20c1-3.5 4-5 7-5s6 1.5 7 5" />
    </>,
  ),
  tools: I(
    <path d="M14.5 6.5a3.5 3.5 0 0 0-4.8 4.3L4 16.5 7.5 20l5.7-5.7a3.5 3.5 0 0 0 4.3-4.8l-2.3 2.3-2-2 2.3-2.3Z" />,
  ),
  clipboard: I(
    <>
      <path d="M9 4h6v3H9zM7 5H5v15h14V5h-2" />
      <path d="M9 12h6M9 16h4" />
    </>,
  ),
  search: I(
    <>
      <circle cx="11" cy="11" r="6.5" />
      <path d="m20 20-3.5-3.5" />
    </>,
  ),
  check: I(<path d="m5 12 4.5 4.5L19 7" />),
  x: I(<path d="M6 6l12 12M18 6 6 18" />),
  warn: I(
    <>
      <path d="M12 3 2.5 20h19L12 3Z" />
      <path d="M12 10v4M12 17.5v.2" />
    </>,
  ),
  chevron: I(<path d="m9 6 6 6-6 6" />),
  chevronDown: I(<path d="m6 9 6 6 6-6" />),
  plus: I(<path d="M12 5v14M5 12h14" />),
  lock: I(
    <>
      <path d="M6 11h12v9H6z" />
      <path d="M8.5 11V8a3.5 3.5 0 0 1 7 0v3" />
    </>,
  ),
  scale: I(
    <>
      <path d="M12 3v18M5 21h14M6 7h12" />
      <path d="M6 7 3 13h6L6 7ZM18 7l-3 6h6l-3-6Z" />
    </>,
  ),
  chart: I(
    <>
      <path d="M4 20V4M4 20h16" />
      <path d="M8 16v-4M12 16V8M16 16v-6" />
    </>,
  ),
  fuel: I(
    <>
      <path d="M5 21V5a2 2 0 0 1 2-2h5a2 2 0 0 1 2 2v16M4 21h11" />
      <path d="M14 8h2.5L18 9.5V16a1.5 1.5 0 0 0 3 0V9l-2.5-2.5" />
    </>,
  ),
  bell: I(
    <>
      <path d="M6 9a6 6 0 0 1 12 0c0 5 2 6 2 6H4s2-1 2-6Z" />
      <path d="M10 19a2 2 0 0 0 4 0" />
    </>,
  ),
  refresh: I(
    <>
      <path d="M20 11a8 8 0 0 0-14-4L4 9M4 4v5h5" />
      <path d="M4 13a8 8 0 0 0 14 4l2-2M20 20v-5h-5" />
    </>,
  ),
  file: I(
    <>
      <path d="M13 3H6v18h12V8l-5-5Z" />
      <path d="M13 3v5h5" />
    </>,
  ),
  layers: I(
    <>
      <path d="m12 3 9 5-9 5-9-5 9-5Z" />
      <path d="m3 13 9 5 9-5" />
    </>,
  ),
  sign: I(
    <>
      <path d="M3 17c3 0 3-6 6-6s3 6 6 6 3-3 6-3" />
      <path d="M3 21h18" />
    </>,
  ),
}

export type IconKey = keyof typeof Icons

/* ------------------------------------------------------------------ */
/* Navigation — in-app router context                                 */
/* ------------------------------------------------------------------ */
export type ResultMeta = {
  title?: string
  sub?: string
  rows?: { k: string; v: string }[]
  note?: string
}
export const NavCtx = React.createContext<{
  go: (r: string, meta?: ResultMeta) => void
  back: () => void
  meta?: ResultMeta
}>({
  go: () => {},
  back: () => {},
})
export const useNav = () => React.useContext(NavCtx)

/* ------------------------------------------------------------------ */
/* Phone shell — the running app fills the viewport                   */
/* ------------------------------------------------------------------ */
export function Device({
  children,
  battery = 82,
  time = "09:41",
  statusTone = "brand",
}: {
  title?: string
  children: React.ReactNode
  battery?: number
  time?: string
  statusTone?: "brand" | "white"
}) {
  const brand = statusTone === "brand"
  return (
    <div className="mx-auto flex h-[100dvh] max-h-[812px] w-full max-w-[390px] flex-col overflow-hidden bg-page shadow-[0_0_60px_-20px_rgba(30,20,40,.5)] sm:rounded-[28px]">
      {/* status bar */}
      <div
        className={
          "flex items-center justify-between px-5 pt-2.5 pb-1 text-[12px] font-medium tnum " +
          (brand ? "bg-brand text-white/90" : "bg-white text-ink-2")
        }
      >
        <span>{time}</span>
        <div className="flex items-center gap-1.5">
          <Icons.wifi size={14} strokeWidth={2} />
          <span>{battery}%</span>
          <div
            className={
              "relative h-[11px] w-[20px] rounded-[3px] border " +
              (brand ? "border-white/70" : "border-ink-3")
            }
          >
            <div
              className={"absolute inset-[1.5px] rounded-[1px] " + (brand ? "bg-white/90" : "bg-ink-2")}
              style={{ width: `calc(${battery}% - 3px)` }}
            />
          </div>
        </div>
      </div>
      <div className="pda-scroll flex min-h-0 flex-1 flex-col overflow-y-auto">{children}</div>
    </div>
  )
}

/* App bar inside a device */
export function AppBar({
  title,
  sub,
  back = true,
  right,
  tone = "brand",
}: {
  title: string
  sub?: string
  back?: boolean
  right?: React.ReactNode
  tone?: "brand" | "white"
}) {
  const brand = tone === "brand"
  const nav = useNav()
  return (
    <div
      className={
        "sticky top-0 z-10 flex items-center gap-2 px-4 py-3 " +
        (brand ? "bg-brand text-white" : "border-b border-line bg-white text-ink")
      }
    >
      {back && (
        <button onClick={nav.back} className="-ml-1 p-1 active:opacity-60">
          <Icons.chevron
            size={22}
            className={"rotate-180 " + (brand ? "text-white/90" : "text-ink-2")}
          />
        </button>
      )}
      <div className="min-w-0 flex-1">
        <div className="truncate text-[17px] font-bold leading-tight">{title}</div>
        {sub && (
          <div className={"truncate text-[12px] " + (brand ? "text-white/70" : "text-ink-3")}>
            {sub}
          </div>
        )}
      </div>
      {right}
    </div>
  )
}

/* ------------------------------------------------------------------ */
/* Status tag — never color-only (icon + text)                        */
/* ------------------------------------------------------------------ */
const toneMap = {
  ok: ["bg-ok-tint", "text-ok", Icons.check],
  warn: ["bg-warn-tint", "text-warn", Icons.warn],
  danger: ["bg-danger-tint", "text-danger", Icons.x],
  info: ["bg-info-tint", "text-info", Icons.clipboard],
  brand: ["bg-brand-tint", "text-brand", Icons.box],
  muted: ["bg-[#f0f0f2]", "text-ink-2", Icons.clipboard],
} as const
export type Tone = keyof typeof toneMap

export function Tag({
  children,
  tone = "muted",
  icon = true,
}: {
  children: React.ReactNode
  tone?: Tone
  icon?: boolean
}) {
  const [bg, fg, Ic] = toneMap[tone]
  return (
    <span
      className={`inline-flex items-center gap-1 rounded-md px-2 py-0.5 text-[12px] font-medium ${bg} ${fg}`}
    >
      {icon && <Ic size={13} strokeWidth={2.2} />}
      {children}
    </span>
  )
}

/* Card */
export function Card({
  children,
  className = "",
  pad = true,
  onClick,
}: {
  children: React.ReactNode
  className?: string
  pad?: boolean
  onClick?: () => void
}) {
  return (
    <div
      onClick={onClick}
      className={
        "rounded-2xl border border-line bg-white shadow-[0_1px_2px_rgba(30,20,40,.04)] " +
        (pad ? "p-4 " : "") +
        className
      }
    >
      {children}
    </div>
  )
}

/* Section body wrapper */
export function Body({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return <div className={"space-y-3 p-4 " + className}>{children}</div>
}

/* Field label + value row */
export function KV({ k, v, strong }: { k: string; v: React.ReactNode; strong?: boolean }) {
  return (
    <div className="flex items-baseline justify-between gap-3 py-1">
      <span className="text-[13px] text-ink-3">{k}</span>
      <span
        className={
          "text-right text-[14px] " + (strong ? "font-bold text-ink" : "text-ink-2")
        }
      >
        {v}
      </span>
    </div>
  )
}

/* Count bar — big scan tallies */
export function CountBar({
  items,
}: {
  items: { label: string; value: React.ReactNode; tone?: "ink" | "ok" | "warn" | "danger" }[]
}) {
  const c = { ink: "text-ink", ok: "text-ok", warn: "text-warn", danger: "text-danger" }
  return (
    <div className="flex divide-x divide-line rounded-2xl border border-line bg-white">
      {items.map((it, i) => (
        <div key={i} className="flex-1 px-2 py-3 text-center">
          <div className={`font-mono text-[26px] font-medium leading-none tnum ${c[it.tone ?? "ink"]}`}>
            {it.value}
          </div>
          <div className="mt-1.5 text-[12px] text-ink-3">{it.label}</div>
        </div>
      ))}
    </div>
  )
}

/* Scan input zone */
export function ScanZone({
  placeholder = "扫描或输入运单号",
  hint,
  state,
}: {
  placeholder?: string
  hint?: string
  state?: { tone: Tone; text: string; code?: string }
}) {
  return (
    <div className="space-y-2">
      <div className="flex items-center gap-2 rounded-xl border-2 border-dashed border-brand-soft bg-brand-tint px-3 py-3">
        <Icons.scan size={24} className="text-brand" />
        <input
          disabled
          placeholder={placeholder}
          className="flex-1 bg-transparent font-mono text-[15px] text-ink placeholder:text-ink-3/70 outline-none"
        />
        <span className="rounded-md bg-brand px-2.5 py-1 text-[12px] font-medium text-white">
          手动
        </span>
      </div>
      {hint && <div className="text-[12px] text-ink-3">{hint}</div>}
      {state && (
        <div
          className={`flex items-center gap-2 rounded-xl px-3 py-2.5 ${toneMap[state.tone][0]}`}
        >
          {React.createElement(toneMap[state.tone][2], {
            size: 18,
            className: toneMap[state.tone][1],
            strokeWidth: 2.4,
          })}
          <span className={`text-[14px] font-medium ${toneMap[state.tone][1]}`}>{state.text}</span>
          {state.code && (
            <span className="ml-auto font-mono text-[13px] text-ink-2">{state.code}</span>
          )}
        </div>
      )}
    </div>
  )
}

/* Bottom primary action bar (thumb reach) */
export function BottomBar({ children }: { children: React.ReactNode }) {
  return (
    <div className="sticky bottom-0 border-t border-line bg-white/95 p-3 backdrop-blur">
      <div className="flex gap-2.5">{children}</div>
    </div>
  )
}

export function Btn({
  children,
  variant = "primary",
  icon,
  className = "",
  to,
  meta,
  onClick,
}: {
  children: React.ReactNode
  variant?: "primary" | "ghost" | "danger" | "ok" | "outline"
  icon?: IconKey
  className?: string
  to?: string
  meta?: ResultMeta
  onClick?: () => void
}) {
  const styles = {
    primary: "bg-brand text-white",
    ok: "bg-ok text-white",
    danger: "bg-danger text-white",
    ghost: "bg-brand-tint text-brand",
    outline: "border border-line bg-white text-ink-2",
  }
  const Ic = icon ? Icons[icon] : null
  const nav = useNav()
  return (
    <button
      onClick={onClick ?? (to ? () => nav.go(to, meta) : undefined)}
      className={`flex min-h-[48px] flex-1 items-center justify-center gap-2 rounded-xl px-4 text-[16px] font-bold ${styles[variant]} ${className}`}
    >
      {Ic && <Ic size={20} strokeWidth={2.2} />}
      {children}
    </button>
  )
}

/* List row */
export function Row({
  icon,
  title,
  sub,
  right,
  badge,
  tone = "brand",
  to,
}: {
  icon?: IconKey
  title: React.ReactNode
  sub?: React.ReactNode
  right?: React.ReactNode
  badge?: number
  tone?: Tone
  to?: string
}) {
  const Ic = icon ? Icons[icon] : null
  const nav = useNav()
  return (
    <div
      onClick={() => to && nav.go(to)}
      className={
        "flex items-center gap-3 border-b border-line px-1 py-3 last:border-0 " +
        (to ? "active:bg-brand-tint/50" : "")
      }
    >
      {Ic && (
        <div className={`relative grid h-10 w-10 place-items-center rounded-xl ${toneMap[tone][0]}`}>
          <Ic size={20} className={toneMap[tone][1]} />
          {badge ? (
            <span className="absolute -right-1 -top-1 grid h-[18px] min-w-[18px] place-items-center rounded-full bg-danger px-1 text-[11px] font-bold text-white tnum">
              {badge}
            </span>
          ) : null}
        </div>
      )}
      <div className="min-w-0 flex-1">
        <div className="truncate text-[15px] font-medium text-ink">{title}</div>
        {sub && <div className="truncate text-[12px] text-ink-3">{sub}</div>}
      </div>
      {right ?? <Icons.chevron size={18} className="text-ink-3" />}
    </div>
  )
}

/* Grid entry (home 3-col) */
export function Entry({ icon, label, badge, tone = "brand", to }: { icon: IconKey; label: string; badge?: number; tone?: Tone; to?: string }) {
  const Ic = Icons[icon]
  const nav = useNav()
  return (
    <button
      onClick={() => to && nav.go(to)}
      className="relative flex flex-col items-center gap-1.5 rounded-xl py-2.5 active:bg-brand-tint"
    >
      <div className={`grid h-12 w-12 place-items-center rounded-2xl ${toneMap[tone][0]}`}>
        <Ic size={24} className={toneMap[tone][1]} />
      </div>
      <span className="text-[12.5px] text-ink-2">{label}</span>
      {badge ? (
        <span className="absolute right-3 top-1.5 grid h-[18px] min-w-[18px] place-items-center rounded-full bg-danger px-1 text-[11px] font-bold text-white tnum">
          {badge}
        </span>
      ) : null}
    </button>
  )
}

/* Segmented tabs */
export function Segments({ items, active = 0 }: { items: string[]; active?: number }) {
  return (
    <div className="flex gap-1 rounded-xl bg-[#ececef] p-1">
      {items.map((it, i) => (
        <div
          key={i}
          className={
            "flex-1 rounded-lg py-2 text-center text-[14px] font-medium " +
            (i === active ? "bg-white text-brand shadow-sm" : "text-ink-3")
          }
        >
          {it}
        </div>
      ))}
    </div>
  )
}

/* Chips row for filters */
export function Chips({ items, active = 0 }: { items: string[]; active?: number }) {
  return (
    <div className="flex flex-wrap gap-2">
      {items.map((it, i) => (
        <span
          key={i}
          className={
            "rounded-full px-3 py-1.5 text-[13px] " +
            (i === active
              ? "bg-brand text-white"
              : "border border-line bg-white text-ink-2")
          }
        >
          {it}
        </span>
      ))}
    </div>
  )
}

/* Form field */
export function Field({
  label,
  value,
  placeholder,
  suffix,
  required,
  error,
  keyboard,
}: {
  label: string
  value?: string
  placeholder?: string
  suffix?: string
  required?: boolean
  error?: string
  keyboard?: string
}) {
  return (
    <div>
      <div className="mb-1 flex items-center gap-1 text-[13px] text-ink-2">
        {required && <span className="text-danger">*</span>}
        {label}
        {keyboard && <span className="ml-auto text-[11px] text-ink-3">{keyboard}</span>}
      </div>
      <div
        className={
          "flex min-h-[46px] items-center gap-2 rounded-xl border bg-white px-3 " +
          (error ? "border-danger" : "border-line")
        }
      >
        <span className={"flex-1 text-[15px] " + (value ? "text-ink" : "text-ink-3/70")}>
          {value || placeholder}
        </span>
        {suffix && <span className="text-[13px] text-ink-3">{suffix}</span>}
      </div>
      {error && <div className="mt-1 text-[12px] text-danger">{error}</div>}
    </div>
  )
}

/* Progress steps for long forms */
export function Steps({ steps, active }: { steps: string[]; active: number }) {
  return (
    <div className="flex items-center">
      {steps.map((s, i) => (
        <React.Fragment key={i}>
          <div className="flex flex-col items-center gap-1">
            <div
              className={
                "grid h-7 w-7 place-items-center rounded-full text-[13px] font-bold " +
                (i < active
                  ? "bg-ok text-white"
                  : i === active
                    ? "bg-brand text-white"
                    : "bg-[#ececef] text-ink-3")
              }
            >
              {i < active ? <Icons.check size={15} strokeWidth={2.6} /> : i + 1}
            </div>
            <span className={"text-[11px] " + (i <= active ? "text-ink-2" : "text-ink-3")}>{s}</span>
          </div>
          {i < steps.length - 1 && (
            <div className={"mb-4 h-[2px] flex-1 " + (i < active ? "bg-ok" : "bg-line")} />
          )}
        </React.Fragment>
      ))}
    </div>
  )
}

export function Sample() {
  return (
    <span className="ml-1 rounded bg-[#f0f0f2] px-1 py-0.5 align-middle text-[10px] font-medium text-ink-3">
      示例
    </span>
  )
}
