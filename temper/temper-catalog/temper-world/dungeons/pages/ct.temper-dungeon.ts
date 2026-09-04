import type { TemperDungeon } from "../temper-dungeon.page-type.ts"

export const ct = {
  id: "01a05fc5-7424-72e7-bcab-6277698cdfff",
  pageTypeSlug: "temper-dungeon",
  slug: "ct",
  title: "Castle Thorn",
  key: "CT",
  questGiver: "urgarlag-chief-bane",
  rotationPosition: 16,
  soloDifficulty: "hard",
} as const satisfies TemperDungeon
