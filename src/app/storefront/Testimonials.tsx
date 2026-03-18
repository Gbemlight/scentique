"use client";

import { useEffect, useRef, useState } from "react";

const reviews = [
  {
    id: 1,
    text: "This fragrance changed how I experience luxury. Absolutely divine.",
    name: "Amara Johnson",
    product: "Midnight Oud",
    rating: 5,
  },
  {
    id: 2,
    text: "Long-lasting, elegant, and unforgettable. Worth every naira.",
    name: "David Chen",
    product: "Velvet Amber",
    rating: 5,
  },
  {
    id: 3,
    text: "A scent that commands attention without saying a word.",
    name: "Sophia Laurent",
    product: "Golden Bloom",
    rating: 4,
  },
];

export default function Testimonials() {
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
      <h2 className="text-3xl md:text-4xl font-serif text-center mb-12">
        What Our Customers Say
      </h2>

      <div className="flex md:grid md:grid-cols-3 gap-6 overflow-x-auto md:overflow-visible snap-x snap-mandatory">
        {reviews.map((review) => (
          <div
            key={review.id}
            className="snap-start min-w-[85%] md:min-w-0 bg-[#F6F1EA] p-8 rounded-lg shadow-md"
          >
            <div className="text-5xl text-yellow-700 mb-4">“</div>

            <p className="text-gray-700 mb-4">{review.text}</p>

            <div className="flex mb-3">
              {Array.from({ length: review.rating }).map((_, i) => (
                <span key={i}>⭐</span>
              ))}
            </div>

            <p className="font-semibold">{review.name}</p>
            <p className="text-sm text-gray-500">
              Purchased {review.product}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}