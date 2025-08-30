
import React, { useEffect, useState } from "react"
import { getOrderById } from "../_actions/orders.action"
import Loading from "@/app/loading"
interface CartItem {
  _id: string
  count: number
  price: number
  product: {
    title: string
    _id: string
  }
}

interface Order {
  _id: string
  status: string
  totalOrderPrice: number
  shippingAddress: {
    city: string
    phone: string
    details: string
  }
  cartItems: CartItem[]
}

export default function Orders({ orderId }: { orderId: string }) {
  const [order, setOrder] = useState<Order | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchOrder() {
      try {
        const data = await getOrderById(orderId) // ✅ Server Action
        setOrder(data)
      } catch (err) {
        console.error("Error fetching order", err)
      } finally {
        setLoading(false)
      }
    }
    fetchOrder()
  }, [orderId])

  if (loading) return <Loading></Loading>
  if (!order) return <p>No order found</p>





  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Order Details</h2>
      <p><strong>Order ID:</strong> {order._id}</p>
      <p><strong>Status:</strong> {order.status}</p>
      <p><strong>Total Price:</strong> {order.totalOrderPrice} EGP</p>
      <p><strong>City:</strong> {order.shippingAddress?.city}</p>
      <p><strong>Phone:</strong> {order.shippingAddress?.phone}</p>

      <h3 className="text-xl font-semibold mt-4">Products</h3>
      <ul className="space-y-2">
        {order.cartItems?.map((item) => (
          <li key={item._id} className="border p-3 rounded">
            <p>{item.product?.title}</p>
            <p>Quantity: {item.count}</p>
            <p>Price: {item.price} EGP</p>
          </li>
        ))}
      </ul>
    </div>
  )
}
