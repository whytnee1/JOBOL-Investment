"use client";

import React from "react";
import Link from "next/link";
import {
  AiOutlineFileText,
  AiOutlineArrowLeft,
  AiOutlineCheckCircle,
  AiOutlineWarning,
} from "react-icons/ai";

export default function TermsPage() {
  return (
    <main
      className="min-h-screen pb-32 relative bg-cover bg-center bg-fixed transition-all duration-500 text-slate-800"
      style={{ fontFamily: "Arial, sans-serif", backgroundImage: `url('/jobol%20logo1.png')` }}
    >
      <div className="absolute inset-0 bg-white/94 backdrop-blur-[2px] pointer-events-none" />

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 space-y-8">
        
        {/* Header & Back Link */}
        <div className="flex items-center justify-between">
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-4 py-2 bg-blue-50 hover:bg-blue-100 text-blue-700 rounded-2xl text-xs font-bold transition-colors shadow-xs"
          >
            <AiOutlineArrowLeft /> Back to Home
          </Link>
          <div className="text-right">
            <span className="text-[10px] font-extrabold uppercase text-gray-400 tracking-wider">RC 1349295</span>
            <p className="text-sm font-black text-blue-900">JOBOL Investments</p>
          </div>
        </div>

        {/* Terms Container */}
        <div className="bg-white rounded-3xl border border-gray-200 p-6 sm:p-12 shadow-sm space-y-8">
          
          <div className="border-b border-gray-100 pb-6 space-y-2">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-[11px] font-extrabold">
              <AiOutlineFileText className="text-sm" /> Legal Agreement
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-blue-900">
              Terms and Conditions
            </h1>
            <p className="text-xs text-gray-500">
              Last updated: October 2026 • Effective for all orders placed through JOBOL Investments.
            </p>
          </div>

          <div className="space-y-6 text-xs sm:text-sm text-gray-600 leading-relaxed">
            
            <section className="space-y-2">
              <h2 className="text-base font-black text-gray-900">1. Introduction</h2>
              <p>
                Welcome to JOBOL Investments (RC 1349295). By accessing our platform, placing orders, or purchasing goods from us, you agree to comply with and be bound by the following terms and conditions. Please read them carefully before completing any transaction.
              </p>
            </section>

            <section className="space-y-2">
              <h2 className="text-base font-black text-gray-900">2. Orders and Pricing</h2>
              <p>
                All orders placed are subject to product availability and confirmation of payment. Prices for our goods are listed in Nigerian Naira (₦) and are subject to change without prior notice. We strive to ensure accurate pricing and descriptions across our catalog.
              </p>
            </section>

            <section className="space-y-2">
              <h2 className="text-base font-black text-gray-900">3. Payment Terms</h2>
              <p>
                Payments for orders are processed via direct bank transfer to our designated official account details provided during checkout. Orders are only processed and scheduled for delivery upon confirmation of full payment.
              </p>
            </section>

            {/* No Refund Policy Section */}
            <section className="bg-red-50/70 border border-red-100 rounded-2xl p-6 space-y-3">
              <h2 className="text-base font-black text-red-900 flex items-center gap-2">
                <AiOutlineWarning className="text-red-600 text-lg" /> 4. No Refund Policy
              </h2>
              <p className="text-red-950 font-medium">
                At JOBOL Investments, <strong className="font-extrabold text-red-900">all sales are final</strong>. We operate a strict <strong className="font-extrabold text-red-900">No Refund Policy</strong> once an order has been paid for, processed, and dispatched or delivered. 
              </p>
              <p className="text-gray-700">
                Please inspect your items carefully upon delivery. We advise customers to verify product quantities, specifications, and quality at the point of receipt before our dispatch team departs.
              </p>
            </section>

            <section className="space-y-2">
              <h2 className="text-base font-black text-gray-900">5. Delivery Policy</h2>
              <p>
                We deliver to designated locations across Nigeria as specified during checkout. Delivery fees and timelines are calculated based on your delivery state and address. JOBOL Investments is not liable for delays caused by incorrect delivery addresses or unreachable phone contacts provided by the customer.
              </p>
            </section>

            <section className="space-y-2">
              <h2 className="text-base font-black text-gray-900">6. Contact Information</h2>
              <p>
                If you have any questions regarding these Terms and Conditions, please reach out to our support team via our official phone number or WhatsApp contact.
              </p>
            </section>

          </div>

          <div className="pt-6 border-t border-gray-100 flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-[11px] text-gray-400">
              ©2026 JOBOL Investments (RC 1349295). All rights reserved.
            </p>
            <Link
              href="/cart"
              className="px-6 py-3 bg-blue-600 hover:bg-red-600 text-white rounded-2xl text-xs font-extrabold transition-colors shadow-sm"
            >
              Proceed to Cart
            </Link>
          </div>

        </div>

      </div>
    </main>
  );
}