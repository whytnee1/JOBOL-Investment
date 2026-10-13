"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  AiOutlineArrowLeft,
  AiOutlineCheckCircle,
  AiOutlineEye,
  AiOutlineEyeInvisible,
  AiOutlineLock,
  AiOutlineMail,
  AiOutlineSafety,
  AiOutlineUser,
} from "react-icons/ai";

export default function ForgotPasswordPage() {
  const [step, setStep] = useState(1);

  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] =
    useState(false);

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("error");

  function showMessage(text, type = "error") {
    setMessage(text);
    setMessageType(type);
  }

  async function postJSON(url, body) {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      cache: "no-store",
      body: JSON.stringify(body),
    });

    const data = await response.json().catch(() => ({}));

    if (!response.ok) {
      throw new Error(
        data.message || `Request failed with status ${response.status}.`
      );
    }

    return data;
  }

  // STEP 1: Send verification code to email.
  async function sendVerificationCode(event) {
    event.preventDefault();
    setMessage("");

    const normalizedEmail = email.trim().toLowerCase();

    if (!normalizedEmail) {
      showMessage("Please enter your email address.");
      return;
    }

    setLoading(true);

    try {
      const data = await postJSON(
        "/api/auth/forgot-password",
        {
          email: normalizedEmail,
        }
      );

      setEmail(normalizedEmail);
      setCode("");
      setStep(2);

      showMessage(
        data.message ||
          "If an account exists for this email, a verification code will be sent.",
        "success"
      );
    } catch (error) {
      showMessage(
        error.message ||
          "Unable to send the verification code. Please try again."
      );
    } finally {
      setLoading(false);
    }
  }

  // STEP 2: Verify the six-digit code.
  async function verifyCode(event) {
    event.preventDefault();
    setMessage("");

    if (!/^\d{6}$/.test(code)) {
      showMessage("Enter the complete six-digit verification code.");
      return;
    }

    setLoading(true);

    try {
      const data = await postJSON(
        "/api/auth/verify-reset-code",
        {
          email: email.trim().toLowerCase(),
          code,
        }
      );

      showMessage(
        data.message || "Email verified successfully.",
        "success"
      );

      setStep(3);
    } catch (error) {
      showMessage(
        error.message ||
          "Verification failed. Check your code and try again."
      );
    } finally {
      setLoading(false);
    }
  }

  // STEP 3: Reset the Firebase Authentication password.
  async function resetPassword(event) {
    event.preventDefault();
    setMessage("");

    if (newPassword.length < 8) {
      showMessage("Your password must contain at least 8 characters.");
      return;
    }

    if (newPassword !== confirmPassword) {
      showMessage("Your passwords do not match.");
      return;
    }

    setLoading(true);

    try {
      const data = await postJSON(
        "/api/auth/reset-password",
        {
          email: email.trim().toLowerCase(),
          code,
          password: newPassword,
        }
      );

      setStep(4);

      showMessage(
        data.message || "Your password has been reset successfully.",
        "success"
      );

      setNewPassword("");
      setConfirmPassword("");
    } catch (error) {
      showMessage(
        error.message ||
          "Unable to reset your password. Please try again."
      );
    } finally {
      setLoading(false);
    }
  }

  const steps = [
    { number: 1, label: "Email" },
    { number: 2, label: "Verify" },
    { number: 3, label: "Reset" },
  ];

  const messageClass =
    messageType === "success"
      ? "border-green-200 bg-green-50 text-green-700"
      : "border-red-200 bg-red-50 text-red-600";

  return (
    <main className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-amber-50 px-4 py-8 sm:px-6 lg:px-8">
      {/* Header */}
      <header className="mx-auto flex w-full max-w-6xl items-center justify-between">
        <Link
          href="/"
          className="flex items-center gap-2 text-2xl font-black tracking-tight text-orange-600 sm:text-3xl"
        >
          <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-orange-600 text-white shadow-lg shadow-orange-200">
            J
          </span>

          <span>
            Jobol<span className="text-gray-900">Market</span>
          </span>
        </Link>

        <Link
          href="/login"
          className="flex items-center gap-2 rounded-full border border-gray-200 bg-white px-4 py-2 text-sm font-semibold text-gray-700 transition hover:border-orange-300 hover:text-orange-600"
        >
          <AiOutlineArrowLeft size={18} />
          <span className="hidden sm:inline">Back to Login</span>
          <span className="sm:hidden">Login</span>
        </Link>
      </header>

      {/* Main card */}
      <section className="mx-auto mt-10 grid w-full max-w-5xl overflow-hidden rounded-3xl border border-white bg-white shadow-2xl shadow-orange-100/70 lg:mt-14 lg:grid-cols-2">
        {/* Left panel */}
        <div className="relative hidden overflow-hidden bg-gradient-to-br from-orange-600 via-orange-500 to-amber-400 p-10 text-white lg:flex lg:flex-col lg:justify-between">
          <div className="absolute -right-24 -top-24 h-72 w-72 rounded-full border-[35px] border-white/10" />

          <div className="absolute -bottom-24 -left-24 h-80 w-80 rounded-full bg-white/10 blur-2xl" />

          <div className="relative z-10">
            <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm font-medium backdrop-blur">
              <AiOutlineSafety size={18} />
              Secure Account Recovery
            </span>

            <h1 className="mt-10 text-4xl font-black leading-tight xl:text-5xl">
              Your account.
              <br />
              Your security.
              <br />
              Your market.
            </h1>

            <p className="mt-6 max-w-sm text-base leading-7 text-orange-50">
              Recover your Jobol Market account securely and
              get back to shopping for your favourite products.
            </p>
          </div>

          <div className="relative z-10 rounded-2xl border border-white/20 bg-white/10 p-5 backdrop-blur-md">
            <div className="flex items-start gap-3">
              <span className="rounded-xl bg-white/20 p-3">
                <AiOutlineLock size={24} />
              </span>

              <div>
                <h3 className="font-bold">
                  Protected recovery
                </h3>

                <p className="mt-1 text-sm leading-6 text-orange-50">
                  Your verification code is sent to your
                  registered email address.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Right panel */}
        <div className="p-5 sm:p-8 md:p-10 lg:p-12">
          {/* Mobile heading */}
          <div className="mb-8 lg:hidden">
            <span className="inline-flex items-center gap-2 rounded-full bg-orange-50 px-3 py-2 text-xs font-bold text-orange-600">
              <AiOutlineSafety size={16} />
              Secure account recovery
            </span>
          </div>

          {/* Progress indicator */}
          {step < 4 && (
            <div className="mb-9 flex items-center">
              {steps.map((item, index) => (
                <React.Fragment key={item.number}>
                  <div className="flex flex-col items-center gap-2">
                    <div
                      className={`flex h-9 w-9 items-center justify-center rounded-full text-sm font-bold transition ${
                        step >= item.number
                          ? "bg-orange-600 text-white shadow-lg shadow-orange-200"
                          : "bg-gray-100 text-gray-400"
                      }`}
                    >
                      {step > item.number ? (
                        <AiOutlineCheckCircle size={21} />
                      ) : (
                        item.number
                      )}
                    </div>

                    <span
                      className={`text-xs font-semibold ${
                        step >= item.number
                          ? "text-orange-600"
                          : "text-gray-400"
                      }`}
                    >
                      {item.label}
                    </span>
                  </div>

                  {index < steps.length - 1 && (
                    <div
                      className={`mx-3 mb-6 h-1 flex-1 rounded-full ${
                        step > item.number
                          ? "bg-orange-500"
                          : "bg-gray-100"
                      }`}
                    />
                  )}
                </React.Fragment>
              ))}
            </div>
          )}

          {/* Inline status message */}
          {message && (
            <div
              role="status"
              aria-live="polite"
              className={`mb-6 rounded-xl border px-4 py-3 text-sm leading-6 ${messageClass}`}
            >
              {message}
            </div>
          )}

          {/* STEP 1 */}
          {step === 1 && (
            <>
              <div className="mb-8">
                <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-orange-50 text-orange-600">
                  <AiOutlineLock size={30} />
                </div>

                <h2 className="text-3xl font-black tracking-tight text-gray-900">
                  Forgot password?
                </h2>

                <p className="mt-3 text-sm leading-6 text-gray-500">
                  Enter your registered email address to receive
                  a six-digit password recovery code.
                </p>
              </div>

              <form
                onSubmit={sendVerificationCode}
                className="space-y-6"
              >
                <div>
                  <label
                    htmlFor="email"
                    className="mb-2 block text-sm font-bold text-gray-700"
                  >
                    Email address
                  </label>

                  <div className="relative">
                    <AiOutlineMail
                      className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                      size={20}
                    />

                    <input
                      id="email"
                      type="email"
                      autoComplete="email"
                      placeholder="you@example.com"
                      value={email}
                      onChange={(event) =>
                        setEmail(event.target.value)
                      }
                      required
                      disabled={loading}
                      className="w-full rounded-xl border border-gray-200 bg-gray-50 py-4 pl-12 pr-4 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-orange-500 focus:bg-white focus:ring-4 focus:ring-orange-100 disabled:opacity-60"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="flex w-full items-center justify-center gap-2 rounded-xl bg-orange-600 px-5 py-4 font-bold text-white shadow-lg shadow-orange-200 transition hover:bg-orange-700 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {loading ? (
                    <>
                      <span className="h-5 w-5 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                      Sending verification code...
                    </>
                  ) : (
                    <>
                      Send verification code
                      <AiOutlineArrowLeft
                        className="rotate-180"
                        size={19}
                      />
                    </>
                  )}
                </button>
              </form>
            </>
          )}

          {/* STEP 2 */}
          {step === 2 && (
            <>
              <div className="mb-8">
                <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-orange-50 text-orange-600">
                  <AiOutlineMail size={30} />
                </div>

                <h2 className="text-3xl font-black tracking-tight text-gray-900">
                  Check your email
                </h2>

                <p className="mt-3 text-sm leading-6 text-gray-500">
                  Enter the six-digit verification code sent to{" "}
                  <span className="break-all font-bold text-gray-800">
                    {email}
                  </span>
                  .
                </p>
              </div>

              <form
                onSubmit={verifyCode}
                className="space-y-6"
              >
                <div>
                  <label
                    htmlFor="verification-code"
                    className="mb-3 block text-sm font-bold text-gray-700"
                  >
                    Verification code
                  </label>

                  <input
                    id="verification-code"
                    type="text"
                    inputMode="numeric"
                    autoComplete="one-time-code"
                    maxLength={6}
                    pattern="[0-9]{6}"
                    placeholder="000000"
                    value={code}
                    onChange={(event) => {
                      setCode(
                        event.target.value
                          .replace(/\D/g, "")
                          .slice(0, 6)
                      );
                    }}
                    required
                    disabled={loading}
                    className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-5 text-center text-3xl font-black tracking-[0.5em] text-gray-900 outline-none transition placeholder:text-gray-300 focus:border-orange-500 focus:bg-white focus:ring-4 focus:ring-orange-100 disabled:opacity-60"
                  />

                  <p className="mt-3 text-xs leading-5 text-gray-400">
                    Check your inbox and spam folder. The code
                    expires after 10 minutes.
                  </p>
                </div>

                <button
                  type="submit"
                  disabled={loading || code.length !== 6}
                  className="flex w-full items-center justify-center rounded-xl bg-orange-600 px-5 py-4 font-bold text-white shadow-lg shadow-orange-200 transition hover:bg-orange-700 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {loading ? "Verifying code..." : "Verify code"}
                </button>

                <button
                  type="button"
                  disabled={loading}
                  onClick={() => {
                    setStep(1);
                    setCode("");
                    setMessage("");
                  }}
                  className="w-full text-sm font-semibold text-gray-500 transition hover:text-orange-600 disabled:opacity-50"
                >
                  Change email address
                </button>
              </form>
            </>
          )}

          {/* STEP 3 */}
          {step === 3 && (
            <>
              <div className="mb-8">
                <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-green-50 text-green-600">
                  <AiOutlineLock size={30} />
                </div>

                <h2 className="text-3xl font-black tracking-tight text-gray-900">
                  Create new password
                </h2>

                <p className="mt-3 text-sm leading-6 text-gray-500">
                  Your email has been verified. Choose a new
                  password for your account.
                </p>
              </div>

              <form
                onSubmit={resetPassword}
                className="space-y-5"
              >
                <div>
                  <label
                    htmlFor="new-password"
                    className="mb-2 block text-sm font-bold text-gray-700"
                  >
                    New password
                  </label>

                  <div className="relative">
                    <AiOutlineLock
                      className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                      size={20}
                    />

                    <input
                      id="new-password"
                      type={showPassword ? "text" : "password"}
                      autoComplete="new-password"
                      placeholder="At least 8 characters"
                      value={newPassword}
                      onChange={(event) =>
                        setNewPassword(event.target.value)
                      }
                      required
                      minLength={8}
                      disabled={loading}
                      className="w-full rounded-xl border border-gray-200 bg-gray-50 py-4 pl-12 pr-12 text-sm outline-none transition focus:border-orange-500 focus:bg-white focus:ring-4 focus:ring-orange-100 disabled:opacity-60"
                    />

                    <button
                      type="button"
                      aria-label={
                        showPassword ? "Hide password" : "Show password"
                      }
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-orange-600"
                    >
                      {showPassword ? (
                        <AiOutlineEyeInvisible size={21} />
                      ) : (
                        <AiOutlineEye size={21} />
                      )}
                    </button>
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="confirm-password"
                    className="mb-2 block text-sm font-bold text-gray-700"
                  >
                    Confirm new password
                  </label>

                  <div className="relative">
                    <AiOutlineLock
                      className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                      size={20}
                    />

                    <input
                      id="confirm-password"
                      type={
                        showConfirmPassword ? "text" : "password"
                      }
                      autoComplete="new-password"
                      placeholder="Enter your password again"
                      value={confirmPassword}
                      onChange={(event) =>
                        setConfirmPassword(event.target.value)
                      }
                      required
                      disabled={loading}
                      className="w-full rounded-xl border border-gray-200 bg-gray-50 py-4 pl-12 pr-12 text-sm outline-none transition focus:border-orange-500 focus:bg-white focus:ring-4 focus:ring-orange-100 disabled:opacity-60"
                    />

                    <button
                      type="button"
                      aria-label={
                        showConfirmPassword
                          ? "Hide password"
                          : "Show password"
                      }
                      onClick={() =>
                        setShowConfirmPassword(!showConfirmPassword)
                      }
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-orange-600"
                    >
                      {showConfirmPassword ? (
                        <AiOutlineEyeInvisible size={21} />
                      ) : (
                        <AiOutlineEye size={21} />
                      )}
                    </button>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="flex w-full items-center justify-center rounded-xl bg-orange-600 px-5 py-4 font-bold text-white shadow-lg shadow-orange-200 transition hover:bg-orange-700 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {loading ? "Updating password..." : "Reset password"}
                </button>
              </form>
            </>
          )}

          {/* STEP 4 */}
          {step === 4 && (
            <div className="py-8 text-center">
              <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-green-50 text-green-600">
                <AiOutlineCheckCircle size={48} />
              </div>

              <h2 className="text-3xl font-black tracking-tight text-gray-900">
                Password reset!
              </h2>

              <p className="mx-auto mt-4 max-w-sm text-sm leading-7 text-gray-500">
                Your password has been updated successfully.
                You can now sign in to Jobol Market using your
                new password.
              </p>

              <Link
                href="/login"
                className="mt-8 flex w-full items-center justify-center gap-2 rounded-xl bg-orange-600 px-5 py-4 font-bold text-white shadow-lg shadow-orange-200 transition hover:bg-orange-700"
              >
                <AiOutlineUser size={20} />
                Continue to Login
              </Link>
            </div>
          )}

          {/* Footer */}
          <div className="mt-9 border-t border-gray-100 pt-6 text-center">
            <p className="text-xs leading-6 text-gray-400">
              Protected by Jobol Market security.
              <br />
              Never share your verification code with anyone.
            </p>
          </div>
        </div>
      </section>

      <footer className="mx-auto mt-8 max-w-5xl text-center text-xs text-gray-400">
        © {new Date().getFullYear()} Jobol Market. All rights reserved.
      </footer>
    </main>
  );
}