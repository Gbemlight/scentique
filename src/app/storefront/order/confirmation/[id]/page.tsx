"use client";

import { use, useEffect, useState } from "react";
import Link from "next/link";
import { ORDER_ITEMS, TAX_RATE } from "@/components/checkout/mockData";

type Props = {
  params: Promise<{ id: string }>;
};

const subtotal = ORDER_ITEMS.reduce((sum, item) => sum + item.price * item.qty, 0);
const total    = subtotal * (1 + TAX_RATE);

export default function OrderConfirmationPage({ params }: Props) {
  const { id } = use(params);
  const [mounted, setMounted] = useState(false);
  const [formattedDate, setFormattedDate] = useState("");

  useEffect(() => {
    // Calculate date on client to avoid hydration mismatch
    const estimatedDate = new Date();
    estimatedDate.setDate(estimatedDate.getDate() + 3);
    setFormattedDate(estimatedDate.toLocaleDateString("en-US", {
      weekday: "long",
      month:   "long",
      day:     "numeric",
    }));

    // Small delay so the animation is visible after paint
    const t = setTimeout(() => setMounted(true), 80);
    return () => clearTimeout(t);
  }, []);

  return (
    <>
      {/* Draw-on checkmark keyframes */}
      <style>{`
        @keyframes draw-circle {
          from { stroke-dashoffset: 151; }
          to   { stroke-dashoffset: 0; }
        }
        @keyframes draw-check {
          from { stroke-dashoffset: 48; }
          to   { stroke-dashoffset: 0; }
        }
        @keyframes fade-rise {
          from { opacity: 0; transform: translateY(20px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>

      <div
        className="min-h-screen flex items-start justify-center px-4 py-16"
        style={{ backgroundColor: "var(--color-background-cream)" }}
      >
        <div className="w-full max-w-xl space-y-6">

          {/* ── Hero card ── */}
          <div
            className="rounded-2xl px-8 py-10 text-center space-y-5"
            style={{
              backgroundColor: "#fff",
              boxShadow: "var(--shadow-warm)",
              opacity:   mounted ? 1 : 0,
              animation: mounted ? "fade-rise 0.6s ease forwards" : "none",
            }}
          >
            {/* Animated SVG checkmark */}
            <div className="flex justify-center">
              <svg
                width="96"
                height="96"
                viewBox="0 0 52 52"
                fill="none"
                aria-label="Order confirmed"
                role="img"
              >
                {/* Outer circle — draws in */}
                <circle
                  cx="26"
                  cy="26"
                  r="24"
                  stroke="var(--color-accent-sage)"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeDasharray="151"
                  strokeDashoffset={mounted ? "0" : "151"}
                  style={{
                    transition:       "stroke-dashoffset 0.8s cubic-bezier(0.4,0,0.2,1)",
                    transformOrigin:  "center",
                    transform:        "rotate(-90deg)",
                    fill:             "var(--color-accent-sage)",
                    fillOpacity:      "0.10",
                  }}
                />
                {/* Checkmark path — draws in after circle */}
                <path
                  d="M14 27L22 35L38 18"
                  stroke="var(--color-accent-sage)"
                  strokeWidth="2.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeDasharray="48"
                  strokeDashoffset={mounted ? "0" : "48"}
                  style={{
                    transition:      "stroke-dashoffset 0.5s ease 0.7s",
                  }}
                />
              </svg>
            </div>

            {/* Heading */}
            <div>
              <h1
                className="font-serif text-3xl sm:text-4xl mb-2"
                style={{ color: "var(--color-text-charcoal)" }}
              >
                Order Confirmed!
              </h1>
              <p className="text-sm" style={{ color: "var(--color-text-taupe)" }}>
                Thank you for your purchase. Your fragrances are being lovingly prepared.
              </p>
            </div>

            {/* Order number pill */}
            <div className="flex justify-center">
              <span
                className="inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-semibold tracking-wide"
                style={{
                  backgroundColor: "color-mix(in srgb, var(--color-primary), transparent 90%)",
                  color:           "var(--color-primary)",
                  border:          "1.5px solid var(--color-primary)",
                }}
              >
                Order #{id}
              </span>
            </div>

            <p className="text-xs" style={{ color: "var(--color-text-taupe)" }}>
              A confirmation email has been sent to your inbox.
            </p>
          </div>

          {/* ── Order summary card ── */}
          <div
            className="rounded-2xl px-6 py-6 space-y-4"
            style={{
              backgroundColor: "var(--color-background-ivory)",
              border:          "1px solid var(--color-accent-blush)",
              boxShadow:       "var(--shadow-soft)",
              opacity:         mounted ? 1 : 0,
              animation:       mounted ? "fade-rise 0.6s ease 0.15s both" : "none",
            }}
          >
            <h2 className="font-serif text-lg" style={{ color: "var(--color-text-charcoal)" }}>
              Your Items
            </h2>

            <ul className="space-y-3">
              {ORDER_ITEMS.map((item) => (
                <li key={item.id} className="flex items-start gap-3">
                  <div
                    className="w-11 h-11 rounded-lg shrink-0"
                    style={{ backgroundColor: "var(--color-accent-blush)", opacity: 0.65 }}
                  />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium" style={{ color: "var(--color-text-charcoal)" }}>
                      {item.name}
                    </p>
                    <p className="text-xs" style={{ color: "var(--color-text-taupe)" }}>
                      {item.size} · Qty {item.qty}
                    </p>
                  </div>
                  <p className="text-sm font-semibold whitespace-nowrap">
                    ${(item.price * item.qty).toFixed(2)}
                  </p>
                </li>
              ))}
            </ul>

            <hr style={{ borderColor: "var(--color-accent-blush)" }} />

            {/* Delivery info */}
            <div className="text-sm space-y-2">
              <div className="flex justify-between">
                <span style={{ color: "var(--color-text-taupe)" }}>Total paid</span>
                <span className="font-semibold" style={{ color: "var(--color-primary)" }}>
                  ${total.toFixed(2)}
                </span>
              </div>
              <div className="flex justify-between">
                <span style={{ color: "var(--color-text-taupe)" }}>Shipping</span>
                <span className="text-green-600 font-medium">Free</span>
              </div>
              <div className="flex justify-between">
                <span style={{ color: "var(--color-text-taupe)" }}>Estimated delivery</span>
                <span className="font-medium text-right" style={{ color: "var(--color-text-charcoal)" }}>
                  {formattedDate}
                </span>
              </div>
            </div>
          </div>

          {/* ── CTAs ── */}
          <div
            className="flex flex-col sm:flex-row gap-3"
            style={{
              opacity:   mounted ? 1 : 0,
              animation: mounted ? "fade-rise 0.6s ease 0.28s both" : "none",
            }}
          >
            <Link
              href={`/storefront/order/tracking/${id}`}
              className="flex-1 text-center py-3 px-6 rounded-xl font-medium text-sm transition-all duration-200 hover:opacity-90 active:scale-[0.98]"
              style={{
                backgroundColor: "var(--color-primary)",
                color:           "#fff",
              }}
            >
              Track Your Order
            </Link>
            <Link
              href="/storefront/shop"
              className="flex-1 text-center py-3 px-6 rounded-xl font-medium text-sm border transition-all duration-200 hover:opacity-80 active:scale-[0.98]"
              style={{
                borderColor:     "var(--color-primary)",
                color:           "var(--color-primary)",
                backgroundColor: "transparent",
              }}
            >
              Continue Shopping
            </Link>
          </div>

          {/* ── Reassurance strip ── */}
          <p
            className="text-center text-xs pb-4"
            style={{ color: "var(--color-text-taupe)" }}
          >
            🚚 Free express shipping · ↩️ 30-day returns · 🔒 Secure checkout
          </p>
        </div>
      </div>
    </>
  );
}
