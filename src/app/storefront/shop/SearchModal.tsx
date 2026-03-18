"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { X, Search, ArrowRight, Heart, ShoppingCart } from "lucide-react";
import { useRouter } from "next/navigation";
import { products, type Product } from "@/lib/dummyProducts";
import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";
import { toast } from "sonner";
import clsx from "clsx";

// In-memory storage for recent searches (persists while app is running)
let memoryRecentSearches: string[] = [];

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function SearchModal({ isOpen, onClose }: SearchModalProps) {
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);
  const { addToCart } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();

  const [query, setQuery] = useState("");
  const [results, setResults] = useState<Product[]>([]);
  const [recent, setRecent] = useState<string[]>(memoryRecentSearches);
  const [activeIndex, setActiveIndex] = useState(-1);

  /* ================================
     Auto Focus When Modal Opens
  ================================= */
  useEffect(() => {
    if (isOpen) {
      // Reset state on open
      setQuery("");
      setResults([]);
      setActiveIndex(-1);
      setRecent(memoryRecentSearches);
      
      // Small timeout to ensure modal is rendered before focusing
      const timer = setTimeout(() => {
        inputRef.current?.focus();
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  /* ================================
     Debounced Search (200ms)
  ================================= */
  useEffect(() => {
    const handler = setTimeout(() => {
      if (query.trim() === "") {
        setResults([]);
        return;
      }

      const filtered = (products || [])
        .filter((product) =>
          product.name.toLowerCase().includes(query.toLowerCase()) ||
          product.brand.toLowerCase().includes(query.toLowerCase()) ||
          product.category.toLowerCase().includes(query.toLowerCase())
        )
        .slice(0, 8);

      setResults(filtered);
      setActiveIndex(-1); // Reset selection on new results
    }, 200);

    return () => clearTimeout(handler);
  }, [query]);

  const addToRecent = useCallback((term: string) => {
    const updated = [term, ...memoryRecentSearches.filter((r) => r !== term)].slice(0, 5);
    memoryRecentSearches = updated;
    setRecent(updated);
  }, [setRecent]);

  /* ================================
     Handle Result Click
  ================================= */
  const handleSelect = useCallback((product: Product) => {
    addToRecent(product.name);
    // Use slug if available, otherwise fallback to id
    const slug = (product as any).slug || product.id;
    router.push(`/storefront/shop/${slug}`);
    onClose();
  }, [addToRecent, onClose, router]);

  const handleSearchTerm = useCallback((term: string) => {
    setQuery(term);
    addToRecent(term);
  }, [addToRecent, setQuery]);

  const handleAddToCart = useCallback((e: React.MouseEvent, product: Product) => {
    e.stopPropagation();
    addToCart(product);
    toast.success(`${product.name} added to cart`);
  }, [addToCart]);

  const handleToggleWishlist = useCallback((e: React.MouseEvent, product: Product) => {
    e.stopPropagation();
    // The wishlist context handles its own toast notifications
    toggleWishlist(product);
  }, [toggleWishlist]);

  /* ================================
     Keyboard Navigation
  ================================= */
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;

      if (e.key === "Escape") {
        onClose();
      }

      if (results.length > 0) {
        if (e.key === "ArrowDown") {
          e.preventDefault();
          setActiveIndex((prev) =>
            prev < results.length - 1 ? prev + 1 : 0
          );
        }

        if (e.key === "ArrowUp") {
          e.preventDefault();
          setActiveIndex((prev) =>
            prev > 0 ? prev - 1 : results.length - 1
          );
        }

        if (e.key === "Enter" && activeIndex >= 0 && results[activeIndex]) {
          handleSelect(results[activeIndex]);
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, results, activeIndex, onClose, handleSelect]);

  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 z-50 bg-[#f8f4ef]/95 backdrop-blur-md flex flex-col p-6 md:p-12 overflow-y-auto"
      onClick={(e) => {
        // Close on backdrop click
        if (e.target === e.currentTarget) onClose();
      }}
    >
      
      {/* Close Button */}
      <div className="flex justify-end max-w-4xl mx-auto w-full">
        <button 
          onClick={onClose}
          className="p-2 hover:bg-black/5 rounded-full transition-colors"
        >
          <X size={30} className="text-gray-800" />
        </button>
      </div>

      <div className="w-full max-w-3xl mx-auto mt-8">
        {/* Search Input */}
        <div className="relative">
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search products..."
            className="w-full text-3xl md:text-5xl font-serif border-b-2 border-gray-300 pb-4 outline-none bg-transparent placeholder:text-gray-400 focus:border-black transition-colors"
          />
          <Search className="absolute right-0 top-2 text-gray-400" size={32} />
        </div>

        {/* Recent Searches */}
        {query === "" && recent.length > 0 && (
          <div className="mt-10 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <p className="text-sm font-medium text-gray-500 mb-4 uppercase tracking-wider">Recent Searches</p>
            <div className="flex flex-wrap gap-3">
              {recent.map((item, index) => (
                <button
                  key={index}
                  onClick={() => handleSearchTerm(item)}
                  className="px-5 py-2 bg-white border border-gray-200 rounded-full text-sm hover:border-gray-400 hover:bg-gray-50 transition-all"
                >
                  {item}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Popular Searches */}
        {query === "" && (
          <div className="mt-10 animate-in fade-in slide-in-from-bottom-4 duration-500 delay-100">
            <p className="text-sm font-medium text-gray-500 mb-4 uppercase tracking-wider">Popular Searches</p>
            <div className="flex flex-wrap gap-3">
              {["Oud", "Rose", "Vanilla", "Gift Sets"].map((item) => (
                <button
                  key={item}
                  onClick={() => handleSearchTerm(item)}
                  className="px-5 py-2 border border-gray-300 rounded-full text-sm hover:bg-black hover:text-white hover:border-black transition-all"
                >
                  {item}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Results */}
        <div className="mt-12 space-y-2">
          {results.length > 0 ? (
            results.map((product, index) => {
              const liked = isInWishlist(product.id);
              return (
                <div
                  key={product.id}
                  onClick={() => handleSelect(product)}
                  className={`flex items-center gap-4 p-4 rounded-xl cursor-pointer transition-all duration-200 group ${
                    index === activeIndex ? "bg-white shadow-md scale-[1.01]" : "hover:bg-white/60 hover:shadow-sm"
                  }`}
                >
                  <div className="w-16 h-16 bg-gray-100 rounded-lg overflow-hidden shrink-0">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-center">
                      <div className="min-w-0">
                        <p className="font-medium text-lg text-gray-900 truncate">{product.name}</p>
                        <p className="text-sm text-gray-500">{product.brand} • {product.category}</p>
                      </div>
                      <div className="flex items-center gap-2 shrink-0">
                        <p className="font-semibold text-gray-900 w-28 text-right">₦{product.price.toLocaleString()}</p>
                        <div className="flex items-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                          <button
                            onClick={(e) => handleToggleWishlist(e, product)}
                            className="p-2 rounded-full hover:bg-black/5 active:scale-90 transition-all"
                            aria-label={liked ? "Remove from wishlist" : "Add to wishlist"}
                          >
                            <Heart size={18} className={clsx("transition-all", liked ? "fill-red-500 text-red-500" : "text-gray-500")} />
                          </button>
                          <button
                            onClick={(e) => handleAddToCart(e, product)}
                            className="p-2 rounded-full hover:bg-black/5 active:scale-90 transition-all"
                            aria-label="Add to cart"
                          >
                            <ShoppingCart size={18} className="text-gray-600" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className={`text-gray-400 ${index === activeIndex ? "opacity-100" : "opacity-0 group-hover:opacity-100"}`}>
                    <ArrowRight size={20} />
                  </div>
                </div>
              );
            })
          ) : query ? (
            <div className="text-center py-12 animate-in fade-in zoom-in-95 duration-300">
              <p className="text-gray-500 text-lg mb-4">No results found for "{query}"</p>
              <button
                onClick={() => {
                  router.push("/storefront/shop");
                  onClose();
                }}
                className="inline-flex items-center gap-2 text-black font-medium hover:underline underline-offset-4"
              >
                Browse all products <ArrowRight size={16} />
              </button>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}
