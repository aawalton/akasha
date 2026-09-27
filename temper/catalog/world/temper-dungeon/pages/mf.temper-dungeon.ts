import type { TemperDungeon } from "akasha/temper/catalog/world/temper-dungeon/temper-dungeon.page-type.types.ts"

export const mf = {
  id: "01a05fc5-7429-737e-9309-96447ebb1db5",
  type: "page-type/temper-dungeon",
  slug: "mf",
  title: "Moongrave Fane",
  key: "MF",
  questGiver: "temper-quest-giver/urgarlag-chief-bane",
  rotationPosition: 13,
  soloDifficulty: "hard",
  esoZoneId: 1122,
  zoneKey: "NE",
  questId: 6349,
  displayOrder: 38,
} as const satisfies TemperDungeon
