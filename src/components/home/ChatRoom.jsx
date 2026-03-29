"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { Bot, User, Send } from "lucide-react";
import gsap from "gsap";
import { FaWhatsapp } from "react-icons/fa";

const formatWhatsappLabel = "Lanjut via WhatsApp";
const chatErrorFallbackMessage =
  "Maaf, chatbot sedang bermasalah saat ini. Silakan hubungi kami melalui contact form.";
const contactFormLinkLabel = "Hubungi via Contact Form";

const generateSessionId = () => {
  if (typeof globalThis !== "undefined" && globalThis.crypto) {
    if (typeof globalThis.crypto.randomUUID === "function") {
      return globalThis.crypto.randomUUID();
    }

    if (typeof globalThis.crypto.getRandomValues === "function") {
      const bytes = new Uint8Array(16);
      globalThis.crypto.getRandomValues(bytes);
      return Array.from(bytes, (value) =>
        value.toString(16).padStart(2, "0"),
      ).join("");
    }
  }

  return `sid-${Date.now()}-${Math.random().toString(16).slice(2)}`;
};

export default function ChatRoom() {
  const [messages, setMessages] = useState([]);
  const [isTyping, setIsTyping] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [sessionId, setSessionId] = useState("");
  const [isHydrated, setIsHydrated] = useState(false);
  const [isResetArmed, setIsResetArmed] = useState(false);

  const messagesContainerRef = useRef(null);
  const welcomeRef = useRef(null);
  const inputRef = useRef(null);
  const messagesRef = useRef([]);
  const resetTimerRef = useRef(null);

  const STORAGE_KEY_MESSAGES = "panahtech-chat-messages";
  const STORAGE_KEY_SESSION = "panahtech-chat-session-id";

  useEffect(() => {
    const storedSession = sessionStorage.getItem(STORAGE_KEY_SESSION);
    const storedMessages = sessionStorage.getItem(STORAGE_KEY_MESSAGES);

    const nextSessionId = storedSession || generateSessionId();
    setSessionId(nextSessionId);
    sessionStorage.setItem(STORAGE_KEY_SESSION, nextSessionId);

    if (storedMessages) {
      try {
        const parsed = JSON.parse(storedMessages);
        if (Array.isArray(parsed)) {
          setMessages(parsed);
          messagesRef.current = parsed;
        }
      } catch {
        sessionStorage.removeItem(STORAGE_KEY_MESSAGES);
      }
    }

    setIsHydrated(true);
  }, []);

  useEffect(() => {
    if (!isHydrated) return;
    sessionStorage.setItem(STORAGE_KEY_MESSAGES, JSON.stringify(messages));
    messagesRef.current = messages;
  }, [messages, isHydrated]);

  useEffect(() => {
    if (!messagesContainerRef.current) return;
    messagesContainerRef.current.scrollTo({
      top: messagesContainerRef.current.scrollHeight,
      behavior: "smooth",
    });
  }, [messages, isTyping]);

  useEffect(() => {
    if (messages.length === 0) {
      setIsResetArmed(false);
    }
  }, [messages.length]);

  useEffect(() => {
    return () => {
      if (resetTimerRef.current) {
        clearTimeout(resetTimerRef.current);
      }
    };
  }, []);

  const requestAIResponse = async (history) => {
    const response = await fetch("/api/chat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        sessionId,
        messages: history,
      }),
    });

    if (!response.ok) {
      throw new Error("CHAT_SERVICE_UNAVAILABLE");
    }

    return response.json();
  };

  const addUserMessage = async (rawMessage) => {
    const userMessage = rawMessage.trim();
    if (!userMessage || isTyping) return;

    if (messagesRef.current.length === 0 && welcomeRef.current) {
      gsap.to(welcomeRef.current, {
        y: -20,
        scale: 0.85,
        opacity: 0.9,
        duration: 0.5,
        ease: "power2.out",
      });
    }

    const nextMessages = [
      ...messagesRef.current,
      { role: "user", content: userMessage },
    ];

    setMessages(nextMessages);
    messagesRef.current = nextMessages;
    setIsTyping(true);

    try {
      const aiResponse = await requestAIResponse(nextMessages);
      const withAssistant = [
        ...nextMessages,
        {
          role: "assistant",
          content:
            aiResponse?.reply ||
            "Sorry, I can't respond right now. Please try again in a moment.",
          whatsappLink: aiResponse?.readyForWhatsapp
            ? aiResponse?.whatsappLink
            : null,
        },
      ];
      setMessages(withAssistant);
      messagesRef.current = withAssistant;
    } catch {
      const withErrorMessage = [
        ...nextMessages,
        {
          role: "assistant",
          content: chatErrorFallbackMessage,
          contactFormLink: "/contact#contact-form",
        },
      ];
      setMessages(withErrorMessage);
      messagesRef.current = withErrorMessage;
    } finally {
      setIsTyping(false);
    }
  };

  useEffect(() => {
    const handleMessage = (e) => {
      const userMessage = e.detail?.message;
      if (typeof userMessage === "string") {
        addUserMessage(userMessage);
      }
    };

    const handleActivate = () => {
      setTimeout(() => inputRef.current?.focus(), 300);
    };

    window.addEventListener("chat-message", handleMessage);
    window.addEventListener("chatroom-activate", handleActivate);

    return () => {
      window.removeEventListener("chat-message", handleMessage);
      window.removeEventListener("chatroom-activate", handleActivate);
    };
  }, [isTyping, sessionId]);

  const handleSend = async () => {
    if (!inputValue.trim()) return;
    const currentInput = inputValue;
    setInputValue("");
    await addUserMessage(currentInput);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const performResetChat = () => {
    const newSessionId = generateSessionId();

    setMessages([]);
    messagesRef.current = [];
    setInputValue("");
    setIsTyping(false);
    setSessionId(newSessionId);
    setIsResetArmed(false);

    sessionStorage.removeItem(STORAGE_KEY_MESSAGES);
    sessionStorage.setItem(STORAGE_KEY_SESSION, newSessionId);

    if (welcomeRef.current) {
      gsap.to(welcomeRef.current, {
        y: 0,
        scale: 1,
        opacity: 1,
        duration: 0.3,
        ease: "power2.out",
      });
    }
  };

  const handleResetChat = () => {
    if (!isResetArmed) {
      setIsResetArmed(true);

      if (resetTimerRef.current) {
        clearTimeout(resetTimerRef.current);
      }

      resetTimerRef.current = setTimeout(() => {
        setIsResetArmed(false);
      }, 4000);
      return;
    }

    if (resetTimerRef.current) {
      clearTimeout(resetTimerRef.current);
      resetTimerRef.current = null;
    }

    performResetChat();
  };

  const renderMessageContent = (text) => {
    const safeText = typeof text === "string" ? text : "";
    const lines = safeText.split("\n");

    return lines.map((line, lineIndex) => {
      const parts = line.split(/(\*\*[^*]+\*\*)/g);

      return (
        <span key={`line-${lineIndex}`}>
          {parts.map((part, partIndex) => {
            const isBold = /^\*\*[^*]+\*\*$/.test(part);
            if (isBold) {
              return (
                <strong
                  key={`part-${lineIndex}-${partIndex}`}
                  className="font-bold text-white"
                >
                  {part.slice(2, -2)}
                </strong>
              );
            }

            return <span key={`part-${lineIndex}-${partIndex}`}>{part}</span>;
          })}
          {lineIndex < lines.length - 1 && <br />}
        </span>
      );
    });
  };

  return (
    <div
      id="chatroom-section"
      className="w-full lg:w-95 h-137.5 sticky top-28 self-start rounded-4xl overflow-hidden shadow-xl bg-zinc-900 flex flex-col shrink-0"
    >
      <div className="absolute inset-0">
        <Image
          src="/showcase.webp"
          alt="Background"
          fill
          sizes="(max-width: 1024px) 100vw, 380px"
          priority
          className="object-cover object-right opacity-20"
        />
        <div className="absolute inset-0 bg-linear-to-t from-zinc-900 via-zinc-900/55 to-zinc-900/40"></div>
        {messages.length > 0 && (
          <button
            onClick={handleResetChat}
            className={`absolute z-40 top-4 right-4 hover:cursor-pointer text-white text-xs px-3 py-1 rounded-full transition-colors ${
              isResetArmed
                ? "bg-red-600 hover:bg-red-700"
                : "bg-primary hover:bg-orange-600"
            }`}
          >
            {isResetArmed ? "✓ Hapus chat" : "Reset chat"}
          </button>
        )}
      </div>

      <div className="relative z-10 flex flex-col h-full">
        <div
          ref={welcomeRef}
          className={`p-6 transition-all duration-500 ${
            messages.length > 0
              ? "pb-4 border-b border-white/10"
              : "flex-1 flex flex-col justify-center"
          }`}
        >
          <Image
            src="/logo-panahtech.webp"
            alt="PanahTech Logo"
            width={messages.length > 0 ? 80 : 100}
            height={30}
            className="grayscale pt-4 brightness-0 invert opacity-90 mb-3 transition-all duration-500"
            style={{ width: "auto" }}
          />

          {messages.length === 0 ? (
            <>
              <h2 className="text-3xl font-bold text-white mb-2">PanahTech</h2>
              <p className="text-gray-400 text-xs tracking-widest uppercase mb-4">
                Digital Transformation
              </p>
              <p className="text-gray-300 text-sm leading-relaxed max-w-xs">
                Transforming ideas into digital reality with modern
                technologies.
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

        {messages.length > 0 && (
          <div
            ref={messagesContainerRef}
            className="flex-1 overflow-y-auto px-6 py-4 space-y-4 scrollbar-thin"
          >
            {messages.map((msg, idx) => (
              <div
                key={idx}
                className={`flex gap-3 ${msg.role === "user" ? "flex-row-reverse" : ""}`}
              >
                <div
                  className={`shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${
                    msg.role === "user" ? "bg-orange-500" : "bg-white/10"
                  }`}
                >
                  {msg.role === "user" ? (
                    <User size={16} className="text-white" />
                  ) : (
                    <Bot size={16} className="text-white" />
                  )}
                </div>
                <div
                  className={`max-w-[75%] px-4 py-3 rounded-2xl text-sm ${
                    msg.role === "user"
                      ? "bg-orange-500 text-white rounded-br-md"
                      : "bg-white/10 text-gray-200 rounded-bl-md"
                  }`}
                >
                  <div className="whitespace-pre-line leading-relaxed">
                    {renderMessageContent(msg.content)}
                  </div>
                  {msg.role === "assistant" && msg.whatsappLink && (
                    <a
                      href={msg.whatsappLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex mt-3 items-center justify-center bg-green-500 hover:bg-green-600 text-white text-xs font-semibold px-3 py-2 rounded-full transition-colors"
                    >
                      <FaWhatsapp size={14} className="mr-1" />
                      {formatWhatsappLabel}
                    </a>
                  )}
                  {msg.role === "assistant" && msg.contactFormLink && (
                    <a
                      href={msg.contactFormLink}
                      className="inline-flex mt-2 items-center justify-center bg-white/15 hover:bg-white/25 text-white text-xs font-semibold px-3 py-2 rounded-full transition-colors"
                    >
                      {contactFormLinkLabel}
                    </a>
                  )}
                </div>
              </div>
            ))}

            {isTyping && (
              <div className="flex gap-3">
                <div className="shrink-0 w-8 h-8 rounded-full bg-white/10 flex items-center justify-center">
                  <Bot size={16} className="text-white" />
                </div>
                <div className="bg-white/10 px-4 py-3 rounded-2xl rounded-bl-md">
                  <div className="flex gap-1">
                    <span
                      className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                      style={{ animationDelay: "0ms" }}
                    ></span>
                    <span
                      className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                      style={{ animationDelay: "150ms" }}
                    ></span>
                    <span
                      className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                      style={{ animationDelay: "300ms" }}
                    ></span>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        <div className="p-4 border-t border-white/10">
          <div className="flex items-center gap-2 bg-white/10 rounded-full px-4 py-2">
            <textarea
              ref={inputRef}
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Type a message..."
              rows={1}
              className="flex-1 bg-transparent text-white placeholder-white/50 text-sm outline-none resize-none max-h-32"
            />
            <button
              onClick={handleSend}
              disabled={isTyping || !sessionId}
              className="shrink-0 w-9 h-9 rounded-full bg-orange-500 flex items-center justify-center hover:bg-orange-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Send size={16} className="text-white" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
