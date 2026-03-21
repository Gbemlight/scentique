"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import useEmblaCarousel from "embla-carousel-react";
import Button from "@/components/ui/Button";
import clsx from "clsx";
import BestSellers from "@/app/storefront/BestSellers";
import BrandStory from "@/app/storefront/BrandStory";
import Testimonials from "./storefront/Testimonials";
import NewsletterSignup from "./storefront/NewsletterSignup";
// import BrandStory from "./storefront/BrandStory";

// console.log("[import-check] BrandStory was", BrandStory);

const slides = [
  {
    image: "https://i.pinimg.com/736x/70/19/b3/7019b324d908d8652817880dc2a5efac.jpg",
    title: "Crafted for Timeless Elegance",
    subtitle: "Discover fragrances that define presence and sophistication.",
  },
  {
    image: "https://i.pinimg.com/736x/54/e3/c7/54e3c7710e921b35589fe1c172b0b6a3.jpg",
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

  const scrollTo = useCallback((index: number) => emblaApi && emblaApi.scrollTo(index), [emblaApi]);

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
              <div key={index} className="relative flex-[0_0_100%] h-full">
                <img src={slide.image} alt={slide.title} className="absolute inset-0 w-full h-full object-cover" loading="eager" referrerPolicy="no-referrer" />

                <div className="absolute inset-0 bg-linear-to-b from-black/60 via-black/40 to-black/70" />

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
                    <Link href="/storefront/shop">
                      <Button variant="primary" size="lg" className="cursor-pointer">
                        Shop Now
                      </Button>
                    </Link>
                    <Link href="/storefront/collections">
                      <Button variant="ghost" size="lg" className="cursor-pointer">
                        Explore Collections
                      </Button>
                    </Link>
                  </div>
                </div>
                {/* {slide.title && (
                  <img
                    src={slide.image}
                    alt={slide.title}
                  //   className="hidden md:block absolute bottom-8 right-8 w-44 h-44 object-cover rounded-md shadow-lg ring-1 ring-black/10"
                   />
                )} */}
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
                selectedIndex === index ? "bg-white scale-110" : "bg-white/40"
              )}
            />
          ))}
        </div>
      </section>

      {/* Sections re-added one by one */}
      <BestSellers />
      <BrandStory />
      <Testimonials />
      <NewsletterSignup />
    </main>
  );
}
