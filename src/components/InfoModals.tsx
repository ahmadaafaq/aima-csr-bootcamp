import React, { useState } from 'react';
import { X, Download, FileText, CheckCircle2, Phone, Mail, MapPin, Calendar, Clock, Award, BookOpen, Send } from 'lucide-react';

interface KeyInfoModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const KeyInfoModal: React.FC<KeyInfoModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white max-w-xl w-full rounded-sm shadow-2xl border border-gray-300 overflow-hidden animate-in fade-in zoom-in-95 duration-150">
        <div className="bg-[#0b3c68] text-white px-5 py-3.5 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <BookOpen className="w-4 h-4 text-amber-300" />
            <span className="text-xs font-bold uppercase tracking-wider">
              Bootcamp Key Programme Information
            </span>
          </div>
          <button onClick={onClose} className="text-gray-300 hover:text-white p-1">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 space-y-4 text-xs text-gray-700 leading-relaxed max-h-[70vh] overflow-y-auto">
          <div className="p-3.5 bg-sky-50 border border-sky-200 rounded-sm">
            <h4 className="font-bold text-[#0b3c68] text-sm mb-1">
              Certified CSR Leader Bootcamp
            </h4>
            <p>
              An executive-level mastery bootcamp tailored for corporate CXOs, CSR Committee Members, Sustainability Heads, and ESG Directors to develop compliant, high-impact Schedule VII programmes.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="p-3 bg-gray-50 border border-gray-200 rounded-sm">
              <span className="text-[10px] uppercase font-bold text-gray-400 block">Duration</span>
              <span className="font-bold text-gray-900 text-xs">4 Weeks (Executive Hybrid)</span>
            </div>
            <div className="p-3 bg-gray-50 border border-gray-200 rounded-sm">
              <span className="text-[10px] uppercase font-bold text-gray-400 block">Deliverables</span>
              <span className="font-bold text-gray-900 text-xs">12-Month Actionable CSR Roadmap</span>
            </div>
            <div className="p-3 bg-gray-50 border border-gray-200 rounded-sm">
              <span className="text-[10px] uppercase font-bold text-gray-400 block">Certification</span>
              <span className="font-bold text-gray-900 text-xs">AIMA Joint Executive Credential</span>
            </div>
            <div className="p-3 bg-gray-50 border border-gray-200 rounded-sm">
              <span className="text-[10px] uppercase font-bold text-gray-400 block">Eligibility</span>
              <span className="font-bold text-gray-900 text-xs">Corporate Nominated Leaders</span>
            </div>
          </div>

          <div className="space-y-2 pt-2 border-t border-gray-100">
            <span className="font-bold text-[#0b3c68] uppercase text-[11px] block">
              Core Curriculum Modules:
            </span>
            <ul className="list-disc pl-4 space-y-1 text-gray-600">
              <li>Section 135 & Companies (CSR Policy) Amendment Rules Compliance</li>
              <li>Impact Assessment & Social Audit Methodologies</li>
              <li>CSR-1 Partner Due Diligence & NGO Governance Audits</li>
              <li>Social Stock Exchange (SSE) & Zero Coupon Zero Principal (ZCZP) instruments</li>
              <li>Strategic ESG Integration with Corporate Value Chains</li>
            </ul>
          </div>
        </div>

        <div className="bg-gray-50 px-5 py-3 border-t border-gray-200 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-[#0b3c68] text-white font-bold text-xs uppercase tracking-wider rounded-sm hover:bg-[#082a4a]"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

interface BrochureModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const BrochureModal: React.FC<BrochureModalProps> = ({ isOpen, onClose }) => {
  const [downloaded, setDownloaded] = useState(false);

  if (!isOpen) return null;

  const handleDownload = () => {
    setDownloaded(true);
    setTimeout(() => {
      setDownloaded(false);
      onClose();
    }, 1800);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white max-w-md w-full rounded-sm shadow-2xl border border-gray-300 overflow-hidden">
        <div className="bg-[#0b3c68] text-white px-5 py-3.5 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Download className="w-4 h-4 text-amber-300" />
            <span className="text-xs font-bold uppercase tracking-wider">
              Download Programme Brochure
            </span>
          </div>
          <button onClick={onClose} className="text-gray-300 hover:text-white p-1">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 text-center space-y-4">
          <div className="w-14 h-14 bg-sky-50 text-[#0b3c68] rounded-full flex items-center justify-center mx-auto border border-[#0b3c68]/20">
            <FileText className="w-7 h-7" />
          </div>

          <div>
            <h3 className="text-base font-bold text-gray-900">
              AIMA Certified CSR Leader Prospectus
            </h3>
            <p className="text-xs text-gray-500 mt-1">
              Comprehensive curriculum, faculty bios, Schedule VII frameworks, and institutional participation slabs (PDF).
            </p>
          </div>

          <div className="p-3 bg-gray-50 border border-gray-200 rounded-sm text-xs text-left space-y-1">
            <div className="flex justify-between text-gray-600">
              <span>File Size:</span>
              <span className="font-bold text-gray-800">2.4 MB (PDF)</span>
            </div>
            <div className="flex justify-between text-gray-600">
              <span>Edition:</span>
              <span className="font-bold text-gray-800">2026 Executive Edition</span>
            </div>
          </div>

          <button
            onClick={handleDownload}
            className="w-full py-2.5 bg-[#0b3c68] hover:bg-[#082a4a] text-white font-bold text-xs uppercase tracking-wider rounded-sm transition-colors flex items-center justify-center gap-2"
          >
            {downloaded ? (
              <>
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>Brochure Downloaded</span>
              </>
            ) : (
              <>
                <Download className="w-4 h-4" />
                <span>Download Official PDF</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

interface EnquireModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const EnquireModal: React.FC<EnquireModalProps> = ({ isOpen, onClose }) => {
  const [submitted, setSubmitted] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [query, setQuery] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      onClose();
    }, 2000);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white max-w-md w-full rounded-sm shadow-2xl border border-gray-300 overflow-hidden">
        <div className="bg-[#0b3c68] text-white px-5 py-3.5 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Send className="w-4 h-4 text-amber-300" />
            <span className="text-xs font-bold uppercase tracking-wider">
              Enquire About CSR Leader Bootcamp
            </span>
          </div>
          <button onClick={onClose} className="text-gray-300 hover:text-white p-1">
            <X className="w-5 h-5" />
          </button>
        </div>

        {submitted ? (
          <div className="p-8 text-center space-y-3">
            <CheckCircle2 className="w-12 h-12 text-emerald-600 mx-auto" />
            <h3 className="text-lg font-bold text-gray-900">Enquiry Received</h3>
            <p className="text-xs text-gray-600">
              Thank you for contacting AIMA. Our programme coordinator will reach out to you within 24 business hours.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-6 space-y-4 text-xs">
            <div>
              <label className="block font-bold text-gray-700 uppercase mb-1">
                Your Full Name *
              </label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. Rajiv Sharma"
                className="w-full p-2 border border-gray-300 rounded-sm focus:border-[#0b3c68] outline-none"
              />
            </div>

            <div>
              <label className="block font-bold text-gray-700 uppercase mb-1">
                Official Email *
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="e.g. rajiv.sharma@abcinfrastructure.com"
                className="w-full p-2 border border-gray-300 rounded-sm focus:border-[#0b3c68] outline-none"
              />
            </div>

            <div>
              <label className="block font-bold text-gray-700 uppercase mb-1">
                Mobile Number *
              </label>
              <input
                type="tel"
                required
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="10-digit mobile"
                className="w-full p-2 border border-gray-300 rounded-sm focus:border-[#0b3c68] outline-none"
              />
            </div>

            <div>
              <label className="block font-bold text-gray-700 uppercase mb-1">
                Enquiry / Cohort Queries
              </label>
              <textarea
                rows={3}
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Ask about customized corporate batches, fee exemptions, or curriculum..."
                className="w-full p-2 border border-gray-300 rounded-sm focus:border-[#0b3c68] outline-none"
              />
            </div>

            <button
              type="submit"
              className="w-full py-2.5 bg-[#0b3c68] hover:bg-[#082a4a] text-white font-bold text-xs uppercase tracking-wider rounded-sm transition-colors"
            >
              Submit Enquiry
            </button>
          </form>
        )}
      </div>
    </div>
  );
};
