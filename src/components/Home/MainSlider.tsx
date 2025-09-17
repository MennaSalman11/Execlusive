"use client";

import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination  , Autoplay} from 'swiper/modules';
import img1 from '@/assets/images/img1.jpeg'
import img2 from '@/assets/images/img2.jpeg'
import img3 from '@/assets/images/img3.jpeg'
import Image from 'next/image';
export default function MainSlider (){
  const images =[
    {path:img1.src , label:'slide1'  },
    {path:img2.src , label:'slide2'  },
    {path:img3.src , label:'slide3'  },
]
    const swiperOption ={
  pagination: {
    clickable:true,
    bulletClass:'swiper-pagination-bullet !size-4 !bg-red-500 border-2' ,
    activeBulletClass:'swiper-pagination-bullet-active border-white'

  } , 
  autoplay:{
delay:2000,
disabledOnInteraction:false
  },
   modules:[Pagination , Autoplay]
    }
  return (<>

<section className='container mx-auto'>
  
    <Swiper {...swiperOption}>
    
        {images.map((image , index)=>(
              <SwiperSlide key={index} className=''>
<Image src={image.path} alt={image.label}
width={1800}
height={200}
loading='lazy'
className='w-full h-[20rem] object-cover'
/>
      </SwiperSlide>
        ))}

   
    </Swiper>
</section>
  </>
  )
};