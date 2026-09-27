import type { TemperDungeon } from "akasha/temper/catalog/world/temper-dungeon/temper-dungeon.page-type.types.ts"

export const sh = {
  id: "01a05fc5-742b-72c1-9413-e8750e218000",
  type: "page-type/temper-dungeon",
  slug: "sh",
  title: "Scrivener's Hall",
  key: "SH",
  questGiver: "temper-quest-giver/urgarlag-chief-bane",
  rotationPosition: 27,
  soloDifficulty: "hard",
  esoZoneId: 1390,
  zoneKey: "EP5",
  questId: 7027,
  displayOrder: 52,
} as const satisfies TemperDungeon
