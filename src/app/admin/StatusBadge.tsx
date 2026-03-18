"use client";

export default function StatusBadge({ status }: { status: string }) {
  const styles: Record<string, string> = {
    Delivered: "bg-green-100 text-green-700",
    Shipped: "bg-blue-100 text-blue-700",
    Confirmed: "bg-purple-100 text-purple-700",
    Pending: "bg-yellow-100 text-yellow-700",
  };

  return (
    <span
      className={`px-2 py-1 rounded text-xs ${
        styles[status] || "bg-gray-100 text-gray-700"
      }`}
    >
      {status}
    </span>
  );
}