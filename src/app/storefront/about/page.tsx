import { Leaf, Sparkles, ShieldCheck, Globe, FlaskConical, ClipboardCheck, Package } from "lucide-react";
import NewsletterSignup from "../NewsletterSignup";

export default function AboutPage() {
  return (
    <div className="bg-white text-gray-800">

      {/* HERO */}
      <section className="relative h-[65vh] w-full">
        <img
          src="https://images.unsplash.com/photo-1608571423539-e951a9b3871b"
          className="absolute inset-0 w-full h-full object-cover"
          alt="Abstract fragrance bottle display"
        />
        <div className="absolute inset-0 bg-black/40" />
        <div className="relative z-10 flex items-center justify-center h-full text-center text-white px-6">
          <h1 className="text-5xl md:text-7xl font-serif tracking-tight">
            Our Story
          </h1>
        </div>
      </section>

      {/* BRAND STORY */}
      <section className="max-w-6xl mx-auto px-6 py-24 grid md:grid-cols-2 gap-16 items-center">
        <div className="relative">
          <img
            src="https://images.unsplash.com/photo-1615631985629-7f3f0f9d0e63"
            className="rounded-lg shadow-xl w-full h-auto aspect-4/5 object-cover"
            alt="Artisanal perfume creation process"
          />
        </div>
        <div className="space-y-8">
          <div className="space-y-2">
            <p className="uppercase tracking-[0.2em] text-xs font-medium text-gray-500">
              Our Heritage
            </p>
            <h2 className="text-3xl md:text-4xl font-serif text-gray-900 leading-tight">
              Crafting fragrance as an art form
            </h2>
          </div>
          <div className="space-y-6 text-gray-600 leading-relaxed text-lg">
            <p>
              Olalee Lifestyle was born from a deep passion for scent,
              culture, and the timeless rituals of fragrance. Every
              bottle we create reflects a commitment to elegance,
              quality, and authenticity.
            </p>
            <p>
              Our inspiration comes from traditional perfumery blended
              with modern craftsmanship. Each fragrance tells a story —
              of nature, emotion, and memory.
            </p>
            <p>
              From carefully sourced oils to meticulous blending,
              every step is designed to create a sensory experience
              that feels luxurious and deeply personal.
            </p>
          </div>
        </div>
      </section>

      {/* VALUES */}
      <section className="bg-[#F9F9F9] py-24">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-center text-3xl md:text-4xl font-serif mb-16">
            Our Values
          </h2>
          <div className="grid md:grid-cols-3 gap-12">
            <div className="flex flex-col items-center text-center space-y-4">
              <div className="p-4 bg-white rounded-full shadow-sm mb-2">
                <Sparkles className="text-yellow-700" size={28} />
              </div>
              <h3 className="font-serif text-xl font-medium">Craftsmanship</h3>
              <p className="text-gray-600 leading-relaxed">
                Every fragrance is carefully blended to achieve
                harmony, depth, and long-lasting elegance.
              </p>
            </div>
            <div className="flex flex-col items-center text-center space-y-4">
              <div className="p-4 bg-white rounded-full shadow-sm mb-2">
                <Leaf className="text-yellow-700" size={28} />
              </div>
              <h3 className="font-serif text-xl font-medium">Sustainability</h3>
              <p className="text-gray-600 leading-relaxed">
                We prioritize responsibly sourced ingredients and
                mindful production processes.
              </p>
            </div>
            <div className="flex flex-col items-center text-center space-y-4">
              <div className="p-4 bg-white rounded-full shadow-sm mb-2">
                <ShieldCheck className="text-yellow-700" size={28} />
              </div>
              <h3 className="font-serif text-xl font-medium">Authenticity</h3>
              <p className="text-gray-600 leading-relaxed">
                Our fragrances celebrate individuality and genuine
                expression through scent.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* PROCESS */}
      <section className="py-24 border-b border-gray-100">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-serif text-center mb-20">
            Our Process
          </h2>
          <div className="grid md:grid-cols-4 gap-8 relative">
            {/* Connecting Line (Desktop) */}
            <div className="hidden md:block absolute top-12 left-[12%] right-[12%] h-px bg-gray-200 -z-10" />
            <div className="flex flex-col items-center text-center space-y-4 bg-white">
              <div className="w-24 h-24 bg-white border border-gray-100 rounded-full flex items-center justify-center shadow-sm">
                <Globe className="text-gray-800" size={32} />
              </div>
              <div>
                <h4 className="font-serif text-lg">Sourced</h4>
                <p className="text-sm text-gray-500 mt-1">Ethical ingredients</p>
              </div>
            </div>
            <div className="flex flex-col items-center text-center space-y-4 bg-white">
              <div className="w-24 h-24 bg-white border border-gray-100 rounded-full flex items-center justify-center shadow-sm">
                <FlaskConical className="text-gray-800" size={32} />
              </div>
              <div>
                <h4 className="font-serif text-lg">Blended</h4>
                <p className="text-sm text-gray-500 mt-1">Artisanal methods</p>
              </div>
            </div>
            <div className="flex flex-col items-center text-center space-y-4 bg-white">
              <div className="w-24 h-24 bg-white border border-gray-100 rounded-full flex items-center justify-center shadow-sm">
                <ClipboardCheck className="text-gray-800" size={32} />
              </div>
              <div>
                <h4 className="font-serif text-lg">Quality Tested</h4>
                <p className="text-sm text-gray-500 mt-1">Rigorous standards</p>
              </div>
            </div>
            <div className="flex flex-col items-center text-center space-y-4 bg-white">
              <div className="w-24 h-24 bg-white border border-gray-100 rounded-full flex items-center justify-center shadow-sm">
                <Package className="text-gray-800" size={32} />
              </div>
              <div>
                <h4 className="font-serif text-lg">Delivered</h4>
                <p className="text-sm text-gray-500 mt-1">To your doorstep</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* TEAM */}
      <section className="py-24">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <p className="uppercase tracking-widest text-xs font-medium text-gray-500 mb-3">The People</p>
            <h2 className="text-3xl md:text-4xl font-serif">Meet the Team</h2>
          </div>
          <div className="grid md:grid-cols-4 gap-x-8 gap-y-12">
            {[
              { name: "Eleanor Pena", role: "Master Perfumer", img: 1 },
              { name: "Ralph Edwards", role: "Creative Director", img: 2 },
              { name: "Arlene McCoy", role: "Sourcing Manager", img: 3 },
              { name: "Courtney Henry", role: "Brand Lead", img: 4 }
            ].map((member) => (
              <div key={member.name} className="flex flex-col items-center text-center group">
                <div className="mb-6 overflow-hidden rounded-full w-40 h-40 ring-4 ring-gray-50 relative">
                  <img
                    src={`https://i.pravatar.cc/300?img=${member.img + 10}`}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    alt={member.name}
                  />
                </div>
                <h3 className="font-serif text-lg font-medium">{member.name}</h3>
                <p className="text-sm text-gray-500 uppercase tracking-wide mt-1">{member.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* NEWSLETTER CTA */}
      <NewsletterSignup />
    </div>
  );
}