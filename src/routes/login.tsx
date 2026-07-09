import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import heroImg from "@/assets/login-hero.jpg";
import { MollyLogo } from "@/components/molly-logo";
import { useDemoMode } from "@/contexts/demo-mode";

export const Route = createFileRoute("/login")({
  head: () => ({
    meta: [
      { title: "Ingresar — Molly Money Life" },
      { name: "description", content: "Accedé al portal de Molly Money Life. Modo demo disponible." },
    ],
  }),
  component: LoginPage,
});

function LoginPage() {
  const [tab, setTab] = useState<"login" | "register">("login");
  const { setRole } = useDemoMode();
  const navigate = useNavigate();

  const enterAs = () => {
    setRole("empresa");
    navigate({ to: "/app" });
  };

  return (
    <div className="min-h-screen grid lg:grid-cols-2">
      {/* Izquierda: imagen */}
      <div className="relative hidden lg:block">
        <img src={heroImg} alt="" loading="lazy" className="absolute inset-0 w-full h-full object-cover" width={1024} height={1280} />
        <div className="absolute inset-0" style={{ background: "color-mix(in oklab, var(--brand-dark) 80%, transparent)" }} />
        <div className="relative h-full flex flex-col items-center justify-center px-12 text-center">
          <MollyLogo variant="light" className="scale-150" />
          <p className="mt-8 text-white/90 text-lg max-w-sm font-normal">
            Tu plataforma de pagos, sin intermediarios.
          </p>
        </div>
      </div>

      {/* Derecha: formulario */}
      <div className="flex flex-col bg-background">
        {/* Header móvil */}
        <div className="lg:hidden p-6 text-center" style={{ background: "var(--brand-dark)" }}>
          <MollyLogo variant="light" />
          <p className="mt-2 text-white/85 text-sm">Tu plataforma de pagos, sin intermediarios.</p>
        </div>

        <div className="flex-1 flex items-center justify-center p-6 md:p-12">
          <div className="w-full max-w-sm">
            <div className="grid grid-cols-2 border-b mb-8">
              <button
                onClick={() => setTab("login")}
                className={`pb-3 text-sm font-semibold ${tab === "login" ? "border-b-2 border-primary text-foreground" : "text-muted-foreground"}`}
              >
                Iniciar sesión
              </button>
              <button
                onClick={() => setTab("register")}
                className={`pb-3 text-sm font-semibold ${tab === "register" ? "border-b-2 border-primary text-foreground" : "text-muted-foreground"}`}
              >
                Registrar empresa
              </button>
            </div>

            {tab === "login" ? (
              <form
                className="space-y-4"
                onSubmit={(e) => {
                  e.preventDefault();
                  enterAs();
                }}
              >
                <Field label="Email" type="email" placeholder="hola@empresa.com" />
                <Field label="Contraseña" type="password" placeholder="••••••••" />
                <button className="w-full h-11 rounded-md bg-primary text-primary-foreground font-semibold text-sm">
                  Ingresar
                </button>
              </form>
            ) : (
              <form
                className="space-y-4"
                onSubmit={(e) => {
                  e.preventDefault();
                  enterAs();
                }}
              >
                <Field label="Nombre de la empresa" placeholder="Empresa SA" />
                <Field label="CUIT" placeholder="30-12345678-9" />
                <Field label="Email" type="email" placeholder="hola@empresa.com" />
                <Field label="Contraseña" type="password" placeholder="••••••••" />
                <button className="w-full h-11 rounded-md bg-primary text-primary-foreground font-semibold text-sm">
                  Crear cuenta
                </button>
              </form>
            )}

            <div className="mt-10">
              <div className="relative">
                <div className="absolute inset-0 flex items-center"><div className="w-full border-t" /></div>
                <div className="relative flex justify-center">
                  <span className="bg-background px-3 text-xs text-muted-foreground uppercase tracking-wide">Acceso demo</span>
                </div>
              </div>
              <button
                onClick={() => enterAs()}
                className="w-full mt-5 h-11 rounded-md border border-border bg-card text-sm font-semibold hover:bg-accent"
              >
                Ingresar como Empresa
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Field({ label, ...p }: { label: string } & React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <div>
      <label className="text-xs font-semibold mb-1.5 block">{label}</label>
      <input
        {...p}
        className="w-full h-11 px-3 rounded-md border border-input bg-card text-sm outline-none focus:ring-2 focus:ring-ring/40 focus:border-ring"
      />
    </div>
  );
}
