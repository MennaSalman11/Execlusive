
export async function getBrands(){
    try {
        const res = await fetch(`https://ecommerce.routemisr.com/api/v1/brands`)
        if(!res.ok){throw new Error('failed to fetch brands')}
        const data = res.json();
        
        return data;
        

    } catch (error) {
        console.log(error);
        
    }
}
export async function getSpecificBrand(brandId: string) {
  const res = await fetch(`https://ecommerce.routemisr.com/api/v1/products?brand=${brandId}`, {
    cache: "no-store",
  });

  if (!res.ok) {
    console.log("Response status:", res.status);
    // throw new Error("Failed to fetch brand products");
  }

  return res.json();
}
