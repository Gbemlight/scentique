"use client";

interface PaginationProps {
  total: number;
  pageSize: number;
  currentPage: number;
  onPageChange: (page: number) => void;
}

export default function Pagination({
  total,
  pageSize,
  currentPage,
  onPageChange,
}: PaginationProps) {
  const totalPages = Math.ceil(total / pageSize);

  if (totalPages <= 1) return null;

  const handlePrevious = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
    }
  };

  return (
    <div className="flex justify-center items-center gap-4">
      <button onClick={handlePrevious} disabled={currentPage === 1} className="px-3 py-1 border rounded cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed text-sm">
        Previous
      </button>

      <span className="text-sm text-gray-600">
        Page {currentPage} of {totalPages}
      </span>

      <button onClick={handleNext} disabled={currentPage === totalPages} className="px-3 py-1 border rounded cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed text-sm">
        Next
      </button>
    </div>
  );
}