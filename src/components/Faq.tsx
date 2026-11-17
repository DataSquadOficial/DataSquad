import { Plus } from "lucide-react";
import { FAQ } from "@/lib/data";

export function Faq() {
  return (
    <div className="divide-y divide-line overflow-hidden rounded-3xl border border-line bg-bg">
      {FAQ.map((f) => (
        <details key={f.q} className="group">
          <summary className="flex cursor-pointer list-none items-center justify-between gap-6 px-6 py-5 font-display text-lg font-semibold hover:bg-panel md:px-8 [&::-webkit-details-marker]:hidden">
            {f.q}
            <Plus className="h-5 w-5 shrink-0 text-muted transition-transform group-open:rotate-45" />
          </summary>
          <p className="max-w-3xl px-6 pb-6 leading-relaxed text-muted md:px-8">{f.a}</p>
        </details>
      ))}
    </div>
  );
}
