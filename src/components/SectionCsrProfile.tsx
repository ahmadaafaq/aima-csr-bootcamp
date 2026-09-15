import React from 'react';
import { FormData, BUDGET_SLABS, FOCUS_AREAS, EXECUTION_CHANNELS } from '../types';
import { ArrowLeft, ArrowRight, CheckSquare, Square, Info } from 'lucide-react';

interface SectionCsrProfileProps {
  formData: FormData;
  onChange: (field: keyof FormData, value: any) => void;
  onNext: () => void;
  onPrev: () => void;
  errors: Record<string, string>;
}

export const SectionCsrProfile: React.FC<SectionCsrProfileProps> = ({
  formData,
  onChange,
  onNext,
  onPrev,
  errors,
}) => {
  const toggleFocusArea = (area: string) => {
    const current = [...formData.focusAreas];
    const index = current.indexOf(area);
    if (index > -1) {
      current.splice(index, 1);
    } else {
      current.push(area);
    }
    onChange('focusAreas', current);
  };

  const toggleExecutionChannel = (channel: string) => {
    const current = [...formData.executionChannels];
    const index = current.indexOf(channel);
    if (index > -1) {
      current.splice(index, 1);
    } else {
      current.push(channel);
    }
    onChange('executionChannels', current);
  };

  return (
    <div className="bg-white border border-gray-200 rounded-sm shadow-xs overflow-hidden">
      {/* Section Header */}
      <div className="bg-gradient-to-r from-[#0b3c68] to-[#165084] text-white px-6 py-4 flex justify-between items-center">
        <div>
          <div className="text-[11px] font-bold text-amber-300 uppercase tracking-widest">
            Section 02 / 07
          </div>
          <h2 className="text-lg sm:text-xl font-bold tracking-tight uppercase">
            CSR Profile of Nominating Organisation
          </h2>
        </div>
      </div>

      <div className="p-6 sm:p-8 space-y-8">
        <div className="flex items-start gap-3 p-3.5 bg-sky-50 border border-sky-200 rounded-sm text-xs text-sky-900">
          <Info className="w-4 h-4 text-[#0b3c68] shrink-0 mt-0.5" />
          <p>
            <strong className="font-semibold text-[#0b3c68]">For Programme Customisation & Case-Study Mapping:</strong> The information provided here helps AIMA academic faculty contextualise cohort masterclasses and collaborative action roadmaps for your industry sector.
          </p>
        </div>

        {/* 1. Annual CSR Budget Slab */}
        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-gray-800 mb-2">
            Annual CSR Budget Slab <span className="text-red-600">*</span>
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
            {BUDGET_SLABS.map((slab) => {
              const isSelected = formData.annualBudgetSlab === slab;
              return (
                <label
                  key={slab}
                  className={`flex items-center gap-3 p-3 rounded-sm border cursor-pointer transition-all ${
                    isSelected
                      ? 'bg-[#edf5fb] border-[#0b3c68] shadow-xs'
                      : 'border-gray-200 hover:bg-gray-50'
                  }`}
                >
                  <input
                    type="radio"
                    name="annualBudgetSlab"
                    checked={isSelected}
                    onChange={() => onChange('annualBudgetSlab', slab)}
                    className="w-4 h-4 text-[#0b3c68] focus:ring-[#0b3c68]"
                  />
                  <span
                    className={`text-xs font-medium ${
                      isSelected ? 'text-[#0b3c68] font-bold' : 'text-gray-700'
                    }`}
                  >
                    {slab}
                  </span>
                </label>
              );
            })}
          </div>
          {errors.annualBudgetSlab && (
            <p className="mt-1 text-xs text-red-600 font-medium">{errors.annualBudgetSlab}</p>
          )}
        </div>

        {/* 2. Schedule VII Focus Area */}
        <div>
          <div className="flex justify-between items-baseline mb-2">
            <label className="block text-xs font-bold uppercase tracking-wider text-gray-800">
              Schedule VII Focus Area (Select all that apply) <span className="text-red-600">*</span>
            </label>
            <span className="text-[11px] text-gray-500">
              Selected: <span className="font-bold text-[#0b3c68]">{formData.focusAreas.length}</span>
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5">
            {FOCUS_AREAS.map((area) => {
              const isSelected = formData.focusAreas.includes(area);
              return (
                <button
                  type="button"
                  key={area}
                  onClick={() => toggleFocusArea(area)}
                  className={`flex items-start gap-2.5 p-2.5 rounded-sm border text-left text-xs transition-all ${
                    isSelected
                      ? 'bg-[#edf5fb] border-[#0b3c68] text-[#0b3c68] font-semibold'
                      : 'border-gray-200 bg-white text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  {isSelected ? (
                    <CheckSquare className="w-4 h-4 text-[#0b3c68] shrink-0 mt-0.5" />
                  ) : (
                    <Square className="w-4 h-4 text-gray-400 shrink-0 mt-0.5" />
                  )}
                  <span>{area}</span>
                </button>
              );
            })}
          </div>
          {errors.focusAreas && (
            <p className="mt-1.5 text-xs text-red-600 font-medium">{errors.focusAreas}</p>
          )}
        </div>

        {/* 3. Project Execution Channel */}
        <div>
          <div className="flex justify-between items-baseline mb-2">
            <label className="block text-xs font-bold uppercase tracking-wider text-gray-800">
              Project Execution Channel
            </label>
            <span className="text-[11px] text-gray-500">
              Selected: <span className="font-bold text-[#0b3c68]">{formData.executionChannels.length}</span>
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            {EXECUTION_CHANNELS.map((channel) => {
              const isSelected = formData.executionChannels.includes(channel);
              return (
                <button
                  type="button"
                  key={channel}
                  onClick={() => toggleExecutionChannel(channel)}
                  className={`flex items-start gap-2.5 p-2.5 rounded-sm border text-left text-xs transition-all ${
                    isSelected
                      ? 'bg-[#edf5fb] border-[#0b3c68] text-[#0b3c68] font-semibold'
                      : 'border-gray-200 bg-white text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  {isSelected ? (
                    <CheckSquare className="w-4 h-4 text-[#0b3c68] shrink-0 mt-0.5" />
                  ) : (
                    <Square className="w-4 h-4 text-gray-400 shrink-0 mt-0.5" />
                  )}
                  <span>{channel}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* 4. Other Priorities */}
        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-gray-800 mb-1.5">
            Other CSR Priorities / Areas of Interest
          </label>
          <textarea
            rows={3}
            value={formData.otherPriorities}
            onChange={(e) => onChange('otherPriorities', e.target.value)}
            placeholder="Describe key thematic focus, geographical clusters, or specific capacity-building objectives for this cohort..."
            className="w-full p-3 text-sm bg-white border border-gray-300 rounded-sm focus:border-[#0b3c68] focus:ring-1 focus:ring-[#0b3c68] outline-none transition-all"
          />
        </div>

        {/* Navigation Buttons */}
        <div className="pt-6 border-t border-gray-200 flex justify-between items-center">
          <button
            type="button"
            onClick={onPrev}
            className="px-5 py-2.5 border border-gray-300 text-gray-700 hover:bg-gray-50 font-bold text-xs uppercase tracking-wider rounded-sm transition-colors flex items-center gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Previous</span>
          </button>

          <button
            type="button"
            onClick={onNext}
            className="px-6 py-2.5 bg-[#0b3c68] hover:bg-[#082a4a] text-white font-bold text-sm uppercase tracking-wider rounded-sm transition-colors shadow-sm flex items-center gap-2"
          >
            <span>Proceed to Nominee Details</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
