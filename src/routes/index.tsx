import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowRight,
  Repeat,
  Link2,
  Wallet,
  Upload,
  Receipt,
  Code2,
  Building2,
  Home,
  Landmark,
  Users,
} from "lucide-react";
import { MollyLogo } from "@/components/molly-logo";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Molly Money Life — Pagos para empresas" },
      { name: "description", content: "Billetera virtual B2B para empresas, consorcios y administradores en Argentina. Transferencias, cobros y subcuentas 24/7." },
      { property: "og:title", content: "Molly Money Life" },
      { property: "og:description", content: "Tu plataforma de pagos, sin intermediarios." },
    ],
  }),
  component: Landing,
});

function Landing() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Nav */}
      <header className="border-b bg-background/80 backdrop-blur sticky top-0 z-30">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <MollyLogo />
          <nav className="hidden md:flex items-center gap-8 text-sm text-muted-foreground">
            <a href="#servicios" className="hover:text-foreground">Servicios</a>
            <a href="#para-quien" className="hover:text-foreground">Para quién</a>
            <a href="#como-funciona" className="hover:text-foreground">Cómo funciona</a>
          </nav>
          <Link to="/login" className="inline-flex h-9 items-center px-4 rounded-md bg-primary text-primary-foreground text-sm font-semibold">
            Ingresar
          </Link>
        </div>
      </header>

      {/* Hero */}
      <section className="max-w-6xl mx-auto px-6 py-20 md:py-28 grid md:grid-cols-2 gap-12 items-center">
        <div>
          <h1 className="text-4xl md:text-6xl font-semibold tracking-tight leading-[1.05]">
            La cuenta empresarial que opera cuando vos necesitás.
          </h1>
          <p className="mt-6 text-lg text-muted-foreground max-w-md">
            Transferencias, cobros y subcuentas para empresas, consorcios y administradores. 24/7.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link to="/login" className="inline-flex h-12 items-center gap-2 px-6 rounded-md bg-primary text-primary-foreground text-sm font-semibold">
              Registrar mi empresa <ArrowRight size={16} />
            </Link>
            <a href="#servicios" className="inline-flex h-12 items-center px-6 rounded-md border border-border text-sm font-semibold">
              Ver servicios
            </a>
          </div>
        </div>
        <DashboardMock />
      </section>

      {/* Servicios */}
      <section id="servicios" className="border-t bg-card">
        <div className="max-w-6xl mx-auto px-6 py-20">
          <h2 className="text-3xl md:text-4xl font-semibold tracking-tight max-w-xl">
            Todo lo que tu empresa necesita para operar.
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
            {[
              { i: Repeat, t: "Transferencias 24/7", d: "Enviá y recibí fondos en segundos, todos los días del año." },
              { i: Link2, t: "Link de pago", d: "Generá links de cobro con monto fijo o libre y vencimiento opcional." },
              { i: Wallet, t: "Subcuentas por empresa", d: "Una cuenta madre con subcuentas y CBU propio para cada unidad." },
              { i: Upload, t: "Cobros masivos", d: "Procesá miles de cobros en lote con un solo archivo." },
              { i: Receipt, t: "Pago de servicios", d: "Pagá impuestos, servicios y proveedores desde tu cuenta operativa." },
              { i: Code2, t: "Integración API", d: "Conectá tu sistema y automatizá toda la operación." },
            ].map(({ i: Icon, t, d }) => (
              <div key={t}>
                <Icon size={22} strokeWidth={1.5} className="text-primary" />
                <div className="font-semibold mt-3">{t}</div>
                <p className="text-sm text-muted-foreground mt-1">{d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Para quién */}
      <section id="para-quien" className="border-t">
        <div className="max-w-6xl mx-auto px-6 py-20">
          <h2 className="text-3xl md:text-4xl font-semibold tracking-tight max-w-xl">¿Para quién es Molly?</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-12">
            {[
              { i: Users, t: "Microcrédito", d: "Desembolsos y cobros automatizados a escala." },
              { i: Building2, t: "Consorcios", d: "Gestión de expensas y pagos a proveedores." },
              { i: Home, t: "Alquileres", d: "Cobros mensuales programados por unidad." },
              { i: Landmark, t: "Municipios", d: "Recaudación digital con trazabilidad total." },
            ].map(({ i: Icon, t, d }) => (
              <div key={t} className="border rounded-lg p-6 bg-card">
                <Icon size={22} strokeWidth={1.5} className="text-primary" />
                <div className="font-semibold mt-3">{t}</div>
                <p className="text-sm text-muted-foreground mt-1">{d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Cómo funciona */}
      <section id="como-funciona" className="border-t bg-card">
        <div className="max-w-6xl mx-auto px-6 py-20">
          <h2 className="text-3xl md:text-4xl font-semibold tracking-tight">Cómo funciona</h2>
          <div className="grid md:grid-cols-3 gap-8 mt-12">
            {[
              ["01", "Registrá tu empresa", "Cargá los datos y validamos tu legajo."],
              ["02", "Operá desde el día uno", "CBU activo y portal listo para usar."],
              ["03", "Integrá tu sistema vía API", "Automatizá cobros y conciliación."],
            ].map(([n, t, d]) => (
              <div key={n}>
                <div className="text-sm font-semibold text-primary">{n}</div>
                <div className="text-xl font-semibold mt-2">{t}</div>
                <p className="text-sm text-muted-foreground mt-2">{d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA final */}
      <section style={{ background: "var(--brand-dark)" }}>
        <div className="max-w-6xl mx-auto px-6 py-20 text-white flex flex-col md:flex-row gap-8 items-start md:items-center justify-between">
          <h2 className="text-3xl md:text-4xl font-semibold tracking-tight max-w-xl">
            Empezá a operar hoy.
          </h2>
          <div className="flex flex-wrap gap-3">
            <a href="mailto:hola@molly.com.ar" className="inline-flex h-12 items-center px-6 rounded-md border border-white/80 text-white text-sm font-semibold">
              Contactanos
            </a>
            <Link to="/login" className="inline-flex h-12 items-center px-6 rounded-md bg-white text-sm font-semibold" style={{ color: "var(--brand)" }}>
              Crear cuenta
            </Link>
          </div>
        </div>
      </section>

      <footer className="border-t bg-background">
        <div className="max-w-6xl mx-auto px-6 py-12 grid gap-10 md:grid-cols-4 text-sm">
          <div className="md:col-span-1">
            <MollyLogo />
            <p className="mt-3 text-xs text-muted-foreground max-w-xs">
              Molly Money Life SA — Proveedor de Servicios de Pago (PSP). Registrado ante el Banco Central de la República Argentina (BCRA) bajo el régimen de PSPCP.
            </p>
          </div>

          <div>
            <div className="font-semibold text-foreground mb-3">Legales</div>
            <ul className="space-y-2 text-muted-foreground">
              <li><Link to="/legales/terminos" className="hover:text-foreground">Términos y condiciones</Link></li>
              <li><Link to="/legales/privacidad" className="hover:text-foreground">Política de privacidad</Link></li>
              <li><Link to="/legales/comisiones" className="hover:text-foreground">Tabla de comisiones</Link></li>
              <li><Link to="/legales/arrepentimiento" className="hover:text-foreground">Botón de arrepentimiento</Link></li>
            </ul>
          </div>

          <div>
            <div className="font-semibold text-foreground mb-3">Contacto</div>
            <ul className="space-y-2 text-muted-foreground">
              <li>
                <a href="tel:+541145550000" className="hover:text-foreground">
                  +54 11 4555-0000
                </a>
              </li>
              <li>
                <a href="mailto:hola@molly.com.ar" className="hover:text-foreground">
                  hola@molly.com.ar
                </a>
              </li>
              <li className="text-xs">Lun a Vie · 9 a 18 hs</li>
              <li className="text-xs">Av. Corrientes 1234, CABA, Argentina</li>
            </ul>
          </div>

          <div>
            <div className="font-semibold text-foreground mb-3">Ente fiscalizador</div>
            <ul className="space-y-2 text-muted-foreground text-xs">
              <li>
                <a
                  href="https://www.bcra.gob.ar"
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-foreground"
                >
                  Banco Central de la República Argentina (BCRA)
                </a>
              </li>
              <li>
                <a
                  href="https://www.argentina.gob.ar/aaip"
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-foreground"
                >
                  Agencia de Acceso a la Información Pública (AAIP)
                </a>
              </li>
              <li>
                <a
                  href="https://autogestion.produccion.gob.ar/consumidores"
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-foreground"
                >
                  Defensa del Consumidor
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t">
          <div className="max-w-6xl mx-auto px-6 py-5 flex flex-col md:flex-row gap-3 items-start md:items-center justify-between text-xs text-muted-foreground">
            <div>© {new Date().getFullYear()} Molly Money Life SA — CUIT 30-71000000-0. Todos los derechos reservados.</div>
            <div className="text-[11px]">
              Los fondos depositados no constituyen depósitos en una entidad financiera ni cuentan con la garantía de la Ley 24.485.
            </div>
          </div>
        </div>
      </footer>

    </div>
  );
}

function DashboardMock() {
  return (
    <div className="relative">
      <div className="bg-card border rounded-xl shadow-xl p-6">
        <div className="text-xs text-muted-foreground uppercase tracking-wide">Saldo disponible</div>
        <div className="text-4xl font-semibold mt-1">$ 12.480.330,55</div>
        <div className="text-xs text-muted-foreground mt-1">CBU 0000003 100012345678 90</div>
        <div className="grid grid-cols-3 gap-2 mt-5">
          {["Transferir", "Cobrar", "Link pago"].map((l) => (
            <div key={l} className="border rounded-md py-3 text-center text-xs font-semibold">{l}</div>
          ))}
        </div>
        <div className="mt-6">
          <div className="text-xs font-semibold mb-2">Últimos movimientos</div>
          {[
            ["Cobro QR – Cliente 42", "+ $ 18.400"],
            ["Transferencia – Proveedor SA", "- $ 220.000"],
            ["Lote cobros – Marzo", "+ $ 1.480.500"],
          ].map(([a, b]) => (
            <div key={a} className="flex justify-between text-sm py-2 border-b last:border-0">
              <span className="text-muted-foreground">{a}</span>
              <span className="font-semibold">{b}</span>
            </div>
          ))}
        </div>
      </div>
      <div className="absolute -bottom-6 -right-6 w-32 h-32 rounded-full -z-10" style={{ background: "var(--brand-soft)" }} />
    </div>
  );
}
