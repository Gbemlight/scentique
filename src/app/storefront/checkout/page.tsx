"use client";

import { useState } from "react";
import StepIndicator from "@/components/checkout/StepIndicator";
import ContactStep   from "@/components/checkout/ContactStep";
import ShippingStep  from "@/components/checkout/ShippingStep";
import PaymentStep   from "@/components/checkout/PaymentStep";
import ReviewStep    from "@/components/checkout/ReviewStep";
import OrderSummary  from "@/components/checkout/OrderSummary";

export type CheckoutData = {
  email?: string;
  firstName?: string;
  lastName?: string;
  address1?: string;
  address2?: string;
  city?: string;
  state?: string;
  zip?: string;
  country?: string;
  paymentMethod?: "card" | "paypal";
  cardNumber?: string;
  expiry?: string;
  cvv?: string;
};

export default function CheckoutPage() {
  const [step, setStep]         = useState(1);
  const [formData, setFormData] = useState<CheckoutData>({});

  const handleNext = (data: Partial<CheckoutData>) => {
    setFormData((prev) => ({ ...prev, ...data }));
    setStep((prev) => prev + 1);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleBack = () => {
    setStep((prev) => prev - 1);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="min-h-screen" style={{ backgroundColor: "var(--color-background-cream)" }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10">
        {/* Header */}
        <div className="mb-8 text-center">
          <h1
            className="font-serif text-3xl sm:text-4xl mb-1"
            style={{ color: "var(--color-text-charcoal)" }}
          >
            Checkout
          </h1>
          <p className="text-sm" style={{ color: "var(--color-text-taupe)" }}>
            Secure · Encrypted · Trusted
          </p>
        </div>

        {/* Step indicator */}
        <div className="mb-10">
          <StepIndicator currentStep={step} />
        </div>

        <div className="grid lg:grid-cols-3 gap-10">
          {/* Step content */}
          <div className="lg:col-span-2">
            <div
              className="rounded-2xl p-6 sm:p-8"
              style={{
                backgroundColor: "#fff",
                boxShadow: "var(--shadow-warm)",
              }}
            >
              {step === 1 && (
                <ContactStep defaultValues={formData} onNext={handleNext} />
              )}
              {step === 2 && (
                <ShippingStep defaultValues={formData} onNext={handleNext} onBack={handleBack} />
              )}
              {step === 3 && (
                <PaymentStep defaultValues={formData} onNext={handleNext} onBack={handleBack} />
              )}
              {step === 4 && (
                <ReviewStep data={formData} onBack={handleBack} />
              )}
            </div>
          </div>

          {/* Sticky sidebar */}
          <div className="hidden lg:block">
            <OrderSummary />
          </div>
        </div>
      </div>
    </div>
  );
}
