import { NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

export async function middleware(req:any) {
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

  const isAuth = !!token;
  const isLoginPage = req.nextUrl.pathname === "/signin";

  // Not authenticated → redirect to login
  if (!isAuth && !isLoginPage) {
    return NextResponse.redirect(new URL("/signin", req.url));
  }

  // Already authenticated → avoid login/register pages
  if (isAuth && isLoginPage) {
    return NextResponse.redirect(new URL("/home", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/home/:path*",  // protect dashboard routes
    "/problems/:path*",
    "/contest/:path*",
    "/settings"
  ],
};
