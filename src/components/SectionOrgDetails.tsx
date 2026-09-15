import React from 'react';
import { FormData } from '../types';
import { Building2, User, Briefcase, Mail, Phone, ArrowRight, RotateCcw } from 'lucide-react';

interface SectionOrgDetailsProps {
  formData: FormData;
  onChange: (field: keyof FormData, value: any) => void;
  onNext: () => void;
  onResetToMock: () => void;
  errors: Record<string, string>;
}

export const SectionOrgDetails: React.FC<SectionOrgDetailsProps> = ({
  formData,
  onChange,
  onNext,
  onResetToMock,
  errors,
}) => {
  return (
    <div className="bg-white border border-gray-200 rounded-sm shadow-xs overflow-hidden">
      {/* Section Header */}
      <div className="bg-gradient-to-r from-[#0b3c68] to-[#165084] text-white px-6 py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <div className="text-[11px] font-bold text-amber-300 uppercase tracking-widest">
            Section 01 / 07
          </div>
          <h2 className="text-lg sm:text-xl font-bold tracking-tight uppercase">
            Sponsoring Organisation & Authority Details
          </h2>
        </div>
        <button
          type="button"
          onClick={onResetToMock}
          className="self-start sm:self-auto text-xs bg-white/10 hover:bg-white/20 text-sky-100 px-3 py-1.5 rounded transition-colors flex items-center gap-1.5 border border-white/20"
          title="Restore sample demo data"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          Reset Demo Data
        </button>
      </div>

      <div className="p-4 sm:p-8 space-y-6">
        <p className="text-xs sm:text-sm text-gray-600 border-l-3 border-[#0b3c68] pl-3 py-1 bg-gray-50">
          Please enter the official details of the nominating corporation or institution. These details will be utilized for registration verification, programme communication, and certificate issuance.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6">
          {/* Organisation Name */}
          <div className="md:col-span-2">
            <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-1.5">
              Organisation Name <span className="text-red-600">*</span>
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-400">
                <Building2 className="w-4 h-4" />
              </div>
              <input
                type="text"
                value={formData.orgName}
                onChange={(e) => onChange('orgName', e.target.value)}
                placeholder="e.g. ABC Infrastructure Limited"
                className={`w-full pl-10 pr-4 py-2.5 text-sm bg-white border ${
                  errors.orgName ? 'border-red-500 ring-1 ring-red-500' : 'border-gray-300 focus:border-[#0b3c68] focus:ring-1 focus:ring-[#0b3c68]'
                } rounded-sm outline-none transition-all`}
              />
            </div>
            {errors.orgName && (
              <p className="mt-1 text-xs text-red-600 font-medium">{errors.orgName}</p>
            )}
          </div>

          {/* Sponsoring Authority Name */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-1.5">
              Sponsoring Authority Name <span className="text-red-600">*</span>
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-400">
                <User className="w-4 h-4" />
              </div>
              <input
                type="text"
                value={formData.authName}
                onChange={(e) => onChange('authName', e.target.value)}
                placeholder="e.g. Rajiv Sharma"
                className={`w-full pl-10 pr-4 py-2.5 text-sm bg-white border ${
                  errors.authName ? 'border-red-500 ring-1 ring-red-500' : 'border-gray-300 focus:border-[#0b3c68] focus:ring-1 focus:ring-[#0b3c68]'
                } rounded-sm outline-none transition-all`}
              />
            </div>
            {errors.authName && (
              <p className="mt-1 text-xs text-red-600 font-medium">{errors.authName}</p>
            )}
          </div>

          {/* Sponsoring Authority Designation */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-1.5">
              Sponsoring Authority Designation <span className="text-red-600">*</span>
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-400">
                <Briefcase className="w-4 h-4" />
              </div>
              <input
                type="text"
                value={formData.authDesignation}
                onChange={(e) => onChange('authDesignation', e.target.value)}
                placeholder="e.g. Vice President – Corporate Affairs"
                className={`w-full pl-10 pr-4 py-2.5 text-sm bg-white border ${
                  errors.authDesignation ? 'border-red-500 ring-1 ring-red-500' : 'border-gray-300 focus:border-[#0b3c68] focus:ring-1 focus:ring-[#0b3c68]'
                } rounded-sm outline-none transition-all`}
              />
            </div>
            {errors.authDesignation && (
              <p className="mt-1 text-xs text-red-600 font-medium">{errors.authDesignation}</p>
            )}
          </div>

          {/* Official Email ID */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-1.5">
              Official Corporate Email ID <span className="text-red-600">*</span>
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-400">
                <Mail className="w-4 h-4" />
              </div>
              <input
                type="email"
                value={formData.authEmail}
                onChange={(e) => onChange('authEmail', e.target.value)}
                placeholder="e.g. rajiv.sharma@abcinfrastructure.com"
                className={`w-full pl-10 pr-4 py-2.5 text-sm bg-white border ${
                  errors.authEmail ? 'border-red-500 ring-1 ring-red-500' : 'border-gray-300 focus:border-[#0b3c68] focus:ring-1 focus:ring-[#0b3c68]'
                } rounded-sm outline-none transition-all`}
              />
            </div>
            {errors.authEmail && (
              <p className="mt-1 text-xs text-red-600 font-medium">{errors.authEmail}</p>
            )}
          </div>

          {/* Mobile / Contact Number */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-1.5">
              Sponsoring Authority – Mobile Number <span className="text-red-600">*</span>
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-400">
                <Phone className="w-4 h-4" />
              </div>
              <input
                type="tel"
                value={formData.authMobile}
                onChange={(e) => onChange('authMobile', e.target.value)}
                placeholder="e.g. 9876543210"
                maxLength={10}
                className={`w-full pl-10 pr-4 py-2.5 text-sm bg-white border ${
                  errors.authMobile ? 'border-red-500 ring-1 ring-red-500' : 'border-gray-300 focus:border-[#0b3c68] focus:ring-1 focus:ring-[#0b3c68]'
                } rounded-sm outline-none transition-all`}
              />
            </div>
            {errors.authMobile && (
              <p className="mt-1 text-xs text-red-600 font-medium">{errors.authMobile}</p>
            )}
          </div>
        </div>

        {/* Action Controls */}
        <div className="pt-6 border-t border-gray-200 flex flex-col sm:flex-row justify-end items-stretch sm:items-center">
          <button
            type="button"
            onClick={onNext}
            className="w-full sm:w-auto px-6 py-2.5 bg-[#0b3c68] hover:bg-[#082a4a] text-white font-bold text-sm uppercase tracking-wider rounded-sm transition-colors shadow-sm flex items-center justify-center gap-2"
          >
            <span>Proceed to CSR Profile</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
