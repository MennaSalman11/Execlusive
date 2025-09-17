import z from "zod"

export const AdressFormSchema = z.object({
      cartId: z.string()
    .nonempty({message:'CartId is required'}),
    details: z.string()
    .nonempty({message:'details is required'}),
 city: z.string()
    .nonempty({message:'city is required'}),
phone:z.string()
.regex(/^01[0-25][0-9]{8}$/ ,{message:'invalid phone number'})
.nonempty({message:'phone is required'}),

})


export type AdressFormType =z.infer<typeof AdressFormSchema>


export  const addressFormState ={
success:false ,
error:{
  cartId:[],
    details:[],
    city:[],
    phone:[] ,

},
message:null
  }
export type addressFormStateType={
  success:boolean ,
  error :{
 details:[],
    city:[],
    phone:[] ,
  } ,
  message: string | null
}