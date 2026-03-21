"use client";

import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import * as Accordion from "@radix-ui/react-accordion";
import { CheckCircle, ChevronDown } from "lucide-react";
import clsx from "clsx";

type FormData = {
  name: string;
  email: string;
  subject: string;
  message: string;
};

const faqData = [
  {
    q: "How long does delivery take?",
    a: "Delivery usually takes 3–5 business days depending on your location.",
  },
  {
    q: "What is your returns policy?",
    a: "Returns are accepted within 14 days for unused products.",
  },
  {
    q: "Do you offer custom gifting?",
    a: "Yes, we provide custom gift packaging and personalized notes.",
  },
  {
    q: "Do you ship internationally?",
    a: "International shipping is available to select countries.",
  },
  {
    q: "What ingredients are used in your fragrances?",
    a: "Our fragrances use carefully sourced oils and premium ingredients.",
  },
  {
    q: "Do you offer wholesale?",
    a: "Yes. Contact us using the wholesale subject in the form above.",
  },
];

export default function ContactPage() {
  const { register, handleSubmit, formState: { errors } } = useForm<FormData>();
  const [submitted, setSubmitted] = useState(false);

  const onSubmit: SubmitHandler<FormData> = () => {
    setTimeout(() => setSubmitted(true), 600);
  };

  return (
    <main className="bg-[#F6F1EA]">

      {/* 🔥 HERO */}
      <section className="relative h-[60vh] flex items-center justify-center text-center">
        <img
          src="https://picsum.photos/1920/1080?random=90"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/60" />

        <div className="relative z-10 text-white px-6">
          <h1 className="font-serif text-4xl md:text-6xl mb-4">
            Get in Touch
          </h1>
          <p className="max-w-xl mx-auto text-white/80">
            We’re here to help with orders, inquiries, or anything in between.
          </p>
        </div>
      </section>

      <div className="max-w-6xl mx-auto px-6 py-20 space-y-20">

        {/* 🔥 FORM + INFO */}
        <div className="grid md:grid-cols-2 gap-12">

          {/* FORM */}
          <div className="bg-white p-10 rounded-xl shadow-sm border border-gray-100">

            {!submitted ? (
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">

                <h2 className="font-serif text-2xl mb-4">
                  Send a Message
                </h2>

                <input
                  placeholder="Full Name"
                  className="input"
                  {...register("name", { required: true })}
                />
                {errors.name && <p className="error">Required</p>}

                <input
                  placeholder="Email Address"
                  className="input"
                  {...register("email", { required: true })}
                />
                {errors.email && <p className="error">Required</p>}

                <select className="input" {...register("subject", { required: true })}>
                  <option value="">Select Subject</option>
                  <option>Order Issue</option>
                  <option>Product Question</option>
                  <option>General Inquiry</option>
                  <option>Wholesale</option>
                </select>
                {errors.subject && <p className="error">Required</p>}

                <textarea
                  rows={5}
                  placeholder="Your Message"
                  className="input resize-none"
                  {...register("message", { required: true })}
                />
                {errors.message && <p className="error">Required</p>}

                <button className="btn-primary w-full">
                  Send Message
                </button>

              </form>
            ) : (
              <div className="text-center py-12 space-y-4">
                <CheckCircle size={60} className="text-green-600 mx-auto" />
                <h3 className="font-serif text-xl">
                  Message Sent
                </h3>
                <p className="text-gray-500">
                  We’ll be in touch within 24 hours.
                </p>
              </div>
            )}

          </div>

          {/* INFO CARD */}
          <div className="bg-white p-10 rounded-xl shadow-sm border border-gray-100 space-y-6">

            <h2 className="font-serif text-2xl">
              Contact Information
            </h2>

            <div>
              <p className="text-sm text-gray-500">Email</p>
              <p className="text-lg">support@olalee.com</p>
            </div>

            <div>
              <p className="text-sm text-gray-500">Phone</p>
              <p className="text-lg">+1 (555) 234-5678</p>
            </div>

            <div>
              <p className="text-sm text-gray-500">Hours</p>
              <p>Mon – Sat • 9am – 6pm</p>
            </div>

            <div className="flex gap-4 text-sm">
              <span className="hover:underline cursor-pointer">Instagram</span>
              <span className="hover:underline cursor-pointer">Twitter</span>
              <span className="hover:underline cursor-pointer">Facebook</span>
            </div>

          </div>

        </div>

        {/* 🔥 MAP */}
        <section className="relative rounded-xl overflow-hidden">
          <img
            src="https://images.unsplash.com/photo-1526779259212-756e0c4f9c38"
            className="w-full h-87.5 object-cover"
          />
          <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
            <div className="bg-white px-6 py-3 rounded-full shadow">
              Our Location
            </div>
          </div>
        </section>

        {/* 🔥 FAQ */}
        <section className="space-y-10">

          <h2 className="text-3xl md:text-4xl font-serif text-center">
            Frequently Asked Questions
          </h2>

          <Accordion.Root type="single" collapsible className="space-y-4">

            {faqData.map((faq, index) => (
              <Accordion.Item
                key={index}
                value={`item-${index}`}
                className="bg-white border border-gray-200 rounded-lg overflow-hidden"
              >

                <Accordion.Trigger className="w-full px-6 py-5 flex justify-between items-center">
                  <span>{faq.q}</span>
                  <ChevronDown className="transition-transform data-[state=open]:rotate-180" />
                </Accordion.Trigger>

                <Accordion.Content className="px-6 pb-6 text-gray-600">
                  {faq.a}
                </Accordion.Content>

              </Accordion.Item>
            ))}

          </Accordion.Root>

        </section>

      </div>

      {/* 🔥 GLOBAL STYLES */}
      <style jsx global>{`
        .input {
          width: 100%;
          padding: 12px;
          border: 1px solid #e5e5e5;
          border-radius: 6px;
          transition: all 0.2s;
        }

        .input:focus {
          border-color: black;
          outline: none;
          box-shadow: 0 0 0 1px black;
        }

        .btn-primary {
          background: black;
          color: white;
          padding: 12px;
          border-radius: 6px;
          font-weight: 500;
        }

        .error {
          font-size: 12px;
          color: red;
        }
      `}</style>

    </main>
  );
}