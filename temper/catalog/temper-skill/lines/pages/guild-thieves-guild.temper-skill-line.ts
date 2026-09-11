import type { TemperSkillLine } from "akasha/temper/catalog/temper-skill/lines/temper-skill-line.page-type.types.ts"

export const guildThievesGuild = {
  id: "019e61dc-f1cd-7652-854c-7b592d43c0d3",
  pageTypeSlug: "temper-skill-line",
  type: "temper-skill-line",
  slug: "guild-thieves-guild",
  title: "Thieves Guild",
  key: "guild-thieves-guild",
  displayOrder: 41,
  esoSkillLineId: 117,
  maxRank: 12,
  subcategoryId: "guild",
} as const satisfies TemperSkillLine
