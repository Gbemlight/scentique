"use client";

import { useState } from "react";
import clsx from "clsx";

export default function NewsletterSignup() {
  const [email, setEmail] = useState("");
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [touched, setTouched] = useState(false);

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const isValid = emailRegex.test(email);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setTouched(true);

    if (!isValid) return;

    // Dummy success (no backend yet)
    setIsSubscribed(true);
  };

  return (
    <section className="relative w-full py-24 px-6 overflow-hidden bg-linear-to-br from-[#D4AF37]/90 via-[#E6C76A] to-[#F6F1EA]">
      {/* Subtle Background SVG */}
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        <svg
          viewBox="0 0 800 600"
          className="w-full h-full object-cover"
          preserveAspectRatio="none"
        >
          <circle cx="200" cy="300" r="180" fill="white" />
          <circle cx="650" cy="100" r="120" fill="white" />
        </svg>
      </div>

      <div className="relative max-w-4xl mx-auto text-center">
        {/* Heading */}
        <h2 className="font-serif text-3xl md:text-4xl text-black">
          Be First to Know
        </h2>

        {/* Subtext */}
        <p className="mt-4 text-gray-800 max-w-2xl mx-auto">
          Discover new arrivals and exclusive offers before anyone else.
        </p>

        {/* Form / Success Wrapper */}
        <div className="mt-10 min-h-22.5 flex items-center justify-center transition-all duration-500">
          {isSubscribed ? (
            <div className="flex items-center gap-3 text-green-900 animate-fade-in">
              <span className="text-2xl">✔</span>
              <p className="font-medium text-lg">
                Thank you for subscribing!
              </p>
            </div>
          ) : (
            <form
              onSubmit={handleSubmit}
              className="w-full flex flex-col sm:flex-row gap-4 justify-center"
            >
              <div className="flex flex-col w-full sm:w-80">
                <input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  onBlur={() => setTouched(true)}
                  className={clsx(
                    "px-4 py-3 rounded-md border outline-none transition",
                    "focus:ring-2 focus:ring-black",
                    touched && !isValid
                      ? "border-red-500"
                      : "border-gray-300"
                  )}
                />
                {touched && !isValid && (
                  <span className="text-sm text-red-600 mt-2 text-left">
                    Please enter a valid email address.
                  </span>
                )}
              </div>

              <button
                type="submit"
                disabled={!isValid}
                className={clsx(
                  "px-6 py-3 rounded-md transition-all duration-300",
                  "font-medium",
                  isValid
                    ? "bg-black text-white hover:opacity-80"
                    : "bg-black/40 text-white cursor-not-allowed"
                )}
              >
                Subscribe
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}