import Navbar from "@/components/layout/Navbar";
import PortfolioPageContent from "@/components/pages/PortfolioPageContent";

export const metadata = {
  title: "Portfolio | PanahTech",
  description: "A showcase of PanahTech digital products and solutions.",
};

export default function PortfolioPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-gray-50 dark:bg-transparent pt-36 pb-16 px-4 transition-colors duration-300">
        <PortfolioPageContent />
      </main>
    </>
  );
}
