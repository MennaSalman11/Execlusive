import z from "zod"

export const LoginFormSchema = z.object({
email: z.email({message:'please enter valid email address'}),
password: z
.string()
.nonempty({message:'password is required'})
.min(8,{message:'password must be at least 8 charactars'}),
})

export type loginFormPayload =z.infer<typeof LoginFormSchema>