"use client";

import { Fragment, useEffect, useState } from "react";
import Image from "next/image";
import * as Dialog from "@radix-ui/react-dialog";
import { X } from "lucide-react";
import { toast } from "sonner";
import clsx from "clsx";

// NOTE: For better organization, these types should be moved to a central file (e.g., `src/types/orders.ts`)
export type OrderStatus = 'Pending' | 'Processing' | 'Shipped' | 'Delivered' | 'Cancelled';

export interface OrderItem {
  name: string;
  qty: number;
  price: string;
  image: string;
}

export interface Order {
  id: string;
  customer: string;
  email: string;
  date: string;
  items: number;
  total: string;
  status: OrderStatus;
  address: string;
  products: OrderItem[];
  notes?: string;
}

interface OrderDetailPanelProps {
  order: Order | null;
  isOpen: boolean;
  onClose: () => void;
  onUpdateOrder: (updatedOrder: Order) => void;
}

const STATUS_TIMELINE: OrderStatus[] = ['Pending', 'Processing', 'Shipped', 'Delivered'];

export function OrderDetailPanel({ order, isOpen, onClose, onUpdateOrder }: OrderDetailPanelProps) {
  const [newStatus, setNewStatus] = useState<OrderStatus | "">(order?.status || "");
  const [internalNotes, setInternalNotes] = useState(order?.notes || "");

  useEffect(() => {
    if (order) {
      setNewStatus(order.status);
      setInternalNotes(order.notes || "");
    }
  }, [order]);

  if (!order) return null;

  const handleStatusUpdate = () => {
    if (!newStatus || newStatus === order.status) return;
    const updatedOrder = { ...order, status: newStatus, notes: internalNotes };
    onUpdateOrder(updatedOrder);
    toast.success(`Order ${order.id} status updated to ${newStatus}.`);
  };

  const currentStatusIndex = STATUS_TIMELINE.indexOf(order.status);

  return (
    <Dialog.Root open={isOpen} onOpenChange={onClose}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black/40 z-40 data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=closed]:animate-out data-[state=closed]:fade-out-0" />
        <Dialog.Content className="fixed top-0 right-0 h-full w-full max-w-md bg-white z-50 shadow-xl data-[state=open]:animate-in data-[state=open]:slide-in-from-right-full data-[state=closed]:animate-out data-[state=closed]:slide-out-to-right-full duration-300 flex flex-col">
          <div className="flex justify-between items-center p-4 border-b">
            <Dialog.Title className="text-lg font-bold">Order {order.id}</Dialog.Title>
            <Dialog.Close asChild>
              <button className="p-1 rounded-full hover:bg-gray-100" aria-label="Close">
                <X size={20} />
              </button>
            </Dialog.Close>
          </div>

          <div className="grow overflow-y-auto p-6 space-y-6">
            {/* Customer Details */}
            <section>
              <h3 className="font-semibold mb-2 text-gray-800">Customer</h3>
              <div className="text-sm bg-gray-50 p-4 rounded-md border">
                <p className="font-medium text-gray-900">{order.customer}</p>
                <p className="text-gray-600">{order.email}</p>
                <p className="text-gray-600 mt-2">{order.address}</p>
              </div>
            </section>

            {/* Items */}
            <section>
              <h3 className="font-semibold mb-2 text-gray-800">Items</h3>
              <ul className="divide-y border rounded-md">
                {order.products.map((item, index) => (
                  <li key={index} className="flex items-center gap-4 p-3">
                    <Image src={item.image} alt={item.name} width={48} height={48} className="rounded-md object-cover bg-gray-100" />
                    <div className="grow">
                      <p className="font-medium text-gray-900">{item.name}</p>
                      <p className="text-sm text-gray-500">Qty: {item.qty}</p>
                    </div>
                    <p className="text-sm font-medium text-gray-800">{item.price}</p>
                  </li>
                ))}
                 <li className="flex justify-end p-3 font-bold text-gray-900">
                    Total: {order.total}
                </li>
              </ul>
            </section>

            {/* Status Timeline */}
            <section>
              <h3 className="font-semibold mb-4 text-gray-800">Timeline</h3>
              <ol className="flex items-center w-full">
                {STATUS_TIMELINE.map((status, i) => {
                  const isCompleted = i < currentStatusIndex;
                  const isCurrent = i === currentStatusIndex;
                  return (
                    <Fragment key={status}>
                      <li className="flex items-center text-sm">
                        <div
                          className={clsx(
                            "flex items-center justify-center w-8 h-8 rounded-full shrink-0",
                            {
                              'bg-indigo-600 text-white': isCurrent || isCompleted,
                              'bg-gray-100 text-gray-500 border': !isCurrent && !isCompleted,
                            }
                          )}
                        >
                          {isCompleted ? '✓' : i + 1}
                        </div>
                        <span className={clsx("ml-2 font-medium", { 'text-indigo-600': isCurrent, 'text-gray-500': !isCurrent && !isCompleted })}>{status}</span>
                      </li>
                      {i < STATUS_TIMELINE.length - 1 && (
                        <li className="flex-auto border-t-2 mx-4" />
                      )}
                    </Fragment>
                  );
                })}
              </ol>
            </section>

            {/* Status Update */}
            <section>
              <h3 className="font-semibold mb-2 text-gray-800">Update Status</h3>
              <div className="flex flex-col sm:flex-row gap-2">
                <select
                  value={newStatus}
                  onChange={(e) => setNewStatus(e.target.value as OrderStatus)}
                  className="grow border rounded-md py-2 px-3 focus:ring-indigo-500 focus:border-indigo-500 bg-white"
                >
                  <option value="" disabled>Select new status</option>
                  {(['Pending', 'Processing', 'Shipped', 'Delivered', 'Cancelled'] as OrderStatus[]).map(status => (
                    <option key={status} value={status}>{status}</option>
                  ))}
                </select>
                <button
                  onClick={handleStatusUpdate}
                  className="bg-indigo-600 text-white px-4 py-2 rounded-md font-medium hover:bg-indigo-700 disabled:bg-indigo-300 disabled:cursor-not-allowed"
                  disabled={!newStatus || newStatus === order.status}
                >
                  Update
                </button>
              </div>
            </section>

            {/* Internal Notes */}
            <section>
              <h3 className="font-semibold mb-2 text-gray-800">Internal Notes</h3>
              <textarea
                value={internalNotes}
                onChange={(e) => setInternalNotes(e.target.value)}
                rows={4}
                className="w-full border rounded-md p-2 focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="Add internal notes here..."
              />
            </section>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}