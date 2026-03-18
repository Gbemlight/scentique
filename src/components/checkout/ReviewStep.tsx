"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { MapPin, CreditCard, Package } from "lucide-react";
import Button from "@/components/ui/Button";
import type { CheckoutData } from "@/app/storefront/checkout/page";
import { ORDER_ITEMS, SHIPPING_COST, TAX_RATE } from "./mockData";

interface Props {
  data: CheckoutData;
  onBack: () => void;
}

function SectionCard({ title, icon, children }: { title: string; icon: React.ReactNode; children: React.ReactNode }) {
  return (
    <div
      className="rounded-xl p-5 space-y-3"
      style={{
        backgroundColor: "var(--color-background-ivory)",
        border: "1px solid var(--color-accent-blush)",
      }}
    >
      <div className="flex items-center gap-2">
        <span style={{ color: "var(--color-primary)" }}>{icon}</span>
        <h3 className="font-medium text-sm tracking-wide uppercase" style={{ color: "var(--color-text-charcoal)" }}>
          {title}
        </h3>
      </div>
      {children}
    </div>
  );
}

export default function ReviewStep({ data, onBack }: Props) {
  const router  = useRouter();
  const [loading, setLoading] = useState(false);

  const subtotal = ORDER_ITEMS.reduce((sum, item) => sum + item.price * item.qty, 0);
  const tax      = subtotal * TAX_RATE;
  const total    = subtotal + SHIPPING_COST + tax;

  const handlePlaceOrder = () => {
    setLoading(true);
    // Generate a mock order ID and navigate to the dynamic confirmation page
    const orderId = "SCQ-" + Math.random().toString(36).slice(2, 8).toUpperCase();
    setTimeout(() => {
      router.push(`/storefront/order/confirmation/${orderId}`);
    }, 1200);
  };

  return (
    <div className="space-y-6">
      <div>
        <h2
          className="text-2xl sm:text-3xl font-serif mb-1"
          style={{ color: "var(--color-text-charcoal)" }}
        >
          Review Your Order
        </h2>
        <p className="text-sm" style={{ color: "var(--color-text-taupe)" }}>
          Please check everything before placing your order.
        </p>
      </div>

      {/* Order items */}
      <SectionCard title="Items" icon={<Package className="w-4 h-4" />}>
        <ul className="space-y-3">
          {ORDER_ITEMS.map((item) => (
            <li key={item.id} className="flex items-start justify-between gap-4">
              <div
                className="w-12 h-12 rounded-lg shrink-0"
                style={{ backgroundColor: "var(--color-accent-blush)", opacity: 0.55 }}
              />
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium truncate" style={{ color: "var(--color-text-charcoal)" }}>
                  {item.name}
                </p>
                <p className="text-xs" style={{ color: "var(--color-text-taupe)" }}>
                  {item.size} · Qty {item.qty}
                </p>
              </div>
              <p className="text-sm font-semibold whitespace-nowrap">
                ₦{(item.price * item.qty).toLocaleString()}
              </p>
            </li>
          ))}
        </ul>
      </SectionCard>

      {/* Shipping address */}
      <SectionCard title="Shipping Address" icon={<MapPin className="w-4 h-4" />}>
        <div className="text-sm space-y-0.5" style={{ color: "var(--color-text-charcoal)" }}>
          <p className="font-medium">{data.firstName} {data.lastName}</p>
          <p>{data.address1}{data.address2 ? `, ${data.address2}` : ""}</p>
          <p>{data.city}, {data.state} {data.zip}</p>
          <p>{data.country}</p>
        </div>
      </SectionCard>

      {/* Payment */}
      <SectionCard title="Payment Method" icon={<CreditCard className="w-4 h-4" />}>
        <p className="text-sm" style={{ color: "var(--color-text-charcoal)" }}>
          {data.paymentMethod === "paypal"
            ? "PayPal"
            : data.cardNumber
            ? `Card ending in ···· ${data.cardNumber.replace(/\s/g, "").slice(-4)}`
            : "Credit / Debit Card"}
        </p>
      </SectionCard>

      {/* Totals */}
      <div
        className="rounded-xl p-5 space-y-2"
        style={{
          backgroundColor: "var(--color-background-ivory)",
          border: "1px solid var(--color-accent-blush)",
        }}
      >
        <div className="flex justify-between text-sm">
          <span style={{ color: "var(--color-text-taupe)" }}>Subtotal</span>
          <span>₦{subtotal.toLocaleString()}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span style={{ color: "var(--color-text-taupe)" }}>Shipping</span>
          <span className="text-green-600 font-medium">Free</span>
        </div>
        <div className="flex justify-between text-sm">
          <span style={{ color: "var(--color-text-taupe)" }}>Tax (8%)</span>
          <span>₦{tax.toLocaleString()}</span>
        </div>
        <hr className="my-2" style={{ borderColor: "var(--color-accent-blush)" }} />
        <div className="flex justify-between font-semibold text-base">
          <span>Total</span>
          <span style={{ color: "var(--color-primary)" }}>₦{total.toLocaleString()}</span>
        </div>
      </div>

      {/* Actions */}
      <div className="flex justify-between items-center pt-2">
        <button
          type="button"
          onClick={onBack}
          className="text-sm underline underline-offset-2 transition-opacity hover:opacity-60"
          style={{ color: "var(--color-text-taupe)" }}
        >
          ← Back
        </button>
        <Button size="lg" loading={loading} onClick={handlePlaceOrder}>
          Place Order
        </Button>
      </div>
    </div>
  );
}
