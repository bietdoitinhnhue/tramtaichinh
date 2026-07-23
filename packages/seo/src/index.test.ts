import { describe, expect, it } from "vitest";

import { absoluteUrl } from "./index";

describe("absoluteUrl", () => {
  it("builds canonical URLs without trusting an arbitrary origin", () => {
    expect(absoluteUrl("https://tramtaichinh.com", "bat-dau")).toBe(
      "https://tramtaichinh.com/bat-dau",
    );
  });
});
