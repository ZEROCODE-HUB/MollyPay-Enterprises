import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Copy, Share2, Link2, Mail, MessageCircle, Eye, MoreVertical, Plus } from "lucide-react";
import { PageHeader, Card, Input, Label, BtnPrimary, BtnOutline, Stat, Badge } from "@/components/portal-shell";
import { toast } from "sonner";
import { FormDialog } from "@/components/form-dialog";

export const Route = createFileRoute("/app/link-pago")({ component: Page });

const links = [
  { d: "Factura 0034 — Proveedor SA", m: "$ 92.800", e: "Pagado", v: 12, f: "Hoy" },
  { d: "Inscripción curso Mayo", m: "Libre", e: "Activo", v: 86, f: "Ayer" },
  { d: "Adelanto consultoría", m: "$ 350.000", e: "Activo", v: 3, f: "30/05" },
  { d: "Factura 0033", m: "$ 64.800", e: "Vencido", v: 5, f: "25/05" },
];

function Page() {
  const [link, setLink] = useState<string | null>(null);
  const [nuevoOpen, setNuevoOpen] = useState(false);
  return (
    <>
      <PageHeader
        title="Link de pago"
        description="Generá links de cobro únicos, con monto fijo o libre, y compartilos por cualquier canal."
        action={<BtnPrimary onClick={() => setNuevoOpen(true)}><Plus size={16} /> Nuevo link</BtnPrimary>}
      />

      <div className="grid md:grid-cols-4 gap-4 mb-6">
        <Stat label="Links activos" value="12" />
        <Stat label="Cobrado este mes" value="$ 1.840.200" sub="34 pagos completados" />
        <Stat label="Tasa de conversión" value="68%" sub="Vistas vs pagos" />
        <Stat label="Vencidos" value="2" sub="Renovar o reasignar" />
      </div>

      <div className="grid lg:grid-cols-[1fr_1fr] gap-6 mb-6">
        <Card>
          <h3 className="font-semibold mb-4 flex items-center gap-2"><Link2 size={16} /> Generar nuevo link</h3>
          <form className="space-y-4" onSubmit={(e) => { e.preventDefault(); setLink("https://pay.molly.com.ar/l/9k2x7"); }}>
            <div>
              <Label>Tipo de monto</Label>
              <div className="grid grid-cols-2 gap-2">
                <label className="border rounded-md p-3 text-sm font-semibold flex items-center gap-2 cursor-pointer has-[:checked]:border-primary has-[:checked]:bg-[color:var(--brand-soft)]">
                  <input type="radio" name="tipo" defaultChecked /> Monto fijo
                </label>
                <label className="border rounded-md p-3 text-sm flex items-center gap-2 cursor-pointer has-[:checked]:border-primary has-[:checked]:bg-[color:var(--brand-soft)]">
                  <input type="radio" name="tipo" /> Monto libre
                </label>
              </div>
            </div>
            <div className="grid sm:grid-cols-2 gap-3">
              <div><Label>Monto</Label><Input defaultValue="92800" /></div>
              <div>
                <Label>Vencimiento</Label>
                <Input type="date" />
              </div>
            </div>
            <div>
              <Label>Descripción</Label>
              <Input defaultValue="Factura 0034" />
            </div>
            <div className="grid sm:grid-cols-2 gap-3">
              <div>
                <Label>Subcuenta de destino</Label>
                <select className="w-full h-10 px-3 rounded-md border bg-card text-sm">
                  <option>Operaciones</option>
                  <option>Sucursal Centro</option>
                  <option>Sucursal Norte</option>
                </select>
              </div>
              <div>
                <Label>Pagos permitidos</Label>
                <select className="w-full h-10 px-3 rounded-md border bg-card text-sm">
                  <option>Un solo pago</option>
                  <option>Múltiples pagos</option>
                </select>
              </div>
            </div>
            <div className="flex items-center gap-3 text-xs">
              <label className="flex items-center gap-2"><input type="checkbox" defaultChecked /> Notificar por email al cobrar</label>
              <label className="flex items-center gap-2"><input type="checkbox" /> Solicitar DNI al pagar</label>
            </div>
            <BtnPrimary type="submit" className="w-full">Generar link</BtnPrimary>
          </form>
        </Card>

        <Card>
          {link ? (
            <>
              <div className="text-xs text-muted-foreground uppercase tracking-wide">Link generado</div>
              <div className="font-mono text-sm break-all mt-2 p-3 bg-muted rounded">{link}</div>
              <div className="grid grid-cols-3 gap-2 mt-3">
                <BtnOutline className="text-xs"><Copy size={13} /> Copiar</BtnOutline>
                <BtnOutline className="text-xs"><MessageCircle size={13} /> WhatsApp</BtnOutline>
                <BtnOutline className="text-xs"><Mail size={13} /> Email</BtnOutline>
              </div>
              <div className="mt-6 border rounded-md p-5 bg-gradient-to-br from-[color:var(--brand-soft)] to-card">
                <div className="text-xs text-muted-foreground">Vista previa</div>
                <div className="text-sm font-semibold mt-2">Factura 0034</div>
                <div className="text-3xl font-semibold mt-1">$ 92.800,00</div>
                <div className="text-xs text-muted-foreground mt-1">Vence: sin vencimiento</div>
                <BtnPrimary className="w-full mt-4">Pagar ahora</BtnPrimary>
                <div className="text-[10px] text-center text-muted-foreground mt-3">Procesado por Molly Money Life</div>
              </div>
            </>
          ) : (
            <div className="h-full flex flex-col items-center justify-center text-center py-12">
              <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center mb-3">
                <Share2 size={24} className="text-muted-foreground" />
              </div>
              <div className="font-semibold">Vista previa del link</div>
              <div className="text-sm text-muted-foreground mt-1 max-w-xs">
                Completá el formulario y vas a ver acá cómo se verá tu link antes de compartirlo.
              </div>
            </div>
          )}
        </Card>
      </div>

      <Card className="p-0 overflow-hidden">
        <div className="px-5 py-4 border-b flex items-center justify-between">
          <h3 className="font-semibold">Links recientes</h3>
          <button className="text-xs text-primary font-semibold">Ver todos</button>
        </div>
        <div className="hidden md:grid grid-cols-[2fr_1fr_1fr_0.6fr_0.8fr_auto] gap-4 px-5 py-2 border-b text-xs uppercase tracking-wide text-muted-foreground">
          <div>Descripción</div><div>Monto</div><div>Estado</div><div>Vistas</div><div>Creado</div><div></div>
        </div>
        {links.map((l, i) => (
          <div key={i} className="md:grid md:grid-cols-[2fr_1fr_1fr_0.6fr_0.8fr_auto] gap-4 px-5 py-3.5 border-b last:border-0 items-center">
            <div className="font-semibold text-sm">{l.d}</div>
            <div className="text-sm">{l.m}</div>
            <div><Badge tone={l.e === "Pagado" ? "success" : l.e === "Activo" ? "neutral" : "danger"}>{l.e}</Badge></div>
            <div className="text-sm text-muted-foreground flex items-center gap-1"><Eye size={12} /> {l.v}</div>
            <div className="text-xs text-muted-foreground">{l.f}</div>
            <div className="flex gap-1">
              <BtnOutline className="h-8 px-2 text-xs"><Copy size={12} /></BtnOutline>
              <button className="h-8 w-8 inline-flex items-center justify-center rounded-md border bg-card hover:bg-accent"><MoreVertical size={12} /></button>
            </div>
          </div>
        ))}
      </Card>

      <FormDialog
        open={nuevoOpen}
        onClose={() => setNuevoOpen(false)}
        title="Nuevo link de pago"
        description="Generá un link único para cobrar por cualquier canal."
        submitLabel="Generar link"
        size="lg"
        onSubmit={() => {
          setNuevoOpen(false);
          setLink("https://pay.molly.com.ar/l/9k2x7");
          toast.success("Link de pago generado");
        }}
      >
        <div>
          <Label>Descripción</Label>
          <Input placeholder="Factura 0034" />
        </div>
        <div className="grid sm:grid-cols-2 gap-3">
          <div>
            <Label>Tipo de monto</Label>
            <select className="w-full h-10 px-3 rounded-md border bg-card text-sm">
              <option>Monto fijo</option>
              <option>Monto libre</option>
            </select>
          </div>
          <div>
            <Label>Monto</Label>
            <Input placeholder="$ 0,00" />
          </div>
        </div>
        <div className="grid sm:grid-cols-2 gap-3">
          <div>
            <Label>Subcuenta destino</Label>
            <select className="w-full h-10 px-3 rounded-md border bg-card text-sm">
              <option>Operaciones</option>
              <option>Sucursal Centro</option>
              <option>Sucursal Norte</option>
            </select>
          </div>
          <div>
            <Label>Vencimiento</Label>
            <Input type="date" />
          </div>
        </div>
        <label className="flex items-center gap-2 text-xs">
          <input type="checkbox" defaultChecked /> Notificar por email al cobrar
        </label>
      </FormDialog>
    </>
  );
}
