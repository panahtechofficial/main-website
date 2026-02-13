import Hero from "@/components/home/Hero";
import Features from "@/components/home/Features";
import Services from "@/components/home/Services";
import Showcase from "@/components/home/Showcase";
import CTA from "@/components/home/CTA";
import ChatRoom from "@/components/home/ChatRoom";
import FloatingChatButton from "@/components/ui/FloatingChatButton";
import FloatingModel3D from "@/components/ui/FloatingModel3D";
import DarkModeToggle from "@/components/ui/DarkModeToggle";

export default function Home() {
  return (
    <div className="bg-gray-50 dark:bg-transparent flex flex-col min-h-screen font-sans transition-colors duration-300">
      <DarkModeToggle />
      <Hero />
      <Features />
      <Services />
      {/* Showcase + CTA with Sticky ChatRoom Sidebar */}
      <div className="px-4">
        <div className="max-w-[1400px] mx-auto ">
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
      <div className="hidden lg:block">
        <FloatingModel3D 
          position={{ top: "60%", right: "-2%" }}
        />
      </div>
    </div>
  );
}
