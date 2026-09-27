import type { TemperDungeon } from "akasha/temper/catalog/world/temper-dungeon/temper-dungeon.page-type.types.ts"

export const wgt = {
  id: "01a05fc5-742d-7524-b8d1-94ff6e6a6145",
  type: "page-type/temper-dungeon",
  slug: "wgt",
  title: "White-Gold Tower",
  key: "WGT",
  questGiver: "temper-quest-giver/urgarlag-chief-bane",
  rotationPosition: 1,
  soloDifficulty: "hard",
  esoZoneId: 688,
  zoneKey: "CY",
  questId: 5342,
  displayOrder: 26,
} as const satisfies TemperDungeon
