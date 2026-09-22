import type { TemperScribingSource } from "akasha/temper/catalog/skill/temper-scribing-source/temper-scribing-source.page-type.types.ts"

export const imperialCityDailies = {
  id: "019e12b0-85eb-78e8-bb06-c717d3082bfd",
  type: "page-type/temper-scribing-source",
  slug: "imperial-city-dailies",
  title: "Imperial City Dailies",
  displayOrder: 1,
  scriptType: "affix",
  tierAchievements: "jsonl",
  zoneSlugs: ["temper-zone/imperial-city"],
} as const satisfies TemperScribingSource
