import React from 'react'
import getProduct  from  "@/apis/products.api"
import { ProductInterface } from '../../../interfaces/product.interface';
import ProductItem from './ProductItem';
export default  async function FeaturedProducts() {

  const data : ProductInterface[]  =     await  getProduct();
  return (
    <div  className='flex  flex-wrap'>

   {data.map( (prod:ProductInterface )=>  

     <ProductItem  key={prod._id}   prod={prod}>
  
     </ProductItem>

          )}


    </div>
  )
}
