export interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  isFeatured?: boolean;
  isBestSeller?: boolean;
  brand: string;
  category: string;
  scentFamily: string;
  rating: number;
  reviewCount?: number;
  originalPrice?: number;
  badge?: "New" | "Best Seller" | "Sale";
  description?: string;
  thumbnails?: string[];
  sizes?: { size: string; volume: string }[];
  stock?: number;
  scent?: {
    top: string[];
    middle: string[];
    base: string[];
  };
}

export const products: Product[] = [
  {
    id: "1",
    name: "Velvet Oud",
    price: 120,
    image: "https://images.unsplash.com/photo-1670859213401-22343dc7bced?crop=entropy&cs=srgb&fm=jpg&ixlib=rb-4.1.0&q=85",
    brand: "Olalee",
    category: "Perfumes",
    scentFamily: "Woody",
    rating: 5,
    reviewCount: 48,
    isFeatured: true,
    description: "A luxurious blend of deep oud notes with hints of velvet musk. Perfect for evening wear.",
    thumbnails: [
      "https://images.unsplash.com/photo-1670859213401-22343dc7bced?crop=entropy&cs=srgb&fm=jpg&ixlib=rb-4.1.0&q=85",
      "https://images.unsplash.com/photo-1772191399367-91ed8d95664b?crop=entropy&cs=srgb&fm=jpg&ixlib=rb-4.1.0&q=85",
      "https://images.pexels.com/photos/16125095/pexels-photo-16125095.jpeg",
      "https://images.unsplash.com/photo-1695632918923-bec6dc759d7b?crop=entropy&cs=srgb&fm=jpg&ixlib=rb-4.1.0&q=85",
    ],
    sizes: [
      { size: "30ml", volume: "30ml" },
      { size: "50ml", volume: "50ml" },
      { size: "100ml", volume: "100ml" },
    ],
    stock: 8,
    scent: {
      top: ["Bergamot", "Cardamom"],
      middle: ["Oud", "Rose"],
      base: ["Sandalwood", "Musk"],
    },
    badge: "Best Seller",
  },
  {
    id: "2",
    name: "Golden Amber",
    price: 150,
    image: "https://images.unsplash.com/photo-1636730431099-20607b24ded9?crop=entropy&cs=srgb&fm=jpg&ixlib=rb-4.1.0&q=85",
    brand: "Olalee",
    category: "Fragrances",
    scentFamily: "Oriental",
    rating: 4,
    reviewCount: 32,
    isBestSeller: true,
    description: "Warm amber tones with golden spices. A timeless fragrance for day or night.",
    thumbnails: [
      "https://images.unsplash.com/photo-1636730431099-20607b24ded9?crop=entropy&cs=srgb&fm=jpg&ixlib=rb-4.1.0&q=85",
      "https://images.pexels.com/photos/12456276/pexels-photo-12456276.jpeg",
      "https://images.pexels.com/photos/12456274/pexels-photo-12456274.jpeg",
      "https://images.pexels.com/photos/12456284/pexels-photo-12456284.jpeg",
    ],
    sizes: [
      { size: "30ml", volume: "30ml" },
      { size: "50ml", volume: "50ml" },
      { size: "100ml", volume: "100ml" },
    ],
    stock: 15,
    scent: {
      top: ["Orange", "Cinnamon"],
      middle: ["Amber", "Vanilla"],
      base: ["Patchouli", "Musk"],
    },
  },
  {
    id: "3",
    name: "Midnight Rose",
    price: 135,
    image: "https://images.pexels.com/photos/28481966/pexels-photo-28481966.jpeg",
    brand: "Essenza",
    category: "Perfumes",
    scentFamily: "Floral",
    rating: 5,
    reviewCount: 67,
    isBestSeller: true,
    description: "Enchanting rose with dark florals and mysterious undertones. Elegance in a bottle.",
    thumbnails: [
      "https://images.pexels.com/photos/28481966/pexels-photo-28481966.jpeg",
      "https://images.pexels.com/photos/3989394/pexels-photo-3989394.jpeg",
      "https://images.pexels.com/photos/12456259/pexels-photo-12456259.jpeg",
      "https://pixabay.com/get/g057090f5dd1ed7c2e7ac422665498b965f907851ed8a54d29b8b7616bd32768c32855073da8933ae29710e9926d209ad.jpg",
    ],
    sizes: [
      { size: "30ml", volume: "30ml" },
      { size: "50ml", volume: "50ml" },
      { size: "100ml", volume: "100ml" },
    ],
    stock: 3,
    scent: {
      top: ["Lemon", "Bergamot"],
      middle: ["Rose", "Jasmine"],
      base: ["Vetiver", "Cedarwood"],
    },
    badge: "New",
  },
  {
    id: "4",
    name: "Saffron Bloom",
    price: 110,
    image: "https://pixabay.com/get/gc1b7af2f4f18a2fa76bc2a8994363eea2354fa99692c1c88a0d8956dce943bfeab2b01ed22e28bd11122c72431d18f1c.jpg",
    brand: "Essenza",
    category: "Body Oils",
    scentFamily: "Fresh",
    rating: 4,
    reviewCount: 24,
    isFeatured: true,
    description: "Fresh saffron blended with citrus and light florals. Uplifting and energizing.",
    thumbnails: [
      "https://pixabay.com/get/gc1b7af2f4f18a2fa76bc2a8994363eea2354fa99692c1c88a0d8956dce943bfeab2b01ed22e28bd11122c72431d18f1c.jpg",
      "https://images.pexels.com/photos/33537128/pexels-photo-33537128.png",
      "https://images.pexels.com/photos/33537131/pexels-photo-33537131.png",
      "https://pixabay.com/get/g8cc5d6aed7102c5b4afa6f4ebca4b9daf0d7e78f62701d872bcdf66467486f68a2c2bafbe042870b53e5c8a53655fa12.jpg",
    ],
    sizes: [
      { size: "30ml", volume: "30ml" },
      { size: "50ml", volume: "50ml" },
      { size: "100ml", volume: "100ml" },
    ],
    stock: 20,
    scent: {
      top: ["Saffron", "Grapefruit"],
      middle: ["Lily", "Peony"],
      base: ["Musk", "Ambroxan"],
    },
  },
  {
    id: "5",
    name: "Ivory Musk",
    price: 180,
    image: "https://images.pexels.com/photos/22589355/pexels-photo-22589355.jpeg",
    brand: "Maison Noir",
    category: "Soaps",
    scentFamily: "Citrus",
    rating: 3,
    reviewCount: 12,
    originalPrice: 220,
    description: "Creamy musk with soft ivory notes. Subtle sophistication for the modern soul.",
    thumbnails: [
      "https://images.pexels.com/photos/22589355/pexels-photo-22589355.jpeg",
      "https://images.pexels.com/photos/16722501/pexels-photo-16722501.jpeg",
      "https://images.pexels.com/photos/17494339/pexels-photo-17494339.jpeg",
      "https://images.pexels.com/photos/16125025/pexels-photo-16125025.jpeg",
    ],
    sizes: [
      { size: "30ml", volume: "30ml" },
      { size: "50ml", volume: "50ml" },
      { size: "100ml", volume: "100ml" },
    ],
    stock: 0,
    scent: {
      top: ["Lemon", "Pink Pepper"],
      middle: ["Musk", "Geranium"],
      base: ["Ivory", "Amber"],
    },
    badge: "Sale",
  },
];