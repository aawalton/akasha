import type { TemperScribingSource } from "akasha/temper/catalog/skill/temper-scribing-source/temper-scribing-source.page-type.types.ts"

export const magesGuildDaily = {
  id: "019e12b0-85db-772f-8925-757e9bacd178",
  type: "page-type/temper-scribing-source",
  slug: "mages-guild-daily",
  title: "Mages Guild Daily",
  displayOrder: 0,
  scriptType: "focus",
  tierAchievements: "jsonl",
  zoneSlugs: ["temper-zone/stormhaven", "temper-zone/deshaan", "temper-zone/grahtwood"],
} as const satisfies TemperScribingSource
