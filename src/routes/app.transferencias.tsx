import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { ArrowUpRight, Clock, ShieldCheck, Repeat, Calendar, AlertTriangle, Star, Trash2 } from "lucide-react";
import { PageHeader, Card, Input, Label, BtnPrimary, BtnOutline, Stat, Badge } from "@/components/portal-shell";
import { toast } from "sonner";
import { FormDialog } from "@/components/form-dialog";

export const Route = createFileRoute("/app/transferencias")({ component: Page });

const recientes = [
  { n: "Proveedor SA", a: "proveedor.sa", m: "$ 220.000", f: "Hoy 10:42" },
  { n: "Estudio Ríos", a: "rios.contable", m: "$ 145.000", f: "Ayer 18:10" },
  { n: "Servicios Generales", a: "serv.generales", m: "$ 82.500", f: "30/05 16:22" },
  { n: "Juan Pérez", a: "juanperez.mp", m: "$ 35.000", f: "29/05 09:05" },
];

const programadas = [
  { d: "Sueldos Mayo", m: "$ 4.820.000", f: "05/06/2026", e: "Programada" },
  { d: "Pago proveedor recurrente", m: "$ 220.000", f: "10/06/2026", e: "Recurrente" },
  { d: "Honorarios estudio", m: "$ 145.000", f: "12/06/2026", e: "Programada" },
];

const plantillas = [
  { n: "Sueldos mensuales", d: "Lote · 18 empleados", m: "$ 4.820.000" },
  { n: "Pago proveedor SA", d: "Mensual · día 10", m: "$ 220.000" },
  { n: "Honorarios estudio Ríos", d: "Mensual · día 12", m: "$ 145.000" },
  { n: "Alquiler oficina", d: "Mensual · día 5", m: "$ 380.000" },
];

function Page() {
  const [confirm, setConfirm] = useState(false);
  const [tab, setTab] = useState<"unica" | "lote" | "programada">("unica");
  const [plantOpen, setPlantOpen] = useState(false);

  return (
    <>
      <PageHeader
        title="Transferencias"
        description="Envíos inmediatos, programados y por lote a CBU o alias."
        action={<BtnOutline onClick={() => setPlantOpen(true)}><Repeat size={14} /> Plantillas</BtnOutline>}
      />

      <div className="grid md:grid-cols-4 gap-4 mb-6">
        <Stat label="Disponible hoy" value="$ 12.479.330,55" sub="Operativa + subcuentas" />
        <Stat label="Enviado este mes" value="$ 28.4M" sub="142 operaciones" />
        <Stat label="Programadas" value="3" sub="$ 5.185.000 próximos 10 días" />
        <Stat label="Límite diario" value="$ 25M" sub="73% utilizado" />
      </div>

      <div className="grid lg:grid-cols-[1.4fr_1fr] gap-6">
        <Card>
          <div className="flex gap-1 mb-5 border-b -mt-1">
            {[
              ["unica", "Única"],
              ["lote", "Por lote"],
              ["programada", "Programada"],
            ].map(([k, l]) => (
              <button
                key={k}
                onClick={() => setTab(k as typeof tab)}
                className={`px-4 py-2.5 text-sm font-semibold border-b-2 -mb-px ${
                  tab === k ? "border-primary text-primary" : "border-transparent text-muted-foreground"
                }`}
              >
                {l}
              </button>
            ))}
          </div>

          {!confirm ? (
            <form className="space-y-4" onSubmit={(e) => { e.preventDefault(); setConfirm(true); }}>
              <div className="grid sm:grid-cols-2 gap-3">
                <div className="sm:col-span-2">
                  <Label>Origen de fondos</Label>
                  <select className="w-full h-10 px-3 rounded-md border bg-card text-sm">
                    <option>Cuenta operativa — $ 6.389.830,55</option>
                    <option>Sucursal Centro — $ 4.220.000,00</option>
                    <option>Sucursal Norte — $ 1.870.500,00</option>
                  </select>
                </div>
                <div className="sm:col-span-2">
                  <Label>Destinatario</Label>
                  <Input placeholder="CBU, alias o buscar en agenda" defaultValue="proveedor.sa" />
                  <div className="text-xs text-muted-foreground mt-1">
                    <ShieldCheck size={11} className="inline mr-1" /> Validado: Proveedor SA — Banco Galicia
                  </div>
                </div>
                <div>
                  <Label>Monto</Label>
                  <Input placeholder="$ 0,00" defaultValue="220000" />
                </div>
                <div>
                  <Label>Moneda</Label>
                  <Input defaultValue="ARS" readOnly />
                </div>
                <div>
                  <Label>Concepto</Label>
                  <select className="w-full h-10 px-3 rounded-md border bg-card text-sm">
                    <option>Pago a proveedor</option>
                    <option>Sueldos</option>
                    <option>Honorarios</option>
                    <option>Servicios</option>
                    <option>Devolución</option>
                  </select>
                </div>
                <div>
                  <Label>Referencia</Label>
                  <Input placeholder="Factura 0034" />
                </div>
              </div>

              {tab === "programada" && (
                <div className="grid sm:grid-cols-2 gap-3 p-3 rounded-md bg-muted">
                  <div><Label>Fecha de envío</Label><Input type="date" /></div>
                  <div>
                    <Label>Recurrencia</Label>
                    <select className="w-full h-10 px-3 rounded-md border bg-card text-sm">
                      <option>Una sola vez</option>
                      <option>Semanal</option>
                      <option>Mensual</option>
                    </select>
                  </div>
                </div>
              )}

              <div className="flex gap-2">
                <BtnOutline className="flex-1">Guardar borrador</BtnOutline>
                <BtnPrimary type="submit" className="flex-1">Continuar</BtnPrimary>
              </div>
            </form>
          ) : (
            <div className="space-y-4">
              <div className="text-sm text-muted-foreground">Revisá los datos antes de confirmar.</div>
              <div className="border rounded-md divide-y">
                {[
                  ["Origen", "Cuenta operativa"],
                  ["Destinatario", "Proveedor SA"],
                  ["CBU", "0000003 100099887766 11"],
                  ["Banco", "Banco Galicia"],
                  ["Monto", "$ 220.000,00"],
                  ["Concepto", "Pago a proveedor"],
                  ["Comisión estimada", "$ 80,00 (0,30%)"],
                  ["Total débito", "$ 220.080,00"],
                ].map(([k, v]) => (
                  <div key={k} className="flex justify-between py-2.5 px-3 text-sm">
                    <span className="text-muted-foreground">{k}</span>
                    <span className="font-semibold">{v}</span>
                  </div>
                ))}
              </div>
              <div className="flex items-center gap-2 text-xs text-muted-foreground p-3 bg-muted rounded">
                <ShieldCheck size={14} /> Se solicitará 2FA al confirmar.
              </div>
              <div className="flex gap-2">
                <BtnOutline onClick={() => setConfirm(false)} className="flex-1">Volver</BtnOutline>
                <BtnPrimary onClick={() => setConfirm(false)} className="flex-1">Confirmar transferencia</BtnPrimary>
              </div>
            </div>
          )}
        </Card>

        <div className="space-y-6">
          <Card>
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-semibold text-sm">Destinatarios frecuentes</h3>
              <button className="text-xs text-primary font-semibold">Ver todos</button>
            </div>
            <div className="divide-y">
              {recientes.map((r) => (
                <div key={r.n} className="flex items-center justify-between py-2.5">
                  <div>
                    <div className="text-sm font-semibold">{r.n}</div>
                    <div className="text-xs text-muted-foreground">@{r.a} · {r.f}</div>
                  </div>
                  <button className="text-xs text-primary font-semibold flex items-center gap-1">
                    Reenviar <ArrowUpRight size={12} />
                  </button>
                </div>
              ))}
            </div>
          </Card>

          <Card>
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-semibold text-sm flex items-center gap-2"><Calendar size={14} /> Programadas</h3>
            </div>
            <div className="divide-y">
              {programadas.map((p) => (
                <div key={p.d} className="py-2.5">
                  <div className="flex justify-between text-sm">
                    <span className="font-semibold">{p.d}</span>
                    <span className="font-semibold">{p.m}</span>
                  </div>
                  <div className="flex justify-between mt-1">
                    <span className="text-xs text-muted-foreground flex items-center gap-1"><Clock size={11} /> {p.f}</span>
                    <Badge tone={p.e === "Recurrente" ? "neutral" : "warn"}>{p.e}</Badge>
                  </div>
                </div>
              ))}
            </div>
          </Card>

          <Card className="border-amber-200 bg-amber-50/50">
            <div className="flex gap-2 items-start">
              <AlertTriangle size={16} className="text-amber-600 mt-0.5" />
              <div className="text-xs">
                <div className="font-semibold text-amber-900 mb-1">Recordá</div>
                <div className="text-amber-800">
                  Transferencias mayores a $ 1.000.000 requieren validación 2FA y quedan sujetas a revisión de compliance.
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>

      <FormDialog
        open={plantOpen}
        onClose={() => setPlantOpen(false)}
        title="Plantillas de transferencia"
        description="Usá una plantilla guardada o creá una nueva para reutilizar."
        submitLabel="Crear nueva plantilla"
        size="lg"
        onSubmit={() => {
          setPlantOpen(false);
          toast.success("Plantilla creada");
        }}
      >
        <div className="divide-y border rounded-md">
          {plantillas.map((p) => (
            <div key={p.n} className="flex items-center justify-between p-3">
              <div className="flex items-center gap-3 min-w-0">
                <div className="w-9 h-9 rounded-md bg-[color:var(--brand-soft)] flex items-center justify-center shrink-0">
                  <Star size={14} className="text-[color:var(--brand-dark)]" />
                </div>
                <div className="min-w-0">
                  <div className="font-semibold text-sm truncate">{p.n}</div>
                  <div className="text-xs text-muted-foreground truncate">{p.d}</div>
                </div>
              </div>
              <div className="flex items-center gap-2 shrink-0">
                <span className="text-sm font-semibold">{p.m}</span>
                <BtnOutline className="h-8 px-2 text-xs" onClick={() => { setPlantOpen(false); toast.success(`Plantilla "${p.n}" cargada`); }}>Usar</BtnOutline>
                <button type="button" className="h-8 w-8 inline-flex items-center justify-center rounded-md border bg-card hover:bg-accent text-muted-foreground"><Trash2 size={13} /></button>
              </div>
            </div>
          ))}
        </div>
        <div className="pt-2">
          <Label>Nombre de la nueva plantilla</Label>
          <Input placeholder="Ej. Pago proveedor mensual" />
        </div>
      </FormDialog>
    </>
  );
}
