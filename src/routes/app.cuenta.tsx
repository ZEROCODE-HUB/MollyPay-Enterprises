import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Building2, Upload, FileText, CheckCircle2, AlertCircle, CreditCard, SlidersHorizontal, Download, Landmark } from "lucide-react";
import { PageHeader, Card, Input, Label, BtnPrimary, BtnOutline, Badge } from "@/components/portal-shell";
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
  const [cbuPreview, setCbuPreview] = useState(false);
  const empresa = {
    nombre: "Empresa Demo SA",
    cuit: "30-12345678-9",
    cbu: "0000003 100012345678 90",
    alias: "molly.empresa.demo",
  };

  return (
    <>
      <PageHeader
        title="Mi cuenta"
        description="Datos del titular, documentación, facturación y plan."
      />

      <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mb-6">
        <div className="bg-card border rounded-lg p-2.5">
          <div className="text-[9px] uppercase tracking-wider text-muted-foreground">Estado KYC</div>
          <div className="text-sm font-semibold mt-0.5">Validado</div>
          <div className="text-[9px] text-muted-foreground">Aprobado 20/02/2026</div>
        </div>
        <div className="bg-card border rounded-lg p-2.5">
          <div className="text-[9px] uppercase tracking-wider text-muted-foreground">Antigüedad</div>
          <div className="text-sm font-semibold mt-0.5">3 meses</div>
        </div>
        <div className="bg-card border rounded-lg p-2.5">
          <div className="text-[9px] uppercase tracking-wider text-muted-foreground">Plan actual</div>
          <div className="text-sm font-semibold mt-0.5">Empresa</div>
          <div className="text-[9px] text-muted-foreground">$ 48.000/mes</div>
        </div>
        <div className="bg-card border rounded-lg p-2.5">
          <div className="text-[9px] uppercase tracking-wider text-muted-foreground">Ops del mes</div>
          <div className="text-sm font-semibold mt-0.5">3.240 / 5.000</div>
        </div>
      </div>

      <div className="grid lg:grid-cols-[1.4fr_1fr] gap-6">
        <div className="space-y-6">
          <Card>
            <h3 className="font-semibold mb-4 flex items-center gap-2"><Building2 size={16} /> Información del Usuario</h3>
            <div className="grid sm:grid-cols-2 gap-4">
              <div><Label>Nombre</Label><Input defaultValue="Carla" /></div>
              <div><Label>Apellido</Label><Input defaultValue="Rivas" /></div>
              <div><Label>Email</Label><Input defaultValue="carla@empresademo.com" /></div>
              <div>
                <Label>Estado</Label>
                <div className="pt-1.5"><Badge tone="success">Activo</Badge></div>
              </div>
            </div>
          </Card>

          <Card>
            <h3 className="font-semibold mb-4 flex items-center gap-2"><Building2 size={16} /> Información de la Empresa</h3>
            <form className="grid sm:grid-cols-2 gap-4">
              <div><Label>Nombre Legal</Label><Input defaultValue="Empresa Demo SA" /></div>
              <div><Label>Nombre Comercial</Label><Input defaultValue="Empresa Demo" /></div>
              <div><Label>CUIT de la empresa</Label><Input defaultValue="30-12345678-9" /></div>
              <div><Label>Tipo de empresa</Label>
                <select className="w-full h-10 px-3 rounded-md border bg-card text-sm">
                  <option>Sociedad Anónima</option>
                  <option>SRL</option>
                  <option>SAS</option>
                </select>
              </div>
              <div><Label>Actividad principal</Label><Input defaultValue="Servicios financieros" /></div>
              <div><Label>Fecha de Inscripción</Label><Input type="date" defaultValue="2024-03-15" /></div>
              <div><Label>Teléfono</Label><Input defaultValue="+54 11 4555 0000" /></div>
              <div><Label>Dirección</Label><Input defaultValue="Av. Corrientes 1234" /></div>
              <div><Label>Ciudad</Label><Input defaultValue="CABA" /></div>
              <div><Label>Provincia</Label><Input defaultValue="Buenos Aires" /></div>
              <div><Label>Código Postal</Label><Input defaultValue="C1043" /></div>
              <div className="sm:col-span-2 flex gap-2 justify-end">
                <BtnOutline>Cancelar</BtnOutline>
                <BtnPrimary>Guardar cambios</BtnPrimary>
              </div>
            </form>
          </Card>

          <Card>
            <h3 className="font-semibold mb-4 flex items-center gap-2"><FileText size={16} /> Información de Perfil</h3>
            <div className="grid sm:grid-cols-2 gap-4">
              <div><Label>CUIL</Label><Input defaultValue="27-30123456-7" /></div>
              <div><Label>DNI</Label><Input defaultValue="30.123.456" /></div>
              <div><Label>Género</Label>
                <select className="w-full h-10 px-3 rounded-md border bg-card text-sm">
                  <option>Femenino</option>
                  <option>Masculino</option>
                  <option>No binario</option>
                  <option>Prefiero no decirlo</option>
                </select>
              </div>
              <div><Label>Nacimiento</Label><Input type="date" defaultValue="1985-06-15" /></div>
              <div><Label>Ocupación</Label><Input defaultValue="Directora Financiera" /></div>
              <div><Label>Fuente de Fondos</Label>
                <select className="w-full h-10 px-3 rounded-md border bg-card text-sm">
                  <option>Actividad comercial</option>
                  <option>Servicios profesionales</option>
                  <option>Inversiones</option>
                  <option>Otros</option>
                </select>
              </div>
              <div>
                <Label>PEP</Label>
                <div className="pt-1.5 text-sm">No</div>
              </div>
            </div>
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
          <Card>
            <h3 className="font-semibold text-sm mb-3 flex items-center gap-2">
              <Landmark size={16} className="shrink-0 text-primary" />
              Información de CVU
            </h3>
            <div className="text-xs space-y-2">
              <div className="flex justify-between gap-2">
                <span className="text-muted-foreground">CVU</span>
                <span className="font-mono font-semibold truncate">{empresa.cbu}</span>
              </div>
              <div className="flex justify-between gap-2">
                <span className="text-muted-foreground">Alias</span>
                <span className="font-mono font-semibold truncate">{empresa.alias}</span>
              </div>
            </div>
          </Card>

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
            <div className="flex items-start justify-between gap-3 mb-2">
              <h3 className="font-semibold text-sm flex items-center gap-2 min-w-0">
                <Landmark size={16} className="shrink-0 text-primary" />
                <span className="truncate">Constancia de CBU</span>
              </h3>
              <Badge tone="success">Oficial</Badge>
            </div>
            <p className="text-xs text-muted-foreground mb-3">
              Documento oficial con razón social, CUIT, CBU y alias — útil para acreditar tu cuenta ante terceros.
            </p>
            <BtnPrimary className="w-full" onClick={() => setCbuPreview(true)}>
              <Download size={14} /> Descargar constancia (PDF)
            </BtnPrimary>
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

      {cbuPreview && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/50" onClick={() => setCbuPreview(false)} />
          <div className="relative bg-card rounded-lg max-w-lg w-full max-h-[90vh] overflow-y-auto shadow-xl">
            <div className="sticky top-0 bg-card border-b px-6 py-4 flex justify-between items-center z-10">
              <div className="font-semibold">Vista previa — Constancia de CBU</div>
              <BtnOutline className="h-8 px-3 text-xs" onClick={() => setCbuPreview(false)}>Cerrar</BtnOutline>
            </div>
            <div className="p-8 space-y-5">
              <div className="flex items-center justify-between border-b pb-4">
                <MollyLogo />
                <div className="text-right text-xs text-muted-foreground">
                  <div className="font-mono font-semibold text-foreground">CBU-EMP-2026-000042</div>
                  <div>Generado: {new Date().toLocaleString("es-AR")}</div>
                </div>
              </div>
              <h2 className="text-xl font-semibold">Constancia de CBU</h2>
              <p className="text-xs text-muted-foreground">
                Molly Money Life SA certifica que la siguiente cuenta está activa a nombre de la empresa detallada:
              </p>
              <Card className="bg-muted/30">
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between gap-3"><span className="text-muted-foreground">Razón social</span><span className="font-semibold text-right">{empresa.nombre}</span></div>
                  <div className="flex justify-between gap-3"><span className="text-muted-foreground">CUIT</span><span className="font-mono font-semibold">{empresa.cuit}</span></div>
                  <div className="flex justify-between gap-3"><span className="text-muted-foreground">CBU</span><span className="font-mono font-semibold text-right break-all">{empresa.cbu}</span></div>
                  <div className="flex justify-between gap-3"><span className="text-muted-foreground">Alias</span><span className="font-mono font-semibold">{empresa.alias}</span></div>
                </div>
              </Card>
              <div className="text-[11px] text-muted-foreground border-t pt-3">
                Documento firmado digitalmente por Molly Money Life SA. Válido como constancia oficial de cuenta.
              </div>
              <div className="flex gap-2 pt-1">
                <BtnOutline className="flex-1" onClick={() => setCbuPreview(false)}>Cancelar</BtnOutline>
                <BtnPrimary
                  className="flex-1"
                  onClick={() => {
                    setCbuPreview(false);
                    toast.success("Constancia de CBU descargada");
                  }}
                >
                  <Download size={14} /> Descargar PDF
                </BtnPrimary>
              </div>
            </div>
          </div>
        </div>
      )}
    </>

  );
}
