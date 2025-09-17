import { ICategory } from '@/app/interfaces/category.interface';
import { getCategories } from '@/lib/services/categories.services';
import CategorySlider from './CategorySlider'
import SectionTitle from './shared/SectionTitle'
import React from 'react'
import { Separator } from "@/components/ui/separator"


export default async function CategoriesSection() {


const {data:categories}:{data:ICategory[]} =await getCategories();
console.log(categories);

  return( <>
  
<section>

    <div className="mx-auto container">
      <SectionTitle title={'categories'} subTitle={'search by category'}/>
<CategorySlider categories={categories} />
<Separator className='my-10'/>
    </div>
</section>
  </>)
}
