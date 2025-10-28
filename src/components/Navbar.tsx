"use client";
import React, { useState } from "react";
import { FiShoppingCart } from "react-icons/fi";
import useCartStore from '@/src/store/useCartStore';
import Link from "next/link";

export default function Navbar() {
  const [isHidden, setIsHidden] = useState(true);
  const {cart} = useCartStore()
  

  return (
    <header className="w-full font-open">
      {/* --- Desktop Navbar --- */}
      <div className="hidden lg:flex flex-row gap-50 items-center p-8  shadow-sm">
        <h1 className="text-4xl font-semibold text-[hsl(198,100%,51%)]">University Hub</h1>

        <ul className="flex flex-row gap-8 items-center">
          {["Home", "Products", "About"].map((item, index) => (
            <li key={index} className="text-xl">
              <Link
                href={item === "Home" ? "/" : `/${item.toLowerCase().replace(" ", "")}`}
                className="p-2 rounded transition-all duration-200 hover:text-secondary  "
              >
                {item}
              </Link>
            </li>
          ))}
        </ul>

         <Link href="/cart">
      <button className="flex items-center justify-between gap-2  bg-primary text-white py-3 px-5 rounded-lg hover:bg-primary-dark transition">
           <span
              
               className="text-xl bg-secondary/20 text-secondary px-2 py-1 rounded-lg"
                >
                 {cart.length}
             </span>
      <FiShoppingCart className="text-2xl" />
      </button>
    </Link>
      </div>

      {/* --- Mobile Navbar --- */}
      <div className="relative flex justify-between lg:hidden items-center  p-3 shadow-sm">
        <h1 className="text-3xl font-semibold text-[hsl(198,100%,51%)]">University Hub</h1>
        <div className="flex flex-row items-center justify-center gap-3">
      <Link href="/cart">
      <button className="flex items-center justify-between gap-1  bg-primary text-white py-2 px-2 rounded-lg hover:bg-primary-dark transition">
           <span
              
               className="text-lg bg-secondary/20 text-secondary px-1 py-1 rounded-lg"
                >
                 {cart.length}
             </span>
      <FiShoppingCart className="text-xl" />
      </button>
    </Link>
        <button
          className="p-2 z-30"
          onClick={() => setIsHidden(!isHidden)}
          aria-label="Toggle menu"
        >
          {isHidden ? (
            // ☰ (hamburger)
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="hsl(198, 100%, 51%)"
              className="w-12 h-12"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          ) : (
            // ✕ (close)
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="hsl(198, 100%, 51%)"
              className="w-12 h-12"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          )}
        </button></div>
             

        {/* Mobile Menu Overlay */}
        <ul
          className={`absolute top-0 left-0 w-full h-screen flex flex-col items-center justify-center text-white bg-[#1E293B]  gap-6 text-3xl transition-all duration-300 ease-in-out ${
            isHidden ? "opacity-0 pointer-events-none" : "opacity-100 z-20"
          }`}
        >
          {["Home", "Products", "About"].map((item, index) => (
            <li key={index}>
              <Link
                href={item === "Home" ? "/" : `/${item.toLowerCase().replace(" ", "")}`}
                onClick={() => setIsHidden(true)}
                className="hover:text-secondary"
              >
                {item}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </header>
  );
}
