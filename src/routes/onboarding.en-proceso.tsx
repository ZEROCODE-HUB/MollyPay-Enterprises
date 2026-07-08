import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { AuthShell, PrimaryButton, SecondaryButton, SuccessCard } from "@/components/onboarding";
import { useOnboarding } from "@/lib/onboarding-store";

export const Route = createFileRoute("/onboarding/en-proceso")({
  head: () => ({
    meta: [
      { title: "Validación en proceso — Molipay" },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: EnProceso,
});

function EnProceso() {
  const nav = useNavigate();
  const { markAprobado } = useOnboarding();
  return (
    <AuthShell
      leftEyebrow="Paso 6 · Revisión"
      leftTitle="Tu legajo está en revisión."
      leftBody="Nuestro equipo de compliance revisará tu información y te notificará al correo altas@molipay.com.ar cuando la cuenta quede habilitada."
      step="En proceso"
    >
      <SuccessCard
        variant="info"
        title="Validación en proceso"
        body={
          <>
            <p>
              Tu información está siendo validada por nuestro equipo. Este proceso puede demorar hasta{" "}
              <strong>24 horas hábiles</strong>. Te avisaremos por correo cuando el proceso finalice.
            </p>
            <p className="mt-3 text-xs text-[#0A1628]/55">
              Si tenés algún problema,{" "}
              <a href="mailto:soporte@molipay.com.ar" className="underline underline-offset-2 hover:text-[#C41E3A]">
                contactanos
              </a>
              .
            </p>
          </>
        }
      >
        <PrimaryButton onClick={() => nav({ to: "/" })}>Volver al inicio</PrimaryButton>
        <div className="flex justify-center">
          <SecondaryButton
            onClick={() => {
              markAprobado();
              nav({ to: "/app" });
            }}
          >
            Simular aprobación (demo)
          </SecondaryButton>
        </div>
      </SuccessCard>
    </AuthShell>
  );
}
