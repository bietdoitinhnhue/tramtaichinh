import "@tram-tai-chinh/ui/styles.css";
import "./globals.css";

import { siteIdentity } from "@tram-tai-chinh/seo";
import type { Metadata } from "next";
import type { ReactNode } from "react";

export const metadata: Metadata = {
  description: siteIdentity.description,
  metadataBase: new URL(siteIdentity.webUrl),
  title: {
    default: siteIdentity.brandName,
    template: `%s | ${siteIdentity.brandName}`,
  },
};

export default function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="vi">
      <body>{children}</body>
    </html>
  );
}
