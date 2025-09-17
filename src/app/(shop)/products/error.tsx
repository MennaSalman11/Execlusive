"use client";

import React from 'react'

export default function error({error}:{error: Error}) {
  return (
<>
   <h1>something went wrong...</h1>
   <p>{error.message}</p></>
  )
}
