import type { TemperSkillLine } from "../temper-skill-line.page-type.ts"

export const allianceWarSupport = {
  id: "019e61dc-f1cf-7867-8757-c7e17b7f5171",
  pageTypeSlug: "temper-skill-line",
  slug: "alliance-war-support",
  title: "Support",
  key: "alliance-war-support",
  displayOrder: 45,
  esoSkillLineId: 67,
  maxRank: 10,
  subcategoryId: "alliance-war",
} as const satisfies TemperSkillLine
