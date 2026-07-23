export const siteIdentity = Object.freeze({
  appName: "Quản lý dòng tiền",
  appUrl: "https://app.tramtaichinh.com",
  brandName: "Trạm Tài Chính",
  description:
    "Kiến thức và công cụ giúp người Việt hiểu tiền, quản lý dòng tiền và xây nền tảng tài chính dài hạn.",
  webUrl: "https://tramtaichinh.com",
});

export function absoluteUrl(baseUrl: string, path = "/"): string {
  const base = new URL(baseUrl);
  const normalizedPath = path.startsWith("/") ? path : `/${path}`;

  return new URL(normalizedPath, base).toString();
}
