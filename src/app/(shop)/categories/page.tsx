import { ICategory } from '@/app/interfaces/category.interface';
import { ISubcategory } from '@/app/interfaces/subcategory.interface';
import SectionTitle from '@/components/Home/shared/SectionTitle';
import { getCategories, getSubCategories } from '@/lib/services/categories.services';
import Image from 'next/image';
import React from 'react'

export default async function CategoriesPage() {

  const { data: categories }: { data: ICategory[] } = await getCategories();
  console.log(categories);

  return (
    <>

      <header className='text-center m-12 font-bold text-3xl'>Check out our featured categories</header>
      <section className='mx-auto container'>
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-8 gap-y-15 mb-15'>
          {categories && categories.map((Cat) =>
          (<div key={Cat._id}>
            <h1 className='font-bold text-center'>{Cat.name}</h1>
            <Image src={Cat.image}
              alt={Cat.name}
              width={250}
              height={200}
              loading='lazy'
              className='w-full h-[16.5rem] object-contain '
            />
          </div>)
          )}
        </div>
      </section>
    </>
  )

}
