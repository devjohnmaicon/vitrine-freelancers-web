import {NextRequest, NextResponse} from "next/server";
import {auth} from "../auth";
import {getToken} from "@auth/core/jwt";


export async function middleware(request: NextRequest) {
    const session = await auth();
    const token = await hasToken(request)
    console.log(session)
    // const isAdminUser = request.nextauth.token?.role === 'admin'
    const path = request.nextUrl.pathname
    const isPublic = path === '/' || path === '/login' || path === '/register' || path === '/vagas' || path === '/vagas/[id]'
        || path === '/sobre' || path === '/contato' || path == '/denied'

    if (!isPublic && !session && !token) {
        return NextResponse.redirect(new URL('/denied', request.url))
    }

    if (!isPublic) {
        request.headers.set('authorization', `Bearer ${token}`)
    }

    return NextResponse.next()
}

export const config = {
    matcher: "/((?!api|_next/static|_next/image|favicon.ico).*)",
};

async function hasToken(request: NextRequest) {
    return await getToken({
            req: request,
            secret: process.env.NEXTAUTH_SECRET,
            raw: true,
        }
    ).then((token) => {
        return token
    }).catch((error) => {
            console.error("Error getting token:", error);
            return null;
        }
    )
}