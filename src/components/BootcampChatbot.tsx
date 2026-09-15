import React, { useState, useEffect, useRef } from 'react';
import {
  MessageSquare,
  X,
  Send,
  Sparkles,
  Bot,
  User,
  RotateCcw,
  ChevronDown,
  Copy,
  Check,
  Building2,
  Award,
  HelpCircle,
  Clock,
  ArrowRight,
  ShieldCheck,
  ExternalLink
} from 'lucide-react';

interface ChatMessage {
  id: string;
  sender: 'bot' | 'user';
  text: string;
  timestamp: string;
  suggestedFollowUps?: string[];
}

const PREFILLED_PROMPTS = [
  '📋 What is the fee structure and member discount?',
  '🎯 Who should attend and what is the eligibility?',
  '📚 What topics and curriculum are covered in the 4 weeks?',
  '🏆 What certification will nominated executives receive?',
  '👥 How do we register multiple corporate delegates?',
  '💳 What payment options and PO invoicing are supported?',
  '🏛️ Is AIMA an accredited national management body?',
  '📍 What are the workshop dates, timings, and venue?',
];

// Knowledge base for answering bootcamp-related questions
function findBootcampAnswer(query: string): { text: string; followUps: string[] } {
  const q = query.toLowerCase();

  if (q.includes('fee') || q.includes('cost') || q.includes('price') || q.includes('discount') || q.includes('charges') || q.includes('rate')) {
    return {
      text: `**AIMA Certified CSR Leader Bootcamp Fee Structure:**\n\n• **Standard Corporate Delegate Fee:** ₹25,000 + 18% GST (Total: ₹29,500 per participant)\n• **AIMA Institutional Member Fee:** ₹22,500 + 18% GST (10% Discount applied | Total: ₹26,550 per participant)\n\n*Note:* The fee includes all executive courseware, masterclass toolkits, live mentor sessions, case studies, assessment evaluation, and the official AIMA Certificate.`,
      followUps: [
        '💳 What payment options and PO invoicing are supported?',
        '👥 How do we register multiple corporate delegates?',
        '🏆 What certification will nominated executives receive?'
      ]
    };
  }

  if (q.includes('who') || q.includes('eligib') || q.includes('target') || q.includes('attend') || q.includes('profile')) {
    return {
      text: `**Target Audience & Eligibility:**\n\nThis executive bootcamp is designed for:\n1. **CSR Directors, Heads & Officers** driving corporate social responsibility programmes.\n2. **ESG Leaders & Chief Sustainability Officers** aligning social capital with BRSR disclosures.\n3. **CSR Committee Board Members & Trustees** overseeing compliance under Section 135.\n4. **Public Sector Undertaking (PSU/PSE) CSR Teams** executing high-impact community schemes.\n5. **Corporate Foundation Leaders & Senior NGO Partners** seeking corporate CSR alignment.`,
      followUps: [
        '📚 What topics and curriculum are covered in the 4 weeks?',
        '🏆 What certification will nominated executives receive?',
        '📋 What is the fee structure and member discount?'
      ]
    };
  }

  if (q.includes('topic') || q.includes('curriculum') || q.includes('syllabus') || q.includes('learn') || q.includes('module') || q.includes('content') || q.includes('week')) {
    return {
      text: `**4-Week Executive Curriculum Highlights:**\n\n• **Module 1: Statutory Foundations & Section 135:** Companies Act 2013, Schedule VII mandate, CSR Rules amendments, and board governance.\n• **Module 2: CSR Strategy & Partner Due Diligence:** Designing high-impact theories of change, RFP evaluations, and NGO credibility vetting.\n• **Module 3: Impact Assessment & SROI:** Social Return on Investment (SROI) methodologies, baseline studies, and statutory MCA Impact Audits.\n• **Module 4: BRSR & ESG Integration:** Linking CSR outcomes with SEBI BRSR Core disclosures, GRI standards, and global ESG frameworks.\n• **Action Project:** Formulation of a **12-Month Actionable CSR Project Blueprint** for your organisation.`,
      followUps: [
        '🏆 What certification will nominated executives receive?',
        '📍 What are the workshop dates, timings, and venue?',
        '🎯 Who should attend and what is the eligibility?'
      ]
    };
  }

  if (q.includes('certif') || q.includes('credential') || q.includes('recogni') || q.includes('award') || q.includes('badge')) {
    return {
      text: `**AIMA Executive Certification:**\n\nUpon successful completion of the masterclasses and submission of the 12-Month CSR Action Blueprint, nominated executives are awarded the prestigious:\n\n**"AIMA Certified CSR Leader"** executive credential.\n\n• Issued by the **All India Management Association (AIMA)** in knowledge collaboration with Sustainable Advancements.\n• Features official digital verification credentials and permanent inclusion in the **AIMA National Executive Registry**.`,
      followUps: [
        '🏛️ Is AIMA an accredited national management body?',
        '📚 What topics and curriculum are covered in the 4 weeks?',
        '📋 What is the fee structure and member discount?'
      ]
    };
  }

  if (q.includes('multi') || q.includes('delegate') || q.includes('bulk') || q.includes('team') || q.includes('register') || q.includes('nominate')) {
    return {
      text: `**Registering Multiple Delegates:**\n\nOrganizations can nominate multiple executives under a single corporate application:\n1. In **Section 03 (Nominees)**, click **"+ Add Another Nominee"** to register 2, 3, 5, or more delegates.\n2. The system automatically updates the batch delegate roster and computes the collective base fee and 18% GST.\n3. A single consolidated tax invoice / receipt is generated for your finance and procurement department.`,
      followUps: [
        '📋 What is the fee structure and member discount?',
        '💳 What payment options and PO invoicing are supported?',
        '📍 What are the workshop dates, timings, and venue?'
      ]
    };
  }

  if (q.includes('pay') || q.includes('invoice') || q.includes('po') || q.includes('proforma') || q.includes('gateway') || q.includes('bank') || q.includes('upi') || q.includes('card') || q.includes('rtgs')) {
    return {
      text: `**Corporate Payment & Settlement Options:**\n\n1. **Pay Online Instantly:**\n   • Corporate UPI & QR Code (Google Pay, PhonePe, Paytm, CRED)\n   • Commercial / Corporate Credit & Debit Cards (Visa, Mastercard, RuPay)\n   • Corporate Net Banking (All major nationalized & private banks)\n   • Dedicated AIMA Escrow Virtual Account via NEFT/RTGS (IFSC: HDFC0000003)\n\n2. **Pay Later / Proforma Invoice:**\n   • Select "Pay Later" during nomination to receive an official AIMA Proforma Tax Invoice with 30-day corporate payment credit against your internal Purchase Order (PO) number.`,
      followUps: [
        '📋 What is the fee structure and member discount?',
        '👥 How do we register multiple corporate delegates?',
        '🏛️ Is AIMA an accredited national management body?'
      ]
    };
  }

  if (q.includes('aima') || q.includes('aicte') || q.includes('about') || q.includes('organis') || q.includes('body') || q.includes('legacy') || q.includes('70')) {
    return {
      text: `**About AIMA (All India Management Association):**\n\n• Established in **1957**, AIMA is the apex national body for management in India, representing over 38,000 corporate members and 68 Local Management Associations.\n• AIMA works actively with the Government of India, industry leaders, and academic councils to advance executive management standards and corporate governance.\n• **SAC Code:** 999293 | **GSTIN:** 07AAATA0892B1Z6\n• **Headquarters:** Management House, 14 Institutional Area, Lodhi Road, New Delhi 110003.`,
      followUps: [
        '🏆 What certification will nominated executives receive?',
        '📚 What topics and curriculum are covered in the 4 weeks?',
        '📋 What is the fee structure and member discount?'
      ]
    };
  }

  if (q.includes('date') || q.includes('time') || q.includes('when') || q.includes('venue') || q.includes('format') || q.includes('schedule') || q.includes('hybrid') || q.includes('location')) {
    return {
      text: `**Schedule, Dates & Format:**\n\n• **Delivery Format:** Executive Hybrid Model (Interactive Weekend Online Masterclasses + Delhi On-Campus Immersion)\n• **Cohort Start:** Upcoming Cohort starts this quarter (Rolling monthly admissions).\n• **Weekend Live Masterclasses:** Saturdays & Sundays (10:00 AM – 1:00 PM IST)\n• **In-Person Venue:** AIMA Management House, 14 Institutional Area, Lodhi Road, New Delhi – 110003.\n• All sessions include high-definition recordings and LMS access for 12 months.`,
      followUps: [
        '📚 What topics and curriculum are covered in the 4 weeks?',
        '🎯 Who should attend and what is the eligibility?',
        '📋 What is the fee structure and member discount?'
      ]
    };
  }

  if (q.includes('contact') || q.includes('help') || q.includes('support') || q.includes('email') || q.includes('phone') || q.includes('call')) {
    return {
      text: `**AIMA Executive Support Directorate:**\n\n• **Official Email:** csrbootcamp@aima.in\n• **Direct Telephone:** +91-11-24645100 / +91-11-43128100\n• **Programme Director Desk:** Management House, 14 Institutional Area, Lodhi Road, New Delhi 110003\n• **Website:** https://www.aima.in`,
      followUps: [
        '📋 What is the fee structure and member discount?',
        '📚 What topics and curriculum are covered in the 4 weeks?',
        '💳 What payment options and PO invoicing are supported?'
      ]
    };
  }

  // Generic fallback with helpful options
  return {
    text: `Thank you for inquiring about the **AIMA Certified CSR Leader Bootcamp**.\n\nThis 4-week executive masterclass equips corporate leaders with end-to-end statutory mastery of Section 135 (Companies Act 2013), Impact Assessment & SROI frameworks, and BRSR/ESG alignment.\n\nHow else can I assist your nomination process today?`,
    followUps: [
      '📋 What is the fee structure and member discount?',
      '🎯 Who should attend and what is the eligibility?',
      '📚 What topics and curriculum are covered in the 4 weeks?',
      '💳 What payment options and PO invoicing are supported?'
    ]
  };
}

export const BootcampChatbot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome-1',
      sender: 'bot',
      text: 'Namaste! Welcome to the **AIMA Certified CSR Leader Bootcamp** Advisor. How can I help you or your sponsoring organisation today?',
      timestamp: 'Just now',
      suggestedFollowUps: [
        '📋 What is the fee structure and member discount?',
        '🎯 Who should attend and what is the eligibility?',
        '📚 What topics and curriculum are covered in the 4 weeks?',
        '💳 What payment options and PO invoicing are supported?',
      ],
    },
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const chatEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
      inputRef.current?.focus();
    }
  }, [isOpen, messages, isTyping]);

  const handleSendMessage = (textToSend?: string) => {
    const text = (textToSend || inputValue).trim();
    if (!text) return;

    const userMsgId = `user-${Date.now()}`;
    const userMsg: ChatMessage = {
      id: userMsgId,
      sender: 'user',
      text,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputValue('');
    setIsTyping(true);

    // Simulate smart AI response delay
    setTimeout(() => {
      const responseData = findBootcampAnswer(text);
      const botMsgId = `bot-${Date.now()}`;
      const botMsg: ChatMessage = {
        id: botMsgId,
        sender: 'bot',
        text: responseData.text,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        suggestedFollowUps: responseData.followUps,
      };

      setMessages((prev) => [...prev, botMsg]);
      setIsTyping(false);
    }, 600);
  };

  const handleClearChat = () => {
    setMessages([
      {
        id: `welcome-${Date.now()}`,
        sender: 'bot',
        text: 'Chat history cleared. What questions can I answer about the AIMA Certified CSR Leader Bootcamp?',
        timestamp: 'Just now',
        suggestedFollowUps: [
          '📋 What is the fee structure and member discount?',
          '🎯 Who should attend and what is the eligibility?',
          '📚 What topics and curriculum are covered in the 4 weeks?',
          '🏆 What certification will nominated executives receive?',
        ],
      },
    ]);
  };

  const handleCopyText = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  // Render text with basic markdown bold / bullet formatting
  const formatBotMessage = (text: string) => {
    const lines = text.split('\n');
    return lines.map((line, idx) => {
      if (line.startsWith('**') && line.endsWith('**')) {
        return (
          <p key={idx} className="font-extrabold text-[#0b3c68] text-xs mt-1 mb-0.5">
            {line.replace(/\*\*/g, '')}
          </p>
        );
      }
      if (line.startsWith('• ') || line.startsWith('- ')) {
        const parts = line.substring(2).split('**');
        return (
          <div key={idx} className="flex items-start gap-1.5 ml-1 my-0.5 text-xs text-gray-700">
            <span className="text-[#0b3c68] font-bold text-xs mt-0.5">•</span>
            <span>
              {parts.map((part, pIdx) =>
                pIdx % 2 === 1 ? <strong key={pIdx} className="text-gray-900 font-bold">{part}</strong> : part
              )}
            </span>
          </div>
        );
      }
      if (line.trim() === '') {
        return <div key={idx} className="h-1.5" />;
      }
      // General line with inline bolding
      const parts = line.split('**');
      return (
        <p key={idx} className="text-xs text-gray-700 leading-relaxed my-0.5">
          {parts.map((part, pIdx) =>
            pIdx % 2 === 1 ? <strong key={pIdx} className="text-gray-900 font-bold">{part}</strong> : part
          )}
        </p>
      );
    });
  };

  return (
    <>
      {/* Floating Launcher Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-5 right-5 z-40 bg-[#0b3c68] hover:bg-[#072847] text-white p-3.5 sm:px-4 sm:py-3 rounded-full shadow-2xl flex items-center gap-2.5 transition-all transform hover:scale-105 border-2 border-white cursor-pointer group"
          aria-label="Open AIMA CSR Bootcamp Assistant"
        >
          <div className="relative">
            <Bot className="w-5 h-5 text-amber-300" />
            <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-emerald-400 rounded-full border-2 border-[#0b3c68] animate-pulse"></span>
          </div>
          <div className="hidden sm:flex flex-col text-left">
            <span className="text-xs font-black tracking-wider uppercase leading-none">
              AIMA CSR Advisor
            </span>
            <span className="text-[10px] text-sky-200 font-normal">Ask Bootcamp Questions</span>
          </div>
          <span className="bg-amber-400 text-slate-900 text-[10px] font-black px-1.5 py-0.5 rounded-full uppercase tracking-tighter">
            AI Help
          </span>
        </button>
      )}

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50 w-[92vw] sm:w-[420px] h-[560px] max-h-[85vh] bg-white rounded-lg shadow-2xl border border-gray-300 flex flex-col overflow-hidden animate-in fade-in slide-in-from-bottom-6 duration-200">
          {/* Header */}
          <div className="bg-[#0b3c68] text-white px-4 py-3 flex items-center justify-between shadow-xs shrink-0">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-amber-300 border border-white/20">
                <Bot className="w-4 h-4" />
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <h3 className="text-xs font-black uppercase tracking-wider">AIMA CSR Advisor</h3>
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" title="Online"></span>
                </div>
                <p className="text-[10px] text-sky-200">Executive Bootcamp Intelligent Guide</p>
              </div>
            </div>

            <div className="flex items-center gap-1">
              <button
                onClick={handleClearChat}
                title="Reset conversation"
                className="p-1.5 text-gray-300 hover:text-white rounded hover:bg-white/10 transition-colors"
              >
                <RotateCcw className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={() => setIsOpen(false)}
                title="Close chat"
                className="p-1.5 text-gray-300 hover:text-white rounded hover:bg-white/10 transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Quick Prompts Strip (Collapsible / Scrollable) */}
          <div className="bg-sky-50/80 border-b border-sky-100 px-3 py-2 shrink-0">
            <div className="flex items-center gap-1 text-[10px] font-bold text-[#0b3c68] uppercase tracking-wider mb-1.5">
              <Sparkles className="w-3 h-3 text-amber-500" />
              <span>Suggested Quick Questions</span>
            </div>
            <div className="flex gap-1.5 overflow-x-auto pb-1 no-scrollbar">
              {PREFILLED_PROMPTS.slice(0, 4).map((prompt, idx) => (
                <button
                  key={idx}
                  onClick={() => handleSendMessage(prompt)}
                  className="px-2.5 py-1 bg-white hover:bg-sky-100 text-[#0b3c68] border border-sky-200 rounded text-[11px] font-medium whitespace-nowrap transition-colors shadow-2xs shrink-0 text-left"
                >
                  {prompt}
                </button>
              ))}
            </div>
          </div>

          {/* Messages Area */}
          <div className="flex-1 p-4 overflow-y-auto space-y-3.5 bg-gray-50/50">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex gap-2.5 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                {msg.sender === 'bot' && (
                  <div className="w-6 h-6 rounded-full bg-[#0b3c68] text-white flex items-center justify-center shrink-0 mt-1">
                    <Bot className="w-3.5 h-3.5 text-amber-300" />
                  </div>
                )}

                <div
                  className={`max-w-[85%] rounded-lg p-3 text-xs relative group ${
                    msg.sender === 'user'
                      ? 'bg-[#0b3c68] text-white rounded-br-none shadow-xs'
                      : 'bg-white text-gray-800 border border-gray-200 rounded-bl-none shadow-xs'
                  }`}
                >
                  {msg.sender === 'user' ? (
                    <p className="leading-relaxed whitespace-pre-wrap">{msg.text}</p>
                  ) : (
                    <div>{formatBotMessage(msg.text)}</div>
                  )}

                  {/* Timestamp & Copy Button */}
                  <div
                    className={`flex items-center justify-between gap-2 mt-1.5 pt-1 text-[9px] ${
                      msg.sender === 'user' ? 'text-sky-200 border-t border-white/10' : 'text-gray-400 border-t border-gray-100'
                    }`}
                  >
                    <span>{msg.timestamp}</span>
                    {msg.sender === 'bot' && (
                      <button
                        onClick={() => handleCopyText(msg.text, msg.id)}
                        className="opacity-0 group-hover:opacity-100 text-gray-500 hover:text-[#0b3c68] transition-opacity flex items-center gap-1"
                        title="Copy answer"
                      >
                        {copiedId === msg.id ? (
                          <Check className="w-3 h-3 text-emerald-600" />
                        ) : (
                          <Copy className="w-3 h-3" />
                        )}
                        <span>{copiedId === msg.id ? 'Copied' : 'Copy'}</span>
                      </button>
                    )}
                  </div>

                  {/* Follow-up Question Chips for Bot responses */}
                  {msg.suggestedFollowUps && msg.suggestedFollowUps.length > 0 && (
                    <div className="mt-2.5 pt-2 border-t border-gray-100 space-y-1">
                      <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block">
                        Related Follow-ups:
                      </span>
                      <div className="flex flex-col gap-1">
                        {msg.suggestedFollowUps.map((followUp, fIdx) => (
                          <button
                            key={fIdx}
                            onClick={() => handleSendMessage(followUp)}
                            className="text-left text-[11px] text-[#0b3c68] hover:text-[#072847] bg-sky-50 hover:bg-sky-100 px-2 py-1 rounded border border-sky-100 font-medium transition-colors flex items-center justify-between"
                          >
                            <span>{followUp}</span>
                            <ArrowRight className="w-3 h-3 shrink-0 text-sky-600" />
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                {msg.sender === 'user' && (
                  <div className="w-6 h-6 rounded-full bg-amber-500 text-slate-900 flex items-center justify-center shrink-0 mt-1 font-bold text-[10px]">
                    <User className="w-3.5 h-3.5 text-white" />
                  </div>
                )}
              </div>
            ))}

            {/* Typing Animation */}
            {isTyping && (
              <div className="flex gap-2.5 items-center">
                <div className="w-6 h-6 rounded-full bg-[#0b3c68] text-white flex items-center justify-center shrink-0">
                  <Bot className="w-3.5 h-3.5 text-amber-300" />
                </div>
                <div className="bg-white border border-gray-200 rounded-lg p-3 shadow-xs flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 bg-[#0b3c68] rounded-full animate-bounce"></span>
                  <span className="w-1.5 h-1.5 bg-[#0b3c68] rounded-full animate-bounce [animation-delay:0.2s]"></span>
                  <span className="w-1.5 h-1.5 bg-[#0b3c68] rounded-full animate-bounce [animation-delay:0.4s]"></span>
                  <span className="text-[10px] font-medium text-gray-500 ml-1">Advisor is thinking...</span>
                </div>
              </div>
            )}

            <div ref={chatEndRef} />
          </div>

          {/* Footer Input Area */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSendMessage();
            }}
            className="p-3 bg-white border-t border-gray-200 shrink-0"
          >
            <div className="flex gap-2 items-center">
              <input
                ref={inputRef}
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Ask anything about fees, syllabus, dates, or certification..."
                className="flex-1 px-3 py-2 text-xs border border-gray-300 rounded-sm focus:border-[#0b3c68] focus:ring-1 focus:ring-[#0b3c68] outline-none"
              />
              <button
                type="submit"
                disabled={!inputValue.trim() || isTyping}
                className="px-3.5 py-2 bg-[#0b3c68] hover:bg-[#072847] disabled:bg-gray-300 text-white rounded-sm transition-colors flex items-center justify-center cursor-pointer disabled:cursor-not-allowed shadow-xs"
                title="Send Message"
              >
                <Send className="w-3.5 h-3.5 text-amber-300" />
              </button>
            </div>
            <div className="flex justify-between items-center mt-1.5 text-[9px] text-gray-400">
              <span>All India Management Association • Official Advisory</span>
              <span>24/7 Executive Query Desk</span>
            </div>
          </form>
        </div>
      )}
    </>
  );
};
