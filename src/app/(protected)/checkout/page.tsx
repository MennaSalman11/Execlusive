"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"

import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from '@/components/ui/input'
import { toast } from "sonner"
import { useRouter } from 'next/navigation'
// import {  formState, RegisterFormSchema, RegisterSchema } from "@/schema/register.schema"
import { useActionState, useEffect } from "react"
import { handlePayment } from "@/lib/services/order.service"
import { useCart } from "@/context/CartContext"
import {
  RadioGroup,
  RadioGroupItem,
} from "@/components/ui/radio-group"
import { addressCheckoutFormState, AdressCheckoutFormSchema, AdressCheckoutFormType } from "@/schema/addressCheckout.schema"



export default function CheckoutrPage() {
  const { cartDetails, setCartDetails } = useCart();
  const [action, formAction] = useActionState(handlePayment, addressCheckoutFormState)
  const router = useRouter()
  const form = useForm<AdressCheckoutFormType>({
    resolver: zodResolver(AdressCheckoutFormSchema),
    defaultValues:
    {
      cartId: '',
      details: '',
      city: '',
      phone: '',
      paymentMethod: 'cash'
    }
  });

  useEffect(() => {

    if (cartDetails) {
      form.setValue('cartId', cartDetails.cartId)
    }
  }, [cartDetails])


  console.log('action is', action);
  useEffect(() => {
    let timeout: NodeJS.Timeout;
    if (action) {
      if (action.success && action.message) {


        if (action.paymentMethod === 'cash') {
          toast.success(action.message, { position: 'top-center' });
          setCartDetails(null)
          timeout = setTimeout(() => {
            router.push(action.callbackUrl)
          }, 2000);
        } else if (!action.success && action.message) {
          toast.error(action.message, { position: 'top-center' })
        }
        else {
          window.location.href = action.callbackUrl;
        }
      }
    }
    return () => {
      if (timeout) {
        clearTimeout(timeout)
      }
    }
  }, [action, router])


  return (
    <section className="py-20">
      <div className="max-w-lg mx-auto">
        <h1 className="font-bold text-2xl mb-8">Checkout Page</h1>


        <Form {...form} >
          <form action={formAction} className="space-y-8">


            {/* *************cartID************ */}
            <FormField
              control={form.control}
              name="cartId"
              render={({ field }) => (
                <FormItem hidden>

                  <FormControl>
                    <Input {...field} value={cartDetails?.cartId} hidden />
                  </FormControl>


                </FormItem>
              )}
            />

            {/* *************name************ */}
            <FormField
              control={form.control}
              name="details"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Adderss Details</FormLabel>
                  <FormControl>
                    <Input placeholder="..." {...field} />
                  </FormControl>

                  <FormMessage>
                    {action?.error?.details?.[0]}
                  </FormMessage>
                </FormItem>
              )}
            />



            {/* *************city************ */}
            <FormField
              control={form.control}
              name="city"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>City</FormLabel>
                  <FormControl>
                    <Input placeholder="cairo" {...field} />
                  </FormControl>

                  <FormMessage>
                    {action?.error?.city?.[0]}
                  </FormMessage>
                </FormItem>
              )}
            />


            {/* **********phone******** */}

            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Phone</FormLabel>
                  <FormControl>
                    <Input placeholder="********" {...field}
                      type="tel" />
                  </FormControl>

                  <FormMessage>{action.error?.phone?.[0]}</FormMessage>{" "}
                </FormItem>
              )}
            />

            {/* **********PaymentMethod******** */}

            <FormField
              control={form.control}
              name="paymentMethod"
              render={({ field }) => (
                <FormItem className="space-y-3">

                  <FormControl>
                    <RadioGroup
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      name={field.name}
                      className="flex flex-col"
                    >
                      <FormItem className="flex items-center gap-3">
                        <FormControl>
                          <RadioGroupItem value="cash" />
                        </FormControl>
                        <FormLabel className="font-normal">
                          Cash
                        </FormLabel>
                      </FormItem>
                      <FormItem className="flex items-center gap-3">
                        <FormControl>
                          <RadioGroupItem value="card" />
                        </FormControl>
                        <FormLabel className="font-normal">
                          Card                    </FormLabel>
                      </FormItem>
                    </RadioGroup>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type="submit">Submit</Button>
          </form>
        </Form>
      </div>
    </section>
  )
}