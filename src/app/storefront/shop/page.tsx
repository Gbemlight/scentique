import { products } from "@/lib/dummyProducts";
import Link from "next/link";
import { redirect } from "next/navigation";
import FilterSidebar from "./FilterSidebar";
import SortDropdown from "./SortDropdown";
import ProductGrid from "./ProductGrid";
import Pagination from "./Pagination";
import ActiveFilterChips from "./ActiveFilterChips";
import MobileFilterDrawer from "@/app/storefront/shop/MobileFilterDrawer";

interface Props {
  // Next.js may provide searchParams as a Promise in some cases
  searchParams: Promise<{ [key: string]: string | string[] | undefined }> | {
    [key: string]: string | string[] | undefined;
  };
}

export default async function ShopPage({ searchParams }: Props) {
  // searchParams can be a Promise; unwrap before accessing
  const rawParams = await searchParams;

  // strip out any empty-filter entries; redirect so the browser URL is clean
  const entries = Object.entries(rawParams).filter(([k, v]) => v === "");
  if (entries.length) {
    const clean = new URLSearchParams(rawParams as any);
    entries.forEach(([k]) => clean.delete(k));
    redirect(`/storefront/shop?${clean.toString()}`);
  }

  // make a plain, serializable snapshot of searchParams to avoid
  // RSC model hydration mismatches when passing to client components
  const paramsObj: Props["searchParams"] = Object.fromEntries(
    Object.entries(rawParams)
  );

  // debug (server logs appear in terminal)

  let filtered = [...products];

  const page = Number(paramsObj.page ?? 1);
  const sort = paramsObj.sort ?? "featured";

  // clean up empty-string query params
  const categories = toArray(paramsObj.category).filter((v) => v !== "");
  const brands = toArray(paramsObj.brand).filter((v) => v !== "");
  const scents = toArray(paramsObj.scent).filter((v) => v !== "");

  // parse numeric filters but ignore blank strings
  const min = paramsObj.min === "" ? 0 : Number(paramsObj.min ?? 0);
  const max = paramsObj.max === "" ? Infinity : Number(paramsObj.max ?? Infinity);
  const rating = paramsObj.rating === "" ? 0 : Number(paramsObj.rating ?? 0);

  // FILTERS
  if (categories.length)
    filtered = filtered.filter(p => categories.includes(p.category));

  if (brands.length)
    filtered = filtered.filter(p => brands.includes(p.brand));

  if (scents.length)
    filtered = filtered.filter(p => scents.includes(p.scentFamily));

  filtered = filtered.filter(p => p.price >= min && p.price <= max);
  filtered = filtered.filter(p => p.rating >= rating);

  // SORT
  if (sort === "newest")
    filtered.sort((a, b) => Number(b.id) - Number(a.id));

  if (sort === "price-asc")
    filtered.sort((a, b) => a.price - b.price);

  if (sort === "price-desc")
    filtered.sort((a, b) => b.price - a.price);

  if (sort === "rating")
    filtered.sort((a, b) => b.rating - a.rating);

  // PAGINATION
  const pageSize = 6;
  const total = filtered.length;
  const paginated = filtered.slice(
    (page - 1) * pageSize,
    page * pageSize
  );



  return (
    <main className="px-6 py-16 max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <p className="text-sm text-gray-500">
          <Link href="/">Home</Link> &gt; Shop
        </p>
        <h1 className="font-serif text-4xl mt-3">The Shop</h1>
        <p className="text-sm text-gray-600 mt-2">
          Showing {paginated.length} of {total} products
        </p>
      </div>

      <ActiveFilterChips searchParams={paramsObj} />

      <div className="flex gap-10">
        <div className="hidden lg:block w-64">
          <FilterSidebar products={products} />
        </div>

        <div className="flex-1">
          <div className="flex justify-end mb-6">
            <SortDropdown />
          </div>

          {paginated.length === 0 ? (
            <div className="text-center py-24">
              <div className="mb-4">
                {/* placeholder illustration - replace with nicer asset if available */}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="mx-auto h-24 w-24 text-gray-300"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 17v-2a4 4 0 014-4h3m4 0v6m0 0l-2-2m2 2l2-2"
                  />
                </svg>
              </div>
              <p className="text-lg font-medium mb-4">
                No products match your filters
              </p>
              <p className="text-gray-500 mb-4">
                Try adjusting your filters or clear them to start over.
              </p>
              <Link href="/storefront/shop" className="text-yellow-700 underline">
                Clear Filters
              </Link>
            </div>
          ) : (
            <>
              <ProductGrid products={paginated} />
              <Pagination total={total} pageSize={pageSize} currentPage={page} />
            </>
          )}
        </div>
      </div>
    </main>
  );
}

function toArray(value: any) {
  if (!value) return [];
  return Array.isArray(value) ? value : [value];
}