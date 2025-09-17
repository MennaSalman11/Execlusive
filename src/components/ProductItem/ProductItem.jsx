// "use client"

// import React, { useState } from 'react'
import Image from 'next/image';
import { Badge, Heart, Star } from 'lucide-react';
import Link from 'next/link';
import AddToCartBtn from '@/app/(shop)/products/AddToCartBtn';
import AddToWishlistBtn from '@/app/(shop)/products/AddToWishlistBtn'


export default function ProductItem({ product }) {

  return <>

    <div key={product._id} className=''>
      <picture className='relative group overflow-hidden bg-gray-100'>
        <Link href={`/products/${product._id}`}>
          <div className='relative'>
            <Image src={product.imageCover} alt={product.title}
              width={250}
              height={200}
              loading='lazy'
              className='w-full h-[16.5rem] object-contain '
            />

          </div>

        </Link>
         <AddToWishlistBtn productId={product._id}/>
        <AddToCartBtn productId={product._id} className='bg-black text-white w-full absolute bottom-0 translate-y-full invisible group-hover:translate-y-0 group-hover:visible'>Add To Cart</AddToCartBtn>
      </picture>
      <h3 className='font-medium text-gray-700 line-clamp-1'>
        <Link href={`/products/${product._id}`}>
          {product.title}
        </Link>
      </h3>
      <div className="flex justify-between">
        <span className='text-red-500 font-semibold'>{product.price}</span>
        <div className='flex '>
          <Star className='text-yellow-400 fill-yellow-400' />
          <span className='text-gray-500'>{product.ratingsAverage}</span></div>
      </div>
    </div>

  </>
}
