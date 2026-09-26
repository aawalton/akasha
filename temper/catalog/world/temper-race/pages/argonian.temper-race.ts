import type { TemperRace } from "akasha/temper/catalog/world/temper-race/temper-race.page-type.types.ts"

export const argonian = {
  id: "019e2fc3-a988-7b52-8a61-82061a6ac032",
  type: "page-type/temper-race",
  slug: "argonian",
  title: "Argonian",
  key: "argonian",
  esoRaceId: 6,
  racialSkillLine: "temper-skill-line/racial-argonian-skills",
} as const satisfies TemperRace
