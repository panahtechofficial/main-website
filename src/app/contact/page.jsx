import Navbar from "@/components/layout/Navbar";
import ContactPageContent from "@/components/pages/ContactPageContent";

export const metadata = {
  title: "Contact | PanahTech",
  description:
    "Get in touch with PanahTech for consultation and digital solution planning.",
};

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
