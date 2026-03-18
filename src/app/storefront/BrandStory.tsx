"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";

export default function BrandStory() {
  const [visible, setVisible] = useState(false);
  const ref = useRef<HTMLDivElement | null>(null);

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
    <section
      ref={ref}
      className={`py-24 px-6 transition-all duration-1000 ${
        visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
      }`}
    >
      <div className="grid lg:grid-cols-2 gap-12 items-center">
        
        {/* Image */}
        <div>
          <img
            src="https://i.pinimg.com/736x/45/9d/2c/459d2cf50331285ef03c18f1dcce7489.jpg"
            alt="Our Story"
            className="w-full h-125 object-cover rounded-md"
            referrerPolicy="no-referrer"
          />
        </div>

        {/* Text */}
        <div>
          {/* Gold Rule */}
          <div className="w-12 h-0.5 bg-yellow-600 mb-4" />

          {/* Eyebrow */}
          <p className="uppercase tracking-widest text-xs text-gray-500 mb-3">
            Our Heritage
          </p>

          {/* Headline */}
          <h2 className="font-serif text-3xl md:text-4xl mb-6 leading-snug">
            A Legacy of Timeless Craftsmanship
          </h2>

          <p className="text-gray-600 mb-4">
            At Olalee Lifestyle, fragrance is more than scent —
            it is memory, presence, and quiet confidence bottled.
          </p>

          <p className="text-gray-600 mb-6">
            Every composition is curated with intention,
            blending rare notes into stories that linger long
            after the moment fades.
          </p>

          <Link
            href="/storefront/about"
            className="inline-block text-sm uppercase tracking-wide border-b border-black pb-1 hover:opacity-70 transition"
          >
            Our Story →
          </Link>
        </div>
      </div>
    </section>
  );
}
