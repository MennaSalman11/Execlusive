
"use client";

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

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
import { toast } from "sonner"
import { useRouter } from "next/navigation"
import { formState, RegisterFormSchema, RegisterSchema } from "@/schema/register.schema"
import { handleRegister } from "@/lib/services/register.services"
import { useActionState, useEffect } from "react"

export default function RegisterPage() {
  const [action, formAction] = useActionState(handleRegister, formState)
  const router = useRouter()

  const form = useForm<RegisterSchema>({
    resolver: zodResolver(RegisterFormSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      rePassword: "",
      phone: "",
    },
  })

  useEffect(() => {
    if (action) {
      if (!action.success && action.message) {
        toast.error(action.message, {
          position: "top-center",
        })
      }
      if (action.success && action.message) {
        toast.success(action.message, {
          position: "top-center",
        })
        router.push("/login")
      }
    }
  }, [action, router])

  return (
    <section className="py-20">
      <div className="max-w-lg mx-auto">
        <h1 className="font-bold text-2xl mb-8">Register Page</h1>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit((data) => {
              const formData = new FormData()
              Object.entries(data).forEach(([key, value]) => {
                formData.append(key, value as string)
              })
              formAction(formData)
            })}
            className="space-y-8"
          >
            {/* *************name************ */}
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input placeholder="menna" {...field} />
                  </FormControl>
                  <FormMessage>{action?.error?.name?.[0]}</FormMessage>
                </FormItem>
              )}
            />

            {/* *************email************ */}
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="menna@gmail.com" {...field} type="email" />
                  </FormControl>
                  <FormMessage>{action?.error?.email?.[0]}</FormMessage>
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
                    <Input placeholder="********" {...field} autoComplete="off" type="password" />
                  </FormControl>
                  <FormMessage>{action?.error?.password?.[0]}</FormMessage>
                </FormItem>
              )}
            />

            {/* **********confirm password******** */}
            <FormField
              control={form.control}
              name="rePassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Confirm Password</FormLabel>
                  <FormControl>
                    <Input placeholder="********" {...field} autoComplete="off" type="password" />
                  </FormControl>
                  <FormMessage>{action?.error?.rePassword?.[0]}</FormMessage>
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
                    <Input placeholder="********" {...field} type="tel" />
                  </FormControl>
                  <FormMessage>{action?.error?.phone?.[0]}</FormMessage>
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
