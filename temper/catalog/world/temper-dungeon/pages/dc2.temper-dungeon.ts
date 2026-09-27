import type { TemperDungeon } from "akasha/temper/catalog/world/temper-dungeon/temper-dungeon.page-type.types.ts"

export const dc2 = {
  id: "01a05fc5-7424-74fa-b9b1-454aa9fc53bf",
  type: "page-type/temper-dungeon",
  slug: "dc2",
  title: "Darkshade Caverns II",
  key: "DC2",
  questGiver: "temper-quest-giver/maj-al-ragath",
  rotationPosition: 4,
  soloDifficulty: "medium",
  esoZoneId: 930,
  zoneKey: "EP2",
  questId: 4641,
  displayOrder: 20,
} as const satisfies TemperDungeon
