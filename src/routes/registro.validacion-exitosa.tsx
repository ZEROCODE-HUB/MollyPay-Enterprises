import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { AuthShell, PrimaryButton, SuccessCard } from "@/components/onboarding";

export const Route = createFileRoute("/registro/validacion-exitosa")({
  head: () => ({
    meta: [
      { title: "Correo validado — Molipay" },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: () => {
    const nav = useNavigate();
    return (
      <AuthShell leftEyebrow="Paso 2 · Verificación" leftTitle="Tu correo quedó verificado." step="Cuenta habilitada">
        <SuccessCard title="Validación exitosa" body={<p>Tu correo electrónico ha sido validado con éxito.</p>}>
          <PrimaryButton onClick={() => nav({ to: "/login" })}>Ir a inicio de sesión</PrimaryButton>
        </SuccessCard>
      </AuthShell>
    );
  },
});
