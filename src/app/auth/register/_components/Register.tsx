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
import { registerSchema, regSchema } from "@/schema/schema.register";
import { useRouter } from "next/navigation";

export default function Register() {
  const router = useRouter();

  const form = useForm<regSchema>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      rePassword: "",
      phone: "",
    },
  });

  const firstError = Object.keys(form.formState.errors)[0];

  async function onsubmit(data: regSchema) {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API}/auth/signup`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data),
        }
      );

      const result = await res.json();
      console.log("Register response:", result);

      if (res.ok) {
        alert("✅ Registered successfully, please login");
        router.push("/auth/login");
      } else {
        alert(`❌ Register failed: ${result.message || "Unknown error"}`);
      }
    } catch (error) {
      console.error("Register error:", error);
      alert("❌ Something went wrong");
    }

    form.reset();
  }

  return (
    <>
      <h2 className="my-5">Register Now: </h2>

      <Form {...form}>
        <form className="w-2/3 mx-auto" onSubmit={form.handleSubmit(onsubmit)}>
          <FormField
            name="name"
            control={form.control}
            render={({ field }) => (
              <FormItem className="my-5">
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                {firstError === "name" && <FormMessage />}
              </FormItem>
            )}
          />

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

          <FormField
            name="rePassword"
            control={form.control}
            render={({ field }) => (
              <FormItem className="my-5">
                <FormLabel>Confirm Password</FormLabel>
                <FormControl>
                  <Input type="password" {...field} />
                </FormControl>
                {firstError === "rePassword" && <FormMessage />}
              </FormItem>
            )}
          />

          <FormField
            name="phone"
            control={form.control}
            render={({ field }) => (
              <FormItem className="my-5">
                <FormLabel>Phone</FormLabel>
                <FormControl>
                  <Input type="tel" {...field} />
                </FormControl>
                {firstError === "phone" && <FormMessage />}
              </FormItem>
            )}
          />

          <Button
            className="bg-main text-white my-5 ml-auto block hover:bg-main cursor-pointer"
            type="submit"
          >
            Register
          </Button>
        </form>
      </Form>
    </>
  );
}
