
"use client";
import { Button } from '@/components/ui/button'
import { useCart } from '@/context/CartContext';
import { addToCart } from '@/lib/services/cart.services'
import { LoaderCircle } from 'lucide-react';
import React, { useTransition } from 'react'
import { toast } from 'sonner';

export default function AddToCartBtn({ productId, ...props }: {
    productId: string;
    [key: string]: string;
}) {
    const [isPending, startTransition] = useTransition()
    const { setCartDetails, getCartDetails } = useCart();

    async function addProductToCart(productId: string) {
        startTransition(async () => {
            const res = await addToCart(productId)
            console.log(res);
            if (res?.success) {
                toast.success('product added successfly',
                    {
                        position: 'top-center'
                    })
                const updateData = await getCartDetails();
                console.log(updateData);

            }
            else {
                toast.error('product addition failed',
                    {
                        position: 'top-center'
                    }
                )
            }
        })

    }
    return <>

        <Button className='w-full' variant={'destructive'}
            onClick={() => { addProductToCart(productId) }}
            {...props}
            disabled={isPending}>
            {isPending ? <LoaderCircle className='animate-spin' /> : ' Add to Cart'}
        </Button>
    </>
}
