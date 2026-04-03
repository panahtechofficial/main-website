import { serviceDetailsSource, servicesSource } from "@/data/services";

const pickText = (value, language) => {
  if (typeof value === "string") {
    return value;
  }

  return value?.[language] || value?.id || "";
};

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
    promoPrice: item.promoPrice ? pickText(item.promoPrice, language) : "",
  }));

export const getServiceDetailBySlug = (slug, language = "id") =>
  getServiceDetails(language).find((item) => item.slug === slug);

export const getServiceVisualBySlug = (slug, language = "id") =>
  getServicesData(language).find((item) => item.slug === slug);

export const servicesData = getServicesData("id");
export const serviceDetails = getServiceDetails("id");
