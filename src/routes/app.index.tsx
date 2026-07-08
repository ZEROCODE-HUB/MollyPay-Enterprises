import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import {
  ArrowLeftRight,
  Link2,
  QrCode,
  Upload,
  ArrowUpRight,
  ArrowDownLeft,
  TrendingUp,
  Clock,
  AlertCircle,
  Receipt,
  Users,
  Download,
  FileSpreadsheet,
  FileText,
} from "lucide-react";
import { PageHeader, Card, Stat, Badge, BtnOutline } from "@/components/portal-shell";
import { toast } from "sonner";

export const Route = createFileRoute("/app/")({
  component: Dashboard,
});

const movs = [
  { t: "Cobro QR – Cliente #4821", a: "+ $ 18.400,00", tag: "Cobro", in: true, date: "Hoy 14:32" },
  { t: "Transferencia – Proveedor SA", a: "- $ 220.000,00", tag: "Salida", in: false, date: "Hoy 11:08" },
  { t: "Lote cobros – Marzo expensas", a: "+ $ 1.480.500,00", tag: "Lote", in: true, date: "Ayer 18:44" },
  { t: "Pago servicio – Edesur", a: "- $ 64.320,00", tag: "Servicio", in: false, date: "Ayer 09:20" },
  { t: "Link de pago – Factura 0034", a: "+ $ 92.800,00", tag: "Link", in: true, date: "30/05 16:11" },
  { t: "Transferencia – Sueldos abril", a: "- $ 3.420.000,00", tag: "Lote", in: false, date: "30/05 09:00" },
];

const subcuentas = [
  { n: "Edificio Larrea 1200", cbu: "···· 4421", saldo: "$ 1.842.300,00" },
  { n: "Edificio Av. Santa Fe", cbu: "···· 7793", saldo: "$ 982.110,00" },
  { n: "Operativa Sueldos", cbu: "···· 0021", saldo: "$ 4.220.500,00" },
];

type PeriodKey = "7d" | "15d" | "30d" | "90d" | "day";

// Deterministic pseudo-random series so days without movement can render as 0.
function seriesFor(days: number) {
  const out: Array<{ label: string; dep: number; qr: number; link: number }> = [];
  const today = new Date();
  for (let i = days - 1; i >= 0; i--) {
    const d = new Date(today);
    d.setDate(today.getDate() - i);
    const seed = d.getDate() + d.getMonth() * 31;
    // Force some zero days deterministically
    const isZero = seed % 11 === 0;
    const dep = isZero ? 0 : ((seed * 37) % 90) + 10;
    const qr = isZero ? 0 : ((seed * 17) % 60) + 5;
    const link = isZero ? 0 : ((seed * 23) % 40);
    out.push({
      label: `${String(d.getDate()).padStart(2, "0")}/${String(d.getMonth() + 1).padStart(2, "0")}`,
      dep,
      qr,
      link,
    });
  }
  return out;
}

const PERIODS: Array<{ k: PeriodKey; l: string; days: number }> = [
  { k: "7d", l: "7 días", days: 7 },
  { k: "15d", l: "15 días", days: 15 },
  { k: "30d", l: "30 días", days: 30 },
  { k: "90d", l: "90 días", days: 90 },
];

function Dashboard() {
  const [period, setPeriod] = useState<PeriodKey>("7d");
  const [day, setDay] = useState<string>(() => new Date().toISOString().slice(0, 10));

  const data = useMemo(() => {
    if (period === "day") {
      return seriesFor(1).map((p) => ({ ...p, label: day }));
    }
    const days = PERIODS.find((p) => p.k === period)?.days ?? 7;
    return seriesFor(days);
  }, [period, day]);

  const periodLabel = period === "day" ? day : PERIODS.find((p) => p.k === period)!.l;

  const doExport = (fmt: "xlsx" | "pdf") =>
    toast.success(`Reporte ${periodLabel} exportado (${fmt.toUpperCase()})`);

  const maxStacked = Math.max(1, ...data.map((d) => d.dep + d.qr + d.link));
  // Adjust bar gap for dense ranges to keep it legible
  const gap = data.length > 30 ? "gap-[2px]" : data.length > 15 ? "gap-1" : "gap-1.5";

  return (
    <>
      <PageHeader
        title="Dashboard"
        description="Resumen de tu operación en tiempo real."
        action={
          <div className="hidden md:flex items-center gap-2 text-xs text-muted-foreground">
            <Clock size={14} /> Actualizado hace 2 min
          </div>
        }
      />

      {/* Controles de periodo + exportación */}
      <Card className="mb-6">
        <div className="grid grid-cols-1 md:grid-cols-[minmax(0,1fr)_auto] gap-3 items-center">
          <div className="flex flex-wrap items-center gap-2 min-w-0">
            <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wide shrink-0">
              Periodo
            </span>
            <div className="flex flex-wrap gap-1.5">
              {PERIODS.map((p) => (
                <button
                  key={p.k}
                  onClick={() => setPeriod(p.k)}
                  className={`px-3 py-1.5 rounded-full text-xs font-semibold border transition ${
                    period === p.k
                      ? "bg-[color:var(--brand-soft)] text-[color:var(--brand-dark)] border-transparent"
                      : "bg-card hover:bg-muted"
                  }`}
                >
                  {p.l}
                </button>
              ))}
              <button
                onClick={() => setPeriod("day")}
                className={`px-3 py-1.5 rounded-full text-xs font-semibold border transition ${
                  period === "day"
                    ? "bg-[color:var(--brand-soft)] text-[color:var(--brand-dark)] border-transparent"
                    : "bg-card hover:bg-muted"
                }`}
              >
                Día específico
              </button>
              {period === "day" && (
                <input
                  type="date"
                  value={day}
                  onChange={(e) => setDay(e.target.value)}
                  className="h-8 px-2 rounded-md border bg-card text-xs"
                />
              )}
            </div>
          </div>
          <div className="flex gap-2 justify-start md:justify-end">
            <BtnOutline onClick={() => doExport("xlsx")}>
              <FileSpreadsheet size={14} /> Excel
            </BtnOutline>
            <BtnOutline onClick={() => doExport("pdf")}>
              <FileText size={14} /> PDF
            </BtnOutline>
          </div>
        </div>
      </Card>

      {/* KPI grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <Stat label="Saldo disponible" value="$ 12.480.330" sub="CBU ···· 67890" />
        <Stat label="Ingresos del periodo" value="$ 8.420.110" sub="+12% vs periodo anterior" />
        <Stat label="Egresos del periodo" value="$ 5.110.500" sub="48 operaciones" />
        <Stat label="A acreditar" value="$ 320.450" sub="14 ops en proceso" />
      </div>

      {/* Acciones rápidas */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
        {[
          { to: "/app/transferencias", t: "Transferir", i: ArrowLeftRight },
          { to: "/app/link-pago", t: "Cobrar con link", i: Link2 },
          { to: "/app/qr", t: "Pago QR", i: QrCode },
          { to: "/app/cobros", t: "Cobros masivos", i: Upload },
        ].map(({ to, t, i: Icon }) => (
          <Link
            key={to}
            to={to}
            className="border bg-card rounded-lg p-4 hover:border-primary/50 hover:shadow-sm transition group"
          >
            <div className="w-10 h-10 rounded-md flex items-center justify-center bg-[color:var(--brand-soft)] text-primary group-hover:bg-primary group-hover:text-primary-foreground transition">
              <Icon size={18} strokeWidth={1.75} />
            </div>
            <div className="font-semibold mt-3 text-sm">{t}</div>
            <div className="text-xs text-muted-foreground mt-0.5">Operación 24/7</div>
          </Link>
        ))}
      </div>

      {/* Layout responsive */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6 min-w-0">
          <Card>
            <div className="grid grid-cols-[minmax(0,1fr)_auto] items-start gap-3 mb-4">
              <div className="min-w-0">
                <h3 className="font-semibold truncate">Ingresos por periodo</h3>
                <p className="text-xs text-muted-foreground truncate">{periodLabel}</p>
              </div>
              <span className="text-primary font-semibold inline-flex items-center gap-1 text-xs shrink-0">
                <TrendingUp size={14} /> +18,4%
              </span>
            </div>
            <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs mb-3">
              <span className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-sm bg-primary" /> Depósitos
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-sm bg-[color:var(--brand-blue)]" /> Cobro QR
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-sm bg-amber-400" /> Link de pago
              </span>
              <span className="ml-auto text-muted-foreground">Total apilado por día</span>
            </div>
            <div className={`flex items-end ${gap} h-40 min-w-0`}>
              {data.map((d, i) => {
                const total = d.dep + d.qr + d.link;
                const h = (total / maxStacked) * 100;
                const showLabel =
                  data.length <= 15 || i % Math.ceil(data.length / 10) === 0;
                return (
                  <div key={i} className="flex-1 min-w-0 flex flex-col items-center gap-1">
                    <div
                      className="w-full rounded-t bg-muted/60 flex flex-col justify-end overflow-hidden"
                      style={{ height: `${Math.max(h, 2)}%` }}
                      title={`${d.label} · Dep $${d.dep}k · QR $${d.qr}k · Link $${d.link}k`}
                    >
                      {total > 0 ? (
                        <>
                          <div className="bg-amber-400" style={{ height: `${(d.link / total) * 100}%` }} />
                          <div className="bg-[color:var(--brand-blue)]" style={{ height: `${(d.qr / total) * 100}%` }} />
                          <div className="bg-primary" style={{ height: `${(d.dep / total) * 100}%` }} />
                        </>
                      ) : null}
                    </div>
                    {showLabel && (
                      <span className="text-[9px] text-muted-foreground truncate max-w-full">
                        {d.label}
                      </span>
                    )}
                  </div>
                );
              })}
            </div>
          </Card>

          <Card>
            <div className="flex items-center justify-between mb-3 gap-2">
              <h2 className="font-semibold truncate">Últimos movimientos</h2>
              <Link to="/app/historial" className="text-xs text-primary font-semibold shrink-0">
                Ver todos →
              </Link>
            </div>
            <div className="divide-y">
              {movs.map((m) => (
                <div key={m.t} className="flex items-center justify-between py-3 gap-3">
                  <div className="flex items-center gap-3 min-w-0">
                    <div
                      className={`w-9 h-9 rounded-full flex items-center justify-center shrink-0 ${
                        m.in
                          ? "bg-[color:var(--brand-soft)] text-primary"
                          : "bg-[color:var(--brand-blue-soft)] text-[color:var(--brand-blue)]"
                      }`}
                    >
                      {m.in ? <ArrowDownLeft size={16} /> : <ArrowUpRight size={16} />}
                    </div>
                    <div className="min-w-0">
                      <div className="text-sm font-semibold truncate">{m.t}</div>
                      <div className="flex items-center gap-2 mt-0.5">
                        <Badge tone={m.in ? "success" : "neutral"}>{m.tag}</Badge>
                        <span className="text-[11px] text-muted-foreground">{m.date}</span>
                      </div>
                    </div>
                  </div>
                  <div className="text-sm font-semibold shrink-0">{m.a}</div>
                </div>
              ))}
            </div>
          </Card>
        </div>

        {/* Side widgets — bloque "Cuenta operativa" eliminado (duplica Actividad) */}
        <div className="space-y-6 min-w-0">
          <Card>
            <div className="flex items-center justify-between mb-3 gap-2">
              <h3 className="font-semibold truncate">Subcuentas</h3>
              <Link to="/app/subcuentas" className="text-xs text-primary font-semibold shrink-0">
                Gestionar →
              </Link>
            </div>
            <div className="divide-y">
              {subcuentas.map((s) => (
                <div key={s.n} className="py-2.5">
                  <div className="flex items-center justify-between gap-2">
                    <div className="text-sm font-semibold truncate">{s.n}</div>
                    <div className="text-sm font-semibold shrink-0">{s.saldo}</div>
                  </div>
                  <div className="text-[11px] text-muted-foreground">CBU {s.cbu}</div>
                </div>
              ))}
            </div>
          </Card>

          <Card>
            <h3 className="font-semibold mb-3 flex items-center gap-2">
              <AlertCircle size={16} className="text-[color:var(--brand-red)]" /> Tareas pendientes
            </h3>
            <ul className="space-y-2.5 text-sm">
              <li className="flex items-start gap-2">
                <Receipt size={14} className="mt-0.5 text-muted-foreground shrink-0" />
                <span>3 cobros con vencimiento mañana</span>
              </li>
              <li className="flex items-start gap-2">
                <Users size={14} className="mt-0.5 text-muted-foreground shrink-0" />
                <span>2 destinatarios sin validar CBU</span>
              </li>
              <li className="flex items-start gap-2">
                <Upload size={14} className="mt-0.5 text-muted-foreground shrink-0" />
                <span>Lote de marzo listo para conciliar</span>
              </li>
            </ul>
          </Card>

          <Card>
            <div className="flex items-center justify-between mb-3 gap-2">
              <h3 className="font-semibold truncate">Exportar resumen</h3>
              <Download size={14} className="text-muted-foreground shrink-0" />
            </div>
            <p className="text-xs text-muted-foreground mb-3">
              Descargá el reporte del periodo seleccionado ({periodLabel}).
            </p>
            <div className="grid grid-cols-2 gap-2">
              <BtnOutline onClick={() => doExport("xlsx")}>
                <FileSpreadsheet size={14} /> Excel
              </BtnOutline>
              <BtnOutline onClick={() => doExport("pdf")}>
                <FileText size={14} /> PDF
              </BtnOutline>
            </div>
          </Card>
        </div>
      </div>
    </>
  );
}
