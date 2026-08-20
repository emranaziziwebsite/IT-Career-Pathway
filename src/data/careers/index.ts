import { Career } from "@/types";
import { developmentCareers } from "./development";
import { dataAndAiCareers } from "./dataAndAi";
import { securityAndNetworkingCareers } from "./securityAndNetworking";
import { cloudAndDevopsCareers } from "./cloudAndDevops";
import { gameAndXrCareers } from "./gameAndXr";
import { specializedCareers } from "./specialized";

export const allCareers: Career[] = [
  ...developmentCareers,
  ...dataAndAiCareers,
  ...securityAndNetworkingCareers,
  ...cloudAndDevopsCareers,
  ...gameAndXrCareers,
  ...specializedCareers,
];

export const careersById: Record<string, Career> = Object.fromEntries(
  allCareers.map((career) => [career.id, career])
);

export const careersBySlug: Record<string, Career> = Object.fromEntries(
  allCareers.map((career) => [career.slug, career])
);

export function getCareer(slug: string): Career | undefined {
  return careersBySlug[slug];
}

export const careerCategories: string[] = Array.from(
  new Set(allCareers.map((c) => c.category))
);

export {
  developmentCareers,
  dataAndAiCareers,
  securityAndNetworkingCareers,
  cloudAndDevopsCareers,
  gameAndXrCareers,
  specializedCareers,
};
