import { expect, test } from "@playwright/test";

test("cash-flow application foundation is reachable", async ({ page }) => {
  await page.goto("/");

  await expect(page).toHaveTitle(/Quản lý dòng tiền/);
  await expect(page.getByRole("heading", { level: 1 })).toContainText("dòng tiền");
});

test("application pages are not indexable", async ({ page }) => {
  await page.goto("/");

  await expect(page.locator('meta[name="robots"]')).toHaveAttribute("content", /noindex/);
});
