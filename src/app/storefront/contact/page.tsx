"use client";

import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import * as Accordion from "@radix-ui/react-accordion";
import { CheckCircle, ChevronDown } from "lucide-react";

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
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  const [submitted, setSubmitted] = useState(false);

  const onSubmit: SubmitHandler<FormData> = (data) => {
    // console.log("Form submitted:", data);
    setTimeout(() => {
      setSubmitted(true);
    }, 600);
  };

  return (
    <div className="max-w-6xl mx-auto px-6 py-16 space-y-20">

      {/* PAGE TITLE */}

      <h1 className="text-4xl font-serif text-center">
        Contact Us
      </h1>

      {/* TWO COLUMN SECTION */}

      <div className="grid md:grid-cols-2 gap-12">

        {/* CONTACT FORM */}

        <div className="bg-white p-8 rounded-xl shadow">

          {!submitted ? (

            <form
              onSubmit={handleSubmit(onSubmit)}
              className="space-y-4"
            >

              <input
                placeholder="Name"
                className="border border-gray-200 p-3 rounded-md w-full outline-none focus:border-black focus:ring-1 focus:ring-black transition-all"
                {...register("name", { required: true })}
              />
              {errors.name && (
                <p className="text-red-500 text-sm">
                  Name is required
                </p>
              )}

              <input
                placeholder="Email"
                className="border border-gray-200 p-3 rounded-md w-full outline-none focus:border-black focus:ring-1 focus:ring-black transition-all"
                {...register("email", { required: true })}
              />
              {errors.email && (
                <p className="text-red-500 text-sm">
                  Email is required
                </p>
              )}

              <select
                className="border border-gray-200 p-3 rounded-md w-full outline-none focus:border-black focus:ring-1 focus:ring-black bg-white transition-all"
                {...register("subject", { required: true })}
              >
                <option value="">
                  Select Subject
                </option>
                <option>Order Issue</option>
                <option>Product Question</option>
                <option>General Inquiry</option>
                <option>Wholesale</option>
              </select>

              {errors.subject && (
                <p className="text-red-500 text-sm">
                  Subject is required
                </p>
              )}

              <textarea
                rows={5}
                placeholder="Message"
                className="border border-gray-200 p-3 rounded-md w-full outline-none focus:border-black focus:ring-1 focus:ring-black transition-all resize-none"
                {...register("message", { required: true })}
              />

              {errors.message && (
                <p className="text-red-500 text-sm">
                  Message is required
                </p>
              )}

              <button
                type="submit"
                className="bg-black text-white px-6 py-3 rounded-md w-full font-medium hover:bg-gray-800 transition-colors active:scale-[0.99]"
              >
                Submit
              </button>

            </form>

          ) : (

            /* SUCCESS STATE */

            <div className="flex flex-col items-center justify-center text-center py-12 space-y-4">
              <div className="relative">
                <div className="absolute inset-0 bg-green-100 rounded-full scale-150 animate-ping opacity-20" />
                <CheckCircle
                  size={60}
                  className="text-green-600 relative z-10"
                />
              </div>
              <div>
                <h3 className="text-xl font-serif font-medium mb-2">
                  Message Sent
                </h3>
                <p className="text-gray-500 max-w-xs mx-auto">
                  Thank you for reaching out. Our team will get back to you within 24 hours.
                </p>
              </div>
              <button 
                onClick={() => setSubmitted(false)}
                className="text-sm text-black underline underline-offset-4 hover:opacity-70 mt-4"
              >
                Send another message
              </button>

            </div>

          )}

        </div>

        {/* BUSINESS INFO */}

        <div className="space-y-6">

          <div className="space-y-2">
            <h3 className="font-serif text-xl">
              Email
            </h3>
            <p className="text-gray-600">
              support@olalee.com
            </p>
          </div>

          <div className="space-y-2">
            <h3 className="font-serif text-xl">
              Phone
            </h3>
            <p className="text-gray-600">
              +1 (555) 234-5678
            </p>
          </div>

          <div className="space-y-2">
            <h3 className="font-serif text-xl">
              Business Hours
            </h3>
            <p className="text-gray-600">
              Mon – Sat
            </p>
            <p className="text-gray-600">
              9am – 6pm
            </p>
          </div>

          <div className="space-y-2">
            <h3 className="font-serif text-xl">
              Follow Us
            </h3>

            <div className="flex gap-4 text-sm text-gray-600">
              <a href="#" className="hover:text-gray-600 transition-colors">Instagram</a>
              <a href="#" className="hover:text-gray-600 transition-colors">Twitter</a>
              <a href="#" className="hover:text-gray-600 transition-colors">Facebook</a>
            </div>

          </div>

        </div>

      </div>

      {/* MAP SECTION */}

      <section className="relative">

        <img
          src="https://images.unsplash.com/photo-1526779259212-756e0c4f9c38"
          className="w-full h-75 object-cover rounded-xl"
          alt="Map location"
        />

        <div className="absolute inset-0 bg-black/30 flex items-center justify-center rounded-xl">
          <div className="bg-white/95 backdrop-blur-md px-8 py-4 rounded-full shadow-lg">
            <p className="font-serif text-lg font-medium text-gray-900">Our Location</p>
          </div>
        </div>

      </section>

      {/* FAQ ACCORDION */}

      <section className="space-y-8">

        <h2 className="text-3xl md:text-4xl font-serif text-center">
          Frequently Asked Questions
        </h2>

        <Accordion.Root
          type="single"
          collapsible
          className="space-y-4"
        >

          {faqData.map((faq, index) => (

            <Accordion.Item
              key={index}
              value={`item-${index}`}
              className="border border-gray-200 rounded-lg overflow-hidden bg-white data-[state=open]:border-black transition-colors duration-300"
            >

              <Accordion.Header>
                <Accordion.Trigger className="w-full text-left px-6 py-5 font-medium flex justify-between items-center group hover:bg-gray-50/50 transition-colors">
                  <span className="text-lg text-gray-900">{faq.q}</span>
                  <ChevronDown className="text-gray-400 w-5 h-5 transition-transform duration-300 group-data-[state=open]:rotate-180 group-data-[state=open]:text-black" />
                </Accordion.Trigger>
              </Accordion.Header>

              <Accordion.Content className="overflow-hidden data-[state=open]:animate-accordion-down data-[state=closed]:animate-accordion-up">
                <div className="px-6 pb-6 pt-0 text-gray-600 leading-relaxed">
                  {faq.a}
                </div>
              </Accordion.Content>

            </Accordion.Item>

          ))}

        </Accordion.Root>

      </section>

    </div>
  );
}
