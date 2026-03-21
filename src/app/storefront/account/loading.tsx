export default function Loading() {
  return (
    <div className="max-w-7xl mx-auto px-6 py-12 space-y-6">
      <div className="h-8 w-40 bg-[#F1EDE7] rounded animate-pulse" />
      <div className="grid md:grid-cols-3 gap-8">
        <div className="h-64 bg-[#F1EDE7] rounded animate-pulse" />
        <div className="md:col-span-2 h-64 bg-[#F1EDE7] rounded animate-pulse" />
      </div>
    </div>
  );
}