/** Nombre de la marca en texto: "DATA SQUAD" en negro, sin el logo de color. */
export function Wordmark({ className = "" }: { className?: string }) {
  return (
    <span className={`font-display font-extrabold uppercase tracking-[-0.02em] whitespace-nowrap text-ink ${className}`}>
      Data Squad
    </span>
  );
}

export function Logo({ size = "md" }: { id?: string; size?: "md" | "lg" }) {
  return (
    <span className="flex items-center gap-2">
      <span className="flex h-7 w-7 items-center justify-center rounded-md bg-ink font-mono text-[11px] font-bold text-white">DS</span>
      <Wordmark className={size === "lg" ? "text-3xl" : "text-[17px]"} />
    </span>
  );
}
