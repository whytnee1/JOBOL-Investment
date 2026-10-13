"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useFormik } from "formik";
import * as Yup from "yup";
import {
  AiOutlineUser,
  AiOutlineMail,
  AiOutlinePhone,
  AiOutlineEnvironment,
  AiOutlineLock,
  AiOutlineArrowRight,
  AiOutlineCheckCircle,
} from "react-icons/ai";

// Password regex: At least 6 chars, 1 uppercase, 1 number, 1 symbol
const passwordRules = /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!\%*?&]{6,}$/;

// Validation schema using Yup
const signupValidationSchema = Yup.object({
  firstName: Yup.string()
    .min(2, "First name must be at least 2 characters")
    .required("First name is required"),
  lastName: Yup.string()
    .min(2, "Last name must be at least 2 characters")
    .required("Last name is required"),
  middleName: Yup.string(),
  email: Yup.string()
    .email("Enter a valid email address")
    .required("Email address is required"),
  phone: Yup.string()
    .matches(/^[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,6}$/, "Enter a valid phone number")
    .required("Phone number is required"),
  address: Yup.string()
    .min(5, "Address must be at least 5 characters")
    .required("Delivery address is required"),
  password: Yup.string()
    .matches(
      passwordRules,
      "Password must be at least 6 characters, include 1 uppercase letter, 1 number, and 1 symbol."
    )
    .required("Password is required"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password"), null], "Passwords must match")
    .required("Confirm password is required"),
});

export default function SignupPage() {
  const router = useRouter();
  const [successMsg, setSuccessMsg] = useState(false);

  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      middleName: "",
      email: "",
      phone: "",
      address: "",
      password: "",
      confirmPassword: "",
    },
    validationSchema: signupValidationSchema,
    onSubmit: (values) => {
      const displayName = `${values.firstName} ${values.lastName}`;
      const initials = `${values.firstName.charAt(0)}${values.lastName.charAt(0)}`.toUpperCase();

      // Exclude confirmPassword from persisted user object
      const { confirmPassword, ...userPayload } = values;

      const userData = {
        ...userPayload,
        displayName,
        initials,
        photoURL: null,
      };

      // Save user session to localStorage
      localStorage.setItem("jobol_user", JSON.stringify(userData));

      setSuccessMsg(true);
      setTimeout(() => {
        router.push("/");
      }, 1500);
    },
  });

  return (
    <main
      className="min-h-screen pb-32 relative bg-cover bg-center bg-fixed transition-all duration-500 text-slate-800"
      style={{ fontFamily: "Arial, sans-serif", backgroundImage: `url('/jobol%20logo1.png')` }}
    >
      <div className="absolute inset-0 bg-white/94 backdrop-blur-[2px] pointer-events-none" />

      <div className="relative z-10 max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        
        {/* Page Header */}
        <div className="text-center mb-8 space-y-2">
          <div className="inline-flex items-center gap-2 text-sm font-bold uppercase tracking-widest text-blue-700 mb-1">
            <span className="h-1 w-6 rounded-full bg-red-500" />
            JOBOL Investments
          </div>
          <h1 className="text-3xl sm:text-4xl font-black tracking-tight text-blue-900">
            Create Your Account
          </h1>
          <p className="text-xs text-gray-500">
            Register to easily manage orders, save delivery details, and track shipments.
          </p>
        </div>

        {/* Signup Form Card */}
        <div className="bg-white rounded-3xl border border-gray-200 p-6 sm:p-10 shadow-sm">
          
          {successMsg ? (
            <div className="py-12 text-center space-y-4">
              <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto text-3xl shadow-inner">
                <AiOutlineCheckCircle />
              </div>
              <h2 className="text-xl font-black text-gray-900">Registration Successful!</h2>
              <p className="text-xs text-gray-500">Redirecting you to the home page...</p>
            </div>
          ) : (
            <form onSubmit={formik.handleSubmit} className="space-y-4">
              
              {/* Names Row */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">First Name</label>
                  <input
                    type="text"
                    name="firstName"
                    placeholder="e.g. John"
                    value={formik.values.firstName}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    className={`w-full px-3 py-2.5 bg-gray-50 border rounded-xl text-xs font-semibold text-gray-900 focus:outline-none focus:ring-2 ${
                      formik.touched.firstName && formik.errors.firstName
                        ? "border-red-500 focus:ring-red-500"
                        : "border-gray-200 focus:ring-blue-600"
                    }`}
                  />
                  {formik.touched.firstName && formik.errors.firstName && (
                    <p className="text-[10px] text-red-600 font-bold mt-1">{formik.errors.firstName}</p>
                  )}
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">Last Name</label>
                  <input
                    type="text"
                    name="lastName"
                    placeholder="e.g. Doe"
                    value={formik.values.lastName}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    className={`w-full px-3 py-2.5 bg-gray-50 border rounded-xl text-xs font-semibold text-gray-900 focus:outline-none focus:ring-2 ${
                      formik.touched.lastName && formik.errors.lastName
                        ? "border-red-500 focus:ring-red-500"
                        : "border-gray-200 focus:ring-blue-600"
                    }`}
                  />
                  {formik.touched.lastName && formik.errors.lastName && (
                    <p className="text-[10px] text-red-600 font-bold mt-1">{formik.errors.lastName}</p>
                  )}
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">Middle Name (Opt.)</label>
                  <input
                    type="text"
                    name="middleName"
                    placeholder="Optional"
                    value={formik.values.middleName}
                    onChange={formik.handleChange}
                    className="w-full px-3 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-xs font-semibold text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-600"
                  />
                </div>
              </div>

              {/* Email & Phone Row */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">Email Address</label>
                  <div className="relative">
                    <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-400">
                      <AiOutlineMail />
                    </span>
                    <input
                      type="email"
                      name="email"
                      placeholder="e.g. example@email.com"
                      value={formik.values.email}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      className={`w-full pl-9 pr-3 py-2.5 bg-gray-50 border rounded-xl text-xs font-semibold text-gray-900 focus:outline-none focus:ring-2 ${
                        formik.touched.email && formik.errors.email
                          ? "border-red-500 focus:ring-red-500"
                          : "border-gray-200 focus:ring-blue-600"
                      }`}
                    />
                  </div>
                  {formik.touched.email && formik.errors.email && (
                    <p className="text-[10px] text-red-600 font-bold mt-1">{formik.errors.email}</p>
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

              {/* Address */}
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">Delivery Address</label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-400">
                    <AiOutlineEnvironment />
                  </span>
                  <input
                    type="text"
                    name="address"
                    placeholder="Enter your street address and state"
                    value={formik.values.address}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    className={`w-full pl-9 pr-3 py-2.5 bg-gray-50 border rounded-xl text-xs font-semibold text-gray-900 focus:outline-none focus:ring-2 ${
                      formik.touched.address && formik.errors.address
                        ? "border-red-500 focus:ring-red-500"
                        : "border-gray-200 focus:ring-blue-600"
                    }`}
                  />
                </div>
                {formik.touched.address && formik.errors.address && (
                  <p className="text-[10px] text-red-600 font-bold mt-1">{formik.errors.address}</p>
                )}
              </div>

              {/* Password & Confirm Password Row */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">Password</label>
                  <div className="relative">
                    <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-400">
                      <AiOutlineLock />
                    </span>
                    <input
                      type="password"
                      name="password"
                      placeholder="Min 6 chars (1 Uppercase, 1 Number, 1 Symbol)"
                      value={formik.values.password}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      className={`w-full pl-9 pr-3 py-2.5 bg-gray-50 border rounded-xl text-xs font-semibold text-gray-900 focus:outline-none focus:ring-2 ${
                        formik.touched.password && formik.errors.password
                          ? "border-red-500 focus:ring-red-500"
                          : "border-gray-200 focus:ring-blue-600"
                      }`}
                    />
                  </div>
                  {formik.touched.password && formik.errors.password && (
                    <p className="text-[10px] text-red-600 font-bold mt-1">{formik.errors.password}</p>
                  )}
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">Confirm Password</label>
                  <div className="relative">
                    <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-400">
                      <AiOutlineLock />
                    </span>
                    <input
                      type="password"
                      name="confirmPassword"
                      placeholder="Re-enter password"
                      value={formik.values.confirmPassword}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      className={`w-full pl-9 pr-3 py-2.5 bg-gray-50 border rounded-xl text-xs font-semibold text-gray-900 focus:outline-none focus:ring-2 ${
                        formik.touched.confirmPassword && formik.errors.confirmPassword
                          ? "border-red-500 focus:ring-red-500"
                          : "border-gray-200 focus:ring-blue-600"
                      }`}
                    />
                  </div>
                  {formik.touched.confirmPassword && formik.errors.confirmPassword && (
                    <p className="text-[10px] text-red-600 font-bold mt-1">{formik.errors.confirmPassword}</p>
                  )}
                </div>
              </div>

              <button
                type="submit"
                className="w-full mt-6 py-4 bg-blue-600 hover:bg-red-600 text-white rounded-2xl font-extrabold text-xs transition-colors shadow-lg shadow-blue-600/25 flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Register Account</span>
                <AiOutlineArrowRight className="text-base" />
              </button>

              <div className="pt-4 text-center">
                <p className="text-xs text-gray-500">
                  Already have an account?{" "}
                  <Link href="/signin" className="font-bold text-blue-600 hover:underline">
                    Log In
                  </Link>
                </p>
              </div>

            </form>
          )}

        </div>

      </div>
    </main>
  );
}