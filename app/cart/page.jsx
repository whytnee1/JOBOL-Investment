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

// Validation schema using Yup for delivery & contact details
const deliveryValidationSchema = Yup.object({
  fullName: Yup.string()
    .min(3, "Full name must be at least 3 characters")
    .required("Full name is required"),
  phone: Yup.string()
    .matches(/^[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,6}$/, "Enter a valid phone number")
    .required("Phone number is required"),
  state: Yup.string().required("Delivery state is required"),
  streetAddress: Yup.string()
    .min(5, "Street address must be at least 5 characters")
    .required("Street address is required"),
  deliveryInstructions: Yup.string(),
});

const nigerianStates = [
  "Abuja (FCT)",
  "Niger",
//   "Lagos",
//   "Port Harcourt (Rivers)",
//   "Kaduna",
//   "Kogi",
//   "Nassarawa",
//   "Edo",
//   "Delta",
];

export default function CartPage() {
  const router = useRouter();
  const [cartItems, setCartItems] = useState([]);

  // Load cart items saved from the home/products page on client mount & listen for storage updates
  useEffect(() => {
    const loadCart = () => {
      const storedCart = localStorage.getItem("jobol_cart");
      if (storedCart) {
        try {
          const parsed = JSON.parse(storedCart);
          const initializedItems = parsed.map((item) => ({
            ...item,
            unitPrice: item.unitPrice !== undefined ? item.unitPrice : "",
            quantity: item.quantity !== undefined ? item.quantity : 1,
            unit: item.unit || "basket",
          }));
          setCartItems(initializedItems);
        } catch (err) {
          console.error("Failed to parse cart items", err);
        }
      }
    };

    loadCart();

    // Event listener to instantly catch cart updates if triggered in same session
    window.addEventListener("storage", loadCart);
    return () => window.removeEventListener("storage", loadCart);
  }, []);

  // Update localStorage whenever cart items change
  const updateCartStorage = (updatedItems) => {
    setCartItems(updatedItems);
    localStorage.setItem("jobol_cart", JSON.stringify(updatedItems));
  };

  // Quantity handlers using + and -
  const increaseQuantity = (id) => {
    const updated = cartItems.map((item) =>
      item.id === id ? { ...item, quantity: (item.quantity || 0) + 1 } : item
    );
    updateCartStorage(updated);
  };

  const decreaseQuantity = (id) => {
    const updated = cartItems.map((item) =>
      item.id === id && (item.quantity || 0) > 1
        ? { ...item, quantity: item.quantity - 1 }
        : item
    );
    updateCartStorage(updated);
  };

  // Unit price editor
  const handlePriceChange = (id, newPrice) => {
    const updated = cartItems.map((item) =>
      item.id === id ? { ...item, unitPrice: newPrice } : item
    );
    updateCartStorage(updated);
  };

  // Unit text editor (e.g., basket, bag, kg, painter)
  const handleUnitChange = (id, newUnit) => {
    const updated = cartItems.map((item) =>
      item.id === id ? { ...item, unit: newUnit } : item
    );
    updateCartStorage(updated);
  };

  const removeItem = (id) => {
    const updated = cartItems.filter((item) => item.id !== id);
    updateCartStorage(updated);
  };

  // Calculations
  const subtotal = cartItems.reduce(
    (sum, item) => sum + (parseFloat(item.unitPrice) || 0) * (item.quantity || 0),
    0
  );

  const deliveryFee = 5000; // Static delivery fee of ₦5,000
  const vatRate = 0.0017; // 0.17 percent VAT
  const vatAmount = subtotal * vatRate;
  const grandTotal = subtotal + (cartItems.length > 0 ? deliveryFee : 0) + vatAmount;

  // Formik form setup for delivery and contact details
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
        alert("Your cart is empty! Please add items from the home page.");
        return;
      }

      const hasInvalidItem = cartItems.some(
        (item) =>
          item.unitPrice === "" ||
          parseFloat(item.unitPrice) <= 0 ||
          !item.quantity ||
          item.quantity <= 0
      );

      if (hasInvalidItem) {
        alert("Please ensure all items have a valid unit price and quantity greater than 0.");
        return;
      }

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

      // Save draft order payload for the submit page to read
      localStorage.setItem("jobol_pending_order", JSON.stringify(orderPayload));

      // Redirect user to the dedicated submit page
      router.push("/submit");
    },
  });

  return (
    <main
      className="min-h-screen pb-32 relative bg-cover bg-center bg-fixed transition-all duration-500 text-slate-800"
      style={{ fontFamily: "Arial, sans-serif", backgroundImage: `url('/jobol%20logo1.png')` }}
    >
      <div className="absolute inset-0 bg-white/94 backdrop-blur-[2px] pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        
        {/* Page Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div>
            <div className="inline-flex items-center gap-2 text-sm font-bold uppercase tracking-widest text-blue-700 mb-1">
              <span className="h-1 w-6 rounded-full bg-red-500" />
              JOBOL Investments
            </div>
            <h1 className="text-3xl sm:text-4xl font-black tracking-tight text-blue-900">
              Shopping Cart & Checkout
            </h1>
          </div>
          <Link
            href="/"
            className="self-start md:self-auto px-5 py-2.5 bg-blue-50 hover:bg-blue-100 text-blue-700 border border-blue-200 rounded-2xl text-xs font-bold transition-colors shadow-xs"
          >
            ← Continue Shopping (Home)
          </Link>
        </div>

        <form onSubmit={formik.handleSubmit} className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* LEFT 2 COLUMNS: CART ITEMS & DELIVERY FORM */}
          <div className="lg:col-span-2 space-y-6">
            
            <div className="bg-white rounded-3xl border border-gray-200 p-6 shadow-sm">
              <div className="flex items-center justify-between pb-4 border-b border-gray-100 mb-4">
                <h2 className="text-lg font-black text-gray-900 flex items-center gap-2">
                  <AiOutlineShoppingCart className="text-blue-600 text-xl" />
                  Cart Items ({cartItems.length})
                </h2>
                <span className="text-xs font-semibold text-gray-500">Auto-saved from home page</span>
              </div>

              {cartItems.length === 0 ? (
                <div className="py-12 text-center space-y-3">
                  <p className="text-xs text-gray-500 font-medium">Your cart is currently empty. Click "Add to Cart" from the home page.</p>
                  <Link
                    href="/"
                    className="inline-block px-6 py-2.5 bg-blue-600 text-white rounded-xl text-xs font-bold hover:bg-blue-700 transition-colors"
                  >
                    Browse Products
                  </Link>
                </div>
              ) : (
                <div className="space-y-4">
                  {cartItems.map((item) => (
                    <div
                      key={item.id}
                      className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-4 rounded-2xl border border-gray-100 bg-gray-50/50 hover:bg-white hover:border-blue-200 transition-all shadow-xs"
                    >
                      <div className="flex items-center gap-3 w-full sm:w-auto">
                        <div className="w-16 h-16 rounded-xl overflow-hidden bg-white shrink-0 shadow-inner border border-gray-100">
                          <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                        </div>
                        <div>
                          <h3 className="text-sm font-extrabold text-gray-900">{item.name}</h3>
                          <div className="mt-1 flex items-center gap-1">
                            <span className="text-[10px] text-gray-400 uppercase font-bold">Unit:</span>
                            <input
                              type="text"
                              placeholder="e.g. basket"
                              value={item.unit}
                              onChange={(e) => handleUnitChange(item.id, e.target.value)}
                              className="w-24 px-2 py-0.5 bg-white border border-gray-200 rounded-lg text-[11px] font-semibold text-gray-900 focus:outline-none focus:ring-1 focus:ring-blue-600"
                            />
                          </div>
                        </div>
                      </div>

                      <div className="flex flex-col sm:items-end w-full sm:w-auto">
                        <label className="text-[10px] font-bold text-gray-400 uppercase">Unit Price (₦)</label>
                        <input
                          type="number"
                          placeholder="Enter price"
                          value={item.unitPrice}
                          onChange={(e) => handlePriceChange(item.id, e.target.value)}
                          className="w-28 px-2.5 py-1.5 bg-white border border-gray-200 rounded-xl text-xs font-bold text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-600"
                        />
                      </div>

                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          onClick={() => decreaseQuantity(item.id)}
                          className="w-8 h-8 rounded-xl bg-white border border-gray-200 flex items-center justify-center text-gray-700 hover:bg-gray-100 transition-colors shadow-xs"
                          aria-label="Decrease quantity"
                        >
                          <AiOutlineMinus className="text-xs" />
                        </button>
                        <span className="w-6 text-center text-xs font-extrabold text-gray-900">{item.quantity || 1}</span>
                        <button
                          type="button"
                          onClick={() => increaseQuantity(item.id)}
                          className="w-8 h-8 rounded-xl bg-white border border-gray-200 flex items-center justify-center text-gray-700 hover:bg-gray-100 transition-colors shadow-xs"
                          aria-label="Increase quantity"
                        >
                          <AiOutlinePlus className="text-xs" />
                        </button>
                      </div>

                      <div className="flex items-center justify-between sm:justify-end w-full sm:w-auto gap-4 pt-2 sm:pt-0 border-t sm:border-t-0 border-gray-200">
                        <span className="text-sm font-black text-blue-900">
                          ₦{((parseFloat(item.unitPrice) || 0) * (item.quantity || 1)).toLocaleString()}
                        </span>
                        <button
                          type="button"
                          onClick={() => removeItem(item.id)}
                          className="p-2 text-gray-400 hover:text-red-600 rounded-full hover:bg-red-50 transition-colors"
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
            <div className="bg-white rounded-3xl border border-gray-200 p-6 shadow-sm space-y-4">
              <h2 className="text-lg font-black text-gray-900 flex items-center gap-2 pb-3 border-b border-gray-100">
                <AiOutlineEnvironment className="text-red-600 text-xl" />
                Delivery & Contact Details
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">Full Name</label>
                  <div className="relative">
                    <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-400">
                      <AiOutlineUser />
                    </span>
                    <input
                      type="text"
                      name="fullName"
                      placeholder="e.g. John Doe"
                      value={formik.values.fullName}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      className={`w-full pl-9 pr-3 py-2.5 bg-gray-50 border rounded-xl text-xs font-semibold text-gray-900 focus:outline-none focus:ring-2 ${
                        formik.touched.fullName && formik.errors.fullName
                          ? "border-red-500 focus:ring-red-500"
                          : "border-gray-200 focus:ring-blue-600"
                      }`}
                    />
                  </div>
                  {formik.touched.fullName && formik.errors.fullName && (
                    <p className="text-[10px] text-red-600 font-bold mt-1">{formik.errors.fullName}</p>
                  )}
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">Phone Number</label>
                  <div className="relative">
                    <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-400">
                      <AiOutlinePhone />
                    </span>
                    <input
                      type="text"
                      name="phone"
                      placeholder="e.g. 00000000000"
                      value={formik.values.phone}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      className={`w-full pl-9 pr-3 py-2.5 bg-gray-50 border rounded-xl text-xs font-semibold text-gray-900 focus:outline-none focus:ring-2 ${
                        formik.touched.phone && formik.errors.phone
                          ? "border-red-500 focus:ring-red-500"
                          : "border-gray-200 focus:ring-blue-600"
                      }`}
                    />
                  </div>
                  {formik.touched.phone && formik.errors.phone && (
                    <p className="text-[10px] text-red-600 font-bold mt-1">{formik.errors.phone}</p>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">Delivery State</label>
                  <select
                    name="state"
                    value={formik.values.state}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    className="w-full px-3 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-xs font-semibold text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-600"
                  >
                    {nigerianStates.map((st) => (
                      <option key={st} value={st}>{st}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">Street Address</label>
                  <input
                    type="text"
                    name="streetAddress"
                    placeholder="Enter your street address"
                    value={formik.values.streetAddress}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    className={`w-full px-3 py-2.5 bg-gray-50 border rounded-xl text-xs font-semibold text-gray-900 focus:outline-none focus:ring-2 ${
                      formik.touched.streetAddress && formik.errors.streetAddress
                        ? "border-red-500 focus:ring-red-500"
                        : "border-gray-200 focus:ring-blue-600"
                    }`}
                  />
                  {formik.touched.streetAddress && formik.errors.streetAddress && (
                    <p className="text-[10px] text-red-600 font-bold mt-1">{formik.errors.streetAddress}</p>
                  )}
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">Delivery Instructions (Optional)</label>
                <input
                  type="text"
                  name="deliveryInstructions"
                  placeholder="e.g. Call upon arrival near the junction."
                  value={formik.values.deliveryInstructions}
                  onChange={formik.handleChange}
                  className="w-full px-3 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-xs font-semibold text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-600"
                />
              </div>
            </div>

          </div>

          {/* RIGHT COLUMN: ORDER SUMMARY */}
          <div className="space-y-6">
            <div className="bg-white rounded-3xl border border-gray-200 p-6 shadow-sm space-y-4">
              <h3 className="text-base font-black text-gray-900 pb-3 border-b border-gray-100">
                Order Summary
              </h3>

              <div className="space-y-2.5 text-xs">
                <div className="flex justify-between text-gray-600">
                  <span>Products Subtotal</span>
                  <span className="font-bold text-gray-900">₦{subtotal.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Delivery Fee</span>
                  <span className="font-bold text-gray-900">₦{deliveryFee.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>VAT (0.17%)</span>
                  <span className="font-bold text-gray-900">₦{vatAmount.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
                </div>
                <div className="pt-3 border-t border-gray-100 flex justify-between text-sm font-black text-blue-900">
                  <span>Total Amount</span>
                  <span className="text-base text-red-600">₦{grandTotal.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
                </div>
              </div>

              <button
                type="submit"
                disabled={cartItems.length === 0}
                className="w-full mt-4 py-4 bg-blue-600 hover:bg-red-600 text-white rounded-2xl font-extrabold text-xs transition-colors shadow-lg shadow-blue-600/25 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
              >
                <span>Submit Order & Proceed</span>
                <AiOutlineArrowRight className="text-base" />
              </button>

              <p className="text-[11px] text-center text-gray-400 mt-2">
                Secure checkout powered by JOBOL Investments
              </p>
            </div>
          </div>

        </form>

      </div>
    </main>
  );
}