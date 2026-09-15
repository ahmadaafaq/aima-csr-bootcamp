import React from 'react';
import { MapPin, Phone, Mail, Globe, Shield, Award, ExternalLink } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="w-full bg-[#071d31] text-gray-300 border-t-4 border-[#0b3c68] mt-16 text-xs">
      {/* Main Footer Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 sm:gap-10">
          {/* Col 1: About AIMA */}
          <div className="space-y-3 md:col-span-1">
            <div className="flex items-center gap-2">
              <span className="text-xl font-bold text-white tracking-wider">AIMA</span>
              <span className="text-[10px] text-[#38bdf8] uppercase tracking-widest font-semibold">
                Est. 1957
              </span>
            </div>
            <p className="text-gray-400 leading-relaxed text-[11px]">
              All India Management Association (AIMA) is the apex body for management profession in India, fostering executive excellence, corporate governance, and sustainable leadership.
            </p>
            <div className="flex items-center gap-2 text-amber-400 text-[11px] font-semibold">
              <Award className="w-4 h-4" />
              <span>Celebrating 70 Years of National Leadership</span>
            </div>
          </div>

          {/* Col 2: Headquarters & Location */}
          <div className="space-y-2">
            <h4 className="text-white font-bold text-xs uppercase tracking-wider border-b border-gray-700 pb-1.5 flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-[#38bdf8]" />
              Headquarters
            </h4>
            <div className="text-gray-400 space-y-1 text-[11px] leading-relaxed">
              <p className="font-semibold text-gray-200">Management House</p>
              <p>14, Institutional Area, Lodhi Road</p>
              <p>New Delhi – 110003, India</p>
              <p className="pt-1 flex items-center gap-1.5">
                <Phone className="w-3 h-3 text-gray-500" /> +91-11-24645100 / 43128100
              </p>
              <p className="flex items-center gap-1.5">
                <Mail className="w-3 h-3 text-gray-500" /> csrbootcamp@aima.in
              </p>
            </div>
          </div>

          {/* Col 3: Academic & Executive Programs */}
          <div className="space-y-2">
            <h4 className="text-white font-bold text-xs uppercase tracking-wider border-b border-gray-700 pb-1.5">
              Executive Offerings
            </h4>
            <ul className="space-y-1.5 text-[11px] text-gray-400">
              <li>
                <a href="#csr" className="hover:text-white transition-colors">
                  Certified CSR Leader Bootcamp
                </a>
              </li>
              <li>
                <a href="#esg" className="hover:text-white transition-colors">
                  Executive Diploma in ESG & Sustainability
                </a>
              </li>
              <li>
                <a href="#pgdm" className="hover:text-white transition-colors">
                  Post Graduate Diploma in Management (PGDM)
                </a>
              </li>
              <li>
                <a href="#cme" className="hover:text-white transition-colors">
                  Centre for Management Education (CME)
                </a>
              </li>
              <li>
                <a href="#research" className="hover:text-white transition-colors">
                  Ph.D. in Management in Collaboration with AMU
                </a>
              </li>
            </ul>
          </div>

          {/* Col 4: Statutory & Affiliations */}
          <div className="space-y-2">
            <h4 className="text-white font-bold text-xs uppercase tracking-wider border-b border-gray-700 pb-1.5">
              Accreditation & Approvals
            </h4>
            <div className="text-gray-400 text-[11px] space-y-2">
              <p>
                Approved by <strong>AICTE</strong> (All India Council for Technical Education), Ministry of Education, Govt. of India.
              </p>
              <p>
                Collaborating Knowledge Partner: <strong>Sustainable Advancements</strong> (Global SDG Frameworks).
              </p>
              <div className="pt-2">
                <a
                  href="https://pgcourses.aima.in"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1 text-[#38bdf8] hover:text-white transition-colors font-medium text-[11px]"
                >
                  <span>Visit AIMA PG Courses Portal</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Sub-strip */}
      <div className="bg-[#04111d] py-4 px-4 sm:px-6 border-t border-gray-800">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-2 text-[11px] text-gray-500">
          <div>
            © 1957–2027 All India Management Association (AIMA). All rights reserved.
          </div>
          <div className="flex items-center space-x-4">
            <a href="#privacy" className="hover:text-gray-300">Privacy Policy</a>
            <span>•</span>
            <a href="#terms" className="hover:text-gray-300">Terms of Nomination</a>
            <span>•</span>
            <a href="#disclaimer" className="hover:text-gray-300">Disclaimer</a>
          </div>
        </div>
      </div>
    </footer>
  );
};
