"use client";

import { FaArrowRight, FaWhatsapp } from "react-icons/fa6";
import { Sparkles, Zap, Globe } from "lucide-react";

export default function CTA() {
    return (
        <div className="w-full">
            {/* Main CTA Card */}
            <div className="relative rounded-[32px] bg-linear-to-br from-zinc-900 via-zinc-800 to-zinc-900 p-10 md:p-12 overflow-hidden">
                
                {/* Animated Background Elements */}
                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                    {/* Glowing orbs */}
                    <div className="absolute -top-20 -right-20 w-80 h-80 bg-primary/20 rounded-full blur-3xl animate-pulse"></div>
                    <div className="absolute -bottom-20 -left-20 w-60 h-60 bg-blue-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
                    
                    {/* Grid pattern overlay */}
                    <div className="absolute inset-0 opacity-5" style={{
                        backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
                        backgroundSize: '50px 50px'
                    }}></div>
                    
                    {/* Floating icons */}
                    <Sparkles className="absolute top-10 right-20 text-orange-500/30 w-8 h-8 animate-bounce" style={{ animationDelay: '0s' }} />
                    <Zap className="absolute bottom-16 right-40 text-yellow-500/30 w-6 h-6 animate-bounce" style={{ animationDelay: '0.5s' }} />
                    <Globe className="absolute top-20 left-1/3 text-blue-500/20 w-10 h-10 animate-bounce" style={{ animationDelay: '1s' }} />
                </div>

                {/* Content */}
                <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-8">
                    
                    {/* Left: Text Content */}
                    <div className="flex-1 text-center lg:text-left">
                        <h2 className="text-3xl md:text-4xl font-[1000] text-white leading-tight mb-4">
                            Ready to build <br className="hidden md:block" />
                            <span className="text-transparent bg-clip-text bg-linear-to-r from-orange-400 to-orange-600">the future?</span>
                        </h2>
                        
                        <p className="text-gray-400 text-base max-w-md mb-6">
                            Let's turn your ideas into deployed reality. From concept to production in record time.
                        </p>

                        {/* CTA Buttons */}
                        <div className="flex flex-col sm:flex-row items-center gap-4">
                            <button className="group flex items-center gap-3 bg-linear-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-bold py-3 px-6 rounded-full transition-all duration-300 transform hover:scale-105 shadow-lg shadow-orange-500/30 hover:shadow-orange-500/50">
                                <span>Let's Collaborate</span>
                                <FaArrowRight className="group-hover:translate-x-1 transition-transform" />
                            </button>
                            
                            <button className="flex items-center gap-3 bg-white/5 hover:bg-white/10 border border-white/10 text-white font-medium py-3 px-6 rounded-full transition-all duration-300 backdrop-blur-sm">
                                <FaWhatsapp className="text-green-400 text-xl" />
                                <span>WhatsApp</span>
                            </button>
                        </div>
                    </div>

                    {/* Right: Process Steps */}
                    <div className="shrink-0 flex flex-col gap-3">
                        <p className="text-gray-500 text-xs uppercase tracking-wider text-center lg:text-left mb-1">How We Work</p>
                        
                        <div className="flex items-center gap-3">
                            <div className="w-9 h-9 rounded-full bg-orange-500/20 border border-orange-500/30 flex items-center justify-center text-orange-400 font-bold text-xs">1</div>
                            <div>
                                <h4 className="text-white font-bold text-sm">Discuss</h4>
                                <p className="text-gray-500 text-xs">Share your vision</p>
                            </div>
                        </div>
                        
                        <div className="w-px h-3 bg-white/10 ml-4"></div>
                        
                        <div className="flex items-center gap-3">
                            <div className="w-9 h-9 rounded-full bg-orange-500/20 border border-orange-500/30 flex items-center justify-center text-orange-400 font-bold text-xs">2</div>
                            <div>
                                <h4 className="text-white font-bold text-sm">Design</h4>
                                <p className="text-gray-500 text-xs">Wireframes & prototypes</p>
                            </div>
                        </div>
                        
                        <div className="w-px h-3 bg-white/10 ml-4"></div>
                        
                        <div className="flex items-center gap-3">
                            <div className="w-9 h-9 rounded-full bg-orange-500/20 border border-orange-500/30 flex items-center justify-center text-orange-400 font-bold text-xs">3</div>
                            <div>
                                <h4 className="text-white font-bold text-sm">Develop</h4>
                                <p className="text-gray-500 text-xs">Build with modern stack</p>
                            </div>
                        </div>
                        
                        <div className="w-px h-3 bg-white/10 ml-4"></div>
                        
                        <div className="flex items-center gap-3">
                            <div className="w-9 h-9 rounded-full bg-green-500/20 border border-green-500/30 flex items-center justify-center text-green-400 font-bold text-xs">✓</div>
                            <div>
                                <h4 className="text-white font-bold text-sm">Deploy</h4>
                                <p className="text-gray-500 text-xs">Launch to production</p>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}