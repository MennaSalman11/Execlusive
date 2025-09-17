"use server";

import { ProfileFormType } from "@/schema/profile.schema";
import { getUserToken } from "../server-utils";

export async function saveUserAddress(address: {
  details: string;
  city: string;
  phone: string;
}) {
  try {
    const {token }= await getUserToken();

    const res = await fetch("https://ecommerce.routemisr.com/api/v1/addresses", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        token: token as string,
      },
      body: JSON.stringify(address),
    });

    const data = await res.json();

    if (!res.ok) {
      throw new Error(data.message || "Failed to save address");
    }

    return { success: true, data };
  } catch (error) {
    console.error("Error saving address:", error);
    return { success: false, error: "Something went wrong" };
  }
}

export async function getAddress() :Promise<{
  success: boolean;
  data?: ProfileFormType[];
  error?: string;
}> {
  try {
    const {token }= await getUserToken();

    const res = await fetch("https://ecommerce.routemisr.com/api/v1/addresses", {
      headers: {
        "Content-Type": "application/json",
        token: token as string,
      }
    });

    const data = await res.json();

    if (!res.ok) {
      throw new Error(data.message || "Failed to save address");
    }

       return { success: true, data };
  } catch (error) {
    console.error("Error fetching addresses:", error);
    return { success: false, error: " failed to fetch address" };
  }
}



export async function deleteAddress(addressId: string) {
   
  try {
    const {token }= await getUserToken();

    const res = await fetch(`https://ecommerce.routemisr.com/api/v1/addresses/${addressId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        token: token as string,
      }
    });

    const data = await res.json();

    if (!res.ok) {
      throw new Error("Failed to delete address");
    }

    return { success: true };
  } catch (error) {
    console.error("Error deleting address:", error);
  }
}
