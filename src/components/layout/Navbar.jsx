"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu, X } from "lucide-react";
import { usePathname } from "next/navigation";
import DarkModeToggle from "@/components/ui/DarkModeToggle";
import { useLanguage } from "@/context/LanguageContext";

export default function Navbar() {
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { language, toggleLanguage } = useLanguage();
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

  useEffect(() => {
    setIsMobileOpen(false);
  }, [pathname]);

  const navLinks = [
    {
      name: language === "id" ? "Beranda" : "Home",
      href: "/",
    },
    {
      name: language === "id" ? "Layanan" : "Services",
      href: "/services",
    },
    {
      name: language === "id" ? "Portofolio" : "Portfolio",
      href: "/portfolio",
    },
    {
      name: language === "id" ? "Kontak" : "Contact",
      href: "/contact",
    },
  ];

  const handleToggleLanguageUi = () => {
    toggleLanguage();
  };

  return (
    <nav
      aria-label="Primary"
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
                src="/logo-panahtech.svg"
                alt="PanahTech Logo"
                fill
                sizes="(max-width: 768px) 64px, 80px"
                priority
                className="object-contain"
              />
            </div>
          </Link>

          <div className="md:hidden flex-1" />

          <ul className="hidden md:flex items-center gap-8 list-none p-0 m-0">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <li key={link.name}>
                  <Link
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
                </li>
              );
            })}

            <li>
              <button
                onClick={handleToggleLanguageUi}
                className="relative flex cursor-pointer items-center w-17 h-8 rounded-full bg-zinc-200 dark:bg-zinc-800 border border-zinc-300 dark:border-white/10 hover:border-zinc-400 dark:hover:border-white/20 transition-all duration-300 overflow-hidden"
                aria-label="Toggle language"
              >
                <span
                  className={`absolute text-[10px] font-bold text-zinc-700 dark:text-white/70 transition-all duration-300 ${
                    language === "id" ? "right-2.5" : "left-3"
                  }`}
                >
                  {language === "id" ? "ID" : "EN"}
                </span>
                <div
                  className={`absolute w-6 h-6 rounded-full bg-white dark:bg-zinc-100 flex items-center justify-center transition-all duration-300 ease-in-out ${
                    language === "id" ? "left-0.5" : "left-[calc(100%-26px)]"
                  }`}
                >
                  <Image
                    src={
                      language === "id"
                        ? "/images/indonesia.png"
                        : "/images/united-kingdom.png"
                    }
                    alt={language === "id" ? "Indonesia" : "English"}
                    width={20}
                    height={20}
                    className="w-5 h-5 rounded-full object-cover"
                  />
                </div>
              </button>
            </li>

            <li>
              <DarkModeToggle isInline />
            </li>
          </ul>

          <div className="md:hidden">
            <button
              onClick={() => setIsMobileOpen((prev) => !prev)}
              className="p-2 rounded-lg cursor-pointer text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-zinc-800 transition-colors"
              aria-label="Toggle menu"
            >
              {isMobileOpen ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
        </div>

        {isMobileOpen && (
          <div className="md:hidden absolute right-3 top-full mt-2 w-44 rounded-xl border border-gray-200/70 dark:border-zinc-700/70 bg-white/95 dark:bg-zinc-900/95 backdrop-blur-xl shadow-xl p-2">
            <ul className="list-none p-0 m-0">
              {navLinks.map((link) => {
                const isActive = pathname === link.href;

                return (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className={`block px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                        isActive
                          ? "text-primary bg-primary/10"
                          : "text-gray-700 dark:text-gray-200 hover:text-primary hover:bg-primary/5"
                      }`}
                    >
                      {link.name}
                    </Link>
                  </li>
                );
              })}
            </ul>

            <div className="mt-2 pt-2 border-t border-gray-200/70 dark:border-zinc-700/70 flex items-center gap-2">
              <div className="flex-1 flex justify-center h-7 my-2 items-center">
                <button
                  onClick={handleToggleLanguageUi}
                  className="relative cursor-pointer flex items-center w-15 h-7 rounded-full bg-zinc-200 dark:bg-zinc-800 border border-zinc-300 dark:border-white/10 hover:border-zinc-400 dark:hover:border-white/20 transition-all duration-300 overflow-hidden"
                  aria-label="Toggle language"
                >
                  <span
                    className={`absolute text-[9px] font-bold text-zinc-700 dark:text-white/70 transition-all duration-300 ${
                      language === "id" ? "right-2" : "left-2"
                    }`}
                  >
                    {language === "id" ? "ID" : "EN"}
                  </span>
                  <div
                    className={`absolute w-5 h-5 rounded-full bg-white dark:bg-zinc-100 flex items-center justify-center transition-all duration-300 ease-in-out ${
                      language === "id" ? "left-0.5" : "left-[calc(100%-22px)]"
                    }`}
                  >
                    <Image
                      src={
                        language === "id"
                          ? "/images/indonesia.png"
                          : "/images/united-kingdom.png"
                      }
                      alt={language === "id" ? "Indonesia" : "English"}
                      width={16}
                      height={16}
                      className="w-4 h-4 rounded-full object-cover"
                    />
                  </div>
                </button>
              </div>

              <div className="flex-1 flex justify-center h-7 items-center">
                <DarkModeToggle isInline />
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
