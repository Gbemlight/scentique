"use client";

interface StatCardProps {
  title: string;
  value: string;
  change: string;
  trend: "up" | "down";
}

export default function StatCard({
  title,
  value,
  change,
  trend,
}: StatCardProps) {
  return (
    <div className="bg-white rounded-xl shadow p-6 hover:shadow-lg transition">

      <p className="text-sm text-gray-500">{title}</p>

      <h2 className="text-2xl font-bold mt-1">{value}</h2>

      <p
        className={`text-sm mt-1 ${
          trend === "up"
            ? "text-green-600"
            : "text-red-500"
        }`}
      >
        {trend === "up" ? "▲" : "▼"} {change}
      </p>

    </div>
  );
}