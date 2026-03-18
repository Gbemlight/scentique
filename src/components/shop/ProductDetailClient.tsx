"use client";

import { useState } from "react";
import { Heart, ShoppingCart, Star } from "lucide-react";
import clsx from "clsx";
import type { Product } from "@/lib/dummyProducts";
import SizeSelector from "./SizeSelector";
import QuantityStepper from "./QuantityStepper";
import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";
import { toast } from "sonner";

interface ProductDetailClientProps {
  product: Product;
}

export default function ProductDetailClient({ product }: ProductDetailClientProps) {
  const [selectedSize, setSelectedSize] = useState(product.sizes?.[0]?.size || "30ml");
  const [quantity, setQuantity] = useState(1);
  const [isInStock, setIsInStock] = useState((product.stock ?? 0) > 0);
  const { addToCart } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();

  const isOnSale = product.originalPrice && product.originalPrice > product.price;
  const stockMessage =
    !isInStock ? "Out of Stock" : (product.stock ?? 0) <= 3 ? `Only ${product.stock} left!` : "In Stock";
  
  const liked = isInWishlist(product.id);

  const handleAddToCart = () => {
    if (!isInStock) return;
    addToCart(product, quantity);
    toast.success("Added to cart");
  };

  const handleAddToWishlist = () => {
    toggleWishlist(product);
  };

  return (
    <div className="flex flex-col space-y-6">
      {/* Product Header */}
      <div className="space-y-2">
        <p className="text-xs tracking-widest text-neutral-500 uppercase font-medium">
          {product.brand}
        </p>
        <h1 className="font-playfair text-3xl md:text-4xl font-bold text-neutral-900">
          {product.name}
        </h1>
      </div>

      {/* Rating */}
      <div className="flex items-center gap-3">
        <div className="flex gap-0.5">
          {[1, 2, 3, 4, 5].map((star) => (
            <Star
              key={star}
              size={16}
              className={clsx(
                star <= Math.round(product.rating)
                  ? "fill-amber-500 text-amber-500"
                  : "text-neutral-300"
              )}
            />
          ))}
        </div>
        <a
          href="#reviews"
          className="text-sm text-neutral-600 hover:text-neutral-900 transition-colors"
        >
          {product.rating.toFixed(1)} ({product.reviewCount || 0} reviews)
        </a>
      </div>

      {/* Price */}
      <div className="space-y-2">
        <div className="flex items-baseline gap-3">
          {isOnSale && (
            <span className="text-lg line-through text-neutral-400">
              ₦{product.originalPrice?.toLocaleString()}
            </span>
          )}
          <span
            className={clsx(
              "text-3xl font-bold",
              isOnSale ? "text-amber-600" : "text-neutral-900"
            )}
          >
            ₦{product.price.toLocaleString()}
          </span>
          {isOnSale && <span className="text-sm text-amber-600 font-semibold">Sale</span>}
        </div>
      </div>

      {/* Description */}
      {product.description && (
        <p className="text-neutral-600 leading-relaxed max-w-sm">
          {product.description}
        </p>
      )}

      {/* Divider */}
      <div className="h-px bg-neutral-200" />

      {/* Size Selector */}
      {product.sizes && product.sizes.length > 0 && (
        <SizeSelector
          sizes={product.sizes}
          selectedSize={selectedSize}
          onSizeChange={setSelectedSize}
        />
      )}

      {/* Quantity Stepper */}
      <QuantityStepper quantity={quantity} onQuantityChange={setQuantity} />

      {/* Stock Indicator */}
      <div
        className={clsx(
          "inline-block text-sm font-semibold px-3 py-1 rounded-full w-fit",
          isInStock && (product.stock ?? 0) > 3
            ? "bg-green-50 text-green-700"
            : isInStock
              ? "bg-amber-50 text-amber-700"
              : "bg-red-50 text-red-700"
        )}
      >
        {stockMessage}
      </div>

      {/* Action Buttons */}
      <div className="space-y-3 pt-2">
        {/* Add to Cart Button */}
        <button
          onClick={handleAddToCart}
          disabled={!isInStock}
          className={clsx(
            "w-full py-3 rounded-lg font-semibold text-sm tracking-wide transition-all duration-200 flex items-center justify-center gap-2",
            isInStock
              ? "bg-black text-white hover:bg-gray-900 active:scale-95"
              : "bg-gray-300 text-gray-600 cursor-not-allowed"
          )}
        >
          <ShoppingCart size={18} />
          Add to Cart
        </button>

        {/* Add to Wishlist Button */}
        <button
          onClick={handleAddToWishlist}
          className="w-full py-3 rounded-lg font-semibold text-sm tracking-wide border-2 border-neutral-300 text-neutral-900 hover:border-neutral-600 transition-all duration-200 flex items-center justify-center gap-2 active:scale-95"
        >
          <Heart
            size={18}
            className={clsx(
              "transition-all duration-300",
              liked ? "fill-red-500 text-red-500" : "text-neutral-600"
            )}
          />
          {liked ? "Saved" : "Add to Wishlist"}
        </button>
      </div>

      {/* Out of Stock Message */}
      {!isInStock && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-sm text-red-700">
          Sorry, this product is currently out of stock. Please check back soon or add it to your
          wishlist.
        </div>
      )}

      {/* Guarantee Banner */}
      <div className="bg-cream-50 rounded-lg p-4 text-sm text-neutral-700 space-y-2">
        <p className="font-semibold">✓ Authentic Guarantee</p>
        <p>All products are 100% authentic. Free shipping on orders over ₦5,000.</p>
      </div>
    </div>
  );
}
