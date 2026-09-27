import type { TemperDungeon } from "akasha/temper/catalog/world/temper-dungeon/temper-dungeon.page-type.types.ts"

export const fv = {
  id: "01a05fc5-7427-7504-89e1-fdbdc5595a7f",
  type: "page-type/temper-dungeon",
  slug: "fv",
  title: "Frostvault",
  key: "FV",
  questGiver: "temper-quest-giver/urgarlag-chief-bane",
  rotationPosition: 11,
  soloDifficulty: "hard",
  esoZoneId: 1080,
  zoneKey: "EP4",
  questId: 6249,
  displayOrder: 36,
} as const satisfies TemperDungeon
