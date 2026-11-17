"use client";

import { useState } from "react";

/* Simulador en vivo: mueve las variables y mira cómo el motor decide.
   Es un ejemplo ilustrativo con una fórmula sencilla, no un modelo real. */

const money = (n: number) => "$" + Math.round(n).toLocaleString("es-MX");

function decide(ingreso: number, deuda: number, historial: number) {
  const capacidad = Math.max(0, (ingreso - deuda) / ingreso);
  const z = -2.2 + 3.4 * capacidad + 0.16 * historial + 0.000012 * ingreso;
  const score = 1 / (1 + Math.exp(-z));
  const politica = ingreso >= 8000 && capacidad >= 0.3;
  const decision = !politica ? "Rechazar" : score >= 0.7 ? "Aprobar" : score >= 0.45 ? "Revisar" : "Rechazar";
  const monto = decision === "Aprobar" ? Math.round(((ingreso - deuda) * 6 * score) / 500) * 500 : 0;
  return { capacidad, score, politica, decision, monto };
}

function Slider({
  label,
  value,
  min,
  max,
  step,
  show,
  onChange,
}: {
  label: string;
  value: number;
  min: number;
  max: number;
  step: number;
  show: string;
  onChange: (v: number) => void;
}) {
  const pct = ((value - min) / (max - min)) * 100;
  return (
    <label className="block">
      <span className="flex items-baseline justify-between">
        <span className="font-mono text-xs text-muted">{label}</span>
        <span className="font-display text-xl font-semibold tabular-nums">{show}</span>
      </span>
      <input
        type="range"
        className="ds-range mt-3 w-full"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        style={{ ["--pct" as string]: `${pct}%` }}
      />
    </label>
  );
}

export default function Simulator() {
  const [ingreso, setIngreso] = useState(32000);
  const [deuda, setDeuda] = useState(9000);
  const [historial, setHistorial] = useState(4);
  const r = decide(ingreso, deuda, historial);

  const trace: [string, string, boolean][] = [
    ["input.ingreso_mensual", money(ingreso), false],
    ["input.deuda_mensual", money(deuda), false],
    ["input.historial_anios", String(historial), false],
    ["derivada.capacidad_pago", r.capacidad.toFixed(3), false],
    ["regla.politica_minima", r.politica ? "cumple" : "no cumple", !r.politica],
    ["modelo.score", r.score.toFixed(2), false],
    ["output.decision", r.decision.toUpperCase(), true],
    ["output.monto_sugerido", r.monto ? money(r.monto) : "—", false],
  ];

  return (
    <div data-reveal="" className="grid grid-cols-1 overflow-hidden rounded-3xl border border-line bg-panel lg:grid-cols-[1fr_1.15fr]">
      {/* controles */}
      <div className="flex min-w-0 flex-col gap-8 border-b border-line p-6 md:p-10 lg:border-r lg:border-b-0">
        <div className="flex items-center justify-between">
          <p className="tag text-muted">Entradas</p>
          <p className="tag text-faint">mueve los controles</p>
        </div>
        <Slider label="input.ingreso_mensual" value={ingreso} min={5000} max={80000} step={500} show={money(ingreso)} onChange={setIngreso} />
        <Slider label="input.deuda_mensual" value={deuda} min={0} max={40000} step={500} show={money(deuda)} onChange={setDeuda} />
        <Slider label="input.historial_anios" value={historial} min={0} max={15} step={1} show={`${historial} años`} onChange={setHistorial} />

        {/* score con umbrales */}
        <div className="mt-auto">
          <div className="flex items-baseline justify-between">
            <span className="font-mono text-xs text-muted">modelo.score</span>
            <span className="font-display text-xl font-semibold tabular-nums">{r.score.toFixed(2)}</span>
          </div>
          <div className="relative mt-3 h-2 rounded-full bg-line">
            <div className="accent-fill h-full rounded-full transition-[width] duration-200" style={{ width: `${r.score * 100}%` }} />
            <span className="absolute -top-1 h-4 w-px bg-muted" style={{ left: "45%" }} />
            <span className="absolute -top-1 h-4 w-px bg-muted" style={{ left: "70%" }} />
          </div>
          <div className="relative mt-2 h-4 font-mono text-[10px] text-faint">
            <span className="absolute left-0">rechazar</span>
            <span className="absolute" style={{ left: "45%" }}>
              revisar
            </span>
            <span className="absolute" style={{ left: "70%" }}>
              aprobar
            </span>
          </div>
        </div>
      </div>

      {/* resultado + traza */}
      <div className="flex min-w-0 flex-col">
        <div className="flex flex-col gap-5 border-b border-line p-6 sm:flex-row sm:items-end sm:justify-between md:p-10">
          <div>
            <p className="tag text-muted">output.decision</p>
            <p key={r.decision} className="intro mt-2 font-display text-5xl leading-none font-black sm:text-6xl tracking-[-0.05em] uppercase md:text-7xl" style={{ animationDuration: "0.35s" }}>
              {r.decision}
            </p>
          </div>
          <div className="sm:text-right">
            <p className="tag text-muted">monto sugerido</p>
            <p className="mt-2 font-display text-2xl font-semibold tabular-nums">{r.monto ? money(r.monto) : "—"}</p>
          </div>
        </div>
        <div className="divide-y divide-line font-mono text-[13px]">
          {trace.map(([k, v, strong]) => (
            <div key={k} className="flex items-center justify-between gap-4 px-6 py-2.5 md:px-10">
              <span className="min-w-0 truncate text-muted">{k}</span>
              <span className={`shrink-0 tabular-nums ${strong ? "accent-chip rounded px-2 py-0.5 font-semibold" : "text-ink"}`}>{v}</span>
            </div>
          ))}
        </div>
        <p className="mt-auto px-6 py-4 text-xs text-faint md:px-10">Ejemplo ilustrativo con una fórmula sencilla; no es un modelo de crédito real.</p>
      </div>
    </div>
  );
}
