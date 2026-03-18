"use client";
import { useForm } from "react-hook-form";
import { useState } from "react";

export default function SettingsTab() {
  const { register, handleSubmit, watch } = useForm();
  const [emailNotif, setEmailNotif] = useState(true);

  return (
    <div className="space-y-6 max-w-md">

      <h2 className="text-xl font-semibold">Settings</h2>

      <form onSubmit={handleSubmit(console.log)} className="space-y-4">
        <input {...register("current", { required: true })} type="password" placeholder="Current Password" className="border p-2 w-full rounded" />
        <input {...register("new", { required: true })} type="password" placeholder="New Password" className="border p-2 w-full rounded" />
        <input {...register("confirm", { required: true })} type="password" placeholder="Confirm Password" className="border p-2 w-full rounded" />

        <button className="bg-black text-white px-4 py-2 rounded cursor-pointer">
          Change Password
        </button>
      </form>

      <div className="flex items-center justify-between">
        <span>Email Notifications</span>
        <button
          onClick={() => setEmailNotif(!emailNotif)}
          className={`w-12 h-6 rounded-full ${emailNotif ? "bg-black" : "bg-gray-300"} relative cursor-pointer`}
        >
          <div className={`w-5 h-5 bg-white rounded-full absolute top-0.5 transition ${emailNotif ? "right-0.5" : "left-0.5"}`} />
        </button>
      </div>

    </div>
  );
}