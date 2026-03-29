import Navbar from "@/components/layout/Navbar";
import ServicesPageContent from "@/components/pages/ServicesPageContent";
import { buildPageMetadata } from "@/lib/seo";

export const metadata = buildPageMetadata({
  title: "Services",
  description:
    "Eksplor layanan PanahTech: website bisnis, AI chatbot, VR development, dan solusi IoT sesuai kebutuhan perusahaan.",
  path: "/services",
  keywords: ["layanan panahtech", "jasa chatbot", "VR development Indonesia"],
});

export default function ServicesPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-gray-50 dark:bg-transparent pt-36 pb-16 px-4 transition-colors duration-300">
        <ServicesPageContent />
      </main>
    </>
  );
}
