import type { TemperDungeon } from "akasha/temper/catalog/world/temper-dungeon/temper-dungeon.page-type.types.ts"

export const ch1 = {
  id: "01a05fc5-7423-7365-bfbd-5bab113034cf",
  type: "page-type/temper-dungeon",
  slug: "ch1",
  title: "Crypt of Hearts I",
  key: "CH1",
  questGiver: "temper-quest-giver/glirion-the-redbeard",
  rotationPosition: 9,
  soloDifficulty: "easy",
  esoZoneId: 130,
  zoneKey: "DC3",
  questId: 4379,
  displayOrder: 13,
  createdAt: "2026-09-02T01:39:30.979Z",
  updatedAt: "2026-09-27T03:53:34.000Z",
} as const satisfies TemperDungeon
