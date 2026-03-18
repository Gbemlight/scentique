export default function ConfirmationPage() {
  return (
    <div className="max-w-3xl mx-auto px-6 py-24 text-center space-y-6">
      <h1 className="text-3xl font-serif">Order Confirmed</h1>

      <p className="text-gray-600">
        Thank you for your purchase. Your order has been placed successfully.
      </p>

      <div className="border p-6 rounded">
        <p className="font-medium">Order #SCNT-1024</p>
        <p className="text-sm text-gray-500">
          A confirmation email has been sent.
        </p>
      </div>
    </div>
  );
}