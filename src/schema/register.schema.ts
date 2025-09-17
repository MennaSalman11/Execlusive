import z from "zod"

export const RegisterFormSchema = z.object({
  name: z.string().nonempty({ message: "name is required" }),
  email: z.string().email({ message: "please enter valid email address" }),
  password: z
    .string()
    .nonempty({ message: "password is required" })
    .min(8, { message: "password must be at least 8 characters" }),
  rePassword: z
    .string()
    .nonempty({ message: "password is required" })
    .min(8, { message: "password must be at least 8 characters" }),
  phone: z
    .string()
    .regex(/^01[0-25][0-9]{8}$/, { message: "invalid phone number" })
    .nonempty({ message: "phone is required" }),
}).refine((data) => data.password === data.rePassword, {
  message: "password not match",
  path: ["rePassword"],
})

export type RegisterSchema = z.infer<typeof RegisterFormSchema>

export const formState = {
  success: false,
  error: {},
  message: null,
}

export type formStateType = {
  success: boolean
  error: {
    name?: string[]
    email?: string[]
    password?: string[]
    rePassword?: string[]  
    phone?: string[]
  }
  message: string | null
}
