import React from 'react';
import { FormData, PaymentDetails, calculateFee, formatINR } from '../types';
import { CheckCircle2, Download, Mail, ArrowLeft, Printer, ShieldCheck, Building2, Users, FileText, Calendar, MapPin, Award, CreditCard } from 'lucide-react';
import { downloadOfficialReceipt } from '../utils/receiptGenerator';

interface SuccessScreenProps {
  formData: FormData;
  referenceNumber: string;
  paymentStatus: 'Paid' | 'Pending / Pay Later';
  paymentDetails?: PaymentDetails | null;
  onReset: () => void;
  onOpenEmailPreview: () => void;
  onOpenPrintModal: () => void;
}

export const SuccessScreen: React.FC<SuccessScreenProps> = ({
  formData,
  referenceNumber,
  paymentStatus,
  paymentDetails,
  onReset,
  onOpenEmailPreview,
  onOpenPrintModal,
}) => {
  const feeCalc = calculateFee(formData.nominees.length, formData.isAimaMember);
  const isPaid = paymentStatus === 'Paid';

  const handleDownloadAndPrint = () => {
    // 1. Download official summary document
    downloadOfficialReceipt(formData, referenceNumber, paymentDetails);
    // 2. Open printable receipt modal
    onOpenPrintModal();
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 my-8 px-4 sm:px-0">
      {/* Official Success Banner */}
      <div className="bg-white border border-gray-200 rounded-sm shadow-xs overflow-hidden print:border-none print:shadow-none">
        <div className="bg-emerald-700 text-white p-6 sm:p-8 text-center space-y-3">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-white/15 ring-8 ring-white/10 mb-2">
            <CheckCircle2 className="w-10 h-10 text-white" />
          </div>

          <h2 className="text-xl sm:text-2xl md:text-3xl font-black uppercase tracking-tight">
            Registration Submitted Successfully
          </h2>

          <p className="text-emerald-100 text-sm sm:text-base max-w-2xl mx-auto font-medium">
            Your nomination for the{' '}
            <strong className="text-white">AIMA Certified CSR Leader Bootcamp</strong> has been successfully recorded in the cohort registry.
          </p>
        </div>

        {/* Reference & Payment Status Card */}
        <div className="p-6 sm:p-8 bg-[#fafcff] border-b border-gray-200">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-center sm:text-left divide-y sm:divide-y-0 sm:divide-x divide-gray-200">
            {/* Col 1 */}
            <div className="pt-3 sm:pt-0 sm:pr-4">
              <span className="text-[11px] font-bold text-gray-500 uppercase tracking-wider block">
                Registration Reference Number
              </span>
              <span className="text-xl sm:text-2xl font-mono font-extrabold text-[#0b3c68] tracking-tight block mt-1">
                {referenceNumber}
              </span>
              <span className="text-[10px] text-gray-400 font-mono mt-0.5 block">
                Official AIMA Cohort ID
              </span>
            </div>

            {/* Col 2 */}
            <div className="pt-4 sm:pt-0 sm:px-6">
              <span className="text-[11px] font-bold text-gray-500 uppercase tracking-wider block">
                Payment Status
              </span>
              <span
                className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-sm text-xs font-black uppercase tracking-wider mt-1.5 ${
                  isPaid
                    ? 'bg-emerald-100 text-emerald-900 border border-emerald-300'
                    : 'bg-amber-100 text-amber-900 border border-amber-300'
                }`}
              >
                <span
                  className={`w-2 h-2 rounded-full ${
                    isPaid ? 'bg-emerald-600' : 'bg-amber-600'
                  }`}
                />
                {isPaid ? 'PAID' : 'PENDING / PAY LATER'}
              </span>
              <span className="text-[10px] text-gray-500 block mt-1">
                {paymentDetails
                  ? `Settled: ${paymentDetails.methodLabel}`
                  : isPaid
                  ? 'Settled via Corporate Gateway'
                  : 'Proforma Tax Invoice Dispatched'}
              </span>
            </div>

            {/* Col 3 */}
            <div className="pt-4 sm:pt-0 sm:pl-6">
              <span className="text-[11px] font-bold text-gray-500 uppercase tracking-wider block">
                Total Programme Amount
              </span>
              <span className="text-xl sm:text-2xl font-black text-[#0b3c68] block mt-1">
                {formatINR(feeCalc.totalPayable)}
              </span>
              <span className="text-[10px] text-gray-500 block mt-0.5">
                Incl. 18% GST ({feeCalc.participantCount} Participant{feeCalc.participantCount > 1 ? 's' : ''})
              </span>
            </div>
          </div>
        </div>

        {/* Confirmation note */}
        <div className="p-6 bg-white space-y-6">
          <div className="flex items-start gap-3 p-4 bg-sky-50 border border-sky-200 text-xs text-sky-900 rounded-sm">
            <Mail className="w-5 h-5 text-[#0b3c68] shrink-0 mt-0.5" />
            <div>
              <strong className="font-semibold text-[#0b3c68] block mb-0.5">
                Automated Notification & Induction Packets:
              </strong>
              A confirmation email with onboarding schedules, LMS credentials, and bootcamp case-study preparatory materials will be dispatched to <strong>{formData.authEmail}</strong> and all {formData.nominees.length} nominated delegates.
            </div>
          </div>

          {/* Printable Nomination Roster Summary */}
          <div className="border border-gray-200 rounded-sm overflow-hidden">
            <div className="bg-[#0b3c68] text-white px-4 py-2.5 flex justify-between items-center text-xs font-bold uppercase tracking-wider">
              <span>Nomination Roster Summary</span>
              <span className="text-amber-300 font-normal normal-case">
                {formData.orgName}
              </span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-gray-50 text-gray-600 border-b border-gray-200 font-bold uppercase tracking-wider text-[11px]">
                  <tr>
                    <th className="p-3">#</th>
                    <th className="p-3">Delegate Name</th>
                    <th className="p-3">Designation</th>
                    <th className="p-3">Official Email</th>
                    <th className="p-3">Contact</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {formData.nominees.map((nom, idx) => (
                    <tr key={nom.id || idx} className="hover:bg-gray-50">
                      <td className="p-3 font-mono font-bold text-[#0b3c68]">
                        {String(idx + 1).padStart(2, '0')}
                      </td>
                      <td className="p-3 font-bold text-gray-900">{nom.name}</td>
                      <td className="p-3 text-gray-600">{nom.designation}</td>
                      <td className="p-3 font-mono text-gray-600">{nom.email}</td>
                      <td className="p-3 font-mono text-gray-600">+91 {nom.mobile}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Next Steps Card */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div className="p-4 bg-gray-50 border border-gray-200 rounded-sm space-y-1">
              <span className="font-bold text-gray-800 uppercase tracking-wider flex items-center gap-1.5 text-[#0b3c68]">
                <Calendar className="w-3.5 h-3.5" />
                Bootcamp Schedule & Venue
              </span>
              <p className="text-gray-600">
                Hybrid Executive Format (Interactive Masterclasses + 12-Month Action Roadmap Workshop at AIMA Centre for Management Development, New Delhi).
              </p>
            </div>

            <div className="p-4 bg-gray-50 border border-gray-200 rounded-sm space-y-1">
              <span className="font-bold text-gray-800 uppercase tracking-wider flex items-center gap-1.5 text-[#0b3c68]">
                <Award className="w-3.5 h-3.5" />
                Certification Award
              </span>
              <p className="text-gray-600">
                Joint Executive Certification from All India Management Association (AIMA) & Sustainable Advancements upon project defense.
              </p>
            </div>
          </div>

          {/* Action Button Strip */}
          <div className="pt-6 border-t border-gray-200 flex flex-wrap items-center justify-between gap-4 print:hidden">
            <button
              type="button"
              onClick={onReset}
              className="px-5 py-2.5 border border-gray-300 text-gray-700 hover:bg-gray-100 font-bold text-xs uppercase tracking-wider rounded-sm transition-colors flex items-center gap-2"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Registration</span>
            </button>

            <div className="flex flex-wrap items-center gap-3">
              <button
                type="button"
                onClick={onOpenEmailPreview}
                className="px-4 py-2.5 bg-amber-500 hover:bg-amber-600 text-amber-950 font-bold text-xs uppercase tracking-wider rounded-sm transition-colors shadow-xs flex items-center gap-2"
              >
                <Mail className="w-4 h-4" />
                <span>Demo – Email Preview</span>
              </button>

              <button
                type="button"
                onClick={handleDownloadAndPrint}
                className="px-5 py-2.5 bg-[#0b3c68] hover:bg-[#082a4a] text-white font-bold text-xs uppercase tracking-wider rounded-sm transition-colors shadow-sm flex items-center gap-2"
              >
                <Printer className="w-4 h-4" />
                <span>Download / Print Summary</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
