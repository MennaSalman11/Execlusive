"use client";
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { AlertCircleIcon, BadgeCheckIcon, CheckIcon, X } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { useCart } from "@/context/CartContext"
import { authOptions } from "@/lib/auth"
import { getUserCart, removeFromCart, removeUserCart, updateQtyProductCart } from "@/lib/services/cart.services"
import { getServerSession } from "next-auth"
import Image from "next/image"
import Link from "next/link"
import { toast } from "sonner";

export default function CartPage() {
  const { cartDetails, setCartDetails } = useCart()

  async function removeCartItems() {
    const res = await removeUserCart();
    if (res.success) {
      toast.success('item deleted successfly',
        { position: 'top-center' }
      );
    } else {
      toast.error(res?.message || 'item deletion failed', {
        position: 'top-center'
      });
    }
  }
  async function removeProductFromCart(productId: string) {

    const res = await removeFromCart(productId);
    console.log(res?.data);
    if (res.success) {
      toast.success('item removed successfly', { position: 'top-center' })
      setCartDetails(res?.data)
    }
    else {
      toast.error('item removed failed', { position: 'top-center' })
    }


  }

  async function updateProductQtyFromCart(productId: string, count: number) {

    const res = await updateQtyProductCart(productId, count);
    console.log(res?.data);
    if (res?.success) {
      toast.success('item updating successfly', { position: 'top-center' })
      setCartDetails(res.data)
    }
    else {
      toast.error('item updating failed', { position: 'top-center' })
    }


  }


  return (
    <section className="py-20">
      <div className="container mx-auto">
        {cartDetails &&
          (<>
            <section className="mb-6">
              <Table className="mb-6">
                <TableHeader>
                  <TableRow>
                    <TableHead>Product</TableHead>
                    <TableHead>Price</TableHead>
                    <TableHead>Quanity</TableHead>
                    <TableHead className="text-right">SubTotal</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {
                    cartDetails.data?.products?.map((product) =>
                    (
                      <TableRow key={product._id}>
                        <TableCell className="font-medium">
                          <div className="flex gap-5">
                            <Badge
                              onClick={() => removeProductFromCart(product.product._id)}
                              className="h-5 min-w-5 rounded-full px-1 font-mono tabular-nums"
                              variant={'destructive'}
                            >
                              <X />
                            </Badge>


                            <Image
                              src={product.product.imageCover}
                              alt={product.product.title}
                              width={54}
                              height={54} />
                            <h2>{product.product.title}</h2>
                          </div>
                        </TableCell>
                        <TableCell>{product.price}</TableCell>
                        <TableCell>
                          <div className="flex items-center gap-3">
                            <Button variant={'outline'} size={'sm'}
                              onClick={() => { updateProductQtyFromCart(product.product._id, product.count - 1) }}
                            >-</Button>
                            {product.count}

                            <Button variant={'outline'} size={'sm'}
                              onClick={() => { updateProductQtyFromCart(product.product._id, product.count + 1) }}
                            >+</Button>
                          </div>
                        </TableCell>
                        <TableCell className="text-right">{product.price * product.count}</TableCell>
                      </TableRow>
                    ))
}
                </TableBody>
              </Table>
              <div className="flex justify-between">

                <Button variant={'outline'}>
                  <Link href='/products'>Return shop</Link>
                </Button>
                <Button variant={'destructive'}
                  onClick={removeCartItems}
                >
                  Remove All
                </Button>
              </div>
            </section>

            <section className="flex justify-between">
              <div className="flex items-center gap-4 w-5/12">
                <Input placeholder="Coupon Code" />
                <Button variant={'destructive'}>Apply Coupon</Button>
              </div>
             { cartDetails.data?.products?.map((product) =>(
<div className="w-5/12 py-8 px-6 border border-gray-950">
                <h3 className="font-bold text-xl mb-6">Cart Total</h3>
                <ul className="divide-y divide-gray-900">
                  <li className="py-6 flex justify-between">
                    <span>SubTotal:</span>
                    <span>1{product.price} EGP</span>
                  </li>
                  <li className="py-6 flex justify-between">
                    <span>Shipping:</span>
                    <span>free</span>
                  </li>
                  <li className="py-6 flex justify-between">
                    <span>Total:</span>
                    <span>{product.count * product.price}EGP</span>
                  </li>
                </ul>
                <div className="flex justify-center">
                  <Button variant={'destructive'} asChild>
                    <Link href={'/checkout'}>
                      Proceed to Checkout
                    </Link>

                  </Button>
                </div>
              </div>
             ))}
              
            </section>
          </>)
        }
      </div>
    </section>

  )
}
