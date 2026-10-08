import type { TemperDungeon } from "akasha/temper/catalog/world/temper-dungeon/temper-dungeon.page-type.types.ts"

export const ct = {
  id: "01a05fc5-7424-72e7-bcab-6277698cdfff",
  type: "page-type/temper-dungeon",
  slug: "ct",
  title: "Castle Thorn",
  key: "CT",
  questGiver: "temper-quest-giver/urgarlag-chief-bane",
  rotationPosition: 16,
  soloDifficulty: "hard",
  esoZoneId: 1201,
  zoneKey: "WS",
  questId: 6507,
  displayOrder: 42,
  createdAt: "2026-09-02T01:39:30.980Z",
  updatedAt: "2026-09-27T03:53:34.000Z",
} as const satisfies TemperDungeon
