import { Cpu, GalleryHorizontalEnd, Code } from "lucide-react";
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
        title: "Custom Website",
        description: "Flexible website development tailored to your specific business needs.",
        icon: Code,
        color: "bg-green-100 text-green-600",
        badge: "FLEXIBLE"
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
        color: "text-blue-600",
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

export const serviceDetails = [
    {
        id: 1,
        title: "Company Profile",
        description: "Establish a powerful corporate identity with a sleek, professional website. Optimized for speed, security, and brand impact.",
        fullDescription: "A company profile website showcases your business, mission, values, and services to potential clients. We create responsive, fast-loading sites with modern design.",
        features: ["Responsive Design", "SEO Optimized", "Fast Loading", "Security Features", "Mobile Friendly"],
        price: "Rp2.000.000 - Rp6.000.000"
    },
    {
        id: 2,
        title: "Online Catalogue",
        description: "Interactive digital catalogs to showcase your full product range efficiently.",
        fullDescription: "Digital catalogs with search, filtering, and product details. Perfect for e-commerce businesses and retailers.",
        features: ["Product Search", "Advanced Filtering", "High Resolution Images", "Product Details", "Export Options"],
        price: "Rp3.000.000 - Rp8.000.000"
    },
    {
        id: 3,
        title: "Custom Website",
        description: "Flexible website development tailored to your specific business needs.",
        fullDescription: "Custom-built websites based on client requirements. Features, design, and complexity are fully tailored, making pricing dependent on requested functionality.",
        features: ["Custom Features", "Scalable Architecture", "API Integration", "Responsive Design", "Flexible Development"],
        price: "Mulai dari Rp3.000.000 (menyesuaikan kebutuhan fitur)"
    },
    {
        id: 4,
        title: "School Website",
        description: "Educational platforms and portals designed for schools and universities.",
        fullDescription: "Complete educational portals with student management, course materials, and communication tools.",
        features: ["Student Portal", "Course Management", "Announcement System", "Assignment Tracking", "Parent Access"],
        price: "Rp4.000.000 - Rp10.000.000"
    },
    {
        id: 5,
        title: "AI ChatBot",
        description: "Intelligent customer service automation that learns from your users.",
        fullDescription: "AI-powered chatbots for customer support, lead generation, and 24/7 assistance.",
        features: ["NLP Support", "Multi-language", "Learning Capability", "Integration Ready", "Analytics Dashboard"],
        price: "Rp5.000.000 - Rp12.000.000"
    },
    {
        id: 6,
        title: "IOT Solutions",
        description: "Smart connected devices and ecosystems for home, office, or industrial use.",
        fullDescription: "Connected device systems with cloud integration, real-time monitoring, and automation.",
        features: ["Device Integration", "Real-time Monitoring", "Cloud Sync", "Automation Rules", "Mobile App Control"],
        price: "Rp6.000.000 - Rp20.000.000"
    },
    {
        id: 7,
        title: "VR Development",
        description: "Immersive virtual reality experiences for training and events.",
        fullDescription: "Custom VR solutions for training, events, product visualization, and entertainment.",
        features: ["3D Modeling", "Interactive Experiences", "Cross-platform", "Performance Optimization", "User Training"],
        price: "Rp8.000.000 - Rp25.000.000"
    }
];