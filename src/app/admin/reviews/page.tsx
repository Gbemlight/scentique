"use client";

import { useState } from "react";

interface Review {
  id: number;
  product: string;
  customer: string;
  rating: number;
  text: string;
  status: "Pending" | "Approved" | "Rejected";
  date: string;
}

const dummyReviews: Review[] = [
  {
    id: 1,
    product: "Royal Oud",
    customer: "John Doe",
    rating: 5,
    text: "Amazing fragrance. Lasts all day!",
    status: "Pending",
    date: "2024-07-20",
  },
  {
    id: 2,
    product: "Velvet Rose",
    customer: "Sarah Kim",
    rating: 4,
    text: "Very nice scent but slightly strong.",
    status: "Approved" as const, // Type assertion for literal type
    date: "2024-07-21",
  },
];

export default function ReviewsPage() {
  const [reviews, setReviews] =
    useState<Review[]>(dummyReviews);
  const [filter, setFilter] = useState("All");

  const updateStatus = (id: number, status: "Pending" | "Approved" | "Rejected") => {
    setReviews((prev) =>
      prev.map((r) =>
        r.id === id ? { ...r, status: status } : r
      )
    );
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Reviews</h1>
        <select 
          className="border rounded-md px-3 py-1.5 text-sm"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        >
          <option value="All">All Reviews</option>
          <option value="Pending">Pending</option>
          <option value="Approved">Approved</option>
          <option value="Rejected">Rejected</option>
        </select>
      </div>

      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        <table className="w-full text-sm text-left">
        <thead className="bg-gray-50 border-b">
          <tr>
            <th className="p-4 font-medium">Product</th>
            <th className="p-4 font-medium">Customer</th>
            <th className="p-4 font-medium">Rating</th>
            <th className="p-4 font-medium">Review</th>
            <th className="p-4 font-medium">Date</th>
            <th className="p-4 font-medium">Status</th>
            <th className="p-4 font-medium text-right">Actions</th>
          </tr>
        </thead>

        <tbody className="divide-y">
          {reviews
            .filter(r => filter === "All" || r.status === filter)
            .map((r) => (
              <tr key={r.id} className="hover:bg-gray-50">
                <td className="p-4 font-medium">{r.product}</td>
                <td className="p-4 text-gray-600">{r.customer}</td>
                <td className="p-4 text-amber-500">{"★".repeat(r.rating)}{"☆".repeat(5-r.rating)}</td>
                <td className="p-4 text-gray-600 max-w-xs truncate" title={r.text}>{r.text}</td>
                <td className="p-4 text-gray-500">{new Date(r.date).toLocaleDateString()}</td>
                <td className="p-4">
                  <span className={`text-xs px-2 py-1 rounded-full font-medium ${
                    r.status === 'Approved' ? 'bg-green-100 text-green-700' :
                    r.status === 'Rejected' ? 'bg-red-100 text-red-700' :
                    'bg-amber-100 text-amber-700'
                  }`}>
                    {r.status}
                  </span>
                </td>
                <td className="p-4 text-right space-x-2">
                  {r.status !== 'Approved' && (
                    <button
                      className="text-green-600 hover:text-green-800 font-medium text-xs"
                      onClick={() => updateStatus(r.id, "Approved")}
                    >
                      Approve
                    </button>
                  )}
                  {r.status !== 'Rejected' && (
                    <button
                      className="text-red-600 hover:text-red-800 font-medium text-xs"
                      onClick={() => updateStatus(r.id, "Rejected")}
                    >
                      Reject
                    </button>
                  )}
                </td>
              </tr>
            ))}
          {reviews.filter(r => filter === "All" || r.status === filter).length === 0 && (
            <tr>
              <td colSpan={7} className="p-8 text-center text-gray-500">
                No reviews found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
      </div>

    </div>
  );
}