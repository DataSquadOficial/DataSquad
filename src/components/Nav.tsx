"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { ChevronDown, Menu, X } from "lucide-react";
import { Logo } from "./Logo";
import { SUITE } from "@/lib/data";
import { AppIcon } from "./Suite";

const LINKS = [
  { label: "Decide", href: "/decide" },
  { label: "Precios", href: "/precios" },
  { label: "Contacto", href: "/contacto" },
];

export default function Nav() {
  const path = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [drop, setDrop] = useState(false);

  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 12);
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);

  useEffect(() => {
    setOpen(false);
    setDrop(false);
  }, [path]);

  const active = (href: string) => (href === "/" ? path === "/" : path?.startsWith(href));

  return (
    <header className={`fixed inset-x-0 top-0 z-50 px-3 pt-3 sm:px-5 ${path?.startsWith("/decide") ? "themed theme-decide" : ""}`}>
      <div
        className={`mx-auto flex h-16 max-w-7xl items-center justify-between rounded-full border px-4 transition-all duration-300 sm:px-6 ${
          scrolled || open ? "border-line bg-bg/80 backdrop-blur-xl" : "border-transparent bg-transparent"
        }`}
      >
        <Link href="/" aria-label="DataSquad, inicio" className="shrink-0">
          <Logo />
        </Link>

        <nav aria-label="Principal" className="hidden items-center gap-1 md:flex">
          <div className="relative" onMouseEnter={() => setDrop(true)} onMouseLeave={() => setDrop(false)}>
            <button
              type="button"
              aria-expanded={drop}
              onClick={() => setDrop((d) => !d)}
              className={`flex items-center gap-1 rounded-full px-4 py-2 text-sm font-medium ${
                active("/suite") ? "text-ink" : "text-muted hover:text-ink"
              }`}
            >
              Suite <ChevronDown className={`h-4 w-4 transition-transform ${drop ? "rotate-180" : ""}`} />
            </button>
            {drop && (
              <div className="absolute top-full left-1/2 w-[520px] -translate-x-1/2 pt-3">
                <div className="grid grid-cols-2 gap-1 rounded-3xl border border-line bg-panel/95 p-2 shadow-2xl backdrop-blur-xl">
                  {SUITE.map((a) => (
                    <Link key={a.id} href={a.href} className="flex items-center gap-3 rounded-2xl p-3 hover:bg-panel-2">
                      <AppIcon app={a} size={38} />
                      <span className="min-w-0">
                        <span className="block truncate font-display font-semibold" style={{ color: a.ink }}>
                          {a.name}
                        </span>
                        <span className="block truncate text-[12px] text-muted">{a.ready ? a.tagline : "Próximamente"}</span>
                      </span>
                    </Link>
                  ))}
                  <Link href="/suite" className="col-span-2 rounded-2xl px-4 py-3 text-center text-[13px] text-muted hover:bg-panel-2 hover:text-ink">
                    Ver la suite y descargar el lanzador →
                  </Link>
                </div>
              </div>
            )}
          </div>
          {LINKS.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className={`rounded-full px-4 py-2 text-sm font-medium ${active(l.href) ? "text-ink" : "text-muted hover:text-ink"}`}
            >
              {l.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <Link href="/suite#descargar" className="btn btn-primary hidden h-10 px-5 text-sm sm:inline-flex">
            Descargar
          </Link>
          <button
            type="button"
            className="flex h-10 w-10 items-center justify-center rounded-full border border-line-2 md:hidden"
            aria-label={open ? "Cerrar menú" : "Abrir menú"}
            aria-expanded={open}
            onClick={() => setOpen((o) => !o)}
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {open && (
        <div className="mx-auto mt-2 max-w-7xl rounded-3xl border border-line bg-bg/95 p-3 backdrop-blur-xl md:hidden">
          <Link href="/suite" className="tag block px-3 pt-2 pb-1 text-faint">
            Suite DataSquad →
          </Link>
          {SUITE.map((a) => (
            <Link key={a.id} href={a.href} className="flex items-center gap-3 rounded-2xl px-3 py-2.5 hover:bg-panel">
              <AppIcon app={a} size={30} />
              <span className="font-display font-semibold" style={{ color: a.ink }}>
                {a.name}
              </span>
              {!a.ready && <span className="ml-auto text-xs text-faint">Próximamente</span>}
            </Link>
          ))}
          <div className="my-2 h-px bg-line" />
          {LINKS.map((l) => (
            <Link key={l.href} href={l.href} className="block rounded-2xl px-3 py-3 font-medium hover:bg-panel">
              {l.label}
            </Link>
          ))}
          <Link href="/suite#descargar" className="btn btn-primary mt-2 w-full">
            Descargar la suite
          </Link>
        </div>
      )}
    </header>
  );
}
