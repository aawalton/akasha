import type { TemperSkillType } from "../temper-skill-type.page-type.ts"

export const passive = {
  id: "019e46b5-a243-7401-aced-bd121d4944b2",
  pageTypeSlug: "temper-skill-type",
  slug: "passive",
  title: "Passive",
  key: "passive",
  description: "Passive ability that provides permanent bonuses",
} as const satisfies TemperSkillType
