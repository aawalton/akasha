import type { TemperDungeon } from "akasha/temper/catalog/world/temper-dungeon/temper-dungeon.page-type.types.ts"

export const dc1 = {
  id: "01a05fc5-7424-7fca-b9d1-a796077c77c8",
  type: "page-type/temper-dungeon",
  slug: "dc1",
  title: "Darkshade Caverns I",
  key: "DC1",
  questGiver: "temper-quest-giver/maj-al-ragath",
  rotationPosition: 9,
  soloDifficulty: "easy",
  esoZoneId: 63,
  zoneKey: "EP2",
  questId: 4145,
  displayOrder: 19,
} as const satisfies TemperDungeon
