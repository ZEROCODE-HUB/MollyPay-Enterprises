import { createFileRoute } from "@tanstack/react-router";
import { useState, useRef, useEffect } from "react";
import { Bot, Send, MessageCircle, X, ChevronDown } from "lucide-react";
import { PageHeader, Card, BtnPrimary, BtnOutline, Input, Badge } from "@/components/portal-shell";

export const Route = createFileRoute("/app/ayuda")({ component: Page });

type Message = {
  role: "user" | "bot";
  text: string;
};

const faqs = [
  "¿Cómo creo un link de pago?",
  "¿Cómo transfiero dinero?",
  "¿Cómo agrego una subcuenta?",
  "¿Cómo pago un servicio?",
  "¿Qué es el débito directo?",
];

const botResponses: Record<string, string> = {
  "¿Cómo creo un link de pago?":
    "Para crear un link de pago: 1) Andá a la sección 'Link de pago' > 'Productos'. 2) Agregá los productos que querés cobrar. 3) Seleccionálos y hacé clic en 'Generar link'. 4) Configurá los métodos de pago y la fecha de expiración. 5) Confirmá y compartí el link con tu cliente.",
  "¿Cómo transfiero dinero?":
    "Para transferir dinero: 1) Andá a la sección 'Transferir'. 2) Elegí el tipo de transferencia (única, programada). 3) Ingresá el CBU/CVU o seleccioná un destinatario. 4) Indicá el monto y la subcuenta de origen. 5) Revisá los datos y confirmá.",
  "¿Cómo agrego una subcuenta?":
    "Podés agregar una subcuenta desde 'Subcuentas' > 'Nueva subcuenta'. Completá el nombre, tipo (Operativa, Recaudación, etc.), responsable y límite diario. Cada subcuenta tiene su propio CBU.",
  "¿Cómo pago un servicio?":
    "Andá a 'Pago de servicios'. Encontrás tres vistas: Próximos pagos, Servicios suscritos e Historial. Seleccioná el servicio que querés pagar y hacé clic en 'Pagar'. Podés elegir la subcuenta de origen y la fecha de pago.",
  "¿Qué es el débito directo?":
    "El débito directo permite que el cobro de un servicio se realice automáticamente desde tu cuenta en la fecha de vencimiento. Activá la opción 'DD' (Débito Directo) en los servicios compatibles. Solo algunos proveedores lo soportan.",
};

function botReply(text: string): string {
  return botResponses[text] || (
    "No encontré una respuesta específica para tu consulta. ¿Podrías reformularla? También podés contactar a nuestro equipo de soporte en soporte@molipay.com.ar."
  );
}

function Page() {
  const [messages, setMessages] = useState<Message[]>([
    { role: "bot", text: "¡Hola! Soy el asistente virtual de Molly. ¿En qué puedo ayudarte hoy?" },
  ]);
  const [input, setInput] = useState("");
  const [showChat, setShowChat] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const send = (text: string) => {
    const q = text.trim();
    if (!q) return;
    setMessages((prev) => [...prev, { role: "user", text: q }]);
    setInput("");
    setTimeout(() => {
      setMessages((prev) => [...prev, { role: "bot", text: botReply(q) }]);
    }, 400);
  };

  return (
    <>
      <PageHeader
        title="Ayuda y soporte"
        description="Resolvé tus dudas al instante con nuestro asistente de IA."
      />

      <div className="grid lg:grid-cols-[1fr_400px] gap-6">
        <div className="space-y-6">
          <Card>
            <h3 className="font-semibold mb-3 flex items-center gap-2">
              <MessageCircle size={16} /> Preguntas frecuentes
            </h3>
            <div className="space-y-2">
              {faqs.map((q) => (
                <button
                  key={q}
                  onClick={() => { setShowChat(true); send(q); }}
                  className="w-full text-left px-4 py-3 rounded-lg border bg-card hover:bg-muted transition text-sm font-semibold"
                >
                  {q}
                </button>
              ))}
            </div>
          </Card>

          <Card>
            <h3 className="font-semibold mb-3">Contacto humano</h3>
            <p className="text-sm text-muted-foreground mb-3">
              Si necesitás asistencia personalizada, nuestro equipo de soporte está disponible de lunes a viernes de 9 a 18 h.
            </p>
            <div className="text-sm space-y-1">
              <div><span className="text-muted-foreground">Email:</span>{" "}soporte@molipay.com.ar</div>
              <div><span className="text-muted-foreground">WhatsApp:</span>{" "}+54 11 5555-0000</div>
            </div>
          </Card>
        </div>

        <Card className={`flex flex-col ${showChat ? "" : "lg:sticky lg:top-6"}`}>
          {!showChat ? (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <div className="w-16 h-16 rounded-full bg-[color:var(--brand-soft)] flex items-center justify-center mb-4">
                <Bot size={32} className="text-[color:var(--brand-dark)]" />
              </div>
              <h3 className="font-semibold mb-1">Asistente virtual</h3>
              <p className="text-sm text-muted-foreground mb-4 max-w-xs">
                Hacé clic en una pregunta frecuente o escribí tu consulta abajo.
              </p>
              <BtnPrimary onClick={() => setShowChat(true)}>
                <MessageCircle size={14} /> Iniciar conversación
              </BtnPrimary>
            </div>
          ) : (
            <div className="flex flex-col h-[500px]">
              <div className="flex items-center justify-between pb-3 border-b mb-3">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-[color:var(--brand-soft)] flex items-center justify-center">
                    <Bot size={16} className="text-[color:var(--brand-dark)]" />
                  </div>
                  <div>
                    <div className="text-sm font-semibold">Asistente Molly</div>
                    <div className="text-[10px] text-muted-foreground">Online</div>
                  </div>
                </div>
                <button onClick={() => setShowChat(false)} className="p-1 hover:bg-muted rounded">
                  <X size={16} className="text-muted-foreground" />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto space-y-3 pr-1">
                {messages.map((m, i) => (
                  <div key={i} className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}>
                    <div
                      className={`max-w-[85%] rounded-lg px-3.5 py-2.5 text-sm ${
                        m.role === "user"
                          ? "bg-primary text-primary-foreground"
                          : "bg-muted text-foreground"
                      }`}
                    >
                      {m.text}
                    </div>
                  </div>
                ))}
                <div ref={bottomRef} />
              </div>

              <div className="flex gap-2 pt-3 border-t mt-3">
                <Input
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && send(input)}
                  placeholder="Escribí tu consulta..."
                  className="h-10"
                />
                <BtnPrimary className="h-10 w-10 px-0" onClick={() => send(input)}>
                  <Send size={14} />
                </BtnPrimary>
              </div>
            </div>
          )}
        </Card>
      </div>
    </>
  );
}
