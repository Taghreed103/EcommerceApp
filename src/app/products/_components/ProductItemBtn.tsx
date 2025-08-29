"use client"

import React from 'react'
import { Button } from '@/components/ui/button' 
import  {useQueryClient, useMutation}  from "@tanstack/react-query"
import {addProductCartClient } from "@/services/cart" 
import { toast } from 'react-toastify'
export default function ProductItemBtn({id}:{id:string}) {

  

//to  avoid   refresh  when  new  prod  added in cart
  const   queryClient =  useQueryClient()  
    
   const {mutate, isPending } = useMutation({
    mutationFn: addProductCartClient ,
    onSuccess: (data) => {
      console.log("✅ Product added:", data);
     toast.success(data?.message)
     queryClient.invalidateQueries({queryKey:["cart"]})
    
    },
    onError: () => {
           toast.error( "error,login first " )

    },
  });



  return (

            <Button 
            
             
            onClick= { () => mutate(id)} 

            className="my-3 w-full" >
                
        {isPending? <i  className="fa-solid fa-spin fa-spinner"></i>
        
        : "Add to cart" }
        
        
        </Button>

  )
}
