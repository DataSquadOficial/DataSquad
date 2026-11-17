<p align="center"><img src="public/datasquad-logo.png" width="140" alt="DataSquad"></p>

# DataSquad · sitio web

**En línea:** https://datasquadoficial.github.io/

Sitio original de DataSquad (Next.js 15 + Tailwind 4, exportación estática).

## Usar

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # genera la carpeta out/ lista para GitHub Pages o cualquier hosting
```

## Dónde cambiar cosas

- Textos, productos, planes y preguntas: `src/lib/data.ts`
- Colores (blanco y grises) y tipografías: `src/app/globals.css`
- Nombre "DATA SQUAD" del menú: `src/components/Logo.tsx`
- Animación de la portada: `src/components/HeroField.tsx`
- Simulador de decisiones (fórmula de ejemplo): `src/components/Simulator.tsx`
- Apps de la suite (nombres, colores, textos) y datos de la descarga: `src/lib/data.ts` → `SUITE` y `DOWNLOAD`
- Lanzador que se descarga: `public/descargas/DataSquad-Suite-Launcher.exe` (cópialo de `suite DS/app/target/release/` cada vez que lo recompiles)
- Video de Decide: `public/video/decide-historia.mp4`
- Páginas: `src/app/` → inicio, `suite/`, `decide/` (tema magenta), `precios/`, `contacto/`

## Publicar cambios

Doble clic en `publicar.bat` (o `git add -A && git commit -m "cambios" && git push`). GitHub Actions compila y publica solo; el avance se ve en la pestaña **Actions** del repositorio.
