import type { TemperScribingSource } from "../../temper-scribing-source.page-type.ts"

export const fightersGuildDaily = {
  id: "019e12b0-85e2-71ad-9427-28de2cd3a2ee",
  pageTypeSlug: "temper-scribing-source",
  slug: "fighters-guild-daily",
  title: "Fighters Guild Daily",
  displayOrder: 0,
  scriptType: "signature",
  tierAchievements: "jsonl",
  zoneSlugs: ["stormhaven", "deshaan", "grahtwood"],
} as const satisfies TemperScribingSource
