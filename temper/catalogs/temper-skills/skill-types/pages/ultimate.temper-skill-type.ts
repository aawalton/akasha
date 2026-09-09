import type { TemperSkillType } from "../temper-skill-type.page-type.ts"

export const ultimate = {
  id: "019e46b5-a240-7527-869f-db0a20988a21",
  pageTypeSlug: "temper-skill-type",
  slug: "ultimate",
  title: "Ultimate",
  key: "ultimate",
  description: "High-cost ability that requires Ultimate resource",
} as const satisfies TemperSkillType
