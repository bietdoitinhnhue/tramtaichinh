import "@tram-tai-chinh/ui/styles.css";
import "./globals.css";

import { siteIdentity } from "@tram-tai-chinh/seo";
import type { Metadata } from "next";
import type { ReactNode } from "react";

export const metadata: Metadata = {
  description: "Ứng dụng quản lý dòng tiền của Trạm Tài Chính.",
  metadataBase: new URL(siteIdentity.appUrl),
  robots: {
    follow: false,
    index: false,
  },
  title: {
    default: siteIdentity.appName,
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
