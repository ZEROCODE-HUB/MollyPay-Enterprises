import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import {
  Search, Zap, Flame, Droplet, Building2, Tv, Phone, Wifi, FileText, Clock,
  Globe, ShoppingCart, Copy, Send, ArrowRight, Power,
} from "lucide-react";
import { PageHeader, Card, Input, BtnPrimary, BtnOutline, Stat, Badge, Label } from "@/components/portal-shell";
import { toast } from "sonner";
import type { LucideIcon } from "lucide-react";
import { FormDialog } from "@/components/form-dialog";

export const Route = createFileRoute("/app/servicios")({ component: Page });

type Item = { n: string; c: string; v: string; venc: string; icon: LucideIcon; cat: string; e: "Pendiente" | "Próximo" | "Vencido" };

const servicios: Item[] = [
  { n: "Edesur", c: "Cuenta 8821-039 · Belgrano", v: "$ 64.320,00", venc: "05/06/2026", icon: Zap, cat: "Energía", e: "Pendiente" },
  { n: "Metrogas", c: "Cuenta 4421-128 · Belgrano", v: "$ 22.180,00", venc: "08/06/2026", icon: Flame, cat: "Gas", e: "Pendiente" },
  { n: "AySA", c: "Cuenta 9990-2211", v: "$ 18.450,00", venc: "12/06/2026", icon: Droplet, cat: "Agua", e: "Próximo" },
  { n: "ABL CABA", c: "Partida 12.345.678", v: "$ 45.900,00", venc: "15/06/2026", icon: Building2, cat: "Impuesto", e: "Próximo" },
  { n: "ARBA", c: "Cuenta 88.123-4", v: "$ 88.230,00", venc: "20/06/2026", icon: FileText, cat: "Impuesto", e: "Próximo" },
  { n: "Cablevisión", c: "Cuenta 7728-339", v: "$ 32.100,00", venc: "03/06/2026", icon: Tv, cat: "Internet", e: "Vencido" },
  { n: "Telecom", c: "Línea 011-4444-5555", v: "$ 14.800,00", venc: "10/06/2026", icon: Phone, cat: "Telefonía", e: "Próximo" },
  { n: "Fibertel Empresas", c: "Cuenta 4488-1102", v: "$ 88.500,00", venc: "14/06/2026", icon: Wifi, cat: "Internet", e: "Próximo" },
];

const cats = ["Todos", "Energía", "Gas", "Agua", "Impuesto", "Internet", "Telefonía"];

const remesas: Array<{ f: string; pais: string; banco: string; mARS: string; mDest: string; tc: string; e: "Completado" | "En proceso" | "Rechazado" }> = [
  { f: "01/06/2026", pais: "Colombia", banco: "Bancolombia", mARS: "$ 850.000", mDest: "COP 3.420.000", tc: "1 ARS = 4,02 COP", e: "Completado" },
  { f: "28/05/2026", pais: "México", banco: "BBVA México", mARS: "$ 1.200.000", mDest: "MXN 20.400", tc: "Cripto USDT", e: "Completado" },
  { f: "20/05/2026", pais: "España", banco: "Santander ES", mARS: "$ 2.400.000", mDest: "EUR 1.860", tc: "Bonos AL30/AL30D", e: "En proceso" },
  { f: "15/05/2026", pais: "Brasil", banco: "Itaú", mARS: "$ 680.000", mDest: "BRL 3.180", tc: "P2P", e: "Rechazado" },
];

const txGateway: Array<{ f: string; id: string; m: string; e: "Aprobado" | "Rechazado" }> = [
  { f: "Hoy 10:18", id: "PAY-9k2x7a", m: "$ 18.400", e: "Aprobado" },
  { f: "Hoy 09:42", id: "PAY-9k2x6b", m: "$ 92.800", e: "Aprobado" },
  { f: "Ayer 18:30", id: "PAY-9k2x5c", m: "$ 45.000", e: "Aprobado" },
  { f: "Ayer 17:08", id: "PAY-9k2x4d", m: "$ 22.500", e: "Rechazado" },
  { f: "Ayer 14:22", id: "PAY-9k2x3e", m: "$ 8.200", e: "Aprobado" },
];

type Tab = "servicios" | "remesas" | "ecommerce";

function Page() {
  const [pagar, setPagar] = useState<Item | null>(null);
  const [tab, setTab] = useState<Tab>("servicios");
  const [remesaOpen, setRemesaOpen] = useState(false);
  const copy = (txt: string, label: string) => {
    navigator.clipboard?.writeText(txt);
    toast.success(`${label} copiado`);
  };
  return (
    <>
      <PageHeader
        title="Servicios y pagos"
        description="Pago de servicios, remesas internacionales y pasarela e-commerce."
      />

      <div className="flex gap-1 mb-6 border-b">
        {([
          ["servicios", "Servicios"],
          ["remesas", "Remesas y crossborder"],
          ["ecommerce", "E-commerce y pasarela"],
        ] as Array<[Tab, string]>).map(([k, l]) => (
          <button
            key={k}
            onClick={() => setTab(k)}
            className={`px-4 py-2.5 text-sm font-semibold border-b-2 -mb-px transition ${
              tab === k ? "border-primary text-foreground" : "border-transparent text-muted-foreground hover:text-foreground"
            }`}
          >
            {l}
          </button>
        ))}
      </div>

      {tab === "servicios" && (<>
      <div className="grid md:grid-cols-4 gap-4 mb-6">
        <Stat label="Servicios adheridos" value="14" />
        <Stat label="A pagar este mes" value="$ 384.480" sub="8 facturas" />
        <Stat label="Vencidos" value="1" sub="Cablevisión - $ 32.100" />
        <Stat label="Pagado este mes" value="$ 1.240.300" />
      </div>

      <div className="grid lg:grid-cols-[1fr_280px] gap-6">
        <Card>
          <div className="flex flex-wrap gap-2 mb-4">
            <div className="relative flex-1 min-w-[240px]">
              <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
              <Input placeholder="Buscar servicio o número de cuenta..." className="pl-9" />
            </div>
            <select className="h-10 px-3 rounded-md border bg-card text-sm">
              <option>Ordenar: vencimiento</option>
              <option>Monto</option>
              <option>Alfabético</option>
            </select>
          </div>

          <div className="flex flex-wrap gap-1.5 mb-5">
            {cats.map((c, i) => (
              <button
                key={c}
                className={`px-3 py-1.5 rounded-full text-xs font-semibold border ${
                  i === 0 ? "bg-[color:var(--brand-soft)] text-[color:var(--brand-dark)] border-transparent" : "bg-card hover:bg-muted"
                }`}
              >
                {c}
              </button>
            ))}
          </div>

          <div className="divide-y">
            {servicios.map((s) => {
              const Icon = s.icon;
              return (
                <div key={s.n + s.c} className="flex items-center justify-between gap-3 py-3.5">
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="w-10 h-10 rounded-md bg-[color:var(--brand-soft)] flex items-center justify-center shrink-0">
                      <Icon size={18} className="text-[color:var(--brand-dark)]" />
                    </div>
                    <div className="min-w-0">
                      <div className="font-semibold text-sm truncate">{s.n} <span className="text-muted-foreground font-normal">· {s.cat}</span></div>
                      <div className="text-xs text-muted-foreground truncate">{s.c}</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 shrink-0">
                    <div className="text-right hidden sm:block">
                      <div className="text-sm font-semibold">{s.v}</div>
                      <div className="text-[11px] text-muted-foreground flex items-center gap-1 justify-end">
                        <Clock size={10} /> Vence {s.venc}
                      </div>
                    </div>
                    <Badge tone={s.e === "Vencido" ? "danger" : s.e === "Pendiente" ? "warn" : "neutral"}>{s.e}</Badge>
                    <BtnPrimary className="h-9 px-4" onClick={() => setPagar(s)}>Pagar</BtnPrimary>
                  </div>
                </div>
              );
            })}
          </div>
        </Card>

        <div className="space-y-6">
          <Card>
            <h3 className="font-semibold text-sm mb-3">Pago automático</h3>
            <p className="text-xs text-muted-foreground mb-4">
              Programá el débito al vencimiento desde la subcuenta que elijas.
            </p>
            <div className="space-y-2 text-xs">
              <div className="flex justify-between"><span className="text-muted-foreground">Servicios adheridos</span><span className="font-semibold">5</span></div>
              <div className="flex justify-between"><span className="text-muted-foreground">Próximo débito</span><span className="font-semibold">05/06</span></div>
              <div className="flex justify-between"><span className="text-muted-foreground">Monto estimado</span><span className="font-semibold">$ 86.500</span></div>
            </div>
            <BtnOutline className="w-full mt-4">Gestionar adhesiones</BtnOutline>
          </Card>

          <Card>
            <h3 className="font-semibold text-sm mb-3">Últimos pagos</h3>
            <div className="space-y-3 text-xs">
              {[
                ["Edesur", "$ 58.200", "Mayo"],
                ["AySA", "$ 17.900", "Mayo"],
                ["ABL CABA", "$ 44.200", "Mayo"],
              ].map(([n, m, mes]) => (
                <div key={n} className="flex justify-between">
                  <span>{n} <span className="text-muted-foreground">· {mes}</span></span>
                  <span className="font-semibold">{m}</span>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>
      </>)}

      {tab === "remesas" && (<>
        <div className="grid md:grid-cols-4 gap-4 mb-6">
          <Stat label="Enviadas este mes" value="12" sub="$ 18,4M ARS" />
          <Stat label="Países destino" value="6" />
          <Stat label="TC promedio" value="MORE rate" sub="Bonos · Cripto · P2P" />
          <Stat label="En proceso" value="2" />
        </div>
        <div className="grid lg:grid-cols-[1fr_1.4fr] gap-6">
          <Card>
            <h3 className="font-semibold mb-3 flex items-center gap-2"><Globe size={16} /> Nueva remesa internacional</h3>
            <p className="text-xs text-muted-foreground mb-4">Procesada vía MORE con la mejor cotización disponible (bonos, cripto o P2P).</p>
            <BtnPrimary className="w-full" onClick={() => setRemesaOpen(true)}><Send size={14} /> Enviar remesa</BtnPrimary>
          </Card>
          <Card className="p-0 overflow-hidden">
            <div className="px-5 py-4 border-b flex justify-between items-center">
              <h3 className="font-semibold">Historial de remesas</h3>
              <div className="flex gap-2">
                <select className="h-9 px-2 rounded-md border bg-card text-xs">
                  <option>País: todos</option><option>Colombia</option><option>México</option><option>España</option><option>Brasil</option>
                </select>
                <Input type="date" className="h-9 max-w-[140px]" />
              </div>
            </div>
            <table className="w-full text-sm">
              <thead>
                <tr className="text-[11px] uppercase tracking-wide text-muted-foreground border-b bg-muted/30">
                  <th className="text-left px-5 py-2.5">Fecha</th>
                  <th className="text-left px-5 py-2.5">Destino</th>
                  <th className="text-right px-5 py-2.5">ARS</th>
                  <th className="text-right px-5 py-2.5">Recibe</th>
                  <th className="text-right px-5 py-2.5">Estado</th>
                </tr>
              </thead>
              <tbody>
                {remesas.map((r, i) => (
                  <tr key={i} className="border-b last:border-0 hover:bg-muted/30">
                    <td className="px-5 py-3 text-xs text-muted-foreground">{r.f}</td>
                    <td className="px-5 py-3">
                      <div className="font-semibold text-sm">{r.pais}</div>
                      <div className="text-xs text-muted-foreground">{r.banco} · {r.tc}</div>
                    </td>
                    <td className="px-5 py-3 text-right font-semibold">{r.mARS}</td>
                    <td className="px-5 py-3 text-right">{r.mDest}</td>
                    <td className="px-5 py-3 text-right">
                      <Badge tone={r.e === "Completado" ? "success" : r.e === "En proceso" ? "warn" : "danger"}>{r.e}</Badge>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </Card>
        </div>
      </>)}

      {tab === "ecommerce" && (<>
        <div className="grid md:grid-cols-4 gap-4 mb-6">
          <Stat label="Estado de la pasarela" value="Activa" sub="API v2" />
          <Stat label="Transacciones (mes)" value="1.842" />
          <Stat label="Volumen (mes)" value="$ 8,4M" />
          <Stat label="Tasa de aprobación" value="96,2%" />
        </div>
        <div className="grid lg:grid-cols-[1fr_1fr] gap-6 mb-6">
          <Card>
            <div className="flex justify-between items-center mb-3">
              <h3 className="font-semibold flex items-center gap-2"><ShoppingCart size={16} /> Pasarela de pagos Molly</h3>
              <Badge tone="success"><Power size={10} className="mr-1" /> Conectada</Badge>
            </div>
            <p className="text-sm text-muted-foreground">API RESTful para integrar cobros desde tu e-commerce: links de pago, QR, tokenización de tarjetas y webhooks de notificación. SDKs para Node, PHP y Python.</p>
            <ul className="text-xs text-muted-foreground mt-3 space-y-1">
              <li>· <strong className="text-foreground">POST /v2/payments</strong> — crear cobro</li>
              <li>· <strong className="text-foreground">GET /v2/payments/:id</strong> — consultar estado</li>
              <li>· <strong className="text-foreground">POST /v2/refunds</strong> — devolución total o parcial</li>
              <li>· <strong className="text-foreground">Webhook</strong> — notificación push de cada evento</li>
            </ul>
            <BtnOutline className="mt-4"><FileText size={14} /> Ver documentación <ArrowRight size={12} /></BtnOutline>
          </Card>
          <Card>
            <h3 className="font-semibold mb-3">Credenciales</h3>
            <div className="space-y-3">
              <div>
                <Label>API key (producción)</Label>
                <div className="flex gap-2">
                  <Input readOnly value="sk_live_4f8a2c19b6d04e3aa1b7c9d8e6f5a3b2" className="font-mono text-xs" />
                  <BtnOutline className="shrink-0" onClick={() => copy("sk_live_4f8a2c19b6d04e3aa1b7c9d8e6f5a3b2", "API key")}>
                    <Copy size={14} />
                  </BtnOutline>
                </div>
              </div>
              <div>
                <Label>Webhook URL</Label>
                <div className="flex gap-2">
                  <Input readOnly value="https://api.molly.com.ar/v2/webhooks/empresa-demo" className="font-mono text-xs" />
                  <BtnOutline className="shrink-0" onClick={() => copy("https://api.molly.com.ar/v2/webhooks/empresa-demo", "Webhook")}>
                    <Copy size={14} />
                  </BtnOutline>
                </div>
              </div>
              <div className="text-[11px] text-muted-foreground border-t pt-2">
                Rotá la API key periódicamente desde Seguridad. Las llamadas requieren firma HMAC-SHA256.
              </div>
            </div>
          </Card>
        </div>
        <Card className="p-0 overflow-hidden">
          <div className="px-5 py-4 border-b">
            <h3 className="font-semibold">Transacciones procesadas por la pasarela</h3>
          </div>
          <table className="w-full text-sm">
            <thead>
              <tr className="text-[11px] uppercase tracking-wide text-muted-foreground border-b bg-muted/30">
                <th className="text-left px-5 py-2.5">Fecha</th>
                <th className="text-left px-5 py-2.5">ID</th>
                <th className="text-right px-5 py-2.5">Monto</th>
                <th className="text-right px-5 py-2.5">Estado</th>
              </tr>
            </thead>
            <tbody>
              {txGateway.map((t) => (
                <tr key={t.id} className="border-b last:border-0 hover:bg-muted/30">
                  <td className="px-5 py-3 text-xs text-muted-foreground">{t.f}</td>
                  <td className="px-5 py-3 font-mono text-xs">{t.id}</td>
                  <td className="px-5 py-3 text-right font-semibold">{t.m}</td>
                  <td className="px-5 py-3 text-right">
                    <Badge tone={t.e === "Aprobado" ? "success" : "danger"}>{t.e}</Badge>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </Card>
      </>)}

      <FormDialog
        open={pagar !== null}
        onClose={() => setPagar(null)}
        title={pagar ? `Pagar ${pagar.n}` : "Pagar servicio"}
        description={pagar ? `${pagar.c} · Vence ${pagar.venc}` : undefined}
        submitLabel="Confirmar pago"
        onSubmit={() => {
          const s = pagar;
          setPagar(null);
          if (s) toast.success(`Pago de ${s.n} confirmado por ${s.v}`);
        }}
      >
        <div className="p-4 rounded-md bg-muted">
          <div className="text-xs text-muted-foreground">Total a pagar</div>
          <div className="text-2xl font-semibold mt-0.5">{pagar?.v}</div>
        </div>
        <div>
          <Label>Subcuenta de origen</Label>
          <select className="w-full h-10 px-3 rounded-md border bg-card text-sm">
            <option>Operaciones — $ 6.389.830,55</option>
            <option>Sucursal Centro — $ 4.220.000,00</option>
            <option>Sucursal Norte — $ 1.870.500,00</option>
          </select>
        </div>
        <div>
          <Label>Fecha de pago</Label>
          <Input type="date" />
        </div>
        <label className="flex items-center gap-2 text-xs">
          <input type="checkbox" /> Adherir al débito automático mensual
        </label>
      </FormDialog>

      <FormDialog
        open={remesaOpen}
        onClose={() => setRemesaOpen(false)}
        title="Enviar remesa internacional"
        description="Procesada vía MORE · cotización aplicada al confirmar."
        submitLabel="Enviar remesa"
        size="lg"
        onSubmit={() => { setRemesaOpen(false); toast.success("Remesa enviada · en proceso de liquidación"); }}
      >
        <div className="grid grid-cols-2 gap-3">
          <div><Label>Monto en ARS</Label><Input placeholder="$ 0,00" /></div>
          <div>
            <Label>País destino</Label>
            <select className="w-full h-10 px-3 rounded-md border bg-card text-sm">
              <option>Colombia</option><option>México</option><option>España</option>
              <option>Brasil</option><option>Chile</option><option>Uruguay</option>
            </select>
          </div>
        </div>
        <div><Label>Banco / cuenta del destinatario</Label><Input placeholder="Ej. Bancolombia · Cuenta ahorros 1234-5678" /></div>
        <div><Label>Beneficiario</Label><Input placeholder="Nombre completo y documento" /></div>
        <div>
          <Label>Tipo de conversión</Label>
          <select className="w-full h-10 px-3 rounded-md border bg-card text-sm">
            <option>Automático (mejor cotización disponible)</option>
            <option>Bonos (AL30/AL30D)</option>
            <option>Cripto (USDT)</option>
            <option>P2P</option>
          </select>
        </div>
        <Card className="bg-muted/30">
          <div className="text-xs text-muted-foreground">Estimación al confirmar</div>
          <div className="flex justify-between mt-1">
            <span className="font-semibold">1 ARS = 4,02 COP</span>
            <span className="font-semibold">≈ COP 4.020.000</span>
          </div>
        </Card>
      </FormDialog>
    </>
  );
}
