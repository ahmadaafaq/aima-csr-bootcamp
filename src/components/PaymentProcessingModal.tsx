import React, { useEffect, useState } from 'react';
import { Loader2, ShieldCheck, Lock, CheckCircle2 } from 'lucide-react';
import { formatINR } from '../types';

interface PaymentProcessingModalProps {
  amount: number;
  onComplete: () => void;
}

export const PaymentProcessingModal: React.FC<PaymentProcessingModalProps> = ({
  amount,
  onComplete,
}) => {
  const [progress, setProgress] = useState(15);
  const [stageText, setStageText] = useState('Connecting to Secure Gateway...');

  useEffect(() => {
    const timer1 = setTimeout(() => {
      setProgress(50);
      setStageText('Verifying Corporate Authorization & SAC Code...');
    }, 700);

    const timer2 = setTimeout(() => {
      setProgress(85);
      setStageText('Processing Payment Transaction...');
    }, 1400);

    const timer3 = setTimeout(() => {
      setProgress(100);
      setStageText('Payment Approved! Finalising Registration...');
    }, 2100);

    const timer4 = setTimeout(() => {
      onComplete();
    }, 2700);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
      clearTimeout(timer4);
    };
  }, [onComplete]);

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white max-w-md w-full rounded-sm shadow-2xl border border-gray-200 overflow-hidden text-center">
        {/* Modal Top Strip */}
        <div className="bg-[#0b3c68] text-white py-3 px-6 flex items-center justify-between">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider">
            <Lock className="w-3.5 h-3.5 text-amber-300" />
            <span>AIMA Secure Payment Gateway (Demo)</span>
          </div>
          <span className="text-[10px] bg-white/20 px-2 py-0.5 rounded font-mono">
            256-Bit SSL
          </span>
        </div>

        <div className="p-8 space-y-6">
          <div className="relative flex items-center justify-center">
            <div className="w-20 h-20 rounded-full bg-sky-50 border-2 border-[#0b3c68]/20 flex items-center justify-center">
              <Loader2 className="w-10 h-10 text-[#0b3c68] animate-spin" />
            </div>
          </div>

          <div className="space-y-2">
            <h3 className="text-lg font-bold text-gray-900">
              Processing Payment...
            </h3>
            <p className="text-xs text-gray-500 font-medium">
              Please do not refresh or close this window.
            </p>
            <div className="text-xl font-extrabold text-[#0b3c68] pt-1">
              {formatINR(amount)}
            </div>
          </div>

          {/* Progress bar */}
          <div className="space-y-2">
            <div className="w-full bg-gray-200 h-2 rounded-full overflow-hidden">
              <div
                className="bg-[#0b3c68] h-full transition-all duration-500 ease-out"
                style={{ width: `${progress}%` }}
              />
            </div>
            <p className="text-[11px] text-gray-600 font-medium tracking-wide">
              {stageText}
            </p>
          </div>

          <div className="pt-4 border-t border-gray-100 flex items-center justify-center gap-2 text-[11px] text-gray-400">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span>Encrypted Corporate Settlement Simulator</span>
          </div>
        </div>
      </div>
    </div>
  );
};
