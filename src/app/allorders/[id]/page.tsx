import React from 'react'
import Orders from '../_components/Orders'

export default async function page({params}:{params:Promise<{  id: string }>}) {

    const  data =   await  params

   
  return (

    <Orders   orderId={data?.id}></Orders>
  )
}
