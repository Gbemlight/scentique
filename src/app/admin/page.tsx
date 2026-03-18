"use client";

import Image from "next/image";
import Link from "next/link";
import StatCard from "@/app/admin/StatCard";
import StatusBadge from "@/app/admin/StatusBadge";

const monthlyRevenue = [
  { month: "Jan", value: 4200 },
  { month: "Feb", value: 5200 },
  { month: "Mar", value: 4800 },
  { month: "Apr", value: 6100 },
  { month: "May", value: 7200 },
  { month: "Jun", value: 6800 },
  { month: "Jul", value: 7400 },
  { month: "Aug", value: 7900 },
  { month: "Sep", value: 8300 },
  { month: "Oct", value: 9100 },
  { month: "Nov", value: 9800 },
  { month: "Dec", value: 11200 },
];

const orders = [
  {
    id: "ORD-1023",
    customer: "John Doe",
    date: "Mar 02",
    items: 3,
    total: "$210",
    status: "Delivered",
  },
  {
    id: "ORD-1024",
    customer: "Ada Johnson",
    date: "Mar 03",
    items: 2,
    total: "$150",
    status: "Shipped",
  },
  {
    id: "ORD-1025",
    customer: "Michael Lee",
    date: "Mar 03",
    items: 1,
    total: "$85",
    status: "Pending",
  },
  {
    id: "ORD-1026",
    customer: "Sarah Kim",
    date: "Mar 04",
    items: 4,
    total: "$340",
    status: "Delivered",
  },
  {
    id: "ORD-1027",
    customer: "David Smith",
    date: "Mar 04",
    items: 2,
    total: "$120",
    status: "Confirmed",
  },
  {
    id: "ORD-1028",
    customer: "Chris Brown",
    date: "Mar 05",
    items: 3,
    total: "$260",
    status: "Shipped",
  },
  {
    id: "ORD-1029",
    customer: "Jane Miller",
    date: "Mar 05",
    items: 5,
    total: "$410",
    status: "Delivered",
  },
  {
    id: "ORD-1030",
    customer: "Daniel Evans",
    date: "Mar 06",
    items: 2,
    total: "$180",
    status: "Pending",
  },
];

const topProducts = [
  {
    name: "Royal Oud",
    sold: 230,
    revenue: "$8,200",
    image: "/products/p1.jpg",
  },
  {
    name: "Velvet Rose",
    sold: 180,
    revenue: "$6,100",
    image: "/products/p2.jpg",
  },
  {
    name: "Golden Amber",
    sold: 160,
    revenue: "$5,700",
    image: "/products/p3.jpg",
  },
  {
    name: "Midnight Musk",
    sold: 140,
    revenue: "$4,900",
    image: "/products/p4.jpg",
  },
  {
    name: "Vanilla Bloom",
    sold: 120,
    revenue: "$4,200",
    image: "/products/p5.jpg",
  },
];

const lowStock = [
  { name: "Velvet Rose", stock: 6 },
  { name: "Midnight Musk", stock: 8 },
  { name: "Vanilla Bloom", stock: 4 },
];

export default function AdminDashboard() {
  const maxRevenue = Math.max(...monthlyRevenue.map((m) => m.value));

  return (
    <div className="p-6 space-y-8">
      {/* KPI CARDS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Total Revenue"
          value="$98,430"
          change="+12.5%"
          trend="up"
        />

        <StatCard title="Orders Today" value="54" change="+8.2%" trend="up" />

        <StatCard
          title="Total Products"
          value="312"
          change="-1.4%"
          trend="down"
        />

        <StatCard
          title="Active Customers"
          value="1,284"
          change="+6.9%"
          trend="up"
        />
      </div>

      {/* MAIN GRID */}
      <div className="grid lg:grid-cols-3 gap-8">
        {/* REVENUE CHART */}
        <div className="lg:col-span-2 bg-white rounded-xl shadow p-6">
          <h3 className="text-lg font-semibold mb-6">
            Revenue (Last 12 Months)
          </h3>

          <div className="flex items-end h-64 gap-4">
            {monthlyRevenue.map((m) => {
              const height = (m.value / maxRevenue) * 100;

              return (
                <div key={m.month} className="flex flex-col items-center group">
                  <div className="relative flex flex-col justify-end h-48">
                    {/* Tooltip */}
                    <div className="absolute -top-8 opacity-0 group-hover:opacity-100 text-xs bg-black text-white px-2 py-1 rounded">
                      {m.month} : ${m.value}
                    </div>
                    <div
                      className="w-8 bg-indigo-500 rounded-t hover:bg-indigo-600 transition-all"
                      style={{ height: `${height}%` }}
                    />
                  </div>

                  <span className="text-xs mt-2 text-gray-500">{m.month}</span>
                </div>
              );
            })}
          </div>
        </div>

        {/* RIGHT COLUMN */}
        <div className="space-y-6">
          {/* TOP PRODUCTS */}
          <div className="bg-white rounded-xl shadow p-6">
            <h3 className="font-semibold mb-4">Top Selling Products</h3>

            <div className="space-y-4">
              {topProducts.map((p, index) => (
                <div key={p.name} className="flex items-center gap-3">
                  <span className="font-bold text-gray-400">{index + 1}</span>

                  <Image
                    src={p.image}
                    alt={p.name}
                    width={40}
                    height={40}
                    className="rounded"
                  />

                  <div className="flex-1">
                    <p className="text-sm font-medium">{p.name}</p>
                    <p className="text-xs text-gray-500">{p.sold} sold</p>
                  </div>

                  <span className="text-sm font-semibold">{p.revenue}</span>
                </div>
              ))}
            </div>
          </div>

          {/* LOW STOCK */}
          <div className="bg-amber-50 border border-amber-300 rounded-xl p-6">
            <h3 className="font-semibold text-amber-800 mb-4">
              Low Stock Alert
            </h3>

            <div className="space-y-3">
              {lowStock.map((p) => (
                <div key={p.name} className="flex justify-between text-sm">
                  <span>{p.name}</span>
                  <span className="font-bold text-amber-700">
                    {p.stock} left
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* RECENT ORDERS */}
      <div className="bg-white rounded-xl shadow p-6">
        <h3 className="text-lg font-semibold mb-6">Recent Orders</h3>

        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="text-left text-gray-500 border-b">
              <tr>
                <th className="py-2">Order ID</th>
                <th>Customer</th>
                <th>Date</th>
                <th>Items</th>
                <th>Total</th>
                <th>Status</th>
              </tr>
            </thead>

            <tbody>
              {orders.map((o) => (
                <tr key={o.id} className="border-b last:border-none">
                  <td className="py-3 font-medium">{o.id}</td>
                  <td>{o.customer}</td>
                  <td>{o.date}</td>
                  <td>{o.items}</td>
                  <td>{o.total}</td>

                  <td>
                    <StatusBadge status={o.status} />
                  </td>
                </tr>
                
              ))}
            </tbody>
          </table>
        </div>

        <div className="mt-4 text-right">
          <Link
            href="/admin/orders"
            className="text-indigo-600 hover:underline text-sm"
          >
            View all orders →
          </Link>
        </div>
      </div>
    </div>
  );
}
