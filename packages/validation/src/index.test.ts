import { describe, expect, it } from "vitest";

import { newsletterSubscriptionSchema, slugSchema } from "./index";

describe("boundary validation", () => {
  it("rejects unknown fields instead of enabling mass assignment", () => {
    const result = newsletterSubscriptionSchema.safeParse({
      email: "reader@example.com",
      isAdmin: true,
    });

    expect(result.success).toBe(false);
  });

  it("accepts canonical lowercase slugs only", () => {
    expect(slugSchema.safeParse("quan-ly-dong-tien").success).toBe(true);
    expect(slugSchema.safeParse("../Admin").success).toBe(false);
  });
});
