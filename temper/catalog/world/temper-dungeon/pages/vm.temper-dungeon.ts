import type { TemperDungeon } from "akasha/temper/catalog/world/temper-dungeon/temper-dungeon.page-type.types.ts"

export const vm = {
  id: "01a05fc5-742d-7142-ad4c-1b3f65a72b0f",
  type: "page-type/temper-dungeon",
  slug: "vm",
  title: "Vaults of Madness",
  key: "VM",
  questGiver: "temper-quest-giver/glirion-the-redbeard",
  rotationPosition: 1,
  soloDifficulty: "easy",
  esoZoneId: 11,
  zoneKey: "CH",
  questId: 4822,
  displayOrder: 24,
  createdAt: "2026-09-02T01:39:30.989Z",
  updatedAt: "2026-09-27T03:53:34.000Z",
} as const satisfies TemperDungeon
