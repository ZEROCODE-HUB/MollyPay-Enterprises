import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowLeftRight,
  Link2,
  QrCode,
  Upload,
  ArrowUpRight,
  ArrowDownLeft,
  Wallet,
  TrendingUp,
  Clock,
  AlertCircle,
  Receipt,
  Users,
} from "lucide-react";
import { PageHeader, Card, Stat, Badge } from "@/components/portal-shell";

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

const chartData = [40, 62, 58, 80, 72, 95, 88, 110, 102, 130, 124, 145];

function Dashboard() {
  const max = Math.max(...chartData);
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

      {/* KPI grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <Stat label="Saldo disponible" value="$ 12.480.330" sub="CBU ···· 67890" />
        <Stat label="Ingresos del mes" value="$ 8.420.110" sub="+12% vs mes anterior" />
        <Stat label="Egresos del mes" value="$ 5.110.500" sub="48 operaciones" />
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

      {/* 2-column desktop layout */}
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Left: chart + movs */}
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <div className="flex items-end justify-between mb-4">
              <div>
                <h3 className="font-semibold">Flujo mensual</h3>
                <p className="text-xs text-muted-foreground">Últimos 12 meses</p>
              </div>
              <div className="hidden md:flex items-center gap-3 text-xs">
                <span className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-sm bg-primary" /> Ingresos
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-sm bg-[color:var(--brand-blue)]" /> Egresos
                </span>
                <span className="text-primary font-semibold inline-flex items-center gap-1">
                  <TrendingUp size={14} /> +18,4%
                </span>
              </div>
            </div>
            <div className="flex items-end gap-2 h-40">
              {chartData.map((v, i) => (
                <div key={i} className="flex-1 flex flex-col items-center gap-1">
                  <div className="w-full flex gap-0.5 items-end h-full">
                    <div
                      className="flex-1 rounded-t bg-primary/80"
                      style={{ height: `${(v / max) * 100}%` }}
                    />
                    <div
                      className="flex-1 rounded-t bg-[color:var(--brand-blue)]/70"
                      style={{ height: `${((v * 0.6) / max) * 100}%` }}
                    />
                  </div>
                  <span className="text-[10px] text-muted-foreground">
                    {["E", "F", "M", "A", "M", "J", "J", "A", "S", "O", "N", "D"][i]}
                  </span>
                </div>
              ))}
            </div>
          </Card>

          <Card>
            <div className="flex items-center justify-between mb-3">
              <h2 className="font-semibold">Últimos movimientos</h2>
              <Link to="/app/historial" className="text-xs text-primary font-semibold">
                Ver todos →
              </Link>
            </div>
            <div className="divide-y">
              {movs.map((m) => (
                <div key={m.t} className="flex items-center justify-between py-3">
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

        {/* Right: side widgets */}
        <div className="space-y-6">
          <Card className="bg-[color:var(--brand-blue)] text-white border-0">
            <div className="flex items-center gap-2 text-xs uppercase tracking-wide opacity-80">
              <Wallet size={14} /> Cuenta operativa
            </div>
            <div className="text-2xl font-semibold mt-1">$ 12.480.330,55</div>
            <div className="text-xs opacity-80 mt-1">CBU 0000003 100012345678 90</div>
            <div className="text-xs opacity-80">Alias: molly.empresa.demo</div>
            <Link
              to="/app/cuenta"
              className="inline-block mt-4 text-xs font-semibold underline underline-offset-4"
            >
              Ver detalle de cuenta →
            </Link>
          </Card>

          <Card>
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-semibold">Subcuentas</h3>
              <Link to="/app/subcuentas" className="text-xs text-primary font-semibold">
                Gestionar →
              </Link>
            </div>
            <div className="divide-y">
              {subcuentas.map((s) => (
                <div key={s.n} className="py-2.5">
                  <div className="flex items-center justify-between">
                    <div className="text-sm font-semibold truncate">{s.n}</div>
                    <div className="text-sm font-semibold">{s.saldo}</div>
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
                <Receipt size={14} className="mt-0.5 text-muted-foreground" />
                <span>3 cobros con vencimiento mañana</span>
              </li>
              <li className="flex items-start gap-2">
                <Users size={14} className="mt-0.5 text-muted-foreground" />
                <span>2 destinatarios sin validar CBU</span>
              </li>
              <li className="flex items-start gap-2">
                <Upload size={14} className="mt-0.5 text-muted-foreground" />
                <span>Lote de marzo listo para conciliar</span>
              </li>
            </ul>
          </Card>
        </div>
      </div>
    </>
  );
}
