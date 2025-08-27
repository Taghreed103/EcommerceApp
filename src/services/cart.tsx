// src/services/cart.ts
import { addProductCart } from "@/app/cart/_actions/addProduct.action";


type AddCartResponse = {
  message: string;
  cartId: string;
  // ... أي properties تانية من الـ API
};
// دي اللي هتتندمج مع React Query
export async function addProductCartClient(productId: string) :Promise<AddCartResponse > {
  return await addProductCart(productId);
}
