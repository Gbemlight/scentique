"use client";

import { useState } from "react";
import { useRouter, useSearchParams, ReadonlyURLSearchParams } from "next/navigation";
import { Product } from "@/lib/dummyProducts";

interface Props {
  products: Product[];
}

export default function MobileFilterDrawer({ products }: Props) {
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const params = useSearchParams();

  const categories = [...new Set(products.map(p => p.category))];
  const brands = [...new Set(products.map(p => p.brand))];
  const scents = [...new Set(products.map(p => p.scentFamily))];

  const updateFilter = (key: string, value: string) => {
    const newParams = new URLSearchParams(params.toString());
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

  return (
    <>
      {/* Trigger Button */}
      <button
        onClick={() => setOpen(true)}
        className="lg:hidden border px-4 py-2 rounded-md text-sm"
      >
        Filters
      </button>

      {/* Backdrop */}
      <div
        className={`fixed inset-0 bg-black/40 z-40 transition-opacity ${
          open ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        onClick={() => setOpen(false)}
      />

      {/* Bottom Sheet */}
      <div
        className={`fixed bottom-0 left-0 right-0 bg-white z-50 rounded-t-2xl p-6 max-h-[85vh] overflow-y-auto transition-transform duration-300 ${
          open ? "translate-y-0" : "translate-y-full"
        }`}
      >
        <div className="flex justify-between items-center mb-6">
          <h2 className="font-serif text-xl">Filters</h2>
          <button onClick={() => setOpen(false)}>✕</button>
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

        <button
          onClick={() => router.push("/storefront/shop")}
          className="mt-6 text-yellow-700 underline"
        >
          Clear All Filters
        </button>
      </div>
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

function FilterGroup({ title, items, paramKey, updateFilter, params }: FilterGroupProps) {
  return (
    <div className="mb-6">
      <h3 className="font-medium mb-3">{title}</h3>
      <div className="space-y-2">
        {items.map((item: string) => (
          <label key={item} className="flex gap-2 items-center cursor-pointer">
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