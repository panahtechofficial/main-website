import Navbar from "@/components/layout/Navbar";
import ServicesPageContent from "@/components/pages/ServicesPageContent";

export const metadata = {
  title: "Services | PanahTech",
  description: "Explore PanahTech services for web, AI, VR, and IoT solutions.",
};

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
