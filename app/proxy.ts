import { NextRequest, NextResponse } from 'next/server';

export function proxy(request: NextRequest) {
  const session = request.cookies.get('session');

  // Protege todas as rotas que começam com /dashboard
  if (!session && request.nextUrl.pathname.startsWith('/my-trips')) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  // Se já estiver logado e tentar acessar login, manda pro dashboard
  if (session && request.nextUrl.pathname === '/login') {
    return NextResponse.redirect(new URL('/my-trips', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/dashboard/:path*', '/login'],
};