import React from 'react';
import { FormData } from '../types';
import { ShieldCheck, UserCheck, Briefcase, FileCheck, ArrowLeft, ArrowRight, AlertCircle } from 'lucide-react';

interface SectionAuthorisationProps {
  formData: FormData;
  onChange: (field: keyof FormData, value: any) => void;
  onNext: () => void;
  onPrev: () => void;
  errors: Record<string, string>;
}

export const SectionAuthorisation: React.FC<SectionAuthorisationProps> = ({
  formData,
  onChange,
  onNext,
  onPrev,
  errors,
}) => {
  return (
    <div className="bg-white border border-gray-200 rounded-sm shadow-xs overflow-hidden">
      {/* Section Header */}
      <div className="bg-gradient-to-r from-[#0b3c68] to-[#165084] text-white px-6 py-4 flex justify-between items-center">
        <div>
          <div className="text-[11px] font-bold text-amber-300 uppercase tracking-widest">
            Section 06 / 07
          </div>
          <h2 className="text-lg sm:text-xl font-bold tracking-tight uppercase">
            Management Authorisation & Declaration
          </h2>
        </div>
      </div>

      <div className="p-4 sm:p-8 space-y-6">
        <p className="text-xs sm:text-sm text-gray-600 border-l-3 border-[#0b3c68] pl-3 py-1 bg-gray-50">
          This nomination form requires official management endorsement. Please confirm that the nominating officer has appropriate organizational authority to approve participation and associated fees.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
          {/* Executive Name */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-1">
              Sponsoring Executive Name <span className="text-red-600">*</span>
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-400">
                <UserCheck className="w-4 h-4" />
              </div>
              <input
                type="text"
                value={formData.execName}
                onChange={(e) => onChange('execName', e.target.value)}
                placeholder="e.g. Rajiv Sharma"
                className={`w-full pl-10 pr-3 py-2.5 text-sm bg-white border ${
                  errors.execName ? 'border-red-500 ring-1 ring-red-500' : 'border-gray-300 focus:border-[#0b3c68]'
                } rounded-sm outline-none transition-all`}
              />
            </div>
            {errors.execName && (
              <p className="mt-1 text-xs text-red-600 font-medium">{errors.execName}</p>
            )}
          </div>

          {/* Executive Designation */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-1">
              Sponsoring Executive Designation <span className="text-red-600">*</span>
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-400">
                <Briefcase className="w-4 h-4" />
              </div>
              <input
                type="text"
                value={formData.execDesignation}
                onChange={(e) => onChange('execDesignation', e.target.value)}
                placeholder="e.g. Vice President – Corporate Affairs"
                className={`w-full pl-10 pr-3 py-2.5 text-sm bg-white border ${
                  errors.execDesignation ? 'border-red-500 ring-1 ring-red-500' : 'border-gray-300 focus:border-[#0b3c68]'
                } rounded-sm outline-none transition-all`}
              />
            </div>
            {errors.execDesignation && (
              <p className="mt-1 text-xs text-red-600 font-medium">{errors.execDesignation}</p>
            )}
          </div>
        </div>

        {/* Declaration Box */}
        <div
          className={`p-4 sm:p-5 rounded-sm border transition-all ${
            errors.isAuthorized
              ? 'bg-red-50/50 border-red-300 ring-1 ring-red-400'
              : 'bg-[#f8fafc] border-gray-300'
          }`}
        >
          <label className="flex items-start gap-3.5 cursor-pointer">
            <input
              type="checkbox"
              checked={formData.isAuthorized}
              onChange={(e) => onChange('isAuthorized', e.target.checked)}
              className="w-5 h-5 text-[#0b3c68] focus:ring-[#0b3c68] rounded mt-0.5 shrink-0"
            />
            <div className="space-y-1 text-xs text-gray-700 leading-relaxed">
              <span className="font-bold text-gray-900 block text-sm">
                Official Undertaking & Nomination Confirmation
              </span>
              <p>
                I hereby confirm that I am duly authorised to submit this nomination on behalf of <strong>{formData.orgName || 'the organisation'}</strong> for the AIMA Certified CSR Leader Bootcamp. The organisation agrees to the programme terms, fee schedule, and attendance requirements for the nominated delegates.
              </p>
            </div>
          </label>
          {errors.isAuthorized && (
            <div className="mt-2.5 flex items-center gap-1.5 text-xs text-red-600 font-semibold pl-8">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{errors.isAuthorized}</span>
            </div>
          )}
        </div>

        {/* Navigation Buttons */}
        <div className="pt-6 border-t border-gray-200 flex flex-col-reverse sm:flex-row justify-between items-stretch sm:items-center gap-3">
          <button
            type="button"
            onClick={onPrev}
            className="w-full sm:w-auto px-5 py-2.5 border border-gray-300 text-gray-700 hover:bg-gray-50 font-bold text-xs uppercase tracking-wider rounded-sm transition-colors flex items-center justify-center gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Previous</span>
          </button>

          <button
            type="button"
            onClick={onNext}
            className="w-full sm:w-auto px-6 py-2.5 bg-[#0b3c68] hover:bg-[#082a4a] text-white font-bold text-sm uppercase tracking-wider rounded-sm transition-colors shadow-sm flex items-center justify-center gap-2"
          >
            <span>Proceed to Review & Submit</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
