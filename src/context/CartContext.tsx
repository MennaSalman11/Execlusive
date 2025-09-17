"use client";
import { ICartResponse } from "@/app/interfaces/cart.interface";
import { getUserCart } from "@/lib/services/cart.services";
import { createContext, useContext, useEffect, useState } from "react";

interface ICartContext{
    cartDetails: ICartResponse| null;
    setCartDetails:React.Dispatch<React.SetStateAction<ICartResponse | null>>
    getCartDetails:() => Promise<ICartResponse | null>
}

const CartContext =createContext<ICartContext | null>(null);
import React from 'react'


export function CartContextProvider({children}:{children: React.ReactNode}) {
 const [cartDetails, setCartDetails] = useState<ICartResponse | null>(null)

 
   async function getCartDetails() {
    const cart = await getUserCart();
    if (cart) {
      setCartDetails(cart);
      return cart;
    }
    return null;
  }

 useEffect(() => {
    getCartDetails();
    }, [])
    
   
  return (
    <CartContext.Provider value={{cartDetails , setCartDetails , getCartDetails}}>
        {children}
    </CartContext.Provider>
  )
}
export function useCart(){
    const context =useContext(CartContext)
if(!context){
    throw new Error('useCart must be used within a cartcontextprovider')
}
    return context
}