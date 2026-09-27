import type { TemperSkillPoint } from "akasha/temper/player/character/temper-skill-point/temper-skill-point.page-type.types.ts"

export const mainquests = {
  id: "019e6471-1511-7b20-aa5c-8bc7c17ffadb",
  type: "page-type/temper-skill-point",
  slug: "mainquests",
  title: "Main Quests",
  key: "mainQuests",
  displayOrder: 1,
  category: "general",
  maxValue: 11,
  skillPointQuests: "jsonl",
} as const satisfies TemperSkillPoint
