import Hero from "@/components/home/Hero";
import Features from "@/components/home/Features";
import Services from "@/components/home/Services";
import Showcase from "@/components/home/Showcase";
import CTA from "@/components/home/CTA";
import ChatRoom from "@/components/home/ChatRoom";
import FloatingChatButton from "@/components/ui/FloatingChatButton";
import FloatingModel3D from "@/components/ui/FloatingModel3D";
import Navbar from "@/components/layout/Navbar";
import { buildPageMetadata } from "@/lib/seo";

export const metadata = buildPageMetadata({
  title: "PanahTech - Home",
  description:
    "PanahTech provides company profile websites, online catalogues, AI chatbots, VR, and IoT solutions to help businesses grow faster.",
  path: "/",
  keywords: ["home", "software house", "website development Indonesia"],
  yandexVerification: process.env.NEXT_PUBLIC_YANDEX_VERIFICATION,
});

export default function Home() {
  return (
    <>
      <Navbar />
      <div className="bg-gray-50 dark:bg-transparent flex flex-col min-h-screen font-sans transition-colors duration-300 snap-y snap-mandatory">
        <Hero className="snap-start" />
        <Features className="snap-start" />
        <Services className="snap-start" />
        {/* Showcase + CTA with Sticky ChatRoom Sidebar */}
        <div className="px-4 snap-start">
          <div className="max-w-350 mx-auto ">
            <div className="flex flex-col lg:flex-row gap-8 py-20 ">
              {/* Left: Main Content (Showcase + CTA) */}
              <div className="flex-1 min-w-0 overflow-hidden flex flex-col  gap-10">
                <Showcase />
                <CTA />
              </div>
              {/* Right: Sticky ChatRoom */}
              <ChatRoom />
            </div>
          </div>
        </div>
        {/* Floating Chat Button */}
        <FloatingChatButton />
        {/* Floating 3D Model - Desktop only, positioned to not block content */}
        {/* <div className="hidden lg:block">
          <FloatingModel3D 
            position={{ top: "60%", right: "-2%" }}
        /> */}
      </div>
    </>
  );
}
