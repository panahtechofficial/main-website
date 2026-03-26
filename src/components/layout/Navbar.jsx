"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu, X } from "lucide-react";
import { usePathname } from "next/navigation";
import DarkModeToggle from "@/components/ui/DarkModeToggle";

export default function Navbar() {
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();
  const isHome = pathname === "/";

  // Ubah nilai minimal scroll trigger di sini (default: 70)
  const SCROLL_TRIGGER = 120;

  useEffect(() => {
    let ticking = false;

    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          if (!isHome) {
            setIsScrolled(true);
          } else {
            setIsScrolled(window.scrollY > SCROLL_TRIGGER);
          }
          ticking = false;
        });
        ticking = true;
      }
    };

    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, [isHome]);

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Services", href: "/services" },
    { name: "Portfolio", href: "/portfolio" },
    { name: "Contact", href: "/contact" },
  ];

  const compactMode = !isHome || isScrolled;

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-out
        ${
          compactMode
            ? "bg-white/80 dark:bg-zinc-900/80 shadow-lg border-b border-gray-200 dark:border-zinc-800 backdrop-blur-xl"
            : "shadow-none border-none backdrop-blur-0"
        }`}
    >
      <div
        className={`mx-auto flex items-center px-6 py-3 relative transition-all duration-500 ease-out
        ${compactMode ? "max-w-7xl justify-between" : "max-w-2xl justify-center"}`}
      >
        {/* Logo & Text Centered if not scrolled */}
        <Link
          href="/"
          className={`flex items-center gap-2 group transition-all duration-500 ease-out
          ${compactMode ? "" : "flex-col"}`}
        >
          <div className="relative w-20 h-10 overflow-hidden">
            <Image
              src="/logo-panahtech.webp"
              alt="PanahTech Logo"
              fill
              className="object-contain"
            />
          </div>
        </Link>

        {/* Desktop Nav */}
        <div
          className={`hidden md:flex items-center transition-all duration-500 ease-out
          ${compactMode ? "gap-8 opacity-100" : "gap-5 ml-14 opacity-90"}`}
        >
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.name}
                href={link.href}
                className={`px-3 py-1 rounded-lg font-medium text-sm transition-all duration-200 border-b-2 ${
                  isActive
                    ? "text-primary border-primary bg-primary/10 shadow-sm"
                    : "text-gray-700 dark:text-gray-200 border-transparent hover:text-primary hover:bg-primary/5"
                }`}
              >
                {link.name}
              </Link>
            );
          })}
          <DarkModeToggle isInline />
        </div>

        {/* Mobile Button */}
        <button
          onClick={() => setIsMobileOpen(!isMobileOpen)}
          className={`md:hidden p-2 rounded-lg border transition-all duration-500 ease-out
            ${compactMode ? "border-gray-300 dark:border-zinc-700 bg-white/70 dark:bg-zinc-900/70 shadow" : "border-transparent bg-transparent shadow-none"}`}
        >
          {isMobileOpen ? <X size={26} /> : <Menu size={26} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <div
        className={`fixed inset-0 z-[60] md:hidden flex flex-col items-center justify-center gap-8 bg-white/95 dark:bg-zinc-950/95 backdrop-blur-2xl transition-opacity duration-300 ${
          isMobileOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
      >
        {navLinks.map((link) => (
          <Link
            key={link.name}
            href={link.href}
            onClick={() => setIsMobileOpen(false)}
            className="text-2xl font-semibold text-gray-800 dark:text-gray-100 hover:text-primary px-4 py-2 rounded-lg transition-colors shadow"
          >
            {link.name}
          </Link>
        ))}
        <div className="mt-6">
          <DarkModeToggle isInline />
        </div>
      </div>
    </nav>
  );
}
