"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  AiOutlineFileText,
  AiOutlineClockCircle,
  AiOutlineEnvironment,
  AiOutlineShopping,
} from "react-icons/ai";

export default function OrdersPage() {
  const [activeOrder, setActiveOrder] = useState(null);

  useEffect(() => {
    // Automatically retrieve the active order from localStorage
    const savedOrder = localStorage.getItem("jobol_active_order");
    if (savedOrder) {
      try {
        setActiveOrder(JSON.parse(savedOrder));
      } catch (err) {
        console.error("Failed to parse order", err);
      }
    }
  }, []);

  return (
    <main
      className="min-h-screen pb-32 relative bg-cover bg-center bg-fixed transition-all duration-500 text-slate-800"
      style={{ fontFamily: "Arial, sans-serif", backgroundImage: `url('/jobol%20logo1.png')` }}
    >
      {/* Semi-transparent background overlay */}
      <div className="absolute inset-0 bg-white/94 backdrop-blur-[2px] pointer-events-none" />

      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        
        {/* Page Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div>
            <div className="inline-flex items-center gap-2 text-sm font-bold uppercase tracking-widest text-blue-700 mb-1">
              <span className="h-1 w-6 rounded-full bg-red-500" />
              JOBOL Investments
            </div>
            <h1 className="text-3xl sm:text-4xl font-black tracking-tight text-blue-900">
              My Orders & Status
            </h1>
          </div>
          <Link
            href="/"
            className="self-start md:self-auto px-5 py-2.5 bg-blue-50 hover:bg-blue-100 text-blue-700 border border-blue-200 rounded-2xl text-xs font-bold transition-colors shadow-xs"
          >
            ← Back to Home
          </Link>
        </div>

        {!activeOrder ? (
          /* Empty Orders State */
          <div className="bg-white rounded-3xl border border-gray-200 p-12 text-center shadow-sm space-y-4">
            <div className="w-16 h-16 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center mx-auto text-2xl">
              <AiOutlineFileText />
            </div>
            <h2 className="text-xl font-black text-gray-900">No Active Orders</h2>
            <p className="text-xs text-gray-500 max-w-sm mx-auto">
              You have not submitted any orders yet. Finalize your shopping list from the cart page to track orders automatically here.
            </p>
            <Link
              href="/cart"
              className="inline-block px-6 py-3 bg-blue-600 text-white rounded-2xl text-xs font-bold hover:bg-blue-700 transition-colors shadow-md"
            >
              Go to Cart
            </Link>
          </div>
        ) : (
          /* Active Order Display */
          <div className="space-y-6">
            
            {/* Status Banner */}
            <div className="bg-gradient-to-r from-blue-900 to-blue-800 rounded-3xl p-6 sm:p-8 text-white shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
              <div className="space-y-2">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-amber-500 text-white text-[11px] font-extrabold rounded-full shadow-sm">
                  <AiOutlineClockCircle className="animate-spin text-sm" /> Order in Progress
                </span>
                <h2 className="text-2xl sm:text-3xl font-black tracking-tight">
                  Ready to be delivered to your destination
                </h2>
                <p className="text-xs text-blue-100">
                  Order ID: <span className="font-bold">#{activeOrder.orderId}</span> • Placed on {activeOrder.date}
                </p>
              </div>

              <div className="bg-white/10 backdrop-blur-md p-4 rounded-2xl border border-white/20 text-xs space-y-1 w-full md:w-auto">
                <p className="font-bold text-blue-200 uppercase text-[10px]">Destination</p>
                <p className="font-extrabold text-white flex items-center gap-1">
                  <AiOutlineEnvironment className="text-red-400 text-sm" /> {activeOrder.deliveryDetails.streetAddress}, {activeOrder.deliveryDetails.state}
                </p>
                <p className="text-blue-100">Recipient: {activeOrder.deliveryDetails.fullName} ({activeOrder.deliveryDetails.phone})</p>
              </div>
            </div>

            {/* Order Items & Breakdown */}
            <div className="bg-white rounded-3xl border border-gray-200 p-6 sm:p-8 shadow-sm space-y-6">
              <h3 className="text-base font-black text-gray-900 pb-3 border-b border-gray-100 flex items-center gap-2">
                <AiOutlineShopping className="text-blue-600 text-xl" />
                Ordered Items ({activeOrder.items.length})
              </h3>

              <div className="space-y-4">
                {activeOrder.items.map((item) => (
                  <div
                    key={item.id}
                    className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-4 rounded-2xl border border-gray-100 bg-gray-50/50"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-14 h-14 rounded-xl overflow-hidden bg-white shrink-0 border border-gray-100">
                        <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                      </div>
                      <div>
                        <h4 className="text-xs font-extrabold text-gray-900">{item.name}</h4>
                        <span className="text-[11px] text-gray-500">Qty: {item.quantity} {item.unit}</span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between sm:justify-end w-full sm:w-auto gap-6 pt-2 sm:pt-0 border-t sm:border-t-0 border-gray-200 text-xs">
                      <span className="text-gray-500">Unit: ₦{parseFloat(item.unitPrice || 0).toLocaleString()}</span>
                      <span className="font-black text-blue-900">
                        ₦{((parseFloat(item.unitPrice) || 0) * item.quantity).toLocaleString()}
                      </span>
                    </div>
                  </div>
                ))}
              </div>

              {/* Financial Breakdown */}
              <div className="pt-6 border-t border-gray-100 space-y-2 text-xs max-w-sm ml-auto">
                <div className="flex justify-between text-gray-600">
                  <span>Items Subtotal</span>
                  <span className="font-bold text-gray-900">₦{activeOrder.subtotal.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Delivery Fee</span>
                  <span className="font-bold text-gray-900">₦{activeOrder.deliveryFee.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>VAT (0.17%)</span>
                  <span className="font-bold text-gray-900">₦{activeOrder.vatAmount.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
                </div>
                <div className="pt-3 border-t border-gray-200 flex justify-between text-sm font-black text-blue-900">
                  <span>Total Amount Paid</span>
                  <span className="text-base text-red-600">₦{activeOrder.grandTotal.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
                </div>
              </div>

            </div>

          </div>
        )}

      </div>
    </main>
  );
}