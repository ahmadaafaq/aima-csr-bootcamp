import React from 'react';
import { Phone, Mail, Globe, Edit3 } from 'lucide-react';

interface HeaderProps {
  onOpenEnquire?: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onOpenEnquire }) => {
  return (
    <header className="w-full bg-white border-b border-gray-200 sticky top-0 z-40 shadow-xs">
      {/* Top Utility Strip */}
      <div className="bg-[#0b2942] text-gray-200 text-xs py-1.5 px-4 hidden sm:block border-b border-[#143d5f]">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center space-x-6">
            <span className="flex items-center gap-1.5 text-gray-300">
              <Phone className="w-3.5 h-3.5 text-[#38bdf8]" />
              011-24645100 / 43128100
            </span>
            <span className="flex items-center gap-1.5 text-gray-300">
              <Mail className="w-3.5 h-3.5 text-[#38bdf8]" />
              csrbootcamp@aima.in
            </span>
          </div>
          <div className="flex items-center space-x-4 text-gray-300">
            <span className="bg-[#1e4e79] text-[#e0f2fe] px-2 py-0.5 rounded text-[11px] font-medium tracking-wide">
              Official AIMA Executive Portal
            </span>
            <a
              href="https://www.aima.in"
              target="_blank"
              rel="noreferrer"
              className="hover:text-white transition-colors flex items-center gap-1"
            >
              <Globe className="w-3.5 h-3.5" /> aima.in
            </a>
          </div>
        </div>
      </div>

      {/* Main Branding Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5">
        <div className="flex justify-between items-center">
          {/* AIMA Official Logo Group */}
          <div className="flex items-center gap-3.5">
            <img
              src="https://pgcourses.aima.in/images/aima-logo.png"
              alt="AIMA - All India Management Association"
              className="h-10 sm:h-12 w-auto object-contain"
              onError={(e) => {
                const target = e.currentTarget;
                target.style.display = 'none';
                const fallback = target.nextElementSibling;
                if (fallback) fallback.classList.remove('hidden');
              }}
            />
            <div className="hidden border-l border-gray-300 pl-3">
              <div className="text-[#0b3c68] font-black text-xl leading-tight tracking-tight">
                AIMA
              </div>
              <div className="text-[10px] text-gray-600 font-bold tracking-tight uppercase">
                ALL INDIA MANAGEMENT ASSOCIATION
              </div>
            </div>
          </div>

          {/* Desktop Navigation Display Strip (Static / Display Only) */}
          <div className="hidden lg:flex items-center space-x-7 text-[13px] font-medium text-gray-700 select-none">
            <span className="text-[#0b3c68] font-bold border-b-2 border-[#0b3c68] pb-0.5 cursor-default">
              Programs
            </span>
            <span className="text-gray-700 hover:text-gray-700 cursor-default">
              Admission
            </span>
            <span className="text-gray-700 hover:text-gray-700 cursor-default">
              Academics
            </span>
            <span className="text-gray-700 hover:text-gray-700 cursor-default">
              Regulatory Documents
            </span>
            <span className="text-gray-700 hover:text-gray-700 cursor-default">
              Placements
            </span>
            <span className="text-gray-700 hover:text-gray-700 cursor-default">
              Library
            </span>
            <span className="text-gray-700 hover:text-gray-700 cursor-default">
              VC Council
            </span>
            <span className="text-gray-700 hover:text-gray-700 cursor-default">
              Contact us
            </span>
          </div>

          {/* Mobile Display Indicator */}
          <div className="lg:hidden flex items-center">
            <span className="text-xs font-bold text-[#0b3c68] bg-sky-50 border border-sky-200 px-2.5 py-1 rounded-sm uppercase tracking-wider select-none cursor-default">
              Executive Portal
            </span>
          </div>
        </div>
      </div>

      {/* Sticky "Enquire Now" Side Tab matching AIMA design */}
      <button
        onClick={onOpenEnquire}
        className="fixed right-0 top-1/2 -translate-y-1/2 z-50 bg-[#0f4370] hover:bg-[#0b3356] text-white py-3 px-2 rounded-l-md shadow-lg flex flex-col items-center gap-1 cursor-pointer transition-all border-l border-y border-[#38bdf8]/40"
        title="Quick Enquiry"
      >
        <Edit3 className="w-4 h-4 text-amber-300" />
        <span className="text-[11px] font-bold tracking-wider [writing-mode:vertical-rl] rotate-180 uppercase py-1">
          Enquire Now
        </span>
      </button>
    </header>
  );
};
