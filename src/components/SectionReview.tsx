import React from 'react';
import { FormData, calculateFee, formatINR } from '../types';
import { Edit2, CheckCircle2, ArrowLeft, Send, ShieldCheck, Building, PieChart, Users, Calculator, CreditCard } from 'lucide-react';

interface SectionReviewProps {
  formData: FormData;
  onEditSection: (step: number) => void;
  onPrev: () => void;
  onSubmit: () => void;
  isSubmitting: boolean;
}

export const SectionReview: React.FC<SectionReviewProps> = ({
  formData,
  onEditSection,
  onPrev,
  onSubmit,
  isSubmitting,
}) => {
  const feeCalc = calculateFee(formData.nominees.length, formData.isAimaMember);

  return (
    <div className="bg-white border border-gray-200 rounded-sm shadow-xs overflow-hidden">
      {/* Section Header */}
      <div className="bg-gradient-to-r from-[#0b3c68] to-[#165084] text-white px-6 py-4 flex justify-between items-center">
        <div>
          <div className="text-[11px] font-bold text-amber-300 uppercase tracking-widest">
            Section 07 / 07
          </div>
          <h2 className="text-lg sm:text-xl font-bold tracking-tight uppercase">
            Review & Final Submission
          </h2>
        </div>
      </div>

      <div className="p-4 sm:p-8 space-y-5 sm:space-y-6">
        <div className="p-3.5 sm:p-4 bg-emerald-50 border-l-4 border-emerald-600 text-xs text-emerald-900 rounded-r-sm flex items-start gap-3">
          <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
          <div>
            <span className="font-bold block text-xs sm:text-sm">Please verify all nomination information</span>
            All details below have been pre-validated. You can click <strong>EDIT</strong> on any section to modify values before final submission.
          </div>
        </div>

        <div className="space-y-3.5 sm:space-y-4">
          {/* Card 1: Organisation Details */}
          <div className="border border-gray-200 rounded-sm bg-white overflow-hidden">
            <div className="bg-[#f8fafc] px-3.5 sm:px-4 py-2.5 border-b border-gray-200 flex justify-between items-center">
              <span className="text-xs font-bold text-[#0b3c68] uppercase tracking-wider flex items-center gap-1.5">
                <Building className="w-3.5 h-3.5 shrink-0" />
                01. Sponsoring Organisation Details
              </span>
              <button
                type="button"
                onClick={() => onEditSection(1)}
                className="text-xs text-[#0b3c68] hover:text-[#082a4a] hover:bg-gray-100 px-2 sm:px-2.5 py-1 rounded font-bold uppercase tracking-wider transition-colors flex items-center gap-1 border border-gray-200"
              >
                <Edit2 className="w-3 h-3" />
                Edit
              </button>
            </div>
            <div className="p-3.5 sm:p-4 grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div>
                <span className="text-gray-500 block">Organisation Name:</span>
                <span className="font-bold text-gray-900">{formData.orgName}</span>
              </div>
              <div>
                <span className="text-gray-500 block">Sponsoring Authority:</span>
                <span className="font-semibold text-gray-800">
                  {formData.authName} ({formData.authDesignation})
                </span>
              </div>
              <div>
                <span className="text-gray-500 block">Official Email:</span>
                <span className="font-medium text-gray-800 break-all">{formData.authEmail}</span>
              </div>
              <div>
                <span className="text-gray-500 block">Mobile Number:</span>
                <span className="font-medium text-gray-800">{formData.authMobile}</span>
              </div>
            </div>
          </div>

          {/* Card 2: CSR Profile */}
          <div className="border border-gray-200 rounded-sm bg-white overflow-hidden">
            <div className="bg-[#f8fafc] px-3.5 sm:px-4 py-2.5 border-b border-gray-200 flex justify-between items-center">
              <span className="text-xs font-bold text-[#0b3c68] uppercase tracking-wider flex items-center gap-1.5">
                <PieChart className="w-3.5 h-3.5 shrink-0" />
                02. CSR Profile & Thematic Priorities
              </span>
              <button
                type="button"
                onClick={() => onEditSection(2)}
                className="text-xs text-[#0b3c68] hover:text-[#082a4a] hover:bg-gray-100 px-2 sm:px-2.5 py-1 rounded font-bold uppercase tracking-wider transition-colors flex items-center gap-1 border border-gray-200"
              >
                <Edit2 className="w-3 h-3" />
                Edit
              </button>
            </div>
            <div className="p-3.5 sm:p-4 space-y-3 text-xs">
              <div>
                <span className="text-gray-500 block">Annual CSR Budget Slab:</span>
                <span className="inline-block bg-[#0b3c68]/10 text-[#0b3c68] font-bold px-2 py-0.5 rounded text-xs mt-0.5">
                  {formData.annualBudgetSlab}
                </span>
              </div>
              <div>
                <span className="text-gray-500 block mb-1">Schedule VII Focus Areas:</span>
                <div className="flex flex-wrap gap-1.5">
                  {formData.focusAreas.map((area) => (
                    <span
                      key={area}
                      className="bg-gray-100 text-gray-800 text-[11px] px-2 py-0.5 rounded border border-gray-200 font-medium"
                    >
                      {area}
                    </span>
                  ))}
                </div>
              </div>
              {formData.executionChannels.length > 0 && (
                <div>
                  <span className="text-gray-500 block mb-1">Execution Channels:</span>
                  <div className="flex flex-wrap gap-1.5">
                    {formData.executionChannels.map((ch) => (
                      <span
                        key={ch}
                        className="bg-gray-100 text-gray-800 text-[11px] px-2 py-0.5 rounded border border-gray-200"
                      >
                        {ch}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Card 3: Nominees */}
          <div className="border border-gray-200 rounded-sm bg-white overflow-hidden">
            <div className="bg-[#f8fafc] px-3.5 sm:px-4 py-2.5 border-b border-gray-200 flex justify-between items-center">
              <span className="text-xs font-bold text-[#0b3c68] uppercase tracking-wider flex items-center gap-1.5">
                <Users className="w-3.5 h-3.5 shrink-0" />
                03. Nominee Roster ({formData.nominees.length} Person{formData.nominees.length > 1 ? 's' : ''})
              </span>
              <button
                type="button"
                onClick={() => onEditSection(3)}
                className="text-xs text-[#0b3c68] hover:text-[#082a4a] hover:bg-gray-100 px-2 sm:px-2.5 py-1 rounded font-bold uppercase tracking-wider transition-colors flex items-center gap-1 border border-gray-200"
              >
                <Edit2 className="w-3 h-3" />
                Edit
              </button>
            </div>
            <div className="p-3.5 sm:p-4 divide-y divide-gray-100">
              {formData.nominees.map((nom, i) => (
                <div key={nom.id || i} className="py-2.5 first:pt-0 last:pb-0 flex flex-col sm:flex-row sm:items-center justify-between gap-1.5 sm:gap-2 text-xs">
                  <div>
                    <span className="font-bold text-gray-900 mr-2">
                      {String(i + 1).padStart(2, '0')}. {nom.name}
                    </span>
                    <span className="text-gray-500">({nom.designation})</span>
                  </div>
                  <div className="text-gray-600 font-mono text-[11px] flex flex-wrap items-center gap-2 sm:gap-3">
                    <span className="break-all">{nom.email}</span>
                    <span className="hidden sm:inline">•</span>
                    <span>+91 {nom.mobile}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Card 4: Fee Breakdown */}
          <div className="border border-[#0b3c68]/30 rounded-sm bg-[#fafcff] overflow-hidden">
            <div className="bg-[#0b3c68] text-white px-3.5 sm:px-4 py-2.5 flex justify-between items-center">
              <span className="text-xs font-bold uppercase tracking-wider flex items-center gap-1.5">
                <Calculator className="w-3.5 h-3.5 text-amber-300 shrink-0" />
                04. Participation Fee Summary
              </span>
              <button
                type="button"
                onClick={() => onEditSection(4)}
                className="text-xs text-white hover:bg-white/20 px-2 sm:px-2.5 py-1 rounded font-bold uppercase tracking-wider transition-colors flex items-center gap-1 border border-white/20"
              >
                <Edit2 className="w-3 h-3" />
                Edit
              </button>
            </div>
            <div className="p-3.5 sm:p-4 space-y-2 text-xs">
              <div className="flex justify-between text-gray-600">
                <span>
                  Base Fee ({feeCalc.participantCount} × {formatINR(feeCalc.ratePerPerson)})
                </span>
                <span className="font-semibold text-gray-900">{formatINR(feeCalc.subtotal)}</span>
              </div>
              {formData.isAimaMember && (
                <div className="flex justify-between text-emerald-700 font-medium">
                  <span>AIMA Member Discount (10%)</span>
                  <span>– {formatINR(feeCalc.discountAmount)}</span>
                </div>
              )}
              <div className="flex justify-between text-gray-600">
                <span>GST (18%)</span>
                <span>+ {formatINR(feeCalc.gstAmount)}</span>
              </div>
              <div className="flex justify-between text-xs sm:text-sm font-black text-[#0b3c68] pt-2 border-t border-gray-200">
                <span>Final Payable Amount:</span>
                <span className="text-sm sm:text-base font-extrabold">{formatINR(feeCalc.totalPayable)}</span>
              </div>
            </div>
          </div>

          {/* Card 5: Invoicing & Payment Preference */}
          <div className="border border-gray-200 rounded-sm bg-white overflow-hidden">
            <div className="bg-[#f8fafc] px-3.5 sm:px-4 py-2.5 border-b border-gray-200 flex justify-between items-center">
              <span className="text-xs font-bold text-[#0b3c68] uppercase tracking-wider flex items-center gap-1.5">
                <CreditCard className="w-3.5 h-3.5 shrink-0" />
                05. Invoicing & Payment Mode
              </span>
              <button
                type="button"
                onClick={() => onEditSection(5)}
                className="text-xs text-[#0b3c68] hover:text-[#082a4a] hover:bg-gray-100 px-2 sm:px-2.5 py-1 rounded font-bold uppercase tracking-wider transition-colors flex items-center gap-1 border border-gray-200"
              >
                <Edit2 className="w-3 h-3" />
                Edit
              </button>
            </div>
            <div className="p-3.5 sm:p-4 grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div>
                <span className="text-gray-500 block">Invoicing Entity:</span>
                <span className="font-bold text-gray-900">{formData.billingOrgName}</span>
              </div>
              <div>
                <span className="text-gray-500 block">GSTIN:</span>
                <span className="font-mono font-bold text-[#0b3c68]">{formData.billingGstin}</span>
              </div>
              <div>
                <span className="text-gray-500 block">Selected Payment Mode:</span>
                <span className="inline-block bg-blue-50 text-blue-900 font-bold px-2 py-0.5 rounded text-[11px] uppercase mt-0.5 border border-blue-200">
                  {formData.paymentPreference === 'pay_now'
                    ? 'Pay Now (Instant Confirmation)'
                    : 'Pay Later / Corporate Tax Invoice'}
                </span>
              </div>
              <div>
                <span className="text-gray-500 block">PO / Work Order:</span>
                <span className="font-mono text-gray-800">{formData.poNumber || 'Not provided'}</span>
              </div>
            </div>
          </div>

          {/* Card 6: Authorisation */}
          <div className="border border-gray-200 rounded-sm bg-white overflow-hidden">
            <div className="bg-[#f8fafc] px-3.5 sm:px-4 py-2.5 border-b border-gray-200 flex justify-between items-center">
              <span className="text-xs font-bold text-[#0b3c68] uppercase tracking-wider flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 shrink-0" />
                06. Authorisation Sign-off
              </span>
              <button
                type="button"
                onClick={() => onEditSection(6)}
                className="text-xs text-[#0b3c68] hover:text-[#082a4a] hover:bg-gray-100 px-2 sm:px-2.5 py-1 rounded font-bold uppercase tracking-wider transition-colors flex items-center gap-1 border border-gray-200"
              >
                <Edit2 className="w-3 h-3" />
                Edit
              </button>
            </div>
            <div className="p-3.5 sm:p-4 text-xs space-y-1">
              <div className="flex items-center gap-2 text-emerald-800 font-semibold">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Officially Authorised by: {formData.execName} ({formData.execDesignation})</span>
              </div>
              <p className="text-gray-500 text-[11px] pl-6">
                Declaration accepted in accordance with AIMA Corporate Bootcamp Nomination terms.
              </p>
            </div>
          </div>
        </div>

        {/* Final CTA Buttons */}
        <div className="pt-6 border-t border-gray-200 flex flex-col-reverse sm:flex-row justify-between items-stretch sm:items-center gap-3 sm:gap-4">
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
            onClick={onSubmit}
            disabled={isSubmitting}
            className="w-full sm:w-auto px-8 py-3.5 bg-[#0b3c68] hover:bg-[#072847] text-white font-extrabold text-sm uppercase tracking-wider rounded-sm transition-all shadow-md hover:shadow-lg flex items-center justify-center gap-2 cursor-pointer"
          >
            {formData.paymentPreference === 'pay_now' ? (
              <CreditCard className="w-4 h-4 text-amber-300" />
            ) : (
              <Send className="w-4 h-4 text-amber-300" />
            )}
            <span>
              {isSubmitting
                ? 'Processing...'
                : formData.paymentPreference === 'pay_now'
                ? 'Submit & Pay Now'
                : 'Submit Nomination'}
            </span>
          </button>
        </div>
      </div>
    </div>
  );
};
