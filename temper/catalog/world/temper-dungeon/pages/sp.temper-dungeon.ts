import type { TemperDungeon } from "akasha/temper/catalog/world/temper-dungeon/temper-dungeon.page-type.types.ts"

export const sp = {
  id: "01a05fc5-742b-741a-be8d-217daba50379",
  type: "page-type/temper-dungeon",
  slug: "sp",
  title: "Scalecaller Peak",
  key: "SP",
  questGiver: "temper-quest-giver/urgarlag-chief-bane",
  rotationPosition: 7,
  soloDifficulty: "hard",
  esoZoneId: 1010,
  zoneKey: "DC2",
  questId: 6065,
  displayOrder: 32,
  createdAt: "2026-09-02T01:39:30.987Z",
  updatedAt: "2026-09-27T03:53:34.000Z",
} as const satisfies TemperDungeon
