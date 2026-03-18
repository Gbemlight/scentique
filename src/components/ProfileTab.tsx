"use client";
import { useForm } from "react-hook-form";

type FormData = {
  name: string;
  email: string;
};

export default function ProfileTab() {
  const { register, handleSubmit, formState: { errors } } = useForm<FormData>({
    defaultValues: {
      name: "Sunday Adeyanju",
      email: "sunday@email.com"
    }
  });

  return (
    <div className="space-y-6 max-w-md">

      <div className="flex items-center gap-4">
        <div className="w-16 h-16 bg-black text-white rounded-full flex items-center justify-center text-xl font-semibold">
          SA
        </div>
        <h2 className="text-xl font-semibold">Profile</h2>
      </div>

      <form onSubmit={handleSubmit(console.log)} className="space-y-4">
        <div>
          <input
            {...register("name", { required: "Name required" })}
            className="w-full border p-3 rounded"
          />
          {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
        </div>

        <div>
          <input
            {...register("email", { required: "Email required" })}
            className="w-full border p-3 rounded"
          />
          {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
        </div>

        <button className="px-6 py-2 bg-black text-white rounded cursor-pointer">
          Save Changes
        </button>
      </form>
    </div>
  );
}