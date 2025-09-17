"use client";
import { IWishlistResponse } from "@/app/interfaces/wishlist.interface";
import { getUserWishlist } from "@/lib/services/wishlist.services";
import { createContext, useContext, useEffect, useState } from "react";

interface IWishlistContext{
    wishlistDetails: IWishlistResponse| null;
    setWishlistDetails:React.Dispatch<React.SetStateAction<IWishlistResponse | null>>
    getWishlistDetails:() => Promise<IWishlistResponse | null>
}

const WishlistContext =createContext<IWishlistContext | null>(null);
import React from 'react'


export function WishlistContextProvider({children}:{children: React.ReactNode}) {
const [wishlistDetails, setWishlistDetails] = useState<IWishlistResponse | null>(null)
   

async function getWishlistDetails() {
     const wishlist = await getUserWishlist();
     if (wishlist) {
       setWishlistDetails(wishlist);
       return wishlist;
     }
     return null;
   }
 
  useEffect(() => {
     getWishlistDetails();
     }, [])
     
    

   
  return (
    <WishlistContext.Provider value={{wishlistDetails , setWishlistDetails  , getWishlistDetails}}>
        {children}
    </WishlistContext.Provider>
  )
}
export function useWishlist(){
    const context =useContext(WishlistContext)
if(!context){
    throw new Error('useCart must be used within a cartcontextprovider')
}
    return context
}