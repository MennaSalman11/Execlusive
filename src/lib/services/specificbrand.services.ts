

export async function getSpecificBrand({brandId}:{brandId :string}){
    try {
        const res = await fetch(`https://ecommerce.routemisr.com/api/v1/brands/${brandId}`)
        if(!res.ok){throw new Error('failed to fetch brands')}
        const data = res.json();
        
        return data;
        

    } catch (error) {
        console.log(error);
        
    }
}