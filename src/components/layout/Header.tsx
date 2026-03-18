"use client";

import { useState } from "react";
import Link from "next/link";
import { Heart, ShoppingBag, User, Search, Menu, X } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";
import {
  Root as DialogRoot,
  Trigger as DialogTrigger,
  Portal as DialogPortal,
  Overlay as DialogOverlay,
  Content as DialogContent,
  Close as DialogClose,
} from "@radix-ui/react-dialog";
import SearchModal from "@/components/shop/SearchModal";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/storefront/shop", label: "Shop" },
  { href: "/storefront/collections", label: "Collections" },
  { href: "/storefront/about", label: "About" },
  { href: "/storefront/contact", label: "Contact" },
];

export default function Header() {
  const { openCart, totalItems } = useCart();
  const { wishlist } = useWishlist();
  const wishlistCount = wishlist.length;
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-30 bg-white/80 backdrop-blur-md shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between h-20">
        {/* Logo */}
        <Link href="/" className="font-serif text-2xl font-bold text-charcoal">
          Scentique
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-taupe">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="hover:text-primary transition-colors"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Desktop Icons */}
        <div className="hidden md:flex items-center gap-2 sm:gap-4">
          <button
            onClick={() => {
              setMobileMenuOpen(false);
              setSearchOpen(true);
            }}
            className="flex items-center gap-3 text-charcoal hover:text-primary transition-colors"
          >
            <Search size={20} />
            {/* <span>Search</span> */}
          </button>
          <Link
            href="/storefront/wishlist"
            className="relative p-2 text-charcoal hover:text-primary transition-colors"
          >
            <Heart size={20} />
            {wishlistCount > 0 && (
              <span className="absolute top-0 right-0 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-white text-[10px] font-bold">
                {wishlistCount}
              </span>
            )}
          </Link>
          <button
            onClick={openCart}
            className="relative p-2 text-charcoal hover:text-primary transition-colors"
          >
            <ShoppingBag size={20} />
            {totalItems > 0 && (
              <span className="absolute top-0 right-0 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-white text-[10px] font-bold">
                {totalItems}
              </span>
            )}
          </button>
          <Link
            href="/storefront/account"
            className="p-2 text-charcoal hover:text-primary transition-colors"
          >
            <User size={20} />
          </Link>
        </div>

        {/* Mobile Menu Trigger */}
        <div className="md:hidden flex items-center">
          <DialogRoot open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
            <DialogTrigger asChild>
              <button className="p-2 -mr-2 text-charcoal hover:text-primary transition-colors">
                <Menu size={24} />
              </button>
            </DialogTrigger>
            <DialogPortal>
              <DialogOverlay className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0" />
              <DialogContent className="fixed z-50 inset-y-0 left-0 h-full w-3/4 max-w-xs border-r bg-white p-6 shadow-lg transition ease-in-out data-[state=closed]:duration-300 data-[state=open]:duration-500 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:slide-out-to-left data-[state=open]:slide-in-from-left sm:max-w-sm focus:outline-none">
                <div className="flex flex-col h-full">
                  <div className="flex items-center justify-between mb-8">
                    <span className="font-serif text-xl font-bold text-charcoal">
                      Menu
                    </span>
                    <DialogClose asChild>
                      <button className="p-2 -mr-2 text-taupe hover:text-charcoal transition-colors">
                        <X size={24} />
                      </button>
                    </DialogClose>
                  </div>

                  <nav className="flex flex-col gap-6 text-lg font-medium text-taupe">
                    {navLinks.map((link) => (
                      <Link
                        key={link.href}
                        href={link.href}
                        onClick={() => setMobileMenuOpen(false)}
                        className="hover:text-primary transition-colors"
                      >
                        {link.label}
                      </Link>
                    ))}
                  </nav>

                  <div className="mt-auto pt-8 border-t border-gray-100 flex flex-col gap-4">
                    <button
                      onClick={() => {
                        setMobileMenuOpen(false);
                        setSearchOpen(true);
                      }}
                      className="flex items-center gap-3 text-charcoal hover:text-primary transition-colors"
                    >
                      <Search size={20} />
                      <span>Search</span>
                    </button>
                    <Link
                      href="/storefront/wishlist"
                      onClick={() => setMobileMenuOpen(false)}
                      className="flex items-center gap-3 text-charcoal hover:text-primary transition-colors"
                    >
                      <Heart size={20} />
                      <span>Wishlist ({wishlistCount})</span>
                    </Link>
                    <button
                      onClick={() => {
                        setMobileMenuOpen(false);
                        openCart();
                      }}
                      className="flex items-center gap-3 text-charcoal hover:text-primary transition-colors"
                    >
                      <ShoppingBag size={20} />
                      <span>Cart ({totalItems})</span>
                    </button>
                    <Link
                      href="/storefront/account"
                      onClick={() => setMobileMenuOpen(false)}
                      className="flex items-center gap-3 text-charcoal hover:text-primary transition-colors"
                    >
                      <User size={20} />
                      <span>Account</span>
                    </Link>
                  </div>
                </div>
              </DialogContent>
            </DialogPortal>
          </DialogRoot>
        </div>
      </div>
      <SearchModal isOpen={searchOpen} onClose={() => setSearchOpen(false)} />
    </header>
  );
}
