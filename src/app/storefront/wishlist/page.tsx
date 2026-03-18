"use client";

import { useWishlist } from "@/context/WishlistContext";
import { Heart, X } from "lucide-react";
import Link from "next/link";
import { useCart } from "@/context/CartContext";
import type { Product } from "@/lib/dummyProducts";
import { toast } from "sonner";

export default function WishlistPage() {
  const { wishlist, toggleWishlist, clearWishlist } = useWishlist();
  const { addToCart } = useCart();

  const handleRemove = (product: Product) => {
    // The context's toggleWishlist function already handles the logic and toast.
    toggleWishlist(product);
  };

  const moveAllToCart = () => {
    if (wishlist.length === 0) return;
    // Add all items to cart
    wishlist.forEach((product) => addToCart(product));
    // Clear the wishlist
    clearWishlist();
    toast.success("All items moved to cart");
  };

  return (
    <div className="min-h-screen bg-cream py-16 sm:py-24">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 relative">
        <Heart size={80} className="absolute -top-4 right-10 text-gold opacity-10 animate-pulse" />

        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-12 text-center sm:text-left">
          <h1 className="font-serif text-3xl sm:text-4xl text-charcoal mb-4 sm:mb-0">
            My Wishlist
            <span className="text-lg text-taupe ml-3">({wishlist.length} items)</span>
          </h1>

          {wishlist.length > 0 && (
            <button
              onClick={moveAllToCart}
              className="bg-primary text-white px-6 py-2.5 rounded-lg font-semibold text-sm hover:opacity-90 transition-opacity active:scale-95"
            >
              Move All to Cart
            </button>
          )}
        </div>

        {wishlist.length === 0 ? (
          <div className="flex flex-col items-center py-24 space-y-6 text-center">
            <Heart size={64} className="text-accent-blush" />
            <h2 className="text-2xl font-serif text-charcoal">Your wishlist is empty</h2>
            <p className="text-taupe max-w-xs">
              Add your favorite fragrances here to save them for later.
            </p>
            <Link
              href="/storefront/shop"
              className="bg-black text-white px-8 py-3 rounded-lg font-semibold text-sm hover:bg-gray-800 transition-colors"
            >
              Browse Products
            </Link>
          </div>
        ) : (
          <div className="space-y-4">
            {wishlist.map((product) => (
              <WishlistItem
                key={product.id}
                product={product}
                onRemove={() => handleRemove(product)}
                onAddToCart={() => {
                  addToCart(product);
                  toast.success("Added to cart");
                }}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function WishlistItem({
  product,
  onRemove,
  onAddToCart,
}: {
  product: Product;
  onRemove: () => void;
  onAddToCart: () => void;
}) {
  const slug = (product as any).slug || product.id;
  return (
    <div className="flex items-center gap-4 sm:gap-6 bg-white p-4 rounded-2xl shadow-soft border border-transparent hover:border-accent-blush transition-colors duration-300">
      <Link href={`/storefront/shop/${slug}`}>
        <img
          src={product.image}
          alt={product.name}
          className="w-24 h-24 sm:w-32 sm:h-32 object-cover rounded-xl"
        />
      </Link>

      <div className="flex-1">
        <p className="text-xs uppercase tracking-wider text-taupe">{product.brand}</p>
        <h3 className="font-serif text-lg sm:text-xl font-medium text-charcoal mb-1">
          {product.name}
        </h3>
        <p className="text-lg font-semibold text-primary mb-3">
          ₦{product.price.toLocaleString()}
        </p>
        <button onClick={onAddToCart} className="text-sm font-semibold text-primary hover:underline">
          Add to Cart
        </button>
      </div>

      <button
        onClick={onRemove}
        className="self-start text-taupe hover:text-red-500 transition-colors p-1"
        aria-label={`Remove ${product.name} from wishlist`}
      >
        <X size={20} />
      </button>
    </div>
  );
}
