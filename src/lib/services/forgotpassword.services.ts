
export async function forgotPassword(email: string) {
  try {
    
    const res = await fetch(
      "https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      }
    );

    const data = await res.json();
    return {
      ok: res.ok,
      status: res.status,
      ...data,
    };
  } catch (error: any) {
    return {
      ok: false,
      status: 500,
      statusMsg: "error",
      message: error.message || "Network error",
    };
  }
}
