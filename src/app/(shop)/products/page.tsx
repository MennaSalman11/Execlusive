import React from 'react'
// import SectionTitle from './shared/SectionTitle'
import { getProducts } from '@/lib/services/products.services'
import { Star} from 'lucide-react'
import { IProduct } from '@/app/interfaces/product.interface'
import Image from 'next/image';
import { Button } from '@/components/ui/button'
import SectionTitle from '@/components/Home/shared/SectionTitle';
import Link from 'next/link';
import AddToCartBtn from './AddToCartBtn';
import AddToWishlistBtn from './AddToWishlistBtn';
export default async function ProductsPage() {
    const {data: products}:{data:IProduct[]} = await getProducts()
    console.log(products)
  return <>
  <section>
    <div className="mx-auto container">

<SectionTitle title={'Our Products'} subTitle={'Explore Our Products'}/>

 <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-8 gap-y-15 mb-15'>
      {     products && products.map((product)=>(
              <div key={product._id} className=''>
<picture className='relative group overflow-hidden bg-gray-100'>
 <Link href={`/products/${product._id}`}>
    <Image src={product.imageCover} alt={product.title}
width={250}
height={200}
loading='lazy'
className='w-full h-[16.5rem] object-contain '
/>
 </Link>
 <AddToWishlistBtn productId={product._id}/>
<AddToCartBtn productId={product._id} className='bg-black text-white w-full absolute bottom-0 translate-y-full invisible group-hover:translate-y-0 group-hover:visible'/>
 
</picture>
<h3 className='font-medium text-gray-700 line-clamp-1'>
  <Link href={`/products/${product._id}`}>
  {product.title}
  </Link>
  </h3>
<div className="flex justify-between">
    <span className='text-red-500 font-semibold'>{product.price}</span>
    <div className='flex '>
        <Star className='text-yellow-400 fill-yellow-400'/>
        <span className='text-gray-500'>{product.ratingsAverage}</span></div>
</div>
</div>
   ))
}
 </div>

    </div>
    </section>
  </>
}
