"use client";

import Image from "next/image";
import { RiScrollToBottomLine } from "react-icons/ri";
import { GithubCard, CodeCard, CoffeeCard, TempCard, DateCard } from "@/components/ui/FloatingCards";
import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import FloatingLines from "../FloatingLines";

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

export default function Hero() {
    const containerRef = useRef(null);
    const contentRef = useRef(null);
    const cardsRef = useRef(null);
    const linesRef = useRef(null);

    useGSAP(() => {
        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: containerRef.current,
                start: "top top",
                end: "bottom center",
                scrub: 1, // Smooth scrolling effect
                pin: true, // Pin the hero section while scrolling
                pinSpacing: false, // Allow next section to overlap if desired, or true to push
            }
        });

        // 1. Hero Content (Text & Logo) fades out WITHOUT moving up
        tl.to(contentRef.current, {
            opacity: 0,
            duration: 0.5
        }, 0);

        // 2. Floating Lines also fade out
        if (linesRef.current) {
            tl.to(linesRef.current, {
                opacity: 0,
                duration: 0.5
            }, 0);
        }

        const cards = cardsRef.current.children;

        tl.to(cards[0], { x: -100, y: -100, opacity: 0, rotation: -20 }, 0);

        tl.to(cards[1], { x: -150, opacity: 0, rotation: -45 }, 0);

        tl.to(cards[2], { x: -100, y: 100, opacity: 0, rotation: -10 }, 0);
        tl.to(cards[3], { x: 100, y: -100, opacity: 0, rotation: 20 }, 0);
        tl.to(cards[4], { x: 100, y: 100, opacity: 0, rotation: 10 }, 0);

    }, { scope: containerRef });

    return (
        <div ref={containerRef} className="w-full h-screen flex flex-col items-center justify-center relative overflow-hidden">
            <div ref={contentRef} className="flex flex-col items-center z-10">
                <Image src="/logo-panahtech.webp" alt="Hero" width={269} height={269} priority />
                <div className="text-3xl md:text-4xl sm:px-3 text-black dark:text-white font-[1000] text-center mt-7">
                    <h1>Turning Problem Into</h1>
                    <h1 className="text-primary mt-2">Solutions</h1>
                    <p className="text-secondary font-normal text-sm md:text-lg mt-7">We transform complex challenges into <br /> seamless Web, AI, and IoT integrations.</p>
                </div>
                <button 
                    onClick={() => {
                        gsap.to(window, {
                            scrollTo: { y: window.innerHeight-100, autoKill: false },
                            duration: 1.5,
                            ease: "expo.in"
                        });
                    }} 
                    className="flex flex-col text-secondary items-center gap-2 mt-7 hover:cursor-pointer group"
                >
                    <p className="group-hover:text-primary transition-colors">Learn More</p>
                    <RiScrollToBottomLine className="animate-bounce text-2xl group-hover:text-primary transition-colors" />
                </button>
            </div>

            <div ref={cardsRef} className="absolute top-0 left-0 w-full h-full">
                <GithubCard className="absolute cursor-pointer md:scale-150 md:top-[15%] md:left-[7%] scale-90 -rotate-6 top-[3%] left-[3%]" />
                <CoffeeCard className="absolute cursor-pointer md:scale-150 md:top-[40%] md:left-[8%] scale-90 rotate-10 top-[15%] -left-7" />
                <CodeCard className="absolute cursor-pointer md:scale-150 md:bottom-[15%] md:left-[5%] scale-80 -rotate-3 bottom-[15%] left-[3%]" />
                <TempCard className="absolute cursor-pointer md:scale-150 md:top-[17%] md:right-[5%] scale-70 rotate-6 top-[9%] right-[2%]" />
                <DateCard className="absolute cursor-pointer md:scale-150 md:bottom-[20%] md:right-[5%] scale-90 -rotate-12 bottom-[15%] right-[2%]" />
            </div>

            {/* Floating Lines Background - Absolute & Behind Content (desktop dark mode only) */}
            <div ref={linesRef} className="absolute inset-0 w-full h-full -z-10 opacity-50 dark:opacity-30 hidden md:dark:block">
                <FloatingLines
                    linesGradient={["#d73904", "#e35d31"]}
                    animationSpeed={1.0}
                    interactive={true}
                    bendRadius={5}
                    bendStrength={-0.5}
                    mouseDamping={0.05}
                    parallax={true}
                    parallaxStrength={0.5}
                />
            </div>
        </div>
    );
}
