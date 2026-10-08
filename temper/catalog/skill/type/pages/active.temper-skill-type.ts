import type { TemperSkillType } from "akasha/temper/catalog/skill/type/temper-skill-type.page-type.types.ts"

export const active = {
  id: "019e46b5-a23d-7062-9586-ac087f63f884",
  type: "page-type/temper-skill-type",
  slug: "active",
  title: "Active",
  key: "active",
  description: "Regular ability with cooldown or resource cost",
  createdAt: "2026-05-20T18:46:09.213Z",
  updatedAt: "2026-09-21T15:29:38.000Z",
} as const satisfies TemperSkillType
