import { createFileRoute } from "@tanstack/react-router";
import { RegistroPage } from "./registro";

export const Route = createFileRoute("/registro/empresa")({
  head: () => ({
    meta: [
      { title: "Registrar empresa — Molipay" },
      { name: "description", content: "Registrá tu empresa en Molipay." },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: () => <RegistroPage tipo="juridica" />,
});
