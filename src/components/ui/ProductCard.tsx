"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Heart, Star } from "lucide-react";
import clsx from "clsx";
import { toast } from "sonner";
import type { Product } from "@/lib/dummyProducts";
import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const router = useRouter();
  const { addToCart } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();
  const [heartBounce, setHeartBounce] = useState(false);

  const liked = isInWishlist(product.id);

  // Determine if product is on sale (originalPrice higher than price)
  const isOnSale = product.originalPrice && product.originalPrice > product.price;

  // Generate slug from product name if not available
  const slug = (product as any).slug || product.id;

  const handleNavigate = () => {
    router.push(`/storefront/shop/${slug}`);
  };

  const handleWishlistToggle = (e: React.MouseEvent) => {
    e.stopPropagation();
    setHeartBounce(true);
    toggleWishlist(product);
    setTimeout(() => setHeartBounce(false), 600);
  };

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    addToCart(product);
    toast.success(`${product.name} added to cart`);
  };

  return (
    <div
      onClick={handleNavigate}
      className="group cursor-pointer h-full flex flex-col"
    >
      <div className="relative overflow-hidden rounded-lg bg-cream-50 shrink-0">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-80 object-cover transition-transform duration-700 ease-out group-hover:scale-110"
          referrerPolicy="no-referrer"
        />
        
        {product.badge && (
          <div className="absolute top-4 left-4 bg-black text-white text-xs font-semibold px-3 py-1 rounded-full shadow-md">
            {product.badge}
          </div>
        )}

        <button
          onClick={handleWishlistToggle}
          className="absolute top-4 right-4 bg-white/95 backdrop-blur-sm p-2.5 rounded-full shadow-md transition-all duration-200 hover:bg-white active:scale-90"
          aria-label={liked ? "Remove from wishlist" : "Add to wishlist"}
        >
          <Heart
            size={20}
            className={clsx(
              "transition-all duration-300",
              liked ? "fill-red-500 text-red-500" : "text-gray-700",
              heartBounce && "scale-125"
            )}
          />
        </button>

        <div className="absolute bottom-0 left-0 w-full bg-linear-to-t from-black/80 to-transparent pt-8 pb-4 px-4 md:translate-y-20 md:group-hover:translate-y-0 md:opacity-0 md:group-hover:opacity-100 transition-all duration-500 ease-out">
          <button
            onClick={handleAddToCart}
            className="w-full bg-black text-white text-sm font-medium py-2.5 rounded transition-all hover:bg-gray-900 active:scale-95"
          >
            Add to Cart
          </button>
        </div>
      </div>

      <div className="mt-4 space-y-2 flex-1 flex flex-col">
        <p className="text-xs tracking-widest text-neutral-500 uppercase font-medium">
          {product.brand}
        </p>
        <h3 className="font-playfair text-lg leading-tight text-neutral-900 font-semibold">
          {product.name}
        </h3>
        
        <div className="flex items-baseline gap-2 pt-1">
          {isOnSale && (
            <span className="text-sm line-through text-neutral-400">
              ₦{product.originalPrice?.toLocaleString()}
            </span>
          )}
          <span className={clsx("text-lg font-bold", isOnSale ? "text-amber-600" : "text-neutral-900")}>
            ₦{product.price.toLocaleString()}
          </span>
        </div>

        <div className="pt-2">
          <StarRating rating={product.rating} />
        </div>
      </div>

      <button
        onClick={handleAddToCart}
        className="sm:hidden mt-4 w-full bg-black text-white text-sm font-medium py-2.5 rounded transition-all hover:bg-gray-900 active:scale-95"
      >
        Add to Cart
      </button>
    </div>
  );
}

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-1.5">
      <div className="flex gap-0.5">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            size={14}
            className={clsx(
              "transition-colors duration-200",
              star <= Math.round(rating) ? "fill-amber-500 text-amber-500" : "text-neutral-300"
            )}
          />
        ))}
      </div>
      <span className="text-xs text-neutral-600 font-medium">{rating.toFixed(1)}</span>
    </div>
  );
}

export function ProductCardSkeleton() {
  return (
    <div className="h-full flex flex-col">
      <div className="relative overflow-hidden rounded-lg bg-linear-to-br from-cream-50 via-neutral-100 to-cream-50 shrink-0 h-80 animate-pulse" />
      <div className="mt-4 space-y-3 flex-1 flex flex-col">
        <div className="h-3 w-12 bg-linear-to-r from-cream-50 to-neutral-100 rounded animate-pulse" />
        <div className="space-y-1.5">
          <div className="h-5 bg-linear-to-r from-cream-50 to-neutral-100 rounded animate-pulse" />
          <div className="h-5 w-3/4 bg-linear-to-r from-cream-50 to-neutral-100 rounded animate-pulse" style={{ animationDelay: "100ms" }} />
        </div>
        <div className="h-4 w-24 bg-linear-to-r from-cream-50 to-neutral-100 rounded animate-pulse pt-1" />
        <div className="h-4 w-20 bg-linear-to-r from-cream-50 to-neutral-100 rounded animate-pulse" />
      </div>
      <div className="mt-4 h-10 bg-linear-to-r from-cream-50 to-neutral-100 rounded animate-pulse" />
    </div>
  );
}