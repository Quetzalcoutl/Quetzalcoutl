import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// detect user locale via geo and expose it in a header/cookie
export function proxy(req: NextRequest) {
  const { geo } = req;

  // always allow next internal routes through unchanged
  const { pathname } = req.nextUrl;
  if (pathname.startsWith('/_next') || pathname.startsWith('/api')) {
    return NextResponse.next();
  }

  // determine locale (default en)
  let locale = 'en';
  const country = geo?.country?.toUpperCase() || '';
  if (country === 'BR' || country === 'PT') {
    locale = 'pt';
  }

  const res = NextResponse.next();
  // add header for server components
  res.headers.set('x-locale', locale);
  // also set a cookie so client UI can read it
  res.cookies.set('NEXT_LOCALE', locale, { path: '/' });
  return res;
}

export const config = {
  matcher: '/:path*',
};
