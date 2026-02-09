"use client";

import { useState, useEffect, useRef } from "react";
import { MessageCircle } from "lucide-react";
import gsap from "gsap";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";

gsap.registerPlugin(ScrollToPlugin);

export default function FloatingChatButton() {
    const [isVisible, setIsVisible] = useState(false);
    const [isAtChatroom, setIsAtChatroom] = useState(false);
    const buttonRef = useRef(null);

    // Show button after scrolling past Hero, hide when at chatroom
    useEffect(() => {
        const handleScroll = () => {
            const heroHeight = window.innerHeight;
            const chatroomEl = document.getElementById("chatroom-section");
            
            // Show after Hero
            const pastHero = window.scrollY > heroHeight * 0.8;
            
            // Hide when chatroom is visible in viewport
            let atChatroom = false;
            if (chatroomEl) {
                const rect = chatroomEl.getBoundingClientRect();
                atChatroom = rect.top < window.innerHeight && rect.bottom > 0;
            }
            
            setIsVisible(pastHero && !atChatroom);
            setIsAtChatroom(atChatroom);
        };

        window.addEventListener("scroll", handleScroll);
        handleScroll();
        
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const handleClick = () => {
        // Scroll to chatroom
        const chatroomSection = document.getElementById("chatroom-section");
        if (chatroomSection) {
            gsap.to(window, {
                scrollTo: { y: chatroomSection, offsetY: 100 },
                duration: 1.2,
                ease: "power3.inOut",
                onComplete: () => {
                    // Dispatch activate event to focus input
                    window.dispatchEvent(new CustomEvent("chatroom-activate"));
                }
            });
        }
    };

    return (
        <div 
            className={`fixed bottom-6 right-6 z-50 transition-all duration-500 ${
                isVisible ? "translate-y-0 opacity-100" : "translate-y-20 opacity-0 pointer-events-none"
            }`}
        >
            <button 
                ref={buttonRef}
                onClick={handleClick}
                className="w-15 h-15 rounded-full bg-linear-to-r from-orange-500 to-orange-600 text-white shadow-lg shadow-orange-500/30 flex items-center justify-center cursor-pointer hover:scale-110 transition-transform"
            >
                <MessageCircle size={26} />
            </button>
        </div>
    );
}
