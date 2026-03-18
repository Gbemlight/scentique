"use client";

export function CustomerDetailPanel({ customer, close }: any) {

  if (!customer) return null;

  return (
    <div className="fixed right-0 top-0 w-100 h-full bg-white shadow-xl p-6 overflow-y-auto">

      <button onClick={close} className="mb-4 text-sm">
        Close
      </button>

      <h2 className="text-lg font-bold mb-4">
        {customer.name}
      </h2>

      <p className="text-sm text-gray-500 mb-6">
        {customer.email}
      </p>

      <h3 className="font-medium mb-2">Order History</h3>

      <div className="space-y-2">

        {customer.history.map((o: any) => (
          <div
            key={o.id}
            className="border p-2 rounded text-sm"
          >
            {o.id} — {o.total}
            <div className="text-xs text-gray-400">
              {o.date}
            </div>
          </div>
        ))}

      </div>

    </div>
  );
}