"use client";
import React, { useEffect, useState, useMemo } from "react";
import useCartStore from "@/src/store/useCartStore";
import { FiShoppingCart } from "react-icons/fi";
import Navbar from "@/src/components/Navbar";
import Link from "next/link";
import useProductStore from "@/src/store/useProductStore";
import Button from "@/src/components/Button";
import Footer from "@/src/components/Footer";

export type item = {
  _id: string;
  title: string;
  description: string;
  faculty: string;
  category: string[];
};

export default function ProductsPage() {
  const{addNewProducts} = useProductStore()
  const [products, setProducts] = useState<item[]>([]);
  const[name,setName] = useState<string | null>("")
  const[institution,setInstitution] = useState<string | null>("")
  const[topic,setTopic] = useState<string | null>("")
  const[email,setEmail] = useState<string | null>("")
  const[error,setError] = useState<string | null>("")
  const [filtered, setFilteredPosts] = useState<item[]>([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  const { addToCart } = useCartStore();

  // 🧠 Fetch Data from DB
  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      try {
        const res = await fetch("/api/docs");
        const data = await res.json();
        const fetchedProducts = data.data || [];
        addNewProducts(data.data)
        setProducts(fetchedProducts);
        setFilteredPosts(fetchedProducts); // show all initially

      } catch (err) {
        console.error("Error fetching products:", err);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  function sendTowhatsapp(){
    if(!name.trim() || !institution.trim() || !topic.trim() ||! email.trim()) setError("Incomplete Credentials")
     const phoneNumber = "2349044181552"; // Seller’s number
    const message = `Hi! My name is ${name}.I study at ${institution}.
     I am working on this final year topic:${topic} and i will need your help for it. My Email is ${email}`
    const encodedMessage = encodeURIComponent(message);
    window.open(`https://wa.me/${phoneNumber}?text=${encodedMessage}`, "_blank");
  }
  // 🔍 Handle Search
  function handleSearch(searchValue: string) {
    setSearch(searchValue);

    const searchTerms = searchValue.toLowerCase().split(" ").filter(Boolean);

    if (searchTerms.length === 0) {
      setFilteredPosts(products);
      return;
    }

    const filteredResults = products.filter((product) => {
      const combinedText = [
        product.title,
        product.description,
        ...(Array.isArray(product.category) ? product.category : []),
      ]
        .join(" ")
        .toLowerCase();

      return searchTerms.some((term) => combinedText.includes(term));
    });

    setFilteredPosts(filteredResults);
  }

  // 🧩 Group by faculty
  const groupedByFaculty = useMemo(() => {
    const groups: Record<string, item[]> = {};
    products.forEach((p) => {
      if (!groups[p.faculty]) groups[p.faculty] = [];
      groups[p.faculty].push(p);
    });
    return groups;
  }, [products]);

  return (
    <section className="bg-background min-h-screen text-white">
      <Navbar />

      {/* Header + Search */}
      <div className="px-6 pt-10 pb-6 flex flex-col md:flex-row items-center justify-between gap-4">
        <h1 className="text-4xl md:text-5xl font-bold">Welcome👋</h1>
        <input
          type="text"
          placeholder="🔍 Search by title, description, or category..."
          value={search}
          onChange={(e) => handleSearch(e.target.value)}
          className="bg-white/10 backdrop-blur-md border border-white/20 text-white placeholder:text-gray-300 px-4 py-2 rounded-xl w-full md:w-1/3 focus:outline-none focus:ring-2 focus:ring-secondary transition"
        />
      </div>

      {/* Display Section */}
      {loading ? (
        <div className="flex justify-center items-center h-[60vh] text-gray-400 text-xl">
          Loading resources...
        </div>
      ): products?.length == 0 ? (
         <div className="flex justify-center items-center h-[60vh] text-gray-400 text-xl">
          No Resources now
        </div>
      ) : search ? (
        // 🔍 Search Results (no grouping)
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 px-6 pb-10">
          {filtered.length > 0 ? (
            filtered.map((item) => (
              <div
                key={item._id}
                className="group bg-white/10 backdrop-blur-md border border-white/10 rounded-2xl shadow-lg p-6 hover:scale-[1.02] hover:shadow-xl transition-all duration-300"
              >
                <h2 className="text-2xl font-semibold text-white mb-2 group-hover:text-secondary transition">
                  {item.title}
                </h2>
                <p className="text-gray-300 text-sm mb-4 line-clamp-3">
                  {item.description}
                </p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {item.category?.map((cat, i) => (
                    <span
                      key={i}
                      className="text-xs bg-secondary/20 text-secondary px-2 py-1 rounded-lg"
                    >
                      {cat}
                    </span>
                  ))}
                </div>
                <button
                  onClick={() => addToCart(item)}
                  className="w-full flex items-center justify-center gap-2 bg-secondary text-white py-2 rounded-xl font-medium hover:bg-secondary/90 transition"
                >
                  <FiShoppingCart /> Add to Cart
                </button>
              </div>
            ))
          ) : (
            <p className="text-center text-gray-400 col-span-full py-10">
              No matching PDFs found.
            </p>
          )}
        </div>
      ) : (
        // 🏫 Faculty Grouping View
        <div className="px-6 pb-10 space-y-20">
          {Object.entries(groupedByFaculty).map(([faculty, items]) => (
            <div key={faculty}>
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-3xl font-bold capitalize">{faculty}</h2>
                <Link href={`/products/${encodeURIComponent(faculty)}`}>
                  <button className="px-4 py-2 bg-secondary/20 text-secondary rounded-lg hover:bg-secondary/30 transition">
                    View More
                  </button>
                </Link>
              </div>

              <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
                {items.slice(0, 5).map((item) => (
                  <div
                    key={item._id}
                    className="group bg-white/10 backdrop-blur-md border border-white/10 rounded-2xl shadow-lg p-6 hover:scale-[1.02] hover:shadow-xl transition-all duration-300"
                  >
                    <h2 className="text-2xl font-semibold text-white mb-2 group-hover:text-secondary transition">
                      {item.title}
                    </h2>
                    <p className="text-gray-300 text-sm mb-4 line-clamp-3">
                      {item.description}
                    </p>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {item.category?.map((cat, i) => (
                        <span
                          key={i}
                          className="text-xs bg-secondary/20 text-secondary px-2 py-1 rounded-lg"
                        >
                          {cat}
                        </span>
                      ))}
                    </div>
                 <Button click={addToCart} item={item}/>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}

      <div className="w-full flex items-center justify-center py-16 px-8">
        <main className="w-full max-w-lg bg-white/10 backdrop-blur-md border border-white/10 rounded-md  p-4 md:p-8">
          <h1 className="text-center text-4xl md:text-5xl font-bold mb-8 ">Final Year Projects</h1>
          {error ? (
             <p className="p-2 text-red-200 bg-red-900 text-xl">{error}</p>
          ):(
            <></>
          )}
         
          <div className="flex flex-col gap-4 p-2 md:p-4  ">
            <input type="text" placeholder="Your Name" className=" p-2 bg-gray-800 text-lg  outline-none rounded-md focus:ring-2 focus:ring-secondary "  value={name} onChange={(e)=>setName(e.target.value)}/>
            <input type="text" placeholder="Your institution" className="p-2 text-lg bg-gray-800 text-gray-200 outline-none rounded-md focus:ring-2 focus:ring-secondary " value={institution} onChange={(e)=>setInstitution(e.target.value)}  />
            <input type="text" placeholder="Your topic" className="p-2 text-lg bg-gray-800 outline-none rounded-md focus:ring-2 focus:ring-secondary " value={topic} onChange={(e)=>setTopic(e.target.value)} />
            <input type="email"  placeholder="Your Email" className="p-2 text-lg bg-gray-800 outline-none rounded-md focus:ring-2 focus:ring-secondary " value={email} onChange={(e)=>setEmail(e.target.value)} />
          </div>
          <div className="flex justify-end"><button className="bg-accent p-2 text-xl rounded-md" onClick={sendTowhatsapp}>Get Started</button></div>
          
        </main>
      </div>
      <Footer/>
    </section>
  );
}
