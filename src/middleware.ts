
import { getToken } from 'next-auth/jwt'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export async function middleware(request: NextRequest) {
  const cookieName =
  process.env.NODE_ENV ==='production'
  ? "__Secure-next-auth.session-token"
  : "next-auth.session-token";
    const token =await  getToken({req: request , cookieName})
    const {pathname} =request.nextUrl;

    const authRoutes =['/login' , '/register']
    const proutectedRoutes =['/cart' , '/checkout' , '/profile']

    if(token && authRoutes.includes(pathname) ){
      return NextResponse.redirect(new URL('/' , request.url))
    }
    if(!token && proutectedRoutes.includes(pathname) ){
      return NextResponse.redirect(new URL('/login' , request.url))
    }

}
export const config = {
  matcher: ['/cart' ,'/login' , '/register'],
}
