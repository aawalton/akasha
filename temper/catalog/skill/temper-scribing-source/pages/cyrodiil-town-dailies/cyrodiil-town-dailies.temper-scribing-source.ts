import type { TemperScribingSource } from "akasha/temper/catalog/skill/temper-scribing-source/temper-scribing-source.page-type.types.ts"

export const cyrodiilTownDailies = {
  id: "019e12b0-85e4-77f3-aa3b-76b242b50c2f",
  type: "page-type/temper-scribing-source",
  slug: "cyrodiil-town-dailies",
  title: "Cyrodiil Town Dailies",
  displayOrder: 1,
  scriptType: "signature",
  tierAchievements: "jsonl",
  zoneSlugs: ["temper-zone/cyrodiil"],
  createdAt: "2026-05-10T16:20:19.044Z",
  updatedAt: "2026-09-22T14:51:15.000Z",
} as const satisfies TemperScribingSource
