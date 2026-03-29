import { notFound } from "next/navigation";
import Navbar from "@/components/layout/Navbar";
import ServiceDetailContent from "@/components/pages/ServiceDetailContent";
import { getServiceDetailBySlug, getServiceDetails } from "@/data/services";

export async function generateStaticParams() {
  return getServiceDetails("id").map((service) => ({ slug: service.slug }));
}

export async function generateMetadata({ params }) {
  const resolvedParams = await params;
  const service = getServiceDetailBySlug(resolvedParams.slug, "id");

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
  const service = getServiceDetailBySlug(resolvedParams.slug, "id");

  if (!service) {
    notFound();
  }

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-gray-50 dark:bg-transparent pt-36 pb-16 px-4 transition-colors duration-300">
        <ServiceDetailContent slug={resolvedParams.slug} />
      </main>
    </>
  );
}
