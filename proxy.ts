import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// redirect users based on geo location to pt or en locale
export function proxy(req: NextRequest) {
  const { geo, nextUrl } = req;

  // skip api/_next and static files
  if (nextUrl.pathname.startsWith('/_next') || nextUrl.pathname.startsWith('/api')) {
    return NextResponse.next();
  }

  // if the path already contains a locale segment, let Next handle it
  if (nextUrl.locale) {
    return NextResponse.next();
  }

  // default locale
  let locale: string = 'en';
  const country = geo?.country?.toUpperCase() || '';
  if (country === 'BR' || country === 'PT') {
    locale = 'pt';
  }

  // rewrite to the correct locale prefix without changing the URL in the browser
  const url = nextUrl.clone();
  url.pathname = `/${locale}${nextUrl.pathname}`;
  return NextResponse.rewrite(url);
}

export const config = {
  matcher: '/:path*',
};
