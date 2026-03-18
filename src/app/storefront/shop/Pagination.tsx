"use client";

import { useRouter, useSearchParams } from "next/navigation";

interface Props {
  total: number;
  pageSize: number;
  currentPage: number;
}

export default function Pagination({
  total,
  pageSize,
  currentPage,
}: Props) {
  const router = useRouter();
  const params = useSearchParams();
  const totalPages = Math.ceil(total / pageSize);

  if (totalPages <= 1) return null;

  const goTo = (page: number) => {
    const newParams = new URLSearchParams(params.toString());
    newParams.set("page", page.toString());
    router.push(`/storefront/shop?${newParams.toString()}`);
  };

  return (
    <div className="flex justify-center gap-2 mt-12">
      <button
        disabled={currentPage === 1}
        onClick={() => goTo(currentPage - 1)}
        className="px-4 py-2 border rounded cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed"
      >
        Previous
      </button>

      {Array.from({ length: totalPages }).map((_, i) => (
        <button
          key={i}
          onClick={() => goTo(i + 1)}
          className={`px-4 py-2 border rounded cursor-pointer ${
            currentPage === i + 1 ? "bg-black text-white" : ""
          }`}
        >
          {i + 1}
        </button>
      ))}

      <button
        disabled={currentPage === totalPages}
        onClick={() => goTo(currentPage + 1)}
        className="px-4 py-2 border rounded cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed"
      >
        Next
      </button>
    </div>
  );
}