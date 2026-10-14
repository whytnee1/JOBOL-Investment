"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useFormik } from "formik";
import * as Yup from "yup";
import {
  AiOutlineShoppingCart,
  AiOutlineDelete,
  AiOutlineEnvironment,
  AiOutlinePhone,
  AiOutlineUser,
  AiOutlineArrowRight,
  AiOutlinePlus,
  AiOutlineMinus,
} from "react-icons/ai";

// =====================================================
// VALIDATION SCHEMA
// =====================================================

const deliveryValidationSchema = Yup.object({
  fullName: Yup.string()
    .min(3, "Full name must be at least 3 characters")
    .required("Full name is required"),

  phone: Yup.string()
    .matches(
      /^[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,6}$/,
      "Enter a valid phone number"
    )
    .required("Phone number is required"),

  state: Yup.string().required("Delivery state is required"),

  streetAddress: Yup.string()
    .min(5, "Street address must be at least 5 characters")
    .required("Street address is required"),

  deliveryInstructions: Yup.string(),
});

const nigerianStates = ["Abuja (FCT)", "Niger"];

// =====================================================
// CART PAGE
// =====================================================

export default function CartPage() {
  const router = useRouter();

  const [cartItems, setCartItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmittingOrder, setIsSubmittingOrder] = useState(false);

  // =====================================================
  // LOAD CART
  // =====================================================

  useEffect(() => {
    let mounted = true;

    const loadCart = () => {
      try {
        const storedCart = localStorage.getItem("jobol_cart");

        if (storedCart) {
          const parsed = JSON.parse(storedCart);

          if (!Array.isArray(parsed)) {
            throw new Error("Stored cart data is not an array.");
          }

          const initializedItems = parsed.map((item) => ({
            ...item,
            unitPrice:
              item.unitPrice !== undefined ? item.unitPrice : "",
            quantity:
              item.quantity !== undefined ? item.quantity : 1,
            unit: item.unit || "basket",
          }));

          if (mounted) {
            setCartItems(initializedItems);
          }
        } else if (mounted) {
          setCartItems([]);
        }
      } catch (error) {
        console.error("Failed to load cart items:", error);

        if (mounted) {
          setCartItems([]);
        }
      } finally {
        if (mounted) {
          setIsLoading(false);
        }
      }
    };

    // Brief delay allows the transparent loading overlay to appear.
    const timer = window.setTimeout(loadCart, 300);

    // Listen for cart changes from other browser tabs.
    const handleStorage = (event) => {
      if (event.key === "jobol_cart") {
        loadCart();
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
  // UPDATE CART STORAGE
  // =====================================================

  const updateCartStorage = (updatedItems) => {
    setCartItems(updatedItems);

    try {
      localStorage.setItem("jobol_cart", JSON.stringify(updatedItems));
    } catch (error) {
      console.error("Failed to save cart:", error);

      alert(
        "Your cart could not be saved. Please check your browser storage."
      );
    }
  };

  // =====================================================
  // QUANTITY CONTROLS
  // =====================================================

  const increaseQuantity = (id) => {
    const updated = cartItems.map((item) =>
      item.id === id
        ? {
            ...item,
            quantity: (Number(item.quantity) || 1) + 1,
          }
        : item
    );

    updateCartStorage(updated);
  };

  const decreaseQuantity = (id) => {
    const updated = cartItems.map((item) =>
      item.id === id && (Number(item.quantity) || 1) > 1
        ? {
            ...item,
            quantity: Number(item.quantity) - 1,
          }
        : item
    );

    updateCartStorage(updated);
  };

  // =====================================================
  // PRICE AND UNIT EDITORS
  // =====================================================

  const handlePriceChange = (id, newPrice) => {
    const updated = cartItems.map((item) =>
      item.id === id
        ? { ...item, unitPrice: newPrice }
        : item
    );

    updateCartStorage(updated);
  };

  const handleUnitChange = (id, newUnit) => {
    const updated = cartItems.map((item) =>
      item.id === id
        ? { ...item, unit: newUnit }
        : item
    );

    updateCartStorage(updated);
  };

  // =====================================================
  // REMOVE ITEM
  // =====================================================

  const removeItem = (id) => {
    const updated = cartItems.filter((item) => item.id !== id);

    updateCartStorage(updated);
  };

  // =====================================================
  // ORDER CALCULATIONS
  // =====================================================

  const subtotal = cartItems.reduce(
    (sum, item) =>
      sum +
      (parseFloat(item.unitPrice) || 0) *
        (Number(item.quantity) || 0),
    0
  );

  const deliveryFee = 5000;
  const vatRate = 0.0017;
  const vatAmount = subtotal * vatRate;

  const grandTotal =
    subtotal +
    (cartItems.length > 0 ? deliveryFee : 0) +
    vatAmount;

  // =====================================================
  // FORM AND ORDER SUBMISSION
  // =====================================================

  const formik = useFormik({
    initialValues: {
      fullName: "",
      phone: "",
      state: "Abuja (FCT)",
      streetAddress: "",
      deliveryInstructions: "",
    },

    validationSchema: deliveryValidationSchema,

    onSubmit: (values) => {
      if (cartItems.length === 0) {
        alert(
          "Your cart is empty! Please add items from the home page."
        );
        return;
      }

      const hasInvalidItem = cartItems.some(
        (item) =>
          item.unitPrice === "" ||
          !Number.isFinite(Number(item.unitPrice)) ||
          Number(item.unitPrice) <= 0 ||
          !Number.isFinite(Number(item.quantity)) ||
          Number(item.quantity) <= 0
      );

      if (hasInvalidItem) {
        alert(
          "Please ensure all items have a valid unit price and quantity greater than 0."
        );
        return;
      }

      setIsSubmittingOrder(true);

      try {
        const orderPayload = {
          orderId: Math.floor(100000 + Math.random() * 900000),

          date: new Date().toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
            year: "numeric",
          }),

          items: cartItems,
          deliveryDetails: values,
          subtotal,
          deliveryFee,
          vatAmount,
          grandTotal,
        };

        localStorage.setItem(
          "jobol_pending_order",
          JSON.stringify(orderPayload)
        );

        router.push("/submit");
      } catch (error) {
        console.error("Failed to prepare order:", error);

        setIsSubmittingOrder(false);

        alert(
          "We could not prepare your order. Please try again."
        );
      }
    },
  });

  // =====================================================
  // TRANSPARENT LOADING OVERLAY
  // =====================================================

  if (isLoading || isSubmittingOrder) {
    return (
      <main
        className="fixed inset-0 z-[9999] flex min-h-screen items-center justify-center overflow-hidden px-5"
        style={{
          fontFamily: "Arial, sans-serif",

          // The page remains visible through this transparent overlay.
          backgroundColor: "rgba(7, 19, 41, 0.30)",

          // Blur the page slightly without completely hiding it.
          backdropFilter: "blur(2px)",
          WebkitBackdropFilter: "blur(2px)",
        }}
        aria-live="polite"
        aria-busy="true"
      >
        {/* =================================================
            TRANSPARENT BACKGROUND EFFECTS
        ================================================= */}

        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          {/* Red glow */}

          <div
            className="absolute -left-20 -top-20 h-64 w-64 rounded-full bg-red-500/20 blur-3xl sm:h-96 sm:w-96"
            style={{
              animation: "jobolGlow 4s ease-in-out infinite",
            }}
          />

          {/* Blue glow */}

          <div
            className="absolute -bottom-20 -right-20 h-64 w-64 rounded-full bg-blue-500/20 blur-3xl sm:h-96 sm:w-96"
            style={{
              animation: "jobolGlow 4s ease-in-out infinite reverse",
            }}
          />
        </div>

        {/* =================================================
            GLASS LOADING CARD
        ================================================= */}

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

            {/* JOBOL brand name */}

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

              {/* Moving red, white and blue line */}

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

          {/* Loading title */}

          <h1 className="text-lg font-extrabold tracking-wide text-white sm:text-xl">
            {isSubmittingOrder
              ? "Preparing Your Order"
              : "Loading Your Cart"}
          </h1>

          {/* Loading description */}

          <p className="mt-3 max-w-xs text-sm leading-6 text-white/75">
            {isSubmittingOrder
              ? "Please wait while we prepare your checkout..."
              : "Getting everything ready for you. Please wait..."}
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

        {/* =================================================
            ANIMATION STYLES
        ================================================= */}

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
  // CART PAGE
  // =====================================================

  return (
    <main
      className="relative min-h-screen bg-cover bg-center bg-fixed pb-32 text-slate-800 transition-all duration-500"
      style={{
        fontFamily: "Arial, sans-serif",
        backgroundImage: "url('/jobol%20logo1.png')",
      }}
    >
      {/* Page background overlay */}

      <div className="pointer-events-none absolute inset-0 bg-white/94 backdrop-blur-[2px]" />

      <div className="relative z-10 mx-auto max-w-7xl px-4 pt-8 sm:px-6 lg:px-8">
        {/* PAGE HEADER */}

        <div className="mb-8 flex flex-col justify-between gap-4 md:flex-row md:items-center">
          <div>
            <div className="mb-1 inline-flex items-center gap-2 text-sm font-bold uppercase tracking-widest text-blue-700">
              <span className="h-1 w-6 rounded-full bg-red-500" />
              JOBOL Investments
            </div>

            <h1 className="text-3xl font-black tracking-tight text-blue-900 sm:text-4xl">
              Shopping Cart & Checkout
            </h1>
          </div>

          <Link
            href="/"
            className="self-start rounded-2xl border border-blue-200 bg-blue-50 px-5 py-2.5 text-xs font-bold text-blue-700 shadow-sm transition-colors hover:bg-blue-100 md:self-auto"
          >
            ← Continue Shopping (Home)
          </Link>
        </div>

        {/* CART FORM */}

        <form
          onSubmit={formik.handleSubmit}
          className="grid grid-cols-1 gap-8 lg:grid-cols-3"
        >
          {/* LEFT COLUMNS: CART ITEMS & DELIVERY FORM */}

          <div className="space-y-6 lg:col-span-2">
            {/* CART ITEMS */}

            <div className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm">
              <div className="mb-4 flex items-center justify-between border-b border-gray-100 pb-4">
                <h2 className="flex items-center gap-2 text-lg font-black text-gray-900">
                  <AiOutlineShoppingCart className="text-xl text-blue-600" />
                  Cart Items ({cartItems.length})
                </h2>

                <span className="text-xs font-semibold text-gray-500">
                  Auto-saved from home page
                </span>
              </div>

              {cartItems.length === 0 ? (
                <div className="space-y-3 py-12 text-center">
                  <p className="text-xs font-medium text-gray-500">
                    Your cart is currently empty. Click "Add to Cart"
                    from the home page.
                  </p>

                  <Link
                    href="/"
                    className="inline-block rounded-xl bg-blue-600 px-6 py-2.5 text-xs font-bold text-white transition-colors hover:bg-blue-700"
                  >
                    Browse Products
                  </Link>
                </div>
              ) : (
                <div className="space-y-4">
                  {cartItems.map((item) => (
                    <div
                      key={item.id}
                      className="flex flex-col items-start justify-between gap-4 rounded-2xl border border-gray-100 bg-gray-50/50 p-4 shadow-sm transition-all hover:border-blue-200 hover:bg-white sm:flex-row sm:items-center"
                    >
                      <div className="flex w-full items-center gap-3 sm:w-auto">
                        <div className="h-16 w-16 shrink-0 overflow-hidden rounded-xl border border-gray-100 bg-white shadow-inner">
                          <img
                            src={item.image}
                            alt={item.name}
                            className="h-full w-full object-cover"
                          />
                        </div>

                        <div>
                          <h3 className="text-sm font-extrabold text-gray-900">
                            {item.name}
                          </h3>

                          <div className="mt-1 flex items-center gap-1">
                            <span className="text-[10px] font-bold uppercase text-gray-400">
                              Unit:
                            </span>

                            <input
                              type="text"
                              placeholder="e.g. basket"
                              value={item.unit}
                              onChange={(e) =>
                                handleUnitChange(
                                  item.id,
                                  e.target.value
                                )
                              }
                              className="w-24 rounded-lg border border-gray-200 bg-white px-2 py-0.5 text-[11px] font-semibold text-gray-900 focus:outline-none focus:ring-1 focus:ring-blue-600"
                            />
                          </div>
                        </div>
                      </div>

                      <div className="flex w-full flex-col sm:w-auto sm:items-end">
                        <label className="text-[10px] font-bold uppercase text-gray-400">
                          Unit Price (₦)
                        </label>

                        <input
                          type="number"
                          min="0"
                          placeholder="Enter price"
                          value={item.unitPrice}
                          onChange={(e) =>
                            handlePriceChange(
                              item.id,
                              e.target.value
                            )
                          }
                          className="w-28 rounded-xl border border-gray-200 bg-white px-2.5 py-1.5 text-xs font-bold text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-600"
                        />
                      </div>

                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          onClick={() => decreaseQuantity(item.id)}
                          className="flex h-8 w-8 items-center justify-center rounded-xl border border-gray-200 bg-white text-gray-700 shadow-sm transition-colors hover:bg-gray-100"
                          aria-label="Decrease quantity"
                        >
                          <AiOutlineMinus className="text-xs" />
                        </button>

                        <span className="w-6 text-center text-xs font-extrabold text-gray-900">
                          {item.quantity || 1}
                        </span>

                        <button
                          type="button"
                          onClick={() => increaseQuantity(item.id)}
                          className="flex h-8 w-8 items-center justify-center rounded-xl border border-gray-200 bg-white text-gray-700 shadow-sm transition-colors hover:bg-gray-100"
                          aria-label="Increase quantity"
                        >
                          <AiOutlinePlus className="text-xs" />
                        </button>
                      </div>

                      <div className="flex w-full items-center justify-between gap-4 border-t border-gray-200 pt-2 sm:w-auto sm:justify-end sm:border-t-0 sm:pt-0">
                        <span className="text-sm font-black text-blue-900">
                          ₦
                          {(
                            (parseFloat(item.unitPrice) || 0) *
                            (item.quantity || 1)
                          ).toLocaleString()}
                        </span>

                        <button
                          type="button"
                          onClick={() => removeItem(item.id)}
                          className="rounded-full p-2 text-gray-400 transition-colors hover:bg-red-50 hover:text-red-600"
                          aria-label="Remove item"
                        >
                          <AiOutlineDelete className="text-lg" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* DELIVERY FORM */}

            <div className="space-y-4 rounded-3xl border border-gray-200 bg-white p-6 shadow-sm">
              <h2 className="flex items-center gap-2 border-b border-gray-100 pb-3 text-lg font-black text-gray-900">
                <AiOutlineEnvironment className="text-xl text-red-600" />
                Delivery & Contact Details
              </h2>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                {/* FULL NAME */}

                <div>
                  <label className="mb-1 block text-xs font-bold text-gray-700">
                    Full Name
                  </label>

                  <div className="relative">
                    <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400">
                      <AiOutlineUser />
                    </span>

                    <input
                      type="text"
                      name="fullName"
                      placeholder="e.g. John Doe"
                      value={formik.values.fullName}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      className={`w-full rounded-xl border bg-gray-50 py-2.5 pl-9 pr-3 text-xs font-semibold text-gray-900 focus:outline-none focus:ring-2 ${
                        formik.touched.fullName &&
                        formik.errors.fullName
                          ? "border-red-500 focus:ring-red-500"
                          : "border-gray-200 focus:ring-blue-600"
                      }`}
                    />
                  </div>

                  {formik.touched.fullName &&
                    formik.errors.fullName && (
                      <p className="mt-1 text-[10px] font-bold text-red-600">
                        {formik.errors.fullName}
                      </p>
                    )}
                </div>

                {/* PHONE */}

                <div>
                  <label className="mb-1 block text-xs font-bold text-gray-700">
                    Phone Number
                  </label>

                  <div className="relative">
                    <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400">
                      <AiOutlinePhone />
                    </span>

                    <input
                      type="tel"
                      name="phone"
                      placeholder="e.g. 08012345678"
                      value={formik.values.phone}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      className={`w-full rounded-xl border bg-gray-50 py-2.5 pl-9 pr-3 text-xs font-semibold text-gray-900 focus:outline-none focus:ring-2 ${
                        formik.touched.phone &&
                        formik.errors.phone
                          ? "border-red-500 focus:ring-red-500"
                          : "border-gray-200 focus:ring-blue-600"
                      }`}
                    />
                  </div>

                  {formik.touched.phone &&
                    formik.errors.phone && (
                      <p className="mt-1 text-[10px] font-bold text-red-600">
                        {formik.errors.phone}
                      </p>
                    )}
                </div>
              </div>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                {/* DELIVERY STATE */}

                <div>
                  <label className="mb-1 block text-xs font-bold text-gray-700">
                    Delivery State
                  </label>

                  <select
                    name="state"
                    value={formik.values.state}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    className="w-full rounded-xl border border-gray-200 bg-gray-50 px-3 py-2.5 text-xs font-semibold text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-600"
                  >
                    {nigerianStates.map((st) => (
                      <option key={st} value={st}>
                        {st}
                      </option>
                    ))}
                  </select>

                  {formik.touched.state && formik.errors.state && (
                    <p className="mt-1 text-[10px] font-bold text-red-600">
                      {formik.errors.state}
                    </p>
                  )}
                </div>

                {/* STREET ADDRESS */}

                <div>
                  <label className="mb-1 block text-xs font-bold text-gray-700">
                    Street Address
                  </label>

                  <input
                    type="text"
                    name="streetAddress"
                    placeholder="Enter your street address"
                    value={formik.values.streetAddress}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    className={`w-full rounded-xl border bg-gray-50 px-3 py-2.5 text-xs font-semibold text-gray-900 focus:outline-none focus:ring-2 ${
                      formik.touched.streetAddress &&
                      formik.errors.streetAddress
                        ? "border-red-500 focus:ring-red-500"
                        : "border-gray-200 focus:ring-blue-600"
                    }`}
                  />

                  {formik.touched.streetAddress &&
                    formik.errors.streetAddress && (
                      <p className="mt-1 text-[10px] font-bold text-red-600">
                        {formik.errors.streetAddress}
                      </p>
                    )}
                </div>
              </div>

              {/* DELIVERY INSTRUCTIONS */}

              <div>
                <label className="mb-1 block text-xs font-bold text-gray-700">
                  Delivery Instructions (Optional)
                </label>

                <input
                  type="text"
                  name="deliveryInstructions"
                  placeholder="e.g. Call upon arrival near the junction."
                  value={formik.values.deliveryInstructions}
                  onChange={formik.handleChange}
                  className="w-full rounded-xl border border-gray-200 bg-gray-50 px-3 py-2.5 text-xs font-semibold text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-600"
                />
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN: ORDER SUMMARY */}

          <div className="space-y-6">
            <div className="space-y-4 rounded-3xl border border-gray-200 bg-white p-6 shadow-sm">
              <h3 className="border-b border-gray-100 pb-3 text-base font-black text-gray-900">
                Order Summary
              </h3>

              <div className="space-y-2.5 text-xs">
                <div className="flex justify-between text-gray-600">
                  <span>Products Subtotal</span>

                  <span className="font-bold text-gray-900">
                    ₦{subtotal.toLocaleString()}
                  </span>
                </div>

                <div className="flex justify-between text-gray-600">
                  <span>Delivery Fee</span>

                  <span className="font-bold text-gray-900">
                    ₦{deliveryFee.toLocaleString()}
                  </span>
                </div>

                <div className="flex justify-between text-gray-600">
                  <span>VAT (0.17%)</span>

                  <span className="font-bold text-gray-900">
                    ₦
                    {vatAmount.toLocaleString(undefined, {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    })}
                  </span>
                </div>

                <div className="flex justify-between border-t border-gray-100 pt-3 text-sm font-black text-blue-900">
                  <span>Total Amount</span>

                  <span className="text-base text-red-600">
                    ₦
                    {grandTotal.toLocaleString(undefined, {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    })}
                  </span>
                </div>
              </div>

              <button
                type="submit"
                disabled={
                  cartItems.length === 0 || isSubmittingOrder
                }
                className="mt-4 flex w-full cursor-pointer items-center justify-center gap-2 rounded-2xl bg-blue-600 py-4 text-xs font-extrabold text-white shadow-lg shadow-blue-600/25 transition-colors duration-300 hover:bg-red-600 disabled:cursor-not-allowed disabled:opacity-50"
              >
                <span>Submit Order & Proceed</span>

                <AiOutlineArrowRight className="text-base" />
              </button>

              <p className="mt-2 text-center text-[11px] text-gray-400">
                Secure checkout powered by JOBOL Investments
              </p>
            </div>
          </div>
        </form>
      </div>
    </main>
  );
}