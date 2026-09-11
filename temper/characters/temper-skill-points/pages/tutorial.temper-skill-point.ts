import type { TemperSkillPoint } from "akasha/temper/characters/temper-skill-points/temper-skill-point.page-type.types.ts"

export const tutorial = {
  id: "019e6471-1513-78f3-a15b-f9a77b63de31",
  type: "temper-skill-point",
  slug: "tutorial",
  title: "Tutorial",
  key: "tutorial",
  category: "general",
  maxValue: 1,
} as const satisfies TemperSkillPoint
