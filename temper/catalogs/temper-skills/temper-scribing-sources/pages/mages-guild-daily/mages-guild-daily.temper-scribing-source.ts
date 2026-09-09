import type { TemperScribingSource } from "../../temper-scribing-source.page-type.ts"

export const magesGuildDaily = {
  id: "019e12b0-85db-772f-8925-757e9bacd178",
  pageTypeSlug: "temper-scribing-source",
  slug: "mages-guild-daily",
  title: "Mages Guild Daily",
  displayOrder: 0,
  scriptType: "focus",
  tierAchievements: "jsonl",
  zoneSlugs: ["stormhaven", "deshaan", "grahtwood"],
} as const satisfies TemperScribingSource
