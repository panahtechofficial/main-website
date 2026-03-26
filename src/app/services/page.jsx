import Link from "next/link";
import Navbar from "@/components/layout/Navbar";
import ServiceCard from "@/components/home/ServiceCard";
import { servicesData } from "@/data/services";

const toSlug = (title) =>
  title
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-");

export const metadata = {
  title: "Services | PanahTech",
  description: "Explore PanahTech services for web, AI, VR, and IoT solutions.",
};

export default function ServicesPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-gray-50 dark:bg-transparent pt-36 pb-16 px-4 transition-colors duration-300">
        <section className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <p className="text-primary font-semibold uppercase tracking-[0.2em] text-xs">
              Our Expertise
            </p>
            <h1 className="mt-3 text-4xl md:text-5xl font-black text-zinc-900 dark:text-white">
              Services that scale with your business
            </h1>
            <p className="mt-4 text-secondary max-w-2xl mx-auto text-sm md:text-base">
              Dari website company profile, AI chatbot, hingga IoT platform.
              Pilih layanan yang sesuai, lalu masuk ke halaman detail untuk
              melihat approach PanahTech.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 items-stretch">
            {servicesData.map((service) => (
              <div key={service.title} className="group h-full flex flex-col">
                <ServiceCard service={service} className="flex-1 min-h-80" />
                <div className="mt-4">
                  <Link
                    href={`/services/${toSlug(service.title)}`}
                    className="inline-flex w-full items-center justify-center gap-2 bg-primary text-white text-xs font-semibold px-4 py-2.5 rounded-full shadow-md hover:bg-orange-600 transition-colors"
                  >
                    Lihat detail layanan
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>
    </>
  );
}
