"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  AiOutlineCheckCircle,
  AiOutlineShopping,
  AiOutlineEnvironment,
  AiOutlineWhatsApp,
  AiOutlineCopy,
  AiOutlineArrowLeft,
} from "react-icons/ai";

export default function CheckoutPaymentPage() {
  const router = useRouter();
  const [orderData, setOrderData] = useState(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const storedOrder = localStorage.getItem("jobol_pending_order");
    if (storedOrder) {
      try {
        setOrderData(JSON.parse(storedOrder));
      } catch (err) {
        console.error("Failed to parse pending order", err);
      }
    }
  }, []);

  const handleCopyAccountNumber = () => {
    navigator.clipboard.writeText("0021214762");
    setCopied(true);
    setTimeout(() => setCopied(false), 3000);
  };

  const handleWhatsAppPaymentConfirmation = () => {
    if (!orderData) return;

    // 1. Save the order to "jobol_active_order" so the Orders page displays it instantly
    localStorage.setItem("jobol_active_order", JSON.stringify(orderData));

    const { orderId, date, items, deliveryDetails, subtotal, deliveryFee, vatAmount, grandTotal } = orderData;

    // Format items list for WhatsApp
    const itemsListText = items
      .map(
        (item, index) =>
          `*${index + 1}. ${item.name}* \n   Qty: ${item.quantity} ${item.unit || "unit"} \n   Price: ₦${(parseFloat(item.unitPrice) || 0).toLocaleString()} each \n   Total: ₦${((parseFloat(item.unitPrice) || 0) * (item.quantity || 1)).toLocaleString()}`
      )
      .join("\n\n");

    // Construct WhatsApp message body
    const whatsappMessage = `*NEW ORDER SUBMITTED (#${orderId})* 🛒\n` +
      `📅 Date: ${date}\n\n` +
      `*CUSTOMER DETAILS:*\n` +
      `👤 Name: ${deliveryDetails.fullName}\n` +
      `📞 Phone: ${deliveryDetails.phone}\n` +
      `📍 State: ${deliveryDetails.state}\n` +
      `🏠 Address: ${deliveryDetails.streetAddress}\n` +
      `${deliveryDetails.deliveryInstructions ? `📝 Instructions: ${deliveryDetails.deliveryInstructions}\n` : ""}\n` +
      `*ORDER ITEMS:*\n${itemsListText}\n\n` +
      `*SUMMARY:*\n` +
      `Subtotal: ₦${subtotal.toLocaleString()}\n` +
      `Delivery Fee: ₦${deliveryFee.toLocaleString()}\n` +
      `VAT (0.17%): ₦${vatAmount.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}\n` +
      `*Grand Total: ₦${grandTotal.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}*\n\n` +
      `✅ *I have made the bank transfer payment for this order. Please confirm and process delivery!*`;

    // Encode message for URL
    const encodedMessage = encodeURIComponent(whatsappMessage);
    const whatsappNumber = "2348123377017";

    // Clear cart and pending order storage
    localStorage.removeItem("jobol_cart");
    localStorage.removeItem("jobol_pending_order");

    // Open WhatsApp URL
    window.location.href = `https://wa.me/${whatsappNumber}?text=${encodedMessage}`;
  };

  if (!orderData) {
    return (
      <main className="min-h-screen flex items-center justify-center p-4 bg-gray-50 text-slate-800">
        <div className="bg-white rounded-3xl p-8 max-w-md w-full text-center space-y-4 shadow-sm border border-gray-100">
          <h2 className="text-lg font-black text-gray-900">No Pending Order Found</h2>
          <p className="text-xs text-gray-500">Your session may have expired or no items were selected for checkout.</p>
          <Link
            href="/cart"
            className="inline-block w-full py-3 bg-blue-600 text-white rounded-2xl text-xs font-extrabold hover:bg-blue-700 transition-colors"
          >
            Return to Cart
          </Link>
        </div>
      </main>
    );
  }

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
            href="/cart"
            className="inline-flex items-center gap-2 px-4 py-2 bg-blue-50 hover:bg-blue-100 text-blue-700 rounded-2xl text-xs font-bold transition-colors shadow-xs"
          >
            <AiOutlineArrowLeft /> Back to Cart
          </Link>
          <div className="text-right">
            <span className="text-[10px] font-extrabold uppercase text-gray-400 tracking-wider">Order Reference</span>
            <p className="text-sm font-black text-blue-900">#{orderData.orderId}</p>
          </div>
        </div>

        {/* Main Card */}
        <div className="bg-white rounded-3xl border border-gray-200 p-6 sm:p-10 shadow-sm space-y-8">
          
          <div className="text-center space-y-2">
            <div className="w-16 h-16 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center mx-auto text-3xl shadow-inner">
              <AiOutlineCheckCircle />
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-blue-900">Complete Your Bank Transfer</h1>
            <p className="text-xs text-gray-600 max-w-md mx-auto">
              Please transfer the exact total amount to the bank account details provided below. Once completed, click the confirmation button to finalize via WhatsApp.
            </p>
          </div>

          {/* Bank Account Details Box */}
          <div className="bg-gradient-to-br from-blue-900 to-blue-950 text-white rounded-2xl p-6 shadow-md relative overflow-hidden space-y-4">
            <div className="absolute -right-6 -bottom-6 w-32 h-32 bg-white/5 rounded-full pointer-events-none" />
            
            <div className="flex justify-between items-center pb-3 border-b border-white/10">
              <span className="text-xs uppercase tracking-wider text-blue-300 font-bold">Bank Transfer Details</span>
              <span className="px-2.5 py-1 bg-red-600 text-white rounded-lg text-[10px] font-black uppercase">STANBIC IBTC</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div>
                <span className="text-blue-300 block mb-0.5 font-medium">Bank Name</span>
                <strong className="text-sm font-black tracking-wide">STANBIC IBTC BANK</strong>
              </div>
              <div>
                <span className="text-blue-300 block mb-0.5 font-medium">Account Name</span>
                <strong className="text-sm font-black tracking-wide">JOSEPH HARUNA INABOYA</strong>
              </div>
            </div>

            <div className="pt-2 flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white/10 p-4 rounded-xl">
              <div>
                <span className="text-[10px] text-blue-300 block font-medium uppercase">Account Number</span>
                <span className="text-xl font-black tracking-widest text-white">0021214762</span>
              </div>
              <button
                type="button"
                onClick={handleCopyAccountNumber}
                className="px-4 py-2 bg-white text-blue-900 hover:bg-blue-50 rounded-xl text-xs font-extrabold transition-colors flex items-center justify-center gap-1.5 shadow-sm"
              >
                <AiOutlineCopy className="text-sm" />
                {copied ? "Copied Account Number!" : "Copy Account Number"}
              </button>
            </div>
          </div>

          {/* Amount Due Banner */}
          <div className="bg-red-50 border border-red-100 p-4 rounded-2xl flex items-center justify-between">
            <span className="text-xs font-bold text-red-900">Total Amount to Transfer:</span>
            <span className="text-lg font-black text-red-600">
              ₦{orderData.grandTotal.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </span>
          </div>

          {/* Delivery & Order Preview Summary */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t border-gray-100 text-xs">
            
            <div className="space-y-3 bg-gray-50 p-4 rounded-2xl">
              <h3 className="font-extrabold text-gray-900 flex items-center gap-1.5">
                <AiOutlineEnvironment className="text-red-600 text-sm" /> Delivery Information
              </h3>
              <div className="space-y-1 text-gray-600">
                <p><strong className="text-gray-900">Name:</strong> {orderData.deliveryDetails.fullName}</p>
                <p><strong className="text-gray-900">Phone:</strong> {orderData.deliveryDetails.phone}</p>
                <p><strong className="text-gray-900">Address:</strong> {orderData.deliveryDetails.streetAddress}, {orderData.deliveryDetails.state}</p>
                {orderData.deliveryDetails.deliveryInstructions && (
                  <p><strong className="text-gray-900">Note:</strong> {orderData.deliveryDetails.deliveryInstructions}</p>
                )}
              </div>
            </div>

            <div className="space-y-3 bg-gray-50 p-4 rounded-2xl">
              <h3 className="font-extrabold text-gray-900 flex items-center gap-1.5">
                <AiOutlineShopping className="text-blue-600 text-sm" /> Items Summary ({orderData.items.length})
              </h3>
              <div className="space-y-2 max-h-36 overflow-y-auto pr-1">
                {orderData.items.map((item) => (
                  <div key={item.id} className="flex justify-between items-center text-gray-700 pb-1 border-b border-gray-200/50">
                    <span className="font-medium truncate max-w-[150px]">{item.name} ({item.quantity} {item.unit || "unit"})</span>
                    <span className="font-bold text-blue-900">₦{((parseFloat(item.unitPrice) || 0) * (item.quantity || 1)).toLocaleString()}</span>
                  </div>
                ))}
              </div>
            </div>

          </div>

          {/* WhatsApp Confirmation Action Button */}
          <div className="pt-4">
            <button
              type="button"
              onClick={handleWhatsAppPaymentConfirmation}
              className="w-full py-4 bg-emerald-600 hover:bg-emerald-700 text-white rounded-2xl font-extrabold text-xs sm:text-sm transition-colors shadow-lg shadow-emerald-600/30 flex items-center justify-center gap-2 cursor-pointer"
            >
              <AiOutlineWhatsApp className="text-xl" />
              <span>I have made payment</span>
            </button>
            <p className="text-[11px] text-center text-gray-400 mt-3">
              Clicking this button will save your order, open WhatsApp with your populated order details, and mark your status as in progress.
            </p>
          </div>

        </div>

      </div>
    </main>
  );
}