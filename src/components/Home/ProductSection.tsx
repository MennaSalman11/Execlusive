import React from 'react'
import SectionTitle from './shared/SectionTitle'
import { getProducts } from '@/lib/services/products.services'
import { IProduct } from '@/app/interfaces/product.interface'
import { Button } from '../ui/button'
import Link from 'next/link'
import ProductItem from '@/components/ProductItem/ProductItem'
export default async function ProductSection() {
    const {data: products}:{data:IProduct[]} = await getProducts(8)
    console.log(products)
  return <>
  <section>
    <div className="mx-auto container">

<SectionTitle title={'Our Products'} subTitle={'Explore Our Products'}/>

 <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-8 gap-y-15 mb-15'>
      {     products && products.map((product)=>(

<ProductItem product={product} key={product._id}/>


   ))
   
}
 </div>


<div className="flex justify-center">
    <Button variant={'destructive'} asChild>
  <Link href={'/products'}>View All Products</Link>
</Button>
</div>
    </div>
    </section>
  </>
}
