import React from 'react';
import { FormData, calculateFee, formatINR } from '../types';
import { X, Mail, Copy, Check, ExternalLink, ShieldCheck, Building2, User, Users } from 'lucide-react';

interface EmailPreviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  formData: FormData;
  referenceNumber: string;
  paymentStatus: 'Paid' | 'Pending / Pay Later';
}

export const EmailPreviewModal: React.FC<EmailPreviewModalProps> = ({
  isOpen,
  onClose,
  formData,
  referenceNumber,
  paymentStatus,
}) => {
  const [copied, setCopied] = React.useState(false);

  if (!isOpen) return null;

  const feeCalc = calculateFee(formData.nominees.length, formData.isAimaMember);
  const subject = `New CSR Leader Bootcamp Nomination – ${formData.orgName}`;

  const copyToClipboard = () => {
    const text = `
To: enayyar@aima.in
Subject: ${subject}
Reference: ${referenceNumber}
Organisation: ${formData.orgName}
Sponsoring Authority: ${formData.authName} (${formData.authDesignation})
Nominees Count: ${formData.nominees.length}
Total Payable: ${formatINR(feeCalc.totalPayable)}
Payment Status: ${paymentStatus.toUpperCase()}
    `.trim();

    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white max-w-2xl w-full rounded-sm shadow-2xl border border-gray-300 overflow-hidden my-8">
        {/* Header Ribbon */}
        <div className="bg-[#0b3c68] text-white px-5 py-3.5 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Mail className="w-4 h-4 text-amber-300" />
            <span className="text-xs font-bold uppercase tracking-wider">
              Demo – Internal AIMA Email Dispatch Preview
            </span>
          </div>
          <button
            onClick={onClose}
            className="text-gray-300 hover:text-white p-1 rounded transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Demo Disclaimer */}
        <div className="bg-amber-50 border-b border-amber-200 px-5 py-2 text-[11px] text-amber-900 flex justify-between items-center">
          <span>
            ★ <strong>DEMO PREVIEW ONLY:</strong> This preview illustrates the automated notification transmitted to AIMA Programme Directors.
          </span>
          <button
            onClick={copyToClipboard}
            className="text-amber-950 font-bold hover:underline flex items-center gap-1 text-[11px] ml-2"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
            {copied ? 'Copied' : 'Copy Text'}
          </button>
        </div>

        {/* Email Header Meta */}
        <div className="p-5 border-b border-gray-200 bg-gray-50/50 space-y-2 text-xs font-mono">
          <div className="flex items-baseline">
            <span className="w-20 text-gray-400 font-sans font-semibold uppercase text-[10px]">
              To:
            </span>
            <span className="font-bold text-[#0b3c68]">
              enayyar@aima.in <span className="font-sans text-gray-500 font-normal text-[11px]">(AIMA Programme Directorate)</span>
            </span>
          </div>

          <div className="flex items-baseline">
            <span className="w-20 text-gray-400 font-sans font-semibold uppercase text-[10px]">
              Cc:
            </span>
            <span className="text-gray-700">
              {formData.authEmail}, csrbootcamp@aima.in
            </span>
          </div>

          <div className="flex items-baseline">
            <span className="w-20 text-gray-400 font-sans font-semibold uppercase text-[10px]">
              Subject:
            </span>
            <span className="font-bold text-gray-900 font-sans">
              {subject}
            </span>
          </div>
        </div>

        {/* Email Body */}
        <div className="p-6 space-y-5 text-xs text-gray-800 leading-relaxed font-sans max-h-[60vh] overflow-y-auto">
          <p>
            Dear AIMA Executive Team,
          </p>
          <p>
            A new corporate nomination has been received for the upcoming{' '}
            <strong>AIMA Certified CSR Leader Bootcamp</strong>.
          </p>

          {/* Key Summary Table */}
          <div className="bg-gray-50 border border-gray-200 p-4 rounded-sm space-y-2">
            <div className="grid grid-cols-2 gap-2 text-xs border-b border-gray-200 pb-2">
              <div>
                <span className="text-gray-500 block text-[10px] uppercase font-bold">Registration Reference</span>
                <span className="font-mono font-bold text-[#0b3c68] text-sm">{referenceNumber}</span>
              </div>
              <div>
                <span className="text-gray-500 block text-[10px] uppercase font-bold">Payment Status</span>
                <span className="inline-block px-2 py-0.5 rounded text-[11px] font-bold uppercase bg-emerald-100 text-emerald-900 border border-emerald-300">
                  {paymentStatus}
                </span>
              </div>
            </div>

            <div className="pt-1">
              <span className="text-gray-500 block text-[10px] uppercase font-bold">Nominating Organisation</span>
              <span className="font-bold text-gray-900">{formData.orgName}</span>
            </div>

            <div>
              <span className="text-gray-500 block text-[10px] uppercase font-bold">Sponsoring Authority</span>
              <span>{formData.authName} — {formData.authDesignation} ({formData.authEmail} | +91 {formData.authMobile})</span>
            </div>

            <div>
              <span className="text-gray-500 block text-[10px] uppercase font-bold">CSR Budget Slab</span>
              <span>{formData.annualBudgetSlab}</span>
            </div>

            <div>
              <span className="text-gray-500 block text-[10px] uppercase font-bold">Schedule VII Focus Areas</span>
              <span>{formData.focusAreas.join(', ')}</span>
            </div>
          </div>

          {/* Nominees List */}
          <div>
            <h4 className="font-bold text-[#0b3c68] uppercase text-[11px] mb-2">
              Nominated Cross-Functional Delegates ({formData.nominees.length} Total):
            </h4>
            <div className="border border-gray-200 rounded-sm overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs min-w-[450px]">
                  <thead className="bg-gray-100 text-gray-600 font-bold border-b border-gray-200">
                    <tr>
                      <th className="p-2">#</th>
                      <th className="p-2">Name</th>
                      <th className="p-2">Designation</th>
                      <th className="p-2">Email</th>
                      <th className="p-2">Mobile</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {formData.nominees.map((nom, i) => (
                      <tr key={i}>
                        <td className="p-2 font-mono">{i + 1}</td>
                        <td className="p-2 font-semibold">{nom.name}</td>
                        <td className="p-2 text-gray-600">{nom.designation}</td>
                        <td className="p-2 font-mono text-[11px]">{nom.email}</td>
                        <td className="p-2 font-mono text-[11px]">{nom.mobile}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* Financial Breakdown */}
          <div className="p-3.5 bg-[#edf5fb] border border-[#0b3c68]/20 rounded-sm space-y-1 text-xs">
            <div className="flex justify-between">
              <span>Gross Fee ({feeCalc.participantCount} × {formatINR(feeCalc.ratePerPerson)}):</span>
              <span className="font-semibold">{formatINR(feeCalc.subtotal)}</span>
            </div>
            {formData.isAimaMember && (
              <div className="flex justify-between text-emerald-800">
                <span>AIMA Member Discount (10%):</span>
                <span className="font-bold">– {formatINR(feeCalc.discountAmount)}</span>
              </div>
            )}
            <div className="flex justify-between">
              <span>GST (18%):</span>
              <span className="font-semibold">+ {formatINR(feeCalc.gstAmount)}</span>
            </div>
            <div className="flex justify-between font-black text-sm text-[#0b3c68] pt-1.5 border-t border-[#0b3c68]/20">
              <span>Total Payable Value:</span>
              <span>{formatINR(feeCalc.totalPayable)}</span>
            </div>
          </div>

          <p className="text-[11px] text-gray-500 pt-2 border-t border-gray-100">
            Automated dispatch generated by AIMA Executive Programme Registration Portal.
          </p>
        </div>

        {/* Footer actions */}
        <div className="bg-gray-50 px-5 py-3 border-t border-gray-200 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-[#0b3c68] hover:bg-[#082a4a] text-white font-bold text-xs uppercase tracking-wider rounded-sm transition-colors"
          >
            Close Preview
          </button>
        </div>
      </div>
    </div>
  );
};
