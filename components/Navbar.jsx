"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  AiOutlineHome,
  AiOutlineShopping,
  AiOutlineShoppingCart,
  AiOutlineFileText,
  AiOutlineUser,
} from "react-icons/ai";

const navItems = [
  {
    name: "Home",
    path: "/",
    icon: AiOutlineHome,
    requiresAuth: false,
  },
  // {
    // name: "Products",
    // path: "/products",
    // icon: AiOutlineShopping,
    // requiresAuth: true,
  // },
  {
    name: "Cart",
    path: "/cart",
    icon: AiOutlineShoppingCart,
    requiresAuth: true,
  },
  {
    name: "Orders",
    path: "/orders",
    icon: AiOutlineFileText,
    requiresAuth: true,
  },
  {
    name: "Account",
    path: "/account",
    icon: AiOutlineUser,
    requiresAuth: false,
  },
];

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userData, setUserData] = useState(null);
  const [cartCount, setCartCount] = useState(0);

  // Sync user authentication, profile details, and cart count from localStorage on client load
  useEffect(() => {
    const storedUser = localStorage.getItem("jobol_user");
    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);
        setUserData(parsedUser);
        setIsLoggedIn(true);
      } catch (err) {
        console.error("Failed to parse user session", err);
      }
    }

    // Function to calculate and update cart count from localStorage
    const updateCartCount = () => {
      const storedCart = localStorage.getItem("jobol_cart");
      if (storedCart) {
        try {
          const cartItems = JSON.parse(storedCart);
          // Sum up quantities or total item count
          const totalItems = Array.isArray(cartItems)
            ? cartItems.reduce((acc, item) => acc + (item.quantity || 1), 0)
            : 0;
          setCartCount(totalItems);
        } catch (err) {
          console.error("Failed to parse cart items", err);
        }
      } else {
        setCartCount(0);
      }
    };

    // Initial count load
    updateCartCount();

    // Listen for custom event triggered when items are added to cart
    window.addEventListener("cart-updated", updateCartCount);
    // Also listen to storage events across tabs
    window.addEventListener("storage", updateCartCount);

    return () => {
      window.removeEventListener("cart-updated", updateCartCount);
      window.removeEventListener("storage", updateCartCount);
    };
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("jobol_user");
    setIsLoggedIn(false);
    setUserData(null);
    router.push("/signin");
  };

  const handleNavigation = (e, item) => {
    if (item.requiresAuth && !isLoggedIn) {
      e.preventDefault();
      router.push("/signin");
    }
  };

  return (
    <>
      {/* 
        1. MOBILE NAVBAR: Fixed at bottom-0, visible on mobile (hidden on md screens and up) 
      */}
      <nav
        aria-label="Mobile Bottom Navigation"
        className="fixed bottom-0 left-0 z-50 w-full border-t border-gray-200 bg-white/95 backdrop-blur-md shadow-[0_-4px_20px_rgba(0,0,0,0.06)] md:hidden"
      >
        <div className="mx-auto flex max-w-lg items-center justify-between px-2 pt-2 pb-[calc(0.5rem+env(safe-area-inset-bottom))]">
          {navItems.map((item) => {
            const isActive =
              item.path === "/"
                ? pathname === "/"
                : pathname === item.path ||
                  pathname.startsWith(`${item.path}/`);

            const isAccountItem = item.name === "Account";
            const Icon = item.icon;

            return (
              <Link
                key={item.name}
                href={isLoggedIn && isAccountItem ? "/account" : item.path}
                onClick={(e) => handleNavigation(e, item)}
                aria-label={item.name}
                aria-current={isActive ? "page" : undefined}
                className="group flex min-w-0 flex-1 flex-col items-center gap-1 py-1 transition-transform active:scale-95"
              >
                <div
                  className={`relative flex h-10 w-12 items-center justify-center rounded-xl transition-all duration-300 transform group-hover:-translate-y-1 ${
                    isActive
                      ? "bg-red-50 text-red-600 shadow-sm"
                      : "text-gray-600 hover:text-red-600"
                  }`}
                >
                  {/* Dynamic User Profile Photo / Initials for Account Tab if Logged In */}
                  {isAccountItem && isLoggedIn && userData ? (
                    <div className="relative w-6 h-6 rounded-full overflow-hidden flex items-center justify-center bg-blue-700 text-white text-[10px] font-bold border border-blue-200 shadow-xs">
                      {userData.photoURL ? (
                        <img
                          src={userData.photoURL}
                          alt={userData.displayName || "User"}
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            e.currentTarget.style.display = "none";
                          }}
                        />
                      ) : (
                        <span>{userData.initials}</span>
                      )}
                    </div>
                  ) : (
                    <Icon className="text-[22px] transition-transform duration-300 group-hover:scale-110" />
                  )}

                  {/* Cart badge */}
                  {item.name === "Cart" && cartCount > 0 && (
                    <span className="absolute right-0.5 top-0.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-red-600 px-1 text-[10px] font-bold text-white ring-2 ring-white">
                      {cartCount > 99 ? "99+" : cartCount}
                    </span>
                  )}

                  {/* Active bottom bar accent */}
                  {isActive && (
                    <span className="absolute -bottom-1 h-0.5 w-5 rounded-full bg-blue-600" />
                  )}
                </div>

                <span
                  className={`text-[11px] transition-colors duration-200 ${
                    isActive
                      ? "font-semibold text-blue-600"
                      : "font-medium text-gray-700 group-hover:text-blue-600"
                  }`}
                >
                  {item.name}
                </span>
              </Link>
            );
          })}
        </div>
      </nav>

      {/* 
        2. DESKTOP NAVBAR: Fixed at top-0, visible on md screens and up (hidden on mobile) 
      */}
      <header className="hidden md:block sticky top-0 z-50 w-full border-b border-gray-200 bg-white/95 backdrop-blur-md shadow-sm">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 h-25">
          {/* Logo / Brand with JIS.png at the extreme left */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-21 h-20 rounded-xl overflow-hidden bg-white shadow- border border-gray-100 flex items-center justify-center shrink-0">
              <img
                src="/JIS.png"
                alt="JIS Logo"
                width={500}
                height={500}
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.currentTarget.style.display = "none";
                }}
              />
            </div>
            <span className="text-2xl font-black font-extrabold tracking-tight text-blue-900 group-hover:text-red-600 transition-colors">
              JOBOL<span className="text-red-600 group-hover:text-blue-600"></span>
            </span>
          </Link>

          {/* Desktop Nav Links */}
          <div className="flex items-center gap-1 lg:gap-2">
            {navItems.map((item) => {
              const isActive =
                item.path === "/"
                  ? pathname === "/"
                  : pathname === item.path ||
                    pathname.startsWith(`${item.path}/`);

              const isAccountItem = item.name === "Account";
              const Icon = item.icon;

              return (
                <Link
                  key={item.name}
                  href={isLoggedIn && isAccountItem ? "/account" : item.path}
                  onClick={(e) => handleNavigation(e, item)}
                  aria-label={item.name}
                  aria-current={isActive ? "page" : undefined}
                  className={`relative flex items-center gap-2 px-4 py-2 rounded-xl font-medium text-sm transition-all duration-200 group ${
                    isActive
                      ? "bg-red-50 text-red-600 font-semibold shadow-xs"
                      : "text-gray-700 hover:bg-blue-50 hover:text-blue-600"
                  }`}
                >
                  <div className="relative flex items-center justify-center">
                    {isAccountItem && isLoggedIn && userData ? (
                      <div className="relative w-6 h-6 rounded-full overflow-hidden flex items-center justify-center bg-blue-700 text-white text-[10px] font-bold border border-blue-200 shadow-xs">
                        {userData.photoURL ? (
                          <img
                            src={userData.photoURL}
                            alt={userData.displayName || "User"}
                            className="w-full h-full object-cover"
                            onError={(e) => {
                              e.currentTarget.style.display = "none";
                            }}
                          />
                        ) : (
                          <span>{userData.initials}</span>
                        )}
                      </div>
                    ) : (
                      <Icon className="text-xl transition-transform duration-300 group-hover:scale-110" />
                    )}

                    {/* Desktop Cart Badge */}
                    {item.name === "Cart" && cartCount > 0 && (
                      <span className="absolute -right-2 -top-2 flex h-4 min-w-4 items-center justify-center rounded-full bg-red-600 px-1 text-[10px] font-bold text-white ring-2 ring-white">
                        {cartCount > 99 ? "99+" : cartCount}
                      </span>
                    )}
                  </div>

                  <span className={isActive ? "text-blue-600 font-bold" : ""}>
                    {item.name}
                  </span>

                  {/* Active bottom underline for desktop */}
                  {isActive && (
                    <span className="absolute bottom-0 left-4 right-4 h-0.5 bg-blue-600 rounded-full" />
                  )}
                </Link>
              );
            })}
          </div>

          {/* Authentication Action Button / User Profile Preview */}
          <div className="flex items-center gap-3">
            {isLoggedIn && userData ? (
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-2 bg-blue-50 px-3 py-1.5 rounded-2xl border border-blue-100">
                  <div className="w-7 h-7 rounded-full overflow-hidden bg-blue-700 text-white flex items-center justify-center text-xs font-bold shadow-xs">
                    {userData.photoURL ? (
                      <img
                        src={userData.photoURL}
                        alt="Profile"
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          e.currentTarget.style.display = "none";
                        }}
                      />
                    ) : (
                      <span>{userData.initials}</span>
                    )}
                  </div>
                  <span className="text-xs font-bold text-blue-900 max-w-[120px] truncate">
                    {userData.displayName}
                  </span>
                </div>

                <button
                  onClick={handleLogout}
                  className="px-4 py-2 text-xs font-extrabold text-white bg-red-600 hover:bg-red-700 rounded-xl transition-colors shadow-sm"
                >
                  Log Out
                </button>
              </div>
            ) : (
              <Link
                href="/signin"
                className="px-4 py-2 text-sm font-semibold text-white bg-blue-900 hover:bg-blue-700 rounded-xl transition-colors shadow-sm"
              >
                Login / Register
              </Link>
            )}
          </div>
        </div>
      </header>
    </>
  );
}