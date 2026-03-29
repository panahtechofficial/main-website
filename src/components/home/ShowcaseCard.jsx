"use client";
import Image from "next/image";
import { MessageCircle } from "lucide-react";

export default function ShowcaseCard() {
  return (
    <div className="w-full lg:w-87.5 h-125 lg:h-137.5 sticky top-6 rounded-4xl overflow-hidden shadow-xl group">
      <Image
        src="/images/showcase.webp"
        alt="PanahTech Showcase"
        fill
        priority
        className="object-cover object-right transition-transform duration-700 group-hover:scale-105"
      />
      {/* Overlay Gradient */}
      <div className="absolute inset-0 bg-linear-to-t from-black via-black/40 to-black/80"></div>

      {/* Content */}
      <div className="absolute inset-0 p-8 flex flex-col justify-between text-white z-10">
        {/* Top Logo Area */}
        <Image
          src="/logo-panahtech.svg"
          alt="PanahTech Logo"
          width={100}
          height={30}
          className="grayscale brightness-0 invert opacity-90 pointer-events-none"
          style={{ height: "auto" }}
        />

        {/* Middle/Bottom Text */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold mb-2">PanahTech</h2>
          <p className="text-gray-300 text-xs tracking-widest uppercase mb-4">
            Digital Transformation
          </p>

          <p className="text-gray-200 text-sm leading-relaxed max-w-xs">
            Transforming ideas into digital reality with modern technologies.
          </p>
        </div>

        {/* Bottom Buttons */}
        <div className="flex items-center gap-3">
          <button className="flex-1 bg-white text-black py-3 rounded-full font-bold text-sm hover:bg-gray-200 transition-colors">
            Chat with us
          </button>
          <button className="w-12 h-12 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center hover:bg-white/20 transition-colors text-white">
            <MessageCircle size={20} />
          </button>
        </div>
      </div>
    </div>
  );
}
