import Navbar from "@/components/layout/Navbar";
import PortfolioPageContent from "@/components/pages/PortfolioPageContent";
import JsonLd from "@/components/seo/JsonLd";
import { buildPageMetadata } from "@/lib/seo";
import { buildBreadcrumbSchema } from "@/lib/seo";

export const metadata = buildPageMetadata({
  title: "PanahTech - Portfolio",
  description:
    "See PanahTech portfolio projects in web development, AI integration, and interactive digital solutions.",
  path: "/portfolio",
  keywords: ["panahtech portfolio", "case studies", "website projects"],
  yandexVerification: process.env.NEXT_PUBLIC_YANDEX_VERIFICATION,
});

export default function PortfolioPage() {
  return (
    <>
      <Navbar />
      <JsonLd
        data={buildBreadcrumbSchema([
          { name: "Home", url: "/" },
          { name: "Portfolio", url: "/portfolio" },
        ])}
      />
      <main className="min-h-screen bg-gray-50 dark:bg-transparent pt-36 pb-16 px-4 transition-colors duration-300">
        <PortfolioPageContent />
      </main>
    </>
  );
}
