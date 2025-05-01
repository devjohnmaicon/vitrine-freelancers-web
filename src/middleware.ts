import {NextRequest, NextResponse} from "next/server";
import {auth} from "../auth";
import {getToken} from "@auth/core/jwt";


export async function middleware(request: NextRequest) {
    const session = await auth();
    const token = await hasToken(request)
    const headers = new Headers(request.headers);
    // const isAdminUser = request.nextauth.token?.role === 'admin'
    const path = request.nextUrl.pathname
    // console.log(path)
    // const isPublic = path === '/' || path === '/login' || path === '/register' || path === '/vagas' || path === '/vagas/vaga/[id]' || path === '/vagas/vaga/[slug]'
    //     || path === '/sobre' || path === '/contato' || path == '/denied'
    const isPrivate = path.startsWith('/vagas/minhas-vagas')

    if (isPrivate && !session && !token) {
        console.log('middleware -> ', request.nextUrl.pathname)
        return NextResponse.redirect(new URL('/denied', request.url))
    }

    if (isPrivate) {
        request.headers.set('authorization', `Bearer ${token}`)
    }

    // console.log('middleware -> ', request.nextUrl.pathname)
    headers.set("x-current-path", request.nextUrl.pathname)

    return NextResponse.next({headers})
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