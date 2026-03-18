"use client";

import { ORDER_ITEMS, SHIPPING_COST, TAX_RATE } from "./mockData";

export default function OrderSummary() {
  const subtotal = ORDER_ITEMS.reduce((sum, item) => sum + item.price * item.qty, 0);
  const tax      = subtotal * TAX_RATE;
  const total    = subtotal + SHIPPING_COST + tax;

  return (
    <div
      className="rounded-2xl p-6 space-y-5 sticky top-24"
      style={{
        backgroundColor: "var(--color-background-ivory)",
        boxShadow: "var(--shadow-soft)",
        border: "1px solid var(--color-accent-blush)",
      }}
    >
      <h3 className="text-lg font-serif" style={{ color: "var(--color-text-charcoal)" }}>
        Order Summary
      </h3>

      {/* Items */}
      <ul className="space-y-4">
        {ORDER_ITEMS.map((item) => (
          <li key={item.id} className="flex items-start gap-3">
            <div
              className="w-12 h-12 rounded-lg shrink-0"
              style={{ backgroundColor: "var(--color-accent-blush)", opacity: 0.6 }}
            />
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium truncate" style={{ color: "var(--color-text-charcoal)" }}>
                {item.name}
              </p>
              <p className="text-xs" style={{ color: "var(--color-text-taupe)" }}>
                {item.size} · Qty {item.qty}
              </p>
            </div>
            <p className="text-sm font-medium whitespace-nowrap">
              ${(item.price * item.qty).toFixed(2)}
            </p>
          </li>
        ))}
      </ul>

      <hr style={{ borderColor: "var(--color-accent-blush)" }} />

      {/* Totals */}
      <div className="space-y-2 text-sm">
        <div className="flex justify-between">
          <span style={{ color: "var(--color-text-taupe)" }}>Subtotal</span>
          <span>${subtotal.toFixed(2)}</span>
        </div>
        <div className="flex justify-between">
          <span style={{ color: "var(--color-text-taupe)" }}>Shipping</span>
          <span className="text-green-600 font-medium">Free</span>
        </div>
        <div className="flex justify-between">
          <span style={{ color: "var(--color-text-taupe)" }}>Tax (8%)</span>
          <span>${tax.toFixed(2)}</span>
        </div>
      </div>

      <hr style={{ borderColor: "var(--color-accent-blush)" }} />

      <div className="flex justify-between font-semibold text-base">
        <span>Total</span>
        <span style={{ color: "var(--color-primary)" }}>${total.toFixed(2)}</span>
      </div>

      {/* Trust badges */}
      <div className="text-xs space-y-1" style={{ color: "var(--color-text-taupe)" }}>
        <p>🔒 SSL encrypted checkout</p>
        <p>🚚 Free shipping on all orders</p>
        <p>↩️ Easy 30-day returns</p>
      </div>
    </div>
  );
}
