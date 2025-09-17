import { IBrand } from '@/app/interfaces/brand.interface';
import { Button } from '@/components/ui/button';
import { getBrands } from '@/lib/services/brands.services';
import { getSpecificBrand } from '@/lib/services/specificbrand.services';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react'

export default async function BrandsPage() {
  const { data: brands }: { data: IBrand[] } = await getBrands();
  console.log("brands", brands);
  return (
    <section>
      <div className="mx-auto container">
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-8 gap-y-15 mb-15'>
          {brands && brands.map((brand) =>
          (
            <div className='rounded-2xl shadow-2xl' key={brand._id}>
              <Image src={brand.image}
                alt={brand.name}
                width={100}
                height={100}
                loading='lazy'
                className='w-full h-[16.5rem] object-contain ' />
              <Button variant={'link'} className='mb-5 mx-auto flex justify-center' asChild>
                <Link href={`/brands/specificbrand/${brand._id}`}>
                  {brand.name}
                </Link>
              </Button>


            </div>
          ))}
        </div>

      </div>
    </section>
  )
}
