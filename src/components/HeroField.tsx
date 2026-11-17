"use client";

import { useEffect, useRef } from "react";
import type { ReactNode } from "react";

/*
 * Portada "Convergencia".
 * Un mapa de curvas de nivel (como la superficie de error de un modelo) rodea el nombre.
 * Cientos de puntos de datos bajan por la pendiente en espiral hasta el centro, donde está
 * "DATA SQUAD", como si el modelo los fuera absorbiendo. Alrededor orbitan tarjetas con
 * mini gráficas. El cursor empuja los puntos y las tarjetas.
 */

const CARDS: { k: string; body: ReactNode }[] = [
  { k: "score", body: <Score /> },
  { k: "histograma", body: <Histo /> },
  { k: "dispersión", body: <Scatter /> },
  { k: "árbol", body: <Tree /> },
  { k: "serie", body: <Spark /> },
  { k: "matriz", body: <Matrix /> },
  { k: "tabla", body: <Rows /> },
  { k: "curva roc", body: <Roc /> },
  { k: "pronóstico", body: <Spark dashed /> },
  { k: "regla", body: <Rule /> },
];

const clamp = (v: number, a: number, b: number) => Math.max(a, Math.min(b, v));

export default function HeroField({ children }: { children: ReactNode }) {
  const stageRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const iterRef = useRef<HTMLSpanElement>(null);
  const lossRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const stage = stageRef.current;
    const canvas = canvasRef.current;
    const content = contentRef.current;
    if (!stage || !canvas || !content) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    let W = 0,
      H = 0,
      cx = 0,
      cy = 0,
      R = 0,
      pocket = 0,
      mobile = false;
    let keep = { x: 0, y: 0, w: 0, h: 0 };
    const ASP = 0.62; // aplanado de las curvas
    const ROT = -0.18; // inclinación de la superficie

    type P = { x: number; y: number; px: number; py: number; s: number; kind: number; shade: number; life: number };
    let pts: P[] = [];

    const spawn = (p: P, anywhere = false) => {
      const a = Math.random() * Math.PI * 2;
      const r = anywhere ? R * (0.25 + Math.random() * 0.85) : R * (1.0 + Math.random() * 0.15);
      // punto sobre la elipse girada
      const ex = Math.cos(a) * r;
      const ey = Math.sin(a) * r * ASP;
      p.x = cx + ex * Math.cos(ROT) - ey * Math.sin(ROT);
      p.y = cy + ex * Math.sin(ROT) + ey * Math.cos(ROT);
      p.px = p.x;
      p.py = p.y;
      p.s = 1.2 + Math.random() * 2.4;
      p.kind = Math.floor(Math.random() * 4);
      p.shade = Math.random();
      p.life = 0;
    };

    const measure = () => {
      const r = stage.getBoundingClientRect();
      W = r.width;
      H = r.height;
      canvas.width = Math.round(W * dpr);
      canvas.height = Math.round(H * dpr);
      canvas.style.width = W + "px";
      canvas.style.height = H + "px";
      const c = content.getBoundingClientRect();
      cx = c.left - r.left + c.width / 2;
      cy = c.top - r.top + c.height * 0.32;
      R = Math.hypot(W, H) * 0.55;
      mobile = W < 700;
      pocket = Math.min(W, H) * (mobile ? 0.12 : 0.1);
      // zona del texto: unión de los elementos visibles del contenido
      let x0 = Infinity, y0 = Infinity, x1 = -Infinity, y1 = -Infinity;
      content.querySelectorAll<HTMLElement>("h1, p, a, .intro").forEach((el) => {
        const b = el.getBoundingClientRect();
        if (!b.width) return;
        x0 = Math.min(x0, b.left); y0 = Math.min(y0, b.top); x1 = Math.max(x1, b.right); y1 = Math.max(y1, b.bottom);
      });
      if (!isFinite(x0)) { x0 = c.left; y0 = c.top; x1 = c.right; y1 = c.bottom; }
      keep = { x: x0 - r.left - 18, y: y0 - r.top - 10, w: x1 - x0 + 36, h: y1 - y0 + 20 };
      const n = mobile ? 110 : Math.round(clamp((W * H) / 3800, 180, 340));
      pts = Array.from({ length: n }, () => {
        const p = { x: 0, y: 0, px: 0, py: 0, s: 2, kind: 0, shade: 0, life: 0 };
        spawn(p, true);
        return p;
      });
    };
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(stage);

    // cursor
    const ptr = { x: -9999, y: -9999 };
    const onMove = (e: PointerEvent) => {
      const r = stage.getBoundingClientRect();
      ptr.x = e.clientX - r.left;
      ptr.y = e.clientY - r.top;
    };
    const onLeave = () => {
      ptr.x = ptr.y = -9999;
    };
    stage.addEventListener("pointermove", onMove);
    stage.addEventListener("pointerleave", onLeave);

    // velocidad extra al hacer scroll
    let boost = 0;
    let lastY = window.scrollY;
    const onScroll = () => {
      boost = Math.min(3, boost + Math.abs(window.scrollY - lastY) * 0.01);
      lastY = window.scrollY;
    };
    window.addEventListener("scroll", onScroll, { passive: true });

    // órbitas de las tarjetas
    // todas giran juntas, repartidas en el círculo, para que nunca se encimen
    const orbit = CARDS.map((_, i) => ({ k: i % 2, bob: i * 1.7, o: 0 }));
    let spin = 0;

    const ball = { x: 0, y: 0, trail: [] as number[][], iter: 0, acc: 0, wait: 0.9 };
    let t = 0;
    let last = performance.now();
    let raf = 0;
    let visible = true;
    const io = new IntersectionObserver(([e]) => (visible = e.isIntersecting));
    io.observe(stage);

    // convierte coordenadas de pantalla a la "superficie" (elipse sin girar)
    const toBowl = (x: number, y: number) => {
      const dx = x - cx,
        dy = y - cy;
      const ux = dx * Math.cos(-ROT) - dy * Math.sin(-ROT);
      const uy = (dx * Math.sin(-ROT) + dy * Math.cos(-ROT)) / ASP;
      return [ux, uy];
    };
    const fromBowl = (ux: number, uy: number) => {
      const ey = uy * ASP;
      return [cx + ux * Math.cos(ROT) - ey * Math.sin(ROT), cy + ux * Math.sin(ROT) + ey * Math.cos(ROT)];
    };

    const frame = (now: number) => {
      raf = requestAnimationFrame(frame);
      const dt = Math.min(0.05, (now - last) / 1000);
      last = now;
      if (!visible) return;
      t += dt;
      boost *= 0.94;
      const intro = clamp((t - 0.4) / 1.6, 0, 1);

      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, W, H);

      /* ---- ejes con marcas, como una gráfica ---- */
      ctx.globalAlpha = 0.16 * intro;
      ctx.strokeStyle = "#0d0d0d";
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(0, cy + 0.5);
      ctx.lineTo(W, cy + 0.5);
      ctx.moveTo(cx + 0.5, 0);
      ctx.lineTo(cx + 0.5, H);
      ctx.stroke();
      ctx.beginPath();
      for (let x = cx % 40; x < W; x += 40) {
        ctx.moveTo(x, cy - 3);
        ctx.lineTo(x, cy + 3);
      }
      for (let y = cy % 40; y < H; y += 40) {
        ctx.moveTo(cx - 3, y);
        ctx.lineTo(cx + 3, y);
      }
      ctx.stroke();
      ctx.globalAlpha = 0.45 * intro;
      ctx.fillStyle = "#5c5c58";
      ctx.font = "11px 'JetBrains Mono Variable', monospace";
      ctx.fillText("x₁", W - 28, cy - 10);
      ctx.fillText("x₂", cx + 10, 92);

      /* ---- curvas de nivel ---- */
      const levels = mobile ? 8 : 12;
      for (let i = 1; i <= levels; i++) {
        const base = (i / levels) * R;
        ctx.globalAlpha = (0.08 + (i % 4 === 0 ? 0.08 : 0)) * intro;
        ctx.beginPath();
        const N = 140;
        for (let k = 0; k <= N; k++) {
          const ph = (k / N) * Math.PI * 2;
          const wob = 1 + 0.05 * Math.sin(3 * ph + t * 0.25 + i) + 0.03 * Math.sin(5 * ph - t * 0.18 + i * 2);
          const [x, y] = fromBowl(Math.cos(ph) * base * wob, Math.sin(ph) * base * wob);
          k ? ctx.lineTo(x, y) : ctx.moveTo(x, y);
        }
        ctx.stroke();
        // pulso que recorre algunas curvas
        if (i % 3 === 1) {
          ctx.globalAlpha = 0.55 * intro;
          ctx.lineWidth = 1.5;
          ctx.beginPath();
          const start = t * 0.35 * (i % 2 ? 1 : -1) + i;
          for (let k = 0; k <= 24; k++) {
            const ph = start + (k / 24) * 0.45;
            const wob = 1 + 0.05 * Math.sin(3 * ph + t * 0.25 + i) + 0.03 * Math.sin(5 * ph - t * 0.18 + i * 2);
            const [x, y] = fromBowl(Math.cos(ph) * base * wob, Math.sin(ph) * base * wob);
            k ? ctx.lineTo(x, y) : ctx.moveTo(x, y);
          }
          ctx.stroke();
          ctx.lineWidth = 1;
        }
      }

      /* ---- círculo punteado de "umbral" con marcas ---- */
      const rc = Math.min(W, H) * (mobile ? 0.42 : 0.36);
      ctx.globalAlpha = 0.28 * intro;
      ctx.setLineDash([3, 6]);
      ctx.beginPath();
      ctx.arc(cx, cy, rc, 0, Math.PI * 2);
      ctx.stroke();
      ctx.setLineDash([]);
      ctx.beginPath();
      for (let k = 0; k < 72; k++) {
        const a = (k / 72) * Math.PI * 2 + t * 0.02;
        const l = k % 6 === 0 ? 9 : 4;
        ctx.moveTo(cx + Math.cos(a) * (rc + 4), cy + Math.sin(a) * (rc + 4));
        ctx.lineTo(cx + Math.cos(a) * (rc + 4 + l), cy + Math.sin(a) * (rc + 4 + l));
      }
      ctx.stroke();

      /* ---- puntos de datos bajando por la pendiente ---- */
      const spd = reduce ? 0 : 1 + boost;
      for (const p of pts) {
        const [ux, uy] = toBowl(p.x, p.y);
        const d = Math.hypot(ux, uy) || 1;
        // gradiente hacia el centro + giro (espiral)
        let vx = -ux / d,
          vy = -uy / d;
        const sw = 0.9;
        const tx = -vy * sw,
          ty = vx * sw;
        vx += tx;
        vy += ty;
        const vlen = Math.hypot(vx, vy);
        const speed = (22 + 70 * (1 - clamp(d / R, 0, 1))) * spd;
        let nux = ux + (vx / vlen) * speed * dt;
        let nuy = uy + (vy / vlen) * speed * dt;
        let [nx, ny] = fromBowl(nux, nuy);
        // el cursor empuja
        const mx = nx - ptr.x,
          my = ny - ptr.y;
        const md = Math.hypot(mx, my);
        if (md < 130 && md > 0.1) {
          const f = (1 - md / 130) * 3.2;
          nx += (mx / md) * f;
          ny += (my / md) * f;
        }
        p.px = p.x;
        p.py = p.y;
        p.x = nx;
        p.y = ny;
        p.life += dt;
        if (d < pocket) spawn(p);

        // dibujar
        const fadeIn = clamp(p.life / 0.8, 0, 1);
        const fadeCore = clamp((d - pocket) / (pocket * 1.6), 0, 1);
        const a = intro * fadeIn * fadeCore * (0.35 + p.shade * 0.55);
        if (a <= 0.01) continue;
        const col = p.shade > 0.72 ? "#0d0d0d" : p.shade > 0.35 ? "#5c5c58" : "#9a9a94";
        ctx.globalAlpha = a * 0.35;
        ctx.strokeStyle = col;
        ctx.beginPath();
        ctx.moveTo(p.px - (p.x - p.px) * 6, p.py - (p.y - p.py) * 6);
        ctx.lineTo(p.x, p.y);
        ctx.stroke();
        ctx.globalAlpha = a;
        ctx.fillStyle = col;
        ctx.strokeStyle = col;
        const s = p.s;
        if (p.kind === 0) {
          ctx.beginPath();
          ctx.arc(p.x, p.y, s, 0, Math.PI * 2);
          ctx.fill();
        } else if (p.kind === 1) {
          ctx.fillRect(p.x - s, p.y - s, s * 2, s * 2);
        } else if (p.kind === 2) {
          ctx.beginPath();
          ctx.moveTo(p.x - s, p.y - s);
          ctx.lineTo(p.x + s, p.y + s);
          ctx.moveTo(p.x + s, p.y - s);
          ctx.lineTo(p.x - s, p.y + s);
          ctx.stroke();
        } else {
          ctx.beginPath();
          ctx.arc(p.x, p.y, s + 0.6, 0, Math.PI * 2);
          ctx.stroke();
        }
      }
      ctx.globalAlpha = 1;
      ctx.strokeStyle = "#0d0d0d";

      /* ---- descenso de gradiente: una bola negra que baja hasta el mínimo ---- */
      {
        if (ball.wait > 0) {
          ball.wait -= dt;
          if (ball.wait <= 0) {
            const a = Math.random() * Math.PI * 2;
            const [bx, by] = fromBowl(Math.cos(a) * R * 0.6, Math.sin(a) * R * 0.6);
            ball.x = bx;
            ball.y = by;
            ball.trail = [];
            ball.iter = 0;
          }
        } else {
          const [ux, uy] = toBowl(ball.x, ball.y);
          const d = Math.hypot(ux, uy) || 1;
          if (!reduce) {
            const wig = 0.55 + 0.3 * Math.sin(t * 5.3);
            const vx = -ux / d + (uy / d) * wig;
            const vy = -uy / d - (ux / d) * wig;
            const sp = Math.max(46, d * 0.5) * (1 + boost);
            const [nx, ny] = fromBowl(ux + vx * sp * dt, uy + vy * sp * dt);
            ball.x = nx;
            ball.y = ny;
            ball.iter += dt * 42;
            ball.acc += dt;
            if (ball.acc > 0.09) {
              ball.acc = 0;
              ball.trail.push([nx, ny]);
              if (ball.trail.length > 70) ball.trail.shift();
            }
          }
          const core = clamp((d - pocket * 1.5) / (pocket * 1.2), 0, 1);
          const al = intro * core;
          if (ball.trail.length > 1) {
            ctx.lineWidth = 1.6;
            ctx.globalAlpha = 0.85 * al;
            ctx.beginPath();
            ball.trail.forEach(([x, y], k) => (k ? ctx.lineTo(x, y) : ctx.moveTo(x, y)));
            ctx.lineTo(ball.x, ball.y);
            ctx.stroke();
            ctx.fillStyle = "#0d0d0d";
            ball.trail.forEach(([x, y], k) => {
              if (k % 4) return;
              ctx.beginPath();
              ctx.arc(x, y, 2.2, 0, Math.PI * 2);
              ctx.fill();
            });
            ctx.lineWidth = 1;
          }
          ctx.globalAlpha = al;
          ctx.fillStyle = "#0d0d0d";
          ctx.beginPath();
          ctx.arc(ball.x, ball.y, 6, 0, Math.PI * 2);
          ctx.fill();
          ctx.globalAlpha = 0.35 * al;
          ctx.beginPath();
          ctx.arc(ball.x, ball.y, 11 + Math.sin(t * 4) * 2, 0, Math.PI * 2);
          ctx.stroke();
          ctx.globalAlpha = 1;
          if (iterRef.current) iterRef.current.textContent = String(Math.floor(ball.iter)).padStart(4, "0");
          if (lossRef.current) lossRef.current.textContent = (Math.pow(d / R, 2) * 2.4).toFixed(4);
          const inText = ball.x > keep.x && ball.x < keep.x + keep.w && ball.y > keep.y + 30 && ball.y < keep.y + keep.h * 0.55;
          if (d < pocket * 1.5 || inText) ball.wait = 1.4;
        }
      }

      /* ---- tarjetas en órbita ---- */
      const cardIntro = clamp((t - 1.0) / 1.4, 0, 1);
      if (!reduce) spin += dt * 0.045 * (1 + boost * 0.6);
      orbit.forEach((o, i) => {
        const el = cardRefs.current[i];
        if (!el) return;
        const count = mobile ? 4 : CARDS.length;
        if (i >= count) {
          el.style.opacity = "0";
          return;
        }
        const a = spin + (i / count) * Math.PI * 2;
        const k = mobile ? 0 : o.k;
        const ex = mobile ? W * 0.5 : W * (0.36 + 0.1 * k);
        const ey = mobile ? H * 0.43 : H * (0.33 + 0.1 * k);
        const ccy = mobile ? H * 0.5 : cy;
        let x = cx + Math.cos(a) * ex;
        let y = ccy + Math.sin(a) * ey + Math.sin(t * 0.6 + o.bob) * 6;
        const mx = x - ptr.x,
          my = y - ptr.y;
        const md = Math.hypot(mx, my);
        if (md < 220) {
          x += (mx / md) * (1 - md / 220) * 18;
          y += (my / md) * (1 - md / 220) * 18;
        }
        const w = el.offsetWidth,
          h = el.offsetHeight;
        // si tapa el texto, se desvanece
        const overlap =
          (x + w / 2 > keep.x && x - w / 2 < keep.x + keep.w && y + h / 2 > keep.y && y - h / 2 < keep.y + keep.h) ||
          y - h / 2 < 84 ||
          y + h / 2 > H - 52;
        const target = overlap ? 0.0 : 1;
        o.o += (target - o.o) * Math.min(1, dt * 4);
        // reveal escalonado
        const reveal = clamp(cardIntro * CARDS.length - i * 0.6, 0, 1);
        el.style.opacity = String(o.o * reveal);
        el.style.transform = `translate(${x - w / 2}px, ${y - h / 2}px) rotate(${Math.sin(a) * 4}deg) scale(${0.92 + reveal * 0.08})`;
      });
    };
    raf = requestAnimationFrame(frame);

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      io.disconnect();
      stage.removeEventListener("pointermove", onMove);
      stage.removeEventListener("pointerleave", onLeave);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  return (
    <section ref={stageRef} className="relative isolate flex min-h-[100svh] items-center overflow-hidden pt-28 pb-16">
      <canvas ref={canvasRef} className="absolute inset-0 -z-10" aria-hidden="true" />
      <div className="pointer-events-none absolute inset-0 -z-10" aria-hidden="true">
        {CARDS.map((c, i) => (
          <div
            key={c.k}
            ref={(el) => {
              cardRefs.current[i] = el;
            }}
            className="absolute top-0 left-0 w-[112px] rounded-xl border border-line bg-white/90 p-2.5 opacity-0 shadow-[0_10px_30px_-18px_rgba(0,0,0,0.45)] backdrop-blur-sm md:w-[150px]"
          >
            <p className="mb-1.5 font-mono text-[9px] tracking-[0.1em] text-faint uppercase">{c.k}</p>
            {c.body}
          </div>
        ))}
      </div>
      <div ref={contentRef} className="relative mx-auto w-full max-w-5xl px-5 text-center">
        {/* velo para que el texto se lea sobre la animación */}
        <div
          className="pointer-events-none absolute -inset-x-10 -inset-y-12 -z-10"
          style={{
            background: "radial-gradient(closest-side, rgba(244,244,242,0.96) 55%, rgba(244,244,242,0) 100%)",
          }}
        />
        {children}
      </div>
      {/* lectura en vivo del descenso */}
      <div className="intro pointer-events-none absolute inset-x-0 bottom-5 mx-auto flex max-w-7xl items-center justify-between px-5 font-mono text-[11px] text-muted sm:px-8" style={{ animationDelay: "1.6s" }}>
        <span className="rounded-full border border-line bg-white/80 px-3 py-1.5 backdrop-blur-sm">
          iter <span ref={iterRef} className="text-ink tabular-nums">0000</span>
          <span className="mx-2 text-line-2">|</span>
          pérdida <span ref={lossRef} className="text-ink tabular-nums">0.0000</span>
        </span>
        <span className="hidden items-center gap-2 sm:flex">
          desliza <span className="inline-block animate-bounce">↓</span>
        </span>
      </div>
    </section>
  );
}

/* ---------- mini gráficas de las tarjetas (grises) ---------- */
function Score() {
  return (
    <div className="flex items-end justify-between">
      <span className="font-display text-2xl font-bold">0.82</span>
      <span className="rounded bg-ink px-1.5 py-0.5 font-mono text-[9px] text-white">aprobar</span>
    </div>
  );
}
function Histo() {
  const b = [3, 6, 10, 14, 11, 8, 5, 3, 2];
  return (
    <div className="flex h-10 items-end gap-[3px]">
      {b.map((v, i) => (
        <span key={i} className={`flex-1 rounded-[2px] ${i === 3 ? "bg-ink" : "bg-line-2"}`} style={{ height: `${v * 7}%` }} />
      ))}
    </div>
  );
}
function Scatter() {
  const p = [[8, 30], [16, 26], [22, 22], [30, 24], [36, 16], [44, 14], [52, 10], [60, 8], [26, 30], [48, 20]];
  return (
    <svg viewBox="0 0 66 36" className="h-10 w-full">
      <line x1="2" y1="34" x2="64" y2="4" stroke="#0d0d0d" strokeWidth="1" />
      {p.map(([x, y], i) => (
        <circle key={i} cx={x} cy={y} r="1.6" fill={i % 3 ? "#8d8d87" : "#0d0d0d"} />
      ))}
    </svg>
  );
}
function Tree() {
  return (
    <svg viewBox="0 0 66 36" className="h-10 w-full" fill="none" stroke="#8d8d87">
      <path d="M33 6 L16 18 M33 6 L50 18 M16 18 L8 30 M16 18 L24 30 M50 18 L58 30" />
      <circle cx="33" cy="6" r="3" fill="#0d0d0d" stroke="none" />
      {[[16, 18], [50, 18], [8, 30], [24, 30], [58, 30]].map(([x, y]) => (
        <circle key={x + "" + y} cx={x} cy={y} r="2.6" fill="#fff" />
      ))}
    </svg>
  );
}
function Spark({ dashed = false }: { dashed?: boolean }) {
  return (
    <svg viewBox="0 0 66 30" className="h-9 w-full" fill="none">
      <path d="M2 24 L10 20 L18 22 L26 14 L34 16 L42 9" stroke="#0d0d0d" strokeWidth="1.4" />
      <path d="M42 9 L50 11 L58 6 L64 4" stroke="#0d0d0d" strokeWidth="1.4" strokeDasharray={dashed ? "2 3" : undefined} opacity={dashed ? 1 : 0.4} />
    </svg>
  );
}
function Matrix() {
  const v = [0.9, 0.15, 0.2, 0.85];
  return (
    <div className="grid grid-cols-2 gap-[3px]">
      {v.map((a, i) => (
        <span key={i} className="flex h-5 items-center justify-center rounded-[3px] font-mono text-[8px]" style={{ background: `rgba(13,13,13,${a})`, color: a > 0.5 ? "#fff" : "#0d0d0d" }}>
          {Math.round(a * 100)}
        </span>
      ))}
    </div>
  );
}
function Rows() {
  return (
    <div className="space-y-1 font-mono text-[8px] text-muted">
      {[["id", "monto", "ok"], ["2041", "32,400", "✓"], ["2042", "11,900", "·"]].map((r, i) => (
        <div key={i} className={`flex justify-between ${i === 0 ? "text-faint" : ""}`}>
          {r.map((c) => (
            <span key={c}>{c}</span>
          ))}
        </div>
      ))}
    </div>
  );
}
function Roc() {
  return (
    <svg viewBox="0 0 66 36" className="h-10 w-full" fill="none">
      <path d="M2 34 L64 2" stroke="#c9c9c3" strokeDasharray="2 2" />
      <path d="M2 34 C 6 10, 20 4, 64 2" stroke="#0d0d0d" strokeWidth="1.4" />
    </svg>
  );
}
function Rule() {
  return (
    <p className="font-mono text-[9px] leading-snug text-ink">
      if <span className="text-muted">ingreso</span> &gt; 12k
      <br />
      and <span className="text-muted">score</span> ≥ 0.7
      <br />→ aprobar
    </p>
  );
}
