import React from 'react';
import { Download, FileText, Info, Award, Users, CheckCircle2 } from 'lucide-react';

interface HeroBannerProps {
  onScrollToForm?: () => void;
  onOpenBrochureModal?: () => void;
  onOpenKeyInfoModal?: () => void;
}

export const HeroBanner: React.FC<HeroBannerProps> = ({
  onScrollToForm,
  onOpenBrochureModal,
  onOpenKeyInfoModal,
}) => {
  return (
    <div className="w-full">
      {/* Executive Dark Hero Banner matching AIMA screenshot */}
      <div className="relative bg-[#0d233a] text-white py-12 sm:py-16 px-4 sm:px-6 lg:px-8 overflow-hidden shadow-inner">
        {/* Subtle executive background overlay */}
        <div
          className="absolute inset-0 bg-cover bg-center opacity-15 mix-blend-luminosity"
          style={{
            backgroundImage:
              'url("https://images.unsplash.com/photo-1577962917302-cd874c4e31d2?auto=format&fit=crop&w=1920&q=80")',
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#08182b] via-[#0d2b4d]/90 to-[#08182b]" />

        <div className="relative max-w-6xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#1b4e80]/80 border border-[#38bdf8]/30 text-[#bae6fd] text-xs font-semibold uppercase tracking-wider mb-4">
            <Award className="w-3.5 h-3.5 text-amber-300" />
            Executive Leadership & Strategic Compliance
          </div>

          <h1 className="text-2xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-white uppercase max-w-4xl mx-auto leading-tight">
            Certified CSR Leader Bootcamp
          </h1>

          <p className="mt-2 text-lg sm:text-xl font-medium text-amber-300 tracking-wide">
            NOMINATION & REGISTRATION FORM
          </p>

          <p className="mt-4 text-sm sm:text-base text-gray-200 max-w-3xl mx-auto leading-relaxed">
            Thank you for your interest in AIMA’s Certified CSR Leader Bootcamp. This form may be used by organisations to nominate one or more participants for the programme.
          </p>

          <div className="mt-3 inline-block bg-[#0e365c]/90 border border-[#2563eb]/40 rounded-md px-4 py-2 text-xs sm:text-sm text-cyan-200 font-medium">
            <span className="text-amber-400 font-bold">★ Special Privilege:</span> AIMA Members are eligible for an additional <span className="text-white font-bold underline decoration-amber-400">10% discount</span> on the applicable programme fee.
          </div>

          {/* Action Button Strip matching AIMA screenshot */}
          <div className="mt-8 flex flex-wrap justify-center gap-3 sm:gap-4">
            <button
              onClick={onOpenKeyInfoModal}
              type="button"
              className="px-5 py-2.5 bg-white text-[#0b3c68] font-bold text-xs sm:text-sm uppercase tracking-wider rounded-sm hover:bg-gray-100 transition-colors shadow-md flex items-center gap-2"
            >
              <Info className="w-4 h-4 text-[#0b3c68]" />
              Key Information
            </button>

            <button
              onClick={onScrollToForm}
              type="button"
              className="px-5 py-2.5 bg-[#0b3c68] border border-[#38bdf8]/40 text-white font-bold text-xs sm:text-sm uppercase tracking-wider rounded-sm hover:bg-[#144f85] transition-colors shadow-md flex items-center gap-2"
            >
              <FileText className="w-4 h-4 text-amber-300" />
              Enrolment & Registration Process
            </button>

            <button
              onClick={onOpenBrochureModal}
              type="button"
              className="px-5 py-2.5 bg-[#1e4a7a] border border-gray-400/30 text-white font-bold text-xs sm:text-sm uppercase tracking-wider rounded-sm hover:bg-[#285d96] transition-colors shadow-md flex items-center gap-2"
            >
              <Download className="w-4 h-4" />
              Download Brochure
            </button>
          </div>
        </div>
      </div>

      {/* Collaboration & Status Ribbon matching the screenshot */}
      <div className="bg-white border-b border-gray-200 py-4 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-3">
            <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
              Batch Status:
            </span>
            <span className="inline-flex items-center gap-1.5 bg-emerald-50 text-emerald-800 text-xs px-2.5 py-1 rounded font-bold border border-emerald-200">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              New Batch Starting Very Soon
            </span>
          </div>

          {/* Sustainable Advancements Collaboration Emblem matching screenshot */}
          <div className="flex items-center gap-3 bg-gray-50 border border-gray-200 px-4 py-2 rounded-sm">
            <span className="text-xs text-gray-600 font-medium">In collaboration with:</span>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-emerald-500 to-sky-600 flex items-center justify-center text-white text-xs font-bold shadow-xs">
                🌍
              </div>
              <div>
                <div className="text-xs font-extrabold text-[#0d3b66] tracking-tight leading-none">
                  SUSTAINABLE ADVANCEMENTS
                </div>
                <div className="text-[10px] text-emerald-700 font-semibold tracking-tight">
                  actioning responsibilities
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
