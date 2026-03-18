"use client";

import { createContext, useContext, useState, ReactNode, useEffect } from "react";
import { toast } from "sonner";
import type { Product } from "@/lib/dummyProducts";

type WishlistContextType = {
  wishlist: Product[];
  toggleWishlist: (product: Product) => void;
  isInWishlist: (id: string) => boolean;
  clearWishlist: () => void;
};

const WishlistContext = createContext<WishlistContextType | undefined>(undefined);

export function WishlistProvider({ children }: { children: ReactNode }) {
  const [wishlist, setWishlist] = useState<Product[]>([]);
  const [isInitialized, setIsInitialized] = useState(false);

  // Load wishlist from localStorage on initial client-side render
  useEffect(() => {
    try {
      const storedWishlist = localStorage.getItem("scentique-wishlist");
      if (storedWishlist) {
        setWishlist(JSON.parse(storedWishlist));
      }
    } catch (error) {
      console.error("Failed to load wishlist from localStorage", error);
      localStorage.removeItem("scentique-wishlist");
    }
    setIsInitialized(true);
  }, []);

  // Save wishlist to localStorage whenever it changes
  useEffect(() => {
    if (isInitialized) {
      localStorage.setItem("scentique-wishlist", JSON.stringify(wishlist));
    }
  }, [wishlist, isInitialized]);

  const toggleWishlist = (product: Product) => {
    setWishlist((prev) => {
      const exists = prev.some((item) => item.id === product.id);
      if (exists) {
        toast.success(`${product.name} removed from wishlist.`);
        return prev.filter((item) => item.id !== product.id);
      } else {
        toast.success(`${product.name} added to wishlist!`);
        return [...prev, product];
      }
    });
  };

  const isInWishlist = (id: string) => {
    return wishlist.some((item) => item.id === id);
  };

  const clearWishlist = () => setWishlist([]);

  return (
    <WishlistContext.Provider
      value={{ wishlist, toggleWishlist, isInWishlist, clearWishlist }}
    >
      {children}
    </WishlistContext.Provider>
  );
}

export function useWishlist() {
  const context = useContext(WishlistContext);
  if (!context) {
    throw new Error("useWishlist must be used within WishlistProvider");
  }
  return context;
}