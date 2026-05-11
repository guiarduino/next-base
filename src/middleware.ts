import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const publicRoutes = [
  { pathname: "/login", whenAuthenticated: 'redirect' },
  { pathname: "/register", whenAuthenticated: 'redirect'}
] as const;

const REDIRECT_WHEN_NOT_AUTHENTICATED = '/login';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const publicRoute = publicRoutes.find(route => pathname.startsWith(route.pathname));
  const authToken = request.cookies.get("authToken");

  if (!authToken && publicRoute) {
    return NextResponse.next();
  }

  if (!authToken && !publicRoute) {
    const redirectUrl = request.nextUrl.clone();
    redirectUrl.pathname = REDIRECT_WHEN_NOT_AUTHENTICATED;
    return NextResponse.redirect(redirectUrl);
  }

  if (authToken && publicRoute?.whenAuthenticated === 'redirect') {
    const redirectUrl = request.nextUrl.clone();
    redirectUrl.pathname = '/dashboard';
    return NextResponse.redirect(redirectUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|.*\\.png$|.*\\.svg$|.*\\.jpg$|.*\\.jpeg$|.*\\.gif$|.*\\.ico$|.*\\.webp$).*)',
  ],
}