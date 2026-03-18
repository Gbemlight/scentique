"use client";

import { Order } from "./OrderDetailPanel";
import clsx from "clsx";

interface OrdersTableProps {
  orders: Order[];
  setSelectedOrder: (order: Order) => void;
}

const statusColors: Record<Order['status'], string> = {
  Pending: "bg-amber-100 text-amber-800",
  Processing: "bg-blue-100 text-blue-800",
  Shipped: "bg-purple-100 text-purple-800",
  Delivered: "bg-green-100 text-green-800",
  Cancelled: "bg-rose-100 text-rose-800",
};

export default function OrdersTable({ orders, setSelectedOrder }: OrdersTableProps) {

  return (
    <div className="bg-white rounded-lg shadow-sm overflow-x-auto">
      <table className="w-full text-sm text-left">
        <thead className="bg-gray-50 text-gray-600 uppercase text-xs">
          <tr>
            <th className="p-4 font-medium">Order ID</th>
            <th className="p-4 font-medium">Customer</th>
            <th className="p-4 font-medium">Date</th>
            <th className="p-4 font-medium text-center">Items</th>
            <th className="p-4 font-medium text-right">Total</th>
            <th className="p-4 font-medium">Status</th>
            <th className="p-4 font-medium"></th>
          </tr>
        </thead>

        <tbody className="divide-y">
          {orders.map((order) => (
            <tr key={order.id} className="hover:bg-gray-50">
              <td className="p-4 font-mono text-indigo-600">{order.id}</td>
              <td className="p-4 text-gray-800">{order.customer}</td>
              <td className="p-4 text-gray-600">{order.date}</td>
              <td className="p-4 text-center text-gray-600">{order.items}</td>
              <td className="p-4 text-right font-medium text-gray-800">{order.total}</td>
              <td className="p-4">
                <span
                  className={clsx(
                    "px-2.5 py-1 rounded-full text-xs font-semibold inline-block",
                    statusColors[order.status]
                  )}
                >
                  {order.status}
                </span>
              </td>
              <td className="p-4 text-right">
                <button
                  onClick={() => setSelectedOrder(order)}
                  className="text-indigo-600 hover:text-indigo-800 font-medium"
                >
                  View
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}