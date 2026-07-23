import { getSecurityHeaders } from "@tram-tai-chinh/config/security-headers";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  poweredByHeader: false,
  reactStrictMode: true,
  transpilePackages: ["@tram-tai-chinh/config", "@tram-tai-chinh/seo", "@tram-tai-chinh/ui"],
  async headers() {
    return [
      {
        headers: getSecurityHeaders(process.env.NODE_ENV !== "production"),
        source: "/:path*",
      },
    ];
  },
};

export default nextConfig;
