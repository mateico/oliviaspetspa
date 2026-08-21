import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const MARKDOWN_TARGETS: Record<string, string> = {
  "/": "/markdown/home",
  "/about": "/markdown/about",
  "/services": "/markdown/services",
  "/gallery": "/markdown/gallery",
  "/contact": "/markdown/contact",
};

export function middleware(request: NextRequest) {
  const target = MARKDOWN_TARGETS[request.nextUrl.pathname];
  if (!target) return NextResponse.next();

  const accept = request.headers.get("accept") ?? "";
  if (!accept.includes("text/markdown")) {
    const response = NextResponse.next();
    response.headers.set("Vary", "Accept");
    return response;
  }

  const url = request.nextUrl.clone();
  url.pathname = target;
  const response = NextResponse.rewrite(url);
  response.headers.set("Vary", "Accept");
  return response;
}

export const config = {
  matcher: ["/", "/about", "/services", "/gallery", "/contact"],
};
