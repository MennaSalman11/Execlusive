"use server"
import { decode } from "next-auth/jwt";
import { cookies } from "next/headers";
export async function getUserToken(){
 const cookieStore =await cookies() 
           const encodedToken= cookieStore.get('next-auth.session-token')?.value || 
                              cookieStore.get('__Secure-next-auth.session-token')?.value

    const decodedToken = await decode({token: encodedToken ,
        secret :process.env.AUTH_SECRET!})
       console.log('decoded token :' , decodedToken!.token);
      console.log('decoded tokennnnnnn :' , decodedToken);
       
   return {
    token: decodedToken?.token as string, 
    userId: decodedToken?.sub as string,  
    user: decodedToken,                  
  };
}