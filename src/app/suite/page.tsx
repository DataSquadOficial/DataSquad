import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, MonitorDown, MousePointerClick, Rocket } from "lucide-react";
import { BuildWithUs } from "@/components/Sections";
import { AppIcon, DownloadButton, DownloadMeta, IconGrid, SuiteGrid } from "@/components/Suite";
import { Btn, Container, SectionHead } from "@/components/ui";
import { CONTACT, DOWNLOAD, SUITE } from "@/lib/data";

export const metadata: Metadata = {
  title: "Suite DataSquad · Seis apps de datos",
  description: "Descarga el lanzador de DataSquad para Windows e instala Decide. Quantix, BI, Lab, Smart Procurement y Associative Data Explorer llegan pronto.",
};

const INSTALL = [
  { icon: MonitorDown, title: "Descarga el lanzador", text: `Un solo archivo de ${DOWNLOAD.size} para ${DOWNLOAD.os}.` },
  { icon: MousePointerClick, title: "Ábrelo", text: "Verás las seis apps de la suite, con su estado y su versión." },
  { icon: Rocket, title: "Abre Decide", text: "Decide ya está disponible. Las demás aparecen como Próximamente y se activarán ahí mismo." },
];

export default function SuitePage() {
  const upcoming = SUITE.filter((a) => !a.ready);
  return (
    <main>
      {/* ---------- Portada + descarga ---------- */}
      <section id="descargar" className="relative scroll-mt-24 overflow-hidden pt-36 pb-20 md:pt-44 md:pb-28">
        <div className="dots absolute inset-0 [mask-image:radial-gradient(ellipse_at_top,black_25%,transparent_70%)]" />
        <Container className="relative">
          <div className="grid items-center gap-16 lg:grid-cols-[1.15fr_1fr]">
            <div data-reveal="">
              <p className="tag flex items-center gap-3 text-muted">
                <span className="rounded-md border border-line-2 px-1.5 py-0.5 text-ink">01</span>
                Suite DataSquad
              </p>
              <h1 className="mt-5 font-display text-5xl leading-[0.95] font-black tracking-[-0.05em] uppercase sm:text-7xl md:text-[88px]">
                Seis apps.
                <br />
                <span className="grad-text">Un solo escuadrón.</span>
              </h1>
              <p className="mt-7 max-w-xl text-lg leading-relaxed text-muted md:text-xl">
                Motor de decisiones, estadística y econometría, dashboards, laboratorio de IA, compras inteligentes y exploración
                asociativa de datos. Apps de escritorio hechas por el equipo DataSquad, instaladas desde un mismo lanzador.
              </p>
              <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center">
                <DownloadButton label="Descargar lanzador para Windows" className="h-14 px-7 text-base" />
                <Btn href={CONTACT.github} variant="ghost" className="h-14 px-7">
                  GitHub
                </Btn>
              </div>
              <DownloadMeta className="mt-4" />
              <div className="mt-6 max-w-xl rounded-2xl border border-line bg-panel p-5 text-sm leading-relaxed text-muted">
                <p className="font-semibold text-ink">¿Tu navegador o Windows muestran una advertencia?</p>
                <p className="mt-1.5">
                  Es normal por ahora: el archivo es nuevo y todavía no tiene firma digital de código. En el navegador elige «Conservar»;
                  al abrirlo, en la ventana de SmartScreen elige «Más información» y luego «Ejecutar de todas formas».
                </p>
                <p className="mt-3">Para confirmar que el archivo es el original, compara su huella SHA-256:</p>
                <code className="mt-1.5 block rounded-lg bg-bg-2 p-2.5 font-mono text-[11px] break-all text-ink">{DOWNLOAD.sha256}</code>
                <p className="mt-2 text-xs text-faint">
                  En PowerShell: <span className="font-mono">Get-FileHash {DOWNLOAD.file}</span>
                </p>
              </div>
            </div>
            <div data-reveal="" className="card p-8 md:p-12">
              <IconGrid />
            </div>
          </div>

          {/* pasos */}
          <ol className="mt-20 grid gap-px overflow-hidden rounded-3xl border border-line bg-line md:grid-cols-3">
            {INSTALL.map((s, i) => (
              <li key={s.title} data-reveal="" className="bg-panel p-7 md:p-9">
                <div className="flex items-center justify-between">
                  <s.icon className="h-6 w-6" />
                  <span className="font-mono text-xs text-faint">0{i + 1}</span>
                </div>
                <h2 className="mt-5 font-display text-2xl font-semibold tracking-[-0.02em]">{s.title}</h2>
                <p className="mt-2 leading-relaxed text-muted">{s.text}</p>
              </li>
            ))}
          </ol>
        </Container>
      </section>

      {/* ---------- Las apps ---------- */}
      <section className="border-y border-line bg-bg-2 py-24 md:py-32">
        <Container>
          <SectionHead
            index="02"
            label="Las apps"
            title={
              <>
                Elige una app <span className="grad-text">para explorarla.</span>
              </>
            }
          />
          <div className="mt-14">
            <SuiteGrid />
          </div>
        </Container>
      </section>

      {/* ---------- Decide destacado ---------- */}
      <section className="themed theme-decide band-accent py-20 md:py-28">
        <Container>
          <div data-reveal="" className="flex flex-col items-start gap-8 md:flex-row md:items-center md:justify-between">
            <div className="flex items-center gap-6">
              <AppIcon app={SUITE[0]} size={96} className="ring-4 ring-white/25" />
              <div>
                <p className="tag text-muted">Disponible hoy · v{SUITE[0].version}</p>
                <h2 className="mt-2 font-display text-4xl font-black tracking-[-0.04em] md:text-6xl">DataSquad Decide</h2>
                <p className="mt-2 max-w-xl text-lg text-muted">{SUITE[0].headline}</p>
              </div>
            </div>
            <Link href="/decide" className="btn btn-primary h-14 shrink-0 px-7 text-base">
              Explorar Decide <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </Container>
      </section>

      {/* ---------- Próximamente ---------- */}
      <section className="py-24 md:py-32">
        <Container>
          <SectionHead index="03" label="Próximamente" title={<>Lo que viene <span className="grad-text">en la suite.</span></>} />
          <div className="mt-14 border-t border-ink">
            {upcoming.map((a) => (
              <article key={a.id} data-reveal="" className="grid items-center gap-5 border-b border-line-2 py-8 md:grid-cols-[auto_1fr_1.2fr_auto] md:gap-8">
                <AppIcon app={a} size={60} />
                <div>
                  <p className="tag text-muted">{a.tagline}</p>
                  <h3 className="mt-1 font-display text-2xl font-bold tracking-[-0.03em] md:text-3xl">
                    DataSquad <span style={{ color: a.ink }}>{a.name}</span>
                  </h3>
                </div>
                <p className="max-w-lg leading-relaxed text-muted">{a.about}</p>
                <div className="flex flex-wrap gap-1.5 md:max-w-[220px] md:justify-end">
                  {a.points.map((pt) => (
                    <span key={pt} className="tag rounded border border-line-2 px-2 py-1 !text-[10px] text-muted">
                      {pt}
                    </span>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </Container>
      </section>

      <BuildWithUs />
    </main>
  );
}
