import Link from "next/link";

/** Generates a mock order number */
function generateOrderId() {
  return "SCQ-" + Math.random().toString(36).slice(2, 8).toUpperCase();
}

const ORDER_ID    = generateOrderId();
const ORDER_ITEMS = [
  { id: 1, name: "Oud & Amber Elixir", size: "50ml", qty: 1, price: 120 },
  { id: 2, name: "Rose Noir Parfum",   size: "30ml", qty: 2, price: 85  },
];
const TOTAL = (120 + 85 * 2) * 1.08;

export default function ConfirmationPage() {
  return (
    <div
      className="min-h-screen flex items-start justify-center px-4 py-16"
      style={{ backgroundColor: "var(--color-background-cream)" }}
    >
      <div className="w-full max-w-xl">
        {/* Success card */}
        <div
          className="rounded-2xl px-8 py-10 text-center space-y-4 mb-8"
          style={{
            backgroundColor: "#fff",
            boxShadow: "var(--shadow-warm)",
          }}
        >
          {/* Checkmark */}
          <div
            className="w-20 h-20 rounded-full flex items-center justify-center mx-auto"
            style={{ backgroundColor: "var(--color-accent-sage)" + "30" }}
          >
            <svg width="40" height="40" viewBox="0 0 40 40" fill="none" aria-hidden="true">
              <circle cx="20" cy="20" r="20" fill="#A3B899" fillOpacity="0.25" />
              <path
                d="M11 20.5L17 26.5L29 14"
                stroke="#A3B899"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>

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

          {/* Order number */}
          <div
            className="inline-block rounded-xl px-5 py-2.5 text-sm font-medium"
            style={{
              backgroundColor: "var(--color-background-ivory)",
              color: "var(--color-text-charcoal)",
              border: "1px solid var(--color-accent-blush)",
            }}
          >
            Order reference:{" "}
            <span style={{ color: "var(--color-primary)", fontWeight: 600 }}>
              {ORDER_ID}
            </span>
          </div>

          <p className="text-xs" style={{ color: "var(--color-text-taupe)" }}>
            A confirmation email has been sent to your inbox.
          </p>
        </div>

        {/* Order summary card */}
        <div
          className="rounded-2xl px-6 py-6 space-y-4 mb-6"
          style={{
            backgroundColor: "var(--color-background-ivory)",
            border: "1px solid var(--color-accent-blush)",
            boxShadow: "var(--shadow-soft)",
          }}
        >
          <h2 className="font-serif text-lg" style={{ color: "var(--color-text-charcoal)" }}>
            Your Items
          </h2>
          <ul className="space-y-3">
            {ORDER_ITEMS.map((item) => (
              <li key={item.id} className="flex items-start justify-between gap-3">
                <div
                  className="w-10 h-10 rounded-lg shrink-0"
                  style={{ backgroundColor: "var(--color-accent-blush)", opacity: 0.6 }}
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

          <div className="flex justify-between font-semibold text-base">
            <span>Total paid</span>
            <span style={{ color: "var(--color-primary)" }}>${TOTAL.toFixed(2)}</span>
          </div>
        </div>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row gap-3">
          <Link
            href="/storefront/shop"
            className="flex-1 text-center py-3 px-6 rounded-xl font-medium text-sm transition-all duration-200"
            style={{
              backgroundColor: "var(--color-primary)",
              color: "#fff",
            }}
          >
            Continue Shopping
          </Link>
          <Link
            href="/storefront/account"
            className="flex-1 text-center py-3 px-6 rounded-xl font-medium text-sm border transition-all duration-200"
            style={{
              backgroundColor: "transparent",
              borderColor: "var(--color-primary)",
              color: "var(--color-primary)",
            }}
          >
            View My Orders
          </Link>
        </div>

        {/* Delivery note */}
        <p
          className="text-center text-xs mt-6"
          style={{ color: "var(--color-text-taupe)" }}
        >
          🚚 Estimated delivery: 3–5 business days · Free express shipping included
        </p>
      </div>
    </div>
  );
}
