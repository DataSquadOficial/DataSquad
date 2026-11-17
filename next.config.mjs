/** @type {import('next').NextConfig} */
// El sitio vive en https://datasquadoficial.github.io/DataSquad/ (el nombre del repositorio).
// Si cambias el nombre del repo o usas un dominio propio, cambia BASE aquí y en src/lib/data.ts.
const BASE = "/DataSquad";

const nextConfig = {
  output: "export",
  trailingSlash: true,
  basePath: BASE,
  images: { unoptimized: true },
};

export default nextConfig;
