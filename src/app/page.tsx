"use client";
import { FaFilePdf, FaUsers, FaBolt } from "react-icons/fa";
import React from "react";
import Navbar from "../components/Navbar";
import Link from "next/link";
import Footer from "../components/Footer";

export default function Page() {
    const features = [
    {
      icon: <FaFilePdf className="text-4xl w-12 mb-2 h-12 text-secondary" />,
      title: "Verified Study PDFs",
      text: "Access quality materials uploaded by real students — reviewed and organized for accuracy.",
    },
    {
      icon: <FaUsers className="text-4xl w-12 mb-2 h-12 text-secondary" />,
      title: "Built for Students",
      text: "A growing community where students share, rate, and help each other prepare for exams.",
    },
    {
      icon: <FaBolt className="text-4xl w-12 mb-2 h-12 text-secondary" />,
      title: "Instant Access",
      text: "Search your course, click download, and start learning instantly — no hassle or wait time.",
    },
  ];
  return (
    <section className="font-sans   min-h-screen">
      <Navbar />
    {/* hero section  */}
      <main className="flex flex-col items-center justify-center text-center px-6 py-20">

        <div className="max-w-3xl flex flex-col items-center">
          {/* <p className="bg-primary px-4 py-2 rounded-3xl max-w-[250px]">📗 Your High Score Awaits</p> */}
          <h2 className="text-5xl md:text-7xl font-bold  leading-tight mb-6">
            <span className="text-secondary">Ace</span> Your Exams <br /> With the Right Study PDFs
          </h2>

          <p className="text-lg md:text-xl text-gray-200 mb-10">
            Find curated past questions, notes, and study guides from real students —
            all in one place.
          </p>

          <Link
            href="/products"
            className="bg-[hsl(198,100%,51%)] text-white px-6 py-3 font-semibold rounded-md hover:bg-[hsl(198,100%,46%)] transition-colors"
          >
            Find PDFs Now
          </Link>
        </div>
      </main>
      {/* features */}
  <section className="w-full py-16 bg-gray-800 font-open">
      <div className="max-w-6xl mx-auto px-6 text-center">
        <h2 className="text-4xl md:text-5xl font-bold mb-4 text-white">
          Why Choose <span className="text-primary">University Hub</span>?
        </h2>
        <p className="text-gray-200 mb-12">
          We make studying simpler, faster, and more collaborative for university students.
        </p>

        <div className="grid gap-12 pb-16 pt-8 md:grid-cols-3">
          {features.map((item, index) => (
            <div
              key={index}
              className="bg-gray-600  shadow-sm rounded-2xl p-8 hover:shadow-md transition duration-300"
            >
              <div className="flex justify-center mb-4">{item.icon}</div>
              <h3 className="text-2xl font-semibold text-gray-200 mb-2">
                {item.title}
              </h3>
              <p className="text-gray-300">{item.text}</p>
            </div>
          ))}
        </div>
           <Link
            href="/products"
            className="bg-secondary text-gray-200 px-6 py-3 font-semibold rounded-md hover:text-gray-400 transition-colors"
          >
            Get Your Dream Score
          </Link>
      </div>

    </section>
      <Footer/>
    </section>
  );
}
