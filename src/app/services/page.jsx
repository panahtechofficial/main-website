import Navbar from "@/components/layout/Navbar";
import ServicesPageContent from "@/components/pages/ServicesPageContent";
import JsonLd from "@/components/seo/JsonLd";
import { buildPageMetadata } from "@/lib/seo";
import { buildBreadcrumbSchema } from "@/lib/seo";

export const metadata = buildPageMetadata({
  title: "PanahTech - Services",
  description:
    "Explore PanahTech services: business websites, AI chatbots, VR development, and IoT solutions tailored to your company needs.",
  path: "/services",
  keywords: [
    "panahtech services",
    "chatbot development",
    "VR development Indonesia",
  ],
  yandexVerification: process.env.NEXT_PUBLIC_YANDEX_VERIFICATION,
});

export default function ServicesPage() {
  return (
    <>
      <Navbar />
      <JsonLd
        data={buildBreadcrumbSchema([
          { name: "Home", url: "/" },
          { name: "Services", url: "/services" },
        ])}
      />
      <main className="min-h-screen bg-gray-50 dark:bg-transparent pt-36 pb-16 px-4 transition-colors duration-300">
        <ServicesPageContent />
      </main>
    </>
  );
}
