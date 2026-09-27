import type { TemperDungeon } from "akasha/temper/catalog/world/temper-dungeon/temper-dungeon.page-type.types.ts"

export const fg1 = {
  id: "01a05fc5-7426-78e8-b4cf-cc1c192f8889",
  type: "page-type/temper-dungeon",
  slug: "fg1",
  title: "Fungal Grotto I",
  key: "FG1",
  questGiver: "temper-quest-giver/maj-al-ragath",
  rotationPosition: 7,
  soloDifficulty: "easy",
  esoZoneId: 283,
  zoneKey: "EP1",
  questId: 3993,
  displayOrder: 17,
} as const satisfies TemperDungeon
