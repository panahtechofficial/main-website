import { Cpu, GalleryHorizontalEnd, Code } from "lucide-react";
import { FaRobot, FaBuilding, FaGraduationCap, FaBox } from "react-icons/fa";

const pickText = (value, language) => {
  if (typeof value === "string") {
    return value;
  }

  return value?.[language] || value?.id || "";
};

const servicesSource = [
  {
    slug: "company-profile",
    title: { id: "Company Profile", en: "Company Profile" },
    description: {
      id: "Bangun identitas perusahaan yang kuat dengan website profesional yang cepat, aman, dan berdampak.",
      en: "Establish a powerful corporate identity with a sleek, professional website optimized for speed, security, and brand impact.",
    },
    icon: FaBuilding,
    color: "bg-orange-100 text-orange-600",
    badge: { id: "PALING POPULER", en: "MOST POPULAR" },
    hasDecoration: true,
  },
  {
    slug: "online-catalogue",
    title: { id: "Online Catalogue", en: "Online Catalogue" },
    description: {
      id: "Katalog digital interaktif untuk menampilkan seluruh produk dengan pengalaman jelajah yang efisien.",
      en: "Interactive digital catalogs to showcase your full product range efficiently.",
    },
    icon: GalleryHorizontalEnd,
    color: "bg-blue-100 text-blue-600",
  },
  {
    slug: "custom-website",
    title: { id: "Custom Website", en: "Custom Website" },
    description: {
      id: "Pengembangan website fleksibel yang disesuaikan penuh dengan kebutuhan bisnis Anda.",
      en: "Flexible website development tailored to your specific business needs.",
    },
    icon: Code,
    color: "bg-green-100 text-green-600",
    badge: { id: "FLEKSIBEL", en: "FLEXIBLE" },
  },
  {
    slug: "school-website",
    title: { id: "School Website", en: "School Website" },
    description: {
      id: "Platform edukasi dan portal sekolah/universitas yang rapi, modern, dan mudah dikelola.",
      en: "Educational platforms and portals designed for schools and universities.",
    },
    icon: FaGraduationCap,
    color: "bg-blue-100 text-blue-600",
  },
  {
    slug: "ai-chatbot",
    title: { id: "AI ChatBot", en: "AI ChatBot" },
    description: {
      id: "Otomasi layanan pelanggan cerdas yang belajar dari percakapan pengguna Anda.",
      en: "Intelligent customer service automation that learns from your users.",
    },
    icon: FaRobot,
    color: "text-blue-600",
    badge: { id: "Dukungan 24/7", en: "24/7 Support" },
    variant: "chatbot",
  },
  {
    slug: "vr-development",
    title: { id: "VR Development", en: "VR Development" },
    description: {
      id: "Pengalaman virtual reality imersif untuk pelatihan, event, dan simulasi interaktif.",
      en: "Immersive virtual reality experiences for training and events.",
    },
    icon: FaBox,
    color: "bg-purple-100 text-purple-600",
  },
  {
    slug: "iot-solutions",
    title: { id: "IOT Solutions", en: "IoT Solutions" },
    description: {
      id: "Ekosistem perangkat pintar terhubung untuk rumah, kantor, dan kebutuhan industri.",
      en: "Smart connected devices and ecosystems for home, office, or industrial use.",
    },
    icon: Cpu,
    color: "bg-blue-100 text-blue-600",
  },
];

const serviceDetailsSource = [
  {
    id: 1,
    slug: "company-profile",
    title: { id: "Company Profile", en: "Company Profile" },
    description: {
      id: "Bangun identitas perusahaan yang kuat dengan website profesional yang cepat, aman, dan berdampak.",
      en: "Establish a powerful corporate identity with a sleek, professional website optimized for speed, security, and brand impact.",
    },
    fullDescription: {
      id: "Website company profile menampilkan bisnis, visi, nilai, dan layanan Anda kepada calon klien. Kami membangun situs yang responsif, cepat, dan berdesain modern.",
      en: "A company profile website showcases your business, mission, values, and services to potential clients. We create responsive, fast-loading sites with modern design.",
    },
    features: {
      id: [
        "Desain Responsif",
        "SEO Friendly",
        "Loading Cepat",
        "Keamanan Dasar",
        "Mobile Friendly",
      ],
      en: [
        "Responsive Design",
        "SEO Optimized",
        "Fast Loading",
        "Security Features",
        "Mobile Friendly",
      ],
    },
    price: {
      id: "Rp2.000.000 - Rp6.000.000",
      en: "Rp2,000,000 - Rp6,000,000",
    },
  },
  {
    id: 2,
    slug: "online-catalogue",
    title: { id: "Online Catalogue", en: "Online Catalogue" },
    description: {
      id: "Katalog digital interaktif untuk menampilkan seluruh produk dengan pengalaman jelajah yang efisien.",
      en: "Interactive digital catalogs to showcase your full product range efficiently.",
    },
    fullDescription: {
      id: "Katalog digital lengkap dengan fitur pencarian, filter, dan detail produk. Cocok untuk bisnis retail dan e-commerce.",
      en: "Digital catalogs with search, filtering, and product details. Perfect for e-commerce businesses and retailers.",
    },
    features: {
      id: [
        "Pencarian Produk",
        "Filter Lanjutan",
        "Gambar HD",
        "Detail Produk",
        "Opsi Export",
      ],
      en: [
        "Product Search",
        "Advanced Filtering",
        "High Resolution Images",
        "Product Details",
        "Export Options",
      ],
    },
    price: {
      id: "Rp3.000.000 - Rp8.000.000",
      en: "Rp3,000,000 - Rp8,000,000",
    },
  },
  {
    id: 3,
    slug: "custom-website",
    title: { id: "Custom Website", en: "Custom Website" },
    description: {
      id: "Pengembangan website fleksibel yang disesuaikan penuh dengan kebutuhan bisnis Anda.",
      en: "Flexible website development tailored to your specific business needs.",
    },
    fullDescription: {
      id: "Website dibangun dari nol sesuai kebutuhan klien. Fitur, desain, dan kompleksitas dapat disesuaikan sepenuhnya.",
      en: "Custom-built websites based on client requirements. Features, design, and complexity are fully tailored based on requested functionality.",
    },
    features: {
      id: [
        "Fitur Custom",
        "Arsitektur Scalable",
        "Integrasi API",
        "Desain Responsif",
        "Pengembangan Fleksibel",
      ],
      en: [
        "Custom Features",
        "Scalable Architecture",
        "API Integration",
        "Responsive Design",
        "Flexible Development",
      ],
    },
    price: {
      id: "Mulai dari Rp3.000.000 (menyesuaikan kebutuhan fitur)",
      en: "Starting from Rp3,000,000 (depends on feature requirements)",
    },
  },
  {
    id: 4,
    slug: "school-website",
    title: { id: "School Website", en: "School Website" },
    description: {
      id: "Platform edukasi dan portal sekolah/universitas yang rapi, modern, dan mudah dikelola.",
      en: "Educational platforms and portals designed for schools and universities.",
    },
    fullDescription: {
      id: "Portal pendidikan lengkap dengan manajemen siswa, materi pembelajaran, dan alat komunikasi.",
      en: "Complete educational portals with student management, course materials, and communication tools.",
    },
    features: {
      id: [
        "Portal Siswa",
        "Manajemen Kelas",
        "Sistem Pengumuman",
        "Tracking Tugas",
        "Akses Orang Tua",
      ],
      en: [
        "Student Portal",
        "Course Management",
        "Announcement System",
        "Assignment Tracking",
        "Parent Access",
      ],
    },
    price: {
      id: "Rp4.000.000 - Rp10.000.000",
      en: "Rp4,000,000 - Rp10,000,000",
    },
  },
  {
    id: 5,
    slug: "ai-chatbot",
    title: { id: "AI ChatBot", en: "AI ChatBot" },
    description: {
      id: "Otomasi layanan pelanggan cerdas yang belajar dari percakapan pengguna Anda.",
      en: "AI-powered chatbots for customer support, lead generation, and 24/7 assistance.",
    },
    fullDescription: {
      id: "Chatbot AI untuk support pelanggan, lead generation, dan respon otomatis 24/7 yang dapat diintegrasikan ke website maupun WhatsApp.",
      en: "AI-powered chatbots for customer support, lead generation, and 24/7 assistance, ready to integrate with websites and messaging channels.",
    },
    features: {
      id: [
        "Dukungan NLP",
        "Multi Bahasa",
        "Kemampuan Belajar",
        "Siap Integrasi",
        "Dashboard Analitik",
      ],
      en: [
        "NLP Support",
        "Multi-language",
        "Learning Capability",
        "Integration Ready",
        "Analytics Dashboard",
      ],
    },
    price: {
      id: "Rp5.000.000 - Rp12.000.000",
      en: "Rp5,000,000 - Rp12,000,000",
    },
  },
  {
    id: 6,
    slug: "iot-solutions",
    title: { id: "IOT Solutions", en: "IoT Solutions" },
    description: {
      id: "Ekosistem perangkat pintar terhubung untuk rumah, kantor, dan kebutuhan industri.",
      en: "Smart connected devices and ecosystems for home, office, or industrial use.",
    },
    fullDescription: {
      id: "Sistem perangkat terhubung dengan integrasi cloud, monitoring real-time, dan automasi yang dapat disesuaikan.",
      en: "Connected device systems with cloud integration, real-time monitoring, and automation.",
    },
    features: {
      id: [
        "Integrasi Perangkat",
        "Monitoring Real-time",
        "Sinkronisasi Cloud",
        "Aturan Automasi",
        "Kontrol Mobile",
      ],
      en: [
        "Device Integration",
        "Real-time Monitoring",
        "Cloud Sync",
        "Automation Rules",
        "Mobile App Control",
      ],
    },
    price: {
      id: "Rp6.000.000 - Rp20.000.000",
      en: "Rp6,000,000 - Rp20,000,000",
    },
  },
  {
    id: 7,
    slug: "vr-development",
    title: { id: "VR Development", en: "VR Development" },
    description: {
      id: "Pengalaman virtual reality imersif untuk pelatihan, event, dan simulasi interaktif.",
      en: "Immersive virtual reality experiences for training and events.",
    },
    fullDescription: {
      id: "Solusi VR kustom untuk pelatihan, visualisasi produk, event, dan kebutuhan entertainment.",
      en: "Custom VR solutions for training, events, product visualization, and entertainment.",
    },
    features: {
      id: [
        "3D Modeling",
        "Pengalaman Interaktif",
        "Multi Platform",
        "Optimasi Performa",
        "Pelatihan Pengguna",
      ],
      en: [
        "3D Modeling",
        "Interactive Experiences",
        "Cross-platform",
        "Performance Optimization",
        "User Training",
      ],
    },
    price: {
      id: "Rp8.000.000 - Rp25.000.000",
      en: "Rp8,000,000 - Rp25,000,000",
    },
  },
];

export const getServicesData = (language = "id") =>
  servicesSource.map((item) => ({
    ...item,
    title: pickText(item.title, language),
    description: pickText(item.description, language),
    badge: item.badge ? pickText(item.badge, language) : undefined,
  }));

export const getServiceDetails = (language = "id") =>
  serviceDetailsSource.map((item) => ({
    ...item,
    title: pickText(item.title, language),
    description: pickText(item.description, language),
    fullDescription: pickText(item.fullDescription, language),
    features: item.features?.[language] || item.features?.id || [],
    price: pickText(item.price, language),
  }));

export const getServiceDetailBySlug = (slug, language = "id") =>
  getServiceDetails(language).find((item) => item.slug === slug);

export const getServiceVisualBySlug = (slug, language = "id") =>
  getServicesData(language).find((item) => item.slug === slug);

export const servicesData = getServicesData("id");
export const serviceDetails = getServiceDetails("id");
