import type { Metadata } from "next";
import { Check } from "lucide-react";
import { BuildWithUs } from "@/components/Sections";
import { Btn, Container, SectionHead } from "@/components/ui";
import { COLOR, CONTACT, PLANS } from "@/lib/data";
import { Faq } from "@/components/Faq";

export const metadata: Metadata = {
  title: "Precios · DataSquad",
  description: "Planes de DataSquad Decide: gratis para equipos pequeños, Equipo y Empresa.",
};

export default function PreciosPage() {
  return (
    <main>
      <section className="relative overflow-hidden pt-40 pb-24 md:pt-48">
        <div className="dots absolute inset-0 [mask-image:radial-gradient(ellipse_at_top,black_25%,transparent_70%)]" />
        <div className="aurora top-40 left-1/2 h-80 w-[520px] -translate-x-1/2 bg-violeta" />
        <Container className="relative">
          <SectionHead
            as="h1"
            index="01"
            label="Precios"
            center
            title={
              <>
                Empieza gratis. <span className="grad-text">Crece cuando lo necesites.</span>
              </>
            }
            lead="Gratis para empresas pequeñas; planes de paga para equipos y organizaciones grandes. Los precios finales se publican al terminar el acceso anticipado."
          />

          <div className="mt-16 grid gap-5 lg:grid-cols-3">
            {PLANS.map((p) => (
              <article
                key={p.name}
                data-reveal=""
                className={`card flex flex-col p-7 md:p-8 ${p.featured ? "card-glow lg:-my-4 lg:py-12" : ""}`}
                style={p.featured ? { boxShadow: `0 30px 80px -30px ${COLOR[p.color]}55` } : undefined}
              >
                <div className="flex items-center justify-between">
                  <p className="tag font-semibold" style={{ color: COLOR[p.color] }}>
                    {p.name}
                  </p>
                  {p.featured && <span className="tag rounded-full bg-ink px-2.5 py-1 !text-[10px] text-bg">Recomendado</span>}
                </div>
                <p className="mt-2 text-sm text-muted">{p.for}</p>
                <p className="mt-8 font-display text-5xl font-semibold tracking-[-0.04em]">{p.price}</p>
                <p className="tag mt-2 text-faint">{p.note}</p>
                <Btn href={p.name === "Empresa" ? `mailto:${CONTACT.email}` : "/contacto"} variant={p.featured ? "primary" : "ghost"} className="mt-8 w-full">
                  {p.cta}
                </Btn>
                <ul className="mt-8 space-y-3 border-t border-line pt-6">
                  {p.features.map((f) => (
                    <li key={f} className="flex items-start gap-3 text-sm">
                      <Check className="mt-0.5 h-4 w-4 shrink-0" style={{ color: COLOR[p.color] }} />
                      {f}
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>

          <div data-reveal="" className="mt-14 grid gap-5 rounded-3xl border border-line bg-bg-2 p-7 md:grid-cols-[1fr_auto] md:items-center md:p-10">
            <div>
              <p className="tag text-muted">Servicios</p>
              <h2 className="mt-2 font-display text-2xl font-semibold tracking-[-0.02em]">¿Necesitas un proyecto a la medida?</h2>
              <p className="mt-2 max-w-2xl text-muted">
                Cotizamos por entregable: el modelo, el tablero o el proceso funcionando. Cuéntanos el problema y te enviamos una propuesta.
              </p>
            </div>
            <Btn href="/contacto" variant="ghost">
              Cotizar un proyecto
            </Btn>
          </div>
        </Container>
      </section>

      <section className="border-t border-line bg-bg-2 py-24">
        <Container>
          <SectionHead index="02" label="Preguntas" color="amarillo" title="Preguntas frecuentes" />
          <div className="mt-10">
            <Faq />
          </div>
        </Container>
      </section>
      <BuildWithUs />
    </main>
  );
}
