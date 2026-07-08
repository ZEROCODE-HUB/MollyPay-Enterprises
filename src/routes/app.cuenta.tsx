import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Building2, Upload, FileText, CheckCircle2, AlertCircle, CreditCard, SlidersHorizontal, Download, Landmark } from "lucide-react";
import { PageHeader, Card, Input, Label, BtnPrimary, BtnOutline, Badge, Stat } from "@/components/portal-shell";
import { toast } from "sonner";
import { MollyLogo } from "@/components/molly-logo";

export const Route = createFileRoute("/app/cuenta")({ component: Page });


const docs = [
  { n: "Estatuto social", e: "Validado", f: "15/02/2026" },
  { n: "Constancia de CUIT", e: "Validado", f: "15/02/2026" },
  { n: "Acta de designación de autoridades", e: "Validado", f: "20/02/2026" },
  { n: "Balance último ejercicio", e: "Pendiente", f: "-" },
];

const plan = {
  nombre: "Plan Empresa",
  precio: "$ 48.000 / mes",
  ops: "5.000 operaciones incluidas",
  used: 3240,
  total: 5000,
};

function Page() {
  return (
    <>
      <PageHeader
        title="Mi cuenta"
        description="Datos del titular, documentación, facturación y plan."
      />

      <div className="grid md:grid-cols-4 gap-4 mb-6">
        <Stat label="Estado KYC" value="Validado" sub="Aprobado 20/02/2026" />
        <Stat label="Antigüedad" value="3 meses" />
        <Stat label="Plan actual" value="Empresa" sub="$ 48.000/mes" />
        <Stat label="Ops del mes" value="3.240 / 5.000" />
      </div>

      <div className="grid lg:grid-cols-[1.4fr_1fr] gap-6">
        <div className="space-y-6">
          <Card>
            <h3 className="font-semibold mb-4 flex items-center gap-2"><Building2 size={16} /> Datos de la empresa</h3>
            <form className="grid sm:grid-cols-2 gap-4">
              <div><Label>Razón social</Label><Input defaultValue="Empresa Demo SA" /></div>
              <div><Label>Nombre de fantasía</Label><Input defaultValue="Empresa Demo" /></div>
              <div><Label>CUIT</Label><Input defaultValue="30-12345678-9" /></div>
              <div><Label>Tipo societario</Label>
                <select className="w-full h-10 px-3 rounded-md border bg-card text-sm">
                  <option>Sociedad Anónima</option>
                  <option>SRL</option>
                  <option>SAS</option>
                </select>
              </div>
              <div><Label>Actividad principal</Label><Input defaultValue="Servicios financieros" /></div>
              <div><Label>Inicio de actividades</Label><Input type="date" defaultValue="2024-03-15" /></div>
              <div><Label>Email de contacto</Label><Input defaultValue="hola@empresademo.com" /></div>
              <div><Label>Teléfono</Label><Input defaultValue="+54 11 4555 0000" /></div>
              <div className="sm:col-span-2"><Label>Domicilio fiscal</Label><Input defaultValue="Av. Corrientes 1234, CABA" /></div>
              <div className="sm:col-span-2 flex gap-2 justify-end">
                <BtnOutline>Cancelar</BtnOutline>
                <BtnPrimary>Guardar cambios</BtnPrimary>
              </div>
            </form>
          </Card>

          <Card>
            <h3 className="font-semibold mb-4 flex items-center gap-2"><FileText size={16} /> Documentación KYC/KYB</h3>
            <div className="divide-y">
              {docs.map((d) => (
                <div key={d.n} className="flex items-center justify-between py-3">
                  <div className="flex items-center gap-3">
                    {d.e === "Validado"
                      ? <CheckCircle2 size={16} className="text-emerald-600" />
                      : <AlertCircle size={16} className="text-amber-600" />}
                    <div>
                      <div className="text-sm font-semibold">{d.n}</div>
                      <div className="text-xs text-muted-foreground">Subido el {d.f}</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge tone={d.e === "Validado" ? "success" : "warn"}>{d.e}</Badge>
                    <BtnOutline className="h-9 px-3 text-xs"><Upload size={12} /> Reemplazar</BtnOutline>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>

        <div className="space-y-6">
          <Card className="bg-gradient-to-br from-[color:var(--brand-soft)] to-card">
            <div className="flex items-center justify-between mb-2">
              <h3 className="font-semibold">{plan.nombre}</h3>
              <Badge tone="success">Activo</Badge>
            </div>
            <div className="text-2xl font-semibold">{plan.precio}</div>
            <div className="text-xs text-muted-foreground">{plan.ops}</div>

            <div className="mt-4">
              <div className="flex justify-between text-xs mb-1">
                <span className="text-muted-foreground">Consumo del mes</span>
                <span className="font-semibold">{plan.used} / {plan.total}</span>
              </div>
              <div className="h-2 rounded-full bg-muted overflow-hidden">
                <div className="h-full bg-primary rounded-full" style={{ width: `${(plan.used / plan.total) * 100}%` }} />
              </div>
            </div>

            <div className="flex gap-2 mt-5">
              <BtnPrimary className="flex-1">Ampliar plan</BtnPrimary>
              <BtnOutline>Ver detalle</BtnOutline>
            </div>
          </Card>

          <Card>
            <h3 className="font-semibold mb-3 flex items-center gap-2"><CreditCard size={16} /> Facturación</h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between"><span className="text-muted-foreground">Método de pago</span><span className="font-semibold">Débito CBU</span></div>
              <div className="flex justify-between"><span className="text-muted-foreground">Próxima factura</span><span className="font-semibold">01/07/2026</span></div>
              <div className="flex justify-between"><span className="text-muted-foreground">Monto estimado</span><span className="font-semibold">$ 48.000</span></div>
            </div>
            <BtnOutline className="w-full mt-4">Ver historial de facturas</BtnOutline>
          </Card>

          <Card>
            <h3 className="font-semibold text-sm mb-3">Representantes legales</h3>
            <div className="space-y-3 text-sm">
              <div>
                <div className="font-semibold">Carla Rivas</div>
                <div className="text-xs text-muted-foreground">CUIT 27-30123456-7 · Presidenta</div>
              </div>
              <div>
                <div className="font-semibold">Diego Méndez</div>
                <div className="text-xs text-muted-foreground">CUIT 20-29888777-3 · Apoderado</div>
              </div>
            </div>
          </Card>

          <Card>
            <h3 className="font-semibold text-sm mb-3 flex items-center gap-2"><SlidersHorizontal size={14} /> Límites operativos</h3>
            <p className="text-[11px] text-muted-foreground mb-3">Configurados por Molly. Para modificarlos contactá a tu ejecutivo.</p>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between"><span className="text-muted-foreground">Monto máx. por transferencia</span><span className="font-semibold">$ 5.000.000</span></div>
              <div className="flex justify-between"><span className="text-muted-foreground">Operaciones diarias</span><span className="font-semibold">200</span></div>
              <div className="flex justify-between"><span className="text-muted-foreground">Monto acumulado diario</span><span className="font-semibold">$ 20.000.000</span></div>
              <div className="flex justify-between"><span className="text-muted-foreground">Horario operativo</span><span className="font-semibold">06:00 – 23:00</span></div>
            </div>
            <div className="mt-3 text-[11px] text-muted-foreground border-t pt-2">
              Última actualización: 01/06/2026 por equipo Molly
            </div>
          </Card>
        </div>
      </div>
    </>
  );
}
