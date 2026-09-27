import type { TemperDungeon } from "akasha/temper/catalog/world/temper-dungeon/temper-dungeon.page-type.types.ts"

export const fl = {
  id: "01a05fc5-7427-78d5-8281-698a37adb597",
  type: "page-type/temper-dungeon",
  slug: "fl",
  title: "Fang Lair",
  key: "FL",
  questGiver: "temper-quest-giver/urgarlag-chief-bane",
  rotationPosition: 6,
  soloDifficulty: "hard",
  esoZoneId: 1009,
  zoneKey: "DC5",
  questId: 6064,
  displayOrder: 31,
} as const satisfies TemperDungeon
