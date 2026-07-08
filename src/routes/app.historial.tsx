import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Download, Filter, FileText, ArrowDownLeft, ArrowUpRight, ChevronRight, Wallet } from "lucide-react";
import { PageHeader, Card, Input, BtnOutline, BtnPrimary, Badge, Stat, Label } from "@/components/portal-shell";
import { toast } from "sonner";
import { FormDialog } from "@/components/form-dialog";
import { MollyLogo } from "@/components/molly-logo";

export const Route = createFileRoute("/app/historial")({ component: Page });

const rows = [
  { f: "02/06/2026 10:42", d: "Cobro QR – Cliente #4821", t: "Cobro", sc: "Sucursal Centro", m: "+ 18.400,00", e: "OK", ref: "QR-8821" },
  { f: "02/06/2026 10:18", d: "Transferencia – Proveedor SA", t: "Transferencia", sc: "Operaciones", m: "- 220.000,00", e: "OK", ref: "TR-9982" },
  { f: "01/06/2026 18:30", d: "Lote expensas – Marzo", t: "Lote", sc: "Operaciones", m: "+ 1.480.500,00", e: "OK", ref: "LT-0034" },
  { f: "01/06/2026 16:12", d: "Pago Edesur", t: "Servicio", sc: "Sucursal Norte", m: "- 64.320,00", e: "OK", ref: "SV-1102" },
  { f: "31/05/2026 14:08", d: "Link pago – Factura 0034", t: "Link", sc: "Operaciones", m: "+ 92.800,00", e: "OK", ref: "LP-9k2x7" },
  { f: "30/05/2026 11:22", d: "Transferencia – Estudio Ríos", t: "Transferencia", sc: "Operaciones", m: "- 145.000,00", e: "OK", ref: "TR-9974" },
  { f: "30/05/2026 09:05", d: "Cobro QR – Cliente #4815", t: "Cobro", sc: "Sucursal Centro", m: "+ 8.200,00", e: "OK", ref: "QR-8820" },
  { f: "29/05/2026 17:44", d: "Transferencia – Juan Pérez", t: "Transferencia", sc: "Sucursal Norte", m: "- 35.000,00", e: "Pendiente", ref: "TR-9968" },
];

function Page() {
  const [filtrosOpen, setFiltrosOpen] = useState(false);
  const [vista, setVista] = useState<"principal" | "sub">("principal");
  const [sub, setSub] = useState("Operaciones");
  const [preview, setPreview] = useState(false);
  const serie = "RP-EMP-2026-000042";
  return (
    <>
      <PageHeader
        title="Historial"
        description="Auditoría completa de movimientos con filtros, exportación y comprobantes."
        action={
          <div className="flex gap-2">
            <BtnOutline onClick={() => setFiltrosOpen(true)}><Filter size={14} /> Filtros avanzados</BtnOutline>
            <BtnOutline onClick={() => setPreview(true)}><Download size={14} /> Exportar reporte</BtnOutline>
          </div>
        }
      />

      <Card className="mb-6">
        <div className="flex flex-wrap items-center gap-3">
          <div className="flex items-center gap-2 text-sm">
            <Wallet size={14} className="text-muted-foreground" />
            <span className="font-semibold">Vista:</span>
          </div>
          <div className="flex gap-1.5">
            {([["principal", "Cuenta principal"], ["sub", "Por subcuenta"]] as Array<["principal" | "sub", string]>).map(([k, l]) => (
              <button
                key={k}
                onClick={() => setVista(k)}
                className={`px-3 py-1.5 rounded-full text-xs font-semibold border ${
                  vista === k ? "bg-[color:var(--brand-soft)] text-[color:var(--brand-dark)] border-transparent" : "bg-card hover:bg-muted"
                }`}
              >
                {l}
              </button>
            ))}
          </div>
          {vista === "sub" && (
            <select value={sub} onChange={(e) => setSub(e.target.value)} className="h-9 px-3 rounded-md border bg-card text-sm">
              <option>Operaciones</option>
              <option>Sucursal Centro</option>
              <option>Sucursal Norte</option>
            </select>
          )}
          <span className="ml-auto text-xs text-muted-foreground">
            {vista === "principal" ? "Mostrando consolidado de cuenta madre" : `Filtrando movimientos de ${sub}`}
          </span>
        </div>
      </Card>

      <div className="grid md:grid-cols-4 gap-4 mb-6">
        <Stat label="Ingresos del período" value="$ 4.220.300" sub="48 movimientos" />
        <Stat label="Egresos del período" value="$ 2.180.500" sub="34 movimientos" />
        <Stat label="Neto" value="+ $ 2.039.800" />
        <Stat label="Pendientes" value="3" sub="$ 245.000 en proceso" />
      </div>

      <Card>
        <div className="grid sm:grid-cols-2 lg:grid-cols-6 gap-2 mb-4">
          <Input type="date" />
          <Input type="date" />
          <select className="h-10 px-3 rounded-md border bg-card text-sm">
            <option>Tipo: todos</option>
            <option>Transferencia</option>
            <option>Cobro</option>
            <option>Link</option>
            <option>Lote</option>
            <option>Servicio</option>
          </select>
          <select className="h-10 px-3 rounded-md border bg-card text-sm">
            <option>Subcuenta: todas</option>
            <option>Operaciones</option>
            <option>Sucursal Centro</option>
            <option>Sucursal Norte</option>
          </select>
          <Input placeholder="Monto mínimo" />
          <BtnPrimary className="lg:col-span-1">Aplicar</BtnPrimary>
        </div>

        <div className="overflow-x-auto -mx-5">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-xs uppercase tracking-wide text-muted-foreground border-b bg-muted/30">
                <th className="text-left px-5 py-2.5">Fecha</th>
                <th className="text-left px-5 py-2.5">Detalle</th>
                <th className="text-left px-5 py-2.5">Subcuenta</th>
                <th className="text-left px-5 py-2.5">Referencia</th>
                <th className="text-right px-5 py-2.5">Monto</th>
                <th className="text-right px-5 py-2.5">Estado</th>
                <th className="px-5 py-2.5"></th>
              </tr>
            </thead>
            <tbody>
              {rows.map((r, i) => {
                const isIn = r.m.startsWith("+");
                return (
                  <tr key={i} className="border-b last:border-0 hover:bg-muted/30">
                    <td className="px-5 py-3 text-muted-foreground text-xs whitespace-nowrap">{r.f}</td>
                    <td className="px-5 py-3">
                      <div className="flex items-center gap-2">
                        <div className={`w-7 h-7 rounded-md flex items-center justify-center ${isIn ? "bg-emerald-50 text-emerald-600" : "bg-red-50 text-red-600"}`}>
                          {isIn ? <ArrowDownLeft size={14} /> : <ArrowUpRight size={14} />}
                        </div>
                        <div>
                          <div className="font-semibold">{r.d}</div>
                          <div className="text-xs text-muted-foreground">{r.t}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-5 py-3 text-muted-foreground text-xs">{r.sc}</td>
                    <td className="px-5 py-3 text-muted-foreground text-xs font-mono">{r.ref}</td>
                    <td className={`px-5 py-3 text-right font-semibold whitespace-nowrap ${isIn ? "text-emerald-700" : ""}`}>$ {r.m.replace(/[+\- ]/g, "")}</td>
                    <td className="px-5 py-3 text-right"><Badge tone={r.e === "OK" ? "success" : "warn"}>{r.e}</Badge></td>
                    <td className="px-5 py-3 text-right">
                      <div className="flex gap-1 justify-end">
                        <button title="Comprobante" className="h-8 w-8 inline-flex items-center justify-center rounded-md border bg-card hover:bg-accent"><FileText size={13} /></button>
                        <button className="h-8 w-8 inline-flex items-center justify-center rounded-md border bg-card hover:bg-accent"><ChevronRight size={13} /></button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        <div className="flex items-center justify-between mt-4 text-xs text-muted-foreground">
          <div>Mostrando 1–8 de 142 movimientos</div>
          <div className="flex gap-1">
            <BtnOutline className="h-8 px-3 text-xs">Anterior</BtnOutline>
            <BtnOutline className="h-8 px-3 text-xs">Siguiente</BtnOutline>
          </div>
        </div>
      </Card>

      <FormDialog
        open={filtrosOpen}
        onClose={() => setFiltrosOpen(false)}
        title="Filtros avanzados"
        description="Combiná criterios para acotar tu historial."
        submitLabel="Aplicar filtros"
        size="lg"
        onSubmit={() => {
          setFiltrosOpen(false);
          toast.success("Filtros avanzados aplicados");
        }}
      >
        <div className="grid grid-cols-2 gap-3">
          <div><Label>Desde</Label><Input type="date" /></div>
          <div><Label>Hasta</Label><Input type="date" /></div>
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div>
            <Label>Tipo</Label>
            <select className="w-full h-10 px-3 rounded-md border bg-card text-sm">
              <option>Todos</option>
              <option>Transferencia</option>
              <option>Cobro</option>
              <option>Link</option>
              <option>Lote</option>
              <option>Servicio</option>
            </select>
          </div>
          <div>
            <Label>Subcuenta</Label>
            <select className="w-full h-10 px-3 rounded-md border bg-card text-sm">
              <option>Todas</option>
              <option>Operaciones</option>
              <option>Sucursal Centro</option>
              <option>Sucursal Norte</option>
            </select>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div><Label>Monto mínimo</Label><Input placeholder="$ 0" /></div>
          <div><Label>Monto máximo</Label><Input placeholder="$ 0" /></div>
        </div>
        <div>
          <Label>Referencia o descripción</Label>
          <Input placeholder="Buscar..." />
        </div>
        <div className="grid grid-cols-2 gap-3 text-xs">
          <label className="flex items-center gap-2"><input type="checkbox" /> Solo ingresos</label>
          <label className="flex items-center gap-2"><input type="checkbox" /> Solo egresos</label>
        </div>
      </FormDialog>

      {preview && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/50" onClick={() => setPreview(false)} />
          <div className="relative bg-card rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-xl">
            <div className="sticky top-0 bg-card border-b px-6 py-4 flex justify-between items-center z-10">
              <div className="font-semibold">Vista previa del reporte</div>
              <BtnOutline className="h-8 px-3 text-xs" onClick={() => setPreview(false)}>Cerrar</BtnOutline>
            </div>
            <div className="p-8 space-y-4">
              <div className="flex items-center justify-between border-b pb-4">
                <MollyLogo />
                <div className="text-right text-xs text-muted-foreground">
                  <div className="font-mono font-semibold text-foreground">{serie}</div>
                  <div>Generado: {new Date().toLocaleString("es-AR")}</div>
                </div>
              </div>
              <h2 className="text-xl font-semibold">Reporte de movimientos</h2>
              <div className="text-sm text-muted-foreground">
                {vista === "principal" ? "Cuenta principal (consolidado)" : `Subcuenta: ${sub}`}
              </div>
              <Card className="bg-muted/30">
                <div className="grid grid-cols-3 gap-4 text-sm">
                  <div><div className="text-xs text-muted-foreground">Ingresos</div><div className="font-semibold">$ 4.220.300</div></div>
                  <div><div className="text-xs text-muted-foreground">Egresos</div><div className="font-semibold">$ 2.180.500</div></div>
                  <div><div className="text-xs text-muted-foreground">Neto</div><div className="font-semibold text-emerald-700">+ $ 2.039.800</div></div>
                </div>
              </Card>
              <div className="text-xs text-muted-foreground border-t pt-3">
                Documento firmado digitalmente por Molly Money Life SA · Serie {serie}
              </div>
              <div className="flex gap-2 pt-2">
                <BtnOutline className="flex-1" onClick={() => setPreview(false)}>Cancelar</BtnOutline>
                <BtnPrimary className="flex-1" onClick={() => { setPreview(false); toast.success(`Reporte ${serie} descargado`); }}>
                  <Download size={14} /> Descargar PDF
                </BtnPrimary>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
