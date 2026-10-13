"use client";

import React from "react";
import Link from "next/link";
import {
  AiOutlineEnvironment,
  AiOutlinePhone,
  AiOutlineWhatsApp,
  AiOutlineFileText,
} from "react-icons/ai";

export default function Footer() {
  const whatsappNumber = "2348123377017";
  const whatsappUrl = `https://wa.me/${whatsappNumber}`;

  return (
    <footer className="w-full bg-red-900 border-t border-gray-200 pt-12 pb-24 md:pb-12 text-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Top Row: Logo & Quick Info */}
        <div className="flex flex-col md:flex-row md:items-start justify-between gap-8 pb-8 border-b border-gray-300">
          
          {/* Logo & Brand */}
          <div className="space-y-4">
            <Link href="/" className="flex items-center gap-3 group">
              <div className="w-20 h-20 rounded-xl overflow-hidden bg-white border border-gray-100 flex items-center justify-center shrink-0 shadow-xs">
                <img
                  src="/JIS.png"
                  alt="JIS Logo"
                  width={500}
                  height={500}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.currentTarget.style.display = "none";
                  }}
                />
              </div>
              <div>
                <span className="text-lg font-black tracking-tight text-white block">
                  JOBOL Investments Service
                </span>
                <span className="text-[11px] font-bold text-gray-300">RC 1349295</span>
              </div>
            </Link>
            <p className="text-md text-gray-400 max-w-sm leading-relaxed">
              Your trusted partner for quality products, reliable services, and prompt nationwide delivery.
            </p>
          </div>

          {/* Contact & Location Details */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-md">
            <div className="space-y-3">
              <h4 className="font-extrabold text-blue-700 uppercase tracking-wider text-[20px]">Office Address</h4>
              <div className="flex items-start gap-2 text-gray-400">
                <AiOutlineEnvironment className="text-yellow-200 text-base shrink-0 mt-0.5" />
                <span>No. 86 Parks and Garden, Opposite General Hospital, Suleja, Niger State.</span>
              </div>
            </div>

            <div className="space-y-3">
              <h4 className="font-extrabold text-blue-700 uppercase tracking-wider text-[20px]">Get in Touch</h4>
              <div className="space-y-2">
                <a
                  href="tel:08123377017"
                  className="flex items-center gap-2 text-gray-300 hover:text-blue-600 transition-colors"
                >
                  <AiOutlinePhone className="text-green-600 text-base shrink-0" />
                  <span className="font-semibold">08123377017</span>
                </a>
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-3.5 py-2 bg-emerald-700 hover:bg-emerald-700 text-white rounded-xl font-bold transition-colors shadow-xs"
                >
                  <AiOutlineWhatsApp className="text-base" />
                  <span>Chat on WhatsApp</span>
                </a>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Row: Copyright & Terms */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-gray-400">
          <p>©2026 JOBOL Investments Service (RC 1349295). All rights reserved.</p>
          <div className="flex items-center gap-4">
            <Link href="/terms" className="hover:text-blue-600 transition-colors flex items-center gap-1 font-medium">
              <AiOutlineFileText /> Terms and Conditions
            </Link>
          </div>
        </div>

      </div>
    </footer>
  );
}