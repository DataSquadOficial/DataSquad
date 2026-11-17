import Link from "next/link";
import type { ReactNode } from "react";
import type { ColorKey } from "@/lib/data";

export function Btn({
  href,
  children,
  variant = "primary",
  className = "",
  external = false,
}: {
  href: string;
  children: ReactNode;
  variant?: "primary" | "ghost";
  className?: string;
  external?: boolean;
}) {
  const cls = `btn ${variant === "primary" ? "btn-primary" : "btn-ghost"} ${className}`;
  if (external || href.startsWith("http") || href.startsWith("mailto:"))
    return (
      <a href={href} className={cls} target={href.startsWith("http") ? "_blank" : undefined} rel="noreferrer">
        {children}
      </a>
    );
  return (
    <Link href={href} className={cls}>
      {children}
    </Link>
  );
}

/** Encabezado de sección: índice tipo "capa" de datos + título. */
export function SectionHead({
  index,
  label,
  title,
  lead,
  color = "cian",
  center = false,
  as: H = "h2",
}: {
  index: string;
  label: string;
  title: ReactNode;
  lead?: ReactNode;
  color?: ColorKey;
  center?: boolean;
  as?: "h1" | "h2";
}) {
  return (
    <div data-reveal="" className={center ? "mx-auto max-w-3xl text-center" : "max-w-3xl"}>
      <p className={`tag flex items-center gap-3 text-muted ${center ? "justify-center" : ""}`}>
        <span className="rounded-md border border-line-2 px-1.5 py-0.5 text-ink">{index}</span>
        <span className="h-1.5 w-1.5 rounded-full" style={{ background: "currentColor" }} />
        {label}
      </p>
      <H className="mt-5 font-display text-4xl leading-[1.05] font-semibold tracking-[-0.035em] sm:text-5xl md:text-[56px]">{title}</H>
      {lead && <p className={`mt-5 text-lg leading-relaxed text-muted ${center ? "mx-auto max-w-2xl" : "max-w-2xl"}`}>{lead}</p>}
    </div>
  );
}

export function Pill({ children, color }: { children: ReactNode; color: ColorKey }) {
  return (
    <span
      className="tag inline-flex w-fit self-start items-center gap-1.5 rounded-full px-2.5 py-1 !text-[10px]"
      style={{ border: "1px solid var(--color-line-2)", color: "var(--color-ink)", background: "var(--color-panel)" }}
    >
      <span className="h-1.5 w-1.5 rounded-full bg-ink" />
      {children}
    </span>
  );
}

export function Container({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <div className={`mx-auto w-full max-w-7xl px-5 sm:px-8 ${className}`}>{children}</div>;
}
