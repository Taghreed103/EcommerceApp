"use server"

import { getTokenAuth } from "@/utilities/getTokenAuth"

export async function getOrderById(orderId: string) {
  const token = await getTokenAuth()
  if (!token) {
    throw new Error("Unauthenticated, login first")
  }

  const res = await fetch(`${process.env.API}/orders/${orderId}`, {
    headers: {
      "Content-Type": "application/json",
      token
    },
    cache: "no-store", // ✅ مهم عشان يجيب أحدث بيانات
  })




  

  if (!res.ok) {
    throw new Error("Failed to fetch order")
  }

  return res.json()
}
