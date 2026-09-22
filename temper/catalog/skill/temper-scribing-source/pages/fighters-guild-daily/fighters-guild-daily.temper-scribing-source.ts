import type { TemperScribingSource } from "akasha/temper/catalog/skill/temper-scribing-source/temper-scribing-source.page-type.types.ts"

export const fightersGuildDaily = {
  id: "019e12b0-85e2-71ad-9427-28de2cd3a2ee",
  type: "page-type/temper-scribing-source",
  slug: "fighters-guild-daily",
  title: "Fighters Guild Daily",
  displayOrder: 0,
  scriptType: "signature",
  tierAchievements: "jsonl",
  zoneSlugs: ["temper-zone/stormhaven", "temper-zone/deshaan", "temper-zone/grahtwood"],
} as const satisfies TemperScribingSource
