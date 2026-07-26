type LogoProps = {
  size?: number;
  showWordmark?: boolean;
  wordmarkClassName?: string;
};

export function RezervoLogo({ size = 28, showWordmark = true, wordmarkClassName = "text-white" }: LogoProps) {
  return (
    <div className="flex items-center gap-2">
      <svg
        width={size}
        height={size}
        viewBox="0 0 48 48"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-label="rezervo logo"
      >
        {/* Roof */}
        <path
          d="M6 22 L24 8 L42 22"
          stroke="var(--brand-cyan)"
          strokeWidth="3.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
        />
        {/* House body with folded corner */}
        <path
          d="M10 22 L10 40 L34 40 L38 36 L38 22"
          stroke="var(--brand-cyan)"
          strokeWidth="3"
          strokeLinejoin="round"
          fill="none"
        />
        {/* Folded corner */}
        <path
          d="M34 40 L34 36 L38 36"
          stroke="var(--brand-cyan)"
          strokeWidth="2.2"
          strokeLinejoin="round"
          fill="none"
        />
        {/* Calendar grid inside */}
        <line x1="16" y1="28" x2="32" y2="28" stroke="var(--brand-cyan)" strokeWidth="2" strokeLinecap="round" />
        <line x1="22" y1="24" x2="22" y2="36" stroke="var(--brand-cyan)" strokeWidth="2" strokeLinecap="round" />
        <line x1="28" y1="24" x2="28" y2="36" stroke="var(--brand-cyan)" strokeWidth="2" strokeLinecap="round" />
        <line x1="16" y1="33" x2="32" y2="33" stroke="var(--brand-cyan)" strokeWidth="2" strokeLinecap="round" />
      </svg>
      {showWordmark && (
        <span className={`text-xl font-bold tracking-tight ${wordmarkClassName}`}>
          re<span style={{ color: "var(--brand-cyan)" }}>z</span>ervo
        </span>
      )}
    </div>
  );
}
