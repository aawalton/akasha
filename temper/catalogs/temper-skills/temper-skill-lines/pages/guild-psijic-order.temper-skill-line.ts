import type { TemperSkillLine } from "../temper-skill-line.page-type.ts"

export const guildPsijicOrder = {
  id: "019e61dc-f1cb-771d-991d-3314effff2d6",
  pageTypeSlug: "temper-skill-line",
  slug: "guild-psijic-order",
  title: "Psijic Order",
  key: "guild-psijic-order",
  displayOrder: 40,
  esoSkillLineId: 130,
  maxRank: 10,
  subcategoryId: "guild",
} as const satisfies TemperSkillLine
