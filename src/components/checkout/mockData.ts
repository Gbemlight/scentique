export type OrderItem = {
  id: number;
  name: string;
  size: string;
  qty: number;
  price: number;
};

export const ORDER_ITEMS: OrderItem[] = [
  { id: 1, name: "Oud & Amber Elixir", size: "50ml", qty: 1, price: 120 },
  { id: 2, name: "Rose Noir Parfum",   size: "30ml", qty: 2, price: 85  },
];

export const SHIPPING_COST = 0;
export const TAX_RATE = 0.08;
