import type { TemperDungeon } from "akasha/temper/catalog/world/temper-dungeon/temper-dungeon.page-type.types.ts"

export const icp = {
  id: "01a05fc5-7428-7ef7-b723-7a4d6ffd63cf",
  type: "page-type/temper-dungeon",
  slug: "icp",
  title: "Imperial City Prison",
  key: "ICP",
  questGiver: "temper-quest-giver/urgarlag-chief-bane",
  rotationPosition: 0,
  soloDifficulty: "hard",
  esoZoneId: 678,
  zoneKey: "CY",
  questId: 5136,
  displayOrder: 25,
} as const satisfies TemperDungeon
