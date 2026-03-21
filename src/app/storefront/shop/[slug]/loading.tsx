export default function Loading() {
  return (
    <div className="max-w-7xl mx-auto px-6 py-16 grid lg:grid-cols-2 gap-12">
      {/* Image */}
      <div className="h-125 bg-[#F1EDE7] rounded-lg animate-pulse" />
      {/* Info */}
      <div className="space-y-6">
        <div className="h-4 w-20 bg-[#F1EDE7] rounded animate-pulse" /> {/* Brand */}
        <div className="h-8 w-2/3 bg-[#F1EDE7] rounded animate-pulse" />
        <div className="h-6 w-1/3 bg-[#F1EDE7] rounded animate-pulse" />
        <div className="h-4 w-24 bg-[#F1EDE7] rounded animate-pulse" /> {/* Rating */}
        
        <div className="space-y-3">
          <div className="h-4 bg-[#F1EDE7] rounded animate-pulse" />
          <div className="h-4 bg-[#F1EDE7] rounded animate-pulse" />
          <div className="h-4 w-2/3 bg-[#F1EDE7] rounded animate-pulse" />
        </div>
        
        <div className="pt-6">
          <div className="h-12 w-full bg-[#F1EDE7] rounded animate-pulse" />
        </div>
      </div>
    </div>
  );
}