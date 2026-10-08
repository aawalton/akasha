import type { TemperRace } from "akasha/temper/catalog/world/temper-race/temper-race.page-type.types.ts"

export const dunmer = {
  id: "019e2fc3-a98f-7e82-b63b-4e4ea31ee41c",
  type: "page-type/temper-race",
  slug: "dunmer",
  title: "Dark Elf",
  key: "dunmer",
  altName: "Dunmer",
  esoRaceId: 4,
  racialSkillLine: "temper-skill-line/racial-dark-elf-skills",
  hashPlace: 4,
  createdAt: "2026-05-16T07:50:12.623Z",
  updatedAt: "2026-09-27T01:48:07.000Z",
} as const satisfies TemperRace
