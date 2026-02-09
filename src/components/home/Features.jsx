"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function Features() {
    const container = useRef(null);
    const title = useRef(null);
    const textRef = useRef(null);

    useGSAP(() => {
        // 1. Title Slide Up Animation
        gsap.from(title.current, {
            scrollTrigger: {
                trigger: title.current,
                start: "top 85%", // Starts when top of element hits 85% of viewport
                end: "top 60%",
                scrub: 1,
            },
            y: 100,
            opacity: 0,
            duration: 1
        });

        // 2. Text Reveal (Color Change) Animation
        // Select all characters (spans) inside the textRef
        const chars = textRef.current.querySelectorAll(".char");

        gsap.to(chars, {
            scrollTrigger: {
                trigger: textRef.current,
                start: "top 80%",
                end: "bottom 60%",
                scrub: 1,
            },
            color: "var(--color-secondary)", // Transition to secondary color
            stagger: 0.1,     // Stagger effect for one-by-one change
        });

    }, { scope: container });

    // Helper to split text into characters wrapped in spans
    const splitText = (text) => {
        return text.split("").map((char, index) => (
            <span key={index} className="char transition-colors duration-75">
                {char}
            </span>
        ));
    };

    return (
        <div ref={container} className="w-full px-2 h-screen flex flex-col items-center justify-center">
            <h1 ref={title} className="text-2xl md:text-4xl bg-linear-to-b from-primary to-[#F1F1F1] bg-clip-text text-transparent font-[1000] text-center leading-tight">
                Faster Loading. Real-time<br />Tracking. Scalable Code.<br />Modern UI. Secure Data.
            </h1>

            <p ref={textRef} className="text-gray-300 font-normal text-md md:text-xl mt-7 text-center">
                {splitText("High-performance engineering that turns")} <br />
                {splitText("complex problems into elegant solutions.")}
            </p>
        </div>
    );
}