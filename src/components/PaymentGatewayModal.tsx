import React, { useState, useEffect } from 'react';
import { PaymentDetails, formatINR } from '../types';
import {
  X,
  Lock,
  ShieldCheck,
  QrCode,
  CreditCard,
  Building2,
  ArrowRight,
  CheckCircle2,
  Copy,
  Check,
  AlertCircle,
  RefreshCw,
  Smartphone,
  Landmark,
  ShieldAlert,
  Loader2,
  Sparkles
} from 'lucide-react';

interface PaymentGatewayModalProps {
  amount: number;
  orgName: string;
  referenceNumber: string;
  onSuccess: (details: PaymentDetails) => void;
  onClose: () => void;
}

type TabType = 'upi' | 'card' | 'netbanking' | 'bank_transfer';

export const PaymentGatewayModal: React.FC<PaymentGatewayModalProps> = ({
  amount,
  orgName,
  referenceNumber,
  onSuccess,
  onClose,
}) => {
  const [activeTab, setActiveTab] = useState<TabType>('upi');
  const [isProcessing, setIsProcessing] = useState(false);
  const [processingStep, setProcessingStep] = useState('Connecting to Banking Switch...');
  const [copiedField, setCopiedField] = useState<string | null>(null);

  // OTP Sub-screen for 3DS verification
  const [showOtpScreen, setShowOtpScreen] = useState(false);
  const [otpValue, setOtpValue] = useState('');
  const [otpError, setOtpError] = useState('');

  // UPI State
  const [upiId, setUpiId] = useState('abcinfra.finance@okhdfcbank');
  const [upiTimer, setUpiTimer] = useState(580); // seconds

  // Card State
  const [cardNumber, setCardNumber] = useState('4532 8920 1198 3409');
  const [cardHolder, setCardHolder] = useState(orgName ? `${orgName} (Corp)` : 'Rajiv Sharma');
  const [cardExpiry, setCardExpiry] = useState('08/29');
  const [cardCvv, setCardCvv] = useState('842');
  const [cardType, setCardType] = useState<'visa' | 'mastercard' | 'rupay'>('visa');

  // Net Banking State
  const [selectedBank, setSelectedBank] = useState('HDFC');
  const [corporateId, setCorporateId] = useState('CORP_ABC_789');
  const [corporateUserId, setCorporateUserId] = useState('FIN_DIR_RAJIV');

  // RTGS / Bank Transfer State
  const [utrNumber, setUtrNumber] = useState('CMS2026' + Math.floor(100000 + Math.random() * 900000));

  // Countdown timer for QR
  useEffect(() => {
    const timer = setInterval(() => {
      setUpiTimer((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTimer = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  const handleCopy = (text: string, fieldName: string) => {
    navigator.clipboard.writeText(text);
    setCopiedField(fieldName);
    setTimeout(() => setCopiedField(null), 2000);
  };

  // Card number input formatter
  const handleCardNumberChange = (val: string) => {
    const raw = val.replace(/\D/g, '').slice(0, 16);
    const formatted = raw.replace(/(\d{4})(?=\d)/g, '$1 ');
    setCardNumber(formatted);

    if (raw.startsWith('4')) setCardType('visa');
    else if (raw.startsWith('5')) setCardType('mastercard');
    else setCardType('rupay');
  };

  const executePaymentSuccess = (method: PaymentDetails['method'], label: string, bankOrVpa?: string, cardLast4?: string) => {
    setIsProcessing(true);
    setProcessingStep('Authorising Transaction with Issuer Gateway...');

    setTimeout(() => {
      setProcessingStep('Verifying 18% Corporate GST & SAC 999293...');
    }, 700);

    setTimeout(() => {
      setProcessingStep('Settlement Approved! Generating AIMA Official Receipt...');
    }, 1400);

    setTimeout(() => {
      setIsProcessing(false);
      const now = new Date();
      const timestamp = now.toLocaleDateString('en-IN', {
        day: '2-digit',
        month: 'short',
        year: 'numeric',
      }) + ' ' + now.toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' });

      onSuccess({
        method,
        methodLabel: label,
        transactionId: `AIMA-TXN-${Date.now().toString().slice(-8)}`,
        timestamp,
        paidAmount: amount,
        bankOrVpa,
        cardLast4: cardLast4 || '3409',
        cardType,
        status: 'Paid',
      });
    }, 2100);
  };

  // Trigger from Card Tab -> opens OTP Modal first
  const handleCardSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setShowOtpScreen(true);
    setOtpValue('');
  };

  const handleVerifyOtp = () => {
    if (!otpValue || otpValue.trim().length < 4) {
      setOtpError('Please enter the 6-digit corporate verification OTP.');
      return;
    }
    setOtpError('');
    setShowOtpScreen(false);
    const last4 = cardNumber.replace(/\s/g, '').slice(-4);
    executePaymentSuccess('card', `Corporate Credit Card (${cardType.toUpperCase()} •••• ${last4})`, undefined, last4);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 overflow-y-auto">
      <div className="bg-white max-w-2xl w-full rounded-sm shadow-2xl border border-gray-300 overflow-hidden my-4 relative">
        {/* Gateway Header */}
        <div className="bg-[#0b3c68] text-white px-5 py-3.5 flex justify-between items-center">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-sm bg-white/10 flex items-center justify-center font-black text-amber-300 text-sm">
              AIMA
            </div>
            <div>
              <div className="text-xs font-bold uppercase tracking-wider flex items-center gap-1.5">
                <span>AIMA Official Payment Gateway</span>
                <span className="text-[10px] bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 px-1.5 py-0.2 rounded font-mono font-normal">
                  Live Simulator
                </span>
              </div>
              <span className="text-[10px] text-gray-300 block">
                All India Management Association • SAC: 999293
              </span>
            </div>
          </div>

          <button
            onClick={onClose}
            disabled={isProcessing}
            className="text-gray-300 hover:text-white p-1 rounded transition-colors disabled:opacity-50"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Order Summary Bar */}
        <div className="bg-[#f8fafc] border-b border-gray-200 px-5 py-3 flex flex-wrap justify-between items-center gap-2">
          <div>
            <span className="text-[10px] uppercase font-bold text-gray-400 block">
              Nomination Ref: {referenceNumber}
            </span>
            <span className="text-xs font-bold text-gray-800">
              {orgName || 'Corporate Delegate Registration'}
            </span>
          </div>
          <div className="text-right">
            <span className="text-[10px] uppercase font-bold text-gray-500 block">
              Total Payable (Incl. 18% GST)
            </span>
            <span className="text-lg font-black text-[#0b3c68]">
              {formatINR(amount)}
            </span>
          </div>
        </div>

        {/* Main Body with Tabs */}
        {!showOtpScreen && !isProcessing && (
          <div className="flex flex-col sm:flex-row min-h-[380px]">
            {/* Sidebar Tabs */}
            <div className="w-full sm:w-48 bg-gray-50 border-b sm:border-b-0 sm:border-r border-gray-200 p-2 sm:p-3 flex sm:flex-col gap-1 overflow-x-auto shrink-0">
              <button
                type="button"
                onClick={() => setActiveTab('upi')}
                className={`w-full p-2.5 rounded-sm text-left text-xs font-bold transition-all flex items-center gap-2.5 whitespace-nowrap sm:whitespace-normal ${
                  activeTab === 'upi'
                    ? 'bg-white text-[#0b3c68] border border-gray-200 shadow-xs font-extrabold'
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                <QrCode className="w-4 h-4 text-[#0b3c68] shrink-0" />
                <span>UPI / QR Code</span>
              </button>

              <button
                type="button"
                onClick={() => setActiveTab('card')}
                className={`w-full p-2.5 rounded-sm text-left text-xs font-bold transition-all flex items-center gap-2.5 whitespace-nowrap sm:whitespace-normal ${
                  activeTab === 'card'
                    ? 'bg-white text-[#0b3c68] border border-gray-200 shadow-xs font-extrabold'
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                <CreditCard className="w-4 h-4 text-[#0b3c68] shrink-0" />
                <span>Cards (Corp/Debit)</span>
              </button>

              <button
                type="button"
                onClick={() => setActiveTab('netbanking')}
                className={`w-full p-2.5 rounded-sm text-left text-xs font-bold transition-all flex items-center gap-2.5 whitespace-nowrap sm:whitespace-normal ${
                  activeTab === 'netbanking'
                    ? 'bg-white text-[#0b3c68] border border-gray-200 shadow-xs font-extrabold'
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                <Building2 className="w-4 h-4 text-[#0b3c68] shrink-0" />
                <span>Net Banking</span>
              </button>

              <button
                type="button"
                onClick={() => setActiveTab('bank_transfer')}
                className={`w-full p-2.5 rounded-sm text-left text-xs font-bold transition-all flex items-center gap-2.5 whitespace-nowrap sm:whitespace-normal ${
                  activeTab === 'bank_transfer'
                    ? 'bg-white text-[#0b3c68] border border-gray-200 shadow-xs font-extrabold'
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                <Landmark className="w-4 h-4 text-[#0b3c68] shrink-0" />
                <span>NEFT / RTGS</span>
              </button>

              <div className="hidden sm:block mt-auto pt-4 border-t border-gray-200 text-[10px] text-gray-400">
                <div className="flex items-center gap-1 text-emerald-700 font-semibold mb-1">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>256-Bit SSL</span>
                </div>
                <span>PCI-DSS Level 1 Encrypted</span>
              </div>
            </div>

            {/* Tab Contents */}
            <div className="p-5 sm:p-6 grow text-xs overflow-y-auto">
              {/* TAB 1: UPI / QR Code */}
              {activeTab === 'upi' && (
                <div className="space-y-4">
                  <div className="flex flex-col sm:flex-row items-center gap-5 p-4 bg-gray-50 border border-gray-200 rounded-sm">
                    {/* QR Graphic */}
                    <div className="w-36 h-36 bg-white p-2 border-2 border-gray-800 rounded-sm shadow-inner shrink-0 relative flex flex-col items-center justify-center">
                      <svg viewBox="0 0 100 100" className="w-full h-full">
                        {/* Realistic Mock QR pattern */}
                        <rect x="0" y="0" width="30" height="30" fill="#0b3c68" />
                        <rect x="5" y="5" width="20" height="20" fill="#ffffff" />
                        <rect x="9" y="9" width="12" height="12" fill="#0b3c68" />

                        <rect x="70" y="0" width="30" height="30" fill="#0b3c68" />
                        <rect x="75" y="5" width="20" height="20" fill="#ffffff" />
                        <rect x="79" y="9" width="12" height="12" fill="#0b3c68" />

                        <rect x="0" y="70" width="30" height="30" fill="#0b3c68" />
                        <rect x="5" y="75" width="20" height="20" fill="#ffffff" />
                        <rect x="9" y="79" width="12" height="12" fill="#0b3c68" />

                        {/* Random pattern blocks */}
                        <rect x="36" y="6" width="6" height="6" fill="#0b3c68" />
                        <rect x="46" y="12" width="12" height="6" fill="#0b3c68" />
                        <rect x="12" y="38" width="8" height="8" fill="#0b3c68" />
                        <rect x="38" y="38" width="24" height="24" fill="#0b3c68" />
                        <rect x="44" y="44" width="12" height="12" fill="#ffffff" />
                        <rect x="48" y="48" width="4" height="4" fill="#0b3c68" />
                        <rect x="68" y="38" width="12" height="6" fill="#0b3c68" />
                        <rect x="78" y="48" width="16" height="8" fill="#0b3c68" />
                        <rect x="38" y="68" width="8" height="16" fill="#0b3c68" />
                        <rect x="52" y="74" width="14" height="6" fill="#0b3c68" />
                        <rect x="72" y="72" width="20" height="20" fill="#0b3c68" />
                        <rect x="76" y="76" width="12" height="12" fill="#ffffff" />
                      </svg>
                      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                        <span className="bg-white px-1 font-extrabold text-[8px] text-[#0b3c68] border border-gray-300 rounded shadow-xs">
                          AIMA
                        </span>
                      </div>
                    </div>

                    <div className="space-y-2 text-center sm:text-left">
                      <div className="font-bold text-gray-900 text-sm">
                        Scan to Pay with Any Corporate UPI App
                      </div>
                      <p className="text-gray-500 text-[11px]">
                        Google Pay • PhonePe • Paytm • BHIM • CRED • Corporate UPI
                      </p>
                      <div className="text-[11px] font-mono text-amber-800 bg-amber-50 px-2 py-1 rounded inline-block border border-amber-200">
                        ⏱️ QR Valid for: <strong>{formatTimer(upiTimer)}</strong>
                      </div>

                      <div className="pt-1">
                        <button
                          type="button"
                          onClick={() => executePaymentSuccess('upi', 'UPI QR Scanner (Instant Settlement)', 'aima.csr@hdfcbank')}
                          className="px-4 py-2 bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs uppercase tracking-wider rounded-sm transition-colors shadow-xs flex items-center gap-1.5 mx-auto sm:mx-0"
                        >
                          <Smartphone className="w-3.5 h-3.5" />
                          <span>Simulate QR Scan & Approval</span>
                        </button>
                      </div>
                    </div>
                  </div>

                  <div className="relative flex py-1 items-center">
                    <div className="grow border-t border-gray-200"></div>
                    <span className="shrink mx-3 text-gray-400 uppercase text-[10px] font-bold">
                      Or Enter Corporate UPI VPA / ID
                    </span>
                    <div className="grow border-t border-gray-200"></div>
                  </div>

                  {/* VPA Input */}
                  <div className="space-y-2">
                    <label className="block text-xs font-bold uppercase text-gray-700">
                      Corporate UPI ID (VPA)
                    </label>
                    <div className="flex flex-col sm:flex-row gap-2">
                      <input
                        type="text"
                        value={upiId}
                        onChange={(e) => setUpiId(e.target.value)}
                        placeholder="e.g. yourcompany@icici"
                        className="w-full sm:grow px-3 py-2 text-xs border border-gray-300 rounded-sm focus:border-[#0b3c68] outline-none font-mono"
                      />
                      <button
                        type="button"
                        onClick={() => executePaymentSuccess('upi', `UPI VPA (${upiId})`, upiId)}
                        className="w-full sm:w-auto px-5 py-2 bg-[#0b3c68] hover:bg-[#082a4a] text-white font-bold text-xs uppercase tracking-wider rounded-sm transition-colors whitespace-nowrap"
                      >
                        Verify & Pay {formatINR(amount)}
                      </button>
                    </div>

                    {/* Quick VPA Chips */}
                    <div className="flex flex-wrap gap-1.5 pt-1">
                      <span className="text-[10px] text-gray-400 self-center">Test VPAs:</span>
                      {['abcinfra.finance@okhdfcbank', 'rajiv.sharma@paytm', 'csr.corp@icici'].map((preset) => (
                        <button
                          key={preset}
                          type="button"
                          onClick={() => setUpiId(preset)}
                          className="text-[10px] bg-gray-100 hover:bg-gray-200 text-gray-700 px-2 py-0.5 rounded font-mono border border-gray-200"
                        >
                          {preset}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* TAB 2: Cards */}
              {activeTab === 'card' && (
                <form onSubmit={handleCardSubmit} className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-xs font-bold text-gray-800 uppercase">
                      Corporate / Commercial Card
                    </span>
                    <button
                      type="button"
                      onClick={() => {
                        setCardNumber('4532 8920 1198 3409');
                        setCardHolder(orgName || 'ABC Infrastructure Ltd');
                        setCardExpiry('08/29');
                        setCardCvv('842');
                      }}
                      className="text-[11px] text-[#0b3c68] font-bold hover:underline flex items-center gap-1"
                    >
                      <Sparkles className="w-3 h-3 text-amber-500" />
                      Auto-Fill Demo Corporate Card
                    </button>
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold uppercase text-gray-600 mb-1">
                      Card Number
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        required
                        value={cardNumber}
                        onChange={(e) => handleCardNumberChange(e.target.value)}
                        placeholder="•••• •••• •••• ••••"
                        className="w-full pl-3 pr-16 py-2 text-xs font-mono border border-gray-300 rounded-sm focus:border-[#0b3c68] outline-none"
                      />
                      <span className="absolute right-3 top-2 text-[10px] font-bold uppercase bg-gray-100 px-1.5 py-0.5 rounded border border-gray-200 text-gray-700">
                        {cardType.toUpperCase()}
                      </span>
                    </div>
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold uppercase text-gray-600 mb-1">
                      Cardholder Name
                    </label>
                    <input
                      type="text"
                      required
                      value={cardHolder}
                      onChange={(e) => setCardHolder(e.target.value)}
                      placeholder="Name on card"
                      className="w-full px-3 py-2 text-xs border border-gray-300 rounded-sm focus:border-[#0b3c68] outline-none uppercase"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[11px] font-bold uppercase text-gray-600 mb-1">
                        Expiry (MM/YY)
                      </label>
                      <input
                        type="text"
                        required
                        maxLength={5}
                        value={cardExpiry}
                        onChange={(e) => setCardExpiry(e.target.value)}
                        placeholder="MM/YY"
                        className="w-full px-3 py-2 text-xs font-mono border border-gray-300 rounded-sm focus:border-[#0b3c68] outline-none text-center"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-bold uppercase text-gray-600 mb-1">
                        CVV / CVC
                      </label>
                      <input
                        type="password"
                        required
                        maxLength={4}
                        value={cardCvv}
                        onChange={(e) => setCardCvv(e.target.value)}
                        placeholder="•••"
                        className="w-full px-3 py-2 text-xs font-mono border border-gray-300 rounded-sm focus:border-[#0b3c68] outline-none text-center"
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="w-full py-2.5 bg-[#0b3c68] hover:bg-[#082a4a] text-white font-bold text-xs uppercase tracking-wider rounded-sm transition-colors flex items-center justify-center gap-2 shadow-xs"
                  >
                    <Lock className="w-3.5 h-3.5 text-amber-300" />
                    <span>Proceed to 3D Secure Verification ({formatINR(amount)})</span>
                  </button>
                </form>
              )}

              {/* TAB 3: Net Banking */}
              {activeTab === 'netbanking' && (
                <div className="space-y-4">
                  <span className="text-xs font-bold text-gray-800 uppercase block">
                    Select Corporate Net Banking Portal
                  </span>

                  {/* Major Banks Grid */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                    {[
                      { id: 'HDFC', name: 'HDFC Bank' },
                      { id: 'SBI', name: 'State Bank of India' },
                      { id: 'ICICI', name: 'ICICI Bank' },
                      { id: 'AXIS', name: 'Axis Bank' },
                      { id: 'KOTAK', name: 'Kotak Bank' },
                      { id: 'PNB', name: 'Punjab National Bank' },
                      { id: 'BOB', name: 'Bank of Baroda' },
                      { id: 'CANARA', name: 'Canara Bank' },
                    ].map((bank) => (
                      <button
                        key={bank.id}
                        type="button"
                        onClick={() => setSelectedBank(bank.id)}
                        className={`p-2.5 border rounded-sm text-center transition-all ${
                          selectedBank === bank.id
                            ? 'border-[#0b3c68] bg-[#edf5fb] ring-1 ring-[#0b3c68] font-bold text-[#0b3c68]'
                            : 'border-gray-200 hover:bg-gray-50 text-gray-700'
                        }`}
                      >
                        <span className="text-xs block">{bank.name}</span>
                      </button>
                    ))}
                  </div>

                  <div className="p-3 bg-gray-50 border border-gray-200 rounded-sm space-y-3">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="block text-[10px] font-bold uppercase text-gray-500 mb-1">
                          Corporate ID / Org Code
                        </label>
                        <input
                          type="text"
                          value={corporateId}
                          onChange={(e) => setCorporateId(e.target.value)}
                          className="w-full p-2 text-xs font-mono border border-gray-300 rounded-sm bg-white"
                        />
                      </div>
                      <div>
                        <label className="block text-[10px] font-bold uppercase text-gray-500 mb-1">
                          Authoriser User ID
                        </label>
                        <input
                          type="text"
                          value={corporateUserId}
                          onChange={(e) => setCorporateUserId(e.target.value)}
                          className="w-full p-2 text-xs font-mono border border-gray-300 rounded-sm bg-white"
                        />
                      </div>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() =>
                      executePaymentSuccess(
                        'netbanking',
                        `Corporate Net Banking (${selectedBank} Bank)`,
                        `${selectedBank} Corporate Portal (${corporateId})`
                      )
                    }
                    className="w-full py-2.5 bg-[#0b3c68] hover:bg-[#082a4a] text-white font-bold text-xs uppercase tracking-wider rounded-sm transition-colors flex items-center justify-center gap-2"
                  >
                    <span>Authorize & Pay {formatINR(amount)} via {selectedBank}</span>
                    <ArrowRight className="w-4 h-4 text-amber-300" />
                  </button>
                </div>
              )}

              {/* TAB 4: Bank Transfer / NEFT / RTGS */}
              {activeTab === 'bank_transfer' && (
                <div className="space-y-4">
                  <div className="p-3.5 bg-sky-50 border border-sky-200 rounded-sm space-y-1">
                    <span className="text-xs font-bold text-[#0b3c68] block">
                      AIMA Virtual Dedicated Escrow Account (Instant Settlement)
                    </span>
                    <p className="text-[11px] text-gray-600">
                      Transfer fees directly using your corporate ERP / Treasury portal via NEFT, RTGS, or IMPS.
                    </p>
                  </div>

                  <div className="border border-gray-200 rounded-sm divide-y divide-gray-200 bg-white">
                    <div className="p-2.5 flex justify-between items-center">
                      <div>
                        <span className="text-[10px] font-bold text-gray-400 uppercase block">Beneficiary Name</span>
                        <span className="font-bold text-gray-900">All India Management Association</span>
                      </div>
                      <button
                        type="button"
                        onClick={() => handleCopy('All India Management Association', 'name')}
                        className="text-gray-500 hover:text-[#0b3c68] p-1 text-[11px] flex items-center gap-1"
                      >
                        {copiedField === 'name' ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                        <span>{copiedField === 'name' ? 'Copied' : 'Copy'}</span>
                      </button>
                    </div>

                    <div className="p-2.5 flex justify-between items-center">
                      <div>
                        <span className="text-[10px] font-bold text-gray-400 uppercase block">Virtual Account Number</span>
                        <span className="font-mono font-bold text-[#0b3c68] text-sm">AIMACSR20268892</span>
                      </div>
                      <button
                        type="button"
                        onClick={() => handleCopy('AIMACSR20268892', 'acc')}
                        className="text-gray-500 hover:text-[#0b3c68] p-1 text-[11px] flex items-center gap-1"
                      >
                        {copiedField === 'acc' ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                        <span>{copiedField === 'acc' ? 'Copied' : 'Copy'}</span>
                      </button>
                    </div>

                    <div className="p-2.5 flex justify-between items-center">
                      <div>
                        <span className="text-[10px] font-bold text-gray-400 uppercase block">IFSC Code</span>
                        <span className="font-mono font-bold text-gray-900">HDFC0000003</span>
                      </div>
                      <button
                        type="button"
                        onClick={() => handleCopy('HDFC0000003', 'ifsc')}
                        className="text-gray-500 hover:text-[#0b3c68] p-1 text-[11px] flex items-center gap-1"
                      >
                        {copiedField === 'ifsc' ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                        <span>{copiedField === 'ifsc' ? 'Copied' : 'Copy'}</span>
                      </button>
                    </div>

                    <div className="p-2.5 flex justify-between items-center">
                      <div>
                        <span className="text-[10px] font-bold text-gray-400 uppercase block">Bank & Branch</span>
                        <span className="text-gray-800">HDFC Bank Ltd, Lodhi Road, New Delhi</span>
                      </div>
                      <span className="text-[10px] text-gray-400 font-semibold uppercase">Current Account</span>
                    </div>
                  </div>

                  {/* UTR Input */}
                  <div className="space-y-2 pt-1">
                    <label className="block text-[11px] font-bold uppercase text-gray-700">
                      Bank Transaction / UTR Reference No.
                    </label>
                    <div className="flex flex-col sm:flex-row gap-2">
                      <input
                        type="text"
                        value={utrNumber}
                        onChange={(e) => setUtrNumber(e.target.value)}
                        placeholder="e.g. CMS2026998821"
                        className="w-full sm:grow px-3 py-2 text-xs font-mono border border-gray-300 rounded-sm focus:border-[#0b3c68] outline-none uppercase"
                      />
                      <button
                        type="button"
                        onClick={() =>
                          executePaymentSuccess(
                            'bank_transfer',
                            `RTGS / NEFT Direct Settlement (${utrNumber})`,
                            `Virtual A/C AIMACSR20268892`
                          )
                        }
                        className="w-full sm:w-auto px-4 py-2 bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs uppercase tracking-wider rounded-sm transition-colors whitespace-nowrap"
                      >
                        Simulate RTGS Confirmation
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* 3D Secure / OTP Simulation Screen */}
        {showOtpScreen && !isProcessing && (
          <div className="p-8 text-center space-y-6 max-w-md mx-auto">
            <div className="w-14 h-14 bg-sky-50 text-[#0b3c68] rounded-full flex items-center justify-center mx-auto border border-sky-200">
              <ShieldAlert className="w-7 h-7" />
            </div>

            <div className="space-y-1">
              <h3 className="text-base font-bold text-gray-900">
                3D Secure Cardholder Authentication
              </h3>
              <p className="text-xs text-gray-500">
                A one-time corporate passcode (OTP) was dispatched to the registered mobile ending in <strong>•••• 3210</strong>.
              </p>
            </div>

            <div className="space-y-3">
              <input
                type="text"
                value={otpValue}
                onChange={(e) => setOtpValue(e.target.value)}
                placeholder="Enter 6-digit OTP"
                maxLength={6}
                className="w-48 mx-auto px-4 py-2.5 text-center font-mono text-lg tracking-widest border-2 border-gray-300 focus:border-[#0b3c68] rounded-sm outline-none"
              />
              {otpError && <p className="text-xs text-red-600 font-medium">{otpError}</p>}

              <div>
                <button
                  type="button"
                  onClick={() => setOtpValue('749201')}
                  className="text-[11px] text-[#0b3c68] font-bold hover:underline"
                >
                  ⚡ Auto-fill Test OTP: <span className="font-mono">749201</span>
                </button>
              </div>
            </div>

            <div className="flex justify-center gap-3 pt-2">
              <button
                type="button"
                onClick={() => setShowOtpScreen(false)}
                className="px-4 py-2 border border-gray-300 text-gray-700 text-xs font-bold uppercase rounded-sm hover:bg-gray-50"
              >
                Back
              </button>
              <button
                type="button"
                onClick={handleVerifyOtp}
                className="px-6 py-2 bg-[#0b3c68] hover:bg-[#082a4a] text-white text-xs font-bold uppercase tracking-wider rounded-sm transition-colors shadow-xs"
              >
                Submit & Authorize {formatINR(amount)}
              </button>
            </div>
          </div>
        )}

        {/* Processing State Overlay */}
        {isProcessing && (
          <div className="p-12 text-center space-y-6">
            <div className="w-16 h-16 rounded-full bg-sky-50 border-2 border-[#0b3c68]/20 flex items-center justify-center mx-auto">
              <Loader2 className="w-8 h-8 text-[#0b3c68] animate-spin" />
            </div>

            <div className="space-y-2">
              <h3 className="text-lg font-bold text-gray-900">
                Processing Secure Transaction...
              </h3>
              <p className="text-xs font-medium text-gray-500">
                Please do not close or navigate away from this window.
              </p>
              <p className="text-sm font-extrabold text-[#0b3c68] pt-1 font-mono">
                {processingStep}
              </p>
            </div>
          </div>
        )}

        {/* Footer Security Strip */}
        <div className="bg-[#fafcff] px-5 py-2.5 border-t border-gray-200 flex justify-between items-center text-[10px] text-gray-500">
          <div className="flex items-center gap-2">
            <Lock className="w-3 h-3 text-emerald-600" />
            <span>End-to-End Encrypted Settlement Interface</span>
          </div>
          <span className="font-mono">Merchant ID: AIMA_ND_0921</span>
        </div>
      </div>
    </div>
  );
};
