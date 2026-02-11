"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import {
  SiReact, SiNextdotjs, SiTailwindcss, SiNodedotjs, SiMongodb,
  SiPostgresql, SiDocker, SiFigma, SiVercel, SiUnity, SiBlender,
  SiArduino, SiPython, SiJavascript, SiVuedotjs, SiHtml5,
  SiCss3, SiBootstrap, SiExpress, SiMysql, SiGooglecloud, SiFirebase
} from "react-icons/si";

gsap.registerPlugin(ScrollTrigger);

// Split brands into two different sets for top and bottom rows
const topBrands = [
  SiReact, SiNextdotjs, SiTailwindcss, SiNodedotjs, SiMongodb,
  SiPostgresql, SiDocker, SiFigma, SiVercel, SiFirebase, SiBlender
];

const bottomBrands = [
  SiUnity, SiArduino, SiPython, SiJavascript, SiVuedotjs,
  SiHtml5, SiCss3, SiBootstrap, SiExpress, SiMysql, SiGooglecloud
];

// Duplicate each for seamless infinite loop
const topMarqueeBrands = [...topBrands, ...topBrands];
const bottomMarqueeBrands = [...bottomBrands, ...bottomBrands];

export default function LogoMarquee() {
  const topRowRef = useRef(null);
  const bottomRowRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const topRow = topRowRef.current;
      const bottomRow = bottomRowRef.current;

      const topWidth = topRow.scrollWidth / 2;
      const bottomWidth = bottomRow.scrollWidth / 2;

      // 🔁 marquee timelines
      const topTl = gsap.to(topRow, {
        x: -topWidth,
        duration: 25,
        ease: "none",
        repeat: -1,
      });

      const bottomTl = gsap.fromTo(
        bottomRow,
        { x: -bottomWidth },
        {
          x: 0,
          duration: 25,
          ease: "none",
          repeat: -1,
        }
      );

      // 🖱️ Hover pause - TOP
      topRow.addEventListener("mouseenter", () => {
        gsap.to(topTl, { timeScale: 0, duration: 0.3 });
      });

      topRow.addEventListener("mouseleave", () => {
        gsap.to(topTl, { timeScale: 1, duration: 0.6, ease: "power3.out" });
      });

      // 🖱️ Hover pause - BOTTOM
      bottomRow.addEventListener("mouseenter", () => {
        gsap.to(bottomTl, { timeScale: 0, duration: 0.3 });
      });

      bottomRow.addEventListener("mouseleave", () => {
        gsap.to(bottomTl, { timeScale: 1, duration: 0.6, ease: "power3.out" });
      });


      let resetTimeout;

      ScrollTrigger.create({
        start: 0,
        end: "max",
        onUpdate(self) {
          const velocity = self.getVelocity();
          const dir = velocity > 0 ? -1 : 1;

          if (Math.abs(velocity) > 120) {
            // 🧨 SCRATCH EFFECT
            gsap.to(topTl, {
              timeScale: dir * 2.2,
              duration: 0.15,
              ease: "power3.out",
            });

            gsap.to(bottomTl, {
              timeScale: dir * -2.2,
              duration: 0.15,
              ease: "power3.out",
            });

            // skew for extra scratch feeling
            gsap.to([topRow, bottomRow], {
              skewX: dir * 4,
              duration: 0.15,
            });

            clearTimeout(resetTimeout);

            resetTimeout = setTimeout(() => {
              gsap.to([topTl, bottomTl], {
                timeScale: 1,
                duration: 0.6,
                ease: "power4.out",
              });

              gsap.to([topRow, bottomRow], {
                skewX: 0,
                duration: 0.6,
                ease: "power4.out",
              });
            }, 120);
          }
        },
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <div className="w-full pt-10 border-t border-gray-200 dark:border-zinc-800 overflow-hidden relative transition-colors duration-300">
      {/* fade edges */}
      <div className="absolute left-0 top-0 bottom-0 w-20 bg-linear-to-r from-gray-50 dark:from-zinc-950 to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-20 bg-linear-to-l from-gray-50 dark:from-zinc-950 to-transparent z-10 pointer-events-none" />

      {/* TOP MARQUEE */}
      <div
        ref={topRowRef}
        className="flex w-max items-center md:gap-16 gap-8 mb-6"
      >
        {topMarqueeBrands.map((Brand, idx) => (
          <div
            key={`top-${idx}`}
            className="shrink-0 flex items-center justify-center opacity-30 grayscale hover:grayscale-0 hover:opacity-100 transition-all duration-300 transform hover:scale-110 cursor-pointer dark:opacity-40 dark:hover:opacity-100"
          >
            <Brand className="w-6 h-6 md:w-8 md:h-8" />
          </div>
        ))}
      </div>

      {/* BOTTOM MARQUEE */}
      <div
        ref={bottomRowRef}
        className="flex w-max items-center md:gap-16 gap-8"
      >
        {bottomMarqueeBrands.map((Brand, idx) => (
          <div
            key={`bottom-${idx}`}
            className="shrink-0 flex items-center justify-center opacity-30 grayscale hover:grayscale-0 hover:opacity-100 transition-all duration-300 transform hover:scale-110 cursor-pointer dark:opacity-40 dark:hover:opacity-100"
          >
            <Brand className="w-6 h-6 md:w-8 md:h-8" />
          </div>
        ))}
      </div>
    </div>
  );
}
