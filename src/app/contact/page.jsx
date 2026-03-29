import Navbar from "@/components/layout/Navbar";
import ChatRoom from "@/components/home/ChatRoom";
import ContactForm from "@/components/contact/Form";

export const metadata = {
  title: "Contact | PanahTech",
  description:
    "Get in touch with PanahTech for consultation and digital solution planning.",
};

export default function ContactPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-gray-50 dark:bg-transparent pt-36 pb-16 px-4 transition-colors duration-300">
        <section className="max-w-7xl mx-auto">
          <div className="text-center mb-10">
            <p className="text-primary font-semibold uppercase tracking-[0.2em] text-xs">
              Let’s Build
            </p>
            <h1 className="mt-3 text-4xl md:text-5xl font-black text-zinc-900 dark:text-white">
              Contact PanahTech
            </h1>
            <p className="mt-4 text-secondary max-w-2xl mx-auto text-sm md:text-base">
              Punya ide project, butuh estimasi, atau ingin diskusi arsitektur
              produk? Kirim pesan, atau langsung chat dengan asisten kami.
            </p>
          </div>

          <div className="grid lg:grid-cols-[1.2fr_0.8fr] gap-8 items-start">
            <div className="bg-white dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-800 rounded-3xl p-6 md:p-8 shadow-sm">
              <h2 className="text-2xl font-bold text-zinc-900 dark:text-white">
                Send us a message
              </h2>
              <p className="text-secondary text-sm mt-2">
                Kami biasanya merespon dalam 1x24 jam kerja.
              </p>

              <ContactForm />
            </div>

            <div className="space-y-4">
              <div className="bg-white dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-800 rounded-3xl p-6 shadow-sm">
                <h3 className="font-bold text-zinc-900 dark:text-white">
                  Quick Contact
                </h3>
                <p className="text-sm text-secondary mt-3">
                  admin@panahtech.com
                </p>
                <p className="text-sm text-secondary">+62 882 1471 7802</p>
                <p className="text-sm text-secondary mt-2">
                  Jakarta Timur, DKI Jakarta
                </p>
              </div>
                <ChatRoom />
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
