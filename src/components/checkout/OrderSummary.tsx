export default function OrderSummary() {
  return (
    <div className="sticky top-10 border p-6 rounded space-y-4">
      <h3 className="font-serif text-lg">Order Summary</h3>

      <div className="flex justify-between text-sm">
        <span>Oud Royal</span>
        <span>₦45,000</span>
      </div>

      <div className="flex justify-between text-sm">
        <span>Shipping</span>
        <span>₦3,000</span>
      </div>

      <div className="border-t pt-4 flex justify-between font-medium">
        <span>Total</span>
        <span>₦48,000</span>
      </div>
    </div>
  );
}