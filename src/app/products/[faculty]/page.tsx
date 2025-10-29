"use client";

import useProductStore from "@/src/store/useProductStore";
import { useParams } from "next/navigation";
import React, { useMemo } from "react";
import type { item } from "../page";
import { FiShoppingCart } from "react-icons/fi";
import useCartStore from "@/src/store/useCartStore";
import Navbar from "@/src/components/Navbar";
import Button from "@/src/components/Button";

export default function FacultyPage() {
  const { products } = useProductStore();
  const{addToCart} = useCartStore()
  const params = useParams<{ faculty: string }>();

  // Ensure it's decoded safely
  const faculty = decodeURIComponent(params.faculty ?? "");

  // Group all products by faculty (memoized for performance)
  const groupedByFaculty = useMemo(() => {
    const groups: Record<string, item[]> = {};
    products.forEach((p: item) => {
      if (!groups[p.faculty]) groups[p.faculty] = [];
      groups[p.faculty].push(p);
    });
    return groups;
  }, [products]);

  // Get current faculty products
  const currentFacultyItems = groupedByFaculty[faculty] || [];

  return (
    <div className="text-white ">
        <Navbar/>
      <h1 className="text-4xl font-bold capitalize mb-8 p-10">{faculty} PDFs</h1>

      {currentFacultyItems.length === 0 ? (
        <p className="text-gray-400">No PDFs found for this faculty yet.</p>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 px-10 py-5">
          {currentFacultyItems.map((item) => (
            <div
              key={item.title}
              className="bg-white/10 backdrop-blur-md p-6 rounded-xl border border-white/10 hover:scale-[1.02] transition"
            >
              <h2 className="text-2xl font-semibold text-white mb-2">
                {item.title}
              </h2>
              <p className="text-gray-300 text-sm mb-4 line-clamp-3">
                {item.description}
              </p>
              <div className="flex flex-wrap gap-2">
                {item.category?.map((cat, i) => (
                  <span
                    key={i}
                    className="text-xs bg-secondary/20 text-secondary px-2 py-1 rounded-lg"
                  >
                    {cat}
                  </span>
                ))}
              </div>
             <Button item={item} click={addToCart}/>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
