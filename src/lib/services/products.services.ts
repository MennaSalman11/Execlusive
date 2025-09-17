export async function getProducts(limit=40) {
   try {
     const response = await fetch(`https://ecommerce.routemisr.com/api/v1/products?limit=${limit}` ,{
      cache:"no-cache"
     })
    if(!response.ok) throw new Error('failed to fetch products')

        const data = response.json();
        return data;
   } catch (error) {
    console.log(error);
    return{error:error as string}
   }
}

export async function getProductDetails(id : string) {
   try {
     const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/products/${id}` ,{
      cache:"no-cache"
     })
    if(!response.ok) throw new Error('failed to fetch products')

        const data = response.json();
        return data;
   } catch (error) {
    console.log(error);
    return{error:error as string}
   }
}