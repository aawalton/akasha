import type { TemperDungeon } from "akasha/temper/catalog/world/temper-dungeon/temper-dungeon.page-type.types.ts"

export const nc = {
  id: "01a05fc5-742a-7663-9d0b-158d4ebdd8d0",
  type: "page-type/temper-dungeon",
  slug: "nc",
  title: "Naj-Caldeesh",
  key: "NC",
  questGiver: "temper-quest-giver/urgarlag-chief-bane",
  rotationPosition: 32,
  soloDifficulty: "hard",
  esoZoneId: 1551,
  zoneKey: "SO",
  questId: 7320,
  displayOrder: 57,
} as const satisfies TemperDungeon
