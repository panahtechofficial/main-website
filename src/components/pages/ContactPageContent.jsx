"use client";

import ChatRoom from "@/components/home/ChatRoom";
import ContactForm from "@/components/contact/Form";
import { useLanguage } from "@/context/LanguageContext";

export default function ContactPageContent() {
  const { language } = useLanguage();

  return (
    <section className="max-w-7xl mx-auto">
      <div className="text-center mb-10">
        <p className="text-primary font-semibold uppercase tracking-[0.2em] text-xs">
          {language === "id" ? "Mari Bangun" : "Let's Build"}
        </p>
        <h1 className="mt-3 text-4xl md:text-5xl font-black text-zinc-900 dark:text-white">
          {language === "id" ? "Hubungi PanahTech" : "Contact PanahTech"}
        </h1>
        <p className="mt-4 text-secondary max-w-2xl mx-auto text-sm md:text-base">
          {language === "id"
            ? "Punya ide project, butuh estimasi, atau ingin diskusi arsitektur produk? Kirim pesan, atau langsung chat dengan asisten kami."
            : "Have a project idea, need an estimate, or want to discuss product architecture? Send us a message, or chat directly with our assistant."}
        </p>
      </div>

      <div className="grid lg:grid-cols-[1.2fr_0.8fr] gap-8 items-start">
        <div className="bg-white dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-800 rounded-3xl p-6 md:p-8 shadow-sm">
          <h2 className="text-2xl font-bold text-zinc-900 dark:text-white">
            {language === "id" ? "Kirim pesan ke kami" : "Send us a message"}
          </h2>
          <p className="text-secondary text-sm mt-2">
            {language === "id"
              ? "Kami biasanya merespon dalam 1x24 jam kerja."
              : "We usually respond within 1x24 business hours."}
          </p>

          <ContactForm />
        </div>

        <div className="space-y-4">
          <div className="bg-white dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-800 rounded-3xl p-6 shadow-sm">
            <h3 className="font-bold text-zinc-900 dark:text-white">
              {language === "id" ? "Kontak Cepat" : "Quick Contact"}
            </h3>
            <p className="text-sm text-secondary mt-3">admin@panahtech.com</p>
            <p className="text-sm text-secondary">+62 8777 6255 997</p>
            <p className="text-sm text-secondary mt-2">
              {language === "id"
                ? "Jakarta Timur, DKI Jakarta"
                : "East Jakarta, DKI Jakarta"}
            </p>
          </div>
          <ChatRoom />
        </div>
      </div>
    </section>
  );
}
