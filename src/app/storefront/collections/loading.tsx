export default function Loading() {
  return (
    <div className="px-6 py-16 max-w-7xl mx-auto">
      <div className="h-10 w-60 bg-[#F1EDE7] rounded mb-12 animate-pulse" />
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="h-75 bg-[#F1EDE7] rounded-lg animate-pulse" />
        ))}
      </div>
    </div>
  );
}