import React from 'react';
import { FormData, calculateFee, formatINR } from '../types';
import { Calculator, Award, CheckCircle2, Percent, Tag, ArrowLeft, ArrowRight, Info, AlertTriangle } from 'lucide-react';

interface SectionParticipationFeeProps {
  formData: FormData;
  onChange: (field: keyof FormData, value: any) => void;
  onNext: () => void;
  onPrev: () => void;
}

export const SectionParticipationFee: React.FC<SectionParticipationFeeProps> = ({
  formData,
  onChange,
  onNext,
  onPrev,
}) => {
  const feeCalc = calculateFee(formData.nominees.length, formData.isAimaMember);

  return (
    <div className="bg-white border border-gray-200 rounded-sm shadow-xs overflow-hidden">
      {/* Section Header */}
      <div className="bg-gradient-to-r from-[#0b3c68] to-[#165084] text-white px-6 py-4 flex justify-between items-center">
        <div>
          <div className="text-[11px] font-bold text-amber-300 uppercase tracking-widest">
            Section 04 / 07
          </div>
          <h2 className="text-lg sm:text-xl font-bold tracking-tight uppercase">
            Participation Fee Breakdown & Discounts
          </h2>
        </div>
      </div>

      <div className="p-6 sm:p-8 space-y-8">
        {/* Institutional Fee Slabs Reference Table */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <label className="text-xs font-bold uppercase tracking-wider text-gray-800 flex items-center gap-1.5">
              <Tag className="w-3.5 h-3.5 text-[#0b3c68]" />
              Approved Fee Structure (Per Participant / Slab)
            </label>
            <span className="text-[11px] text-gray-500 font-medium">
              Applicable GST: 18% extra
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {/* Slab 1 */}
            <div
              className={`p-3.5 rounded-sm border transition-all ${
                formData.nominees.length >= 1 && formData.nominees.length <= 3
                  ? 'bg-[#edf5fb] border-[#0b3c68] ring-1 ring-[#0b3c68]'
                  : 'bg-white border-gray-200'
              }`}
            >
              <div className="flex justify-between items-start">
                <span className="text-xs font-bold text-gray-800">1 – 3 Nominees</span>
                {formData.nominees.length >= 1 && formData.nominees.length <= 3 && (
                  <span className="bg-[#0b3c68] text-white text-[10px] font-bold px-1.5 py-0.5 rounded">
                    Active Slab
                  </span>
                )}
              </div>
              <div className="text-lg font-extrabold text-[#0b3c68] mt-1">₹14,000</div>
              <div className="text-[11px] text-gray-500">per participant</div>
            </div>

            {/* Slab 2 */}
            <div
              className={`p-3.5 rounded-sm border transition-all ${
                formData.nominees.length >= 4 && formData.nominees.length <= 7
                  ? 'bg-[#edf5fb] border-[#0b3c68] ring-1 ring-[#0b3c68]'
                  : 'bg-white border-gray-200'
              }`}
            >
              <div className="flex justify-between items-start">
                <span className="text-xs font-bold text-gray-800">4 – 7 Nominees</span>
                {formData.nominees.length >= 4 && formData.nominees.length <= 7 && (
                  <span className="bg-[#0b3c68] text-white text-[10px] font-bold px-1.5 py-0.5 rounded">
                    Active Slab
                  </span>
                )}
              </div>
              <div className="text-lg font-extrabold text-[#0b3c68] mt-1">₹11,500</div>
              <div className="text-[11px] text-gray-500">per participant (Institutional 5 = ₹57,500)</div>
            </div>

            {/* Slab 3 */}
            <div
              className={`p-3.5 rounded-sm border transition-all ${
                formData.nominees.length >= 8
                  ? 'bg-[#edf5fb] border-[#0b3c68] ring-1 ring-[#0b3c68]'
                  : 'bg-white border-gray-200'
              }`}
            >
              <div className="flex justify-between items-start">
                <span className="text-xs font-bold text-gray-800">8+ Nominees</span>
                {formData.nominees.length >= 8 && (
                  <span className="bg-[#0b3c68] text-white text-[10px] font-bold px-1.5 py-0.5 rounded">
                    Active Slab
                  </span>
                )}
              </div>
              <div className="text-lg font-extrabold text-[#0b3c68] mt-1">₹10,000</div>
              <div className="text-[11px] text-gray-500">per participant (Institutional 10 = ₹1,00,000)</div>
            </div>
          </div>
        </div>

        {/* AIMA Member 10% Discount Toggle Box */}
        <div className="p-5 bg-gradient-to-br from-amber-50 to-orange-50/50 border border-amber-200 rounded-sm">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <Award className="w-5 h-5 text-amber-600" />
                <h3 className="text-sm font-bold text-amber-950 uppercase tracking-wide">
                  Is the Nominating Organisation an AIMA Member?
                </h3>
              </div>
              <p className="text-xs text-amber-900 leading-relaxed max-w-xl">
                AIMA Corporate & Institutional Members are entitled to an additional{' '}
                <strong className="text-amber-950 underline">10% discount</strong> on the cumulative bootcamp registration fees.
              </p>
            </div>

            <div className="flex items-center gap-4 bg-white px-3 py-2 rounded-sm border border-amber-300 shadow-2xs shrink-0">
              <label className="flex items-center gap-2 text-xs font-bold text-gray-800 cursor-pointer">
                <input
                  type="radio"
                  name="isAimaMember"
                  checked={formData.isAimaMember === true}
                  onChange={() => onChange('isAimaMember', true)}
                  className="w-4 h-4 text-[#0b3c68] focus:ring-[#0b3c68]"
                />
                <span>YES (10% Off)</span>
              </label>
              <label className="flex items-center gap-2 text-xs font-bold text-gray-800 cursor-pointer">
                <input
                  type="radio"
                  name="isAimaMember"
                  checked={formData.isAimaMember === false}
                  onChange={() => onChange('isAimaMember', false)}
                  className="w-4 h-4 text-[#0b3c68] focus:ring-[#0b3c68]"
                />
                <span>NO</span>
              </label>
            </div>
          </div>

          {formData.isAimaMember && (
            <div className="mt-4 pt-3 border-t border-amber-200/70 flex flex-col sm:flex-row items-start sm:items-center gap-3">
              <label className="text-xs font-bold uppercase tracking-wider text-amber-950 whitespace-nowrap">
                AIMA Membership / Corp Code (Optional):
              </label>
              <input
                type="text"
                value={formData.aimaMembershipNo}
                onChange={(e) => onChange('aimaMembershipNo', e.target.value)}
                placeholder="e.g. AIMA/CORP/2024/7821"
                className="w-full sm:w-64 px-3 py-1.5 text-xs bg-white border border-amber-300 rounded-sm focus:border-[#0b3c68] outline-none"
              />
            </div>
          )}
        </div>

        {/* Live Mathematical Fee Calculation Summary Card */}
        <div className="border-2 border-[#0b3c68]/20 bg-[#fbfdff] rounded-sm overflow-hidden shadow-xs">
          <div className="bg-[#0b3c68] text-white px-6 py-3 flex justify-between items-center">
            <div className="flex items-center gap-2 text-sm font-bold uppercase tracking-wider">
              <Calculator className="w-4 h-4 text-amber-300" />
              Real-time Fee Calculation Statement
            </div>
            <span className="text-xs bg-white/15 px-2.5 py-0.5 rounded text-sky-100 font-medium">
              Auto-Computed
            </span>
          </div>

          <div className="p-6 space-y-4 text-sm">
            {/* Row 1: Participants */}
            <div className="flex justify-between items-center py-1.5 border-b border-gray-100">
              <span className="text-gray-600 font-medium">
                Total Nominated Participants
              </span>
              <span className="font-bold text-gray-900">
                {feeCalc.participantCount} Person{feeCalc.participantCount > 1 ? 's' : ''}
              </span>
            </div>

            {/* Row 2: Rate Breakdown */}
            <div className="flex justify-between items-center py-1.5 border-b border-gray-100">
              <span className="text-gray-600 font-medium">
                Applicable Unit Rate ({feeCalc.tierLabel})
              </span>
              <span className="font-semibold text-gray-800">
                {formatINR(feeCalc.ratePerPerson)} × {feeCalc.participantCount}
              </span>
            </div>

            {/* Row 3: Subtotal */}
            <div className="flex justify-between items-center py-1.5 border-b border-gray-100">
              <span className="text-gray-800 font-bold">Gross Subtotal</span>
              <span className="font-bold text-gray-900 text-base">
                {formatINR(feeCalc.subtotal)}
              </span>
            </div>

            {/* Row 4: AIMA Discount */}
            {formData.isAimaMember && (
              <div className="flex justify-between items-center py-1.5 border-b border-amber-100 bg-amber-50/50 -mx-6 px-6 text-amber-900">
                <span className="font-semibold flex items-center gap-1.5">
                  <Percent className="w-4 h-4 text-amber-600" />
                  AIMA Member Privilege Discount (10%)
                </span>
                <span className="font-bold text-emerald-700">
                  – {formatINR(feeCalc.discountAmount)}
                </span>
              </div>
            )}

            {/* Row 5: Net Taxable Value */}
            <div className="flex justify-between items-center py-1.5 border-b border-gray-100">
              <span className="text-gray-600 font-medium">Taxable Base Amount</span>
              <span className="font-semibold text-gray-800">
                {formatINR(feeCalc.netSubtotal)}
              </span>
            </div>

            {/* Row 6: GST 18% */}
            <div className="flex justify-between items-center py-1.5 border-b border-gray-200">
              <div className="space-y-0.5">
                <span className="text-gray-600 font-medium block">
                  Applicable GST (18% – CGST 9% + SGST/IGST 9%)
                </span>
                <span className="text-[11px] text-gray-400">
                  SAC Code: 999293 (Commercial training & coaching)
                </span>
              </div>
              <span className="font-semibold text-gray-800">
                + {formatINR(feeCalc.gstAmount)}
              </span>
            </div>

            {/* Final Payable Total Row */}
            <div className="flex justify-between items-center pt-3 pb-1 -mx-6 px-6 bg-[#0b3c68]/5 border-t border-[#0b3c68]/20">
              <div>
                <span className="text-sm font-extrabold uppercase tracking-wider text-[#0b3c68] block">
                  Total Final Payable Amount
                </span>
                <span className="text-[11px] text-gray-500 font-medium">
                  Inclusive of all applicable taxes & bootcamp study materials
                </span>
              </div>
              <div className="text-right">
                <span className="text-2xl sm:text-3xl font-black text-[#0b3c68] tracking-tight">
                  {formatINR(feeCalc.totalPayable)}
                </span>
              </div>
            </div>
          </div>
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
            <span>Proceed to Payment & Billing</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
