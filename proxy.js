import { NextResponse } from 'next/server';

export function proxy(request) {
  const session = request.cookies.get('session');

  // Protege todas as rotas que começam com /my-trips
  if (!session && request.nextUrl.pathname.startsWith('/my-trips')) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  // Se já estiver logado e tentar acessar login, manda pra /my-trips
  if (session && request.nextUrl.pathname === '/login') {
    return NextResponse.redirect(new URL('/my-trips', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/my-trips/:path*', '/login'],
};