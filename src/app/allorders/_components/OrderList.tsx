"use client";

import { useEffect, useState } from "react";
import { getAllOrders } from "../_actions/allOrders.action";
import Link from "next/link";

interface Order {
  _id: string;
  status: string;
  totalOrderPrice: number;
}

export default function OrdersList() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadOrders() {
      try {
        const data = await getAllOrders();
        setOrders(data);
      } catch (err) {
        console.error("Error fetching orders", err);
      } finally {
        setLoading(false);
      }
    }
    loadOrders();
  }, []);

  if (loading) return <p>Loading...</p>;

  if (!orders.length) return <p>No orders found.</p>;

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">My Orders</h2>
      <table className="w-full border-collapse border border-gray-300">
        <thead className="bg-gray-100">
          <tr>
            <th className="border p-2">Order ID</th>
            <th className="border p-2">Status</th>
            <th className="border p-2">Total Price</th>
            <th className="border p-2">Details</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr key={order._id}>
              <td className="border p-2">{order._id}</td>
              <td className="border p-2">{order.status}</td>
              <td className="border p-2">{order.totalOrderPrice} EGP</td>
              <td className="border p-2">
                <Link
                  href={`/allorders/${order._id}`}
                  className="text-blue-600 hover:underline"
                >
                  View
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
