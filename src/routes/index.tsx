import { createFileRoute, Link } from "@tanstack/react-router";
import { MollyLogo } from "@/components/molly-logo";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "MoliPay — Soluciones financieras digitales" },
      {
        name: "description",
        content:
          "MoliPay integra pagos, cobros y remesas para individuos, PyMEs y empresas en América Latina. Plataforma regulada bajo marco normativo BCRA.",
      },
      { property: "og:title", content: "MoliPay — Soluciones financieras digitales" },
      {
        property: "og:description",
        content:
          "Cuenta de pago, Crossborder, CVU Collect y Billetera. Plataforma tecnológica escalable y regulada.",
      },
    ],
  }),
  component: Landing,
});

/* ---------- Design primitives ---------- */

const display = {
  fontFamily: 'Fraunces, ui-serif, Georgia, serif',
  fontWeight: 600,
  letterSpacing: '-0.02em',
} as const;

const displayHeavy = {
  fontFamily: 'Fraunces, ui-serif, Georgia, serif',
  fontWeight: 680,
  letterSpacing: '-0.025em',
} as const;

const mono = {
  fontFamily: '"IBM Plex Mono", ui-monospace, monospace',
  textTransform: 'uppercase' as const,
  letterSpacing: '0.14em',
  fontSize: '0.72rem',
  fontWeight: 500,
};

function Eyebrow({ children, tone = "ink" }: { children: React.ReactNode; tone?: "ink" | "brass" | "paper" }) {
  const color = tone === "brass" ? "#B08D57" : tone === "paper" ? "rgba(245,246,248,0.7)" : "#6B7280";
  return (
    <div style={{ ...mono, color }}>
      {children}
    </div>
  );
}

/* ---------- Page ---------- */

function Landing() {
  return (
    <div style={{ background: "#FFFFFF", color: "#131A2A" }}>
      <SiteHeader />
      <Hero />
      <LedgerStrip />
      <Servicios />
      <ContamosCon />
      <MisionVision />
      <PorQueElegirnos />
      <RegulatoryStrip />
      <SiteFooter />
    </div>
  );
}

/* ---------- Header ---------- */

function SiteHeader() {
  return (
    <header
      style={{
        background: "#FFFFFF",
        borderBottom: "1px solid #D8DCE3",
        position: "sticky",
        top: 0,
        zIndex: 40,
      }}
    >
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        <MollyLogo />
        <nav className="hidden md:flex items-center gap-10 text-sm" style={{ color: "#4B5563" }}>
          <a href="#servicios" className="hover:text-[#131A2A] transition-colors">servicios</a>
          <a href="#nosotros" className="hover:text-[#131A2A] transition-colors">nosotros</a>
          <a href="#contacto" className="hover:text-[#131A2A] transition-colors">contacto</a>
        </nav>
        <div className="flex items-center gap-2">
          <Link
            to="/login"
            className="hidden sm:inline-flex h-9 items-center px-4 text-sm font-medium transition-colors"
            style={{ border: "1px solid #0A1628", color: "#0A1628", borderRadius: 2 }}
          >
            Inicia sesión
          </Link>
          <Link
            to="/login"
            className="inline-flex h-9 items-center px-4 text-sm font-medium text-white transition-colors hover:opacity-90"
            style={{ background: "#C8102E", borderRadius: 2 }}
          >
            Registra tu empresa
          </Link>
        </div>
      </div>
    </header>
  );
}

/* ---------- Hero ---------- */

function Hero() {
  return (
    <section style={{ background: "#0A1628", color: "#F5F6F8", position: "relative", overflow: "hidden" }}>
      {/* Subtle payments network illustration */}
      <NetworkBackdrop />

      <div className="relative max-w-6xl mx-auto px-6 pt-28 pb-32 md:pt-36 md:pb-40">
        <Eyebrow tone="brass">Money Life S.R.L. — Plataforma financiera digital</Eyebrow>
        <h1
          style={{ ...displayHeavy, fontSize: "clamp(2.5rem, 5.5vw, 4.5rem)", lineHeight: 1.02, marginTop: "1.75rem", maxWidth: "18ch" }}
        >
          Soluciones financieras digitales para todos
        </h1>
        <p
          className="mt-8 max-w-xl"
          style={{ fontFamily: "Inter, sans-serif", color: "rgba(245,246,248,0.72)", fontSize: "1.0625rem", lineHeight: 1.6 }}
        >
          Integramos en una sola plataforma servicios de pagos y cobros para Individuos, PyMEs y Empresas.
        </p>
        <div className="mt-10 flex flex-wrap gap-3">
          <a
            href="#servicios"
            className="inline-flex h-12 items-center px-7 text-sm font-medium text-white transition-colors hover:opacity-90"
            style={{ background: "#C8102E", borderRadius: 2 }}
          >
            Conoce más
          </a>
          <a
            href="#contacto"
            className="inline-flex h-12 items-center px-7 text-sm font-medium transition-colors hover:bg-white/5"
            style={{ border: "1px solid rgba(245,246,248,0.4)", color: "#F5F6F8", borderRadius: 2 }}
          >
            Contáctanos
          </a>
        </div>
      </div>
    </section>
  );
}

function NetworkBackdrop() {
  // Minimalist Latin America lines + nodes, opacity 8-12%
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 800 600"
      preserveAspectRatio="xMidYMid slice"
      style={{
        position: "absolute",
        inset: 0,
        width: "100%",
        height: "100%",
        opacity: 0.1,
        pointerEvents: "none",
      }}
    >
      <g fill="none" stroke="#F5F6F8" strokeWidth="0.8">
        {/* Stylized LATAM silhouette */}
        <path d="M430 90 L470 110 L495 150 L505 200 L520 240 L510 290 L520 340 L500 400 L470 460 L440 505 L410 540 L385 555 L370 540 L360 500 L370 460 L355 420 L340 380 L330 340 L340 300 L360 260 L365 220 L380 175 L400 135 Z" />
        {/* Nodes and connecting lines */}
        <g stroke="#B08D57" strokeWidth="0.6">
          <line x1="150" y1="120" x2="400" y2="180" />
          <line x1="400" y1="180" x2="650" y2="140" />
          <line x1="400" y1="180" x2="420" y2="330" />
          <line x1="420" y1="330" x2="180" y2="400" />
          <line x1="420" y1="330" x2="640" y2="380" />
          <line x1="420" y1="330" x2="400" y2="480" />
          <line x1="180" y1="400" x2="120" y2="520" />
          <line x1="640" y1="380" x2="700" y2="480" />
        </g>
        {[
          [150, 120], [400, 180], [650, 140], [420, 330],
          [180, 400], [640, 380], [400, 480], [120, 520], [700, 480],
        ].map(([x, y]) => (
          <circle key={`${x}-${y}`} cx={x} cy={y} r="3.5" fill="#B08D57" stroke="none" />
        ))}
      </g>
    </svg>
  );
}

/* ---------- Ledger strip ---------- */

function LedgerStrip() {
  const items = [
    ["Entidad registrada", "Money Life S.R.L."],
    ["Cobertura", "América Latina"],
    ["Compliance", "Marco normativo BCRA"],
    ["Plataforma", "100% digital"],
  ];
  return (
    <section style={{ background: "#16213E", borderTop: "1px solid #B08D57", color: "#F5F6F8" }}>
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid grid-cols-2 md:grid-cols-4">
          {items.map(([label, value], i) => (
            <div
              key={label}
              className="py-6 md:py-7 px-4 md:px-6"
              style={{
                borderLeft: i === 0 ? "none" : "1px solid rgba(255,255,255,0.12)",
              }}
            >
              <div style={{ ...mono, color: "#B08D57", fontSize: "0.65rem" }}>{label}</div>
              <div className="mt-2" style={{ fontFamily: '"IBM Plex Mono", monospace', fontSize: "0.875rem", color: "#F5F6F8", letterSpacing: "0.02em" }}>
                {value}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- Servicios ---------- */

function Servicios() {
  const items = [
    {
      t: "Cuenta de Pago",
      d: "CVU para enviar y recibir dinero de cuentas bancarias y billeteras virtuales de manera ágil y segura.",
    },
    {
      t: "Crossborder",
      d: "Servicios de transferencias internacionales y remesas con cobertura en América Latina.",
    },
    {
      t: "CVU Collect",
      d: "Soluciones de recaudación para desarrolladores inmobiliarios, consorcios e inmobiliarias.",
    },
    {
      t: "Billetera",
      d: "QR, tarjetas prepagas físicas y virtuales, pagos NFC, wireless y pagos de servicios para individuos. Para comercios: QR estático y dinámico, Smartpos y link de pago.",
    },
  ];
  return (
    <section id="servicios" style={{ background: "#F5F6F8", borderTop: "1px solid #D8DCE3" }}>
      <div className="max-w-6xl mx-auto px-6 py-24 md:py-32">
        <Eyebrow tone="brass">Servicios</Eyebrow>
        <h2 style={{ ...display, fontSize: "clamp(2rem, 3.5vw, 3rem)", lineHeight: 1.1, marginTop: "1rem", maxWidth: "20ch" }}>
          Nuestros Servicios
        </h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-px mt-16" style={{ background: "#D8DCE3" }}>
          {items.map(({ t, d }) => (
            <div key={t} style={{ background: "#F5F6F8", padding: "2rem 1.5rem 2.5rem" }}>
              <div style={{ height: 1, background: "#B08D57", width: 32, marginBottom: "1.5rem" }} />
              <h3 style={{ ...display, fontSize: "1.375rem", color: "#131A2A" }}>{t}</h3>
              <p className="mt-3" style={{ fontFamily: "Inter, sans-serif", color: "#4B5563", fontSize: "0.9375rem", lineHeight: 1.6 }}>
                {d}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- Contamos con ---------- */

function ContamosCon() {
  const items = [
    { t: "Plataforma Tecnológica", d: "Sistema escalable y seguro que garantiza el cumplimiento de normas nacionales y compliance." },
    { t: "Compliance Integral", d: "Políticas y procedimientos personalizados garantizando el cumplimiento normativo." },
    { t: "Reporting", d: "Informes y declaraciones obligatorias ante autoridades competentes." },
    { t: "Administración", d: "Seguimiento y control de gestión de toda la actividad." },
    { t: "Management", d: "Acompañamiento estratégico para el crecimiento y desarrollo empresarial." },
  ];
  return (
    <section id="nosotros" style={{ background: "#F5F6F8", borderTop: "1px solid #D8DCE3" }}>
      <div className="max-w-6xl mx-auto px-6 py-24 md:py-32">
        <Eyebrow tone="brass">Capacidades</Eyebrow>
        <h2 style={{ ...display, fontSize: "clamp(2rem, 3.5vw, 3rem)", lineHeight: 1.1, marginTop: "1rem" }}>
          Contamos con
        </h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-8 mt-16">
          {items.map(({ t, d }) => (
            <div key={t} style={{ borderTop: "1px solid #B08D57", paddingTop: "1.25rem" }}>
              <h3 style={{ ...display, fontSize: "1.125rem", color: "#131A2A", lineHeight: 1.25 }}>{t}</h3>
              <p className="mt-3" style={{ fontFamily: "Inter, sans-serif", color: "#4B5563", fontSize: "0.875rem", lineHeight: 1.55 }}>
                {d}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- Misión / Visión ---------- */

function MisionVision() {
  return (
    <section style={{ background: "#0A1628", color: "#F5F6F8" }}>
      <div className="max-w-6xl mx-auto px-6 py-24 md:py-32">
        <div className="grid md:grid-cols-2 gap-px" style={{ background: "#B08D57" }}>
          <div style={{ background: "#0A1628", padding: "0 2.5rem 0 0" }} className="md:pr-12">
            <Eyebrow tone="brass">01 — Misión</Eyebrow>
            <h3 style={{ ...display, fontSize: "2rem", marginTop: "1rem", color: "#F5F6F8" }}>Misión</h3>
            <p className="mt-6" style={{ fontFamily: "Inter, sans-serif", color: "rgba(245,246,248,0.72)", fontSize: "1rem", lineHeight: 1.65 }}>
              Proporcionar soluciones financieras seguras, transparentes y simples que faciliten la gestión de cobros y pagos para todos nuestros usuarios en un entorno digital en constante evolución.
            </p>
          </div>
          <div style={{ background: "#0A1628" }} className="md:pl-12 pt-12 md:pt-0">
            <Eyebrow tone="brass">02 — Visión</Eyebrow>
            <h3 style={{ ...display, fontSize: "2rem", marginTop: "1rem", color: "#F5F6F8" }}>Visión</h3>
            <p className="mt-6" style={{ fontFamily: "Inter, sans-serif", color: "rgba(245,246,248,0.72)", fontSize: "1rem", lineHeight: 1.65 }}>
              Posicionarnos como un referente en el sector Fintech, acompañando la evolución de cobros y pagos digitales con soluciones ágiles y simples.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------- ¿Por qué elegirnos? ---------- */

function PorQueElegirnos() {
  const items = [
    { t: "Tecnología Segura", d: "Plataforma diseñada para ser dinámica, escalable y segura, cumpliendo con todas las normativas vigentes." },
    { t: "Atención Personalizada", d: "Acompañamos a nuestros clientes con una atención cercana, atendiendo todas sus necesidades." },
    { t: "Alcance Internacional", d: "Operaciones en múltiples países de América Latina con alianzas estratégicas sólidas." },
  ];
  return (
    <section style={{ background: "#F5F6F8", borderTop: "1px solid #D8DCE3" }}>
      <div className="max-w-6xl mx-auto px-6 py-24 md:py-32">
        <Eyebrow tone="brass">Diferenciales</Eyebrow>
        <h2 style={{ ...display, fontSize: "clamp(2rem, 3.5vw, 3rem)", lineHeight: 1.1, marginTop: "1rem" }}>
          ¿Por qué elegirnos?
        </h2>
        <div className="grid md:grid-cols-3 gap-px mt-16" style={{ background: "#D8DCE3" }}>
          {items.map(({ t, d }) => (
            <div key={t} style={{ background: "#F5F6F8", padding: "2rem 1.5rem 2.5rem" }}>
              <div style={{ height: 1, background: "#B08D57", width: 32, marginBottom: "1.5rem" }} />
              <h3 style={{ ...display, fontSize: "1.375rem", color: "#131A2A" }}>{t}</h3>
              <p className="mt-3" style={{ fontFamily: "Inter, sans-serif", color: "#4B5563", fontSize: "0.9375rem", lineHeight: 1.6 }}>
                {d}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- Regulatory strip ---------- */

function RegulatoryStrip() {
  return (
    <section style={{ background: "#16213E", borderTop: "1px solid #B08D57", color: "#F5F6F8" }}>
      <div className="max-w-6xl mx-auto px-6 py-8 md:py-10 flex flex-col md:flex-row gap-6 md:items-center md:justify-between">
        <div className="flex items-center gap-5">
          <div
            style={{
              border: "1px solid #B08D57",
              padding: "0.5rem 0.85rem",
              fontFamily: '"IBM Plex Mono", monospace',
              fontSize: "0.7rem",
              letterSpacing: "0.14em",
              textTransform: "uppercase",
              color: "#F5F6F8",
            }}
          >
            BCRA
          </div>
          <div>
            <div style={{ ...mono, color: "#B08D57", fontSize: "0.65rem" }}>Usuarios financieros</div>
            <div className="mt-1" style={{ fontFamily: "Inter, sans-serif", fontSize: "0.875rem", color: "rgba(245,246,248,0.85)" }}>
              Banco Central de la República Argentina — protección al usuario financiero.
            </div>
          </div>
        </div>
        <a
          href="https://www.usuariosfinancieros.gob.ar"
          target="_blank"
          rel="noreferrer"
          style={{
            ...mono,
            color: "#F5F6F8",
            borderBottom: "1px solid #B08D57",
            paddingBottom: 2,
          }}
        >
          usuariosfinancieros.gob.ar →
        </a>
      </div>
    </section>
  );
}

/* ---------- Footer ---------- */

function SiteFooter() {
  return (
    <footer id="contacto" style={{ background: "#0A1628", color: "#F5F6F8", borderTop: "1px solid rgba(255,255,255,0.12)" }}>
      <div className="max-w-6xl mx-auto px-6 py-20 grid gap-12 md:grid-cols-4">
        <div className="md:col-span-1">
          <MollyLogo variant="light" />
          <p className="mt-6" style={{ fontFamily: "Inter, sans-serif", fontSize: "0.8125rem", color: "rgba(245,246,248,0.55)", lineHeight: 1.6, maxWidth: 260 }}>
            © 2026 MONEY LIFE S.R.L. Todos los derechos reservados.
          </p>
          <p className="mt-4" style={{ ...mono, color: "#B08D57", fontSize: "0.65rem" }}>
            PSPCP · Marco BCRA
          </p>
        </div>

        <div>
          <div style={{ ...mono, color: "#B08D57", fontSize: "0.65rem" }}>Enlaces útiles</div>
          <ul className="mt-5 space-y-3" style={{ fontFamily: "Inter, sans-serif", fontSize: "0.9rem", color: "rgba(245,246,248,0.72)" }}>
            <li><Link to="/legales/privacidad" className="hover:text-white transition-colors">Políticas de privacidad</Link></li>
            <li><Link to="/legales/terminos" className="hover:text-white transition-colors">Términos y condiciones</Link></li>
            <li><Link to="/legales/comisiones" className="hover:text-white transition-colors">Comisiones</Link></li>
            <li><Link to="/legales/arrepentimiento" className="hover:text-white transition-colors">Botón de arrepentimiento</Link></li>
          </ul>
        </div>

        <div>
          <div style={{ ...mono, color: "#B08D57", fontSize: "0.65rem" }}>Contactános</div>
          <ul className="mt-5 space-y-3" style={{ fontFamily: "Inter, sans-serif", fontSize: "0.9rem", color: "rgba(245,246,248,0.72)" }}>
            <li><a href="mailto:contacto@molipay.com.ar" className="hover:text-white transition-colors">contacto@molipay.com.ar</a></li>
            <li><a href="mailto:admin@molipay.com.ar" className="hover:text-white transition-colors">admin@molipay.com.ar</a></li>
            <li><a href="mailto:reclamos@molipay.com.ar" className="hover:text-white transition-colors">reclamos@molipay.com.ar</a></li>
          </ul>
        </div>

        <div>
          <div style={{ ...mono, color: "#B08D57", fontSize: "0.65rem" }}>Ente fiscalizador</div>
          <div
            className="mt-5"
            style={{
              border: "1px solid rgba(255,255,255,0.15)",
              padding: "1rem 1.15rem",
              background: "#16213E",
            }}
          >
            <div style={{ ...mono, color: "#B08D57", fontSize: "0.6rem" }}>BCRA</div>
            <div className="mt-1.5" style={{ fontFamily: "Inter, sans-serif", fontSize: "0.8125rem", color: "rgba(245,246,248,0.8)", lineHeight: 1.5 }}>
              Banco Central de la República Argentina
            </div>
            <a
              href="https://www.bcra.gob.ar"
              target="_blank"
              rel="noreferrer"
              className="mt-2 inline-block"
              style={{ ...mono, color: "#F5F6F8", fontSize: "0.6rem" }}
            >
              bcra.gob.ar →
            </a>
          </div>
        </div>
      </div>

      <div style={{ borderTop: "1px solid rgba(255,255,255,0.08)" }}>
        <div className="max-w-6xl mx-auto px-6 py-5 flex flex-col md:flex-row gap-3 md:items-center md:justify-between" style={{ fontFamily: "Inter, sans-serif", fontSize: "0.7rem", color: "rgba(245,246,248,0.45)" }}>
          <div>MONEY LIFE S.R.L. — CUIT 30-71000000-0</div>
          <div>Los fondos depositados no constituyen depósitos en una entidad financiera ni cuentan con la garantía de la Ley 24.485.</div>
        </div>
      </div>
    </footer>
  );
}
