"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import DarkModeToggle from "@/components/ui/DarkModeToggle";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();

  const SCROLL_TRIGGER = 100;

  useEffect(() => {
    let ticking = false;

    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          setIsScrolled(window.scrollY > SCROLL_TRIGGER);
          ticking = false;
        });
        ticking = true;
      }
    };

    // Set initial state
    setIsScrolled(window.scrollY > SCROLL_TRIGGER);

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Services", href: "/services" },
    { name: "Portfolio", href: "/portfolio" },
    { name: "Contact", href: "/contact" },
  ];

  return (
    <nav
      className={`fixed top-0 z-50 transition-all duration-500 ease-in-out
        ${
          isScrolled
            ? "left-1/2 -translate-x-1/2 w-[94%] sm:w-[92%] md:w-4/6 mt-2 md:mt-4 rounded-2xl md:rounded-xl bg-white/60 dark:bg-zinc-900/60 shadow-lg border border-gray-200/50 dark:border-zinc-700/50 backdrop-blur-xl"
            : "left-0 right-0 translate-x-0 w-full mt-0 rounded-none bg-transparent shadow-none border-transparent backdrop-blur-0"
        }`}
    >
      <div className="px-3 md:px-6 mx-auto py-3">
        <div className="flex items-center gap-3 md:justify-between">
          <Link href="/" className="flex items-center gap-2 group">
            <div className="relative w-16 md:w-20 h-8 md:h-10 overflow-hidden shrink-0">
              <Image
                src="/logo-panahtech.webp"
                alt="PanahTech Logo"
                fill
                className="object-contain"
              />
            </div>
          </Link>

          <div className="md:hidden flex-1 overflow-x-auto no-scrollbar">
            <div className="flex items-center gap-3 min-w-max pr-1">
              {navLinks.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <Link
                    key={link.name}
                    href={link.href}
                    className={`relative px-1 py-1 font-medium text-xs transition-colors duration-200 group whitespace-nowrap ${
                      isActive
                        ? "text-primary"
                        : "text-gray-700 dark:text-gray-200 hover:text-primary"
                    }`}
                  >
                    {link.name}
                    <span
                      className={`absolute bottom-0 left-0 h-0.5 bg-primary transition-all duration-300 ${
                        isActive ? "w-full" : "w-0 group-hover:w-full"
                      }`}
                    />
                  </Link>
                );
              })}
            </div>
          </div>

          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`relative px-1 py-1 font-medium text-sm transition-colors duration-200 group ${
                    isActive
                      ? "text-primary"
                      : "text-gray-700 dark:text-gray-200 hover:text-primary"
                  }`}
                >
                  {link.name}
                  <span
                    className={`absolute bottom-0 left-0 h-0.5 bg-primary transition-all duration-300 ${
                      isActive ? "w-full" : "w-0 group-hover:w-full"
                    }`}
                  />
                </Link>
              );
            })}
            <DarkModeToggle isInline />
          </div>

          <div className="md:hidden">
            <DarkModeToggle isInline />
          </div>
        </div>
      </div>
    </nav>
  );
}
