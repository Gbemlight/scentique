interface ProductFilterBarProps {
  search: string;
  setSearch: (value: string) => void;
  category: string;
  setCategory: (value: string) => void;
  stockStatus: string;
  setStockStatus: (value: string) => void;
  featuredStatus: string;
  setFeaturedStatus: (value: string) => void;
  categories: string[];
}

export default function ProductFilterBar({
  search,
  setSearch,
  category,
  setCategory,
  stockStatus,
  setStockStatus,
  featuredStatus,
  setFeaturedStatus,
  categories,
}: ProductFilterBarProps) {
  return (
    <div className="flex gap-4 items-center flex-wrap">
      <input
        placeholder="Search products..."
        className="border p-2 rounded w-64"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <select
        className="border p-2 rounded"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
      >
        <option value="All">All Categories</option>
        {categories.map(cat => (
          <option key={cat} value={cat}>{cat}</option>
        ))}
      </select>

      <select
        className="border p-2 rounded"
        value={stockStatus}
        onChange={(e) => setStockStatus(e.target.value)}
      >
        <option value="All">All Stock</option>
        <option>In Stock</option>
        <option>Low Stock</option>
        <option>Out of Stock</option>
      </select>

      <select
        className="border p-2 rounded"
        value={featuredStatus}
        onChange={(e) => setFeaturedStatus(e.target.value)}
      >
        <option value="All">All Featured</option>
        <option>Featured</option>
        <option>Not Featured</option>
      </select>
    </div>
  );
}