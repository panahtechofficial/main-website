import Navbar from "@/components/layout/Navbar";
import PortfolioPageContent from "@/components/pages/PortfolioPageContent";
import { buildPageMetadata } from "@/lib/seo";

export const metadata = buildPageMetadata({
  title: "Portfolio",
  description:
    "Lihat portofolio proyek digital PanahTech di bidang web development, AI integration, dan solusi interaktif.",
  path: "/portfolio",
  keywords: ["portfolio panahtech", "studi kasus", "proyek website"],
});

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
