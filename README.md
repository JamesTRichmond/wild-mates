# Wild Mates

A claymation field guide to animal reproductive strategies. Curious adults.
Identify first. One ritual per plate. The caption is the product.

Nine flagship clay films (sage-grouse, wandering albatross, emperor dragonfly,
coho salmon, Komodo dragon, northern jacana, African wild dog, elkhorn coral,
ocellaris clownfish) plus 54 plates and a ranking Identify flow.

## Run

```bash
npm install
npm run dev
```

```bash
npm run typecheck
npm test
npm run test:visual          # pixel diffs vs goldens
npm run test:visual:update   # after an intentional look change
```

Visual CI is `.github/workflows/visual.yml`. It fails the job on a pixel diff
and uploads expected / actual / diff. Update goldens in
`mcr.microsoft.com/playwright:v1.63.0-noble`, not on a laptop.

## Notes

- Clay-only player. Field Theatre clips are not in this tree.
- Films are muted by default. The plate still talks in first person on the caption.
- This is a field guide, not a sex-ed film.
