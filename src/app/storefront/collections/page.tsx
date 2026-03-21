"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";

const collections = [
  {
    id: 1,
    name: "Oud Collection",
    description: "Deep, rich, and timeless oud compositions.",
    image: "https://picsum.photos/800/600?random=31",
  },
  {
    id: 2,
    name: "Floral Essence",
    description: "Soft floral notes crafted for elegance.",
    image: "https://picsum.photos/800/600?random=32",
  },
  {
    id: 3,
    name: "Fresh Citrus",
    description: "Bright and energizing citrus blends.",
    image: "https://picsum.photos/800/600?random=33",
  },
  {
    id: 4,
    name: "Amber & Musk",
    description: "Warm sensual fragrances with depth.",
    image: "https://picsum.photos/800/600?random=34",
  },
];

export default function CollectionsPage() {
  const ref = useRef<HTMLDivElement | null>(null);
  const [visible, setVisible] = useState(false);

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

    if (ref.current) observer.observe(ref.current);

    return () => observer.disconnect();
  }, []);

  return (
    <main className="flex flex-col">

      {/* 🔥 HERO */}
      <section className="relative h-[70vh] flex items-center justify-center text-center">
        <img
          src="https://picsum.photos/1920/1080?random=40"
          className="absolute inset-0 w-full h-full object-cover"
          alt="Collections"
        />
        <div className="absolute inset-0 bg-black/60" />

        <div className="relative z-10 text-white px-6">
          <h1 className="font-serif text-4xl md:text-6xl mb-4">
            Our Collections
          </h1>
          <p className="max-w-xl mx-auto text-white/80">
            Curated fragrance worlds designed to match every mood,
            moment, and identity.
          </p>
        </div>
      </section>

      {/* 🔥 FEATURED COLLECTION */}
      <section className="py-20 px-6 max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          
          <img
            src="https://picsum.photos/900/700?random=41"
            className="w-full h-[500px] object-cover rounded-md"
            alt="Featured"
          />

          <div>
            <div className="w-12 h-[2px] bg-yellow-600 mb-4" />

            <p className="uppercase text-xs tracking-widest text-gray-500 mb-3">
              Featured Collection
            </p>

            <h2 className="font-serif text-3xl md:text-4xl mb-6">
              The Essence of Oud
            </h2>

            <p className="text-gray-600 mb-6">
              Discover one of the most luxurious ingredients in perfumery.
              Deep, woody, and unforgettable.
            </p>

            <Link
              href="/storefront/shop?category=oud"
              className="text-sm uppercase tracking-wide border-b border-black pb-1 hover:opacity-70"
            >
              Explore Collection →
            </Link>
          </div>
        </div>
      </section>

      {/* 🔥 COLLECTION GRID */}
      <section
        ref={ref}
        className="py-20 px-6 max-w-7xl mx-auto"
      >
        <h2 className="font-serif text-3xl md:text-4xl text-center mb-12">
          Explore All Collections
        </h2>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {collections.map((item, index) => (
            <Link
              key={item.id}
              href={`/storefront/shop?collection=${item.name}`}
              className={`group relative overflow-hidden rounded-md transition-all duration-700 ${
                visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
              }`}
              style={{ transitionDelay: `${index * 120}ms` }}
            >
              {/* Image */}
              <div className="overflow-hidden">
                <img
                  src={item.image}
                  className="w-full h-[300px] object-cover group-hover:scale-110 transition duration-700"
                  alt={item.name}
                />
              </div>

              {/* Overlay */}
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition" />

              {/* Text */}
              <div className="absolute bottom-6 left-6 right-6 text-white">
                <h3 className="font-serif text-xl mb-1">
                  {item.name}
                </h3>
                <p className="text-sm text-white/80">
                  {item.description}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* 🔥 CTA */}
      <section className="py-20 text-center bg-[#F6F1EA]">
        <h2 className="font-serif text-3xl mb-4">
          Find Your Signature Scent
        </h2>
        <p className="text-gray-600 mb-6">
          Explore our full range of luxury fragrances crafted for you.
        </p>

        <Link
          href="/storefront/shop"
          className="inline-block px-6 py-3 bg-black text-white text-sm uppercase tracking-wide hover:opacity-80 transition"
        >
          Shop All Products
        </Link>
      </section>
    </main>
  );
}