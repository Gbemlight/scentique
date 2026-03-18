"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import Button from "@/components/ui/Button";
import clsx from "clsx";
import BestSellers from "./BestSellers";
import BrandStory from "./BrandStory";
import Testimonials from "./Testimonials";
// import NewsletterSignup from "@/app/storefront/NewsletterSignup";
// (no debug logs)
// quick runtime check
// (debug logs removed)
const slides = [
  {
    image: "https://i.pinimg.com/736x/45/9d/2c/459d2cf50331285ef03c18f1dcce7489.jpg",
    title: "Crafted for Timeless Elegance",
    subtitle: "Discover fragrances that define presence and sophistication.",
  },
  {
    image: "https://i.pinimg.com/736x/95/13/8e/95138e0951241d6b9573fbfea0fb5bfd.jpg",
    title: "A Signature in Every Scent",
    subtitle: "Curated aromas inspired by refinement and grace.",
  },
  {
    image: "https://i.pinimg.com/736x/43/33/09/433309f73108336580df96cb4b4019fa.jpg",
    title: "Luxury That Lingers",
    subtitle: "Experience notes that stay long after you leave.",
  },
];

export default function HomePage() {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true });
  const [selectedIndex, setSelectedIndex] = useState(0);
  const autoplayRef = useRef<NodeJS.Timeout | null>(null);

  const scrollTo = useCallback(
    (index: number) => emblaApi && emblaApi.scrollTo(index),
    [emblaApi]
  );

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;

    emblaApi.on("select", onSelect);
    onSelect();

    const stopAutoplay = () => {
      if (autoplayRef.current) clearInterval(autoplayRef.current);
    };

    const startAutoplay = () => {
      autoplayRef.current = setInterval(() => {
        emblaApi.scrollNext();
      }, 5000);
    };

    startAutoplay();

    const rootNode = emblaApi.rootNode();
    rootNode.addEventListener("mouseenter", stopAutoplay);
    rootNode.addEventListener("mouseleave", startAutoplay);

    return () => {
      stopAutoplay();
      emblaApi.off("select", onSelect);
    };
  }, [emblaApi, onSelect]);

  return (
    <main className="flex flex-col">
      {/* Hero Section */}
      <section className="relative h-screen overflow-hidden">
        <div className="h-full" ref={emblaRef}>
          <div className="flex h-full">
            {slides.map((slide, index) => (
              <div
                key={index}
                className="relative flex-[0_0_100%] h-full"
              >
                <img
                  src={slide.image}
                  alt={slide.title}
                  className="absolute inset-0 w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />

                <div className="absolute inset-0 bg-lineart-to-b from-black/60 via-black/40 to-black/70" />

                <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-6">
                  <h1
                    className={clsx(
                      "font-serif text-white leading-tight",
                      "text-4xl sm:text-5xl md:text-6xl lg:text-7xl",
                      "opacity-0 animate-fade-up"
                    )}
                  >
                    {slide.title}
                  </h1>

                  <p
                    className={clsx(
                      "mt-6 text-white/90 max-w-xl",
                      "text-base sm:text-lg md:text-xl",
                      "opacity-0 animate-fade-up-delay"
                    )}
                  >
                    {slide.subtitle}
                  </p>

                  <div className="mt-8 flex gap-4 flex-wrap justify-center">
                    <Button variant="primary" size="lg">
                      Shop Now
                    </Button>
                    <Button variant="ghost" size="lg">
                      Explore Collections
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Dot Indicators */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-3">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => scrollTo(index)}
              className={clsx(
                "w-3 h-3 rounded-full transition-all duration-300",
                selectedIndex === index
                  ? "bg-white scale-110"
                  : "bg-white/40"
              )}
            />
          ))}
        </div>
      </section>

      {/* ✅ Best Sellers Section */}
      <BestSellers />
    </main>
  );
}