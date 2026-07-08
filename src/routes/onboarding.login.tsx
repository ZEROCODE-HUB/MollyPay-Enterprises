import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { AuthShell, Field, FormTitle, PasswordField, PrimaryButton, SecondaryButton } from "@/components/onboarding";
import { useOnboarding } from "@/lib/onboarding-store";
import { MollyLogo } from "@/components/molly-logo";

export const Route = createFileRoute("/onboarding/login")({
  head: () => ({
    meta: [
      { title: "Iniciar sesión — Molipay" },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: OnboardingLogin,
});

function OnboardingLogin() {
  const nav = useNavigate();
  const { tipoCuenta, emailValidado, datosPersonales, datosEmpresa, kyc, aprobado } = useOnboarding();
  const [email, setEmail] = useState("");
  const [pw, setPw] = useState("");

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulación: navegar según progreso
    if (aprobado) return nav({ to: "/app" });
    if (!emailValidado) return nav({ to: "/registro/exito" });
    if (!datosPersonales.genero) return nav({ to: "/onboarding/datos-personales" });
    if (tipoCuenta === "juridica" && !datosEmpresa.cuit) return nav({ to: "/onboarding/datos-empresa" });
    if (!kyc.direccion) return nav({ to: "/onboarding/kyc" });
    return nav({ to: "/onboarding/en-proceso" });
  };

  return (
    <AuthShell leftEyebrow="Acceso" leftTitle="Bienvenido a Molipay." step="Iniciar sesión">
      <div className="mb-6 flex justify-center">
        <MollyLogo size={40} />
      </div>
      <FormTitle title="Iniciá sesión" subtitle="Usá el correo con el que te registraste." />
      <form onSubmit={submit} className="space-y-4">
        <Field label="Correo electrónico" type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="nombre@dominio.com" />
        <PasswordField label="Contraseña" value={pw} onChange={setPw} />
        <div className="pt-1">
          <PrimaryButton type="submit">Iniciar sesión</PrimaryButton>
        </div>
        <div className="pt-4 flex flex-col items-center gap-2 text-xs text-[#0A1628]/70">
          <a href="#" className="hover:text-[#C41E3A]">
            ¿Olvidaste tu contraseña?
          </a>
          <button
            type="button"
            onClick={() => nav({ to: "/registro/validar-email" })}
            className="hover:text-[#C41E3A]"
          >
            ¿No te llegó el email de verificación?
          </button>
          <p>
            ¿No tenés cuenta?{" "}
            <button type="button" onClick={() => nav({ to: "/registro" })} className="font-semibold text-[#0A1628] hover:text-[#C41E3A]">
              Registrate
            </button>
          </p>
        </div>
        <div className="mt-6 pt-4 border-t border-[#0A1628]/10 flex justify-center">
          <SecondaryButton onClick={() => nav({ to: "/onboarding/datos-personales" })}>Continuar onboarding (demo)</SecondaryButton>
        </div>
      </form>
    </AuthShell>
  );
}
