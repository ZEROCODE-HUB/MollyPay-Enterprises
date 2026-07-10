import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import {
  Search,
  Link2,
  Unlink,
  RefreshCw,
  ShoppingCart,
  ArrowLeftRight,
  QrCode,
  Link as LinkIcon,
} from "lucide-react";
import { PageHeader, Card, Input, BtnPrimary, BtnOutline, Badge } from "@/components/portal-shell";
import { toast } from "sonner";
import { FormDialog } from "@/components/form-dialog";
import { integrationPlatforms, type Product } from "@/data/links-pago";

export const Route = createFileRoute("/app/link-pago/e-commerce")({ component: Page });

const syncedProducts: Product[] = [
  { id: "sp1", name: "Remera estampada", qty: 50, price: 8900 },
  { id: "sp2", name: "Taza personalizada", qty: 100, price: 4500 },
  { id: "sp3", name: "Gorro bordado", qty: 30, price: 6500 },
  { id: "sp4", name: "Bolso ecol\u00f3gico", qty: 25, price: 12000 },
];

function Page() {
  const [platforms, setPlatforms] = useState(integrationPlatforms);
  const [chargeOpen, setChargeOpen] = useState(false);
  const [selectedSync, setSelectedSync] = useState<string[]>([]);

  const toggleConnect = (id: string) => {
    setPlatforms((prev) =>
      prev.map((p) =>
        p.id === id
          ? {
              ...p,
              connected: !p.connected,
              since: !p.connected ? new Date().toLocaleDateString("es-AR") : undefined,
              products: p.products || 0,
            }
          : p,
      ),
    );
    const p = platforms.find((x) => x.id === id);
    toast.success(p ? (p.connected ? p.name + " desconectada" : p.name + " conectada") : "");
  };

  return (
    <>
      <div className="grid md:grid-cols-3 gap-4 mb-6">
        {platforms.map((p) => (
          <Card key={p.id}>
            <div className="flex items-center justify-between mb-3">
              <div className="w-10 h-10 rounded-md bg-[color:var(--brand-soft)] flex items-center justify-center text-sm font-bold text-[color:var(--brand-dark)]">
                {p.logo}
              </div>
              <Badge tone={p.connected ? "success" : "neutral"}>
                {p.connected ? "Conectada" : "Desconectada"}
              </Badge>
            </div>
            <div className="font-semibold">{p.name}</div>
            {p.connected ? (
              <div className="text-xs text-muted-foreground mt-1">
                Conectada desde {p.since} \u00b7 {p.products} productos
              </div>
            ) : (
              <div className="text-xs text-muted-foreground mt-1">No conectada</div>
            )}
            <div className="flex gap-2 mt-4">
              {p.connected ? (
                <>
                  <BtnOutline className="flex-1 text-xs" onClick={() => setChargeOpen(true)}>
                    <ShoppingCart size={13} /> Cobrar
                  </BtnOutline>
                  <BtnOutline className="h-9 w-9 p-0" onClick={() => toggleConnect(p.id)}>
                    <Unlink size={14} />
                  </BtnOutline>
                </>
              ) : (
                <BtnPrimary className="flex-1" onClick={() => toggleConnect(p.id)}>
                  <Link2 size={14} /> Conectar
                </BtnPrimary>
              )}
            </div>
          </Card>
        ))}
      </div>

      {platforms.filter((p) => p.connected).length > 0 && (
        <Card className="p-0 overflow-hidden">
          <div className="px-5 py-4 border-b flex items-center justify-between">
            <h3 className="font-semibold text-sm">Productos sincronizados</h3>
            <BtnOutline className="h-8 px-3 text-xs">
              <RefreshCw size={12} /> Sincronizar
            </BtnOutline>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-[11px] uppercase tracking-wide text-muted-foreground border-b bg-muted/30">
                  <th className="w-10 px-3 py-2.5">
                    <input
                      type="checkbox"
                      onChange={(e) =>
                        setSelectedSync(e.target.checked ? syncedProducts.map((p) => p.id) : [])
                      }
                    />
                  </th>
                  <th className="text-left px-3 py-2.5">Producto</th>
                  <th className="text-right px-3 py-2.5">Stock</th>
                  <th className="text-right px-3 py-2.5">Precio</th>
                </tr>
              </thead>
              <tbody>
                {syncedProducts.map((p) => (
                  <tr key={p.id} className="border-b last:border-0 hover:bg-muted/30">
                    <td className="px-3 py-3">
                      <input
                        type="checkbox"
                        checked={selectedSync.includes(p.id)}
                        onChange={() =>
                          setSelectedSync((prev) =>
                            prev.includes(p.id) ? prev.filter((x) => x !== p.id) : [...prev, p.id],
                          )
                        }
                      />
                    </td>
                    <td className="px-3 py-3 font-semibold">{p.name}</td>
                    <td className="px-3 py-3 text-right">{p.qty}</td>
                    <td className="px-3 py-3 text-right font-semibold">
                      ${p.price.toLocaleString("es-AR")}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="px-5 py-3 border-t flex gap-2">
            <BtnPrimary
              className="text-xs"
              disabled={selectedSync.length === 0}
              onClick={() => {
                if (selectedSync.length > 0) setChargeOpen(true);
              }}
            >
              <ShoppingCart size={13} /> Cobrar seleccionados
            </BtnPrimary>
          </div>
        </Card>
      )}

      <FormDialog
        open={chargeOpen}
        onClose={() => setChargeOpen(false)}
        title="Esquema de cobro"
        description="Eleg\u00ed c\u00f3mo quer\u00e9s cobrar los productos seleccionados."
        submitLabel="Generar"
        onSubmit={() => {
          setChargeOpen(false);
          toast.success("Esquema de cobro generado");
        }}
      >
        <div className="space-y-3">
          <label className="flex items-center gap-3 p-3 border rounded-md cursor-pointer hover:bg-muted transition">
            <input type="radio" name="scheme" defaultChecked />
            <ArrowLeftRight size={18} className="text-muted-foreground" />
            <div>
              <div className="font-semibold text-sm">Transferencia</div>
              <div className="text-xs text-muted-foreground">
                El cliente paga por transferencia bancaria
              </div>
            </div>
          </label>
          <label className="flex items-center gap-3 p-3 border rounded-md cursor-pointer hover:bg-muted transition">
            <input type="radio" name="scheme" />
            <QrCode size={18} className="text-muted-foreground" />
            <div>
              <div className="font-semibold text-sm">C\u00f3digo QR</div>
              <div className="text-xs text-muted-foreground">
                Gener\u00e1 un QR para que el cliente escanee y pague
              </div>
            </div>
          </label>
          <label className="flex items-center gap-3 p-3 border rounded-md cursor-pointer hover:bg-muted transition">
            <input type="radio" name="scheme" />
            <LinkIcon size={18} className="text-muted-foreground" />
            <div>
              <div className="font-semibold text-sm">Link de Pago</div>
              <div className="text-xs text-muted-foreground">
                Cre\u00e1 un link de pago con los productos seleccionados
              </div>
            </div>
          </label>
        </div>
      </FormDialog>
    </>
  );
}
