import type { TemperSkillPoint } from "akasha/temper/player/character/temper-skill-point/temper-skill-point.page-type.types.ts"

export const tp = {
  id: "01a0e0fe-fb56-71f2-8ae9-50ce497f57dd",
  type: "page-type/temper-skill-point",
  slug: "tp",
  title: "Telvanni Peninsula",
  key: "TP",
  displayOrder: 51,
  category: "dungeon-zone",
  esoZoneId: 1414,
} as const satisfies TemperSkillPoint
