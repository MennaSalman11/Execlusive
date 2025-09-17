"use server";
import { getUserToken } from "../server-utils";

export async function getUserWishlist(){
    try {

const {token} =await getUserToken();
console.log('tokeeeen is :' , token);

        const res = await fetch(`https://ecommerce.routemisr.com/api/v1/wishlist`,{
            headers:{
                token:token as string
            },
        });

        const data= await res.json();
        if(!res.ok){
            throw new Error(data.message || 'something went wrong')
            
        }
        return data;
    } catch (error) {
        console.log(error);
        
    }
}

export async function addToWishlist(productId:string){
    try {

const {token} =await getUserToken();
console.log('tokeeeen is :' , token);

        const res = await fetch(`https://ecommerce.routemisr.com/api/v1/wishlist`,{
            method:'POST',
            headers:{
                "Content-Type":'application/json',
                                token:token as string
            },
            body: JSON.stringify({productId})
            
        });

        const data= await res.json();
        console.log(data);
        
        if(!res.ok){
           return {
           data:null ,
           success:false ,
           message:data.message ||'adding faild'
        }
            
        }
        return {
           data:data ,
           success:true ,
           message:data.message ||'adding successfly'
        };
    
        
    } catch (error) {
        console.log(error);
        
    }
}
export async function removeFromWishlist(productId:string){
    try {

const {token} =await getUserToken();
console.log('tokeeeen is :' , token);

        const res = await fetch(`https://ecommerce.routemisr.com/api/v1/wishlist/${productId}`,{
            method:'DELETE',
            headers:{
                "Content-Type":'application/json',
                                token:token as string
            },
            
        });

        const data= await res.json();
        console.log(data);
        
        if(!res.ok){
           return {
           data:null ,
           success:false ,
           message:data.message ||'adding faild'
        }
            
        }
        return {
           data:data ,
           success:true ,
           message:data.message ||'adding successfly'
        };
    
        
    } catch (error) {
        console.log(error);
        
    }
}
