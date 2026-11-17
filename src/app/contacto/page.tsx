import type { Metadata } from "next";
import { ArrowUpRight, Github, Mail, Play, Youtube } from "lucide-react";
import { Container, SectionHead } from "@/components/ui";
import { Faq } from "@/components/Faq";
import { COLOR, CONTACT, type ColorKey } from "@/lib/data";

export const metadata: Metadata = {
  title: "Contacto · DataSquad",
  description: "Escríbenos para acceso anticipado a Decide, proyectos a la medida o colaboraciones.",
};

const CHANNELS: { k: string; title: string; text: string; href: string; cta: string; icon: typeof Mail; color: ColorKey }[] = [
  {
    k: "Correo",
    title: "Escríbenos",
    text: "Acceso anticipado, demos, proyectos a la medida o colaboraciones. Respondemos con una propuesta concreta.",
    href: `mailto:${CONTACT.email}?subject=Hola%20DataSquad`,
    cta: CONTACT.email,
    icon: Mail,
    color: "cian",
  },
  {
    k: "TikTok",
    title: "Aprende en corto",
    text: "La IA explicada en un minuto: modelos, matemática y ejemplos reales.",
    href: CONTACT.tiktok,
    cta: "@datasquad_ds",
    icon: Play,
    color: "violeta",
  },
  {
    k: "YouTube",
    title: "Aprende a fondo",
    text: "Las versiones largas, con más detalle y más matemática, sin aburrir.",
    href: CONTACT.youtube,
    cta: "@DatasquadOficial",
    icon: Youtube,
    color: "verde",
  },
  {
    k: "GitHub",
    title: "Código y ejemplos",
    text: "Ejemplos, plantillas y novedades técnicas de DataSquad.",
    href: CONTACT.github,
    cta: "DataSquadOficial",
    icon: Github,
    color: "amarillo",
  },
];

export default function ContactoPage() {
  return (
    <main>
      <section className="relative overflow-hidden pt-40 pb-24 md:pt-48">
        <div className="dots absolute inset-0 [mask-image:radial-gradient(ellipse_at_top,black_25%,transparent_70%)]" />
        <Container className="relative">
          <SectionHead
            as="h1"
            index="01"
            label="Contacto"
            title={
              <>
                Hablemos de <span className="grad-text">tus datos.</span>
              </>
            }
            lead="Cuéntanos qué decisión toma hoy tu equipo a mano, con qué archivos y cada cuánto. Con eso basta para empezar."
          />
          <div className="mt-14 grid gap-5 sm:grid-cols-2">
            {CHANNELS.map((c) => (
              <a
                key={c.k}
                href={c.href}
                target={c.href.startsWith("http") ? "_blank" : undefined}
                rel="noreferrer"
                data-reveal=""
                className="card card-glow group flex flex-col p-7 md:p-9"
              >
                <div className="flex items-center justify-between">
                  <span className="flex h-12 w-12 items-center justify-center rounded-2xl" style={{ background: `${COLOR[c.color]}1a`, color: COLOR[c.color] }}>
                    <c.icon className="h-5 w-5" />
                  </span>
                  <span className="tag text-faint">{c.k}</span>
                </div>
                <h2 className="mt-8 font-display text-2xl font-semibold tracking-[-0.02em]">{c.title}</h2>
                <p className="mt-2 leading-relaxed text-muted">{c.text}</p>
                <span className="mt-8 flex items-center gap-1.5 font-mono text-sm" style={{ color: COLOR[c.color] }}>
                  {c.cta}
                  <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                </span>
              </a>
            ))}
          </div>
        </Container>
      </section>

      <section id="faq" className="scroll-mt-24 border-t border-line bg-bg-2 py-24">
        <Container>
          <SectionHead index="02" label="Preguntas" color="amarillo" title="Preguntas frecuentes" />
          <div className="mt-10">
            <Faq />
          </div>
        </Container>
      </section>
    </main>
  );
}
