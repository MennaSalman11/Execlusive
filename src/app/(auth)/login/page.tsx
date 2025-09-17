"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"

import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { loginFormPayload, LoginFormSchema } from "@/schema/login.schema"
import { signIn } from 'next-auth/react'
import { toast } from "sonner"
import { useRouter } from 'next/navigation'
import Link from "next/link"


export default function LoginPage() {

  const router = useRouter()
  const form = useForm<loginFormPayload>({ resolver: zodResolver(LoginFormSchema), defaultValues: { email: '', password: '' } })

  async function onSubmit(values: loginFormPayload) {
    console.log(values);
    // handle login

    try {
      const res = await signIn('credentials', {
        email: values.email,
        password: values.password,
        redirect: false,
        callbackUrl: '/'
      });

      console.log(res);
      if (res?.ok) {
        toast.success("login successfly", {
          position: 'top-center'
        })
        router.push('/')
      } else {
        toast.error(res?.error || "something went wrong", {
          position: 'top-center'
        })
      }
    } catch (error) {
      console.log(error);

    }
  }

  return (
    <section className="py-20">
      <div className="max-w-lg mx-auto">
        <h1 className="font-bold text-2xl mb-8">Login Page</h1>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">



            {/* *************email************ */}
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="menna@gmail.com" {...field} />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />

            {/* **********password******** */}

            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input placeholder="********" {...field} />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type="submit">Submit</Button>
            <Link href="/forget-password" className="text-blue-500 hover:underline text-sm block">
              Forget Password?
            </Link>
          </form>
        </Form>
      </div>
    </section>
  )
}