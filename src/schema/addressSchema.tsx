



import  *  as  z   from "zod";

export  const  addressSchema = z.object ({

     details : z.string(),
     city : z.string(),
     phone  : z.string()

 
 
}) 

export   type   addressSchemaForm = z.infer<typeof addressSchema>