"use client";
import useCartStore from "@/src/store/useCartStore";
import React, { useState } from "react";
import { FaWhatsapp } from "react-icons/fa";

export default function page() {
  const {cart} = useCartStore()
  const[name,setName] = useState("")
    const[email,setEmail] = useState("")

  const handleWhatsAppChat = () => {
    const phoneNumber = "2349032626830"; // Seller’s number
    const message = `Hi! My name is ${name}. order details are: ${cart
      ?.map((item) => item.title)
      .join(", ")}.
      This is my Emial : ${email}`;
    const encodedMessage = encodeURIComponent(message);
    window.open(`https://wa.me/${phoneNumber}?text=${encodedMessage}`, "_blank");
  };

  return (
    <section className="min-h-screen bg-background text-white flex flex-col items-center justify-center px-6 font-open">
      {/* Card Container */}
      <div className="bg-gray-900/50 backdrop-blur-lg rounded-2xl shadow-lg p-8 w-full max-w-lg border border-gray-700 text-center">
        <h1 className="text-3xl md:text-4xl font-bold mb-3 text-indigo-400">
          Thank You for Ordering! 🎉
        </h1>
        <p className="text-gray-300 mb-8">
          We appreciate your order! Please fill in your details below — once you’re done, 
          you’ll be redirected to WhatsApp to confirm with our team.
        </p>

        {/* Inputs */}
        <div className="space-y-4 mb-8">
          <input
            type="text"
            placeholder="Your Name"
            className="w-full px-4 py-3 rounded-lg bg-gray-800 border border-gray-700 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500 outline-none text-white placeholder-gray-400 transition"
            value={name}
            onChange={(e)=>setName(e.target.value)}
          />
          <input
            type="email"
            placeholder="Your Email"
            className="w-full px-4 py-3 rounded-lg bg-gray-800 border border-gray-700 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500 outline-none text-white placeholder-gray-400 transition"
            value={email}
            onChange={(e)=>setEmail(e.target.value)}
          />
        </div>

        {/* WhatsApp Button */}
        <button
          onClick={handleWhatsAppChat}
          className="w-full flex items-center justify-center gap-3 bg-green-500 hover:bg-green-600 text-white font-semibold px-6 py-3 rounded-lg transition-all duration-200 transform hover:scale-[1.02]"
        >
          <FaWhatsapp className="text-xl" />
          Proceed to WhatsApp
        </button>
      </div>

      {/* Subtext */}
      <p className="text-gray-500 mt-6 text-sm text-center">
        Your learning journey just got easier — thank you for trusting University Hub 💡
      </p>
    </section>
  );
}
