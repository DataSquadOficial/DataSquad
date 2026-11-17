import Link from "next/link";
import { ArrowRight, ArrowUpRight, Cloud, Cpu, Eye, Factory, Files, Mail, Shield } from "lucide-react";
import { CONTACT, INDUSTRIES, PRINCIPLES, SHOWCASE, STEPS, SUITE } from "@/lib/data";
import { Btn, Container, SectionHead } from "./ui";
import { AppArt, AppIcon, DownloadButton, DownloadMeta, SuiteGrid } from "./Suite";
import { ShowcaseArea, ShowcaseProvider } from "./Showcase";
import Simulator from "./Simulator";

const ICONS = { shield: Shield, eye: Eye, cpu: Cpu, cloud: Cloud, files: Files, factory: Factory } as const;

/* ---------- Cinta negra bajo la portada ---------- */
const CAPS = [
  "Motor de decisiones",
  "Riesgo de crédito",
  "Pronóstico de demanda",
  "Reabastecimiento",
  "Modelos ONNX y PMML",
  "Traza de cada variable",
  "Tiempo real y batch",
  "Tableros para dirección",
  "Asistente privado",
];

export function Ticker() {
  return (
    <div className="invert-band overflow-hidden border-y border-line py-4" aria-hidden="true">
      <div className="marquee-fast flex w-max gap-10 pr-10 whitespace-nowrap">
        {[...CAPS, ...CAPS].map((t, i) => (
          <span key={i} className="tag flex items-center gap-10 !text-[12px] text-ink">
            {t}
            <span className="h-1 w-1 rounded-full bg-faint" />
          </span>
        ))}
      </div>
    </div>
  );
}

/* ---------- 01 La suite ---------- */
export function Platform() {
  return (
    <section id="productos" className="relative py-24 md:py-32">
      <Container>
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <SectionHead
            index="01"
            label="La suite"
            title={
              <>
                Seis apps. <span className="grad-text">Un solo escuadrón.</span>
              </>
            }
            lead="Decidir, analizar, visualizar, entrenar, comprar y explorar. Todas se instalan desde un mismo lanzador y cada una funciona sola."
          />
          <div data-reveal="" className="flex shrink-0 flex-col items-start gap-3 lg:items-end lg:pb-2">
            <DownloadButton />
            <DownloadMeta />
          </div>
        </div>
        <div className="mt-14">
          <SuiteGrid />
        </div>
      </Container>
    </section>
  );
}

/* ---------- 02 Simulador (banda negra) ---------- */
export function DecidePromo() {
  return (
    <section className="invert-band relative overflow-hidden py-24 md:py-32">
      <div className="dots absolute inset-0 [mask-image:radial-gradient(ellipse_at_top_right,black_10%,transparent_60%)]" />
      <Container className="relative">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <SectionHead
            index="02"
            label="DataSquad Decide · pruébalo"
            title={
              <>
                Mueve una variable.
                <br />
                <span className="grad-text">Mira la decisión cambiar.</span>
              </>
            }
            lead="Así trabaja un motor de decisiones: entran datos, se calculan variables, corre un modelo y sale una decisión con su traza completa."
          />
          <div data-reveal="" className="flex shrink-0 flex-col gap-3 sm:flex-row lg:pb-2">
            <Btn href="/decide">
              Ver DataSquad Decide <ArrowRight className="h-4 w-4" />
            </Btn>
            <Btn href="/contacto" variant="ghost">
              Pedir una demo
            </Btn>
          </div>
        </div>
        <div className="mt-14">
          <Simulator />
        </div>
      </Container>
    </section>
  );
}

/* ---------- 03 Cómo funciona ---------- */
export function HowItWorks({ index = "03" }: { index?: string }) {
  return (
    <section className="py-24 md:py-32">
      <Container>
        <SectionHead
          index={index}
          label="Cómo funciona"
          title={
            <>
              De la hoja de cálculo <span className="grad-text">a la decisión en producción.</span>
            </>
          }
          lead="Lo que antes vivía en macros y correos ahora vive en un grafo que puedes probar, versionar y desplegar."
        />
        <ol className="relative mt-16 grid gap-10 md:grid-cols-4 md:gap-6">
          <span className="absolute top-[22px] right-0 left-0 hidden h-px bg-line-2 md:block" aria-hidden="true" />
          {STEPS.map((s) => (
            <li key={s.n} data-reveal="" className="relative">
              <span className="relative flex h-11 w-11 items-center justify-center rounded-full border border-ink bg-bg font-mono text-sm">{s.n}</span>
              <h3 className="mt-6 font-display text-3xl font-semibold tracking-[-0.03em]">{s.title}</h3>
              <p className="mt-2 max-w-xs leading-relaxed text-muted">{s.text}</p>
            </li>
          ))}
        </ol>
      </Container>
    </section>
  );
}

/* ---------- 02–04 Carrusel: cada app con su demo, sus pasos y sus usos ---------- */
function SlideHead({ index, app, a, b, lead }: { index: string; app: (typeof SUITE)[number]; a: string; b: string; lead?: string }) {
  return (
    <div className="max-w-3xl">
      <p className="tag flex flex-wrap items-center gap-3 text-muted">
        <span className="rounded-md border border-line-2 px-1.5 py-0.5 text-ink">{index}</span>
        <span className="accent-text font-semibold">DataSquad {app.name}</span>
        <span className="rounded border border-line-2 px-1.5 py-0.5">{app.ready ? `v${app.version}` : "Próximamente"}</span>
      </p>
      <h2 className="mt-5 font-display text-4xl leading-[1.05] font-semibold tracking-[-0.035em] sm:text-5xl md:text-[56px]">
        {a} <span className="grad-text">{b}</span>
      </h2>
      {lead && <p className="mt-5 max-w-2xl text-lg leading-relaxed text-muted">{lead}</p>}
    </div>
  );
}

export function ProductShowcase() {
  return (
    <ShowcaseProvider>
      {/* 02 · demo (banda negra) */}
      <section className="invert-band relative overflow-hidden py-24 md:py-32">
        <div className="dots absolute inset-0 [mask-image:radial-gradient(ellipse_at_top_right,black_10%,transparent_60%)]" />
        <Container className="relative">
          <ShowcaseArea>
            {SUITE.map((app) => {
              const c = SHOWCASE[app.id].demo;
              return (
                <div key={app.id}>
                  <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
                    <SlideHead index="02" app={app} a={c.a} b={c.b} lead={c.lead} />
                    {app.ready && (
                      <div className="flex shrink-0 flex-col gap-3 sm:flex-row lg:pb-2">
                        <Btn href={app.href}>
                          Ver DataSquad {app.name} <ArrowRight className="h-4 w-4" />
                        </Btn>
                        <Btn href="/contacto" variant="ghost">
                          Pedir una demo
                        </Btn>
                      </div>
                    )}
                  </div>
                  <div className="mt-12">
                    {app.id === "decide" ? (
                      <Simulator />
                    ) : (
                      <div className="grid overflow-hidden rounded-3xl border border-line bg-panel lg:grid-cols-[1.25fr_1fr]">
                        <div className="relative min-h-[260px] border-b border-line lg:min-h-[420px] lg:border-r lg:border-b-0">
                          <AppArt app={app} />
                        </div>
                        <div className="flex flex-col p-7 md:p-10">
                          <AppIcon app={app} size={72} />
                          <p className="tag mt-6 text-muted">{app.tagline}</p>
                          <p className="mt-2 font-display text-3xl leading-tight font-bold tracking-[-0.03em] md:text-4xl">{app.about}</p>
                          <ul className="mt-6 space-y-2.5">
                            {app.points.map((pt) => (
                              <li key={pt} className="flex items-center gap-3">
                                <span className="h-px w-5" style={{ background: "var(--accent)" }} />
                                {pt}
                              </li>
                            ))}
                          </ul>
                          <p className="tag accent-text mt-auto pt-8 font-semibold">Próximamente en la suite</p>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </ShowcaseArea>
        </Container>
      </section>

      {/* 03 · cómo funciona */}
      <section className="py-24 md:py-32">
        <Container>
          <ShowcaseArea>
            {SUITE.map((app) => {
              const c = SHOWCASE[app.id].how;
              return (
                <div key={app.id}>
                  <SlideHead index="03" app={app} a={c.a} b={c.b} lead={c.lead} />
                  <ol className="relative mt-16 grid gap-10 md:grid-cols-4 md:gap-6">
                    <span className="absolute top-[22px] right-0 left-0 hidden h-px bg-line-2 md:block" aria-hidden="true" />
                    {c.steps.map((st, k) => (
                      <li key={st.title} className="relative">
                        <span className="accent-border accent-text relative flex h-11 w-11 items-center justify-center rounded-full border bg-bg font-mono text-sm font-semibold">0{k + 1}</span>
                        <h3 className="mt-6 font-display text-3xl font-semibold tracking-[-0.03em]">{st.title}</h3>
                        <p className="mt-2 max-w-xs leading-relaxed text-muted">{st.text}</p>
                      </li>
                    ))}
                  </ol>
                </div>
              );
            })}
          </ShowcaseArea>
        </Container>
      </section>

      {/* 04 · usos */}
      <section className="border-t border-line bg-bg-2 py-24 md:py-32">
        <Container>
          <ShowcaseArea>
            {SUITE.map((app) => {
              const c = SHOWCASE[app.id].uses;
              return (
                <div key={app.id}>
                  <SlideHead index="04" app={app} a={c.a} b={c.b} />
                  <div className="accent-border mt-14 border-t-2">
                    {c.items.map((it, k) => (
                      <article key={it.title} className="grid items-baseline gap-4 border-b border-line-2 py-9 md:grid-cols-[80px_1fr_1.3fr_auto] md:gap-8 md:py-10">
                        <span className="font-mono text-sm text-faint">0{k + 1}</span>
                        <div>
                          <p className="tag accent-text font-semibold">{it.sector}</p>
                          <h3 className="mt-2 font-display text-3xl font-semibold tracking-[-0.03em] md:text-4xl">{it.title}</h3>
                        </div>
                        <p className="max-w-lg leading-relaxed text-muted">{it.text}</p>
                        <div className="md:min-w-[190px] md:text-right">
                          {it.stat && (
                            <>
                              <p className="font-display text-5xl font-black tracking-[-0.05em] whitespace-nowrap md:text-6xl">{it.stat}</p>
                              <p className="tag mt-1 text-faint">{it.statLabel}</p>
                            </>
                          )}
                        </div>
                      </article>
                    ))}
                  </div>
                </div>
              );
            })}
          </ShowcaseArea>
        </Container>
      </section>
    </ShowcaseProvider>
  );
}

/* ---------- 04 Principios ---------- */
export function Principles({ index = "05" }: { index?: string }) {
  return (
    <section className="relative border-y border-line bg-bg-2 py-24 md:py-32">
      <Container>
        <SectionHead
          index={index}
          label="Principios"
          title={
            <>
              Hecho con <span className="grad-text">datos reales</span>, no con promesas.
            </>
          }
          lead="Lo aprendimos operando motores de decisión en banca y pronósticos de demanda en retail. Estas son las reglas que no negociamos."
        />
        <div className="mt-14 grid gap-px overflow-hidden rounded-3xl border border-line bg-line sm:grid-cols-2 lg:grid-cols-3">
          {PRINCIPLES.map((p, i) => {
            const Icon = ICONS[p.icon];
            return (
              <article key={p.title} data-reveal="" className="group bg-bg-2 p-7 transition-colors duration-300 hover:bg-ink hover:text-bg md:p-9">
                <div className="flex items-center justify-between">
                  <span className="flex h-11 w-11 items-center justify-center rounded-xl border border-line-2 transition-colors group-hover:border-bg/40">
                    <Icon className="h-5 w-5" />
                  </span>
                  <span className="font-mono text-xs text-faint">{String(i + 1).padStart(2, "0")}</span>
                </div>
                <h3 className="mt-6 font-display text-xl font-semibold tracking-[-0.02em]">{p.title}</h3>
                <p className="mt-2 leading-relaxed text-muted transition-colors group-hover:text-bg/70">{p.text}</p>
              </article>
            );
          })}
        </div>
      </Container>
    </section>
  );
}

/* ---------- 05 Industrias ---------- */
export function Industries({ index = "05" }: { index?: string }) {
  return (
    <section className="py-24 md:py-32">
      <Container>
        <SectionHead
          index={index}
          label="Industrias"
          title={
            <>
              Soluciones listas para <span className="grad-text">tu sector.</span>
            </>
          }
        />
        <div className="mt-14 border-t border-ink">
          {INDUSTRIES.map((ind, i) => (
            <article key={ind.key} data-reveal="" className="group grid items-baseline gap-4 border-b border-line-2 py-9 transition-colors hover:border-ink md:grid-cols-[80px_1fr_1.3fr_auto] md:gap-8 md:py-11">
              <span className="font-mono text-sm text-faint">0{i + 1}</span>
              <div>
                <p className="tag text-muted">{ind.key}</p>
                <h3 className="mt-2 font-display text-3xl font-semibold tracking-[-0.03em] md:text-4xl">{ind.title}</h3>
              </div>
              <p className="max-w-lg leading-relaxed text-muted">{ind.text}</p>
              <div className="md:text-right">
                <p className="font-display text-5xl font-black tracking-[-0.05em] whitespace-nowrap md:text-6xl">{ind.stat}</p>
                <p className="tag mt-1 text-faint">{ind.statLabel}</p>
              </div>
            </article>
          ))}
        </div>
      </Container>
    </section>
  );
}

/* ---------- 06 Aprende ---------- */
const TOPICS = ["Perceptrón", "Retropropagación", "XGBoost", "Riesgo de crédito", "Monte Carlo", "Funciones de activación", "Árboles de decisión", "Redes neuronales", "Pronóstico de demanda", "LLMs por dentro"];

export function AprendeBand({ index = "06" }: { index?: string }) {
  return (
    <section className="relative overflow-hidden border-y border-line bg-bg-2 py-24 md:py-28">
      <div className="relative flex overflow-hidden" aria-hidden="true">
        <div className="marquee flex shrink-0 gap-10 pr-10 whitespace-nowrap">
          {[...TOPICS, ...TOPICS].map((t, i) => (
            <span key={i} className={`flex items-center gap-10 font-display text-5xl font-black tracking-[-0.045em] uppercase md:text-7xl ${i % 2 ? "text-line-2" : "text-ink"}`}>
              {t}
              <span className="h-3 w-3 rounded-full bg-ink" />
            </span>
          ))}
        </div>
      </div>
      <Container className="mt-16">
        <div className="grid items-center gap-10 lg:grid-cols-[1.2fr_1fr]">
          <SectionHead
            index={index}
            label="DataSquad Aprende"
            title={
              <>
                La IA explicada <span className="grad-text">desde adentro.</span>
              </>
            }
            lead="Videos que muestran cómo piensa un modelo, con su matemática y ejemplos reales. Para que la ciencia de datos se aplique en serio."
          />
          <div data-reveal="" className="flex flex-col gap-3">
            {[
              ["TikTok", "@datasquad_ds", CONTACT.tiktok],
              ["YouTube", "@DatasquadOficial", CONTACT.youtube],
            ].map(([k, h, url]) => (
              <a key={k} href={url} target="_blank" rel="noreferrer" className="card card-glow group flex items-center justify-between p-5 hover:bg-ink hover:text-bg">
                <span>
                  <span className="tag text-faint">{k}</span>
                  <span className="mt-1 block font-display text-xl font-semibold">{h}</span>
                </span>
                <ArrowUpRight className="h-5 w-5 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </a>
            ))}
            <p className="px-1 text-sm text-faint italic">{CONTACT.lema}</p>
          </div>
        </div>
      </Container>
    </section>
  );
}

/* ---------- CTA final ---------- */
export function BuildWithUs() {
  return (
    <section className="relative overflow-hidden py-28 md:py-40">
      <div className="dots absolute inset-0 [mask-image:radial-gradient(ellipse_at_center,black_10%,transparent_65%)]" />
      <Container className="relative text-center">
        <div data-reveal="">
          <p className="tag text-faint">Data Squad · contacto</p>
          <h2 className="mx-auto mt-6 max-w-5xl font-display text-[10.5vw] leading-[0.95] font-black tracking-[-0.05em] uppercase sm:text-6xl md:text-[96px]">
            Construyamos tu <span className="grad-text">próxima decisión.</span>
          </h2>
          <p className="mx-auto mt-7 max-w-xl text-lg text-muted">
            Cuéntanos qué decides hoy a mano. Te respondemos con una propuesta concreta, no con una presentación genérica.
          </p>
          <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Btn href={`mailto:${CONTACT.email}`}>
              <Mail className="h-4 w-4" /> {CONTACT.email}
            </Btn>
            <Btn href="/contacto" variant="ghost">
              Ver otras formas de contacto
            </Btn>
          </div>
        </div>
      </Container>
    </section>
  );
}
