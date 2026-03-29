"use client";
import Script from "next/script";
import { useEffect, useRef, useState } from "react";
import { useLanguage } from "@/context/LanguageContext";

const SUBMIT_LIMIT_KEY = "panahtech:contact-submit-history";
const SUBMIT_LIMIT_WINDOW_MS = 5 * 60 * 1000;
const SUBMIT_LIMIT_MAX_SUBMITS = 3;

export default function ContactForm() {
  const { language } = useLanguage();
  const web3FormsAccessKey = process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY || "";
  const turnstileSiteKey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY || "";
  const turnstileContainerRef = useRef(null);
  const turnstileWidgetIdRef = useRef(null);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    questionType: "",
    message: "",
    botcheck: "",
  });

  const [status, setStatus] = useState("idle");
  const [feedbackMessage, setFeedbackMessage] = useState("");
  const [turnstileToken, setTurnstileToken] = useState("");
  const [turnstileScriptReady, setTurnstileScriptReady] = useState(false);

  const ui = {
    missingConfig:
      language === "id"
        ? "Konfigurasi form belum lengkap. Silakan set NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY."
        : "Form configuration is incomplete. Please set NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY.",
    invalidSubmission:
      language === "id"
        ? "Pengiriman terdeteksi tidak valid."
        : "The submission is detected as invalid.",
    requiredFields:
      language === "id"
        ? "Semua field wajib diisi."
        : "All fields are required.",
    turnstileRequired:
      language === "id"
        ? "Verifikasi keamanan belum selesai. Silakan coba lagi."
        : "Security verification is incomplete. Please try again.",
    rateLimit: (seconds) =>
      language === "id"
        ? `Terlalu sering mengirim form. Coba lagi dalam ${seconds} detik.`
        : `Too many submissions. Please try again in ${seconds} seconds.`,
    defaultError:
      language === "id"
        ? "Terjadi kesalahan saat mengirim pesan. Silakan coba lagi nanti."
        : "An error occurred while sending your message. Please try again later.",
    successFallback:
      language === "id"
        ? "Pesan berhasil dikirim. Terima kasih telah menghubungi kami."
        : "Message sent successfully. Thank you for contacting us.",
    thankYou: language === "id" ? "Terimakasih!" : "Thank you!",
    failed: language === "id" ? "Gagal!" : "Failed!",
    name: language === "id" ? "Nama" : "Name",
    namePlaceholder: language === "id" ? "Nama Anda" : "Your name",
    email: "Email",
    questionType: language === "id" ? "Jenis Pertanyaan" : "Question Type",
    questionPlaceholder:
      language === "id" ? "Pilih jenis pertanyaan" : "Select question type",
    optionGeneral: language === "id" ? "Pertanyaan Umum" : "General Question",
    optionProject:
      language === "id" ? "Konsultasi Project" : "Project Consultation",
    optionSupport: language === "id" ? "Dukungan Teknis" : "Technical Support",
    message: language === "id" ? "Pesan" : "Message",
    messagePlaceholder:
      language === "id"
        ? "Tulis pesan Anda di sini..."
        : "Write your message here...",
    sending: language === "id" ? "Mengirim..." : "Sending...",
    send: language === "id" ? "Kirim pesan" : "Send message",
    closeSuccess:
      language === "id" ? "Tutup pesan sukses" : "Close success message",
    closeError: language === "id" ? "Tutup pesan error" : "Close error message",
  };

  const getClientRateLimit = () => {
    if (typeof window === "undefined") {
      return { limited: false, retryAfterSeconds: 0, history: [] };
    }

    try {
      const rawHistory = sessionStorage.getItem(SUBMIT_LIMIT_KEY);
      const parsedHistory = rawHistory ? JSON.parse(rawHistory) : [];
      const now = Date.now();
      const windowStart = now - SUBMIT_LIMIT_WINDOW_MS;
      const validHistory = Array.isArray(parsedHistory)
        ? parsedHistory.filter(
            (value) => Number.isFinite(value) && value > windowStart,
          )
        : [];

      if (validHistory.length >= SUBMIT_LIMIT_MAX_SUBMITS) {
        const retryAfterMs = SUBMIT_LIMIT_WINDOW_MS - (now - validHistory[0]);
        return {
          limited: true,
          retryAfterSeconds: Math.max(1, Math.ceil(retryAfterMs / 1000)),
          history: validHistory,
        };
      }

      return {
        limited: false,
        retryAfterSeconds: 0,
        history: validHistory,
      };
    } catch {
      return { limited: false, retryAfterSeconds: 0, history: [] };
    }
  };

  const recordClientSubmitAttempt = (history) => {
    if (typeof window === "undefined") {
      return;
    }

    try {
      const now = Date.now();
      const nextHistory = [...history, now];
      sessionStorage.setItem(SUBMIT_LIMIT_KEY, JSON.stringify(nextHistory));
    } catch {
      // Ignore storage write failures silently.
    }
  };

  useEffect(() => {
    if (!turnstileSiteKey) {
      return;
    }

    const turnstile = window.turnstile;
    if (
      !turnstile ||
      !turnstileScriptReady ||
      !turnstileContainerRef.current ||
      turnstileWidgetIdRef.current !== null
    ) {
      return;
    }

    turnstileWidgetIdRef.current = turnstile.render(
      turnstileContainerRef.current,
      {
        sitekey: turnstileSiteKey,
        theme: "auto",
        callback: (token) => setTurnstileToken(token),
        "expired-callback": () => setTurnstileToken(""),
        "error-callback": () => setTurnstileToken(""),
      },
    );
  }, [turnstileScriptReady, turnstileSiteKey]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { name, email, questionType, message, botcheck } = formData;

    if (!web3FormsAccessKey) {
      setFeedbackMessage(ui.missingConfig);
      setStatus("error");
      return;
    }

    if (botcheck) {
      setFeedbackMessage(ui.invalidSubmission);
      setStatus("error");
      return;
    }

    if (!name || !email || !questionType || !message) {
      setFeedbackMessage(ui.requiredFields);
      setStatus("error");
      return;
    }

    if (turnstileSiteKey && !turnstileToken) {
      setFeedbackMessage(ui.turnstileRequired);
      setStatus("error");
      return;
    }

    const clientRateLimit = getClientRateLimit();
    if (clientRateLimit.limited) {
      setFeedbackMessage(ui.rateLimit(clientRateLimit.retryAfterSeconds));
      setStatus("error");
      return;
    }

    try {
      setStatus("submitting");
      recordClientSubmitAttempt(clientRateLimit.history);

      const payload = {
        access_key: web3FormsAccessKey,
        name,
        email,
        subject: `PanahTech Contact - ${questionType}`,
        from_name: "PanahTech Contact Form",
        message: `Jenis Pertanyaan: ${questionType}\n\nPesan:\n${message}`,
        botcheck: "",
      };

      if (turnstileSiteKey && turnstileToken) {
        payload["cf-turnstile-response"] = turnstileToken;
      }

      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      let result = null;
      try {
        result = await response.json();
      } catch {
        result = null;
      }

      if (!response.ok || result?.success === false) {
        throw new Error(
          result?.message || result?.error || "Gagal mengirim pesan.",
        );
      }

      setFeedbackMessage(result?.message || ui.successFallback);
      setStatus("success");
      setFormData({
        name: "",
        email: "",
        questionType: "",
        message: "",
        botcheck: "",
      });
      setTurnstileToken("");
      if (turnstileWidgetIdRef.current !== null && window.turnstile) {
        window.turnstile.reset(turnstileWidgetIdRef.current);
      }
      setTimeout(() => setStatus("idle"), 10000);
    } catch (error) {
      setFeedbackMessage(error?.message || ui.defaultError);
      setStatus("error");
      if (turnstileWidgetIdRef.current !== null && window.turnstile) {
        window.turnstile.reset(turnstileWidgetIdRef.current);
      }
    }
  };

  return (
    <>
      {turnstileSiteKey && (
        <Script
          src="https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit"
          strategy="afterInteractive"
          onLoad={() => setTurnstileScriptReady(true)}
        />
      )}

      <form
        onSubmit={handleSubmit}
        className="mt-6 space-y-4"
        id="contact-form"
      >
        {status === "success" && (
          <div className="relative bg-green-50 border border-green-200 text-green-800 p-4 rounded-lg">
            <button
              type="button"
              onClick={() => setStatus("idle")}
              className="absolute cursor-pointer top-2 right-2 text-green-700 hover:text-green-900 transition-colors"
              aria-label={ui.closeSuccess}
            >
              ×
            </button>
            <p className="text-green-600 text-sm mb-4">
              <span className="font-bold">{ui.thankYou}</span> {feedbackMessage}
            </p>
          </div>
        )}
        {status === "error" && (
          <div className="relative bg-red-50 border border-red-200 text-red-800 p-4 rounded-lg">
            <button
              type="button"
              onClick={() => setStatus("idle")}
              className="absolute cursor-pointer top-2 right-2 text-red-700 hover:text-red-900 transition-colors"
              aria-label={ui.closeError}
            >
              ×
            </button>
            <p className="text-red-600 text-sm mb-4">
              <span className="font-bold">{ui.failed}</span> {feedbackMessage}
            </p>
          </div>
        )}
        <div className="grid md:grid-cols-2 gap-4">
          <label className="block">
            <span className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
              {ui.name}
            </span>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder={ui.namePlaceholder}
              className="mt-2 w-full rounded-xl border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-950 px-4 py-3 text-sm outline-none focus:border-primary transition-colors"
            />
          </label>
          <label className="block">
            <span className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
              Email
            </span>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="email@domain.com"
              className="mt-2 w-full rounded-xl border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-950 px-4 py-3 text-sm outline-none focus:border-primary transition-colors"
            />
          </label>
        </div>

        <label className="block">
          <span className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
            {ui.questionType}
          </span>
          <select
            name="questionType"
            value={formData.questionType}
            onChange={handleChange}
            className="mt-2 w-full cursor-pointer rounded-xl border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-950 px-4 py-3 text-sm outline-none focus:border-primary transition-colors"
          >
            <option value="" disabled>
              {ui.questionPlaceholder}
            </option>
            <option value="general">{ui.optionGeneral}</option>
            <option value="project">{ui.optionProject}</option>
            <option value="support">{ui.optionSupport}</option>
          </select>
        </label>

        <label className="block">
          <span className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
            {ui.message}
          </span>
          <textarea
            rows={5}
            name="message"
            value={formData.message}
            onChange={handleChange}
            placeholder={ui.messagePlaceholder}
            className="mt-2 w-full rounded-xl border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-950 px-4 py-3 text-sm outline-none focus:border-primary transition-colors resize-none"
          />
        </label>

        <input
          type="text"
          name="botcheck"
          value={formData.botcheck}
          onChange={handleChange}
          tabIndex={-1}
          autoComplete="off"
          className="hidden"
          aria-hidden="true"
        />

        {turnstileSiteKey && (
          <div className="pt-1">
            <div ref={turnstileContainerRef} />
          </div>
        )}

        <button
          type="submit"
          disabled={status === "submitting"}
          className="inline-flex cursor-pointer items-center justify-center bg-primary text-white text-sm font-semibold px-5 py-2.5 rounded-full hover:bg-orange-600 transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
        >
          {status === "submitting" ? ui.sending : ui.send}
        </button>
      </form>
    </>
  );
}
