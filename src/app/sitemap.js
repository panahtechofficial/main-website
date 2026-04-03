import { getServiceDetails } from "@/lib/services";
import { SITE_URL } from "@/lib/seo";

export default function sitemap() {
  const now = new Date();
  const staticRoutes = ["", "/services", "/portfolio", "/contact"];

  const staticEntries = staticRoutes.map((path) => ({
    url: `${SITE_URL}${path}`,
    lastModified: now,
    changeFrequency: path === "" ? "weekly" : "monthly",
    priority: path === "" ? 1 : 0.8,
  }));

  const serviceEntries = getServiceDetails("id").map((service) => ({
    url: `${SITE_URL}/services/${service.slug}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  return [...staticEntries, ...serviceEntries];
}
