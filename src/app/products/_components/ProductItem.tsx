import React from 'react'
import { ProductInterface } from '../../../interfaces/product.interface';
import Image from 'next/image';
import Link from 'next/link';
import  ProductItemBtn from './ProductItemBtn';
interface Props {
  prod: ProductInterface;
}

export default function ProductItem({prod}:Props) {


  return (
    <div   className='w-full  bg-light    lg:w-1/6  sm:w-1/3  md:w-1/2 '>
       <div   className='py-5  '>
        <Link  href={`/products/${prod._id}`}> 
          <Image  width={300}  height={300}   src={prod.imageCover}  alt='product img'  className='w-full'></Image>
          <span   className='text-main'>{prod.category.name}</span>
          <p className='line-clamp-1' >{prod.title}</p>
          <div   className=' flex justify-between my-5 items-center  mx-4 '>
            <span >{prod.price}EGP</span>
            <span >{prod.ratingsAverage} <i className='fa-solid fa-star text-rating'></i></span>
          </div>
        </Link>

        <ProductItemBtn   id={prod._id} ></ProductItemBtn>
       </div>
    </div>



  )
}
