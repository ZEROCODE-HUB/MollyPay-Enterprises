import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import {
  Plus, Copy, ArrowDownLeft, ArrowUpRight, Settings2, Eye, Search,
  ArrowLeftRight, ShieldCheck, Lock, Users, Zap,
} from "lucide-react";
import { PageHeader, Card, BtnPrimary, BtnOutline, Badge, Stat, Input, Label } from "@/components/portal-shell";
import { toast } from "sonner";
import { FormDialog } from "@/components/form-dialog";

export const Route = createFileRoute("/app/subcuentas")({ component: Page });

type Sub = {
  n: string; cbu: string; tipo: "Operativa" | "Recaudación" | "Garantías" | "Sueldos";
  e: "Activa" | "Pausada";
  disp: number; ret: number; conc: number;
  ing: string; egr: string;
  resp: string; lim: string; color: string;
};

const subs: Sub[] = [
  { n: "Sucursal Centro", cbu: "0000003 100011112222 01", tipo: "Operativa", e: "Activa",
    disp: 4220000, ret: 180000, conc: 3950000, ing: "$ 1.840.000", egr: "$ 920.000",
    resp: "M. Solís", lim: "$ 8.000.000 / día", color: "var(--brand-primary)" },
  { n: "Sucursal Norte", cbu: "0000003 100011112222 02", tipo: "Operativa", e: "Activa",
    disp: 1870500, ret: 0, conc: 1870500, ing: "$ 1.220.000", egr: "$ 540.000",
    resp: "T. Vega", lim: "$ 4.000.000 / día", color: "var(--brand-blue)" },
  { n: "Operaciones", cbu: "0000003 100011112222 03", tipo: "Operativa", e: "Activa",
    disp: 6389830, ret: 420000, conc: 5800000, ing: "$ 4.220.000", egr: "$ 2.180.000",
    resp: "L. Díaz", lim: "$ 20.000.000 / día", color: "var(--brand-dark)" },
  { n: "Recaudación expensas", cbu: "0000003 100011112222 04", tipo: "Recaudación", e: "Activa",
    disp: 2150000, ret: 0, conc: 2150000, ing: "$ 5.840.000", egr: "$ 0",
    resp: "P. Sosa", lim: "Sin límite", color: "var(--brand-blue)" },
  { n: "Sueldos", cbu: "0000003 100011112222 05", tipo: "Sueldos", e: "Activa",
    disp: 980000, ret: 0, conc: 980000, ing: "$ 980.000", egr: "$ 0",
    resp: "RRHH", lim: "$ 5.000.000 / día", color: "var(--brand-primary)" },
  { n: "Fondos en garantía", cbu: "0000003 100011112222 06", tipo: "Garantías", e: "Pausada",
    disp: 0, ret: 350000, conc: 350000, ing: "$ 0", egr: "$ 0",
    resp: "Compliance", lim: "Solo retiro autorizado", color: "var(--muted-foreground)" },
];

const movimientos = [
  { sc: "Sucursal Centro", d: "Cobro QR — Cliente #4821", m: "+ $ 18.400", f: "10:42", t: "Crédito" },
  { sc: "Operaciones", d: "Transferencia a Proveedor SA", m: "- $ 220.000", f: "10:18", t: "Débito" },
  { sc: "Sucursal Norte", d: "Link de pago Factura 0033", m: "+ $ 64.800", f: "09:30", t: "Crédito" },
  { sc: "Operaciones", d: "Pago Edesur", m: "- $ 64.320", f: "Ayer 18:11", t: "Débito" },
  { sc: "Recaudación expensas", d: "Lote expensas Marzo (84/128)", m: "+ $ 3.840.000", f: "Ayer 17:02", t: "Crédito" },
  { sc: "Sueldos", d: "Transferencia recibida cuenta madre", m: "+ $ 980.000", f: "Ayer 14:30", t: "Crédito" },
  { sc: "Operaciones", d: "Comisión Molly", m: "- $ 4.820", f: "Ayer 12:00", t: "Débito" },
  { sc: "Sucursal Centro", d: "Conciliación bancaria", m: "+ $ 0", f: "06:00", t: "Sistema" },
];

const reglas = [
  { n: "Auto-distribución cobros expensas", desc: "Recaudación expensas → 80% Operaciones · 20% Garantías", act: true },
  { n: "Barrido fin de día", desc: "Sucursales → Operaciones cuando saldo > $ 3.000.000", act: true },
  { n: "Fondeo sueldos", desc: "Operaciones → Sueldos · día 25 de cada mes", act: true },
  { n: "Tope alerta", desc: "Notificar cuando subcuenta < $ 100.000", act: false },
];

const fmt = (n: number) => "$ " + n.toLocaleString("es-AR");

function Page() {
  const [nuevoOpen, setNuevoOpen] = useState(false);
  const [transfOpen, setTransfOpen] = useState(false);
  const [reglaOpen, setReglaOpen] = useState(false);
  const [q, setQ] = useState("");
  const [tipo, setTipo] = useState("Todos");
  const [estado, setEstado] = useState("Todos");

  const filtradas = useMemo(
    () => subs.filter(s =>
      (q === "" || s.n.toLowerCase().includes(q.toLowerCase()) || s.cbu.includes(q)) &&
      (tipo === "Todos" || s.tipo === tipo) &&
      (estado === "Todos" || s.e === estado)
    ),
    [q, tipo, estado]
  );

  const total = subs.reduce((a, s) => a + s.disp + s.ret, 0);
  const totalDisp = subs.reduce((a, s) => a + s.disp, 0);
  const totalRet = subs.reduce((a, s) => a + s.ret, 0);

  return (
    <>
      <PageHeader
        title="Subcuentas"
        description="Una cuenta madre, múltiples CBU. Gestioná fondos, responsables, límites y reglas automáticas."
        action={
          <div className="flex gap-2">
            <BtnOutline onClick={() => setTransfOpen(true)}><ArrowLeftRight size={14} /> Transferir entre subcuentas</BtnOutline>
            <BtnPrimary onClick={() => setNuevoOpen(true)}><Plus size={16} /> Nueva subcuenta</BtnPrimary>
          </div>
        }
      />

      <div className="grid md:grid-cols-4 gap-4 mb-6">
        <Stat label="Saldo total" value={fmt(total)} sub={`${subs.length} subcuentas`} />
        <Stat label="Disponible" value={fmt(totalDisp)} sub="Listo para operar" />
        <Stat label="Retenido" value={fmt(totalRet)} sub="Pendiente de liberar" />
        <Stat label="Reglas activas" value={`${reglas.filter(r => r.act).length} / ${reglas.length}`} sub="Distribución automática" />
      </div>

      <Card className="mb-4 p-3">
        <div className="flex flex-wrap gap-2">
          <div className="relative flex-1 min-w-[220px]">
            <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
            <Input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Buscar por nombre o CBU..." className="pl-9" />
          </div>
          <select value={tipo} onChange={(e) => setTipo(e.target.value)} className="h-10 px-3 rounded-md border bg-card text-sm">
            <option>Todos</option><option>Operativa</option><option>Recaudación</option><option>Garantías</option><option>Sueldos</option>
          </select>
          <select value={estado} onChange={(e) => setEstado(e.target.value)} className="h-10 px-3 rounded-md border bg-card text-sm">
            <option>Todos</option><option>Activa</option><option>Pausada</option>
          </select>
          <BtnOutline className="h-10" onClick={() => setReglaOpen(true)}><Zap size={14} /> Reglas de distribución</BtnOutline>
        </div>
      </Card>

      <div className="grid lg:grid-cols-[1.7fr_1fr] gap-6">
        <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-3">
          {filtradas.map((s) => (
            <Card key={s.n} className="p-0 overflow-hidden">
              <div className="h-1" style={{ background: s.color }} />
              <div className="p-4">
                <div className="flex items-center justify-between mb-1">
                  <div className="font-semibold text-sm truncate">{s.n}</div>
                  <Badge tone={s.e === "Activa" ? "success" : "warn"}>{s.e}</Badge>
                </div>
                <div className="flex items-center gap-2 text-[11px] text-muted-foreground">
                  <Badge tone="neutral">{s.tipo}</Badge>
                  <span className="flex items-center gap-1"><Users size={10} /> {s.resp}</span>
                </div>
                <div className="flex items-center gap-1.5 text-[11px] text-muted-foreground font-mono mt-2">
                  <span className="truncate">{s.cbu}</span>
                  <button className="hover:opacity-70 shrink-0" onClick={() => toast.success("CBU copiado")}><Copy size={10} /></button>
                </div>

                <div className="mt-3 pt-3 border-t">
                  <div className="text-[10px] uppercase tracking-wide text-muted-foreground">Disponible</div>
                  <div className="text-lg font-semibold">{fmt(s.disp)}</div>
                </div>
                <div className="grid grid-cols-2 gap-2 mt-2 text-[11px]">
                  <div>
                    <div className="text-muted-foreground flex items-center gap-1"><Lock size={9} /> Retenido</div>
                    <div className="font-semibold">{fmt(s.ret)}</div>
                  </div>
                  <div>
                    <div className="text-muted-foreground flex items-center gap-1"><ShieldCheck size={9} /> Conciliado</div>
                    <div className="font-semibold">{fmt(s.conc)}</div>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-2 mt-2 pt-2 border-t text-[11px]">
                  <div>
                    <div className="text-muted-foreground flex items-center gap-1"><ArrowDownLeft size={9} className="text-emerald-600" /> Ing. mes</div>
                    <div className="font-semibold">{s.ing}</div>
                  </div>
                  <div>
                    <div className="text-muted-foreground flex items-center gap-1"><ArrowUpRight size={9} className="text-red-600" /> Egr. mes</div>
                    <div className="font-semibold">{s.egr}</div>
                  </div>
                </div>
                <div className="text-[10px] text-muted-foreground mt-2 pt-2 border-t">
                  Límite operativo: <strong className="text-foreground">{s.lim}</strong>
                </div>
                <div className="flex gap-1 mt-3">
                  <BtnOutline className="flex-1 h-8 px-2 text-[11px]"><Eye size={11} /> Ver</BtnOutline>
                  <BtnOutline className="flex-1 h-8 px-2 text-[11px]" onClick={() => setTransfOpen(true)}>
                    <ArrowLeftRight size={11} /> Mover
                  </BtnOutline>
                  <BtnOutline className="h-8 w-8 px-0"><Settings2 size={11} /></BtnOutline>
                </div>
              </div>
            </Card>
          ))}
        </div>

        <div className="space-y-4">
          <Card>
            <div className="flex justify-between items-center mb-3">
              <h3 className="font-semibold text-sm">Movimientos recientes</h3>
              <BtnOutline className="h-7 px-2 text-[11px]">Ver todos</BtnOutline>
            </div>
            <div className="divide-y">
              {movimientos.map((m, i) => (
                <div key={i} className="py-2.5">
                  <div className="flex justify-between text-sm">
                    <span className="font-semibold truncate pr-2">{m.d}</span>
                    <span className={`font-semibold whitespace-nowrap ${m.m.startsWith("+") ? "text-emerald-700" : m.m.startsWith("-") ? "text-red-700" : "text-muted-foreground"}`}>{m.m}</span>
                  </div>
                  <div className="text-xs text-muted-foreground flex justify-between">
                    <span>{m.sc} · {m.t}</span>
                    <span>{m.f}</span>
                  </div>
                </div>
              ))}
            </div>
          </Card>

          <Card>
            <h3 className="font-semibold text-sm mb-3">Distribución del saldo</h3>
            <div className="space-y-2">
              {subs.map((s) => {
                const pct = (s.disp + s.ret) / total * 100;
                return (
                  <div key={s.n}>
                    <div className="flex justify-between text-xs mb-1">
                      <span className="truncate pr-2">{s.n}</span>
                      <span className="font-semibold">{pct.toFixed(1)}%</span>
                    </div>
                    <div className="h-1.5 rounded-full bg-muted overflow-hidden">
                      <div className="h-full rounded-full" style={{ width: `${pct}%`, background: s.color }} />
                    </div>
                  </div>
                );
              })}
            </div>
          </Card>

          <Card>
            <div className="flex justify-between items-center mb-3">
              <h3 className="font-semibold text-sm flex items-center gap-2"><Zap size={13} /> Reglas automáticas</h3>
              <BtnOutline className="h-7 px-2 text-[11px]" onClick={() => setReglaOpen(true)}>Gestionar</BtnOutline>
            </div>
            <div className="divide-y">
              {reglas.map((r) => (
                <div key={r.n} className="py-2.5 flex justify-between items-start gap-2">
                  <div className="min-w-0">
                    <div className="text-sm font-semibold">{r.n}</div>
                    <div className="text-[11px] text-muted-foreground">{r.desc}</div>
                  </div>
                  <Badge tone={r.act ? "success" : "neutral"}>{r.act ? "Activa" : "Inactiva"}</Badge>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>

      <FormDialog
        open={nuevoOpen}
        onClose={() => setNuevoOpen(false)}
        title="Nueva subcuenta"
        description="Generá un CBU adicional asociado a tu cuenta madre."
        submitLabel="Crear subcuenta"
        onSubmit={() => { setNuevoOpen(false); toast.success("Subcuenta creada correctamente"); }}
      >
        <div><Label>Nombre de la subcuenta</Label><Input placeholder="Ej. Sucursal Sur" /></div>
        <div className="grid grid-cols-2 gap-3">
          <div><Label>Tipo</Label>
            <select className="w-full h-10 px-3 rounded-md border bg-card text-sm">
              <option>Operativa</option><option>Recaudación</option><option>Garantías</option><option>Sueldos</option>
            </select>
          </div>
          <div><Label>Responsable</Label><Input placeholder="Usuario o área" /></div>
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div><Label>Límite diario (ARS)</Label><Input placeholder="0,00" /></div>
          <div><Label>Saldo inicial</Label><Input placeholder="$ 0,00" /></div>
        </div>
        <label className="flex items-center gap-2 text-xs">
          <input type="checkbox" defaultChecked /> Activar inmediatamente al crear
        </label>
      </FormDialog>

      <FormDialog
        open={transfOpen}
        onClose={() => setTransfOpen(false)}
        title="Transferir entre subcuentas"
        description="Movimiento interno · acreditación inmediata, sin comisión."
        submitLabel="Transferir"
        onSubmit={() => { setTransfOpen(false); toast.success("Transferencia interna realizada"); }}
      >
        <div className="grid grid-cols-2 gap-3">
          <div><Label>Desde</Label>
            <select className="w-full h-10 px-3 rounded-md border bg-card text-sm">
              {subs.map(s => <option key={s.n}>{s.n} — {fmt(s.disp)}</option>)}
            </select>
          </div>
          <div><Label>Hacia</Label>
            <select className="w-full h-10 px-3 rounded-md border bg-card text-sm">
              {subs.map(s => <option key={s.n}>{s.n}</option>)}
            </select>
          </div>
        </div>
        <div><Label>Monto (ARS)</Label><Input placeholder="0,00" /></div>
        <div><Label>Concepto</Label><Input placeholder="Barrido fin de día, fondeo, etc." /></div>
      </FormDialog>

      <FormDialog
        open={reglaOpen}
        onClose={() => setReglaOpen(false)}
        title="Reglas de distribución automática"
        description="Aplicá movimientos automáticos entre subcuentas según condiciones."
        submitLabel="Guardar regla"
        size="lg"
        onSubmit={() => { setReglaOpen(false); toast.success("Regla guardada"); }}
      >
        <div className="grid grid-cols-2 gap-3">
          <div><Label>Subcuenta origen</Label>
            <select className="w-full h-10 px-3 rounded-md border bg-card text-sm">{subs.map(s => <option key={s.n}>{s.n}</option>)}</select>
          </div>
          <div><Label>Tipo de regla</Label>
            <select className="w-full h-10 px-3 rounded-md border bg-card text-sm">
              <option>Distribución por porcentaje</option>
              <option>Barrido a destino único</option>
              <option>Fondeo programado</option>
              <option>Alerta de saldo mínimo</option>
            </select>
          </div>
        </div>
        <div>
          <Label>Distribución</Label>
          <div className="space-y-2">
            {subs.slice(0, 3).map((s, i) => (
              <div key={s.n} className="grid grid-cols-[1fr_120px] gap-2 items-center">
                <select className="h-9 px-3 rounded-md border bg-card text-sm" defaultValue={s.n}>
                  {subs.map(x => <option key={x.n}>{x.n}</option>)}
                </select>
                <div className="relative">
                  <Input defaultValue={[60, 30, 10][i]} className="h-9 pr-7" />
                  <span className="absolute right-2 top-1/2 -translate-y-1/2 text-xs text-muted-foreground">%</span>
                </div>
              </div>
            ))}
          </div>
        </div>
        <label className="flex items-center gap-2 text-xs"><input type="checkbox" defaultChecked /> Notificar al ejecutarse</label>
        <label className="flex items-center gap-2 text-xs"><input type="checkbox" /> Requerir aprobación manual</label>
      </FormDialog>
    </>
  );
}
