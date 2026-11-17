"use client";

import { Children, createContext, useCallback, useContext, useEffect, useRef, useState, type ReactNode } from "react";
import { ChevronLeft, ChevronRight, Pause, Play } from "lucide-react";
import { SUITE } from "@/lib/data";
import { AppIcon } from "./Suite";

/*
 * Carrusel de productos del inicio.
 * Un solo "producto activo" gobierna varias secciones a la vez: cambia solo cada cierto tiempo
 * y también con las pestañas, las flechas, el teclado o deslizando con el dedo.
 * Se pausa mientras el cursor está encima, para no quitarle la pantalla a quien está leyendo.
 */

type Ctx = {
  i: number;
  dir: 1 | -1;
  progress: number;
  playing: boolean;
  go: (n: number) => void;
  step: (d: 1 | -1) => void;
  toggle: () => void;
  hold: (on: boolean) => void;
  seen: (on: boolean) => void;
};
const ShowCtx = createContext<Ctx | null>(null);
const useShow = () => {
  const c = useContext(ShowCtx);
  if (!c) throw new Error("Showcase fuera de ShowcaseProvider");
  return c;
};

export function ShowcaseProvider({ children, ms = 9000 }: { children: ReactNode; ms?: number }) {
  const count = SUITE.length;
  const [i, setI] = useState(0);
  const [dir, setDir] = useState<1 | -1>(1);
  const [progress, setProgress] = useState(0);
  const [playing, setPlaying] = useState(true);
  const holds = useRef(0);
  const visible = useRef(0);
  const p = useRef(0);

  const go = useCallback(
    (n: number) => {
      setI((cur) => {
        const next = ((n % count) + count) % count;
        setDir(next >= cur ? 1 : -1);
        return next;
      });
      p.current = 0;
      setProgress(0);
    },
    [count],
  );
  const step = useCallback(
    (d: 1 | -1) => {
      setDir(d);
      setI((cur) => (cur + d + count) % count);
      p.current = 0;
      setProgress(0);
    },
    [count],
  );

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!playing || reduce) return;
    const t = setInterval(() => {
      if (holds.current > 0 || visible.current <= 0 || document.hidden) return;
      p.current += 100 / ms;
      if (p.current >= 1) {
        p.current = 0;
        setDir(1);
        setI((cur) => (cur + 1) % count);
      }
      setProgress(p.current);
    }, 100);
    return () => clearInterval(t);
  }, [playing, ms, count]);

  const value: Ctx = {
    i,
    dir,
    progress,
    playing,
    go,
    step,
    toggle: () => setPlaying((v) => !v),
    hold: (on) => (holds.current = Math.max(0, holds.current + (on ? 1 : -1))),
    seen: (on) => (visible.current = Math.max(0, visible.current + (on ? 1 : -1))),
  };
  return <ShowCtx.Provider value={value}>{children}</ShowCtx.Provider>;
}

/** Barra de pestañas con las apps, el avance del tiempo y las flechas. */
function Tabs() {
  const { i, progress, playing, go, step, toggle } = useShow();
  return (
    <div className="flex items-center gap-3">
      <div className="no-scrollbar -mx-1 flex min-w-0 flex-1 gap-2 overflow-x-auto px-1 py-1" role="tablist" aria-label="Apps de la suite">
        {SUITE.map((a, k) => {
          const on = k === i;
          return (
            <button
              key={a.id}
              type="button"
              role="tab"
              aria-selected={on}
              onClick={() => go(k)}
              className={`relative flex shrink-0 items-center gap-2.5 overflow-hidden rounded-full border py-1.5 pr-4 pl-1.5 text-sm font-semibold transition-colors ${
                on ? "border-ink bg-panel text-ink" : "border-line-2 text-muted hover:border-ink hover:text-ink"
              }`}
            >
              <AppIcon app={a} size={28} />
              <span className="whitespace-nowrap">{a.name}</span>
              {on && <span className="absolute bottom-0 left-0 h-[3px]" style={{ width: `${progress * 100}%`, background: a.color }} />}
            </button>
          );
        })}
      </div>
      <div className="flex shrink-0 items-center gap-1.5">
        <button type="button" onClick={toggle} aria-label={playing ? "Pausar el cambio automático" : "Reanudar el cambio automático"} className="hidden h-10 w-10 items-center justify-center rounded-full border border-line-2 text-muted hover:border-ink hover:text-ink sm:flex">
          {playing ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
        </button>
        <button type="button" onClick={() => step(-1)} aria-label="App anterior" className="flex h-10 w-10 items-center justify-center rounded-full border border-line-2 hover:border-ink">
          <ChevronLeft className="h-5 w-5" />
        </button>
        <button type="button" onClick={() => step(1)} aria-label="App siguiente" className="flex h-10 w-10 items-center justify-center rounded-full border border-line-2 hover:border-ink">
          <ChevronRight className="h-5 w-5" />
        </button>
      </div>
    </div>
  );
}

/** Una sección del carrusel: recibe un hijo por app, en el orden de la suite. */
export function ShowcaseArea({ children, className = "" }: { children: ReactNode; className?: string }) {
  const { i, dir, step, hold, seen } = useShow();
  const ref = useRef<HTMLDivElement>(null);
  const start = useRef<{ x: number; y: number } | null>(null);
  const slides = Children.toArray(children);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let inView = false;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting !== inView) {
          inView = e.isIntersecting;
          seen(inView);
        }
      },
      { threshold: 0.15 },
    );
    io.observe(el);
    return () => {
      io.disconnect();
      if (inView) seen(false);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div
      ref={ref}
      className={className}
      onPointerEnter={(e) => e.pointerType === "mouse" && hold(true)}
      onPointerLeave={(e) => e.pointerType === "mouse" && hold(false)}
      onTouchStart={(e) => (start.current = { x: e.touches[0].clientX, y: e.touches[0].clientY })}
      onTouchEnd={(e) => {
        const s = start.current;
        start.current = null;
        if (!s) return;
        const t = e.target as HTMLElement;
        if (t.closest("input, [role=tablist]")) return; // no robarle el gesto al simulador ni a las pestañas
        const dx = e.changedTouches[0].clientX - s.x;
        const dy = e.changedTouches[0].clientY - s.y;
        if (Math.abs(dx) > 60 && Math.abs(dx) > Math.abs(dy) * 1.5) step(dx < 0 ? 1 : -1);
      }}
      onKeyDown={(e) => {
        if ((e.target as HTMLElement).tagName === "INPUT") return;
        if (e.key === "ArrowRight") step(1);
        if (e.key === "ArrowLeft") step(-1);
      }}
    >
      <Tabs />
      <div className="show-stack mt-12" style={{ ["--dx" as string]: `${dir * 48}px` }}>
        {slides.map((s, k) => {
          const a = SUITE[k];
          const on = k === i;
          return (
            <div
              key={a.id}
              data-on={on}
              aria-hidden={!on}
              inert={!on}
              className="themed"
              style={{ ["--accent" as string]: a.color, ["--accent-ink" as string]: a.ink }}
            >
              {s}
            </div>
          );
        })}
      </div>
    </div>
  );
}
