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
  const [isLoading, setIsLoading] = useState(true);

  // =====================================================
  // LOAD ACTIVE ORDER
  // =====================================================

  useEffect(() => {
    let mounted = true;

    const loadOrder = () => {
      try {
        const savedOrder = localStorage.getItem("jobol_active_order");

        if (savedOrder) {
          const parsedOrder = JSON.parse(savedOrder);

          if (
            parsedOrder &&
            typeof parsedOrder === "object" &&
            !Array.isArray(parsedOrder)
          ) {
            if (mounted) {
              setActiveOrder(parsedOrder);
            }
          } else {
            if (mounted) {
              setActiveOrder(null);
            }
          }
        } else {
          if (mounted) {
            setActiveOrder(null);
          }
        }
      } catch (error) {
        console.error("Failed to load active order:", error);

        if (mounted) {
          setActiveOrder(null);
        }
      } finally {
        if (mounted) {
          setIsLoading(false);
        }
      }
    };

    // Brief delay allows the transparent animation to appear.
    const timer = window.setTimeout(loadOrder, 300);

    // Listen for order changes from another browser tab.
    const handleStorage = (event) => {
      if (event.key === "jobol_active_order") {
        loadOrder();
      }
    };

    window.addEventListener("storage", handleStorage);

    return () => {
      mounted = false;
      window.clearTimeout(timer);
      window.removeEventListener("storage", handleStorage);
    };
  }, []);

  // =====================================================
  // SAFE ORDER VALUES
  // =====================================================

  const deliveryDetails = activeOrder?.deliveryDetails || {};
  const orderItems = Array.isArray(activeOrder?.items)
    ? activeOrder.items
    : [];

  const subtotal = Number(activeOrder?.subtotal) || 0;
  const deliveryFee = Number(activeOrder?.deliveryFee) || 0;
  const vatAmount = Number(activeOrder?.vatAmount) || 0;
  const grandTotal =
    activeOrder?.grandTotal !== undefined
      ? Number(activeOrder.grandTotal) || 0
      : subtotal + deliveryFee + vatAmount;

  const formatMoney = (amount, decimals = false) => {
    return Number(amount || 0).toLocaleString("en-NG", {
      minimumFractionDigits: decimals ? 2 : 0,
      maximumFractionDigits: decimals ? 2 : 0,
    });
  };

  // =====================================================
  // TRANSPARENT LOADING ANIMATION
  // =====================================================

  if (isLoading) {
    return (
      <main
        className="fixed inset-0 z-[9999] flex min-h-screen items-center justify-center overflow-hidden px-5"
        style={{
          fontFamily: "Arial, sans-serif",
          backgroundColor: "rgba(7, 19, 41, 0.20)",
          backdropFilter: "blur(2px)",
          WebkitBackdropFilter: "blur(2px)",
        }}
        aria-live="polite"
        aria-busy="true"
      >
        {/* Transparent red and blue background glow */}

        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <div
            className="absolute -left-20 -top-20 h-64 w-64 rounded-full bg-red-500/20 blur-3xl sm:h-96 sm:w-96"
            style={{
              animation: "jobolGlow 4s ease-in-out infinite",
            }}
          />

          <div
            className="absolute -bottom-20 -right-20 h-64 w-64 rounded-full bg-blue-500/20 blur-3xl sm:h-96 sm:w-96"
            style={{
              animation: "jobolGlow 4s ease-in-out infinite reverse",
            }}
          />
        </div>

        {/* Transparent glass loading card */}

        <div
          className="relative z-10 flex w-full max-w-sm flex-col items-center rounded-3xl border border-white/30 px-6 py-8 text-center shadow-2xl sm:px-10 sm:py-10"
          style={{
            backgroundColor: "rgba(7, 19, 41, 0.58)",
            backdropFilter: "blur(12px)",
            WebkitBackdropFilter: "blur(12px)",
          }}
        >
          {/* Animated JOBOL sign */}

          <div className="relative mb-7 flex h-28 w-full items-center justify-center sm:h-32">
            {/* Outer ring */}

            <div
              className="absolute h-24 w-24 rounded-full border border-red-400/60 sm:h-28 sm:w-28"
              style={{
                animation: "jobolRing 2s linear infinite",
              }}
            />

            {/* Inner ring */}

            <div
              className="absolute h-32 w-32 rounded-full border border-blue-400/40 sm:h-36 sm:w-36"
              style={{
                animation: "jobolRing 3s linear infinite reverse",
              }}
            />

            {/* JOBOL text */}

            <div
              className="relative flex flex-col items-center"
              style={{
                animation:
                  "jobolPulse 300ms ease-in-out infinite alternate",
                willChange: "transform, opacity",
              }}
            >
              <span
                className="text-4xl font-black tracking-[0.16em] text-white sm:text-5xl"
                style={{
                  textShadow:
                    "0 0 10px rgba(239,68,68,0.7), 0 0 25px rgba(59,130,246,0.4)",
                }}
              >
                JOBOL
              </span>

              {/* Animated progress bar */}

              <div className="mt-3 h-1 w-24 overflow-hidden rounded-full bg-white/20">
                <div
                  className="h-full w-full origin-left rounded-full bg-gradient-to-r from-red-500 via-white to-blue-500"
                  style={{
                    animation:
                      "jobolProgress 1.2s ease-in-out infinite",
                  }}
                />
              </div>
            </div>
          </div>

          {/* Loading message */}

          <h1 className="text-lg font-extrabold tracking-wide text-white sm:text-xl">
            Loading Your Orders
          </h1>

          <p className="mt-3 max-w-xs text-sm leading-6 text-white/75">
            Please wait while we retrieve your order information...
          </p>

          {/* Animated loading dots */}

          <div
            className="mt-6 flex items-center gap-2"
            aria-hidden="true"
          >
            {[0, 1, 2].map((dot) => (
              <span
                key={dot}
                className="h-2 w-2 rounded-full"
                style={{
                  background:
                    dot === 1 ? "#3B82F6" : "#EF4444",
                  animation: `jobolDot 0.9s ease-in-out ${
                    dot * 0.15
                  }s infinite`,
                }}
              />
            ))}
          </div>

          {/* Brand footer */}

          <span className="mt-8 text-[10px] font-bold uppercase tracking-[0.2em] text-white/60">
            JOBOL Investments Service
          </span>
        </div>

        {/* Loading animation CSS */}

        <style jsx>{`
          @keyframes jobolPulse {
            from {
              transform: scale(0.88);
              opacity: 0.65;
            }

            to {
              transform: scale(1.08);
              opacity: 1;
            }
          }

          @keyframes jobolRing {
            from {
              transform: rotate(0deg) scale(0.94);
              opacity: 0.35;
            }

            50% {
              opacity: 0.8;
            }

            to {
              transform: rotate(360deg) scale(1.06);
              opacity: 0.35;
            }
          }

          @keyframes jobolGlow {
            0%,
            100% {
              transform: translate3d(0, 0, 0) scale(1);
            }

            50% {
              transform: translate3d(15px, -12px, 0) scale(1.1);
            }
          }

          @keyframes jobolProgress {
            0% {
              transform: scaleX(0.15);
              opacity: 0.5;
            }

            50% {
              transform: scaleX(1);
              opacity: 1;
            }

            100% {
              transform: scaleX(0.15);
              opacity: 0.5;
            }
          }

          @keyframes jobolDot {
            0%,
            60%,
            100% {
              transform: translateY(0);
              opacity: 0.35;
            }

            30% {
              transform: translateY(-6px);
              opacity: 1;
            }
          }

          @media (prefers-reduced-motion: reduce) {
            *,
            *::before,
            *::after {
              animation-duration: 0.01ms !important;
              animation-iteration-count: 1 !important;
            }
          }
        `}</style>
      </main>
    );
  }

  // =====================================================
  // ORDERS PAGE
  // =====================================================

  return (
    <main
      className="relative min-h-screen bg-cover bg-center bg-fixed pb-32 text-slate-800 transition-all duration-500"
      style={{
        fontFamily: "Arial, sans-serif",
        backgroundImage: "url('/jobol%20logo1.png')",
      }}
    >
      {/* Semi-transparent page background overlay */}

      <div className="pointer-events-none absolute inset-0 bg-white/94 backdrop-blur-[2px]" />

      <div className="relative z-10 mx-auto max-w-5xl px-4 pt-8 sm:px-6 lg:px-8">
        {/* PAGE HEADER */}

        <div className="mb-8 flex flex-col justify-between gap-4 md:flex-row md:items-center">
          <div>
            <div className="mb-1 inline-flex items-center gap-2 text-sm font-bold uppercase tracking-widest text-blue-700">
              <span className="h-1 w-6 rounded-full bg-red-500" />
              JOBOL Investments
            </div>

            <h1 className="text-3xl font-black tracking-tight text-blue-900 sm:text-4xl">
              My Orders & Status
            </h1>
          </div>

          <Link
            href="/"
            className="self-start rounded-2xl border border-blue-200 bg-blue-50 px-5 py-2.5 text-xs font-bold text-blue-700 shadow-sm transition-colors duration-300 hover:bg-blue-100 md:self-auto"
          >
            ← Back to Home
          </Link>
        </div>

        {/* =================================================
            EMPTY ORDERS STATE
        ================================================= */}

        {!activeOrder ? (
          <div className="space-y-4 rounded-3xl border border-gray-200 bg-white p-8 text-center shadow-sm sm:p-12">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-blue-50 text-2xl text-blue-600">
              <AiOutlineFileText />
            </div>

            <h2 className="text-xl font-black text-gray-900">
              No Active Orders
            </h2>

            <p className="mx-auto max-w-sm text-xs leading-6 text-gray-500">
              You have not submitted any orders yet. Finalize your
              shopping list from the cart page to track orders here.
            </p>

            <Link
              href="/cart"
              className="inline-block rounded-2xl bg-blue-600 px-6 py-3 text-xs font-bold text-white shadow-md transition-colors duration-300 hover:bg-blue-700"
            >
              Go to Cart
            </Link>
          </div>
        ) : (
          /* =================================================
              ACTIVE ORDER DISPLAY
          ================================================= */

          <div className="space-y-6">
            {/* STATUS BANNER */}

            <div className="flex flex-col items-start justify-between gap-6 rounded-3xl bg-gradient-to-r from-blue-900 to-blue-800 p-6 text-white shadow-xl sm:p-8 md:flex-row md:items-center">
              <div className="space-y-2">
                <span className="inline-flex items-center gap-1.5 rounded-full bg-amber-500 px-3 py-1 text-[11px] font-extrabold text-white shadow-sm">
                  <AiOutlineClockCircle className="text-sm" />
                  Order in Progress
                </span>

                <h2 className="text-2xl font-black tracking-tight sm:text-3xl">
                  Ready to be delivered to your destination
                </h2>

                <p className="text-xs text-blue-100">
                  Order ID:{" "}
                  <span className="font-bold">
                    #{activeOrder.orderId || "Pending"}
                  </span>
                  {" • "}
                  Placed on {activeOrder.date || "Date unavailable"}
                </p>
              </div>

              {/* DELIVERY DESTINATION */}

              <div className="w-full space-y-1 rounded-2xl border border-white/20 bg-white/10 p-4 text-xs backdrop-blur-md md:w-auto">
                <p className="text-[10px] font-bold uppercase text-blue-200">
                  Destination
                </p>

                <p className="flex items-start gap-1 font-extrabold text-white">
                  <AiOutlineEnvironment className="mt-0.5 shrink-0 text-sm text-red-400" />

                  <span>
                    {deliveryDetails.streetAddress || "Address unavailable"}
                    {deliveryDetails.state
                      ? `, ${deliveryDetails.state}`
                      : ""}
                  </span>
                </p>

                <p className="break-words text-blue-100">
                  Recipient: {deliveryDetails.fullName || "Not provided"}
                  {deliveryDetails.phone
                    ? ` (${deliveryDetails.phone})`
                    : ""}
                </p>
              </div>
            </div>

            {/* =================================================
                ORDERED ITEMS AND FINANCIAL BREAKDOWN
            ================================================= */}

            <div className="space-y-6 rounded-3xl border border-gray-200 bg-white p-6 shadow-sm sm:p-8">
              <h3 className="flex items-center gap-2 border-b border-gray-100 pb-3 text-base font-black text-gray-900">
                <AiOutlineShopping className="text-xl text-blue-600" />
                Ordered Items ({orderItems.length})
              </h3>

              {/* ORDER ITEMS */}

              {orderItems.length === 0 ? (
                <p className="py-6 text-center text-xs text-gray-500">
                  No item details are available for this order.
                </p>
              ) : (
                <div className="space-y-4">
                  {orderItems.map((item, index) => {
                    const unitPrice = Number(item.unitPrice) || 0;
                    const quantity = Number(item.quantity) || 1;
                    const itemTotal = unitPrice * quantity;

                    return (
                      <div
                        key={item.id ?? `${item.name}-${index}`}
                        className="flex flex-col items-start justify-between gap-4 rounded-2xl border border-gray-100 bg-gray-50/50 p-4 transition-all duration-300 hover:border-blue-200 hover:bg-white sm:flex-row sm:items-center"
                      >
                        {/* ITEM DETAILS */}

                        <div className="flex items-center gap-3">
                          <div className="h-14 w-14 shrink-0 overflow-hidden rounded-xl border border-gray-100 bg-white">
                            {item.image ? (
                              <img
                                src={item.image}
                                alt={item.name || "Ordered product"}
                                className="h-full w-full object-cover"
                              />
                            ) : (
                              <div className="flex h-full w-full items-center justify-center text-blue-300">
                                <AiOutlineShopping className="text-xl" />
                              </div>
                            )}
                          </div>

                          <div>
                            <h4 className="text-xs font-extrabold text-gray-900">
                              {item.name || "Product"}
                            </h4>

                            <span className="text-[11px] text-gray-500">
                              Qty: {quantity} {item.unit || ""}
                            </span>
                          </div>
                        </div>

                        {/* ITEM PRICES */}

                        <div className="flex w-full items-center justify-between gap-6 border-t border-gray-200 pt-2 text-xs sm:w-auto sm:justify-end sm:border-t-0 sm:pt-0">
                          <span className="text-gray-500">
                            Unit: ₦{formatMoney(unitPrice)}
                          </span>

                          <span className="font-black text-blue-900">
                            ₦{formatMoney(itemTotal)}
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}

              {/* FINANCIAL BREAKDOWN */}

              <div className="ml-auto max-w-sm space-y-2 border-t border-gray-100 pt-6 text-xs">
                <div className="flex justify-between gap-4 text-gray-600">
                  <span>Items Subtotal</span>

                  <span className="font-bold text-gray-900">
                    ₦{formatMoney(subtotal)}
                  </span>
                </div>

                <div className="flex justify-between gap-4 text-gray-600">
                  <span>Delivery Fee</span>

                  <span className="font-bold text-gray-900">
                    ₦{formatMoney(deliveryFee)}
                  </span>
                </div>

                <div className="flex justify-between gap-4 text-gray-600">
                  <span>VAT (0.17%)</span>

                  <span className="font-bold text-gray-900">
                    ₦{formatMoney(vatAmount, true)}
                  </span>
                </div>

                <div className="flex justify-between gap-4 border-t border-gray-200 pt-3 text-sm font-black text-blue-900">
                  <span>Total Amount Paid</span>

                  <span className="text-base text-red-600">
                    ₦{formatMoney(grandTotal, true)}
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}