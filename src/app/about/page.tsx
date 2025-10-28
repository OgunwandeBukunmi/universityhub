"use client";
import { FaEnvelope, FaPhoneAlt } from "react-icons/fa";
import Image from "next/image";
import Footer from "@/src/components/Footer";

export default function ContactPage() {
  return (
    <section className="w-full font-open bg-gray-900 text-white">
      {/* Hero Banner */}
      <div className="relative w-full h-32 md:h-42">
      
        <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
          <h1 className="text-3xl md:text-5xl font-bold px-6 py-2 rounded bg-black bg-opacity-30">
            What to Know About Us
          </h1>
        </div>
      </div>

      {/* Contact Info + Visual */}
      <div className="max-w-6xl mx-auto px-6 py-16 grid md:grid-cols-2 gap-12 items-center">
        {/* Left Side - Text */}
        <div className="space-y-6">
          <h2 className="text-4xl md:text-5xl font-bold text-white">
            We’re Here to Help Students Succeed
          </h2>
          <p className="text-gray-200 text-lg">
            At University Hub, our mission is to make studying easier and more
            collaborative. Have questions, suggestions, or feedback? We’d love
            to hear from you! Whether you want to contribute PDFs, report
            issues, or just say hi, you’re in the right place.
          </p>

          <div className="space-y-4">
            <div className="flex items-center gap-3 text-gray-100">
              <FaEnvelope className="text-indigo-500" />
              <span>contact@universityhub.com</span>
            </div>
            <div className="flex items-center gap-3 text-gray-100">
              <FaPhoneAlt className="text-indigo-500" />
              <span>+234 801 234 5678</span>
            </div>
          </div>
        </div>

        {/* Right Side - Image */}
        <div className="w-full h-90 md:h-110 relative rounded-lg overflow-hidden shadow-lg">
          <Image
          src="/university_hub.jpeg"
            alt="Library"
            fill
            className="object-cover"
          />
        </div>
      </div>

      {/* Optional Bottom Section */}
      <div className="w-full  relative mt-12">
       
        <Footer/>
      </div>
    </section>
  );
}
