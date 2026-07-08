import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft } from "lucide-react";
import { MollyLogo } from "@/components/molly-logo";

export const Route = createFileRoute("/legales/terminos")({
  head: () => ({
    meta: [
      { title: "Términos y Condiciones — Molly Money Life" },
      { name: "description", content: "Términos y condiciones de uso de la plataforma Molly Money Life." },
    ],
  }),
  component: Page,
});

function Page() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="border-b bg-background/80 backdrop-blur sticky top-0 z-30">
        <div className="max-w-3xl mx-auto px-6 h-16 flex items-center justify-between">
          <MollyLogo />
          <Link to="/" className="text-sm text-muted-foreground hover:text-foreground inline-flex items-center gap-1">
            <ArrowLeft size={14} /> Volver al inicio
          </Link>
        </div>
      </header>
      <article className="max-w-3xl mx-auto px-6 py-16 prose prose-sm">
        <h1 className="text-3xl md:text-4xl font-semibold tracking-tight">Términos y Condiciones</h1>
        <p className="text-sm text-muted-foreground mt-2">Última actualización: 01/06/2026</p>

        <section className="mt-8 space-y-6 text-sm leading-relaxed text-muted-foreground">
          <div>
            <h2 className="text-lg font-semibold text-foreground mb-2">1. Objeto</h2>
            <p>Molly Money Life SA (en adelante "Molly") es un Proveedor de Servicios de Pago con Cuentas de Pago (PSPCP) inscripto ante el Banco Central de la República Argentina. Estos términos regulan el uso de la plataforma por parte de personas jurídicas.</p>
          </div>
          <div>
            <h2 className="text-lg font-semibold text-foreground mb-2">2. Registro y verificación</h2>
            <p>El titular deberá completar el proceso de conocimiento del cliente (KYC/KYB) y aportar la documentación societaria requerida.</p>
          </div>
          <div>
            <h2 className="text-lg font-semibold text-foreground mb-2">3. Uso de la cuenta de pago</h2>
            <p>Los fondos depositados no constituyen depósitos en una entidad financiera ni cuentan con la garantía de la Ley 24.485. Molly mantiene el 100% de los fondos de los clientes en cuentas de terceros en entidades financieras del sistema argentino.</p>
          </div>
          <div>
            <h2 className="text-lg font-semibold text-foreground mb-2">4. Comisiones</h2>
            <p>Las comisiones aplicables se detallan en la <Link to="/legales/comisiones" className="text-primary underline">Tabla de Comisiones</Link>, la cual forma parte integrante de estos términos.</p>
          </div>
          <div>
            <h2 className="text-lg font-semibold text-foreground mb-2">5. Rescisión</h2>
            <p>El usuario podrá dar de baja la cuenta en cualquier momento a través del <Link to="/legales/arrepentimiento" className="text-primary underline">Botón de Arrepentimiento</Link> o comunicándose con nuestro equipo.</p>
          </div>
          <div>
            <h2 className="text-lg font-semibold text-foreground mb-2">6. Jurisdicción</h2>
            <p>Para cualquier controversia se aplicará la legislación de la República Argentina y serán competentes los tribunales ordinarios de la Ciudad Autónoma de Buenos Aires.</p>
          </div>
        </section>
      </article>
    </div>
  );
}
