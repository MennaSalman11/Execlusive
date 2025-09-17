
"use client";
import { ICategory } from '@/app/interfaces/category.interface';

import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination} from 'swiper/modules';
import Image from 'next/image';
      const swiperOption ={
        slidesPerView:1,
    breakpoints:{
  620:{
    slidesPerView:2 , 
    spaceBetween:20
  },
   768:{
    slidesPerView:3 , 
    spaceBetween:10
  },
   1200:{
    slidesPerView:4 , 
    spaceBetween:15
  },
  1600:{
    slidesPerView:6 , 
    spaceBetween:30
  },
    },
  pagination: {
    clickable:true,
    bulletClass:'swiper-pagination-bullet !size-4 !bg-red-500 border-2' ,
    activeBulletClass:'swiper-pagination-bullet-active border-white'

  },
   modules:[Pagination]
    }
export default  function CategorySlider({categories}:{categories: ICategory[]
}) {

  return <>
  <Swiper {...swiperOption} className='styleCategory mb-20'>
    
        {categories && categories.map((cat)=>(
              <SwiperSlide key={cat._id} className='mb-5'>
<Image src={cat.image} alt={cat.name}
width={270}
height={250}
loading='lazy'
className='w-full h-[16.5rem] object-contain '
/>
<h3 className='font-medium text-center'>{cat.name}</h3>
      </SwiperSlide>
        ))}

   
    </Swiper>
  </>
}
