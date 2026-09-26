import type { TemperRace } from "akasha/temper/catalog/world/temper-race/temper-race.page-type.types.ts"

export const imperial = {
  id: "019e2fc3-a991-76a8-a99d-607662d3158a",
  type: "page-type/temper-race",
  slug: "imperial",
  title: "Imperial",
  key: "imperial",
  esoRaceId: 10,
  racialSkillLine: "temper-skill-line/racial-imperial-skills",
} as const satisfies TemperRace
