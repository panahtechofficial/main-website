"use client";

import { getServicesData } from "@/data/services";
import ServiceCard from "./ServiceCard";
import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useLanguage } from "@/context/LanguageContext";

gsap.registerPlugin(ScrollTrigger);

export default function Services() {
  const { language } = useLanguage();
  const servicesData = getServicesData(language);
  const container = useRef(null);
  const headerRef = useRef(null);
  const gridRef = useRef(null);

  useGSAP(
    () => {
      // Simple Staggered Entrance
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: container.current,
          start: "top 70%",
        },
      });

      tl.from(headerRef.current.children, {
        y: 30,
        opacity: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: "power3.out",
      }).from(
        gridRef.current.children,
        {
          y: 30,
          opacity: 0,
          duration: 0.8,
          stagger: 0.1,
          ease: "power3.out",
        },
        "-=0.4",
      );
    },
    { scope: container },
  );

  return (
    <div
      ref={container}
      className="w-full min-h-screen flex flex-col items-center justify-center px-5 py-10 overflow-hidden"
    >
      <div ref={headerRef} className="text-center max-w-2xl mb-10">
        <h1 className="text-4xl font-[1000] leading-tight text-black dark:text-white mb-4">
          {language === "id" ? "Layanan Kami" : "Our Services"}
        </h1>
        <p className="text-secondary font-normal text-xl">
          {language === "id"
            ? "Solusi teknologi modern yang dirancang sesuai kebutuhan bisnis Anda. Kami membangun masa depan digital."
            : "Cutting-edge technology solutions tailored for your business needs. We build the digital future."}
        </p>
      </div>

      <div
        ref={gridRef}
        className="hidden lg:flex w-full max-w-350 h-125 gap-4"
      >
        {/* Column 1: Profile (Large) & Chatbot (Small) */}
        <div className="flex flex-col gap-4 flex-1 h-full">
          <ServiceCard service={servicesData[0]} className="flex-2 min-h-0!" />
          <ServiceCard
            service={servicesData[3]}
            className="flex-1 min-h-0!"
            layoutVariant="school-home"
          />
        </div>

        {/* Column 2: Catalogue & VR (Equal) */}
        <div className="flex flex-col gap-4 flex-1 h-full">
          <ServiceCard service={servicesData[1]} className="flex-1 min-h-0!" />
          <ServiceCard service={servicesData[4]} className="flex-1 min-h-0!" />
        </div>

        {/* Column 3: School & IOT (Equal) */}
        <div className="flex flex-col gap-4 flex-1 h-full">
          <ServiceCard service={servicesData[2]} className="flex-1 min-h-0!" />
          <ServiceCard service={servicesData[5]} className="flex-1 min-h-0!" />
        </div>
      </div>

      {/* Mobile/Tablet Fallback */}
      <div className="grid lg:hidden grid-cols-1 md:grid-cols-2 gap-6 max-w-7xl w-full">
        {servicesData.map((service, index) => (
          <ServiceCard
            key={index}
            service={service}
            layoutVariant={
              service.slug === "school-website" ? "school-home" : "default"
            }
          />
        ))}
      </div>
    </div>
  );
}
