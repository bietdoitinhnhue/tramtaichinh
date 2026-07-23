import { describe, expect, it } from "vitest";

import { toVndBigInt, toVndDecimal } from "./money";

describe("VND boundary", () => {
  it("keeps amounts above JavaScript safe integer range exact", () => {
    const amount = "900719925474099312345";

    expect(toVndBigInt(amount)).toBe(900719925474099312345n);
    expect(toVndDecimal(amount).toFixed(0)).toBe(amount);
  });

  it("rejects fractional đồng", () => {
    expect(() => toVndBigInt("1000.5")).toThrow(/whole đồng/);
  });
});
