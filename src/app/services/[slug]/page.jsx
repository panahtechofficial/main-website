import Link from "next/link";
import { notFound } from "next/navigation";
import Navbar from "@/components/layout/Navbar";
import { servicesData, serviceDetails } from "@/data/services";
import { ChevronLeft } from "lucide-react";

const toSlug = (title) =>
  title
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-");

const getServiceDetailBySlug = (slug) =>
  serviceDetails.find((item) => toSlug(item.title) === slug);

const getServiceVisualByTitle = (title) =>
  servicesData.find((item) => item.title === title);

export async function generateStaticParams() {
  return serviceDetails.map((service) => ({ slug: toSlug(service.title) }));
}

export async function generateMetadata({ params }) {
  const resolvedParams = await params;
  const slug = resolvedParams.slug;
  const service = getServiceDetailBySlug(slug);

  if (!service) {
    return { title: "Service Not Found | PanahTech" };
  }

  return {
    title: `${service.title} | PanahTech Services`,
    description: service.description,
  };
}

export default async function ServiceDetailPage({ params }) {
  const resolvedParams = await params;
  const slug = resolvedParams.slug;
  const service = getServiceDetailBySlug(slug);

  if (!service) {
    notFound();
  }

  const visualService = getServiceVisualByTitle(service.title);
  const Icon = visualService?.icon;
  const iconColor = visualService?.color || "bg-zinc-100 text-zinc-700";

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-gray-50 dark:bg-transparent pt-36 pb-16 px-4 transition-colors duration-300">
        <section className="max-w-5xl mx-auto">
          <Link
            href="/services"
            className="inline-flex items-center text-sm text-primary hover:text-orange-700 mb-6"
          >
            <ChevronLeft className="mr-2" />
            Kembali ke semua layanan
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
              {Icon && (
                <div
                  className={`w-16 h-16 rounded-2xl flex items-center justify-center ${iconColor}`}
                >
                  <Icon size={30} />
                </div>
              )}
            </div>

            <div className="mt-8 grid md:grid-cols-2 gap-6">
              <div className="rounded-2xl border border-zinc-100 dark:border-zinc-800 p-6 bg-gray-50/60 dark:bg-zinc-950/40">
                <h2 className="text-lg font-bold text-zinc-900 dark:text-white">
                  Full Description
                </h2>
                <p className="text-secondary mt-3">{service.fullDescription}</p>
              </div>
              <div className="rounded-2xl border border-zinc-100 dark:border-zinc-800 p-6 bg-gray-50/60 dark:bg-zinc-950/40">
                <h2 className="text-lg font-bold text-zinc-900 dark:text-white">
                  Price Range
                </h2>
                <p className="text-secondary mt-3 font-semibold">
                  {service.price}
                </p>
                <p className="text-xs text-secondary mt-2">
                  * Prices are indicative and may vary based on project scope and requirements. Contact us for a personalized quote.
                </p>
              </div>
            </div>

            <div className="mt-6 rounded-2xl border border-zinc-100 dark:border-zinc-800 p-6 bg-gray-50/60 dark:bg-zinc-950/40">
              <h2 className="text-lg font-bold text-zinc-900 dark:text-white">
                Features
              </h2>
              <ul className="mt-3 grid sm:grid-cols-2 gap-y-2 gap-x-6 text-sm text-secondary">
                {service.features.map((item) => (
                  <li key={item} className="flex gap-2">
                    <span className="text-primary">•</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="flex">
              <Link
                href="/contact"
                className="px-5 py-2.5 rounded-full bg-primary text-white text-sm font-semibold hover:bg-orange-600 transition-colors"
              >
                Konsultasi sekarang
              </Link>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
