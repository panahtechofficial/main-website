"use client";

import Link from "next/link";
import { ChevronLeft } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { getServiceDetailBySlug, getServiceVisualBySlug } from "@/lib/services";

export default function ServiceDetailContent({ slug }) {
  const { language } = useLanguage();
  const service = getServiceDetailBySlug(slug, language);

  if (!service) {
    return (
      <section className="max-w-5xl mx-auto">
        <div className="bg-white dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-800 rounded-3xl p-8 md:p-10 shadow-sm">
          <h1 className="text-2xl font-black text-zinc-900 dark:text-white">
            {language === "id"
              ? "Layanan tidak ditemukan"
              : "Service not found"}
          </h1>
          <Link
            href="/services"
            className="inline-flex items-center text-sm text-primary hover:text-orange-700 mt-4"
          >
            <ChevronLeft className="mr-2" />
            {language === "id"
              ? "Kembali ke semua layanan"
              : "Back to all services"}
          </Link>
        </div>
      </section>
    );
  }

  const visualService = getServiceVisualBySlug(slug, language);
  const Icon = visualService?.icon;
  const iconColor = visualService?.color || "bg-zinc-100 text-zinc-700";
  const hasPromoPrice =
    typeof service.promoPrice === "string" &&
    service.promoPrice.trim().length > 0;

  return (
    <section className="max-w-5xl mx-auto">
      <Link
        href="/services"
        className="inline-flex items-center text-sm text-primary hover:text-orange-700 mb-6"
      >
        <ChevronLeft className="mr-2" />
        {language === "id"
          ? "Kembali ke semua layanan"
          : "Back to all services"}
      </Link>

      <div className="bg-white dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-800 rounded-3xl p-8 md:p-10 shadow-sm">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-primary font-semibold">
              {language === "id" ? "Detail Layanan" : "Service Detail"}
            </p>
            <h1 className="text-3xl md:text-4xl font-black text-zinc-900 dark:text-white mt-2">
              {service.title}
            </h1>
            <p className="mt-4 text-secondary max-w-2xl">
              {service.description}
            </p>
          </div>
          {Icon && (
            <div
              className={`w-16 h-16 rounded-2xl flex items-center justify-center ${iconColor}`}
            >
              <Icon size={30} />
            </div>
          )}
        </div>

        <div className="mt-8 grid md:grid-cols-2 gap-6">
          <div className="rounded-2xl border border-zinc-100 dark:border-zinc-800 p-6 bg-gray-50/60 dark:bg-zinc-950/40">
            <h2 className="text-lg font-bold text-zinc-900 dark:text-white">
              {language === "id" ? "Deskripsi Lengkap" : "Full Description"}
            </h2>
            <p className="text-secondary mt-3">{service.fullDescription}</p>
          </div>
          <div className="rounded-2xl border border-zinc-100 dark:border-zinc-800 p-6 bg-gray-50/60 dark:bg-zinc-950/40">
            <h2 className="text-lg font-bold text-zinc-900 dark:text-white">
              {language === "id" ? "Harga" : "Price"}
            </h2>
            {hasPromoPrice ? (
              <div className="mt-3">
                <p className="relative inline-block line-through text-zinc-400 dark:text-zinc-500 italic -skew-x-6 text-sm md:text-base font-semibold">
                  {service.price}
                </p>
                <p className="mt-1 text-primary text-2xl md:text-3xl font-black tracking-tight">
                  {service.promoPrice + "*"} 
                </p>
                <p className="mt-1 text-xs text-primary/80 font-semibold">
                  {language === "id" ? "Harga Promo" : "Promotional Price"}
                </p>
              </div>
            ) : (
              <p className="text-secondary mt-3 font-semibold">
                {service.price}
              </p>
            )}
            <p className="text-xs text-secondary mt-2">
              {language === "id"
                ? "* Harga bersifat indikatif dan bisa berubah sesuai ruang lingkup serta kebutuhan fitur project."
                : "* Prices are indicative and may vary based on project scope and requirements."}
            </p>
          </div>
        </div>

        <div className="mt-6 rounded-2xl border border-zinc-100 dark:border-zinc-800 p-6 bg-gray-50/60 dark:bg-zinc-950/40">
          <h2 className="text-lg font-bold text-zinc-900 dark:text-white">
            {language === "id" ? "Fitur" : "Features"}
          </h2>
          <ul className="mt-3 grid sm:grid-cols-2 gap-y-2 gap-x-6 text-sm text-secondary">
            {service.features.map((item) => (
              <li key={item} className="flex gap-2">
                <span className="text-primary">•</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="flex mt-6">
          <Link
            href="/contact"
            className="px-5 py-2.5 rounded-full bg-primary text-white text-sm font-semibold hover:bg-orange-600 transition-colors"
          >
            {language === "id" ? "Konsultasi sekarang" : "Consult now"}
          </Link>
        </div>
      </div>
    </section>
  );
}
