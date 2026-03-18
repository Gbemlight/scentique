"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Instagram,
  Facebook,
  Music2, // TikTok substitute in Lucide
  Pin,
} from "lucide-react";

const Footer = () => {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setSubscribed(true);
    setEmail("");
    setTimeout(() => setSubscribed(false), 3000);
  };

  return (
    <footer className="bg-[--color-background-cream] text-[--color-text-charcoal] border-t border-[--color-text-taupe]/20">
      <div className="max-w-7xl mx-auto px-6 py-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12">
        
        {/* Column 1 */}
        <div className="space-y-4">
          <h2 className="font-serif text-2xl">Scentique</h2>
          <p className="text-sm text-[--color-text-taupe] leading-relaxed">
            A curated world of refined fragrances crafted for timeless elegance.
          </p>

          <div className="flex gap-4 pt-2">
            {[Instagram, Facebook, Music2, Pin].map((Icon, i) => (
              <Icon
                key={i}
                className="w-5 h-5 cursor-pointer hover:text-[--color-primary] transition-colors duration-200"
              />
            ))}
          </div>
        </div>

        {/* Column 2 */}
        <div className="space-y-4">
          <h3 className="font-serif text-lg">Shop</h3>
          <ul className="space-y-2 text-sm">
            {["Perfumes", "Body Oils", "Fragrances", "Soaps", "Collections"].map((item) => (
              <li key={item}>
                <Link
                  href="#"
                  className="hover:text-[--color-primary] transition-colors duration-200"
                >
                  {item}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Column 3 */}
        <div className="space-y-4">
          <h3 className="font-serif text-lg">Help</h3>
          <ul className="space-y-2 text-sm">
            {["FAQ", "Shipping", "Returns", "Track Order", "Contact"].map((item) => (
              <li key={item}>
                <Link
                  href="#"
                  className="hover:text-[--color-primary] transition-colors duration-200"
                >
                  {item}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Column 4 - Newsletter */}
        <div className="space-y-4">
          <h3 className="font-serif text-lg">Join Our World</h3>
          <p className="text-sm text-[--color-text-taupe]">
            Receive exclusive launches and private offers.
          </p>

          <form onSubmit={handleSubscribe} className="flex flex-col gap-3">
            <input
              type="email"
              placeholder="Your email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="px-4 py-2 border border-[--color-text-taupe]/40 rounded-md focus:outline-none focus:ring-2 focus:ring-[--color-primary]/40 transition-all placeholder-[--color-text-taupe]"
            />

            <button
              type="submit"
              className="px-4 py-2 rounded-md bg-[--color-primary] text-white hover:opacity-90 transition-all duration-200"
            >
              Subscribe
            </button>

            {subscribed && (
              <p className="text-sm text-[--color-accent-sage]">
                Thank you for subscribing ✨
              </p>
            )}
          </form>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-[--color-text-taupe]/20 py-6 px-6 max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 text-sm">
        <p>© {new Date().getFullYear()} Scentique. All rights reserved.</p>

        {/* Payment Icons */}
        <div className="flex items-center gap-4">
          <span className="px-3 py-1 border rounded text-xs">Visa</span>
          <span className="px-3 py-1 border rounded text-xs">Mastercard</span>
          <span className="px-3 py-1 border rounded text-xs">PayPal</span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;