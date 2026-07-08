export function MollyLogo({
  className = "",
  variant = "dark",
}: {
  className?: string;
  variant?: "dark" | "light";
}) {
  const color = variant === "light" ? "#F5F6F8" : "#0A1628";
  return (
    <div className={`inline-flex items-baseline ${className}`}>
      <span
        style={{
          fontFamily: 'Fraunces, ui-serif, Georgia, serif',
          fontWeight: 680,
          fontSize: '1.5rem',
          letterSpacing: '-0.03em',
          color,
          lineHeight: 1,
        }}
      >
        moli
      </span>
      <span
        style={{
          fontFamily: 'Fraunces, ui-serif, Georgia, serif',
          fontWeight: 500,
          fontSize: '1.5rem',
          letterSpacing: '-0.02em',
          color: '#C8102E',
          lineHeight: 1,
        }}
      >
        pay
      </span>
    </div>
  );
}
