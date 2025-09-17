"use client";

import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules';
import Image from 'next/image';
const swiperOption = {
  pagination: {
    clickable: true,
    bulletClass: 'swiper-pagination-bullet !size-4 !bg-red-500 border-2',
    activeBulletClass: 'swiper-pagination-bullet-active border-white'

  },
  modules: [Pagination]
}
export default function ProductSlider({ images }: { images: string[] }) {


  return (

    <Swiper {...swiperOption}>

      {images.map((img, index) => (
        <SwiperSlide key={index} className=''>
          <Image
            src={img}
            alt={`${img}-${index}`}
            width={500}
            height={500}
            loading='lazy'
            className='w-full h-[37.5rem] object-contain'
          />
        </SwiperSlide>
      ))}


    </Swiper>

  )
}
