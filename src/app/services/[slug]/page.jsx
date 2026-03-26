import Link from "next/link";
import { notFound } from "next/navigation";
import Navbar from "@/components/layout/Navbar";
import { servicesData } from "@/data/services";

const toSlug = (title) =>
  title
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-");

const detailContent = {
  "company-profile": {
    highlight: "Brand authority & trust",
    outcomes: [
      "Website cepat & SEO-ready",
      "Konsisten dengan identity brand",
      "Mudah di-maintain tim internal",
    ],
  },
  "online-catalogue": {
    highlight: "Digital product experience",
    outcomes: [
      "Navigasi produk lebih efisien",
      "Struktur katalog scalable",
      "Konversi lead lebih tinggi",
    ],
  },
  "school-website": {
    highlight: "Educational platform",
    outcomes: [
      "Informasi akademik terpusat",
      "Akses mudah untuk siswa & orang tua",
      "UI modern dan ramah mobile",
    ],
  },
  "ai-chatbot": {
    highlight: "Automated customer support",
    outcomes: [
      "Respon pelanggan 24/7",
      "Efisiensi operasional CS",
      "Knowledge base yang terus belajar",
    ],
  },
  "vr-development": {
    highlight: "Immersive interactions",
    outcomes: [
      "Training experience lebih engaging",
      "Demo produk interaktif",
      "Value innovation lebih kuat",
    ],
  },
  "iot-solutions": {
    highlight: "Connected ecosystem",
    outcomes: [
      "Monitoring real-time",
      "Automasi berbasis data",
      "Integrasi perangkat yang fleksibel",
    ],
  },
};

export async function generateStaticParams() {
  return servicesData.map((service) => ({ slug: toSlug(service.title) }));
}

export async function generateMetadata({ params }) {
  const slug = params.slug;
  const service = servicesData.find((item) => toSlug(item.title) === slug);

  if (!service) {
    return { title: "Service Not Found | PanahTech" };
  }

  return {
    title: `${service.title} | PanahTech Services`,
    description: service.description,
  };
}

export default async function ServiceDetailPage({ params }) {
  const slug = params.slug;
  const service = servicesData.find((item) => toSlug(item.title) === slug);

  if (!service) {
    notFound();
  }

  const content = detailContent[slug] ?? {
    highlight: "Tailored technology solution",
    outcomes: [
      "Architecture yang jelas",
      "Delivery bertahap",
      "Siap scale untuk jangka panjang",
    ],
  };

  const Icon = service.icon;

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-gray-50 dark:bg-transparent pt-36 pb-16 px-4 transition-colors duration-300">
        <section className="max-w-5xl mx-auto">
          <Link
            href="/services"
            className="inline-flex items-center text-sm text-primary hover:underline mb-6"
          >
            ← Kembali ke semua layanan
          </Link>

          <div className="bg-white dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-800 rounded-3xl p-8 md:p-10 shadow-sm">
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div>
                <p className="text-xs uppercase tracking-[0.2em] text-primary font-semibold">
                  Service Detail
                </p>
                <h1 className="text-3xl md:text-4xl font-black text-zinc-900 dark:text-white mt-2">
                  {service.title}
                </h1>
                <p className="mt-4 text-secondary max-w-2xl">
                  {service.description}
                </p>
              </div>
              <div
                className={`w-16 h-16 rounded-2xl flex items-center justify-center ${service.color}`}
              >
                <Icon size={30} />
              </div>
            </div>

            <div className="mt-8 grid md:grid-cols-2 gap-6">
              <div className="rounded-2xl border border-zinc-100 dark:border-zinc-800 p-6 bg-gray-50/60 dark:bg-zinc-950/40">
                <h2 className="text-lg font-bold text-zinc-900 dark:text-white">
                  Core Highlight
                </h2>
                <p className="text-secondary mt-3">{content.highlight}</p>
              </div>
              <div className="rounded-2xl border border-zinc-100 dark:border-zinc-800 p-6 bg-gray-50/60 dark:bg-zinc-950/40">
                <h2 className="text-lg font-bold text-zinc-900 dark:text-white">
                  Deliverables
                </h2>
                <ul className="mt-3 space-y-2 text-sm text-secondary">
                  {content.outcomes.map((item) => (
                    <li key={item} className="flex gap-2">
                      <span className="text-primary">•</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href="/contact"
                className="px-5 py-2.5 rounded-full bg-primary text-white text-sm font-semibold hover:bg-orange-600 transition-colors"
              >
                Konsultasi sekarang
              </Link>
              <Link
                href="/portfolio"
                className="px-5 py-2.5 rounded-full border border-zinc-200 dark:border-zinc-700 text-sm font-semibold text-zinc-800 dark:text-zinc-200 hover:border-primary hover:text-primary transition-colors"
              >
                Lihat portofolio
              </Link>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
