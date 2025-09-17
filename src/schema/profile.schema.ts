import z from "zod"

export const ProfileFormSchema = z.object({
    details: z.string()
    .nonempty({message:'details is required'}),
 city: z.string()
    .nonempty({message:'city is required'}),
phone:z.string()
.regex(/^01[0-25][0-9]{8}$/ ,{message:'invalid phone number'})
.nonempty({message:'phone is required'}), 
})


export type ProfileFormType =z.infer<typeof ProfileFormSchema>


export  const profileFormState ={
success:false ,
error:{
 details:[],
    city:[],
    phone:[] ,
   
},
message:null
  }
export type profileFormStateType={
  success:boolean ,
  error :{
     details?:[],
    city?:[],
    phone?:[] ,

  } ,
  message: string | null
}