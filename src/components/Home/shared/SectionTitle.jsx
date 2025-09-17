import React from 'react'

export default function SectionTitle(
    {title , subTitle}) {
  return <>
  <h1 className='py-5 font-semibold text-red-500 mb-5 relative ps-9  before:rounded-sm before:content-[""] before:absolute before:w-5 before:h-10 before:start-0 before:top-1/2 before:-translate-y-1/2 before:bg-red-500'>{title}</h1>
  <span className='text-4xl font-semibold mb-15'>{subTitle}</span>
  </>
}
