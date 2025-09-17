export async function getCategories() {
   try {
     const response = await fetch(`https://ecommerce.routemisr.com/api/v1/categories`)
    if(!response.ok) throw new Error('failed to fetch categories')

        const data = response.json();
        return data;
   } catch (error) {
    console.log(error);
    return{error:error as string}
   }
}

export async function getSubCategories() {
   try {
     const response = await fetch(`https://ecommerce.routemisr.com/api/v1/subcategories`)
    if(!response.ok) throw new Error('failed to fetch categories')

        const data = response.json();
        return data;
   } catch (error) {
    console.log(error);
    return{error:error as string}
   }
}

