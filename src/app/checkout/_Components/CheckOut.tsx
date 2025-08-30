"use client"
import { useForm } from "react-hook-form"
import React from 'react'

import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form"
import { checkoutOnline } from "../_actions/checkout.action"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { zodResolver } from "@hookform/resolvers/zod"
import { addressSchema, addressSchemaForm } from "@/schema/addressSchema"

export default function CheckOut({cartId}:{cartId:string}) {

  const form = useForm<addressSchemaForm>({
    resolver: zodResolver(addressSchema),
    defaultValues: {
      details: "",
      city: "",
      phone: ""
    }
  })

async   function onSubmit(data:addressSchemaForm) {
 const  shippingAddress=data
const  res =  await     checkoutOnline(cartId,  window.location.origin , shippingAddress)
      
  console.log(res)
  if (res?.status==="success"){
    window.location.href= res?.session?.url
  }



  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="my-5 mx-auto w-2/3"
      >
        <FormField
          control={form.control}
          name="details"
          render={({ field }) => (
            <FormItem className="my-3">
              <FormLabel>Details</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="city"
          render={({ field }) => (
            <FormItem className="my-3">
              <FormLabel>City</FormLabel>
              <FormControl>
                <Input type="text" {...field} /> 
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="phone"
          render={({ field }) => (
            <FormItem className="my-3">
              <FormLabel>Phone</FormLabel>
              <FormControl>
                <Input type="tel" {...field} /> 
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit">Submit</Button>
      </form>
    </Form>
  )
}
