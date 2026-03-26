"use client";

import { GitCommit, Coffee, Thermometer, Calendar, CheckCircle2 } from "lucide-react";
import { useState, useEffect } from "react";
import { getFormattedDate } from "@/utils/dateUtils";

export function GithubCard({ className = "" }) {
    return (
        <div className={`flex items-center gap-3 bg-white dark:bg-zinc-900 p-3 pr-6 rounded-2xl shadow-lg border border-zinc-100 dark:border-zinc-800 w-max transition-colors duration-300 ${className}`}>
            <div className="w-10 h-10 rounded-full bg-zinc-100 dark:bg-zinc-950 flex items-center justify-center text-zinc-600 dark:text-zinc-400">
                <GitCommit size={20} />
            </div>
            <div>
                <p className="text-xs font-mono text-zinc-500 dark:text-zinc-400">panah-core</p>
                <div className="flex items-center gap-2">
                    <span className="text-xs font-medium text-zinc-800 dark:text-zinc-200">main • 8f3a2c</span>
                </div>
                <div className="flex items-center gap-1.5 mt-1">
                    <CheckCircle2 size={12} className="text-green-500" />
                    <span className="text-[10px] font-semibold text-green-600 dark:text-green-400">Status: Deployed</span>
                </div>
            </div>
        </div>
    );
}

export function CodeCard({ className = "" }) {
    return (
        <div className={`bg-white dark:bg-zinc-900 p-4 rounded-2xl shadow-lg border border-zinc-100 dark:border-zinc-800 w-max min-w-50 transition-colors duration-300 ${className}`}>
            <div className="flex gap-1.5 mb-3">
                <div className="w-2.5 h-2.5 rounded-full bg-red-400"></div>
                <div className="w-2.5 h-2.5 rounded-full bg-yellow-400"></div>
                <div className="w-2.5 h-2.5 rounded-full bg-green-400"></div>
            </div>
            <pre className="text-[10px] font-mono leading-relaxed text-zinc-600 dark:text-zinc-400">
                <span className="text-purple-600 dark:text-purple-400">async function</span> <span className="text-blue-600 dark:text-blue-400">connect</span>() {"{"}
                {"\n"}  <span className="text-purple-600 dark:text-purple-400">await</span> contract
                {"\n"}    .<span className="text-blue-600 dark:text-blue-400">read</span>(<span className="text-green-600 dark:text-green-400">'realtime'</span>);
                {"\n"}  <span className="text-purple-600 dark:text-purple-400">return</span> <span className="text-orange-600 dark:text-orange-400">true</span>;
                {"\n"}{"}"}
            </pre>
        </div>
    );
}

export function CoffeeCard({ className = "" }) {
    const [count, setCount] = useState(0);

    useEffect(() => {
        // Random target between 150 and 200
        const target = Math.floor(Math.random() * (200 - 150 + 1)) + 150;

        // Animation settings
        const duration = 2000; // 2 seconds
        const steps = 60;
        const intervalTime = duration / steps;
        const increment = target / steps;

        let current = 0;
        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                setCount(target);
                clearInterval(timer);
            } else {
                setCount(Math.floor(current));
            }
        }, intervalTime);

        return () => clearInterval(timer);
    }, []);

    return (
        <div className={`flex items-center gap-4 bg-white dark:bg-zinc-900 p-3 pr-6 rounded-2xl shadow-lg border border-zinc-100 dark:border-zinc-800 w-max transition-colors duration-300 ${className}`}>
            <div className="w-12 h-12 rounded-xl bg-orange-100 dark:bg-orange-900/30 flex items-center justify-center text-orange-600 dark:text-orange-400">
                <Coffee size={24} />
            </div>
            <div>
                <h3 className="text-2xl font-bold text-zinc-900 dark:text-white">{count}</h3>
                <p className="text-[10px] font-bold tracking-wider text-primary uppercase">Cups This Month</p>
            </div>
        </div>
    );
}

export function TempCard({ className = "" }) {
    const [temp, setTemp] = useState(24.5);

    useEffect(() => {
        const updateTemp = () => {
            // Random temperature between 22.0 and 26.0 (Normal room temp)
            const randomTemp = (Math.random() * (26 - 22) + 22).toFixed(1);
            setTemp(randomTemp);
        };

        // Initial set
        updateTemp();

        // Update every 5 seconds to simulate live sensor
        const interval = setInterval(updateTemp, 1000);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className={`bg-white dark:bg-zinc-900 p-4 rounded-3xl shadow-lg border border-zinc-100 dark:border-zinc-800 w-max transition-colors duration-300 ${className}`}>
            <div className="flex items-center justify-between gap-4 mb-2">
                <div className="w-8 h-8 rounded-full bg-orange-100 dark:bg-orange-900/30 flex items-center justify-center text-orange-600 dark:text-orange-400">
                    <Thermometer size={16} />
                </div>
                <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
            </div>
            <div className="md:h-15 h-10"></div>
            <div className="mt-1">
                <h3 className="text-xl font-bold text-zinc-900 dark:text-white">{temp}°C</h3>
                <p className="text-[10px] text-zinc-500 dark:text-zinc-400">Sensor Array A-4</p>
            </div>
        </div>
    );
}

export function DateCard({ className = "" }) {
    const [dateTime, setDateTime] = useState(null);
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
        const updateTime = () => {
            const now = new Date();
            setDateTime(getFormattedDate(now));
        };

        updateTime();
        const timer = setInterval(updateTime, 1000);

        return () => clearInterval(timer);
    }, []);

    return (
        <div className={`bg-white dark:bg-zinc-900 px-5 py-3 rounded-3xl shadow-lg border border-zinc-100 dark:border-zinc-800 w-max transition-colors duration-300 ${className}`}>
            <div className="flex items-start mr-25 gap-2">
                <div className="flex items-center gap-2 p-1.5 rounded text-green-600 dark:text-green-400">
                    <span className="relative flex size-2">
                        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75"></span>
                        <span className="relative inline-flex size-2 rounded-full bg-green-500"></span>
                    </span>
                    <span className="text-[10px] font-bold">NOW</span>
                </div>
            </div>
            {/* Content - same structure for both states */}
            {!mounted || !dateTime ? (
                <>
                    {/* Skeleton for dayName */}
                    <div className="h-7 flex items-center">
                        <div className="h-5 w-24 bg-zinc-200 dark:bg-zinc-700 rounded animate-pulse"></div>
                    </div>
                    {/* Skeleton for dateString */}
                    <div className="h-3.75 flex items-center">
                        <div className="h-3 w-32 bg-zinc-100 dark:bg-zinc-950 rounded animate-pulse"></div>
                    </div>
                </>
            ) : (
                <>
                    <h3 className="text-lg font-bold text-zinc-900 dark:text-white">{dateTime.dayName}</h3>
                    <p className="text-[10px] font-mono text-zinc-500 dark:text-zinc-400 tracking-widest uppercase">{dateTime.dateString}</p>
                </>
            )}
        </div>
    );
}