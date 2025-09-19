import { NextRequest, NextResponse } from 'next/server';

export function middleware(request: NextRequest) {
  // Middleware de autenticación DESACTIVADO temporalmente para debug.
  // const token = request.cookies.get('token')?.value;
  // const { pathname } = request.nextUrl;
  // const protectedRoutes = ['/dashboard'];
  // const isProtectedRoute = protectedRoutes.some(route => pathname.startsWith(route));
  // if (isProtectedRoute && !token) {
  //   return NextResponse.redirect(new URL('/login', request.url));
  // }
  return NextResponse.next();
}

export const config = {
  // matcher: ['/dashboard/:path*'],  // Desactivado mientras se depura
};
