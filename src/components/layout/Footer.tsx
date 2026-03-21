"use client";

import Link from 'next/link';
import { Instagram, Facebook, Music2, Pin } from 'lucide-react';
import { useState } from 'react';

const shopLinks = [
    { name: 'Perfumes', href: '/storefront/shop?category=Perfumes' },
    { name: 'Body Oils', href: '/storefront/shop?category=Body+Oils' },
    { name: 'Fragrances', href: '/storefront/shop?category=Fragrances' },
    { name: 'Soaps', href: '/storefront/shop?category=Soaps' },
    { name: 'Collections', href: '/storefront/collections' },
];

const helpLinks = [
    { name: 'FAQ', href: '/storefront/contact#faq' },
    { name: 'Shipping', href: '#' },
    { name: 'Returns', href: '#' },
    { name: 'Track Order', href: '#' },
    { name: 'Contact', href: '/storefront/contact' },
];

const socialLinks = [
    { icon: Instagram, href: '#' },
    { icon: Facebook, href: '#' },
    { icon: Music2, href: '#' },
    { icon: Pin, href: '#' },
];

export default function Footer() {
    const [email, setEmail] = useState('');
    const [submitted, setSubmitted] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (email) {
            setSubmitted(true);
            setEmail('');
            setTimeout(() => setSubmitted(false), 3000);
        }
    };

    return (
        <footer className="bg-[--color-background-cream] text-[--color-text-charcoal] border-t border-[--color-text-taupe]/20">
            <div className="max-w-7xl mx-auto px-6 py-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12">
                {/* Col 1: Brand */}
                <div className="space-y-4">
                    <h2 className="font-serif text-2xl">Scentique</h2>
                    <p className="text-sm text-[--color-text-taupe] leading-relaxed">
                        A curated world of refined fragrances crafted for timeless elegance.
                    </p>
                    <div className="flex gap-4 pt-2">
                        {socialLinks.map((social, index) => (
                            <Link href={social.href} key={index} className="hover:text-primary transition-colors duration-200">
                                <social.icon className="w-5 h-5" />
                            </Link>
                        ))}
                    </div>
                </div>

                {/* Col 2: Shop */}
                <div className="space-y-4">
                    <h3 className="font-serif text-lg">Shop</h3>
                    <ul className="space-y-2 text-sm">
                        {shopLinks.map((link) => (
                            <li key={link.name}>
                                <Link href={link.href} className="hover:text-primary transition-colors duration-200">
                                    {link.name}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Col 3: Help */}
                <div className="space-y-4">
                    <h3 className="font-serif text-lg">Help</h3>
                    <ul className="space-y-2 text-sm">
                        {helpLinks.map((link) => (
                            <li key={link.name}>
                                <Link href={link.href} className="hover:text-primary transition-colors duration-200">
                                    {link.name}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Col 4: Newsletter */}
                <div className="space-y-4">
                    <h3 className="font-serif text-lg">Join Our World</h3>
                    <p className="text-sm text-[--color-text-taupe]">
                        Receive exclusive launches and private offers.
                    </p>
                    <form onSubmit={handleSubmit} className="flex flex-col gap-3">
                        <input
                            type="email"
                            placeholder="Your email address"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            className="px-4 py-2 border border-[--color-text-taupe]/40 rounded-md focus:outline-none focus:ring-2 focus:ring-primary/40 transition-all placeholder-[--color-text-taupe]"
                        />
                        <button
                            type="submit"
                            className="px-4 py-2 rounded-md bg-primary text-white hover:opacity-90 transition-all duration-200"
                        >
                            Subscribe
                        </button>
                        {submitted && (
                            <p className="text-sm text-green-600">Thank you for subscribing ✨</p>
                        )}
                    </form>
                </div>
            </div>

            <div className="border-t border-[--color-text-taupe]/20 py-6 px-6 max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 text-sm">
                <p>© {new Date().getFullYear()} Scentique. All rights reserved.</p>
            </div>
        </footer>
    );
}