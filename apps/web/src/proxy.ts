import { canonicalUrls } from "@tram-tai-chinh/config";
import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

const moneyManagerHosts = new Set(["quanlydongtien.com", "www.quanlydongtien.com"]);

export function proxy(request: NextRequest) {
  const host = request.headers.get("host")?.split(":")[0]?.toLowerCase();

  if (!host || !moneyManagerHosts.has(host)) {
    return NextResponse.next();
  }

  if (request.nextUrl.pathname === "/") {
    const landingUrl = request.nextUrl.clone();
    landingUrl.pathname = "/quanlydongtien";
    return NextResponse.rewrite(landingUrl);
  }

  if (request.nextUrl.pathname === "/quanlydongtien") {
    return NextResponse.next();
  }

  const appUrl = new URL(request.nextUrl.pathname, canonicalUrls.app);
  appUrl.search = request.nextUrl.search;

  return NextResponse.redirect(appUrl, 307);
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
