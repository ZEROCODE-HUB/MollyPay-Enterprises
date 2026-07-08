import { createFileRoute } from "@tanstack/react-router";
import { useState, useRef } from "react";
import { Upload, FileSpreadsheet, Download, CheckCircle2, AlertCircle, Clock, Plus, Play, X } from "lucide-react";
import { PageHeader, Card, BtnPrimary, BtnOutline, Badge, Stat, Input, Label } from "@/components/portal-shell";
import { toast } from "sonner";
import { FormDialog } from "@/components/form-dialog";

export const Route = createFileRoute("/app/cobros")({ component: Page });

const items = [
  { d: "Unidad 4B – Marzo", cli: "Pérez, Juan", m: "$ 48.200,00", e: "Procesado" },
  { d: "Unidad 5A – Marzo", cli: "López, María", m: "$ 48.200,00", e: "Procesado" },
  { d: "Unidad 6C – Marzo", cli: "Gómez, Pedro", m: "$ 52.800,00", e: "Pendiente" },
  { d: "Unidad 7D – Marzo", cli: "Sosa, Ana", m: "$ 48.200,00", e: "Error" },
  { d: "Unidad 8A – Marzo", cli: "Vega, Tomás", m: "$ 52.800,00", e: "Procesado" },
  { d: "Unidad 9B – Marzo", cli: "Díaz, Laura", m: "$ 48.200,00", e: "Procesado" },
];

const lotes = [
  { n: "Expensas Marzo 2026", c: 128, m: "$ 5.840.200", e: "En proceso", p: 78 },
  { n: "Cuotas socios Marzo", c: 86, m: "$ 1.290.000", e: "Completado", p: 100 },
  { n: "Alquileres Marzo", c: 42, m: "$ 13.440.000", e: "Completado", p: 100 },
  { n: "Cobros adicionales", c: 18, m: "$ 540.000", e: "Borrador", p: 0 },
];

function Page() {
  const [nuevoOpen, setNuevoOpen] = useState(false);
  const [archivo, setArchivo] = useState<File | null>(null);
  const [validando, setValidando] = useState(false);
  const [procesando, setProcesando] = useState(false);
  const [progreso, setProgreso] = useState(0);
  const fileRef = useRef<HTMLInputElement>(null);

  const onArchivo = (f: File | null) => {
    if (!f) return;
    setArchivo(f);
    setValidando(true);
    setProgreso(0);
    setTimeout(() => {
      setValidando(false);
      toast.success(`${f.name} validado · 128 registros listos para procesar`);
    }, 1200);
  };

  const ejecutar = () => {
    if (!archivo) return;
    setProcesando(true);
    setProgreso(0);
    const t = setInterval(() => {
      setProgreso((p) => {
        if (p >= 100) {
          clearInterval(t);
          setProcesando(false);
          toast.success("Lote procesado · 124 cobros ok, 4 con error");
          return 100;
        }
        return p + 8;
      });
    }, 220);
  };

  return (
    <>
      <PageHeader
        title="Cobros masivos"
        description="Procesá lotes de cobros desde CSV, Excel o desde tu sistema vía API."
        action={
          <div className="flex gap-2">
            <BtnOutline onClick={() => toast.success("Plantilla CSV descargada")}>
              <Download size={14} /> Plantilla CSV
            </BtnOutline>
            <BtnPrimary onClick={() => setNuevoOpen(true)}><Plus size={16} /> Nuevo lote</BtnPrimary>
          </div>
        }
      />

      <div className="grid md:grid-cols-4 gap-4 mb-6">
        <Stat label="Lotes activos" value="2" sub="146 cobros" />
        <Stat label="Cobrado este mes" value="$ 20.6M" sub="3 lotes completados" />
        <Stat label="Tasa de éxito" value="96,8%" sub="Últimos 30 días" />
        <Stat label="Errores a revisar" value="5" sub="Reintentar manualmente" />
      </div>

      <Card className="mb-6 border-dashed">
        <input
          ref={fileRef}
          type="file"
          accept=".csv,.xlsx,.xls"
          className="hidden"
          onChange={(e) => onArchivo(e.target.files?.[0] ?? null)}
        />
        {!archivo ? (
          <div
            className="flex flex-col sm:flex-row items-center gap-4 p-4"
            onDragOver={(e) => e.preventDefault()}
            onDrop={(e) => { e.preventDefault(); onArchivo(e.dataTransfer.files?.[0] ?? null); }}
          >
            <div className="w-14 h-14 rounded-lg bg-[color:var(--brand-soft)] flex items-center justify-center">
              <FileSpreadsheet size={26} className="text-[color:var(--brand-dark)]" />
            </div>
            <div className="flex-1 text-center sm:text-left">
              <div className="font-semibold">Subí un archivo para procesar</div>
              <div className="text-sm text-muted-foreground">CSV o Excel · Hasta 5.000 registros por lote · Validación previa antes de ejecutar</div>
            </div>
            <BtnPrimary onClick={() => fileRef.current?.click()}>
              <Upload size={16} /> Subir archivo
            </BtnPrimary>
          </div>
        ) : (
          <div className="p-4 space-y-3">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center">
                <FileSpreadsheet size={22} />
              </div>
              <div className="flex-1 min-w-0">
                <div className="font-semibold truncate">{archivo.name}</div>
                <div className="text-xs text-muted-foreground">
                  {(archivo.size / 1024).toFixed(1)} KB ·{" "}
                  {validando ? "Validando registros..." : procesando ? `Procesando ${progreso}%` : "128 registros · listos para procesar"}
                </div>
              </div>
              <div className="flex gap-2">
                {!procesando && !validando && (
                  <BtnPrimary onClick={ejecutar}><Play size={14} /> Ejecutar cobros masivos</BtnPrimary>
                )}
                <BtnOutline className="h-10 px-3" onClick={() => { setArchivo(null); setProgreso(0); }}>
                  <X size={14} />
                </BtnOutline>
              </div>
            </div>
            {(validando || procesando) && (
              <div className="h-2 rounded-full bg-muted overflow-hidden">
                <div
                  className="h-full bg-primary rounded-full transition-all"
                  style={{ width: validando ? "30%" : `${progreso}%` }}
                />
              </div>
            )}
          </div>
        )}
      </Card>

      <div className="grid lg:grid-cols-[1.4fr_1fr] gap-6">
        <Card className="p-0 overflow-hidden">
          <div className="px-5 py-4 border-b flex items-center justify-between">
            <div>
              <div className="font-semibold">Expensas Marzo 2026</div>
              <div className="text-xs text-muted-foreground">128 cobros · $ 5.840.200,00 · Iniciado 02/06 10:18</div>
            </div>
            <Badge tone="success">En proceso</Badge>
          </div>
          <div className="px-5 py-3 border-b">
            <div className="flex justify-between text-xs mb-1">
              <span className="text-muted-foreground">Progreso</span>
              <span className="font-semibold">100 / 128 (78%)</span>
            </div>
            <div className="h-2 rounded-full bg-muted overflow-hidden">
              <div className="h-full bg-primary rounded-full" style={{ width: "78%" }} />
            </div>
            <div className="flex gap-4 mt-3 text-xs">
              <span className="flex items-center gap-1.5"><CheckCircle2 size={12} className="text-emerald-600" /> 96 ok</span>
              <span className="flex items-center gap-1.5"><Clock size={12} className="text-amber-600" /> 28 pendientes</span>
              <span className="flex items-center gap-1.5"><AlertCircle size={12} className="text-red-600" /> 4 con error</span>
            </div>
          </div>
          <div className="divide-y border-t-0">
            {items.map((i) => (
              <div key={i.d} className="flex justify-between items-center py-3 px-5 text-sm">
                <div>
                  <div className="font-semibold">{i.d}</div>
                  <div className="text-xs text-muted-foreground">{i.cli}</div>
                </div>
                <div className="flex items-center gap-3">
                  <span className="font-semibold">{i.m}</span>
                  <Badge tone={i.e === "Procesado" ? "success" : i.e === "Pendiente" ? "warn" : "danger"}>{i.e}</Badge>
                </div>
              </div>
            ))}
          </div>
        </Card>

        <div className="space-y-6">
          <Card>
            <h3 className="font-semibold text-sm mb-3">Lotes recientes</h3>
            <div className="divide-y">
              {lotes.map((l) => (
                <div key={l.n} className="py-3">
                  <div className="flex justify-between text-sm">
                    <span className="font-semibold">{l.n}</span>
                    <Badge tone={l.e === "Completado" ? "success" : l.e === "En proceso" ? "warn" : "neutral"}>{l.e}</Badge>
                  </div>
                  <div className="text-xs text-muted-foreground mt-0.5">{l.c} cobros · {l.m}</div>
                  <div className="h-1.5 rounded-full bg-muted overflow-hidden mt-2">
                    <div className="h-full bg-primary rounded-full" style={{ width: `${l.p}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </Card>

          <Card>
            <h3 className="font-semibold text-sm mb-3">Reglas de procesamiento</h3>
            <ul className="text-xs space-y-2 text-muted-foreground">
              <li>· Validación de CBU/CUIT antes de ejecutar</li>
              <li>· Reintento automático en caso de error transitorio (3x)</li>
              <li>· Notificación por email al finalizar el lote</li>
              <li>· Conciliación automática contra subcuenta destino</li>
            </ul>
          </Card>
        </div>
      </div>

      <FormDialog
        open={nuevoOpen}
        onClose={() => setNuevoOpen(false)}
        title="Nuevo lote de cobros"
        description="Configurá el lote y subí el archivo a procesar."
        submitLabel="Crear lote"
        onSubmit={() => {
          setNuevoOpen(false);
          toast.success("Lote creado · listo para validar el archivo");
        }}
      >
        <div>
          <Label>Nombre del lote</Label>
          <Input placeholder="Ej. Expensas Abril 2026" />
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div>
            <Label>Subcuenta destino</Label>
            <select className="w-full h-10 px-3 rounded-md border bg-card text-sm">
              <option>Operaciones</option>
              <option>Sucursal Centro</option>
              <option>Sucursal Norte</option>
            </select>
          </div>
          <div>
            <Label>Fecha de ejecución</Label>
            <Input type="date" />
          </div>
        </div>
        <div>
          <Label>Archivo (CSV o Excel)</Label>
          <Input type="file" accept=".csv,.xlsx,.xls" />
          <p className="text-[11px] text-muted-foreground mt-1">Hasta 5.000 registros por lote.</p>
        </div>
        <label className="flex items-center gap-2 text-xs">
          <input type="checkbox" defaultChecked /> Validar CBU/CUIT antes de ejecutar
        </label>
      </FormDialog>
    </>
  );
}
