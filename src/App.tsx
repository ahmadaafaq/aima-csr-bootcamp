import React, { useState, useRef } from 'react';
import { FormData, PaymentDetails, INITIAL_FORM_DATA, calculateFee } from './types';
import { Header } from './components/Header';
import { HeroBanner } from './components/HeroBanner';
import { ProgressIndicator } from './components/ProgressIndicator';
import { SectionOrgDetails } from './components/SectionOrgDetails';
import { SectionCsrProfile } from './components/SectionCsrProfile';
import { SectionNominees } from './components/SectionNominees';
import { SectionParticipationFee } from './components/SectionParticipationFee';
import { SectionBilling } from './components/SectionBilling';
import { SectionAuthorisation } from './components/SectionAuthorisation';
import { SectionReview } from './components/SectionReview';
import { PaymentGatewayModal } from './components/PaymentGatewayModal';
import { PrintReceiptModal } from './components/PrintReceiptModal';
import { SuccessScreen } from './components/SuccessScreen';
import { EmailPreviewModal } from './components/EmailPreviewModal';
import { KeyInfoModal, BrochureModal, EnquireModal } from './components/InfoModals';
import { BootcampChatbot } from './components/BootcampChatbot';
import { Footer } from './components/Footer';

export default function App() {
  const [formData, setFormData] = useState<FormData>(INITIAL_FORM_DATA);
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);
  const [errors, setErrors] = useState<Record<string, string>>({});

  // Submission & Dialog States
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [isPaymentGatewayOpen, setIsPaymentGatewayOpen] = useState<boolean>(false);
  const [paymentDetails, setPaymentDetails] = useState<PaymentDetails | null>(null);
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const [referenceNumber, setReferenceNumber] = useState<string>('AIMA-CSR-2026-8942');
  const [paymentStatus, setPaymentStatus] = useState<'Paid' | 'Pending / Pay Later'>('Paid');

  // Modal States
  const [isPrintReceiptOpen, setIsPrintReceiptOpen] = useState<boolean>(false);
  const [isEmailPreviewOpen, setIsEmailPreviewOpen] = useState<boolean>(false);
  const [isKeyInfoOpen, setIsKeyInfoOpen] = useState<boolean>(false);
  const [isBrochureOpen, setIsBrochureOpen] = useState<boolean>(false);
  const [isEnquireOpen, setIsEnquireOpen] = useState<boolean>(false);

  const formTopRef = useRef<HTMLDivElement>(null);

  const scrollToForm = () => {
    if (formTopRef.current) {
      formTopRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleFieldChange = (field: keyof FormData, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    // Clear field error on change
    if (errors[field as string]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[field as string];
        return next;
      });
    }
  };

  const handleResetToMock = () => {
    setFormData({ ...INITIAL_FORM_DATA });
    setErrors({});
  };

  // Validation routines per step
  const validateStep = (step: number): boolean => {
    const newErrors: Record<string, string> = {};

    if (step === 1) {
      if (!formData.orgName.trim()) {
        newErrors.orgName = 'Please enter the organisation name.';
      }
      if (!formData.authName.trim()) {
        newErrors.authName = 'Please enter the sponsoring authority name.';
      }
      if (!formData.authDesignation.trim()) {
        newErrors.authDesignation = 'Please enter the authority designation.';
      }
      if (!formData.authEmail.trim() || !formData.authEmail.includes('@')) {
        newErrors.authEmail = 'Please enter a valid corporate email address.';
      }
      if (!formData.authMobile.trim() || formData.authMobile.trim().length < 10) {
        newErrors.authMobile = 'Please enter a valid 10-digit mobile number.';
      }
    } else if (step === 2) {
      if (!formData.annualBudgetSlab) {
        newErrors.annualBudgetSlab = 'Please select an annual CSR budget slab.';
      }
      if (!formData.focusAreas || formData.focusAreas.length === 0) {
        newErrors.focusAreas = 'Please select at least one Schedule VII focus area.';
      }
    } else if (step === 3) {
      if (!formData.nominees || formData.nominees.length === 0) {
        newErrors.nominees = 'Please add at least one nominee.';
      } else {
        formData.nominees.forEach((nom, index) => {
          if (!nom.name.trim()) {
            newErrors[`nominee_${index}_name`] = 'Please enter nominee full name.';
          }
          if (!nom.designation.trim()) {
            newErrors[`nominee_${index}_designation`] = 'Please enter functional designation.';
          }
          if (!nom.email.trim() || !nom.email.includes('@')) {
            newErrors[`nominee_${index}_email`] = 'Please enter a valid corporate email.';
          }
          if (!nom.mobile.trim() || nom.mobile.trim().length < 10) {
            newErrors[`nominee_${index}_mobile`] = 'Please enter a valid 10-digit mobile.';
          }
        });
      }
    } else if (step === 5) {
      if (!formData.billingOrgName.trim()) {
        newErrors.billingOrgName = 'Please enter the invoicing legal entity name.';
      }
      if (!formData.billingAddress.trim()) {
        newErrors.billingAddress = 'Please enter the registered billing address.';
      }
      if (!formData.billingState) {
        newErrors.billingState = 'Please select the state / jurisdiction.';
      }
      if (!formData.billingPinCode.trim() || formData.billingPinCode.trim().length < 6) {
        newErrors.billingPinCode = 'Please enter a valid 6-digit PIN code.';
      }
      if (!formData.billingGstin.trim()) {
        newErrors.billingGstin = 'Please enter a valid GSTIN.';
      }
      if (!formData.billingContactPerson.trim()) {
        newErrors.billingContactPerson = 'Please enter the accounts contact person.';
      }
      if (!formData.billingEmail.trim() || !formData.billingEmail.includes('@')) {
        newErrors.billingEmail = 'Please enter a valid billing email address.';
      }
      if (!formData.billingMobile.trim() || formData.billingMobile.trim().length < 10) {
        newErrors.billingMobile = 'Please enter a valid 10-digit billing mobile number.';
      }
    } else if (step === 6) {
      if (!formData.execName.trim()) {
        newErrors.execName = 'Please enter sponsoring executive name.';
      }
      if (!formData.execDesignation.trim()) {
        newErrors.execDesignation = 'Please enter executive designation.';
      }
      if (!formData.isAuthorized) {
        newErrors.isAuthorized = 'Please accept the authorisation declaration to proceed.';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNextStep = (targetStep?: number) => {
    const next = targetStep || currentStep + 1;
    if (validateStep(currentStep)) {
      if (!completedSteps.includes(currentStep)) {
        setCompletedSteps((prev) => [...prev, currentStep]);
      }
      setCurrentStep(next);
      scrollToForm();
    }
  };

  const handlePrevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
      scrollToForm();
    }
  };

  const handleStepJump = (step: number) => {
    setCurrentStep(step);
    scrollToForm();
  };

  // Final Submission Workflow
  const handleSubmitNomination = () => {
    // Validate all sections
    for (let s = 1; s <= 6; s++) {
      if (!validateStep(s)) {
        setCurrentStep(s);
        scrollToForm();
        return;
      }
    }

    if (formData.paymentPreference === 'pay_now') {
      // Open comprehensive payment gateway simulation
      setIsPaymentGatewayOpen(true);
    } else {
      // Pay Later / Invoice flow
      setIsSubmitting(true);
      setTimeout(() => {
        setIsSubmitting(false);
        const newRef = `AIMA-CSR-2026-${Math.floor(1000 + Math.random() * 9000)}`;
        setReferenceNumber(newRef);
        setPaymentStatus('Pending / Pay Later');
        setPaymentDetails(null);
        setIsSubmitted(true);
        scrollToForm();
      }, 700);
    }
  };

  const handlePaymentSuccess = (details: PaymentDetails) => {
    setIsPaymentGatewayOpen(false);
    setIsSubmitting(false);
    setPaymentDetails(details);
    const newRef = `AIMA-CSR-2026-${Math.floor(1000 + Math.random() * 9000)}`;
    setReferenceNumber(newRef);
    setPaymentStatus('Paid');
    setIsSubmitted(true);
    scrollToForm();
  };

  const handleResetRegistration = () => {
    setIsSubmitted(false);
    setPaymentDetails(null);
    setCurrentStep(1);
    setCompletedSteps([]);
    scrollToForm();
  };

  const feeCalc = calculateFee(formData.nominees.length, formData.isAimaMember);

  return (
    <div className="min-h-screen bg-[#f4f6f9] flex flex-col font-['Open_Sans',sans-serif]">
      {/* Top Corporate Navigation */}
      <Header onOpenEnquire={() => setIsEnquireOpen(true)} />

      {/* Hero Banner with Key Program Info */}
      <HeroBanner
        onScrollToForm={scrollToForm}
        onOpenBrochureModal={() => setIsBrochureOpen(true)}
        onOpenKeyInfoModal={() => setIsKeyInfoOpen(true)}
      />

      {/* Main Registration Area */}
      <main className="grow max-w-5xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8" ref={formTopRef}>
        {!isSubmitted ? (
          <div>
            {/* Progress Bar & Stepper */}
            <ProgressIndicator
              currentStep={currentStep}
              completedSteps={completedSteps}
              onSelectStep={handleStepJump}
            />

            {/* Active Step Content */}
            {currentStep === 1 && (
              <SectionOrgDetails
                formData={formData}
                onChange={handleFieldChange}
                onNext={() => handleNextStep(2)}
                onResetToMock={handleResetToMock}
                errors={errors}
              />
            )}

            {currentStep === 2 && (
              <SectionCsrProfile
                formData={formData}
                onChange={handleFieldChange}
                onNext={() => handleNextStep(3)}
                onPrev={handlePrevStep}
                errors={errors}
              />
            )}

            {currentStep === 3 && (
              <SectionNominees
                formData={formData}
                onChange={handleFieldChange}
                onNext={() => handleNextStep(4)}
                onPrev={handlePrevStep}
                errors={errors}
              />
            )}

            {currentStep === 4 && (
              <SectionParticipationFee
                formData={formData}
                onChange={handleFieldChange}
                onNext={() => handleNextStep(5)}
                onPrev={handlePrevStep}
              />
            )}

            {currentStep === 5 && (
              <SectionBilling
                formData={formData}
                onChange={handleFieldChange}
                onNext={() => handleNextStep(6)}
                onPrev={handlePrevStep}
                errors={errors}
                onOpenPaymentGateway={() => setIsPaymentGatewayOpen(true)}
              />
            )}

            {currentStep === 6 && (
              <SectionAuthorisation
                formData={formData}
                onChange={handleFieldChange}
                onNext={() => handleNextStep(7)}
                onPrev={handlePrevStep}
                errors={errors}
              />
            )}

            {currentStep === 7 && (
              <SectionReview
                formData={formData}
                onEditSection={(step) => handleStepJump(step)}
                onPrev={handlePrevStep}
                onSubmit={handleSubmitNomination}
                isSubmitting={isSubmitting}
              />
            )}
          </div>
        ) : (
          <SuccessScreen
            formData={formData}
            referenceNumber={referenceNumber}
            paymentStatus={paymentStatus}
            paymentDetails={paymentDetails}
            onReset={handleResetRegistration}
            onOpenEmailPreview={() => setIsEmailPreviewOpen(true)}
            onOpenPrintModal={() => setIsPrintReceiptOpen(true)}
          />
        )}
      </main>

      {/* Simulated Payment Gateway Dialog with UPI, Card, NetBanking & Bank Transfer */}
      {isPaymentGatewayOpen && (
        <PaymentGatewayModal
          amount={feeCalc.totalPayable}
          orgName={formData.orgName}
          referenceNumber={referenceNumber}
          onSuccess={handlePaymentSuccess}
          onClose={() => setIsPaymentGatewayOpen(false)}
        />
      )}

      {/* Printable Receipt & Document Viewer Modal */}
      <PrintReceiptModal
        isOpen={isPrintReceiptOpen}
        onClose={() => setIsPrintReceiptOpen(false)}
        formData={formData}
        referenceNumber={referenceNumber}
        paymentDetails={paymentDetails}
      />

      {/* Mock Email Preview Modal */}
      <EmailPreviewModal
        isOpen={isEmailPreviewOpen}
        onClose={() => setIsEmailPreviewOpen(false)}
        formData={formData}
        referenceNumber={referenceNumber}
        paymentStatus={paymentStatus}
      />

      {/* Information & Action Modals */}
      <KeyInfoModal isOpen={isKeyInfoOpen} onClose={() => setIsKeyInfoOpen(false)} />
      <BrochureModal isOpen={isBrochureOpen} onClose={() => setIsBrochureOpen(false)} />
      <EnquireModal isOpen={isEnquireOpen} onClose={() => setIsEnquireOpen(false)} />

      {/* Interactive Bootcamp Advisory Chatbot with Pre-filled Prompts */}
      <BootcampChatbot />

      {/* Official AIMA Footer */}
      <Footer />
    </div>
  );
}
