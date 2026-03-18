"use client";

import { useCart, CartItem } from "@/context/CartContext";
import { X, Trash2, Plus, Minus } from "lucide-react";
import Link from "next/link";

export default function CartDrawer() {
  const {
    isOpen, closeCart, cart, totalItems, totalPrice,
    updateQuantity, removeFromCart,
  } = useCart();

  return (
    <>
      {/* Overlay */}
      {isOpen && (
        <div
          onClick={closeCart}
          className="fixed inset-0 bg-black/40 z-40"
        />
      )}

      {/* Drawer */}
      <div
        className={`fixed top-0 right-0 h-full w-96 bg-white shadow-xl z-50 transform transition-transform duration-300 ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex justify-between items-center p-6 border-b">
          <h2 className="text-lg font-semibold">Your Cart</h2>
          <button onClick={closeCart}>
            <X />
          </button>
        </div>

        {totalItems === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-center px-6">
            <h3 className="text-lg font-semibold mb-2">Your cart is empty</h3>
            <p className="text-sm text-gray-500 mb-4">
              Looks like you haven't added anything yet.
            </p>
            <Link
              href="/storefront/shop"
              onClick={closeCart}
              className="bg-black text-white px-6 py-2 rounded-md font-semibold text-sm"
            >
              Start Shopping
            </Link>
          </div>
        ) : (
          <div className="flex flex-col h-full">
            {/* Cart Items */}
            <div className="flex-1 overflow-y-auto p-6 space-y-4">
              {cart.map((item) => (
                <CartDrawerItem
                  key={item.id}
                  item={item}
                  onUpdateQuantity={updateQuantity}
                  onRemove={removeFromCart}
                />
              ))}
            </div>

            {/* Cart Footer */}
            <div className="p-6 border-t space-y-4">
              <div className="flex justify-between font-semibold">
                <span>Subtotal</span>
                <span>₦{totalPrice.toLocaleString()}</span>
              </div>
              <p className="text-xs text-gray-500">
                Shipping and taxes calculated at checkout.
              </p>
              <Link
                href="/storefront/checkout"
                onClick={closeCart}
                className="w-full block text-center bg-black text-white py-3 rounded-md font-semibold"
              >
                Proceed to Checkout
              </Link>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

function CartDrawerItem({
  item,
  onUpdateQuantity,
  onRemove,
}: {
  item: CartItem;
  onUpdateQuantity: (id: string, quantity: number) => void;
  onRemove: (id: string) => void;
}) {
  return (
    <div className="flex gap-4">
      <img
        src={item.image}
        alt={item.name}
        className="w-20 h-20 object-cover rounded-md"
        referrerPolicy="no-referrer"
      />
      <div className="flex-1 flex flex-col justify-between">
        <div>
          <h4 className="font-semibold text-sm">{item.name}</h4>
          <p className="text-sm font-bold">₦{item.price.toLocaleString()}</p>
        </div>
        <div className="flex items-center justify-between">
          {/* Quantity Stepper */}
          <div className="flex items-center border rounded-md">
            <button
              onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
              className="p-1.5"
            >
              <Minus size={14} />
            </button>
            <span className="px-2 text-sm">{item.quantity}</span>
            <button
              onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
              className="p-1.5"
            >
              <Plus size={14} />
            </button>
          </div>
          {/* Remove Button */}
          <button onClick={() => onRemove(item.id)} className="text-gray-400 hover:text-red-500">
            <Trash2 size={16} />
          </button>
        </div>
      </div>
    </div>
  );
}