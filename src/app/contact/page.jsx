import Navbar from "@/components/layout/Navbar";
import ChatRoom from "@/components/home/ChatRoom";

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

              <form className="mt-6 space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <label className="block">
                    <span className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
                      Nama
                    </span>
                    <input
                      type="text"
                      placeholder="Nama Anda"
                      className="mt-2 w-full rounded-xl border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-950 px-4 py-3 text-sm outline-none focus:border-primary transition-colors"
                    />
                  </label>
                  <label className="block">
                    <span className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
                      Email
                    </span>
                    <input
                      type="email"
                      placeholder="email@domain.com"
                      className="mt-2 w-full rounded-xl border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-950 px-4 py-3 text-sm outline-none focus:border-primary transition-colors"
                    />
                  </label>
                </div>

                <label className="block">
                  <span className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
                    Jenis Project
                  </span>
                  <select className="mt-2 w-full rounded-xl border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-950 px-4 py-3 text-sm outline-none focus:border-primary transition-colors">
                    <option>Company Profile</option>
                    <option>Online Catalogue</option>
                    <option>School Website</option>
                    <option>AI Chatbot</option>
                    <option>VR Development</option>
                    <option>IoT Solutions</option>
                  </select>
                </label>

                <label className="block">
                  <span className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
                    Pesan
                  </span>
                  <textarea
                    rows={5}
                    placeholder="Ceritakan kebutuhan project Anda..."
                    className="mt-2 w-full rounded-xl border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-950 px-4 py-3 text-sm outline-none focus:border-primary transition-colors resize-none"
                  />
                </label>

                <button
                  type="button"
                  className="inline-flex items-center justify-center bg-primary text-white text-sm font-semibold px-5 py-2.5 rounded-full hover:bg-orange-600 transition-colors"
                >
                  Kirim pesan
                </button>
              </form>
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
              <div className="[&>#chatroom-section]:relative! [&>#chatroom-section]:top-0! [&>#chatroom-section]:h-auto!">
                <ChatRoom />
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
