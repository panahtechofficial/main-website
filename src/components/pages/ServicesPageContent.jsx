"use client";

import Link from "next/link";
import ServiceCard from "@/components/home/ServiceCard";
import { getServicesData } from "@/data/services";
import { useLanguage } from "@/context/LanguageContext";

export default function ServicesPageContent() {
  const { language } = useLanguage();
  const servicesData = getServicesData(language);

  return (
    <section className="max-w-7xl mx-auto">
      <div className="text-center mb-12">
        <p className="text-primary font-semibold uppercase tracking-[0.2em] text-xs">
          {language === "id" ? "Keahlian Kami" : "Our Expertise"}
        </p>
        <h1 className="mt-3 text-4xl md:text-5xl font-black text-zinc-900 dark:text-white">
          {language === "id"
            ? "Layanan yang tumbuh bersama bisnismu"
            : "Services that scale with your business"}
        </h1>
        <p className="mt-4 text-secondary max-w-2xl mx-auto text-sm md:text-base">
          {language === "id"
            ? "Dari website company profile, AI chatbot, hingga platform IoT. Pilih layanan yang sesuai, lalu masuk ke halaman detail untuk melihat approach PanahTech."
            : "From company profile websites and AI chatbots to IoT platforms. Choose the right service and explore the detail page to see PanahTech's approach."}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 items-stretch">
        {servicesData.map((service) => (
          <div key={service.slug} className="group h-full flex flex-col">
            <ServiceCard service={service} className="flex-1 min-h-80" />
            <div className="mt-4">
              <Link
                href={`/services/${service.slug}`}
                className="inline-flex w-full items-center justify-center gap-2 bg-primary text-white text-xs font-semibold px-4 py-2.5 rounded-full shadow-md hover:bg-orange-600 transition-colors"
              >
                {language === "id"
                  ? "Lihat detail layanan"
                  : "View service details"}
              </Link>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
