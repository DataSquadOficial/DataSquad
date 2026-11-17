import Link from "next/link";
import { CONTACT, SUITE } from "@/lib/data";

const COLS = [
  { title: "Suite", links: [...SUITE.map((a) => ({ label: a.name, href: a.href })), { label: "Descargar", href: "/suite#descargar" }] },
  {
    title: "Empresa",
    links: [
      { label: "Precios", href: "/precios" },
      { label: "Contacto", href: "/contacto" },
      { label: "Preguntas frecuentes", href: "/contacto#faq" },
      { label: "Aviso de privacidad", href: "/legal/privacidad" },
      { label: "Términos de uso", href: "/legal/terminos" },
    ],
  },
  {
    title: "Comunidad",
    links: [
      { label: "TikTok", href: CONTACT.tiktok },
      { label: "YouTube", href: CONTACT.youtube },
      { label: "GitHub", href: CONTACT.github },
    ],
  },
];

export default function Footer() {
  return (
    <footer className="invert-band overflow-hidden">
      <div className="mx-auto grid max-w-7xl gap-12 px-5 pt-20 pb-14 sm:px-8 md:grid-cols-[1.4fr_repeat(3,1fr)]">
        <div>
          <p className="max-w-xs font-display text-2xl leading-snug font-semibold tracking-[-0.02em]">
            Software, proyectos y contenido para que las empresas decidan con datos.
          </p>
          <a href={`mailto:${CONTACT.email}`} className="mt-6 inline-block text-sm underline decoration-line-2 underline-offset-4 hover:decoration-ink">
            {CONTACT.email}
          </a>
        </div>
        {COLS.map((c) => (
          <div key={c.title}>
            <p className="tag text-faint">{c.title}</p>
            <ul className="mt-4 space-y-2.5">
              {c.links.map((l) => (
                <li key={l.label}>
                  {l.href.startsWith("http") ? (
                    <a href={l.href} target="_blank" rel="noreferrer" className="text-sm text-muted hover:text-ink">
                      {l.label}
                    </a>
                  ) : (
                    <Link href={l.href} className="text-sm text-muted hover:text-ink">
                      {l.label}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="border-t border-line">
        <div className="mx-auto flex max-w-7xl flex-col gap-2 px-5 py-6 text-xs text-faint sm:flex-row sm:justify-between sm:px-8">
          <p>© {new Date().getFullYear()} DataSquad. Hecho en México. Este sitio no usa cookies ni rastreadores.</p>
          <p className="italic">{CONTACT.lema}</p>
        </div>
      </div>
      {/* nombre gigante al pie */}
      <p
        aria-hidden="true"
        className="-mb-[0.14em] text-center font-display leading-[0.8] font-black tracking-[-0.055em] whitespace-nowrap text-panel-2 uppercase select-none"
        style={{ fontSize: "16.5vw" }}
      >
        Data Squad
      </p>
    </footer>
  );
}
