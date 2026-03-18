"use client";
import { useState } from "react";
import OrderDetailModal from "./OrderDetailModal";

const orders = [
  {
    id: "ORD-1023",
    date: "Mar 1, 2026",
    status: "Shipped",
    items: 3,
    total: "₦75,000"
  }
];

const statusColors: any = {
  Placed: "bg-gray-200 text-gray-700",
  Confirmed: "bg-blue-100 text-blue-600",
  Shipped: "bg-yellow-100 text-yellow-700",
  Delivered: "bg-green-100 text-green-600"
};

export default function OrdersTab() {
  const [selected, setSelected] = useState<any>(null);

  return (
    <div>
      <h2 className="text-xl font-semibold mb-6">My Orders</h2>

      <table className="w-full text-left border rounded overflow-hidden">
        <thead className="bg-gray-100">
          <tr>
            <th className="p-3">Order #</th>
            <th>Date</th>
            <th>Status</th>
            <th>Items</th>
            <th>Total</th>
            <th></th>
          </tr>
        </thead>

        <tbody>
          {orders.map((order) => (
            <tr key={order.id} className="border-t">
              <td className="p-3">{order.id}</td>
              <td>{order.date}</td>
              <td>
                <span className={`px-3 py-1 text-xs rounded-full ${statusColors[order.status]}`}>
                  {order.status}
                </span>
              </td>
              <td>{order.items}</td>
              <td>{order.total}</td>
              <td>
                <button onClick={() => setSelected(order)} className="underline text-sm cursor-pointer">
                  View
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {selected && (
        <OrderDetailModal order={selected} onClose={() => setSelected(null)} />
      )}
    </div>
  );
}