import { useEffect, useRef, useState, type ReactNode, type InputHTMLAttributes } from "react";
import { Link } from "@tanstack/react-router";
import { Check, Eye, EyeOff, UploadCloud, Camera, FileText, X, ShieldCheck } from "lucide-react";
import { MollyLogo } from "@/components/molly-logo";

/* ============ AuthShell (split-screen) ============ */

export function AuthShell({
  children,
  leftEyebrow = "Molipay · Onboarding",
  leftTitle = "Tus datos están protegidos bajo normativa BCRA",
  leftBody,
  step,
}: {
  children: ReactNode;
  leftEyebrow?: string;
  leftTitle?: string;
  leftBody?: string;
  step?: string;
}) {
  return (
    <div className="min-h-screen grid lg:grid-cols-[minmax(0,42%)_1fr]" style={{ background: "#F7F5F0" }}>
      {/* Panel izquierdo */}
      <aside
        className="relative hidden lg:flex flex-col justify-between p-10 xl:p-12 overflow-hidden"
        style={{ background: "#0A1628", color: "#F7F5F0" }}
      >
        {/* motif */}
        <svg
          aria-hidden
          className="absolute inset-0 w-full h-full opacity-25"
          preserveAspectRatio="none"
          viewBox="0 0 400 800"
        >
          <defs>
            <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#0891B2" strokeWidth="0.4" />
            </pattern>
          </defs>
          <rect width="400" height="800" fill="url(#grid)" />
          <g stroke="#0891B2" strokeWidth="0.6" fill="none" opacity="0.7">
            <path d="M40 120 L200 260 L360 180" />
            <path d="M60 500 L220 400 L340 560" />
            <path d="M200 260 L220 400" />
          </g>
          <g fill="#0891B2">
            <circle cx="40" cy="120" r="3" />
            <circle cx="200" cy="260" r="3" />
            <circle cx="360" cy="180" r="3" />
            <circle cx="60" cy="500" r="3" />
            <circle cx="220" cy="400" r="3" />
            <circle cx="340" cy="560" r="3" />
          </g>
        </svg>

        <div className="relative">
          <Link to="/" className="inline-flex">
            <MollyLogo variant="light" size={34} />
          </Link>
          <p
            className="mt-10 uppercase tracking-[0.25em]"
            style={{ fontFamily: "'IBM Plex Mono', ui-monospace, monospace", fontSize: "0.7rem", color: "#0891B2" }}
          >
            {leftEyebrow}
          </p>
          <h2
            className="mt-4 max-w-[22ch] leading-[1.15]"
            style={{ fontFamily: "'Fraunces', Georgia, serif", fontSize: "clamp(1.6rem, 2vw, 2rem)", fontWeight: 400 }}
          >
            {leftTitle}
          </h2>
          {leftBody && (
            <p className="mt-5 max-w-[34ch] text-white/70" style={{ fontSize: "0.9rem", lineHeight: 1.65 }}>
              {leftBody}
            </p>
          )}
        </div>

        <div className="relative space-y-6">
          <div
            className="inline-flex items-center gap-2 border px-3 py-2"
            style={{ borderColor: "rgba(8,145,178,0.5)", color: "#0891B2", borderRadius: 2 }}
          >
            <ShieldCheck size={14} />
            <span
              style={{ fontFamily: "'IBM Plex Mono', ui-monospace, monospace", fontSize: "0.7rem", letterSpacing: "0.1em", textTransform: "uppercase" }}
            >
              Registrado ante BCRA
            </span>
          </div>
          {step && (
            <p
              className="text-white/50"
              style={{ fontFamily: "'IBM Plex Mono', ui-monospace, monospace", fontSize: "0.7rem", letterSpacing: "0.15em", textTransform: "uppercase" }}
            >
              {step}
            </p>
          )}
          <p className="text-white/40 text-xs">© {new Date().getFullYear()} Moli Financial S.A.</p>
        </div>
      </aside>

      {/* Panel derecho */}
      <main className="flex flex-col">
        {/* Franja mobile */}
        <div className="lg:hidden px-6 py-5 flex items-center justify-between" style={{ background: "#0A1628", color: "#fff" }}>
          <Link to="/">
            <MollyLogo variant="light" size={28} />
          </Link>
          <span
            className="text-white/70"
            style={{ fontFamily: "'IBM Plex Mono', ui-monospace, monospace", fontSize: "0.65rem", letterSpacing: "0.15em", textTransform: "uppercase" }}
          >
            BCRA
          </span>
        </div>

        <div className="flex-1 flex items-start lg:items-center justify-center px-4 sm:px-6 py-10 lg:py-16">
          <div className="w-full max-w-[480px]">{children}</div>
        </div>

        <footer className="px-6 py-4 text-center text-xs text-[#0A1628]/50">
          ¿Necesitás ayuda?{" "}
          <a href="mailto:soporte@molipay.com.ar" className="underline underline-offset-2 hover:text-[#C41E3A]">
            soporte@molipay.com.ar
          </a>
        </footer>
      </main>
    </div>
  );
}

/* ============ Stepper ============ */

export function Stepper({ steps, current }: { steps: string[]; current: number }) {
  return (
    <ol className="flex items-center gap-2 mb-8 overflow-x-auto pb-2">
      {steps.map((label, i) => {
        const done = i < current;
        const active = i === current;
        return (
          <li key={label} className="flex items-center gap-2 shrink-0">
            <span
              className="inline-flex items-center justify-center w-7 h-7 text-xs font-semibold"
              style={{
                borderRadius: 999,
                background: done ? "#16A34A" : active ? "#C41E3A" : "transparent",
                color: done || active ? "#fff" : "#0A1628",
                border: done || active ? "none" : "1px solid rgba(10,22,40,0.25)",
              }}
            >
              {done ? <Check size={14} /> : i + 1}
            </span>
            <span
              className="text-xs"
              style={{
                color: active ? "#0A1628" : "rgba(10,22,40,0.55)",
                fontWeight: active ? 600 : 500,
              }}
            >
              {label}
            </span>
            {i < steps.length - 1 && <span className="w-6 h-px" style={{ background: "rgba(10,22,40,0.15)" }} />}
          </li>
        );
      })}
    </ol>
  );
}

/* ============ Headings ============ */

export function FormTitle({ eyebrow, title, subtitle }: { eyebrow?: string; title: string; subtitle?: string }) {
  return (
    <div className="mb-7">
      {eyebrow && (
        <p
          className="mb-2"
          style={{
            fontFamily: "'IBM Plex Mono', ui-monospace, monospace",
            fontSize: "0.7rem",
            letterSpacing: "0.2em",
            textTransform: "uppercase",
            color: "#0891B2",
          }}
        >
          {eyebrow}
        </p>
      )}
      <h1
        style={{
          fontFamily: "'Fraunces', Georgia, serif",
          fontSize: "clamp(1.5rem, 2.4vw, 1.9rem)",
          fontWeight: 500,
          color: "#0A1628",
          lineHeight: 1.15,
        }}
      >
        {title}
      </h1>
      {subtitle && <p className="mt-3 text-sm text-[#0A1628]/65 leading-relaxed">{subtitle}</p>}
    </div>
  );
}

/* ============ Inputs ============ */

type FieldProps = InputHTMLAttributes<HTMLInputElement> & {
  label: string;
  error?: string;
  hint?: string;
};

export function Field({ label, error, hint, className = "", ...rest }: FieldProps) {
  return (
    <label className="block">
      <span className="block mb-1.5 text-xs font-semibold text-[#0A1628]">{label}</span>
      <input
        {...rest}
        className={`w-full h-11 px-3 bg-white text-sm outline-none transition-colors ${className}`}
        style={{
          border: `1px solid ${error ? "#C41E3A" : "rgba(10,22,40,0.15)"}`,
          borderRadius: 2,
          color: "#0A1628",
        }}
      />
      {error ? (
        <span className="mt-1 block text-xs text-[#C41E3A]">{error}</span>
      ) : hint ? (
        <span className="mt-1 block text-xs text-[#0A1628]/55">{hint}</span>
      ) : null}
    </label>
  );
}

export function SelectField({
  label,
  value,
  onChange,
  options,
  error,
  placeholder = "Seleccioná…",
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  options: string[];
  error?: string;
  placeholder?: string;
}) {
  return (
    <label className="block">
      <span className="block mb-1.5 text-xs font-semibold text-[#0A1628]">{label}</span>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full h-11 px-3 bg-white text-sm outline-none"
        style={{
          border: `1px solid ${error ? "#C41E3A" : "rgba(10,22,40,0.15)"}`,
          borderRadius: 2,
          color: value ? "#0A1628" : "rgba(10,22,40,0.5)",
        }}
      >
        <option value="">{placeholder}</option>
        {options.map((o) => (
          <option key={o} value={o}>
            {o}
          </option>
        ))}
      </select>
      {error && <span className="mt-1 block text-xs text-[#C41E3A]">{error}</span>}
    </label>
  );
}

/* ============ Password ============ */

const rules: Array<{ id: string; label: string; test: (s: string) => boolean }> = [
  { id: "len", label: "Mínimo 8 caracteres", test: (s) => s.length >= 8 },
  { id: "upper", label: "Una letra mayúscula", test: (s) => /[A-Z]/.test(s) },
  { id: "num", label: "Un número", test: (s) => /\d/.test(s) },
  { id: "special", label: "Un carácter especial (!/+-.)", test: (s) => /[!/+\-.]/.test(s) },
];

export function PasswordField({
  label,
  value,
  onChange,
  showRules = false,
  error,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  showRules?: boolean;
  error?: string;
}) {
  const [show, setShow] = useState(false);
  return (
    <div>
      <label className="block">
        <span className="block mb-1.5 text-xs font-semibold text-[#0A1628]">{label}</span>
        <div
          className="flex items-center bg-white"
          style={{
            border: `1px solid ${error ? "#C41E3A" : "rgba(10,22,40,0.15)"}`,
            borderRadius: 2,
          }}
        >
          <input
            type={show ? "text" : "password"}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            className="flex-1 h-11 px-3 bg-transparent text-sm outline-none text-[#0A1628]"
          />
          <button
            type="button"
            onClick={() => setShow((s) => !s)}
            className="px-3 text-[#0A1628]/60 hover:text-[#0A1628]"
            aria-label={show ? "Ocultar contraseña" : "Mostrar contraseña"}
          >
            {show ? <EyeOff size={16} /> : <Eye size={16} />}
          </button>
        </div>
        {error && <span className="mt-1 block text-xs text-[#C41E3A]">{error}</span>}
      </label>
      {showRules && (
        <ul className="mt-2 grid grid-cols-1 sm:grid-cols-2 gap-y-1 gap-x-3">
          {rules.map((r) => {
            const ok = r.test(value);
            return (
              <li key={r.id} className="flex items-center gap-1.5 text-[11px]" style={{ color: ok ? "#16A34A" : "rgba(10,22,40,0.55)" }}>
                <Check size={12} />
                {r.label}
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}

export function validatePassword(pw: string) {
  return rules.every((r) => r.test(pw));
}

/* ============ Buttons ============ */

export function PrimaryButton({
  children,
  disabled,
  type = "button",
  onClick,
  className = "",
}: {
  children: ReactNode;
  disabled?: boolean;
  type?: "button" | "submit";
  onClick?: () => void;
  className?: string;
}) {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`w-full h-11 text-white text-sm font-semibold tracking-wide transition-opacity ${className}`}
      style={{
        background: "#C41E3A",
        borderRadius: 2,
        opacity: disabled ? 0.45 : 1,
        cursor: disabled ? "not-allowed" : "pointer",
        letterSpacing: "0.06em",
        textTransform: "uppercase",
        fontSize: "0.8rem",
      }}
    >
      {children}
    </button>
  );
}

export function SecondaryButton({
  children,
  onClick,
  type = "button",
}: {
  children: ReactNode;
  onClick?: () => void;
  type?: "button" | "submit";
}) {
  return (
    <button
      type={type}
      onClick={onClick}
      className="h-11 px-5 text-sm font-semibold hover:bg-[#0A1628]/5 transition-colors"
      style={{
        border: "1px solid #0A1628",
        color: "#0A1628",
        borderRadius: 2,
        letterSpacing: "0.06em",
        textTransform: "uppercase",
        fontSize: "0.75rem",
      }}
    >
      {children}
    </button>
  );
}

export function WizardNav({
  onBack,
  nextLabel = "Siguiente",
  onNext,
  nextDisabled,
  nextType = "button",
}: {
  onBack?: () => void;
  nextLabel?: string;
  onNext?: () => void;
  nextDisabled?: boolean;
  nextType?: "button" | "submit";
}) {
  return (
    <div className="mt-8 flex flex-col sm:flex-row gap-3">
      {onBack && <SecondaryButton onClick={onBack}>Atrás</SecondaryButton>}
      <div className="flex-1">
        <PrimaryButton type={nextType} onClick={onNext} disabled={nextDisabled}>
          {nextLabel}
        </PrimaryButton>
      </div>
    </div>
  );
}

/* ============ FileUpload ============ */

export function FileUpload({
  label,
  hint,
  value,
  onChange,
  accept = "image/*,application/pdf",
}: {
  label: string;
  hint?: string;
  value: { name: string; url?: string } | null | undefined;
  onChange: (f: { name: string; url: string } | null) => void;
  accept?: string;
}) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [drag, setDrag] = useState(false);

  const handle = (file: File | null) => {
    if (!file) return;
    if (file.size > 8 * 1024 * 1024) {
      alert("El archivo supera el máximo de 8 MB.");
      return;
    }
    const url = URL.createObjectURL(file);
    onChange({ name: file.name, url });
  };

  useEffect(() => {
    return () => {
      if (value?.url) URL.revokeObjectURL(value.url);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (value) {
    return (
      <div>
        <span className="block mb-1.5 text-xs font-semibold text-[#0A1628]">{label}</span>
        <div
          className="flex items-center gap-3 bg-white px-3 py-3"
          style={{ border: "1px solid rgba(10,22,40,0.15)", borderRadius: 2 }}
        >
          <FileText size={18} className="text-[#0A1628]/70 shrink-0" />
          <div className="flex-1 min-w-0">
            <p className="text-sm truncate text-[#0A1628]">{value.name}</p>
            <p className="text-[11px] text-[#0A1628]/55">Archivo cargado</p>
          </div>
          <button
            type="button"
            onClick={() => inputRef.current?.click()}
            className="text-xs font-semibold text-[#0A1628] hover:text-[#C41E3A] transition-colors"
          >
            Reemplazar
          </button>
          <button
            type="button"
            onClick={() => onChange(null)}
            className="text-[#0A1628]/50 hover:text-[#C41E3A]"
            aria-label="Quitar"
          >
            <X size={16} />
          </button>
          <input
            ref={inputRef}
            type="file"
            accept={accept}
            className="hidden"
            onChange={(e) => handle(e.target.files?.[0] ?? null)}
          />
        </div>
      </div>
    );
  }

  return (
    <div>
      <span className="block mb-1.5 text-xs font-semibold text-[#0A1628]">{label}</span>
      <button
        type="button"
        onClick={() => inputRef.current?.click()}
        onDragOver={(e) => {
          e.preventDefault();
          setDrag(true);
        }}
        onDragLeave={() => setDrag(false)}
        onDrop={(e) => {
          e.preventDefault();
          setDrag(false);
          handle(e.dataTransfer.files?.[0] ?? null);
        }}
        className="w-full flex flex-col items-center justify-center gap-2 py-8 px-4 text-center transition-colors"
        style={{
          border: `1px dashed ${drag ? "#C41E3A" : "rgba(10,22,40,0.25)"}`,
          background: drag ? "rgba(196,30,58,0.03)" : "#fff",
          borderRadius: 2,
        }}
      >
        <div
          className="w-10 h-10 flex items-center justify-center"
          style={{ background: "#0A1628", color: "#0891B2", borderRadius: 999 }}
        >
          <Camera size={18} />
        </div>
        <span className="text-sm font-semibold text-[#0A1628]">
          <UploadCloud size={14} className="inline mr-1" />
          Arrastrá o hacé clic para subir
        </span>
        {hint && <span className="text-xs text-[#0A1628]/55">{hint}</span>}
        <span className="text-[10px] text-[#0A1628]/45 uppercase tracking-wider">JPG · PNG · PDF · máx 8MB</span>
      </button>
      <input
        ref={inputRef}
        type="file"
        accept={accept}
        className="hidden"
        onChange={(e) => handle(e.target.files?.[0] ?? null)}
      />
    </div>
  );
}

/* ============ SuccessCard ============ */

export function SuccessCard({
  title,
  body,
  children,
  variant = "success",
}: {
  title: string;
  body?: ReactNode;
  children?: ReactNode;
  variant?: "success" | "info";
}) {
  const color = variant === "success" ? "#16A34A" : "#0891B2";
  return (
    <div
      className="bg-white p-8 sm:p-10 text-center"
      style={{ border: "1px solid rgba(10,22,40,0.1)", borderRadius: 2 }}
    >
      <div
        className="mx-auto mb-6 inline-flex items-center justify-center w-16 h-16"
        style={{ borderRadius: 999, background: `${color}14`, color }}
      >
        <Check size={30} strokeWidth={2.5} />
      </div>
      <h1
        style={{
          fontFamily: "'Fraunces', Georgia, serif",
          fontSize: "1.75rem",
          fontWeight: 500,
          color: "#0A1628",
        }}
      >
        {title}
      </h1>
      {body && <div className="mt-4 text-sm text-[#0A1628]/70 leading-relaxed">{body}</div>}
      {children && <div className="mt-8 space-y-3">{children}</div>}
    </div>
  );
}
