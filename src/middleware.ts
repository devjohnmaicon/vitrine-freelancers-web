import { NextRequest, NextResponse } from "next/server";
import { auth } from "../auth";

const PRIVATE_PATHS = ['/vagas/minhas-vagas']

export async function middleware(request: NextRequest) {
  const {pathname}= request.nextUrl;
  const isPrivate = PRIVATE_PATHS.includes(pathname);

  if (isPrivate) {
    const session = await auth();

    if (!session) {
      return NextResponse.redirect(new URL("/login", request.url));
    }
  }

  return NextResponse.next({});
}

export const config = {
  matcher: "/((?!api|_next/static|_next/image|favicon.ico).*)",
};
