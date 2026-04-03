import { notFound } from "next/navigation";
import Navbar from "@/components/layout/Navbar";
import ServiceDetailContent from "@/components/pages/ServiceDetailContent";
import JsonLd from "@/components/seo/JsonLd";
import { getServiceDetailBySlug, getServiceDetails } from "@/lib/services";
import { buildPageMetadata } from "@/lib/seo";
import { buildBreadcrumbSchema } from "@/lib/seo";

export async function generateStaticParams() {
  return getServiceDetails("id").map((service) => ({ slug: service.slug }));
}

export async function generateMetadata({ params }) {
  const resolvedParams = await params;
  const service = getServiceDetailBySlug(resolvedParams.slug, "id");

  if (!service) {
    return {
      title: "Service Not Found",
      description: "The service page was not found.",
      robots: {
        index: false,
        follow: false,
      },
    };
  }

  return buildPageMetadata({
    title: `PanahTech - ${service.title}`,
    description: service.description,
    path: `/services/${service.slug}`,
    keywords: [
      service.title,
      "digital services",
      "website development",
      "technology solutions",
    ],
    yandexVerification: process.env.NEXT_PUBLIC_YANDEX_VERIFICATION,
  });
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
      <JsonLd
        data={buildBreadcrumbSchema([
          { name: "Home", url: "/" },
          { name: "Services", url: "/services" },
          { name: service.title, url: `/services/${service.slug}` },
        ])}
      />
      <main className="min-h-screen bg-gray-50 dark:bg-transparent pt-36 pb-16 px-4 transition-colors duration-300">
        <ServiceDetailContent slug={resolvedParams.slug} />
      </main>
    </>
  );
}
