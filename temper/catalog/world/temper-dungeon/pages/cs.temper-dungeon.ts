import type { TemperDungeon } from "akasha/temper/catalog/world/temper-dungeon/temper-dungeon.page-type.types.ts"

export const cs = {
  id: "01a05fc5-7423-711f-8589-9a405121b472",
  type: "page-type/temper-dungeon",
  slug: "cs",
  title: "Cradle of Shadows",
  key: "CS",
  questGiver: "temper-quest-giver/urgarlag-chief-bane",
  rotationPosition: 2,
  soloDifficulty: "hard",
  esoZoneId: 848,
  zoneKey: "EP3",
  questId: 5702,
  displayOrder: 27,
} as const satisfies TemperDungeon
