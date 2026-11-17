import type { Metadata } from "next";
import { ArrowRight, Braces, Check, Clock, Database, GitBranch, History, Layers, Monitor, Play, RefreshCw, Rocket, Table2, Zap } from "lucide-react";
import FlowStepper from "@/components/FlowStepper";
import { Industries } from "@/components/Sections";
import Simulator from "@/components/Simulator";
import { AppIcon, DownloadButton, DownloadMeta } from "@/components/Suite";
import { Btn, Container, SectionHead } from "@/components/ui";
import { SUITE } from "@/lib/data";

export const metadata: Metadata = {
  title: "DataSquad Decide · Motor de decisiones",
  description: "Reglas, modelos y decisiones auditables. Local y reproducible. Descarga la suite DataSquad y abre Decide.",
};

const DECIDE = SUITE[0];

const QUESTIONS = [
  { area: "Banca", q: "¿Aprobar un crédito?" },
  { area: "Retail", q: "¿Comprar más inventario?" },
  { area: "Logística", q: "¿Qué pedido sale primero?" },
];

const PILLARS = [
  { icon: Check, title: "Auditable.", text: "Cada decisión guarda su porqué, paso a paso: qué entró, qué se calculó y qué regla se cumplió." },
  { icon: RefreshCw, title: "Reproducible.", text: "El mismo caso con la misma versión da siempre el mismo resultado. Sin sorpresas." },
  { icon: Monitor, title: "En tu computadora.", text: "Decide corre local. Tus datos no salen de tu equipo." },
];

const FEATURES = [
  { icon: GitBranch, title: "Flujo visual", text: "Nodos de entrada, cálculo, modelo, reglas y salida conectados con ramas o en secuencia. Lo que ves es lo que se ejecuta." },
  { icon: Braces, title: "Nodos en Python", text: "Cada nodo se programa en Python, con variables de entrada, derivadas y salida separadas para que no choquen." },
  { icon: Layers, title: "Tu modelo como un nodo", text: "Conecta tu modelo ONNX al flujo. Sin traducirlo a reglas a mano." },
  { icon: Table2, title: "Diccionario de datos", text: "Entradas, derivadas con fórmula y salidas documentadas. Vista previa de cada archivo con el tipo de cada columna." },
  { icon: History, title: "Versiones", text: "Cada cambio queda versionado. Compara, regresa a una versión anterior y publica cuando estés listo." },
  { icon: Database, title: "Cualquier entrada y salida", text: "Excel, CSV, Parquet o JSON de entrada; resultados a Excel, tablas o el destino que uses." },
];

const MODES = [
  { icon: Play, title: "Manual", text: "Corre un archivo o un lote cuando lo necesites." },
  { icon: Zap, title: "Tiempo real", text: "Responde decisión por decisión." },
  { icon: Clock, title: "Programado", text: "Corre cada hora, cada día o en la fecha que elijas." },
  { icon: Rocket, title: "Disparador", text: "Se activa con un evento o un procedimiento almacenado." },
];

export default function DecidePage() {
  return (
    <main className="themed theme-decide">
      {/* ---------- Portada ---------- */}
      <section className="relative overflow-hidden pt-36 pb-20 md:pt-44 md:pb-28">
        <div className="dots absolute inset-0 [mask-image:radial-gradient(ellipse_at_top,black_30%,transparent_75%)]" />
        <Container className="relative">
          <div className="grid items-center gap-14 lg:grid-cols-[1fr_1.1fr]">
            <div data-reveal="">
              <div className="flex items-center gap-4">
                <AppIcon app={DECIDE} size={72} />
                <div>
                  <p className="tag text-muted">Motor de decisiones</p>
                  <p className="tag accent-text mt-1 font-semibold">v{DECIDE.version} · Windows</p>
                </div>
              </div>
              <h1 className="mt-8 font-display text-6xl leading-[0.9] font-black tracking-[-0.05em] md:text-8xl">
                <span className="block text-3xl font-light tracking-[-0.03em] text-faint md:text-4xl">DataSquad</span>
                <span className="accent-text uppercase">Decide</span>
              </h1>
              <p className="mt-6 max-w-lg text-xl leading-relaxed text-muted">
                Reglas, modelos y decisiones auditables. Arma un flujo visual: entran datos, se calculan variables, un modelo pronostica y
                tus reglas deciden. Cada resultado sale con su motivo.
              </p>
              <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center">
                <DownloadButton label="Descargar para Windows" className="h-14 px-7 text-base" />
                <Btn href="#como-funciona" variant="ghost" className="h-14 px-7">
                  Ver cómo funciona
                </Btn>
              </div>
              <DownloadMeta className="mt-4" />
              <p className="mt-2 text-sm text-faint">Se instala con el lanzador de la suite DataSquad.</p>
            </div>

            {/* video */}
            <div data-reveal="" className="relative">
              <div className="accent-bg absolute -inset-3 -z-10 rotate-1 rounded-[28px] opacity-90" />
              <video
                className="block aspect-video w-full rounded-2xl border border-line bg-black shadow-2xl"
                controls
                preload="none"
                playsInline
                poster="/video/decide-poster.jpg"
              >
                <source src="/video/decide-historia.mp4" type="video/mp4" />
              </video>
              <p className="tag mt-5 text-faint">La historia de Decide · 45 segundos</p>
            </div>
          </div>
        </Container>
      </section>

      {/* ---------- El problema ---------- */}
      <section className="border-y border-line bg-bg-2 py-24 md:py-32">
        <Container>
          <SectionHead
            index="01"
            label="El problema"
            title={
              <>
                Cada día, tu negocio toma <span className="grad-text">cientos de decisiones.</span>
              </>
            }
            lead="La mayoría se resuelve en hojas de cálculo, correos y criterio de cada quien. Nadie puede explicar después por qué se decidió así."
          />
          <div className="mt-14 grid gap-5 md:grid-cols-3">
            {QUESTIONS.map((c, i) => (
              <article key={c.q} data-reveal="" className={`card p-7 md:p-9 ${["-rotate-1", "rotate-1", "-rotate-[0.5deg]"][i]}`}>
                <p className="tag text-faint">{c.area}</p>
                <h3 className="mt-3 font-display text-3xl leading-tight font-bold tracking-[-0.03em]">{c.q}</h3>
                <div className="mt-6 flex gap-2 text-sm font-semibold">
                  <span className="rounded-full px-3 py-1" style={{ background: "#e3f4ea", color: "#12613c" }}>Sí</span>
                  <span className="rounded-full px-3 py-1" style={{ background: "#fde8e6", color: "#b3261e" }}>No</span>
                  <span className="rounded-full px-3 py-1" style={{ background: "#fdf1d3", color: "#8a5a00" }}>Revisar</span>
                </div>
              </article>
            ))}
          </div>
        </Container>
      </section>

      {/* ---------- Banda magenta: la promesa ---------- */}
      <section className="band-accent py-20 md:py-28">
        <Container className="text-center">
          <div data-reveal="">
            <p className="tag text-muted">DataSquad Decide las ordena con</p>
            <p className="mx-auto mt-6 flex max-w-4xl flex-wrap items-center justify-center gap-3 font-display text-4xl font-bold tracking-[-0.03em] md:text-6xl">
              {["tus datos", "tus modelos", "tus reglas"].map((t) => (
                <span key={t} className="rounded-full bg-white px-6 py-2 text-[#b02864]">
                  {t}
                </span>
              ))}
            </p>
          </div>
        </Container>
      </section>

      {/* ---------- Cómo funciona ---------- */}
      <section id="como-funciona" className="scroll-mt-24 py-24 md:py-32">
        <Container>
          <SectionHead
            index="02"
            label="Cómo funciona"
            title={
              <>
                Un caso, cinco pasos, <span className="grad-text">un motivo.</span>
              </>
            }
            lead="Sigue un caso real de principio a fin. Toca cada paso para ver cómo se llena la traza."
          />
          <div className="mt-14">
            <FlowStepper />
          </div>
        </Container>
      </section>

      {/* ---------- Pilares ---------- */}
      <section className="border-y border-line bg-bg-2 py-24 md:py-28">
        <Container>
          <div className="grid gap-px overflow-hidden rounded-3xl border border-line bg-line md:grid-cols-3">
            {PILLARS.map((p) => (
              <article key={p.title} data-reveal="" className="bg-panel p-8 md:p-10">
                <span className="accent-bg flex h-12 w-12 items-center justify-center rounded-xl">
                  <p.icon className="h-6 w-6" />
                </span>
                <h3 className="mt-6 font-display text-3xl font-bold tracking-[-0.03em]">{p.title}</h3>
                <p className="mt-2 leading-relaxed text-muted">{p.text}</p>
              </article>
            ))}
          </div>
        </Container>
      </section>

      {/* ---------- Simulador ---------- */}
      <section className="invert-band py-24 md:py-32">
        <Container>
          <SectionHead
            index="03"
            label="Pruébalo aquí"
            title={
              <>
                Mueve una variable. <span className="grad-text">Mira la decisión cambiar.</span>
              </>
            }
            lead="Un ejemplo de crédito para que sientas la idea antes de instalar nada."
          />
          <div className="mt-14">
            <Simulator />
          </div>
        </Container>
      </section>

      {/* ---------- Funciones ---------- */}
      <section className="py-24 md:py-32">
        <Container>
          <SectionHead
            index="04"
            label="Funciones"
            title={
              <>
                Todo el ciclo de una estrategia, <span className="grad-text">en un solo lugar.</span>
              </>
            }
          />
          <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {FEATURES.map((f) => (
              <article key={f.title} data-reveal="" className="card card-glow p-7">
                <f.icon className="accent-text h-6 w-6" />
                <h3 className="mt-5 font-display text-xl font-semibold tracking-[-0.02em]">{f.title}</h3>
                <p className="mt-2 leading-relaxed text-muted">{f.text}</p>
              </article>
            ))}
          </div>

          <h3 data-reveal="" className="mt-24 font-display text-3xl font-semibold tracking-[-0.03em]">
            Ejecútalo como lo necesite tu operación
          </h3>
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {MODES.map((m) => (
              <div key={m.title} data-reveal="" className="rounded-2xl border border-line p-6">
                <m.icon className="accent-text h-5 w-5" />
                <p className="mt-4 font-display text-lg font-semibold">{m.title}</p>
                <p className="mt-1 text-sm text-muted">{m.text}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <div className="border-t border-line bg-bg-2">
        <Industries index="05" />
      </div>

      {/* ---------- Descarga ---------- */}
      <section className="band-accent py-24 md:py-36">
        <Container className="text-center">
          <div data-reveal="">
            <AppIcon app={DECIDE} size={92} className="ring-4 ring-white/25" />
            <h2 className="mx-auto mt-8 max-w-4xl font-display text-[11vw] leading-[0.95] font-black tracking-[-0.05em] sm:text-6xl md:text-[92px]">
              Decide con datos.
              <br />
              <span className="grad-text">Explícalo siempre.</span>
            </h2>
            <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <DownloadButton label="Descargar para Windows" className="h-14 px-7 text-base" />
              <Btn href="/contacto" variant="ghost" className="h-14 px-7">
                Pedir una demo <ArrowRight className="h-4 w-4" />
              </Btn>
            </div>
            <DownloadMeta className="mt-5" />
          </div>
        </Container>
      </section>
    </main>
  );
}
