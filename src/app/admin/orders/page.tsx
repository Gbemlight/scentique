"use client";

import { useState, useMemo } from "react";
import OrdersTable from "@/components/admin/OrdersTable";
import OrdersFilterBar from "@/components/admin/OrdersFilterBar";
import { OrderDetailPanel, Order } from "@/components/admin/OrderDetailPanel";
import { FileDown } from "lucide-react";
import { toast } from "sonner";

const dummyOrders: Order[] = [
  {
    id: "ORD-1001",
    customer: "John Doe",
    email: "john@example.com",
    date: "2026-03-10",
    items: 3,
    total: "$210",
    status: "Pending",
    address: "12 Allen Avenue, Ikeja, Lagos",
    products: [
      {
        name: "Royal Oud",
        qty: 1,
        price: "$120",
        image: "/products/p1.jpg",
      },
      {
        name: "Velvet Rose",
        qty: 2,
        price: "$90",
        image: "/products/p2.jpg",
      },
    ],
  },
  {
    id: "ORD-1002",
    customer: "Sarah Kim",
    email: "sarah@example.com",
    date: "2026-03-11",
    items: 2,
    total: "$180",
    status: "Shipped",
    address: "5 Adeola Odeku St, Victoria Island, Lagos",
    products: [
      {
        name: "Golden Amber",
        qty: 2,
        price: "$180",
        image: "/products/p3.jpg",
      },
    ],
  },
  {
    id: "ORD-1003",
    customer: "Charlie Brown",
    email: "charlie@example.com",
    date: "2024-07-22",
    items: 2,
    total: "₦175,000",
    status: "Processing",
    address: "789 Pine Ln, Lekki, Lagos",
    products: [
      { name: "Lavender Fields", qty: 1, price: "₦40,000", image: "/products/p4.jpg" },
      { name: "Scentique Signature", qty: 1, price: "₦55,000", image: "/products/p1.jpg" },
    ],
    notes: "Please include a sample of the new fragrance."
  },
  {
    id: "ORD-1004",
    customer: "Diana Prince",
    email: "diana@example.com",
    date: "2024-07-23",
    items: 1,
    total: "₦48,000",
    status: "Delivered",
    address: "101 Amazon Trail, Themyscira",
    products: [
      { name: "Citrus Burst", qty: 1, price: "₦48,000", image: "/products/p5.jpg" },
    ],
  },
  {
    id: "ORD-1005",
    customer: "Eve Adams",
    email: "eve@example.com",
    date: "2024-07-23",
    items: 1,
    total: "₦45,000",
    status: "Cancelled",
    address: "21B Baker Street, London, UK",
    products: [
      { name: "Ocean Breeze", qty: 1, price: "₦45,000", image: "/products/p2.jpg" },
    ],
  },
];

// Simple Pagination Component
const Pagination = ({ currentPage, totalPages, onPageChange }: { currentPage: number, totalPages: number, onPageChange: (page: number) => void }) => {
  if (totalPages <= 1) return null;
  return (
    <div className="flex items-center gap-2">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="px-3 py-1 border rounded-md disabled:opacity-50 text-sm"
      >
        Previous
      </button>
      <span className="text-sm text-gray-600">
        Page {currentPage} of {totalPages}
      </span>
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="px-3 py-1 border rounded-md disabled:opacity-50 text-sm"
      >
        Next
      </button>
    </div>
  );
};

export default function OrdersPage() {
  const [orders, setOrders] = useState<Order[]>(dummyOrders);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [isPanelOpen, setIsPanelOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 10;

  const filteredOrders = useMemo(() => {
    return orders
      .filter((o) => {
        if (statusFilter === "All") return true;
        return o.status === statusFilter;
      })
      .filter((o) => {
        const searchTerm = search.toLowerCase();
        if (!searchTerm) return true;
        return (
          o.customer.toLowerCase().includes(searchTerm) ||
          o.id.toLowerCase().includes(searchTerm)
        );
      });
  }, [orders, search, statusFilter]);

  const paginatedOrders = useMemo(() => {
    const startIndex = (currentPage - 1) * rowsPerPage;
    return filteredOrders.slice(startIndex, startIndex + rowsPerPage);
  }, [filteredOrders, currentPage]);

  const totalPages = Math.ceil(filteredOrders.length / rowsPerPage);

  const handleViewOrder = (order: Order) => {
    setSelectedOrder(order);
    setIsPanelOpen(true);
  };

  const handleUpdateOrder = (updatedOrder: Order) => {
    setOrders(currentOrders =>
      currentOrders.map(o => (o.id === updatedOrder.id ? updatedOrder : o))
    );
  };

  const handleExport = () => {
    toast.info("Export started, you'll receive an email shortly.");
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4">
        <h1 className="text-2xl font-bold text-gray-900">Orders</h1>
        <button
          onClick={handleExport}
          className="flex items-center gap-2 bg-white border text-gray-700 px-4 py-2 rounded-md text-sm font-medium hover:bg-gray-50"
        >
          <FileDown size={16} />
          Export CSV
        </button>
      </div>

      <OrdersFilterBar
        search={search}
        setSearch={setSearch}
        statusFilter={statusFilter}
        setStatusFilter={setStatusFilter}
      />

      <OrdersTable
        orders={filteredOrders}
        setSelectedOrder={handleViewOrder}
      />

      <div className="flex flex-col sm:flex-row justify-between items-center mt-4 gap-4">
        <div className="text-sm text-gray-600">
          Showing {paginatedOrders.length} of {filteredOrders.length} orders
        </div>
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />
      </div>

      <OrderDetailPanel
        order={selectedOrder}
        isOpen={isPanelOpen}
        onClose={() => setIsPanelOpen(false)}
        onUpdateOrder={handleUpdateOrder}
      />
    </div>
  );
}