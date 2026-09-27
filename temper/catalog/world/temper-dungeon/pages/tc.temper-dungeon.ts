import type { TemperDungeon } from "akasha/temper/catalog/world/temper-dungeon/temper-dungeon.page-type.types.ts"

export const tc = {
  id: "01a05fc5-742c-7eba-bc95-44d06b5c1956",
  type: "page-type/temper-dungeon",
  slug: "tc",
  title: "The Cauldron",
  key: "TC",
  questGiver: "temper-quest-giver/urgarlag-chief-bane",
  rotationPosition: 19,
  soloDifficulty: "hard",
  esoZoneId: 1229,
  zoneKey: "EP2",
  questId: 6578,
  displayOrder: 44,
} as const satisfies TemperDungeon
