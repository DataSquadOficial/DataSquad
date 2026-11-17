import type { Metadata } from "next";
import Link from "next/link";
import { LegalBlock, LegalPage } from "@/components/Legal";
import { CONTACT, DOWNLOAD } from "@/lib/data";

export const metadata: Metadata = {
  title: "Términos de uso · DataSquad",
  description: "Condiciones de uso del sitio y del software de DataSquad, descargas, precios y reembolsos.",
};

export default function TerminosPage() {
  return (
    <LegalPage title="Términos de uso" updated="16 de noviembre de 2026">
      <LegalBlock title="Sobre este sitio">
        <p>
          Este sitio presenta los productos de DataSquad y permite descargar el lanzador de la suite. Al usarlo aceptas estos términos.
          Si no estás de acuerdo, por favor no descargues ni uses el software.
        </p>
      </LegalBlock>

      <LegalBlock title="Descarga del software">
        <p>
          El lanzador de la suite DataSquad es una versión temprana (v{DOWNLOAD.version}) para {DOWNLOAD.os}. Se ofrece{" "}
          <strong>tal cual, sin garantías</strong> de funcionamiento ininterrumpido ni de adecuación a un fin particular.
        </p>
        <p>
          El archivo <strong>todavía no cuenta con firma digital de código</strong>, por lo que Windows y tu navegador pueden mostrar
          una advertencia al descargarlo o abrirlo. Descárgalo únicamente desde este sitio y, si quieres confirmar que no fue alterado,
          compara su huella SHA-256 con la publicada en la <Link href="/suite#descargar">página de descarga</Link>.
        </p>
        <p>Las apps marcadas como «Próximamente» aún no están disponibles; sus características pueden cambiar antes de publicarse.</p>
      </LegalBlock>

      <LegalBlock title="Precios, cobros y reembolsos">
        <p>
          <strong>Hoy no se cobra nada en este sitio</strong>: no hay pagos, suscripciones ni cargos ocultos, y descargar el lanzador es
          gratuito. Cuando existan planes de pago publicaremos aquí sus precios, condiciones y la política de reembolsos antes de
          aceptar cualquier cobro.
        </p>
      </LegalBlock>

      <LegalBlock title="Contenido de ejemplo">
        <p>
          El simulador de decisiones, las ilustraciones y los casos que aparecen en el sitio son <strong>ejemplos ilustrativos</strong>.
          No son resultados reales de clientes ni constituyen asesoría financiera, crediticia o de ningún otro tipo.
        </p>
      </LegalBlock>

      <LegalBlock title="Responsabilidad">
        <p>
          Las decisiones que tomes con ayuda del software son responsabilidad tuya y de tu organización. En la medida que la ley lo
          permita, DataSquad no responde por daños derivados del uso o de la imposibilidad de usar el software o este sitio.
        </p>
      </LegalBlock>

      <LegalBlock title="Propiedad intelectual">
        <p>
          El nombre DataSquad, los nombres e iconos de sus productos, el software y el contenido de este sitio pertenecen a DataSquad.
          No puedes redistribuir el software modificado ni usar la marca sin permiso.
        </p>
      </LegalBlock>

      <LegalBlock title="Contacto">
        <p>
          Dudas sobre estos términos: <a href={`mailto:${CONTACT.email}`}>{CONTACT.email}</a>.
        </p>
      </LegalBlock>
    </LegalPage>
  );
}
