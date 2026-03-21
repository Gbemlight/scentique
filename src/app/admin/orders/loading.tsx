export default function Loading() {
  return (
    <div className="px-6 py-12">
      <div className="h-8 w-40 bg-[#F1EDE7] rounded mb-6 animate-pulse" />
      <div className="space-y-4">
        {Array.from({ length: 8 }).map((_, i) => (
          <div key={i} className="h-16 bg-[#F1EDE7] rounded animate-pulse" />
        ))}
      </div>
    </div>
  );
}