import type { Metadata } from "next";
import { LegalBlock, LegalPage } from "@/components/Legal";
import { CONTACT } from "@/lib/data";

export const metadata: Metadata = {
  title: "Aviso de privacidad · DataSquad",
  description: "Qué datos trata este sitio (casi ninguno), cookies y cómo pedir que eliminemos tus datos.",
};

export default function PrivacidadPage() {
  const mail = <a href={`mailto:${CONTACT.email}`}>{CONTACT.email}</a>;
  return (
    <LegalPage title="Aviso de privacidad" updated="16 de noviembre de 2026">
      <LegalBlock title="Quién es el responsable">
        <p>
          DataSquad es el responsable de este sitio. Para cualquier asunto de privacidad escríbenos a {mail}.
        </p>
      </LegalBlock>

      <LegalBlock title="Qué datos recabamos en este sitio">
        <p>
          <strong>Ninguno de forma directa.</strong> Este sitio no tiene formularios, registro de cuentas, boletín ni pagos, y no usa
          herramientas de analítica ni publicidad.
        </p>
        <p>
          Si nos escribes por correo, recibimos tu dirección y lo que decidas contarnos. Lo usamos únicamente para responderte y dar
          seguimiento a lo que nos pidas. No lo vendemos ni lo compartimos con terceros.
        </p>
      </LegalBlock>

      <LegalBlock title="Cookies">
        <p>
          <strong>Este sitio no usa cookies ni rastreadores</strong>, propios ni de terceros. Por eso no verás un aviso de cookies: no
          hay nada que aceptar o rechazar. Las tipografías se sirven desde este mismo sitio, sin llamar a servidores externos.
        </p>
      </LegalBlock>

      <LegalBlock title="Hospedaje y enlaces externos">
        <p>
          El sitio está hospedado en GitHub Pages. Como cualquier servidor web, GitHub puede registrar datos técnicos de la visita (por
          ejemplo, tu dirección IP) conforme a su propia política de privacidad.
        </p>
        <p>
          Los enlaces a TikTok, YouTube y GitHub te llevan a sitios de terceros que tienen sus propias políticas. No controlamos lo que
          esos sitios hacen con tus datos.
        </p>
      </LegalBlock>

      <LegalBlock title="El software que descargas">
        <p>
          El lanzador de la suite y DataSquad Decide se instalan y trabajan en tu computadora, con tus archivos locales. Este sitio no
          recibe los datos que proceses con ellos.
        </p>
      </LegalBlock>

      <LegalBlock title="Tus derechos: acceso, corrección y eliminación">
        <p>
          Puedes pedirnos en cualquier momento que te digamos qué datos tuyos tenemos, que los corrijamos o que los eliminemos, y
          oponerte a que los usemos. Escríbenos a {mail} desde el correo con el que nos contactaste y lo atendemos.
        </p>
      </LegalBlock>

      <LegalBlock title="Menores de edad">
        <p>Este sitio y sus productos están dirigidos a empresas y profesionales. No recabamos a sabiendas datos de menores de edad.</p>
      </LegalBlock>

      <LegalBlock title="Cambios a este aviso">
        <p>Si este aviso cambia, publicaremos aquí la nueva versión con su fecha de actualización.</p>
      </LegalBlock>
    </LegalPage>
  );
}
