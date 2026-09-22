import type { TemperScribingSource } from "akasha/temper/catalog/skill/temper-scribing-source/temper-scribing-source.page-type.types.ts"

export const undauntedDelveDailies = {
  id: "019e12b0-85ea-7088-9059-200f16b5ae05",
  type: "page-type/temper-scribing-source",
  slug: "undaunted-delve-dailies",
  title: "Undaunted Delve Dailies",
  displayOrder: 0,
  scriptType: "affix",
  tierAchievements: "jsonl",
  zoneSlugs: ["temper-zone/stormhaven", "temper-zone/deshaan", "temper-zone/grahtwood"],
} as const satisfies TemperScribingSource
