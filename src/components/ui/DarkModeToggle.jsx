"use client";

import { useTheme } from "@/context/ThemeContext";
import { Sun, Moon } from "lucide-react";

export default function DarkModeToggle({ isInline = false }) {
    const { darkMode, toggleDarkMode } = useTheme();

    // Base classes for the button
    const baseClasses = "w-11 h-11 rounded-full bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-700 shadow-lg flex items-center justify-center hover:scale-110 active:scale-95 transition-all duration-300 cursor-pointer overflow-hidden";
    
    // Positioning classes (fixed vs inline)
    const positionClasses = isInline ? "relative" : "fixed top-5 right-5 z-50";

    return (
        <button
            onClick={toggleDarkMode}
            className={`${baseClasses} ${positionClasses}`}
            aria-label="Toggle dark mode"
        >
            <div className="relative w-5 h-5">
                {/* Sun icon */}
                <Sun
                    size={20}
                    className={`absolute inset-0 text-orange-500 transition-all duration-300 ${
                        darkMode ? "opacity-0 rotate-90 scale-0" : "opacity-100 rotate-0 scale-100"
                    }`}
                />
                {/* Moon icon */}
                <Moon
                    size={20}
                    className={`absolute inset-0 text-blue-400 transition-all duration-300 ${
                        darkMode ? "opacity-100 rotate-0 scale-100" : "opacity-0 -rotate-90 scale-0"
                    }`}
                />
            </div>
        </button>
    );
}
