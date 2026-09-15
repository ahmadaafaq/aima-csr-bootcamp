import React, { useState } from 'react';
import { FormData, PaymentDetails, calculateFee, formatINR } from '../types';
import { X, Printer, Download, Copy, Check, ShieldCheck, Building2, CheckCircle2, FileText, ExternalLink } from 'lucide-react';
import { downloadOfficialReceipt } from '../utils/receiptGenerator';

interface PrintReceiptModalProps {
  isOpen: boolean;
  onClose: () => void;
  formData: FormData;
  referenceNumber: string;
  paymentDetails?: PaymentDetails | null;
}

export const PrintReceiptModal: React.FC<PrintReceiptModalProps> = ({
  isOpen,
  onClose,
  formData,
  referenceNumber,
  paymentDetails,
}) => {
  const [copied, setCopied] = useState(false);
  const [downloadSuccess, setDownloadSuccess] = useState(false);

  if (!isOpen) return null;

  const feeCalc = calculateFee(formData.nominees.length, formData.isAimaMember);
  const isPaid = paymentDetails?.status === 'Paid' || formData.paymentPreference === 'pay_now';
  const currentDate = new Date().toLocaleDateString('en-IN', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  });

  const handlePrint = () => {
    try {
      window.print();
    } catch {
      // If window.print is restricted in iframe, download the file
      downloadOfficialReceipt(formData, referenceNumber, paymentDetails);
    }
  };

  const handleDownload = () => {
    downloadOfficialReceipt(formData, referenceNumber, paymentDetails);
    setDownloadSuccess(true);
    setTimeout(() => setDownloadSuccess(false), 2500);
  };

  const handleCopy = () => {
    const text = `
ALL INDIA MANAGEMENT ASSOCIATION (AIMA)
Certified CSR Leader Bootcamp - Executive Nomination Receipt
------------------------------------------------------------
Reference No: ${referenceNumber}
Issued Date: ${currentDate}
Status: ${isPaid ? 'PAID & CONFIRMED' : 'PENDING PAYMENT'}

Organisation: ${formData.orgName}
Legal Invoicing Entity: ${formData.billingOrgName}
GSTIN: ${formData.billingGstin}
Sponsoring Authority: ${formData.authName} (${formData.authDesignation})

Delegates Nominated (${formData.nominees.length}):
${formData.nominees.map((n, i) => `${i + 1}. ${n.name} - ${n.designation} (${n.email})`).join('\n')}

Fee Summary:
- Base Fee: ${formatINR(feeCalc.subtotal)}
${formData.isAimaMember ? `- AIMA Member Discount (10%): -${formatINR(feeCalc.discountAmount)}\n` : ''}- GST (18%): +${formatINR(feeCalc.gstAmount)}
- Total Amount: ${formatINR(feeCalc.totalPayable)}
${paymentDetails ? `Payment: ${paymentDetails.methodLabel} | Txn ID: ${paymentDetails.transactionId}` : ''}
------------------------------------------------------------
AIMA Centre for Management Education, New Delhi | csrbootcamp@aima.in
    `.trim();

    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
      <div className="bg-white max-w-3xl w-full rounded-sm shadow-2xl border border-gray-300 overflow-hidden my-4 flex flex-col max-h-[90vh]">
        {/* Top Header Bar */}
        <div className="bg-[#0b3c68] text-white px-5 py-3.5 flex justify-between items-center shrink-0">
          <div className="flex items-center gap-2">
            <FileText className="w-4 h-4 text-amber-300" />
            <span className="text-xs font-bold uppercase tracking-wider">
              AIMA Official Nomination Summary & Receipt
            </span>
          </div>
          <button
            onClick={onClose}
            className="text-gray-300 hover:text-white p-1 rounded transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Action Controls Strip */}
        <div className="bg-[#f0f7fd] border-b border-gray-200 px-4 sm:px-5 py-2.5 flex flex-wrap items-center justify-between gap-2 shrink-0">
          <span className="text-xs text-gray-700 font-medium">
            Registration Reference: <strong className="font-mono text-[#0b3c68]">{referenceNumber}</strong>
          </span>

          <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
            <button
              onClick={handleCopy}
              className="px-2.5 sm:px-3 py-1.5 bg-white hover:bg-gray-50 border border-gray-300 text-gray-700 rounded-sm text-xs font-bold uppercase tracking-wider transition-colors flex items-center gap-1.5"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? 'Copied' : 'Copy'}</span>
            </button>

            <button
              onClick={handleDownload}
              className="px-2.5 sm:px-3 py-1.5 bg-[#0b3c68] hover:bg-[#082a4a] text-white rounded-sm text-xs font-bold uppercase tracking-wider transition-colors flex items-center gap-1.5 shadow-xs"
            >
              {downloadSuccess ? <CheckCircle2 className="w-3.5 h-3.5 text-amber-300" /> : <Download className="w-3.5 h-3.5" />}
              <span>{downloadSuccess ? 'Saved' : 'Download'}</span>
            </button>

            <button
              onClick={handlePrint}
              className="px-2.5 sm:px-3 py-1.5 bg-emerald-700 hover:bg-emerald-800 text-white rounded-sm text-xs font-bold uppercase tracking-wider transition-colors flex items-center gap-1.5 shadow-xs"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print PDF</span>
            </button>
          </div>
        </div>

        {/* Printable Document Preview Area */}
        <div className="p-4 sm:p-8 overflow-y-auto space-y-6 bg-white text-gray-800 text-xs leading-relaxed font-sans">
          {/* Document Header */}
          <div className="border-b-2 border-[#0b3c68] pb-5 flex flex-col sm:flex-row justify-between gap-4">
            <div>
              <div className="flex items-center gap-2">
                <span className="text-2xl font-black text-[#0b3c68] tracking-wider">AIMA</span>
                <span className="text-[10px] bg-amber-100 text-amber-900 border border-amber-300 px-2 py-0.5 rounded font-bold uppercase tracking-widest">
                  Est. 1957
                </span>
              </div>
              <h2 className="text-base font-extrabold text-[#0b3c68] uppercase tracking-tight mt-1">
                All India Management Association
              </h2>
              <p className="text-gray-500 text-[11px]">
                Management House, 14 Institutional Area, Lodhi Road, New Delhi – 110003
              </p>
              <p className="text-gray-500 text-[11px]">
                SAC Code: <strong>999293</strong> | GSTIN: <strong>07AAATA0892B1Z6</strong>
              </p>
            </div>

            <div className="sm:text-right space-y-1">
              <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block">
                Official Cohort Reference
              </span>
              <span className="font-mono text-base font-extrabold text-[#0b3c68] bg-sky-50 px-2.5 py-1 rounded border border-sky-200 inline-block">
                {referenceNumber}
              </span>
              <div className="pt-1">
                <span
                  className={`inline-block text-[11px] font-bold uppercase px-2.5 py-0.5 rounded ${
                    isPaid
                      ? 'bg-emerald-100 text-emerald-900 border border-emerald-300'
                      : 'bg-amber-100 text-amber-900 border border-amber-300'
                  }`}
                >
                  {isPaid ? '● PAID & CONFIRMED' : '● PENDING PAYMENT'}
                </span>
              </div>
              <span className="text-[10px] text-gray-400 block">Issued: {currentDate}</span>
            </div>
          </div>

          {/* Programme Banner */}
          <div className="bg-[#f8fafc] border border-gray-200 p-4 rounded-sm">
            <span className="text-[10px] uppercase font-bold text-amber-700 tracking-wider block">
              Executive Programme Nomination
            </span>
            <h3 className="text-sm font-bold text-[#0b3c68] uppercase mt-0.5">
              AIMA Certified CSR Leader Bootcamp (2026 Cohort)
            </h3>
            <p className="text-gray-600 text-[11px] mt-1">
              4-Week Executive Hybrid Masterclass & 12-Month Actionable CSR Roadmap Workshop in collaboration with Sustainable Advancements.
            </p>
          </div>

          {/* Sponsoring Org and Billing Entity */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 border border-gray-200 p-4 rounded-sm bg-white">
            <div className="space-y-1">
              <span className="text-[10px] font-bold uppercase tracking-wider text-gray-400 block">
                Sponsoring Organisation
              </span>
              <span className="font-bold text-gray-900 text-xs block">{formData.orgName}</span>
              <span className="text-gray-600 text-[11px] block">
                Authority: {formData.authName} ({formData.authDesignation})
              </span>
              <span className="text-gray-600 font-mono text-[11px] block">
                {formData.authEmail} | +91 {formData.authMobile}
              </span>
            </div>

            <div className="space-y-1">
              <span className="text-[10px] font-bold uppercase tracking-wider text-gray-400 block">
                Invoicing Entity & GST Details
              </span>
              <span className="font-bold text-gray-900 text-xs block">{formData.billingOrgName}</span>
              <span className="text-gray-600 text-[11px] block">
                GSTIN: <strong className="font-mono text-[#0b3c68]">{formData.billingGstin}</strong>
              </span>
              <span className="text-gray-600 text-[11px] block">
                Address: {formData.billingAddress}, {formData.billingState} – {formData.billingPinCode}
              </span>
              {formData.poNumber && (
                <span className="text-gray-600 text-[11px] block">
                  PO Reference: <strong className="font-mono">{formData.poNumber}</strong>
                </span>
              )}
            </div>
          </div>

          {/* Nominee Roster Table */}
          <div className="border border-gray-200 rounded-sm overflow-hidden">
            <div className="bg-gray-100 px-4 py-2 border-b border-gray-200 font-bold uppercase text-[11px] text-gray-700 flex justify-between">
              <span>Nominated Executive Delegates ({formData.nominees.length})</span>
              <span className="text-gray-500 font-normal">AIMA Executive Registry</span>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs min-w-[500px]">
                <thead className="bg-gray-50 text-gray-500 font-semibold border-b border-gray-200 text-[11px]">
                  <tr>
                    <th className="p-2.5">#</th>
                    <th className="p-2.5">Delegate Name</th>
                    <th className="p-2.5">Designation</th>
                    <th className="p-2.5">Corporate Email</th>
                    <th className="p-2.5">Mobile</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {formData.nominees.map((nom, i) => (
                    <tr key={nom.id || i}>
                      <td className="p-2.5 font-mono font-bold text-[#0b3c68]">
                        {String(i + 1).padStart(2, '0')}
                      </td>
                      <td className="p-2.5 font-bold text-gray-900">{nom.name}</td>
                      <td className="p-2.5 text-gray-600">{nom.designation}</td>
                      <td className="p-2.5 font-mono text-gray-600">{nom.email}</td>
                      <td className="p-2.5 font-mono text-gray-600">+91 {nom.mobile}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Fee & Tax Breakdown */}
          <div className="border border-[#0b3c68]/30 rounded-sm bg-[#fafcff] p-4 space-y-2">
            <div className="flex justify-between text-gray-600 text-xs">
              <span>
                Base Participation Fee ({feeCalc.participantCount} × {formatINR(feeCalc.ratePerPerson)})
              </span>
              <span className="font-semibold text-gray-900">{formatINR(feeCalc.subtotal)}</span>
            </div>
            {formData.isAimaMember && (
              <div className="flex justify-between text-emerald-700 text-xs font-medium">
                <span>AIMA Institutional Member Discount (10% - {formData.aimaMembershipNo || 'Applied'})</span>
                <span>– {formatINR(feeCalc.discountAmount)}</span>
              </div>
            )}
            <div className="flex justify-between text-gray-600 text-xs">
              <span>Taxable Value</span>
              <span className="font-semibold text-gray-900">{formatINR(feeCalc.netSubtotal)}</span>
            </div>
            <div className="flex justify-between text-gray-600 text-xs">
              <span>Goods & Services Tax (GST @ 18%)</span>
              <span className="font-semibold text-gray-900">+ {formatINR(feeCalc.gstAmount)}</span>
            </div>
            <div className="flex justify-between text-sm font-black text-[#0b3c68] pt-2 border-t border-gray-200">
              <span>Total Payable / Settled Value</span>
              <span className="text-base font-extrabold">{formatINR(feeCalc.totalPayable)}</span>
            </div>

            {paymentDetails && (
              <div className="mt-3 pt-3 border-t border-gray-200 flex flex-wrap justify-between text-[11px] text-gray-600">
                <span>Payment Mode: <strong>{paymentDetails.methodLabel}</strong></span>
                <span>Transaction Ref: <strong className="font-mono">{paymentDetails.transactionId}</strong></span>
                <span>Settlement Time: <strong>{paymentDetails.timestamp}</strong></span>
              </div>
            )}
          </div>

          {/* Footer Endorsement Box */}
          <div className="pt-4 border-t border-gray-200 flex flex-col sm:flex-row justify-between items-center gap-4 text-[11px] text-gray-500">
            <div>
              <p>Certified by AIMA Executive Programme Directorate.</p>
              <p>Queries: <strong>csrbootcamp@aima.in</strong> | +91-11-24645100</p>
            </div>
            <div className="border border-gray-300 rounded p-2 text-center bg-gray-50">
              <span className="font-bold text-gray-700 block text-[10px] uppercase">
                AIMA Directorate Seal
              </span>
              <span className="text-emerald-700 font-semibold text-[10px]">
                ✓ Digitally Acknowledged
              </span>
            </div>
          </div>
        </div>

        {/* Bottom Footer Action */}
        <div className="bg-gray-100 px-4 sm:px-5 py-3 border-t border-gray-200 flex flex-wrap justify-between items-center gap-2 shrink-0">
          <button
            onClick={onClose}
            className="px-3.5 py-1.5 border border-gray-300 text-gray-700 hover:bg-white text-xs font-bold uppercase tracking-wider rounded-sm transition-colors"
          >
            Close
          </button>

          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={handleDownload}
              className="px-3.5 py-1.5 bg-[#0b3c68] hover:bg-[#082a4a] text-white text-xs font-bold uppercase tracking-wider rounded-sm transition-colors flex items-center gap-1.5"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Download HTML</span>
            </button>
            <button
              onClick={handlePrint}
              className="px-3.5 py-1.5 bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-bold uppercase tracking-wider rounded-sm transition-colors flex items-center gap-1.5"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print PDF</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
