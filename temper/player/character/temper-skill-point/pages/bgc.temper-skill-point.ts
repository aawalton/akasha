import type { TemperSkillPoint } from "akasha/temper/player/character/temper-skill-point/temper-skill-point.page-type.types.ts"

export const bgc = {
  id: "01a0e0fe-fb55-7ebd-b2f7-f30c9f2a6666",
  type: "page-type/temper-skill-point",
  slug: "bgc",
  title: "Blackreach: Greymoor Caverns",
  key: "BGC",
  displayOrder: 50,
  category: "dungeon-zone",
  esoZoneId: 1161,
} as const satisfies TemperSkillPoint
