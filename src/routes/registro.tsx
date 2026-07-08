import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { AuthShell, Field, FormTitle, PasswordField, PrimaryButton, validatePassword } from "@/components/onboarding";
import { useOnboarding, type TipoCuenta } from "@/lib/onboarding-store";

export const Route = createFileRoute("/registro")({
  head: () => ({
    meta: [
      { title: "Crear una cuenta — Molipay" },
      { name: "description", content: "Registrate en Molipay como persona física." },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: () => <RegistroPage tipo="fisica" />,
});

export function RegistroPage({ tipo }: { tipo: TipoCuenta }) {
  const nav = useNavigate();
  const { setTipo, setRegistro } = useOnboarding();
  const [f, setF] = useState({ nombre: "", apellido: "", fechaNac: "", email: "", pw: "", pw2: "" });
  const [terms, setTerms] = useState(false);
  const [touched, setTouched] = useState(false);

  const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(f.email);
  const pwOk = validatePassword(f.pw);
  const pwMatch = f.pw && f.pw === f.pw2;
  const valid = f.nombre && f.apellido && f.fechaNac && emailOk && pwOk && pwMatch && terms;

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    setTouched(true);
    if (!valid) return;
    setTipo(tipo);
    setRegistro({ nombre: f.nombre, apellido: f.apellido, fechaNac: f.fechaNac, email: f.email });
    nav({ to: "/registro/exito" });
  };

  const esEmpresa = tipo === "juridica";

  return (
    <AuthShell
      leftEyebrow="Paso 1 · Registro"
      leftTitle={esEmpresa ? "Habilitá tu empresa en la red de pagos regulada." : "Empezá tu cuenta digital regulada en minutos."}
      leftBody="Molipay opera bajo normativa BCRA. Tus datos viajan cifrados y se almacenan bajo los estándares del sistema financiero argentino."
      step={esEmpresa ? "Registro Empresa" : "Registro Persona Física"}
    >
      <FormTitle
        eyebrow={esEmpresa ? "Cuenta Empresa" : "Cuenta Persona Física"}
        title={esEmpresa ? "Crear una cuenta empresa" : "Crear una cuenta"}
        subtitle={esEmpresa ? "Ingresá los datos de la persona responsable de la empresa." : undefined}
      />
      <form onSubmit={submit} className="space-y-4" noValidate>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Field
            label="Nombre"
            value={f.nombre}
            onChange={(e) => setF({ ...f, nombre: e.target.value })}
            error={touched && !f.nombre ? "Requerido" : undefined}
          />
          <Field
            label="Apellido"
            value={f.apellido}
            onChange={(e) => setF({ ...f, apellido: e.target.value })}
            error={touched && !f.apellido ? "Requerido" : undefined}
          />
        </div>
        <Field
          label="Fecha de nacimiento"
          type="date"
          value={f.fechaNac}
          onChange={(e) => setF({ ...f, fechaNac: e.target.value })}
          error={touched && !f.fechaNac ? "Requerido" : undefined}
        />
        <Field
          label="Correo electrónico"
          type="email"
          value={f.email}
          onChange={(e) => setF({ ...f, email: e.target.value })}
          placeholder="nombre@dominio.com"
          error={touched && !emailOk ? "Ingresá un email válido" : undefined}
        />
        <PasswordField
          label="Contraseña"
          value={f.pw}
          onChange={(v) => setF({ ...f, pw: v })}
          showRules
          error={touched && !pwOk ? "La contraseña no cumple los requisitos" : undefined}
        />
        <PasswordField
          label="Confirmar contraseña"
          value={f.pw2}
          onChange={(v) => setF({ ...f, pw2: v })}
          error={touched && !pwMatch ? "Las contraseñas no coinciden" : undefined}
        />

        <label className="flex items-start gap-2.5 text-xs text-[#0A1628]/75 pt-1">
          <input
            type="checkbox"
            checked={terms}
            onChange={(e) => setTerms(e.target.checked)}
            className="mt-0.5 accent-[#C41E3A]"
          />
          <span>
            He leído y acepto los{" "}
            <Link to="/legales/terminos" className="underline underline-offset-2 hover:text-[#C41E3A]">
              Términos y Condiciones
            </Link>
            .
          </span>
        </label>

        <div className="pt-2">
          <PrimaryButton type="submit" disabled={!valid}>
            Registrarse
          </PrimaryButton>
        </div>

        <div className="pt-4 text-center text-xs text-[#0A1628]/70 space-y-1.5">
          <p>
            ¿Ya tenés cuenta?{" "}
            <Link to="/login" className="font-semibold text-[#0A1628] hover:text-[#C41E3A]">
              Iniciá sesión
            </Link>
          </p>
          <p>
            {esEmpresa ? (
              <>
                ¿Sos persona física?{" "}
                <Link to="/registro" className="font-semibold text-[#0A1628] hover:text-[#C41E3A]">
                  Registrate como persona física
                </Link>
              </>
            ) : (
              <>
                ¿Querés registrar tu empresa?{" "}
                <Link to="/registro/empresa" className="font-semibold text-[#0A1628] hover:text-[#C41E3A]">
                  Registrar empresa
                </Link>
              </>
            )}
          </p>
        </div>
      </form>
    </AuthShell>
  );
}
