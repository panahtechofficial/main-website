import { portfolioSource } from "@/data/portofolio";

const pickText = (value, language) => {
  if (typeof value === "string") {
    return value;
  }

  return value?.[language] || value?.id || "";
};

export const getPortofolio = (language = "id") =>
  portfolioSource.map((item) => ({
    ...item,
    title: pickText(item.title, language),
    description: pickText(item.description, language),
  }));

export const portofolio = getPortofolio("id");
