import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { AuthShell, PrimaryButton } from "@/components/onboarding";
import { useOnboarding } from "@/lib/onboarding-store";
import { MollyLogo } from "@/components/molly-logo";

export const Route = createFileRoute("/registro/validar-email")({
  head: () => ({
    meta: [
      { title: "Validar correo — Molipay" },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: ValidarEmail,
});

function ValidarEmail() {
  const nav = useNavigate();
  const { registro, markEmailValidado } = useOnboarding();
  const nombre = registro.nombre ?? "";

  const validar = () => {
    markEmailValidado();
    nav({ to: "/registro/validacion-exitosa" });
  };

  return (
    <AuthShell leftEyebrow="Simulación · Correo" leftTitle="Este es el email que recibirías en tu bandeja." step="Email de validación">
      <div
        className="bg-white overflow-hidden"
        style={{ border: "1px solid rgba(10,22,40,0.1)", borderRadius: 2 }}
      >
        <div className="px-6 py-4 flex items-center justify-between" style={{ background: "#0A1628" }}>
          <MollyLogo variant="light" size={26} />
          <span
            className="text-white/60"
            style={{ fontFamily: "'IBM Plex Mono', ui-monospace, monospace", fontSize: "0.65rem", letterSpacing: "0.15em", textTransform: "uppercase" }}
          >
            altas@molipay.com.ar
          </span>
        </div>
        <div className="p-6 sm:p-8">
          <p className="text-xs text-[#0A1628]/55">Asunto</p>
          <p className="mt-1 mb-6 text-sm font-semibold text-[#0A1628]">Validá tu cuenta Molipay</p>

          <div className="text-sm text-[#0A1628]/85 space-y-4 leading-relaxed">
            <p>Hola {nombre || "usuario"},</p>
            <p>Muchas gracias por registrarte en Molipay. Para poder ingresar a la plataforma primero debés validar tu email.</p>
            <p>Para hacerlo, hacé clic en el botón de abajo:</p>
          </div>

          <div className="mt-8">
            <PrimaryButton onClick={validar}>Validar desde aquí</PrimaryButton>
          </div>

          <p className="mt-6 text-[11px] text-[#0A1628]/45 leading-relaxed">
            Si no reconocés esta actividad, ignorá este mensaje. Este es un email simulado como parte del prototipo de onboarding.
          </p>
        </div>
      </div>
    </AuthShell>
  );
}
