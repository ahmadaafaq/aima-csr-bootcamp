import React from 'react';
import { FormData, INDIAN_STATES } from '../types';
import { CreditCard, Receipt, FileText, CheckCircle2, Building, MapPin, Mail, Phone, User, ArrowLeft, ArrowRight, QrCode, Landmark, ShieldCheck, Sparkles } from 'lucide-react';

interface SectionBillingProps {
  formData: FormData;
  onChange: (field: keyof FormData, value: any) => void;
  onNext: () => void;
  onPrev: () => void;
  errors: Record<string, string>;
  onOpenPaymentGateway?: () => void;
}

export const SectionBilling: React.FC<SectionBillingProps> = ({
  formData,
  onChange,
  onNext,
  onPrev,
  errors,
  onOpenPaymentGateway,
}) => {
  return (
    <div className="bg-white border border-gray-200 rounded-sm shadow-xs overflow-hidden">
      {/* Section Header */}
      <div className="bg-gradient-to-r from-[#0b3c68] to-[#165084] text-white px-6 py-4 flex justify-between items-center">
        <div>
          <div className="text-[11px] font-bold text-amber-300 uppercase tracking-widest">
            Section 05 / 07
          </div>
          <h2 className="text-lg sm:text-xl font-bold tracking-tight uppercase">
            Payment & Invoice Details
          </h2>
        </div>
      </div>

      <div className="p-6 sm:p-8 space-y-8">
        {/* Invoicing Details Sub-heading */}
        <div>
          <h3 className="text-xs font-bold text-[#0b3c68] uppercase tracking-wider pb-2 border-b border-gray-200 flex items-center gap-2">
            <Building className="w-4 h-4 text-[#0b3c68]" />
            Organisation Details for Official Tax Invoicing
          </h3>

          <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-5">
            {/* Billing Organisation Name */}
            <div className="md:col-span-2">
              <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-1">
                Legal Entity / Invoicing Name <span className="text-red-600">*</span>
              </label>
              <input
                type="text"
                value={formData.billingOrgName}
                onChange={(e) => onChange('billingOrgName', e.target.value)}
                placeholder="e.g. ABC Infrastructure Limited"
                className={`w-full px-3.5 py-2 text-sm bg-white border ${
                  errors.billingOrgName ? 'border-red-500 ring-1 ring-red-500' : 'border-gray-300 focus:border-[#0b3c68]'
                } rounded-sm outline-none transition-all`}
              />
              {errors.billingOrgName && (
                <p className="mt-1 text-xs text-red-600 font-medium">{errors.billingOrgName}</p>
              )}
            </div>

            {/* Billing Address */}
            <div className="md:col-span-2">
              <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-1">
                Registered Billing Address <span className="text-red-600">*</span>
              </label>
              <input
                type="text"
                value={formData.billingAddress}
                onChange={(e) => onChange('billingAddress', e.target.value)}
                placeholder="Street address, building, plot/floor number"
                className={`w-full px-3.5 py-2 text-sm bg-white border ${
                  errors.billingAddress ? 'border-red-500 ring-1 ring-red-500' : 'border-gray-300 focus:border-[#0b3c68]'
                } rounded-sm outline-none transition-all`}
              />
              {errors.billingAddress && (
                <p className="mt-1 text-xs text-red-600 font-medium">{errors.billingAddress}</p>
              )}
            </div>

            {/* State */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-1">
                State / Jurisdiction <span className="text-red-600">*</span>
              </label>
              <select
                value={formData.billingState}
                onChange={(e) => onChange('billingState', e.target.value)}
                className={`w-full px-3.5 py-2 text-sm bg-white border ${
                  errors.billingState ? 'border-red-500 ring-1 ring-red-500' : 'border-gray-300 focus:border-[#0b3c68]'
                } rounded-sm outline-none transition-all`}
              >
                <option value="">Select State</option>
                {INDIAN_STATES.map((st) => (
                  <option key={st} value={st}>
                    {st}
                  </option>
                ))}
              </select>
              {errors.billingState && (
                <p className="mt-1 text-xs text-red-600 font-medium">{errors.billingState}</p>
              )}
            </div>

            {/* PIN Code */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-1">
                PIN Code <span className="text-red-600">*</span>
              </label>
              <input
                type="text"
                value={formData.billingPinCode}
                onChange={(e) => onChange('billingPinCode', e.target.value)}
                placeholder="6-digit PIN code"
                maxLength={6}
                className={`w-full px-3.5 py-2 text-sm bg-white border ${
                  errors.billingPinCode ? 'border-red-500 ring-1 ring-red-500' : 'border-gray-300 focus:border-[#0b3c68]'
                } rounded-sm outline-none transition-all`}
              />
              {errors.billingPinCode && (
                <p className="mt-1 text-xs text-red-600 font-medium">{errors.billingPinCode}</p>
              )}
            </div>

            {/* GSTIN */}
            <div className="md:col-span-2">
              <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-1">
                GSTIN (Goods and Services Tax Identification Number) <span className="text-red-600">*</span>
              </label>
              <input
                type="text"
                value={formData.billingGstin}
                onChange={(e) => onChange('billingGstin', e.target.value.toUpperCase())}
                placeholder="e.g. 09AABCA1234A1Z5"
                maxLength={15}
                className={`w-full px-3.5 py-2 text-sm bg-white font-mono border ${
                  errors.billingGstin ? 'border-red-500 ring-1 ring-red-500' : 'border-gray-300 focus:border-[#0b3c68]'
                } rounded-sm outline-none transition-all`}
              />
              <p className="mt-1 text-[11px] text-gray-500">
                15-digit GSTIN for input tax credit claiming on AIMA official invoice.
              </p>
              {errors.billingGstin && (
                <p className="mt-1 text-xs text-red-600 font-medium">{errors.billingGstin}</p>
              )}
            </div>
          </div>
        </div>

        {/* Billing Contact & PO Information */}
        <div>
          <h3 className="text-xs font-bold text-[#0b3c68] uppercase tracking-wider pb-2 border-b border-gray-200 flex items-center gap-2">
            <User className="w-4 h-4 text-[#0b3c68]" />
            Accounts / Billing Focal Point
          </h3>

          <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-5">
            {/* Contact Person */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-1">
                Contact Person (Finance/Accounts) <span className="text-red-600">*</span>
              </label>
              <input
                type="text"
                value={formData.billingContactPerson}
                onChange={(e) => onChange('billingContactPerson', e.target.value)}
                placeholder="e.g. Rajiv Sharma"
                className={`w-full px-3.5 py-2 text-sm bg-white border ${
                  errors.billingContactPerson ? 'border-red-500 ring-1 ring-red-500' : 'border-gray-300 focus:border-[#0b3c68]'
                } rounded-sm outline-none transition-all`}
              />
              {errors.billingContactPerson && (
                <p className="mt-1 text-xs text-red-600 font-medium">{errors.billingContactPerson}</p>
              )}
            </div>

            {/* Billing Email */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-1">
                Accounts / Billing Email ID <span className="text-red-600">*</span>
              </label>
              <input
                type="email"
                value={formData.billingEmail}
                onChange={(e) => onChange('billingEmail', e.target.value)}
                placeholder="e.g. accounts@abcinfrastructure.com"
                className={`w-full px-3.5 py-2 text-sm bg-white border ${
                  errors.billingEmail ? 'border-red-500 ring-1 ring-red-500' : 'border-gray-300 focus:border-[#0b3c68]'
                } rounded-sm outline-none transition-all`}
              />
              {errors.billingEmail && (
                <p className="mt-1 text-xs text-red-600 font-medium">{errors.billingEmail}</p>
              )}
            </div>

            {/* Mobile Number */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-1">
                Billing Mobile Number <span className="text-red-600">*</span>
              </label>
              <input
                type="tel"
                value={formData.billingMobile}
                onChange={(e) => onChange('billingMobile', e.target.value)}
                placeholder="10-digit contact number"
                maxLength={10}
                className={`w-full px-3.5 py-2 text-sm bg-white border ${
                  errors.billingMobile ? 'border-red-500 ring-1 ring-red-500' : 'border-gray-300 focus:border-[#0b3c68]'
                } rounded-sm outline-none transition-all`}
              />
              {errors.billingMobile && (
                <p className="mt-1 text-xs text-red-600 font-medium">{errors.billingMobile}</p>
              )}
            </div>

            {/* PO / Work Order No. */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-1">
                PO / Work Order No. (If applicable)
              </label>
              <input
                type="text"
                value={formData.poNumber}
                onChange={(e) => onChange('poNumber', e.target.value)}
                placeholder="e.g. PO/CSR/2026/084"
                className="w-full px-3.5 py-2 text-sm bg-white font-mono border border-gray-300 focus:border-[#0b3c68] rounded-sm outline-none transition-all"
              />
            </div>
          </div>
        </div>

        {/* Section 10: Payment Preference */}
        <div className="pt-2">
          <label className="block text-xs font-bold uppercase tracking-wider text-gray-800 mb-3">
            Payment Preference <span className="text-red-600">*</span>
          </label>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Option 1: Pay Now */}
            <label
              className={`p-4 rounded-sm border cursor-pointer transition-all flex items-start gap-3.5 ${
                formData.paymentPreference === 'pay_now'
                  ? 'bg-[#edf5fb] border-[#0b3c68] ring-1 ring-[#0b3c68]'
                  : 'bg-white border-gray-200 hover:bg-gray-50'
              }`}
            >
              <input
                type="radio"
                name="paymentPreference"
                value="pay_now"
                checked={formData.paymentPreference === 'pay_now'}
                onChange={() => onChange('paymentPreference', 'pay_now')}
                className="w-4 h-4 text-[#0b3c68] focus:ring-[#0b3c68] mt-0.5"
              />
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <CreditCard className="w-4 h-4 text-[#0b3c68]" />
                  <span className="text-xs font-bold text-gray-900 uppercase">
                    Pay Now (Instant Confirmation)
                  </span>
                </div>
                <p className="text-[11px] text-gray-600 leading-normal">
                  Simulate online corporate debit/credit card, NEFT/RTGS gateway, or Net Banking checkout.
                </p>
                <span className="inline-block text-[10px] font-semibold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded">
                  Instant Seat Confirmation
                </span>
              </div>
            </label>

            {/* Option 2: Pay Later / Invoice */}
            <label
              className={`p-4 rounded-sm border cursor-pointer transition-all flex items-start gap-3.5 ${
                formData.paymentPreference === 'pay_later'
                  ? 'bg-[#edf5fb] border-[#0b3c68] ring-1 ring-[#0b3c68]'
                  : 'bg-white border-gray-200 hover:bg-gray-50'
              }`}
            >
              <input
                type="radio"
                name="paymentPreference"
                value="pay_later"
                checked={formData.paymentPreference === 'pay_later'}
                onChange={() => onChange('paymentPreference', 'pay_later')}
                className="w-4 h-4 text-[#0b3c68] focus:ring-[#0b3c68] mt-0.5"
              />
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <Receipt className="w-4 h-4 text-[#0b3c68]" />
                  <span className="text-xs font-bold text-gray-900 uppercase">
                    Pay Later / Corporate Invoice
                  </span>
                </div>
                <p className="text-[11px] text-gray-600 leading-normal">
                  AIMA generates an official proforma tax invoice with bank transfer details sent to your Accounts department.
                </p>
                <span className="inline-block text-[10px] font-semibold text-sky-800 bg-sky-100 px-2 py-0.5 rounded">
                  Proforma Tax Invoice Workflow
                </span>
              </div>
            </label>
          </div>

          {/* Payment Gateway Feature Card */}
          {formData.paymentPreference === 'pay_now' && (
            <div className="mt-4 p-4 bg-[#f0f7fd] border border-[#0b3c68]/30 rounded-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
              <div className="space-y-1">
                <div className="flex items-center gap-2 text-xs font-bold text-[#0b3c68] uppercase">
                  <ShieldCheck className="w-4 h-4 text-emerald-600" />
                  <span>Integrated Payment Gateway (UPI, Corporate Cards, Net Banking & RTGS)</span>
                </div>
                <p className="text-[11px] text-gray-600">
                  You can simulate the payment now or proceed to the final authorisation and review first.
                </p>
              </div>
              {onOpenPaymentGateway && (
                <button
                  type="button"
                  onClick={onOpenPaymentGateway}
                  className="px-4 py-2 bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs uppercase tracking-wider rounded-sm transition-colors shadow-xs flex items-center gap-1.5 whitespace-nowrap"
                >
                  <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                  <span>Test Payment Gateway Now</span>
                </button>
              )}
            </div>
          )}
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
            <span>Proceed to Management Authorisation</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
