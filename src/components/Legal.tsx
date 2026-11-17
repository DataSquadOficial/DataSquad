import type { ReactNode } from "react";
import { Container } from "./ui";

/** Plantilla sencilla para las páginas legales. */
export function LegalPage({ title, updated, children }: { title: string; updated: string; children: ReactNode }) {
  return (
    <main>
      <section className="pt-40 pb-24 md:pt-48">
        <Container className="max-w-3xl">
          <p className="tag text-muted">Legal</p>
          <h1 className="mt-4 font-display text-5xl leading-[1] font-black tracking-[-0.045em] md:text-6xl">{title}</h1>
          <p className="tag mt-5 text-faint">Última actualización: {updated}</p>
          <div className="mt-12 space-y-10">{children}</div>
        </Container>
      </section>
    </main>
  );
}

export function LegalBlock({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section>
      <h2 className="font-display text-2xl font-bold tracking-[-0.02em]">{title}</h2>
      <div className="mt-3 space-y-3 text-[17px] leading-relaxed text-muted [&_a]:text-ink [&_a]:underline [&_a]:underline-offset-4 [&_li]:ml-5 [&_li]:list-disc [&_strong]:text-ink">{children}</div>
    </section>
  );
}
