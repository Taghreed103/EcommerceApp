"use server";

import { getTokenAuth } from "@/utilities/getTokenAuth";

export async function getAllOrders() {
  const token = await getTokenAuth();
  if (!token) throw new Error("Unauthenticated, login first");

  const res = await fetch(`${process.env.API}/orders`, {
    headers: {
      "Content-Type": "application/json",
      token :token ||""
    },
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch orders");
  }

  return res.json();
}
