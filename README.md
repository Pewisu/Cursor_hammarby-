# Hammarby löpdata - Matchvisualisering

Visualisering av löpdata för Hammarby IF från två allsvenska matcher:

- [Hammarby - Mjällby AIF](https://allsvenskan.se/matcher/2026/6529830/hammarby-mot-mjallby-aif)
- [IK Sirius - Hammarby](https://allsvenskan.se/matcher/2026/6529842/ik-sirius-mot-hammarby)

## Live (GitHub Pages)

Sidan publiceras via GitHub Pages:

**https://pewisu.github.io/Cursor_hammarby-/**

### Rutter

- Matchstatistik (originalsidan): `https://pewisu.github.io/Cursor_hammarby-/`
- Hammarby löpdata (egen sida): `https://pewisu.github.io/Cursor_hammarby-/lopdata`

## Funktioner

- Total löpsträcka för Hammarby över båda matcherna
- Maxhastighet (peak) och snitt löpmeter per minut
- Jämförelse per match (lagnivå)
- Per spelare och per match (löpmeter, minuter, m/min, maxhastighet)
- Totalt per spelare över båda matcherna
- Topplistor för snabbaste spelare och högst tempo

## Datametod

- Löpmeter och maxhastighet hämtas från matchdatan bakom länkarna ovan.
- Spelade minuter beräknas från startelvor + byten, inklusive stopptid.
- Löpmeter per minut beräknas som `distance / minutesPlayed`.

## Teknikstack

- [Next.js 16](https://nextjs.org/) med App Router
- [TypeScript](https://www.typescriptlang.org/)
- [Tailwind CSS](https://tailwindcss.com/)

## Komma igång lokalt

```bash
npm install
npm run dev
```

Öppna [http://localhost:3000/Cursor_hammarby-](http://localhost:3000/Cursor_hammarby-) i din webbläsare.

## GitHub Pages deployment

Deployment sker via workflow: `.github/workflows/deploy.yml`.

Vid push till `main`:
1. Projektet byggs statiskt med `next build` (`output: "export"`).
2. `out/` laddas upp som Pages-artifact.
3. GitHub Actions deployar till Pages.
