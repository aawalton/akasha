import type { TemperSkillPoint } from "akasha/temper/player/character/temper-skill-point/temper-skill-point.page-type.types.ts"

export const tutorial = {
  id: "019e6471-1513-78f3-a15b-f9a77b63de31",
  type: "page-type/temper-skill-point",
  slug: "tutorial",
  title: "Tutorial",
  key: "tutorial",
  displayOrder: 2,
  category: "general",
  maxValue: 1,
  skillPointQuests: "jsonl",
  createdAt: "2026-05-26T13:19:53.107Z",
  updatedAt: "2026-09-27T03:53:34.000Z",
} as const satisfies TemperSkillPoint
