# Visual regression

Playwright pixelmatch against goldens in `__snapshots__/`. Films and the streak
counter are hidden at capture. Motion is reduced so clay shows the poster.

```bash
npm run test:visual          # compare
npm run test:visual:update   # rewrite goldens after an intentional look change
```

CI (`.github/workflows/visual.yml`) runs the compare job in
`mcr.microsoft.com/playwright:v1.63.0-noble` and **fails the workflow** on a
diff. Failed runs upload `test-results/` plus the HTML report.

Do not update goldens on a laptop and expect CI to match. Update them in that
container, then look at the PNGs before committing.
