"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import Input from "@/components/ui/Input";
import { Lock } from "lucide-react";

interface PaymentFormData {
  cardNumber?: string;
  expiry?: string;
  cvv?: string;
}

interface PaymentStepProps {
  defaultValues: Partial<PaymentFormData & { paymentMethod: "card" | "paypal" }>;
  onNext: (data: PaymentFormData & { paymentMethod: "card" | "paypal" }) => void;
  onBack: () => void;
}

export default function PaymentStep({ defaultValues, onNext, onBack }: PaymentStepProps) {
  const [method, setMethod] = useState<"card" | "paypal">(
    defaultValues.paymentMethod || "card"
  );

  const { register, handleSubmit } = useForm({
    defaultValues,
  });

  const submit = (data: PaymentFormData) => {
    onNext({ ...data, paymentMethod: method });
  };

  return (
    <form onSubmit={handleSubmit(submit)} className="space-y-6">
      <h2 className="text-2xl font-serif">Payment</h2>

      <div className="flex gap-4">
        <button
          type="button"
          onClick={() => setMethod("card")}
          className={`border px-4 py-2 rounded ${
            method === "card" ? "border-black" : ""
          }`}
        >
          Credit Card
        </button>

        <button
          type="button"
          onClick={() => setMethod("paypal")}
          className={`border px-4 py-2 rounded ${
            method === "paypal" ? "border-black" : ""
          }`}
        >
          PayPal
        </button>
      </div>

      {method === "card" && (
        <div className="space-y-4">
          <Input {...register("cardNumber")} placeholder="Card Number" />
          <div className="grid grid-cols-2 gap-4">
            <Input {...register("expiry")} placeholder="MM/YY" />
            <Input {...register("cvv")} placeholder="CVV" />
          </div>
        </div>
      )}

      {method === "paypal" && (
        <div className="border p-4 rounded text-center">
          PayPal (Demo Button)
        </div>
      )}

      {/* <a>
        The sufficiency of the payment method will be verified during the review step.
      </a> */}
      <div className="flex items-center gap-2 text-sm text-gray-500">
        <Lock size={16} />
        Secure payment — your data is protected.
      </div>

      <div className="flex justify-between">
        <button type="button" onClick={onBack} className="text-sm underline">
          Back
        </button>

        <button className="bg-black text-white px-6 py-3 rounded">
          Continue to Review
        </button>
      </div>
    </form>
  );
}