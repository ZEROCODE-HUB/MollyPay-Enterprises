import logoSrc from "@/assets/molly-logo.png";

export function MollyLogo({ className = "", variant = "dark" }: { className?: string; variant?: "dark" | "light" }) {
  return (
    <div className={`inline-flex items-center ${className}`}>
      <img
        src={logoSrc}
        alt="Molly Money Life"
        className={`h-7 w-auto ${variant === "light" ? "brightness-0 invert" : ""}`}
        width={140}
        height={56}
      />
    </div>
  );
}
