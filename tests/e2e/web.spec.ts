import { expect, test } from "@playwright/test";

test("public website foundation is reachable", async ({ page }) => {
  await page.goto("/");

  await expect(page).toHaveTitle(/Trạm Tài Chính/);
  await expect(page.getByRole("heading", { level: 1 })).toContainText("Hiểu tiền");
});

test("public health endpoint does not expose sensitive data", async ({ request }) => {
  const response = await request.get("/api/health");
  const body = (await response.json()) as Record<string, unknown>;

  expect(response.ok()).toBe(true);
  expect(body).toEqual({
    service: "web",
    status: "ok",
  });
});
