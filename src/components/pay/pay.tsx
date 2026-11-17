// Estilo "pay": componentes copiados tal cual de pay-tracker (src/App.jsx), con sus
// mismos colores y medidas. Sirven para compararlos en la guía con los del sistema.
// No usar en apps nuevas: cuando la persona elige, se pasa al componente del sistema.
import * as React from "react"

export const PAY = { green: "#004225", white: "#FFFFFF", bg: "#F7F7F7", border: "#DDDDDD", text: "#A4A4A4", dark: "#555555", muted: "#BBBBBB", ok: "#4CAF50", red: "#E53935" }
export const PAY_FONT = "system-ui,sans-serif"
const { green: R, white: W, border: BD, text: TX, dark: TD, muted: MU } = PAY

const Arrow = ({ rotate = 0, color = "currentColor" }: { rotate?: number; color?: string }) => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" style={{ transform: `rotate(${rotate}deg)`, flexShrink: 0, transition: "transform 0.2s" }}>
    <path d="M4 6l4 4 4-4" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
)
const ChartIcon = ({ color }: { color: string }) => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="20" x2="18" y2="10" /><line x1="12" y1="20" x2="12" y2="4" /><line x1="6" y1="20" x2="6" y2="14" /></svg>
)

/** Encabezado verde de cada pantalla, con emoji, nombre y botones redondos */
export function PayHeader({ emoji, title, sub, onBack }: { emoji?: string; title: string; sub?: string; onBack?: () => void }) {
  return (
    <div style={{ background: R, padding: "0 20px", height: 80, boxSizing: "border-box", display: "flex", alignItems: "center", gap: 12, borderRadius: "0 0 16px 16px" }}>
      {onBack && <button onClick={onBack} style={{ background: "none", border: "none", color: W, cursor: "pointer", padding: 0, lineHeight: 1, opacity: 0.8, display: "flex", alignItems: "center" }}><Arrow rotate={90} /></button>}
      {emoji && <span style={{ fontSize: 40, userSelect: "none" }}>{emoji}</span>}
      <div style={{ flex: 1 }}><div style={{ color: W, fontSize: 19, fontWeight: 500 }}>{title}</div>{sub && <div style={{ color: "rgba(255,255,255,0.6)", fontSize: 14 }}>{sub}</div>}</div>
      <button style={{ background: W, border: "none", borderRadius: "50%", width: 40, height: 40, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}><ChartIcon color={R} /></button>
    </div>
  )
}

/** Mes con flechas redondas a los costados */
export function PayMonthNav({ month, year, onPrev, onNext }: { month: string; year: number; onPrev?: () => void; onNext?: () => void }) {
  const round: React.CSSProperties = { border: `1px solid ${BD}`, background: W, borderRadius: "50%", width: 36, height: 36, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
      <button onClick={onPrev} style={{ ...round, color: R }}><Arrow rotate={90} /></button>
      <span style={{ fontWeight: 500, fontSize: 17, flex: 1, textAlign: "center", color: TD }}>{month} <span style={{ color: TX, fontWeight: 400 }}>{year}</span></span>
      <button onClick={onNext} style={{ ...round, color: TX }}><Arrow rotate={-90} /></button>
    </div>
  )
}

/** Caja blanca con borde: la base de todas las tarjetas de pay */
export const payBox: React.CSSProperties = { background: W, border: `1px solid ${BD}`, borderRadius: 12 }

/** Deuda total con el botón "Saldar deuda" */
export function PayDebtCard({ amount, from, to, onSettle }: { amount: string; from: string; to: string; onSettle?: () => void }) {
  return (
    <div style={{ ...payBox, padding: "18px 20px", position: "relative" }}>
      <div style={{ fontSize: 14, color: TX, marginBottom: 6 }}>Deuda total</div>
      <div style={{ fontSize: 24, fontWeight: 500, color: R }}>{amount}</div>
      <div style={{ fontSize: 15, color: TX, marginTop: 3 }}><span style={{ color: R, fontWeight: 500 }}>{from}</span> le debe a <span style={{ color: R, fontWeight: 500 }}>{to}</span></div>
      <button onClick={onSettle} style={{ position: "absolute", right: 16, top: "50%", transform: "translateY(-50%)", background: R, border: "none", color: W, fontSize: 14, cursor: "pointer", fontWeight: 500, padding: "6px 12px", borderRadius: 8, whiteSpace: "nowrap" }}>Saldar deuda</button>
    </div>
  )
}

/** "Total del mes": tarjeta que se abre con una flecha */
export function PayTotalCard({ label, amount, children }: { label: string; amount: string; children?: React.ReactNode }) {
  const [open, setOpen] = React.useState(false)
  return (
    <div style={{ ...payBox, overflow: "hidden" }}>
      <button onClick={() => setOpen((p) => !p)} style={{ width: "100%", display: "flex", justifyContent: "space-between", alignItems: "center", padding: "14px 16px", background: "none", border: "none", cursor: "pointer", textAlign: "left", boxSizing: "border-box" }}>
        <div><div style={{ fontSize: 14, color: TX }}>{label}</div><div style={{ fontSize: 22, fontWeight: 500, color: R, marginTop: 4 }}>{amount}</div></div>
        <Arrow rotate={open ? 180 : 0} color={MU} />
      </button>
      {open && children && <div style={{ borderTop: `1px solid ${BD}` }}>{children}</div>}
    </div>
  )
}

/** Pestañas con total abajo (contado / tarjeta), raya verde debajo de la elegida */
export function PayTotalTabs<T extends string>({ options, value, onChange }: { options: { value: T; label: string; total?: string }[]; value: T; onChange: (v: T) => void }) {
  return (
    <div style={{ display: "flex", borderBottom: `1px solid ${BD}` }}>
      {options.map((o, i) => {
        const on = o.value === value
        return (
          <button key={o.value} onClick={() => onChange(o.value)} style={{ flex: 1, height: 68, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", border: "none", borderRight: i < options.length - 1 ? `1px solid ${BD}` : "none", borderBottom: on ? `2px solid ${R}` : "2px solid transparent", background: "none", cursor: "pointer", gap: 2 }}>
            <span style={{ fontSize: 15, color: on ? R : MU, fontWeight: on ? 500 : 400 }}>{o.label}</span>
            {o.total && <span style={{ fontSize: 13, color: on ? TX : MU, fontWeight: 400 }}>{o.total}</span>}
          </button>
        )
      })}
    </div>
  )
}

/** Un gasto de la lista: emoji, nombre, fecha, quién pagó y monto */
export function PayExpenseRow({ emoji, name, date, payer, split, amount, last }: { emoji: string; name: string; date: string; payer?: string; split?: string; amount: string; last?: boolean }) {
  return (
    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "10px 0", borderBottom: `1px solid ${last ? "transparent" : BD}` }}>
      <div style={{ display: "flex", alignItems: "center", gap: 10, minWidth: 0, flex: 1 }}>
        <span style={{ fontSize: 20, flexShrink: 0 }}>{emoji}</span>
        <div style={{ minWidth: 0 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 6 }}><span style={{ fontSize: 15, color: TD }}>{name}</span><span style={{ fontSize: 12, color: TX, flexShrink: 0 }}>{date}</span></div>
          {payer && <div style={{ fontSize: 13, color: TX, marginTop: 2 }}><span style={{ color: R, fontWeight: 500 }}>{payer}</span>{split && <span style={{ color: MU }}> · {split}</span>}</div>}
        </div>
      </div>
      <span style={{ fontSize: 16, fontWeight: 500, color: R, marginRight: 12 }}>{amount}</span>
      <span style={{ color: MU, fontSize: 18, lineHeight: 1 }}>⋮</span>
    </div>
  )
}

/** Botones grandes para elegir uno (¿Quién pagó?, ¿Cómo se divide?) */
export function PayChoice<T extends string | number>({ label, options, value, onChange }: { label?: string; options: { value: T; label: string }[]; value: T; onChange: (v: T) => void }) {
  return (
    <div>
      {label && <PayLabel>{label}</PayLabel>}
      <div style={{ display: "flex", gap: 8 }}>
        {options.map((o) => {
          const on = o.value === value
          return <button key={String(o.value)} onClick={() => onChange(o.value)} style={{ flex: 1, padding: "10px", border: `1px solid ${on ? R : BD}`, borderRadius: 8, background: on ? R : W, color: on ? W : TD, fontSize: 16, cursor: "pointer", fontWeight: on ? 500 : 400, height: 46, boxSizing: "border-box" }}>{o.label}</button>
        })}
      </div>
    </div>
  )
}

/** Chips redondos para filtrar (Todos / Agus / Sofi) */
export function PayChips({ options, value, onChange }: { options: string[]; value: string; onChange: (v: string) => void }) {
  return (
    <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
      {options.map((p) => <button key={p} onClick={() => onChange(p)} style={{ padding: "5px 14px", borderRadius: 16, border: `1px solid ${value === p ? R : BD}`, background: value === p ? R : W, color: value === p ? W : TD, fontSize: 14, cursor: "pointer" }}>{p}</button>)}
    </div>
  )
}

/** Contado / tarjeta con dos emojis */
export function PayToggle({ card, onChange }: { card: boolean; onChange: (card: boolean) => void }) {
  const b = (on: boolean): React.CSSProperties => ({ padding: "12px 8px", background: on ? W : "#EBEBEB", border: "none", cursor: "pointer", fontSize: 20, display: "flex", alignItems: "center", lineHeight: 1 })
  return (
    <div style={{ display: "flex", border: `1px solid ${BD}`, borderRadius: 8, overflow: "hidden", flexShrink: 0 }}>
      <button onClick={() => onChange(false)} title="Contado" style={b(!card)}>💵</button>
      <button onClick={() => onChange(true)} title="Tarjeta" style={{ ...b(card), borderLeft: `1px solid ${BD}` }}>💳</button>
    </div>
  )
}

export const PayLabel = ({ children }: { children: React.ReactNode }) => <div style={{ fontSize: 14, color: TX, marginBottom: 6 }}>{children}</div>

export function PayInput(props: React.InputHTMLAttributes<HTMLInputElement>) {
  return <input {...props} style={{ width: "100%", padding: "10px 12px", border: `1px solid ${BD}`, borderRadius: 8, fontSize: 16, color: props.value ? TD : MU, background: W, outline: "none", boxSizing: "border-box" }} />
}

export function PaySelect({ value, onChange, children }: { value: string; onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void; children: React.ReactNode }) {
  return (
    <div style={{ position: "relative" }}>
      <select value={value} onChange={onChange} style={{ width: "100%", padding: "10px 36px 10px 12px", border: `1px solid ${BD}`, borderRadius: 8, fontSize: 16, color: TD, background: W, outline: "none", appearance: "none", WebkitAppearance: "none" }}>{children}</select>
      <span style={{ position: "absolute", right: 14, top: "50%", transform: "translateY(-50%)", pointerEvents: "none", display: "flex" }}><Arrow color={MU} /></span>
    </div>
  )
}

/** Cancelar + Guardar (gris cuando todavía no se puede guardar) */
export function PayActions({ disabled, onCancel, onSave, saveLabel = "Guardar" }: { disabled?: boolean; onCancel?: () => void; onSave?: () => void; saveLabel?: string }) {
  const base: React.CSSProperties = { flex: 1, padding: "12px", borderRadius: 8, fontSize: 15, fontWeight: 400, height: 46, boxSizing: "border-box" }
  return (
    <div style={{ display: "flex", gap: 8 }}>
      <button onClick={onCancel} style={{ ...base, border: `1px solid ${BD}`, background: W, color: TD, cursor: "pointer" }}>Cancelar</button>
      <button onClick={onSave} disabled={disabled} style={{ ...base, border: "none", background: disabled ? "#E8E8E8" : R, color: disabled ? MU : W, cursor: disabled ? "not-allowed" : "pointer" }}>{saveLabel}</button>
    </div>
  )
}

/** Hoja que sube desde abajo, con la rayita gris arriba. inline = se dibuja en su lugar (para la guía) */
export function PaySheet({ onClose, children, inline }: { onClose?: () => void; children: React.ReactNode; inline?: boolean }) {
  return (
    <div style={{ position: inline ? "absolute" : "fixed", inset: 0, background: "rgba(0,0,0,0.4)", display: "flex", alignItems: "flex-end", justifyContent: "center", zIndex: 100, fontFamily: PAY_FONT }} onClick={onClose}>
      <div style={{ background: W, borderRadius: "14px 14px 0 0", padding: "24px", width: "100%", maxWidth: 480, boxSizing: "border-box", maxHeight: "90%", overflowY: "auto" }} onClick={(e) => e.stopPropagation()}>
        <div style={{ width: 36, height: 4, background: BD, borderRadius: 2, margin: "0 auto 20px" }} />
        {children}
      </div>
    </div>
  )
}

export const PaySheetTitle = ({ children }: { children: React.ReactNode }) => <div style={{ fontSize: 18, fontWeight: 500, color: R }}>{children}</div>

/** Botón verde flotante "+ Agregar gasto". inline = sin fijarlo abajo de la pantalla (para la guía) */
export function PayFab({ label = "Agregar gasto", onClick, inline }: { label?: string; onClick?: () => void; inline?: boolean }) {
  return (
    <button onClick={onClick} style={{ ...(inline ? {} : { position: "fixed", bottom: 24, left: "50%", transform: "translateX(-50%)" }), borderRadius: 100, background: R, color: W, border: "none", cursor: "pointer", display: "flex", alignItems: "center", gap: 8, padding: "14px 24px", fontSize: 15, fontWeight: 500, whiteSpace: "nowrap" }}>
      <span style={{ fontSize: 20, lineHeight: 1, marginBottom: 1 }}>+</span>{label}
    </button>
  )
}

/** Fila grande del inicio: emoji, nombre, integrantes y flecha */
export function PayListCard({ emoji, title, sub, onClick }: { emoji: string; title: string; sub?: string; onClick?: () => void }) {
  return (
    <button onClick={onClick} style={{ ...payBox, padding: "18px 20px", display: "flex", alignItems: "center", gap: 14, cursor: "pointer", textAlign: "left", width: "100%", boxSizing: "border-box" }}>
      <span style={{ fontSize: 32 }}>{emoji}</span>
      <div><div style={{ fontSize: 17, fontWeight: 500, color: TD }}>{title}</div>{sub && <div style={{ fontSize: 14, color: TX, marginTop: 2 }}>{sub}</div>}</div>
      <span style={{ marginLeft: "auto", display: "flex" }}><Arrow rotate={-90} color={MU} /></span>
    </button>
  )
}

/** "+ Crear nuevo grupo" con borde punteado */
export function PayDashedAdd({ children, onClick }: { children: React.ReactNode; onClick?: () => void }) {
  return <button onClick={onClick} style={{ width: "100%", padding: "14px", border: `1.5px dashed ${BD}`, borderRadius: 12, background: "none", color: TX, fontSize: 15, cursor: "pointer", boxSizing: "border-box" }}>{children}</button>
}

/** Cajita de dato de Análisis: título, monto verde y aclaración */
export function PayStat({ label, value, sub }: { label: string; value: string; sub?: string }) {
  return (
    <div style={{ background: W, border: `1px solid ${BD}`, borderRadius: 10, padding: "12px" }}>
      <div style={{ fontSize: 13, color: TX }}>{label}</div>
      <div style={{ fontSize: 16, fontWeight: 500, color: R, marginTop: 4 }}>{value}</div>
      {sub && <div style={{ fontSize: 13, color: TX, marginTop: 2 }}>{sub}</div>}
    </div>
  )
}

/** Título gris de sección ("Mis gastos", "Mis grupos") */
export const PaySectionLabel = ({ children }: { children: React.ReactNode }) => <div style={{ fontSize: 14, color: TX }}>{children}</div>
