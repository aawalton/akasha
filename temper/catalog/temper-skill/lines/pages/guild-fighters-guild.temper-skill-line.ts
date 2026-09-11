import type { TemperSkillLine } from "akasha/temper/catalog/temper-skill/lines/temper-skill-line.page-type.types.ts"

export const guildFightersGuild = {
  id: "019e61dc-f1c8-721c-aecf-a156f080757f",
  pageTypeSlug: "temper-skill-line",
  type: "temper-skill-line",
  slug: "guild-fighters-guild",
  title: "Fighters Guild",
  key: "guild-fighters-guild",
  displayOrder: 38,
  esoSkillLineId: 45,
  maxRank: 10,
  subcategoryId: "guild",
} as const satisfies TemperSkillLine
