"use client";

import { useEffect, useState } from "react";

/* Grafo de decisión animado: datos que entran, se transforman y salen como decisión.
   Es la pieza visual principal del sitio y resume lo que hace DataSquad Decide. */

const CASES = [
  { id: "SOL-20418", ingreso: "$32,400", score: 0.82, out: "Aprobar", color: "#111111" },
  { id: "SOL-20419", ingreso: "$11,900", score: 0.41, out: "Revisar", color: "#6E6E68" },
  { id: "SOL-20420", ingreso: "$54,100", score: 0.91, out: "Aprobar", color: "#111111" },
  { id: "SOL-20421", ingreso: "$8,300", score: 0.18, out: "Rechazar", color: "#3D3D3A" },
];

const INPUTS = [
  { y: 70, label: "ingreso", c: "#111111" },
  { y: 150, label: "historial", c: "#55554F" },
  { y: 230, label: "deuda", c: "#111111" },
  { y: 310, label: "antigüedad", c: "#55554F" },
];

// Caminos de los datos
const P_IN = INPUTS.map((i) => `M128 ${i.y} C 170 ${i.y}, 180 190, 222 190`);
const P_MID = "M262 190 L 318 190";
const P_OUT_A = "M378 190 C 410 190, 410 110, 452 110";
const P_OUT_B = "M378 190 C 410 190, 410 270, 452 270";

export default function HeroGraph() {
  const [k, setK] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setK((v) => (v + 1) % CASES.length), 2600);
    return () => clearInterval(t);
  }, []);
  const c = CASES[k];

  return (
    <div className="relative w-full">
      <div className="card overflow-hidden p-0">
        {/* barra del "editor" */}
        <div className="flex items-center justify-between border-b border-line px-4 py-3">
          <div className="flex items-center gap-1.5">
            <span className="h-2.5 w-2.5 rounded-full bg-line-2" />
            <span className="h-2.5 w-2.5 rounded-full bg-line-2" />
            <span className="h-2.5 w-2.5 rounded-full bg-line-2" />
          </div>
          <p className="tag hidden text-faint sm:block">estrategia · originacion_v3</p>
          <span className="tag flex items-center gap-1.5 text-verde">
            <span className="h-1.5 w-1.5 rounded-full bg-verde" /> en vivo
          </span>
        </div>

        <div className="dots relative">
          <svg viewBox="0 0 560 380" className="block w-full" aria-label="Grafo de decisión: entradas, reglas, modelo y decisión">
            <defs>
              <linearGradient id="hg-line" x1="0" x2="1">
                <stop offset="0" stopColor="#111111" />
                <stop offset="0.5" stopColor="#3D3D3A" />
                <stop offset="1" stopColor="#111111" />
              </linearGradient>
              <filter id="hg-glow" x="-50%" y="-50%" width="200%" height="200%">
                <feGaussianBlur stdDeviation="3" result="b" />
                <feMerge>
                  <feMergeNode in="b" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>

            {/* aristas */}
            {P_IN.map((d, i) => (
              <path key={i} d={d} fill="none" stroke="#CFCFC9" strokeWidth="1.5" />
            ))}
            <path d={P_MID} fill="none" stroke="#CFCFC9" strokeWidth="1.5" />
            <path d={P_OUT_A} fill="none" stroke="#CFCFC9" strokeWidth="1.5" strokeDasharray="4 4" />
            <path d={P_OUT_B} fill="none" stroke="#CFCFC9" strokeWidth="1.5" strokeDasharray="4 4" />

            {/* partículas de datos */}
            {P_IN.map((d, i) => (
              <circle key={"p" + i} r="3.2" fill={INPUTS[i].c} filter="url(#hg-glow)">
                <animateMotion dur="2.6s" repeatCount="indefinite" path={d} begin={`${i * 0.18}s`} />
              </circle>
            ))}
            <circle r="3.5" fill="#3D3D3A" filter="url(#hg-glow)">
              <animateMotion dur="1.3s" repeatCount="indefinite" path={P_MID} begin="0.9s" />
            </circle>
            <circle r="4" fill={c.color} filter="url(#hg-glow)">
              <animateMotion dur="1.3s" repeatCount="indefinite" path={c.out === "Aprobar" ? P_OUT_A : P_OUT_B} begin="1.3s" />
            </circle>

            {/* nodos de entrada */}
            {INPUTS.map((n) => (
              <g key={n.label}>
                <rect x="20" y={n.y - 17} width="108" height="34" rx="17" fill="#FFFFFF" stroke="#CFCFC9" />
                <circle cx="38" cy={n.y} r="4" fill={n.c} />
                <text x="50" y={n.y + 4} fill="#5C5C58" fontSize="12" fontFamily="var(--font-mono)">
                  {n.label}
                </text>
              </g>
            ))}

            {/* regla (rombo) */}
            <g>
              <rect x="222" y="170" width="40" height="40" rx="6" transform="rotate(45 242 190)" fill="#FFFFFF" stroke="#111111" strokeWidth="1.5" />
              <text x="242" y="194" textAnchor="middle" fill="#111111" fontSize="11" fontFamily="var(--font-mono)">
                if
              </text>
              <text x="242" y="245" textAnchor="middle" fill="#8D8D87" fontSize="10" fontFamily="var(--font-mono)">
                reglas
              </text>
            </g>

            {/* modelo (círculo) */}
            <g>
              <circle cx="348" cy="190" r="30" fill="#FFFFFF" stroke="url(#hg-line)" strokeWidth="2" />
              <circle cx="348" cy="190" r="7" fill="#3D3D3A" opacity="0.6" className="pulse" />
              <text x="348" y="194" textAnchor="middle" fill="#0D0D0D" fontSize="11" fontWeight="600" fontFamily="var(--font-mono)">
                {c.score.toFixed(2)}
              </text>
              <text x="348" y="245" textAnchor="middle" fill="#8D8D87" fontSize="10" fontFamily="var(--font-mono)">
                modelo.onnx
              </text>
            </g>

            {/* salidas */}
            {[
              { y: 110, label: "aprobar", active: c.out === "Aprobar", col: "#111111" },
              { y: 270, label: c.out === "Rechazar" ? "rechazar" : "revisar", active: c.out !== "Aprobar", col: c.out === "Rechazar" ? "#3D3D3A" : "#6E6E68" },
            ].map((o) => (
              <g key={o.y} style={{ transition: "opacity .4s" }} opacity={o.active ? 1 : 0.45}>
                <rect x="452" y={o.y - 18} width="92" height="36" rx="10" fill={o.active ? `${o.col}22` : "#FFFFFF"} stroke={o.active ? o.col : "#CFCFC9"} />
                <text x="498" y={o.y + 4} textAnchor="middle" fill={o.active ? o.col : "#8D8D87"} fontSize="12" fontWeight="600" fontFamily="var(--font-mono)">
                  {o.label}
                </text>
              </g>
            ))}
          </svg>
        </div>

        {/* traza */}
        <div className="grid grid-cols-3 border-t border-line font-mono text-[11px]">
          <div className="border-r border-line px-4 py-3">
            <p className="text-faint">input.solicitud</p>
            <p className="mt-1 text-ink">{c.id}</p>
          </div>
          <div className="border-r border-line px-4 py-3">
            <p className="text-faint">input.ingreso</p>
            <p className="mt-1 text-ink">{c.ingreso}</p>
          </div>
          <div className="px-4 py-3">
            <p className="text-faint">output.decision</p>
            <p className="mt-1 font-semibold" style={{ color: c.color }}>
              {c.out}
            </p>
          </div>
        </div>
      </div>

    </div>
  );
}
