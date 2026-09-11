import type { TemperSkillType } from "akasha/temper/catalog/temper-skill/types/temper-skill-type.page-type.types.ts"

export const active = {
  id: "019e46b5-a23d-7062-9586-ac087f63f884",
  type: "temper-skill-type",
  slug: "active",
  title: "Active",
  key: "active",
  description: "Regular ability with cooldown or resource cost",
} as const satisfies TemperSkillType
