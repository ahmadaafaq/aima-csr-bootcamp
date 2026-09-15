import React from 'react';
import { Check, Building2, PieChart, Users, Calculator, CreditCard, ShieldCheck, FileCheck } from 'lucide-react';

interface Step {
  id: number;
  label: string;
  sublabel: string;
  icon: React.ComponentType<{ className?: string }>;
}

const STEPS: Step[] = [
  { id: 1, label: 'Organisation', sublabel: 'Sponsoring Details', icon: Building2 },
  { id: 2, label: 'CSR Profile', sublabel: 'Focus & Budget', icon: PieChart },
  { id: 3, label: 'Nominees', sublabel: 'Participant Details', icon: Users },
  { id: 4, label: 'Fee', sublabel: 'Pricing & Discount', icon: Calculator },
  { id: 5, label: 'Billing', sublabel: 'Invoicing & PO', icon: CreditCard },
  { id: 6, label: 'Authorisation', sublabel: 'Executive Sign-off', icon: ShieldCheck },
  { id: 7, label: 'Review', sublabel: 'Verify & Submit', icon: FileCheck },
];

interface ProgressIndicatorProps {
  currentStep: number;
  completedSteps: number[];
  onSelectStep: (step: number) => void;
}

export const ProgressIndicator: React.FC<ProgressIndicatorProps> = ({
  currentStep,
  completedSteps,
  onSelectStep,
}) => {
  return (
    <div className="w-full bg-white border border-gray-200 rounded-sm shadow-xs mb-8 overflow-hidden">
      {/* Step Header Title */}
      <div className="bg-[#f8fafc] border-b border-gray-200 px-4 sm:px-6 py-2.5 flex justify-between items-center text-xs">
        <span className="font-bold text-[#0b3c68] uppercase tracking-wider">
          Registration Workflow
        </span>
        <span className="text-gray-500 font-medium">
          Step <span className="text-[#0b3c68] font-bold">{currentStep}</span> of 7 (
          {Math.round((currentStep / 7) * 100)}% Complete)
        </span>
      </div>

      {/* Desktop Horizontal Stepper */}
      <div className="hidden md:grid grid-cols-7 divide-x divide-gray-100 bg-white">
        {STEPS.map((step) => {
          const isCurrent = currentStep === step.id;
          const isCompleted = completedSteps.includes(step.id) || currentStep > step.id;
          const StepIcon = step.icon;

          return (
            <button
              key={step.id}
              type="button"
              onClick={() => onSelectStep(step.id)}
              className={`p-3 text-left transition-all relative flex flex-col justify-between ${
                isCurrent
                  ? 'bg-[#edf5fb] border-b-2 border-b-[#0b3c68]'
                  : 'hover:bg-gray-50'
              }`}
            >
              <div className="flex items-center justify-between mb-1.5">
                <span
                  className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold transition-colors ${
                    isCompleted
                      ? 'bg-[#15803d] text-white'
                      : isCurrent
                      ? 'bg-[#0b3c68] text-white ring-2 ring-[#0b3c68]/20'
                      : 'bg-gray-200 text-gray-700'
                  }`}
                >
                  {isCompleted ? <Check className="w-3.5 h-3.5 stroke-[3]" /> : step.id}
                </span>

                <StepIcon
                  className={`w-4 h-4 ${
                    isCurrent ? 'text-[#0b3c68]' : isCompleted ? 'text-green-700' : 'text-gray-400'
                  }`}
                />
              </div>

              <div>
                <div
                  className={`text-xs font-bold leading-tight ${
                    isCurrent ? 'text-[#0b3c68]' : isCompleted ? 'text-gray-900' : 'text-gray-600'
                  }`}
                >
                  {step.label}
                </div>
                <div className="text-[10px] text-gray-500 truncate mt-0.5">
                  {step.sublabel}
                </div>
              </div>
            </button>
          );
        })}
      </div>

      {/* Mobile Stepper */}
      <div className="md:hidden p-3 bg-white space-y-2">
        <div className="flex items-center justify-between text-xs text-gray-600">
          <span className="font-bold text-[#0b3c68]">
            {STEPS[currentStep - 1]?.label} ({currentStep}/7)
          </span>
          <span className="text-[11px] text-gray-500 font-medium">
            {STEPS[currentStep - 1]?.sublabel}
          </span>
        </div>

        {/* Mini progress bar for mobile */}
        <div className="w-full bg-gray-200 h-1.5 rounded-full overflow-hidden">
          <div
            className="bg-[#0b3c68] h-full transition-all duration-300 rounded-full"
            style={{ width: `${(currentStep / 7) * 100}%` }}
          />
        </div>

        {/* Scrollable Step Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto pt-1 pb-0.5 scrollbar-none">
          {STEPS.map((step) => {
            const isCurrent = currentStep === step.id;
            const isCompleted = completedSteps.includes(step.id) || currentStep > step.id;

            return (
              <button
                key={step.id}
                type="button"
                onClick={() => onSelectStep(step.id)}
                className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded text-xs font-semibold whitespace-nowrap transition-colors shrink-0 ${
                  isCurrent
                    ? 'bg-[#0b3c68] text-white shadow-xs'
                    : isCompleted
                    ? 'bg-emerald-100 text-emerald-900 border border-emerald-200'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                <span className="w-4 h-4 rounded-full bg-black/10 flex items-center justify-center text-[10px] font-bold">
                  {isCompleted ? '✓' : step.id}
                </span>
                <span>{step.label}</span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
