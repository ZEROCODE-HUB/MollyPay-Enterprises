import { X } from "lucide-react";
import { useNavigate } from "@tanstack/react-router";
import { useDemoMode, type DemoRole } from "@/contexts/demo-mode";

export function DemoBanner() {
  const { role, setRole, bannerHidden, hideBanner } = useDemoMode();
  const navigate = useNavigate();

  if (!role || bannerHidden) return null;

  const label = role === "empresa" ? "Cliente Corporativo" : "Administrador Backoffice";

  const onChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const next = e.target.value as DemoRole;
    setRole(next);
    navigate({ to: next === "empresa" ? "/app" : "/admin" });
  };

  return (
    <div
      className="w-full flex items-center justify-between gap-3 px-4 py-2 text-sm"
      style={{ background: "var(--brand-soft)", color: "var(--brand-dark)" }}
    >
      <span className="font-semibold">
        Modo demo — Rol activo: <span className="font-semibold">{label}</span>
      </span>
      <div className="flex items-center gap-3">
        <select
          value={role}
          onChange={onChange}
          className="bg-white/70 border border-[color:var(--brand-dark)]/20 rounded px-2 py-1 text-xs font-semibold"
        >
          <option value="empresa">Cliente Corporativo</option>
          <option value="admin">Administrador Backoffice</option>
        </select>
        <button onClick={hideBanner} aria-label="Cerrar banner" className="p-1 hover:opacity-70">
          <X size={16} />
        </button>
      </div>
    </div>
  );
}
