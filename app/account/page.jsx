"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  AiOutlineUser,
  AiOutlineMail,
  AiOutlinePhone,
  AiOutlineEnvironment,
  AiOutlineLogout,
  AiOutlineShopping,
  AiOutlineCheckCircle,
} from "react-icons/ai";

export default function AccountPage() {
  const router = useRouter();
  const [userData, setUserData] = useState(null);
  const [activeOrder, setActiveOrder] = useState(null);

  useEffect(() => {
    // Retrieve logged-in user profile from localStorage
    const storedUser = localStorage.getItem("jobol_user");
    if (storedUser) {
      try {
        setUserData(JSON.parse(storedUser));
      } catch (err) {
        console.error("Failed to parse user session", err);
      }
    }

    // Retrieve active order if any
    const savedOrder = localStorage.getItem("jobol_active_order");
    if (savedOrder) {
      try {
        setActiveOrder(JSON.parse(savedOrder));
      } catch (err) {
        console.error("Failed to parse active order", err);
      }
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("jobol_user");
    router.push("/signin");
  };

  // Extract phone and address strictly from registration/signup profile if present, else null
  const userPhone = userData?.phone || null;
  const userAddress = userData?.address || userData?.streetAddress || null;

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
              My Account
            </h1>
          </div>
          <Link
            href="/"
            className="self-start md:self-auto px-5 py-2.5 bg-blue-50 hover:bg-blue-100 text-blue-700 border border-blue-200 rounded-2xl text-xs font-bold transition-colors shadow-xs"
          >
            ← Back to Home
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          {/* PROFILE CARD */}
          <div className="bg-white rounded-3xl border border-gray-200 p-6 shadow-sm space-y-6 text-center md:text-left">
            <div className="flex flex-col md:flex-row items-center gap-4">
              <div className="w-20 h-20 rounded-full overflow-hidden bg-blue-700 text-white flex items-center justify-center text-xl font-bold shadow-md border-2 border-white shrink-0">
                {userData?.photoURL ? (
                  <img
                    src={userData.photoURL}
                    alt={userData.displayName || "User"}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.currentTarget.style.display = "none";
                    }}
                  />
                ) : (
                  <span>{userData?.initials || "U"}</span>
                )}
              </div>
              <div className="overflow-hidden">
                <h2 className="text-lg font-black text-gray-900 truncate">
                  {userData?.displayName || "Valued Customer"}
                </h2>
                <p className="text-xs text-gray-500 truncate">{userData?.email || "No email linked"}</p>
              </div>
            </div>

            <div className="pt-4 border-t border-gray-100 space-y-3 text-xs">
              <div className="flex items-center gap-3 text-gray-700">
                <AiOutlineMail className="text-blue-600 text-base shrink-0" />
                <span className="truncate">{userData?.email || null}</span>
              </div>
              <div className="flex items-center gap-3 text-gray-700">
                <AiOutlinePhone className="text-red-600 text-base shrink-0" />
                <span>{userPhone ? userPhone : null}</span>
              </div>
              <div className="flex items-start gap-3 text-gray-700">
                <AiOutlineEnvironment className="text-blue-600 text-base shrink-0 mt-0.5" />
                <span>{userAddress ? userAddress : null}</span>
              </div>
            </div>

            <div className="pt-4 border-t border-gray-100">
              <button
                onClick={handleLogout}
                className="w-full py-3 bg-red-50 hover:bg-red-100 text-red-600 rounded-2xl font-bold text-xs transition-colors flex items-center justify-center gap-2"
              >
                <AiOutlineLogout className="text-base" />
                <span>Log Out</span>
              </button>
            </div>
          </div>

          {/* RECENT ACTIVITY / ORDER STATUS */}
          <div className="md:col-span-2 space-y-6">
            <div className="bg-white rounded-3xl border border-gray-200 p-6 sm:p-8 shadow-sm space-y-6">
              <h3 className="text-base font-black text-gray-900 pb-3 border-b border-gray-100 flex items-center gap-2">
                <AiOutlineShopping className="text-blue-600 text-xl" />
                Recent Order Overview
              </h3>

              {!activeOrder ? (
                <div className="py-8 text-center space-y-3">
                  <p className="text-xs text-gray-500 font-medium">You have no active orders in progress.</p>
                  <Link
                    href="/cart"
                    className="inline-block px-5 py-2.5 bg-blue-600 text-white rounded-xl text-xs font-bold hover:bg-blue-700 transition-colors shadow-sm"
                  >
                    Go to Cart & Finalize Order
                  </Link>
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="p-4 rounded-2xl border border-blue-100 bg-blue-50/50 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                    <div className="space-y-1">
                      <span className="inline-flex items-center gap-1 px-2.5 py-0.5 bg-amber-500 text-white text-[10px] font-extrabold rounded-full">
                        Order in Progress
                      </span>
                      <h4 className="text-sm font-extrabold text-blue-900">
                        Order #{activeOrder.orderId}
                      </h4>
                      <p className="text-[11px] text-gray-600">
                        Destination: {activeOrder.deliveryDetails.streetAddress}, {activeOrder.deliveryDetails.state}
                      </p>
                    </div>

                    <div className="text-left sm:text-right">
                      <span className="text-[10px] font-bold text-gray-400 uppercase block">Total Amount</span>
                      <span className="text-sm font-black text-red-600">
                        ₦{activeOrder.grandTotal.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                      </span>
                    </div>
                  </div>

                  <div className="pt-2">
                    <Link
                      href="/orders"
                      className="inline-flex items-center gap-1 text-xs font-bold text-blue-600 hover:text-red-600 transition-colors"
                    >
                      <span>View full order details & tracking status →</span>
                    </Link>
                  </div>
                </div>
              )}
            </div>

            <div className="bg-white rounded-3xl border border-gray-200 p-6 sm:p-8 shadow-sm space-y-4">
              <h3 className="text-base font-black text-gray-900 pb-3 border-b border-gray-100 flex items-center gap-2">
                <AiOutlineCheckCircle className="text-green-600 text-xl" />
                Account Security & Preferences
              </h3>
              <p className="text-xs text-gray-600 leading-relaxed">
                Your account is securely connected via JOBOL Investments authentication. All your shopping lists, contact details, and orders are automatically synced for seamless delivery.
              </p>
            </div>
          </div>

        </div>

      </div>
    </main>
  );
}