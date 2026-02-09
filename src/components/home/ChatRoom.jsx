"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { Bot, User, Send } from "lucide-react";
import gsap from "gsap";

export default function ChatRoom() {
    const [messages, setMessages] = useState([]);
    const [isTyping, setIsTyping] = useState(false);
    const [inputValue, setInputValue] = useState("");
    const [isActive, setIsActive] = useState(false);
    
    const messagesEndRef = useRef(null);
    const welcomeRef = useRef(null);
    const inputRef = useRef(null);

    // Listen for chat messages from FloatingChatButton AND activate chatroom
    useEffect(() => {
        const handleMessage = (e) => {
            const userMessage = e.detail.message;
            addUserMessage(userMessage);
        };

        const handleActivate = () => {
            setIsActive(true);
            setTimeout(() => inputRef.current?.focus(), 300);
        };

        window.addEventListener("chat-message", handleMessage);
        window.addEventListener("chatroom-activate", handleActivate);
        
        return () => {
            window.removeEventListener("chat-message", handleMessage);
            window.removeEventListener("chatroom-activate", handleActivate);
        };
    }, []);

    const addUserMessage = (userMessage) => {
        // Animate welcome text up (first message only)
        if (messages.length === 0 && welcomeRef.current) {
            gsap.to(welcomeRef.current, {
                y: -20,
                scale: 0.85,
                opacity: 0.9,
                duration: 0.5,
                ease: "power2.out"
            });
        }
        
        // Add user message
        setMessages(prev => [...prev, { role: "user", content: userMessage }]);
        
        // Simulate AI typing
        setIsTyping(true);
        setTimeout(() => {
            setIsTyping(false);
            setMessages(prev => [...prev, { 
                role: "assistant", 
                content: getAIResponse(userMessage) 
            }]);
        }, 1500);
    };

    // Auto-scroll to bottom when new messages
    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

    // Mock AI responses
    const getAIResponse = (userMsg) => {
        const responses = [
            "Terima kasih atas pertanyaannya! PanahTech menyediakan layanan Web Development, AI Integration, dan IoT Solutions.",
            "Kami menggunakan teknologi modern seperti Next.js, React, dan Python untuk membangun solusi digital terbaik.",
            "Untuk konsultasi lebih lanjut, Anda bisa menghubungi kami via WhatsApp atau email. Tim kami siap membantu!",
            "PanahTech telah menangani lebih dari 50+ project dengan kepuasan klien yang tinggi.",
        ];
        return responses[Math.floor(Math.random() * responses.length)];
    };

    const handleSend = () => {
        if (!inputValue.trim()) return;
        addUserMessage(inputValue);
        setInputValue("");
    };

    const handleKeyDown = (e) => {
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            handleSend();
        }
    };

    return (
        <div 
            id="chatroom-section"
            className="w-full lg:w-[380px] h-[550px] sticky top-6 self-start rounded-[32px] overflow-hidden shadow-xl bg-zinc-900 flex flex-col shrink-0"
        >
            {/* Background Image */}
            <div className="absolute inset-0">
                <Image
                    src="/showcase.webp"
                    alt="Background"
                    fill
                    className="object-cover object-right opacity-20"
                />
                <div className="absolute  inset-0 bg-linear-to-t from-zinc-900 via-zinc-900/55 to-zinc-900/40"></div>
            </div>

            {/* Content */}
            <div className="relative z-10 flex flex-col h-full">
                
                {/* Welcome Header / Chat Header */}
                <div 
                    ref={welcomeRef}
                    className={`p-6 transition-all duration-500 ${messages.length > 0 ? "pb-4 border-b border-white/10" : "flex-1 flex flex-col justify-center"}`}
                >
                    <Image
                        src="/logo-panahtech.webp"
                        alt="PanahTech Logo"
                        width={messages.length > 0 ? 80 : 100}
                        height={30}
                        className="grayscale pt-4 brightness-0 invert opacity-90 mb-3 transition-all duration-500"
                    />
                    
                    {messages.length === 0 ? (
                        <>
                            <h2 className="text-3xl font-bold text-white mb-2">PanahTech</h2>
                            <p className="text-gray-400 text-xs tracking-widest uppercase mb-4">Digital Transformation</p>
                            <p className="text-gray-300 text-sm leading-relaxed max-w-xs">
                                Transforming ideas into digital reality with modern technologies.
                            </p>
                            <p className="text-gray-500 text-xs mt-6">
                                👋 Type below to start a conversation
                            </p>
                        </>
                    ) : (
                        <div className="flex items-center gap-2">
                            <h3 className="text-white font-bold text-sm">PanahTech AI</h3>
                            <span className="relative flex size-2">
                                <span className="animate-ping absolute inline-flex size-2 rounded-full bg-green-400 opacity-75"></span>
                                <span className="relative inline-flex size-2 rounded-full bg-green-500"></span>
                            </span>
                        </div>
                    )}
                </div>

                {/* Messages Container */}
                {messages.length > 0 && (
                    <div 
                        className="flex-1 overflow-y-auto px-6 py-4 space-y-4 scrollbar-thin"
                    >
                        {messages.map((msg, idx) => (
                            <div 
                                key={idx}
                                className={`flex gap-3 ${msg.role === "user" ? "flex-row-reverse" : ""}`}
                            >
                                <div className={`shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${
                                    msg.role === "user" ? "bg-orange-500" : "bg-white/10"
                                }`}>
                                    {msg.role === "user" ? (
                                        <User size={16} className="text-white" />
                                    ) : (
                                        <Bot size={16} className="text-white" />
                                    )}
                                </div>
                                <div className={`max-w-[75%] px-4 py-3 rounded-2xl text-sm ${
                                    msg.role === "user" 
                                        ? "bg-orange-500 text-white rounded-br-md" 
                                        : "bg-white/10 text-gray-200 rounded-bl-md"
                                }`}>
                                    {msg.content}
                                </div>
                            </div>
                        ))}
                        
                        {/* Typing Indicator */}
                        {isTyping && (
                            <div className="flex gap-3">
                                <div className="shrink-0 w-8 h-8 rounded-full bg-white/10 flex items-center justify-center">
                                    <Bot size={16} className="text-white" />
                                </div>
                                <div className="bg-white/10 px-4 py-3 rounded-2xl rounded-bl-md">
                                    <div className="flex gap-1">
                                        <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "0ms" }}></span>
                                        <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "150ms" }}></span>
                                        <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "300ms" }}></span>
                                    </div>
                                </div>
                            </div>
                        )}
                        
                        <div ref={messagesEndRef} />
                    </div>
                )}

                {/* Input Field - Always visible at bottom */}
                <div className="p-4 border-t border-white/10">
                    <div className="flex items-center gap-2 bg-white/10 rounded-full px-4 py-2">
                        <input
                            ref={inputRef}
                            type="text"
                            value={inputValue}
                            onChange={(e) => setInputValue(e.target.value)}
                            onKeyDown={handleKeyDown}
                            placeholder="Type a message..."
                            className="flex-1 bg-transparent text-white placeholder-white/50 text-sm outline-none"
                        />
                        <button 
                            onClick={handleSend}
                            className="shrink-0 w-9 h-9 rounded-full bg-orange-500 flex items-center justify-center hover:bg-orange-600 transition-colors"
                        >
                            <Send size={16} className="text-white" />
                        </button>
                    </div>
                </div>

            </div>
        </div>
    );
}
