import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { MollyLogo } from "@/components/molly-logo";
import { useDemoMode } from "@/contexts/demo-mode";
import { AuthShell, Field, PasswordField, PrimaryButton, validatePassword } from "@/components/onboarding";

export const Route = createFileRoute("/login")({
  head: () => ({
    meta: [
      { title: "Ingresar — Molly Money Life" },
      { name: "description", content: "Accedé al portal de Molly Money Life. Modo demo disponible." },
    ],
  }),
  component: LoginPage,
});

function LoginForm({ onSuccess }: { onSuccess: () => void }) {
  const [email, setEmail] = useState("");
  const [pw, setPw] = useState("");

  return (
    <form
      className="space-y-4"
      onSubmit={(e) => {
        e.preventDefault();
        onSuccess();
      }}
    >
      <Field label="Email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="hola@empresa.com" />
      <PasswordField label="Contraseña" value={pw} onChange={setPw} />
      <div className="pt-1">
        <PrimaryButton type="submit">Ingresar</PrimaryButton>
      </div>
    </form>
  );
}

function RegisterForm({ onSuccess }: { onSuccess: () => void }) {
  const [f, setF] = useState({ nombre: "", apellido: "", email: "", pw: "", pw2: "" });
  const [terms, setTerms] = useState(false);
  const [touched, setTouched] = useState(false);

  const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(f.email);
  const pwOk = validatePassword(f.pw);
  const pwMatch = f.pw && f.pw === f.pw2;
  const valid = f.nombre && f.apellido && emailOk && pwOk && pwMatch && terms;

  return (
    <form
      className="space-y-4"
      noValidate
      onSubmit={(e) => {
        e.preventDefault();
        setTouched(true);
        if (!valid) return;
        onSuccess();
      }}
    >
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
          <a href="/legales/terminos" className="underline underline-offset-2 hover:text-[#C41E3A]">
            Términos y Condiciones
          </a>
          .
        </span>
      </label>

      <div className="pt-1">
        <PrimaryButton type="submit" disabled={!valid}>
          Crear cuenta
        </PrimaryButton>
      </div>
    </form>
  );
}

function LoginPage() {
  const [tab, setTab] = useState<"login" | "register">("login");
  const { setRole } = useDemoMode();
  const navigate = useNavigate();

  const enterAs = () => {
    setRole("empresa");
    navigate({ to: "/app" });
  };

  return (
    <AuthShell
      leftEyebrow="Molipay · Acceso"
      leftTitle="Tu plataforma de pagos, sin intermediarios."
      leftBody="Molipay opera bajo normativa BCRA. Tus datos viajan cifrados y se almacenan bajo los estándares del sistema financiero argentino."
    >
      {/* Tabs */}
      <div className="grid grid-cols-2 border-b mb-8" style={{ borderColor: "rgba(10,22,40,0.15)" }}>
        <button
          onClick={() => setTab("login")}
          className={`pb-3 text-sm font-semibold transition-colors ${
            tab === "login"
              ? "border-b-2 text-[#0A1628]"
              : "text-[#0A1628]/50"
          }`}
          style={{
            borderBottomColor: tab === "login" ? "#C41E3A" : "transparent",
          }}
        >
          Iniciar sesión
        </button>
        <button
          onClick={() => setTab("register")}
          className={`pb-3 text-sm font-semibold transition-colors ${
            tab === "register"
              ? "border-b-2 text-[#0A1628]"
              : "text-[#0A1628]/50"
          }`}
          style={{
            borderBottomColor: tab === "register" ? "#C41E3A" : "transparent",
          }}
        >
          Crear cuenta
        </button>
      </div>

      {/* Form content with transition */}
      <div className="relative overflow-hidden">
        <div
          className="transition-all duration-300 ease-in-out"
          style={{
            opacity: 1,
            transform: "translateX(0)",
          }}
        >
          {tab === "login" ? (
            <LoginForm onSuccess={enterAs} />
          ) : (
            <RegisterForm onSuccess={enterAs} />
          )}
        </div>
      </div>

      {/* Demo access */}
      <div className="mt-10">
        <div className="relative">
          <div className="absolute inset-0 flex items-center"><div className="w-full border-t" style={{ borderColor: "rgba(10,22,40,0.15)" }} /></div>
          <div className="relative flex justify-center">
            <span className="bg-[#F7F5F0] px-3 text-xs text-[#0A1628]/50 uppercase tracking-wide">Acceso demo</span>
          </div>
        </div>
        <button
          onClick={() => enterAs()}
          className="w-full mt-5 h-11 text-sm font-semibold transition-colors"
          style={{
            border: "1px solid rgba(10,22,40,0.2)",
            borderRadius: 2,
            color: "#0A1628",
            background: "transparent",
            letterSpacing: "0.06em",
            textTransform: "uppercase",
            fontSize: "0.75rem",
          }}
        >
          Ingresar como Empresa
        </button>
      </div>
    </AuthShell>
  );
}