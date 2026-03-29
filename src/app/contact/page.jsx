import Navbar from "@/components/layout/Navbar";
import ContactPageContent from "@/components/pages/ContactPageContent";
import { buildPageMetadata } from "@/lib/seo";

export const metadata = buildPageMetadata({
  title: "Contact",
  description:
    "Contact PanahTech for consultation, project estimates, and digital solution planning for your business.",
  path: "/contact",
  keywords: ["contact panahtech", "website consultation", "AI consultation"],
});

export default function ContactPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-gray-50 dark:bg-transparent pt-36 pb-16 px-4 transition-colors duration-300">
        <ContactPageContent />
      </main>
    </>
  );
}
