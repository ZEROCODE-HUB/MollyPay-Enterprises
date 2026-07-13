import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState, useMemo } from "react";
import { Plus, Eye, FileSpreadsheet, Download, Search, Filter } from "lucide-react";
import { Card, BtnPrimary, BtnOutline, Input } from "@/components/portal-shell";
import {
  getLotesGestion,
  formatARS,
  estadoCatalogo,
  type LoteEstado,
  type LoteGestionRow,
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
    return data;
  }, [busqueda, filtroEstado]);

  const exportExcel = () => {
    const rows = lotes.map((l) => ({
      ID: l.id,
      Nombre: l.nombre,
      Período: l.periodo,
      Estado: ESTADO_LABEL[l.estado],
      "Fecha creación": l.createdAt,
      "Fecha finalización": l.fechaFinalizacion ?? "-",
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
    <div>
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
          <div className="relative flex-1 min-w-[200px]">
            <Search
              size={14}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
            />
            <Input
              placeholder="Buscar por nombre, ID o período..."
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
                  Fecha creación
                </th>
                <th className="text-left px-5 py-3 font-semibold text-xs uppercase tracking-wider text-muted-foreground">
                  Finalización
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
                  Acción
                </th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {lotes.map((l) => (
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
                    <button
                      onClick={() =>
                        navigate({ to: "/app/cobros/gestion/$id", params: { id: l.id } })
                      }
                      className="inline-flex items-center justify-center w-8 h-8 rounded-md hover:bg-muted transition"
                      title="Ver detalle"
                    >
                      <Eye size={15} className="text-muted-foreground" />
                    </button>
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
    </div>
  );
}
