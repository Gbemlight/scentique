"use client";

import React from "react";
import { useRouter, useSearchParams, ReadonlyURLSearchParams } from "next/navigation";
import { Product } from "@/lib/dummyProducts";

interface Props {
  products: Product[];
}

export default function FilterSidebar({ products }: Props) {
  const router = useRouter();
  const params = useSearchParams();
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const categories = [...new Set(products.map(p => p.category))];
  const brands = [...new Set(products.map(p => p.brand))];
  const scents = [...new Set(products.map(p => p.scentFamily))];

  const updateFilter = (key: string, value: string) => {
    const newParams = new URLSearchParams(params.toString());

    // toggle value for multi-select filters
    const existing = newParams.getAll(key);

    if (existing.includes(value)) {
      const filtered = existing.filter(v => v !== value);
      newParams.delete(key);
      filtered.forEach(v => newParams.append(key, v));
    } else {
      newParams.append(key, value);
    }

    newParams.set("page", "1");
    router.push(`/storefront/shop?${newParams.toString()}`);
  };

  const updateRange = (key: string, value: string) => {
    const newParams = new URLSearchParams(params.toString());
    if (value === "") {
      newParams.delete(key);
    } else {
      newParams.set(key, value);
    }
    newParams.set("page", "1");
    router.push(`/storefront/shop?${newParams.toString()}`);
  };

  const sidebarContent = (
    <div className="space-y-8 text-sm">
      {/* price range */}
      <div>
        <h3 className="font-medium mb-2">Price</h3>
        <div className="flex gap-2">
          <input
            type="number"
            value={params.get("min") || ""}
            onChange={(e) => updateRange("min", e.target.value)}
            placeholder="Min"
            className="w-full border px-2 py-1 rounded"
          />
          <input
            type="number"
            value={params.get("max") || ""}
            onChange={(e) => updateRange("max", e.target.value)}
            placeholder="Max"
            className="w-full border px-2 py-1 rounded"
          />
        </div>
      </div>

      <FilterGroup
        title="Category"
        items={categories}
        paramKey="category"
        updateFilter={updateFilter}
        params={params}
      />

      <FilterGroup
        title="Brand"
        items={brands}
        paramKey="brand"
        updateFilter={updateFilter}
        params={params}
      />

      <FilterGroup
        title="Scent Family"
        items={scents}
        paramKey="scent"
        updateFilter={updateFilter}
        params={params}
      />

      <div>
        <h3 className="font-medium mb-2">Rating</h3>
        <button
          onClick={() => updateFilter("rating", "4")}
          className="underline"
        >
          4★ and above
        </button>
      </div>

      <button
        onClick={() => router.push("/storefront/shop")}
        className="text-yellow-700 underline"
      >
        Clear All Filters
      </button>
    </div>
  );

  return (
    <>
      <div className="lg:hidden mb-4">
        <button
          className="px-4 py-2 bg-yellow-600 text-white rounded"
          onClick={() => setMobileOpen(true)}
        >
          Filters
        </button>
      </div>
      <div className="hidden lg:block w-64">{sidebarContent}</div>
      {mobileOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-end">
          <div className="bg-white w-full max-h-[80%] p-6 overflow-auto">
            <button
              className="mb-4 text-right w-full"
              onClick={() => setMobileOpen(false)}
            >
              Close
            </button>
            {sidebarContent}
          </div>
        </div>
      )}
    </>
  );
}

interface FilterGroupProps {
  title: string;
  items: string[];
  paramKey: string;
  updateFilter: (key: string, value: string) => void;
  params: ReadonlyURLSearchParams;
}

function FilterGroup({
  title,
  items,
  paramKey,
  updateFilter,
  params,
}: FilterGroupProps) {
  return (
    <div>
      <h3 className="font-medium mb-2">{title}</h3>
      <div className="space-y-1">
        {items.map((item: string, idx: number) => (
          <label key={`${item}-${idx}`} className="flex gap-2 items-center cursor-pointer">
            <input
              type="checkbox"
              checked={params.getAll(paramKey).includes(item)}
              onChange={() => updateFilter(paramKey, item)}
            />
            {item}
          </label>
        ))}
      </div>
    </div>
  );
}