"use client";

import * as Dialog from "@radix-ui/react-dialog";

interface ConfirmationModalProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  onConfirm: () => void;
  title: string;
  description: string;
}

export default function ConfirmationModal({
  open,
  setOpen,
  onConfirm,
  title,
  description,
}: ConfirmationModalProps) {
  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black/40 z-50" />
        <Dialog.Content className="fixed top-1/2 left-1/2 bg-white p-6 rounded-lg w-96 max-w-[95vw] -translate-x-1/2 -translate-y-1/2 shadow-lg z-50">
          <Dialog.Title className="text-lg font-bold mb-2">{title}</Dialog.Title>
          <Dialog.Description className="text-sm text-gray-600 mb-6">
            {description}
          </Dialog.Description>
          <div className="flex justify-end gap-3">
            <Dialog.Close asChild>
              <button className="border px-4 py-2 rounded">Cancel</button>
            </Dialog.Close>
            <button
              onClick={() => {
                onConfirm();
                setOpen(false);
              }}
              className="bg-red-600 text-white px-4 py-2 rounded"
            >
              Delete
            </button>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}