import { getUserToken } from "../server-utils";
export async function changePassword(
  currentPassword: string,
  password: string,
  rePassword: string,
//   token: string
) {
    const {token} =await getUserToken();
    console.log('tokeeeen is :' , token);
  try {
    const res = await fetch(
      "https://ecommerce.routemisr.com/api/v1/users/changeMyPassword",
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          token:token as string 
        },
        body: JSON.stringify({
          currentPassword,
          password,
          rePassword,
        }),
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
