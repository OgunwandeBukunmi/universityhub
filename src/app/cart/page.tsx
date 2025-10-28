"use client";
import React from "react";
import useCartStore from "@/src/store/useCartStore";
import { FaTrashAlt, FaShoppingCart } from "react-icons/fa";
import Link from "next/link";

export default function CartPage() {
  const { cart, removeFromCart, clearCart } = useCartStore();

  


  return (
    <section className="min-h-screen bg-background px-6 py-12 font-open text-white">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-10">
          <h1 className="text-4xl font-bold flex items-center gap-3">
            <FaShoppingCart className="text-indigo-500" /> Your Saved Items
          </h1>

          {cart.length > 0 && (
            <button
              onClick={clearCart}
              className="bg-red-500 hover:bg-red-600 transition text-white px-5 py-2 rounded-md text-sm font-semibold"
            >
              Clear All
            </button>
          )}
        </div>

        {/* Empty Cart State */}
        {cart.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-gray-300 text-lg">You have no saved items yet 😔</p>
            <p className="text-gray-500 mt-2">Add some to see them here.</p>
          </div>
        ) : (
          <>
            {/* Cart Items */}
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {cart.map((item, index) => (
                <div
                  key={index}
                  className="bg-gray-900/40 rounded-2xl p-6 shadow-md border border-gray-700 hover:border-indigo-500 hover:scale-[1.02] transition duration-200 flex flex-col justify-between"
                >
                  <div>
                    <div className="w-full h-40 bg-gray-800 rounded-xl mb-4 flex items-center justify-center text-gray-500 text-sm">
                      <span>No Image</span>
                    </div>
                    <h2 className="text-xl font-semibold mb-2">{item.title}</h2>
                    <p className="text-gray-300 text-sm mb-4">{item.description}</p>
                  </div>

                  <button
                    onClick={() => removeFromCart(item._id)}
                    className="mt-4 flex items-center gap-2 bg-red-500 hover:bg-red-600 text-sm px-4 py-2 rounded-md transition self-start"
                  >
                    <FaTrashAlt /> Remove
                  </button>
                </div>
              ))}
            </div>
          </>
        )}
        {cart.length > 0 ? (
           <div className="flex flex-row items-center justify-end mt-8 py-2">
          <Link
          href="/checkout"
           className="px-3 py-2 text-xl bg-secondary rounded-lg">Checkout</Link>
        </div>)
        :(<>
        </>)}
       
        
      </div>
    </section>
  );
}
