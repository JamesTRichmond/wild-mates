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

async function ready(page: Page, heading: string | RegExp) {
  await expect(page.getByRole("heading", { name: heading })).toBeVisible();
  await page.evaluate(() => document.fonts.ready);
  await page.evaluate(() => {
    document.getAnimations().forEach((a) => a.finish());
  });
}

const shot = { stylePath: STYLE, animations: "disabled" as const };

test.describe("visual pages @visual", () => {
  test.beforeEach(async ({ page }) => {
    await settle(page);
  });

  test("identify empty key", async ({ page }) => {
    await page.goto("/identify");
    await ready(page, "Identify");
    await expect(page.getByRole("heading", { name: "The list waits here" })).toBeVisible();
    await expect(page.getByRole("main")).toHaveScreenshot("identify.png", {
      ...shot,
      fullPage: true,
    });
  });

  test("saved empty shelf", async ({ page }) => {
    await page.goto("/saved");
    await ready(page, "Saved");
    await expect(page.getByRole("main")).toHaveScreenshot("saved.png", shot);
  });

  test("compare empty pickers", async ({ page }) => {
    await page.goto("/compare");
    await ready(page, "Compare");
    await expect(page.getByRole("main")).toHaveScreenshot("compare.png", shot);
  });

  test("strategies index heading", async ({ page }) => {
    await page.goto("/strategies");
    await ready(page, "Nine strategies");
    await expect(page.getByRole("heading", { name: "Nine strategies" })).toHaveScreenshot(
      "strategies-h1.png",
      shot,
    );
  });

  test("species miss plate", async ({ page }) => {
    await page.goto("/species/does-not-exist");
    await ready(page, "No plate for that name");
    await expect(page.getByRole("main")).toHaveScreenshot("miss-species.png", shot);
  });

  test("unknown route miss plate", async ({ page }) => {
    await page.goto("/no-such-route");
    await ready(page, "That plate is not in this guide");
    await expect(page.getByRole("main")).toHaveScreenshot("miss-route.png", shot);
  });

  test("sage-grouse plate with film masked", async ({ page }) => {
    await page.goto("/species/sage-grouse");
    await ready(page, /^Greater sage-grouse$/);
    await expect(page.locator("article")).toHaveScreenshot("sage-grouse.png", {
      ...shot,
      fullPage: true,
      mask: [page.getByTestId("clay-film")],
    });
  });
});
