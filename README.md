# Fredrik Christopher Almnes — personlig portefølje

Personlig porteføljenettside bygget med Next.js 16, React 19, TypeScript og Tailwind CSS 4.
Bak innholdet ligger en scroll-styrt seiltur: en jordklode som stopper over Oslo, og en
seilbåt som seiler videre til Tenerife mens man scroller nedover siden.

## Kom i gang

```bash
npm install
npm run dev
```

Åpne [http://localhost:3000](http://localhost:3000) for å se siden.

Andre kommandoer:

- `npm run build` — produksjonsbygg
- `npm run lint` — ESLint

## Struktur

- `src/data/content.ts` — alt tekstinnhold (navn, «Nå»-kort, prosjekter, erfaring, studieplan,
  ferdigheter, kontaktinfo). Rediger denne filen for å oppdatere teksten på siden.
- `src/components/` — seksjonene på siden (Hero, Nå, Prosjekter, Erfaring, Studiet,
  Ferdigheter, Kontakt) pluss Header, Footer og `VoyageBackground`.
- `src/app/globals.css` — fargevariabler for lyst og mørkt tema, og stilene til seiltur-bakgrunnen.
- `src/app/layout.tsx` — fonter (via `next/font`) og tema. Siden bruker mørkt tema
  (`data-theme="dark"` på `<html>`). Fjern attributtet for å gå tilbake til lyst tema.

## Seiltur-bakgrunnen

- `src/components/VoyageBackground.tsx` — client component med to `<canvas>` som ligger fast
  bak innholdet. Den laster motoren først etter at siden har rendret.
- `src/lib/voyage/engine.ts` — selve animasjonen (d3-geo + topojson-client).
  `initVoyage(el)` starter den og returnerer en `destroy()`-funksjon som rydder opp.
  Havnene og veipunktene mellom dem ligger i `CONFIG` øverst i filen.
- `public/voyage/land-*.json` — kartdata (TopoJSON) i flere detaljnivåer. De hentes med
  `fetch` og er ikke en del av JavaScript-bundelen.

Animasjonen styres av `data-voyage="N"` på seksjonene. Når midten av en seksjon står midt på
skjermen, er animasjonen på steg N:

| Steg | Hva vises |
| --- | --- |
| 0 | Kloden snurrer |
| 1 | Kloden har stoppet over Oslo |
| 2 | Zoomet inn, båten ligger i Oslo |
| 3–15 | Båten ligger i havn nr. 2–14 (Skagen … Tenerife) |
| 16 | Zoomet ut, hele ruta vises |

Legger du til eller fjerner en havn, flytter stegene etter den seg tilsvarende, så husk å
justere `data-voyage` på seksjonene.

## Ting som gjenstår

- Bytt ut placeholder-prosjektkortet («Under arbeid») når neste prosjekt er klart.

## Deploy

Repoet er koblet til [Vercel](https://vercel.com). Hver pull request får en egen
forhåndsversjon, og det som merges til `main` publiseres.
