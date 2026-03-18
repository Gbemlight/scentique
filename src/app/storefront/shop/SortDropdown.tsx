"use client";

import { useRouter, useSearchParams } from "next/navigation";



export default function SortDropdown() {
  const router = useRouter();
  const params = useSearchParams();

  const handleChange = (value: string) => {
    const newParams = new URLSearchParams(params.toString());
    newParams.set("sort", value);
    newParams.set("page", "1");
    router.push(`/storefront/shop?${newParams.toString()}`);
  };

  return (
    <select
      defaultValue={params.get("sort") || "featured"}
      onChange={(e) => handleChange(e.target.value)}
      className="border px-4 py-2 rounded-md text-sm"
    >
      <option value="featured">Featured</option>
      <option value="newest">Newest</option>
      <option value="price-asc">Price: Low–High</option>
      <option value="price-desc">Price: High–Low</option>
      <option value="rating">Best Rated</option>
    </select>
  );
}