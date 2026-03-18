"use client";

import { useRouter } from "next/navigation";

export default function ActiveFilterChips({
  searchParams,
}: {
  searchParams: Record<string, unknown>;
}) {
  const router = useRouter();

  const entries: [string, unknown][] = Object.entries(searchParams).filter(
    ([key]) => key !== "page"
  );

  if (!entries.length) return null;

  const removeFilter = (key: string) => {
    const stringParams: Record<string, string> = Object.entries(searchParams).reduce(
      (acc, [k, v]) => {
        acc[k] = String(v);
        return acc;
      },
      {} as Record<string, string>
    );
    const newParams = new URLSearchParams(stringParams);
    newParams.delete(key);
    router.push(`/storefront/shop?${newParams.toString()}`);
  };

  return (
    <div className="flex flex-wrap gap-2 mb-6">
      {entries.map(([key, value]) => (
        <button
          key={key}
          onClick={() => removeFilter(key)}
          className="px-3 py-1 bg-yellow-600 text-white text-sm rounded-full cursor-pointer"
        >
          {key}: {String(value)} ✕
        </button>
      ))}
    </div>
  );
}