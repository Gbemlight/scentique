export default function Loading() {
  return (
    <div className="max-w-7xl mx-auto px-6 py-16">
      {/* Page Header */}
      <div className="mb-8">
        <div className="h-4 w-32 bg-[#F1EDE7] rounded mb-3 animate-pulse" />
        <div className="h-10 w-48 bg-[#F1EDE7] rounded mb-2 animate-pulse" />
        <div className="h-4 w-40 bg-[#F1EDE7] rounded animate-pulse" />
      </div>

      <div className="flex gap-10">
        {/* Sidebar Skeleton */}
        <div className="hidden lg:block w-64 space-y-8">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="space-y-2">
              <div className="h-5 w-24 bg-[#F1EDE7] rounded animate-pulse" />
              <div className="space-y-1">
                <div className="h-4 w-full bg-[#F1EDE7] rounded animate-pulse" />
                <div className="h-4 w-3/4 bg-[#F1EDE7] rounded animate-pulse" />
                <div className="h-4 w-5/6 bg-[#F1EDE7] rounded animate-pulse" />
              </div>
            </div>
          ))}
        </div>

        <div className="flex-1">
          {/* Sort Dropdown Skeleton */}
          <div className="flex justify-end mb-6">
            <div className="h-10 w-40 bg-[#F1EDE7] rounded animate-pulse" />
          </div>

          {/* Product Grid Skeleton (12 items) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {Array.from({ length: 12 }).map((_, i) => (
              <div key={i} className="h-full flex flex-col">
                {/* Image (matches ProductCard h-80) */}
                <div className="relative overflow-hidden rounded-lg bg-[#F1EDE7] shrink-0 h-80 animate-pulse" />
                {/* Content */}
                <div className="mt-4 space-y-3 flex-1 flex flex-col">
                  <div className="h-3 w-12 bg-[#F1EDE7] rounded animate-pulse" />
                  <div className="h-6 w-3/4 bg-[#F1EDE7] rounded animate-pulse" />
                  <div className="h-5 w-24 bg-[#F1EDE7] rounded animate-pulse" />
                  <div className="h-4 w-20 bg-[#F1EDE7] rounded animate-pulse" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}