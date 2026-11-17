import type { Metadata } from "next";
import "@fontsource-variable/inter-tight";
import "@fontsource-variable/inter";
import "@fontsource-variable/jetbrains-mono";
import "./globals.css";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import { Reveal, ScrollProgress } from "@/components/Effects";

export const metadata: Metadata = {
  title: "DataSquad · Decisiones con ciencia de datos",
  description:
    "DataSquad construye software para decidir con datos: Decide, un motor de decisiones para banca, retail y logística; Copiloto, un asistente privado; Lab, proyectos de ciencia de datos; y Aprende, la IA explicada.",
  icons: { icon: "/icon.svg" },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" className="no-js">
      <head>
        <script dangerouslySetInnerHTML={{ __html: "document.documentElement.classList.remove('no-js')" }} />
      </head>
      <body>
        <ScrollProgress />
        <Nav />
        {children}
        <Footer />
        <Reveal />
      </body>
    </html>
  );
}
