export default function Loading() {
  return (
    <div className="px-6 py-12 space-y-8">
      <div className="grid md:grid-cols-4 gap-6">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="p-6 bg-white rounded-lg shadow space-y-4">
            <div className="h-4 w-20 bg-[#F1EDE7] rounded animate-pulse" />
            <div className="h-8 w-28 bg-[#F1EDE7] rounded animate-pulse" />
          </div>
        ))}
      </div>
    </div>
  );
}