"use client";

import { CartProvider } from "@/context/CartContext";
import { WishlistProvider } from "@/context/WishlistContext";
import { Toaster } from "sonner";
import CartDrawer from "@/components/cart/CartDrawer";
import type { ReactNode } from "react";

export function Providers({ children }: { children: ReactNode }) {
  return (
    <CartProvider>
      <WishlistProvider>
        {children}
        <CartDrawer />
        <Toaster position="top-right" richColors />
      </WishlistProvider>
    </CartProvider>
  );
}