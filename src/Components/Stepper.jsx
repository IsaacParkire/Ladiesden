import React from "react";

const Stepper = ({ steps, currentStep }) => (
  <div className="flex items-center justify-center w-full py-4 bg-white sticky top-0 z-30">
    {steps.map((step, idx) => (
      <div key={step} className="flex items-center">
        <div
          className={`w-7 h-7 flex items-center justify-center rounded-full font-bold text-xs
            ${idx < currentStep ? 'bg-green-500 text-white' : idx === currentStep ? 'bg-pink-500 text-white' : 'bg-gray-200 text-gray-400'}`}
        >
          {idx + 1}
        </div>
        {idx < steps.length - 1 && (
          <div className="w-8 h-1 bg-gray-200 mx-1 rounded" />
        )}
      </div>
    ))}
  </div>
);

export default Stepper;
