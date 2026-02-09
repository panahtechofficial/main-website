import { Cpu, GalleryHorizontalEnd } from "lucide-react";
import { FaRobot, FaBuilding, FaGraduationCap, FaBox } from "react-icons/fa";

export const servicesData = [
    {
        title: "Company Profile",
        description: "Establish a powerful corporate identity with a sleek, professional website. Optimized for speed, security, and brand impact.",
        icon: FaBuilding,
        color: "bg-orange-100 text-orange-600",
        badge: "MOST POPULAR",
        hasDecoration: true
    },
    {
        title: "Online Catalogue",
        description: "Interactive digital catalogs to showcase your full product range efficiently.",
        icon: GalleryHorizontalEnd,
        color: "bg-blue-100 text-blue-600",
    },
    {
        title: "School Website",
        description: "Educational platforms and portals designed for schools and universities.",
        icon: FaGraduationCap,
        color: "bg-blue-100 text-blue-600",
    },
    {
        title: "AI ChatBot",
        description: "Intelligent customer service automation that learns from your users.",
        icon: FaRobot,
        color: "text-blue-600", // Dark blue icon bg
        badge: "24/7 Support",
        variant: "chatbot"
    },
    {
        title: "VR Development",
        description: "Immersive virtual reality experiences for training and events.",
        icon: FaBox,
        color: "bg-purple-100 text-purple-600",
    },
    {
        title: "IOT Solutions",
        description: "Smart connected devices and ecosystems for home, office, or industrial use.",
        icon: Cpu,
        color: "bg-blue-100 text-blue-600",
    }
];
