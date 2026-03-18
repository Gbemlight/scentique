"use client";

import { useForm } from "react-hook-form";
import { z } from "zod";
import Input from "@/components/ui/Input";
import { zodResolver } from "@hookform/resolvers/zod";

const schema = z.object({
  address1: z.string().min(1, "Address is required"),
  address2: z.string().optional(),
  city: z.string().min(1, "City is required"),
  state: z.string().min(1, "State is required"),
  zip: z.string().min(1, "ZIP is required"),
  country: z.string().min(1, "Country is required"),
});

type ShippingFormData = z.infer<typeof schema>;

interface ShippingStepProps {
  defaultValues: Partial<ShippingFormData>;
  onNext: (data: ShippingFormData) => void;
  onBack: () => void;
}

export default function ShippingStep({ defaultValues, onNext, onBack }: ShippingStepProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ShippingFormData>({
    resolver: zodResolver(schema),
    defaultValues,
  });

  return (
    <form onSubmit={handleSubmit(onNext)} className="space-y-6">
      <h2 className="text-2xl font-serif">Shipping Address</h2>

      <Input
        {...register("address1")}
        placeholder="Address Line 1"
        error={errors.address1?.message}
      />

      <Input
        {...register("address2")}
        placeholder="Address Line 2 (Optional)"
      />

      <div className="grid grid-cols-2 gap-4">
        <Input
          {...register("city")}
          placeholder="City"
          error={errors.city?.message}
        />
        <Input
          {...register("state")}
          placeholder="State"
          error={errors.state?.message}
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <Input
          {...register("zip")}
          placeholder="ZIP Code"
          error={errors.zip?.message}
        />
        <div>
          <select {...register("country")} className="input">
            <option value="">Select Country</option>
            <option value="Nigeria">Nigeria</option>
            <option value="USA">United States</option>
            <option value="UK">United Kingdom</option>
          </select>
          {errors.country && (
            <p className="text-red-500 text-sm mt-1">{errors.country.message}</p>
          )}
        </div>
      </div>

      <div className="flex justify-between">
        <button type="button" onClick={onBack} className="text-sm underline">
          Back
        </button>

        <button className="bg-black text-white px-6 py-3 rounded">
          Continue to Payment
        </button>
      </div>
    </form>
  );
}