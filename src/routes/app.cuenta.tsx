import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import {
  Building2, Upload, FileText, CheckCircle2, AlertCircle, CreditCard, SlidersHorizontal,
  Download, Landmark, User, Shield, Activity, TrendingUp,
} from "lucide-react";
import { PageHeader, Card, Input, Label, BtnPrimary, BtnOutline, Badge } from "@/components/portal-shell";
import { toast } from "sonner";
import { MollyLogo } from "@/components/molly-logo";
import { useOnboarding } from "@/lib/onboarding-store";

export const Route = createFileRoute("/app/cuenta")({ component: Page });

const docsPJ = [
  { n: "Estatuto social", e: "Validado", f: "15/02/2026" },
  { n: "Constancia de CUIT", e: "Validado", f: "15/02/2026" },
  { n: "Acta de designaci\u00f3n de autoridades", e: "Validado", f: "20/02/2026" },
  { n: "Balance \u00faltimo ejercicio", e: "Pendiente", f: "-" },
];

const docsPF = [
  { n: "DNI (frente y dorso)", e: "Validado", f: "15/02/2026" },
  { n: "Comprobante de servicio", e: "Validado", f: "15/02/2026" },
  { n: "Selfie con DNI", e: "Validado", f: "20/02/2026" },
  { n: "Constancia de CUIT/CUIL", e: "Pendiente", f: "-" },
];

const planEmpresa = {
  nombre: "Plan Empresa",
  precio: "$ 48.000 / mes",
  ops: "5.000 operaciones incluidas",
  used: 3240,
  total: 5000,
};

const planPersona = {
  nombre: "Plan Personal",
  precio: "$ 9.900 / mes",
  ops: "500 operaciones incluidas",
  used: 278,
  total: 500,
};

function Page() {
  const [cbuPreview, setCbuPreview] = useState(false);
  const {
    tipoCuenta,
    registro,
    datosPersonales,
    datosEmpresa,
    kyc,
    emailValidado,
    aprobado,
  } = useOnboarding();

  const isPJ = tipoCuenta === "juridica";
  const plan = isPJ ? planEmpresa : planPersona;

  const userNombre = registro.nombre || (isPJ ? "Carla" : "Luc\u00eda");
  const userApellido = registro.apellido || (isPJ ? "Rivas" : "M\u00e9ndez");
  const userEmail = registro.email || (isPJ ? "carla@empresademo.com" : "lucia@example.com");
  const userNac = registro.fechaNac || (isPJ ? "1985-06-15" : "1991-09-22");

  const dp = {
    genero: datosPersonales.genero || (isPJ ? "Femenino" : "Femenino"),
    cuitCuil: datosPersonales.cuitCuil || (isPJ ? "27-30123456-7" : "27-32123456-6"),
    ocupacion: datosPersonales.ocupacion || (isPJ ? "Directora Financiera" : "Aut\u00f3nomo / Monotributista"),
    origenFondos: datosPersonales.origenFondos || "Actividad comercial",
    esPEP: datosPersonales.esPEP || false,
  };

  const empresaInfo = {
    nombreLegal: datosEmpresa.nombreLegal || "Empresa Demo SA",
    nombreFantasia: datosEmpresa.nombreFantasia || "Empresa Demo",
    cuit: datosEmpresa.cuit || "30-12345678-9",
    tipoId: datosEmpresa.tipoId || "Sociedad An\u00f3nima (SA)",
    fechaInscripcion: datosEmpresa.fechaInscripcion || "2024-03-15",
  };

  const dir = {
    direccion: kyc.direccion || "Av. Corrientes 1234",
    ciudad: kyc.ciudad || "CABA",
    provincia: kyc.provincia || "Buenos Aires",
    cp: kyc.cp || (isPJ ? "C1043" : "C1425"),
  };

  const cbu = isPJ
    ? { cbu: "0000003 100012345678 90", alias: "molly.empresa.demo" }
    : { cbu: "0000003 100098765432 10", alias: "molly.lucia.mendez" };

  const stats = [
    { icon: Shield, label: "Estado KYC", value: aprobado ? "Validado" : "Pendiente", sub: aprobado ? "Aprobado 20/02/2026" : "En revisi\u00f3n" },
    { icon: Activity, label: "Transacciones mes", value: plan.used.toLocaleString() + " / " + plan.total.toLocaleString() },
    { icon: User, label: isPJ ? "Antig\u00fcedad" : "Antig\u00fcedad", value: "4 meses" },
    { icon: TrendingUp, label: "Score de seguridad", value: "86 / 100", sub: "Recomendado: 80+" },
  ];

  return (
    <>
      <PageHeader
        title="Mi cuenta"
        description={isPJ
          ? "Datos del titular, documentaci\u00f3n societaria, facturaci\u00f3n y plan."
          : "Datos personales, documentaci\u00f3n KYC, facturaci\u00f3n y plan."}
      />

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mb-6">
        {stats.map((s) => (
          <div key={s.label} className="bg-card border rounded-lg p-2.5">
            <div className="flex items-center gap-1.5 text-[9px] uppercase tracking-wider text-muted-foreground mb-0.5">
              <s.icon size={12} className="shrink-0" />
              {s.label}
            </div>
            <div className="text-sm font-semibold mt-0.5">{s.value}</div>
            {s.sub && <div className="text-[9px] text-muted-foreground">{s.sub}</div>}
          </div>
        ))}
      </div>

      <div className="grid lg:grid-cols-[1.4fr_1fr] gap-6">
        <div className="space-y-6">
          {/* Información del Usuario */}
          <Card>
            <h3 className="font-semibold mb-4 flex items-center gap-2">
              <User size={16} /> Informaci\u00f3n del Usuario
            </h3>
            <div className="grid sm:grid-cols-2 gap-4">
              <div><Label>Nombre</Label><Input defaultValue={userNombre} /></div>
              <div><Label>Apellido</Label><Input defaultValue={userApellido} /></div>
              <div><Label>Email</Label><Input defaultValue={userEmail} /></div>
              <div>
                <Label>Estado</Label>
                <div className="pt-1.5"><Badge tone={emailValidado ? "success" : "warn"}>{emailValidado ? "Activo" : "Pendiente"}</Badge></div>
              </div>
            </div>
          </Card>

          {/* Información de la Empresa (solo PJ) */}
          {isPJ && (
            <Card>
              <h3 className="font-semibold mb-4 flex items-center gap-2">
                <Building2 size={16} /> Informaci\u00f3n de la Empresa
              </h3>
              <div className="grid sm:grid-cols-2 gap-4">
                <div><Label>Nombre Legal</Label><Input defaultValue={empresaInfo.nombreLegal} /></div>
                <div><Label>Nombre Comercial</Label><Input defaultValue={empresaInfo.nombreFantasia} /></div>
                <div><Label>CUIT</Label><Input defaultValue={empresaInfo.cuit} /></div>
                <div>
                  <Label>Tipo de sociedad</Label>
                  <select className="w-full h-10 px-3 rounded-md border bg-card text-sm" defaultValue={empresaInfo.tipoId}>
                    <option>{empresaInfo.tipoId}</option>
                  </select>
                </div>
                <div><Label>Actividad principal</Label><Input defaultValue="Servicios financieros" /></div>
                <div><Label>Fecha de inscripci\u00f3n</Label><Input type="date" defaultValue={empresaInfo.fechaInscripcion} /></div>
                <div><Label>Tel\u00e9fono</Label><Input defaultValue="+54 11 4555 0000" /></div>
                <div><Label>Direcci\u00f3n</Label><Input defaultValue={dir.direccion} /></div>
                <div><Label>Ciudad</Label><Input defaultValue={dir.ciudad} /></div>
                <div><Label>Provincia</Label><Input defaultValue={dir.provincia} /></div>
                <div><Label>C\u00f3digo Postal</Label><Input defaultValue={dir.cp} /></div>
                <div className="sm:col-span-2 flex gap-2 justify-end">
                  <BtnOutline>Cancelar</BtnOutline>
                  <BtnPrimary>Guardar cambios</BtnPrimary>
                </div>
              </div>
            </Card>
          )}

          {/* Información de Perfil (PF y PJ) */}
          <Card>
            <h3 className="font-semibold mb-4 flex items-center gap-2">
              <FileText size={16} /> Informaci\u00f3n de Perfil
            </h3>
            <div className="grid sm:grid-cols-2 gap-4">
              <div><Label>CUIL / CUIT</Label><Input defaultValue={dp.cuitCuil} /></div>
              <div><Label>DNI</Label><Input defaultValue={isPJ ? "30.123.456" : "32.123.456"} /></div>
              <div>
                <Label>G\u00e9nero</Label>
                <select className="w-full h-10 px-3 rounded-md border bg-card text-sm" defaultValue={dp.genero}>
                  <option>{dp.genero}</option>
                </select>
              </div>
              <div><Label>Nacimiento</Label><Input type="date" defaultValue={userNac} /></div>
              <div><Label>Ocupaci\u00f3n</Label><Input defaultValue={dp.ocupacion} /></div>
              <div>
                <Label>Fuente de Fondos</Label>
                <select className="w-full h-10 px-3 rounded-md border bg-card text-sm" defaultValue={dp.origenFondos}>
                  <option>{dp.origenFondos}</option>
                </select>
              </div>
              <div>
                <Label>PEP</Label>
                <div className="pt-1.5 text-sm">{dp.esPEP ? "S\u00ed" : "No"}</div>
              </div>
            </div>
          </Card>

          {/* Documentación KYC/KYB */}
          <Card>
            <h3 className="font-semibold mb-4 flex items-center gap-2">
              <FileText size={16} /> Documentaci\u00f3n {isPJ ? "KYC / KYB" : "KYC"}
            </h3>
            <div className="divide-y">
              {(isPJ ? docsPJ : docsPF).map((d) => (
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

        {/* Sidebar */}
        <div className="space-y-6">
          {/* CVU */}
          <Card>
            <h3 className="font-semibold text-sm mb-3 flex items-center gap-2">
              <Landmark size={16} className="shrink-0 text-primary" />
              Informaci\u00f3n de CVU
            </h3>
            <div className="text-xs space-y-2">
              <div className="flex justify-between gap-2">
                <span className="text-muted-foreground">CVU</span>
                <span className="font-mono font-semibold truncate">{cbu.cbu}</span>
              </div>
              <div className="flex justify-between gap-2">
                <span className="text-muted-foreground">Alias</span>
                <span className="font-mono font-semibold truncate">{cbu.alias}</span>
              </div>
            </div>
          </Card>

          {/* Plan */}
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
                <span className="font-semibold">{plan.used.toLocaleString()} / {plan.total.toLocaleString()}</span>
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

          {/* Constancia CBU */}
          <Card>
            <div className="flex items-start justify-between gap-3 mb-2">
              <h3 className="font-semibold text-sm flex items-center gap-2 min-w-0">
                <Landmark size={16} className="shrink-0 text-primary" />
                <span className="truncate">Constancia de CBU</span>
              </h3>
              <Badge tone="success">Oficial</Badge>
            </div>
            <p className="text-xs text-muted-foreground mb-3">
              Documento oficial con raz\u00f3n social{isPJ ? ", CUIT" : ""}, CBU y alias.
            </p>
            <BtnPrimary className="w-full" onClick={() => setCbuPreview(true)}>
              <Download size={14} /> Descargar constancia (PDF)
            </BtnPrimary>
          </Card>

          {/* Facturación */}
          <Card>
            <h3 className="font-semibold mb-3 flex items-center gap-2">
              <CreditCard size={16} /> Facturaci\u00f3n
            </h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">M\u00e9todo de pago</span>
                <span className="font-semibold">D\u00e9bito CVU</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Pr\u00f3xima factura</span>
                <span className="font-semibold">01/07/2026</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Monto estimado</span>
                <span className="font-semibold">{plan.precio}</span>
              </div>
            </div>
            <BtnOutline className="w-full mt-4">Ver historial de facturas</BtnOutline>
          </Card>

          {/* Representantes legales (solo PJ) */}
          {isPJ && (
            <Card>
              <h3 className="font-semibold text-sm mb-3">Representantes legales</h3>
              <div className="space-y-3 text-sm">
                <div>
                  <div className="font-semibold">{userNombre} {userApellido}</div>
                  <div className="text-xs text-muted-foreground">{dp.cuitCuil} &middot; Presidenta</div>
                </div>
                <div>
                  <div className="font-semibold">Diego M\u00e9ndez</div>
                  <div className="text-xs text-muted-foreground">20-29888777-3 &middot; Apoderado</div>
                </div>
              </div>
            </Card>
          )}

          {/* Límites operativos */}
          <Card>
            <h3 className="font-semibold text-sm mb-3 flex items-center gap-2">
              <SlidersHorizontal size={14} /> L\u00edmites operativos
            </h3>
            <p className="text-[11px] text-muted-foreground mb-3">
              Configurados por Molly. Para modificarlos contact\u00e1 a tu ejecutivo.
            </p>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Monto m\u00e1x. por transferencia</span>
                <span className="font-semibold">{isPJ ? "$ 5.000.000" : "$ 500.000"}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Operaciones diarias</span>
                <span className="font-semibold">{isPJ ? "200" : "50"}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Monto acumulado diario</span>
                <span className="font-semibold">{isPJ ? "$ 20.000.000" : "$ 2.000.000"}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Horario operativo</span>
                <span className="font-semibold">06:00 &ndash; 23:00</span>
              </div>
            </div>
            <div className="mt-3 text-[11px] text-muted-foreground border-t pt-2">
              \u00daltima actualizaci\u00f3n: 01/06/2026 por equipo Molly
            </div>
          </Card>
        </div>
      </div>

      {/* Modal: Constancia CBU */}
      {cbuPreview && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/50" onClick={() => setCbuPreview(false)} />
          <div className="relative bg-card rounded-lg max-w-lg w-full max-h-[90vh] overflow-y-auto shadow-xl">
            <div className="sticky top-0 bg-card border-b px-6 py-4 flex justify-between items-center z-10">
              <div className="font-semibold">Vista previa &mdash; Constancia de CBU</div>
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
                Molly Money Life SA certifica que la siguiente cuenta est\u00e1 activa:
              </p>
              <Card className="bg-muted/30">
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between gap-3">
                    <span className="text-muted-foreground">{isPJ ? "Raz\u00f3n social" : "Titular"}</span>
                    <span className="font-semibold text-right">
                      {isPJ ? empresaInfo.nombreLegal : `${userNombre} ${userApellido}`}
                    </span>
                  </div>
                  <div className="flex justify-between gap-3">
                    <span className="text-muted-foreground">{isPJ ? "CUIT" : "CUIL"}</span>
                    <span className="font-mono font-semibold">{dp.cuitCuil}</span>
                  </div>
                  <div className="flex justify-between gap-3">
                    <span className="text-muted-foreground">CVU</span>
                    <span className="font-mono font-semibold text-right break-all">{cbu.cbu}</span>
                  </div>
                  <div className="flex justify-between gap-3">
                    <span className="text-muted-foreground">Alias</span>
                    <span className="font-mono font-semibold">{cbu.alias}</span>
                  </div>
                </div>
              </Card>
              <div className="text-[11px] text-muted-foreground border-t pt-3">
                Documento firmado digitalmente por Molly Money Life SA. V\u00e1lido como constancia oficial de cuenta.
              </div>
              <div className="flex gap-2 pt-1">
                <BtnOutline className="flex-1" onClick={() => setCbuPreview(false)}>Cancelar</BtnOutline>
                <BtnPrimary className="flex-1" onClick={() => { setCbuPreview(false); toast.success("Constancia de CBU descargada"); }}>
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
