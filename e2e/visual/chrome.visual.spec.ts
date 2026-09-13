import { expect, test, type Page } from "playwright/test";

const STYLE = "e2e/visual/screenshot.css";

async function settle(page: Page) {
  await page.addInitScript(() => {
    try {
      localStorage.clear();
    } catch {
      /* private mode */
    }
  });
  await page.clock.setFixedTime(new Date("2026-01-15T10:00:00Z"));
}

async function ready(page: Page, heading?: string) {
  if (heading) {
    await expect(page.getByRole("heading", { name: heading })).toBeVisible();
  }
  await page.evaluate(() => document.fonts.ready);
  await page.evaluate(() => {
    document.getAnimations().forEach((a) => a.finish());
  });
}

test.describe("visual chrome @visual", () => {
  test.beforeEach(async ({ page }) => {
    await settle(page);
  });

  test("wordmark is pixel-tight", async ({ page }) => {
    await page.goto("/");
    await ready(page);
    const mark = page.getByRole("link", { name: "Wild Mates" });
    await expect(mark).toBeVisible();
    await expect(mark).toHaveScreenshot("wordmark.png", {
      maxDiffPixels: 0,
      stylePath: STYLE,
    });
  });

  test("header chrome", async ({ page }) => {
    await page.goto("/identify");
    await ready(page, "Identify");
    await expect(page.getByTestId("site-chrome-header")).toHaveScreenshot("header.png", {
      stylePath: STYLE,
    });
  });

  test("tab bar", async ({ page }) => {
    await page.goto("/identify");
    await ready(page, "Identify");
    await expect(page.getByTestId("site-chrome-nav")).toHaveScreenshot("tab-bar.png", {
      stylePath: STYLE,
    });
  });
});
