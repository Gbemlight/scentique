"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import clsx from "clsx";
import { products } from "@/lib/dummyProducts";
import ProductCard from "@/components/ui/ProductCard";

export default function BestSellers() {
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const [visible, setVisible] = useState(false);

  const filteredProducts = products.filter(
    (p) => p.isFeatured || p.isBestSeller
  );

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="py-20 px-6 max-w-7xl mx-auto">
      {/* Heading Row */}
      <div className="flex items-center justify-between mb-12">
        <h2 className="font-serif text-3xl md:text-4xl">
          Best Sellers
        </h2>

        <Link
          href="/storefront/shop"
          className="text-sm hover:underline"
        >
          View All →
        </Link>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {filteredProducts.map((product, index) => (
          <div
            key={product.id}
            className={clsx(
              "transition-all duration-700 ease-out",
              visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
            )}
            style={{
              transitionDelay: `${index * 150}ms`,
            }}
          >
            <ProductCard product={product} />
          </div>
        ))}
      </div>

      {/* Bottom Link */}
      <div className="text-center mt-12">
        <Link
          href="/storefront/shop"
          className="text-sm tracking-wide hover:underline"
        >
          View All Products
        </Link>
      </div>
    </section>
  );
}