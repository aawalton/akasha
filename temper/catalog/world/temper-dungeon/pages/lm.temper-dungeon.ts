import type { TemperDungeon } from "akasha/temper/catalog/world/temper-dungeon/temper-dungeon.page-type.types.ts"

export const lm = {
  id: "01a05fc5-7428-76d3-8ed2-cb960f969a5c",
  type: "page-type/temper-dungeon",
  slug: "lm",
  title: "Lair of Maarselok",
  key: "LM",
  questGiver: "temper-quest-giver/urgarlag-chief-bane",
  rotationPosition: 12,
  soloDifficulty: "hard",
  esoZoneId: 1123,
  zoneKey: "AD2",
  questId: 6351,
  displayOrder: 37,
  createdAt: "2026-09-02T01:39:30.984Z",
  updatedAt: "2026-09-27T03:53:34.000Z",
} as const satisfies TemperDungeon
