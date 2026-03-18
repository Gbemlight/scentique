"use client";

import { useForm } from "react-hook-form";
import { z } from "zod";
import Input from "@/components/ui/Input";
import { zodResolver } from "@hookform/resolvers/zod";

const schema = z.object({
  email: z.string().email("Valid email required"),
  firstName: z.string().min(1, "First name required"),
  lastName: z.string().min(1, "Last name required"),
});

type ContactFormData = z.infer<typeof schema>;

interface ContactStepProps {
  defaultValues: Partial<ContactFormData>;
  onNext: (data: ContactFormData) => void;
}

export default function ContactStep({ defaultValues, onNext }: ContactStepProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ContactFormData>({
    resolver: zodResolver(schema),
    defaultValues,
  });

  return (
    <form
      onSubmit={handleSubmit(onNext)}
      className="space-y-6"
    >
      <h2 className="text-2xl font-serif">Contact Information</h2>

      <Input
        {...register("email")}
        placeholder="Email"
        error={errors.email?.message}
        helperText="Guest checkout — no account required."
      />

      <div className="grid grid-cols-2 gap-4">
        <Input
          {...register("firstName")}
          placeholder="First Name"
          error={errors.firstName?.message}
        />
        <Input
          {...register("lastName")}
          placeholder="Last Name"
          error={errors.lastName?.message}
        />
      </div>

      <button className="bg-black text-white px-6 py-3 rounded">
        Continue to Shipping
      </button>
    </form>
  );
}