import React from 'react';
import { FormData, Nominee } from '../types';
import { Users, UserPlus, Trash2, Mail, Phone, Briefcase, User, ArrowLeft, ArrowRight, AlertCircle, Sparkles } from 'lucide-react';

interface SectionNomineesProps {
  formData: FormData;
  onChange: (field: keyof FormData, value: any) => void;
  onNext: () => void;
  onPrev: () => void;
  errors: Record<string, string>;
}

export const SectionNominees: React.FC<SectionNomineesProps> = ({
  formData,
  onChange,
  onNext,
  onPrev,
  errors,
}) => {
  const nominees = formData.nominees;

  const handleNomineeChange = (
    index: number,
    field: keyof Nominee,
    value: string
  ) => {
    const updated = [...nominees];
    updated[index] = { ...updated[index], [field]: value };
    onChange('nominees', updated);
  };

  const handleAddNominee = () => {
    const newNominee: Nominee = {
      id: `nom-${Date.now()}`,
      name: '',
      designation: '',
      email: '',
      mobile: '',
    };
    onChange('nominees', [...nominees, newNominee]);
  };

  const handleRemoveNominee = (index: number) => {
    if (nominees.length <= 1) return;
    const updated = nominees.filter((_, i) => i !== index);
    onChange('nominees', updated);
  };

  return (
    <div className="bg-white border border-gray-200 rounded-sm shadow-xs overflow-hidden">
      {/* Section Header */}
      <div className="bg-gradient-to-r from-[#0b3c68] to-[#165084] text-white px-6 py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <div className="text-[11px] font-bold text-amber-300 uppercase tracking-widest">
            Section 03 / 07
          </div>
          <h2 className="text-lg sm:text-xl font-bold tracking-tight uppercase">
            Nominee Details
          </h2>
        </div>
        <div className="bg-white/15 border border-white/20 px-3 py-1.5 rounded text-xs font-semibold text-white flex items-center gap-1.5 self-start sm:self-auto">
          <Users className="w-4 h-4 text-amber-300" />
          <span>Nominated Count: <strong>{nominees.length} Participant{nominees.length > 1 ? 's' : ''}</strong></span>
        </div>
      </div>

      <div className="p-6 sm:p-8 space-y-6">
        {/* Supporting Guidance Banner */}
        <div className="p-4 bg-gray-50 border-l-4 border-[#0b3c68] text-xs text-gray-700 leading-relaxed rounded-r-sm">
          <p className="font-semibold text-[#0b3c68] mb-1">Collaborative Cross-Functional Nomination:</p>
          Organisations may nominate cross-functional teams (e.g. CSR, Sustainability, Corporate Affairs, Finance, ESG, Legal) to support collaborative case work and development of an actionable 12-month CSR roadmap during the Bootcamp.
        </div>

        {/* Dynamic Nominee List */}
        <div className="space-y-6">
          {nominees.map((nominee, index) => {
            const numStr = String(index + 1).padStart(2, '0');
            const nameError = errors[`nominee_${index}_name`];
            const designationError = errors[`nominee_${index}_designation`];
            const emailError = errors[`nominee_${index}_email`];
            const mobileError = errors[`nominee_${index}_mobile`];

            return (
              <div
                key={nominee.id || index}
                className="border border-gray-200 rounded-sm bg-white hover:border-gray-300 transition-colors overflow-hidden shadow-2xs"
              >
                {/* Nominee Header */}
                <div className="bg-[#f8fafc] border-b border-gray-200 px-4 sm:px-6 py-2.5 flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <span className="bg-[#0b3c68] text-white text-xs font-bold px-2 py-0.5 rounded-sm">
                      {numStr}
                    </span>
                    <span className="text-xs font-bold text-gray-800 uppercase tracking-wide">
                      Nominee #{index + 1}
                      {nominee.name ? ` — ${nominee.name}` : ''}
                    </span>
                  </div>

                  {nominees.length > 1 && (
                    <button
                      type="button"
                      onClick={() => handleRemoveNominee(index)}
                      className="text-xs text-red-600 hover:text-red-800 hover:bg-red-50 px-2 py-1 rounded transition-colors flex items-center gap-1 font-medium"
                      title="Remove this participant"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                      <span>Remove</span>
                    </button>
                  )}
                </div>

                {/* Nominee Input Fields */}
                <div className="p-4 sm:p-6 grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                  {/* Full Name */}
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-1">
                      Full Name <span className="text-red-600">*</span>
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                        <User className="w-4 h-4" />
                      </div>
                      <input
                        type="text"
                        value={nominee.name}
                        onChange={(e) => handleNomineeChange(index, 'name', e.target.value)}
                        placeholder="e.g. Ananya Mehta"
                        className={`w-full pl-9 pr-3 py-2 text-sm bg-white border ${
                          nameError ? 'border-red-500 ring-1 ring-red-500' : 'border-gray-300 focus:border-[#0b3c68]'
                        } rounded-sm outline-none transition-all`}
                      />
                    </div>
                    {nameError && (
                      <p className="mt-1 text-xs text-red-600 font-medium">{nameError}</p>
                    )}
                  </div>

                  {/* Functional Designation */}
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-1">
                      Functional Designation <span className="text-red-600">*</span>
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                        <Briefcase className="w-4 h-4" />
                      </div>
                      <input
                        type="text"
                        value={nominee.designation}
                        onChange={(e) => handleNomineeChange(index, 'designation', e.target.value)}
                        placeholder="e.g. Head – CSR & ESG"
                        className={`w-full pl-9 pr-3 py-2 text-sm bg-white border ${
                          designationError ? 'border-red-500 ring-1 ring-red-500' : 'border-gray-300 focus:border-[#0b3c68]'
                        } rounded-sm outline-none transition-all`}
                      />
                    </div>
                    {designationError && (
                      <p className="mt-1 text-xs text-red-600 font-medium">{designationError}</p>
                    )}
                  </div>

                  {/* Official Corporate Email ID */}
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-1">
                      Official Corporate Email ID <span className="text-red-600">*</span>
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                        <Mail className="w-4 h-4" />
                      </div>
                      <input
                        type="email"
                        value={nominee.email}
                        onChange={(e) => handleNomineeChange(index, 'email', e.target.value)}
                        placeholder="e.g. ananya.mehta@abcinfrastructure.com"
                        className={`w-full pl-9 pr-3 py-2 text-sm bg-white border ${
                          emailError ? 'border-red-500 ring-1 ring-red-500' : 'border-gray-300 focus:border-[#0b3c68]'
                        } rounded-sm outline-none transition-all`}
                      />
                    </div>
                    {emailError && (
                      <p className="mt-1 text-xs text-red-600 font-medium">{emailError}</p>
                    )}
                  </div>

                  {/* Mobile Number */}
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-1">
                      Mobile Number <span className="text-red-600">*</span>
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                        <Phone className="w-4 h-4" />
                      </div>
                      <input
                        type="tel"
                        value={nominee.mobile}
                        onChange={(e) => handleNomineeChange(index, 'mobile', e.target.value)}
                        placeholder="e.g. 9876543211"
                        maxLength={10}
                        className={`w-full pl-9 pr-3 py-2 text-sm bg-white border ${
                          mobileError ? 'border-red-500 ring-1 ring-red-500' : 'border-gray-300 focus:border-[#0b3c68]'
                        } rounded-sm outline-none transition-all`}
                      />
                    </div>
                    {mobileError && (
                      <p className="mt-1 text-xs text-red-600 font-medium">{mobileError}</p>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Global Nominees error if any */}
        {errors.nominees && (
          <div className="p-3 bg-red-50 border border-red-200 text-xs text-red-700 flex items-center gap-2 rounded-sm">
            <AlertCircle className="w-4 h-4 text-red-600 shrink-0" />
            <span>{errors.nominees}</span>
          </div>
        )}

        {/* Add Nominee Action Bar */}
        <div className="pt-2 flex flex-col sm:flex-row justify-between items-center gap-4 bg-[#f8fafc] p-4 border border-dashed border-gray-300 rounded-sm">
          <div className="text-xs text-gray-600">
            <span className="font-semibold text-gray-800">Tier benefit unlocked:</span> Adding 4+ or 8+ participants automatically unlocks institutional group slab rates in the next step.
          </div>
          <button
            type="button"
            onClick={handleAddNominee}
            className="w-full sm:w-auto px-4 py-2 bg-white hover:bg-gray-100 text-[#0b3c68] border border-[#0b3c68] font-bold text-xs uppercase tracking-wider rounded-sm transition-colors flex items-center justify-center gap-2 shadow-2xs"
          >
            <UserPlus className="w-4 h-4 text-[#0b3c68]" />
            <span>+ Add Nominee</span>
          </button>
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
            <span>Proceed to Fee Calculation</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
