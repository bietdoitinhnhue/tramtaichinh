import { describe, expect, it } from "vitest";

import { getSecurityHeaders } from "./security-headers";

describe("security headers", () => {
  it("denies framing and unsafe browser capabilities", () => {
    const headers = new Map(getSecurityHeaders().map(({ key, value }) => [key, value]));
    const csp = headers.get("Content-Security-Policy");

    expect(csp).toContain("frame-ancestors 'none'");
    expect(csp).toContain("object-src 'none'");
    expect(headers.get("X-Content-Type-Options")).toBe("nosniff");
    expect(headers.get("X-Frame-Options")).toBe("DENY");
    expect(headers.get("Permissions-Policy")).toContain("payment=()");
  });

  it("allows eval in development only", () => {
    expect(getSecurityHeaders(true)[0]?.value).toContain("'unsafe-eval'");
    expect(getSecurityHeaders(false)[0]?.value).not.toContain("'unsafe-eval'");
  });
});
