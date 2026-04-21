import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';
import { decodePayload } from './features/auth/lib/utils';

const protectedRoutes = ['/admin'];
const publicRoutes = ['/login', '/register'];

export default async function proxy(req: NextRequest) {
  const path = req.nextUrl.pathname;

  const refreshToken = (await cookies()).get('refreshToken')?.value;

  // Decode user role if token exists
  let role: string | null = null;
  if (refreshToken) {
    try {
      const decoded = decodePayload(refreshToken);
      role = decoded?.role ?? null;
    } catch (error) {
      console.error(error);
    }
  }

  const isProtectedRoute = protectedRoutes.includes(path);
  const isPublicRoute = publicRoutes.includes(path);

  // 1. Not authenticated → block protected pages
  if (isProtectedRoute && !refreshToken) {
    return NextResponse.redirect(new URL('/login', req.nextUrl));
  }

  // 2. Authenticated → accessing public pages → send to home by role
  if (isPublicRoute && refreshToken) {
    // const target = role === 'admin' ? '/admin' : '/home';
    // return NextResponse.redirect(new URL(target, req.nextUrl));
    return NextResponse.redirect(new URL('/admin', req.nextUrl));
  }

  // 3. Admin tries to access /home → redirect to /admin
  if (path === '/home' && role === 'admin') {
    return NextResponse.redirect(new URL('/admin', req.nextUrl));
  }

  // 4. Normal user tries to access /admin → redirect to /home
  // if (path === '/admin' && role !== 'admin') {
  //   return NextResponse.redirect(new URL('/home', req.nextUrl));
  // }

  return NextResponse.next();
}
