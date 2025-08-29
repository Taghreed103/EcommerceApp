
 //server action   used  when retrieve data (post add  delete) onclick is  client on browser so i use 
 //use server  in first of this  file because  the excution is done in server  although the onclick is client action
//hide  secret data  and  keep  token is  decoded 
 "use server" 

import { getTokenAuth }   from "@/utilities/getTokenAuth";

 export    async function  clearCart(){
             
              
         const token = await  getTokenAuth()
    
         if(!token){
            throw  new Error("UnAuthinticated , login first ")
         }



         const  res=  await fetch (`${process.env.API}/cart` , {
          cache:"no-cache" ,

            method : "DELETE"    ,
             headers:{

                "Content-Type": "application/json" ,
                token :token.token  as  string
             },


         }
         )

         const payload =  await  res.json();

         return  payload


 }

