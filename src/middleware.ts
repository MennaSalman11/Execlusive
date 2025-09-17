
import { getToken } from 'next-auth/jwt'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
 
// This function can be marked `async` if using `await` inside
export async function middleware(request: NextRequest) {
    const token =await  getToken({req: request})
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
