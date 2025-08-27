



import  *  as  z   from "zod";

export  const  registerSchema = z.object ({
     name : z.string().nonempty("this   field  is  required").min(2,"min 2 char ").max(10,"max 10 char"),

     email : z.string().nonempty("this field is  required").email("not valid email "),

     password :z.string().nonempty("this  field  is  required ").regex(
/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/ , "not valid password") ,


    rePassword :z.string().nonempty("this  field  is  required "),

  phone: z.string().nonempty("this field is  reqquired").regex(/^01[0125]\d{8}$/)
 
}).refine(

    (data)=>  data.password===data.rePassword ,{


        message:"not match " ,
        path : ["rePassword"]
    }   


    )

export   type   regSchema = z.infer<typeof  registerSchema>