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
} as const satisfies TemperDungeon
