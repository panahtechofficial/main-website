"use client";

import Image from "next/image";
import { useRef, useState, useEffect, useCallback } from "react";
import gsap from "gsap";
import LogoMarquee from "../ui/LogoMarquee";
import { getPortofolio } from "@/data/portofolio";
import { useLanguage } from "@/context/LanguageContext";

export default function Showcase() {
  const { language } = useLanguage();
  const portofolio = getPortofolio(language);
  const [currentIndex, setCurrentIndex] = useState(0);
  const slideRef = useRef(null);
  const timerRef = useRef(null);
  const progressRef = useRef(null);

  const SLIDE_DURATION = 10; // seconds

  const goToSlide = useCallback(
    (index) => {
      if (index === currentIndex) return;

      const direction = index > currentIndex ? 1 : -1;

      // Animate out current content
      gsap.to(slideRef.current, {
        opacity: 0,
        x: -30 * direction,
        duration: 0.3,
        ease: "power2.in",
        onComplete: () => {
          setCurrentIndex(index);
          // Animate in new content
          gsap.fromTo(
            slideRef.current,
            { opacity: 0, x: 30 * direction },
            { opacity: 1, x: 0, duration: 0.4, ease: "power2.out" },
          );
        },
      });
    },
    [currentIndex],
  );

  const nextSlide = useCallback(() => {
    const next = (currentIndex + 1) % portofolio.length;
    goToSlide(next);
  }, [currentIndex, goToSlide]);

  // Auto-slide timer with progress animation
  useEffect(() => {
    // Reset and animate progress bar
    if (progressRef.current) {
      gsap.killTweensOf(progressRef.current);
      gsap.fromTo(
        progressRef.current,
        { scaleX: 0 },
        { scaleX: 1, duration: SLIDE_DURATION, ease: "none" },
      );
    }

    // Set timer for next slide
    timerRef.current = setTimeout(nextSlide, SLIDE_DURATION * 1000);

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
      if (progressRef.current) gsap.killTweensOf(progressRef.current);
    };
  }, [currentIndex, nextSlide]);

  const currentProject = portofolio[currentIndex];

  return (
    <div className="w-full flex flex-col gap-6">
      {/* Text Info Card */}
      <div className="bg-white dark:bg-zinc-900 rounded-4xl p-10 shadow-sm border border-gray-100 dark:border-zinc-800 transition-colors duration-300">
        <div className="flex items-center gap-2 mb-6">
          <span className="relative flex size-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-75"></span>
            <span className="relative inline-flex size-2 rounded-full bg-primary"></span>
          </span>
          <span className="text-primary font-bold uppercase text-xs tracking-wider">
            Showcase
          </span>
        </div>

        <h2 className="text-3xl md:text-4xl font-bold text-black dark:text-white leading-tight mb-4">
          {language === "id"
            ? "PanahTech sedang membangun"
            : "PanahTech is building"}{" "}
          <br />
          <span className="text-primary">
            {language === "id" ? "masa depan" : "the future"}
          </span>
        </h2>

        <p className="text-secondary text-sm md:text-base max-w-xl">
          {language === "id"
            ? "Kami mengembangkan web app berdampak tinggi, integrasi AI, dan dashboard IoT yang membantu bisnis bertumbuh dari konsep hingga deployment."
            : "We develop high-impact web applications, AI integrations, and IoT dashboards that empower businesses to scale. From concept to deployment."}
        </p>
      </div>

      {/* Project Preview Cards */}
      <div className="flex flex-col md:flex-row gap-6">
        {/* Project Info - Carousel */}
        <div className="flex-2 bg-white dark:bg-zinc-900 rounded-4xl p-10 shadow-sm border border-zinc-100 dark:border-zinc-800 flex flex-col justify-between relative overflow-hidden group h-125 md:h-auto md:min-h-70 transition-colors duration-300">
          {/* Slide Content */}
          <div
            ref={slideRef}
            className="z-10 relative flex flex-col flex-1 justify-between pb-10 md:pb-0"
          >
            <div>
              <h3 className="text-3xl font-black text-black dark:text-white mb-4 line-clamp-2">
                {currentProject.title}
              </h3>

              <p className="text-gray-500 dark:text-zinc-400 text-sm mb-8 max-w-xs line-clamp-3 md:line-clamp-none">
                {currentProject.description}
              </p>
            </div>

            <a
              href={currentProject.link}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-primary text-white px-6 py-3 rounded-full font-bold text-sm w-max hover:bg-orange-600 transition-colors inline-block"
            >
              {language === "id" ? "Lihat live" : "View live"}
            </a>
          </div>

          {/* Dot Pagination */}
          <div className="z-10 relative flex items-center gap-2 mt-6">
            {portofolio.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`relative w-2 h-2 rounded-full transition-all duration-300 ${
                  index === currentIndex
                    ? "bg-primary w-6"
                    : "bg-gray-300 dark:bg-zinc-600 hover:bg-gray-400 dark:hover:bg-zinc-500"
                }`}
                aria-label={`Go to slide ${index + 1}`}
              >
                {/* Progress indicator on active dot */}
                {index === currentIndex && (
                  <span
                    ref={progressRef}
                    className="absolute inset-0 bg-orange-600 rounded-full origin-left"
                    style={{ transform: "scaleX(0)" }}
                  />
                )}
              </button>
            ))}
          </div>

          {/* Background Image */}
          <Image
            src={currentProject.image}
            alt={currentProject.title}
            width={500}
            height={500}
            unoptimized
            className="absolute right-0 top-0 w-1/2 h-full object-cover object-left transition-opacity duration-300"
          />
          <div className="absolute right-0 top-0 w-1/2 h-full bg-linear-to-r from-white dark:from-zinc-900 to-transparent"></div>
        </div>

        {/* Stats Box */}
        <div className="flex-1 bg-zinc-900 rounded-4xl overflow-hidden relative group min-h-70">
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1509042239860-f550ce710b93?q=80&w=600&auto=format&fit=crop')] bg-cover bg-center opacity-60 group-hover:opacity-80 transition-opacity duration-500"></div>
          <div className="absolute inset-0 flex flex-col items-center justify-center text-white p-6 text-center z-10">
            <h4 className="text-4xl font-bold mb-1">100+</h4>
            <p className="text-xs uppercase tracking-widest opacity-70">
              Projects Delivered
            </p>
          </div>
        </div>
      </div>

      {/* Additional Card */}
      <div className="bg-white dark:bg-zinc-900 rounded-4xl p-10 shadow-sm border border-zinc-100 dark:border-zinc-800 min-h-50 transition-colors duration-300">
        <h3 className="text-2xl font-black text-black dark:text-white mb-4">
          More Projects
        </h3>
        <p className="text-gray-500 dark:text-zinc-400 text-sm max-w-md mb-6">
          {language === "id"
            ? "Kami terus mengerjakan proyek-proyek baru di ranah web development, integrasi AI, dan solusi IoT."
            : "We're constantly working on exciting new projects across web development, AI integration, and IoT solutions."}
        </p>
        <div className="flex gap-3">
          <span className="px-4 py-2 bg-gray-100 dark:bg-zinc-950 rounded-full text-xs font-medium text-gray-600 dark:text-zinc-400">
            Web Apps
          </span>
          <span className="px-4 py-2 bg-gray-100 dark:bg-zinc-950 rounded-full text-xs font-medium text-gray-600 dark:text-zinc-400">
            AI Bots
          </span>
          <span className="px-4 py-2 bg-gray-100 dark:bg-zinc-950 rounded-full text-xs font-medium text-gray-600 dark:text-zinc-400">
            IoT
          </span>
        </div>
      </div>

      {/* Logo Marquee */}
      <LogoMarquee />
    </div>
  );
}
