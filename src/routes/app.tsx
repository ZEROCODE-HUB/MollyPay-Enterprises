import { createFileRoute, Outlet, useNavigate } from "@tanstack/react-router";
import { useEffect } from "react";
import {
  LayoutDashboard,
  ArrowLeftRight,
  Users,
  Wallet,
  Link2,
  QrCode,
  Receipt,
  Upload,
  History,
  UserCog,
  Shield,
} from "lucide-react";
import { PortalShell, type NavItem } from "@/components/portal-shell";
import { useDemoMode } from "@/contexts/demo-mode";

export const Route = createFileRoute("/app")({
  component: AppLayout,
});

const nav: NavItem[] = [
  { to: "/app", label: "Dashboard", icon: LayoutDashboard },
  { to: "/app/transferencias", label: "Transferencias", icon: ArrowLeftRight },
  { to: "/app/destinatarios", label: "Destinatarios", icon: Users },
  { to: "/app/subcuentas", label: "Subcuentas", icon: Wallet },
  { to: "/app/link-pago", label: "Link de pago", icon: Link2 },
  { to: "/app/qr", label: "Pago QR", icon: QrCode },
  { to: "/app/servicios", label: "Pago de servicios", icon: Receipt },
  { to: "/app/cobros", label: "Cobros masivos", icon: Upload },
  { to: "/app/historial", label: "Historial", icon: History },
  { to: "/app/cuenta", label: "Mi cuenta", icon: UserCog },
  { to: "/app/seguridad", label: "Seguridad", icon: Shield },
];

function AppLayout() {
  const { role, setRole } = useDemoMode();
  const navigate = useNavigate();
  useEffect(() => {
    if (role !== "empresa") setRole("empresa");
  }, [role, setRole]);

  return (
    <PortalShell nav={nav} title="Portal Empresa">
      <Outlet />
    </PortalShell>
  );
}
