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
           University Project Hub is an academic support platform established to assist students in achieving excellence through comprehensive guidance on seminars, research projects, and academic assignments. The platform is dedicated to fostering academic growth by providing structured, well-researched, and original materials that align with institutional standards and research ethics.

Our primary objective is to bridge the gap between students and quality academic resources by offering professional assistance throughout the research and writing process. With a team of qualified researchers, writers, and subject specialists, University Project Hub ensures that each academic work is prepared with precision, clarity, and adherence to scholarly conventions.

We are committed to promoting a culture of academic integrity and intellectual development. Through our services, students are empowered to enhance their understanding of research methodologies, data analysis, and academic writing, thereby strengthening their overall academic performance.

At University Project Hub, excellence is not just a goal—it is a standard.
          </p>

          <div className="space-y-4">
            <div className="flex items-center gap-3 text-gray-100">
              <FaEnvelope className="text-indigo-500" />
              <span>emmaaschoht22@gmail.com</span>
            </div>
            <div className="flex items-center gap-3 text-gray-100">
              <FaPhoneAlt className="text-indigo-500" />
              <span>+234 903 262 6830</span>
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
