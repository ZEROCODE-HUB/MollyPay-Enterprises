import { createFileRoute, Link } from "@tanstack/react-router";
import { useState, useMemo } from "react";
import {
  RefreshCw, Pause, Key, ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight,
  Server, Webhook, ShieldCheck, Globe,
} from "lucide-react";
import { Card, Badge, BtnOutline } from "@/components/portal-shell";
import { toast } from "sonner";

export const Route = createFileRoute("/app/link-pago/e-commerce")({ component: Page });

type Ecom = {
  id: string;
  name: string;
  estado: "Habilitado" | "Deshabilitado";
  created: string;
};

const ecoms: Ecom[] = [
  { id: "shopify", name: "Shopify", estado: "Habilitado", created: "12 ago 2025, 11:52" },
  { id: "woocommerce", name: "WooCommerce", estado: "Habilitado", created: "10 jun 2025, 09:14" },
  { id: "magento", name: "Magento", estado: "Deshabilitado", created: "03 mar 2025, 16:30" },
  { id: "prestashop", name: "PrestaShop", estado: "Habilitado", created: "20 ene 2025, 08:45" },
  { id: "vtiger", name: "VTiger", estado: "Deshabilitado", created: "15 dic 2024, 14:00" },
  { id: "tiendanube", name: "Tiendanube", estado: "Habilitado", created: "05 nov 2024, 10:30" },
  { id: "mercadoshops", name: "Mercado Shops", estado: "Habilitado", created: "22 oct 2024, 11:20" },
  { id: "sellix", name: "Sellix", estado: "Deshabilitado", created: "08 sep 2024, 09:00" },
  { id: "bigcommerce", name: "BigCommerce", estado: "Habilitado", created: "01 ago 2024, 15:10" },
  { id: "opencart", name: "OpenCart", estado: "Deshabilitado", created: "14 jul 2024, 12:25" },
  { id: "wixstores", name: "Wix Stores", estado: "Habilitado", created: "30 jun 2024, 18:00" },
  { id: "ecwid", name: "Ecwid", estado: "Habilitado", created: "12 may 2024, 07:35" },
];

const PAGE_SIZES = [10, 20, 50];

function Page() {
  const [list, setList] = useState(ecoms);
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(10);

  const totalPages = Math.ceil(list.length / pageSize);
  const paginated = useMemo(
    () => list.slice(page * pageSize, (page + 1) * pageSize),
    [list, page, pageSize],
  );

  const toggleEstado = (id: string) => {
    setList((prev) =>
      prev.map((e) =>
        e.id === id
          ? { ...e, estado: e.estado === "Habilitado" ? "Deshabilitado" : "Habilitado" as const }
          : e,
      ),
    );
    const e = list.find((x) => x.id === id);
    toast.success(`${e?.name} ${e?.estado === "Habilitado" ? "deshabilitada" : "habilitada"}`);
  };

  return (
    <>
      {/* Breadcrumb */}
      <nav className="text-xs text-muted-foreground mb-4 flex items-center gap-1.5">
        <Link to="/app" className="hover:text-foreground transition">Inicio</Link>
        <span>/</span>
        <span className="text-muted-foreground/60">Business</span>
        <span>/</span>
        <Link to="/app/link-pago" className="hover:text-foreground transition">BLP</Link>
        <span>/</span>
        <span className="text-foreground font-semibold">E-commerce</span>
      </nav>

      {/* Title */}
      <div className="mb-6">
        <h1 className="text-xl font-semibold">E-commerce</h1>
        <p className="text-sm text-muted-foreground mt-1">
          Gestiona las integraciones de pago para tu tienda online.
        </p>
      </div>

      {/* Card */}
      <Card className="p-0 overflow-hidden">
        <div className="px-5 py-4 border-b flex items-center justify-between gap-3">
          <h2 className="text-sm font-semibold">Integraciones de E-commerce</h2>
          <BtnOutline className="h-8 px-3 text-[11px]" onClick={() => toast.success("Catálogo actualizado (demo)")}>
            <RefreshCw size={12} /> ACTUALIZAR
          </BtnOutline>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-[11px] uppercase tracking-wide text-muted-foreground border-b bg-muted/30">
                <th className="text-left px-5 py-2.5">E-commerce</th>
                <th className="text-left px-5 py-2.5">Estado</th>
                <th className="text-left px-5 py-2.5">Fecha de Creación</th>
                <th className="text-right px-5 py-2.5">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {paginated.map((e) => (
                <tr key={e.id} className="border-b last:border-0 hover:bg-muted/30">
                  <td className="px-5 py-3 font-semibold">{e.name}</td>
                  <td className="px-5 py-3">
                    <Badge tone={e.estado === "Habilitado" ? "success" : "neutral"}>{e.estado}</Badge>
                  </td>
                  <td className="px-5 py-3 text-sm text-muted-foreground">{e.created}</td>
                  <td className="px-5 py-3 text-right">
                    <div className="flex gap-1 justify-end">
                      <button
                        onClick={() => toggleEstado(e.id)}
                        className="h-8 px-2.5 inline-flex items-center gap-1.5 rounded-md border bg-card hover:bg-red-50 hover:text-red-600 transition text-xs font-semibold text-muted-foreground"
                      >
                        <Pause size={12} /> DESHABILITAR
                      </button>
                      <button
                        onClick={() => toast.success(`Nueva clave generada para ${e.name} (demo)`)}
                        className="h-8 px-2.5 inline-flex items-center gap-1.5 rounded-md border bg-card hover:bg-orange-50 hover:text-orange-600 transition text-xs font-semibold text-muted-foreground"
                      >
                        <Key size={12} /> ACTUALIZAR CLAVE
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="px-5 py-3 border-t flex items-center justify-between gap-3 flex-wrap">
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <span>Items per page:</span>
            <select
              value={pageSize}
              onChange={(e) => { setPageSize(Number(e.target.value)); setPage(0); }}
              className="h-8 px-2 rounded border bg-card text-xs"
            >
              {PAGE_SIZES.map((s) => <option key={s} value={s}>{s}</option>)}
            </select>
            <span>
              {list.length === 0 ? "0" : page * pageSize + 1}–{Math.min((page + 1) * pageSize, list.length)} of {list.length}
            </span>
          </div>
          <div className="flex gap-1">
            <button
              onClick={() => setPage(0)}
              disabled={page === 0}
              className="h-8 w-8 inline-flex items-center justify-center rounded border bg-card hover:bg-muted transition disabled:opacity-30 disabled:cursor-not-allowed"
            >
              <ChevronsLeft size={14} />
            </button>
            <button
              onClick={() => setPage((p) => Math.max(0, p - 1))}
              disabled={page === 0}
              className="h-8 w-8 inline-flex items-center justify-center rounded border bg-card hover:bg-muted transition disabled:opacity-30 disabled:cursor-not-allowed"
            >
              <ChevronLeft size={14} />
            </button>
            <button
              onClick={() => setPage((p) => Math.min(totalPages - 1, p + 1))}
              disabled={page >= totalPages - 1}
              className="h-8 w-8 inline-flex items-center justify-center rounded border bg-card hover:bg-muted transition disabled:opacity-30 disabled:cursor-not-allowed"
            >
              <ChevronRight size={14} />
            </button>
            <button
              onClick={() => setPage(totalPages - 1)}
              disabled={page >= totalPages - 1}
              className="h-8 w-8 inline-flex items-center justify-center rounded border bg-card hover:bg-muted transition disabled:opacity-30 disabled:cursor-not-allowed"
            >
              <ChevronsRight size={14} />
            </button>
          </div>
        </div>
      </Card>

      {/* Backend info */}
      <Card className="mt-6">
        <h2 className="text-sm font-semibold mb-4">Funcionalidad backend</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="flex items-start gap-3 p-3 rounded-lg bg-muted/30">
            <Server size={18} className="text-muted-foreground shrink-0 mt-0.5" />
            <div>
              <div className="text-xs font-semibold">API RESTful</div>
              <div className="text-[11px] text-muted-foreground mt-0.5">
                Documentada y fácil de implementar.
              </div>
            </div>
          </div>
          <div className="flex items-start gap-3 p-3 rounded-lg bg-muted/30">
            <Webhook size={18} className="text-muted-foreground shrink-0 mt-0.5" />
            <div>
              <div className="text-xs font-semibold">Webhooks</div>
              <div className="text-[11px] text-muted-foreground mt-0.5">
                Notificaciones instantáneas de eventos.
              </div>
            </div>
          </div>
          <div className="flex items-start gap-3 p-3 rounded-lg bg-muted/30">
            <ShieldCheck size={18} className="text-muted-foreground shrink-0 mt-0.5" />
            <div>
              <div className="text-xs font-semibold">Seguridad</div>
              <div className="text-[11px] text-muted-foreground mt-0.5">
                Claves (API keys) y validación por IP.
              </div>
            </div>
          </div>
          <div className="flex items-start gap-3 p-3 rounded-lg bg-muted/30">
            <Globe size={18} className="text-muted-foreground shrink-0 mt-0.5" />
            <div>
              <div className="text-xs font-semibold">Compatibilidad</div>
              <div className="text-[11px] text-muted-foreground mt-0.5">
                Marketplaces, carritos externos y plataformas propias.
              </div>
            </div>
          </div>
        </div>
      </Card>
    </>
  );
}
