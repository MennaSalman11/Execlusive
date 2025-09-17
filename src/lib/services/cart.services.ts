"use server";
import { getUserToken } from "../server-utils";

export async function getUserCart(){
    try {

const {token} =await getUserToken();
console.log('tokeeeen is :' , token);

        const res = await fetch(`https://ecommerce.routemisr.com/api/v1/cart`,{
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

export async function removeUserCart() {
  try {
    const {token} = await getUserToken();

    const res = await fetch(`https://ecommerce.routemisr.com/api/v1/cart`, {
      method: "DELETE",
      headers: {
        token: token as string,
      },
      cache: "no-store",
    });

    const data = await res.json();
    console.log("removeUserCart response:", data);

    if (res.ok && (data.status === "success" || data.message === "success")) {
      return {
        data: data.data,
        success: true,
        message: "removed successfully",
      };
    }

    if (res.ok) {
      return {
        data: data.data,
        success: true,
        message: "removed successfully (fallback)",
      };
    }

    return {
      data: null,
      success: false,
      message: data.message || "removing failed",
    };
  } catch (error) {
    console.error("Error in removeUserCart:", error);
    return {
      data: null,
      success: false,
      message: "unexpected error",
    };
  }
}


export async function addToCart(productId:string){
    try {

const {token} =await getUserToken();
console.log('tokeeeen is :' , token);

        const res = await fetch(`https://ecommerce.routemisr.com/api/v1/cart`,{
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

export async function removeFromCart(productId: string) {
  try {
    const { token} = await getUserToken();
    console.log("tokeeeen is:", token);

    const res = await fetch(`https://ecommerce.routemisr.com/api/v1/cart/${productId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        token: token as string,
      },
      cache: "no-store",
    });

    const data = await res.json();
    console.log("removeFromCart response:", data);


    if (res.ok && (data.status === "success" || data.message === "success")) {
      return {
        data: data.data,
        success: true,
        message: "item removed successfully",
      };
    }


    if (res.ok) {
      return {
        data: data.data,
        success: true,
        message: "item removed (fallback)",
      };
    }

    return {
      data: null,
      success: false,
      message: data.message || "removing failed",
    };
  } catch (error) {
    console.error("Error in removeFromCart:", error);
    return {
      data: null,
      success: false,
      message: "unexpected error",
    };
  }
}


export async function updateQtyProductCart(productId:string , count:number){
    try {

const {token} =await getUserToken();
console.log('tokeeeen is :' , token);

        const res = await fetch(`https://ecommerce.routemisr.com/api/v1/cart/${productId}`,{
            method:'PUT',
            headers:{
                "Content-Type":'application/json',
                                token:token as string
            }, body: JSON.stringify({count})
         
            
        });

        const data= await res.json();
        console.log(data);
        
        if(!res.ok){
           return {
           data:null ,
           success:false ,
           message:data.message ||'updating faild'
        }
            
        }
        return {
           data:data ,
           success:true ,
           message:data.message ||'updating successfly'
        };
    
        
    } catch (error) {
        console.log(error);
        
    }
}