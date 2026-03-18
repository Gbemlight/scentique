"use client";
import { Root, Portal, Overlay, Content, Title } from "@radix-ui/react-dialog";

const steps = ["Placed", "Confirmed", "Shipped", "Delivered"];

const dummyItems = [
  {
    name: "Oud Royal",
    price: "₦45,000",
    qty: 1,
    image: "https://i.pinimg.com/736x/70/19/b3/7019b324d908d8652817880dc2a5efac.jpg"
  },
  {
    name: "Velvet Amber",
    price: "₦30,000",
    qty: 2,
    image: "https://i.pinimg.com/736x/54/e3/c7/54e3c7710e921b35589fe1c172b0b6a3.jpg"
  },
  {
    name: "Golden Bloom",
    price: "₦25,000",
    qty: 1,
    image: "https://i.pinimg.com/736x/45/9d/2c/459d2cf50331285ef03c18f1dcce7489.jpg"
  },
  {
    name: "Scented Candle",
    price: "₦15,000",
    qty: 1,
    image: "https://i.pinimg.com/736x/95/13/8e/95138e0951241d6b9573fbfea0fb5bfd.jpg"
  }
];

export default function OrderDetailModal({ order, onClose }: any) {
  const activeIndex = steps.indexOf(order.status);

  return (
    <Root open onOpenChange={onClose}>
      <Portal>
        <Overlay className="fixed inset-0 z-40 bg-black/40" />

        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
          <Content className="relative w-full max-w-xl bg-white p-6 rounded-lg shadow-lg space-y-6 max-h-full overflow-y-auto">

            <Title className="text-lg font-semibold">
              Order {order.id}
            </Title>

            {/* Timeline */}
            <div className="flex justify-between text-sm">
              {steps.map((step, i) => (
                <div key={step} className={`flex flex-col items-center ${i <= activeIndex ? "text-black" : "text-gray-400"}`}>
                  <div className={`w-6 h-6 rounded-full mb-1 ${i <= activeIndex ? "bg-black" : "bg-gray-300"}`} />
                  {step}
                </div>
              ))}
            </div>

            {/* Dummy Products */}
            <div className="space-y-2">
              <p className="font-medium">Items:</p>
              {dummyItems.map((item, i) => (
                <div key={i} className="flex items-center gap-4 py-2 border-b last:border-0">
                  <img src={item.image} alt={item.name} className="w-16 h-16 object-cover rounded bg-gray-100" referrerPolicy="no-referrer" />
                  <div className="flex-1">
                    <p className="text-sm font-medium">{item.name}</p>
                    <p className="text-xs text-gray-500">Qty: {item.qty}</p>
                  </div>
                  <span className="text-sm font-medium">{item.price}</span>
                </div>
              ))}
            </div>

            <div className="text-sm">
              <p className="font-medium">Delivery Address</p>
              <p>12 Admiralty Way, Lekki, Lagos</p>
            </div>

            <button onClick={onClose} className="w-full bg-black text-white py-2 rounded">
              Close
            </button>

          </Content>
        </div>
      </Portal>
    </Root>
  );
}