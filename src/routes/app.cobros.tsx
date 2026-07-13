import { createFileRoute, Outlet, useRouterState, useNavigate } from "@tanstack/react-router";
import { PageHeader } from "@/components/portal-shell";
import { LayoutDashboard, List, Plus } from "lucide-react";
import { RouteSkeleton } from "@/components/route-skeleton";

export const Route = createFileRoute("/app/cobros")({
  component: Layout,
  pendingComponent: RouteSkeleton,
});

const tabs = [
  { path: "/app/cobros", label: "Dashboard", icon: LayoutDashboard },
  { path: "/app/cobros/gestion", label: "Gestión de lotes", icon: List },
  {
    path: "/app/cobros/nuevo",
    label: "Nuevo lote",
    icon: Plus,
    style:
      "ml-auto flex items-center gap-2 px-4 py-2.5 text-sm font-semibold border-2 border-primary rounded-lg text-primary hover:bg-primary/5 transition",
  },
];

function Layout() {
  const path = useRouterState({ select: (s) => s.location.pathname });
  const navigate = useNavigate();

  return (
    <>
      <PageHeader
        title="Cobros Masivos"
        description="Automatizá la generación de cobros recurrentes: links de pago, códigos QR y CBU para cada deudor."
      />
      <div className="flex gap-1 mb-6 border-b overflow-x-auto">
        {tabs.map((t) => {
          const active =
            path === t.path ||
            (t.path !== "/app/cobros" && t.path !== "/app/cobros/nuevo" && path.startsWith(t.path));
          const defaultClass =
            "flex items-center gap-2 px-4 py-2.5 text-sm font-semibold border-b-2 -mb-px transition whitespace-nowrap";
          return (
            <button
              key={t.path}
              onClick={() => navigate({ to: t.path })}
              className={
                t.style
                  ? t.style
                  : `${defaultClass} ${
                      active
                        ? "border-primary text-foreground"
                        : "border-transparent text-muted-foreground hover:text-foreground"
                    }`
              }
            >
              <t.icon size={15} />
              {t.label}
            </button>
          );
        })}
      </div>
      <Outlet />
    </>
  );
}
