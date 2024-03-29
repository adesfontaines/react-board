import { NextFetchEvent, NextRequest, NextResponse } from "next/server";
import acceptLanguage from "accept-language";
import { fallbackLng, locales } from "./app/i18n/settings";
import { withAuth, NextRequestWithAuth } from "next-auth/middleware"
acceptLanguage.languages(locales);

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|assets|favicon.ico|sw.js).*)"],
};

const cookieName = "locale";

export default async function middleware(req: NextRequestWithAuth, event: NextFetchEvent) {
  let lng: string | null | undefined;

  if (req.cookies.has(cookieName)) {
    lng = acceptLanguage.get(req.cookies.get(cookieName)?.value);
  }
  if (!lng) {
    lng = acceptLanguage.get(req.headers.get("Accept-Language"));
  }
  if (!lng) {
    lng = fallbackLng;
  }

  const withAuthMiddleware = withAuth({
    callbacks: {
      authorized: ({ req, token }: any) => {
        const tokenValue = req.cookies.get("next-auth.session-token")?.value;

        // HTTPS Cookie
        if (!tokenValue)
          req.cookies.get("__Secure-next-auth.session-token")?.value;

        return tokenValue
      }
    },
    pages: {
      signIn: `/${lng}/signin`,
    },
  });

  // Redirect if lng in path is not supported
  if (
    !locales.some((loc) => req.nextUrl.pathname.startsWith(`/${loc}`)) &&
    !req.nextUrl.pathname.startsWith("/_next")
  ) {
    console.log(req);
    return NextResponse.redirect(
      new URL(`/${lng}${req.nextUrl.pathname}`, req.url)
    );
  }

  if (!lng && req.headers.has("referer")) {
    const refererUrl = new URL(req.headers.get("referer")!);
    const lngInReferer = locales.find((l) =>
      refererUrl.pathname.startsWith(`/${l}`)
    );
    const response = NextResponse.next();
    if (lngInReferer) {
      response.cookies.set(cookieName, lngInReferer);
    }
    return response;
  }

  return await withAuthMiddleware(req, event);
}
