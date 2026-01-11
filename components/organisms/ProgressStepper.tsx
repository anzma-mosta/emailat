'use client';

interface ProgressStepperProps {
  currentStep: number;
  totalSteps: number;
  stepLabels: string[];
}

export default function ProgressStepper({
  currentStep,
  totalSteps,
  stepLabels,
}: ProgressStepperProps) {
  const percentage = (currentStep / totalSteps) * 100;

  return (
    <div className="flex flex-col gap-3 pb-8">
      <div className="flex gap-6 justify-between items-center">
        <p className="text-[#0c121d] dark:text-white text-base font-medium leading-normal">
          Step {currentStep} of {totalSteps}: {stepLabels[currentStep - 1]}
        </p>
        {currentStep < totalSteps && (
          <span className="text-sm text-[#4563a1] dark:text-[#93c5fd]">
            Next: {stepLabels[currentStep]}
          </span>
        )}
      </div>
      <div className="rounded bg-[#cdd7ea] dark:bg-gray-700 h-2 w-full">
        <div
          className="h-2 rounded bg-primary transition-all duration-500"
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
}

