import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { QrCode, Download, Printer, Smartphone, Store, Plus } from "lucide-react";
import { PageHeader, Card, Input, Label, BtnPrimary, BtnOutline, Stat, Badge } from "@/components/portal-shell";
import { toast } from "sonner";
import { FormDialog } from "@/components/form-dialog";

export const Route = createFileRoute("/app/qr")({ component: Page });

const qrs = [
  { n: "Caja principal", sc: "Sucursal Centro", cobrado: "$ 248.400", ops: 32, e: "Activo" },
  { n: "Caja secundaria", sc: "Sucursal Centro", cobrado: "$ 184.200", ops: 21, e: "Activo" },
  { n: "Sucursal Norte", sc: "Sucursal Norte", cobrado: "$ 92.800", ops: 14, e: "Activo" },
  { n: "Evento Mayo", sc: "Operaciones", cobrado: "$ 1.480.000", ops: 86, e: "Pausado" },
];

function Page() {
  const [nuevoOpen, setNuevoOpen] = useState(false);
  return (
    <>
      <PageHeader
        title="Pago por QR"
        description="Cobrá presencialmente con QR interoperables compatibles con cualquier billetera."
        action={<BtnPrimary onClick={() => setNuevoOpen(true)}><Plus size={16} /> Nuevo QR</BtnPrimary>}
      />

      <div className="grid md:grid-cols-4 gap-4 mb-6">
        <Stat label="QR activos" value="3" />
        <Stat label="Cobrado hoy" value="$ 64.220" sub="18 operaciones" />
        <Stat label="Cobrado este mes" value="$ 2.005.400" />
        <Stat label="Ticket promedio" value="$ 13.840" />
      </div>

      <div className="grid lg:grid-cols-[1fr_1fr] gap-6 mb-6">
        <Card>
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold flex items-center gap-2"><Store size={16} /> QR estático del comercio</h3>
            <Badge tone="success">Activo</Badge>
          </div>
          <div className="aspect-square max-w-sm mx-auto border-2 rounded-xl p-6 bg-white relative">
            <div className="w-full h-full bg-[linear-gradient(45deg,#000_25%,transparent_25%),linear-gradient(-45deg,#000_25%,transparent_25%),linear-gradient(45deg,transparent_75%,#000_75%),linear-gradient(-45deg,transparent_75%,#000_75%)] bg-[length:14px_14px] opacity-90 rounded" />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-14 h-14 rounded-md bg-white border-4 border-white flex items-center justify-center">
                <QrCode size={32} />
              </div>
            </div>
          </div>
          <div className="text-center mt-4">
            <div className="font-semibold">Empresa Demo SA</div>
            <div className="text-xs text-muted-foreground">CUIT 30-12345678-9 · Operaciones</div>
          </div>
          <div className="grid grid-cols-3 gap-2 mt-4">
            <BtnOutline className="text-xs"><Download size={13} /> PDF</BtnOutline>
            <BtnOutline className="text-xs"><Printer size={13} /> Imprimir</BtnOutline>
            <BtnOutline className="text-xs"><Smartphone size={13} /> Enviar</BtnOutline>
          </div>
        </Card>

        <Card>
          <h3 className="font-semibold mb-4">Generar QR con monto</h3>
          <form className="space-y-4">
            <div>
              <Label>Monto a cobrar</Label>
              <Input placeholder="$ 0,00" defaultValue="18400" />
            </div>
            <div>
              <Label>Concepto</Label>
              <Input placeholder="Venta caja 1" defaultValue="Venta mostrador" />
            </div>
            <div>
              <Label>Subcuenta de destino</Label>
              <select className="w-full h-10 px-3 rounded-md border bg-card text-sm">
                <option>Sucursal Centro</option>
                <option>Sucursal Norte</option>
                <option>Operaciones</option>
              </select>
            </div>
            <div>
              <Label>Validez</Label>
              <select className="w-full h-10 px-3 rounded-md border bg-card text-sm">
                <option>15 minutos</option>
                <option>1 hora</option>
                <option>24 horas</option>
              </select>
            </div>
            <BtnPrimary className="w-full">Generar QR dinámico</BtnPrimary>
            <div className="text-xs text-muted-foreground text-center">
              Se descontará comisión del 0,50% sobre el monto cobrado.
            </div>
          </form>
        </Card>
      </div>

      <Card className="p-0 overflow-hidden">
        <div className="px-5 py-4 border-b flex items-center justify-between">
          <h3 className="font-semibold">QR creados</h3>
          <button className="text-xs text-primary font-semibold">Ver historial completo</button>
        </div>
        <div className="hidden md:grid grid-cols-[1.4fr_1.2fr_1fr_0.8fr_0.8fr_auto] gap-4 px-5 py-2 border-b text-xs uppercase tracking-wide text-muted-foreground">
          <div>Nombre</div><div>Subcuenta</div><div>Cobrado mes</div><div>Operaciones</div><div>Estado</div><div></div>
        </div>
        {qrs.map((q, i) => (
          <div key={i} className="md:grid md:grid-cols-[1.4fr_1.2fr_1fr_0.8fr_0.8fr_auto] gap-4 px-5 py-3.5 border-b last:border-0 items-center">
            <div className="font-semibold text-sm">{q.n}</div>
            <div className="text-sm text-muted-foreground">{q.sc}</div>
            <div className="text-sm font-semibold">{q.cobrado}</div>
            <div className="text-sm text-muted-foreground">{q.ops}</div>
            <div><Badge tone={q.e === "Activo" ? "success" : "warn"}>{q.e}</Badge></div>
            <div className="flex gap-1">
              <BtnOutline className="h-8 px-2 text-xs"><Download size={12} /></BtnOutline>
              <BtnOutline className="h-8 px-2 text-xs">Ver</BtnOutline>
            </div>
          </div>
        ))}
      </Card>

      <FormDialog
        open={nuevoOpen}
        onClose={() => setNuevoOpen(false)}
        title="Nuevo QR de cobro"
        description="Creá un QR estático o dinámico para tu punto de venta."
        submitLabel="Generar QR"
        onSubmit={() => {
          setNuevoOpen(false);
          toast.success("QR generado correctamente");
        }}
      >
        <div>
          <Label>Nombre del QR</Label>
          <Input placeholder="Ej. Caja principal" />
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div>
            <Label>Tipo</Label>
            <select className="w-full h-10 px-3 rounded-md border bg-card text-sm">
              <option>Estático (monto libre)</option>
              <option>Dinámico (monto fijo)</option>
            </select>
          </div>
          <div>
            <Label>Subcuenta destino</Label>
            <select className="w-full h-10 px-3 rounded-md border bg-card text-sm">
              <option>Sucursal Centro</option>
              <option>Sucursal Norte</option>
              <option>Operaciones</option>
            </select>
          </div>
        </div>
        <div>
          <Label>Concepto sugerido</Label>
          <Input placeholder="Venta mostrador" />
        </div>
      </FormDialog>
    </>
  );
}
