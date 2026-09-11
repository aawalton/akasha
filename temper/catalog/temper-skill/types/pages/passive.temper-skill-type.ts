import type { TemperSkillType } from "akasha/temper/catalog/temper-skill/types/temper-skill-type.page-type.types.ts"

export const passive = {
  id: "019e46b5-a243-7401-aced-bd121d4944b2",
  type: "temper-skill-type",
  slug: "passive",
  title: "Passive",
  key: "passive",
  description: "Passive ability that provides permanent bonuses",
} as const satisfies TemperSkillType
