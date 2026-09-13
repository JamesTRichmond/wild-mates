import { defineConfig } from "playwright/test";

const isCI = !!process.env.CI;

export default defineConfig({
  testDir: "./e2e",
  fullyParallel: !isCI,
  forbidOnly: isCI,
  retries: isCI ? 1 : 0,
  workers: isCI ? 1 : undefined,
  reporter: isCI
    ? [["list"], ["html", { open: "never", outputFolder: "e2e/.report" }], ["github"]]
    : [["list"], ["html", { open: "never", outputFolder: "e2e/.report" }]],
  outputDir: "test-results",
  expect: {
    toHaveScreenshot: {
      animations: "disabled",
      caret: "hide",
      // Full-page antialias; zero-tolerance lives on the wordmark test.
      maxDiffPixelRatio: 0.005,
      threshold: 0.2,
    },
  },
  use: {
    baseURL: process.env.PLAYWRIGHT_BASE_URL || "http://127.0.0.1:8080",
    colorScheme: "dark",
    reducedMotion: "reduce",
    trace: "off",
    screenshot: "only-on-failure",
  },
  webServer: {
    command: "npm run dev",
    url: process.env.PLAYWRIGHT_BASE_URL || "http://127.0.0.1:8080",
    reuseExistingServer: true,
    timeout: 120_000,
  },
  snapshotPathTemplate: "{testDir}/{testFileDir}/__snapshots__/{arg}-{projectName}{ext}",
  projects: [
    {
      name: "visual-desktop",
      use: { viewport: { width: 1280, height: 720 } },
      testMatch: /.*visual.*\.spec\.ts/,
    },
    {
      name: "visual-mobile",
      use: { viewport: { width: 390, height: 844 }, isMobile: true },
      testMatch: /.*visual.*\.spec\.ts/,
    },
  ],
});
