"use client";

import { Search } from "lucide-react";

interface OrdersFilterBarProps {
  search: string;
  setSearch: (value: string) => void;
  statusFilter: string;
  setStatusFilter: (value: string) => void;
}

export default function OrdersFilterBar({
  search,
  setSearch,
  statusFilter,
  setStatusFilter,
}: OrdersFilterBarProps) {
  return (
    <div className="flex flex-col md:flex-row gap-4 p-4 bg-white rounded-lg shadow-sm">
      <div className="relative grow">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
        <input
          type="text"
          placeholder="Search by Order ID or customer..."
          className="w-full pl-10 pr-4 py-2 border rounded-md focus:ring-indigo-500 focus:border-indigo-500"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>
      <div className="flex flex-col sm:flex-row gap-4">
        <select
          className="border rounded-md py-2 px-3 focus:ring-indigo-500 focus:border-indigo-500 bg-white"
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
        >
          <option value="All">All Statuses</option>
          <option>Pending</option>
          <option>Processing</option>
          <option>Shipped</option>
          <option>Delivered</option>
          <option>Cancelled</option>
        </select>
        <div className="flex gap-4">
          <input type="date" disabled className="border rounded-md py-2 px-3 bg-gray-50 cursor-not-allowed w-full" />
          <input type="date" disabled className="border rounded-md py-2 px-3 bg-gray-50 cursor-not-allowed w-full" />
        </div>
      </div>
    </div>
  );
}