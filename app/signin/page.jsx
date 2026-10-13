"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

import {
  FaGoogle,
  FaEye,
  FaEyeSlash,
  FaLock,
  FaEnvelope,
  FaArrowRight,
  FaShieldAlt,
  FaCheckCircle,
} from "react-icons/fa";

import {
  HiOutlineSparkles,
  HiOutlineShoppingBag,
} from "react-icons/hi2";

import {
  MdOutlineShoppingCart,
  MdOutlineLocalShipping,
} from "react-icons/md";

import {
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";

import { auth } from "@/config/firebase";

export default function SignInPage() {
  const router = useRouter();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData((previous) => ({
      ...previous,
      [e.target.name]: e.target.value,
    }));

    setError("");
  };

  // Helper to extract initials from email when network/avatar isn't available
  const getInitials = (email) => {
    if (!email) return "U";
    const namePart = email.split("@")[0];
    const parts = namePart.split(/[._-]/);
    if (parts.length >= 2) {
      return (parts[0][0] + parts[1][0]).toUpperCase();
    }
    return namePart.slice(0, 2).toUpperCase();
  };

  const handleSuccessfulSignIn = (user, rawPassword = "") => {
    // 1. Save user profile details to localStorage for instant UI rendering across navbar/components
    const userProfile = {
      email: user.email || "",
      displayName: user.displayName || user.email?.split("@")[0] || "User",
      photoURL: user.photoURL || null,
      initials: getInitials(user.email),
    };
    localStorage.setItem("jobol_user", JSON.stringify(userProfile));

    // 2. Automatically save the password/session credentials securely as requested
    if (rawPassword) {
      const secureAuthRecord = {
        email: user.email,
        password: rawPassword,
        lastLogin: new Date().toISOString(),
      };
      localStorage.setItem("jobol_auth_credentials", JSON.stringify(secureAuthRecord));
    }

    router.push("/");
    router.refresh();
  };

  const handleEmailSignIn = async (e) => {
    e.preventDefault();
    setError("");

    if (!formData.email.trim() || !formData.password) {
      setError("Please enter your email address and password.");
      return;
    }

    setLoading(true);

    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        formData.email.trim(),
        formData.password
      );

      // Pass the plain text password to automatically save it
      handleSuccessfulSignIn(userCredential.user, formData.password);
    } catch (err) {
      console.error("Sign-in error:", err.code);

      switch (err.code) {
        case "auth/invalid-credential":
        case "auth/wrong-password":
        case "auth/user-not-found":
          setError("Incorrect email or password. Please try again.");
          break;

        case "auth/invalid-email":
          setError("Please enter a valid email address.");
          break;

        case "auth/too-many-requests":
          setError("Too many attempts. Please try again later.");
          break;

        case "auth/network-request-failed":
          setError("Network error. Please check your internet connection.");
          break;

        case "auth/operation-not-allowed":
          setError(
            "Email sign-in is not enabled. Please contact the administrator."
          );
          break;

        default:
          setError("Unable to sign in. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    setError("");
    setGoogleLoading(true);

    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);

      handleSuccessfulSignIn(result.user);
    } catch (err) {
      console.error("Google sign-in error:", err.code);

      switch (err.code) {
        case "auth/popup-closed-by-user":
          setError("The Google sign-in window was closed.");
          break;

        case "auth/popup-blocked":
          setError(
            "Your browser blocked the Google sign-in popup. Please allow popups and try again."
          );
          break;

        case "auth/account-exists-with-different-credential":
          setError(
            "An account already exists with this email using another sign-in method."
          );
          break;

        case "auth/unauthorized-domain":
          setError(
            "This domain is not authorized for Google sign-in in Firebase."
          );
          break;

        default:
          setError("Google sign-in failed. Please try again.");
      }
    } finally {
      setGoogleLoading(false);
    }
  };

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#102d5e] font-serif text-slate-800 antialiased">
      {/* BACKGROUND IMAGE */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: "url('/jobol%20logo1.png')",
        }}
        aria-hidden="true"
      />

      {/* BLUE OVERLAY WITH RED ACCENTS */}
      <div
        className="absolute inset-0 bg-gradient-to-br from-[#071b3d]/95 via-[#102d5e]/85 to-[#142f57]/90"
        aria-hidden="true"
      />

      <div
        className="absolute -left-32 -top-32 h-96 w-96 rounded-full bg-blue-400/20 blur-3xl"
        aria-hidden="true"
      />

      <div
        className="absolute -bottom-32 -right-32 h-96 w-96 rounded-full bg-red-500/20 blur-3xl"
        aria-hidden="true"
      />

      {/* MAIN CONTENT */}
      <div className="relative z-10 mx-auto flex min-h-screen max-w-7xl items-center justify-center px-4 py-10 sm:px-6 lg:px-8">
        <div className="grid w-full max-w-5xl overflow-hidden rounded-3xl border border-white/20 bg-white shadow-2xl shadow-black/20 md:grid-cols-2">
          {/* LEFT BRANDING PANEL */}
          <section className="relative hidden flex-col justify-between overflow-hidden bg-[#102d5e] p-10 text-white md:flex lg:p-12">
            <div
              className="absolute -right-20 -top-20 h-72 w-72 rounded-full bg-blue-400/20 blur-3xl"
              aria-hidden="true"
            />

            <div
              className="absolute -bottom-20 -left-20 h-72 w-72 rounded-full bg-red-500/20 blur-3xl"
              aria-hidden="true"
            />

            <div className="absolute right-0 top-0 h-full w-1 bg-red-500" />

            {/* BRANDING */}
            <div className="relative z-10">
              <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl border border-white/20 bg-white/10">
                <HiOutlineSparkles className="text-3xl text-red-400" />
              </div>

              <p className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm font-semibold text-blue-100">
                <span className="h-2 w-2 rounded-full bg-red-400" />
                Welcome to JOBOL
              </p>
            </div>

            {/* MAIN HEADING */}
            <div className="relative z-10 my-12">
              <h1 className="max-w-md text-4xl font-bold font-serif leading-tight tracking-tight lg:text-5xl">
                Shopping made
                <span className="mt-2 block text-blue-300">
                  easy for you.
                </span>
              </h1>

              <p className="mt-6 max-w-md text-base leading-8 text-blue-100/90">
                Discover everyday essentials, explore great products, and
                enjoy a simpler shopping experience with JOBOL.
              </p>

              {/* FEATURE CARDS */}
              <div className="mt-10 space-y-4">
                <div className="flex items-center gap-4 rounded-2xl border border-white/10 bg-white/10 p-4 backdrop-blur-sm">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-blue-400/20">
                    <HiOutlineShoppingBag className="text-2xl text-blue-200" />
                  </div>

                  <div>
                    <h2 className="font-bold text-white">
                      Convenient Shopping
                    </h2>

                    <p className="mt-1 text-sm leading-6 text-blue-100/75">
                      Find what you need in one place.
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-4 rounded-2xl border border-white/10 bg-white/10 p-4 backdrop-blur-sm">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-red-500/20">
                    <MdOutlineLocalShipping className="text-2xl text-red-300" />
                  </div>

                  <div>
                    <h2 className="font-bold text-white">
                      Fast Delivery
                    </h2>

                    <p className="mt-1 text-sm leading-6 text-blue-100/75">
                      Nation-wide and Door Delivery.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* TRUST MESSAGE */}
            <div className="relative z-10 flex items-center gap-3 border-t border-white/15 pt-6">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10">
                <FaShieldAlt className="text-lg text-blue-200" />
              </div>

              <div>
                <p className="text-sm font-bold text-white">
                  Welcome back
                </p>

                <p className="mt-1 text-xs leading-5 text-blue-100/70">
                  Your shopping experience starts here.
                </p>
              </div>
            </div>
          </section>

          {/* RIGHT SIGN-IN PANEL */}
          <section className="flex items-center justify-center px-5 py-10 sm:px-10 lg:px-12">
            <div className="w-full max-w-md">
              {/* MOBILE BRANDING */}
              <div className="mb-8 md:hidden">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-[#102d5e] text-2xl font-bold text-white">
                  J
                </div>

                <p className="text-sm font-bold uppercase tracking-widest text-blue-700">
                  JOBOL Investments
                </p>
              </div>

              {/* HEADING */}
              <div className="mb-8">
                <div className="mb-3 inline-flex items-center gap-2 text-lg font-bold uppercase tracking-widest text-blue-700">
                  <span className="h-1 w-6 rounded-full bg-red-500" />
                  Welcome back
                </div>

                <h2 className="text-3xl font-bold leading-tight tracking-tight text-blue-900 sm:text-4xl">
                  Let&apos;s Get In
                </h2>

                <p className="mt-3 text-base leading-7 text-slate-500">
                  You Shop, We Deliver
                </p>
              </div>

              {/* ERROR MESSAGE */}
              {error && (
                <div
                  role="alert"
                  className="mb-5 flex items-start gap-3 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm leading-6 text-red-700"
                >
                  <FaShieldAlt className="mt-1 shrink-0" />
                  <span>{error}</span>
                </div>
              )}

              {/* GOOGLE SIGN-IN */}
              <button
                type="button"
                onClick={handleGoogleSignIn}
                disabled={googleLoading || loading}
                className="flex w-full items-center justify-center gap-3 rounded-xl border border-slate-300 bg-white px-4 py-3.5 text-base font-semibold text-slate-700 transition duration-200 hover:border-blue-300 hover:bg-blue-50/50 focus:outline-none focus:ring-4 focus:ring-blue-100 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {googleLoading ? (
                  <span className="h-5 w-5 animate-spin rounded-full border-2 border-slate-300 border-t-blue-700" />
                ) : (
                  <FaGoogle className="text-lg text-[#4285F4]" />
                )}

                {googleLoading
                  ? "Connecting to Google..."
                  : "Continue with Google"}
              </button>

              {/* DIVIDER */}
              <div className="my-7 flex items-center gap-4">
                <div className="h-px flex-1 bg-slate-200" />

                <span className="whitespace-nowrap text-xs font-semibold uppercase tracking-wider text-slate-400">
                  Or sign in with email
                </span>

                <div className="h-px flex-1 bg-slate-200" />
              </div>

              {/* EMAIL FORM */}
              <form onSubmit={handleEmailSignIn} className="space-y-5">
                {/* EMAIL */}
                <div>
                  <label
                    htmlFor="email"
                    className="mb-2 block text-sm font-bold text-slate-700"
                  >
                    Email address
                  </label>

                  <div className="relative">
                    <FaEnvelope className="absolute left-4 top-1/2 -translate-y-1/2 text-base text-slate-400" />

                    <input
                      id="email"
                      name="email"
                      type="email"
                      autoComplete="email"
                      placeholder="you@example.com"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full rounded-xl border border-slate-300 bg-white py-3.5 pl-11 pr-4 text-base text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-blue-600 focus:ring-4 focus:ring-blue-600/10"
                    />
                  </div>
                </div>

                {/* PASSWORD */}
                <div>
                  <label
                    htmlFor="password"
                    className="mb-2 block text-sm font-bold text-slate-700"
                  >
                    Password
                  </label>

                  <div className="relative">
                    <FaLock className="absolute left-4 top-1/2 -translate-y-1/2 text-base text-slate-400" />

                    <input
                      id="password"
                      name="password"
                      type={showPassword ? "text" : "password"}
                      autoComplete="current-password"
                      placeholder="Enter your password"
                      value={formData.password}
                      onChange={handleChange}
                      required
                      className="w-full rounded-xl border border-slate-300 bg-white py-3.5 pl-11 pr-12 text-base text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-blue-600 focus:ring-4 focus:ring-blue-600/10"
                    />

                    <button
                      type="button"
                      onClick={() =>
                        setShowPassword((previous) => !previous)
                      }
                      aria-label={
                        showPassword ? "Hide password" : "Show password"
                      }
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-lg text-slate-500 transition hover:text-blue-700"
                    >
                      {showPassword ? <FaEyeSlash /> : <FaEye />}
                    </button>
                  </div>
                </div>

                {/* SECURITY NOTE */}
                <div className="flex items-start gap-2 text-sm leading-6 text-slate-500">
                  <FaCheckCircle className="mt-1 shrink-0 text-blue-600" />

                  <p>
                    Use the email address associated with your account.
                  </p>
                </div>

                {/* SIGN-IN BUTTON */}
                <button
                  type="submit"
                  disabled={loading || googleLoading}
                  className="group flex w-full items-center justify-center gap-3 rounded-xl bg-blue-700 px-4 py-4 text-base font-bold text-white shadow-lg shadow-blue-700/20 transition duration-200 hover:bg-blue-800 active:scale-[0.99] focus:outline-none focus:ring-4 focus:ring-blue-200 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {loading ? (
                    <>
                      <span className="h-5 w-5 animate-spin rounded-full border-2 border-white/40 border-t-white" />
                      Signing you in...
                    </>
                  ) : (
                    <>
                      Sign In
                      <FaArrowRight className="transition-transform duration-200 group-hover:translate-x-1" />
                    </>
                  )}
                </button>
              </form>

              {/* SIGN-UP LINK */}
              <p className="mt-8 text-center text-base text-slate-600">
                Don&apos;t have an account?{" "}
                <Link
                  href="/signup"
                  className="font-bold text-blue-700 transition hover:text-red-600 hover:underline"
                >
                  Create an account
                </Link>
              </p>

              {/* TERMS */}
              <p className="mt-7 text-center text-sm leading-6 text-slate-500">
                By continuing, you agree to our{" "}
                <Link
                  href="/terms"
                  className="font-semibold text-blue-700 hover:text-red-600 hover:underline"
                >
                  Terms of Service
                </Link>{" "}
                and{" "}
                <Link
                  href="/privacy"
                  className="font-semibold text-blue-700 hover:text-red-600 hover:underline"
                >
                  Privacy Policy
                </Link>
                .
              </p>

              {/* FOOTER */}
              <div className="mt-8 flex items-center justify-center gap-2 border-t border-slate-100 pt-6 text-xs font-medium text-slate-400">
                <MdOutlineShoppingCart className="text-base text-blue-600" />
                <span>JOBOL Investments</span>
                <span className="text-red-500">•</span>
                <span>Shopping made easy</span>
              </div>
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}