// Guía: estilo "pay" (componentes copiados tal cual de pay-tracker) al lado de cómo
// quedaría con lo que el sistema ya tiene, pintado con el color de pay (green-700).
import * as React from "react"
import { BarChart3, ChevronDown, Settings, ChevronLeft, ChevronRight, EllipsisVertical, Plus } from "lucide-react"

import { Segmented } from "@/components/controls/segmented"
import { TabBar } from "@/components/controls/tab-bar"
import { Button } from "@/components/ui/button"
import { Chip } from "@/components/ui/chip"
import { Input } from "@/components/ui/input"
import { FieldLabel } from "@/components/ui/field-label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { BottomSheet } from "@/components/ui/bottom-sheet"
import { AppHero, LiveDate } from "@/components/ui/app-hero"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { ExpandRow, ExpandRowItem } from "@/components/controls/expand-row"
import {
  PAY, PAY_FONT, PayActions, PayChips, PayChoice, PayDashedAdd, PayDebtCard, PayExpenseRow, PayFab, PayHeader,
  PayInput, PayLabel, PayListCard, PayMonthNav, PaySectionLabel, PaySelect, PaySheet, PaySheetTitle, PayStat,
  PayToggle, PayTotalCard, PayTotalTabs, PayEmojiField, PayCheckList, PayExpandRow,
} from "@/components/pay/pay"

// El color de pay (green-700, y green-800 al apretar) sólo para la columna del sistema
const GREEN_700 = "oklch(52.7% 0.154 150.069)"
const GREEN_800 = "oklch(44.8% 0.119 151.328)"
const PAY_BRAND = {
  "--brand": GREEN_700, "--brand-text": GREEN_700, "--brand-strong": GREEN_800, "--brand-foreground": "oklch(100% 0 0)",
  "--primary": GREEN_700, "--primary-foreground": "oklch(100% 0 0)", "--ring": GREEN_700,
} as React.CSSProperties

const EXPENSES = [
  { emoji: "💊", name: "Farmacia", date: "12/11", payer: "Sofi", split: "60/40", amount: "$12.300" },
  { emoji: "⚡", name: "Edenor", date: "10/11", payer: "Agus", split: "60/40", amount: "$34.000" },
  { emoji: "🎬", name: "Cine", date: "9/11", payer: "Agus", split: "50/50", amount: "$18.000" },
]
const CATS = [["Supermercado", "🛒"], ["Delivery", "🛵"], ["Farmacia", "💊"]]

function Compare({ name, use, oneNote, one, two, bare }: {
  name: string; use: string; oneNote: string; one: React.ReactNode; two: React.ReactNode
  /** sin caja (para mostrar pantallas y hojas, que traen su propio fondo) */
  bare?: boolean
}) {
  const box = bare ? "flex flex-col gap-3 overflow-hidden rounded-box-l" : "flex min-h-24 flex-col justify-center gap-3 rounded-box-l bg-card p-box-l"
  return (
    <div className="flex flex-col gap-3">
      <div>
        <div className="text-sm font-medium">{name}</div>
        <div className="text-xs text-muted-foreground">{use}</div>
      </div>
      <div className="grid items-start gap-3 md:grid-cols-2">
        <div className="flex flex-col gap-2" style={PAY_BRAND}>
          <span className="eyebrow">Estilo 1 · {oneNote}</span>
          <div className={box}>{one}</div>
        </div>
        <div className="flex flex-col gap-2">
          <span className="eyebrow">Estilo 2 · pay (original)</span>
          <div className={box} style={{ background: bare ? undefined : PAY.bg, fontFamily: PAY_FONT, color: PAY.dark }}>{two}</div>
        </div>
      </div>
    </div>
  )
}

// Fila de gasto armada con lo del sistema (todavía no hay una fila de gasto en el sistema)
function DsExpenseRow({ emoji, name, date, payer, split, amount }: (typeof EXPENSES)[number]) {
  return (
    <div className="flex items-center gap-3 py-2.5">
      <span className="text-xl">{emoji}</span>
      <div className="min-w-0 flex-1">
        <div className="flex items-baseline gap-1.5"><span className="text-sm font-medium">{name}</span><span className="text-xs text-muted-foreground">{date}</span></div>
        <div className="text-xs text-muted-foreground"><span className="font-medium text-brand-text">{payer}</span> · {split}</div>
      </div>
      <span className="text-sm font-semibold">{amount}</span>
      <Button variant="ghost" size="icon-sm" aria-label="Opciones"><EllipsisVertical className="size-4" /></Button>
    </div>
  )
}

// Propuestas de encabezado para la pantalla de cada grupo
const DOTS = "absolute inset-x-0 bottom-0 h-0.5 bg-[radial-gradient(circle,currentColor_1px,transparent_1.2px)] bg-size-[6px_2px] bg-repeat-x text-stone-300 dark:text-stone-800"
function GroupActions() {
  return (
    <div className="flex gap-2">
      <Button variant="secondary" size="icon" className="rounded-full" aria-label="Análisis"><BarChart3 className="size-4" /></Button>
      <Button variant="secondary" size="icon" className="rounded-full" aria-label="Configurar grupo"><Settings className="size-4" /></Button>
    </div>
  )
}
function GroupHeroB() {
  return (
    <div className="relative flex items-center gap-3 pb-5">
      <Button variant="secondary" size="icon" className="shrink-0 rounded-full" aria-label="Volver"><ChevronLeft className="size-4" /></Button>
      <span className="flex size-12 shrink-0 items-center justify-center rounded-full bg-secondary text-2xl leading-none">🏠</span>
      <div className="min-w-0 flex-1">
        <div className="truncate text-xl font-semibold tracking-tight">Casa</div>
        <div className="truncate text-sm text-brand-text">Agus & Sofi</div>
      </div>
      <GroupActions />
      <span aria-hidden className={DOTS} />
    </div>
  )
}

export function PayStyle() {
  const [tab, setTab] = React.useState("contado")
  const [tab1, setTab1] = React.useState("contado")
  const [who, setWho] = React.useState("Agus")
  const [who1, setWho1] = React.useState("Agus")
  const [split, setSplit] = React.useState(60)
  const [split1, setSplit1] = React.useState(60)
  const [chip, setChip] = React.useState("Todos")
  const [chip1, setChip1] = React.useState("Todos")
  const [card, setCard] = React.useState(false)
  const [card1, setCard1] = React.useState("contado")
  const [cat, setCat] = React.useState("Supermercado")
  const [cat1, setCat1] = React.useState("Supermercado")
  const [detail, setDetail] = React.useState("")
  const [detail1, setDetail1] = React.useState("")
  const [open1, setOpen1] = React.useState(false)

  return (
    <div className="grid gap-10">
      <Compare
        name="Encabezado del inicio"
        use="Arriba de la pantalla de inicio. Elegido: el fleje."
        oneNote="el fleje del sistema (elegido)"
        one={<AppHero name="Pay" jp="ペイ — 家計簿" stats={[{ value: <LiveDate />, label: "gastos compartidos" }]} />}
        bare
        two={<div style={{ fontFamily: PAY_FONT }}><PayHeader emoji="🏠" title="Casa" sub="Agus & Sofi" onBack={() => {}} /></div>}
      />

      <div className="flex flex-col gap-3">
        <div>
          <div className="text-sm font-medium">Encabezado de cada grupo (nuevo)</div>
          <div className="text-xs text-muted-foreground">Una sola fila: volver, el emoji del grupo en un círculo gris, nombre e integrantes (en el color de la app), análisis y configuración en botones redondos, y la línea de puntos abajo. Sin número: la deuda queda en su caja.</div>
        </div>
        <div className="md:max-w-[calc(50%-6px)]" style={PAY_BRAND}>
          <GroupHeroB />
        </div>
      </div>

      <Compare
        name="Elegir mes"
        use="Pasar al mes anterior o al siguiente."
        oneNote="Button redondo blanco"
        one={
          <div className="flex items-center gap-3">
            <Button variant="card" size="icon-sm" aria-label="Mes anterior"><ChevronLeft className="size-4" /></Button>
            <span className="flex-1 text-center text-sm font-medium">Noviembre <span className="text-muted-foreground">2026</span></span>
            <Button variant="card" size="icon-sm" aria-label="Mes siguiente"><ChevronRight className="size-4" /></Button>
          </div>
        }
        two={<PayMonthNav month="Noviembre" year={2026} />}
      />

      <Compare
        name="Deuda y total del mes"
        use="El número grande de cada grupo, con su acción."
        oneNote="dos cajas del sistema"
        bare
        one={
          <div className="flex flex-col gap-box-gap">
            <div className="flex items-center gap-3 rounded-box-l bg-card p-box-l">
              <div className="flex-1">
                <span className="text-sm text-muted-foreground">Deuda total</span>
                <div className="mt-1 text-2xl font-semibold tracking-tight text-brand-text">$676.890</div>
                <div className="text-sm text-muted-foreground"><span className="font-medium text-foreground">Sofi</span> le debe a <span className="font-medium text-foreground">Agus</span></div>
              </div>
              <Button>Saldar deuda</Button>
            </div>
            <button className="flex items-center justify-between rounded-box-l bg-card p-box-l text-left">
              <div><span className="text-sm text-muted-foreground">Total del mes</span><div className="mt-1 text-xl font-semibold tracking-tight">$943.200</div></div>
              <ChevronDown className="size-4 text-muted-foreground" />
            </button>
          </div>
        }
        two={
          <div style={{ display: "flex", flexDirection: "column", gap: 14, background: PAY.bg, padding: 16, borderRadius: 12, fontFamily: PAY_FONT }}>
            <PayDebtCard amount="$676.890" from="Sofi" to="Agus" />
            <PayTotalCard label="Total del mes" amount="$943.200"><div style={{ padding: 16, fontSize: 14, color: PAY.text }}>Detalle por categoría…</div></PayTotalCard>
          </div>
        }
      />

      <Compare
        name="Pestañas con total y lista de gastos"
        use="Contado / tarjeta, y los gastos del mes."
        oneNote="TabBar con dos renglones + filas del sistema"
        bare
        one={
          <div className="overflow-hidden rounded-box-l bg-card">
            <TabBar label="Tipo de gasto" value={tab1} onChange={setTab1} options={[{ value: "contado", label: "Gastos al contado", sub: "$943.200" }, { value: "tarjeta", label: "Gastos con tarjeta", sub: "$45.000" }]} />
            <div className="divide-y divide-border px-box-l py-1">{EXPENSES.map((e) => <DsExpenseRow key={e.name} {...e} />)}</div>
          </div>
        }
        two={
          <div style={{ background: PAY.white, border: `1px solid ${PAY.border}`, borderRadius: 12, overflow: "hidden", fontFamily: PAY_FONT }}>
            <PayTotalTabs value={tab} onChange={setTab} options={[{ value: "contado", label: "Gastos al contado", total: "$943.200" }, { value: "tarjeta", label: "Gastos con tarjeta" }]} />
            <div style={{ padding: "4px 16px 8px" }}>{EXPENSES.map((e, i) => <PayExpenseRow key={e.name} {...e} last={i === EXPENSES.length - 1} />)}</div>
          </div>
        }
      />

      <Compare
        name="Elegir uno"
        use="¿Quién pagó? y ¿Cómo se divide?"
        oneNote="píldora a todo el ancho (Segmented fill)"
        one={
          <>
            <div><FieldLabel>¿Quién pagó?</FieldLabel><Segmented fill label="¿Quién pagó?" value={who1} onChange={setWho1} options={[{ value: "Agus", label: "Agus" }, { value: "Sofi", label: "Sofi" }]} /></div>
            <div><FieldLabel>¿Cómo se divide?</FieldLabel><Segmented fill label="¿Cómo se divide?" value={split1} onChange={setSplit1} options={[{ value: 60, label: "60/40" }, { value: 50, label: "50/50" }]} /></div>
          </>
        }
        two={
          <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
            <PayChoice label="¿Quién pagó?" value={who} onChange={setWho} options={[{ value: "Agus", label: "Agus" }, { value: "Sofi", label: "Sofi" }]} />
            <PayChoice label="¿Cómo se divide?" value={split} onChange={setSplit} options={[{ value: 60, label: "60/40" }, { value: 50, label: "50/50" }]} />
          </div>
        }
      />

      <Compare
        name="Filtro con chips"
        use="En Análisis: ver los gastos de todos o de una persona."
        oneNote="Chip"
        one={<div className="flex flex-wrap gap-2">{["Todos", "Agus", "Sofi"].map((p) => <Chip key={p} selected={chip1 === p} onClick={() => setChip1(p)}>{p}</Chip>)}</div>}
        two={<PayChips options={["Todos", "Agus", "Sofi"]} value={chip} onChange={setChip} />}
      />

      <Compare
        name="Campos del formulario"
        use="Categoría, detalle, monto y contado o tarjeta."
        oneNote="FieldLabel + Select + Input + Segmented chico"
        one={
          <>
            <div>
              <FieldLabel>Categoría</FieldLabel>
              <Select value={cat1} onValueChange={(v) => setCat1(v as string)}>
                <SelectTrigger className="w-full"><SelectValue /></SelectTrigger>
                <SelectContent>{CATS.map(([n, e]) => <SelectItem key={n} value={n}>{e} {n}</SelectItem>)}</SelectContent>
              </Select>
            </div>
            <div className="flex items-end gap-2">
              <div className="min-w-0 flex-1"><FieldLabel>Detalle</FieldLabel><Input value={detail1} onChange={(e) => setDetail1(e.target.value)} placeholder="Ej: Almuerzo" /></div>
              <div className="min-w-0 flex-1"><FieldLabel>Monto</FieldLabel><Input placeholder="$0" inputMode="numeric" /></div>
              <Segmented size="sm" className="h-10 shrink-0" label="Cómo pagaste" value={card1} onChange={setCard1} options={[{ value: "contado", label: "💵" }, { value: "tarjeta", label: "💳" }]} />
            </div>
          </>
        }
        two={
          <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
            <div><PayLabel>Categoría</PayLabel><PaySelect value={cat} onChange={(e) => setCat(e.target.value)}>{CATS.map(([n, e]) => <option key={n} value={n}>{e} {n}</option>)}</PaySelect></div>
            <div style={{ display: "flex", gap: 8 }}>
              <div style={{ flex: 1, minWidth: 0 }}><PayLabel>Detalle</PayLabel><PayInput value={detail} onChange={(e) => setDetail(e.target.value)} placeholder="Ej: Almuerzo" /></div>
              <div style={{ flex: 1, minWidth: 0 }}><PayLabel>Monto</PayLabel><PayInput placeholder="$0" inputMode="numeric" /></div>
              <div style={{ alignSelf: "flex-end" }}><PayToggle card={card} onChange={setCard} /></div>
            </div>
          </div>
        }
      />

      <Compare
        name="Botones"
        use="Cancelar y guardar, y el botón flotante para agregar un gasto."
        oneNote="Button"
        one={
          <>
            <div className="flex gap-2">
              <Button variant="destructive-outline" className="flex-1">Cancelar</Button>
              <Button disabled className="flex-1">Guardar</Button>
            </div>
            <div className="flex justify-center"><Button><Plus className="size-4" /> Agregar gasto</Button></div>
          </>
        }
        two={
          <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
            <PayActions disabled />
            <div style={{ display: "flex", justifyContent: "center" }}><PayFab inline /></div>
          </div>
        }
      />

      <Compare
        name="Inicio: grupos"
        use="La lista de grupos y el botón para crear uno."
        oneNote="caja del sistema + Button punteado"
        bare
        one={
          <div className="flex flex-col gap-box-gap">
            <span className="px-1 text-sm text-muted-foreground">Mis grupos</span>
            {[["🏠", "Casa", "Agus & Sofi"], ["🏔️", "Viaje a Bariloche", "Agus, Sofi & Tomi"]].map(([e, t, s]) => (
              <button key={t} className="flex items-center gap-4 rounded-box-l bg-card p-box-l text-left">
                <span className="text-3xl">{e}</span>
                <div className="flex-1"><div className="font-medium">{t}</div><div className="text-sm text-muted-foreground">{s}</div></div>
                <ChevronRight className="size-4 text-muted-foreground" />
              </button>
            ))}
            <Button variant="dashed" className="w-full"><Plus className="size-4" /> Crear nuevo grupo</Button>
          </div>
        }
        two={
          <div style={{ display: "flex", flexDirection: "column", gap: 10, fontFamily: PAY_FONT, background: PAY.bg, padding: 16, borderRadius: 12 }}>
            <PaySectionLabel>Mis grupos</PaySectionLabel>
            <PayListCard emoji="🏠" title="Casa" sub="Agus & Sofi" />
            <PayListCard emoji="🏔️" title="Viaje a Bariloche" sub="Agus, Sofi & Tomi" />
            <PayDashedAdd>+ Crear nuevo grupo</PayDashedAdd>
          </div>
        }
      />

      <Compare
        name="Datos de Análisis"
        use="Totales y promedios del año."
        oneNote="cajitas del sistema"
        bare
        one={
          <div className="grid grid-cols-3 gap-box-gap">
            {[["Total 2026", "$2.829.600", "YTD"], ["Mes más bajo", "$943.200", "Septiembre"], ["Por día", "$8.788", "Promedio"]].map(([l, v, s]) => (
              <div key={l} className="rounded-box-m bg-card p-box-m">
                <span className="text-sm text-muted-foreground">{l}</span>
                <div className="mt-1 text-lg font-semibold tracking-tight">{v}</div>
                <div className="text-sm text-muted-foreground">{s}</div>
              </div>
            ))}
          </div>
        }
        two={
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 12, fontFamily: PAY_FONT, background: PAY.bg, padding: 12, borderRadius: 12 }}>
            <PayStat label="Total 2026" value="$2.829.600" sub="YTD" />
            <PayStat label="Mes más bajo" value="$943.200" sub="Septiembre" />
            <PayStat label="Por día" value="$8.788" sub="Promedio" />
          </div>
        }
      />

      <Compare
        name="Nombre con emoji"
        use="Nombre del grupo (al crearlo o editarlo); el emoji abre la lista para elegir otro."
        oneNote="botón redondo con borde + campo"
        one={
          <div className="flex gap-2">
            <Button variant="outline" size="icon" className="text-xl" aria-label="Elegir emoji">🏠</Button>
            <Input placeholder="Ej: Amigos viaje" className="flex-1" />
          </div>
        }
        two={<PayEmojiField emoji="🏠" placeholder="Ej: Amigos viaje" />}
      />

      <SplitsCompare />

      <Compare
        name="Filas que se abren"
        use="Gastos por mes en Análisis: al tocar un mes se ve el detalle."
        oneNote="ExpandRow"
        bare
        one={
          <div className="rounded-box-l bg-card py-1">
            <ExpandRow defaultOpen title="Noviembre 2026" sub="IPC 2,2%" right={<span className="font-medium text-brand-text">$758.070</span>}>
              <ExpandRowItem label="🛒 Supermercado" value="$320.000" />
              <ExpandRowItem label="⚡ Servicios" value="$241.770" />
            </ExpandRow>
            <ExpandRow title="Octubre 2026" sub="IPC 2,7%" right={<span className="font-medium text-brand-text">$638.070</span>}>
              <ExpandRowItem label="🛒 Supermercado" value="$638.070" />
            </ExpandRow>
          </div>
        }
        two={
          <div style={{ background: PAY.white, border: `1px solid ${PAY.border}`, borderRadius: 12, fontFamily: PAY_FONT, overflow: "hidden" }}>
            <PayExpandRow title="Noviembre 2026" sub="IPC 2,2%" total="$758.070" items={[["🛒 Supermercado", "$320.000"], ["⚡ Servicios", "$241.770"]]} />
            <PayExpandRow title="Octubre 2026" sub="IPC 2,7%" total="$638.070" items={[["🛒 Supermercado", "$638.070"]]} last />
          </div>
        }
      />

      <Compare
        name="Hoja de nuevo gasto"
        use="La ventana que sube desde abajo para cargar un gasto."
        oneNote="BottomSheet"
        bare
        one={
          <div className="relative h-[420px] overflow-hidden rounded-box-l bg-background ring-1 ring-foreground/15">
            <BottomSheet inline open={!open1} onOpenChange={() => setOpen1(false)} title="Nuevo gasto grupal">
              <FieldLabel>¿Quién pagó?</FieldLabel>
              <Segmented fill label="¿Quién pagó?" value={who1} onChange={setWho1} options={[{ value: "Agus", label: "Agus" }, { value: "Sofi", label: "Sofi" }]} />
              <div className="flex gap-2">
                <Button variant="destructive-outline" className="flex-1">Cancelar</Button>
                <Button disabled className="flex-1">Guardar</Button>
              </div>
            </BottomSheet>
          </div>
        }
        two={
          <div style={{ position: "relative", height: 420, overflow: "hidden", borderRadius: 12, background: PAY.bg }}>
            <PaySheet inline>
              <div style={{ marginBottom: 16 }}><PaySheetTitle>Nuevo gasto grupal</PaySheetTitle></div>
              <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
                <PayChoice label="¿Quién pagó?" value={who} onChange={setWho} options={[{ value: "Agus", label: "Agus" }, { value: "Sofi", label: "Sofi" }]} />
                <PayActions disabled />
              </div>
            </PaySheet>
          </div>
        }
      />
    </div>
  )
}

// Elegir varias: casillas del sistema (Checkbox + texto), cada una en su caja S (toda la caja se puede tocar)
function SplitsCompare() {
  const OPTS = ["70/30", "60/40", "50/50"]
  const [sel, setSel] = React.useState(["60/40", "50/50"])
  const toggle = (o: string) => setSel((p) => (p.includes(o) ? (p.length > 1 ? p.filter((x) => x !== o) : p) : [...p, o]))
  return (
    <Compare
      name="Elegir varias"
      use="Splits disponibles al crear o editar un grupo (por lo menos uno)."
      oneNote="casillas, cada una en una caja S"
      one={
        <div className="flex flex-col gap-box-gap">
          {OPTS.map((o) => (
            <Label key={o} data-variant="inset" className="rounded-box-s bg-inset p-box-s">
              <Checkbox checked={sel.includes(o)} onCheckedChange={() => toggle(o)} />
              {o}
            </Label>
          ))}
        </div>
      }
      two={<PayCheckList options={OPTS} value={sel} onToggle={toggle} />}
    />
  )
}
