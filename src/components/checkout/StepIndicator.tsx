interface Props {
  currentStep: number;
}

const steps = ["Contact", "Shipping", "Payment", "Review"];

export default function StepIndicator({ currentStep }: Props) {
  return (
    <div className="flex items-center justify-between">
      {steps.map((label, index) => {
        const stepNumber = index + 1;
        const active = currentStep >= stepNumber;

        return (
          <div key={label} className="flex-1 flex items-center">
            <div
              className={`w-8 h-8 flex items-center justify-center rounded-full text-sm ${
                active
                  ? "bg-black text-white"
                  : "bg-gray-200 text-gray-500"
              }`}
            >
              {stepNumber}
            </div>

            <span className="ml-2 text-sm">{label}</span>

            {stepNumber !== steps.length && (
              <div className="flex-1 h-0.5 mx-4 bg-gray-200" />
            )}
          </div>
        );
      })}
    </div>
  );
}