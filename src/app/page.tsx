import { ArrowRight } from "lucide-react";
import HeroField from "@/components/HeroField";
import { AprendeBand, BuildWithUs, Platform, Principles, ProductShowcase, Ticker } from "@/components/Sections";
import { Btn } from "@/components/ui";

export default function Home() {
  return (
    <main>
      {/* ---------- Hero ---------- */}
      <HeroField>
        <p className="intro tag text-muted" style={{ animationDelay: "0.1s" }}>
          Ciencia de datos · Decisiones · México
        </p>
        <h1 aria-label="Data Squad" className="mt-5 font-display leading-[0.9] font-black tracking-[-0.055em] whitespace-nowrap text-ink uppercase" style={{ fontSize: "clamp(42px, 11vw, 168px)" }}>
          {["DATA", "SQUAD"].map((w, wi) => (
            <span key={w} className="inline-block overflow-hidden pb-[0.04em] align-top" aria-hidden="true">
              {w.split("").map((l, i) => (
                <span key={i} className="wm-letter" style={{ animationDelay: `${0.15 + (wi * 4 + i) * 0.05}s` }}>
                  {l}
                </span>
              ))}
              {wi === 0 && <span className="inline-block w-[0.22em]" />}
            </span>
          ))}
        </h1>
        <p className="intro mx-auto mt-7 max-w-2xl text-lg leading-relaxed text-muted md:text-xl" style={{ animationDelay: "0.9s" }}>
          Convertimos tus datos en decisiones: software, modelos y proyectos que deciden a quién prestarle, cuánto pedir y qué atender
          primero. Explicable, en tu infraestructura y sin cajas negras.
        </p>
        <div className="intro mt-9 flex flex-col justify-center gap-3 sm:flex-row" style={{ animationDelay: "1.1s" }}>
          <Btn href="/suite#descargar">
            Descargar la suite <ArrowRight className="h-4 w-4" />
          </Btn>
          <Btn href="#productos" variant="ghost">
            Conocer las apps
          </Btn>
        </div>
        <div className="intro mt-9 flex flex-wrap justify-center gap-x-6 gap-y-2" style={{ animationDelay: "1.3s" }}>
          {["Banca", "Retail", "Logística"].map((t) => (
            <span key={t} className="tag flex items-center gap-2 text-faint">
              <span className="h-1 w-1 rounded-full bg-muted" />
              {t}
            </span>
          ))}
        </div>
      </HeroField>

      <Ticker />
      <Platform />
      <ProductShowcase />
      <Principles />
      <AprendeBand />
      <BuildWithUs />
    </main>
  );
}
