import type { TemperSkillLine } from "akasha/temper/catalog/temper-skill/lines/temper-skill-line.page-type.types.ts"

export const companionSharedFightersGuild = {
  id: "019e61dc-f1f4-7914-8b72-5267ba7bd7ac",
  type: "temper-skill-line",
  slug: "companion-shared-fighters-guild",
  title: "Fighters Guild",
  key: "companion-shared-fighters-guild",
  displayOrder: 72,
  esoSkillLineId: 189,
  maxRank: 10,
  subcategoryId: "companion",
} as const satisfies TemperSkillLine
