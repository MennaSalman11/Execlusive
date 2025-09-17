import z from "zod"

export const AdressCheckoutFormSchema = z.object({
      cartId: z.string()
    .nonempty({message:'CartId is required'}),
    details: z.string()
    .nonempty({message:'details is required'}),
 city: z.string()
    .nonempty({message:'city is required'}),
phone:z.string()
.regex(/^01[0-25][0-9]{8}$/ ,{message:'invalid phone number'})
.nonempty({message:'phone is required'}),
paymentMethod:z.enum(['cash' , 'card'],{
    message:'payment is required'
})

})


export type AdressCheckoutFormType =z.infer<typeof AdressCheckoutFormSchema>


export  const addressCheckoutFormState ={
success:false ,
error:{
  cartId:[],
    details:[],
    city:[],
    phone:[] ,
    paymentMethod:[],

},
message:null
  }
export type addressCheckoutFormStateType={
  success:boolean ,
  error :{
    cartId?:string[],
 details?:string[],
    city?:string[],
    phone?:string[] ,
    paymentMethod?:[]
  } ,
  message: string | null
}