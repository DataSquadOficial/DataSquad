import Link from "next/link";
import { ArrowRight, Download } from "lucide-react";
import { DOWNLOAD, SUITE, type AppId, type SuiteApp } from "@/lib/data";

/* ---------- Icono de cada app (mismos dibujos que el lanzador) ---------- */
function Glyph({ id }: { id: AppId }) {
  const w = "#fff";
  const soft = "rgba(255,255,255,.66)";
  const line = { fill: "none", strokeLinecap: "round" as const, strokeLinejoin: "round" as const };
  switch (id) {
    case "decide":
      return (
        <>
          <path d="M20 16 H30 C45 16 52 24 52 32 C52 40 45 48 30 48 H20 Z" stroke="#faf3ef" strokeWidth="6" fill="none" strokeLinejoin="round" />
          <circle cx="32" cy="23" r="3" fill="#39d98a" />
          <circle cx="32" cy="32" r="3" fill="#ffd166" />
          <circle cx="32" cy="41" r="3" fill="#ff7a6b" />
        </>
      );
    case "quantix":
      return (
        <>
          <path d="M14 14v36h36" stroke={w} strokeWidth="4.5" {...line} />
          <path d="M19 43L47 21" stroke={soft} strokeWidth="3.5" {...line} />
          {[[24, 34], [31, 37], [37, 24], [44, 29]].map(([x, y]) => (
            <circle key={x} cx={x} cy={y} r="3" fill={w} />
          ))}
        </>
      );
    case "bi":
      return (
        <>
          {[[14, 34], [28, 24], [42, 14]].map(([x, t]) => (
            <rect key={x} x={x} y={t} width="8" height={50 - t} rx="2" fill={w} />
          ))}
        </>
      );
    case "lab":
      return (
        <>
          <path d="M25 14h14M28 14v14L17 47l3 3h24l3-3-11-19V14" stroke={w} strokeWidth="4.5" {...line} />
          <path d="M22 41h20" stroke={soft} strokeWidth="3.5" {...line} />
        </>
      );
    case "procurement":
      return (
        <>
          <path d="M11 16h7l6 24h22l5-16H21" stroke={w} strokeWidth="4.5" {...line} />
          <circle cx="27" cy="48" r="3.6" fill={w} />
          <circle cx="43" cy="48" r="3.6" fill={w} />
        </>
      );
    case "explorer":
      return (
        <>
          <path d="M20 20l26 4-16 22z" stroke={w} strokeWidth="3.5" {...line} />
          <circle cx="20" cy="20" r="6.5" fill={w} />
          <circle cx="46" cy="24" r="6.5" fill={soft} />
          <circle cx="30" cy="46" r="6.5" fill={w} />
        </>
      );
  }
}

export function AppIcon({ app, size = 64, className = "" }: { app: SuiteApp; size?: number; className?: string }) {
  return (
    <span
      className={`inline-flex shrink-0 items-center justify-center ${className}`}
      style={{
        width: size,
        height: size,
        borderRadius: size * 0.22,
        background: app.id === "decide" ? app.color : `linear-gradient(160deg, color-mix(in srgb, ${app.color} 82%, #fff) 0%, ${app.color} 55%, color-mix(in srgb, ${app.color} 82%, #000) 100%)`,
        boxShadow: `0 ${size * 0.14}px ${size * 0.36}px -${size * 0.16}px ${app.color}`,
      }}
    >
      <svg viewBox="0 0 64 64" width={app.id === "decide" ? size : size * 0.86} height={app.id === "decide" ? size : size * 0.86} aria-hidden="true">
        <Glyph id={app.id} />
      </svg>
    </span>
  );
}

/* ---------- Ilustración de la ventana de cada app ---------- */
function Art({ id, c }: { id: AppId; c: string }) {
  const g = "#3a3a3f";
  switch (id) {
    case "decide":
      return (
        <>
          {["ENTRADA", "CÁLCULO", "MODELO", "REGLAS", "SALIDA"].map((t, i) => (
            <g key={t}>
              {i > 0 && <path d={`M${34 + i * 56 - 14} 62h14`} stroke={g} strokeWidth="2" />}
              <rect x={34 + i * 56} y="50" width="42" height="24" rx="6" fill={i < 4 ? c : "#2b2b30"} opacity={1 - i * 0.12} />
              <text x={55 + i * 56} y="65" textAnchor="middle" fontSize="6.4" fontWeight="700" fill="#fff" fontFamily="var(--font-mono)">
                {t}
              </text>
            </g>
          ))}
          {[0, 1, 2, 3].map((i) => (
            <g key={i}>
              <circle cx="40" cy={98 + i * 15} r="3.4" fill={c} />
              <rect x="50" y={95 + i * 15} width={150 - i * 22} height="6" rx="3" fill={g} />
            </g>
          ))}
          <rect x="34" y="156" width="252" height="16" rx="5" fill={c} opacity=".28" />
          <rect x="42" y="161" width="120" height="6" rx="3" fill={c} />
        </>
      );
    case "quantix":
      return (
        <>
          <path d="M44 44v120h240" stroke={g} strokeWidth="2" fill="none" />
          <path d="M52 150L276 62" stroke={c} strokeWidth="3" />
          {[[70, 136], [96, 142], [118, 118], [140, 126], [166, 100], [190, 110], [214, 82], [240, 90], [262, 66]].map(([x, y]) => (
            <circle key={x} cx={x} cy={y} r="4.5" fill="#fff" opacity=".85" />
          ))}
          <text x="60" y="58" fontSize="9" fill="#9a9aa2" fontFamily="var(--font-mono)">
            y = β₀ + β₁x + ε
          </text>
        </>
      );
    case "bi":
      return (
        <>
          {[52, 44, 70, 60, 92, 82, 112].map((h, i) => (
            <rect key={i} x={40 + i * 24} y={164 - h} width="15" height={h} rx="3" fill={i > 3 ? c : g} />
          ))}
          <circle cx="250" cy="84" r="30" fill="none" stroke={g} strokeWidth="13" />
          <circle cx="250" cy="84" r="30" fill="none" stroke={c} strokeWidth="13" strokeDasharray="118 189" transform="rotate(-90 250 84)" />
          <rect x="216" y="134" width="68" height="8" rx="4" fill={g} />
          <rect x="216" y="150" width="44" height="8" rx="4" fill={g} />
        </>
      );
    case "lab":
      return (
        <>
          {[70, 110, 150].flatMap((a) => [56, 92, 128, 164].map((b) => <line key={a + "-" + b} x1="80" y1={a} x2="150" y2={b} stroke={g} strokeWidth="1.2" />))}
          {[56, 92, 128, 164].flatMap((a) => [90, 130].map((b) => <line key={a + "_" + b} x1="150" y1={a} x2="216" y2={b} stroke={g} strokeWidth="1.2" />))}
          {[70, 110, 150].map((y) => (
            <circle key={y} cx="80" cy={y} r="8" fill="#1c1c20" stroke="#fff" strokeWidth="2" />
          ))}
          {[56, 92, 128, 164].map((y) => (
            <circle key={y} cx="150" cy={y} r="8" fill={c} />
          ))}
          {[90, 130].map((y) => (
            <circle key={y} cx="216" cy={y} r="8" fill="#1c1c20" stroke={c} strokeWidth="2.5" />
          ))}
          <path d="M240 60c14 40 28 52 46 56" stroke={c} strokeWidth="2.5" fill="none" />
        </>
      );
    case "procurement":
      return (
        <>
          {[0, 1, 2, 3].map((i) => (
            <g key={i}>
              <rect x="36" y={50 + i * 30} width="248" height="22" rx="6" fill={i === 1 ? c : "#232328"} opacity={i === 1 ? 0.9 : 1} />
              <rect x="46" y={58 + i * 30} width={70 - i * 6} height="6" rx="3" fill={i === 1 ? "#fff" : g} />
              <rect x="150" y={58 + i * 30} width="40" height="6" rx="3" fill={i === 1 ? "#fff" : g} />
              <rect x={236 - (i === 1 ? 0 : 0)} y={58 + i * 30} width="36" height="6" rx="3" fill={i === 1 ? "#fff" : g} />
            </g>
          ))}
        </>
      );
    case "explorer":
      return (
        <>
          <path d="M96 76L160 126M224 70L160 126M160 126L110 160M160 126L230 156" stroke={g} strokeWidth="2" />
          {[[60, 56, 72, 40, true], [188, 50, 72, 40, false], [124, 106, 72, 40, true], [74, 146, 72, 28, false], [194, 142, 72, 28, true]].map(([x, y, w, h, on], i) => (
            <g key={i}>
              <rect x={x as number} y={y as number} width={w as number} height={h as number} rx="6" fill={on ? c : "#232328"} opacity={on ? 0.92 : 1} />
              <rect x={(x as number) + 8} y={(y as number) + 8} width="34" height="5" rx="2.5" fill={on ? "#fff" : g} />
              <rect x={(x as number) + 8} y={(y as number) + 18} width="50" height="5" rx="2.5" fill={on ? "rgba(255,255,255,.6)" : g} />
            </g>
          ))}
        </>
      );
  }
}

export function AppArt({ app }: { app: SuiteApp }) {
  return (
    <svg viewBox="0 0 320 190" className="absolute inset-0 h-full w-full" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
      <rect width="320" height="190" fill="#1b1b1f" />
      <rect width="320" height="26" fill="#232328" />
      {[14, 26, 38].map((x) => (
        <circle key={x} cx={x} cy="13" r="3.2" fill="#3a3a3f" />
      ))}
      <rect x="120" y="9" width="80" height="8" rx="4" fill="#303036" />
      <Art id={app.id} c={app.color} />
    </svg>
  );
}

/* ---------- Tarjeta de app ---------- */
export function AppCard({ app, n }: { app: SuiteApp; n: number }) {
  const inner = (
    <>
      <div className="flex items-center justify-between border-b border-line px-5 py-3">
        <span className="rounded px-2 py-0.5 font-mono text-[11px] font-bold text-white" style={{ background: app.color }}>
          0{n}
        </span>
        <span className="tag truncate pl-3 text-faint">{app.tagline}</span>
      </div>
      <div className="relative aspect-[16/9] overflow-hidden">
        <div className="absolute inset-0 transition-transform duration-700 ease-out group-hover:scale-[1.05]">
          <AppArt app={app} />
        </div>
      </div>
      <div className="relative flex flex-1 flex-col px-6 pt-0 pb-6">
        <AppIcon app={app} size={68} className="-mt-9 transition-transform duration-300 group-hover:-translate-y-1" />
        <h3 className="mt-5 font-display text-[28px] leading-tight font-bold tracking-[-0.03em]">
          <span className="text-ink">DataSquad </span>
          <span style={{ color: app.ink }}>{app.name}</span>
        </h3>
        <p className="mt-2 leading-relaxed text-muted">{app.headline}</p>
        <div className="mt-5 flex flex-wrap gap-1.5">
          <span
            className="tag rounded border px-2 py-1 !text-[10px]"
            style={app.ready ? { borderColor: app.color, color: app.ink, background: `color-mix(in srgb, ${app.color} 8%, transparent)` } : undefined}
          >
            {app.ready ? `v${app.version} · disponible` : "Próximamente"}
          </span>
          {app.ready && <span className="tag rounded border border-line-2 px-2 py-1 !text-[10px] text-muted">Windows</span>}
        </div>
        <span className="tag mt-auto flex items-center gap-2 pt-7 font-semibold" style={{ color: app.ready ? app.ink : undefined }}>
          {app.ready ? (
            <>
              Explorar {app.name}
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </>
          ) : (
            <span className="text-faint">En construcción</span>
          )}
        </span>
      </div>
    </>
  );
  const cls = "card group flex scroll-mt-28 flex-col overflow-hidden transition-all duration-300";
  return app.ready ? (
    <Link id={app.id} href={app.href} data-reveal="" className={`${cls} hover:-translate-y-1`} style={{ ["--hov" as string]: app.color }}>
      {inner}
    </Link>
  ) : (
    <article id={app.id} data-reveal="" className={cls}>
      {inner}
    </article>
  );
}

export function SuiteGrid() {
  return (
    <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
      {SUITE.map((a, i) => (
        <AppCard key={a.id} app={a} n={i + 1} />
      ))}
    </div>
  );
}

/* ---------- Rejilla de iconos ---------- */
export function IconGrid({ size = 76 }: { size?: number }) {
  return (
    <div className="grid grid-cols-3 gap-x-6 gap-y-7">
      {SUITE.map((a) => (
        <Link key={a.id} href={a.ready ? a.href : `#${a.id}`} className="group flex flex-col items-center gap-2.5 text-center">
          <AppIcon app={a} size={size} className="transition-transform duration-300 group-hover:-translate-y-1.5" />
          <span className="max-w-[110px] text-[13px] leading-tight text-muted group-hover:text-ink">{a.name}</span>
        </Link>
      ))}
    </div>
  );
}

/* ---------- Botón de descarga ---------- */
export function DownloadButton({ label = "Descargar lanzador", className = "" }: { label?: string; className?: string }) {
  return (
    <a href={DOWNLOAD.href} download={DOWNLOAD.file} className={`btn btn-primary ${className}`}>
      <Download className="h-4 w-4" /> {label}
    </a>
  );
}

export function DownloadMeta({ className = "" }: { className?: string }) {
  return (
    <p className={`tag text-faint ${className}`}>
      {DOWNLOAD.os} · {DOWNLOAD.size} · v{DOWNLOAD.version}
    </p>
  );
}
