import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState, useMemo, useEffect } from "react";
import { Plus, Eye, FileSpreadsheet, Download, Search, Filter, X } from "lucide-react";
import { Card, BtnPrimary, BtnOutline, Input, Label, Badge } from "@/components/portal-shell";
import {
  getLotesGestion,
  getLoteById,
  getRegistrosByLoteId,
  getPagosByRegistroId,
  getCBUById,
  formatARS,
  estadoCatalogo,
  type LoteEstado,
  type LoteGestionRow,
  type Lote,
  type RegistroDeLote,
} from "@/data/cobros-masivos";
import * as XLSX from "xlsx";
import jsPDF from "jspdf";
import "jspdf-autotable";

export const Route = createFileRoute("/app/cobros/gestion")({ component: GestionLotes });

const ESTADO_BADGE: Record<LoteEstado, string> = {
  cargado: "bg-muted text-muted-foreground",
  en_proceso: "bg-amber-100 text-amber-800",
  finalizado: "bg-emerald-100 text-emerald-700",
  pausado: "bg-blue-100 text-blue-700",
  eliminado: "bg-red-100 text-red-700",
  error: "bg-red-100 text-red-700",
};

const ESTADO_LABEL: Record<LoteEstado, string> = {
  cargado: "Cargado / Pendiente",
  en_proceso: "En proceso",
  finalizado: "Finalizado",
  pausado: "Pausado",
  eliminado: "Eliminado",
  error: "Con error",
};

const estados = Object.keys(estadoCatalogo) as LoteEstado[];

function GestionLotes() {
  const navigate = useNavigate();
  const [busqueda, setBusqueda] = useState("");
  const [filtroEstado, setFiltroEstado] = useState<LoteEstado | "todos">("todos");
  const [fechaDesde, setFechaDesde] = useState("");
  const [fechaHasta, setFechaHasta] = useState("");
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [detalleLote, setDetalleLote] = useState<Lote | null>(null);
  const [detalleOpen, setDetalleOpen] = useState(false);

  const lotes = useMemo(() => {
    let data = getLotesGestion();
    if (busqueda) {
      const q = busqueda.toLowerCase();
      data = data.filter(
        (l) =>
          l.nombre.toLowerCase().includes(q) ||
          l.id.toLowerCase().includes(q) ||
          l.periodo.includes(q),
      );
    }
    if (filtroEstado !== "todos") {
      data = data.filter((l) => l.estado === filtroEstado);
    }
    if (fechaDesde) {
      data = data.filter((l) => l.createdAt.slice(0, 10) >= fechaDesde);
    }
    if (fechaHasta) {
      data = data.filter((l) => l.createdAt.slice(0, 10) <= fechaHasta);
    }
    return data;
  }, [busqueda, filtroEstado, fechaDesde, fechaHasta]);

  useEffect(() => { setPage(1); }, [busqueda, filtroEstado, fechaDesde, fechaHasta]);

  const totalPages = Math.max(1, Math.ceil(lotes.length / pageSize));
  const paginated = lotes.slice((page - 1) * pageSize, page * pageSize);

  const abrirDetalle = (id: string) => {
    const lote = getLoteById(id);
    if (lote) {
      setDetalleLote(lote);
      setDetalleOpen(true);
    }
  };

  const ROWS_OPTIONS = [10, 20, 50];

  const exportExcel = () => {
    const rows = lotes.map((l) => ({
      ID: l.id,
      Nombre: l.nombre,
      Periodo: l.periodo,
      Estado: ESTADO_LABEL[l.estado],
      "Fecha creacion": l.createdAt,
      "Fecha finalizacion": l.fechaFinalizacion ?? "-",
      Progreso: `${l.progreso}%`,
      "Pagos completos": l.cantidadPagos,
      "Pagos parciales": l.cantidadParciales,
      Pendientes: l.cantidadPendientes,
      "Monto total": l.montoTotal,
      "Monto cobrado": l.montoCobrado,
      "Por cobrar": l.montoPorCobrar,
    }));
    const ws = XLSX.utils.json_to_sheet(rows);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Lotes");
    XLSX.writeFile(wb, "cobros-masivos-lotes.xlsx");
  };

  const exportPDF = () => {
    const doc = new jsPDF("landscape");
    doc.text("Reporte de Lotes - Cobros Masivos", 14, 20);
    const total = lotes.reduce((s, l) => s + l.montoTotal, 0);
    const cobrado = lotes.reduce((s, l) => s + l.montoCobrado, 0);
    doc.text(
      `Monto total: ${formatARS(total)} | Cobrado: ${formatARS(cobrado)} | Tasa: ${total > 0 ? Math.round((cobrado / total) * 100) : 0}%`,
      14,
      30,
    );
    const body = lotes.map((l) => [
      l.nombre,
      ESTADO_LABEL[l.estado],
      `${l.progreso}%`,
      formatARS(l.montoTotal),
      formatARS(l.montoCobrado),
    ]);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (doc as any).autoTable({
      startY: 38,
      head: [["Nombre", "Estado", "Progreso", "Monto total", "Cobrado"]],
      body,
    });
    doc.save("cobros-masivos-lotes.pdf");
  };

  return (
    <>
      {/* Acciones globales */}
      <div className="flex flex-wrap gap-3 mb-6 items-center">
        <BtnPrimary onClick={() => navigate({ to: "/app/cobros/nuevo" })}>
          <Plus size={16} /> Nuevo lote
        </BtnPrimary>
        <BtnOutline className="h-9 px-3 text-xs" onClick={exportExcel}>
          <FileSpreadsheet size={14} /> Excel
        </BtnOutline>
        <BtnOutline className="h-9 px-3 text-xs" onClick={exportPDF}>
          <Download size={14} /> PDF
        </BtnOutline>
      </div>

      {/* Filtros */}
      <Card className="mb-6">
        <div className="flex flex-wrap gap-3 items-center">
          <div className="relative w-full sm:flex-1 sm:min-w-[200px]">
            <Search
              size={14}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
            />
            <Input
              placeholder="Buscar por nombre, ID o periodo..."
              value={busqueda}
              onChange={(e) => setBusqueda(e.target.value)}
              className="pl-9 text-sm"
            />
          </div>
          <div className="flex items-center gap-2">
            <Filter size={14} className="text-muted-foreground" />
            <select
              value={filtroEstado}
              onChange={(e) => setFiltroEstado(e.target.value as LoteEstado | "todos")}
              className="h-10 px-3 rounded-md border bg-card text-sm"
            >
              <option value="todos">Todos los estados</option>
              {estados.map((e) => (
                <option key={e} value={e}>
                  {ESTADO_LABEL[e]}
                </option>
              ))}
            </select>
          </div>
          <div className="flex items-center gap-1.5">
            <Label>Desde</Label>
            <Input
              type="date"
              value={fechaDesde}
              onChange={(e) => setFechaDesde(e.target.value)}
              className="h-9 w-36 text-xs"
            />
          </div>
          <div className="flex items-center gap-1.5">
            <Label>Hasta</Label>
            <Input
              type="date"
              value={fechaHasta}
              onChange={(e) => setFechaHasta(e.target.value)}
              className="h-9 w-36 text-xs"
            />
          </div>
        </div>
      </Card>

      {/* Tabla de lotes */}
      <Card className="p-0 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b bg-muted/50">
                <th className="text-left px-5 py-3 font-semibold text-xs uppercase tracking-wider text-muted-foreground">
                  Nombre
                </th>
                <th className="text-left px-5 py-3 font-semibold text-xs uppercase tracking-wider text-muted-foreground">
                  Fecha creacion
                </th>
                <th className="text-left px-5 py-3 font-semibold text-xs uppercase tracking-wider text-muted-foreground">
                  Finalizacion
                </th>
                <th className="text-left px-5 py-3 font-semibold text-xs uppercase tracking-wider text-muted-foreground">
                  Estado
                </th>
                <th className="text-left px-5 py-3 font-semibold text-xs uppercase tracking-wider text-muted-foreground">
                  Progreso
                </th>
                <th className="text-right px-5 py-3 font-semibold text-xs uppercase tracking-wider text-muted-foreground">
                  Pagos
                </th>
                <th className="text-right px-5 py-3 font-semibold text-xs uppercase tracking-wider text-muted-foreground">
                  Parciales
                </th>
                <th className="text-right px-5 py-3 font-semibold text-xs uppercase tracking-wider text-muted-foreground">
                  Pend.
                </th>
                <th className="text-right px-5 py-3 font-semibold text-xs uppercase tracking-wider text-muted-foreground">
                  Monto total
                </th>
                <th className="text-right px-5 py-3 font-semibold text-xs uppercase tracking-wider text-muted-foreground">
                  Cobrado
                </th>
                <th className="text-right px-5 py-3 font-semibold text-xs uppercase tracking-wider text-muted-foreground">
                  Por cobrar
                </th>
                <th className="text-center px-5 py-3 font-semibold text-xs uppercase tracking-wider text-muted-foreground">
                  Accion
                </th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {paginated.map((l) => (
                <tr key={l.id} className="hover:bg-muted/30 transition-colors">
                  <td className="px-5 py-3 font-semibold">{l.nombre}</td>
                  <td className="px-5 py-3 text-xs text-muted-foreground">
                    {l.createdAt.slice(0, 10)}
                  </td>
                  <td className="px-5 py-3 text-xs text-muted-foreground">
                    {l.fechaFinalizacion?.slice(0, 10) ?? "-"}
                  </td>
                  <td className="px-5 py-3">
                    <span
                      className={`inline-block px-2 py-0.5 rounded-full text-[11px] font-semibold ${
                        ESTADO_BADGE[l.estado]
                      }`}
                    >
                      {ESTADO_LABEL[l.estado]}
                    </span>
                  </td>
                  <td className="px-5 py-3">
                    <div className="flex items-center gap-2">
                      <div className="w-16 h-2 rounded-full bg-muted overflow-hidden">
                        <div
                          className="h-full rounded-full bg-primary"
                          style={{ width: `${l.progreso}%` }}
                        />
                      </div>
                      <span className="text-xs font-semibold">{l.progreso}%</span>
                    </div>
                  </td>
                  <td className="px-5 py-3 text-right">{l.cantidadPagos}</td>
                  <td className="px-5 py-3 text-right text-amber-600">{l.cantidadParciales}</td>
                  <td className="px-5 py-3 text-right text-muted-foreground">
                    {l.cantidadPendientes}
                  </td>
                  <td className="px-5 py-3 text-right font-semibold">{formatARS(l.montoTotal)}</td>
                  <td className="px-5 py-3 text-right text-emerald-600 font-semibold">
                    {formatARS(l.montoCobrado)}
                  </td>
                  <td className="px-5 py-3 text-right text-amber-600 font-semibold">
                    {formatARS(l.montoPorCobrar)}
                  </td>
                  <td className="px-5 py-3 text-center">
                    <BtnOutline
                      onClick={() => abrirDetalle(l.id)}
                      className="h-8 px-2.5 text-xs"
                      title="Ver detalle"
                    >
                      <Eye size={14} /> Ver
                    </BtnOutline>
                  </td>
                </tr>
              ))}
              {lotes.length === 0 && (
                <tr>
                  <td colSpan={12} className="px-5 py-8 text-center text-sm text-muted-foreground">
                    No se encontraron lotes con los filtros aplicados.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Paginacion */}
      <div className="flex flex-wrap items-center justify-between gap-4 mt-4">
        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          <span>Filas por pagina:</span>
          <select
            className="h-8 px-2 rounded border bg-card text-xs"
            value={pageSize}
            onChange={(e) => { setPageSize(Number(e.target.value)); setPage(1); }}
          >
            {ROWS_OPTIONS.map((n) => (
              <option key={n} value={n}>{n}</option>
            ))}
          </select>
          <span>
            {lotes.length === 0
              ? "0 registros"
              : `${(page - 1) * pageSize + 1}–${Math.min(page * pageSize, lotes.length)} de ${lotes.length}`}
          </span>
        </div>
        <div className="flex gap-1">
          <BtnOutline className="h-8 px-3 text-xs" disabled={page <= 1} onClick={() => setPage(1)}>
            Primero
          </BtnOutline>
          <BtnOutline className="h-8 px-3 text-xs" disabled={page <= 1} onClick={() => setPage((p) => Math.max(1, p - 1))}>
            Anterior
          </BtnOutline>
          <span className="flex items-center px-3 text-xs text-muted-foreground">
            {page} / {totalPages}
          </span>
          <BtnOutline className="h-8 px-3 text-xs" disabled={page >= totalPages} onClick={() => setPage((p) => Math.min(totalPages, p + 1))}>
            Siguiente
          </BtnOutline>
          <BtnOutline className="h-8 px-3 text-xs" disabled={page >= totalPages} onClick={() => setPage(totalPages)}>
            Ultimo
          </BtnOutline>
        </div>
      </div>

      {/* Modal: Detalle del lote */}
      {detalleOpen && detalleLote && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/50" onClick={() => setDetalleOpen(false)} />
          <div className="relative bg-card rounded-lg max-w-3xl w-full max-h-[85vh] overflow-y-auto shadow-xl">
            <div className="sticky top-0 bg-card border-b px-6 py-4 flex justify-between items-center z-10">
              <div>
                <h3 className="font-semibold text-lg">{detalleLote.nombre}</h3>
                <p className="text-xs text-muted-foreground">ID: {detalleLote.id} · Periodo: {detalleLote.periodo}</p>
              </div>
              <button onClick={() => setDetalleOpen(false)} className="p-1.5 hover:bg-muted rounded-md">
                <X size={18} />
              </button>
            </div>
            <div className="p-6 space-y-6">
              {/* Resumen */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {[
                  ["Total registros", String(getRegistrosByLoteId(detalleLote.id).length), ""],
                  ["Cobrados", String(getRegistrosByLoteId(detalleLote.id).filter((r) => r.estado === "pagado_total").length), "text-emerald-600"],
                  ["Pendientes", String(getRegistrosByLoteId(detalleLote.id).filter((r) => r.estado === "pendiente" || r.estado === "vencido").length), "text-amber-600"],
                  ["Monto total", formatARS(getRegistrosByLoteId(detalleLote.id).reduce((s, r) => s + r.monto, 0)), ""],
                ].map(([label, value, color]) => (
                  <div key={label} className="bg-muted/30 rounded-lg p-3 text-center">
                    <div className="text-xs text-muted-foreground">{label}</div>
                    <div className={`text-lg font-semibold mt-0.5 ${color}`}>{value}</div>
                  </div>
                ))}
              </div>

              {/* Registros */}
              <div>
                <h4 className="text-sm font-semibold mb-3">Registros del lote ({getRegistrosByLoteId(detalleLote.id).length})</h4>
                <div className="overflow-x-auto border rounded-lg">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="text-[11px] uppercase tracking-wide text-muted-foreground border-b bg-muted/30">
                        <th className="text-left px-4 py-2.5">CBU destino</th>
                        <th className="text-left px-4 py-2.5">Titular</th>
                        <th className="text-right px-4 py-2.5">Monto</th>
                        <th className="text-right px-4 py-2.5">Cobrado</th>
                        <th className="text-center px-4 py-2.5">Estado</th>
                      </tr>
                    </thead>
                    <tbody>
                      {getRegistrosByLoteId(detalleLote.id).map((r) => {
                        const cbu = r.cbuId ? getCBUById(r.cbuId) : null;
                        return (
                          <tr key={r.id} className="border-b last:border-0 hover:bg-muted/30">
                            <td className="px-4 py-2.5 font-mono text-xs">{cbu?.cbu ?? r.cbuId ?? "-"}</td>
                            <td className="px-4 py-2.5 text-xs">{cbu?.alias ?? (r.identificacionUsuario || "-")}</td>
                            <td className="px-4 py-2.5 text-right font-semibold">{formatARS(r.monto)}</td>
                            <td className="px-4 py-2.5 text-right text-emerald-600">{formatARS(r.montoPagado)}</td>
                            <td className="px-4 py-2.5 text-center">
                              <span className={`inline-block px-2 py-0.5 rounded-full text-[10px] font-semibold ${
                                r.estado === "pagado_total" ? "bg-emerald-100 text-emerald-700" :
                                r.estado === "pagado_parcial" ? "bg-blue-100 text-blue-700" :
                                r.estado === "vencido" || r.estado === "error" ? "bg-red-100 text-red-700" :
                                "bg-amber-100 text-amber-800"
                              }`}>
                                {r.estado === "pagado_total" ? "Pagado" :
                                 r.estado === "pagado_parcial" ? "Parcial" :
                                 r.estado === "vencido" ? "Vencido" :
                                 r.estado === "error" ? "Error" : "Pendiente"}
                              </span>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
