import React from 'react'
import CheckOut from '../_Components/CheckOut'

export default async function page({params}:{params:Promise<{  id: string }>}) {

    const  data =   await  params

   
  return (

    <CheckOut   cartId={data?.id}></CheckOut>
  )
}
