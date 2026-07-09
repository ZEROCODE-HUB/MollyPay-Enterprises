import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import {
  Download, Filter, FileText, ArrowDownLeft, ArrowUpRight,
  ChevronRight, Wallet, X, Eye, FileSpreadsheet,
} from "lucide-react";
import { PageHeader, Card, Input, BtnOutline, BtnPrimary, Badge } from "@/components/portal-shell";
import { toast } from "sonner";
import { FormDialog } from "@/components/form-dialog";
import { MollyLogo } from "@/components/molly-logo";

export const Route = createFileRoute("/app/historial")({ component: Page });

const formatARS = (n: number) =>
  `$ ${n.toLocaleString("es-AR", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;

type Mov = {
  txid: string;
  tipo: "ingreso" | "egreso";
  titular: string;
  cuit: string;
  cbuCvu: string;
  fecha: string;
  monto: number;
  estado: "Acreditado" | "Pendiente" | "Rechazado";
  medio: "Transferencia" | "Cobro QR" | "Link de pago" | "Lote" | "Servicio";
  referencia: string;
  usuario: string;
  numeroOp: string;
  canal: "Web" | "API" | "Móvil";
  subcuenta: string;
};

const movs: Mov[] = [
  { txid: "TX-2026-06-02-8841", tipo: "ingreso", titular: "Carlos Méndez S.A.", cuit: "30-71234567-8", cbuCvu: "0000003100054321678901", fecha: "02/06/2026 14:32", monto: 1840000, estado: "Acreditado", medio: "Cobro QR", referencia: "QR-8821", usuario: "Sistema", numeroOp: "OP-2026-4421", canal: "Web", subcuenta: "Sucursal Centro" },
  { txid: "TX-2026-06-02-8842", tipo: "egreso", titular: "Proveedor SA", cuit: "30-71888888-1", cbuCvu: "0000003100023456789012", fecha: "02/06/2026 11:08", monto: 220000, estado: "Acreditado", medio: "Transferencia", referencia: "TR-9982", usuario: "Admin", numeroOp: "OP-2026-4422", canal: "Web", subcuenta: "Operaciones" },
  { txid: "TX-2026-06-01-8843", tipo: "ingreso", titular: "Consorcio Av. Siempre Viva", cuit: "30-72345678-9", cbuCvu: "0000003100076543210987", fecha: "01/06/2026 18:30", monto: 1480500, estado: "Acreditado", medio: "Lote", referencia: "LT-0034", usuario: "Admin", numeroOp: "OP-2026-4423", canal: "Web", subcuenta: "Operaciones" },
  { txid: "TX-2026-06-01-8844", tipo: "egreso", titular: "Edesur S.A.", cuit: "30-50000000-4", cbuCvu: "0000003100034567890123", fecha: "01/06/2026 16:12", monto: 64320, estado: "Acreditado", medio: "Servicio", referencia: "SV-1102", usuario: "Sistema", numeroOp: "OP-2026-4424", canal: "API", subcuenta: "Sucursal Norte" },
  { txid: "TX-2026-05-31-8845", tipo: "ingreso", titular: "Estudio Ríos Asoc.", cuit: "30-73456789-0", cbuCvu: "0000003100045678901234", fecha: "31/05/2026 14:08", monto: 92800, estado: "Acreditado", medio: "Link de pago", referencia: "LP-9k2x7", usuario: "Sistema", numeroOp: "OP-2026-4425", canal: "Web", subcuenta: "Operaciones" },
  { txid: "TX-2026-05-30-8846", tipo: "egreso", titular: "Estudio Ríos Asoc.", cuit: "30-73456789-0", cbuCvu: "0000003100045678901234", fecha: "30/05/2026 11:22", monto: 145000, estado: "Acreditado", medio: "Transferencia", referencia: "TR-9974", usuario: "Admin", numeroOp: "OP-2026-4426", canal: "Web", subcuenta: "Operaciones" },
  { txid: "TX-2026-05-30-8847", tipo: "ingreso", titular: "Lucía Fernández", cuit: "27-38456789-1", cbuCvu: "0000003100056789012345", fecha: "30/05/2026 09:05", monto: 8200, estado: "Acreditado", medio: "Cobro QR", referencia: "QR-8820", usuario: "Sistema", numeroOp: "OP-2026-4427", canal: "Móvil", subcuenta: "Sucursal Centro" },
  { txid: "TX-2026-05-29-8848", tipo: "egreso", titular: "Juan Pérez", cuit: "20-27890123-4", cbuCvu: "0000003100067890123456", fecha: "29/05/2026 17:44", monto: 35000, estado: "Pendiente", medio: "Transferencia", referencia: "TR-9968", usuario: "Admin", numeroOp: "OP-2026-4428", canal: "Web", subcuenta: "Sucursal Norte" },
  { txid: "TX-2026-05-28-8849", tipo: "ingreso", titular: "Inmobiliaria del Plata", cuit: "30-74567890-1", cbuCvu: "0000003100078901234567", fecha: "28/05/2026 10:30", monto: 2800000, estado: "Acreditado", medio: "Transferencia", referencia: "TR-9967", usuario: "Sistema", numeroOp: "OP-2026-4429", canal: "API", subcuenta: "Operaciones" },
  { txid: "TX-2026-05-27-8850", tipo: "egreso", titular: "AFIP", cuit: "30-50000000-4", cbuCvu: "0000003100089012345678", fecha: "27/05/2026 09:00", monto: 890000, estado: "Acreditado", medio: "Servicio", referencia: "SV-1101", usuario: "Sistema", numeroOp: "OP-2026-4430", canal: "API", subcuenta: "Operaciones" },
  { txid: "TX-2026-05-26-8851", tipo: "ingreso", titular: "Club Social y Deportivo", cuit: "30-75678901-2", cbuCvu: "0000003100090123456789", fecha: "26/05/2026 15:45", monto: 550000, estado: "Acreditado", medio: "Link de pago", referencia: "LP-9k2x6", usuario: "Sistema", numeroOp: "OP-2026-4431", canal: "Web", subcuenta: "Sucursal Centro" },
  { txid: "TX-2026-05-25-8852", tipo: "egreso", titular: "OSECAC", cuit: "30-71000000-0", cbuCvu: "0000003100001234567890", fecha: "25/05/2026 08:30", monto: 420000, estado: "Rechazado", medio: "Transferencia", referencia: "TR-9966", usuario: "Admin", numeroOp: "OP-2026-4432", canal: "Web", subcuenta: "Sucursal Norte" },
];

function parseRowDate(f: string): Date {
  const [d, t] = f.split(" ");
  const [dd, mm, yyyy] = d.split("/").map(Number);
  const [hh, min] = (t ?? "00:00").split(":").map(Number);
  return new Date(yyyy, mm - 1, dd, hh, min);
}

function Page() {
  const [filtrosOpen, setFiltrosOpen] = useState(false);
  const [vista, setVista] = useState<"principal" | "sub">("principal");
  const [sub, setSub] = useState("Operaciones");
  const [preview, setPreview] = useState(false);
  const [detalle, setDetalle] = useState<Mov | null>(null);
  const [desde, setDesde] = useState("");
  const [hasta, setHasta] = useState("");
  const [tipo, setTipo] = useState("Todas");
  const [subFiltro, setSubFiltro] = useState("Todas");
  const [montoMin, setMontoMin] = useState("");
  const [buscar, setBuscar] = useState("");
  const serie = "RP-EMP-2026-000042";

  const filtered = movs.filter((r) => {
    const rd = parseRowDate(r.fecha);
    if (desde) { const d1 = new Date(desde + "T00:00:00"); if (rd < d1) return false; }
    if (hasta) { const d2 = new Date(hasta + "T23:59:59"); if (rd > d2) return false; }
    if (tipo !== "Todas" && r.medio !== tipo) return false;
    if (subFiltro !== "Todas" && r.subcuenta !== subFiltro) return false;
    if (montoMin) { const min = Number(montoMin.replace(/[^\d]/g, "")); if (r.monto < min) return false; }
    if (buscar) {
      const q = buscar.toLowerCase();
      if (
        !r.titular.toLowerCase().includes(q) &&
        !r.referencia.toLowerCase().includes(q) &&
        !r.txid.toLowerCase().includes(q) &&
        !r.numeroOp.toLowerCase().includes(q) &&
        !r.cuit.includes(q)
      ) return false;
    }
    return true;
  });

  const subcuentas = [...new Set(movs.map((m) => m.subcuenta))];

  const totalIngresos = filtered.filter((r) => r.tipo === "ingreso").reduce((s, r) => s + r.monto, 0);
  const totalEgresos = filtered.filter((r) => r.tipo === "egreso").reduce((s, r) => s + r.monto, 0);
  const totalPendientes = filtered.filter((r) => r.estado === "Pendiente" || r.estado === "Rechazado").length;

  return (
    <>
      <PageHeader
        title="Historial"
        description="Auditoría completa de movimientos con filtros, exportación y detalle de transacciones."
        action={
          <div className="flex gap-2">
            <BtnOutline onClick={() => setFiltrosOpen(true)}><Filter size={14} /> Filtros avanzados</BtnOutline>
            <BtnOutline onClick={() => setPreview(true)}><Download size={14} /> Exportar reporte</BtnOutline>
          </div>
        }
      />

      {/* Vista tabs */}
      <Card className="mb-6">
        <div className="flex flex-wrap items-center gap-3">
          <div className="flex items-center gap-2 text-sm">
            <Wallet size={14} className="text-muted-foreground" />
            <span className="font-semibold">Vista:</span>
          </div>
          <div className="flex gap-1.5">
            {([["principal", "Cuenta principal"], ["sub", "Por subcuenta"]] as const).map(([k, l]) => (
              <button
                key={k}
                onClick={() => setVista(k)}
                className={`px-3 py-1.5 rounded-full text-xs font-semibold border ${
                  vista === k
                    ? "bg-[color:var(--brand-soft)] text-[color:var(--brand-dark)] border-transparent"
                    : "bg-card hover:bg-muted"
                }`}
              >
                {l}
              </button>
            ))}
          </div>
          {vista === "sub" && (
            <select value={sub} onChange={(e) => setSub(e.target.value)} className="h-9 px-3 rounded-md border bg-card text-sm">
              {subcuentas.map((s) => <option key={s}>{s}</option>)}
            </select>
          )}
          <span className="ml-auto text-xs text-muted-foreground">
            {vista === "principal" ? "Mostrando consolidado de cuenta madre" : `Filtrando movimientos de ${sub}`}
          </span>
        </div>
      </Card>

      {/* KPIs resumen */}
      <div className="grid md:grid-cols-4 gap-4 mb-6">
        <Card>
          <div className="text-xs text-muted-foreground mb-1">Ingresos del período</div>
          <div className="text-xl md:text-2xl font-bold text-emerald-700">{formatARS(totalIngresos)}</div>
          <div className="text-xs text-muted-foreground mt-0.5">{filtered.filter((r) => r.tipo === "ingreso").length} movimientos</div>
        </Card>
        <Card>
          <div className="text-xs text-muted-foreground mb-1">Egresos del período</div>
          <div className="text-xl md:text-2xl font-bold text-foreground">{formatARS(totalEgresos)}</div>
          <div className="text-xs text-muted-foreground mt-0.5">{filtered.filter((r) => r.tipo === "egreso").length} movimientos</div>
        </Card>
        <Card>
          <div className="text-xs text-muted-foreground mb-1">Neto</div>
          <div className={`text-xl md:text-2xl font-bold ${totalIngresos - totalEgresos >= 0 ? "text-emerald-700" : "text-red-600"}`}>
            {totalIngresos - totalEgresos >= 0 ? "+ " : "- "}{formatARS(Math.abs(totalIngresos - totalEgresos))}
          </div>
        </Card>
        <Card>
          <div className="text-xs text-muted-foreground mb-1">Pendientes / Rechazados</div>
          <div className="text-xl md:text-2xl font-bold text-foreground">{totalPendientes}</div>
          <div className="text-xs text-muted-foreground mt-0.5">{filtered.filter((r) => r.estado === "Pendiente").length} pendientes, {filtered.filter((r) => r.estado === "Rechazado").length} rechazados</div>
        </Card>
      </div>

      {/* Filtros + tabla */}
      <Card>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-2 mb-4">
          <div className="min-w-0">
            <label className="block text-[11px] text-muted-foreground mb-1">Desde</label>
            <Input type="date" value={desde} onChange={(e) => setDesde(e.target.value)} />
          </div>
          <div className="min-w-0">
            <label className="block text-[11px] text-muted-foreground mb-1">Hasta</label>
            <Input type="date" value={hasta} onChange={(e) => setHasta(e.target.value)} min={desde || undefined} />
          </div>
          <div className="min-w-0">
            <label className="block text-[11px] text-muted-foreground mb-1">Medio</label>
            <select value={tipo} onChange={(e) => setTipo(e.target.value)} className="w-full h-10 px-3 rounded-md border bg-card text-sm">
              <option value="Todas">Todos</option>
              <option>Transferencia</option>
              <option>Cobro QR</option>
              <option>Link de pago</option>
              <option>Lote</option>
              <option>Servicio</option>
            </select>
          </div>
          <div className="min-w-0">
            <label className="block text-[11px] text-muted-foreground mb-1">Subcuenta</label>
            <select value={subFiltro} onChange={(e) => setSubFiltro(e.target.value)} className="w-full h-10 px-3 rounded-md border bg-card text-sm">
              <option value="Todas">Todas</option>
              {subcuentas.map((s) => <option key={s}>{s}</option>)}
            </select>
          </div>
          <div className="min-w-0">
            <label className="block text-[11px] text-muted-foreground mb-1">Monto mínimo</label>
            <Input placeholder="$ 0" value={montoMin} onChange={(e) => setMontoMin(e.target.value)} />
          </div>
          <div className="min-w-0">
            <label className="block text-[11px] text-muted-foreground mb-1">Buscar</label>
            <Input placeholder="Titular, TXID, ref..." value={buscar} onChange={(e) => setBuscar(e.target.value)} />
          </div>
        </div>
        <div className="flex justify-end mb-3">
          <BtnOutline className="h-8 px-3 text-xs" onClick={() => { setDesde(""); setHasta(""); setTipo("Todas"); setSubFiltro("Todas"); setMontoMin(""); setBuscar(""); }}>
            Limpiar filtros
          </BtnOutline>
        </div>

        {/* Tabla */}
        <div className="overflow-x-auto -mx-5">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-xs uppercase tracking-wide text-muted-foreground border-b bg-muted/30">
                <th className="text-left px-4 py-2.5">Movimiento</th>
                <th className="text-left px-4 py-2.5">TXID</th>
                <th className="text-left px-4 py-2.5">CBU / CVU</th>
                <th className="text-left px-4 py-2.5">Titular</th>
                <th className="text-left px-4 py-2.5">CUIT</th>
                <th className="text-left px-4 py-2.5">Fecha</th>
                <th className="text-right px-4 py-2.5">Monto</th>
                <th className="px-4 py-2.5"></th>
              </tr>
            </thead>
            <tbody>
              {filtered.length === 0 && (
                <tr>
                  <td colSpan={8} className="text-center py-8 text-sm text-muted-foreground">
                    No hay movimientos que coincidan con los filtros.
                  </td>
                </tr>
              )}
              {filtered.map((r, i) => (
                <tr key={i} className="border-b last:border-0 hover:bg-muted/30">
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2 min-w-0 max-w-[200px]">
                      <div className={`w-8 h-8 rounded-md flex items-center justify-center shrink-0 ${
                        r.tipo === "ingreso" ? "bg-emerald-50 text-emerald-600" : "bg-red-50 text-red-600"
                      }`}>
                        {r.tipo === "ingreso" ? <ArrowDownLeft size={15} /> : <ArrowUpRight size={15} />}
                      </div>
                      <div className="min-w-0">
                        <div className="font-semibold text-xs truncate">
                          {r.tipo === "ingreso" ? "Recibiste dinero" : "Enviaste dinero"}
                        </div>
                        <div className="text-[10px] text-muted-foreground truncate">{r.medio}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-xs font-mono text-muted-foreground">{r.txid}</td>
                  <td className="px-4 py-3 text-xs font-mono text-muted-foreground max-w-[140px] truncate">{r.cbuCvu}</td>
                  <td className="px-4 py-3 text-sm font-medium truncate max-w-[150px]">{r.titular}</td>
                  <td className="px-4 py-3 text-xs font-mono text-muted-foreground">{r.cuit}</td>
                  <td className="px-4 py-3 text-xs text-muted-foreground whitespace-nowrap">{r.fecha}</td>
                  <td className={`px-4 py-3 text-right font-semibold whitespace-nowrap text-sm ${r.tipo === "ingreso" ? "text-emerald-700" : ""}`}>
                    {r.tipo === "ingreso" ? "+ " : "- "}{formatARS(r.monto)}
                  </td>
                  <td className="px-4 py-3 text-right">
                    <div className="flex gap-1 justify-end">
                      <button
                        title="Ver detalle"
                        onClick={() => setDetalle(r)}
                        className="h-8 w-8 inline-flex items-center justify-center rounded-md border bg-card hover:bg-accent"
                      >
                        <Eye size={13} />
                      </button>
                      <button title="Comprobante" className="h-8 w-8 inline-flex items-center justify-center rounded-md border bg-card hover:bg-accent">
                        <FileText size={13} />
                      </button>
                      <button className="h-8 w-8 inline-flex items-center justify-center rounded-md border bg-card hover:bg-accent">
                        <ChevronRight size={13} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="flex items-center justify-between mt-4 text-xs text-muted-foreground">
          <div>Mostrando {filtered.length} de {movs.length} movimientos</div>
          <div className="flex gap-1">
            <BtnOutline className="h-8 px-3 text-xs">Anterior</BtnOutline>
            <BtnOutline className="h-8 px-3 text-xs">Siguiente</BtnOutline>
          </div>
        </div>
      </Card>

      {/* Modal detalle */}
      {detalle && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/50" onClick={() => setDetalle(null)} />
          <div className="relative bg-card rounded-lg max-w-lg w-full max-h-[90vh] overflow-y-auto shadow-xl">
            <div className="sticky top-0 bg-card border-b px-6 py-4 flex justify-between items-center z-10">
              <div className="font-semibold">Detalle de transacción</div>
              <button onClick={() => setDetalle(null)} className="h-8 w-8 inline-flex items-center justify-center rounded-md hover:bg-accent">
                <X size={16} />
              </button>
            </div>
            <div className="p-6 space-y-5">
              <div className="flex items-center gap-3 pb-4 border-b">
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                  detalle.tipo === "ingreso" ? "bg-emerald-50 text-emerald-600" : "bg-red-50 text-red-600"
                }`}>
                  {detalle.tipo === "ingreso" ? <ArrowDownLeft size={22} /> : <ArrowUpRight size={22} />}
                </div>
                <div>
                  <div className="text-lg font-bold">
                    {detalle.tipo === "ingreso" ? "Recibiste dinero" : "Enviaste dinero"}
                  </div>
                  <div className="text-sm text-muted-foreground">{detalle.medio} · {detalle.fecha}</div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <div className="text-xs text-muted-foreground">TXID</div>
                  <div className="font-mono font-medium text-xs break-all">{detalle.txid}</div>
                </div>
                <div>
                  <div className="text-xs text-muted-foreground">Número de operación</div>
                  <div className="font-medium">{detalle.numeroOp}</div>
                </div>
                <div>
                  <div className="text-xs text-muted-foreground">CBU / CVU</div>
                  <div className="font-mono text-xs break-all">{detalle.cbuCvu}</div>
                </div>
                <div>
                  <div className="text-xs text-muted-foreground">CUIT</div>
                  <div className="font-mono">{detalle.cuit}</div>
                </div>
                <div className="col-span-2">
                  <div className="text-xs text-muted-foreground">Titular</div>
                  <div className="font-medium">{detalle.titular}</div>
                </div>
                <div>
                  <div className="text-xs text-muted-foreground">Estado</div>
                  <Badge tone={detalle.estado === "Acreditado" ? "success" : detalle.estado === "Pendiente" ? "warn" : "danger"}>{detalle.estado}</Badge>
                </div>
                <div>
                  <div className="text-xs text-muted-foreground">Monto</div>
                  <div className={`text-lg font-bold ${detalle.tipo === "ingreso" ? "text-emerald-700" : ""}`}>
                    {detalle.tipo === "ingreso" ? "+ " : "- "}{formatARS(detalle.monto)}
                  </div>
                </div>
                <div>
                  <div className="text-xs text-muted-foreground">Referencia</div>
                  <div className="font-mono text-xs">{detalle.referencia}</div>
                </div>
                <div>
                  <div className="text-xs text-muted-foreground">Canal de origen</div>
                  <div>{detalle.canal}</div>
                </div>
                <div>
                  <div className="text-xs text-muted-foreground">Usuario</div>
                  <div>{detalle.usuario}</div>
                </div>
                <div>
                  <div className="text-xs text-muted-foreground">Subcuenta</div>
                  <div>{detalle.subcuenta}</div>
                </div>
              </div>

              <div className="flex gap-2 pt-3 border-t">
                <BtnOutline className="flex-1" onClick={() => { setDetalle(null); toast.success("Comprobante descargado"); }}>
                  <FileText size={14} /> Comprobante
                </BtnOutline>
                <BtnPrimary className="flex-1" onClick={() => setDetalle(null)}>
                  Cerrar
                </BtnPrimary>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Filtros avanzados */}
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
          <div><label className="block text-xs text-muted-foreground mb-1">Desde</label><Input type="date" /></div>
          <div><label className="block text-xs text-muted-foreground mb-1">Hasta</label><Input type="date" /></div>
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block text-xs text-muted-foreground mb-1">Medio</label>
            <select className="w-full h-10 px-3 rounded-md border bg-card text-sm">
              <option>Todos</option>
              <option>Transferencia</option>
              <option>Cobro QR</option>
              <option>Link de pago</option>
              <option>Lote</option>
              <option>Servicio</option>
            </select>
          </div>
          <div>
            <label className="block text-xs text-muted-foreground mb-1">Estado</label>
            <select className="w-full h-10 px-3 rounded-md border bg-card text-sm">
              <option>Todos</option>
              <option>Acreditado</option>
              <option>Pendiente</option>
              <option>Rechazado</option>
            </select>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div><label className="block text-xs text-muted-foreground mb-1">Monto mínimo</label><Input placeholder="$ 0" /></div>
          <div><label className="block text-xs text-muted-foreground mb-1">Monto máximo</label><Input placeholder="$ 0" /></div>
        </div>
        <div>
          <label className="block text-xs text-muted-foreground mb-1">Referencia o descripción</label>
          <Input placeholder="Buscar..." />
        </div>
        <div className="grid grid-cols-2 gap-3 text-xs">
          <label className="flex items-center gap-2"><input type="checkbox" /> Solo ingresos</label>
          <label className="flex items-center gap-2"><input type="checkbox" /> Solo egresos</label>
        </div>
        <div className="grid grid-cols-2 gap-3 text-xs">
          <label className="flex items-center gap-2"><input type="checkbox" /> Solo acreditados</label>
          <label className="flex items-center gap-2"><input type="checkbox" /> Solo pendientes</label>
        </div>
      </FormDialog>

      {/* Preview reporte */}
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
                  <div><div className="text-xs text-muted-foreground">Ingresos</div><div className="font-semibold">{formatARS(totalIngresos)}</div></div>
                  <div><div className="text-xs text-muted-foreground">Egresos</div><div className="font-semibold">{formatARS(totalEgresos)}</div></div>
                  <div><div className="text-xs text-muted-foreground">Neto</div><div className="font-semibold text-emerald-700">{totalIngresos - totalEgresos >= 0 ? "+ " : "- "}{formatARS(Math.abs(totalIngresos - totalEgresos))}</div></div>
                </div>
              </Card>
              <div className="text-xs text-muted-foreground border-t pt-3">
                Documento firmado digitalmente por Molly Money Life SA · Serie {serie}
              </div>
              <div className="flex gap-2 pt-2">
                <div className="flex-1 grid grid-cols-2 gap-2">
                  <BtnOutline onClick={() => { setPreview(false); toast.success("Reporte Excel descargado"); }}>
                    <FileSpreadsheet size={14} /> Excel
                  </BtnOutline>
                  <BtnPrimary onClick={() => { setPreview(false); toast.success(`Reporte ${serie} descargado`); }}>
                    <Download size={14} /> PDF
                  </BtnPrimary>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
