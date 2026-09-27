import type { TemperDungeon } from "akasha/temper/catalog/world/temper-dungeon/temper-dungeon.page-type.types.ts"

export const ca1 = {
  id: "01a05fc5-7422-7d41-bc7d-24acd5c3f5c8",
  type: "page-type/temper-dungeon",
  slug: "ca1",
  title: "City of Ash I",
  key: "CA1",
  questGiver: "temper-quest-giver/glirion-the-redbeard",
  rotationPosition: 3,
  soloDifficulty: "easy",
  esoZoneId: 176,
  zoneKey: "AD3",
  questId: 4778,
  displayOrder: 5,
} as const satisfies TemperDungeon
