"use server";


import { formStateType, RegisterFormSchema } from "@/schema/register.schema"

export async function handleRegister(
  prevState: formStateType,
  formData: FormData
): Promise<formStateType> {
  const formValues = {
    name: formData.get("name"),
    email: formData.get("email"),
    password: formData.get("password"),
    rePassword: formData.get("rePassword"),
    phone: formData.get("phone"),
  }

  const parseData = RegisterFormSchema.safeParse(formValues)
  if (!parseData.success) {
    return {
      success: false,
      error: parseData.error.flatten().fieldErrors,
      message: null,
    }
  }

  try {
    const res = await fetch("https://ecommerce.routemisr.com/api/v1/auth/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(parseData.data), // ✅ نستخدم الداتا المتفلترة
    })

    const data = await res.json()
    console.log("API response:", data)

    if (!res.ok) {
      return {
        success: false,
        error: {},
        message: data.message || "Failed to register",
      }
    }

    return {
      success: true,
      error: {},
      message: data.message || "Account created successfully",
    }
  } catch (error) {
    console.error("Error in handleRegister:", error)
    return {
      success: false,
      error: {},
      message: "Something went wrong, please try again",
    }
  }
}