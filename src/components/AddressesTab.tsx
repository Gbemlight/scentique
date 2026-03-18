"use client";
import { useState } from "react";
import { useForm } from "react-hook-form";

export default function AddressesTab() {
  const [addresses, setAddresses] = useState(["12 Admiralty Way, Lagos"]);

  const { register, handleSubmit, reset } = useForm<{ address: string }>();

  const addAddress = (data: any) => {
    setAddresses([...addresses, data.address]);
    reset();
  };

  const deleteAddress = (index: number) => {
    setAddresses(addresses.filter((_, i) => i !== index));
  };

  return (
    <div className="space-y-6">

      <h2 className="text-xl font-semibold">Saved Addresses</h2>

      {addresses.map((address, i) => (
        <div key={i} className="border p-4 rounded flex justify-between">
          <span>{address}</span>
          <div className="flex gap-3">
            <button className="text-gray-600 text-sm hover:text-black transition-colors cursor-pointer">
              Edit
            </button>
            <button onClick={() => deleteAddress(i)} className="text-red-500 text-sm hover:text-red-700 transition-colors cursor-pointer">
              Delete
            </button>
          </div>
        </div>
      ))}

      <form onSubmit={handleSubmit(addAddress)} className="flex gap-2">
        <input {...register("address", { required: true })} className="border p-2 flex-1 rounded" placeholder="Add new address" />
        <button className="bg-black text-white px-4 rounded cursor-pointer">Add</button>
      </form>

    </div>
  );
}