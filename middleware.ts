import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export const TOKEN_NAME = "auth_token";
// Executa antes de qualquer request
export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  console.log("🧭 Middleware interceptou:", pathname);
  const token = request.cookies.get(TOKEN_NAME)?.value;

  if (
    (pathname.startsWith("/admin/private") ||
      pathname.startsWith("/admin/dashboard")) &&
    !token
  ) {
    const url = new URL("/admin", request.url);
    url.searchParams.set("redirectTo", pathname);
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

// Configura as rotas em que o middleware será executado
export const config = {
  matcher: ["/admin/dashboard/:path*", "/admin/private/:path*"],
};
