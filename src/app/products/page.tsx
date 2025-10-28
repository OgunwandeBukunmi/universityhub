"use client";
import React, { useEffect, useState } from "react";
import useCartStore from "@/src/store/useCartStore";
import { FiShoppingCart } from "react-icons/fi";
import Navbar from "@/src/components/Navbar";
import { ObjectId } from "mongodb";

export type item = {
  _id : string,
  title : string,
  description: string,
  category: string[]
}


export default function ProductsPage() {
  const [products, setProducts] = useState<item[]>([]);
  const [filtered, setFilteredPosts] = useState<item[]>([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  const { addToCart } = useCartStore();

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      try {
        const res = await fetch("/api/docs");
        const data = await res.json();
        setProducts(data.data || []);
        setFilteredPosts(data.data || []); // initially show all
      } catch (err) {
        console.error("Error fetching products:", err);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  // 🔍 Handle Search
  function handleSearch(searchValue: string) {
    setSearch(searchValue);

    // Split search terms by space
    const searchTerms = searchValue.toLowerCase().split(" ").filter(Boolean);

    if (searchTerms.length === 0) {
      setFilteredPosts(products);
      return;
    }

    const filteredResults = products.filter((product) => {
      // Combine title + description + category for broader search
      const combinedText = [
        product.title,
        product.description,
        ...(Array.isArray(product.category) ? product.category : []),
      ]
        .join(" ")
        .toLowerCase();

      // Return true if any search term matches any part of the product data
      return searchTerms.some((term) => combinedText.includes(term));
    });

    setFilteredPosts(filteredResults);
  }

  return (
    <section className="bg-background min-h-screen text-white">
      <Navbar />

      {/* 🧭 Header + Search */}
      <div className="px-6 pt-10 pb-6 flex flex-col md:flex-row items-center justify-between gap-4">
        <h1 className="text-4xl md:text-5xl font-bold">Find Helpful PDFs</h1>
        <input
          type="text"
          placeholder="🔍 Search by title, description, or category..."
          value={search}
          onChange={(e) => handleSearch(e.target.value)}
          className="bg-white/10 backdrop-blur-md border border-white/20 text-white placeholder:text-gray-300 px-4 py-2 rounded-xl w-full md:w-1/3 focus:outline-none focus:ring-2 focus:ring-secondary transition"
        />
      </div>

      {/* 🧱 Product Grid */}
      {loading ? (
        <div className="flex justify-center items-center h-[60vh] text-gray-400 text-xl">
          Loading resources...
        </div>
      ) : (
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 px-6 pb-10">
          {filtered.length > 0 ? (
            filtered.map((item:item) => (
              <div
                key={item._id}
                className="group relative bg-white/10 backdrop-blur-md border border-white/10 rounded-2xl shadow-lg overflow-hidden hover:scale-[1.02] hover:shadow-xl transition-all duration-300"
              >
                <div className="p-6 flex flex-col justify-between h-full">
                  <div>
                    <h2 className="text-2xl font-semibold text-white mb-2 group-hover:text-secondary transition">
                      {item.title}
                    </h2>
                    <p className="text-gray-300 text-sm mb-4 line-clamp-3">
                      {item.description}
                    </p>
                    {item.category && (
                      <div className="flex flex-wrap gap-2">
                        {item.category.map((cat: string, i: number) => (
                          <span
                            key={i}
                            className="text-xs bg-secondary/20 text-secondary px-2 py-1 rounded-lg"
                          >
                            {cat}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>

                  <button
                    onClick={() => addToCart(item)}
                    className="mt-6 flex items-center justify-center gap-2 bg-secondary text-white py-2 rounded-xl font-medium hover:bg-secondary/90 transition"
                  >
                    <FiShoppingCart className="text-lg" />
                    Add to Cart
                  </button>
                </div>
              </div>
            ))
          ) : (
            <p className="text-center text-gray-400 col-span-full py-10">
              No matching PDFs found.
            </p>
          )}
        </div>
      )}
    </section>
  );
}
