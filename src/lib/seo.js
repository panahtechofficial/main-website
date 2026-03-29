const DEFAULT_SITE_URL = "https://panahtech.com";

export const SITE_NAME = "PanahTech";
export const SITE_URL = "https://panahtech.com";
export const SITE_DESCRIPTION =
  "PanahTech helps businesses build websites, AI integrations, VR experiences, and IoT solutions from concept to deployment.";
export const OG_IMAGE_PATH = "/images/OG.png";

export const SITE_KEYWORDS = [
  // Brand
  "PanahTech",
  "Panah Tech",
  "panahtech indonesia",
  "panahtech software house",

  // Core Services (Indonesia)
  "jasa pembuatan website",
  "jasa bikin website",
  "jasa buat website murah",
  "jasa website profesional",
  "jasa website company profile",
  "jasa pembuatan web app",
  "jasa pembuatan aplikasi web",
  "jasa pembuatan aplikasi",
  "jasa pembuatan dashboard",
  "jasa pembuatan sistem informasi",
  "jasa software house indonesia",
  "software house indonesia",
  "developer website indonesia",
  "web developer indonesia",
  "jasa fullstack developer",
  "jasa frontend backend developer",

  // AI & Tech (Indonesia)
  "jasa chatbot ai indonesia",
  "ai chatbot indonesia",
  "jasa pembuatan ai",
  "integrasi ai website",
  "jasa machine learning",
  "deep learning indonesia",
  "ai automation indonesia",

  // IoT & Advanced Tech
  "jasa iot indonesia",
  "iot solutions indonesia",
  "jasa dashboard iot",
  "smart device iot",
  "iot monitoring system",

  // VR / AR
  "vr development indonesia",
  "ar vr developer",
  "virtual reality indonesia",
  "augmented reality indonesia",

  // English Keywords
  "web development services",
  "website development company",
  "custom web application development",
  "software house",
  "software development company",
  "fullstack developer services",
  "frontend backend developer",
  "build website for business",
  "company profile website service",

  // AI English
  "ai chatbot development",
  "ai integration services",
  "machine learning solutions",
  "ai automation tools",
  "custom ai solutions",

  // Startup / Business intent
  "digital solutions for business",
  "build startup website",
  "tech partner indonesia",
  "outsource developer indonesia",
  "hire web developer indonesia",

  // Long-tail (high conversion)
  "jasa pembuatan website company profile murah",
  "jasa pembuatan website bisnis profesional",
  "jasa pembuatan aplikasi berbasis web",
  "jasa pembuatan sistem berbasis web",
  "custom website development indonesia",
  "affordable web development services",

  // Typo / common misspellings
  "jasa pembuatan wesbite",
  "jasa pembuatan webiste",
  "jasa bikin wesbite",
  "web development indoneisa",
  "sofware house indonesia",
  "developr website indonesia",
  "ai chat bot indonesia",
];

export function getMetadataBase() {
  try {
    return new URL(SITE_URL);
  } catch {
    return new URL(DEFAULT_SITE_URL);
  }
}

export function buildPageMetadata({
  title,
  description,
  path = "/",
  keywords = [],
  images = [
    {
      url: OG_IMAGE_PATH,
      width: 1200,
      height: 630,
      alt: "PanahTech - Turning Problem Into Solutions",
    },
  ],
}) {
  const normalizedPath = path.startsWith("/") ? path : `/${path}`;

  return {
    title,
    description,
    keywords: [...new Set([...SITE_KEYWORDS, ...keywords])],
    alternates: {
      canonical: normalizedPath,
    },
    openGraph: {
      type: "website",
      siteName: SITE_NAME,
      locale: "id_ID",
      title,
      description,
      url: normalizedPath,
      images,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: images.map((image) => image.url),
    },
  };
}
