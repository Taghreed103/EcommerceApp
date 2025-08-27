"use client";

import React from "react";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema, loginSchemaForm } from "@/schema/loginSchema";
import { signIn } from "next-auth/react";

export default function Login() {

  const form = useForm<loginSchemaForm>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const firstError = Object.keys(form.formState.errors)[0];

  async function onSubmit(data: loginSchemaForm) {
    const res = await signIn("credentials", {
      email: data.email,
      password: data.password,
      redirect: false, 
      callbackUrl: "/"
    });
    if (res?.ok) {
      window.location.href= res?.url|| ""
     
  
  }

}


function  handleGithubSignIn(){
 signIn("github", { callbackUrl: "/" })

 
}


  return (
    <>
      <h2 className="my-5">Login Now: </h2>

      <Form {...form}>
        <form className="w-2/3 mx-auto" onSubmit={form.handleSubmit(onSubmit)}>
          <FormField
            name="email"
            control={form.control}
            render={({ field }) => (
              <FormItem className="my-5">
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input type="email" {...field} />
                </FormControl>
                {firstError === "email" && <FormMessage />}
              </FormItem>
            )}
          />

          <FormField
            name="password"
            control={form.control}
            render={({ field }) => (
              <FormItem className="my-5">
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input type="password" autoComplete="off" {...field} />
                </FormControl>
                {firstError === "password" && <FormMessage />}
              </FormItem>
            )}
          />

          <Button
            className="bg-main text-white my-5 ml-auto block hover:bg-main cursor-pointer  w-full"
            type="submit"
          >
            Login
          </Button>
        </form>
      </Form>

<div  className="text-center ">
       <Button  onClick={handleGithubSignIn}
        className="rounded   w-[880px]" > 
        Login With GitHub  <i  className="fa-brands fa-github"></i>     
        
          </Button>
</div>


    </>
  );
}
