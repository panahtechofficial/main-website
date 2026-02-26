"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu, X } from "lucide-react";
import { usePathname } from "next/navigation";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import DarkModeToggle from "@/components/ui/DarkModeToggle";

export default function Navbar() {
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const pathname = usePathname();

  const navRef = useRef(null);
  const mobileMenuRef = useRef(null);
  const mobileTl = useRef(null);

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Services", href: "/services" },
    { name: "Portfolio", href: "/portfolio" },
    { name: "Contact", href: "/contact" },
  ];

  // 🔥 Initial animation
  useGSAP(() => {
    gsap.from(navRef.current, {
      y: -80,
      opacity: 0,
      duration: 1,
      ease: "power4.out",
    });
  }, []);

  // 🔥 Scroll morph animation
  useEffect(() => {
    const handleScroll = () => {
      if (!navRef.current) return;

      if (window.scrollY > 20) {
        gsap.to(navRef.current, {
          padding: "12px 32px",
          borderRadius: "9999px",
          backdropFilter: "blur(20px)",
          boxShadow: "0 10px 40px rgba(0,0,0,0.12)",
          duration: 0.4,
          ease: "power2.out",
        });
      } else {
        gsap.to(navRef.current, {
          padding: "24px 32px",
          borderRadius: "0px",
          backdropFilter: "blur(0px)",
          boxShadow: "0 0px 0px rgba(0,0,0,0)",
          duration: 0.4,
          ease: "power2.out",
        });
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // 🔥 Mobile menu timeline
  useEffect(() => {
    if (!mobileMenuRef.current) return;

    mobileTl.current = gsap.timeline({ paused: true });

    mobileTl.current.from(".mobile-link", {
      opacity: 0,
      y: 40,
      stagger: 0.1,
      duration: 0.6,
      ease: "power4.out",
    });
  }, []);

  useEffect(() => {
    if (!mobileTl.current) return;

    if (isMobileOpen) {
      mobileTl.current.play();
    } else {
      mobileTl.current.reverse();
    }
  }, [isMobileOpen]);

  return (
    <>
      {/* Floating Navbar */}
      <div className="fixed top-0 left-0 right-0 z-50 flex justify-center pointer-events-none">
        <div
          ref={navRef}
          className="pointer-events-auto w-full px-8 py-6 bg-white/40 dark:bg-zinc-900/40 border border-white/20 dark:border-zinc-800 backdrop-blur-0 transition-colors duration-300"
        >
          {/* Glow Background */}
          <div className="absolute inset-0 -z-10 bg-linear-to-r from-primary/20 to-purple-500/20 blur-3xl opacity-30" />

          <div className="flex items-center justify-between max-w-7xl mx-auto relative">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-3 group">
              <div className="relative w-9 h-9 transition-transform duration-500 group-hover:rotate-6 group-hover:scale-110">
                <Image
                  src="/logo-panahtech.webp"
                  alt="PanahTech Logo"
                  fill
                  className="object-contain"
                />
              </div>
              <span className="font-semibold text-lg tracking-tight bg-linear-to-r from-primary to-purple-500 bg-clip-text text-transparent">
                PanahTech
              </span>
            </Link>

            {/* Desktop Nav */}
            <div className="hidden md:flex items-center gap-10">
              {navLinks.map((link) => {
                const isActive = pathname === link.href;

                return (
                  <Link
                    key={link.name}
                    href={link.href}
                    className="relative text-sm font-medium"
                    onMouseEnter={(e) =>
                      gsap.to(e.currentTarget, {
                        y: -4,
                        duration: 0.3,
                        ease: "power2.out",
                      })
                    }
                    onMouseLeave={(e) =>
                      gsap.to(e.currentTarget, {
                        y: 0,
                        duration: 0.3,
                      })
                    }
                  >
                    <span
                      className={`transition-colors duration-300 ${
                        isActive
                          ? "text-primary"
                          : "text-gray-600 dark:text-gray-300 hover:text-primary"
                      }`}
                    >
                      {link.name}
                    </span>

                    {/* Active Indicator */}
                    <span
                      className={`absolute -bottom-2 left-1/2 -translate-x-1/2 h-1 rounded-full bg-primary transition-all duration-300 ${
                        isActive ? "w-6 opacity-100" : "w-0 opacity-0"
                      }`}
                    />
                  </Link>
                );
              })}

              <DarkModeToggle isInline />
            </div>

            {/* Mobile Button */}
            <button
              onClick={() => setIsMobileOpen(!isMobileOpen)}
              className="md:hidden p-2 rounded-full transition-all duration-300 hover:scale-110 hover:bg-black/5 dark:hover:bg-white/10"
            >
              {isMobileOpen ? <X size={26} /> : <Menu size={26} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        ref={mobileMenuRef}
        className={`fixed inset-0 z-40 md:hidden flex flex-col items-center justify-center gap-10 bg-white/95 dark:bg-zinc-950/95 backdrop-blur-3xl transition-opacity duration-300 ${
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
            className="mobile-link text-3xl font-semibold text-gray-800 dark:text-gray-100 hover:text-primary transition-colors"
          >
            {link.name}
          </Link>
        ))}

        <div className="mt-8 scale-125">
          <DarkModeToggle isInline />
        </div>
      </div>
    </>
  );
}