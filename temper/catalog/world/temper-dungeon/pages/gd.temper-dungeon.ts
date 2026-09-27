import type { TemperDungeon } from "akasha/temper/catalog/world/temper-dungeon/temper-dungeon.page-type.types.ts"

export const gd = {
  id: "01a05fc5-7428-74d0-8c81-c70eb165f8f9",
  type: "page-type/temper-dungeon",
  slug: "gd",
  title: "Graven Deep",
  key: "GD",
  questGiver: "temper-quest-giver/urgarlag-chief-bane",
  rotationPosition: 25,
  soloDifficulty: "hard",
  esoZoneId: 1361,
  zoneKey: "HI",
  questId: 6837,
  displayOrder: 50,
} as const satisfies TemperDungeon
