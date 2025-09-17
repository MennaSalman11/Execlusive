
"use server";
import { addressFormStateType, AdressFormSchema } from '@/schema/address.schema';
import { getUserToken } from '../server-utils';


export async function handlePayment(
  formState: addressFormStateType ,
  formData:FormData
){
const ShippingAddress ={
  details: formData.get('details'),
  city: formData.get('city'),
  phone: formData.get('phone'),
 }
 const cartId = formData.get('cartId');
 const paymentMethod = formData.get('paymentMethod');
 console.log("payment " , paymentMethod);
 
  const parseData = AdressFormSchema.safeParse({...ShippingAddress , cartId , paymentMethod});
  if (!parseData.success) {
    return {
      success: false,
      error: parseData.error.flatten().fieldErrors,
      message: null,
      callbackUrl:'/cart'
    };
  }

  try {
    const { token } = await getUserToken();
const endpoint = paymentMethod==='cash'
? `api/v1/orders/${cartId}`
: `api/v1/orders/checkout-session/${cartId}?url=${process.env.NEXTAUTH_URL}`
   
    const res = await fetch(
      `${process.env.NEXTAUTH_BASE_URL}/${endpoint}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          token: token as string,
        },
        body: JSON.stringify({
          ShippingAddress,
        }),
      }
    
    );

    const data = await res.json();

    if (!res.ok) {
      return {
        success: false,
        error: {},
        message: data.message || "Payment failed",
        callbackUrl:'/cart' ,
        paymentMethod
      };
    }
    return{
             success: true,
        error: {},
        message: data.message || "Payment success", 
        callbackUrl:paymentMethod==='cash'? '/allorders' : data.session.url ,
        paymentMethod
    }
  }catch(error){
console.log(error);
   return {
        success: false,
        error: {},
        message: error || "Payment failed",
      };
  }
}
export async function getMyOrders() {
  try {
    const { token, userId } = await getUserToken(); 

    if (!token) throw new Error("No token found");
    if (!userId) throw new Error("No userId found");

    const res = await fetch(
      `https://ecommerce.routemisr.com/api/v1/orders/user/${userId}`,
      {
        headers: {
          "Content-Type": "application/json",
          token,
        },
        cache: "no-store", 
      }
    );

    const data = await res.json();
    if (!res.ok) {
      throw new Error(data.message || "Something went wrong");
    }

    console.log("My Orders:", data);
    return {
      success: true,
      data,
    };
  } catch (error) {
    console.error("Error fetching my orders:", error);
    return {
      success: false,
      data: null,
      message: "Failed to fetch my orders",
    };
  }
}


export async function getAllOrders() {
  try {
    const res = await fetch(`https://ecommerce.routemisr.com/api/v1/orders/`, {
      cache: "no-store",
    });

    const data = await res.json();
    if (!res.ok) {
      throw new Error(data.message || "Failed to fetch orders");
    }

    return {
      success: true,
      data,
    };
  } catch (error) {
    console.error("Error fetching all orders:", error);
    return {
      success: false,
      data: null,
      message: "Failed to fetch all orders",
    };
  }
}
