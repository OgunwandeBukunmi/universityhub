"use client";
import React from "react";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-primary text-white py-8 font-open">
      <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6">
        {/* Logo / Brand */}
        <h1 className="text-2xl font-semibold">University Hub</h1>

        {/* Navigation Links */}
        <ul className="flex flex-wrap justify-center gap-6 text-sm md:text-base">
          <li>
            <Link
              href="/about"
              className="hover:text-pink-300 transition-colors duration-200"
            >
              About
            </Link>
          </li>
          <li>
            <Link
              href="/products"
              className="hover:text-pink-300 transition-colors duration-200"
            >
              Products
            </Link>
          </li>
          <li>
            <Link
              href="/about"
              className="hover:text-pink-300 transition-colors duration-200"
            >
              Contact Us
            </Link>
          </li>
        </ul>

        {/* Copyright */}
        <p className="text-sm text-gray-200 text-center md:text-right">
          © {new Date().getFullYear()} University Hub. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
