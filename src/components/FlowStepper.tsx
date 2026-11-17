"use client";

import { useEffect, useState } from "react";
import { Check } from "lucide-react";

/* El recorrido de un caso por Decide, paso a paso (caso A100 del video de producto). */

const STEPS = [
  { key: "Entrada", title: "Entran los datos.", text: "Un caso llega desde tu archivo, tu base o una API. Aquí: una tienda con poco inventario.", trace: "Entrada: stock 5, ventas 20" },
  { key: "Cálculo", title: "Se calculan las variables.", text: "Decide deriva lo que tu regla necesita con fórmulas que tú defines.", trace: "margen = 50 − 30 = 20" },
  { key: "Modelo", title: "El modelo pronostica.", text: "Tu modelo corre como un nodo más del flujo y entrega su predicción.", trace: "pronóstico del modelo = 24.5" },
  { key: "Reglas", title: "Tus reglas deciden.", text: "Las reglas comparan lo calculado contra tu política, en el orden que elijas.", trace: "faltante = 24.5 − 5 ≈ 20 · regla 3 se cumple → aprobar" },
  { key: "Salida", title: "Sale la decisión, con su motivo.", text: "El resultado nunca llega solo: trae el motivo y la traza completa para auditarlo.", trace: "" },
];

export default function FlowStepper() {
  const [i, setI] = useState(0);
  const [auto, setAuto] = useState(true);

  useEffect(() => {
    if (!auto) return;
    const t = setInterval(() => setI((v) => (v + 1) % STEPS.length), 3200);
    return () => clearInterval(t);
  }, [auto]);

  const pick = (k: number) => {
    setAuto(false);
    setI(k);
  };
  const s = STEPS[i];

  return (
    <div data-reveal="" className="grid gap-10 lg:grid-cols-[1fr_1.1fr] lg:gap-16">
      {/* texto del paso */}
      <div>
        <div className="flex flex-wrap gap-2">
          {STEPS.map((st, k) => (
            <button
              key={st.key}
              type="button"
              onClick={() => pick(k)}
              aria-pressed={k === i}
              className={`tag rounded-lg border px-3 py-2 font-semibold transition-colors ${
                k === i ? "accent-bg accent-border" : k < i ? "accent-border accent-text" : "border-line-2 text-faint hover:text-ink"
              }`}
            >
              {st.key}
            </button>
          ))}
        </div>
        <p className="accent-text mt-10 font-display text-8xl leading-none font-black tracking-[-0.05em]">0{i + 1}</p>
        <h3 key={s.key} className="intro mt-4 font-display text-4xl leading-tight font-bold tracking-[-0.03em] md:text-5xl" style={{ animationDuration: "0.4s" }}>
          {s.title}
        </h3>
        <p className="mt-4 max-w-md text-lg leading-relaxed text-muted">{s.text}</p>
        <div className="mt-8 h-1 max-w-xs overflow-hidden rounded-full bg-line">
          <div className="accent-fill h-full rounded-full transition-[width] duration-500" style={{ width: `${((i + 1) / STEPS.length) * 100}%` }} />
        </div>
      </div>

      {/* traza que se va llenando */}
      <div className="card -rotate-1 p-6 shadow-[0_30px_60px_-40px_rgba(0,0,0,0.5)] md:p-8">
        <p className="tag text-faint">Traza · caso A100</p>
        <ul className="mt-5 min-h-[190px] space-y-0">
          {STEPS.slice(0, 4).map((st, k) =>
            k <= i ? (
              <li key={st.key} className="intro flex items-start gap-3 border-b border-line py-3 text-[15px]" style={{ animationDuration: "0.35s" }}>
                <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#1f9d63] text-white">
                  <Check className="h-3 w-3" strokeWidth={3} />
                </span>
                <span className="text-faint">Paso {k + 1}</span>
                <span className="text-ink">{st.trace}</span>
              </li>
            ) : null,
          )}
        </ul>
        <div className={`mt-4 rounded-xl p-4 transition-opacity duration-500 ${i === 4 ? "opacity-100" : "opacity-0"}`} style={{ background: "#e3f4ea", color: "#12613c" }}>
          <span className="font-bold">APROBADO</span> · Motivo M03: faltaría inventario y hay margen.
        </div>
      </div>
    </div>
  );
}
