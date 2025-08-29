"use server"
import { getTokenAuth }   from "@/utilities/getTokenAuth";

type   shippingAddressType ={
    "details": string,
    "phone": string,
    "city": string
}

export   async   function checkoutOnline (cartId :string , url=process.env.NEXTAUTH_URL, shippingAddress:shippingAddressType){

       const token = await  getTokenAuth()
         
              if(!token){
                 throw  new Error("UnAuthinticated , login first ")
              }



   const  res = await  fetch (  `${process.env.API}/orders/checkout-session/${cartId}?url=${url}`, 
 {

    method: "POST"   ,
   headers:{

        token: String(token), 

        "Content-Type" : "application/json"  ,
         
    }, 
    body :  JSON.stringify({

         shippingAddress

    }),
 
        

   } 


)
   
   const data =  await res.json()  ;

   return   data 
}