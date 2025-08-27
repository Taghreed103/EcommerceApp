import { cookies } from "next/headers";
import { decode } from "next-auth/jwt";

  export  async  function getTokenAuth() {

    const  authToken=  (await  cookies() ).get("next-auth.session-token")?.value ;
    
    const  token = await   decode(   {token:authToken , secret:process.env.NEXTAUTH_SECRET!   })


    return  token  ;
    
  }
