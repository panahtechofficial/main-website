"use client";

import Image from "next/image";
import Link from "next/link";
import { getPortofolio } from "@/data/portofolio";
import { useLanguage } from "@/context/LanguageContext";

export default function PortfolioPageContent() {
  const { language } = useLanguage();
  const portfolioItems = getPortofolio(language);

  return (
    <section className="max-w-7xl mx-auto">
      <div className="text-center mb-12">
        <p className="text-primary font-semibold uppercase tracking-[0.2em] text-xs">
          {language === "id" ? "Karya Pilihan" : "Selected Works"}
        </p>
        <h1 className="mt-3 text-4xl md:text-5xl font-black text-zinc-900 dark:text-white">
          {language === "id" ? "Portofolio PanahTech" : "PanahTech Portfolio"}
        </h1>
        <p className="mt-4 text-secondary max-w-2xl mx-auto text-sm md:text-base">
          {language === "id"
            ? "Beberapa project yang menunjukkan bagaimana kami membangun produk digital dengan fokus pada performa, estetika, dan hasil bisnis."
            : "Selected projects showing how we build digital products with focus on performance, aesthetics, and business outcomes."}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {portfolioItems.map((project) => (
          <article
            key={project.id}
            className="group bg-white dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-800 rounded-3xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300"
          >
            <div className="relative h-52 overflow-hidden">
              <Image
                src={project.image}
                alt={project.title}
                fill
                unoptimized
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-linear-to-t from-black/40 via-black/10 to-transparent" />
            </div>

            <div className="p-6">
              <h2 className="text-xl font-bold text-zinc-900 dark:text-white line-clamp-2">
                {project.title}
              </h2>
              <p className="text-secondary text-sm mt-3 line-clamp-3">
                {project.description}
              </p>

              <div className="mt-5 flex items-center gap-3">
                {project.link ? (
                  <a
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 bg-primary text-white text-sm font-semibold px-4 py-2 rounded-full hover:bg-orange-600 transition-colors"
                  >
                    {language === "id" ? "Kunjungi project" : "Visit project"}
                  </a>
                ) : (
                  <span className="inline-flex items-center bg-zinc-200 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-300 text-xs font-semibold px-4 py-2 rounded-full">
                    {language === "id"
                      ? "Project internal"
                      : "Internal project"}
                  </span>
                )}
                <Link
                  href="/contact"
                  className="text-sm font-semibold text-primary hover:underline"
                >
                  {language === "id" ? "Butuh yang serupa?" : "Need similar?"}
                </Link>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
