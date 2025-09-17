import { IProduct } from '@/app/interfaces/product.interface';
import ProductSlider from '@/components/ProductItem/ProductSlider';
import { Button } from '@/components/ui/button';
import { addToCart } from '@/lib/services/cart.services';
import { getProductDetails } from '@/lib/services/products.services'
import { Star } from 'lucide-react';
import Image from 'next/image';
import React from 'react'
import AddToCartBtn from '../AddToCartBtn';


export default async function ProductDetails({ params: { productId } }: { params: { productId: string } }) {

    const { data: product }: { data: IProduct } = await getProductDetails(productId)
    console.log(product);



    return <>
        <section className='py-20'>
            <div className="container mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-12">
                    <div className='lg:col-span-2'>
                        <ProductSlider images={product.images} />
                    </div>
                    <div className='lg:col-span-1'>
                        <h1 className='font-semibold text-2xl mb-4'>{product.title}</h1>
                        <div className='flex mb-4'>
                            <Star className='text-yellow-400 fill-yellow-400' />
                            <span className='text-gray-500'>{product.ratingsAverage}</span>
                        </div>


                        <span className='text-2xl mb-6 block'>{product.price}</span>
                        <p className='text-sm border-b border-b-gray-500 pb-6 mb-6'>{product.description}</p>
                        {/*  */}
                        <AddToCartBtn productId={product._id} className=' text-white w-full bg-red-700' />

                    </div>

                </div>
            </div>
        </section>
    </>
}
