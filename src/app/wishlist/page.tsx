"use client";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Button } from '@/components/ui/button';
import { useWishlist } from '@/context/WishlistContext';
import { getUserWishlist, removeFromWishlist } from '@/lib/services/wishlist.services'
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import Image from 'next/image';
import React from 'react'
import { X } from "lucide-react";
import { toast } from "sonner";

export default function WishlistPage() {

  const { wishlistDetails, setWishlistDetails } = useWishlist()


  async function removeProductFromWishlist(productId: string) {

    const res = await removeFromWishlist(productId);
    console.log(res?.data);
    if (res?.success) {
      toast.success('item removed successfly', { position: 'top-center' })
      const updated = await getUserWishlist();
      setWishlistDetails(updated);
    }
    else {
      toast.error('item removed failed', { position: 'top-center' })
    }


  }



  return (
    <section className="py-20">
      <div className="container mx-auto">
        {wishlistDetails &&

          <section className="mb-6">
            <Table className="mb-6">
              <TableHeader>
                <TableRow>
                  <TableHead>Product</TableHead>

                  <TableHead className="text-right">SubTotal</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {
                  wishlistDetails.data?.map((product) =>
                  (
                    <TableRow key={product._id}>
                      <TableCell className="font-medium">

                        <div className="flex gap-5">
                          <Badge
                            onClick={() => removeProductFromWishlist(product._id)}
                            className="h-5 min-w-5 rounded-full px-1 font-mono tabular-nums"
                            variant={'destructive'}
                          >
                            <X />
                          </Badge>


                          <Image
                            src={product.imageCover}
                            alt={product.title}
                            width={54}
                            height={54} />
                          <h2>{product.title}</h2>
                        </div>
                      </TableCell>
                      <TableCell className="text-right">{product.price}</TableCell>
                    </TableRow>
                  ))
                }
              </TableBody>
            </Table>


            <div className="flex justify-between">

              <Button variant={'outline'}>
                <Link href='/products'>Return shop</Link>
              </Button>

            </div>
          </section>
        }
      </div>
    </section>

  )


}
