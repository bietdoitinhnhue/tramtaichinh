export interface SecurityHeader {
  key: string;
  value: string;
}

export function getSecurityHeaders(isDevelopment = false): SecurityHeader[] {
  const scriptSources = ["'self'", "'unsafe-inline'"];

  if (isDevelopment) {
    scriptSources.push("'unsafe-eval'");
  }

  const directives = [
    "default-src 'self'",
    `script-src ${scriptSources.join(" ")}`,
    "style-src 'self' 'unsafe-inline'",
    "img-src 'self' data: blob:",
    "font-src 'self' data:",
    [
      "connect-src 'self'",
      "http://127.0.0.1:54321",
      "ws://127.0.0.1:54321",
      "https://*.supabase.co",
      "wss://*.supabase.co",
    ].join(" "),
    "media-src 'self'",
    "object-src 'none'",
    "base-uri 'self'",
    "form-action 'self'",
    "frame-ancestors 'none'",
    "worker-src 'self' blob:",
    ...(isDevelopment ? [] : ["upgrade-insecure-requests"]),
  ];

  return [
    {
      key: "Content-Security-Policy",
      value: directives.join("; "),
    },
    {
      key: "Strict-Transport-Security",
      value: "max-age=63072000; includeSubDomains; preload",
    },
    {
      key: "X-Content-Type-Options",
      value: "nosniff",
    },
    {
      key: "Referrer-Policy",
      value: "strict-origin-when-cross-origin",
    },
    {
      key: "Permissions-Policy",
      value: "camera=(), display-capture=(), geolocation=(), microphone=(), payment=(), usb=()",
    },
    {
      key: "X-Frame-Options",
      value: "DENY",
    },
    {
      key: "Cross-Origin-Opener-Policy",
      value: "same-origin",
    },
  ];
}
