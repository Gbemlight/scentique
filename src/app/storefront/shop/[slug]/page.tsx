import { notFound } from "next/navigation";
import { Heart, Star } from "lucide-react";
import { products } from "@/lib/dummyProducts";
import Breadcrumb from "@/components/ui/Breadcrumb";
import ImageGallery from "@/components/shop/ImageGallery";
import ProductDetailClient from "@/components/shop/ProductDetailClient";

interface ProductDetailPageProps {
  params: Promise<{ slug: string }>;
}

export default async function ProductDetailPage({ params }: ProductDetailPageProps) {
  const { slug } = await params;

  // Find product by ID or name slug
  const product = products.find(
    (p) => p.id === slug || p.name.toLowerCase().replace(/\s+/g, "-") === slug
  );

  if (!product) {
    notFound();
  }

  const breadcrumbItems = [
    { label: "Home", href: "/" },
    { label: "Shop", href: "/storefront/shop" },
    { label: product.category, href: `/storefront/shop?category=${product.category}` },
    { label: product.name },
  ];

  return (
    <main className="px-6 py-12 max-w-7xl mx-auto">
      {/* Breadcrumb */}
      <Breadcrumb items={breadcrumbItems} />

      {/* Two-Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Image Gallery - Left */}
        <div>
          <ImageGallery
            mainImage={product.image}
            thumbnails={product.thumbnails || [product.image, product.image, product.image, product.image]}
            productName={product.name}
          />
        </div>

        {/* Product Info - Right */}
        <ProductDetailClient product={product} />
      </div>

      {/* Scent Profile Section - Below */}
      {product.scent && (
        <div className="mt-16 pt-12 border-t border-neutral-200">
          <h2 className="font-playfair text-2xl font-semibold mb-8">Scent Profile</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Top Notes */}
            <div>
              <h3 className="font-semibold text-neutral-900 mb-4 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-amber-400"></span>
                Top Notes
              </h3>
              <ul className="space-y-2 text-neutral-600">
                {product.scent.top.map((note, idx) => (
                  <li key={idx}>{note}</li>
                ))}
              </ul>
            </div>

            {/* Middle Notes */}
            <div>
              <h3 className="font-semibold text-neutral-900 mb-4 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-amber-500"></span>
                Middle Notes
              </h3>
              <ul className="space-y-2 text-neutral-600">
                {product.scent.middle.map((note, idx) => (
                  <li key={idx}>{note}</li>
                ))}
              </ul>
            </div>

            {/* Base Notes */}
            <div>
              <h3 className="font-semibold text-neutral-900 mb-4 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-amber-700"></span>
                Base Notes
              </h3>
              <ul className="space-y-2 text-neutral-600">
                {product.scent.base.map((note, idx) => (
                  <li key={idx}>{note}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}

      {/* Reviews Section Placeholder */}
      <div className="mt-16 pt-12 border-t border-neutral-200">
        <h2 className="font-playfair text-2xl font-semibold mb-6">Customer Reviews</h2>
        <div className="text-neutral-600 p-8 bg-cream-50 rounded-lg text-center">
          <p>Reviews section coming soon...</p>
        </div>
      </div>
    </main>
  );
}
