
"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  AiOutlineEnvironment,
  AiOutlinePhone,
  AiOutlineWhatsApp,
  AiOutlineFileText,
  AiOutlineArrowUp,
  AiOutlineArrowRight,
  AiOutlineSafetyCertificate,
  AiOutlineClockCircle,
} from "react-icons/ai";

export default function Footer() {
  const [year, setYear] = useState(null);

  useEffect(() => {
    setYear(new Date().getFullYear());
  }, []);

  const whatsappNumber = "2348123377017";
  const whatsappUrl = `https://wa.me/${whatsappNumber}`;
  const phoneNumber = "08123377017";

  return (
    <footer
      className="relative isolate w-full overflow-hidden bg-[#071329] text-white"
      style={{ fontFamily: "Arial, Helvetica, sans-serif" }}
    >
      {/* ANIMATED BACKGROUND */}

      <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <div
          className="absolute -left-32 -top-32 h-72 w-72 rounded-full bg-red-600/20 blur-3xl sm:h-96 sm:w-96"
          style={{ animation: "footerFloat 10s ease-in-out infinite" }}
        />

        <div
          className="absolute -right-32 top-20 h-72 w-72 rounded-full bg-blue-600/20 blur-3xl sm:h-96 sm:w-96"
          style={{ animation: "footerFloat 12s ease-in-out infinite reverse" }}
        />

        <div className="absolute -bottom-40 left-1/3 h-80 w-80 rounded-full bg-red-700/10 blur-3xl" />

        <div
          className="absolute inset-0 opacity-[0.035]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.7) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.7) 1px, transparent 1px)",
            backgroundSize: "38px 38px",
          }}
        />
      </div>

      {/* TOP ACCENT BAR */}

      <div className="relative h-1.5 w-full overflow-hidden bg-white/5">
        <div className="absolute inset-y-0 left-0 w-1/2 bg-gradient-to-r from-red-700 via-red-500 to-red-400" />

        <div className="absolute inset-y-0 right-0 w-1/2 bg-gradient-to-l from-blue-800 via-blue-600 to-blue-400" />

        <div
          className="absolute inset-y-0 left-0 w-24 bg-white/70 blur-sm"
          style={{ animation: "footerShimmer 5s ease-in-out infinite" }}
        />
      </div>

      {/* MAIN FOOTER CONTENT */}

      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8 lg:py-20">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-10">
          {/* BRAND SECTION */}

          <div
            className="space-y-6 lg:col-span-5"
            style={{ animation: "footerFadeUp 0.8s ease-out both" }}
          >
            <Link
              href="/"
              className="group inline-flex max-w-full items-center gap-4 rounded-2xl focus:outline-none focus-visible:ring-2 focus-visible:ring-red-400"
              aria-label="JOBOL Investments Service home"
            >
              <div className="relative shrink-0">
                <div
                  className="absolute -inset-1 rounded-2xl bg-gradient-to-br from-red-500 via-white/40 to-blue-500 opacity-70 blur-[2px] transition duration-500 group-hover:opacity-100"
                  aria-hidden="true"
                />

                <div className="relative flex h-[76px] w-[76px] items-center justify-center overflow-hidden rounded-2xl border border-white/20 bg-white p-1 shadow-xl sm:h-[88px] sm:w-[88px]">
                  <img
                    src="/JIS.png"
                    alt="JOBOL Investments Service logo"
                    width={500}
                    height={500}
                    className="h-full w-full object-contain transition-transform duration-500 group-hover:scale-110"
                    onError={(e) => {
                      e.currentTarget.style.display = "none";
                    }}
                  />
                </div>
              </div>

              <div className="min-w-0">
                <span className="block text-lg font-black leading-tight tracking-tight text-white transition-colors duration-300 group-hover:text-red-300 sm:text-xl md:text-2xl">
                  JOBOL
                  <span className="text-red-400"> Investments</span>
                </span>

                <span className="mt-1 block text-sm font-semibold tracking-wide text-blue-300 sm:text-base">
                  Service
                </span>

                <span className="mt-2 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[10px] font-bold tracking-[0.15em] text-slate-300 sm:text-xs">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.8)]" />
                  RC 1349295
                </span>
              </div>
            </Link>

            <p className="max-w-md text-sm leading-7 text-slate-300 sm:text-base">
              Your trusted partner for quality products, reliable services,
              and prompt nationwide delivery. We are committed to delivering
              dependable service and a better customer experience.
            </p>

            {/* TRUST INDICATORS */}

            <div className="grid max-w-md grid-cols-2 gap-3">
              <div className="group flex items-center gap-3 rounded-xl border border-white/10 bg-white/[0.04] p-3 transition-all duration-300 hover:-translate-y-1 hover:border-red-400/40 hover:bg-red-500/[0.08]">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-red-500/15 text-xl text-red-300 transition-transform duration-300 group-hover:scale-110">
                  <AiOutlineSafetyCertificate />
                </div>

                <div>
                  <p className="text-xs font-bold text-white sm:text-sm">
                    Trusted Service
                  </p>
                  <p className="mt-1 text-[10px] text-slate-400 sm:text-xs">
                    Customer focused
                  </p>
                </div>
              </div>

              <div className="group flex items-center gap-3 rounded-xl border border-white/10 bg-white/[0.04] p-3 transition-all duration-300 hover:-translate-y-1 hover:border-blue-400/40 hover:bg-blue-500/[0.08]">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-blue-500/15 text-xl text-blue-300 transition-transform duration-300 group-hover:scale-110">
                  <AiOutlineClockCircle />
                </div>

                <div>
                  <p className="text-xs font-bold text-white sm:text-sm">
                    Responsive Team
                  </p>
                  <p className="mt-1 text-[10px] text-slate-400 sm:text-xs">
                    Here to help
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* OFFICE ADDRESS */}

          <div
            className="lg:col-span-3"
            style={{
              animation: "footerFadeUp 0.8s ease-out 0.15s both",
            }}
          >
            <div className="mb-6 flex items-center gap-3">
              <div className="h-8 w-1 rounded-full bg-red-500" />

              <div>
                <h3 className="text-lg font-extrabold text-white sm:text-xl">
                  Our Office
                </h3>

                <p className="mt-1 text-xs text-slate-400">
                  Come visit us
                </p>
              </div>
            </div>

            <div className="group rounded-2xl border border-white/10 bg-white/[0.04] p-5 transition-all duration-300 hover:-translate-y-1 hover:border-red-400/40 hover:bg-white/[0.07] hover:shadow-xl hover:shadow-red-950/20">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-red-600 to-red-800 text-2xl text-white shadow-lg shadow-red-950/30 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3">
                <AiOutlineEnvironment />
              </div>

              <h4 className="mb-3 text-sm font-bold text-white">
                Office Address
              </h4>

              <p className="text-sm leading-7 text-slate-300">
                No. 86 Parks and Garden,
                <br />
                Opposite General Hospital,
                <br />
                Suleja, Niger State, Nigeria.
              </p>

              <div className="mt-5 h-px w-full bg-gradient-to-r from-red-500/60 via-white/10 to-transparent" />

              <p className="mt-4 text-xs leading-5 text-slate-400">
                We look forward to serving you.
              </p>
            </div>
          </div>

          {/* CONTACT SECTION */}

          <div
            className="lg:col-span-4"
            style={{
              animation: "footerFadeUp 0.8s ease-out 0.3s both",
            }}
          >
            <div className="mb-6 flex items-center gap-3">
              <div className="h-8 w-1 rounded-full bg-blue-500" />

              <div>
                <h3 className="text-lg font-extrabold text-white sm:text-xl">
                  Get in Touch
                </h3>

                <p className="mt-1 text-xs text-slate-400">
                  We would love to hear from you
                </p>
              </div>
            </div>

            <div className="space-y-4">
              {/* PHONE CARD */}

              <a
                href={`tel:${phoneNumber}`}
                className="group flex items-center gap-4 rounded-2xl border border-white/10 bg-white/[0.04] p-4 transition-all duration-300 hover:-translate-y-1 hover:border-blue-400/50 hover:bg-blue-500/[0.08] hover:shadow-lg hover:shadow-blue-950/20 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-400"
              >
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-blue-600/20 text-2xl text-blue-300 transition-all duration-300 group-hover:scale-110 group-hover:bg-blue-600 group-hover:text-white">
                  <AiOutlinePhone />
                </div>

                <div className="min-w-0 flex-1">
                  <p className="text-xs font-medium text-slate-400">
                    Call us directly
                  </p>

                  <p className="mt-1 break-words text-base font-bold text-white transition-colors group-hover:text-blue-300">
                    {phoneNumber}
                  </p>
                </div>

                <AiOutlineArrowRight className="shrink-0 text-lg text-slate-500 transition-all duration-300 group-hover:translate-x-1 group-hover:text-blue-300" />
              </a>

              {/* WHATSAPP CARD */}

              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Chat with JOBOL Investments Service on WhatsApp"
                className="group relative flex items-center gap-4 overflow-hidden rounded-2xl border border-emerald-400/20 bg-emerald-500/[0.07] p-4 transition-all duration-300 hover:-translate-y-1 hover:border-emerald-400/50 hover:bg-emerald-500/[0.13] hover:shadow-xl hover:shadow-emerald-950/20 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400"
              >
                <div className="absolute inset-y-0 left-0 w-1 bg-emerald-500 transition-all duration-300 group-hover:w-1.5" />

                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-emerald-500/20 text-2xl text-emerald-300 transition-all duration-300 group-hover:scale-110 group-hover:bg-emerald-500 group-hover:text-white">
                  <AiOutlineWhatsApp />
                </div>

                <div className="min-w-0 flex-1">
                  <p className="text-xs font-medium text-slate-400">
                    Need quick assistance?
                  </p>

                  <p className="mt-1 text-base font-bold text-white transition-colors group-hover:text-emerald-300">
                    Chat on WhatsApp
                  </p>
                </div>

                <AiOutlineArrowRight className="shrink-0 text-lg text-slate-500 transition-all duration-300 group-hover:translate-x-1 group-hover:text-emerald-300" />
              </a>

              {/* TERMS LINK */}

              <Link
                href="/terms"
                className="group flex items-center gap-4 rounded-2xl border border-white/10 bg-white/[0.04] p-4 transition-all duration-300 hover:-translate-y-1 hover:border-red-400/40 hover:bg-red-500/[0.08] focus:outline-none focus-visible:ring-2 focus-visible:ring-red-400"
              >
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-red-500/15 text-2xl text-red-300 transition-all duration-300 group-hover:scale-110 group-hover:bg-red-600 group-hover:text-white">
                  <AiOutlineFileText />
                </div>

                <div className="min-w-0 flex-1">
                  <p className="text-sm font-bold text-white transition-colors group-hover:text-red-300">
                    Terms & Conditions
                  </p>

                  <p className="mt-1 text-xs text-slate-400">
                    Read our terms of service
                  </p>
                </div>

                <AiOutlineArrowRight className="shrink-0 text-lg text-slate-500 transition-all duration-300 group-hover:translate-x-1 group-hover:text-red-300" />
              </Link>
            </div>
          </div>
        </div>

        {/* MOVING DELIVERY TRUCK ANIMATION */}

        <div
          className="relative mt-12 overflow-hidden border-t border-white/10 pt-6 sm:mt-14"
          aria-label="Animated delivery truck representing nationwide delivery"
          role="img"
        >
          <div className="mb-3 flex items-center justify-between gap-3">
            <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400 sm:text-xs">
              JOBOL Nationwide Delivery
            </span>

            <span className="flex items-center gap-2 text-[10px] font-semibold text-blue-300 sm:text-xs">
              <span className="h-2 w-2 animate-pulse rounded-full bg-blue-400" />
              On the move
            </span>
          </div>

          <div className="relative h-[90px] w-full overflow-hidden">
            <div className="absolute inset-x-0 bottom-[14px] h-[2px] bg-gradient-to-r from-transparent via-blue-500/50 to-transparent" />

            <div className="absolute inset-x-0 bottom-[12px] h-[5px] rounded-full bg-slate-700/80" />

            <div className="absolute inset-x-0 bottom-[13px] flex justify-around overflow-hidden">
              {Array.from({ length: 12 }).map((_, index) => (
                <span
                  key={index}
                  className="h-[3px] w-5 shrink-0 rounded-full bg-white/50 sm:w-8"
                />
              ))}
            </div>

            {/* MOVING TRUCK */}

            <div
              className="absolute bottom-[15px] left-0 z-10"
              style={{
                animation: "truckDrive 12s linear infinite",
                willChange: "transform",
              }}
            >
              <div className="relative h-[62px] w-[108px] sm:h-[72px] sm:w-[132px]">
                {/* TRUCK BODY */}

                <div className="absolute bottom-[12px] left-0 h-[34px] w-[68px] rounded-t-md rounded-bl-md border border-red-300/60 bg-gradient-to-br from-red-500 to-red-800 shadow-[0_0_18px_rgba(239,68,68,0.2)] sm:bottom-[14px] sm:h-[39px] sm:w-[82px]">
                  <div className="absolute inset-y-0 left-2 w-[3px] bg-white/20" />
                  <div className="absolute inset-y-0 left-4 w-[3px] bg-white/20" />

                  <span className="absolute inset-0 flex items-center justify-center pl-4 text-[10px] font-black tracking-wider text-white sm:text-xs">
                    JOBOL
                  </span>

                  <div className="absolute inset-x-0 top-0 h-1 rounded-t bg-white/30" />
                </div>

                {/* TRUCK CABIN */}

                <div className="absolute bottom-[12px] right-0 h-[28px] w-[35px] rounded-tr-lg border border-blue-300/60 bg-gradient-to-br from-blue-400 to-blue-700 sm:bottom-[14px] sm:h-[32px] sm:w-[42px]">
                  <div className="absolute right-[4px] top-[4px] h-[12px] w-[15px] rounded-sm border border-white/40 bg-sky-200/90 sm:h-[14px] sm:w-[19px]" />

                  <div className="absolute bottom-[3px] left-[4px] h-[10px] w-[10px] rounded-sm border border-white/30 bg-blue-300/40" />

                  <div className="absolute -right-[2px] bottom-[3px] h-[5px] w-[4px] rounded-r bg-yellow-200 shadow-[0_0_7px_rgba(253,224,71,0.9)]" />
                </div>

                {/* BUMPERS */}

                <div className="absolute bottom-[12px] -right-[2px] h-[5px] w-[9px] rounded-r bg-slate-300 sm:bottom-[14px]" />

                <div className="absolute bottom-[15px] -left-[3px] h-[5px] w-[6px] rounded-l bg-slate-400 sm:bottom-[17px]" />

                {/* REAR WHEEL */}

                <div className="absolute bottom-[1px] left-[12px] flex h-[20px] w-[20px] items-center justify-center rounded-full border-[3px] border-slate-500 bg-slate-950 sm:bottom-[2px] sm:left-[17px] sm:h-[22px] sm:w-[22px]">
                  <div
                    className="h-[8px] w-[8px] rounded-full border-2 border-slate-300 bg-slate-500"
                    style={{ animation: "wheelSpin 0.6s linear infinite" }}
                  />
                </div>

                {/* FRONT WHEEL */}

                <div className="absolute bottom-[1px] right-[7px] flex h-[20px] w-[20px] items-center justify-center rounded-full border-[3px] border-slate-500 bg-slate-950 sm:bottom-[2px] sm:right-[11px] sm:h-[22px] sm:w-[22px]">
                  <div
                    className="h-[8px] w-[8px] rounded-full border-2 border-slate-300 bg-slate-500"
                    style={{ animation: "wheelSpin 0.6s linear infinite" }}
                  />
                </div>

                {/* GROUND SHADOW */}

                <div className="absolute -bottom-[3px] left-2 right-1 h-2 rounded-full bg-black/30 blur-sm" />
              </div>
            </div>

            {/* DESTINATION MARKER */}

            <div className="absolute bottom-[18px] right-2 flex flex-col items-center sm:right-5">
              <AiOutlineEnvironment className="text-xl text-red-400 drop-shadow-[0_0_6px_rgba(248,113,113,0.7)] sm:text-2xl" />

              <span className="mt-1 text-[8px] font-bold tracking-wider text-slate-400 sm:text-[9px]">
                DESTINATION
              </span>
            </div>
          </div>

          <p className="mt-2 text-center text-[10px] leading-5 text-slate-500 sm:text-xs">
            Reliable service. Quality products. Nationwide delivery.
          </p>
        </div>

        {/* COPYRIGHT */}

        <div className="mt-8 border-t border-white/10 pt-6 sm:mt-10 sm:pt-8">
          <div className="flex flex-col items-center justify-between gap-4 text-center sm:flex-row sm:text-left">
            <p className="text-xs leading-6 text-slate-400 sm:text-sm">
              © {year ?? ""}{" "}
              <span className="font-bold text-white">
                JOBOL Investments Service
              </span>
              . All rights reserved.
            </p>

            <div className="flex flex-wrap items-center justify-center gap-x-5 gap-y-3 text-xs sm:text-sm">
              <Link
                href="/terms"
                className="text-slate-400 transition-colors duration-300 hover:text-red-300"
              >
                Terms & Conditions
              </Link>

              <span className="hidden h-4 w-px bg-white/15 sm:block" />

              <Link
                href="/"
                className="group inline-flex items-center gap-2 font-semibold text-slate-300 transition-colors duration-300 hover:text-white"
              >
                Back to top

                <span className="flex h-7 w-7 items-center justify-center rounded-lg border border-white/10 bg-white/5 transition-all duration-300 group-hover:-translate-y-1 group-hover:border-blue-400/40 group-hover:bg-blue-500/20">
                  <AiOutlineArrowUp className="text-sm" />
                </span>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* ANIMATION KEYFRAMES */}

      <style jsx>{`
        @keyframes footerFadeUp {
          from {
            opacity: 0;
            transform: translateY(22px);
          }

          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes footerFloat {
          0%,
          100% {
            transform: translate3d(0, 0, 0) scale(1);
          }

          50% {
            transform: translate3d(18px, -18px, 0) scale(1.08);
          }
        }

        @keyframes footerShimmer {
          0% {
            transform: translateX(-120px);
            opacity: 0;
          }

          20% {
            opacity: 0.8;
          }

          70% {
            opacity: 0.8;
          }

          100% {
            transform: translateX(100vw);
            opacity: 0;
          }
        }

        @keyframes truckDrive {
          0% {
            transform: translateX(-140px);
          }

          100% {
            transform: translateX(calc(100vw + 160px));
          }
        }

        @keyframes wheelSpin {
          from {
            transform: rotate(0deg);
          }

          to {
            transform: rotate(360deg);
          }
        }

        @media (prefers-reduced-motion: reduce) {
          *,
          *::before,
          *::after {
            animation-duration: 0.01ms !important;
            animation-iteration-count: 1 !important;
            scroll-behavior: auto !important;
            transition-duration: 0.01ms !important;
          }
        }
      `}</style>
    </footer>
  );
}

