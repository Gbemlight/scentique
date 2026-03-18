"use client";

import { useState } from "react";
import { CustomerDetailPanel } from "@/components/admin/CustomerDetailPanel";

const dummyCustomers = [
  {
    id: 1,
    name: "John Doe",
    email: "john@email.com",
    joinDate: "2025-12-01",
    orders: 5,
    spent: "$420",
    status: "Active",
    avatar: "https://i.pravatar.cc/40?img=1",
    history: [
      { id: "ORD-1001", total: "$120", date: "2026-03-01" },
      { id: "ORD-1002", total: "$300", date: "2026-03-07" },
    ],
  },
  {
    id: 2,
    name: "Sarah Kim",
    email: "sarah@email.com",
    joinDate: "2026-01-14",
    orders: 2,
    spent: "$180",
    status: "Inactive",
    avatar: "https://i.pravatar.cc/40?img=2",
    history: [
      { id: "ORD-1003", total: "$180", date: "2026-03-02" },
    ],
  },
];

export default function CustomersPage() {
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("All");
  const [selectedCustomer, setSelectedCustomer] = useState<any>(null);

  const filtered = dummyCustomers.filter((c) => {
    const matchSearch =
      c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.email.toLowerCase().includes(search.toLowerCase());

    const matchStatus =
      status === "All" || c.status === status;

    return matchSearch && matchStatus;
  });

  return (
    <div className="space-y-6">

      <h1 className="text-2xl font-bold">Customers</h1>

      {/* FILTERS */}

      <div className="flex gap-4">
        <input
          placeholder="Search name or email"
          className="border p-2 rounded"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <select
          className="border p-2 rounded"
          value={status}
          onChange={(e) => setStatus(e.target.value)}
        >
          <option>All</option>
          <option>Active</option>
          <option>Inactive</option>
        </select>
      </div>

      {/* TABLE */}

      <table className="w-full bg-white rounded-xl shadow text-sm">

        <thead className="border-b bg-gray-50">
          <tr>
            <th className="p-3">Avatar</th>
            <th>Name</th>
            <th>Email</th>
            <th>Join Date</th>
            <th>Total Orders</th>
            <th>Total Spent</th>
            <th>Status</th>
          </tr>
        </thead>

        <tbody>

          {filtered.map((c) => (

            <tr
              key={c.id}
              className="border-b cursor-pointer"
              onClick={() => setSelectedCustomer(c)}
            >
              <td className="p-3">
                <img
                  src={c.avatar}
                  className="rounded-full w-8 h-8"
                />
              </td>

              <td>{c.name}</td>
              <td>{c.email}</td>
              <td>{c.joinDate}</td>
              <td>{c.orders}</td>
              <td>{c.spent}</td>

              <td>
                <span
                  className={`px-2 py-1 rounded text-xs ${
                    c.status === "Active"
                      ? "bg-green-100 text-green-700"
                      : "bg-gray-200"
                  }`}
                >
                  {c.status}
                </span>
              </td>
            </tr>

          ))}

        </tbody>
      </table>

      <CustomerDetailPanel
        key={selectedCustomer?.id}
        customer={selectedCustomer}
        close={() => setSelectedCustomer(null)}
      />

    </div>
  );
}